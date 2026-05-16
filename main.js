// Scroll-to-top visibility
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollBtn.classList.toggle('show', window.scrollY > 400);
});

// Intersection Observer for fade-up animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => {
  // Don't re-observe already visible ones (hero elements)
  if (!el.classList.contains('visible')) {
    observer.observe(el);
  }
});

// Smooth active nav highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 80) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// =============================================
// FORMSPREE — gestion asynchrone du formulaire
// =============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = document.getElementById('submitBtn');
    const successMsg = document.getElementById('formSuccess');
    const errorMsg = document.getElementById('formError');

    // État chargement
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span> Envoi en cours…';
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        successMsg.style.display = 'block';
        contactForm.reset();
      } else {
        errorMsg.style.display = 'block';
      }
    } catch (err) {
      errorMsg.style.display = 'block';
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="bi bi-send me-2"></i> Envoyer le message';
    }
  });
}

// =============================================
// FAQ — icône +/× sur les accordéons
// =============================================
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', function () {
    const icon = this.querySelector('.faq-icon');
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    // Le collapse Bootstrap met à jour aria-expanded après l'événement,
    // donc on lit l'état inverse
    if (!isExpanded) {
      icon.classList.remove('bi-plus-circle');
      icon.classList.add('bi-dash-circle');
    } else {
      icon.classList.remove('bi-dash-circle');
      icon.classList.add('bi-plus-circle');
    }
  });
});
