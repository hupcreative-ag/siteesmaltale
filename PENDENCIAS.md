# Pendências

Atualizado em 2026-11-03 (fotos dos tratamentos de podologia, hero da Home e carrosséis).

## Dados das unidades

- [ ] **Shopping Barra · referência** no shopping (ex.: "Próximo à ..."). Hoje aparece só "Piso L3".
- [ ] **Shopping Barra · endereço** a confirmar: Av. Centenário, 2992, Chame-Chame, Salvador, BA, 40155-151.
- [ ] **Shopping Barra · link do Trinks** a confirmar: usando https://www.trinks.com/esmaltale-shopping-barra (a página existe no Trinks com o nome da unidade).
- [ ] **Shopping Barra · foto definitiva da unidade**. Hoje o site usa a foto provisória do tapume (`lojas/shopping-barra.webp`, recebida em 2026-11-02, original em `conteudo/Imagens/Lojas/shopping-barra-provisoria.webp`).
- [ ] **Shopping Barra · latitude e longitude** (opcional, para o mapa no Google).
- [x] Parque Shopping Bahia · endereço: Av. Santos Dumont, 4360, conforme a landing aprovada (decidido em 2026-11-02).

## Imagens de conteúdo

| Arquivo esperado | Onde aparece |
|---|---|
| `servicos/spa-das-maos` | Card SPA das Mãos (Home). A cliente não tem foto; o card fica no gradiente da marca até chegar uma. |


Fotos da página Sobre recebidas em 2026-11-02 (originais em `conteudo/Imagens/Sobre/`). Distribuição feita por nós, confirmar:
- `sobre-home` ← interior da loja com o logo (Sobre resumida, Home)
- `sobre-pagina` ← cliente escolhendo esmalte na prateleira (texto institucional)
- `missao` ← cliente sorrindo durante a manicure, blazer rosa
- `visao` ← cliente de óculos rindo durante a manicure

Mapeamento da podologia (confirmar):
- `podologia-01` ← `Servicos/Podologia2.jpg` (close do procedimento)
- `podologia-02` ← `Servicos/podologia03.jpg` (profissional atendendo)
- `podologia-encerramento` ← `Servicos/podologia04.jpg` (foto de 2026-11-02, podóloga com a lixa no calcanhar). É a mesma cena do card de Podologia da Home, em versão vertical; se houver outra foto de podologia, ela evita a repetição.

Carrossel da Home ligado no preview, só com o hero institucional e o banner Experiência (decidido em 2026-11-02; o banner Podologia ficou desligado em `src/data/hero.ts`).
- Banner Experiência ← `sobre-pagina` (cliente escolhendo esmalte), foto em tela cheia com o degradê da marca. A mesma foto aparece no texto institucional da página Sobre.
- Galeria da Home ← as 7 fotos da galeria da landing aprovada (`conteudo/Imagens/Galeria`).
- Podologia, "O que tratamos" ← as 5 fotos dos tratamentos (unhas encravadas, calos, fissuras, micoses e bolhas), recebidas em 2026-11-03 (originais em `conteudo/Imagens/Podologia`).

## SEO e GEO

- [x] JSON-LD em todo o site: Organization (logo, Instagram, fundação, assinatura, catálogo dos 11 serviços) e WebSite. Na Home, cada unidade como BeautySalon (endereço, geo, telefone, horário, Trinks como ReserveAction) e FAQPage. Gerados de `src/lib/schema.ts` a partir dos dados.
- [x] Open Graph e Twitter card com `public/og-image.jpg` (1200x630), meta de região (BR-BA), pré-carregamento da Gazpacho.
- [x] `robots.txt` por ambiente (preview bloqueado; produção liberada, com os robôs de IA citados) e `/llms.txt` gerado dos dados (marca, serviços, unidades, horário, FAQ, links).
- [x] FAQ reescrito como as pessoas perguntam a buscadores e IAs (com marca e cidade) + pergunta "Quais serviços a Esmaltale oferece?". Textos alternativos das fotos com serviço e cidade.
- [ ] **Perfil do Google (Google Meu Negócio) de cada unidade:** mandar o link de cada um. Entra no `sameAs` de cada BeautySalon e ajuda o Google e as IAs a ligarem o site às avaliações e ao mapa.
- [x] Avaliações reais do Google na Home (2026-11-03). Ficam fora do schema: avaliações do Google não podem ser marcadas como AggregateRating do site.
- [x] **Fase 4 (2026-11-03), Lighthouse nas 5 páginas, celular e desktop:** acessibilidade 100, boas práticas 100 e desempenho de 97 a 100 no preview. SEO 100 no build de produção (no preview o noindex é proposital). Títulos e descrições únicos com bom tamanho, um h1 por página, canonical, JSON-LD válido, sitemap com as 5 páginas e nenhum link interno quebrado. A página 404 deixou de ter canonical.
  - Teclado: "Pular para o conteúdo" aparece no primeiro Tab; o modal de agendamento abre com o foco no "Fechar", fecha com Esc e devolve o foco ao botão.
  - Em produção, "boas práticas" cai para 77 por causa do cookie de terceiros do Meta Pixel. É esperado com o Pixel ligado e não afeta o Google.

