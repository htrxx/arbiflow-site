"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Check,
  DollarSign,
  LayoutDashboard,
  Package,
  PackageCheck,
  ScanBarcode,
  ShoppingCart,
  TrendingUp,
  Truck,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Logo, SectionHeading, ease } from "@/components/ui/primitives";

function Card({
  className = "",
  icon: Icon,
  title,
  text,
  children,
  delay = 0,
}: {
  className?: string;
  icon: typeof Bell;
  title: string;
  text: string;
  children?: ReactNode;
  delay?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease, delay }}
      className={`card group relative flex flex-col overflow-hidden p-6 transition-colors duration-300 hover:border-brand/50 ${className}`}
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-brand/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand/30 bg-brand/10">
        <Icon className="h-5 w-5 text-brand-2" />
      </span>
      <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">{text}</p>
      {children && <div className="mt-6 flex-1">{children}</div>}
    </motion.article>
  );
}

/* ---------- Notificações ---------- */
function Toggle({ on, onChange, label }: { on: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onChange}
      className="flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-line-soft bg-ink/50 px-3 py-2 text-left text-sm transition-colors hover:border-line"
    >
      <span className="text-muted">{label}</span>
      <span className={`relative h-6 w-10 shrink-0 rounded-full transition-colors duration-200 ${on ? "bg-brand" : "bg-line"}`}>
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 34 }}
          className={`absolute top-1 h-4 w-4 rounded-full bg-white ${on ? "right-1" : "left-1"}`}
        />
      </span>
    </button>
  );
}

function NotifyDemo() {
  const [prefs, setPrefs] = useState({ name: true, value: true, profit: true });
  const flip = (k: keyof typeof prefs) => setPrefs((p) => ({ ...p, [k]: !p[k] }));
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <Toggle on={prefs.name} onChange={() => flip("name")} label="Nome do produto" />
        <Toggle on={prefs.value} onChange={() => flip("value")} label="Valor da venda" />
        <Toggle on={prefs.profit} onChange={() => flip("profit")} label="Lucro estimado" />
      </div>
      <div className="rounded-[22px] border border-line bg-gradient-to-b from-[#121a30] to-ink p-3">
        <p className="text-center tabular-nums text-[10px] text-muted">21:38</p>
        <motion.div layout className="mt-2 rounded-2xl border border-line-soft bg-surface-2/90 p-3 backdrop-blur" transition={{ duration: 0.3, ease }}>
          <div className="flex items-center justify-between text-[11px] text-muted">
            <span className="font-semibold text-text">ArbiFlow</span>
            agora
          </div>
          <p className="mt-1 text-[13px] font-semibold">Nova venda realizada</p>
          <AnimatePresence initial={false}>
            {prefs.name && (
              <motion.p key="n" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden text-xs text-muted">
                Chaleira Arno Linha Soleil 1,7l
              </motion.p>
            )}
            {prefs.value && (
              <motion.p key="v" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden text-xs text-muted">
                Valor: <span className="text-brand-2">R$ 323,00</span>
              </motion.p>
            )}
            {prefs.profit && (
              <motion.p key="p" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden text-xs text-muted">
                Lucro estimado: <span className="text-profit">R$ 32,92</span>
              </motion.p>
            )}
          </AnimatePresence>
          {!prefs.name && !prefs.value && !prefs.profit && <p className="text-xs text-muted">Modo discreto ativado</p>}
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- Dashboard ---------- */
function DashDemo() {
  return (
    <div className="rounded-2xl border border-line-soft bg-ink/60 p-4">
      <div className="flex items-end justify-between">
        <div>
          <p className="tabular-nums text-[10px] uppercase tracking-widest text-muted">Lucro líquido real</p>
          <p className="mt-1 font-display text-2xl font-semibold">R$ 1.399,10</p>
        </div>
        <span className="rounded-full bg-brand/15 px-2 py-0.5 tabular-nums text-[11px] text-brand-2">ROI 43,62%</span>
      </div>
      <svg viewBox="0 0 240 70" className="mt-3 h-20 w-full" aria-hidden>
        <defs>
          <linearGradient id="sparkfill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#1f6bff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#1f6bff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 62 C40 62 60 60 90 58 S120 30 140 32 S175 34 190 30 S220 8 240 4 L240 70 L0 70Z"
          fill="url(#sparkfill)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        <motion.path
          d="M0 62 C40 62 60 60 90 58 S120 30 140 32 S175 34 190 30 S220 8 240 4"
          fill="none"
          stroke="#3b82ff"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease }}
        />
      </svg>
    </div>
  );
}

