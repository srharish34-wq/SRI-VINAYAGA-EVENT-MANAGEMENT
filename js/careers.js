document.addEventListener('DOMContentLoaded', () => {

  const applyModal = document.getElementById('applyModal');
  const applyButtons = document.querySelectorAll('.apply-btn');
  const applyClose = document.getElementById('applyModalClose');
  const applyForm = document.getElementById('applyForm');
  const applySuccess = document.getElementById('applyModalSuccess');
  const applySuccessClose = document.getElementById('applyModalSuccessClose');
  const applyPositionField = document.getElementById('applyPosition');
  const applyModalSub = document.getElementById('applyModalSub');

  if (!applyModal) return;

  function openApply(role) {
    applyPositionField.value = role;
    applyModalSub.textContent = `Applying for: ${role}. Share your details and we'll call you back.`;
    applyForm.style.display = 'flex';
    applySuccess.classList.remove('show');
    applyModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeApply() {
    applyModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  applyButtons.forEach(btn => {
    btn.addEventListener('click', () => openApply(btn.dataset.role || 'General Application'));
  });

  applyClose.addEventListener('click', closeApply);
  applySuccessClose.addEventListener('click', closeApply);
  applyModal.addEventListener('click', (e) => { if (e.target === applyModal) closeApply(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeApply(); });

  applyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // No backend connected yet — this simply confirms receipt in the UI.
    // Replace this block with a fetch() call to your applications endpoint when ready.
    applyForm.style.display = 'none';
    applySuccess.classList.add('show');
    applyForm.reset();
  });

});