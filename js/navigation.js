/* ==========================================================
   navigation.js: sticky-header state, mobile menu, scroll spy
   ========================================================== */

function initNavigation() {
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  if (!header || !toggle || !menu) return;

  /* ---- 1. Add a border/shadow to the header once the page scrolls ---- */
  function updateHeaderState() {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  }
  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  /* ---- 2. Mobile menu open / close ---- */
  function setMenuOpen(isOpen) {
    menu.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', isOpen);
  }

  toggle.addEventListener('click', () => {
    setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Close after clicking any link in the menu
  links.forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));

  // Close with the Escape key, returning focus to the button
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      setMenuOpen(false);
      toggle.focus();
    }
  });

  // Reset if the window is resized up to desktop width
  window.matchMedia('(min-width: 769px)').addEventListener('change', (e) => {
    if (e.matches) setMenuOpen(false);
  });

  /* ---- 3. Scroll spy: highlight the link of the section in view ---- */
  function setActiveLink(id) {
    links.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  // A section counts as "current" when it crosses a thin band near the
  // upper-middle of the viewport.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveLink(entry.target.dataset.nav || entry.target.id);
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
  setActiveLink('home');
}
