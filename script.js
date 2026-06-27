document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------
  // 1. Custom Cursor
  // -------------------------------------------------------------
  const cursor = document.querySelector('.custom-cursor');
  
  if (cursor && !window.matchMedia('(pointer: coarse)').matches && !('ontouchstart' in window)) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let rafId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      const lerp = 0.15;
      cursorX += (mouseX - cursorX) * lerp;
      cursorY += (mouseY - cursorY) * lerp;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(animate);

    const setupHoverListeners = () => {
      const hoverElements = document.querySelectorAll('a, button, .service-card, .project-card, .blog-card, .testimonial-card, input, textarea, .social-btn');
      const onEnter = () => cursor.classList.add('hovering');
      const onLeave = () => cursor.classList.remove('hovering');

      hoverElements.forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    setupHoverListeners();

    // Re-run listener setup if elements resize/reload
    window.addEventListener('resize', setupHoverListeners);
  }

  // -------------------------------------------------------------
  // 2. Navbar Scroll Style Change
  // -------------------------------------------------------------
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll(); // initial check
  }

  // -------------------------------------------------------------
  // 3. Scroll Reveal Animations (Intersection Observer)
  // -------------------------------------------------------------
  const observerOptions = { threshold: 0.15 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const selectors = [
    '.service-card',
    '.project-card',
    '.testimonial-card',
    '.blog-card',
    '.footer-heading',
    '.footer-col',
  ];

  selectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.style.transitionDelay = (i * 0.1) + 's';
      observer.observe(el);
    });
  });

  // -------------------------------------------------------------
  // 4. Mobile Menu Toggle
  // -------------------------------------------------------------
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-close');

  const openMenu = () => {
    if (mobileMenu) {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeMenu = () => {
    if (mobileMenu) {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);

  // -------------------------------------------------------------
  // 5. Smooth Scroll Navigation
  // -------------------------------------------------------------
  const handleNavClick = (e) => {
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      closeMenu();
    }
  };

  const navLinks = document.querySelectorAll('.nav-links a, .mobile-link, .footer-links a, .view-all, .pill-btn[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener('click', handleNavClick);
  });

  // -------------------------------------------------------------
  // 6. Contact Form Submission
  // -------------------------------------------------------------
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;

      const originalText = btn.textContent;
      btn.textContent = 'Sent! ✓';
      btn.style.background = '#00f0ff';
      btn.style.color = '#08090c';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
        form.reset();
      }, 2000);
    });
  }

  // -------------------------------------------------------------
  // 7. Page Loader Fade-Out
  // -------------------------------------------------------------
  const loader = document.getElementById('page-loader');
  if (loader) {
    const fadeOutLoader = () => {
      loader.classList.add('fade-out');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 400); // matching CSS transition
    };

    if (document.readyState === 'complete') {
      fadeOutLoader();
    } else {
      window.addEventListener('load', fadeOutLoader);
    }

    // Fallback: hide after 3 seconds anyway
    setTimeout(() => {
      if (!loader.classList.contains('fade-out')) {
        fadeOutLoader();
      }
    }, 3000);
  }
});
