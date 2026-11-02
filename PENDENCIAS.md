# Pendências

Atualizado em 2026-11-02 (Fase 2).

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

Carrossel da Home ligado no preview (decidido em 2026-11-02). Arte feita por nós com fotos já entregues, confirmar:
- Banner 2 (Podologia) ← `podologia-02` (profissional atendendo)
- Banner 3 (Experiência) ← `sobre-pagina` (cliente escolhendo esmalte). A mesma foto aparece no texto institucional da página Sobre.

## Textos

- [x] Títulos (h1) dos heros aprovados: "Sobre a Esmaltale", "Podologia" e "Nossas unidades" (2026-11-02).

## Especificação das imagens que faltam

Formato: JPG (ou PNG/WebP), sRGB, qualidade alta, sem texto aplicado na foto. O site converte para AVIF/WebP e gera os tamanhos menores.

| Imagem | Proporção | Tamanho mínimo | Observação |
|---|---|---|---|
| `servicos/spa-das-maos` | 1:1 quadrada | 1200 × 1200 px | Igual às outras fotos de serviço |
| `lojas/shopping-barra` (definitiva) | 4:3 horizontal | 1600 × 1200 px | Igual às outras fotos de loja |

## Decisões registradas

- Botões Trinks e WhatsApp em roxo sólido, conforme o briefing. Na referência eles eram verde e rosa.
- `section-tag` em rosa-escuro (#A11E5D) em vez do rosa da referência (#E0609A), para passar no contraste AA.
- Horário: segunda a sábado das 9h às 22h, domingo das 12h às 21h. A landing antiga dizia 10h às 22h todos os dias.
- Referências de localização seguem o briefing ("Próximo ao Lar Shopping", "Próximo à Alpha Fitness"), não o hub antigo.
- Card do Parque Shopping Bahia na Home usa `parque-shopping-bahia.jpg` (a versão 02 é praticamente a mesma foto da Sobre resumida).
- Card SPA das Mãos no gradiente da marca com o ícone branco, em vez do placeholder com nome de arquivo: a cliente confirmou que não tem foto.
- Serviços na Home: faixa horizontal com scroll-snap no celular (11 cards empilhados passariam de 3.000px) e grade de 2, 3 e 4 colunas do tablet em diante.
- Subtítulo do hero da Home mantido literal: "Seis unidades nos principais shoppings de Salvador." (o Parque fica em Lauro de Freitas).
