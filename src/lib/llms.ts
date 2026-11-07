/**
 * Blocos em Markdown dos arquivos para IA (/llms.txt e /llms-full.txt), gerados dos mesmos
 * dados do site. O resumo usa só parte; o completo junta todos.
 */
import { SITE, HORARIO, NAV } from '../config/site';
import { SERVICOS } from '../data/servicos';
import { FAQ } from '../data/faq';
import {
  unidadesAtivas,
  totalUnidades,
  porExtenso,
  listaCidades,
  enderecoCompleto,
  localizacao,
  formatarTelefone,
  mapaUrl,
} from './unidades';

export const resumoMarca = () => [
  `# ${SITE.nome}`,
  '',
  `> ${SITE.nome} é uma rede de esmalterias fundada em ${SITE.fundacao} em Salvador, com ${porExtenso(totalUnidades)} unidades em shoppings de ${listaCidades}. Manicure, pedicure, alongamento de unhas, nail design, SPA dos pés e podologia, com instrumentos esterilizados em autoclave e agendamento online pelo Trinks.`,
  '',
  `Assinatura: "${SITE.assinatura}"`,
  '',
];

export const secaoServicos = () => [
  '## Serviços',
  '',
  ...SERVICOS.map((s) => `- **${s.nome}**: ${s.descricao}${s.saibaMais ? ` Mais: ${SITE.url}${s.saibaMais}` : ''}`),
  '',
];

export const secaoUnidades = (completa = false) => [
  '## Unidades',
  '',
  ...unidadesAtivas.flatMap((u) => [
    `### ${SITE.nome} ${u.nome}${u.novidade ? ' (nova unidade)' : ''}`,
    `- Endereço: ${enderecoCompleto(u)}, CEP ${u.cep}`,
    `- Localização no shopping: ${localizacao(u, true)}`,
    ...(u.telefone ? [`- Telefone: ${formatarTelefone(u.telefone)}`] : []),
    `- WhatsApp: ${formatarTelefone(u.whatsapp)} (https://wa.me/55${u.whatsapp})`,
    ...(u.trinksUrl ? [`- Agendamento online: ${u.trinksUrl}`] : []),
    `- ${u.googleCid ? 'Perfil no Google Maps (avaliações e rotas)' : 'Mapa'}: ${mapaUrl(u)}`,
    ...(completa && u.landingUrl ? [`- Página da unidade: ${u.landingUrl}`] : []),
    '',
  ]),
];

export const secaoHorario = () => [
  '## Horário',
  '',
  ...HORARIO.linhas.map((l) => `- ${l.dias}, ${l.horas}`),
  `- ${HORARIO.nota}`,
  '',
];

export const secaoFaq = () => ['## Perguntas frequentes', '', ...FAQ.flatMap((f) => [`### ${f.pergunta}`, f.resposta, ''])];

export const secaoLinks = () => [
  '## Links',
  '',
  ...NAV.map((n) => `- [${n.label}](${SITE.url}${n.href})`),
  `- [Instagram](${SITE.instagram})`,
  `- [Versão completa para IA](${SITE.url}/llms-full.txt)`,
  '',
];

export const texto = (linhas: string[]) =>
  new Response(linhas.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
