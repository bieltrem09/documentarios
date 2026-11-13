import type { Metadata } from "next";
import Biblioteca from "@/components/Biblioteca";
import { dados } from "@/lib/dados";

export const metadata: Metadata = { title: "Sites · InDeep" };

export default function PaginaSites() {
  return <Biblioteca area="site" refs={dados.refs.filter((r) => r.area === "site")} receitas={dados.receitas_md} />;
}
