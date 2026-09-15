/**
 * SOW — Spare On Wheel | Main Application Bootstrapper
 */

import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initGallery } from './gallery.js';
import { initContactForm } from './contact.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all core functional layers
  initNavigation();
  initAnimations();
  initGallery();
  initContactForm();

  // Dynamic Current Year in Footer
  const yearElem = document.getElementById('current-year');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }

  // Smooth fallback for image load errors
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    img.addEventListener('error', () => {
      img.style.opacity = '0.5';
      console.warn(`[SOW Assets] Unable to load image: ${img.src}`);
    });
  });

  console.log('SOW — Spare On Wheel website initialized.');
});
