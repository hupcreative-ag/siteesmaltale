/**
 * Eventos de GA4 e Meta Pixel. Em preview os scripts não são carregados,
 * então gtag/fbq não existem e as chamadas viram no-op.
 */
type Params = Record<string, string | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function base(params: Params = {}): Params {
  return { page_location: window.location.href, ...params };
}

export function gtagEvent(nome: string, params?: Params) {
  if (typeof window.gtag === 'function') window.gtag('event', nome, base(params));
}

export function fbqEvent(tipo: 'track' | 'trackCustom', nome: string, params?: Params) {
  if (typeof window.fbq === 'function') window.fbq(tipo, nome, params ?? {});
}

/** Unidade associada ao elemento clicado (data-unit no próprio link ou num ancestral). */
function unidadeDe(el: Element): string | undefined {
  return el.closest<HTMLElement>('[data-unit]')?.dataset.unit || undefined;
}

export function trackSelectUnit(unit: string) {
  gtagEvent('select_item', { unit });
  fbqEvent('trackCustom', 'SelectStore', { unit });
}

export function trackOpenModal(origem: string, modo: 'agendamento' | 'duvida') {
  gtagEvent('open_booking_modal', { origem, modo });
}

/** Delegação de cliques para WhatsApp, Trinks e mapa. */
export function initClickTracking() {
  document.addEventListener('click', (e) => {
    const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href]');
    if (!link) return;
    const href = link.href;
    const unit = unidadeDe(link);

    if (href.includes('wa.me')) {
      gtagEvent('generate_lead', { unit });
      gtagEvent('click_whatsapp', { unit });
      fbqEvent('track', 'Contact');
    } else if (href.includes('trinks.com')) {
      gtagEvent('begin_checkout', { unit });
      gtagEvent('click_trinks', { unit });
      fbqEvent('track', 'Schedule');
    } else if (href.includes('google.com/maps')) {
      gtagEvent('click_map', { unit });
    }
  });
}
