/**
 * Carrossel do hero da Home: autoplay de 6s, pausa em hover (sobre o texto e os controles),
 * foco, aba oculta e pelo botão,
 * pontos de navegação, swipe e setas do teclado nos controles.
 * Com prefers-reduced-motion, começa pausado (troca só pelos controles).
 * aria-live fica "off" enquanto gira sozinho e "polite" quando parado, para o leitor de tela
 * anunciar só as trocas pedidas pela pessoa.
 */
const INTERVALO = 6000;
const LIMIAR_SWIPE = 50;

export function initHeroCarousel() {
  const root = document.querySelector<HTMLElement>('[data-carousel]');
  if (!root) return;

  const track = root.querySelector<HTMLElement>('[data-carousel-track]');
  const slides = [...root.querySelectorAll<HTMLElement>('[data-slide]')];
  const dots = [...root.querySelectorAll<HTMLButtonElement>('[data-carousel-dot]')];
  const pauseBtn = root.querySelector<HTMLButtonElement>('[data-carousel-pause]');
  if (slides.length < 2) return;

  let atual = 0;
  let timer: number | undefined;
  let pausadoPeloUsuario = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let hover = false;
  let foco = false;

  const deveGirar = () => !pausadoPeloUsuario && !hover && !foco && !document.hidden;

  function agendar() {
    window.clearInterval(timer);
    timer = deveGirar() ? window.setInterval(() => ir(atual + 1), INTERVALO) : undefined;
    track?.setAttribute('aria-live', timer ? 'off' : 'polite');
  }

  function ir(n: number, pelaPessoa = false) {
    atual = (n + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('is-active', i === atual));
    dots.forEach((d, i) => d.setAttribute('aria-current', String(i === atual)));
    if (pelaPessoa) agendar();
  }

  function atualizarBotaoPausa() {
    if (!pauseBtn) return;
    pauseBtn.classList.toggle('is-paused', pausadoPeloUsuario);
    pauseBtn.setAttribute('aria-label', pausadoPeloUsuario ? 'Retomar destaques' : 'Pausar destaques');
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => ir(i, true)));

  pauseBtn?.addEventListener('click', () => {
    pausadoPeloUsuario = !pausadoPeloUsuario;
    atualizarBotaoPausa();
    agendar();
  });

  root.addEventListener('keydown', (e) => {
    if (!(e.target instanceof HTMLElement) || !e.target.closest('.hero__controls')) return;
    if (e.key === 'ArrowRight') ir(atual + 1, true);
    else if (e.key === 'ArrowLeft') ir(atual - 1, true);
    else return;
    e.preventDefault();
    dots[atual]?.focus();
  });

  // O hero ocupa a tela inteira, então a pausa por hover vale só sobre o texto e os controles;
  // no hero todo, o mouse parado em qualquer lugar travaria o carrossel.
  root.querySelectorAll<HTMLElement>('.hero__content, .hero__controls').forEach((area) => {
    area.addEventListener('mouseenter', () => {
      hover = true;
      agendar();
    });
    area.addEventListener('mouseleave', () => {
      hover = false;
      agendar();
    });
  });
  root.addEventListener('focusin', () => {
    foco = true;
    agendar();
  });
  root.addEventListener('focusout', (e) => {
    if (e.relatedTarget instanceof Node && root.contains(e.relatedTarget)) return;
    foco = false;
    agendar();
  });
  document.addEventListener('visibilitychange', agendar);

  // Swipe só para toque e caneta; arrastar com o mouse continua selecionando texto.
  let inicioX = 0;
  let inicioY = 0;
  let arrastando = false;
  track?.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    arrastando = true;
    inicioX = e.clientX;
    inicioY = e.clientY;
  });
  track?.addEventListener('pointerup', (e) => {
    if (!arrastando) return;
    arrastando = false;
    const dx = e.clientX - inicioX;
    const dy = e.clientY - inicioY;
    if (Math.abs(dx) < LIMIAR_SWIPE || Math.abs(dx) < Math.abs(dy)) return;
    ir(atual + (dx < 0 ? 1 : -1), true);
  });
  track?.addEventListener('pointercancel', () => {
    arrastando = false;
  });

  atualizarBotaoPausa();
  agendar();
}