## Textos

- [ ] **Valores (página Sobre):** o documento traz só os títulos dos 6 valores. Hoje aparecem título e ícone. Se a cliente quiser uma frase curta para cada um, mandar o texto.

- [ ] **FAQ da Home (rascunho para aprovação)** em `src/data/faq.ts`: 8 perguntas com respostas montadas só com fatos do documento e dos dados das unidades. Aprovar, cortar ou pedir outras perguntas.
- [x] **Avaliações do Google** (2026-11-03): 8 avaliações reais copiadas dos prints enviados, em carrossel com setas na Home, todos com a mesma altura; texto longo abre pela setinha no canto do card. Texto como a cliente escreveu (só espaçamento corrigido). Unidade aparece só quando a cliente cita (Paralela e Parque Shopping). A avaliação da foto das unhas azuis ficou fora por não ter o nome da cliente.
- [ ] **Nota geral e total de avaliações no Google** (e o link do perfil): com eles aparece o resumo com a nota, as estrelas, o total de avaliações e o link "Ver no Google" acima do carrossel. Mandar também o nome da cliente da avaliação das unhas azuis, se quiser incluí-la.

- [x] Títulos (h1) dos heros aprovados: "Sobre a Esmaltale", "Podologia" e "Nossas unidades" (2026-11-02).

## Especificação das imagens que faltam

Formato: JPG (ou PNG/WebP), sRGB, qualidade alta, sem texto aplicado na foto. O site converte para AVIF/WebP e gera os tamanhos menores.

| Imagem | Proporção | Tamanho mínimo | Observação |
|---|---|---|---|
| `servicos/spa-das-maos` | 1:1 quadrada | 1200 × 1200 px | Igual às outras fotos de serviço |
| `lojas/shopping-barra` (definitiva) | 4:3 horizontal | 1600 × 1200 px | Igual às outras fotos de loja |

## Decisões registradas

- Fase 3 (2026-11-02): páginas Sobre, Nail Art, Podologia, Lojas e 404 na identidade da Home (moldura clara, Gazpacho, tons do Beauty Ticket).
  - Heros internos com trilha de navegação visível (Início / página) e o JSON-LD BreadcrumbList.
  - Sobre: a primeira frase do texto institucional abre o hero; os demais parágrafos ficam em "Nossa história" (título de seção criado, conversa com o link "Conheça nossa história" da Home); o último parágrafo vira citação em destaque. Contagem e lista de unidades geradas ("Hoje são seis... Salvador Shopping, ..., Parque Shopping Bahia e Shopping Barra"). Corrigido "o padrão não muda: O ambiente" para "o ambiente".
  - Nail Art: pílulas fixas com a seção ativa destacada, imagem que acompanha o texto no desktop, caixas de destaque e blocos locais com a lista de unidades gerada; galeria em polaroid no fim da página.
  - Podologia: composição das duas fotos de abertura no hero; "O que tratamos" em 3 + 2 cards; texto "em Salvador ou em Lauro de Freitas" gerado pelas cidades das unidades.
  - Lojas: atalhos para cada unidade no hero, cartão de horário com a nota dos shoppings, unidades agrupadas por cidade (títulos "Salvador" e "Lauro de Freitas") e ficha completa com CEP. Sem faixa de contato, como no briefing.
  - 404: título "Esta página não está aqui" e caminhos para o início e para as unidades (microtexto nosso); fora dos buscadores.
  - Faixa de contato e rodapé refeitos no estilo claro; rodapé ganhou coluna de horário.

- Ajustes pós-Fase 3 (2026-11-02):
  - Gradiente da marca recriado em CSS a partir da imagem enviada pelo usuário (`conteudo/Imagens/Marca/gradiente-rosa.webp`, só referência): manchas de cor sempre em movimento e granulado fixo por cima, sem arquivo para baixar. Usado nos heros internos, CTA final, 404 e menu do celular.
  - Sobre: hero com grid de fotos das lojas em movimento (como na referência hormn.com/weight-loss); a foto provisória do tapume do Shopping Barra fica fora (`fotoProvisoria` em `src/data/unidades.ts`). Missão e Visão em cartões roxo e rosa com a foto como textura. Valores em pílulas. CTA final com a foto da cliente (`sobre/cliente-maos.webp`, enviada pelo usuário) saindo da moldura.
  - Nail Art: hero sem os dois parágrafos de apresentação (pedido do usuário), com brilhos piscando.
  - Podologia: brilhos piscando ao redor das fotos do hero; "O que tratamos" em cards com foto de fundo (bento no desktop, carrossel no celular), sem ícones.
  - Brilhos piscando também em "Nossas unidades" (Home).
  - Espaço entre seções reduzido no site todo (56 / 80 / 96 px).

