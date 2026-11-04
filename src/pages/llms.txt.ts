/**
 * /llms.txt: resumo da marca em Markdown para leitura por IA (proposta llmstxt.org).
 * Gerado dos mesmos dados do site: unidades, serviços, horário e FAQ. A versão longa,
 * com o conteúdo das páginas, fica em /llms-full.txt.
 */
import type { APIRoute } from 'astro';
import { resumoMarca, secaoServicos, secaoUnidades, secaoHorario, secaoFaq, secaoLinks, texto } from '../lib/llms';

export const GET: APIRoute = () =>
  texto([...resumoMarca(), ...secaoServicos(), ...secaoUnidades(), ...secaoHorario(), ...secaoFaq(), ...secaoLinks()]);
