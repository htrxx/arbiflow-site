import { NextResponse } from "next/server";
import { onlyDigits, validateCheckout, type CheckoutData } from "@/lib/checkout";
import { getPlan } from "@/lib/plans";

/**
 * Receives the subscriber's data and returns the payment link for the chosen plan.
 *
 * Configure in Vercel → Project → Settings → Environment Variables:
 *  - CHECKOUT_URL_STANDARD / CHECKOUT_URL_PRO: payment link of each plan
 *    (e.g. Mercado Pago, Stripe or Asaas subscription link).
 *  - LEAD_WEBHOOK_URL (optional): receives the form data as JSON
 *    (e.g. a Zapier/Make webhook, Google Sheets script or your own backend).
 */
export async function POST(req: Request) {
  let data: CheckoutData;
  try {
    data = (await req.json()) as CheckoutData;
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const errors = validateCheckout(data);
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "Verifique os campos destacados.", errors }, { status: 422 });
  }

  const plan = getPlan(data.plan);
  const lead = {
    plan: plan.id,
    planName: plan.name,
    price: plan.price,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: onlyDigits(data.phone),
    document: onlyDigits(data.document),
    store: data.store?.trim() || null,
    createdAt: new Date().toISOString(),
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch (err) {
      console.error("Lead webhook failed", err);
    }
  }

  const paymentUrl = plan.id === "pro" ? process.env.CHECKOUT_URL_PRO : process.env.CHECKOUT_URL_STANDARD;
  if (!paymentUrl) {
    return NextResponse.json(
      {
        error: webhook
          ? "O pagamento ainda não está disponível. Recebemos seus dados e entraremos em contato."
          : "O pagamento ainda não está disponível. Tente novamente em instantes.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ paymentUrl });
}
