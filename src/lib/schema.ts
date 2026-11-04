/**
 * JSON-LD (schema.org) gerado a partir dos dados do site, para buscadores e leitura por IA.
 * Tudo vem de src/data e src/config: abrir, fechar ou editar uma unidade atualiza o schema.
 * Os nós se ligam por @id (organização ↔ site ↔ páginas ↔ unidades ↔ serviços), formando um
 * único grafo de entidades em cada página.
 */
import { SITE, HORARIO } from '../config/site';
import { unidadesAtivas, totalUnidades, porExtenso, listaCidades, localizacao, mapaUrl, perfilGoogleUrl } from './unidades';
import { SERVICOS } from '../data/servicos';
import type { Unidade } from '../data/unidades';

export const ORG_ID = `${SITE.url}/#organizacao`;
const SITE_ID = `${SITE.url}/#site`;
const CATALOGO_ID = `${SITE.url}/#servicos`;
const LOGO_ID = `${SITE.url}/#logo`;

/** Data do build: as páginas são geradas a cada publicação. */
const HOJE = new Date().toISOString().slice(0, 10);

const cidades = [...new Set(unidadesAtivas.map((u) => u.cidade))];
const areaAtendida = cidades.map((c) => ({ '@type': 'City', name: c, containedInPlace: { '@type': 'State', name: 'Bahia' } }));

export const salaoId = (u: Unidade) => `${SITE.url}/lojas/#${u.slug}`;

/** Descrição curta da rede, usada na organização e no site. */
export const DESCRICAO_REDE = `Rede de esmalterias fundada em ${SITE.fundacao} em Salvador, com ${porExtenso(totalUnidades)} unidades em shoppings de ${listaCidades}. Manicure, pedicure, alongamento de unhas, nail art, SPA dos pés e podologia, com instrumentos esterilizados em autoclave e agendamento online.`;

export function organizacao(logo: { url: string; width: number; height: number }) {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.nome,
    legalName: SITE.razao,
    url: `${SITE.url}/`,
    description: DESCRICAO_REDE,
    logo: { '@type': 'ImageObject', '@id': LOGO_ID, url: logo.url, width: logo.width, height: logo.height, caption: SITE.nome },
    image: { '@id': LOGO_ID },
    slogan: SITE.assinatura,
    foundingDate: String(SITE.fundacao),
    foundingLocation: { '@type': 'Place', name: 'Salvador, Bahia, Brasil' },
    areaServed: areaAtendida,
    knowsAbout: [...SERVICOS.map((s) => s.nome), 'Esmalteria', 'Cuidado com as unhas', 'Esterilização em autoclave'],
    knowsLanguage: 'pt-BR',
    sameAs: [SITE.instagram],
    subOrganization: unidadesAtivas.map((u) => ({ '@id': salaoId(u) })),
    hasOfferCatalog: catalogoServicos(),
  };
}

export function website() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: SITE.nome,
    url: `${SITE.url}/`,
    description: DESCRICAO_REDE,
    inLanguage: 'pt-BR',
    publisher: { '@id': ORG_ID },
    about: { '@id': ORG_ID },
  };
}

/** Uma unidade como BeautySalon, dentro do shopping (ShoppingCenter). */
export function salao(u: Unidade, imagemUrl?: string) {
  const local = localizacao(u, true);
  return {
    '@type': ['BeautySalon', 'NailSalon'],
    '@id': salaoId(u),
    name: `${SITE.nome} ${u.nome}`,
    description: `Esmalteria ${SITE.nome} no ${u.nome}, em ${u.cidade}${local ? ` (${local})` : ''}: manicure, pedicure, alongamento, nail art, SPA dos pés e podologia.`,
    parentOrganization: { '@id': ORG_ID },
    brand: { '@id': ORG_ID },
    url: `${SITE.url}/lojas/#${u.slug}`,
    logo: { '@id': LOGO_ID },
    ...(imagemUrl && { image: imagemUrl }),
    telephone: `+55${u.telefone ?? u.whatsapp}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: [u.endereco, u.piso, u.loja].filter(Boolean).join(', '),
      ...(u.bairro && { addressNeighborhood: u.bairro }),
      addressLocality: u.cidade,
      addressRegion: u.uf,
      postalCode: u.cep,
      addressCountry: 'BR',
    },
    containedInPlace: {
      '@type': 'ShoppingCenter',
      name: u.nome,
      address: {
        '@type': 'PostalAddress',
        streetAddress: u.endereco,
        addressLocality: u.cidade,
        addressRegion: u.uf,
        postalCode: u.cep,
        addressCountry: 'BR',
      },
    },
    ...(u.lat !== undefined &&
      u.lng !== undefined && { geo: { '@type': 'GeoCoordinates', latitude: u.lat, longitude: u.lng } }),
    hasMap: mapaUrl(u),
    areaServed: { '@type': 'City', name: u.cidade },
    openingHoursSpecification: HORARIO.schema.map((h) => ({ '@type': 'OpeningHoursSpecification', ...h })),
    currenciesAccepted: 'BRL',
    knowsLanguage: 'pt-BR',
    hasOfferCatalog: { '@id': CATALOGO_ID },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'agendamento',
      telephone: `+55${u.whatsapp}`,
      url: `https://wa.me/55${u.whatsapp}`,
      availableLanguage: 'pt-BR',
    },
    ...((u.googleCid || u.trinksUrl || u.landingUrl) && {
      sameAs: [perfilGoogleUrl(u), u.trinksUrl, u.landingUrl].filter(Boolean),
    }),
    ...(u.trinksUrl && {
      potentialAction: {
        '@type': 'ReserveAction',
        name: 'Agendar pelo Trinks',
        target: { '@type': 'EntryPoint', urlTemplate: u.trinksUrl, inLanguage: 'pt-BR' },
      },
    }),
  };
}

