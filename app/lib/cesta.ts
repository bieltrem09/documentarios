"use client";

import { useSyncExternalStore } from "react";
import type { Anexo } from "./claude";

/**
 * "Seleção para o Claude": referências marcadas em qualquer aba (Edição, Sites, Banco)
 * que vão juntas para a conversa. Fica no navegador (localStorage) entre as páginas.
 */
const CHAVE = "indeep-cesta";
let itens: Anexo[] = [];
let carregado = false;
const ouvintes = new Set<() => void>();

function carregar() {
  if (carregado || typeof window === "undefined") return;
  carregado = true;
  try {
    itens = JSON.parse(localStorage.getItem(CHAVE) ?? "[]");
  } catch {
    itens = [];
  }
}
function salvar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(itens));
  } catch {
    /* modo privado: a seleção vale só nesta página */
  }
  ouvintes.forEach((f) => f());
}

export const cesta = {
  alternar(a: Anexo) {
    carregar();
    itens = itens.some((x) => x.id === a.id) ? itens.filter((x) => x.id !== a.id) : [...itens, a];
    salvar();
  },
  limpar() {
    itens = [];
    salvar();
  },
};

const VAZIO: Anexo[] = [];
export function useCesta(): Anexo[] {
  return useSyncExternalStore(
    (f) => {
      ouvintes.add(f);
      return () => ouvintes.delete(f);
    },
    () => {
      carregar();
      return itens;
    },
    () => VAZIO,
  );
}
