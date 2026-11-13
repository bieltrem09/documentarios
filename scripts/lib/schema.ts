import { z } from "zod";

export const CATEGORIAS = [
  "abertura",
  "transicoes",
  "tipografia",
  "mapas",
  "linha-do-tempo",
  "dados-graficos",
  "arquivo-fotos",
  "documentos-jornal",
  "texturas-overlays",
  "color-grading",
  "ritmo-cortes",
  "elementos-noticia",
  "b-roll",
  "censura-blur",
  "thumbnails",
  "outros",
] as const;

/** Taxonomia da área de criação de sites (tipo de página). O segmento (comida, fintech…) vai em subcategoria. */
export const SITE_CATEGORIAS = [
  "hero",
  "landing-page",
  "ecommerce",
  "institucional",
  "portfolio-editorial",
  "mockup-apresentacao",
  "identidade-marca",
  "social-media",
  "outros",
] as const;

export const AREAS = ["edicao", "site"] as const;

const kebab = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "use kebab-case sem acentos");

const hex = z.string().regex(/^#[0-9A-Fa-f]{6}$/, "cor deve ser #RRGGBB");

const Base = z.object({
    arquivo: z
      .string()
      .regex(/^[a-z0-9][a-z0-9.-]*\.(mp4|gif|jpg|jpeg|png|webp)$/, "nome do arquivo em kebab-case"),
    tipo_midia: z.enum(["video", "gif", "imagem"]),
    subcategoria: kebab.nullable(),
    titulo: z.string().min(5),
    descricao: z.string().min(20),
    tecnica: z.object({
      como_e_feito: z.string().min(10),
      duracao_seg: z.number().positive().nullable(),
      easing: z.string().nullable(),
      fontes: z.array(z.string()),
      cores_hex: z.array(hex),
      efeitos: z.array(z.string()),
    }),
    quando_usar: z.string().min(10),
    mood: z.array(z.string()),
    tags: z.array(kebab).min(1),
    dificuldade: z.enum(["facil", "media", "dificil"]),
    origem: z.object({
      fonte: z.enum(["pinterest", "youtube", "outro", "claude"]),
      url: z.string().url().nullable(),
    }),
    media: z.object({
      duracao_seg: z.number().nonnegative().nullable(),
      largura: z.number().int().positive(),
      altura: z.number().int().positive(),
      tamanho_mb: z.number().nonnegative(),
    }),
    receitas: z.array(kebab),
    confianca: z.enum(["alta", "media", "baixa"]),
    catalogado_em: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

/** Referência de edição de vídeo (documentário / notícia). */
const EdicaoSchema = Base.extend({
  area: z.literal("edicao"),
  id: z.string().regex(/^(ref|own)-\d{4}$/, "id no formato ref-0001 ou own-0001"),
  nicho: z.enum(["documentario", "noticia", "ambos"]),
  categoria: z.enum(CATEGORIAS),
}).strict();

/** Referência de criação de site (web design). */
const SiteSchema = Base.extend({
  area: z.literal("site"),
  id: z.string().regex(/^web-\d{4}$/, "id de site no formato web-0001"),
  nicho: z.literal("web"),
  categoria: z.enum(SITE_CATEGORIAS),
}).strict();

export const MetaSchema = z.discriminatedUnion("area", [EdicaoSchema, SiteSchema]);

export type Meta = z.infer<typeof MetaSchema>;
