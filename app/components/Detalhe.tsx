"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { NOME_CATEGORIA, NOME_DIFICULDADE, NOME_NICHO, contactSheet, midia, type Ref } from "@/lib/dados";

const EASE = [0.16, 1, 0.3, 1] as const;

const item = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.12 + i * 0.06, ease: EASE } }),
};

function Bloco({ i, titulo, children }: { i: number; titulo: string; children: React.ReactNode }) {
  return (
    <motion.section className="bloco" variants={item} custom={i} initial="hidden" animate="show">
      <h4>{titulo}</h4>
      {children}
    </motion.section>
  );
}

export default function Detalhe({
  r,
  receitas,
  onTag,
}: {
  r: Ref;
  receitas: Record<string, string>;
  onTag?: (t: string) => void;
  compartilhado?: boolean;
}) {
  const [copiado, setCopiado] = useState<string | null>(null);
  const [zoom, setZoom] = useState(false);
  const cs = contactSheet(r);
  const copiar = (txt: string) => {
    navigator.clipboard?.writeText(txt).catch(() => {});
    setCopiado(txt);
    setTimeout(() => setCopiado(null), 1200);
  };
  const t = r.tecnica;

  return (
    <div className="detalhe">
      <motion.div
        className={`detalhe-midia ${r.media.altura > r.media.largura ? "vertical" : ""}`}
        initial={{ opacity: 0, scale: 0.97, clipPath: "inset(8% 8% 8% 8% round 18px)" }}
        animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 14px)" }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {r.tipo_midia === "imagem" ? (
          <img src={midia(r)} alt={r.titulo} />
        ) : (
          <video src={midia(r)} controls autoPlay muted loop playsInline />
        )}
      </motion.div>

      <div className="detalhe-corpo">
        <motion.div className="detalhe-cabeca" variants={item} custom={0} initial="hidden" animate="show">
          <div className="detalhe-meta">
            <button className="pill id" onClick={() => copiar(r.id)} title="Copiar ID">
              {copiado === r.id ? "copiado ✓" : r.id}
            </button>
            <span className="pill">{NOME_NICHO[r.nicho]}</span>
            <span className="pill destaque">{NOME_CATEGORIA[r.categoria] ?? r.categoria}</span>
            {r.subcategoria && <span className="pill">{r.subcategoria}</span>}
          </div>
          <h2>{r.titulo}</h2>
          <p className="descricao">{r.descricao}</p>
        </motion.div>

        <Bloco i={1} titulo="Quando usar">
          <p>{r.quando_usar}</p>
        </Bloco>

        <Bloco i={2} titulo="Como é feito">
          <p>{t.como_e_feito}</p>
          <dl className="ficha">
            {t.duracao_seg != null && (<><dt>Duração do efeito</dt><dd>{t.duracao_seg}s</dd></>)}
            {t.easing && (<><dt>Easing</dt><dd>{t.easing}</dd></>)}
            <dt>Dificuldade</dt><dd>{NOME_DIFICULDADE[r.dificuldade]}</dd>
            <dt>Confiança</dt><dd>{r.confianca}</dd>
          </dl>
        </Bloco>

        {t.cores_hex.length > 0 && (
          <Bloco i={3} titulo="Paleta (clique para copiar)">
            <div className="paleta">
              {t.cores_hex.map((c, i) => (
                <motion.button
                  key={c}
                  onClick={() => copiar(c)}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.07, ease: EASE }}
                  whileHover={{ y: -4 }}
                >
                  <i style={{ background: c }} />
                  <span>{copiado === c ? "copiado" : c}</span>
                </motion.button>
              ))}
            </div>
          </Bloco>
        )}

        {(t.efeitos.length > 0 || t.fontes.length > 0) && (
          <Bloco i={4} titulo="Efeitos e fontes">
            <div className="lista-chips">
              {t.efeitos.map((e) => (<span key={e} className="pill">{e}</span>))}
            </div>
            {t.fontes.length > 0 && <ul className="fontes">{t.fontes.map((f) => (<li key={f}>{f}</li>))}</ul>}
          </Bloco>
        )}

        <Bloco i={5} titulo="Mood e tags">
          <div className="lista-chips">
            {r.mood.map((m) => (<span key={m} className="pill mood">{m}</span>))}
            {r.tags.map((tg) =>
              onTag ? (
                <button key={tg} className="pill tag" onClick={() => onTag(tg)}>#{tg}</button>
              ) : (
                <span key={tg} className="pill tag">#{tg}</span>
              ),
            )}
          </div>
        </Bloco>

        {cs && (
          <Bloco i={6} titulo="Contact sheet (keyframes)">
            <motion.img
              src={cs}
              alt={`Keyframes de ${r.id}`}
              className={`contact ${zoom ? "zoom" : ""}`}
              onClick={() => setZoom(!zoom)}
              layout
              transition={{ duration: 0.5, ease: EASE }}
            />
          </Bloco>
        )}

        <Bloco i={7} titulo="Receita">
          {r.receitas.length && r.receitas.some((x) => receitas[x]) ? (
            r.receitas.filter((x) => receitas[x]).map((x) => (<pre key={x} className="receita">{receitas[x]}</pre>))
          ) : (
            <p className="mudo">Receita ainda não escrita (Fase 4).</p>
          )}
        </Bloco>

        <motion.p className="rodape-ref" variants={item} custom={8} initial="hidden" animate="show">
          {r.media.largura}×{r.media.altura}
          {r.media.duracao_seg ? ` · ${r.media.duracao_seg}s` : ""} · {r.media.tamanho_mb} MB · origem: {r.origem.fonte} · catalogado em {r.catalogado_em}
        </motion.p>
      </div>
    </div>
  );
}
