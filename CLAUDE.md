# Biblioteca de Referências de Edição — Canais Dark (Documentário & Notícia)

> Este arquivo é o contexto permanente do projeto. Leia-o inteiro antes de qualquer tarefa neste repositório.

## O que é este projeto

Uma **biblioteca pessoal de referências de edição de vídeo** usada para produzir conteúdo para **canais dark** do YouTube (canais sem rosto, narrados) nos nichos de **documentário** e **notícia**.

**Canal:** InDeep (nome a confirmar a grafia). **Formato:** vídeo longo 16:9 (1920×1080). Shorts não são prioridade.
**Quem edita:** o próprio Claude. As receitas devem trazer a especificação técnica e a implementação em código (Remotion/React), não passo a passo de Premiere/CapCut.
**Identidade visual do canal:** ainda não definida. A estética de colagem de papel creme/vermelho/amarelo em `projetos/ueno/` é de **um vídeo** (tema: banco Ueno), não do canal.

As referências (vídeos curtos, GIFs, prints e frames) foram coletadas manualmente (Pinterest, YouTube, etc.) e ficam guardadas neste repositório GitHub (`bieltrem09/documentarios`).

A biblioteca tem três funções:

1. **Guardar e organizar** as referências com metadados ricos (o que é, como é feito, quando usar).
2. **Ser consultada automaticamente pelo Claude** sempre que ele trabalhar em edição, roteiro visual ou identidade dos canais — sem o usuário precisar procurar e enviar referências.
3. **Virar conhecimento aplicável**: o Claude transforma referências em *receitas* reproduzíveis e pode criar *referências próprias* (templates, presets, componentes) a partir delas.

## Gatilhos — quando o Claude DEVE consultar a biblioteca

Consulte a biblioteca **antes de responder ou criar** sempre que a tarefa envolver qualquer um destes temas:

- editar, planejar ou decupar um vídeo; roteiro visual; "plano de edição"
- intro / abertura, transições, cortes, ritmo
- tipografia: títulos, lower thirds, citações, legendas animadas
- mapas, geolocalização, linhas do tempo, datas, dados e gráficos
- fotos e documentos de arquivo (Ken Burns, parallax 2.5D, recortes de jornal, destaque de texto)
- texturas e overlays (grão, VHS, film burn, glitch), color grading, clima/mood
- elementos de notícia (breaking news, tarja, manchete, ticker)
- thumbnails e identidade visual dos canais
- qualquer pedido com "canal dark", "documentário", "notícia", "estilo de edição", "referência"

Como consultar (na ordem de preferência):
1. Ferramenta MCP `buscar_referencias` (quando o servidor MCP estiver ativo).
2. Skill `biblioteca-edicao` (`.claude/skills/biblioteca-edicao/`).
3. Leitura direta de `biblioteca/index.json` + abrir o `contact-sheet.jpg` das refs encontradas.

Ao usar referências, **cite os IDs** (ex.: `ref-0042`) e diga o que está sendo aproveitado de cada uma.

## Área de sites (criação de sites / web design)

A biblioteca tem **duas áreas separadas**; nunca misture:

| Área | Pasta | IDs | `nicho` | Categorias |
|---|---|---|---|---|
| Edição de vídeo | `biblioteca/edicao/<nicho>/<categoria>/` | `ref-XXXX` | documentario · noticia · ambos | taxonomia de edição (abaixo) |
| Criação de sites | `biblioteca/sites/<categoria>/` | `web-XXXX` | `web` | `hero` · `landing-page` · `ecommerce` · `institucional` · `portfolio-editorial` · `mockup-apresentacao` · `identidade-marca` · `social-media` · `outros` |

