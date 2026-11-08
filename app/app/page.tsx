import Biblioteca from "@/components/Biblioteca";
import { dados } from "@/lib/dados";

export default function Home() {
  return <Biblioteca refs={dados.refs} receitas={dados.receitas_md} />;
}
