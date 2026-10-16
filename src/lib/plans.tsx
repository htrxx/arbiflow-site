import type { PricingPlan } from "@/components/ui/pricing";

export type PlanId = "standard" | "pro";

export const MONTRA_BONUS = (
  <>
    <strong className="font-semibold">Brinde:</strong> 1 mês de assinatura do{" "}
    <strong className="font-semibold">Montra</strong>, personal finance tracker.
  </>
);

export const PLANS: (PricingPlan & { id: PlanId })[] = [
  {
    id: "standard",
    name: "Standard",
    originalPrice: "59.90",
    price: "19.90",
    laterPrice: "39.90",
    period: "mês",
    description: "Para quem quer enxergar o lucro real e organizar o estoque.",
    features: [
      "Multicontas com estoque sincronizado",
      "Dashboard e lucro real por venda",
      "Vendas & envios com status em 1 clique",
      "Estoque físico com scanner",
      "Notificações de venda no celular",
    ],
    buttonText: "Assinar Standard",
    href: "/assinar?plano=standard",
  },
  {
    id: "pro",
    name: "Pro",
    originalPrice: "99.90",
    price: "34.90",
    laterPrice: "79.90",
    period: "mês",
    description: "Para operações em crescimento que querem relatórios completos e controle de compras.",
    bonus: MONTRA_BONUS,
    features: [
      "Tudo do Standard",
      "Notificações personalizadas e alertas de meta",
      "Relatórios, DRE e fechamento mensal",
      "Controle de compras e encomendas",
      "Conciliação Mercado Pago",
    ],
    buttonText: "Assinar Pro",
    href: "/assinar?plano=pro",
    isPopular: true,
  },
];

export function getPlan(id: string | undefined) {
  return PLANS.find((p) => p.id === id) ?? PLANS.find((p) => p.isPopular)!;
}

export const brl = (v: number | string) =>
  Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
