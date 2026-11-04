// Gera dist/sitemap-imagens.xml (extensão de imagens do Google) a partir das páginas já
// construídas: cada <img> com texto alternativo entra na página onde aparece, na maior versão
// gerada. Roda depois do astro build e acrescenta o arquivo ao sitemap-index.xml.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const SITE = 'https://esmaltale.com.br';
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const sitemap = readFileSync('dist/sitemap-0.xml', 'utf8');
const paginas = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const blocos = [];
for (const url of paginas) {
  const caminho = new URL(url).pathname;
  const arquivo = `dist${caminho}${caminho.endsWith('/') ? 'index.html' : ''}`;
  if (!existsSync(arquivo)) continue;
  const html = readFileSync(arquivo, 'utf8');

  const imagens = new Set();
  const og = html.match(/property="og:image" content="([^"]+)"/);
  if (og) imagens.add(og[1]);

  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    const alt = tag.match(/\balt="([^"]*)"/)?.[1];
    if (!alt) continue; // decorativas ficam de fora
    const srcset = tag.match(/\bsrcset="([^"]+)"/)?.[1];
    const maior = srcset
      ? srcset
          .split(',')
          .map((c) => c.trim().split(/\s+/))
          .sort((a, b) => parseInt(b[1]) - parseInt(a[1]))[0][0]
      : tag.match(/\bsrc="([^"]+)"/)?.[1];
    if (maior && !maior.startsWith('data:')) imagens.add(new URL(maior, SITE).href);
  }

  if (!imagens.size) continue;
  blocos.push(
    `  <url>\n    <loc>${esc(url)}</loc>\n${[...imagens]
      .map((i) => `    <image:image><image:loc>${esc(i)}</image:loc></image:image>`)
      .join('\n')}\n  </url>`,
  );
}

writeFileSync(
  'dist/sitemap-imagens.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${blocos.join('\n')}\n</urlset>\n`,
);

const indice = readFileSync('dist/sitemap-index.xml', 'utf8');
if (!indice.includes('sitemap-imagens.xml')) {
  writeFileSync(
    'dist/sitemap-index.xml',
    indice.replace('</sitemapindex>', `<sitemap><loc>${SITE}/sitemap-imagens.xml</loc><lastmod>${new Date().toISOString()}</lastmod></sitemap></sitemapindex>`),
  );
}
console.log(`✔ sitemap-imagens.xml gerado (${blocos.length} páginas)`);
