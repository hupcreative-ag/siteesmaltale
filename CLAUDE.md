# Site institucional Esmaltale — regras permanentes

Site estático em Astro para esmaltale.com.br. Toda comunicação com o usuário e todo texto do site em **português**.

## Pastas

- `referencia/` — **SOMENTE LEITURA.** Nunca editar, mover, renomear ou apagar. `index.html` é a landing de unidade aprovada (base visual); `index 2.html` é o hub de lojas aprovado. Ler, extrair padrões e recriar em `src/`.
- `conteudo/Esmaltale_Site_Conteudo.md` — textos aprovados. `conteudo/Imagens/` — originais entregues pelo usuário (backup; o site usa as cópias em `src/assets`).
- `src/assets/` — imagens usadas no site, em kebab-case sem espaços (`marca/`, `lojas/`, `servicos/`, `nail-art/`, `podologia/`, `sobre/`).
- `src/data/unidades.ts` — **fonte única** das unidades. `src/lib/unidades.ts` — ordenação, contagem por extenso, listas e links.
- `src/data/hero.ts` — banners do carrossel da Home, depois do hero institucional. Banner com `imagem: null` não aparece; sem nenhum, a Home mostra só o hero institucional. Arte montada no site (foto + gradiente + texto real).
- `src/data/servicos.ts` — os 10 cards de serviço da Home. Sem `imagem`, o card usa o gradiente da marca com o ícone branco.
- `src/data/galeria.ts`, `src/data/faq.ts` (rascunho aprovado pelo usuário vira texto oficial), `src/data/avaliacoes.ts` (SOMENTE avaliações reais do Google; nunca inventar).
- Animação de entrada: atributo `data-reveal` (e `data-reveal-stagger` no pai) via `src/scripts/reveal.ts`.
- `src/data/nailArt.ts` — os 3 serviços da página Nail Design (rota `/nail-design/`; `/nail-art/` redireciona). `src/data/podologia.ts` e `src/data/sobre.ts` — textos dessas páginas (usados também no JSON-LD e no `/llms-full.txt`).
- `src/lib/schema.ts` — JSON-LD num único `@graph` ligado por `@id` (organização, site, página, unidades como BeautySalon dentro do ShoppingCenter, serviços, FAQ, breadcrumb). Toda página passa `schema` ao BaseLayout com o nó `pagina()` e, nas internas, o breadcrumb; `ogImage` aceita uma foto de `src/assets` (recortada para 1200x630).
- `src/lib/llms.ts` — blocos do `/llms.txt` (resumo) e do `/llms-full.txt` (conteúdo das páginas). `scripts/sitemap-imagens.mjs` gera o `sitemap-imagens.xml` depois do build. `scripts/indexnow.mjs` (`npm run indexnow`) avisa Bing e outros buscadores; a chave fica em `public/<chave>.txt`.
- Páginas internas usam `HeroInternal` (prop `trilha` obrigatória; slot `media` opcional) e, onde o briefing pede, `contactStrip` no BaseLayout.
- `src/config/site.ts` — URL, ambiente, Instagram, horário, mensagens do WhatsApp, menu. `src/config/tracking.ts` — IDs GA4 e Pixel.
- `entregas/` — arquivos para outros sistemas, fora do build (ex.: `entregas/loja-conheca/`, a página /conheca/ de loja.esmaltale.com.br, publicada pelo Antigravity). Prévia local: configuração `loja-conheca` do `.claude/launch.json`. No preview, `scripts/previa-entregas.mjs` publica em minha.esmaltale.com.br/previa-conheca/ (nunca em produção).
- `PENDENCIAS.md` — tudo que falta da cliente. Atualizar sempre que algo entrar ou sair.

## Regras de copy

- Usar os textos do documento **literalmente**. Não reescrever, resumir nem inventar.
- Exceções permitidas: trocar travessões (— e –) por vírgula ou ponto no texto corrido; " · " como separador em endereços; corrigir erros evidentes de digitação e espaçamento; notas entre parênteses do documento são instruções internas e não aparecem.
- Card Banho de Cristal na Home: "Esmaltação em gel que reforça a estrutura da unha natural, sem extensão. Resultado natural e duradouro."
- O serviço se chama **Nail Design**, não Nail Art, em todo o site, mesmo onde o documento diz nail art. Unhas Postiças só no card da Home, sem "Saiba mais": a seção saiu da página Nail Design (pedido de 2026-11-07).
- Contagens e listas de unidades vêm de `src/lib/unidades.ts` (`totalUnidades`, `porExtenso`, `listaNomes`, `listaPorCidade`). Manter o formato da frase original: extenso onde o texto usa extenso, algarismo onde usa algarismo.
- Microtextos de interface que faltarem: curtos, acolhedores, elegantes, sem emojis e sem clichês ("eleve sua experiência", "não perca", "agende já").
- Texto de conteúdo que faltar: `[TEXTO PENDENTE: descrição]` + registro em PENDENCIAS.md.
- Fora do site: Clube Esmaltale (sem rota, menu ou menção), alongamento de cílios, cartão presente.

## Unidades

- Para abrir/fechar/editar uma unidade, mudar **só** `src/data/unidades.ts`. Home, Lojas, modal, rodapé, JSON-LD e textos se atualizam.
- Ordem: `novidade: true` primeiro, depois a ordem do arquivo. Em frases corridas, a ordem do arquivo com as novidades no fim.
- Sem `foto`: card em gradiente com logo branco (nunca placeholder cinza). Sem `trinksUrl`: esconde o Trinks e o modal vai direto ao WhatsApp. Sem `landingUrl`: esconde "Conhecer a unidade". Sem `lat/lng`: sem geo no JSON-LD.
- O link Trinks do Shopping da Bahia termina com hífen de propósito.

