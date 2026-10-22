"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { WHATSAPP_NUMBER, whatsappLink } from "@/lib/contact";

const ease = [0.22, 1, 0.36, 1] as const;

const QUICK = [
  "Quero saber mais sobre os planos",
  "Como o ArbiFlow calcula o lucro real?",
  "Funciona com várias contas?",
  "Preciso de ajuda para assinar",
];

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden fill="currentColor">
      <path d="M16.04 3C9.06 3 3.4 8.64 3.4 15.6c0 2.22.58 4.39 1.69 6.3L3.3 28.5l6.78-1.77a12.66 12.66 0 0 0 5.96 1.5h.01c6.97 0 12.64-5.64 12.64-12.6C28.69 8.64 23.01 3 16.04 3Zm0 23.07h-.01a10.5 10.5 0 0 1-5.35-1.46l-.38-.23-4.02 1.05 1.07-3.91-.25-.4a10.4 10.4 0 0 1-1.6-5.52c0-5.78 4.71-10.48 10.54-10.48 2.82 0 5.46 1.09 7.45 3.07a10.39 10.39 0 0 1 3.09 7.42c0 5.78-4.72 10.46-10.54 10.46Zm5.78-7.84c-.32-.16-1.87-.92-2.16-1.02-.29-.11-.5-.16-.71.16-.21.32-.82 1.02-1 1.23-.18.21-.37.24-.69.08-.32-.16-1.33-.49-2.54-1.56a9.5 9.5 0 0 1-1.76-2.18c-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.98-2.34-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.4-.29.32-1.1 1.07-1.1 2.62 0 1.55 1.13 3.04 1.29 3.25.16.21 2.22 3.38 5.38 4.74.75.32 1.34.52 1.8.66.76.24 1.44.2 1.98.12.6-.09 1.87-.76 2.13-1.5.26-.73.26-1.36.18-1.5-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

export default function WhatsAppChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [nudge, setNudge] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Show a small "Dúvidas?" bubble once, a few seconds after the visitor arrives.
  useEffect(() => {
    const show = setTimeout(() => setNudge(true), 6000);
    const hide = setTimeout(() => setNudge(false), 14000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setNudge(false);
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!WHATSAPP_NUMBER) return null;

  const send = (text: string) => {
    const body = text.trim();
    if (!body) return;
    window.open(whatsappLink(`Olá! Vim pelo site do ArbiFlow. ${body}`), "_blank", "noopener,noreferrer");
    setMessage("");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6 [padding-bottom:env(safe-area-inset-bottom)]">
      <AnimatePresence>
        {open && (
          <motion.div
            id="whatsapp-chat"
            role="dialog"
            aria-label="Conversar com o comercial pelo WhatsApp"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3, ease }}
            style={{ transformOrigin: "100% 100%" }}
            className="w-[calc(100vw-2rem)] max-w-[360px] overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center gap-3 bg-[#0b3d2e] px-4 py-3.5">
              <span className="relative">
                <Image src="/logo.svg" alt="" width={40} height={40} className="h-10 w-10 rounded-full" />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0b3d2e] bg-[#25D366]" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[15px] font-semibold leading-tight text-white">ArbiFlow · Comercial</p>
                <p className="text-xs text-white/70">Tire suas dúvidas pelo WhatsApp</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Fechar chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3 bg-[#0a0f1c] px-4 py-4">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="max-w-[85%] rounded-2xl rounded-tl-md bg-surface-2 px-3.5 py-2.5 text-sm leading-relaxed text-text"
              >
                Olá! Ficou com alguma dúvida sobre o ArbiFlow ou os planos? Mande sua mensagem e falamos com você pelo
                WhatsApp.
              </motion.div>

              <div className="flex flex-wrap gap-2" aria-label="Perguntas rápidas">
                {QUICK.map((q, i) => (
                  <motion.button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.05, duration: 0.25 }}
                    className="min-h-9 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-3 py-1.5 text-left text-xs text-[#7ef0a8] transition-colors hover:bg-[#25D366]/20"
                  >
                    {q}
                  </motion.button>
                ))}
              </div>
            </div>

            <form
              className="flex items-end gap-2 border-t border-line-soft bg-surface px-3 py-3"
              onSubmit={(e) => {
                e.preventDefault();
                send(message);
              }}
            >
              <label htmlFor="whatsapp-message" className="sr-only">
                Sua mensagem
              </label>
              <textarea
                id="whatsapp-message"
                ref={inputRef}
                rows={1}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(message);
                  }
                }}
                placeholder="Escreva sua dúvida…"
                className="max-h-28 min-h-11 flex-1 resize-none rounded-2xl border border-line bg-ink/70 px-3.5 py-2.5 text-[15px] text-text outline-none placeholder:text-muted/60 focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/25"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-[#05301c] transition-[transform,opacity] active:scale-95 disabled:opacity-40"
                aria-label="Enviar pelo WhatsApp"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <AnimatePresence>
          {nudge && !open && (
            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10, transition: { duration: 0.15 } }}
              className="hidden rounded-2xl border border-line bg-surface px-3.5 py-2 text-sm text-text shadow-xl sm:block"
            >
              Dúvidas? Fale com a gente
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="whatsapp-chat"
          aria-label={open ? "Fechar chat do WhatsApp" : "Falar com o comercial pelo WhatsApp"}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_32px_-8px_rgba(37,211,102,0.65)]"
        >
          {!open && (
            <span className="absolute inset-0 rounded-full bg-[#25D366]/40 motion-safe:animate-ping [animation-duration:2.4s]" aria-hidden />
          )}
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="h-6 w-6" />
              </motion.span>
            ) : (
              <motion.span key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <WhatsAppIcon className="h-7 w-7" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
