// Gera o .htaccess da dist conforme o ambiente (roda depois do astro build).
// O site é servido como arquivos estáticos pelo servidor da Hostinger (LiteSpeed/Apache).
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';

function lerDeArquivo(arquivo) {
  if (!existsSync(arquivo)) return undefined;
  const linha = readFileSync(arquivo, 'utf8')
    .split('\n')
    .find((l) => l.trim().startsWith('PUBLIC_SITE_ENV='));
  return linha?.split('=')[1]?.trim().replace(/^["']|["']$/g, '');
}

const ambiente = process.env.PUBLIC_SITE_ENV ?? lerDeArquivo('.env.local') ?? lerDeArquivo('.env');
const producao = ambiente === 'production';

const regras = `# Gerado por scripts/htaccess.mjs (${ambiente}). Não editar na Hostinger.
Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
  RewriteEngine On

  # Pasta .git deixada pelo deploy da Hostinger: nunca servir
  RewriteRule (^|/)\\.git(/|$) - [R=404,L]

  # Endereços comuns do site antigo (WordPress) → páginas novas
  RewriteRule ^(home|inicio|index\\.php)/?$ / [R=301,L,NC]
  RewriteRule ^(sobre-nos|quem-somos|a-esmaltale|institucional)/?$ /sobre/ [R=301,L,NC]
  RewriteRule ^(unidades|nossas-unidades|lojas-esmaltale|enderecos|contato|fale-conosco|agendamento|agendar)/?$ /lojas/ [R=301,L,NC]
  RewriteRule ^(servicos|nossos-servicos)/?$ /#servicos [R=301,L,NC,NE]
  RewriteRule ^(alongamento|alongamento-de-unhas|unhas-de-gel|banho-de-gel|banho-de-cristal|fibra-de-vidro)/?$ /nail-art/ [R=301,L,NC]
  RewriteRule ^(podologo|podologa|podologia-salvador)/?$ /podologia/ [R=301,L,NC]

  # Sempre HTTPS
  RewriteCond %{HTTPS} off
  RewriteCond %{HTTP:X-Forwarded-Proto} !https
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
${
  producao
    ? `
  # www → domínio sem www
  RewriteCond %{HTTP_HOST} ^www\\.esmaltale\\.com\\.br$ [NC]
  RewriteRule ^ https://esmaltale.com.br%{REQUEST_URI} [R=301,L]
`
    : ''
}</IfModule>

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set X-Frame-Options "SAMEORIGIN"
${producao ? '' : '  Header always set X-Robots-Tag "noindex, nofollow"\n'}
  <FilesMatch "\\.(html|xml|txt)$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml application/javascript application/json application/xml image/svg+xml
</IfModule>
`;

// Arquivos de /_astro têm hash no nome: podem ficar em cache por um ano
const cacheLongo = `<IfModule mod_headers.c>
  Header set Cache-Control "public, max-age=31536000, immutable"
</IfModule>
`;

writeFileSync('dist/.htaccess', regras);
mkdirSync('dist/_astro', { recursive: true });
writeFileSync('dist/_astro/.htaccess', cacheLongo);
console.log(`✔ .htaccess gerado (${ambiente})`);
