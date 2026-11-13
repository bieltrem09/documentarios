"use client";

import { proporcao } from "@/lib/proporcao";

import { useEffect, useRef, useState } from "react";
import { NOME_CATEGORIA, midia, nomeSegmento, poster, type Ref } from "@/lib/dados";
import { anexoDeRef } from "@/lib/claude";
import { MarcarCard } from "./Claude";

/** Toca vídeos só enquanto estão visíveis na tela (como uma vitrine), pausa fora dela. */
export function useAutoplay() {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (v.preload === "none") v.preload = "auto";
          v.play().catch(() => {});
        } else v.pause();
      },
      { threshold: 0.25 },
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, []);
  return video;
}

export default function Card({ r, onAbrir, ativo }: { r: Ref; onAbrir: () => void; ativo?: boolean }) {
  const video = useAutoplay();
  const [copiado, setCopiado] = useState(false);
  const ehVideo = r.tipo_midia !== "imagem";
  const prop = proporcao(r.media.altura, r.media.largura);
  const rotulo = r.area === "site" && r.subcategoria ? nomeSegmento(r.subcategoria) : NOME_CATEGORIA[r.categoria] ?? r.categoria;

  const copiar = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(r.id).catch(() => {});
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1200);
  };

  return (
    <article className={`card ${ativo ? "ativo" : ""}`}>
      <div className="card-caixa">
      <button className="card-midia" style={{ aspectRatio: `1 / ${prop}` }} onClick={onAbrir} aria-label={`Abrir ${r.id}: ${r.titulo}`}>
        {ehVideo ? (
          <video ref={video} src={midia(r)} poster={poster(r)} muted loop playsInline preload="none" />
        ) : (
          <img src={midia(r)} alt={r.titulo} loading="lazy" />
        )}
      </button>
      <MarcarCard anexo={anexoDeRef(r)} />
      </div>
      <div className="card-info">
        <button className="card-titulo" onClick={onAbrir}>
          <h3>{r.titulo}</h3>
          <span>{rotulo}</span>
        </button>
        <button className="card-acao" onClick={copiar} title={copiado ? "Copiado" : `Copiar ID (${r.id})`} aria-label={`Copiar ID ${r.id}`}>
          {copiado ? (
            <svg viewBox="0 0 24 24" aria-hidden><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden>
              <rect x="8" y="8" width="12" height="12" rx="2.5" />
              <path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8" />
            </svg>
          )}
        </button>
      </div>
    </article>
  );
}
