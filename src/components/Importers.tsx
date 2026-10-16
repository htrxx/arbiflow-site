"use client";

import { motion } from "framer-motion";
import { BarChart3, Landmark, Plane, Warehouse } from "lucide-react";
import { SectionHeading, ease } from "@/components/ui/primitives";

const POINTS = [
  {
    icon: Landmark,
    t: "Custo real de cada lote",
    d: "Lance no custo da compra tudo o que você pagou: produto, frete internacional, taxas e impostos. Cada unidade vendida sai com o custo do lote certo.",
  },
  {
    icon: Plane,
    t: "Encomendas a caminho",
    d: "Acompanhe os pedidos do fornecedor até a chegada. Quando o lote é recebido, o estoque e o custo médio se atualizam sozinhos.",
  },
  {
    icon: Warehouse,
    t: "Capital parado sob controle",
    d: "Saiba quanto dinheiro está em estoque, quanto está a caminho e qual lote está devolvendo o investimento mais rápido.",
  },
  {
    icon: BarChart3,
    t: "A próxima compra, decidida com dados",
    d: "Os relatórios mostram o que gira mais e onde a margem é melhor, para você recomprar na hora certa sem ficar sem estoque nem empatar capital.",
  },
];

export default function Importers() {
  return (
    <section id="importadores" className="relative py-24 sm:py-32">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-14 px-4 sm:px-6">
        <SectionHeading
          title={
            <>
              Para quem importa, <span className="text-gradient">é indispensável.</span>
            </>
          }
          subtitle="Importar significa capital parado, prazos longos e margens que mudam com o câmbio e os impostos. O ArbiFlow foi feito para essa rotina: você sabe quanto cada lote custou de verdade, o que ainda está a caminho e quanto ele vai render no marketplace."
        />
        <ul className="grid w-full gap-4 md:grid-cols-2">
          {POINTS.map((p, i) => (
            <motion.li
              key={p.t}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              className="flex gap-4 rounded-2xl border border-line-soft bg-surface/60 p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand/30 bg-brand/10">
                <p.icon className="h-5 w-5 text-brand-2" />
              </span>
              <div>
                <p className="font-display font-semibold">{p.t}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{p.d}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
