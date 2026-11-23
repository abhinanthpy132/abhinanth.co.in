const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      nav.classList.remove('is-open');
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      toggle.click(); toggle.focus();
    }
  });
}

const form = document.querySelector('#enquiry-form');
if (form && form.dataset.endpoint) {
  const status = document.querySelector('#form-status');
  const submit = form.querySelector('[type=submit]');
  const required = [...form.querySelectorAll('[required]')];
  const validate = field => {
    const valid = field.value.trim() && field.checkValidity();
    const error = document.getElementById(`${field.id}-error`);
    field.setAttribute('aria-invalid', String(!valid));
    if (error) error.textContent = valid ? '' : field.validity.typeMismatch ? 'Enter a valid email address.' : 'This field is required.';
    return valid;
  };
  required.forEach(field => field.addEventListener('blur', () => validate(field)));
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const valid = required.map(validate).every(Boolean);
    if (!valid) { required.find(field => field.getAttribute('aria-invalid') === 'true')?.focus(); return; }
    if (form.elements.website_url.value) return;
    submit.disabled = true;
    status.textContent = 'Sending your enquiry…';
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      delete data.website_url;
      const response = await fetch(form.dataset.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error('Request failed');
      form.reset();
      required.forEach(field => field.removeAttribute('aria-invalid'));
      status.textContent = 'Thank you. Your enquiry was sent successfully.';
    } catch {
      status.textContent = 'Your enquiry could not be sent. Please try again or contact us through our social channels.';
    } finally { submit.disabled = false; }
  });
}
