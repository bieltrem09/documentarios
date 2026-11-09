"use client";

import { proporcao } from "@/lib/proporcao";

import { useRef, useState } from "react";
import { NOME_CATEGORIA, midia, poster, type Ref } from "@/lib/dados";

export default function Card({ r, onAbrir }: { r: Ref; onAbrir: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);
  const ehVideo = r.tipo_midia !== "imagem";
  const prop = proporcao(r.media.altura, r.media.largura);

  const entrar = () => {
    if (!video.current) return;
    setTocando(true);
    video.current.play().catch(() => {});
  };
  const sair = () => {
    setTocando(false);
    video.current?.pause();
  };

  return (
    <article className="card" onMouseEnter={entrar} onMouseLeave={sair}>
      <button className="card-botao" onClick={onAbrir} onFocus={entrar} onBlur={sair} aria-label={`Abrir ${r.id}: ${r.titulo}`}>
        <div className="card-midia" style={{ aspectRatio: `1 / ${prop}` }}>
          {ehVideo ? (
            <video ref={video} src={midia(r)} poster={poster(r)} muted loop playsInline preload="none" />
          ) : (
            <img src={midia(r)} alt={r.titulo} loading="lazy" />
          )}
          <div className="card-topo">
            <span className="card-id">{r.id}</span>
            {ehVideo && (
              <span className={`card-play ${tocando ? "tocando" : ""}`}>
                ▶ {r.media.duracao_seg ? `${Math.round(r.media.duracao_seg)}s` : ""}
              </span>
            )}
          </div>
        </div>
        <div className="card-info">
          <span className="card-cat">{NOME_CATEGORIA[r.categoria] ?? r.categoria}</span>
          <h3>{r.titulo}</h3>
        </div>
      </button>
    </article>
  );
}
