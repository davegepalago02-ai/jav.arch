/**
 * JAV ARCHITECTURE — main.js
 * ============================================================
 * Sections:
 *   1. Hero Background — Ken Burns load effect
 *   2. Navbar — scroll-triggered glassmorphism toggle
 *   3. Scroll Reveal — IntersectionObserver for .reveal elements
 *   4. Mobile Menu — open / close overlay
 *   5. Contact Form — simulated async submission
 * ============================================================
 */


/* ─────────────────────────────────────────
   1. HERO BACKGROUND — Ken Burns load effect
   Adds the `.loaded` class on window load to
   trigger the CSS scale-down transition on #hero-bg
───────────────────────────────────────── */
function initHeroBg() {
  window.addEventListener('load', () => {
    const heroBg = document.getElementById('hero-bg');
    if (heroBg) heroBg.classList.add('loaded');
  });
}


/* ─────────────────────────────────────────
   2. NAVBAR — Scroll-triggered class toggle
   Adds `.scrolled` to #navbar after 60px scroll,
   which triggers the stronger glassmorphism style in CSS.
───────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}


/* ─────────────────────────────────────────
   3. SCROLL REVEAL — IntersectionObserver
   Watches all .reveal elements and adds .visible
   when they enter the viewport, triggering the
   slide-in CSS transition defined in style.css.
───────────────────────────────────────── */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once visible, no need to keep observing
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealEls.forEach(el => observer.observe(el));
}


/* ─────────────────────────────────────────
   4. MOBILE MENU — Full-screen overlay toggle
   Hamburger opens #mobile-menu overlay,
   close button and any nav link closes it.
───────────────────────────────────────── */
function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn   = document.getElementById('close-menu');

  if (!hamburger || !mobileMenu || !closeBtn) return;

  const openMenu  = () => mobileMenu.classList.add('open');
  const closeMenu = () => mobileMenu.classList.remove('open');

  hamburger.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  // Close when any nav link inside the menu is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}


/* ─────────────────────────────────────────
   5. CONTACT FORM — Simulated async submit
   Prevents default submit, shows a loading state
   on the button, then reveals a success message.
   Replace the setTimeout block with a real fetch()
   call to your backend endpoint when ready.
───────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn    = form.querySelector('button[type="submit"]');
    const successMsg   = document.getElementById('form-success');

    // --- Loading state ---
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled    = true;

    // --- TODO: Replace this with a real API call ---
    // Example:
    // fetch('/api/contact', { method: 'POST', body: new FormData(form) })
    //   .then(res => res.json())
    //   .then(data => showSuccess())
    //   .catch(err => showError(err));

    setTimeout(() => {
      // Show success feedback
      if (successMsg) successMsg.classList.remove('hidden');
      form.reset();

      // Reset button
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled    = false;

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        if (successMsg) successMsg.classList.add('hidden');
      }, 5000);
    }, 1200);
  });
}


/* ─────────────────────────────────────────
   INIT — Run all modules on DOM ready
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initHeroBg();
  initNavbar();
  initScrollReveal();
  initMobileMenu();
  initContactForm();
});
