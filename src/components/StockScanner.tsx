"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Check,
  ClipboardCheck,
  GitMerge,
  PackageCheck,
  PackagePlus,
  RotateCcw,
  ScanBarcode,
  Search,
  ShoppingCart,
  Tag,
  TrendingUp,
  Truck,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { BrowserFrame, SectionHeading, ease } from "@/components/ui/primitives";
import { SCREENSHOTS } from "@/lib/screens";

/* ---------- Scanner ---------- */

const MODES = [
  {
    icon: Tag,
    label: "Conferir etiqueta",
    title: "Nada sai errado",
    text: "Bipe a etiqueta de envio antes de fechar a caixa: o pedido é marcado como embalado e você vê na hora quantos ainda faltam para o corte.",
    result: "Pedido conferido · 6 de 7 hoje",
  },
  {
    icon: PackagePlus,
    label: "Entrada",
    title: "Recebeu, bipou, está no estoque",
    text: "Bipe o código de barras do produto ao receber a mercadoria e a quantidade entra no estoque, sem digitar nada.",
    result: "+12 un. no estoque",
  },
  {
    icon: Search,
    label: "Consultar",
    title: "Tudo sobre o produto em 1 bipe",
    text: "Aponte para qualquer produto e veja na hora as informações dele no seu estoque.",
    result: "NIVEA Sabonete Íntimo · 19 un.",
  },
  {
    icon: ClipboardCheck,
    label: "Inventário",
    title: "Contagem sem planilha",
    text: "Bipe item por item na prateleira para contar o estoque físico sem planilha e sem papel.",
    result: "Inventário: 48 un. conferidas",
  },
];

const BARS = [3, 1, 2, 1, 3, 1, 1, 2, 3, 1, 2, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 1, 2];

function ScanCard({ result }: { result: string }) {
  return (
    <div className="w-full max-w-[280px] rounded-2xl border border-line bg-surface/95 p-4 shadow-2xl backdrop-blur-xl">
      <div className="relative overflow-hidden rounded-xl border border-line-soft bg-ink/70 px-4 py-3 [--scan-distance:44px]">
        <div className="flex h-12 items-stretch justify-center gap-[3px]" aria-hidden>
          {BARS.map((w, i) => (
            <span key={i} className="rounded-[1px] bg-text/85" style={{ width: w * 2 }} />
          ))}
        </div>
        <p className="mt-1.5 text-center tabular-nums text-[10px] tracking-[0.3em] text-muted">7 891234 567895</p>
        <span
          className="animate-scan absolute inset-x-3 top-3 h-[2px] rounded-full bg-cyan shadow-[0_0_18px_4px_rgba(69,227,255,0.55)]"
          aria-hidden
        />
      </div>
      <div className="mt-3 flex min-h-6 items-center gap-2 text-sm">
        <Check className="h-4 w-4 shrink-0 text-profit" aria-hidden />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={result}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3, ease }}
            className="text-text"
          >
            {result}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Scanner() {
  const [mode, setMode] = useState(0);
  const [paused, setPaused] = useState(false);
  // Cycle through the modes until the visitor picks one.
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setMode((m) => (m + 1) % MODES.length), 4200);
    return () => clearInterval(t);
  }, [paused]);
  const m = MODES[mode];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
      <div className="min-w-0">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan">
          <ScanBarcode className="h-4 w-4" aria-hidden /> Scanner
        </span>
        <h3 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
          Bipou, está registrado.
        </h3>
        <p className="mt-3 text-muted text-pretty">
          Use a câmera do celular ou um leitor USB. Um scanner, quatro usos no dia a dia da expedição e do estoque.
        </p>

        <div role="tablist" aria-label="Modos do scanner" className="mt-7 grid grid-cols-2 gap-2">
          {MODES.map((x, i) => (
            <button
              key={x.label}
              role="tab"
              aria-selected={mode === i}
              onClick={() => {
                setMode(i);
                setPaused(true);
              }}
              className={`flex min-h-12 items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-sm font-medium transition-colors ${
                mode === i ? "border-brand/60 bg-brand/15 text-text" : "border-line-soft bg-surface/60 text-muted hover:text-text"
              }`}
            >
              <x.icon className={`h-4 w-4 shrink-0 ${mode === i ? "text-brand-2" : ""}`} aria-hidden />
              {x.label}
            </button>
          ))}
        </div>

        <div className="mt-5 min-h-[112px]" role="tabpanel">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
              transition={{ duration: 0.35, ease }}
            >
              <p className="font-display text-lg font-semibold">{m.title}</p>
              <p className="mt-1.5 leading-relaxed text-muted">{m.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative min-w-0">
        <BrowserFrame {...SCREENSHOTS.scanner} alt="Tela Scanner do ArbiFlow conferindo etiquetas de envio" url="app.arbiflow.com.br/scanner" scrollable />
        <div className="pointer-events-none mt-4 flex justify-center sm:absolute sm:-bottom-8 sm:-left-6 sm:mt-0">
          <ScanCard result={m.result} />
        </div>
      </div>
    </div>
  );
}

