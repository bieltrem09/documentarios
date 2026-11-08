import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Detalhe from "@/components/Detalhe";
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
    <main className="pagina-ref">
      <Link href="/" className="voltar">
        ← Biblioteca
      </Link>
      <Detalhe r={r} receitas={dados.receitas_md} />
    </main>
  );
}