## Imagens

- Nova imagem em `conteudo/Imagens/` (ou onde o usuário colocar): copiar para `src/assets/<pasta>/` em kebab-case, trocar o placeholder e atualizar PENDENCIAS.md.
- Usar `<Image>`/`<Picture>` do Astro, com width/height; `loading="lazy"` fora da primeira dobra.
- Imagem de conteúdo faltando: placeholder `.img-placeholder` com o nome do arquivo esperado. Nunca imagem de banco.

## Ambientes

- `PUBLIC_SITE_ENV` = `preview` ou `production`. O build falha sem ela (`scripts/check-env.mjs`). Local: `.env.local` com `PUBLIC_SITE_ENV=preview` (fora do git). No deploy, o `scripts/deploy.mjs` define o valor.
- preview: noindex (meta, robots.txt e X-Robots-Tag), sem GA4/Pixel, faixa "Versão de prévia".
- production: indexável, GA4 + Pixel em scripts separados.
- O `.htaccess` (HTTPS, www → sem www, 404, bloqueio de `.git`, cache, X-Robots-Tag no preview) é gerado por `scripts/htaccess.mjs` no fim do build. Não editar na Hostinger.

## Git e GitHub

- Remoto: `https://github.com/hupcreative-ag/siteesmaltale` (privado). O git do terminal autentica pelo Keychain do macOS; não precisa do `gh`.
- Branches:
  - `main` = código-fonte.
  - Branches de deploy ficam no repositório `https://github.com/esmaltalesalvador/esmatalesite` (remoto `deploy`, da conta conectada ao Git do hPanel; hupcreative-ag é colaboradora):
    - `deploy-preview` = site pronto (dist) do preview, minha.esmaltale.com.br.
    - `producao` = site pronto (dist) de esmaltale.com.br, só recebe envio quando o usuário mandar publicar. As tags `prod-*` também ficam lá.
- As branches de deploy só recebem commits do `scripts/deploy.mjs`. Nunca editar, fazer merge nelas ou force push. **Nunca** force push na `main`.
- Nunca commitar `.env*` (exceto `.env.example`) ou segredos.
- Mensagens de commit em português, descritivas.

### Rotina de envio (fim de cada fase, "sobe" ou "sobe no preview")

1. `git status`: ver arquivos novos/alterados pelo usuário em `conteudo/` e `conteudo/Imagens/`.
   - Imagem nova → copiar para `src/assets` em kebab-case, trocar placeholder, atualizar PENDENCIAS.md.
   - Documento de conteúdo alterado → mostrar ao usuário as diferenças de texto (`git diff conteudo/`) e aplicar nas páginas.
2. `npm run build`. Se falhar, corrigir antes de enviar.
3. Mostrar resumo do que vai subir (uma linha por arquivo ou grupo).
4. Commit e `git push origin main`.
5. `npm run deploy:preview` (gera com `preview` e envia para `deploy-preview`).
6. Esperar a Hostinger publicar, verificar todas as rotas em https://minha.esmaltale.com.br com `curl` e passar o link.

## Publicação (Hostinger, site estático pelo Git do hPanel)

- O plano é Business Web Hosting. esmaltale.com.br tem o e-mail grátis da Hostinger (até 5 caixas) em uso. A cliente não pode fazer upgrade.
- **Nunca** criar Web App Node.js para esmaltale.com.br, conectar o domínio a um site novo, clicar em "Excluir site" ou redefinir a zona DNS: isso apaga os e-mails ou os registros MX/SPF/DKIM/DMARC.
- O site é estático: a Hostinger não roda build. O Git do hPanel de cada site puxa a sua branch de deploy (deploy automático por webhook do GitHub, chave de deploy só leitura). Sem GitHub Actions, SSH ou upload manual.
  - Preview: site minha.esmaltale.com.br, branch `deploy-preview`.
  - Produção: site esmaltale.com.br, pasta `public_html`, branch `producao`.
- Subdomínios `loja.esmaltale.com.br` e `primeiravisita.esmaltale.com.br` são CNAMEs para a Cloudflare: **não mexer**.
- WordPress antigo: só sai na primeira publicação, depois do backup (arquivos de `public_html`). O banco MySQL só é apagado depois de o site novo ser verificado e com OK do usuário.

### "publica em produção"

1. Confirmar que a `main` está limpa, enviada e buildando.
2. `npm run deploy:producao`: gera com `production`, envia para `producao` e cria a tag `prod-AAAA-MM-DD-HHMM`.
3. Esperar a Hostinger publicar e verificar esmaltale.com.br: rotas, 404, HTTPS, redirecionamento de www e e-mail (MX intacto com `dig MX esmaltale.com.br`).
4. `npm run indexnow` para avisar os buscadores das páginas atualizadas.
5. Primeira vez: confirmar com o usuário que o backup completo foi gerado no hPanel antes de rodar o passo 2, passar o passo a passo do hPanel (limpar o WordPress de `public_html`, ligar o Git) e só verificar depois da confirmação.

### "volta a versão anterior" (rollback)

1. Listar as tags `prod-*` (`git tag -l 'prod-*'`) e escolher a anterior à atual.
2. `npm run deploy:voltar -- <tag>`: cria um commit novo na `producao` com os arquivos daquela tag. Sem force push.
3. Esperar a Hostinger publicar e verificar esmaltale.com.br.

### Pedidos de conteúdo

Editar, subir no preview e esperar o comando do usuário para produção.
