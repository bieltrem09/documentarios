import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InDeep · Biblioteca de Edição",
  description: "Referências de edição para documentário e notícia, catalogadas para o canal InDeep.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#07080a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap"
        />
      </head>
      <body>
        <div className="grao" aria-hidden />
        <div className="vinheta" aria-hidden />
        {children}
      </body>
    </html>
  );
}
