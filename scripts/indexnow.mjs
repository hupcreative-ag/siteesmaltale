// Avisa os buscadores do protocolo IndexNow (Bing, Yandex, Seznam, Naver...) que as páginas de
// esmaltale.com.br mudaram. O Bing também alimenta a busca do ChatGPT e de outros assistentes.
// Rodar depois de verificar uma publicação em produção: npm run indexnow
// A chave é pública por definição; o arquivo public/<chave>.txt prova que o site é nosso.
const CHAVE = '9a6940cf01e1d58bc144581110343cce';
const HOST = 'esmaltale.com.br';
const SITE = `https://${HOST}`;

const sitemap = await fetch(`${SITE}/sitemap-0.xml`).then((r) => r.text());
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
urls.push(`${SITE}/llms.txt`, `${SITE}/llms-full.txt`);

const resposta = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: CHAVE, keyLocation: `${SITE}/${CHAVE}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${resposta.status} ${resposta.statusText} (${urls.length} endereços)`);
if (!resposta.ok && resposta.status !== 202) process.exit(1);
