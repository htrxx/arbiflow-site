import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";
import { getPlan } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Assinar — ArbiFlow",
  description: "Preencha seus dados e siga para o pagamento do seu plano ArbiFlow.",
  robots: { index: false },
};

export default async function AssinarPage({
  searchParams,
}: {
  searchParams: Promise<{ plano?: string }>;
}) {
  const { plano } = await searchParams;
  return <CheckoutForm initialPlan={getPlan(plano).id} />;
}
