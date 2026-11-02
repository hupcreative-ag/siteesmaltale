/**
 * Serviços da página Nail Art, com o texto do documento de conteúdo.
 * Os blocos locais montam a lista de unidades a partir de src/data/unidades.ts (listaPorCidade).
 * As perguntas "Quanto tempo dura..." e "Qual a diferença..." também viram FAQPage no JSON-LD.
 */
import type { ImageMetadata } from 'astro';
import { listaPorCidade, listaCidades } from '../lib/unidades';

import fibra from '../assets/nail-art/fibra-de-vidro.jpg';
import posticas from '../assets/servicos/unhas-posticas.jpg';
import cristal from '../assets/servicos/banho-de-cristal.jpg';
import gel from '../assets/servicos/banho-de-gel.jpg';

export interface Pergunta {
  pergunta: string;
  resposta: string;
}

export interface ServicoNailArt {
  id: string;
  /** Rótulo curto da navegação em pílulas */
  rotulo: string;
  nome: string;
  imagem: ImageMetadata;
  alt: string;
  descricao: string;
  indicado: string;
  duracao: Pergunta;
  diferenca?: Pergunta;
  local: { titulo: string; texto: string };
}

const oferece = (servico: string) => `A Esmaltale oferece o serviço de ${servico} em unidades ${listaPorCidade}.`;

