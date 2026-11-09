import indice from "@/data/index.json";

export interface Ref {
  id: string;
  area: "edicao" | "site";
  arquivo: string;
  tipo_midia: "video" | "gif" | "imagem";
  nicho: "documentario" | "noticia" | "ambos" | "web";
  categoria: string;
  subcategoria: string | null;
  titulo: string;
  descricao: string;
  tecnica: {
    como_e_feito: string;
    duracao_seg: number | null;
    easing: string | null;
    fontes: string[];
    cores_hex: string[];
    efeitos: string[];
  };
  quando_usar: string;
  mood: string[];
  tags: string[];
  dificuldade: "facil" | "media" | "dificil";
  origem: { fonte: string; url: string | null };
  media: { duracao_seg: number | null; largura: number; altura: number; tamanho_mb: number };
  receitas: string[];
  confianca: "alta" | "media" | "baixa";
  catalogado_em: string;
  pasta: string;
  contact_sheet: string | null;
  poster: string | null;
}

export interface Indice {
  total: number;
  gerado_em: string;
  refs: Ref[];
  receitas: string[];
  receitas_md: Record<string, string>;
}

export const dados = indice as unknown as Indice;

export const midia = (r: Ref) => `/media/${r.id}/${r.arquivo}`;
export const poster = (r: Ref) => (r.poster ? `/media/${r.id}/poster.jpg` : undefined);
export const contactSheet = (r: Ref) => (r.contact_sheet ? `/media/${r.id}/contact-sheet.jpg` : null);

export const NOME_CATEGORIA: Record<string, string> = {
  abertura: "Abertura",
  transicoes: "Transições",
  tipografia: "Tipografia",
  mapas: "Mapas",
  "linha-do-tempo": "Linha do tempo",
  "dados-graficos": "Dados & gráficos",
  "arquivo-fotos": "Fotos de arquivo",
  "documentos-jornal": "Documentos & jornal",
  "texturas-overlays": "Texturas & overlays",
  "color-grading": "Color grading",
  "ritmo-cortes": "Ritmo & cortes",
  "elementos-noticia": "Elementos de notícia",
  "b-roll": "B-roll",
  "censura-blur": "Censura & blur",
  thumbnails: "Thumbnails",
  outros: "Outros",
  // área de sites
  hero: "Hero",
  "landing-page": "Landing page",
  ecommerce: "E-commerce",
  institucional: "Institucional",
  "portfolio-editorial": "Portfólio & editorial",
  "mockup-apresentacao": "Mockups & apresentação",
  "identidade-marca": "Identidade & logo",
  "social-media": "Social media",
};

const SEGMENTOS: Record<string, string> = {
  comida: "Comida", bebida: "Bebida", logistica: "Logística", esporte: "Esporte", fintech: "Fintech",
  moveis: "Móveis", aviacao: "Aviação", logo: "Logo", moda: "Moda", "ia-saas": "IA & SaaS",
  construcao: "Construção", seguranca: "Segurança", viagem: "Viagem", tecnologia: "Tecnologia",
  "nft-cripto": "NFT & cripto", arquitetura: "Arquitetura", produtividade: "Produtividade",
  imobiliario: "Imobiliário", saude: "Saúde", mobilidade: "Mobilidade", arte: "Arte", joias: "Joias",
  curadoria: "Curadoria", historia: "História", automotivo: "Automotivo", agencia: "Agência", relojoaria: "Relojoaria",
};
/** nome legível de segmento (subcategoria dos sites) */
export const nomeSegmento = (s: string) => SEGMENTOS[s] ?? s.replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase());

export const NOME_NICHO: Record<string, string> = {
  documentario: "Documentário",
  noticia: "Notícia",
  ambos: "Ambos",
  web: "Site",
};

export const NOME_DIFICULDADE: Record<string, string> = { facil: "Fácil", media: "Média", dificil: "Difícil" };

/** Família de cor de um hex, para o filtro por cor. */
export function familia(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  const r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (s < 0.2 || l < 0.08 || l > 0.94) return "pb";
  let h = 0;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h = (h * 60 + 360) % 360;
  if (h < 15 || h >= 340) return "vermelho";
  if (h < 40) return "laranja";
  if (h < 65) return "amarelo";
  if (h < 165) return "verde";
  if (h < 250) return "azul";
  return "roxo";
}

export const CORES: { id: string; nome: string; amostra: string }[] = [
  { id: "vermelho", nome: "Vermelho", amostra: "#E0141E" },
  { id: "laranja", nome: "Laranja", amostra: "#FF8A1F" },
  { id: "amarelo", nome: "Amarelo", amostra: "#F5C542" },
  { id: "verde", nome: "Verde", amostra: "#22C55E" },
  { id: "azul", nome: "Azul", amostra: "#2F6FED" },
  { id: "roxo", nome: "Roxo", amostra: "#7C5CE0" },
  { id: "pb", nome: "P&B", amostra: "linear-gradient(135deg,#fff 50%,#111 50%)" },
];
