"use client";

import { motion } from "framer-motion";
import { ArrowLeftRight, Check, Layers, RefreshCw, Store } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui/primitives";

const ACCOUNTS = [
  { name: "Conta 1 · Vendedor", sales: 75, x: 70, y: 60 },
  { name: "Conta 2 · Loja Oficial", sales: 42, x: 70, y: 200 },
  { name: "Conta 3 · Outlet", sales: 18, x: 70, y: 340 },
];
const HUB = { x: 400, y: 200 };

function SyncDiagram() {
  return (
    <div className="card glow-border relative overflow-hidden p-4 sm:p-6">
      <svg viewBox="0 0 560 400" className="h-auto w-full" role="img" aria-label="Três contas de marketplace sincronizadas com um estoque central">
        <defs>
          <linearGradient id="wire" x1="0" x2="1">
            <stop offset="0" stopColor="#1f6bff" />
            <stop offset="1" stopColor="#45e3ff" />
          </linearGradient>
          <radialGradient id="hubglow">
            <stop offset="0" stopColor="#1f6bff" stopOpacity="0.45" />
            <stop offset="1" stopColor="#1f6bff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={HUB.x} cy={HUB.y} r="140" fill="url(#hubglow)" />

        {ACCOUNTS.map((a, i) => {
          const sx = a.x + 160;
          const d = `M${sx} ${a.y} C ${sx + 80} ${a.y}, ${HUB.x - 120} ${HUB.y}, ${HUB.x - 62} ${HUB.y}`;
          return (
            <g key={a.name}>
              <path d={d} fill="none" stroke="#1a2440" strokeWidth="2" />
              <motion.path
                d={d}
                fill="none"
                stroke="url(#wire)"
                strokeWidth="2"
                strokeDasharray="6 10"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -64 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              />
              <motion.circle
                r="4"
                fill="#45e3ff"
                style={{ offsetPath: `path("${d}")`, filter: "drop-shadow(0 0 6px #45e3ff)" }}
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
              />
            </g>
          );
        })}

        {ACCOUNTS.map((a, i) => (
          <g key={a.name + "card"}>
            <rect x={a.x - 50} y={a.y - 30} width="210" height="60" rx="14" fill="#0f1628" stroke="#1a2440" />
            <rect x={a.x - 38} y={a.y - 16} width="32" height="32" rx="9" fill="#1f6bff" fillOpacity="0.15" stroke="#1f6bff" strokeOpacity="0.4" />
            <text x={a.x - 22} y={a.y + 5} textAnchor="middle" fill="#3b82ff" fontSize="13" fontWeight="700">
              {i + 1}
            </text>
            <text x={a.x + 6} y={a.y - 3} fill="#e8edf7" fontSize="13" fontWeight="600">
              {a.name}
            </text>
            <text x={a.x + 6} y={a.y + 15} fill="#8a97b4" fontSize="11">
              {a.sales} vendas no mês
            </text>
          </g>
        ))}

        <g>
          <rect x={HUB.x - 62} y={HUB.y - 72} width="150" height="144" rx="22" fill="#0b1224" stroke="#1f6bff" strokeOpacity="0.6" />
          <motion.rect
            x={HUB.x - 62}
            y={HUB.y - 72}
            width="150"
            height="144"
            rx="22"
            fill="none"
            stroke="#45e3ff"
            strokeWidth="2"
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
          <text x={HUB.x + 13} y={HUB.y - 32} textAnchor="middle" fill="#8a97b4" fontSize="10" letterSpacing="2">
            ESTOQUE ÚNICO
          </text>
          <text x={HUB.x + 13} y={HUB.y + 8} textAnchor="middle" fill="#ffffff" fontSize="34" fontWeight="700">
            148
          </text>
          <text x={HUB.x + 13} y={HUB.y + 28} textAnchor="middle" fill="#8a97b4" fontSize="11">
            unidades · 24 SKUs
          </text>
          <text x={HUB.x + 13} y={HUB.y + 52} textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="600">
            ● sincronizado
          </text>
        </g>
      </svg>
    </div>
  );
}

/** Vertical version of the diagram for phones, so every label stays readable. */
function SyncDiagramMobile() {
  return (
    <div className="card glow-border relative overflow-hidden p-4">
      <ul className="flex flex-col gap-2">
        {ACCOUNTS.map((a, i) => (
          <motion.li
            key={a.name}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex items-center gap-3 rounded-xl border border-line bg-surface-2 px-3 py-2.5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand/40 bg-brand/15 text-sm font-bold text-brand-2">
              {i + 1}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">{a.name}</span>
              <span className="block text-xs text-muted">{a.sales} vendas no mês</span>
            </span>
            <motion.span
              className="ml-auto h-2 w-2 shrink-0 rounded-full bg-cyan"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.4 }}
              aria-hidden
            />
          </motion.li>
        ))}
      </ul>
      <div className="relative mx-auto h-10 w-px bg-line" aria-hidden>
        <motion.span
          className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_8px_var(--color-cyan)]"
          animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="mx-auto flex w-48 flex-col items-center rounded-2xl border border-brand/60 bg-[#0b1224] px-4 py-4 text-center">
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted">Estoque único</span>
        <span className="mt-1 font-display text-4xl font-bold">148</span>
        <span className="text-xs text-muted">unidades · 24 SKUs</span>
        <span className="mt-2 text-xs font-semibold text-profit">● sincronizado</span>
      </div>
    </div>
  );
}

export default function MultiAccount() {
  const points = [
    { icon: Store, t: "Várias contas, um só login", d: "Conecte quantas contas de marketplace precisar e alterne entre elas em um clique." },
    { icon: RefreshCw, t: "Estoque sincronizado", d: "Vendeu em uma conta? A baixa acontece no estoque compartilhado e todas as contas ficam atualizadas." },
    { icon: Layers, t: "Visão consolidada ou por conta", d: "Filtre vendas, lucro e envios por conta — ou veja a operação inteira de uma vez." },
    { icon: ArrowLeftRight, t: "Permissões por operador", d: "Dê acesso a quem separa e despacha sem expor os números financeiros." },
  ];
  return (
    <section id="multicontas" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <div className="hidden sm:block">
            <SyncDiagram />
          </div>
          <div className="sm:hidden">
            <SyncDiagramMobile />
          </div>
        </Reveal>
        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <SectionHeading
            align="left"
              title={
              <>
                Várias contas. <span className="text-gradient">Um estoque só.</span>
              </>
            }
            subtitle="Administre o estoque de todas as suas contas de marketplace em um único lugar, com sincronização automática e sem venda de produto que já acabou."
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {points.map((p, i) => (
              <motion.li
                key={p.t}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-line-soft bg-surface/60 p-4"
              >
                <p.icon className="h-5 w-5 text-brand-2" />
                <p className="mt-3 font-display font-semibold">{p.t}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{p.d}</p>
              </motion.li>
            ))}
          </ul>
          <p className="flex items-center gap-2 text-sm text-muted">
            <Check className="h-4 w-4 text-profit" /> Disponível em todos os planos.
          </p>
        </div>
      </div>
    </section>
  );
}
