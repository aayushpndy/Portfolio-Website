/* ==========================================================
   contact.js: client-side validation + sending via Formspree
   The endpoint is the form's own `action` attribute in index.html.
   ========================================================== */

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');
  const submitButton = document.getElementById('form-submit');

  // Each rule returns true when valid, or an error message when not
  const rules = {
    name: (v) => v.trim().length >= 2 || 'Please enter your name (at least 2 characters).',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.',
    subject: (v) => v.trim().length >= 3 || 'Please add a short subject (at least 3 characters).',
    message: (v) => v.trim().length >= 10 || 'Your message should be at least 10 characters.',
  };

  function validateField(input) {
    const result = rules[input.name](input.value);
    const errorEl = document.getElementById(`${input.name}-error`);
    const isValid = result === true;
    errorEl.textContent = isValid ? '' : result;
    input.setAttribute('aria-invalid', String(!isValid));
    return isValid;
  }

  const fields = Object.keys(rules).map((name) => form.elements[name]);

  // Validate when leaving a field; clear the error as soon as the user fixes it
  fields.forEach((input) => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true') validateField(input);
    });
  });

  function setStatus(message, type) {
    status.className = `form-status ${type || ''}`;
    status.textContent = message;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setStatus('', '');

    const invalid = fields.filter((input) => !validateField(input));
    if (invalid.length) {
      invalid[0].focus();
      return;
    }

    // Honeypot: real people never fill this hidden field
    if (form.elements._gotcha.value) return;

    submitButton.disabled = true;
    setStatus('Sending…', '');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        form.reset();
        fields.forEach((input) => input.removeAttribute('aria-invalid'));
        setStatus("Thanks! Your message has been sent. I'll get back to you soon.", 'is-success');
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      status.className = 'form-status is-error';
      status.innerHTML = 'Sorry, something went wrong. Please try again or email me at ' +
        '<a href="mailto:aayushpandey606@gmail.com">aayushpandey606@gmail.com</a>.';
    } finally {
      submitButton.disabled = false;
    }
  });
}
