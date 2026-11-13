import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Detalhe from "@/components/Detalhe";
import Topo from "@/components/Topo";
import { dados } from "@/lib/dados";

export const dynamicParams = false;

export function generateStaticParams() {
  return dados.refs.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const r = dados.refs.find((x) => x.id === id);
  return { title: r ? `${r.id} · ${r.titulo}` : "Referência" };
}

export default async function PaginaRef({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const r = dados.refs.find((x) => x.id === id);
  if (!r) notFound();
  return (
    <>
    <Topo ativo={r.area === "site" ? "sites" : "edicao"} />
    <main className="pagina-ref">
      <Link href={r.area === "site" ? "/sites/" : "/"} className="voltar">
        ← {r.area === "site" ? "Sites" : "Edição"}
      </Link>
      <Detalhe r={r} receitas={dados.receitas_md} />
    </main>
    </>
  );
}
