/* ==========================================================
   typing.js: hero typewriter effect
   Types a phrase -> pauses -> deletes it -> types the next, forever.
   ========================================================== */

function initTyping() {
  const target = document.getElementById('typed-text');
  if (!target) return;

  // Edit this list to change the cycling text
  const roles = [
    'Web Application Developer',
    'BIM Student',
    'Technology Enthusiast',
    'AI/ML Learner',
    'Problem Solver',
  ];

  // Speeds in milliseconds
  const TYPE_DELAY = 80;
  const DELETE_DELAY = 40;
  const PAUSE_AFTER_TYPING = 1600;
  const PAUSE_AFTER_DELETING = 350;

  // Respect reduced-motion: show the first phrase, no animation
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    target.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      charIndex++;
      target.textContent = currentRole.slice(0, charIndex);

      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(tick, PAUSE_AFTER_TYPING);
        return;
      }
      setTimeout(tick, TYPE_DELAY);
    } else {
      charIndex--;
      target.textContent = currentRole.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(tick, PAUSE_AFTER_DELETING);
        return;
      }
      setTimeout(tick, DELETE_DELAY);
    }
  }

  tick();
}
