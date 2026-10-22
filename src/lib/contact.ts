/**
 * Sales WhatsApp number in international format, digits only (e.g. 5511987654321).
 * Set NEXT_PUBLIC_WHATSAPP_NUMBER in Vercel → Settings → Environment Variables.
 * While it is empty, the WhatsApp button is not shown.
 */
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
