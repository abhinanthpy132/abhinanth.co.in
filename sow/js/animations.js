/**
 * SOW — Spare On Wheel | Animation & Interaction Engine
 */

export function initAnimations() {
  // 1. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  // 2. Health Gauge & Telemetry Counter Animation
  const healthSection = document.getElementById('health');
  let animatedGauge = false;

  if (healthSection) {
    const gaugeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animatedGauge) {
          animatedGauge = true;
          animateHealthScore();
        }
      });
    }, { threshold: 0.25 });

    gaugeObserver.observe(healthSection);
  }

  function animateHealthScore() {
    const scoreElement = document.querySelector('.gauge-score-number');
    const gaugeCircle = document.querySelector('.gauge-circle');
    const targetScore = 94;

    // SVG circle circumference for r=85 is 2 * PI * 85 = ~534.07
    const circumference = 2 * Math.PI * 85;
    if (gaugeCircle) {
      gaugeCircle.style.strokeDasharray = `${circumference} ${circumference}`;
      gaugeCircle.style.strokeDashoffset = circumference;
      // Target offset: remaining fraction
      const offset = circumference - (targetScore / 100) * circumference;
      setTimeout(() => {
        gaugeCircle.style.strokeDashoffset = offset;
      }, 100);
    }

    if (scoreElement) {
      let current = 0;
      const duration = 1600;
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const increment = targetScore / totalSteps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetScore) {
          scoreElement.textContent = targetScore;
          clearInterval(timer);
        } else {
          scoreElement.textContent = Math.floor(current);
        }
      }, stepTime);
    }
  }

  // 3. Marketplace Standard vs Quick 45-Min Tabs Switcher
  const mpTabBtns = document.querySelectorAll('.mp-tab-btn');
  const mpTabPanes = document.querySelectorAll('.mp-tab-pane');

  mpTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      mpTabBtns.forEach((b) => b.classList.remove('is-active'));
      mpTabPanes.forEach((p) => p.classList.remove('is-active'));

      btn.classList.add('is-active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('is-active');
      }
    });
  });

  // 4. Subtle 3D Mouse Parallax on Desktop Phone Frames
  const desktopCards = document.querySelectorAll('.hover-tilt');
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    desktopCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }
}
