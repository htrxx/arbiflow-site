"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { useState } from "react";
import { Logo, SectionHeading, ease } from "@/components/ui/primitives";
import { NAV } from "./Navbar";
import { StarfieldBackground } from "@/components/ui/pricing";

const FAQ = [
  {
    q: "Como o ArbiFlow calcula o lucro real?",
    a: "Para cada venda, descontamos a comissão e as tarifas do marketplace, o frete pago pelo vendedor e o custo do produto que você cadastrou. Despesas operacionais e embalagens entram no fechamento mensal.",
  },
  {
    q: "Preciso cadastrar meus produtos manualmente?",
    a: "Não. Ao conectar sua conta, seus produtos e vendas são importados automaticamente do marketplace. Você só precisa cadastrar os custos, quando necessário, para o ArbiFlow calcular o lucro real.",
  },
  {
    q: "Como funciona o scanner?",
    a: "Pelo celular, usando a câmera, ou com um leitor de código de barras USB no computador. Você confere etiquetas antes de despachar, dá entrada em mercadorias, consulta produtos e faz inventário bipando os itens.",
  },
  {
    q: "Consigo gerenciar mais de uma conta de marketplace?",
    a: "Sim, em qualquer plano. Você conecta várias contas, alterna entre elas em um clique e compartilha o mesmo estoque físico, com sincronização automática a cada venda.",
  },
  {
    q: "As notificações funcionam no iPhone?",
    a: "Sim. No Android a ativação é direta pelo navegador; no iPhone basta adicionar o ArbiFlow à tela de início. Você escolhe se quer ver nome do produto, valor e lucro estimado.",
  },
  {
    q: "Meus dados estão seguros?",
    a: "A conexão com o marketplace é feita pela API oficial, com autorização que você pode revogar a qualquer momento. Não temos acesso à sua senha.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading title="Perguntas frequentes" />
        <div className="mt-12 flex flex-col gap-3">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`rounded-2xl border bg-surface/60 transition-colors ${isOpen ? "border-brand/40" : "border-line-soft"}`}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium"
                  >
                    {f.q}
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
                      <Plus className="h-5 w-5 text-muted" />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.35, ease }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 leading-relaxed text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="comecar" className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32">
      <StarfieldBackground />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease }}
        className="relative mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">
          Comece agora. <span className="text-gradient">Seu lucro real está a poucos cliques.</span>
        </h2>
        <p className="mt-5 max-w-xl text-muted text-pretty sm:text-lg">
          Conecte sua conta do marketplace, cadastre seus custos e veja em minutos quanto a sua operação realmente
          lucra. Aproveite o preço promocional de lançamento.
        </p>
        <a
          href="#planos"
          className="group mt-9 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-7 font-medium text-white shadow-[0_12px_40px_-10px_var(--color-brand)] transition-[background-color,transform] hover:bg-brand-2 active:scale-[0.97] sm:w-auto"
        >
          Ver planos
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </motion.div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line-soft">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6 md:flex-row md:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Tudo sob controle. Gestão financeira, estoque e envios para vendedores de marketplace.
          </p>
        </div>
        <nav aria-label="Rodapé" className="grid grid-cols-2 gap-x-14 gap-y-3 text-sm sm:grid-cols-3">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="text-muted transition-colors hover:text-text">
              {n.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="border-t border-line-soft">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:justify-between sm:px-6">
          <span>© {new Date().getFullYear()} ArbiFlow. Todos os direitos reservados.</span>
          <span>Marcas de marketplaces pertencem aos seus respectivos donos.</span>
        </div>
      </div>
    </footer>
  );
}
