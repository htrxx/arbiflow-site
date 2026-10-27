/**
 * App screenshots shown on the site, at native size.
 * Desktop/mobile captures use a fictional user ("Usuário") and fictional but consistent numbers.
 */
export const SCREENSHOTS = {
  dashboard: { src: "/screens/dashboard-desktop.webp", width: 2000, height: 1338 },
  heroVendas: { src: "/screens/hero-vendas.jpg", width: 1600, height: 900 },
  vendas: { src: "/screens/vendas.png", width: 1388, height: 646 },
  estoque: { src: "/screens/estoque-desktop.webp", width: 2000, height: 1501 },
  scanner: { src: "/screens/scanner-desktop.webp", width: 2000, height: 1250 },
  relatorios: { src: "/screens/relatorios-desktop.webp", width: 1531, height: 790 },
  despesas: { src: "/screens/despesas-desktop.webp", width: 2000, height: 1250 },
  devolucoes: { src: "/screens/devolucoes-desktop.webp", width: 2000, height: 1250 },
  banner: { src: "/screens/banner.png", width: 901, height: 566 },
  configuracoes: { src: "/screens/configuracoes-desktop.webp", width: 1428, height: 1665 },
} as const;

export type ScreenId = keyof typeof SCREENSHOTS;

/** Phone captures (portrait). Taller ones scroll inside the phone frame. */
export const MOBILE_SCREENSHOTS = [
  { id: "inicio", label: "Início", src: "/screens/dashboard-mobile.webp", width: 924, height: 2000 },
  { id: "estoque", label: "Estoque", src: "/screens/estoque-mobile.webp", width: 462, height: 2000 },
  { id: "despesas", label: "Despesas", src: "/screens/despesas-mobile.webp", width: 732, height: 2000 },
  { id: "metas", label: "Metas", src: "/screens/metas-mobile.webp", width: 480, height: 2000 },
] as const;
