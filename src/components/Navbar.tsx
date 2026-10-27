"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo, ease } from "@/components/ui/primitives";

export const NAV = [
  { id: "recursos", label: "Recursos" },
  { id: "tour", label: "Plataforma" },
  { id: "celular", label: "Celular" },
  { id: "multicontas", label: "Multicontas" },
  { id: "planos", label: "Planos" },
  { id: "faq", label: "FAQ" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-6">
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease }}
          className={`flex items-center justify-between gap-4 rounded-2xl border px-3 py-2.5 transition-[background-color,border-color,box-shadow] duration-300 sm:px-4 ${
            scrolled
              ? "border-line bg-ink/75 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
          aria-label="Navegação principal"
        >
          <a href="#topo" className="shrink-0 rounded-lg" aria-label="ArbiFlow — início">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 xl:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className={`relative block rounded-full px-3.5 py-2 text-sm transition-colors duration-200 ${
                    active === n.id ? "text-text" : "text-muted hover:text-text"
                  }`}
                >
                  {active === n.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-line bg-surface-2"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#planos"
              className="hidden rounded-xl px-3.5 py-2 text-sm text-muted transition-colors hover:text-text sm:block"
            >
              Entrar
            </a>
            <a
              href="#planos"
              className="group hidden items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white shadow-[0_8px_30px_-8px_var(--color-brand)] transition-[background-color,transform] duration-200 hover:bg-brand-2 active:scale-[0.97] sm:inline-flex"
            >
              Ver planos
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface text-text xl:hidden"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 top-[76px] z-40 overflow-y-auto bg-ink/95 px-4 pb-8 pt-4 backdrop-blur-xl xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <motion.ul
              className="flex flex-col gap-1"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
            >
              {NAV.map((n) => (
                <motion.li
                  key={n.id}
                  variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { duration: 0.35, ease } } }}
                >
                  <a
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl border border-line-soft bg-surface px-4 py-4 font-display text-lg"
                  >
                    {n.label}
                    <ArrowRight className="h-4 w-4 text-muted" />
                  </a>
                </motion.li>
              ))}
              <motion.li variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="pt-3">
                <a
                  href="#planos"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-4 font-medium text-white"
                >
                  Ver planos <ArrowRight className="h-4 w-4" />
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
