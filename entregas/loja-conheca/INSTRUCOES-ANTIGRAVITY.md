# Nova página /conheca/ (loja.esmaltale.com.br)

Cole o texto abaixo no Antigravity e anexe a pasta `loja-conheca` (ou o arquivo `loja-conheca.zip`).

---

Substitua a página **/conheca/** (lista de unidades, a do QR Code dos panfletos) pela nova versão em anexo. O código já está pronto e testado. Siga estas regras:

1. **Troque o arquivo inteiro.** O conteúdo de `conheca/index.html` substitui a página atual de /conheca/ exatamente como está. Não reescreva, não reformate, não traduza e não "melhore" textos, classes, cores, ícones ou estrutura.

2. **Suba as imagens.** Crie a pasta `assets/conheca/` na raiz do site e coloque nela os 7 arquivos de `assets/conheca/`, com os mesmos nomes:
   - `logo-esmaltale.svg`
   - `shopping-barra.webp`, `shopping-da-bahia.webp`, `shopping-paralela.webp`, `parque-shopping-bahia.webp`, `salvador-shopping.webp`, `shopping-bela-vista.webp`

   A página usa caminhos absolutos (`/assets/conheca/...`). O favicon continua sendo `/assets/logofav.png`, que já existe.

3. **Mantenha a automação dos cupons.** Hoje, quando uma landing de unidade ganha ou perde cupom, o sistema atualiza esta página. A nova versão mantém o array `STORES_DATA` com os mesmos campos de antes: `slug`, `name`, `city`, `address`, `image`, `url` e `hasActiveCoupon`.
   - Ela também tem campos novos: `unitUrl`, `trinksUrl`, `whatsapp`, `isNew`, `promo` e `priority`.
   - Ajuste a automação para continuar mudando só `hasActiveCoupon` (e `url`, se ela já fazia isso) na loja certa, pelo `slug`.
   - A automação não pode apagar, reordenar nem sobrescrever os campos novos.
   - Com `hasActiveCoupon: true`, `url` deve ser a landing do cupom (ex.: `/shoppingbarra`). Sem cupom, `url` pode continuar `/conheca/<slug>`.

4. **Não mexa em mais nada.** As páginas das unidades, as landings de cupom e o gerador da imagem do cupom ficam como estão. Não adicione bibliotecas, fontes, animações nem scripts: o GA4 (G-G651HHSCPV) já está no arquivo, carregando depois da página.

5. **Confira depois de publicar,** num celular:
   - /conheca/ abre, com o logo e as 6 fotos.
   - Ao tocar numa loja, as opções descem logo abaixo dela, e só uma fica aberta por vez.
   - "Pegar meu cupom" (só nas lojas com cupom ativo) leva à landing do cupom daquela loja.
   - "Agendar online" abre o Trinks da loja, e "WhatsApp" abre a conversa com a mensagem pronta.
   - "Conhecer a unidade" leva a /conheca/<slug>.
   - Tire o cupom de uma landing e confirme que o selo "Cupom ativo" some desta página.

---

## Como editar depois (direto no `STORES_DATA`)

- **Ordem das lojas:** troque os números de `priority` (1 aparece primeiro).
- **Selo "Nova unidade":** `isNew: true`.
- **Selo de promoção:** `promo: 'Promoção'`, ou outro texto curto. Deixe `''` para esconder.
- **Sem Trinks:** apague `trinksUrl` e o botão some, ficando só o WhatsApp.
- **Foto nova:** 240x288 px, em WebP, na pasta `assets/conheca/`, e troque `image`.
