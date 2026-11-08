"use client";

import Fuse from "fuse.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CORES, NOME_CATEGORIA, NOME_NICHO, familia, type Ref } from "@/lib/dados";
import Card from "./Card";
import Detalhe from "./Detalhe";

function useColunas() {
  const [n, setN] = useState(4);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setN(w < 560 ? 1 : w < 900 ? 2 : w < 1350 ? 3 : 4);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return n;
}

function Chip({ ativo, onClick, children }: { ativo: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button className={`chip ${ativo ? "ativo" : ""}`} onClick={onClick} aria-pressed={ativo}>
      {children}
    </button>
  );
}

export default function Biblioteca({ refs, receitas }: { refs: Ref[]; receitas: Record<string, string> }) {
  const [busca, setBusca] = useState("");
  const [nicho, setNicho] = useState("todos");
  const [categoria, setCategoria] = useState("todas");
  const [tipo, setTipo] = useState("todos");
  const [cor, setCor] = useState<string | null>(null);
  const [tags, setTags] = useState<Set<string>>(new Set());
  const [aberto, setAberto] = useState<string | null>(null);
  const colunas = useColunas();
  const buscaRef = useRef<HTMLInputElement>(null);

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
    return [...c.entries()].filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1]).slice(0, 18).map(([t]) => t);
  }, [refs]);

  const filtradas = useMemo(() => {
    const base = busca.trim() ? fuse.search(busca.trim()).map((x) => x.item) : refs;
    return base.filter(
      (r) =>
        (nicho === "todos" || r.nicho === nicho || r.nicho === "ambos") &&
        (categoria === "todas" || r.categoria === categoria) &&
        (tipo === "todos" || (tipo === "video" ? r.tipo_midia !== "imagem" : r.tipo_midia === "imagem")) &&
        (!cor || r.tecnica.cores_hex.some((h) => familia(h) === cor)) &&
        [...tags].every((t) => r.tags.includes(t)),
    );
  }, [refs, fuse, busca, nicho, categoria, tipo, cor, tags]);

  // masonry: cada card vai para a coluna mais curta (altura estimada pela proporção)
  const grade = useMemo(() => {
    const cols: Ref[][] = Array.from({ length: colunas }, () => []);
    const alturas = new Array(colunas).fill(0);
    filtradas.forEach((r) => {
      const prop = Math.min(1.6, Math.max(0.42, r.media.altura / r.media.largura));
      const i = alturas.indexOf(Math.min(...alturas));
      cols[i].push(r);
      alturas[i] += prop + 0.18;
    });
    return cols;
  }, [filtradas, colunas]);

  const abrir = useCallback((id: string | null) => {
    setAberto(id);
    window.history.pushState({ ref: id }, "", id ? `?ref=${id}` : window.location.pathname);
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

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== buscaRef.current) {
        e.preventDefault();
        buscaRef.current?.focus();
      }
      if (!aberto) return;
      if (e.key === "Escape") abrir(null);
      if (e.key === "ArrowRight") navegar(1);
      if (e.key === "ArrowLeft") navegar(-1);
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [aberto, abrir, navegar]);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
  }, [aberto]);

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
    setCategoria("todas");
    setTipo("todos");
    setCor(null);
    setTags(new Set());
  };
  const temFiltro = busca || nicho !== "todos" || categoria !== "todas" || tipo !== "todos" || cor || tags.size > 0;
  const videos = refs.filter((r) => r.tipo_midia !== "imagem").length;

  return (
    <>
      <header className="topo">
        <div className="marca">
          <span className="logo">
            In<b>Deep</b>
          </span>
          <span className="sub">Biblioteca de referências de edição</span>
        </div>
        <p className="numeros">
          <span><strong>{refs.length}</strong> refs</span>
          <span><strong>{videos}</strong> vídeos</span>
          <span><strong>{categoriasPresentes.length}</strong> categorias</span>
        </p>
      </header>

      <section className="barra">
        <div className="busca">
          <svg viewBox="0 0 24 24" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input
            ref={buscaRef}
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar técnica, efeito, mood… (ex.: film burn, mapa, tarja vermelha)"
            aria-label="Buscar referências"
          />
          <kbd>/</kbd>
        </div>

        <div className="filtros-linha">
          <div className="grupo">
            {(["todos", "documentario", "noticia"] as const).map((n) => (
              <Chip key={n} ativo={nicho === n} onClick={() => setNicho(n)}>
                {n === "todos" ? "Todos" : NOME_NICHO[n]}
              </Chip>
            ))}
          </div>
          <div className="grupo">
            {(["todos", "video", "imagem"] as const).map((t) => (
              <Chip key={t} ativo={tipo === t} onClick={() => setTipo(t)}>
                {t === "todos" ? "Toda mídia" : t === "video" ? "Vídeo" : "Imagem"}
              </Chip>
            ))}
          </div>
          <div className="grupo cores" role="group" aria-label="Filtrar por cor">
            {CORES.map((c) => (
              <button
                key={c.id}
                className={`cor ${cor === c.id ? "ativo" : ""}`}
                style={{ background: c.amostra }}
                title={c.nome}
                aria-label={c.nome}
                aria-pressed={cor === c.id}
                onClick={() => setCor(cor === c.id ? null : c.id)}
              />
            ))}
          </div>
        </div>

        <div className="filtros-linha rolavel">
          <Chip ativo={categoria === "todas"} onClick={() => setCategoria("todas")}>
            Todas <small>{refs.length}</small>
          </Chip>
          {categoriasPresentes.map(([c, n]) => (
            <Chip key={c} ativo={categoria === c} onClick={() => setCategoria(c)}>
              {NOME_CATEGORIA[c] ?? c} <small>{n}</small>
            </Chip>
          ))}
        </div>

        <div className="filtros-linha rolavel tags">
          {tagsPopulares.map((t) => (
            <button key={t} className={`tag ${tags.has(t) ? "ativo" : ""}`} onClick={() => alternarTag(t)}>
              #{t}
            </button>
          ))}
        </div>

        <div className="resultado">
          <span>{filtradas.length}</span>&nbsp;de {refs.length} referências
          {temFiltro ? (
            <button className="limpar" onClick={limpar}>
              limpar filtros ✕
            </button>
          ) : null}
        </div>
      </section>

      <main className="grade-wrap">
        <div className="grade" style={{ gridTemplateColumns: `repeat(${colunas}, minmax(0, 1fr))` }}>
          {grade.map((col, ci) => (
            <div key={ci} className="coluna">
              {col.map((r) => (
                <Card key={r.id} r={r} onAbrir={() => abrir(r.id)} />
              ))}
            </div>
          ))}
        </div>
        {filtradas.length === 0 && (
          <div className="vazio">
            <p>Nenhuma referência com esses filtros.</p>
            <button onClick={limpar}>Limpar filtros</button>
          </div>
        )}
      </main>

      <footer className="rodape">
        Biblioteca InDeep · referências de terceiros para estudo de técnica · <kbd>/</kbd> busca · <kbd>←</kbd> <kbd>→</kbd> navegar · <kbd>Esc</kbd> fechar
      </footer>

      {refAberta && (
        <div className="modal-fundo" onClick={() => abrir(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={refAberta.titulo}>
            <div className="modal-topo">
              <span className="modal-pos">{indiceAberto >= 0 ? `${indiceAberto + 1} / ${filtradas.length}` : refAberta.id}</span>
              <div>
                <button className="nav" onClick={() => navegar(-1)} aria-label="Anterior">←</button>
                <button className="nav" onClick={() => navegar(1)} aria-label="Próxima">→</button>
                <a className="nav" href={`/ref/${refAberta.id}/`} title="Abrir página da referência">↗</a>
                <button className="nav fechar" onClick={() => abrir(null)} aria-label="Fechar">✕</button>
              </div>
            </div>
            <div key={refAberta.id} className="modal-conteudo">
              <Detalhe
                r={refAberta}
                receitas={receitas}
                onTag={(t) => {
                  abrir(null);
                  setTags(new Set([t]));
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