- Todo `meta.json` tem `"area": "edicao"` ou `"area": "site"`.
- Em sites, `subcategoria` = **segmento** (comida, fintech, logistica, esporte, moda, ia-saas…).
- Em sites, `tecnica.como_e_feito` descreve como construir (layout, CSS, animação de scroll com GSAP, 3D com Three.js/Spline etc.).
- Ao catalogar, decida a área olhando o conteúdo: layout de página/UI/marca/post → `site`; técnica de vídeo, thumbnail, overlay, b-roll → `edicao`. Catálogos de fontes ficam em edição › tipografia.
- No app: abas **Edição**, **Sites** e **Banco de imagens**.
- Gatilhos para consultar a área de sites: criar/redesenhar site, landing page, hero, e-commerce, portfólio, identidade/logo, posts de redes sociais.

## Banco de imagens (fotos e vídeos gratuitos)

Quando a cena pedir footage/foto que a biblioteca não tem (ex.: "pessoas correndo"), busque no banco de imagens:

- **Endpoint:** `https://biblioteca-indeep.vercel.app/api/banco?q=<termo>&tipo=foto|video&fonte=todas|pexels|unsplash|pixabay&orientacao=horizontal|vertical|todas&pagina=1`
  (no Claude Code, use a ferramenta `web_fetch_vercel_url` do MCP da Vercel ou o MCP da biblioteca quando existir).
- **Na interface:** aba **Banco de imagens** do app (`/banco/?q=...`).
- Cada resultado traz `download`, `preview`, `url_pagina`, `autor`, `licenca` e `credito` (texto pronto).
- Termos em inglês costumam render mais resultados. Padrão: horizontal (16:9).
- Ao usar uma imagem num vídeo, registre o `credito` em `projetos/<video>/creditos.md`. Unsplash exige crédito; Pexels e Pixabay não, mas é boa prática.
- Chaves ficam só na Vercel (`PEXELS_API_KEY`, `UNSPLASH_ACCESS_KEY`, `PIXABAY_API_KEY`). Nunca colocar chaves no repositório.
- Código: `api/banco.js` (testes: `npm run teste:banco`).

## Estrutura (alvo)

```
/
├── CLAUDE.md
├── biblioteca/
│   ├── sites/<categoria>/<web-id>/   ← refs de criação de sites (área separada)
│   ├── edicao/
│   │   ├── documentario/        ← refs originais organizadas por categoria
│   │   │   └── <categoria>/<ref-id>/
│   │   │       ├── <arquivo original>.mp4|.gif|.jpg|.png
│   │   │       ├── meta.json
│   │   │       ├── contact-sheet.jpg   (vídeos/GIFs: grade de keyframes)
│   │   │       └── poster.jpg          (vídeos/GIFs: capa usada no app)
│   │   └── noticia/
│   ├── _novas/                  ← entrada: jogar arquivos aqui sem organizar
│   ├── proprias/                ← referências criadas pelo Claude/usuário
│   ├── receitas/                ← receitas reproduzíveis (.md)
│   ├── estudos/                 ← estudos de sites/galerias de referência (ex.: estudos/motionsites.md, índice com links)
│   ├── index.json               ← GERADO, não editar à mão
│   └── index.md                 ← GERADO, versão legível
├── projetos/                    ← material de produção de cada vídeo (ex.: projetos/ueno/)
├── scripts/                     ← compressão, keyframes, validação, índice
├── mcp/                         ← servidor MCP da biblioteca
├── app/                         ← app web para navegar na biblioteca (abas Referências e Banco de imagens)
├── api/banco.js                 ← função Vercel: busca em Pexels/Unsplash/Pixabay
└── .claude/
    ├── skills/biblioteca-edicao/SKILL.md
    └── commands/                ← /catalogar, /buscar-ref, /receita, /plano-edicao
```

A estrutura atual pode ser diferente (ex.: pasta `ref de edicao/documentarios`). A migração é feita com `git mv`, nunca apagando arquivos.

## Esquema de metadados (`meta.json`)

