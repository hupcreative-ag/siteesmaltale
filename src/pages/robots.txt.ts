/**
 * robots.txt por ambiente. Preview: bloqueia tudo. Produção: libera, inclusive para os
 * robôs de busca por IA (citados um a um para deixar a permissão explícita), e aponta o sitemap.
 */
import type { APIRoute } from 'astro';
import { IS_PRODUCTION, SITE } from '../config/site';

const ROBOS_IA = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended'];

export const GET: APIRoute = () => {
  const corpo = IS_PRODUCTION
    ? [
        'User-agent: *',
        'Allow: /',
        '',
        ...ROBOS_IA.flatMap((r) => [`User-agent: ${r}`, 'Allow: /', '']),
        `Sitemap: ${SITE.url}/sitemap-index.xml`,
        '',
      ].join('\n')
    : 'User-agent: *\nDisallow: /\n';
  return new Response(corpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
