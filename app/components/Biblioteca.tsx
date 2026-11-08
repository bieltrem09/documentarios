"use client";

import { AnimatePresence, LayoutGroup, MotionConfig, animate, motion, useScroll, useSpring } from "motion/react";
import Fuse from "fuse.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CORES, NOME_CATEGORIA, NOME_NICHO, familia, type Ref } from "@/lib/dados";
import Card from "./Card";
import Detalhe from "./Detalhe";

const EASE = [0.16, 1, 0.3, 1] as const;

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

function Contador({ valor }: { valor: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const c = animate(0, valor, {
      duration: 1.6,
      ease: EASE,
      delay: 0.5,
      onUpdate: (v) => ref.current && (ref.current.textContent = String(Math.round(v))),
    });
    return () => c.stop();
  }, [valor]);
  return <span ref={ref}>0</span>;
}

function Hero({ refs }: { refs: Ref[] }) {
  const letras = "INDEEP".split("");
  const videos = refs.filter((r) => r.tipo_midia !== "imagem").length;
  const cats = new Set(refs.map((r) => r.categoria)).size;
  return (
    <header className="hero">
      <motion.p className="hero-kicker" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
        <span className="rec-dot" /> Biblioteca de referências de edição
      </motion.p>
      <h1 className="hero-titulo" aria-label="InDeep">
        {letras.map((l, i) => (
          <span key={i} className="mascara">
            <motion.span
              initial={{ y: "110%", rotate: 6 }}
              animate={{ y: "0%", rotate: 0 }}
              transition={{ duration: 1.1, delay: 0.1 + i * 0.07, ease: EASE }}
            >
              {l}
            </motion.span>
          </span>
        ))}
      </h1>
      <motion.div
        className="hero-linha"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
      />
      <motion.div className="hero-stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }}>
        <div><strong><Contador valor={refs.length} /></strong><span>referências</span></div>
        <div><strong><Contador valor={videos} /></strong><span>vídeos</span></div>
        <div><strong><Contador valor={cats} /></strong><span>categorias</span></div>
      </motion.div>
    </header>
  );
}

function Letreiro({ itens }: { itens: string[] }) {
  const lista = [...itens, ...itens];
  return (
    <div className="letreiro" aria-hidden>
      <motion.div className="letreiro-trilho" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 40, ease: "linear", repeat: Infinity }}>
        {lista.map((t, i) => (
          <span key={i}>{t} <em>✦</em></span>
        ))}
      </motion.div>
    </div>
  );
}

