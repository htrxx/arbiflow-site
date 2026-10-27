import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppChat from "@/components/WhatsAppChat";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000",
  ),
  title: "ArbiFlow — Tudo sob controle nos marketplaces",
  description:
    "Gestão completa para vendedores de marketplace: lucro real, estoque com scanner, multicontas sincronizadas e notificações personalizadas.",
  openGraph: {
    title: "ArbiFlow — Tudo sob controle",
    description: "Veja o lucro real da sua operação nos marketplaces.",
    images: ["/screens/dashboard-desktop.webp"],
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable}`}>
      <body>
        {children}
        <WhatsAppChat />
      </body>
    </html>
  );
}
