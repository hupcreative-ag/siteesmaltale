/**
 * /llms-full.txt: o conteúdo de todas as páginas em Markdown, para IAs que respondem sobre a
 * Esmaltale (serviços em detalhe, nail design, podologia, institucional, unidades, avaliações reais).
 * Tudo vem de src/data: mudar um texto ou uma unidade atualiza este arquivo.
 */
import type { APIRoute } from 'astro';
import { SITE } from '../config/site';
import { SERVICOS_NAIL_ART } from '../data/nailArt';
import { INTRO_PODOLOGIA, TRATAMENTOS } from '../data/podologia';
import { PROPOSTA, MISSAO, VISAO, VALORES } from '../data/sobre';
import { AVALIACOES } from '../data/avaliacoes';
import { UNIDADES } from '../data/unidades';
import { resumoMarca, secaoServicos, secaoUnidades, secaoHorario, secaoFaq, secaoLinks, texto } from '../lib/llms';

const nomeUnidade = (slug?: string) => UNIDADES.find((u) => u.slug === slug)?.nome;

export const GET: APIRoute = () =>
  texto([
    ...resumoMarca(),
    '## Sobre a Esmaltale',
    '',
    `Fonte: ${SITE.url}/sobre/`,
    '',
    `A ${SITE.nome} nasceu em Salvador em ${SITE.fundacao} com uma convicção: cuidar das unhas é cuidar de si.`,
    '',
    PROPOSTA,
    '',
    `- **Missão**: ${MISSAO}`,
    `- **Visão**: ${VISAO}`,
    `- **Valores**: ${VALORES.join('; ')}.`,
    '',
    ...secaoServicos(),
    '## Nail Design, alongamento e esmaltação em gel',
    '',
    `Fonte: ${SITE.url}/nail-design/`,
    '',
    ...SERVICOS_NAIL_ART.flatMap((s) => [
      `### ${s.nome}`,
      '',
      s.descricao,
      '',
      s.indicado,
      '',
      `**${s.duracao.pergunta}** ${s.duracao.resposta}`,
      ...(s.diferenca ? ['', `**${s.diferenca.pergunta}** ${s.diferenca.resposta}`] : []),
      '',
      s.local.texto,
      '',
    ]),
    '## Podologia',
    '',
    `Fonte: ${SITE.url}/podologia/`,
    '',
    INTRO_PODOLOGIA,
    '',
    ...TRATAMENTOS.map((t) => `- **${t.nome}**: ${t.texto}`),
    '',
    ...secaoUnidades(true),
    ...secaoHorario(),
    ...secaoFaq(),
    '## Avaliações de clientes no Google',
    '',
    ...AVALIACOES.flatMap((a) => {
      const unidade = nomeUnidade(a.unidade);
      return [`> "${a.texto}"`, `> ${a.autor}, ${a.nota} de 5 estrelas${unidade ? `, ${unidade}` : ''}`, ''];
    }),
    ...secaoLinks(),
  ]);
