"use client";

import { proporcao } from "@/lib/proporcao";

import Fuse from "fuse.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CORES, NOME_CATEGORIA, NOME_NICHO, familia, midia, nomeSegmento, type Ref } from "@/lib/dados";
import Card from "./Card";
import Detalhe from "./Detalhe";
import Topo from "./Topo";

export function useColunas() {
  const [n, setN] = useState(4);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setN(w < 640 ? 1 : w < 960 ? 2 : w < 1280 ? 3 : 4);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return n;
}

type Ordem = "destaque" | "recentes" | "az";
const ORDENS: { id: Ordem; nome: string }[] = [
  { id: "destaque", nome: "Destaque" },
  { id: "recentes", nome: "Recentes" },
  { id: "az", nome: "A–Z" },
];
const PESO_CONFIANCA = { alta: 0, media: 1, baixa: 2 } as const;

export function Hero({ selo, linha1, destaque, sub, cta, onCta }: { selo: string; linha1: React.ReactNode; destaque: string; sub: string; cta: string; onCta: () => void }) {
  return (
    <section className="hero">
      <span className="selo">{selo}</span>
      <h1>
        <span>{linha1}</span>
        <span className="gradiente">{destaque}</span>
      </h1>
      <p>{sub}</p>
      <button className="cta" onClick={onCta}>
        {cta} <span aria-hidden>→</span>
      </button>
    </section>
  );
}

/** Linha de pílulas com rolagem horizontal e seta à direita, como uma barra de categorias. */
export function Pilulas({ children }: { children: React.ReactNode }) {
  const trilho = useRef<HTMLDivElement>(null);
  const [fim, setFim] = useState(false);
  const checar = () => {
    const t = trilho.current;
    if (t) setFim(t.scrollLeft + t.clientWidth >= t.scrollWidth - 4);
  };
  useEffect(checar, [children]);
  return (
    <div className="grupo-pilulas rolavel">
      <div className="trilho" ref={trilho} onScroll={checar}>
        {children}
      </div>
      {!fim && (
        <button className="seta" aria-label="Mais categorias" onClick={() => trilho.current?.scrollBy({ left: 260, behavior: "smooth" })}>
          <svg viewBox="0 0 24 24" aria-hidden><path d="M9 6l6 6-6 6" /></svg>
        </button>
      )}
    </div>
  );
}

