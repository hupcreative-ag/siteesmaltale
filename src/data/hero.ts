/**
 * Banners do carrossel do hero da Home. O primeiro slide é sempre o hero institucional
 * (com o h1); estes banners entram depois dele.
 *
 * Banner com imagem null não renderiza. Com zero banners ativos, a Home mostra só o
 * hero institucional, sem carrossel. A arte é montada no site: foto + gradiente da marca
 * + texto real, então trocar a frase não exige refazer imagem.
 */
import type { ImageMetadata } from 'astro';

import podologia from '../assets/podologia/podologia-02.jpg';
import experiencia from '../assets/sobre/sobre-pagina.jpg';

export interface HeroBanner {
  id: string;
  /** Etiqueta curta acima do título. */
  tag: string;
  titulo: string;
  subtitulo: string;
  cta: { label: string; href: string };
  imagem: ImageMetadata | null;
  /** object-position da foto (o texto fica à esquerda no desktop). */
  posicao?: string;
}

export const HERO_BANNERS: HeroBanner[] = [
  {
    id: 'podologia',
    tag: 'Podologia',
    titulo: 'Podologia profissional para quem entende que beleza e saúde andam juntas.',
    subtitulo: 'Tratamento de encravadas, calos, rachaduras e muito mais.',
    cta: { label: 'Clique aqui e saiba mais', href: '/podologia/' },
    imagem: podologia,
    posicao: '60% 30%',
  },
  {
    id: 'experiencia',
    tag: 'Experiência',
    titulo: 'Do agendamento ao acabamento, cada detalhe importa.',
    subtitulo: 'Agendamento fácil, ambiente acolhedor e comodidade que faz a diferença.',
    cta: { label: 'Conheça a Esmaltale', href: '/sobre/' },
    imagem: experiencia,
    posicao: '70% 30%',
  },
];

export const bannersAtivos = HERO_BANNERS.filter(
  (b): b is HeroBanner & { imagem: ImageMetadata } => b.imagem !== null,
);
