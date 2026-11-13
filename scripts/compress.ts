/**
 * npm run compress [-- <arquivo|pasta> ...] [--limite=20] [--substituir]
 *
 * Comprime vídeos acima do limite (padrão 20 MB) para 720p H.264 (preset veryfast, CRF 28).
 * Por padrão grava <nome>.comprimido.mp4 ao lado e MANTÉM o original.
 * Com --substituir (depois de você conferir), o comprimido toma o lugar do original e o
 * original vai para .cache/originais/ (fora do git, mas não é apagado).
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, renameSync, statSync } from "node:fs";
import { basename, dirname, join, parse } from "node:path";
import { BIBLIOTECA, CACHE, argumentos, exigirFfmpeg, listar, mb, probe, rel, tipoMidia } from "./lib/util.ts";

exigirFfmpeg();
const { posicionais, flags } = argumentos();
const limite = Number([...flags].find((f) => f.startsWith("--limite="))?.split("=")[1] ?? 20);
const substituir = flags.has("--substituir");

const alvos = posicionais.length ? posicionais : [BIBLIOTECA];
const videos = alvos
  .flatMap((a) => (statSync(a).isDirectory() ? listar(a) : [a]))
  .filter((f) => tipoMidia(f) === "video" && !f.includes(".comprimido."));

let feitos = 0;
for (const v of videos) {
  const p = parse(v);
  const comp = join(p.dir, `${p.name}.comprimido.mp4`);

  if (substituir && existsSync(comp)) {
    const backup = join(CACHE, "originais", rel(v));
    mkdirSync(dirname(backup), { recursive: true });
    renameSync(v, backup);
    renameSync(comp, join(p.dir, `${p.name}.mp4`));
    console.log(`↺ ${rel(v)} substituído (original em ${rel(backup)})`);
    feitos++;
    continue;
  }
  if (mb(v) <= limite) continue;

  const { largura, altura } = probe(v);
  const escala = altura > largura ? "scale=720:-2" : "scale=-2:720";
  console.log(`… ${rel(v)} (${mb(v)} MB)`);
  execFileSync(
    "ffmpeg",
    ["-v", "error", "-stats", "-y", "-i", v, "-vf", `${escala}`, "-c:v", "libx264", "-preset", "veryfast", "-crf", "28",
      "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", comp],
    { stdio: "inherit" },
  );
  console.log(`✔ ${basename(comp)}: ${mb(v)} MB → ${mb(comp)} MB${mb(comp) > limite ? "  ⚠ ainda acima do limite: use npm run trim para cortar só o trecho relevante" : ""}`);
  feitos++;
}
console.log(feitos ? `\n${feitos} vídeo(s) processado(s).` : `\nNenhum vídeo acima de ${limite} MB.`);
if (feitos && !substituir) console.log("Confira os .comprimido.mp4 e rode `npm run compress -- --substituir` para trocar.");
