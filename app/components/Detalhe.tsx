"use client";

import { useState } from "react";
import { NOME_CATEGORIA, NOME_DIFICULDADE, NOME_NICHO, contactSheet, midia, type Ref } from "@/lib/dados";

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="bloco">
      <h4>{titulo}</h4>
      {children}
    </section>
  );
}

export default function Detalhe({
  r,
  receitas,
  onTag,
  semMidia,
}: {
  r: Ref;
  receitas: Record<string, string>;
  onTag?: (t: string) => void;
  /** no painel expandido a mídia fica à esquerda; aqui só o texto */
  semMidia?: boolean;
}) {
  const [copiado, setCopiado] = useState<string | null>(null);
  const cs = contactSheet(r);
  const t = r.tecnica;
  const copiar = (txt: string) => {
    navigator.clipboard?.writeText(txt).catch(() => {});
    setCopiado(txt);
    setTimeout(() => setCopiado(null), 1200);
  };
  const receitasDaRef = r.receitas.filter((x) => receitas[x]);

  return (
    <div className={`detalhe ${semMidia ? "so-texto" : ""}`}>
      {!semMidia && (
      <div className={`detalhe-midia ${r.media.altura > r.media.largura ? "vertical" : ""}`}>
        {r.tipo_midia === "imagem" ? (
          <img src={midia(r)} alt={r.titulo} />
        ) : (
          <video src={midia(r)} controls autoPlay muted loop playsInline />
        )}
      </div>
      )}

      <div className="detalhe-corpo">
        {!semMidia && (
        <div className="detalhe-cabeca">
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
        </div>
        )}

        <Bloco titulo="Quando usar">
          <p>{r.quando_usar}</p>
        </Bloco>

        <Bloco titulo="Como é feito">
          <p>{t.como_e_feito}</p>
          <dl className="ficha">
            {t.duracao_seg != null && (<><dt>Duração do efeito</dt><dd>{t.duracao_seg}s</dd></>)}
            {t.easing && (<><dt>Easing</dt><dd>{t.easing}</dd></>)}
            <dt>Dificuldade</dt><dd>{NOME_DIFICULDADE[r.dificuldade]}</dd>
            <dt>Confiança</dt><dd>{r.confianca}</dd>
          </dl>
        </Bloco>

        {t.cores_hex.length > 0 && (
          <Bloco titulo="Paleta (clique para copiar)">
            <div className="paleta">
              {t.cores_hex.map((c) => (
                <button key={c} onClick={() => copiar(c)}>
                  <i style={{ background: c }} />
                  <span>{copiado === c ? "copiado" : c}</span>
                </button>
              ))}
            </div>
          </Bloco>
        )}

        {(t.efeitos.length > 0 || t.fontes.length > 0) && (
          <Bloco titulo="Efeitos e fontes">
            <div className="lista-chips">
              {t.efeitos.map((e) => (<span key={e} className="pill">{e}</span>))}
            </div>
            {t.fontes.length > 0 && <ul className="fontes">{t.fontes.map((f) => (<li key={f}>{f}</li>))}</ul>}
          </Bloco>
        )}

        <Bloco titulo="Mood e tags">
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
          <Bloco titulo="Contact sheet (keyframes)">
            <a href={cs} target="_blank" rel="noreferrer">
              <img src={cs} alt={`Keyframes de ${r.id}`} className="contact" />
            </a>
          </Bloco>
        )}

        <Bloco titulo="Receita">
          {receitasDaRef.length ? (
            receitasDaRef.map((x) => (<pre key={x} className="receita">{receitas[x]}</pre>))
          ) : (
            <p className="mudo">Receita ainda não escrita (Fase 4).</p>
          )}
        </Bloco>

        <p className="rodape-ref">
          {r.media.largura}×{r.media.altura}
          {r.media.duracao_seg ? ` · ${r.media.duracao_seg}s` : ""} · {r.media.tamanho_mb} MB · origem: {r.origem.fonte} · catalogado em {r.catalogado_em}
        </p>
      </div>
    </div>
  );
}