/* ---------- Estoque & Compras ---------- */

const STOCK_POINTS = [
  { icon: Wallet, t: "Custo real de cada lote", d: "Produto, frete, taxas e impostos lançados na compra. Cada venda sai com o custo do lote certo e o custo médio se atualiza sozinho." },
  { icon: AlertTriangle, t: "Estoque baixo em destaque", d: "Defina o mínimo por produto e veja o que precisa recomprar antes de faltar." },
  { icon: TrendingUp, t: "Quanto o estoque vale", d: "Valor em estoque, total investido, venda potencial e lucro potencial em uma linha." },
  { icon: GitMerge, t: "Produtos duplicados", d: "O mesmo item vindo de canais diferentes é detectado para você unificar custos e histórico." },
  { icon: RotateCcw, t: "Devoluções de volta ao estoque", d: "O que retorna do marketplace aparece para confirmar, e a unidade volta para a prateleira." },
];

function PurchaseFlow() {
  const steps = [
    { icon: ShoppingCart, label: "Comprado", sub: "12 un. · R$ 1.678,80" },
    { icon: Truck, label: "A caminho", sub: "Previsão 18/10" },
    { icon: PackageCheck, label: "Recebido", sub: "Entra no estoque com o custo do lote" },
  ];
  return (
    <ol className="relative flex flex-col gap-4 rounded-2xl border border-line bg-surface/95 p-4 shadow-2xl backdrop-blur-xl">
      <span className="absolute bottom-8 left-[31px] top-8 w-px bg-line" aria-hidden />
      <motion.span
        className="absolute left-[31px] top-8 w-px origin-top bg-gradient-to-b from-brand to-cyan"
        style={{ height: "calc(100% - 4rem)" }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease, delay: 0.3 }}
        aria-hidden
      />
      {steps.map((s, i) => (
        <motion.li
          key={s.label}
          className="relative flex items-center gap-3"
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.45 }}
        >
          <span className="z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-brand/50 bg-brand/15 text-brand-2">
            <s.icon className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-medium text-text">{s.label}</p>
            <p className="text-xs text-muted">{s.sub}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

function StockAndPurchases() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
      <div className="relative order-2 min-w-0 lg:order-1">
        <BrowserFrame {...SCREENSHOTS.estoque} alt="Tela Estoque do ArbiFlow com valor em estoque, compras a caminho e custo médio" url="app.arbiflow.com.br/estoque" scrollable />
        <div className="mt-4 sm:absolute sm:-bottom-10 sm:-right-6 sm:mt-0 sm:w-[300px]">
          <PurchaseFlow />
        </div>
      </div>

      <div className="order-1 min-w-0 lg:order-2">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan">
          <PackagePlus className="h-4 w-4" aria-hidden /> Estoque & Compras
        </span>
        <h3 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
          Da compra ao fornecedor até a prateleira.
        </h3>
        <p className="mt-3 text-muted text-pretty">
          Registre as compras, acompanhe o que está a caminho e saiba quanto vale cada unidade parada. Indispensável para
          quem compra para revender ou importa.
        </p>
        <ul className="mt-6 flex flex-col gap-3">
          {STOCK_POINTS.map((p, i) => (
            <motion.li
              key={p.t}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease, delay: i * 0.06 }}
              className="flex gap-3"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand/30 bg-brand/10">
                <p.icon className="h-4 w-4 text-brand-2" aria-hidden />
              </span>
              <span>
                <span className="block font-medium">{p.t}</span>
                <span className="mt-0.5 block text-sm leading-relaxed text-muted">{p.d}</span>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function StockScanner() {
  return (
    <section id="estoque" className="relative py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-40 -z-10 mx-auto h-[520px] max-w-5xl rounded-full bg-brand/10 blur-[140px]"
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          title={
            <>
              Estoque, compras e scanner <span className="text-gradient">no mesmo lugar.</span>
            </>
          }
          subtitle="O coração do ArbiFlow: saiba exatamente o que você tem, o que está chegando e quanto cada unidade custou — sem digitar nada."
        />
        <div className="mt-16 flex flex-col gap-28 sm:gap-36">
          <Scanner />
          <StockAndPurchases />
        </div>
      </div>
    </section>
  );
}
