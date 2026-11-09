// Teste da função api/banco.js com respostas simuladas no formato das APIs (sem rede).
// npm run teste:banco
import assert from "node:assert/strict";
import { buscar } from "../api/banco.js";

const respostas = {
  "api.mymemory.translated.net": { responseData: { translatedText: "people running" } },
  "api.pexels.com/v1/search": {
    total_results: 2,
    photos: [{ id: 1, width: 6000, height: 4000, url: "https://www.pexels.com/photo/correndo-1/", photographer: "Ana", photographer_url: "https://www.pexels.com/@ana", alt: "pessoas correndo no parque", src: { original: "o.jpg", large2x: "l2.jpg", large: "l.jpg", medium: "m.jpg" } }],
  },
  "api.pexels.com/videos/search": {
    total_results: 1,
    videos: [{ id: 9, width: 1920, height: 1080, duration: 12, url: "https://www.pexels.com/video/pessoas-correndo-9/", image: "t.jpg", user: { name: "Bia", url: "https://www.pexels.com/@bia" },
      video_files: [{ file_type: "video/mp4", width: 640, link: "640.mp4" }, { file_type: "video/mp4", width: 1920, link: "1920.mp4" }, { file_type: "video/mp4", width: 3840, link: "4k.mp4" }] }],
  },
  "api.unsplash.com/search/photos": {
    total: 1,
    results: [{ id: "abc", width: 5000, height: 3000, alt_description: "maratona", urls: { full: "f.jpg", regular: "r.jpg", small: "s.jpg" }, links: { html: "https://unsplash.com/photos/abc", download_location: "https://api.unsplash.com/photos/abc/download" }, user: { name: "Caio", links: { html: "https://unsplash.com/@caio" } } }],
  },
  "pixabay.com/api/?": {
    totalHits: 1,
    hits: [{ id: 5, pageURL: "https://pixabay.com/photos/corrida-5/", tags: "corrida, pessoas", webformatURL: "w.jpg", largeImageURL: "L.jpg", imageWidth: 4000, imageHeight: 2600, user: "dani", user_id: 77 }],
  },
  "pixabay.com/api/videos/": {
    totalHits: 1,
    hits: [{ id: 6, pageURL: "https://pixabay.com/videos/corrida-6/", tags: "corrida", duration: 20, user: "edu", user_id: 8,
      videos: { large: { url: "L.mp4", width: 1920, height: 1080, thumbnail: "lt.jpg" }, medium: { url: "M.mp4", width: 1280, height: 720, thumbnail: "mt.jpg" }, small: { url: "S.mp4", width: 960, height: 540, thumbnail: "st.jpg" } } }],
  },
};

const chamadas = [];
const fetcher = async (url, opts = {}) => {
  chamadas.push({ url, opts });
  const chave = Object.keys(respostas).find((k) => url.includes(k));
  return { ok: !!chave, status: chave ? 200 : 404, json: async () => respostas[chave] };
};
const env = { PEXELS_API_KEY: "kp", UNSPLASH_ACCESS_KEY: "ku", PIXABAY_API_KEY: "kx" };

// fotos, todas as fontes
let r = await buscar({ q: "pessoas correndo", tipo: "foto", fonte: "todas", pagina: 1, orientacao: "horizontal" }, env, fetcher);
assert.equal(r.resultados.length, 3);
assert.deepEqual(r.resultados.map((x) => x.fonte), ["pexels", "unsplash", "pixabay"]);
assert.ok(Object.values(r.fontes).every((f) => f.ok));
const [px, un, pb] = r.resultados;
assert.equal(px.download, "o.jpg");
assert.equal(px.credito, "Foto: Ana / Pexels (https://www.pexels.com/photo/correndo-1/)");
assert.equal(un.download_location, "https://api.unsplash.com/photos/abc/download");
assert.ok(un.url_pagina.includes("utm_source=biblioteca_indeep"));
assert.equal(un.licenca.credito_obrigatorio, true);
assert.equal(pb.autor_url, "https://pixabay.com/users/dani-77/");
const urlPexels = chamadas.find((c) => c.url.includes("pexels")).url;
assert.ok(urlPexels.includes("orientation=landscape") && urlPexels.includes("locale=pt-BR"));
assert.equal(chamadas.find((c) => c.url.includes("pexels")).opts.headers.Authorization, "kp");
assert.ok(chamadas.find((c) => c.url.includes("pixabay")).url.includes("orientation=horizontal"));

