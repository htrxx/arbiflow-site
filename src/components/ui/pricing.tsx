"use client";

import { motion, useSpring } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Check, Gift, Rocket, Star as LucideStar } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILITY FUNCTIONS ---

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}

// --- BASE UI COMPONENTS (BUTTON) ---

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

// --- INTERACTIVE STARFIELD ---

type MousePosition = { x: number | null; y: number | null };

function Star({
  mousePosition,
  containerRef,
}: {
  mousePosition: MousePosition;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  // Random values are created once per star (client-only, see InteractiveStarfield).
  const [seed] = useState(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${1 + Math.random() * 2}px`,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 5,
  }));

  const springConfig = { stiffness: 100, damping: 15, mass: 0.1 };
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  useEffect(() => {
    if (
      !containerRef.current ||
      mousePosition.x === null ||
      mousePosition.y === null
    ) {
      springX.set(0);
      springY.set(0);
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const starX =
      containerRect.left + (parseFloat(seed.left) / 100) * containerRect.width;
    const starY =
      containerRect.top + (parseFloat(seed.top) / 100) * containerRect.height;

    const deltaX = mousePosition.x - starX;
    const deltaY = mousePosition.y - starY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const radius = 600; // Radius of magnetic influence

    if (distance < radius) {
      const force = 1 - distance / radius;
      springX.set(deltaX * force * 0.5);
      springY.set(deltaY * force * 0.5);
    } else {
      springX.set(0);
      springY.set(0);
    }
  }, [mousePosition, seed, containerRef, springX, springY]);

  return (
    <motion.div
      className="absolute bg-foreground rounded-full"
      style={{
        top: seed.top,
        left: seed.left,
        width: seed.size,
        height: seed.size,
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{
        duration: seed.duration,
        repeat: Infinity,
        delay: seed.delay,
      }}
    />
  );
}

function InteractiveStarfield({
  mousePosition,
  containerRef,
}: {
  mousePosition: MousePosition;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  // Stars use random positions, so render them only after mount to avoid hydration mismatches.
  // Fewer stars on phones keeps scrolling smooth.
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(window.matchMedia("(max-width: 767px)").matches ? 55 : 150);
  }, []);
  if (!count) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={`star-${i}`}
          mousePosition={mousePosition}
          containerRef={containerRef}
        />
      ))}
    </div>
  );
}

/**
 * Drop-in starfield background: place inside any `relative` element.
 * It tracks the mouse over its parent, so stars drift toward the cursor.
 */
export function StarfieldBackground({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: null, y: null });

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const onMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    const onLeave = () => setMousePosition({ x: null, y: null });
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      <InteractiveStarfield mousePosition={mousePosition} containerRef={ref} />
    </div>
  );
}

// --- PRICING COMPONENT LOGIC ---

export interface PricingPlan {
  name: string;
  /** Current (launch) price, e.g. "19.90" */
  price: string;
  /** Regular price shown struck through, e.g. "59.90" */
  originalPrice?: string;
  /** Price that applies after the launch period, e.g. "39.90" */
  laterPrice?: string;
  period: string;
  features: string[];
  description: string;
  /** Optional bonus highlighted on the card */
  bonus?: React.ReactNode;
  buttonText: string;
  href: string;
  isPopular?: boolean;
}

interface PricingSectionProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
  /** Small banner above the cards (e.g. launch offer) */
  badge?: string;
}

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function PricingSection({
  plans,
  title = "Planos simples e transparentes",
  description = "Escolha o plano ideal para a sua operação.",
  badge,
}: PricingSectionProps) {
  return (
    <div className="relative w-full bg-background py-16 sm:py-24">
      <StarfieldBackground />
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          {badge && (
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ring">
              <Rocket className="h-4 w-4" aria-hidden />
              {badge}
            </span>
          )}
          <h2 className="font-display text-4xl font-bold tracking-tighter sm:text-5xl text-foreground text-balance">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg whitespace-pre-line">
            {description}
          </p>
        </div>
        <div
          className={cn(
            "mt-16 grid grid-cols-1 items-start gap-8 mx-auto",
            plans.length === 2 ? "md:grid-cols-2 max-w-4xl" : "lg:grid-cols-3",
          )}
        >
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const price = Number(plan.price);
  const original = plan.originalPrice ? Number(plan.originalPrice) : price;
  // Starts at the regular price and "drops" to the launch price once the card is seen.
  const [shown, setShown] = useState(original);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{
        y: plan.isPopular && isDesktop ? -20 : 0,
        opacity: 1,
      }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        window.setTimeout(() => setShown(price), 500 + index * 200);
      }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.15,
      }}
      className={cn(
        "rounded-2xl p-8 flex flex-col relative bg-background/70 backdrop-blur-sm",
        plan.isPopular
          ? "border-2 border-primary shadow-xl shadow-primary/20"
          : "border border-border",
      )}
    >
      {plan.isPopular && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <div className="bg-primary py-1.5 px-4 rounded-full flex items-center gap-1.5 whitespace-nowrap">
            <LucideStar className="text-primary-foreground h-4 w-4 fill-current" />
            <span className="text-primary-foreground text-sm font-semibold">
              Mais escolhido
            </span>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col text-center">
        <h3 className="font-display text-xl font-semibold text-foreground">{plan.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>

        {plan.originalPrice && (
          <p className="mt-6 text-sm text-muted-foreground">
            Promoção: de <span className="line-through decoration-destructive/80">{brl(original)}</span> por
          </p>
        )}
        <div className={cn("flex items-baseline justify-center gap-x-1", plan.originalPrice ? "mt-1" : "mt-6")}>
          <span className="font-display text-5xl font-bold tracking-tight text-foreground">
            <NumberFlow
              value={shown}
              locales="pt-BR"
              format={{ style: "currency", currency: "BRL", minimumFractionDigits: 2 }}
              className="tabular-nums"
            />
          </span>
          <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
            / {plan.period}
          </span>
        </div>
        {plan.laterPrice && (
          <p className="text-xs text-muted-foreground mt-2">
            Preço promocional · após o lançamento{" "}
            <span className="text-foreground">{brl(Number(plan.laterPrice))}/{plan.period}</span>
          </p>
        )}

        {plan.bonus && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-ring/30 bg-ring/10 p-3 text-left text-sm">
            <Gift className="mt-0.5 h-5 w-5 flex-none text-ring" aria-hidden />
            <span className="text-foreground">{plan.bonus}</span>
          </div>
        )}

        <ul
          role="list"
          className="mt-8 space-y-3 text-sm leading-6 text-left text-muted-foreground"
        >
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-x-3">
              <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <Link
            href={plan.href}
            className={cn(
              buttonVariants({
                variant: plan.isPopular ? "default" : "outline",
                size: "lg",
              }),
              "w-full rounded-xl",
            )}
          >
            {plan.buttonText}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
