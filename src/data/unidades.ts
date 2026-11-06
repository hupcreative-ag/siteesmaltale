/**
 * FONTE ÚNICA DE DADOS DAS UNIDADES.
 * Home, Lojas, modal, rodapé, JSON-LD e todo texto que cita quantidade ou nomes
 * de unidades leem deste arquivo. Para abrir, fechar ou editar uma unidade, mude só aqui.
 *
 * Ordem de exibição: unidades com novidade = true primeiro, depois a ordem abaixo.
 * Campos opcionais ausentes escondem o elemento correspondente (ver CLAUDE.md).
 */
import type { ImageMetadata } from 'astro';

import shoppingBarra from '../assets/lojas/shopping-barra.jpg';
import salvadorShopping from '../assets/lojas/salvador-shopping.jpg';
import shoppingDaBahia from '../assets/lojas/shopping-da-bahia.jpg';
import shoppingParalela from '../assets/lojas/shopping-paralela.jpg';
import shoppingBelaVista from '../assets/lojas/shopping-bela-vista.jpg';
import parqueShoppingBahia from '../assets/lojas/parque-shopping-bahia.jpg';

export interface Unidade {
  slug: string;
  nome: string;
  ativa: boolean;
  novidade: boolean;
  piso: string;
  loja?: string;
  referencia?: string;
  endereco: string;
  bairro?: string;
  cidade: string;
  uf: string;
  cep: string;
  telefone?: string;
  /** Somente dígitos com DDD, sem o 55. Ex.: 71999494089 */
  whatsapp: string;
  trinksUrl?: string;
  landingUrl?: string;
  /** ID do perfil no Google (o `fid` do painel do Perfil da Empresa). Vira o link público do Maps. */
  googleCid?: string;
  /** Coordenadas do perfil no Google Maps. */
  lat?: number;
  lng?: number;
  foto?: ImageMetadata;
  /** object-position da foto nos cards. */
  fotoPosicao?: string;
  /** Foto provisória (ex.: tapume): aparece no card, mas fica fora do grid de fotos da Sobre. */
  fotoProvisoria?: boolean;
}

export const UNIDADES: Unidade[] = [
  {
    slug: 'shopping-barra',
    nome: 'Shopping Barra',
    ativa: true,
    novidade: true,
    piso: 'Piso L3 Leste',
    referencia: 'Ao lado da Nike',
    endereco: 'Av. Centenário, 2992', // [A CONFIRMAR]
    bairro: 'Chame-Chame',
    cidade: 'Salvador',
    uf: 'BA',
    cep: '40155-151',
    whatsapp: '71999494089',
    // Página encontrada no Trinks com o nome da unidade; aguardando confirmação da cliente.
    trinksUrl: 'https://www.trinks.com/esmaltale-shopping-barra',
    googleCid: '7693819465966985537',
    lat: -13.0071675,
    lng: -38.5247271,
    foto: shoppingBarra,
    fotoPosicao: 'center',
  },
  {
    slug: 'salvador-shopping',
    nome: 'Salvador Shopping',
    ativa: true,
    novidade: false,
    piso: 'Piso L2',
    referencia: 'Próximo ao Lar Shopping',
    endereco: 'Av. Tancredo Neves, 3133',
    bairro: 'Caminho das Árvores',
    cidade: 'Salvador',
    uf: 'BA',
    cep: '41820-020',
    telefone: '7132725842',
    whatsapp: '71993016341',
    trinksUrl: 'https://www.trinks.com/esmaltalesalvadorshopping',
    landingUrl: 'https://loja.esmaltale.com.br/conheca/salvadorshopping',
    googleCid: '7686953596061038359',
    lat: -12.9785509,
    lng: -38.4541098,
    foto: salvadorShopping,
    fotoPosicao: 'center 40%',
  },
  {
    slug: 'shopping-da-bahia',
    nome: 'Shopping da Bahia',
    ativa: true,
    novidade: false,
    piso: 'Piso L3',
    referencia: 'Em frente à Riachuelo',
    endereco: 'Av. Tancredo Neves, 148',
    bairro: 'Caminho das Árvores',
    cidade: 'Salvador',
    uf: 'BA',
    cep: '41820-020',
    whatsapp: '71999231497',
    // O hífen no final faz parte do link (sem ele cai na home do Trinks).
    trinksUrl: 'https://www.trinks.com/esmaltale-shopping-da-bahia-',
    landingUrl: 'https://loja.esmaltale.com.br/conheca/shoppingdabahia',
    googleCid: '3673152592179540768',
    lat: -12.9817061,
    lng: -38.4646255,
    foto: shoppingDaBahia,
    fotoPosicao: 'center 30%',
  },
  {
    slug: 'shopping-paralela',
    nome: 'Shopping Paralela',
    ativa: true,
    novidade: false,
    piso: 'Piso L2',
    loja: 'Loja C213',
    referencia: 'Próximo à Centauro',
    endereco: 'Av. Luís Viana, 8544',
    bairro: 'Paralela',
    cidade: 'Salvador',
    uf: 'BA',
    cep: '41730-101',
    telefone: '7133661678',
    whatsapp: '71991152859',
    trinksUrl: 'https://www.trinks.com/esmaltale-shop-paralela',
    landingUrl: 'https://loja.esmaltale.com.br/conheca/shoppingparalela',
    googleCid: '1865418680387577062',
    lat: -12.9366876,
    lng: -38.3945855,
    foto: shoppingParalela,
    fotoPosicao: 'center 35%',
  },
  {
    slug: 'shopping-bela-vista',
    nome: 'Shopping Bela Vista',
    ativa: true,
    novidade: false,
    piso: 'Piso L2',
    referencia: 'Próximo à Alpha Fitness',
    endereco: 'Al. Euvaldo Luz, 92',
    bairro: 'Horto Bela Vista',
    cidade: 'Salvador',
    uf: 'BA',
    cep: '41100-000',
    telefone: '7134508098',
    whatsapp: '71997002950',
    trinksUrl: 'https://www.trinks.com/esmaltale-shopping-bela-vista',
    landingUrl: 'https://loja.esmaltale.com.br/conheca/shoppingbelavista',
    googleCid: '11797337463690376936',
    lat: -12.9704379,
    lng: -38.4742036,
    foto: shoppingBelaVista,
    fotoPosicao: 'center 30%',
  },
  {
    slug: 'parque-shopping-bahia',
    nome: 'Parque Shopping Bahia',
    ativa: true,
    novidade: false,
    piso: 'Piso L2',
    referencia: 'Próximo às Lojas Americanas',
    endereco: 'Av. Santos Dumont, 4360',
    cidade: 'Lauro de Freitas',
    uf: 'BA',
    cep: '42702-400',
    whatsapp: '71983259511',
    trinksUrl: 'https://www.trinks.com/esmaltale-salvador-norte-shopping',
    landingUrl: 'https://loja.esmaltale.com.br/conheca/parqueshoppingbahia',
    googleCid: '17028121796568796822',
    lat: -12.8884395,
    lng: -38.318028,
    foto: parqueShoppingBahia,
    fotoPosicao: 'center 45%',
  },
];
