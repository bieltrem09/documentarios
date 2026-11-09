import Biblioteca from "@/components/Biblioteca";
import { dados } from "@/lib/dados";

export default function Home() {
  return <Biblioteca area="edicao" refs={dados.refs.filter((r) => r.area !== "site")} receitas={dados.receitas_md} />;
}
