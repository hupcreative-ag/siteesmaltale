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

// Copiadas dos prints do Google enviados em 2026-11-03. Texto como a cliente escreveu (só espaçamento corrigido).
// Sem `data`: os prints mostram só "há X meses", que envelhece; unidade só quando a cliente cita.
export const AVALIACOES: Avaliacao[] = [
  {
    autor: 'Carla Reis',
    nota: 5,
    texto:
      'Só tenho elogios! A Esmaltale é super organizada, acolhedora e sempre focada no bem-estar do cliente. Faço minhas unhas com a Thai e cheguei cheia de inseguranças por experiências negativas em outros lugares. Ela me recebeu com toda paciência e simpatia, me deixando totalmente à vontade. Hoje não troco por nada! Super indico!',
  },
  {
    autor: 'Anna Luisa',
    nota: 5,
    texto: 'Amo a experiência nesse lugar! Ambiente humanizado e profissionais excelentes!',
  },
  {
    autor: 'Josué dos Santos',
    nota: 5,
    texto:
      'Gostei muito do serviço, fui um pouco tímido por ser homem, mas as meninas me deixarem bem a vontade e fiz o serviço básico pra manter as unhas da mão e do pé em dia.',
  },
  {
    autor: 'Mariana Neves',
    nota: 5,
    texto:
      'Gosto muito da Esmaltale paralela. O atendimento não tem atrasado e o clima é muito bom, são todas muito atenciosas. Ana Paula arrasa muito no nail designer, as unhas ficam muito delicadas e naturais. Luane e Taiane também são ótimas. Sou cliente assídua! :)',
    unidade: 'shopping-paralela',
  },
  {
    autor: 'Caroline Grudka',
    nota: 5,
    texto:
      'Atendimento maravilhoso, com equipe atenciosa e um cappuccino delicioso! Amei minhas unhas.. Um agradecimento especial à Carol e Jaque!',
  },
  {
    autor: 'Camile Da mata',
    nota: 5,
    texto:
      'Ambiente agradável, profissionais competentes, já faço minhas unhas a dois anos com a mesma profissional, indico muito! Equipe do parque shopping é incrível !!!',
    unidade: 'parque-shopping-bahia',
  },
  {
    autor: 'Rafaela Almeida',
    nota: 5,
    texto:
      'Estive na Esmalteria Esmaltalle Paralela e só tenho elogios! O espaço é acolhedor, organizado e transmite todo o cuidado em oferecer uma experiência diferenciada. O atendimento é impecável desde a recepção até a finalização do serviço.',
    unidade: 'shopping-paralela',
  },
  {
    autor: 'Tauane Nascimento',
    nota: 5,
    texto:
      'Atendimento de excelência. Buscando sempre as melhores atendentes, onde deixa nosso dia ainda mais agradável, parabéns esmaltelle',
  },
];
