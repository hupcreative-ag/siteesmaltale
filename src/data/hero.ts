/**
 * Carrossel de banners do hero da Home. Está DESLIGADO enquanto não houver banner com imagem:
 * banners com imagem null não renderizam e, com zero banners ativos, a Home mostra o
 * hero institucional. Para ligar, importe a imagem de src/assets e coloque em `imagem`.
 */
import type { ImageMetadata } from 'astro';

export interface HeroBanner {
  id: string;
  titulo: string;
  subtitulo: string;
  cta: { label: string; href: string };
  imagem: ImageMetadata | null;
}

export const HERO_BANNERS: HeroBanner[] = [
  {
    id: 'podologia',
    titulo: 'Podologia profissional para quem entende que beleza e saúde andam juntas.',
    subtitulo: 'Tratamento de encravadas, calos, rachaduras e muito mais.',
    cta: { label: 'Clique aqui e saiba mais', href: '/podologia/' },
    imagem: null,
  },
  {
    id: 'experiencia',
    titulo: 'Do agendamento ao acabamento, cada detalhe importa.',
    subtitulo: 'Agendamento fácil, ambiente acolhedor e comodidade que faz a diferença.',
    cta: { label: 'Conheça a Esmaltale', href: '/sobre/' },
    imagem: null,
  },
];

export const bannersAtivos = HERO_BANNERS.filter((b) => b.imagem !== null);
