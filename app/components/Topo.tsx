import Link from "next/link";

export default function Topo({ ativo, numeros }: { ativo: "refs" | "banco"; numeros?: React.ReactNode }) {
  return (
    <header className="topo">
      <div className="marca">
        <Link href="/" className="logo">
          In<b>Deep</b>
        </Link>
        <nav className="abas" aria-label="Seções">
          <Link href="/" className={ativo === "refs" ? "ativo" : ""} aria-current={ativo === "refs" ? "page" : undefined}>
            Referências
          </Link>
          <Link href="/banco/" className={ativo === "banco" ? "ativo" : ""} aria-current={ativo === "banco" ? "page" : undefined}>
            Banco de imagens
          </Link>
        </nav>
      </div>
      {numeros && <p className="numeros">{numeros}</p>}
    </header>
  );
}
