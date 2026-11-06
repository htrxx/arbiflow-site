"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, LayoutDashboard, MoveHorizontal, Receipt, Share2, Truck } from "lucide-react";
import { useState } from "react";
import { BrowserFrame, SectionHeading, ease } from "@/components/ui/primitives";
import { SCREENSHOTS, type ScreenId } from "@/lib/screens";

const SCREENS: { id: ScreenId; icon: typeof Truck; label: string; title: string; text: string }[] = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    title: "Seu resumo em uma olhada",
    text: "Faturamento, lucro líquido com margem e ROI, valor em estoque, evolução das vendas no período e meta mensal de lucro.",
  },
  {
    id: "relatorios",
    icon: BarChart3,
    label: "Relatórios",
    title: "Performance comparada com o mês anterior",
    text: "Faturamento, lucro, pedidos e margem com a variação do mês anterior, de onde vem o faturamento e quanto foi investido em compras.",
  },
  {
    id: "despesas",
    icon: Receipt,
    label: "Despesas",
    title: "Todos os custos da operação",
    text: "Insumos e embalagens, custos fixos e operacionais, e o rateio médio de embalagem por pacote enviado.",
  },
  {
    id: "banner",
    icon: Share2,
    label: "Banners",
    title: "Seus resultados prontos para postar",
    text: "Gere um banner de performance para o feed (1:1) ou stories (9:16), escolha o período e o destaque, e ative o modo privacidade.",
  },
];

export default function Tour() {
  const [active, setActive] = useState(0);
  const s = SCREENS[active];

  return (
    <section id="tour" className="relative py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-[500px] max-w-5xl rounded-full bg-brand/10 blur-[140px]"
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          title="Mais do que estoque."
          subtitle="Dashboard, relatórios, despesas e banners de resultado: o restante da operação, nas telas reais do ArbiFlow."
        />

        <div
          role="tablist"
          aria-label="Telas da plataforma"
          className="mx-auto mt-12 flex max-w-full gap-1 overflow-x-auto rounded-2xl border border-line bg-surface/70 p-1.5 [scrollbar-width:none] sm:w-fit"
        >
          {SCREENS.map((sc, i) => (
            <button
              key={sc.id}
              role="tab"
              aria-selected={active === i}
              aria-controls="tour-panel"
              onClick={() => setActive(i)}
              className={`relative flex min-h-11 shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm transition-colors duration-200 ${
                active === i ? "text-text" : "text-muted hover:text-text"
              }`}
            >
              {active === i && (
                <motion.span
                  layoutId="tour-pill"
                  className="absolute inset-0 -z-0 rounded-xl border border-brand/40 bg-brand/15"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <sc.icon className="relative h-4 w-4" />
              <span className="relative whitespace-nowrap">{sc.label}</span>
            </button>
          ))}
        </div>

        <div id="tour-panel" role="tabpanel" className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.18 } }}
              transition={{ duration: 0.45, ease }}
              className="flex flex-col gap-8"
            >
              <div className="mx-auto max-w-2xl text-center">
                <h3 className="font-display text-2xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-muted text-pretty">{s.text}</p>
              </div>
              <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} transition={{ duration: 0.6, ease }}>
                <BrowserFrame
                  {...SCREENSHOTS[s.id]}
                  alt={`Tela ${s.label} do ArbiFlow`}
                  url={`app.arbiflow.com.br/${s.id}`}
                  scrollable
                />
                <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted md:hidden">
                  <MoveHorizontal className="h-4 w-4" aria-hidden /> Arraste para o lado para ver a tela inteira
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
