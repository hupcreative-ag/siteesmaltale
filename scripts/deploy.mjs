// Publica o site pronto (dist) numa branch que a Hostinger puxa pelo Git do hPanel.
// A Hostinger não roda o build: ela só copia os arquivos da branch para a pasta do site.
// As branches de deploy ficam num repositório à parte (REPO_DEPLOY), da conta conectada ao hPanel;
// o código-fonte continua no origin.
//
//   npm run deploy:preview   → branch deploy-preview (novo.esmaltale.com.br)
//   npm run deploy:producao  → branch producao + tag prod-AAAA-MM-DD-HHMM (esmaltale.com.br)
//   npm run deploy:voltar -- prod-AAAA-MM-DD-HHMM → producao volta ao conteúdo dessa tag
//
// Sempre cria um commit novo em cima da branch remota: nunca há force push.
import { execSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const REPO_DEPLOY = 'https://github.com/esmaltalesalvador/esmatalesite.git';

const ALVOS = {
  preview: { branch: 'deploy-preview', ambiente: 'preview' },
  producao: { branch: 'producao', ambiente: 'production' },
};

const sh = (cmd, opcoes = {}) => execSync(cmd, { encoding: 'utf8', ...opcoes }).trim();
const falhar = (msg) => {
  console.error(`\n  ✖ ${msg}\n`);
  process.exit(1);
};

function prepararRemotoDeploy() {
  try {
    if (sh('git remote get-url deploy') !== REPO_DEPLOY) sh(`git remote set-url deploy ${REPO_DEPLOY}`);
  } catch {
    sh(`git remote add deploy ${REPO_DEPLOY}`);
  }
}

function topoRemoto(remoto, branch) {
  sh(`git fetch -q --tags ${remoto}`);
  try {
    return sh(`git rev-parse --verify -q ${remoto}/${branch}`);
  } catch {
    return null;
  }
}

function enviar(branch, arvore, mensagem) {
  const pai = topoRemoto('deploy', branch);
  const commit = sh(`git commit-tree ${arvore}${pai ? ` -p ${pai}` : ''} -F -`, { input: mensagem });
  sh(`git push -q deploy ${commit}:refs/heads/${branch}`, { stdio: ['ignore', 'pipe', 'inherit'] });
  return commit;
}

const [alvo, tag] = process.argv.slice(2);
prepararRemotoDeploy();

// ---------- Rollback: producao recebe de novo os arquivos de uma tag ----------
if (alvo === 'voltar') {
  if (!tag?.startsWith('prod-')) falhar('Informe a tag: npm run deploy:voltar -- prod-AAAA-MM-DD-HHMM');
  sh(`git fetch -q --tags deploy`);
  const arvore = sh(`git rev-parse ${tag}^{tree}`);
  const commit = enviar('producao', arvore, `Volta a produção para ${tag}`);
  console.log(`\n  ✔ producao voltou ao conteúdo de ${tag} (${commit.slice(0, 7)}).\n`);
  process.exit(0);
}

const config = ALVOS[alvo];
if (!config) falhar('Use: npm run deploy:preview ou npm run deploy:producao');

// ---------- Conferências: publica só o que está na main do GitHub ----------
if (sh('git branch --show-current') !== 'main') falhar('Mude para a branch main antes de publicar.');
if (sh('git status --porcelain')) falhar('Há alterações sem commit. Faça o commit (e o push) antes de publicar.');
topoRemoto('origin', 'main');
const origem = sh('git rev-parse HEAD');
if (origem !== sh('git rev-parse origin/main')) falhar('A main local está diferente da main do GitHub. Faça git push (ou git pull) antes.');

// ---------- Build com o ambiente do alvo ----------
console.log(`\n  Gerando o site (${config.ambiente})...\n`);
execSync('npm run build', { stdio: 'inherit', env: { ...process.env, PUBLIC_SITE_ENV: config.ambiente } });

// ---------- Commit da dist na branch de deploy, sem checkout ----------
const pastaIndice = mkdtempSync(join(tmpdir(), 'esmaltale-deploy-'));
const env = { ...process.env, GIT_INDEX_FILE: join(pastaIndice, 'index') };
let arvore;
try {
  sh('git --work-tree=dist add -A -f .', { env });
  arvore = sh('git write-tree', { env });
} finally {
  rmSync(pastaIndice, { recursive: true, force: true });
}

const resumo = sh('git log -1 --format=%s');
const commit = enviar(config.branch, arvore, `Site ${config.ambiente} gerado da main ${origem.slice(0, 7)}\n\n${resumo}\n`);
console.log(`\n  ✔ ${config.branch} atualizada (${commit.slice(0, 7)}), gerada da main ${origem.slice(0, 7)}.`);

if (alvo === 'producao') {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  const nome = `prod-${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`;
  sh(`git tag ${nome} ${commit}`);
  sh(`git push -q deploy ${nome}`, { stdio: ['ignore', 'pipe', 'inherit'] });
  console.log(`  ✔ Tag ${nome} criada.`);
}
console.log('');
