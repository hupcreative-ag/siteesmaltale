# Esmaltale · site institucional

Site estático em [Astro](https://astro.build) para **esmaltale.com.br**. Preview em **novo.esmaltale.com.br**.

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
| `src/config/site.ts` | URL, horário, Instagram, mensagens do WhatsApp, menu |
| `src/config/tracking.ts` | IDs do GA4 e do Meta Pixel |
| `src/lib/unidades.ts` | Ordenação, contagem por extenso, listas e links das unidades |
| `src/styles/` | Tokens (`tokens.css`) e estilos globais (`global.css`) |
| `src/components/` | Ícones, layout (header, rodapé), modal de agendamento, seções |
| `src/assets/` | Imagens usadas no site (otimizadas no build) |
| `referencia/` | Páginas aprovadas pela cliente (somente leitura) |
| `conteudo/` | Documento de conteúdo e imagens originais (backup) |

## Ambientes

`PUBLIC_SITE_ENV` define o comportamento e é obrigatória no build:

- **preview**: noindex, sem GA4/Pixel, faixa "Versão de prévia".
- **production**: indexável, com GA4 e Meta Pixel.

## Publicação

A Hostinger está ligada ao repositório e publica a cada push:

- `main` → https://novo.esmaltale.com.br (preview)
- `producao` → https://esmaltale.com.br (só quando autorizado)

Comandos em linguagem natural (detalhes em `CLAUDE.md`):

- **"sobe"** / **"sobe no preview"**: build, commit e push na `main`.
- **"publica em produção"**: tag `prod-AAAA-MM-DD-HHMM` e fast-forward da `producao`.
- **"volta a versão anterior"**: `producao` volta para a tag de produção anterior.

Os scripts npm `deploy:preview`, `deploy:prod` e `deploy:rollback` entram na Fase 5.

## Pendências

Ver [PENDENCIAS.md](PENDENCIAS.md).
