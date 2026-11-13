import { NOME_CATEGORIA, nomeSegmento, type Ref } from "./dados";

/** Endereço público do app, usado nos links que vão para a conversa. */
export const SITE = "https://biblioteca-indeep.vercel.app";

/** Item genérico que pode ir para a conversa (ref da biblioteca ou resultado do banco). */
export interface Anexo {
  id: string;
  texto: string; // bloco de texto pronto para colar
  imagem: string | null; // URL de uma imagem (ou capa do vídeo) para anexar
}

const abs = (u: string) => (u.startsWith("http") ? u : SITE + u);

export function anexoDeRef(r: Ref): Anexo {
  const t = r.tecnica;
  const area = r.area === "site" ? "Site" : "Edição";
  const cat = NOME_CATEGORIA[r.categoria] ?? r.categoria;
  const sub = r.subcategoria ? ` · ${r.area === "site" ? nomeSegmento(r.subcategoria) : r.subcategoria}` : "";
  const linhas = [
    `Referência ${r.id} da biblioteca InDeep (${area} › ${cat}${sub})`,
    `Título: ${r.titulo}`,
    `O que é: ${r.descricao}`,
    `Como é feito: ${t.como_e_feito}`,
    t.efeitos.length ? `Efeitos: ${t.efeitos.join(", ")}` : "",
    t.fontes.length ? `Fontes: ${t.fontes.join(", ")}` : "",
    t.cores_hex.length ? `Cores: ${t.cores_hex.join(" ")}` : "",
    t.duracao_seg != null ? `Duração do efeito: ${t.duracao_seg}s${t.easing ? ` · easing ${t.easing}` : ""}` : "",
    `Quando usar: ${r.quando_usar}`,
    `Mood: ${r.mood.join(", ")} · Tags: ${r.tags.join(", ")}`,
    `Página: ${SITE}/ref/${r.id}/`,
    `Mídia: ${abs(`/media/${r.id}/${r.arquivo}`)}`,
    `No repositório: ${r.pasta}`,
  ];
  const imagem = r.tipo_midia === "imagem" ? `/media/${r.id}/${r.arquivo}` : r.poster ? `/media/${r.id}/poster.jpg` : null;
  return { id: r.id, texto: linhas.filter(Boolean).join("\n"), imagem };
}

/** Junta vários anexos num texto só, com um pedido no topo. */
export function textoDeVarios(itens: Anexo[]): string {
  if (itens.length === 1) return itens[0].texto;
  return [`${itens.length} referências da biblioteca InDeep para usar neste projeto:`, ...itens.map((a, i) => `\n— ${i + 1} —\n${a.texto}`)].join("\n");
}

/** Converte qualquer imagem (jpg/webp/png) em PNG, o único formato que o navegador aceita na área de transferência. */
async function pngDe(url: string): Promise<Blob> {
  const res = await fetch(url, { mode: "cors" });
  if (!res.ok) throw new Error(`imagem ${res.status}`);
  const blob = await res.blob();
  if (blob.type === "image/png") return blob;
  const bmp = await createImageBitmap(blob);
  const escala = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
  const c = document.createElement("canvas");
  c.width = Math.round(bmp.width * escala);
  c.height = Math.round(bmp.height * escala);
  c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
  return new Promise((ok, erro) => c.toBlob((b) => (b ? ok(b) : erro(new Error("png"))), "image/png"));
}

/**
 * Copia para a área de transferência o texto + a imagem (quando há uma só).
 * Precisa ser chamado direto no clique (o Safari exige isso).
 * Retorna "imagem" se a imagem foi junto, "texto" se foi só o texto.
 */
export async function copiarParaClaude(itens: Anexo[]): Promise<"imagem" | "texto"> {
  const texto = textoDeVarios(itens);
  const img = itens.length === 1 ? itens[0].imagem : null;
  if (img && typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/plain": new Blob([texto], { type: "text/plain" }),
          "image/png": pngDe(img),
        }),
      ]);
      return "imagem";
    } catch {
      /* navegador sem suporte a imagem: cai para só texto */
    }
  }
  await navigator.clipboard.writeText(texto);
  return "texto";
}

/** Abre uma conversa nova no Claude já com o texto escrito (o claude.ai aceita ?q=). */
export function abrirNoClaude(itens: Anexo[]) {
  let texto = textoDeVarios(itens);
  if (texto.length > 6000) texto = texto.slice(0, 6000) + "\n…";
  window.open(`https://claude.ai/new?q=${encodeURIComponent(texto)}`, "_blank", "noopener");
}
