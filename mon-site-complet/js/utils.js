/**
 * UTILS.JS — C-SERVICE BUSINESS ULTRA STUDIO
 * Fonctions utilitaires partagées
 */

'use strict';

/* ============ DOM Helpers ============ */

/**
 * Sélectionne un élément du DOM
 * @param {string} selector - Sélecteur CSS
 * @param {Element} [parent=document] - Élément parent
 * @returns {Element|null}
 */
const $ = (selector, parent = document) => parent.querySelector(selector);

/**
 * Sélectionne tous les éléments correspondants
 * @param {string} selector
 * @param {Element} [parent=document]
 * @returns {NodeList}
 */
const $$ = (selector, parent = document) => parent.querySelectorAll(selector);

/**
 * Crée un élément HTML avec attributs et contenu
 * @param {string} tag - Tag HTML
 * @param {Object} attrs - Attributs
 * @param {string} [innerHTML] - Contenu HTML
 * @returns {Element}
 */
const createElement = (tag, attrs = {}, innerHTML = '') => {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([key, val]) => {
    if (key === 'class') el.className = val;
    else if (key === 'style' && typeof val === 'object') {
      Object.assign(el.style, val);
    } else {
      el.setAttribute(key, val);
    }
  });
  if (innerHTML) el.innerHTML = innerHTML;
  return el;
};

/* ============ Animation Helpers ============ */

/**
 * Observe les éléments .reveal avec IntersectionObserver
 */
const initRevealAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  $$('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    observer.observe(el);
  });
};

/**
 * Anime un compteur numérique
 * @param {Element} el - Élément cible
 * @param {number} target - Valeur cible
 * @param {number} [duration=2000] - Durée en ms
 * @param {string} [suffix=''] - Suffixe (ex: '+', '%')
 */
const animateCounter = (el, target, duration = 2000, suffix = '') => {
  const start = performance.now();
  const startVal = 0;

  const update = (time) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.floor(eased * (target - startVal) + startVal);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
};

/**
 * Initialise les compteurs animés avec IntersectionObserver
 */
const initCounters = () => {
  const counters = $$('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, 2000, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
};

/* ============ Typewriter Effect ============ */

/**
 * Effet machine à écrire
 * @param {Element} el - Élément cible
 * @param {string} text - Texte à afficher
 * @param {number} [speed=50] - Vitesse en ms par caractère
 * @param {Function} [onComplete] - Callback à la fin
 */
const typewriter = (el, text, speed = 50, onComplete = null) => {
  el.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
    } else {
      clearInterval(interval);
      if (onComplete) onComplete();
    }
  }, speed);
  return interval;
};

/* ============ Smooth Scroll ============ */

/**
 * Défilement fluide vers un élément
 * @param {string} target - Sélecteur ou ID (#section)
 * @param {number} [offset=80] - Décalage en pixels
 */
const smoothScrollTo = (target, offset = 80) => {
  const el = typeof target === 'string' ? $(target) : target;
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: 'smooth' });
};

/* ============ Local Storage Helpers ============ */

const storage = {
  get: (key, defaultVal = null) => {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : defaultVal;
    } catch { return defaultVal; }
  },
  set: (key, val) => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  },
  remove: (key) => {
    try { localStorage.removeItem(key); } catch {}
  }
};

/* ============ Toast Notifications ============ */

let toastContainer = null;

/**
 * Affiche une notification toast
 * @param {string} message - Message
 * @param {'success'|'error'|'info'|'warning'} [type='success']
 * @param {number} [duration=3500] - Durée en ms
 */
