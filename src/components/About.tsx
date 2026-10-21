"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeading, ease } from "@/components/ui/primitives";

const TIMELINE = [
  { k: "O problema", d: "Vendíamos em marketplace e o painel dizia que estava tudo ótimo. A conta bancária discordava." },
  { k: "A planilha", d: "Cruzamos custos, taxas e fretes à mão. Funcionava — até a operação crescer." },
  { k: "O ArbiFlow", d: "Transformamos a planilha em plataforma: lucro real, estoque, envios e relatórios no mesmo lugar." },
  { k: "Agora", d: "Estamos no lançamento, com preços promocionais para quem chegar primeiro e decidir com base em lucro, não em faturamento." },
];

export default function About() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="sobre" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-10">
          <SectionHeading
            align="left"
              title={
              <>
                Feito por vendedores, <span className="text-gradient">para vendedores.</span>
              </>
            }
            subtitle="O ArbiFlow nasceu dentro de uma operação de arbitragem em marketplace. Nossa missão é dar ao pequeno e médio vendedor a mesma clareza financeira que as grandes lojas têm."
          />
        </div>

        <ol ref={ref} className="relative flex flex-col gap-10 self-center pl-10">
          <span className="absolute bottom-2 left-[11px] top-2 w-px bg-line" aria-hidden />
          <motion.span
            className="absolute left-[11px] top-2 w-px origin-top bg-gradient-to-b from-brand to-cyan"
            style={{ scaleY: line, height: "calc(100% - 1rem)" }}
            aria-hidden
          />
          {TIMELINE.map((t, i) => (
            <motion.li
              key={t.k}
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease }}
            >
              <span className="absolute -left-10 top-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-brand/50 bg-ink tabular-nums text-[10px] text-brand-2">
                {i + 1}
              </span>
              <p className="font-display text-lg font-semibold">{t.k}</p>
              <p className="mt-1 leading-relaxed text-muted">{t.d}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
