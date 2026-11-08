/**
 * npm run catalogar -- <spec.json> [--dry]
 *
 * Aplica a catalogação escrita pelo Claude (ver .claude/commands/catalogar.md).
 * O spec é uma lista de objetos com os campos do meta.json, MENOS id, arquivo, media
 * e catalogado_em, que são preenchidos aqui, e MAIS:
 *   - "origem_arquivo": caminho atual do arquivo (ex.: biblioteca/_novas/abc.jpg)
 *   - "slug": nome curto kebab-case da ref (vira o nome da pasta e do arquivo)
 *
 * Para cada item:
 *   1. atribui o próximo id livre (ref-0001, ref-0002…);
 *   2. git mv para biblioteca/edicao/<nicho>/<categoria>/<id>-<slug>/<slug>.<ext>
 *      (nicho "ambos" vai para a pasta documentario);
 *   3. mede a mídia (ffprobe) e grava meta.json;
 *   4. gera contact-sheet.jpg para vídeos/GIFs.
 * Depois rode: npm run validate && npm run index
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { BIBLIOTECA, RAIZ, argumentos, exigirFfmpeg, mb, probe, rel, tipoMidia } from "./lib/util.ts";
import { lerMetas } from "./lib/metas.ts";
import { MetaSchema } from "./lib/schema.ts";
import { gerarContactSheet } from "./keyframes.ts";

exigirFfmpeg();
const { posicionais, flags } = argumentos();
if (!posicionais[0]) {
  console.error("Uso: npm run catalogar -- <spec.json> [--dry]");
  process.exit(1);
}
const dry = flags.has("--dry");
const spec: any[] = JSON.parse(readFileSync(resolve(posicionais[0]), "utf8"));

const usados = lerMetas()
  .map((m) => m.meta?.id)
  .filter((id): id is string => !!id && id.startsWith("ref-"))
  .map((id) => Number(id.slice(4)));
let proximo = (usados.length ? Math.max(...usados) : 0) + 1;
const hoje = new Date().toISOString().slice(0, 10);

let ok = 0;
for (const item of spec) {
  const { origem_arquivo, slug, ...resto } = item;
  const origem = resolve(RAIZ, origem_arquivo);
  if (!existsSync(origem)) {
    console.error(`✖ não encontrado: ${origem_arquivo}`);
    continue;
  }
  const id = `ref-${String(proximo).padStart(4, "0")}`;
  const ext = extname(origem).toLowerCase().replace(".jpeg", ".jpg");
  const arquivo = `${slug}${ext}`;
  const pastaNicho = resto.nicho === "noticia" ? "noticia" : "documentario";
  const pasta = join(BIBLIOTECA, "edicao", pastaNicho, resto.categoria, `${id}-${slug}`);
  const tipo = tipoMidia(origem)!;
  const info = probe(origem);

  const meta = {
    id,
    arquivo,
    tipo_midia: tipo,
    ...resto,
    media: {
      duracao_seg: tipo === "imagem" ? null : info.duracao_seg,
      largura: info.largura,
      altura: info.altura,
      tamanho_mb: mb(origem),
    },
    catalogado_em: hoje,
  };
  // ordem das chaves igual ao CLAUDE.md
  const ordem = ["id", "arquivo", "tipo_midia", "nicho", "categoria", "subcategoria", "titulo", "descricao", "tecnica",
    "quando_usar", "mood", "tags", "dificuldade", "origem", "media", "receitas", "confianca", "catalogado_em"];
  const ordenado = Object.fromEntries(ordem.map((k) => [k, (meta as any)[k]]));

  const v = MetaSchema.safeParse(ordenado);
  if (!v.success) {
    console.error(`✖ ${origem_arquivo}: meta inválido\n  ` + v.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("\n  "));
    continue;
  }
  if (dry) {
    console.log(`(dry) ${origem_arquivo} → ${rel(pasta)}/${arquivo}`);
    proximo++;
    ok++;
    continue;
  }
  mkdirSync(pasta, { recursive: true });
  execFileSync("git", ["mv", origem, join(pasta, arquivo)], { cwd: RAIZ });
  writeFileSync(join(pasta, "meta.json"), JSON.stringify(ordenado, null, 2) + "\n");
  if (tipo !== "imagem") gerarContactSheet(join(pasta, arquivo), true);
  console.log(`✔ ${id}  ${rel(pasta)}`);
  proximo++;
  ok++;
}
console.log(`\n${ok}/${spec.length} ref(s) catalogada(s). Agora: npm run validate && npm run index`);