export const SERVICOS_NAIL_ART: ServicoNailArt[] = [
  {
    id: 'fibra-de-vidro',
    rotulo: 'Fibra de vidro',
    nome: 'Alongamento em Fibra de Vidro',
    imagem: fibra,
    alt: 'Unhas com alongamento em fibra de vidro e acabamento natural em degradê rosa',
    descricao:
      'O alongamento em fibra de vidro é uma técnica de extensão de unhas que trabalha sobre a estrutura natural, sem removê-la. A fibra é aplicada diretamente sobre a unha camada por camada, moldada no formato desejado e finalizada com gel para acabamento. O resultado é uma extensão fina, leve e com aparência natural, diferente de outras técnicas de alongamento de unhas que tendem a deixar um acabamento mais artificial ou pesado.',
    indicado:
      'O alongamento em fibra de vidro é especialmente indicado para quem tem unhas fracas, quebradiças ou com dificuldade de crescimento. Por ser aplicado sobre a própria unha natural, o procedimento oferece comprimento e resistência sem o desconforto de extensões mais volumosas. É também uma boa opção para quem quer experimentar unhas maiores pela primeira vez.',
    duracao: {
      pergunta: 'Quanto tempo dura o alongamento em fibra de vidro?',
      resposta:
        'Com os cuidados adequados, o alongamento em fibra de vidro dura em média três a quatro semanas antes de precisar de manutenção. A extensão não lasca com facilidade e mantém o acabamento por mais tempo do que outros serviços similares.',
    },
    local: {
      titulo: `Alongamento de unhas na Esmaltale em ${listaCidades}`,
      texto: `${oferece('alongamento em fibra de vidro')} Todos os atendimentos são realizados por profissionais treinadas, com materiais de qualidade e formato personalizado para cada cliente.`,
    },
  },
  {
    id: 'unhas-posticas',
    rotulo: 'Unhas postiças',
    nome: 'Aplicação de Unhas Postiças',
    imagem: posticas,
    alt: 'Mãos com unhas postiças longas esmaltadas em vermelho',
    descricao:
      'A aplicação de unhas postiças é uma técnica rápida para quem quer unhas maiores e bem cuidadas em pouco tempo. As unhas são fixadas com cola profissional sobre a unha natural, lixadas e modeladas para se adaptar ao formato e tamanho de cada mão. O resultado é imediato e pode ser personalizado com esmaltação, nail art ou acabamento em gel.',
    indicado:
      'A aplicação de unhas postiças é ideal para quem precisa de um resultado rápido para uma ocasião especial, como casamentos, formaturas e eventos. É também uma boa opção para quem quer experimentar unhas maiores sem o compromisso de uma extensão mais duradoura ou para quem não tem tempo para um procedimento mais longo.',
    duracao: {
      pergunta: 'Quanto tempo dura a aplicação de unhas postiças?',
      resposta:
        'A durabilidade da aplicação com cola profissional varia conforme a rotina de cada pessoa. Em geral, as unhas postiças duram entre uma e duas semanas com os cuidados adequados. Contato prolongado com água, produtos de limpeza e esforço físico podem reduzir a durabilidade.',
    },
    local: {
      titulo: `Aplicação de unhas postiças na Esmaltale em ${listaCidades}`,
      texto: `${oferece('aplicação de unhas postiças')} O atendimento é realizado por profissionais treinadas, com acabamento personalizado para cada cliente.`,
    },
  },
  {
    id: 'banho-de-cristal',
    rotulo: 'Banho de cristal',
    nome: 'Banho de Cristal',
    imagem: cristal,
    alt: 'Profissional aplicando banho de cristal em gel sobre a unha natural',
    descricao:
      'O banho de cristal é uma técnica de esmaltação em gel que reforça a estrutura da unha natural sem criar extensão. O gel é aplicado diretamente sobre a unha, camada por camada, e curado sob luz LED para um acabamento brilhante e resistente. O resultado é uma unha mais forte, com brilho intenso e durabilidade superior à esmaltação convencional.',
    indicado:
      'O banho de cristal é indicado para quem tem unhas fracas, finas ou quebradiças e quer reforçar a estrutura sem recorrer a um alongamento. É também uma boa opção para quem busca uma esmaltação mais duradoura no dia a dia, sem abrir mão de um resultado natural e discreto.',
    duracao: {
      pergunta: 'Quanto tempo dura o banho de cristal?',
      resposta:
        'Com os cuidados adequados, o banho de cristal dura em média duas a três semanas sem lascar. Por ser curado sob luz LED, o gel adere melhor à unha e resiste mais ao contato com água e ao uso cotidiano do que o esmalte comum.',
    },
    local: {
      titulo: `Banho de cristal na Esmaltale em ${listaCidades}`,
      texto: `${oferece('banho de cristal')} O atendimento é realizado por profissionais treinadas, com materiais de qualidade e acabamento personalizado para cada cliente.`,
    },
  },
  {
    id: 'banho-de-gel',
    rotulo: 'Banho de gel',
    nome: 'Banho de Gel',
    imagem: gel,
    alt: 'Unhas com banho de gel vermelho de alto brilho',
    descricao:
      'O banho de gel é uma técnica de esmaltação com gel de alta pigmentação e longa duração. O produto é aplicado sobre a unha natural e curado sob luz LED, o que garante uma secagem completa e um acabamento brilhante desde a primeira camada. O resultado é uma cor mais intensa e uniforme do que o esmalte convencional, sem bolhas e sem risco de machucar antes de secar.',
    indicado:
      'O banho de gel é indicado para quem quer uma esmaltação que dure mais no dia a dia, sem precisar retocar com frequência. É uma boa opção para quem tem rotina agitada, trabalha com as mãos ou simplesmente não quer se preocupar com o esmalte descascando durante a semana.',
    duracao: {
      pergunta: 'Quanto tempo dura o banho de gel?',
      resposta:
        'Com os cuidados adequados, o banho de gel dura em média duas a três semanas sem lascar. Por ser curado sob luz LED, o gel adere melhor à superfície da unha e resiste mais ao contato com água e ao uso cotidiano do que o esmalte tradicional.',
    },
    diferenca: {
      pergunta: 'Qual a diferença entre banho de gel e banho de cristal?',
      resposta:
        'As duas técnicas utilizam gel e oferecem durabilidade superior ao esmalte convencional. A diferença está no propósito: o banho de gel foca na cor e no brilho, com uma variedade ampla de tons disponíveis. O banho de cristal foca no reforço da estrutura da unha natural. Para quem quer cor duradoura, o banho de gel é a escolha certa.',
    },
    local: {
      titulo: `Banho de gel na Esmaltale em ${listaCidades}`,
      texto: `${oferece('banho de gel')} O atendimento é realizado por profissionais treinadas, com ampla variedade de cores e acabamento personalizado para cada cliente.`,
    },
  },
];
