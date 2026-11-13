/**
 * npm run keyframes [-- <arquivo|pasta> ...] [--force]
 *
 * Para cada vídeo/GIF:
 *  1. detecta cortes de cena (select='gt(scene,0.3)');
 *  2. ajusta para no mínimo 6 e no máximo 16 frames (completa com amostras uniformes / reduz igualmente);
 *  3. gera um contact sheet em grade com o timestamp de cada frame.
 *
 * Onde o contact sheet é salvo:
 *  - ref já catalogada (pasta ref-XXXX ou own-XXXX): <pasta>/contact-sheet.jpg  (versionado)
 *  - arquivo solto (ex.: _novas/): .cache/contact-sheets/<nome>.jpg  (não versionado)
 *
 * Sem argumentos: processa toda a biblioteca, pulando vídeos que já têm contact sheet.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, statSync } from "node:fs";
import { basename, dirname, join, parse } from "node:path";
import { BIBLIOTECA, CACHE, argumentos, exigirFfmpeg, listar, probe, rel, tipoMidia } from "./lib/util.ts";

const MIN = 6;
const MAX = 16;
const LIMIAR = 0.3;
const FONTE = ["/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", "C:/Windows/Fonts/arialbd.ttf", "/System/Library/Fonts/Supplemental/Arial Bold.ttf", "/Library/Fonts/Arial Bold.ttf"].find(existsSync);

export function destinoContactSheet(arquivo: string): string {
  const pasta = basename(dirname(arquivo));
  if (/^(ref|own|web)-\d{4}/.test(pasta)) return join(dirname(arquivo), "contact-sheet.jpg");
  return join(CACHE, "contact-sheets", parse(arquivo).name + ".jpg");
}

function detectarCenas(arquivo: string): number[] {
  const r = spawnSync(
    "ffmpeg",
    ["-hide_banner", "-nostats", "-i", arquivo, "-an", "-vf", `select='gt(scene,${LIMIAR})',showinfo`, "-f", "null", "-"],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
  );
  const tempos: number[] = [];
  for (const m of (r.stderr ?? "").matchAll(/pts_time:([\d.]+)/g)) tempos.push(parseFloat(m[1]));
  return tempos;
}

function escolherTempos(cenas: number[], dur: number): number[] {
  // o primeiro frame (logo após o início) sempre entra
  let t = [Math.min(Math.max(0.1, dur * 0.03), dur / 2), ...cenas.map((c) => Math.min(c + 0.15, dur - 0.05))];
  t = [...new Set(t.map((x) => Math.round(x * 100) / 100))].sort((a, b) => a - b);
  if (t.length > MAX) {
    const passo = (t.length - 1) / (MAX - 1);
    t = Array.from({ length: MAX }, (_, i) => t[Math.round(i * passo)]);
  }
  if (t.length < MIN) {
    const alvo = Math.min(MAX, Math.max(MIN, Math.round(dur / 3)));
    const uniforme = Array.from({ length: alvo }, (_, i) => ((i + 0.5) * dur) / alvo);
    for (const u of uniforme) {
      if (t.length >= alvo) break;
      if (t.every((x) => Math.abs(x - u) > dur / (alvo * 2.5))) t.push(Math.round(u * 100) / 100);
    }
    t.sort((a, b) => a - b);
  }
  return t;
}

function hms(s: number): string {
  const m = Math.floor(s / 60);
  const r = s - m * 60;
  return `${String(m).padStart(2, "0")}:${r.toFixed(1).padStart(4, "0")}`;
}

export function gerarContactSheet(arquivo: string, forcar = false): string | null {
  const tipo = tipoMidia(arquivo);
  if (tipo !== "video" && tipo !== "gif") return null;
  const saida = destinoContactSheet(arquivo);
  if (!forcar && existsSync(saida) && statSync(saida).mtimeMs >= statSync(arquivo).mtimeMs) return saida;

  const info = probe(arquivo);
  const dur = info.duracao_seg ?? 1;
  const tempos = escolherTempos(detectarCenas(arquivo), dur);

  const vertical = info.altura > info.largura;
  const cols = vertical ? 6 : 4;
  const [cw, ch] = vertical ? [270, 480] : [480, 270];
  const linhas = Math.ceil(tempos.length / cols);

  const tmp = join(CACHE, "frames", parse(arquivo).name);
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });

  tempos.forEach((t, i) => {
    const texto = `${hms(t)}`.replace(/:/g, "\\:");
    const draw = FONTE
      ? `,drawtext=fontfile='${FONTE.replace(/:/g, "\\:")}':text='${texto}':x=8:y=8:fontsize=20:fontcolor=yellow:box=1:boxcolor=black@0.7:boxborderw=4`
      : "";
    execFileSync(
      "ffmpeg",
      [
        "-v", "error", "-y", "-ss", String(t), "-i", arquivo, "-frames:v", "1",
        "-vf", `scale=${cw}:${ch}:force_original_aspect_ratio=decrease,pad=${cw}:${ch}:(ow-iw)/2:(oh-ih)/2:color=black${draw}`,
        join(tmp, `${String(i).padStart(2, "0")}.jpg`),
      ],
      { stdio: "inherit" },
    );
  });

  mkdirSync(dirname(saida), { recursive: true });
  execFileSync(
    "ffmpeg",
    [
      "-v", "error", "-y", "-framerate", "1", "-i", join(tmp, "%02d.jpg"),
      "-vf", `tile=${cols}x${linhas}:padding=4:margin=4:color=0x111111`,
      "-frames:v", "1", "-q:v", "3", saida,
    ],
    { stdio: "inherit" },
  );
  // poster (capa do card no app): frame representativo, só para refs já catalogadas
  if (basename(saida) === "contact-sheet.jpg") {
    const tPoster = tempos[Math.floor(tempos.length * 0.4)] ?? dur / 2;
    execFileSync(
      "ffmpeg",
      ["-v", "error", "-y", "-ss", String(tPoster), "-i", arquivo, "-frames:v", "1", "-vf", "scale='min(720,iw)':-2", "-q:v", "4", join(dirname(saida), "poster.jpg")],
      { stdio: "inherit" },
    );
  }
  rmSync(tmp, { recursive: true, force: true });
  console.log(`✔ ${rel(arquivo)} → ${rel(saida)}  (${tempos.length} frames)`);
  return saida;
}

function main() {
  exigirFfmpeg();
  const { posicionais, flags } = argumentos();
  const alvos = posicionais.length ? posicionais : [BIBLIOTECA];
  const arquivos = alvos.flatMap((a) => (statSync(a).isDirectory() ? listar(a) : [a]));
  let n = 0;
  for (const f of arquivos) {
    if (basename(f) === "contact-sheet.jpg") continue;
    if (gerarContactSheet(f, flags.has("--force"))) n++;
  }
  console.log(`\n${n} vídeo(s)/GIF(s) com contact sheet.`);
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("keyframes.ts")) main();
