"use client";

import { useEffect, useState } from "react";
import { abrirNoClaude, copiarParaClaude, textoDeVarios, type Anexo } from "@/lib/claude";
import { cesta, useCesta } from "@/lib/cesta";

/* aviso flutuante simples, compartilhado */
let mostrarAviso: (t: string, a?: Anexo[]) => void = () => {};

export function Aviso() {
  const [msg, setMsg] = useState<{ t: string; a?: Anexo[] } | null>(null);
  useEffect(() => {
    let tempo: ReturnType<typeof setTimeout>;
    mostrarAviso = (t, a) => {
      setMsg({ t, a });
      clearTimeout(tempo);
      tempo = setTimeout(() => setMsg(null), 6000);
    };
  }, []);
  if (!msg) return null;
  return (
    <div className="aviso-flutuante" role="status">
      <span>{msg.t}</span>
      {msg.a && (
        <button
          onClick={() => {
            navigator.clipboard?.writeText(textoDeVarios(msg.a!)).catch(() => {});
            setMsg({ t: "Só o texto copiado. Cole na conversa." });
          }}
        >
          Copiar só o texto
        </button>
      )}
    </div>
  );
}

const IconeClaude = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="icone-claude">
    <path d="M12 2.5l1.6 6.1 6.1-2.4-4.3 4.9 5.6 3.2-6.4.4.6 6.5L12 16l-3.2 5.2.6-6.5-6.4-.4 5.6-3.2-4.3-4.9 6.1 2.4z" />
  </svg>
);

async function enviar(itens: Anexo[]) {
  try {
    const como = await copiarParaClaude(itens);
    mostrarAviso(
      como === "imagem"
        ? "Copiado com imagem. Cole (Ctrl+V) na conversa com o Claude."
        : `Copiado${itens.length > 1 ? ` (${itens.length} refs)` : ""}. Cole (Ctrl+V) na conversa com o Claude.`,
      como === "imagem" ? itens : undefined,
    );
  } catch {
    mostrarAviso("O navegador bloqueou a cópia. Use “Abrir no Claude”.");
  }
}

/** Botões do painel de uma referência: copiar para a conversa, abrir conversa nova, marcar na seleção. */
export function BotoesClaude({ anexo }: { anexo: Anexo }) {
  const sel = useCesta();
  const marcado = sel.some((x) => x.id === anexo.id);
  return (
    <div className="botoes-claude">
      <button className="botao-claude" onClick={() => enviar([anexo])} title="Copia imagem + ficha; depois é só colar na conversa">
        <IconeClaude /> Anexar no Claude
      </button>
      <div className="botoes-claude-linha">
        <button className="botao-escuro" onClick={() => abrirNoClaude([anexo])} title="Abre uma conversa nova no claude.ai já com a ficha">
          Nova conversa ↗
        </button>
        <button className={`botao-escuro ${marcado ? "marcado" : ""}`} onClick={() => cesta.alternar(anexo)} aria-pressed={marcado}>
          {marcado ? "✓ Na seleção" : "+ Seleção"}
        </button>
      </div>
    </div>
  );
}

/** Botão pequeno no card: marca/desmarca na seleção. */
export function MarcarCard({ anexo }: { anexo: Anexo }) {
  const sel = useCesta();
  const marcado = sel.some((x) => x.id === anexo.id);
  return (
    <button
      className={`card-marcar ${marcado ? "marcado" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        cesta.alternar(anexo);
      }}
      aria-pressed={marcado}
      aria-label={marcado ? "Tirar da seleção para o Claude" : "Adicionar à seleção para o Claude"}
      title={marcado ? "Na seleção para o Claude" : "Adicionar à seleção para o Claude"}
    >
      {marcado ? "✓" : "+"}
    </button>
  );
}

/** Barra fixa embaixo quando há itens selecionados. */
export function BarraSelecao() {
  const sel = useCesta();
  if (!sel.length) return <Aviso />;
  return (
    <>
      <Aviso />
      <div className="barra-selecao" role="region" aria-label="Seleção para o Claude">
        <span className="barra-selecao-n">
          <IconeClaude /> <b>{sel.length}</b> {sel.length === 1 ? "selecionada" : "selecionadas"}
          <small>{sel.map((x) => x.id).slice(0, 6).join(" · ")}{sel.length > 6 ? " …" : ""}</small>
        </span>
        <button className="botao-claude" onClick={() => enviar(sel)}>Anexar no Claude</button>
        <button className="botao-escuro" onClick={() => abrirNoClaude(sel)}>Nova conversa ↗</button>
        <button className="botao-escuro" onClick={() => cesta.limpar()} aria-label="Limpar seleção">Limpar</button>
      </div>
    </>
  );
}
