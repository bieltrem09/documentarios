"use client";

import { proporcao } from "@/lib/proporcao";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Topo from "./Topo";
import { BotoesClaude, MarcarCard } from "./Claude";
import type { Anexo } from "@/lib/claude";

const NOME_F: Record<string, string> = { pexels: "Pexels", unsplash: "Unsplash", pixabay: "Pixabay" };
function anexoDoBanco(r: Resultado): Anexo {
  const texto = [
    `${r.tipo === "video" ? "Vídeo" : "Foto"} gratuito do ${NOME_F[r.fonte]} (banco de imagens InDeep)`,
    `Título: ${r.titulo}`,
    `${r.largura}×${r.altura}${r.duracao_seg ? ` · ${r.duracao_seg}s` : ""}`,
    `Download: ${r.download ?? r.preview ?? r.thumb}`,
    `Página: ${r.url_pagina}`,
    `Licença: ${r.licenca.nome}${r.licenca.credito_obrigatorio ? " (crédito obrigatório)" : ""}`,
    `Crédito: ${r.credito}`,
  ].join("\n");
  return { id: `${r.fonte}-${r.tipo}-${r.id}`, texto, imagem: r.tipo === "foto" ? r.preview ?? r.thumb : r.thumb };
}

interface Resultado {
  fonte: "pexels" | "unsplash" | "pixabay";
  tipo: "foto" | "video";
  id: string;
  titulo: string;
  autor: string;
  autor_url: string | null;
  url_pagina: string;
  largura: number;
  altura: number;
  duracao_seg: number | null;
  thumb: string;
  preview: string | null;
  download: string | null;
  download_location?: string | null;
  licenca: { nome: string; url: string; credito_obrigatorio: boolean };
  credito: string;
}
interface StatusFonte { ok: boolean; total?: number; recebidos?: number; tem_mais?: boolean; termo_usado?: string; erro?: string; aviso?: string }
interface Resposta { resultados: Resultado[]; fontes: Record<string, StatusFonte>; tem_mais: boolean }

const NOME_FONTE: Record<string, string> = { pexels: "Pexels", unsplash: "Unsplash", pixabay: "Pixabay" };
const SUGESTOES = ["pessoas correndo", "cidade à noite", "multidão", "dinheiro", "tribunal", "chuva na janela", "polícia", "computador hacker"];

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

