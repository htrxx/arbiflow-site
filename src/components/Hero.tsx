"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { StarfieldBackground } from "@/components/ui/pricing";
import { ease } from "@/components/ui/primitives";
import { SCREENSHOTS } from "@/lib/screens";

const WORDS = ["Da compra", "Do estoque", "Da venda", "Do envio"];

function Rotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);
  // All phrases share one grid cell: the invisible copies reserve the width of the longest one,
  // so the headline never shifts while the phrase changes.
  return (
    <span className="relative inline-grid justify-items-center align-bottom">
      {WORDS.map((w) => (
        <span key={w} className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden>
          {w}
        </span>
      ))}
      <AnimatePresence initial={false}>
        <motion.span
          key={WORDS[i]}
          className="text-gradient col-start-1 row-start-1 whitespace-nowrap"
          initial={{ y: "60%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-60%", opacity: 0, transition: { duration: 0.3, ease } }}
          transition={{ duration: 0.55, ease }}
        >
          {WORDS[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden pt-32 sm:pt-40">
      <StarfieldBackground className="-z-10" />

      <div className="relative z-20 mx-auto flex max-w-5xl flex-col items-center px-4 text-center sm:px-6">
        <motion.h1
          className="font-display text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] text-balance sm:text-6xl md:text-7xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.08 }}
        >
          Tudo sob controle.
          <br />
          <Rotator /> <br className="lg:hidden" />
          ao lucro real.
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted text-pretty sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.18 }}
        >
          O ArbiFlow junta vendas, estoque físico, compras e finanças em um só painel. Descubra quanto você
          <span className="text-text"> realmente lucra</span> depois de taxas, frete e custo
          dos produtos.
        </motion.p>

        <motion.div
          className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.28 }}
        >
          <a
            href="#planos"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-medium text-white shadow-[0_12px_40px_-10px_var(--color-brand)] transition-[background-color,transform] duration-200 hover:bg-brand-2 active:scale-[0.97] sm:w-auto"
          >
            Garantir preço de lançamento
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#tour"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface/70 px-6 py-3.5 font-medium text-text backdrop-blur transition-colors duration-200 hover:border-brand/60 sm:w-auto"
          >
            <PlayCircle className="h-4 w-4 text-cyan" />
            Ver a plataforma
          </a>
        </motion.div>

      </div>

      <div className="relative mt-14 sm:mt-6 lg:-mt-40">
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center gap-3 px-4">
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-balance md:text-5xl">
                Sua operação inteira, <span className="text-gradient">em uma única tela.</span>
              </h2>
            </div>
          }
        >
          {/* original PNG at native size, no recompression */}
          <Image
            src={SCREENSHOTS.dashboard.src}
            alt="Dashboard do ArbiFlow com faturamento, lucro líquido e estoque"
            width={SCREENSHOTS.dashboard.width}
            height={SCREENSHOTS.dashboard.height}
            priority
            unoptimized
            className="mx-auto h-full w-full rounded-xl object-cover object-[52%_0%] md:rounded-2xl lg:object-[40%_0%]"
            draggable={false}
          />
        </ContainerScroll>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" aria-hidden />
      </div>
    </section>
  );
}
