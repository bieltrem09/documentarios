import { readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { BIBLIOTECA, listar, rel } from "./util.ts";
import { MetaSchema, type Meta } from "./schema.ts";

export interface MetaLida {
  caminho: string; // caminho do meta.json
  pasta: string; // pasta da ref, relativa à raiz
  bruto: unknown;
  meta?: Meta;
  erros: string[];
}

/** Lê todos os meta.json de biblioteca/edicao e biblioteca/proprias. */
export function lerMetas(): MetaLida[] {
  const arquivos = [...listar(join(BIBLIOTECA, "edicao")), ...listar(join(BIBLIOTECA, "proprias"))].filter(
    (f) => basename(f) === "meta.json",
  );
  return arquivos.sort().map((caminho) => {
    const r: MetaLida = { caminho, pasta: rel(dirname(caminho)), bruto: null, erros: [] };
    try {
      r.bruto = JSON.parse(readFileSync(caminho, "utf8"));
    } catch (e) {
      r.erros.push(`JSON inválido: ${(e as Error).message}`);
      return r;
    }
    const p = MetaSchema.safeParse(r.bruto);
    if (p.success) r.meta = p.data;
    else for (const i of p.error.issues) r.erros.push(`${i.path.join(".") || "(raiz)"}: ${i.message}`);
    return r;
  });
}
