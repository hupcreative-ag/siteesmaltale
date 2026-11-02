/** Galeria de resultados da Home: as mesmas fotos da galeria da landing de unidade aprovada. */
import type { ImageMetadata } from 'astro';

import g01 from '../assets/galeria/galeria-01.jpg';
import g02 from '../assets/galeria/galeria-02.jpg';
import g03 from '../assets/galeria/galeria-03.jpg';
import g04 from '../assets/galeria/galeria-04.jpg';
import g05 from '../assets/galeria/galeria-05.jpg';
import g06 from '../assets/galeria/galeria-06.jpg';
import g07 from '../assets/galeria/galeria-07.jpg';

export interface FotoGaleria {
  src: ImageMetadata;
  alt: string;
}

export const GALERIA: FotoGaleria[] = [
  { src: g01, alt: 'Unhas em tom rosa claro segurando uma xícara de café' },
  { src: g02, alt: 'Esmaltação vermelha e azul-turquesa em andamento' },
  { src: g03, alt: 'Profissional aplicando esmalte vermelho em uma cliente' },
  { src: g04, alt: 'Mãos com unhas azul-turquesa e anéis dourados' },
  { src: g05, alt: 'Cliente mostrando as unhas rosadas depois do atendimento' },
  { src: g06, alt: 'Procedimento de podologia com lixa elétrica' },
  { src: g07, alt: 'Alongamento em fibra de vidro com acabamento em degradê rosa' },
];
