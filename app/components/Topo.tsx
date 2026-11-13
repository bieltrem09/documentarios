import Link from "next/link";

type Aba = "edicao" | "sites" | "banco";

const ABAS: { id: Aba; href: string; nome: string }[] = [
  { id: "edicao", href: "/", nome: "Edição" },
  { id: "sites", href: "/sites/", nome: "Sites" },
  { id: "banco", href: "/banco/", nome: "Banco de imagens" },
];

/** Barra de navegação: marca à esquerda, abas, e à direita contador + busca. Sem login (uso pessoal). */
export default function Topo({
  ativo,
  numeros,
  onBuscar,
}: {
  ativo: Aba;
  numeros?: React.ReactNode;
  onBuscar?: () => void;
}) {
  return (
    <header className="nav">
      <div className="nav-esq">
        <Link href="/" className="marca" aria-label="InDeep, início">
          <span className="marca-simbolo" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          indeep
        </Link>
        <nav className="nav-abas" aria-label="Seções">
          {ABAS.map((a) => (
            <Link key={a.id} href={a.href} className={ativo === a.id ? "ativo" : ""} aria-current={ativo === a.id ? "page" : undefined}>
              {a.nome}
            </Link>
          ))}
        </nav>
      </div>
      <div className="nav-dir">
        {numeros && <span className="nav-numeros">{numeros}</span>}
        {onBuscar && (
          <button className="nav-icone" onClick={onBuscar} aria-label="Buscar (atalho /)" title="Buscar  /">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
              <path d="M11 2a9 9 0 0 1 7.032 14.617l3.675 3.676a1 1 0 0 1-1.414 1.414l-3.676-3.675A9 9 0 1 1 11 2zm0 2a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}
