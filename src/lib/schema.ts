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

/** Envolve vários nós num único @graph. */
export function grafo(...nos: object[]) {
  return { '@context': 'https://schema.org', '@graph': nos };
}
