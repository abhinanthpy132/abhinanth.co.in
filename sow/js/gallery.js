/**
 * SOW — Spare On Wheel | Interactive Screenshot Showcase Gallery
 */

export function initGallery() {
  const showcaseData = [
    {
      id: 'home',
      title: 'Command Center',
      subtitle: 'Home Dashboard',
      description: 'Unified view of vehicle status, quick actions, real-time health indicator, and ecosystem shortcuts.',
      image: 'assets/screenshots/home.png'
    },
    {
      id: 'garage',
      title: 'Multi-Vehicle Fleet',
      subtitle: 'Garage Management',
      description: 'Seamlessly switch between your cars and motorcycles with custom vehicle profiles and maintenance logs.',
      image: 'assets/screenshots/garage.png'
    },
    {
      id: 'dvp',
      title: 'Digital Vehicle Passport',
      subtitle: 'Cryptographic Provenance',
      description: 'Immutable timeline tracking registration, ownership transfers, genuine service entries, and verified trust score.',
      image: 'assets/screenshots/dvp.png'
    },
    {
      id: 'sow-ai',
      title: 'Automotive Intelligence',
      subtitle: 'SOW AI Assistant',
      description: 'Multi-modal diagnostic insights through photos, sound analysis, symptoms, and instant maintenance guidance.',
      image: 'assets/screenshots/sow-ai.png'
    },
    {
      id: 'vehicle-health',
      title: 'Predictive Telemetry',
      subtitle: 'Vehicle Health Engine',
      description: 'Continuous assessment across engine health, electrical systems, brake wear, tyres, and fluid degradation.',
      image: 'assets/screenshots/vehicle-health.png'
    },
    {
      id: 'sos',
      title: 'Emergency Responders',
      subtitle: 'Instant Roadside SOS',
      description: 'On-demand towing, battery jumpstarts, flat tyre repair, and live GPS responder tracking with Service PIN.',
      image: 'assets/screenshots/sos.png'
    },
    {
      id: 'marketplace',
      title: 'Guaranteed Fitment',
      subtitle: 'Automotive Marketplace',
      description: 'Vehicle-aware catalog of OEM and aftermarket parts, direct workshop installation, and warranty records.',
      image: 'assets/screenshots/marketplace.png'
    },
    {
      id: 'quick-marketplace',
      title: 'Hyper-Local Fulfillment',
      subtitle: '⚡ Quick 45-Minute Parts',
      description: 'Rapid doorstep and workshop delivery for emergency consumables, batteries, brake pads, and fluids.',
      image: 'assets/screenshots/quick-marketplace.png'
    },
    {
      id: 'community',
      title: 'Owner Community',
      subtitle: 'Social & Group Rides',
      description: 'Connect with verified owners, plan curated weekend road trips, and share genuine ownership reviews.',
      image: 'assets/screenshots/community.png'
    },
    {
      id: 'documents',
      title: 'Encrypted Document Vault',
      subtitle: 'Compliance & Invoices',
      description: 'Secure, cloud-synced storage for RC documents, PUC certificates, insurance policies, and service bills.',
      image: 'assets/screenshots/documents.png'
    }
  ];

  const pillsContainer = document.querySelector('.gallery-nav-pills');
  const mainImage = document.querySelector('.showcase-device-img');
  const titleElem = document.querySelector('.showcase-info-title');
  const subtitleElem = document.querySelector('.showcase-info-subtitle');
  const descElem = document.querySelector('.showcase-info-desc');

  if (!pillsContainer || !mainImage) return;

  let currentIndex = 0;

  function renderShowcase(index) {
    currentIndex = index;
    const item = showcaseData[index];

    // Update pills active state
    const allPills = pillsContainer.querySelectorAll('.gallery-pill');
    allPills.forEach((p, i) => {
      p.classList.toggle('is-active', i === index);
    });

    // Fade transition on image
    mainImage.style.opacity = '0.3';
    mainImage.style.transform = 'scale(0.97)';
    setTimeout(() => {
      mainImage.src = item.image;
      mainImage.alt = `SOW Customer App — ${item.subtitle}`;
      mainImage.style.opacity = '1';
      mainImage.style.transform = 'scale(1)';
    }, 150);

    if (titleElem) titleElem.textContent = item.title;
    if (subtitleElem) subtitleElem.textContent = item.subtitle;
    if (descElem) descElem.textContent = item.description;
  }

  // Generate Pills
  pillsContainer.innerHTML = '';
  showcaseData.forEach((item, idx) => {
    const pill = document.createElement('button');
    pill.className = `gallery-pill ${idx === 0 ? 'is-active' : ''}`;
    pill.textContent = item.subtitle;
    pill.setAttribute('type', 'button');
    pill.setAttribute('aria-label', `View ${item.subtitle} screenshot`);
    pill.addEventListener('click', () => renderShowcase(idx));
    pillsContainer.appendChild(pill);
  });

  // Initial render
  renderShowcase(0);

  // Mobile Touch Swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  const stage = document.querySelector('.showcase-stage-wrapper');

  if (stage) {
    stage.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    stage.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const threshold = 40;
    if (touchEndX < touchStartX - threshold) {
      // Next
      const nextIndex = (currentIndex + 1) % showcaseData.length;
      renderShowcase(nextIndex);
    } else if (touchEndX > touchStartX + threshold) {
      // Prev
      const prevIndex = (currentIndex - 1 + showcaseData.length) % showcaseData.length;
      renderShowcase(prevIndex);
    }
  }
}
