// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://esmaltale.com.br',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      // As páginas são geradas a cada publicação: a data do build é a da última alteração
      serialize: (item) => ({ ...item, lastmod: new Date().toISOString() }),
    }),
  ],
});
