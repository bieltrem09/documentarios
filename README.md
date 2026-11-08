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
