import { execFileSync, spawnSync } from "node:child_process";
import { readdirSync, statSync, existsSync } from "node:fs";
import { join, resolve, dirname, extname, relative } from "node:path";
import { fileURLToPath } from "node:url";

export const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const BIBLIOTECA = join(RAIZ, "biblioteca");
export const CACHE = join(RAIZ, ".cache");

export const EXT_VIDEO = new Set([".mp4", ".mov", ".webm", ".mkv"]);
export const EXT_GIF = new Set([".gif"]);
export const EXT_IMAGEM = new Set([".jpg", ".jpeg", ".png", ".webp"]);

export function tipoMidia(arquivo: string): "video" | "gif" | "imagem" | null {
  const e = extname(arquivo).toLowerCase();
  if (EXT_VIDEO.has(e)) return "video";
  if (EXT_GIF.has(e)) return "gif";
  if (EXT_IMAGEM.has(e)) return "imagem";
  return null;
}

/** Lista arquivos recursivamente, ignorando node_modules, .git e .cache. */
export function listar(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const nome of readdirSync(dir)) {
    if (nome === "node_modules" || nome === ".git" || nome === ".cache" || nome === ".next") continue;
    const p = join(dir, nome);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...listar(p));
    else out.push(p);
  }
  return out;
}

export function rel(p: string): string {
  return relative(RAIZ, p).split("\\").join("/");
}

export function mb(p: string): number {
  return Math.round((statSync(p).size / 1048576) * 10) / 10;
}

export function exigirFfmpeg(): void {
  for (const bin of ["ffmpeg", "ffprobe"]) {
    const r = spawnSync(bin, ["-version"], { stdio: "ignore" });
    if (r.error || r.status !== 0) {
      console.error(
        `\n✖ ${bin} não encontrado.\n  Windows: winget install Gyan.FFmpeg\n  macOS:   brew install ffmpeg\n  Linux:   sudo apt install ffmpeg\n`,
      );
      process.exit(1);
    }
  }
}

export interface InfoMidia {
  duracao_seg: number | null;
  largura: number;
  altura: number;
}

export function probe(arquivo: string): InfoMidia {
  const json = execFileSync(
    "ffprobe",
    ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height:format=duration", "-of", "json", arquivo],
    { encoding: "utf8" },
  );
  const d = JSON.parse(json);
  const dur = parseFloat(d.format?.duration);
  return {
    duracao_seg: Number.isFinite(dur) ? Math.round(dur * 100) / 100 : null,
    largura: d.streams?.[0]?.width ?? 0,
    altura: d.streams?.[0]?.height ?? 0,
  };
}

/** Argumentos posicionais (sem flags) passados ao script. */
export function argumentos(): { posicionais: string[]; flags: Set<string> } {
  const a = process.argv.slice(2);
  return {
    posicionais: a.filter((x) => !x.startsWith("--")),
    flags: new Set(a.filter((x) => x.startsWith("--"))),
  };
}