/* ---------- Scanner ---------- */
function ScanDemo() {
  const [count, setCount] = useState(147);
  useEffect(() => {
    const t = setInterval(() => setCount((c) => (c >= 152 ? 147 : c + 1)), 2600);
    return () => clearInterval(t);
  }, []);
  const bars = [3, 1, 2, 1, 3, 1, 1, 2, 3, 1, 2, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 1, 2];
  return (
    <div className="flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-2xl border border-line-soft bg-ink/60 p-5 [--scan-distance:68px]">
        <div className="flex h-[72px] items-stretch justify-center gap-[3px]" aria-hidden>
          {bars.map((w, i) => (
            <span key={i} className="rounded-[1px] bg-text/85" style={{ width: w * 2 }} />
          ))}
        </div>
        <p className="mt-2 text-center tabular-nums text-[11px] tracking-[0.3em] text-muted">7 891234 567895</p>
        <span className="animate-scan absolute inset-x-3 top-4 h-[2px] rounded-full bg-cyan shadow-[0_0_18px_4px_rgba(69,227,255,0.55)]" aria-hidden />
      </div>
      <div className="flex items-center justify-between rounded-xl border border-line-soft bg-ink/50 px-3 py-2.5 text-sm">
        <span className="flex items-center gap-2 text-muted">
          <Check className="h-4 w-4 text-profit" /> Lote adicionado
        </span>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={count}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            className="tabular-nums text-text"
          >
            {count} un.
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- Encomendas ---------- */
function OrdersDemo() {
  const steps = [
    { icon: ShoppingCart, label: "Comprado", sub: "12 un. · R$ 1.678,80" },
    { icon: Truck, label: "A caminho", sub: "Previsão 18/10" },
    { icon: PackageCheck, label: "Recebido", sub: "Entra no estoque" },
  ];
  return (
    <ol className="relative flex flex-col gap-4 rounded-2xl border border-line-soft bg-ink/60 p-4">
      <span className="absolute bottom-8 left-[31px] top-8 w-px bg-line" aria-hidden />
      <motion.span
        className="absolute left-[31px] top-8 w-px origin-top bg-gradient-to-b from-brand to-cyan"
        style={{ height: "calc(100% - 4rem)" }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 0.55 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease, delay: 0.3 }}
        aria-hidden
      />
      {steps.map((s, i) => (
        <li key={s.label} className="relative flex items-center gap-3">
          <span
            className={`z-10 flex h-8 w-8 items-center justify-center rounded-lg border ${
              i < 2 ? "border-brand/50 bg-brand/15 text-brand-2" : "border-line bg-surface text-muted"
            }`}
          >
            <s.icon className="h-4 w-4" />
          </span>
          <div>
            <p className={`text-sm font-medium ${i < 2 ? "text-text" : "text-muted"}`}>{s.label}</p>
            <p className="text-xs text-muted">{s.sub}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Lucro por venda ---------- */
function ProfitDemo() {
  const lines = [
    { k: "Venda #2000015491499505", v: "R$ 363,00", c: "text-text" },
    { k: "Comissão do marketplace", v: "− R$ 41,74", c: "text-danger" },
    { k: "Frete", v: "− R$ 24,45", c: "text-danger" },
    { k: "Custo do produto", v: "− R$ 224,99", c: "text-danger" },
  ];
  return (
    <div className="rounded-2xl border border-line-soft bg-ink/60 p-4 tabular-nums text-[12px]">
      {lines.map((l, i) => (
        <motion.div
          key={l.k}
          className="flex justify-between gap-3 py-1.5"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 + i * 0.12 }}
        >
          <span className="truncate text-muted">{l.k}</span>
          <span className={`shrink-0 ${l.c}`}>{l.v}</span>
        </motion.div>
      ))}
      <motion.div
        className="mt-2 flex justify-between border-t border-line pt-2.5 text-[13px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        <span className="text-text">Lucro real</span>
        <span className="text-profit">+R$ 71,82 · ROI 31,9%</span>
      </motion.div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="recursos" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          title={
            <>
              Tudo o que a sua operação precisa. <span className="text-gradient">Nada que atrapalhe.</span>
            </>
          }
          subtitle="Cada tela foi desenhada para responder uma pergunta do dia a dia do vendedor — rápido, em português claro e sem planilhas paralelas."
        />

        <div className="mt-16 grid gap-4 md:grid-cols-6">
          <Card
            className="md:col-span-3"
            icon={DollarSign}
            title="Lucro real no marketplace"
            text="Comissão, tarifa fixa, frete e custo do produto descontados venda por venda."
          >
            <ProfitDemo />
          </Card>
          <Card
            className="md:col-span-3"
            icon={LayoutDashboard}
            title="Dashboard útil e simplificada"
            text="Os números que importam em uma olhada: lucro líquido, faturamento, patrimônio em estoque, meta mensal e envios pendentes. Modo foco com um atalho."
            delay={0.05}
          >
            <DashDemo />
          </Card>

          <Card
            className="md:col-span-6"
            icon={Bell}
            title="Notificações personalizadas"
            text="Receba cada venda no celular — Android ou iPhone — e escolha exatamente o que aparece na tela de bloqueio. Experimente:"
          >
            <NotifyDemo />
          </Card>

          <Card
            className="md:col-span-3"
            icon={ScanBarcode}
            title="Escaneie e adicione ao estoque"
            text="Aponte a câmera do celular para o código de barras e o produto entra no estoque com lote, custo e quantidade. Sem digitar nada."
          >
            <ScanDemo />
          </Card>
          <Card
            className="md:col-span-3"
            icon={Package}
            title="Controle total das encomendas"
            text="Registre compras de fornecedores, acompanhe o que está a caminho e veja o custo médio atualizar sozinho quando o lote chega."
            delay={0.05}
          >
            <OrdersDemo />
          </Card>
        </div>

        <motion.div
          className="mt-4 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line-soft bg-surface/50 p-5 sm:flex-row sm:items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 text-sm text-muted">
            <TrendingUp className="h-5 w-5 shrink-0 text-profit" />
            Também inclui: calculadora de margem, conciliação Mercado Pago, importação de planilhas, histórico de margens e exportação.
          </div>
          <span className="hidden sm:block">
            <Logo />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
