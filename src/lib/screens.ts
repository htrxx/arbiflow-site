/** Real app screenshots, served exactly as provided (original PNG, native size). */
export const SCREENSHOTS = {
  dashboard: { src: "/screens/dashboard.png", width: 1600, height: 787 },
  vendas: { src: "/screens/vendas.png", width: 1388, height: 646 },
  estoque: { src: "/screens/estoque.png", width: 1394, height: 575 },
  relatorios: { src: "/screens/relatorios.png", width: 1363, height: 744 },
  despesas: { src: "/screens/despesas.png", width: 1360, height: 449 },
  banner: { src: "/screens/banner.png", width: 901, height: 566 },
  configuracoes: { src: "/screens/configuracoes.png", width: 868, height: 831 },
} as const;

export type ScreenId = keyof typeof SCREENSHOTS;
