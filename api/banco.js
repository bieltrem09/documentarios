// Vercel Function: busca unificada em bancos de imagem/vídeo gratuitos.
// GET /api/banco?q=pessoas+correndo&tipo=foto|video&fonte=todas|pexels|unsplash|pixabay&pagina=1&orientacao=horizontal|vertical|todas
// Chaves (variáveis de ambiente na Vercel): PEXELS_API_KEY, UNSPLASH_ACCESS_KEY, PIXABAY_API_KEY
// Também usado pelo Claude (MCP / web fetch) para buscar b-roll para os vídeos.

const POR_FONTE = 15;

const LICENCAS = {
  pexels: { nome: "Licença Pexels", url: "https://www.pexels.com/pt-br/licenca/", credito_obrigatorio: false },
  unsplash: { nome: "Licença Unsplash", url: "https://unsplash.com/pt-br/licenca", credito_obrigatorio: true },
  pixabay: { nome: "Licença de conteúdo Pixabay", url: "https://pixabay.com/pt/service/license-summary/", credito_obrigatorio: false },
};

function credito(r) {
  const site = { pexels: "Pexels", unsplash: "Unsplash", pixabay: "Pixabay" }[r.fonte];
  return `${r.tipo === "video" ? "Vídeo" : "Foto"}: ${r.autor} / ${site} (${r.url_pagina})`;
}

function finalizar(r) {
  return { ...r, licenca: LICENCAS[r.fonte], credito: credito(r) };
}

const orientPexels = { horizontal: "landscape", vertical: "portrait" };
const orientUnsplash = { horizontal: "landscape", vertical: "portrait" };
const orientPixabay = { horizontal: "horizontal", vertical: "vertical" };

export async function buscarPexels({ q, tipo, pagina, orientacao }, chave, fetcher = fetch) {
  const p = new URLSearchParams({ query: q, per_page: String(POR_FONTE), page: String(pagina), locale: "pt-BR" });
  if (orientPexels[orientacao]) p.set("orientation", orientPexels[orientacao]);
  const base = tipo === "video" ? "https://api.pexels.com/videos/search" : "https://api.pexels.com/v1/search";
  const res = await fetcher(`${base}?${p}`, { headers: { Authorization: chave } });
  if (!res.ok) throw new Error(`Pexels respondeu ${res.status}`);
  const d = await res.json();
  if (tipo === "video") {
    return {
      total: d.total_results ?? 0,
      itens: (d.videos ?? []).map((v) => {
        const arquivos = (v.video_files ?? []).filter((f) => f.file_type === "video/mp4").sort((a, b) => (a.width ?? 0) - (b.width ?? 0));
        const preview = arquivos.find((f) => (f.width ?? 0) >= 540) ?? arquivos[0];
        const melhor = arquivos.filter((f) => (f.width ?? 0) <= 1920).pop() ?? arquivos.pop();
        return finalizar({
          fonte: "pexels", tipo: "video", id: `pexels-v-${v.id}`,
          titulo: (v.url ?? "").split("/").filter(Boolean).pop()?.replace(/-\d+$/, "").replace(/-/g, " ") || "vídeo",
          autor: v.user?.name ?? "Pexels", autor_url: v.user?.url ?? null, url_pagina: v.url,
          largura: v.width, altura: v.height, duracao_seg: v.duration ?? null,
          thumb: v.image, preview: preview?.link ?? null, download: melhor?.link ?? null,
        });
      }),
    };
  }
  return {
    total: d.total_results ?? 0,
    itens: (d.photos ?? []).map((f) => finalizar({
      fonte: "pexels", tipo: "foto", id: `pexels-${f.id}`, titulo: f.alt || "foto",
      autor: f.photographer, autor_url: f.photographer_url, url_pagina: f.url,
      largura: f.width, altura: f.height, duracao_seg: null,
      thumb: f.src?.large ?? f.src?.medium, preview: f.src?.large2x ?? f.src?.large, download: f.src?.original,
    })),
  };
}

export async function buscarUnsplash({ q, tipo, pagina, orientacao }, chave, fetcher = fetch) {
  if (tipo === "video") return { total: 0, itens: [], aviso: "Unsplash não tem vídeos" };
  const p = new URLSearchParams({ query: q, per_page: String(POR_FONTE), page: String(pagina), lang: "pt" });
  if (orientUnsplash[orientacao]) p.set("orientation", orientUnsplash[orientacao]);
  const res = await fetcher(`https://api.unsplash.com/search/photos?${p}`, {
    headers: { Authorization: `Client-ID ${chave}`, "Accept-Version": "v1" },
  });
  if (!res.ok) throw new Error(`Unsplash respondeu ${res.status}`);
  const d = await res.json();
  return {
    total: d.total ?? 0,
    itens: (d.results ?? []).map((f) => finalizar({
      fonte: "unsplash", tipo: "foto", id: `unsplash-${f.id}`,
      titulo: f.alt_description || f.description || "foto",
      autor: f.user?.name ?? "Unsplash",
      autor_url: f.user?.links?.html ? `${f.user.links.html}?utm_source=biblioteca_indeep&utm_medium=referral` : null,
      url_pagina: `${f.links?.html}?utm_source=biblioteca_indeep&utm_medium=referral`,
      largura: f.width, altura: f.height, duracao_seg: null,
      thumb: f.urls?.small, preview: f.urls?.regular, download: f.urls?.full,
      // a API do Unsplash pede que o download seja registrado neste endpoint
      download_location: f.links?.download_location ?? null,
    })),
  };
}

