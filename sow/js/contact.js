/**
 * SOW — Spare On Wheel | Contact Form Controller & Validator
 */

export function initContactForm() {
  // Configurable future endpoint (e.g. Formspree, AWS API Gateway, or custom backend)
  const SOW_CONTACT_ENDPOINT = ''; // Leave empty for static demonstration mode

  const form = document.getElementById('sow-contact-form');
  const modalOverlay = document.getElementById('contact-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (!form) return;

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateField(input, condition) {
    if (!condition) {
      input.classList.add('is-invalid');
      return false;
    }
    input.classList.remove('is-invalid');
    return true;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('#contact-name');
    const emailInput = form.querySelector('#contact-email');
    const phoneInput = form.querySelector('#contact-phone');
    const messageInput = form.querySelector('#contact-message');

    let isValid = true;

    if (!validateField(nameInput, nameInput.value.trim().length >= 2)) isValid = false;
    if (!validateField(emailInput, validateEmail(emailInput.value.trim()))) isValid = false;
    if (!validateField(messageInput, messageInput.value.trim().length >= 10)) isValid = false;

    if (!isValid) return;

    if (SOW_CONTACT_ENDPOINT) {
      // Production API call
      const formData = new FormData(form);
      fetch(SOW_CONTACT_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then((res) => {
        if (res.ok) {
          showModal('Message Received', 'Thank you. Our team will review your inquiry and follow up shortly.');
          form.reset();
        } else {
          showModal('Notice', 'Unable to send message at this time. Please email us directly at partner@spareonwheel.com.');
        }
      }).catch(() => {
        showModal('Notice', 'Unable to send message at this time. Please email us directly at partner@spareonwheel.com.');
      });
    } else {
      // Static Mode (No false claims of transmission)
      showModal(
        'Contact Integration Coming Soon',
        'Thank you for reaching out! Our official business communications portal is currently being integrated for production deployment. For inquiries, partnerships, or investor relations, please connect directly with us at info@spareonwheel.com.'
      );
      form.reset();
    }
  });

  function showModal(title, message) {
    if (!modalOverlay) return;
    const modalTitle = modalOverlay.querySelector('.modal-title');
    const modalDesc = modalOverlay.querySelector('.modal-description');
    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = message;

    modalOverlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  modalCloseBtn?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay?.classList.contains('is-visible')) {
      closeModal();
    }
  });
}
