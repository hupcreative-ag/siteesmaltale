/**
 * FONTE ÚNICA DE DADOS DAS UNIDADES.
 * Home, Lojas, modal, rodapé, JSON-LD e todo texto que cita quantidade ou nomes
 * de unidades leem deste arquivo. Para abrir, fechar ou editar uma unidade, mude só aqui.
 *
 * Ordem de exibição: unidades com novidade = true primeiro, depois a ordem abaixo.
 * Campos opcionais ausentes escondem o elemento correspondente (ver CLAUDE.md).
 */
import type { ImageMetadata } from 'astro';

// Foto provisória do tapume da loja; trocar pela definitiva quando chegar.
import shoppingBarra from '../assets/lojas/shopping-barra.webp';
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
  lat?: number;
  lng?: number;
  foto?: ImageMetadata;
  /** object-position da foto nos cards. */
  fotoPosicao?: string;
}

export const UNIDADES: Unidade[] = [
  {
    slug: 'shopping-barra',
    nome: 'Shopping Barra',
    ativa: true,
    novidade: true,
    piso: 'Piso L3',
    // referencia: [A CONFIRMAR]
    endereco: 'Av. Centenário, 2992', // [A CONFIRMAR]
    bairro: 'Chame-Chame',
    cidade: 'Salvador',
    uf: 'BA',
    cep: '40155-151',
    whatsapp: '71999494089',
    // Página encontrada no Trinks com o nome da unidade; aguardando confirmação da cliente.
    trinksUrl: 'https://www.trinks.com/esmaltale-shopping-barra',
    foto: shoppingBarra,
    fotoPosicao: 'center 34%',
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
    lat: -12.9785,
    lng: -38.4551,
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
    lat: -12.9808,
    lng: -38.4687,
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
    lat: -12.9463,
    lng: -38.4112,
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
    lat: -12.9792,
    lng: -38.4815,
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
    lat: -12.893111,
    lng: -38.330456,
    foto: parqueShoppingBahia,
    fotoPosicao: 'center 45%',
  },
];
