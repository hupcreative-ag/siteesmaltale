/**
 * Textos da página Podologia (documento de conteúdo), usados na página, no JSON-LD e no
 * /llms-full.txt. As fotos dos tratamentos ficam em src/assets/podologia/<arquivo>.
 */
export const DESCRICAO_PODOLOGIA =
  'Tratamento de unhas encravadas, calos, fissuras, micoses e bolhas com profissionais treinadas e instrumentos esterilizados em autoclave.';

export const INTRO_PODOLOGIA =
  'Os pés carregam o peso do dia todo e merecem o mesmo cuidado que qualquer outra parte do corpo. Podologia não é estética: é saúde. Na Esmaltale, o serviço é realizado por profissionais treinadas para identificar, tratar e prevenir problemas reais.';

export interface Tratamento {
  nome: string;
  texto: string;
  arquivo: string;
  alt: string;
}

export const TRATAMENTOS: Tratamento[] = [
  {
    nome: 'Unhas encravadas',
    texto: 'Tratamento do encravamento sem cirurgia, com técnica adequada para cada grau de severidade e orientação para prevenção.',
    arquivo: 'tratamento-unhas-encravadas',
    alt: 'Podóloga de luvas tratando a lateral da unha do dedão de uma cliente',
  },
  {
    nome: 'Calos e hiperqueratose',
    texto: 'Remoção segura de calos, durezas e pele grossa nas regiões de pressão dos pés.',
    arquivo: 'tratamento-calos',
    alt: 'Podóloga de luvas lixando a sola do pé de uma cliente',
  },
  {
    nome: 'Fissuras e rachaduras',
    texto: 'Tratamento de fissuras nos calcanhares com hidratação profunda e remoção da pele seca acumulada.',
    arquivo: 'tratamento-fissuras',
    alt: 'Mãos de luvas aplicando creme hidratante no calcanhar de uma cliente',
  },
  {
    nome: 'Infecções e micoses',
    texto:
      'Identificação e manejo inicial de micoses nas unhas e entre os dedos, com orientação sobre cuidados e encaminhamento quando necessário.',
    arquivo: 'tratamento-micoses',
    alt: 'Podóloga de luvas examinando as unhas do pé de uma cliente com lupa',
  },
  {
    nome: 'Bolhas e úlceras',
    texto: 'Cuidado com lesões nos pés com protocolo de higiene rigoroso.',
    arquivo: 'tratamento-bolhas',
    alt: 'Instrumentos esterilizados e gaze sobre bandeja ao lado do pé de uma cliente',
  },
];
