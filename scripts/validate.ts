/**
 * npm run validate
 *
 * - valida cada meta.json contra o schema zod (scripts/lib/schema.ts);
 * - confere se o arquivo citado existe, se a pasta bate com id/nicho/categoria
 *   e se vídeos/GIFs têm contact-sheet.jpg;
 * - IDs únicos;
 * - nenhum arquivo do repositório acima de 50 MB;
 * - nomes em kebab-case dentro de biblioteca/.
 * Sai com código 1 se houver erro.
 */
import { existsSync } from "node:fs";
import { basename, join, sep } from "node:path";
import { BIBLIOTECA, RAIZ, listar, mb, rel } from "./lib/util.ts";
import { lerMetas } from "./lib/metas.ts";

const erros: string[] = [];
const avisos: string[] = [];

// 1. meta.json
const metas = lerMetas();
const ids = new Map<string, string>();
for (const m of metas) {
  for (const e of m.erros) erros.push(`${rel(m.caminho)} → ${e}`);
  const meta = m.meta;
  if (!meta) continue;
  const dir = join(RAIZ, m.pasta);
  const partes = m.pasta.split("/");

  if (ids.has(meta.id)) erros.push(`${m.pasta}: id ${meta.id} repetido (também em ${ids.get(meta.id)})`);
  ids.set(meta.id, m.pasta);

  if (!basename(dir).startsWith(meta.id)) erros.push(`${m.pasta}: nome da pasta deve começar com o id ${meta.id}`);
  if (!existsSync(join(dir, meta.arquivo))) erros.push(`${m.pasta}: arquivo "${meta.arquivo}" não encontrado`);
  if ((meta.tipo_midia === "video" || meta.tipo_midia === "gif") && !existsSync(join(dir, "contact-sheet.jpg")))
    erros.push(`${m.pasta}: falta contact-sheet.jpg (rode npm run keyframes)`);

  if (partes[1] === "edicao") {
    const [, , nicho, categoria] = partes;
    if (meta.nicho !== "ambos" && meta.nicho !== nicho)
      erros.push(`${m.pasta}: nicho "${meta.nicho}" diferente da pasta "${nicho}"`);
    if (meta.categoria !== categoria)
      erros.push(`${m.pasta}: categoria "${meta.categoria}" diferente da pasta "${categoria}"`);
    if (meta.origem.fonte === "claude") avisos.push(`${m.pasta}: ref com origem "claude" deveria estar em biblioteca/proprias/`);
  }
  for (const r of meta.receitas)
    if (!existsSync(join(BIBLIOTECA, "receitas", `${r}.md`))) avisos.push(`${m.pasta}: receita "${r}" ainda não existe`);
}

// 2. tamanho e nomes
for (const f of listar(RAIZ)) {
  const r = rel(f);
  const tamanho = mb(f);
  if (tamanho > 50) erros.push(`${r}: ${tamanho} MB (> 50 MB). Use npm run compress / npm run trim`);
  else if (tamanho > 20 && r.startsWith("biblioteca/")) avisos.push(`${r}: ${tamanho} MB (> 20 MB, recomendado comprimir)`);
  if (r.startsWith("biblioteca/") && !/^[a-z0-9._-]+$/.test(basename(f)))
    erros.push(`${r}: nome fora do padrão kebab-case`);
}

const pendentes = listar(join(BIBLIOTECA, "_novas")).filter((f) => !f.endsWith(`${sep}.gitkeep`));

for (const a of avisos) console.log(`⚠ ${a}`);
for (const e of erros) console.log(`✖ ${e}`);
console.log(
  `\n${metas.length} meta.json lido(s), ${metas.filter((m) => m.meta).length} válido(s) · ${pendentes.length} arquivo(s) aguardando catalogação em biblioteca/_novas · ${avisos.length} aviso(s) · ${erros.length} erro(s)`,
);
process.exit(erros.length ? 1 : 0);
