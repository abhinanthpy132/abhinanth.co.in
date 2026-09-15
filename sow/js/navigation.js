/**
 * SOW — Spare On Wheel | Navigation & Header Controller
 */

export function initNavigation() {
  const header = document.querySelector('.sow-header');
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  // 1. Sticky Header Scroll Effect
  function handleScroll() {
    if (window.scrollY > 24) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Drawer Open/Close
  function toggleMobileMenu(forceClose = false) {
    const isOpen = forceClose ? false : !mobileDrawer?.classList.contains('is-open');
    if (isOpen) {
      mobileDrawer?.classList.add('is-open');
      hamburgerBtn?.classList.add('is-active');
      hamburgerBtn?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      mobileDrawer?.classList.remove('is-open');
      hamburgerBtn?.classList.remove('is-active');
      hamburgerBtn?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  hamburgerBtn?.addEventListener('click', () => toggleMobileMenu());

  // Close drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('is-open')) {
      toggleMobileMenu(true);
    }
  });

  // 3. Smooth Anchor Scrolling with Header Offset
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          toggleMobileMenu(true);
          const headerHeight = header ? header.offsetHeight : 70;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight + 2;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 4. ScrollSpy for Active Section Highlighting
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0
  };

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (href === `#${currentId}`) {
            link.classList.add('is-active');
          } else if (href && href.startsWith('#')) {
            link.classList.remove('is-active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => spyObserver.observe(sec));
}
