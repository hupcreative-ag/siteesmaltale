import { UNIDADES, type Unidade } from '../data/unidades';
import { MENSAGENS_WHATSAPP } from '../config/site';

/** Unidades ativas na ordem de exibição: novidades primeiro, depois a ordem do arquivo. */
export const unidadesAtivas: Unidade[] = [
  ...UNIDADES.filter((u) => u.ativa && u.novidade),
  ...UNIDADES.filter((u) => u.ativa && !u.novidade),
];

/**
 * Ordem usada em frases corridas: a ordem do arquivo com as novidades no fim
 * ("..., Shopping Bela Vista e Shopping Barra").
 */
const unidadesParaTexto: Unidade[] = [
  ...UNIDADES.filter((u) => u.ativa && !u.novidade),
  ...UNIDADES.filter((u) => u.ativa && u.novidade),
];

export const totalUnidades = unidadesAtivas.length;

const EXTENSO_FEMININO = [
  'zero', 'uma', 'duas', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez',
  'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove', 'vinte',
];

/** Número por extenso no feminino (concorda com "unidades"). Acima de 20, volta ao algarismo. */
export function porExtenso(n: number, maiuscula = false): string {
  const texto = EXTENSO_FEMININO[n] ?? String(n);
  return maiuscula ? texto.charAt(0).toUpperCase() + texto.slice(1) : texto;
}

/** "a, b e c" */
export function listaComE(itens: string[]): string {
  if (itens.length <= 1) return itens.join('');
  return `${itens.slice(0, -1).join(', ')} e ${itens.at(-1)}`;
}

/** "Salvador Shopping, Shopping da Bahia, ... e Shopping Barra" */
export const listaNomes = listaComE(unidadesParaTexto.map((u) => u.nome));

/**
 * Bloco local agrupado por cidade, no formato do documento:
 * "no Salvador Shopping, ... e Shopping Barra, em Salvador, e no Parque Shopping Bahia, em Lauro de Freitas"
 */
export const listaPorCidade = (() => {
  const grupos = new Map<string, string[]>();
  for (const u of unidadesParaTexto) {
    grupos.set(u.cidade, [...(grupos.get(u.cidade) ?? []), u.nome]);
  }
  const partes = [...grupos].map(([cidade, nomes]) => `no ${listaComE(nomes)}, em ${cidade}`);
  if (partes.length <= 1) return partes.join('');
  return `${partes.slice(0, -1).join(', ')}, e ${partes.at(-1)}`;
})();

/** Cidades atendidas: "Salvador e Lauro de Freitas" */
export const listaCidades = listaComE([...new Set(unidadesParaTexto.map((u) => u.cidade))]);

// ---------- Links ----------

export function whatsappUrl(numero: string, mensagem?: string): string {
  const base = `https://wa.me/55${numero.replace(/\D/g, '')}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

export function whatsappAgendamento(u: Unidade): string {
  return whatsappUrl(u.whatsapp, MENSAGENS_WHATSAPP.agendamento(u.nome));
}

export function whatsappDuvida(u: Unidade): string {
  return whatsappUrl(u.whatsapp, MENSAGENS_WHATSAPP.duvida(u.nome));
}

export function enderecoCompleto(u: Unidade): string {
  return [u.endereco, u.bairro, `${u.cidade} - ${u.uf}`].filter(Boolean).join(' · ');
}

export function mapaUrl(u: Unidade): string {
  const consulta = `Esmaltale ${u.nome}, ${u.endereco}, ${u.cidade} - ${u.uf}, ${u.cep}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(consulta)}`;
}

/** "Piso L2 · Próximo à Centauro" (com loja quando houver) */
export function localizacao(u: Unidade, comLoja = false): string {
  return [u.piso, comLoja ? u.loja : undefined, u.referencia].filter(Boolean).join(' · ');
}

// ---------- Telefones ----------

export function formatarTelefone(digitos: string): string {
  const d = digitos.replace(/\D/g, '');
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return digitos;
}

export function telefoneHref(digitos: string): string {
  return `tel:+55${digitos.replace(/\D/g, '')}`;
}
