/**
 * /llms.txt: resumo da marca em Markdown para leitura por IA (proposta llmstxt.org).
 * Gerado dos mesmos dados do site: unidades, serviços, horário e FAQ.
 */
import type { APIRoute } from 'astro';
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
} from '../lib/unidades';

export const GET: APIRoute = () => {
  const linhas: string[] = [
    `# ${SITE.nome}`,
    '',
    `> ${SITE.nome} é uma rede de esmalterias fundada em ${SITE.fundacao} em Salvador, com ${porExtenso(totalUnidades)} unidades em shoppings de ${listaCidades}. Manicure, pedicure, alongamento de unhas, nail art, SPA das mãos e dos pés e podologia, com instrumentos esterilizados em autoclave e agendamento online pelo Trinks.`,
    '',
    `Assinatura: "${SITE.assinatura}"`,
    '',
    '## Serviços',
    '',
    ...SERVICOS.map((s) => `- **${s.nome}**: ${s.descricao}`),
    '',
    '## Unidades',
    '',
    ...unidadesAtivas.flatMap((u) => [
      `### ${SITE.nome} ${u.nome}${u.novidade ? ' (nova unidade)' : ''}`,
      `- Endereço: ${enderecoCompleto(u)}, CEP ${u.cep}`,
      `- Localização no shopping: ${localizacao(u, true)}`,
      ...(u.telefone ? [`- Telefone: ${formatarTelefone(u.telefone)}`] : []),
      `- WhatsApp: ${formatarTelefone(u.whatsapp)}`,
      ...(u.trinksUrl ? [`- Agendamento online: ${u.trinksUrl}`] : []),
      '',
    ]),
    '## Horário',
    '',
    ...HORARIO.linhas.map((l) => `- ${l.dias}, ${l.horas}`),
    `- ${HORARIO.nota}`,
    '',
    '## Perguntas frequentes',
    '',
    ...FAQ.flatMap((f) => [`### ${f.pergunta}`, f.resposta, '']),
    '## Links',
    '',
    ...NAV.map((n) => `- [${n.label}](${SITE.url}${n.href})`),
    `- [Instagram](${SITE.instagram})`,
    '',
  ];
  return new Response(linhas.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
