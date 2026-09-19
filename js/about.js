document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Scroll reveal for hero, story, vision/mission,
     journey timeline and founder cards ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (!revealEls.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    revealEls.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => io.observe(el));

});
