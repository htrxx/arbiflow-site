import type { Metadata } from "next";
import Presell from "@/components/presell/Presell";
import { resolveVariant } from "@/lib/presell";

export const metadata: Metadata = {
  title: "Quanto sobrou de cada venda? — ArbiFlow",
  description:
    "O ArbiFlow desconta comissão, tarifa, frete e o custo do seu lote em cada venda do marketplace e mostra o lucro real.",
  // Paid-traffic page: keep it out of search results so it doesn't compete with the main site.
  robots: { index: false, follow: true },
  openGraph: {
    title: "Faturar não é lucrar — ArbiFlow",
    description: "Veja o lucro real de cada venda depois de taxas, frete e custo do produto.",
    images: ["/screens/dashboard.webp"],
    locale: "pt_BR",
    type: "website",
  },
};

export default async function PresellPage({
  searchParams,
}: {
  searchParams: Promise<{ h?: string; c?: string }>;
}) {
  const { h, c } = await searchParams;
  const v = resolveVariant(h, c);
  return <Presell headline={v.headline} cta={v.cta} variant={v.id} />;
}
