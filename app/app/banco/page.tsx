import type { Metadata } from "next";
import Banco from "@/components/Banco";

export const metadata: Metadata = { title: "Banco de imagens · InDeep" };

export default function PaginaBanco() {
  return <Banco />;
}