/** Catálogo dos serviços (da organização; as unidades apontam para ele por @id). */
export function catalogoServicos() {
  return {
    '@type': 'OfferCatalog',
    '@id': CATALOGO_ID,
    name: 'Serviços Esmaltale',
    itemListElement: SERVICOS.map((s, i) => ({
      '@type': 'Offer',
      position: i + 1,
      itemOffered: {
        '@type': 'Service',
        name: s.nome,
        description: s.descricao,
        provider: { '@id': ORG_ID },
        areaServed: areaAtendida,
        ...(s.saibaMais && { url: `${SITE.url}${s.saibaMais}` }),
      },
    })),
  };
}

/** Trilha de navegação (BreadcrumbList); o primeiro item é sempre o Início. */
export function breadcrumb(itens: { nome: string; caminho: string }[]) {
  const todos = [{ nome: 'Início', caminho: '/' }, ...itens];
  const ultimo = todos[todos.length - 1].caminho;
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE.url}${ultimo}#trilha`,
    itemListElement: todos.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.nome,
      item: `${SITE.url}${it.caminho}`,
    })),
  };
}

interface OpcoesPagina {
  /** URL absoluta da imagem principal da página. */
  imagem?: string;
  /** @ids das entidades principais da página (serviço, unidades...). */
  principal?: string[];
  /** Página com trilha (todas, menos a Home). */
  comTrilha?: boolean;
}

/** Página (WebPage, AboutPage, CollectionPage...) ligada ao site, à organização e à trilha. */
export function pagina(tipo: string, caminho: string, nome: string, descricao: string, opcoes: OpcoesPagina = {}) {
  const { imagem, principal, comTrilha = caminho !== '/' } = opcoes;
  return {
    '@type': tipo,
    '@id': `${SITE.url}${caminho}#pagina`,
    url: `${SITE.url}${caminho}`,
    name: nome,
    description: descricao,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    dateModified: HOJE,
    ...(imagem && { primaryImageOfPage: { '@type': 'ImageObject', url: imagem }, image: imagem }),
    ...(principal?.length && { mainEntity: principal.map((id) => ({ '@id': id })) }),
    ...(comTrilha && { breadcrumb: { '@id': `${SITE.url}${caminho}#trilha` } }),
  };
}

/** Serviço oferecido pela Esmaltale nas unidades ativas. */
export function servico(nome: string, descricao: string, caminho: string, extra: object = {}) {
  return {
    '@type': 'Service',
    '@id': `${SITE.url}${caminho.includes('#') ? caminho : `${caminho}#servico`}`,
    name: nome,
    description: descricao,
    url: `${SITE.url}${caminho}`,
    serviceType: nome,
    category: 'Beleza e cuidado com as unhas',
    provider: { '@id': ORG_ID },
    areaServed: areaAtendida,
    availableChannel: {
      '@type': 'ServiceChannel',
      name: 'Agendamento nas unidades',
      serviceUrl: `${SITE.url}/lojas/`,
      availableLanguage: 'pt-BR',
    },
    ...extra,
  };
}

/** FAQPage a partir de pares pergunta/resposta visíveis na página. */
export function faq(itens: { pergunta: string; resposta: string }[], caminho?: string) {
  return {
    '@type': 'FAQPage',
    ...(caminho && { '@id': `${SITE.url}${caminho}#perguntas` }),
    inLanguage: 'pt-BR',
    mainEntity: itens.map((f) => ({
      '@type': 'Question',
      name: f.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: f.resposta },
    })),
  };
}

/** Envolve vários nós num único @graph. */
export function grafo(...nos: object[]) {
  return { '@context': 'https://schema.org', '@graph': nos };
}
