import Link from "next/link";

export default function Topo({ ativo, numeros }: { ativo: "edicao" | "sites" | "banco"; numeros?: React.ReactNode }) {
  return (
    <header className="topo">
      <div className="marca">
        <Link href="/" className="logo">
          In<b>Deep</b>
        </Link>
        <nav className="abas" aria-label="Seções">
          <Link href="/" className={ativo === "edicao" ? "ativo" : ""} aria-current={ativo === "edicao" ? "page" : undefined}>
            Edição
          </Link>
          <Link href="/sites/" className={ativo === "sites" ? "ativo" : ""} aria-current={ativo === "sites" ? "page" : undefined}>
            Sites
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
