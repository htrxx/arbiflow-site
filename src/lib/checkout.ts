export type CheckoutData = {
  plan: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  store?: string;
  acceptTerms: boolean;
};

export type CheckoutErrors = Partial<Record<keyof CheckoutData, string>>;

export const onlyDigits = (v: string) => v.replace(/\D/g, "");

export function maskPhone(v: string) {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** Masks as CPF (000.000.000-00) up to 11 digits, then as CNPJ (00.000.000/0000-00). */
export function maskDocument(v: string) {
  const d = onlyDigits(v).slice(0, 14);
  if (d.length <= 11) {
    return d
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return d
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

export function isValidCPF(value: string) {
  const c = onlyDigits(value);
  if (c.length !== 11 || /^(\d)\1{10}$/.test(c)) return false;
  const calc = (len: number) => {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += Number(c[i]) * (len + 1 - i);
    const r = (sum * 10) % 11;
    return r === 10 ? 0 : r;
  };
  return calc(9) === Number(c[9]) && calc(10) === Number(c[10]);
}

export function isValidCNPJ(value: string) {
  const c = onlyDigits(value);
  if (c.length !== 14 || /^(\d)\1{13}$/.test(c)) return false;
  const calc = (len: number) => {
    const weights = len === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const sum = weights.reduce((acc, w, i) => acc + Number(c[i]) * w, 0);
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };
  return calc(12) === Number(c[12]) && calc(13) === Number(c[13]);
}

export function validateCheckout(data: CheckoutData): CheckoutErrors {
  const e: CheckoutErrors = {};
  if (data.name.trim().split(/\s+/).length < 2) e.name = "Informe seu nome completo.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) e.email = "Informe um e-mail válido.";
  const phone = onlyDigits(data.phone);
  if (phone.length < 10 || phone.length > 11) e.phone = "Informe um telefone com DDD.";
  const doc = onlyDigits(data.document);
  if (doc.length <= 11 ? !isValidCPF(doc) : !isValidCNPJ(doc)) e.document = "CPF ou CNPJ inválido.";
  if (!data.acceptTerms) e.acceptTerms = "Você precisa aceitar os termos para continuar.";
  return e;
}
