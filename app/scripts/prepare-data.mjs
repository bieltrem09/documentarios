// Copia biblioteca/index.json e as mídias das refs para dentro do app (gerado, não versionado).
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const APP = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const RAIZ = resolve(APP, "..");
const indice = JSON.parse(readFileSync(join(RAIZ, "biblioteca", "index.json"), "utf8"));

const MEDIA = join(APP, "public", "media");
rmSync(MEDIA, { recursive: true, force: true });
for (const r of indice.refs) {
  const dest = join(MEDIA, r.id);
  mkdirSync(dest, { recursive: true });
  cpSync(join(RAIZ, r.caminho_arquivo), join(dest, r.arquivo));
  if (r.poster && existsSync(join(RAIZ, r.poster))) cpSync(join(RAIZ, r.poster), join(dest, "poster.jpg"));
  if (r.contact_sheet && existsSync(join(RAIZ, r.contact_sheet))) cpSync(join(RAIZ, r.contact_sheet), join(dest, "contact-sheet.jpg"));
}

const receitas = {};
for (const slug of indice.receitas ?? []) {
  const p = join(RAIZ, "biblioteca", "receitas", `${slug}.md`);
  if (existsSync(p)) receitas[slug] = readFileSync(p, "utf8");
}

mkdirSync(join(APP, "data"), { recursive: true });
writeFileSync(join(APP, "data", "index.json"), JSON.stringify({ ...indice, receitas_md: receitas }));
console.log(`✔ app: ${indice.refs.length} refs e ${Object.keys(receitas).length} receitas preparadas`);
