# Biblioteca de Referências de Edição — InDeep

Referências de edição (documentário e notícia) catalogadas para o Claude consultar e aplicar.
O contexto completo e as regras estão em [`CLAUDE.md`](CLAUDE.md).

## Requisitos

- Node.js 20+
- ffmpeg/ffprobe (`winget install Gyan.FFmpeg` · `brew install ffmpeg` · `sudo apt install ffmpeg`)

```bash
npm install
```

## Scripts

| Comando | O que faz |
|---|---|
| `npm run keyframes [-- <arquivo/pasta>]` | Detecta cenas e gera o contact sheet (6–16 frames com timestamp) |
| `npm run trim -- <arquivo> <ini> <fim>` | Recorta um trecho em 720p sem mexer no original |
| `npm run compress` | Comprime vídeos > 20 MB para 720p (`--substituir` troca depois de conferir) |
| `npm run validate` | Valida todos os `meta.json`, tamanhos (≤ 50 MB) e nomes |
| `npm run index` | Gera `biblioteca/index.json` e `biblioteca/index.md` |

## Fluxo para adicionar referências

1. Jogue os arquivos em `biblioteca/_novas/`.
2. Peça ao Claude: `/catalogar`.

## App web

```bash
cd app && npm install && npm run dev
```

Grade masonry animada, vídeo no hover, filtros (nicho, categoria, mídia, cor, tags), busca (`/`), modal com navegação por setas e página por ref (`/ref/ref-0001/`).
Deploy: Vercel lê o `vercel.json` da raiz (build em `app/`, saída estática em `app/out`).

## Banco de imagens (Pexels, Unsplash, Pixabay)

Aba **Banco de imagens** no app e endpoint `GET /api/banco?q=...&tipo=foto|video` (função Vercel em `api/banco.js`).
Para funcionar, crie as chaves gratuitas e cadastre na Vercel (projeto `biblioteca-indeep` → Settings → Environment Variables):

| Variável | Onde criar |
|---|---|
| `PEXELS_API_KEY` | https://www.pexels.com/api/ |
| `UNSPLASH_ACCESS_KEY` | https://unsplash.com/developers (Access Key) |
| `PIXABAY_API_KEY` | https://pixabay.com/api/docs/ |

Depois de salvar, faça um novo deploy (Deployments → Redeploy). Testes: `npm run teste:banco`.
