import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InDeep · Biblioteca de Edição",
  description: "Referências de edição para documentário e notícia, catalogadas para o canal InDeep.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#121212" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" translate="no">
      <head>
        <meta name="google" content="notranslate" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800;900&family=Geist+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
