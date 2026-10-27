"use client";

import { motion } from "framer-motion";
import { Bell, Smartphone, ScanBarcode } from "lucide-react";
import Image from "next/image";
import { SectionHeading, ease } from "@/components/ui/primitives";
import { MOBILE_SCREENSHOTS } from "@/lib/screens";

const PHONE_RATIO = 9 / 19.5;

function Phone({
  shot,
  index,
}: {
  shot: (typeof MOBILE_SCREENSHOTS)[number];
  index: number;
}) {
  // Screens taller than the phone scroll slowly inside it so the whole page can be seen.
  const tall = shot.width / shot.height < PHONE_RATIO - 0.01;
  const seconds = Math.round(8 + (shot.height / shot.width) * 3);
  return (
    <motion.figure
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease, delay: index * 0.1 }}
      className={`flex w-[240px] shrink-0 snap-center flex-col items-center gap-4 sm:w-[260px] lg:w-auto ${
        index % 2 === 1 ? "lg:translate-y-10" : ""
      }`}
    >
      <div className="relative w-full rounded-[2.6rem] border border-line bg-[#0b0d14] p-2.5 shadow-[0_40px_90px_-30px_rgba(31,107,255,0.55)]">
        <div
          className="group relative w-full overflow-hidden rounded-[2.1rem] bg-ink [container-type:size]"
          style={{ aspectRatio: `${PHONE_RATIO}` }}
        >
          <Image
            src={shot.src}
            alt={`Tela ${shot.label} do ArbiFlow no celular`}
            width={shot.width}
            height={shot.height}
            unoptimized
            draggable={false}
            className={`absolute left-0 top-0 block h-auto w-full ${
              tall ? "animate-phone-scroll group-hover:[animation-play-state:paused]" : ""
            }`}
            style={tall ? ({ animationDuration: `${seconds}s`, animationDelay: `${index * 1.2}s` } as React.CSSProperties) : undefined}
          />
        </div>
      </div>
      <figcaption className="text-sm font-medium text-muted">{shot.label}</figcaption>
    </motion.figure>
  );
}

export default function MobileApp() {
  const points = [
    { icon: Smartphone, t: "Direto no navegador", d: "Abra no celular e adicione à tela de início como um app." },
    { icon: ScanBarcode, t: "Scanner na palma da mão", d: "Use a câmera para conferir etiquetas e dar entrada no estoque." },
    { icon: Bell, t: "Avisos na hora", d: "Vendas, prazos de envio e metas chegam como notificação." },
  ];
  return (
    <section id="celular" className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-[420px] max-w-4xl -translate-y-1/2 rounded-full bg-brand/10 blur-[140px]"
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          title={
            <>
              No celular, <span className="text-gradient">completo como no computador.</span>
            </>
          }
          subtitle="Acompanhe lucro, estoque, despesas e metas de onde estiver, com menu inferior pensado para o toque."
        />

        <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">
          {points.map((p) => (
            <li key={p.t} className="flex items-start gap-3 rounded-2xl border border-line-soft bg-surface/60 p-4">
              <p.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-2" aria-hidden />
              <span>
                <span className="block text-sm font-semibold">{p.t}</span>
                <span className="mt-0.5 block text-sm leading-relaxed text-muted">{p.d}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[calc(50vw-120px)] pb-14 [scrollbar-width:none] sm:px-[calc(50vw-130px)] lg:mx-auto lg:grid lg:max-w-6xl lg:grid-cols-4 lg:gap-8 lg:overflow-visible lg:px-6"
        aria-label="Telas do ArbiFlow no celular"
      >
        {MOBILE_SCREENSHOTS.map((shot, i) => (
          <Phone key={shot.id} shot={shot} index={i} />
        ))}
      </div>
      <p className="-mt-6 text-center text-xs text-muted lg:hidden">Arraste para o lado para ver mais telas</p>
    </section>
  );
}
