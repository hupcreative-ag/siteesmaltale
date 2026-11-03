// Garante que PUBLIC_SITE_ENV está definida antes do build.
// No deploy ela vem do scripts/deploy.mjs; localmente, do .env.local.
import { existsSync, readFileSync } from 'node:fs';

const VALORES = ['preview', 'production'];

function lerDeArquivo(arquivo) {
  if (!existsSync(arquivo)) return undefined;
  const linha = readFileSync(arquivo, 'utf8')
    .split('\n')
    .find((l) => l.trim().startsWith('PUBLIC_SITE_ENV='));
  return linha?.split('=')[1]?.trim().replace(/^["']|["']$/g, '');
}

const valor =
  process.env.PUBLIC_SITE_ENV ?? lerDeArquivo('.env.local') ?? lerDeArquivo('.env');

if (!valor || !VALORES.includes(valor)) {
  console.error(`
  ✖ PUBLIC_SITE_ENV ${valor ? `inválida ("${valor}")` : 'não definida'}.

    Valores aceitos: ${VALORES.join(' ou ')}.
    • Para publicar: use npm run deploy:preview ou npm run deploy:producao
    • Localmente: crie um arquivo .env.local com a linha PUBLIC_SITE_ENV=preview
`);
  process.exit(1);
}

console.log(`✔ PUBLIC_SITE_ENV=${valor}`);
