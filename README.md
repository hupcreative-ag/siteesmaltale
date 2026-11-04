# Esmaltale · site institucional

Site estático em [Astro](https://astro.build) para **esmaltale.com.br**. Preview em **minha.esmaltale.com.br**.

## Rodar localmente

Requer Node 22 ou superior.

```bash
npm install
cp .env.example .env.local   # PUBLIC_SITE_ENV=preview
npm run dev                  # http://localhost:4321
```

Build de produção local: `npm run build` (gera `dist/`) e `npm run preview` para servir o resultado.

## Estrutura

| Caminho | O que é |
|---|---|
| `src/data/unidades.ts` | Fonte única das unidades (endereços, WhatsApp, Trinks, fotos) |
| `src/data/hero.ts` | Banners do carrossel da Home (banner sem imagem não aparece) |
| `src/data/servicos.ts` | Cards de serviço da Home (textos, fotos e links "Saiba mais") |
| `src/data/galeria.ts` | Fotos da galeria da Home |
| `src/data/faq.ts` | Perguntas frequentes da Home (também geram o JSON-LD FAQPage) |
| `src/data/avaliacoes.ts` | Avaliações do Google (só reais; vazio mostra pendência) |
| `src/data/nailArt.ts` | Os 4 serviços da página Nail Art (texto, duração, bloco local) |
| `src/lib/schema.ts` | JSON-LD (Organization, WebSite, BeautySalon por unidade, catálogo de serviços) |
| `src/pages/robots.txt.ts`, `src/pages/llms.txt.ts` | robots.txt por ambiente e resumo da marca para IA, gerados dos dados |
| `src/config/site.ts` | URL, horário, Instagram, mensagens do WhatsApp, menu |
| `src/config/tracking.ts` | IDs do GA4 e do Meta Pixel |
| `src/lib/unidades.ts` | Ordenação, contagem por extenso, listas e links das unidades |
| `src/styles/` | Tokens (`tokens.css`) e estilos globais (`global.css`) |
| `src/components/` | Ícones, layout (header, rodapé), modal de agendamento, seções da Home e das páginas internas (`sections/`: hero interno, CTA final, faixa de contato, bloco local, destaque) |
| `src/pages/` | Home, Sobre, Nail Art, Podologia, Lojas, 404, `robots.txt` e `llms.txt` |
| `src/assets/` | Imagens usadas no site (otimizadas no build) |
| `referencia/` | Páginas aprovadas pela cliente (somente leitura) |
| `conteudo/` | Documento de conteúdo e imagens originais (backup) |

## Ambientes

`PUBLIC_SITE_ENV` define o comportamento e é obrigatória no build:

- **preview**: noindex, sem GA4/Pixel, faixa "Versão de prévia".
- **production**: indexável, com GA4 e Meta Pixel.

## Publicação

O site é publicado como arquivos estáticos pelo Git do hPanel da Hostinger, que não roda build. O script `scripts/deploy.mjs` gera a `dist` e a envia para o repositório [esmaltalesalvador/esmatalesite](https://github.com/esmaltalesalvador/esmatalesite):

- `npm run deploy:preview` → branch `deploy-preview` → https://minha.esmaltale.com.br
- `npm run deploy:producao` → branch `producao` + tag `prod-AAAA-MM-DD-HHMM` → https://esmaltale.com.br (só quando autorizado)
- `npm run deploy:voltar -- prod-AAAA-MM-DD-HHMM` → `producao` volta ao conteúdo dessa tag

Comandos em linguagem natural (detalhes em `CLAUDE.md`):

- **"sobe"** / **"sobe no preview"**: build, commit e push na `main`, depois `deploy:preview`.
- **"publica em produção"**: `deploy:producao`.
- **"volta a versão anterior"**: `deploy:voltar` com a tag anterior.

## Pendências

Ver [PENDENCIAS.md](PENDENCIAS.md).
