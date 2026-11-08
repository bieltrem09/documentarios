"use client";

import { forwardRef, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { NOME_CATEGORIA, midia, poster, type Ref } from "@/lib/dados";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Props {
  r: Ref;
  ordem: number;
  oculto: boolean;
  onAbrir: () => void;
  onTag: (t: string) => void;
}

const Card = forwardRef<HTMLDivElement, Props>(function Card({ r, ordem, oculto, onAbrir, onTag }, refExterno) {
  const video = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);
  const ehVideo = r.tipo_midia !== "imagem";
  const prop = Math.min(1.6, Math.max(0.42, r.media.altura / r.media.largura));

  // tilt 3D seguindo o mouse
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 220, damping: 20 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 220, damping: 20 });
  const gx = useTransform(mx, (v) => `${v * 100}%`);
  const gy = useTransform(my, (v) => `${v * 100}%`);
  const brilho = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.16), transparent 55%)`;

  const entrar = () => {
    setHover(true);
    video.current?.play().catch(() => {});
  };
  const sair = () => {
    setHover(false);
    mx.set(0.5);
    my.set(0.5);
    video.current?.pause();
  };

  return (
    <motion.article
      ref={refExterno}
      layoutId={`card-${r.id}`}
      className="card"
      initial={{ opacity: 0, y: 40, scale: 0.94, filter: "blur(8px)" }}
      animate={{ opacity: oculto ? 0.25 : 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.9, filter: "blur(6px)", transition: { duration: 0.25 } }}
      transition={{ duration: 0.7, delay: Math.min(ordem * 0.035, 0.7), ease: EASE, layout: { type: "spring", stiffness: 260, damping: 30 } }}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900 }}
      onMouseEnter={entrar}
      onMouseLeave={sair}
      onMouseMove={(e) => {
        const b = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - b.left) / b.width);
        my.set((e.clientY - b.top) / b.height);
      }}
      onFocus={entrar}
      onBlur={sair}
    >
      <button className="card-botao" onClick={onAbrir} aria-label={`Abrir ${r.id}: ${r.titulo}`}>
        <div className="card-midia" style={{ aspectRatio: `1 / ${prop}` }}>
          {ehVideo ? (
            <video
              ref={video}
              src={midia(r)}
              poster={poster(r)}
              muted
              loop
              playsInline
              preload="none"
            />
          ) : (
            <motion.img
              src={midia(r)}
              alt={r.titulo}
              loading="lazy"
              animate={{ scale: hover ? 1.08 : 1 }}
              transition={{ duration: 1.6, ease: EASE }}
            />
          )}
          <motion.div className="card-brilho" style={{ background: brilho }} />
          <div className="card-topo">
            <span className="card-id">{r.id}</span>
            {ehVideo && (
              <span className={`card-play ${hover ? "tocando" : ""}`}>
                {hover ? <i className="eq"><b /><b /><b /></i> : "▶"} {r.media.duracao_seg ? `${Math.round(r.media.duracao_seg)}s` : ""}
              </span>
            )}
          </div>
          <motion.div
            className="card-info"
            initial={false}
            animate={{ y: hover ? 0 : 8, opacity: hover ? 1 : 0.92 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <span className="card-cat">{NOME_CATEGORIA[r.categoria] ?? r.categoria}</span>
            <h3>{r.titulo}</h3>
            <div className="card-cores">
              {r.tecnica.cores_hex.slice(0, 5).map((c) => (
                <i key={c} style={{ background: c }} />
              ))}
            </div>
          </motion.div>
        </div>
      </button>
      <motion.div
        className="card-tags"
        initial={false}
        animate={{ height: hover ? "auto" : 0, opacity: hover ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        {r.tags.slice(0, 5).map((t) => (
          <button key={t} onClick={() => onTag(t)}>#{t}</button>
        ))}
      </motion.div>
    </motion.article>
  );
});

export default Card;
