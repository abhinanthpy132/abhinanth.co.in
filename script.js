document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------
  // 1. Page Transition Screen Fade-In
  // -------------------------------------------------------------
  const transitionOverlay = document.createElement('div');
  transitionOverlay.id = 'page-transition-overlay';
  Object.assign(transitionOverlay.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#08090c',
    zIndex: '999998',
    opacity: '1',
    pointerEvents: 'none'
  });
  document.body.appendChild(transitionOverlay);

  // Fade out transition overlay on page ready
  setTimeout(() => {
    transitionOverlay.style.transition = 'opacity 0.5s ease-in-out';
    transitionOverlay.style.opacity = '0';
    setTimeout(() => {
      transitionOverlay.remove();
    }, 500);
  }, 100);

  // -------------------------------------------------------------
  // 2. Mobile Menu Toggle (Pure JS - Keep Existing)
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
  // 3. Smooth Scroll Navigation (Pure JS - Keep Existing)
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
  // 4. Contact Form Submission (Pure JS - Keep Existing)
  // -------------------------------------------------------------
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;

      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      const formData = new FormData(form);
      const endpoint = form.getAttribute('data-endpoint') || 'https://formspree.io/f/mdargrqq';

      fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          btn.textContent = 'Sent! ✓';
          btn.style.background = '#00f0ff';
          btn.style.color = '#08090c';
          form.reset();
        } else {
          btn.textContent = 'Error! ✗';
          btn.style.background = '#ff007f';
          btn.style.color = '#ffffff';
        }
      })
      .catch(error => {
        console.error("Form submission error:", error);
        btn.textContent = 'Error! ✗';
        btn.style.background = '#ff007f';
        btn.style.color = '#ffffff';
      })
      .finally(() => {
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
          btn.disabled = false;
        }, 3000);
      });
    });
  }

  // -------------------------------------------------------------
  // 5. Navbar Scroll Style Change (Pure JS - Keep Existing)
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
  // 6. Dynamic GSAP Loader and Animation Pipeline
  // -------------------------------------------------------------
  const loadGSAP = () => {
    return new Promise((resolve) => {
      if (window.gsap && window.ScrollTrigger) {
        resolve();
        return;
      }
      const loadScript = (src) => {
        return new Promise((res, rej) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = res;
          script.onerror = rej;
          document.head.appendChild(script);
        });
      };
      const GSAP_CDN = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
      const SCROLL_TRIGGER_CDN = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";

      loadScript(GSAP_CDN)
        .then(() => loadScript(SCROLL_TRIGGER_CDN))
        .then(() => resolve())
        .catch((err) => {
          console.error("GSAP CDNs failed to load.", err);
          resolve(); // Resolve to let fallback run smoothly
        });
    });
  };

  loadGSAP().then(() => {
    if (!window.gsap) {
      // Fallback: If GSAP fails to load, restore opacity of all elements immediately
      const style = document.createElement('style');
      style.textContent = `
        .hero-label-left, .hero-label-right, .hero-heading .word, .hero-bio .bio-col, .hero-portrait, .hero-cta .pill-btn,
        .nav-links a, .service-card, .project-card, .testimonial-card, .blog-card,
        .contact-grid h2, .contact-form input, .contact-form textarea, .contact-form button, .social-btn,
        .footer-heading, .footer-col, .footer-email {
          opacity: 1 !important;
        }
      `;
      document.head.appendChild(style);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Handle prefers-reduced-motion config
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.globalTimeline.timeScale(10);
    }

    // Context scoping
    gsap.context(() => {
      // -------------------------------------------------------------
      // 6.1 Performance and Layout overrides
      // -------------------------------------------------------------
      const style = document.createElement('style');
      style.textContent = `
        body.is-scrolling * {
          pointer-events: none !important;
        }
        .marquee-track.fast, .ticker-strip.fast {
          animation-duration: 12.5s !important;
        }
      `;
      document.head.appendChild(style);

      // -------------------------------------------------------------
      // 6.2 Scroll Progress Bar
      // -------------------------------------------------------------
      const progressBar = document.createElement('div');
      progressBar.id = 'scroll-progress';
      Object.assign(progressBar.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        height: '3px',
        backgroundColor: '#c5ff1a',
        width: '0%',
        zIndex: '99999',
        transformOrigin: 'left',
        pointerEvents: 'none'
      });
      document.body.appendChild(progressBar);

      window.addEventListener('scroll', () => {
        const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        gsap.to('#scroll-progress', { width: (progress * 100) + '%', duration: 0.1, ease: "none" });
      });

      // -------------------------------------------------------------
      // 6.3 Smooth Scroll Inertia (body scrolls disable hover)
      // -------------------------------------------------------------
      let scrollDebounceTimeout;
      window.addEventListener('wheel', () => {
        document.body.classList.add('is-scrolling');
        clearTimeout(scrollDebounceTimeout);
        scrollDebounceTimeout = setTimeout(() => {
          document.body.classList.remove('is-scrolling');
        }, 150);
      });

      // -------------------------------------------------------------
      // 6.4 Marquee Speed Modulation
      // -------------------------------------------------------------
      let marqueeTimeout;
      let lastScrollY = window.scrollY;

      window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const marquee = document.querySelector('.marquee-track, .ticker-strip');

        if (marquee) {
          if (currentScrollY > lastScrollY) {
            marquee.classList.add('fast');
          }
          clearTimeout(marqueeTimeout);
          marqueeTimeout = setTimeout(() => {
            marquee.classList.remove('fast');
          }, 150);
        }
        lastScrollY = currentScrollY;
      });

      if (document.querySelector('.marquee-track, .ticker-strip')) {
        gsap.fromTo('.marquee-track, .ticker-strip',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: '.marquee-track, .ticker-strip',
              start: 'top 95%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // -------------------------------------------------------------
      // 6.5 Navbar Entrance
      // -------------------------------------------------------------
      if (document.querySelector('.navbar')) {
        gsap.set('.navbar', { clipPath: "inset(0 0 100% 0)" });
        gsap.to('.navbar', {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.7,
          delay: 0.2,
          ease: "power3.out"
        });
        gsap.fromTo('.nav-links a', 
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.5, stagger: 0.06, ease: "power3.out" }
        );
      }

      // -------------------------------------------------------------
      // 6.6 Hero Timeline & Page Entrance
      // -------------------------------------------------------------

      const runHeroEntrance = () => {
        const heroTl = gsap.timeline();

        // Step 1: Labels
        if (document.querySelector('.hero-label-left, .hero-label-right')) {
          heroTl.fromTo('.hero-label-left, .hero-label-right', 
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.1 },
            0
          );
        }

        // Step 2: Heading words
        if (document.querySelector('.hero-heading .word')) {
          heroTl.fromTo('.hero-heading .word',
            { opacity: 0, y: 60, skewY: 4 },
            { opacity: 1, y: 0, skewY: 0, duration: 0.8, ease: "power4.out", stagger: 0.12 },
            0.15
          );
        }

        // Step 3: Bio columns
        if (document.querySelector('.hero-bio .bio-col')) {
          heroTl.fromTo('.hero-bio .bio-col',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.15 },
            0.5
          );
        }

        // Step 4: Portrait
        if (document.querySelector('.hero-portrait')) {
          heroTl.fromTo('.hero-portrait',
            { opacity: 0, scale: 0.92, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: "power3.out" },
            0.7
          );
        }

        // Step 5: Pill CTA Button
        if (document.querySelector('.hero-cta .pill-btn')) {
          heroTl.fromTo('.hero-cta .pill-btn',
            { opacity: 0, y: 16, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.4)" },
            0.85
          );
        }

        // Step 6: Corner markers
        const cornerMarkers = Array.from(document.querySelectorAll('.hero > .absolute, #works-hero > .absolute')).filter(el => el.textContent.trim() === '+');
        if (cornerMarkers.length > 0) {
          heroTl.fromTo(cornerMarkers,
            { opacity: 0, scale: 0 },
            { opacity: 0.4, scale: 1, duration: 0.4, ease: "back.out(2)", stagger: 0.08 },
            0.6
          );
        }
      };

      // Trigger entrance immediately when page load is complete
      if (document.readyState === 'complete') {
        runHeroEntrance();
      } else {
        window.addEventListener('load', runHeroEntrance);
      }

      // -------------------------------------------------------------
      // 6.7 Service Cards Reveals & Hovers
      // -------------------------------------------------------------
      if (document.querySelectorAll('.service-card').length > 0) {
        gsap.fromTo('.service-card',
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.services-grid, .service-card',
              start: 'top 82%',
              toggleActions: 'play none none none'
            }
          }
        );

        document.querySelectorAll('.service-card').forEach(card => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -6, scale: 1.02, duration: 0.3, ease: "power2.out" });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: "power3.out" });
          });
        });
      }

      // -------------------------------------------------------------
      // 6.8 Project Cards Reveals & Hovers
      // -------------------------------------------------------------
      if (document.querySelectorAll('.project-card').length > 0) {
        gsap.fromTo('.project-card',
          { opacity: 0, y: 60, rotationX: 8, transformPerspective: 800 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: '.projects-grid, .project-card',
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );

        document.querySelectorAll('.project-card').forEach(card => {
          const overlay = card.querySelector('.project-overlay');
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -8, scale: 1.015, duration: 0.35, ease: "power2.out" });
            if (overlay) {
              gsap.to(overlay, { opacity: 0.95, duration: 0.3, ease: "power2.out" });
            }
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: "power3.out" });
            if (overlay) {
              gsap.to(overlay, { opacity: 0, duration: 0.3, ease: "power3.out" });
            }
          });
        });
      }

      // -------------------------------------------------------------
      // 6.9 Split-Text Section Titles
      // -------------------------------------------------------------
      document.querySelectorAll('h2.section-title').forEach(title => {
        title.innerHTML = title.textContent.trim().split(/\s+/).map(w => {
          return `<span style="display:inline-block;overflow:hidden"><span class="word-inner" style="display:inline-block">${w}</span></span>`;
        }).join(' ');

        const inners = title.querySelectorAll('.word-inner');
        gsap.fromTo(inners,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.7,
            ease: "power4.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // -------------------------------------------------------------
      // 6.10 Testimonial Cards Reveals
      // -------------------------------------------------------------
      if (document.querySelectorAll('.testimonial-card').length > 0) {
        gsap.fromTo('.testimonial-card',
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.testimonials-grid, .testimonial-card',
              start: 'top 82%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // -------------------------------------------------------------
      // 6.11 Blog Cards Reveals & Hovers
      // -------------------------------------------------------------
      if (document.querySelectorAll('.blog-card').length > 0) {
        gsap.fromTo('.blog-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.thoughts-grid, .blog-card',
              start: 'top 82%',
              toggleActions: 'play none none none'
            }
          }
        );

        document.querySelectorAll('.blog-card').forEach(card => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -5, duration: 0.3, ease: "power2.out" });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, duration: 0.35, ease: "power3.out" });
          });
        });
      }

      // -------------------------------------------------------------
      // 6.12 Contact Section Entrance
      // -------------------------------------------------------------
      const contactHeading = document.querySelector('.contact-grid h2');
      if (contactHeading) {
        gsap.fromTo(contactHeading,
          { opacity: 0, y: 50, skewY: 3 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 0.9,
            ease: "power4.out",
            scrollTrigger: {
              trigger: contactHeading,
              start: 'top 82%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      const formFields = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form button');
      if (formFields.length > 0) {
        gsap.fromTo(formFields,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: '.contact-form',
              start: 'top 78%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      if (document.querySelectorAll('.social-btn').length > 0) {
        gsap.fromTo('.social-btn',
          { opacity: 0, scale: 0.8, rotation: -10 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: "back.out(1.6)",
            stagger: 0.07,
            scrollTrigger: {
              trigger: '.contact-socials, .social-btn',
              start: 'top 78%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // -------------------------------------------------------------
      // 6.13 Footer Entrance
      // -------------------------------------------------------------
      if (document.querySelector('.footer-heading')) {
        gsap.fromTo('.footer-heading',
          { opacity: 0, y: 40, skewY: 2 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 0.8,
            ease: "power4.out",
            scrollTrigger: {
              trigger: '.footer-heading',
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      if (document.querySelectorAll('.footer-col').length > 0) {
        gsap.fromTo('.footer-col',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.footer-col',
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      const footerEmail = document.querySelector('.footer-email');
      if (footerEmail) {
        const origLetterSpacing = window.getComputedStyle(footerEmail).letterSpacing || 'normal';
        gsap.fromTo(footerEmail,
          { opacity: 0, letterSpacing: '0.3em' },
          {
            opacity: 1,
            letterSpacing: origLetterSpacing,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerEmail,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // -------------------------------------------------------------
      // 6.14 Physics Cursor Upgrade
      // -------------------------------------------------------------
      const cursor = document.querySelector('.custom-cursor');
      if (cursor && !window.matchMedia('(pointer: coarse)').matches && !('ontouchstart' in window)) {
        // Disable default cursor CSS transform transition to avoid double lag
        cursor.style.transition = 'width 0.15s ease, height 0.15s ease';

        const xTo = gsap.quickTo(cursor, "left", { duration: 0.35, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "top", { duration: 0.35, ease: "power3" });

        document.addEventListener('mousemove', e => {
          xTo(e.clientX);
          yTo(e.clientY);
        });

        // Hover scale upgrade
        const hoverElements = document.querySelectorAll('a, button, .service-card, .project-card, .blog-card, .testimonial-card, input, textarea, .social-btn');
        hoverElements.forEach(el => {
          el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 2.5, duration: 0.3, ease: "power2.out" });
          });
          el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.4, ease: "power3.out" });
          });
        });

        // Click actions
        document.addEventListener('mousedown', () => {
          gsap.to(cursor, { scale: 0.7, duration: 0.1 });
        });
        document.addEventListener('mouseup', () => {
          const isHovering = document.querySelector(':hover');
          const targetScale = (isHovering && isHovering.closest('a, button, .service-card, .project-card, .blog-card, .testimonial-card, input, textarea, .social-btn')) ? 2.5 : 1;
          gsap.to(cursor, { scale: targetScale, duration: 0.3, ease: "back.out(2)" });
        });
      }

      // -------------------------------------------------------------
      // 6.15 Magnetic Hover Buttons
      // -------------------------------------------------------------
      document.querySelectorAll('.pill-btn, button[type="submit"], .social-btn').forEach(btn => {
        btn.addEventListener('mousemove', e => {
          const rect = btn.getBoundingClientRect();
          const btnCenterX = rect.left + rect.width / 2;
          const btnCenterY = rect.top + rect.height / 2;
          const mouseX = e.clientX;
          const mouseY = e.clientY;

          gsap.to(btn, {
            x: (mouseX - btnCenterX) * 0.35,
            y: (mouseY - btnCenterY) * 0.35,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)"
          });
        });
      });

      // -------------------------------------------------------------
      // 6.16 Stat / Numeric Counters
      // -------------------------------------------------------------
      const statsElements = [];
      const walkDOM = (node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.children.length === 0) {
            const text = node.textContent.trim();
            const match = text.match(/(\d+)([\+%])/);
            if (match) {
              statsElements.push({
                element: node,
                text: text
              });
            }
          } else {
            Array.from(node.children).forEach(walkDOM);
          }
        }
      };
      walkDOM(document.body);

      statsElements.forEach(({ element, text }) => {
        const match = text.match(/(\d+)([\+%])/);
        if (!match) return;

        const fullMatch = match[0];
        const startVal = 0;
        const endVal = parseInt(match[1], 10);
        const suffix = match[2];
        
        const originalText = text;
        element.textContent = originalText.replace(fullMatch, `0${suffix}`);

        const counterObj = { val: startVal };
        gsap.to(counterObj, {
          val: endVal,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          onUpdate: () => {
            const currentVal = Math.round(counterObj.val);
            element.textContent = originalText.replace(fullMatch, `${currentVal}${suffix}`);
          }
        });
      });

      // -------------------------------------------------------------
      // 6.17 Scroll Parallax Elements
      // -------------------------------------------------------------
      if (document.querySelector('.hero-portrait')) {
        gsap.to(".hero-portrait", {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.5
          }
        });
      }

      if (document.querySelector('.grain-overlay')) {
        gsap.to(".grain-overlay", {
          y: 20,
          ease: "none",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 2
          }
        });
      }

      document.querySelectorAll('.section-title').forEach(title => {
        gsap.to(title, {
          y: -15,
          ease: "none",
          scrollTrigger: {
            trigger: title,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      });

      // -------------------------------------------------------------
      // 6.18 Screen-Wipe Subpage Transitions
      // -------------------------------------------------------------
      const isInternalLink = (el) => {
        if (!el.href) return false;
        const url = new URL(el.href, window.location.href);
        return url.origin === window.location.origin && 
               !url.hash && 
               !el.getAttribute('target');
      };

      document.querySelectorAll('a').forEach(link => {
        if (isInternalLink(link)) {
          link.addEventListener('click', e => {
            e.preventDefault();
            const href = link.getAttribute('href');

            const wipe = document.createElement('div');
            Object.assign(wipe.style, {
              position: 'fixed',
              top: '0',
              left: '0',
              width: '100vw',
              height: '100vh',
              backgroundColor: '#08090c',
              zIndex: '999998',
              opacity: '0',
              pointerEvents: 'none'
            });
            document.body.appendChild(wipe);

            gsap.to(wipe, {
              opacity: 1,
              duration: 0.4,
              ease: "power2.inOut",
              onComplete: () => {
                window.location.href = href;
              }
            });
          });
        }
      });

      // Refresh ScrollTrigger at end
      ScrollTrigger.refresh();
    });
  });
});
