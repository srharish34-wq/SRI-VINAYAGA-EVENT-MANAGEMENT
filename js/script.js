document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 12) {
      header.style.boxShadow = '0 8px 24px rgba(0,0,0,.35)';
    } else {
      header.style.boxShadow = 'none';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Testimonial carousel ---------- */
  const track = document.getElementById('tTrack');
  const dotsWrap = document.getElementById('tDots');
  const prevBtn = document.getElementById('tPrev');
  const nextBtn = document.getElementById('tNext');

  if (track && dotsWrap) {
    const slides = Array.from(track.querySelectorAll('.t-slide'));
    let current = 0;
    let timer = null;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function startAuto() {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;
      timer = setInterval(() => goTo(current + 1), 6000);
    }
    function stopAuto() { clearInterval(timer); }

    prevBtn.addEventListener('click', () => { goTo(current - 1); stopAuto(); startAuto(); });
    nextBtn.addEventListener('click', () => { goTo(current + 1); stopAuto(); startAuto(); });

    const carousel = document.getElementById('testimonialCarousel');
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);

    startAuto();
  }

  /* ---------- Stats count-up (runs once, on scroll into view) ---------- */
  const statNums = document.querySelectorAll('.stat-num');
  if (statNums.length) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animate = (el) => {
      const target = parseInt(el.dataset.count, 10);
      if (reduced) { el.textContent = target; return; }
      const duration = 1200;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => io.observe(el));
  }

  /* ---------- FAQ accordion ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = q.getAttribute('aria-expanded') === 'true';

      // close all others
      faqItems.forEach(other => {
        if (other !== item) {
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });

      q.setAttribute('aria-expanded', String(!isOpen));
      a.style.maxHeight = isOpen ? null : a.scrollHeight + 'px';
    });
  });

  /* ---------- Book an Event modal ---------- */
  const modal = document.getElementById('bookModal');
  const openTriggers = [
    document.getElementById('bookEventBtn'),
    document.getElementById('heroBookBtn'),
    document.getElementById('ctaBookBtn')
  ];
  const closeBtn = document.getElementById('modalClose');
  const form = document.getElementById('bookForm');
  const successPanel = document.getElementById('modalSuccess');
  const successClose = document.getElementById('modalSuccessClose');

  function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    form.style.display = 'flex';
    successPanel.classList.remove('show');
  }
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openTriggers.forEach(btn => btn && btn.addEventListener('click', openModal));
  closeBtn.addEventListener('click', closeModal);
  successClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // No backend connected yet — this simply confirms receipt in the UI.
      // Replace this block with a fetch() call to your booking endpoint when ready.
      form.style.display = 'none';
      successPanel.classList.add('show');
      form.reset();
    });
  }

});