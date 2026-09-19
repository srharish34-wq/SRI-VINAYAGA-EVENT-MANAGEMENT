document.addEventListener('DOMContentLoaded', () => {

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Scroll reveal for hero, service sections ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    if (reduced) {
      revealEls.forEach(el => el.classList.add('is-visible'));
    } else {
      const revealIO = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealIO.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(el => revealIO.observe(el));
    }
  }

  /* ---------- Active service jump-link on scroll ---------- */
  const jumpLinks = Array.from(document.querySelectorAll('.service-jump a'));
  const sections = jumpLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (jumpLinks.length && sections.length) {
    const setActive = (id) => {
      jumpLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    };

    const navIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { threshold: 0.4, rootMargin: '-90px 0px -40% 0px' });

    sections.forEach(section => navIO.observe(section));
  }

  /* ---------- Smooth scroll to service sections ---------- */
  jumpLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    });
  });

});
