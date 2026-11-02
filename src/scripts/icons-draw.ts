/** Desenha o traço dos ícones .icon--draw quando entram na tela. */
export function initIconDraw() {
  const icones = document.querySelectorAll<SVGElement>('.icon--draw');
  if (!icones.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    icones.forEach((i) => i.classList.add('is-drawn'));
    return;
  }

  const observer = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        entrada.target.classList.add('is-drawn');
        observer.unobserve(entrada.target);
      }
    },
    { threshold: 0.4 },
  );

  icones.forEach((i) => observer.observe(i));
}
