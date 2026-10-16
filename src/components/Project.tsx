"use client";

import { motion } from "framer-motion";
import { Counter, Reveal, SectionHeading, ease } from "@/components/ui/primitives";

/* DRE real de um mês de operação (dados do painel). */
const DRE = [
  { label: "Faturamento bruto", value: 8970.04, kind: "in" },
  { label: "Custo das mercadorias", value: -3207.29, kind: "out" },
  { label: "Comissões e taxas do marketplace", value: -1090.45, kind: "out" },
  { label: "Fretes pagos", value: -628.52, kind: "out" },
  { label: "Lucro líquido real", value: 4043.78, kind: "total" },
] as const;

const MAX = 8970.04;

function Waterfall() {
  const rows = DRE.map((r) => ({ ...r, width: Math.abs(r.value) }));

  return (
    <div className="card glow-border relative p-5 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="tabular-nums text-[11px] uppercase tracking-[0.16em] text-muted">Outubro · DRE operacional</p>
          <p className="mt-1 font-display text-lg font-semibold">De onde vem (e para onde vai) o seu dinheiro</p>
        </div>
        <span className="shrink-0 rounded-full border border-profit/30 bg-profit/10 px-2.5 py-1 tabular-nums text-[11px] text-profit">
          ROI 82,1%
        </span>
      </div>

      <ul className="mt-6 flex flex-col gap-4">
        {rows.map((r, i) => {
          const color =
            r.kind === "in" ? "bg-brand" : r.kind === "out" ? "bg-danger/80" : "bg-gradient-to-r from-profit to-emerald-300";
          return (
            <li key={r.label} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5">
              <span className={`text-sm ${r.kind === "total" ? "font-semibold text-text" : "text-muted"}`}>{r.label}</span>
              <span
                className={`text-right tabular-nums text-sm ${
                  r.kind === "out" ? "text-danger" : r.kind === "total" ? "text-profit" : "text-text"
                }`}
              >
                {r.kind === "out" ? "− " : ""}
                <Counter to={Math.abs(r.value)} decimals={2} prefix="R$ " />
              </span>
              <div className="col-span-2 h-2.5 rounded-full bg-line-soft">
                <motion.div
                  className={`h-full rounded-full ${color}`}
                  style={{ width: `${(r.width / MAX) * 100}%`, transformOrigin: "0% 50%" }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.15 }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 border-t border-line-soft pt-4 text-xs leading-relaxed text-muted">
        Margem líquida de <span className="text-text">45,1%</span>. Despesas operacionais e embalagens entram na conta
        automaticamente quando você as cadastra.
      </p>
    </div>
  );
}

export default function Project() {
  return (
    <section id="projeto" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-8">
          <SectionHeading
            align="left"
              title={
              <>
                Faturar não é lucrar. <span className="text-gradient">O ArbiFlow mostra a diferença.</span>
              </>
            }
            subtitle="O painel do marketplace mostra quanto você vendeu. O ArbiFlow mostra quanto sobrou: cruza cada venda com o custo do produto, comissões, tarifas e frete — e entrega o lucro líquido real da sua operação, venda por venda."
          />
          <Reveal className="grid gap-3 sm:grid-cols-2" delay={0.1}>
            {[
              { k: "Lucro real", d: "Calculado por venda, não por estimativa." },
              { k: "Custo por lote", d: "Cada compra com o seu próprio custo." },
              { k: "Ticket e ROI", d: "Por produto, conta e período." },
              { k: "Fechamento mensal", d: "DRE pronto para imprimir." },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl border border-line-soft bg-surface/60 p-4">
                <p className="font-display font-semibold">{x.k}</p>
                <p className="mt-1 text-sm text-muted">{x.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <Waterfall />
        </Reveal>
      </div>
    </section>
  );
}
