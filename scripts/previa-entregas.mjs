// Prévia navegável das páginas de entregas/ (feitas para outros sistemas) no site de preview.
// Só roda fora da produção: em minha.esmaltale.com.br/previa-conheca/ dá para testar a nova /conheca/
// de loja.esmaltale.com.br antes de mandar ao Antigravity. Os links de cupom e de unidade apontam
// para loja.esmaltale.com.br e o GA4 fica desligado, para não misturar visitas de teste.
import { readFileSync, existsSync, writeFileSync, mkdirSync, cpSync } from 'node:fs';

function lerDeArquivo(arquivo) {
  if (!existsSync(arquivo)) return undefined;
  const linha = readFileSync(arquivo, 'utf8')
    .split('\n')
    .find((l) => l.trim().startsWith('PUBLIC_SITE_ENV='));
  return linha?.split('=')[1]?.trim().replace(/^["']|["']$/g, '');
}

const ambiente = process.env.PUBLIC_SITE_ENV ?? lerDeArquivo('.env.local') ?? lerDeArquivo('.env');
if (ambiente === 'production') process.exit(0);

const origem = 'entregas/loja-conheca';
if (!existsSync(`${origem}/conheca/index.html`)) process.exit(0);

const destino = 'dist/previa-conheca';
mkdirSync(`${destino}/assets`, { recursive: true });
cpSync(`${origem}/assets/conheca`, `${destino}/assets`, { recursive: true });

const html = readFileSync(`${origem}/conheca/index.html`, 'utf8')
  .replaceAll('/assets/conheca/', '/previa-conheca/assets/')
  .replaceAll('/assets/logofav.png', '/favicon-48.png')
  .replace(/(\b(?:url|unitUrl): ')\//g, '$1https://loja.esmaltale.com.br/')
  .replace('https://www.googletagmanager.com/gtag/js?id=', 'about:blank#')
  .replace('<meta name="robots" content="index, follow">', '<meta name="robots" content="noindex, nofollow">');

writeFileSync(`${destino}/index.html`, html);
console.log('✔ prévia da /conheca/ gerada em /previa-conheca/');
