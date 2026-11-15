"use client";

/** Logo fixa no topo: clicar volta suavemente para o início da página em que você está. */
export default function Marca() {
  return (
    <a
      href="#inicio"
      className="marca"
      aria-label="InDeep, voltar ao início"
      title="Voltar ao início"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <span className="marca-simbolo" aria-hidden>
        <i />
        <i />
        <i />
      </span>
      indeep
    </a>
  );
}