function Chip({ ativo, onClick, children, grupo }: { ativo: boolean; onClick: () => void; children: React.ReactNode; grupo: string }) {
  return (
    <button className={`chip ${ativo ? "ativo" : ""}`} onClick={onClick} aria-pressed={ativo}>
      {ativo && <motion.span layoutId={`pilula-${grupo}`} className="chip-fundo" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
      <span className="chip-texto">{children}</span>
    </button>
  );
}

export default function Biblioteca({ refs, receitas }: { refs: Ref[]; receitas: Record<string, string> }) {
  const [busca, setBusca] = useState("");
  const [nicho, setNicho] = useState<string>("todos");
  const [categoria, setCategoria] = useState<string>("todas");
  const [tipo, setTipo] = useState<string>("todos");
  const [cor, setCor] = useState<string | null>(null);
  const [tags, setTags] = useState<Set<string>>(new Set());
  const [aberto, setAberto] = useState<string | null>(null);
  const colunas = useColunas();
  const buscaRef = useRef<HTMLInputElement>(null);

  const { scrollYProgress } = useScroll();
  const progresso = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

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
    let base = busca.trim() ? fuse.search(busca.trim()).map((x) => x.item) : refs;
    base = base.filter(
      (r) =>
        (nicho === "todos" || r.nicho === nicho || r.nicho === "ambos") &&
        (categoria === "todas" || r.categoria === categoria) &&
        (tipo === "todos" || (tipo === "video" ? r.tipo_midia !== "imagem" : r.tipo_midia === "imagem")) &&
        (!cor || r.tecnica.cores_hex.some((h) => familia(h) === cor)) &&
        [...tags].every((t) => r.tags.includes(t)),
    );
    return base;
  }, [refs, fuse, busca, nicho, categoria, tipo, cor, tags]);

  // masonry determinístico: cada card vai para a coluna mais curta (altura estimada pela proporção)
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
    const url = id ? `?ref=${id}` : window.location.pathname;
    window.history.pushState({ ref: id }, "", url);
  }, []);

  useEffect(() => {
    const ler = () => setAberto(new URLSearchParams(window.location.search).get("ref"));
    ler();
    window.addEventListener("popstate", ler);
    return () => window.removeEventListener("popstate", ler);
  }, []);

  const indiceAberto = aberto ? filtradas.findIndex((r) => r.id === aberto) : -1;
  const refAberta = aberto ? refs.find((r) => r.id === aberto) ?? null : null;
  const [direcao, setDirecao] = useState(0);
  const navegar = useCallback(
    (passo: number) => {
      if (indiceAberto < 0 || !filtradas.length) return;
      setDirecao(passo);
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
      n.has(t) ? n.delete(t) : n.add(t);
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
  const temFiltro = busca || nicho !== "todos" || categoria !== "todas" || tipo !== "todos" || cor || tags.size;

  return (
    <MotionConfig reducedMotion="user">
      <motion.div className="progresso" style={{ scaleX: progresso }} />
      <Hero refs={refs} />
      <Letreiro itens={categoriasPresentes.map(([c]) => NOME_CATEGORIA[c] ?? c)} />

      <motion.section
        className="barra"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
      >
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
              <Chip key={n} grupo="nicho" ativo={nicho === n} onClick={() => setNicho(n)}>
                {n === "todos" ? "Todos" : NOME_NICHO[n]}
              </Chip>
            ))}
          </div>
          <div className="grupo">
            {(["todos", "video", "imagem"] as const).map((t) => (
              <Chip key={t} grupo="tipo" ativo={tipo === t} onClick={() => setTipo(t)}>
                {t === "todos" ? "Toda mídia" : t === "video" ? "▶ Vídeo" : "▣ Imagem"}
              </Chip>
            ))}
          </div>
          <div className="grupo cores" role="group" aria-label="Filtrar por cor">
            {CORES.map((c) => (
              <motion.button
                key={c.id}
                className={`cor ${cor === c.id ? "ativo" : ""}`}
                style={{ background: c.amostra }}
                title={c.nome}
                aria-label={c.nome}
                aria-pressed={cor === c.id}
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCor(cor === c.id ? null : c.id)}
              />
            ))}
          </div>
        </div>

        <div className="filtros-linha rolavel">
          <Chip grupo="cat" ativo={categoria === "todas"} onClick={() => setCategoria("todas")}>
            Todas <small>{refs.length}</small>
          </Chip>
          {categoriasPresentes.map(([c, n]) => (
            <Chip key={c} grupo="cat" ativo={categoria === c} onClick={() => setCategoria(c)}>
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
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={filtradas.length}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {filtradas.length}
            </motion.span>
          </AnimatePresence>
          &nbsp;de {refs.length} referências
          <AnimatePresence>
            {temFiltro ? (
              <motion.button
                className="limpar"
                onClick={limpar}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
              >
                limpar filtros ✕
              </motion.button>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.section>

      <main className="grade-wrap">
        <LayoutGroup>
          <div className="grade" style={{ gridTemplateColumns: `repeat(${colunas}, minmax(0, 1fr))` }}>
            {grade.map((col, ci) => (
              <div key={ci} className="coluna">
                <AnimatePresence mode="popLayout">
                  {col.map((r, i) => (
                    <Card key={r.id} r={r} ordem={i * colunas + ci} onAbrir={() => abrir(r.id)} onTag={alternarTag} oculto={aberto === r.id} />
                  ))}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </LayoutGroup>

        <AnimatePresence>
          {filtradas.length === 0 && (
            <motion.div className="vazio" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <p>Nenhuma referência com esses filtros.</p>
              <button onClick={limpar}>Limpar filtros</button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="rodape">
        Biblioteca InDeep · referências de terceiros para estudo de técnica · <kbd>/</kbd> busca · <kbd>←</kbd> <kbd>→</kbd> navegar · <kbd>Esc</kbd> fechar
      </footer>

      <AnimatePresence>
        {refAberta && (
          <motion.div
            className="modal-fundo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => abrir(null)}
          >
            <motion.div
              className="modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              role="dialog"
              aria-modal="true"
              aria-label={refAberta.titulo}
            >
              <div className="modal-topo">
                <span className="modal-pos">
                  {indiceAberto >= 0 ? `${indiceAberto + 1} / ${filtradas.length}` : refAberta.id}
                </span>
                <div>
                  <button className="nav" onClick={() => navegar(-1)} aria-label="Anterior">←</button>
                  <button className="nav" onClick={() => navegar(1)} aria-label="Próxima">→</button>
                  <a className="nav" href={`/ref/${refAberta.id}/`} title="Abrir página da referência">↗</a>
                  <button className="nav fechar" onClick={() => abrir(null)} aria-label="Fechar">✕</button>
                </div>
              </div>
              <AnimatePresence mode="wait" custom={direcao}>
                <motion.div
                  key={refAberta.id}
                  custom={direcao}
                  initial={{ opacity: 0, x: direcao * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direcao * -60 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <Detalhe r={refAberta} receitas={receitas} onTag={(t) => { abrir(null); setTags(new Set([t])); }} compartilhado />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
