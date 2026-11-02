# Site institucional Esmaltale — regras permanentes

Site estático em Astro para esmaltale.com.br. Toda comunicação com o usuário e todo texto do site em **português**.

## Pastas

- `referencia/` — **SOMENTE LEITURA.** Nunca editar, mover, renomear ou apagar. `index.html` é a landing de unidade aprovada (base visual); `index 2.html` é o hub de lojas aprovado. Ler, extrair padrões e recriar em `src/`.
- `conteudo/Esmaltale_Site_Conteudo.md` — textos aprovados. `conteudo/Imagens/` — originais entregues pelo usuário (backup; o site usa as cópias em `src/assets`).
- `src/assets/` — imagens usadas no site, em kebab-case sem espaços (`marca/`, `lojas/`, `servicos/`, `nail-art/`, `podologia/`, `sobre/`).
- `src/data/unidades.ts` — **fonte única** das unidades. `src/lib/unidades.ts` — ordenação, contagem por extenso, listas e links.
- `src/data/hero.ts` — banners do carrossel da Home (desligado enquanto nenhum banner tiver imagem).
- `src/config/site.ts` — URL, ambiente, Instagram, horário, mensagens do WhatsApp, menu. `src/config/tracking.ts` — IDs GA4 e Pixel.
- `PENDENCIAS.md` — tudo que falta da cliente. Atualizar sempre que algo entrar ou sair.

## Regras de copy

- Usar os textos do documento **literalmente**. Não reescrever, resumir nem inventar.
- Exceções permitidas: trocar travessões (— e –) por vírgula ou ponto no texto corrido; " · " como separador em endereços; corrigir erros evidentes de digitação e espaçamento; notas entre parênteses do documento são instruções internas e não aparecem.
- Card Banho de Cristal na Home: "Esmaltação em gel que reforça a estrutura da unha natural, sem extensão. Resultado natural e duradouro."
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

- `PUBLIC_SITE_ENV` = `preview` ou `production`. O build falha sem ela (`scripts/check-env.mjs`). Local: `.env.local` com `PUBLIC_SITE_ENV=preview` (fora do git).
- preview: noindex (meta, robots.txt e X-Robots-Tag), sem GA4/Pixel, faixa "Versão de prévia".
- production: indexável, GA4 + Pixel em scripts separados.

## Git e GitHub

- Remoto: `https://github.com/hupcreative-ag/siteesmaltale` (privado). O git do terminal autentica pelo Keychain do macOS; não precisa do `gh`.
- Branches: `main` = preview (novo.esmaltale.com.br). `producao` = esmaltale.com.br, só recebe push quando o usuário mandar publicar.
- **Nunca** force push na `main`. Nunca commitar `.env*` (exceto `.env.example`) ou segredos.
- Mensagens de commit em português, descritivas.

### Rotina de envio (fim de cada fase, "sobe" ou "sobe no preview")

1. `git status`: ver arquivos novos/alterados pelo usuário em `conteudo/` e `conteudo/Imagens/`.
   - Imagem nova → copiar para `src/assets` em kebab-case, trocar placeholder, atualizar PENDENCIAS.md.
   - Documento de conteúdo alterado → mostrar ao usuário as diferenças de texto (`git diff conteudo/`) e aplicar nas páginas.
2. `npm run build`. Se falhar, corrigir antes de enviar.
3. Mostrar resumo do que vai subir (uma linha por arquivo ou grupo).
4. Commit e `git push origin main`.
5. Depois da Fase 5: esperar a Hostinger publicar, verificar todas as rotas em https://novo.esmaltale.com.br com `curl` e passar o link.

## Publicação (Hostinger, deploy pelo GitHub)

- Cada app Node.js no hPanel fica ligado a uma branch; a cada push a Hostinger roda `npm install`, `npm run build` e publica `dist/`. Sem GitHub Actions, SSH ou upload manual.
- Configuração dos apps: framework Astro · Node 22 · npm · build `npm run build` · saída `dist` · `PUBLIC_SITE_ENV` (preview / production).
- Subdomínios `loja.esmaltale.com.br` e `primeiravisita.esmaltale.com.br` apontam para a Cloudflare: **não mexer**. Não mexer no banco do WordPress antigo.

### "publica em produção"

1. Confirmar que a `main` está limpa e buildando.
2. Criar a tag `prod-AAAA-MM-DD-HHMM` na `main` e enviar a tag.
3. Atualizar `producao` com a `main` por fast-forward (`git push origin main:producao`) — nunca força.
4. Esperar a Hostinger publicar e verificar esmaltale.com.br: rotas, 404, HTTPS e redirecionamento de www.
5. Primeira vez: confirmar com o usuário que o backup completo foi gerado no hPanel, criar a branch `producao` a partir da `main`, passar o passo a passo do hPanel e só verificar depois da confirmação.

### "volta a versão anterior" (rollback)

1. Listar as tags `prod-*` e escolher a anterior à atual.
2. `git push --force-with-lease origin <tag>:producao` — force push **só** na `producao`.
3. Esperar a Hostinger publicar e verificar esmaltale.com.br.

### Pedidos de conteúdo

Editar, subir no preview e esperar o comando do usuário para produção.