// vídeos
chamadas.length = 0;
r = await buscar({ q: "pessoas correndo", tipo: "video", fonte: "todas", pagina: 1, orientacao: "horizontal" }, env, fetcher);
assert.equal(r.resultados.length, 2, "unsplash não tem vídeo");
assert.equal(r.fontes.unsplash.aviso, "Unsplash não tem vídeos");
const pv = r.resultados.find((x) => x.fonte === "pexels");
assert.equal(pv.download, "1920.mp4", "pega o melhor até 1080p");
assert.equal(pv.preview, "640.mp4", "prévia leve para o hover");
const xv = r.resultados.find((x) => x.fonte === "pixabay");
assert.equal(xv.download, "L.mp4");
assert.equal(xv.preview, "S.mp4");

// sem chave
r = await buscar({ q: "x", tipo: "foto", fonte: "todas", pagina: 1, orientacao: "todas" }, { PEXELS_API_KEY: "kp" }, fetcher);
assert.equal(r.fontes.unsplash.ok, false);
assert.match(r.fontes.unsplash.erro, /UNSPLASH_ACCESS_KEY/);
assert.equal(r.resultados.length, 1);

// erro HTTP de uma fonte não derruba as outras
const quebrado = async (url, o) => (url.includes("unsplash") ? { ok: false, status: 401, json: async () => ({}) } : fetcher(url, o));
r = await buscar({ q: "x", tipo: "foto", fonte: "todas", pagina: 1, orientacao: "todas" }, env, quebrado);
assert.equal(r.fontes.unsplash.erro, "Unsplash respondeu 401");
assert.equal(r.resultados.length, 2);

// tradução para o Unsplash e paginação
chamadas.length = 0;
r = await buscar({ q: "pessoas correndo", tipo: "foto", fonte: "todas", pagina: 1, orientacao: "horizontal" }, env, fetcher);
const urlUn = chamadas.find((c) => c.url.includes("unsplash")).url;
assert.ok(urlUn.includes("query=people+running"), "Unsplash busca com o termo em inglês");
assert.ok(chamadas.find((c) => c.url.includes("pixabay")).url.includes("q=pessoas+correndo"), "Pixabay busca em português");
assert.equal(r.fontes.unsplash.termo_usado, "people running");
assert.ok(chamadas.find((c) => c.url.includes("pexels")).url.includes("per_page=80"));
assert.ok(chamadas.find((c) => c.url.includes("pixabay")).url.includes("per_page=100"));
assert.ok(urlUn.includes("per_page=30"));
assert.equal(r.tem_mais, false, "fixtures com total pequeno não têm mais páginas");

// total grande -> tem_mais
const muitos = async (url, o) => {
  if (url.includes("pixabay.com/api/?")) return { ok: true, status: 200, json: async () => ({ totalHits: 500, hits: Array.from({ length: 100 }, (_, i) => ({ ...respostas["pixabay.com/api/?"].hits[0], id: i })) }) };
  return fetcher(url, o);
};
r = await buscar({ q: "dinheiro", tipo: "foto", fonte: "pixabay", pagina: 1, orientacao: "todas" }, env, muitos);
assert.equal(r.resultados.length, 100);
assert.equal(r.fontes.pixabay.tem_mais, true);
assert.equal(r.tem_mais, true);
r = await buscar({ q: "dinheiro", tipo: "foto", fonte: "pixabay", pagina: 6, orientacao: "todas" }, env, muitos);
assert.equal(r.fontes.pixabay.tem_mais, true, "página cheia continua mesmo passando do total estimado de 500");
const parcial = async (url, o) => {
  if (url.includes("pixabay.com/api/?")) return { ok: true, status: 200, json: async () => ({ totalHits: 500, hits: Array.from({ length: 37 }, (_, i) => ({ ...respostas["pixabay.com/api/?"].hits[0], id: i })) }) };
  return fetcher(url, o);
};
r = await buscar({ q: "dinheiro", tipo: "foto", fonte: "pixabay", pagina: 7, orientacao: "todas" }, env, parcial);
assert.equal(r.fontes.pixabay.tem_mais, false, "página incompleta = fim");

// Pixabay além do limite responde 400 -> fim, sem erro
const alem = async (url, o) => (url.includes("pixabay") ? { ok: false, status: 400, json: async () => ({}) } : fetcher(url, o));
r = await buscar({ q: "dinheiro", tipo: "foto", fonte: "pixabay", pagina: 6, orientacao: "todas" }, env, alem);
assert.equal(r.fontes.pixabay.ok, true);
assert.equal(r.fontes.pixabay.tem_mais, false);

// tradução falhando não derruba a busca
const semTraducao = async (url, o) => (url.includes("mymemory") ? Promise.reject(new Error("rede")) : fetcher(url, o));
const { traduzir } = await import("../api/banco.js");
assert.equal(await traduzir("termo inédito xyz", semTraducao), "termo inédito xyz");

console.log("✔ api/banco.js: todos os testes passaram");
