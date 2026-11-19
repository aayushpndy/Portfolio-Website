/* ==========================================================
   main.js: entry point. Starts every feature once the DOM is ready.
   Each feature lives in its own file and exposes an init function.
   ========================================================== */

/* Footer year, always current */
function initYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}

/* Floating "back to top" button */
function initScrollTop() {
  const button = document.getElementById('scroll-top');
  if (!button) return;

  const update = () => button.classList.toggle('is-visible', window.scrollY > 600);
  update();
  window.addEventListener('scroll', update, { passive: true });

  // scrollTo respects the CSS scroll-behavior (smooth, or instant for reduced motion)
  button.addEventListener('click', () => window.scrollTo({ top: 0 }));
}

/* Project cards: expandable details + screenshot fallback */
function initProjectCards() {
  document.querySelectorAll('.project-card__toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      const isOpen = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(isOpen));
      panel.classList.toggle('is-open', isOpen);
      button.querySelector('.label').textContent = isOpen ? 'Hide Details' : 'Project Details';
    });
  });

  // If a screenshot file is missing, hide the broken image so the placeholder shows
  document.querySelectorAll('.project-card__media img').forEach((img) => {
    const hide = () => { img.hidden = true; };
    if (img.complete && img.naturalWidth === 0) hide();
    else img.addEventListener('error', hide, { once: true });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initTyping();
  initContactForm();
  initScrollTop();
  initProjectCards();
  initYear();
});