export default function Biblioteca({
  refs,
  receitas,
  area,
}: {
  refs: Ref[];
  receitas: Record<string, string>;
  area: "edicao" | "site";
}) {
  const ehSite = area === "site";
  const [ordem, setOrdem] = useState<Ordem>("destaque");
  const [segmento, setSegmento] = useState("todos");
  const [busca, setBusca] = useState("");
  const [buscaAberta, setBuscaAberta] = useState(false);
  const [nicho, setNicho] = useState("todos");
  const [categoria, setCategoria] = useState("todas");
  const [tipo, setTipo] = useState("todos");
  const [cor, setCor] = useState<string | null>(null);
  const [tags, setTags] = useState<Set<string>>(new Set());
  const [maisFiltros, setMaisFiltros] = useState(false);
  const [aberto, setAberto] = useState<string | null>(null);
  const colunas = useColunas();
  const buscaRef = useRef<HTMLInputElement>(null);
  const filtrosRef = useRef<HTMLDivElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(refs, {
        threshold: 0.38,
        ignoreLocation: true,
        keys: [
          { name: "titulo", weight: 3 },
          { name: "tags", weight: 2.5 },
          { name: "id", weight: 2 },
          { name: "subcategoria", weight: 1.5 },
          { name: "quando_usar", weight: 1.2 },
          { name: "descricao", weight: 1 },
          { name: "tecnica.como_e_feito", weight: 0.8 },
          { name: "tecnica.efeitos", weight: 1 },
          { name: "mood", weight: 1 },
        ],
      }),
    [refs],
  );

  const categoriasPresentes = useMemo(() => {
    const c = new Map<string, number>();
    refs.forEach((r) => c.set(r.categoria, (c.get(r.categoria) ?? 0) + 1));
    return [...c.entries()].sort((a, b) => b[1] - a[1]);
  }, [refs]);

  const tagsPopulares = useMemo(() => {
    const c = new Map<string, number>();
    refs.forEach((r) => r.tags.forEach((t) => c.set(t, (c.get(t) ?? 0) + 1)));
    return [...c.entries()].filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1]).slice(0, 24).map(([t]) => t);
  }, [refs]);

  const segmentos = useMemo(() => {
    const c = new Map<string, number>();
    refs.forEach((r) => r.subcategoria && c.set(r.subcategoria, (c.get(r.subcategoria) ?? 0) + 1));
    return [...c.entries()].sort((a, b) => b[1] - a[1]);
  }, [refs]);

  const filtradas = useMemo(() => {
    const comBusca = !!busca.trim();
    const base = comBusca ? fuse.search(busca.trim()).map((x) => x.item) : refs;
    const lista = base.filter(
      (r) =>
        (ehSite || nicho === "todos" || r.nicho === nicho || r.nicho === "ambos") &&
        (!ehSite || segmento === "todos" || r.subcategoria === segmento) &&
        (categoria === "todas" || r.categoria === categoria) &&
        (tipo === "todos" || (tipo === "video" ? r.tipo_midia !== "imagem" : r.tipo_midia === "imagem")) &&
        (!cor || r.tecnica.cores_hex.some((h) => familia(h) === cor)) &&
        [...tags].every((t) => r.tags.includes(t)),
    );
    if (comBusca && ordem === "destaque") return lista; // mantém a relevância da busca
    const ord = [...lista];
    if (ordem === "az") ord.sort((a, b) => a.titulo.localeCompare(b.titulo, "pt-BR"));
    else if (ordem === "recentes") ord.sort((a, b) => b.catalogado_em.localeCompare(a.catalogado_em) || b.id.localeCompare(a.id));
    else
      ord.sort(
        (a, b) =>
          PESO_CONFIANCA[a.confianca] - PESO_CONFIANCA[b.confianca] ||
          Number(a.tipo_midia === "imagem") - Number(b.tipo_midia === "imagem") ||
          b.id.localeCompare(a.id),
      );
    return ord;
  }, [refs, fuse, busca, nicho, categoria, tipo, cor, tags, ehSite, segmento, ordem]);

  // masonry: cada card vai para a coluna mais curta (altura estimada pela proporção + legenda)
  const grade = useMemo(() => {
    const cols: Ref[][] = Array.from({ length: colunas }, () => []);
    const alturas = new Array(colunas).fill(0);
    filtradas.forEach((r) => {
      const i = alturas.indexOf(Math.min(...alturas));
      cols[i].push(r);
      alturas[i] += proporcao(r.media.altura, r.media.largura) + 0.16;
    });
    return cols;
  }, [filtradas, colunas]);

  const abrir = useCallback((id: string | null) => {
    setAberto(id);
    window.history.pushState({ ref: id }, "", id ? `?ref=${id}` : window.location.pathname);
    if (id) requestAnimationFrame(() => document.getElementById("painel")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }, []);

  useEffect(() => {
    const ler = () => setAberto(new URLSearchParams(window.location.search).get("ref"));
    ler();
    window.addEventListener("popstate", ler);
    return () => window.removeEventListener("popstate", ler);
  }, []);

  const indiceAberto = aberto ? filtradas.findIndex((r) => r.id === aberto) : -1;
  const refAberta = aberto ? refs.find((r) => r.id === aberto) ?? null : null;
  const navegar = useCallback(
    (passo: number) => {
      if (indiceAberto < 0 || !filtradas.length) return;
      const prox = filtradas[(indiceAberto + passo + filtradas.length) % filtradas.length];
      setAberto(prox.id);
      window.history.replaceState({ ref: prox.id }, "", `?ref=${prox.id}`);
    },
    [indiceAberto, filtradas],
  );

  const focarBusca = useCallback(() => {
    setBuscaAberta(true);
    requestAnimationFrame(() => {
      buscaRef.current?.focus();
      buscaRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, []);

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      const digitando = document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLSelectElement;
      if (e.key === "/" && !digitando) {
        e.preventDefault();
        focarBusca();
      }
      if (e.key === "Escape") {
        if (maisFiltros) setMaisFiltros(false);
        else if (aberto) abrir(null);
      }
      if (!aberto || digitando) return;
      if (e.key === "ArrowRight") navegar(1);
      if (e.key === "ArrowLeft") navegar(-1);
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [aberto, abrir, navegar, focarBusca, maisFiltros]);

  // fecha o painel "Filtros" ao clicar fora
  useEffect(() => {
    if (!maisFiltros) return;
    const fora = (e: MouseEvent) => !filtrosRef.current?.contains(e.target as Node) && setMaisFiltros(false);
    document.addEventListener("mousedown", fora);
    return () => document.removeEventListener("mousedown", fora);
  }, [maisFiltros]);

  const alternarTag = (t: string) =>
    setTags((s) => {
      const n = new Set(s);
      if (n.has(t)) n.delete(t);
      else n.add(t);
      return n;
    });

  const limpar = () => {
    setBusca("");
    setNicho("todos");
    setSegmento("todos");
    setCategoria("todas");
    setTipo("todos");
    setCor(null);
    setTags(new Set());
  };
  const extras = (tipo !== "todos" ? 1 : 0) + (cor ? 1 : 0) + tags.size;
  const temFiltro = busca || nicho !== "todos" || segmento !== "todos" || categoria !== "todas" || extras > 0;
  const videos = refs.filter((r) => r.tipo_midia !== "imagem").length;

  return (
    <>
      <Topo
        ativo={ehSite ? "sites" : "edicao"}
        onBuscar={focarBusca}
        numeros={
          <>
            <b>{refs.length}</b> refs · <b>{videos}</b> vídeos
          </>
        }
      />

      {ehSite ? (
        <Hero
          selo="Referências de sites"
          linha1={<>Ideias para o seu</>}
          destaque="Próximo site"
          sub="Heros, landing pages, e-commerce e mockups organizados por categoria e segmento. Abra, estude a técnica e recrie."
          cta="Buscar referência"
          onCta={focarBusca}
        />
      ) : (
        <Hero
          selo="Biblioteca do canal"
          linha1={
            <>
              Edite <em>como</em> um
            </>
          }
          destaque="Documentário"
          sub="Transições, tipografia, mapas, arquivo e texturas para documentário e notícia. Cada referência com técnica, paleta e quando usar."
          cta="Buscar referência"
          onCta={focarBusca}
        />
      )}

      {(buscaAberta || busca) && (
        <div className="busca-wrap">
          <label className="busca">
            <svg viewBox="0 0 24 24" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input
              ref={buscaRef}
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onBlur={() => !busca && setBuscaAberta(false)}
              placeholder={ehSite ? "Buscar estilo de site… (hero com produto, comida, 3D)" : "Buscar técnica, efeito, mood… (film burn, mapa, tarja vermelha)"}
              aria-label="Buscar referências"
            />
            {busca ? (
              <button className="busca-limpar" onClick={() => setBusca("")} aria-label="Limpar busca">✕</button>
            ) : (
              <kbd>/</kbd>
            )}
          </label>
        </div>
      )}

      <section className="filtros" aria-label="Filtros">
        <div className="grupo-pilulas">
          {ORDENS.map((o) => (
            <button key={o.id} className={`pilula ${ordem === o.id ? "ativa" : ""}`} aria-pressed={ordem === o.id} onClick={() => setOrdem(o.id)}>
              {o.nome}
            </button>
          ))}
        </div>

        <Pilulas>
          <button className={`pilula ${categoria === "todas" ? "ativa" : ""}`} onClick={() => setCategoria("todas")}>
            Todas
          </button>
          {categoriasPresentes.map(([c, n]) => (
            <button key={c} className={`pilula ${categoria === c ? "ativa" : ""}`} onClick={() => setCategoria(c)} title={`${n} refs`}>
              {NOME_CATEGORIA[c] ?? c}
            </button>
          ))}
        </Pilulas>

        <div className="filtros-dir">
          <div className="selecao">
            {ehSite ? (
              <select value={segmento} onChange={(e) => setSegmento(e.target.value)} aria-label="Segmento">
                <option value="todos">Segmento</option>
                {segmentos.map(([sg, n]) => (
                  <option key={sg} value={sg}>
                    {nomeSegmento(sg)} ({n})
                  </option>
                ))}
              </select>
            ) : (
              <select value={nicho} onChange={(e) => setNicho(e.target.value)} aria-label="Nicho">
                <option value="todos">Nicho</option>
                <option value="documentario">{NOME_NICHO.documentario}</option>
                <option value="noticia">{NOME_NICHO.noticia}</option>
              </select>
            )}
            <svg viewBox="0 0 24 24" aria-hidden><path d="M7 10l5 5 5-5" /></svg>
          </div>

          <div className="pop-wrap" ref={filtrosRef}>
            <button className={`selecao botao ${extras ? "com-filtro" : ""}`} onClick={() => setMaisFiltros((v) => !v)} aria-expanded={maisFiltros}>
              Filtros{extras ? <b>{extras}</b> : null}
              <svg viewBox="0 0 24 24" aria-hidden><path d="M7 10l5 5 5-5" /></svg>
            </button>
            {maisFiltros && (
              <div className="pop" role="dialog" aria-label="Mais filtros">
                <h5>Mídia</h5>
                <div className="pop-linha">
                  {(["todos", "video", "imagem"] as const).map((t) => (
                    <button key={t} className={`pilula pequena ${tipo === t ? "ativa" : ""}`} onClick={() => setTipo(t)}>
                      {t === "todos" ? "Todas" : t === "video" ? "Vídeo" : "Imagem"}
                    </button>
                  ))}
                </div>
                <h5>Cor</h5>
                <div className="pop-linha">
                  {CORES.map((c) => (
                    <button
                      key={c.id}
                      className={`cor ${cor === c.id ? "ativa" : ""}`}
                      style={{ background: c.amostra }}
                      title={c.nome}
                      aria-label={c.nome}
                      aria-pressed={cor === c.id}
                      onClick={() => setCor(cor === c.id ? null : c.id)}
                    />
                  ))}
                </div>
                <h5>Tags</h5>
                <div className="pop-linha tags">
                  {tagsPopulares.map((t) => (
                    <button key={t} className={`tag ${tags.has(t) ? "ativa" : ""}`} onClick={() => alternarTag(t)}>
                      #{t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {temFiltro ? (
        <div className="resultado">
          <b>{filtradas.length}</b> de {refs.length}
          <button onClick={limpar}>Limpar filtros</button>
        </div>
      ) : null}

      <main className="grade-wrap">
        {refAberta && (
          <section id="painel" className="painel" key={refAberta.id} aria-label={refAberta.titulo}>
            <div className="painel-midia">
              {refAberta.tipo_midia === "imagem" ? (
                <img src={midia(refAberta)} alt={refAberta.titulo} />
              ) : (
                <video src={midia(refAberta)} controls autoPlay muted loop playsInline />
              )}
              <button className="painel-voltar" onClick={() => abrir(null)} aria-label="Fechar (Esc)">
                <svg viewBox="0 0 24 24" aria-hidden><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
              </button>
            </div>
            <aside className="painel-lado">
              <div className="painel-cabeca">
                <h2>{refAberta.titulo}</h2>
                <p className="painel-cat">
                  {NOME_CATEGORIA[refAberta.categoria] ?? refAberta.categoria}
                  {refAberta.subcategoria ? ` · ${refAberta.area === "site" ? nomeSegmento(refAberta.subcategoria) : refAberta.subcategoria}` : ""}
                </p>
                <p className="painel-desc">{refAberta.descricao}</p>
                <div className="painel-acoes">
                  <a className="botao-claro" href={`/ref/${refAberta.id}/`}>
                    Abrir página
                  </a>
                  <button className="botao-escuro" onClick={() => navegar(-1)} aria-label="Anterior (←)">←</button>
                  <button className="botao-escuro" onClick={() => navegar(1)} aria-label="Próxima (→)">→</button>
                </div>
                <p className="painel-pos">
                  {refAberta.id}
                  {indiceAberto >= 0 ? ` · ${indiceAberto + 1} de ${filtradas.length}` : ""}
                </p>
              </div>
              <Detalhe
                r={refAberta}
                receitas={receitas}
                semMidia
                onTag={(t) => {
                  abrir(null);
                  setTags(new Set([t]));
                }}
              />
            </aside>
          </section>
        )}

        <div className="grade" style={{ gridTemplateColumns: `repeat(${colunas}, minmax(0, 1fr))` }}>
          {grade.map((col, ci) => (
            <div key={ci} className="coluna">
              {col.map((r) => (
                <Card key={r.id} r={r} ativo={r.id === aberto} onAbrir={() => abrir(r.id)} />
              ))}
            </div>
          ))}
        </div>
        {filtradas.length === 0 && (
          <div className="vazio">
            <p>Nenhuma referência com esses filtros.</p>
            <button className="botao-claro" onClick={limpar}>
              Limpar filtros
            </button>
          </div>
        )}
      </main>

      <footer className="rodape">
        <span>© InDeep · {ehSite ? "referências de sites" : "referências de edição"} de terceiros, para estudo de técnica</span>
        <span>
          <kbd>/</kbd> buscar · <kbd>←</kbd> <kbd>→</kbd> navegar · <kbd>Esc</kbd> fechar
        </span>
      </footer>
    </>
  );
}
