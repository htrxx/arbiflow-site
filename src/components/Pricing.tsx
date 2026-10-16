"use client";

import { PricingSection } from "@/components/ui/pricing";
import { PLANS } from "@/lib/plans";

export default function Pricing() {
  return (
    <section id="planos" className="relative">
      <PricingSection
        plans={PLANS}
        badge="Promoção de lançamento"
        title="Um plano para cada fase da sua operação"
        description={"Preços promocionais por tempo limitado.\nDepois do lançamento, os valores sobem."}
      />
    </section>
  );
}
