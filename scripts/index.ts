/**
 * npm run index
 *
 * Junta todos os meta.json válidos em:
 *  - biblioteca/index.json  (para o MCP, a skill e o app)
 *  - biblioteca/index.md    (versão legível, agrupada por nicho e categoria)
 * Arquivos GERADOS: não edite à mão.
 */
import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { BIBLIOTECA, RAIZ, listar } from "./lib/util.ts";
import { lerMetas } from "./lib/metas.ts";
import { CATEGORIAS, type Meta } from "./lib/schema.ts";

export interface EntradaIndice extends Meta {
  pasta: string;
  caminho_arquivo: string;
  contact_sheet: string | null;
  poster: string | null;
}

const metas = lerMetas();
const invalidas = metas.filter((m) => !m.meta);
if (invalidas.length) {
  console.error(`✖ ${invalidas.length} meta.json inválido(s). Rode npm run validate.`);
  process.exit(1);
}

const refs: EntradaIndice[] = metas
  .map((m) => {
    const meta = m.meta!;
    const cs = `${m.pasta}/contact-sheet.jpg`;
    return {
      ...meta,
      pasta: m.pasta,
      caminho_arquivo: `${m.pasta}/${meta.arquivo}`,
      contact_sheet: existsSync(join(RAIZ, cs)) ? cs : null,
      poster: existsSync(join(RAIZ, `${m.pasta}/poster.jpg`)) ? `${m.pasta}/poster.jpg` : null,
    };
  })
  .sort((a, b) => a.id.localeCompare(b.id));

const receitas = listar(join(BIBLIOTECA, "receitas"))
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.split(/[\\/]/).pop()!.replace(/\.md$/, ""))
  .sort();

const contagem = (campo: (r: EntradaIndice) => string) =>
  refs.reduce<Record<string, number>>((acc, r) => ((acc[campo(r)] = (acc[campo(r)] ?? 0) + 1), acc), {});

const indice = {
  aviso: "ARQUIVO GERADO por `npm run index`. Não edite à mão.",
  gerado_em: new Date().toISOString(),
  total: refs.length,
  por_nicho: contagem((r) => r.nicho),
  por_categoria: contagem((r) => r.categoria),
  receitas,
  refs,
};
writeFileSync(join(BIBLIOTECA, "index.json"), JSON.stringify(indice, null, 2) + "\n");

// ---------- index.md ----------
const linhas: string[] = [
  "# Índice da Biblioteca de Referências",
  "",
  "> Arquivo GERADO por `npm run index`. Não edite à mão.",
  "",
  `**${refs.length} referências** · ${receitas.length} receitas · gerado em ${indice.gerado_em.slice(0, 10)}`,
  "",
];
const esc = (s: string) => s.replace(/\|/g, "\\|").replace(/\n/g, " ");
for (const nicho of ["documentario", "noticia", "ambos"] as const) {
  const doNicho = refs.filter((r) => r.nicho === nicho);
  if (!doNicho.length) continue;
  linhas.push(`## ${nicho === "documentario" ? "Documentário" : nicho === "noticia" ? "Notícia" : "Ambos"}`, "");
  for (const cat of CATEGORIAS) {
    const lista = doNicho.filter((r) => r.categoria === cat);
    if (!lista.length) continue;
    linhas.push(`### ${cat} (${lista.length})`, "", "| ID | Título | Mídia | Quando usar | Tags |", "|---|---|---|---|---|");
    for (const r of lista)
      linhas.push(
        `| [${r.id}](${r.pasta.replace(/^biblioteca\//, "")}/) | ${esc(r.titulo)} | ${r.tipo_midia} | ${esc(r.quando_usar)} | ${r.tags.join(", ")} |`,
      );
    linhas.push("");
  }
}
if (receitas.length) {
  linhas.push("## Receitas", "", ...receitas.map((r) => `- [${r}](receitas/${r}.md)`), "");
}
writeFileSync(join(BIBLIOTECA, "index.md"), linhas.join("\n"));
console.log(`✔ biblioteca/index.json e index.md gerados (${refs.length} refs, ${receitas.length} receitas).`);