const showToast = (message, type = 'success', duration = 3500) => {
  if (!toastContainer) {
    toastContainer = createElement('div', {
      id: 'toast-container',
      style: {
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '9999',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        alignItems: 'center',
        pointerEvents: 'none'
      }
    });
    document.body.appendChild(toastContainer);
  }

  const colors = {
    success: { bg: 'rgba(0,212,255,0.15)', border: '#00d4ff', icon: '✓' },
    error: { bg: 'rgba(239,68,68,0.15)', border: '#ef4444', icon: '✕' },
    warning: { bg: 'rgba(234,179,8,0.15)', border: '#eab308', icon: '!' },
    info: { bg: 'rgba(99,102,241,0.15)', border: '#6366f1', icon: 'i' }
  };

  const c = colors[type] || colors.success;

  const toast = createElement('div', {
    style: {
      background: c.bg,
      border: `1px solid ${c.border}`,
      backdropFilter: 'blur(10px)',
      color: '#fff',
      padding: '0.75rem 1.5rem',
      borderRadius: '50px',
      fontSize: '0.9rem',
      fontFamily: 'Poppins, sans-serif',
      boxShadow: `0 0 20px ${c.border}40`,
      opacity: '0',
      transform: 'translateY(20px)',
      transition: 'all 0.3s ease',
      pointerEvents: 'all',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }
  }, `<span style="font-weight:700;color:${c.border}">${c.icon}</span> ${message}`);

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
};

/* ============ Debounce & Throttle ============ */

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const throttle = (fn, limit) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
};

/* ============ Format Helpers ============ */

const formatDate = (date = new Date()) => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric'
  }).format(new Date(date));
};

const generateId = () => Math.random().toString(36).substr(2, 9);

/* ============ Scroll Progress ============ */

const initScrollProgress = () => {
  const bar = createElement('div', {
    id: 'scroll-progress',
    style: {
      position: 'fixed',
      top: '0',
      left: '0',
      height: '3px',
      width: '0%',
      background: 'linear-gradient(90deg, #00d4ff, #0062ff, #7c3aed)',
      zIndex: '9999',
      transition: 'width 0.1s ease',
      boxShadow: '0 0 10px #00d4ff'
    }
  });
  document.body.prepend(bar);

  window.addEventListener('scroll', throttle(() => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = `${scrolled}%`;
  }, 16));
};

/* ============ Custom Cursor ============ */

const initCustomCursor = () => {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = createElement('div', {
    id: 'custom-cursor',
    style: {
      position: 'fixed',
      width: '10px',
      height: '10px',
      background: '#00d4ff',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: '99999',
      transform: 'translate(-50%, -50%)',
      transition: 'transform 0.1s ease',
      boxShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff60'
    }
  });

  const trail = createElement('div', {
    id: 'cursor-trail',
    style: {
      position: 'fixed',
      width: '30px',
      height: '30px',
      border: '1px solid rgba(0,212,255,0.5)',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: '99998',
      transform: 'translate(-50%, -50%)',
      transition: 'all 0.15s ease',
      boxShadow: '0 0 10px rgba(0,212,255,0.2)'
    }
  });

  document.body.appendChild(cursor);
  document.body.appendChild(trail);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    trail.style.left = `${e.clientX}px`;
    trail.style.top = `${e.clientY}px`;
  });

  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
    trail.style.transform = 'translate(-50%, -50%) scale(1.5)';
  });

  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    trail.style.transform = 'translate(-50%, -50%) scale(1)';
  });
};

/* ============ Back To Top ============ */

const initBackToTop = () => {
  const btn = createElement('button', {
    id: 'back-to-top',
    'aria-label': 'Retour en haut',
    style: {
      position: 'fixed',
      bottom: '2rem',
      right: '5rem',
      width: '45px',
      height: '45px',
      background: 'rgba(0,212,255,0.15)',
      border: '1px solid rgba(0,212,255,0.4)',
      borderRadius: '50%',
      color: '#00d4ff',
      fontSize: '1.2rem',
      cursor: 'pointer',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      opacity: '0',
      pointerEvents: 'none',
      zIndex: '100',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, '↑');

  document.body.appendChild(btn);

  window.addEventListener('scroll', throttle(() => {
    if (window.scrollY > 400) {
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'all';
    } else {
      btn.style.opacity = '0';
      btn.style.pointerEvents = 'none';
    }
  }, 200));

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
};

/* ============ Export (module support) ============ */

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    $, $$, createElement, initRevealAnimations, initCounters,
    typewriter, smoothScrollTo, storage, showToast,
    debounce, throttle, formatDate, generateId,
    initScrollProgress, initCustomCursor, initBackToTop, animateCounter
  };
}
