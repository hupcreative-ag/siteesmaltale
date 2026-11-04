export type SiteEnv = 'preview' | 'production';

export const SITE_ENV = import.meta.env.PUBLIC_SITE_ENV as SiteEnv;
export const IS_PRODUCTION = SITE_ENV === 'production';

export const SITE = {
  nome: 'Esmaltale',
  razao: 'Esmaltale Estética e Beleza',
  url: 'https://esmaltale.com.br',
  previewUrl: 'https://minha.esmaltale.com.br',
  fundacao: 2017,
  assinatura: 'O melhor cuidado das nossas mãos para as suas.',
  instagram: 'https://www.instagram.com/esmaltale',
  instagramUsuario: '@esmaltale',
  desenvolvedor: { nome: 'Hup Creative', url: 'https://hup.com.br' },
};

export const NAV = [
  { href: '/', label: 'Início' },
  { href: '/sobre/', label: 'Sobre' },
  { href: '/nail-art/', label: 'Nail Art' },
  { href: '/podologia/', label: 'Podologia' },
  { href: '/lojas/', label: 'Lojas' },
];

/** Horário igual em todas as unidades. */
export const HORARIO = {
  linhas: [
    { dias: 'Segunda a sábado', horas: 'das 9h às 22h' },
    { dias: 'Domingo', horas: 'das 12h às 21h' },
  ],
  nota: 'Funcionamos no horário de cada shopping, que pode sofrer ajustes em feriados e datas especiais.',
  /** Usado no JSON-LD (openingHoursSpecification). */
  schema: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '22:00',
    },
    { dayOfWeek: ['Sunday'], opens: '12:00', closes: '21:00' },
  ],
};

export const MENSAGENS_WHATSAPP = {
  agendamento: (nome: string) => `Olá! Gostaria de agendar um atendimento na unidade ${nome}.`,
  duvida: (nome: string) => `Olá! Tenho uma dúvida e gostaria de falar com a unidade ${nome}.`,
};
