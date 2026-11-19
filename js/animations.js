/* ==========================================================
   animations.js: reveal elements as they scroll into view
   ========================================================== */

function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  // Without IntersectionObserver support, just show everything
  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('is-visible');
        obs.unobserve(el); // animate once only

        // After the fade-in ends, drop the reveal classes so the element's own
        // hover transitions (cards lifting, etc.) are not slowed by the reveal.
        el.addEventListener('transitionend', function done(event) {
          if (event.propertyName !== 'opacity') return;
          el.classList.remove('reveal', 'is-visible');
          el.style.removeProperty('--reveal-delay');
          el.removeEventListener('transitionend', done);
        });
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}