export async function buscarPixabay({ q, tipo, pagina, orientacao }, chave, fetcher = fetch) {
  const p = new URLSearchParams({ key: chave, q, lang: "pt", per_page: String(POR_FONTE), page: String(pagina), safesearch: "true" });
  if (tipo === "video") {
    const res = await fetcher(`https://pixabay.com/api/videos/?${p}`);
    if (!res.ok) throw new Error(`Pixabay respondeu ${res.status}`);
    const d = await res.json();
    return {
      total: d.totalHits ?? 0,
      itens: (d.hits ?? []).map((v) => {
        const vs = v.videos ?? {};
        const medio = vs.medium ?? vs.small ?? vs.tiny;
        const grande = vs.large?.url ? vs.large : medio;
        return finalizar({
          fonte: "pixabay", tipo: "video", id: `pixabay-v-${v.id}`, titulo: v.tags || "vídeo",
          autor: v.user, autor_url: `https://pixabay.com/users/${v.user}-${v.user_id}/`, url_pagina: v.pageURL,
          largura: grande?.width ?? medio?.width, altura: grande?.height ?? medio?.height, duracao_seg: v.duration ?? null,
          thumb: medio?.thumbnail ?? vs.tiny?.thumbnail, preview: (vs.small ?? medio)?.url, download: grande?.url,
        });
      }),
    };
  }
  p.set("image_type", "photo");
  if (orientPixabay[orientacao]) p.set("orientation", orientPixabay[orientacao]);
  const res = await fetcher(`https://pixabay.com/api/?${p}`);
  if (!res.ok) throw new Error(`Pixabay respondeu ${res.status}`);
  const d = await res.json();
  return {
    total: d.totalHits ?? 0,
    itens: (d.hits ?? []).map((f) => finalizar({
      fonte: "pixabay", tipo: "foto", id: `pixabay-${f.id}`, titulo: f.tags || "foto",
      autor: f.user, autor_url: `https://pixabay.com/users/${f.user}-${f.user_id}/`, url_pagina: f.pageURL,
      largura: f.imageWidth, altura: f.imageHeight, duracao_seg: null,
      thumb: f.webformatURL, preview: f.largeImageURL ?? f.webformatURL, download: f.largeImageURL,
    })),
  };
}

const FONTES = {
  pexels: { env: "PEXELS_API_KEY", buscar: buscarPexels },
  unsplash: { env: "UNSPLASH_ACCESS_KEY", buscar: buscarUnsplash },
  pixabay: { env: "PIXABAY_API_KEY", buscar: buscarPixabay },
};

/** intercala os resultados das fontes (1 de cada por vez) para a grade ficar misturada */
export function intercalar(listas) {
  const out = [];
  const max = Math.max(0, ...listas.map((l) => l.length));
  for (let i = 0; i < max; i++) for (const l of listas) if (l[i]) out.push(l[i]);
  return out;
}

export async function buscar(params, env = process.env, fetcher = fetch) {
  const nomes = params.fonte && params.fonte !== "todas" ? [params.fonte] : Object.keys(FONTES);
  const fontes = {};
  const listas = await Promise.all(
    nomes.map(async (nome) => {
      const f = FONTES[nome];
      if (!f) { fontes[nome] = { ok: false, erro: "fonte desconhecida" }; return []; }
      const chave = env[f.env];
      if (!chave) { fontes[nome] = { ok: false, erro: `sem chave (${f.env} não configurada na Vercel)` }; return []; }
      try {
        const r = await f.buscar(params, chave, fetcher);
        fontes[nome] = { ok: true, total: r.total, ...(r.aviso ? { aviso: r.aviso } : {}) };
        return r.itens;
      } catch (e) {
        fontes[nome] = { ok: false, erro: String(e.message ?? e) };
        return [];
      }
    }),
  );
  return { consulta: params.q, tipo: params.tipo, pagina: params.pagina, fontes, resultados: intercalar(listas) };
}

function json(corpo, status = 200, cache = "no-store") {
  return new Response(JSON.stringify(corpo), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": cache, "access-control-allow-origin": "*" },
  });
}

export async function GET(request) {
  const u = new URL(request.url);

  // registrar download no Unsplash (exigência das diretrizes da API)
  const loc = u.searchParams.get("unsplash_download");
  if (loc) {
    const chave = process.env.UNSPLASH_ACCESS_KEY;
    if (!chave || !loc.startsWith("https://api.unsplash.com/")) return json({ ok: false }, 400);
    const r = await fetch(loc, { headers: { Authorization: `Client-ID ${chave}` } });
    return json({ ok: r.ok }, r.ok ? 200 : 502);
  }

  const q = (u.searchParams.get("q") ?? "").trim().slice(0, 100);
  if (!q) return json({ erro: "use ?q=termo de busca" }, 400);
  const params = {
    q,
    tipo: u.searchParams.get("tipo") === "video" ? "video" : "foto",
    fonte: u.searchParams.get("fonte") ?? "todas",
    pagina: Math.max(1, Math.min(20, Number(u.searchParams.get("pagina")) || 1)),
    orientacao: u.searchParams.get("orientacao") ?? "horizontal",
  };
  const r = await buscar(params);
  // só guarda em cache quando todas as fontes pedidas responderam (evita cachear "sem chave" ou erro)
  const tudoOk = Object.values(r.fontes).every((f) => f.ok);
  return json(r, 200, tudoOk ? "public, s-maxage=3600, stale-while-revalidate=86400" : "no-store");
}
