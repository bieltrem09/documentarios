/**
 * npm run trim -- <arquivo> <inicio> <fim> [saida]
 *
 * Recorta um trecho (tempos em segundos ou mm:ss) e grava em 720p H.264.
 * O original nunca é alterado. Saída padrão: <nome>-<inicio>-<fim>.mp4 na mesma pasta.
 * Ex.: npm run trim -- biblioteca/_novas/france24-ciberataque-credit-mutuel-arkea.mp4 0:08 0:14
 */
import { execFileSync } from "node:child_process";
import { join, parse } from "node:path";
import { argumentos, exigirFfmpeg, mb, probe, rel } from "./lib/util.ts";

function seg(t: string): number {
  const partes = t.split(":").map(Number);
  if (partes.some((x) => Number.isNaN(x))) throw new Error(`tempo inválido: ${t}`);
  return partes.reduce((acc, x) => acc * 60 + x, 0);
}

exigirFfmpeg();
const [arquivo, ini, fim, saidaArg] = argumentos().posicionais;
if (!arquivo || !ini || !fim) {
  console.error("Uso: npm run trim -- <arquivo> <inicio> <fim> [saida]");
  process.exit(1);
}
const a = seg(ini);
const b = seg(fim);
if (b <= a) throw new Error("fim deve ser maior que início");

const p = parse(arquivo);
const tag = (s: number) => String(Math.round(s)).padStart(3, "0");
const saida = saidaArg ?? join(p.dir, `${p.name}-${tag(a)}-${tag(b)}.mp4`);
const { largura, altura } = probe(arquivo);
const escala = altura > largura ? "scale='min(720,iw)':-2" : "scale=-2:'min(720,ih)'";

execFileSync(
  "ffmpeg",
  ["-v", "error", "-y", "-ss", String(a), "-to", String(b), "-i", arquivo, "-vf", escala, "-c:v", "libx264",
    "-preset", "veryfast", "-crf", "23", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", saida],
  { stdio: "inherit" },
);
console.log(`✔ ${rel(saida)}  (${(b - a).toFixed(1)} s, ${mb(saida)} MB)`);
