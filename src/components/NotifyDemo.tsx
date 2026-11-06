"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ease } from "@/components/ui/primitives";

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

export default function NotifyDemo() {
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
