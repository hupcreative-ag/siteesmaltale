/**
 * Cards de serviço da Home, na ordem do documento de conteúdo.
 * Sem `imagem`, o card usa o gradiente da marca com o ícone branco (ver PENDENCIAS.md).
 * `saibaMais` é o destino de "Saiba mais sobre o serviço"; sem ele, o card só tem "Agendar agora".
 */
import type { ImageMetadata } from 'astro';

import manicure from '../assets/servicos/manicure.jpg';
import pedicure from '../assets/servicos/pedicure.jpg';
import banhoDeGel from '../assets/servicos/banho-de-gel.jpg';
import banhoDeCristal from '../assets/servicos/banho-de-cristal.jpg';
import alongamento from '../assets/servicos/alongamento.jpg';
import unhasPosticas from '../assets/servicos/unhas-posticas.jpg';
import nailArt from '../assets/servicos/nail-art.jpg';
import spaDosPes from '../assets/servicos/spa-dos-pes.jpg';
import plasticaDosPes from '../assets/servicos/plastica-dos-pes.jpg';
import podologia from '../assets/servicos/podologia.jpg';

export interface Servico {
  slug: string;
  nome: string;
  descricao: string;
  imagem?: ImageMetadata;
  /** object-position da foto: enquadra o serviço na faixa estreita do celular. */
  foco?: string;
  saibaMais?: string;
}

export const SERVICOS: Servico[] = [
  {
    slug: 'manicure',
    nome: 'Manicure',
    descricao: 'Cuidado completo com as unhas das mãos: limpeza, cutícula, lixamento e esmaltação com acabamento impecável.',
    imagem: manicure,
    foco: 'center 42%',
  },
  {
    slug: 'pedicure',
    nome: 'Pedicure',
    descricao: 'O mesmo rigor da manicure para os pés. Limpeza, cutícula, lixamento e esmaltação com atenção a cada detalhe.',
    imagem: pedicure,
    foco: 'center 62%',
  },
  {
    slug: 'banho-de-gel',
    nome: 'Banho de Gel',
    descricao: 'Esmaltação de longa duração com gel de alta qualidade. Brilho intenso e resistência para o dia a dia.',
    imagem: banhoDeGel,
    foco: 'center 42%',
    saibaMais: '/nail-art/#banho-de-gel',
  },
  {
    slug: 'banho-de-cristal',
    nome: 'Banho de Cristal',
    // Texto substituído por orientação do briefing: o banho de cristal é feito só com gel.
    descricao: 'Esmaltação em gel que reforça a estrutura da unha natural, sem extensão. Resultado natural e duradouro.',
    imagem: banhoDeCristal,
    foco: 'center 58%',
    saibaMais: '/nail-art/#banho-de-cristal',
  },
  {
    slug: 'alongamento',
    nome: 'Alongamento de Unhas',
    descricao: 'Extensão profissional com modelagem personalizada no formato que mais combina com você, sempre com refinamento e acabamento.',
    imagem: alongamento,
    foco: 'center 50%',
    saibaMais: '/nail-art/#fibra-de-vidro',
  },
  {
    slug: 'unhas-posticas',
    nome: 'Aplicação de Unhas Postiças',
    descricao: 'Solução rápida e elegante para quem quer unhas mais longas e perfeitas em qualquer ocasião.',
    imagem: unhasPosticas,
    foco: 'center 48%',
    saibaMais: '/nail-art/#unhas-posticas',
  },
  {
    slug: 'nail-art',
    nome: 'Nail Art',
    descricao: 'Designs exclusivos e personalizados. Do minimalismo às tendências mais ousadas para realçar o seu estilo.',
    imagem: nailArt,
    foco: 'center 46%',
    saibaMais: '/nail-art/',
  },
  {
    slug: 'spa-das-maos',
    nome: 'SPA das Mãos',
    descricao: 'SPA completo de hidratação e cuidado para mãos ressecadas. Inclui esfoliação, máscara e massagem.',
    // Sem foto: a cliente não tem imagem deste serviço.
  },
  {
    slug: 'spa-dos-pes',
    nome: 'SPA dos Pés',
    descricao: 'Imersão relaxante com esfoliação, hidratação e massagem. Um momento só seu, do início ao fim.',
    imagem: spaDosPes,
    foco: 'center 45%',
  },
  {
    slug: 'plastica-dos-pes',
    nome: 'Plástica dos Pés',
    descricao: 'Tratamento intensivo para calcanhar e pele dos pés com resultados visíveis desde a primeira sessão.',
    imagem: plasticaDosPes,
    foco: 'center 45%',
  },
  {
    slug: 'podologia',
    nome: 'Podologia',
    descricao: 'Cuidado clínico com as unhas e a pele dos pés. Trata encravamentos, calos, fissuras e infecções com segurança e precisão.',
    imagem: podologia,
    foco: 'center 30%',
    saibaMais: '/podologia/',
  },
];
