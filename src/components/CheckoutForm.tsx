"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { AlertCircle, ArrowLeft, ArrowRight, Check, Gift, Loader2, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState, type ReactNode } from "react";
import { StarfieldBackground } from "@/components/ui/pricing";
import { Logo, ease } from "@/components/ui/primitives";
import {
  maskDocument,
  maskPhone,
  validateCheckout,
  type CheckoutData,
  type CheckoutErrors,
} from "@/lib/checkout";
import { PLANS, brl, getPlan, type PlanId } from "@/lib/plans";

function Field({
  label,
  hint,
  error,
  children,
  id,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  id: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-text">
        {label}
        {hint && <span className="ml-1.5 font-normal text-muted">{hint}</span>}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1.5 overflow-hidden text-xs text-danger"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass = (invalid?: boolean) =>
  `min-h-12 w-full rounded-xl border bg-ink/70 px-4 text-[15px] text-text placeholder:text-muted/60 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/30 ${
    invalid ? "border-danger/70" : "border-line"
  }`;

export default function CheckoutForm({ initialPlan }: { initialPlan: PlanId }) {
  const router = useRouter();
  const uid = useId();
  const [planId, setPlanId] = useState<PlanId>(initialPlan);
  const plan = getPlan(planId);
  const [data, setData] = useState<Omit<CheckoutData, "plan">>({
    name: "",
    email: "",
    phone: "",
    document: "",
    store: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof CheckoutData, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "redirecting">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const set = <K extends keyof typeof data>(k: K, v: (typeof data)[K]) => {
    const next = { ...data, [k]: v };
    setData(next);
    if (touched[k]) setErrors(validateCheckout({ ...next, plan: planId }));
  };
  const blur = (k: keyof CheckoutData) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validateCheckout({ ...data, plan: planId }));
  };
  const shown = (k: keyof CheckoutData) => (touched[k] ? errors[k] : undefined);

  const choosePlan = (id: PlanId) => {
    setPlanId(id);
    router.replace(`/assinar?plano=${id}`, { scroll: false });
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload: CheckoutData = { ...data, plan: planId };
    const errs = validateCheckout(payload);
    setErrors(errs);
    setTouched({ name: true, email: true, phone: true, document: true, acceptTerms: true });
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    setStatus("loading");
    setServerError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { paymentUrl?: string; error?: string; errors?: CheckoutErrors };
      if (!res.ok || !json.paymentUrl) {
        if (json.errors) setErrors(json.errors);
        setServerError(json.error ?? "Não foi possível continuar. Tente novamente.");
        setStatus("idle");
        return;
      }
      setStatus("redirecting");
      window.location.href = json.paymentUrl;
    } catch {
      setServerError("Sem conexão. Verifique sua internet e tente novamente.");
      setStatus("idle");
    }
  }

  const id = (k: string) => `${uid}-${k}`;
  const describedBy = (k: keyof CheckoutData) => (shown(k) ? `${id(k)}-error` : undefined);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-dvh overflow-hidden">
        <StarfieldBackground className="-z-10" />

        <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <Link href="/" className="rounded-lg" aria-label="ArbiFlow — página inicial">
            <Logo />
          </Link>
          <Link
            href="/#planos"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm text-muted transition-colors hover:text-text"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar aos planos
          </Link>
        </header>

        <main className="mx-auto grid max-w-6xl gap-8 px-4 pb-20 pt-4 sm:px-6 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            aria-labelledby="checkout-title"
          >
            <ol className="flex items-center gap-3 text-sm" aria-label="Etapas da assinatura">
              <li className="flex items-center gap-2 font-medium text-text" aria-current="step">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs text-white">1</span>
                Seus dados
              </li>
              <span className="h-px w-8 bg-line" aria-hidden />
              <li className="flex items-center gap-2 text-muted">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-xs">2</span>
                Pagamento
              </li>
            </ol>

            <h1 id="checkout-title" className="mt-8 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Falta pouco para assinar o ArbiFlow
            </h1>
            <p className="mt-2 text-muted">
              Preencha seus dados para criarmos sua conta. Em seguida, você segue para o pagamento seguro.
            </p>

            <form noValidate onSubmit={onSubmit} className="mt-8 flex flex-col gap-6">
              <fieldset>
                <legend className="mb-3 text-sm font-medium text-text">Plano escolhido</legend>
                <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Plano">
                  {PLANS.map((p) => {
                    const active = p.id === planId;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => choosePlan(p.id)}
                        className={`relative flex min-h-16 items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${
                          active ? "border-brand bg-brand/10" : "border-line bg-surface/60 hover:border-brand/50"
                        }`}
                      >
                        <span>
                          <span className="block font-display font-semibold">{p.name}</span>
                          <span className="block text-xs text-muted">
                            {brl(p.price)}/{p.period} na promoção
                          </span>
                        </span>
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                            active ? "border-brand bg-brand" : "border-line"
                          }`}
                          aria-hidden
                        >
                          {active && <Check className="h-3 w-3 text-white" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <Field id={id("name")} label="Nome completo" error={shown("name")}>
                <input
                  id={id("name")}
                  name="name"
                  autoComplete="name"
                  value={data.name}
                  onChange={(e) => set("name", e.target.value)}
                  onBlur={() => blur("name")}
                  aria-invalid={!!shown("name")}
                  aria-describedby={describedBy("name")}
                  className={inputClass(!!shown("name"))}
                  placeholder="Seu nome e sobrenome"
                />
              </Field>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field id={id("email")} label="E-mail" error={shown("email")}>
                  <input
                    id={id("email")}
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={data.email}
                    onChange={(e) => set("email", e.target.value)}
                    onBlur={() => blur("email")}
                    aria-invalid={!!shown("email")}
                    aria-describedby={describedBy("email")}
                    className={inputClass(!!shown("email"))}
                    placeholder="voce@email.com"
                  />
                </Field>
                <Field id={id("phone")} label="WhatsApp" error={shown("phone")}>
                  <input
                    id={id("phone")}
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    value={data.phone}
                    onChange={(e) => set("phone", maskPhone(e.target.value))}
                    onBlur={() => blur("phone")}
                    aria-invalid={!!shown("phone")}
                    aria-describedby={describedBy("phone")}
                    className={inputClass(!!shown("phone"))}
                    placeholder="(11) 98765-4321"
                  />
                </Field>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field id={id("document")} label="CPF ou CNPJ" error={shown("document")}>
                  <input
                    id={id("document")}
                    name="document"
                    inputMode="numeric"
                    value={data.document}
                    onChange={(e) => set("document", maskDocument(e.target.value))}
                    onBlur={() => blur("document")}
                    aria-invalid={!!shown("document")}
                    aria-describedby={describedBy("document")}
                    className={inputClass(!!shown("document"))}
                    placeholder="000.000.000-00"
                  />
                </Field>
                <Field id={id("store")} label="Nome da loja" hint="(opcional)">
                  <input
                    id={id("store")}
                    name="store"
                    autoComplete="organization"
                    value={data.store}
                    onChange={(e) => set("store", e.target.value)}
                    className={inputClass()}
                    placeholder="Como sua loja aparece no marketplace"
                  />
                </Field>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
                  <input
                    id={id("acceptTerms")}
                    type="checkbox"
                    checked={data.acceptTerms}
                    onChange={(e) => {
                      set("acceptTerms", e.target.checked);
                      setTouched((t) => ({ ...t, acceptTerms: true }));
                      setErrors(validateCheckout({ ...data, acceptTerms: e.target.checked, plan: planId }));
                    }}
                    aria-invalid={!!shown("acceptTerms")}
                    aria-describedby={describedBy("acceptTerms")}
                    className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[var(--color-brand)]"
                  />
                  <span>
                    Li e aceito os termos de uso e a política de privacidade, e autorizo o uso dos meus dados para criar
                    minha conta e processar a assinatura.
                  </span>
                </label>
                {shown("acceptTerms") && (
                  <p id={`${id("acceptTerms")}-error`} role="alert" className="flex items-center gap-1.5 text-xs text-danger">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    {shown("acceptTerms")}
                  </p>
                )}
              </div>

              <AnimatePresence>
                {serverError && (
                  <motion.div
                    role="alert"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-3 rounded-xl border border-warn/40 bg-warn/10 p-4 text-sm text-text"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warn" aria-hidden />
                    {serverError}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={status !== "idle"}
                className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-4 font-medium text-white shadow-[0_12px_40px_-10px_var(--color-brand)] transition-[background-color,transform,opacity] duration-200 hover:bg-brand-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "idle" ? (
                  <>
                    Continuar para o pagamento
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                ) : (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    {status === "loading" ? "Enviando seus dados…" : "Abrindo o pagamento…"}
                  </>
                )}
              </button>
              <p className="flex items-center justify-center gap-2 text-xs text-muted">
                <Lock className="h-3.5 w-3.5" aria-hidden /> Seus dados são enviados com segurança.
              </p>
            </form>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="lg:pt-24"
            aria-label="Resumo da assinatura"
          >
            <div className="card glow-border relative p-6 lg:sticky lg:top-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan">Promoção de lançamento</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.3, ease }}
                >
                  <h2 className="mt-2 font-display text-2xl font-semibold">Plano {plan.name}</h2>
                  <p className="mt-1 text-sm text-muted">{plan.description}</p>

                  <div className="mt-6 flex items-end justify-between gap-4 border-y border-line-soft py-5">
                    <div>
                      <p className="text-sm text-muted">
                        de <span className="line-through decoration-danger/80">{brl(plan.originalPrice ?? plan.price)}</span>{" "}
                        por
                      </p>
                      <p className="font-display text-4xl font-semibold tabular-nums">
                        {brl(plan.price)}
                        <span className="ml-1 text-sm font-normal text-muted">/{plan.period}</span>
                      </p>
                    </div>
                  </div>
                  {plan.laterPrice && (
                    <p className="mt-3 text-xs text-muted">
                      Preço promocional. Após o lançamento, {brl(plan.laterPrice)}/{plan.period}.
                    </p>
                  )}

                  {plan.bonus && (
                    <div className="mt-5 flex items-start gap-3 rounded-xl border border-cyan/30 bg-cyan/10 p-3 text-sm">
                      <Gift className="mt-0.5 h-5 w-5 shrink-0 text-cyan" aria-hidden />
                      <span>{plan.bonus}</span>
                    </div>
                  )}

                  <ul className="mt-6 flex flex-col gap-2.5 text-sm">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-2" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex items-center gap-3 rounded-xl border border-line-soft bg-ink/50 p-3 text-xs text-muted">
                <ShieldCheck className="h-5 w-5 shrink-0 text-profit" aria-hidden />
                Pagamento processado em ambiente seguro.
              </div>
            </div>
          </motion.aside>
        </main>
      </div>
    </MotionConfig>
  );
}
