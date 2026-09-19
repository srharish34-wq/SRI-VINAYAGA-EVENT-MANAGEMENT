document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');
  const resetBtn = document.getElementById('contactSuccessReset');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // No backend connected yet — this simply confirms receipt in the UI.
    // Replace this block with a fetch() call to your enquiries endpoint when ready.
    form.style.display = 'none';
    success.classList.add('show');
  });

  resetBtn.addEventListener('click', () => {
    form.reset();
    form.style.display = 'flex';
    success.classList.remove('show');
  });

});