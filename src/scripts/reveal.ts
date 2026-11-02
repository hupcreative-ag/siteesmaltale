/**
 * Animação de entrada: elementos com [data-reveal] ganham .is-revealed ao entrar na tela.
 * O estado inicial (escondido) só vale com JS (html.js) e sem prefers-reduced-motion,
 * então sem script o conteúdo aparece normalmente.
 * Atraso em cascata: [data-reveal-stagger] no pai distribui --reveal-delay entre os filhos [data-reveal].
 */
export function initReveal() {
  const alvos = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!alvos.length) return;

  document.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((pai) => {
    const passo = Number(pai.dataset.revealStagger) || 80;
    pai.querySelectorAll<HTMLElement>(':scope > [data-reveal], :scope > * > [data-reveal]').forEach((el, i) => {
      el.style.setProperty('--reveal-delay', `${i * passo}ms`);
    });
  });

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    alvos.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        entrada.target.classList.add('is-revealed');
        observer.unobserve(entrada.target);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
  );
  alvos.forEach((el) => observer.observe(el));
}
