/**
 * JSON-LD (schema.org) gerado a partir dos dados do site, para buscadores e leitura por IA.
 * Tudo vem de src/data e src/config: abrir, fechar ou editar uma unidade atualiza o schema.
 */
import { SITE, HORARIO } from '../config/site';
import { unidadesAtivas } from './unidades';
import { SERVICOS } from '../data/servicos';
import type { Unidade } from '../data/unidades';

const ORG_ID = `${SITE.url}/#organizacao`;
const SITE_ID = `${SITE.url}/#site`;

export function organizacao(logoUrl: string) {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.nome,
    legalName: SITE.razao,
    url: `${SITE.url}/`,
    logo: logoUrl,
    slogan: SITE.assinatura,
    foundingDate: String(SITE.fundacao),
    foundingLocation: { '@type': 'Place', name: 'Salvador, BA' },
    areaServed: [...new Set(unidadesAtivas.map((u) => u.cidade))].map((c) => ({ '@type': 'City', name: c })),
    sameAs: [SITE.instagram],
    hasOfferCatalog: catalogoServicos(),
  };
}

export function website() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: SITE.nome,
    url: `${SITE.url}/`,
    inLanguage: 'pt-BR',
    publisher: { '@id': ORG_ID },
  };
}

/** Uma unidade como BeautySalon (usado na Home e, depois, em /lojas). */
export function salao(u: Unidade, imagemUrl?: string) {
  return {
    '@type': 'BeautySalon',
    '@id': `${SITE.url}/lojas/#${u.slug}`,
    name: `${SITE.nome} ${u.nome}`,
    parentOrganization: { '@id': ORG_ID },
    url: `${SITE.url}/lojas/#${u.slug}`,
    ...(imagemUrl && { image: imagemUrl }),
    ...(u.telefone && { telephone: `+55${u.telefone}` }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: [u.endereco, u.piso, u.loja].filter(Boolean).join(', '),
      ...(u.bairro && { addressNeighborhood: u.bairro }),
      addressLocality: u.cidade,
      addressRegion: u.uf,
      postalCode: u.cep,
      addressCountry: 'BR',
    },
    ...(u.lat !== undefined &&
      u.lng !== undefined && { geo: { '@type': 'GeoCoordinates', latitude: u.lat, longitude: u.lng } }),
    openingHoursSpecification: HORARIO.schema.map((h) => ({ '@type': 'OpeningHoursSpecification', ...h })),
    ...(u.trinksUrl && {
      sameAs: [u.trinksUrl],
      potentialAction: {
        '@type': 'ReserveAction',
        target: u.trinksUrl,
        name: 'Agendar pelo Trinks',
      },
    }),
  };
}

/** Catálogo dos serviços (para a organização, na Home). */
export function catalogoServicos() {
  return {
    '@type': 'OfferCatalog',
    name: 'Serviços Esmaltale',
    itemListElement: SERVICOS.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.nome,
        description: s.descricao,
        provider: { '@id': ORG_ID },
        areaServed: [...new Set(unidadesAtivas.map((u) => u.cidade))],
      },
    })),
  };
}

/** Trilha de navegação (BreadcrumbList); o primeiro item é sempre o Início. */
export function breadcrumb(itens: { nome: string; caminho: string }[]) {
  const todos = [{ nome: 'Início', caminho: '/' }, ...itens];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: todos.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.nome,
      item: `${SITE.url}${it.caminho}`,
    })),
  };
}

/** Página com tipo específico (AboutPage, CollectionPage...) ligada ao site e à organização. */
export function pagina(tipo: string, caminho: string, nome: string, descricao: string) {
  return {
    '@type': tipo,
    '@id': `${SITE.url}${caminho}#pagina`,
    url: `${SITE.url}${caminho}`,
    name: nome,
    description: descricao,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
  };
}

/** Serviço oferecido pela Esmaltale nas unidades ativas. */
export function servico(nome: string, descricao: string, caminho: string, extra: object = {}) {
  return {
    '@type': 'Service',
    name: nome,
    description: descricao,
    url: `${SITE.url}${caminho}`,
    serviceType: nome,
    provider: { '@id': ORG_ID },
    areaServed: [...new Set(unidadesAtivas.map((u) => u.cidade))].map((c) => ({ '@type': 'City', name: c })),
    ...extra,
  };
}

/** FAQPage a partir de pares pergunta/resposta visíveis na página. */
export function faq(itens: { pergunta: string; resposta: string }[]) {
  return {
    '@type': 'FAQPage',
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