- Identidade visual (2026-11-02): paleta e elementos do kit de marca e do panfleto Beauty Ticket 2026 (roxo #632066, rosa #E15297, laranja #E5602E, rosa de fundo #EDB2BD, creme #F9F6EA). Tons fortes trocados por tons claros: hero e menu do celular em rosa claro com texto roxo, botões em roxo da marca.
- Títulos em Gazpacho Bold (arquivos da cliente, convertidos para woff2 em `src/assets/fontes/`). Texto corrido continua em Poppins.
- [ ] **Licença web da Gazpacho:** a fonte é comercial; confirmar que a licença da cliente cobre uso em site (webfont). Os arquivos estão instalados no Mac do usuário.
- Hero e heros internos em moldura que acompanha a janela (margem de 8px no celular e 16px a partir do tablet). Header dentro da moldura, em 3 colunas (logo, menu centralizado, botão).
- Faixa de palavras-chave em creme com filetes finos, itálico espaçado e tulipa pequena (estilo Beauty Ticket).
- Serviços: cards de 260px no desktop, arraste com mouse ou dedo, botão "Agendar agora" em pílula branca com seta.
- Galeria sem título visível (título só para leitor de tela), em formato polaroid sobre fundo creme. Avaliações com o título "O que nossas clientes falam".
- Hero: só o botão "Agende agora", que rola suavemente até as unidades (o briefing previa abrir o modal e um link "Ver unidades"; mudado a pedido). Slide 01 (2026-11-03): texto centralizado sobre a foto da loja (Salvador Shopping) coberta pelo degradê da marca em movimento, como antes. O banner Experiência continua com a foto nas cores reais e o texto à esquerda.
- Banner Experiência: desfoque progressivo + degradê claro mais leve; o botão virou link com linha rosa e seta.
- Unidades no celular: grade de 2 colunas com foto, nome e "Agendar"; piso, referência, foto grande e endereço ficam no modal, que abre já na unidade.
- Modal de agendamento redesenhado: lista com miniaturas na etapa 1 e ficha da unidade (foto, localização, endereço) com Trinks e WhatsApp na etapa 2; no celular abre como folha que sobe da base.
- Serviços no celular: lista empilhada; cada faixa (foto enquadrada no serviço, nome, "+") expande só pelo "+", e a tela rola para centralizar o card aberto.
- Faixa de palavras-chave entre Serviços e Galeria, com o brilho de 4 pontas como separador.
- Botão flutuante de agendamento só abaixo de 1024px, como círculo com ícone de agenda (no desktop o header já tem o botão).
- Animações: modais com entrada e saída suaves (fundo desfocado aparece e some aos poucos; no celular a folha sobe e desce); gradiente do hero animado por transform (GPU); animações de entrada só com opacidade e movimento, sem desfoque.

- Botões Trinks e WhatsApp em roxo sólido, conforme o briefing. Na referência eles eram verde e rosa.
- `section-tag` em rosa-escuro (#A11E5D) em vez do rosa da referência (#E0609A), para passar no contraste AA.
- Horário: segunda a sábado das 9h às 22h, domingo das 12h às 21h. A landing antiga dizia 10h às 22h todos os dias.
- Referências de localização seguem o briefing ("Próximo ao Lar Shopping", "Próximo à Alpha Fitness"), não o hub antigo.
- Card do Parque Shopping Bahia na Home usa `parque-shopping-bahia.jpg` (a versão 02 é praticamente a mesma foto da Sobre resumida).
- Card SPA das Mãos no gradiente da marca com o ícone branco, em vez do placeholder com nome de arquivo: a cliente confirmou que não tem foto.
- Ordem da Home: hero, Sobre, Unidades, Serviços, faixa da marca, Galeria, Avaliações, FAQ (pedido em 2026-11-02).
- Hero dentro de um quadro de cantos arredondados (16px de margem, raio 30px no desktop), inspirado nas referências passadas pelo usuário. Sem o selo "6 unidades em Salvador e Lauro de Freitas" (pedido do usuário; o briefing previa o selo).
- Serviços em carrossel de cards com foto, nome e "+"; hover ou toque no "+" abre um painel de vidro com a descrição, "Agendar agora" e "Saiba mais".
- Unidades na Home em card com box; os botões Trinks e WhatsApp aparecem sobre a foto no hover (em telas de toque ficam sempre visíveis). "Conhecer a unidade" só na página Lojas.
- Faixa entre Unidades e Serviços com palavras-chave da marca em loop e a tulipa entre elas (`src/components/home/FaixaMarca.astro`).
- FAQ com botão "Falar com a recepção" que abre o modal no modo dúvida (origem `faq` no tracking, além das previstas no briefing).
- Sem etiqueta (kicker) acima dos títulos de seção da Home.
- Títulos com peso 500 e escala maior (até 72px no hero), seções com 64/96/112px de respiro e container de 1280px, a partir do estudo das referências.
- Botão flutuante "Agende agora" escondido enquanto o hero está na tela (o hero e o header já têm o botão).
- Subtítulo do hero da Home mantido literal: "Seis unidades nos principais shoppings de Salvador." (o Parque fica em Lauro de Freitas).
