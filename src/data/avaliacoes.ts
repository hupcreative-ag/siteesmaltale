/**
 * Avaliações do Google exibidas na Home. SOMENTE avaliações reais, copiadas do perfil
 * da Esmaltale no Google (nome como aparece lá, nota, texto, unidade e mês). Nunca inventar.
 *
 * Enquanto a lista estiver vazia, a seção mostra cards de [TEXTO PENDENTE] no preview.
 * `notaGeral` e `totalAvaliacoes` vêm do perfil no Google; null esconde o resumo.
 */
export interface Avaliacao {
  autor: string;
  nota: 1 | 2 | 3 | 4 | 5;
  texto: string;
  /** slug da unidade em src/data/unidades.ts */
  unidade?: string;
  /** Ex.: "outubro de 2026" */
  data?: string;
}

export const RESUMO_GOOGLE: { notaGeral: number | null; totalAvaliacoes: number | null; url: string | null } = {
  notaGeral: null,
  totalAvaliacoes: null,
  url: null,
};

export const AVALIACOES: Avaliacao[] = [];