```json
{
  "id": "ref-0042",
  "arquivo": "lower-third-jornal-vermelho.mp4",
  "tipo_midia": "video | gif | imagem",
  "nicho": "documentario | noticia | ambos",
  "categoria": "tipografia",
  "subcategoria": "lower-third",
  "titulo": "Lower third com tarja vermelha estilo jornal",
  "descricao": "O que se vê, em 2-3 frases objetivas.",
  "tecnica": {
    "como_e_feito": "Camadas, movimento, efeitos — passo a passo resumido.",
    "duracao_seg": 1.2,
    "easing": "ease-out forte (aprox. cubic-bezier(0.16,1,0.3,1))",
    "fontes": ["sans condensada bold (tipo Bebas/Oswald)"],
    "cores_hex": ["#C1121F", "#FFFFFF", "#0B0B0B"],
    "efeitos": ["wipe horizontal", "motion blur", "grão leve"]
  },
  "quando_usar": "Apresentar fonte/entrevistado ou nome de lugar em matéria de notícia.",
  "mood": ["urgente", "sério"],
  "tags": ["lower-third", "jornal", "vermelho", "wipe"],
  "dificuldade": "facil | media | dificil",
  "origem": { "fonte": "pinterest | youtube | outro | claude", "url": null },
  "media": { "duracao_seg": 4.0, "largura": 1280, "altura": 720, "tamanho_mb": 3.1 },
  "receitas": ["receita-lower-third-tarja"],
  "confianca": "alta | media | baixa",
  "catalogado_em": "2026-11-08"
}
```

Campos incertos ficam `null`. Nunca invente o que não foi visto nos frames.

## Taxonomia de categorias

`abertura` · `transicoes` · `tipografia` · `mapas` · `linha-do-tempo` · `dados-graficos` · `arquivo-fotos` · `documentos-jornal` · `texturas-overlays` · `color-grading` · `ritmo-cortes` · `elementos-noticia` · `b-roll` · `censura-blur` · `thumbnails` · `outros`

Novas categorias só com aprovação do usuário.

## Regras do projeto

- **Nunca apagar** arquivo de referência. Reorganizar só com `git mv`.
- **Tamanho de arquivo:** GitHub bloqueia > 100 MB e avisa > 50 MB. Vídeos de referência devem ser comprimidos (`npm run compress`) para ≤ 20 MB, 720p, só o trecho relevante, antes de commitar.
- **Nomes** em kebab-case, sem acentos nem espaços.
- `index.json` e `index.md` são **gerados** (`npm run index`) — nunca editar à mão.
- Para analisar vídeo/GIF: gerar keyframes + `contact-sheet.jpg` (`npm run keyframes`) e **olhar as imagens** antes de descrever.
- As referências são de terceiros e servem como **estudo de técnica**. Ao criar algo, recrie a técnica; não reutilize footage, logos ou marcas de outros canais.
- Commits pequenos, por etapa, com mensagens em pt-BR.
- Antes de ações destrutivas ou em massa (mover > 20 arquivos, reescrever histórico), mostre o plano e espere aprovação.

## Comandos (a serem criados)

| Comando | O que faz |
|---|---|
| `npm run trim -- <arquivo> <inicio> <fim>` | Recorta um trecho de vídeo (720p) sem apagar o original |
| `npm run compress` | Comprime vídeos grandes (ffmpeg, 720p, ≤ 20 MB) |
| `npm run keyframes` | Extrai keyframes por detecção de cena + gera `contact-sheet.jpg` |
| `npm run validate` | Valida todos os `meta.json` contra o schema (zod) |
| `npm run index` | Gera `biblioteca/index.json` e `index.md` |
| `npm run mcp` | Inicia o servidor MCP da biblioteca |
| `npm run app` | Roda o app web localmente |

| Slash command | O que faz |
|---|---|
| `/catalogar` | Processa `_novas/` ou refs sem `meta.json`: keyframes → análise visual → `meta.json` → move para a categoria |
| `/buscar-ref <descrição>` | Busca refs e mostra as melhores com contact sheet |
| `/receita <ref-id>` | Gera uma receita reproduzível a partir de uma ref |
| `/plano-edicao <roteiro>` | Decupa um roteiro em cenas e associa técnica + ref + receita a cada uma |
