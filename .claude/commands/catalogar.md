---
description: Cataloga referências novas (biblioteca/_novas ou caminho dado) — keyframes, análise visual, meta.json, mover para a categoria, validar e indexar
argument-hint: "[quantidade ou caminho] (padrão: lote de 10 de biblioteca/_novas)"
---

Catalogue referências da Biblioteca de Edição seguindo o `CLAUDE.md` (schema, taxonomia e regras).

Argumento: $ARGUMENTS (número = tamanho do lote; caminho = arquivo/pasta específico; vazio = 10 de `biblioteca/_novas/`).

## Passos

1. Liste os arquivos pendentes em `biblioteca/_novas/` (ou o caminho dado) e escolha o lote.
2. **Vídeos/GIFs:** rode `npm run keyframes -- <arquivos>` e **abra cada contact sheet** em `.cache/contact-sheets/<nome>.jpg` com a ferramenta Read. **Imagens:** abra a própria imagem (para muitas, monte grades numeradas com ffmpeg num diretório temporário).
3. Vídeo longo com várias técnicas (> 40 s)? Considere recortar trechos com `npm run trim -- <arquivo> <ini> <fim>` e catalogar cada recorte como uma ref.
4. Escreva `.cache/lote-NN.json`: uma lista com os campos do `meta.json` **exceto** `id`, `arquivo`, `media` e `catalogado_em` (preenchidos pelo script), mais:
   - `origem_arquivo`: caminho atual (ex.: `biblioteca/_novas/abc.jpg`)
   - `slug`: nome kebab-case descritivo (vira pasta e nome do arquivo)
   - `area`: `"edicao"` (vídeo) ou `"site"` (web design). Sites usam as categorias de site do CLAUDE.md, `subcategoria` = segmento; o script define `nicho: "web"` e o id `web-XXXX`.
   Regras de conteúdo:
   - descreva **só o que se vê** nos frames; campos incertos = `null`, e ajuste `confianca`;
   - `como_e_feito` deve permitir recriar a técnica em código (Remotion/React): camadas, movimento, blend, timing;
   - `cores_hex` estimadas dos frames; fontes como estilo + alternativas livres;
   - `categoria` só da taxonomia do CLAUDE.md; `tags` kebab-case;
   - nomes de arquivos hash do Pinterest/pindown → `origem.fonte = "pinterest"`.
5. Teste: `npm run catalogar -- .cache/lote-NN.json --dry`, depois rode sem `--dry` (faz `git mv`, grava `meta.json` e gera `contact-sheet.jpg`).
6. `npm run validate && npm run index` — corrija até zerar erros.
7. Commit em pt-BR (`Catalogação: lote NN (ref-XXXX a ref-YYYY)`) e mostre ao usuário uma tabela ID | título | categoria | confiança.