function CardBanco({ r, onAbrir }: { r: Resultado; onAbrir: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const prop = proporcao(r.altura, r.largura);
  return (
    <article
      className="card"
      onMouseEnter={() => video.current?.play().catch(() => {})}
      onMouseLeave={() => video.current?.pause()}
    >
      <div className="card-caixa">
      <button className="card-midia" style={{ aspectRatio: `1 / ${prop}` }} onClick={onAbrir} aria-label={`Abrir ${r.titulo}`}>
        {r.tipo === "video" && r.preview ? (
          <video ref={video} src={r.preview} poster={r.thumb} muted loop playsInline preload="none" />
        ) : (
          <img src={r.thumb} alt={r.titulo} loading="lazy" />
        )}
        {r.tipo === "video" && <span className="card-selo">▶ {r.duracao_seg ? `${r.duracao_seg}s` : ""}</span>}
      </button>
      <MarcarCard anexo={anexoDoBanco(r)} />
      </div>
      <div className="card-info">
        <button className="card-titulo" onClick={onAbrir}>
          <h3>{r.titulo}</h3>
          <span>{NOME_FONTE[r.fonte]}</span>
        </button>
      </div>
    </article>
  );
}

export default function Banco() {
  const [q, setQ] = useState("");
  const [tipo, setTipo] = useState<"foto" | "video">("foto");
  const [fonte, setFonte] = useState("todas");
  const [orientacao, setOrientacao] = useState("horizontal");
  const [pagina, setPagina] = useState(1);
  const [itens, setItens] = useState<Resultado[]>([]);
  const [fontes, setFontes] = useState<Record<string, StatusFonte>>({});
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [buscado, setBuscado] = useState<string | null>(null);
  const [aberto, setAberto] = useState<Resultado | null>(null);
  const [copiado, setCopiado] = useState(false);
  const [comMais, setComMais] = useState<string[]>([]);
  const colunas = useColunas();
  const sentinela = useRef<HTMLDivElement>(null);

  const executar = useCallback(
    async (termo: string, opts: { tipo: string; fonte: string; orientacao: string; pagina: number }, anexar: boolean) => {
      if (!termo.trim()) return;
      setCarregando(true);
      setErro(null);
      const p = new URLSearchParams({ q: termo.trim(), tipo: opts.tipo, fonte: opts.fonte, orientacao: opts.orientacao, pagina: String(opts.pagina) });
      try {
        const res = await fetch(`/api/banco?${p}`);
        if (!res.ok) throw new Error(`a busca respondeu ${res.status}`);
        const d: Resposta = await res.json();
        setItens((atual) => {
          if (!anexar) return d.resultados;
          const ids = new Set(atual.map((a) => a.id));
          return [...atual, ...d.resultados.filter((x) => !ids.has(x.id))];
        });
        // mantém o total de cada fonte da 1ª página; atualiza só quem respondeu agora
        setFontes((atual) => {
          if (!anexar) return d.fontes;
          const n = { ...atual };
          for (const [k, v] of Object.entries(d.fontes)) n[k] = { ...v, total: atual[k]?.total ?? v.total, termo_usado: atual[k]?.termo_usado ?? v.termo_usado };
          return n;
        });
        setComMais(Object.entries(d.fontes).filter(([, v]) => v.tem_mais).map(([k]) => k));
        setBuscado(termo.trim());
        const url = new URLSearchParams({ q: termo.trim(), tipo: opts.tipo });
        window.history.replaceState(null, "", `?${url}`);
      } catch (e) {
        setErro(
          `Não foi possível buscar (${(e as Error).message}). A busca só funciona no site publicado na Vercel, com as chaves das APIs configuradas.`,
        );
      } finally {
        setCarregando(false);
      }
    },
    [],
  );

  // busca inicial vinda da URL (?q=...&tipo=video)
  useEffect(() => {
    const u = new URLSearchParams(window.location.search);
    const termo = u.get("q");
    const t = u.get("tipo") === "video" ? "video" : "foto";
    if (termo) {
      setQ(termo);
      setTipo(t);
      executar(termo, { tipo: t, fonte: "todas", orientacao: "horizontal", pagina: 1 }, false);
    }
  }, [executar]);

  const nova = (termo = q, mud: Partial<{ tipo: "foto" | "video"; fonte: string; orientacao: string }> = {}) => {
    const opts = { tipo: mud.tipo ?? tipo, fonte: mud.fonte ?? fonte, orientacao: mud.orientacao ?? orientacao, pagina: 1 };
    if (mud.tipo) setTipo(mud.tipo);
    if (mud.fonte) setFonte(mud.fonte);
    if (mud.orientacao) setOrientacao(mud.orientacao);
    setPagina(1);
    if (termo.trim()) executar(termo, opts, false);
  };

  const mais = useCallback(() => {
    if (carregando || comMais.length === 0) return;
    const p = pagina + 1;
    setPagina(p);
    // pede a próxima página só das fontes que ainda têm resultados
    executar(buscado ?? q, { tipo, fonte: comMais.join(","), orientacao, pagina: p }, true);
  }, [carregando, comMais, pagina, executar, buscado, q, tipo, orientacao]);

  // rolagem infinita: carrega a próxima página quando o fim da grade aparece
  useEffect(() => {
    const el = sentinela.current;
    if (!el) return;
    const obs = new IntersectionObserver((ent) => ent[0].isIntersecting && mais(), { rootMargin: "1200px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [mais]);

  const grade = useMemo(() => {
    const cols: Resultado[][] = Array.from({ length: colunas }, () => []);
    const alturas = new Array(colunas).fill(0);
    itens.forEach((r) => {
      const prop = proporcao(r.altura, r.largura);
      const i = alturas.indexOf(Math.min(...alturas));
      cols[i].push(r);
      alturas[i] += prop + 0.18;
    });
    return cols;
  }, [itens, colunas]);

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && setAberto(null);
    window.addEventListener("keydown", tecla);
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => window.removeEventListener("keydown", tecla);
  }, [aberto]);

  const baixar = (r: Resultado) => {
    // o Unsplash exige registrar cada download
    if (r.fonte === "unsplash" && r.download_location) {
      fetch(`/api/banco?unsplash_download=${encodeURIComponent(r.download_location)}`).catch(() => {});
    }
    if (r.download) window.open(r.download, "_blank", "noopener");
  };

  const copiarCredito = (r: Resultado) => {
    navigator.clipboard?.writeText(r.credito).catch(() => {});
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1200);
  };

  const semChave = Object.entries(fontes).filter(([, s]) => !s.ok && s.erro?.includes("sem chave"));
  const comErro = Object.entries(fontes).filter(([, s]) => !s.ok && !s.erro?.includes("sem chave"));

  return (
    <>
      <Topo ativo="banco" onBuscar={() => document.getElementById("busca-banco")?.focus()} numeros={<>Pexels · Unsplash · Pixabay</>} />

      <section className="hero hero-banco">
        <span className="selo">Fotos e vídeos gratuitos</span>
        <h1>
          <span>Banco de</span>
          <span className="gradiente">Imagens</span>
        </h1>
        <p>Busca direto no Pexels, Unsplash e Pixabay. Abra, baixe o original e copie o crédito pronto.</p>
        <form
          className="busca busca-hero"
          onSubmit={(e) => {
            e.preventDefault();
            nova();
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input
            id="busca-banco"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="pessoas correndo, cidade à noite, tribunal…"
            aria-label="Buscar no banco de imagens"
            autoFocus
          />
          <button type="submit" className="botao-claro" disabled={carregando}>
            {carregando ? "Buscando…" : "Buscar →"}
          </button>
        </form>
        <div className="sugestoes">
          {SUGESTOES.map((s) => (
            <button
              key={s}
              className="tag"
              onClick={() => {
                setQ(s);
                nova(s);
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      <section className="filtros" aria-label="Filtros">
        <div className="grupo-pilulas">
          {(["foto", "video"] as const).map((t) => (
            <button key={t} className={`pilula ${tipo === t ? "ativa" : ""}`} onClick={() => nova(q, { tipo: t })}>
              {t === "foto" ? "Fotos" : "Vídeos"}
            </button>
          ))}
        </div>
        <div className="grupo-pilulas">
          {["todas", "pexels", "unsplash", "pixabay"].map((f) => (
            <button key={f} className={`pilula ${fonte === f ? "ativa" : ""}`} onClick={() => nova(q, { fonte: f })}>
              {f === "todas" ? "Todas as fontes" : NOME_FONTE[f]}
            </button>
          ))}
        </div>
        <div className="filtros-dir">
          <div className="grupo-pilulas">
            {[["horizontal", "16:9"], ["vertical", "9:16"], ["todas", "Qualquer"]].map(([o, n]) => (
              <button key={o} className={`pilula ${orientacao === o ? "ativa" : ""}`} onClick={() => nova(q, { orientacao: o })}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="resultado">
        {buscado ? (
          <>
            <b>{itens.length.toLocaleString("pt-BR")}</b> carregados de{" "}
            {Object.values(fontes).filter((f) => f.ok).reduce((a, f) => a + (f.total ?? 0), 0).toLocaleString("pt-BR")} para “{buscado}”
            {Object.entries(fontes)
              .filter(([, s]) => s.ok)
              .map(([n, s]) => (
                <em key={n} className="fonte-total">
                  · {NOME_FONTE[n]} {s.total?.toLocaleString("pt-BR")}
                  {s.termo_usado ? ` (busca: “${s.termo_usado}”)` : ""}
                </em>
              ))}
          </>
        ) : (
          "Digite o que procura e aperte Enter. Resultados em 16:9 por padrão."
        )}
      </div>

      <main className="grade-wrap">
        {erro && <div className="aviso">{erro}</div>}
        {semChave.length > 0 && (
          <div className="aviso">
            Fontes sem chave configurada: {semChave.map(([n]) => NOME_FONTE[n]).join(", ")}. Adicione as chaves na Vercel (Settings → Environment Variables).
          </div>
        )}
        {comErro.map(([n, s]) => (
          <div key={n} className="aviso">{NOME_FONTE[n]}: {s.erro}</div>
        ))}

        <div className="grade" style={{ gridTemplateColumns: `repeat(${colunas}, minmax(0, 1fr))` }}>
          {grade.map((col, ci) => (
            <div key={ci} className="coluna">
              {col.map((r) => (
                <CardBanco key={r.id} r={r} onAbrir={() => setAberto(r)} />
              ))}
            </div>
          ))}
        </div>

        {buscado && !carregando && itens.length === 0 && !erro && <div className="vazio"><p>Nada encontrado. Tente outras palavras (em inglês costuma render mais).</p></div>}
        <div ref={sentinela} aria-hidden />
        {itens.length > 0 && (
          <div className="mais">
            {comMais.length > 0 ? (
              <button onClick={mais} disabled={carregando}>{carregando ? "Carregando mais…" : "Carregar mais"}</button>
            ) : (
              <p className="mudo">Fim dos resultados: tudo o que as fontes oferecem para essa busca foi carregado.</p>
            )}
          </div>
        )}
      </main>

      <footer className="rodape">
        Fotos e vídeos gratuitos via APIs do Pexels, Unsplash e Pixabay · confira a licença e dê o crédito quando pedido
      </footer>

      {aberto && (
        <div className="modal-fundo" onClick={() => setAberto(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={aberto.titulo}>
            <div className="modal-topo">
              <span className="modal-pos">{NOME_FONTE[aberto.fonte]} · {aberto.largura}×{aberto.altura}{aberto.duracao_seg ? ` · ${aberto.duracao_seg}s` : ""}</span>
              <div>
                <button className="nav fechar" onClick={() => setAberto(null)} aria-label="Fechar">✕</button>
              </div>
            </div>
            <div className="detalhe modal-conteudo">
              <div className={`detalhe-midia ${aberto.altura > aberto.largura ? "vertical" : ""}`}>
                {aberto.tipo === "video" ? (
                  <video src={aberto.preview ?? aberto.download ?? undefined} poster={aberto.thumb} controls autoPlay muted loop playsInline />
                ) : (
                  <img src={aberto.preview ?? aberto.thumb} alt={aberto.titulo} />
                )}
              </div>
              <div className="detalhe-corpo">
                <div className="detalhe-meta">
                  <span className="pill">{NOME_FONTE[aberto.fonte]}</span>
                  <span className="pill">{aberto.tipo === "video" ? "Vídeo" : "Foto"}</span>
                </div>
                <h2 className="titulo-banco">{aberto.titulo}</h2>
                <p className="descricao">
                  por {aberto.autor_url ? <a href={aberto.autor_url} target="_blank" rel="noreferrer">{aberto.autor}</a> : aberto.autor}
                </p>
                <BotoesClaude anexo={anexoDoBanco(aberto)} />
                <div className="acoes">
                  <button className="botao-claro" onClick={() => baixar(aberto)} disabled={!aberto.download}>Baixar original</button>
                  <a className="botao-escuro" href={aberto.url_pagina} target="_blank" rel="noreferrer">Abrir no {NOME_FONTE[aberto.fonte]}</a>
                  <button className="botao-escuro" onClick={() => copiarCredito(aberto)}>{copiado ? "Crédito copiado ✓" : "Copiar crédito"}</button>
                </div>
                <section className="bloco">
                  <h4>Licença</h4>
                  <p>
                    <a href={aberto.licenca.url} target="_blank" rel="noreferrer">{aberto.licenca.nome}</a>
                    {aberto.licenca.credito_obrigatorio ? " · crédito pedido pela fonte" : " · crédito opcional"}
                  </p>
                  <p className="mudo credito">{aberto.credito}</p>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
