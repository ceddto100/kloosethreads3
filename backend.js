/**
 * KlooseThreads - Modern 2025 Interactive Experience
 * Features: Custom Cursor, Smooth Animations, Micro-interactions,
 * Advanced Scroll Effects, Glassmorphism Interactions
 */

// ========================================
// CUSTOM CURSOR - 2025 TREND
// ========================================
class CustomCursor {
  constructor() {
    this.cursor = document.getElementById('custom-cursor');
    this.trailer = document.getElementById('cursor-trailer');

    if (!this.cursor || !this.trailer) return;

    this.cursorX = 0;
    this.cursorY = 0;
    this.trailerX = 0;
    this.trailerY = 0;

    this.init();
  }

  init() {
    // Check for touch devices
    if ('ontouchstart' in window) {
      this.cursor.style.display = 'none';
      this.trailer.style.display = 'none';
      return;
    }

    document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    document.addEventListener('mouseenter', () => this.show());
    document.addEventListener('mouseleave', () => this.hide());

    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .gallery-img-wrap, .service-card, .btn-primary, .btn-secondary, .btn-outline, .btn-light');

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => this.expand());
      el.addEventListener('mouseleave', () => this.shrink());
    });

    this.animate();
  }

  onMouseMove(e) {
    this.cursorX = e.clientX;
    this.cursorY = e.clientY;
  }

  animate() {
    // Smooth follow for trailer
    this.trailerX += (this.cursorX - this.trailerX) * 0.15;
    this.trailerY += (this.cursorY - this.trailerY) * 0.15;

    if (this.cursor) {
      this.cursor.style.left = `${this.cursorX}px`;
      this.cursor.style.top = `${this.cursorY}px`;
    }

    if (this.trailer) {
      this.trailer.style.left = `${this.trailerX}px`;
      this.trailer.style.top = `${this.trailerY}px`;
    }

    requestAnimationFrame(() => this.animate());
  }

  expand() {
    if (this.cursor) {
      this.cursor.style.width = '20px';
      this.cursor.style.height = '20px';
      this.cursor.style.background = '#f59e0b';
    }
    if (this.trailer) {
      this.trailer.style.width = '60px';
      this.trailer.style.height = '60px';
      this.trailer.style.borderColor = '#f59e0b';
    }
  }

  shrink() {
    if (this.cursor) {
      this.cursor.style.width = '12px';
      this.cursor.style.height = '12px';
      this.cursor.style.background = '#6c2bd9';
    }
    if (this.trailer) {
      this.trailer.style.width = '40px';
      this.trailer.style.height = '40px';
      this.trailer.style.borderColor = '#a855f7';
    }
  }

  show() {
    if (this.cursor) this.cursor.style.opacity = '1';
    if (this.trailer) this.trailer.style.opacity = '1';
  }

  hide() {
    if (this.cursor) this.cursor.style.opacity = '0';
    if (this.trailer) this.trailer.style.opacity = '0';
  }
}

// ========================================
// SMOOTH SCROLL REVEAL ANIMATIONS
// ========================================
class ScrollReveal {
  constructor() {
    this.elements = [];
    this.init();
  }

  init() {
    // Select all elements to animate
    const selectors = [
      '.service-card',
      '.loyalty-card',
      '.gallery-img-wrap',
      '.testimonial-card',
      '.about-section h2',
      '.gallery-section h2',
      '.loyalty-section h2',
      '.section-title',
      '#contact'
    ];

    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        this.elements.push(el);
      });
    });

    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    this.elements.forEach(el => this.observer.observe(el));

    // Trigger initial check
    this.checkElements();
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after animation
        this.observer.unobserve(entry.target);
      }
    });
  }

  checkElements() {
    this.elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        el.classList.add('visible');
      }
    });
  }
}

// ========================================
// GLASSMORPHISM HEADER
// ========================================
class GlassHeader {
  constructor() {
    this.header = document.querySelector('header');
    if (!this.header) return;

    this.lastScroll = 0;
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    this.onScroll();
  }

  onScroll() {
    const currentScroll = window.scrollY;

    // Add scrolled class for enhanced glass effect
    if (currentScroll > 50) {
      this.header.classList.add('scrolled');
    } else {
      this.header.classList.remove('scrolled');
    }

    // Hide/show on scroll direction (optional enhancement)
    if (currentScroll > this.lastScroll && currentScroll > 200) {
      this.header.style.transform = 'translateY(-100%)';
    } else {
      this.header.style.transform = 'translateY(0)';
    }

    this.lastScroll = currentScroll;
  }
}

// ========================================
// MOBILE NAVIGATION
// ========================================
class MobileNav {
  constructor() {
    this.toggle = document.getElementById('mobile-menu-toggle');
    this.menu = document.querySelector('nav ul');

    if (!this.toggle || !this.menu) return;

    this.isOpen = false;
    this.init();
  }

  init() {
    this.toggle.addEventListener('click', () => this.toggleMenu());

    // Close menu when clicking on a link
    this.menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.toggle.contains(e.target) && !this.menu.contains(e.target)) {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.menu.classList.toggle('open', this.isOpen);
    this.toggle.innerHTML = this.isOpen ? '&times;' : '&#9776;';
    this.toggle.setAttribute('aria-expanded', this.isOpen);
  }

  closeMenu() {
    this.isOpen = false;
    this.menu.classList.remove('open');
    this.toggle.innerHTML = '&#9776;';
    this.toggle.setAttribute('aria-expanded', false);
  }
}

// ========================================
// SMOOTH SCROLL NAVIGATION
// ========================================
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => this.handleClick(e, link));
    });
  }

  handleClick(e, link) {
    const targetId = link.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const headerHeight = document.querySelector('header')?.offsetHeight || 80;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// ========================================
// FLOATING ACTION BUTTON
// ========================================
class FloatingButton {
  constructor() {
    this.fab = document.getElementById('fab');
    if (!this.fab) return;

    this.init();
  }

  init() {
    this.fab.addEventListener('click', () => this.scrollToTop());
    window.addEventListener('scroll', () => this.checkVisibility(), { passive: true });
    this.checkVisibility();
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  checkVisibility() {
    if (window.scrollY > 400) {
      this.fab.classList.add('visible');
    } else {
      this.fab.classList.remove('visible');
    }
  }
}

// ========================================
// TESTIMONIALS SLIDER
// ========================================
class TestimonialSlider {
  constructor() {
    this.slider = document.querySelector('.testimonial-slider');
    if (!this.slider) return;

    this.track = this.slider.querySelector('.testimonial-track');
    this.slides = Array.from(this.slider.querySelectorAll('.testimonial-slide'));
    this.prevBtn = this.slider.querySelector('#testimonial-prev');
    this.nextBtn = this.slider.querySelector('#testimonial-next');
    this.dots = Array.from(this.slider.querySelectorAll('.testimonial-dot'));

    this.currentIndex = 0;
    this.total = this.slides.length;
    this.autoPlayInterval = null;
    this.startX = null;

    this.init();
  }

  init() {
    // Button controls
    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());

    // Dot controls
    this.dots.forEach((dot, i) => {
      dot.addEventListener('click', () => this.goTo(i));
    });

    // Keyboard navigation
    this.slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Touch support
    this.track.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: true });
    this.track.addEventListener('touchend', (e) => this.onTouchEnd(e));

    // Pause on hover
    this.slider.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.slider.addEventListener('mouseleave', () => this.startAutoPlay());

    // Window resize
    window.addEventListener('resize', () => this.update());

    this.update();
    this.startAutoPlay();
  }

  update() {
    const offset = -this.currentIndex * 100;
    this.track.style.transform = `translateX(${offset}%)`;

    // Update ARIA
    this.slides.forEach((slide, i) => {
      slide.setAttribute('aria-hidden', i !== this.currentIndex);
    });

    // Update dots
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentIndex);
    });
  }

  goTo(index) {
    this.currentIndex = (index + this.total) % this.total;
    this.update();
    this.resetAutoPlay();
  }

  next() {
    this.goTo(this.currentIndex + 1);
  }

  prev() {
    this.goTo(this.currentIndex - 1);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.next(), 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  onTouchStart(e) {
    this.startX = e.touches[0].clientX;
    this.stopAutoPlay();
  }

  onTouchEnd(e) {
    if (!this.startX) return;

    const endX = e.changedTouches[0].clientX;
    const diff = this.startX - endX;

    if (Math.abs(diff) > 50) {
      diff > 0 ? this.next() : this.prev();
    }

    this.startX = null;
    this.startAutoPlay();
  }
}

// ========================================
// TOAST NOTIFICATION SYSTEM
// ========================================
const Toast = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.style.cssText = 'position: fixed; bottom: 2rem; right: 2rem; z-index: 2000;';
      document.body.appendChild(this.container);
    }
  },

  create(message, type = 'success') {
    this.init();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
      success: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',
      error: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
      info: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
    };

    toast.innerHTML = `
      <div class="toast-icon" style="color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6c2bd9'}">${icons[type]}</div>
      <div class="toast-message">${message}</div>
      <button class="toast-close" aria-label="Close">&times;</button>
    `;

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto-hide
    const timer = setTimeout(() => this.hide(toast), 5000);

    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
      clearTimeout(timer);
      this.hide(toast);
    });

    return toast;
  },

  hide(toast) {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  },

  success(message) { return this.create(message, 'success'); },
  error(message) { return this.create(message, 'error'); },
  info(message) { return this.create(message, 'info'); }
};

// ========================================
// CONTACT FORM HANDLER
// ========================================
class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    if (!this.form) return;

    this.init();
  }

  init() {
    // Add honeypot
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = '_gotcha';
    honeypot.style.display = 'none';
    honeypot.tabIndex = -1;
    this.form.insertBefore(honeypot, this.form.firstChild);

    // Form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Real-time validation
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  }

  validateField(input) {
    const value = input.value.trim();

    if (input.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.showError(input, 'Please enter a valid email address');
        return false;
      }
    }

    if (input.name === 'message' && value.length < 10) {
      this.showError(input, 'Message must be at least 10 characters');
      return false;
    }

    this.clearError(input);
    return true;
  }

  showError(input, message) {
    input.style.borderColor = '#ef4444';
    input.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)';
  }

  clearError(input) {
    input.style.borderColor = '';
    input.style.boxShadow = '';
  }

  async handleSubmit(e) {
    e.preventDefault();

    const emailInput = this.form.querySelector('input[type="email"]');
    const messageInput = this.form.querySelector('textarea[name="message"]');
    const submitBtn = this.form.querySelector('button[type="submit"]');

    // Validate
    const emailValid = this.validateField(emailInput);
    const messageValid = this.validateField(messageInput);

    if (!emailValid || !messageValid) {
      Toast.error('Please fill in all fields correctly');
      return;
    }

    // Submit
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span style="display: inline-flex; align-items: center; gap: 0.5rem;"><svg width="20" height="20" viewBox="0 0 24 24" class="animate-spin"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Sending...</span>';
    submitBtn.disabled = true;

    try {
      const response = await fetch(this.form.action, {
        method: 'POST',
        body: new FormData(this.form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        Toast.success('Message sent! We\'ll respond within 24 hours.');
        this.form.reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      Toast.error('Error sending message. Please email us at kloosethreads@gmail.com');
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }
}

// ========================================
// GALLERY LIGHTBOX ENHANCEMENTS
// ========================================
class GalleryEnhancements {
  constructor() {
    this.init();
  }

  init() {
    // Add keyboard support for lightbox
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const lightbox = document.querySelector('.lightbox:target');
        if (lightbox) {
          window.location.hash = '#gallery';
        }
      }
    });

    // Add loading state for images
    document.querySelectorAll('.gallery-img').forEach(img => {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    });
  }
}

// ========================================
// PARALLAX EFFECTS
// ========================================
class ParallaxEffect {
  constructor() {
    this.hero = document.querySelector('.hero');
    if (!this.hero) return;

    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
  }

  onScroll() {
    const scrollY = window.scrollY;
    const heroHeight = this.hero.offsetHeight;

    if (scrollY < heroHeight) {
      const parallaxAmount = scrollY * 0.4;
      this.hero.style.backgroundPositionY = `calc(50% + ${parallaxAmount}px)`;

      // Fade out hero content on scroll
      const opacity = 1 - (scrollY / heroHeight) * 1.5;
      const heroContent = this.hero.querySelectorAll('.hero-logo, .hero-title, .hero-desc, .hero-cta');
      heroContent.forEach(el => {
        el.style.opacity = Math.max(0, opacity);
        el.style.transform = `translateY(${scrollY * 0.2}px)`;
      });
    }
  }
}

// ========================================
// DYNAMIC COPYRIGHT YEAR
// ========================================
function updateCopyrightYear() {
  const footer = document.querySelector('footer > div:first-child');
  if (footer) {
    const year = new Date().getFullYear();
    footer.textContent = `LooseThreads LLC \u00A9 ${year}. All rights reserved.`;
  }
}

// ========================================
// SERVICE CARDS STAGGER ANIMATION
// ========================================
class ServiceCardsAnimation {
  constructor() {
    this.cards = document.querySelectorAll('.service-card');
    if (!this.cards.length) return;

    this.init();
  }

  init() {
    this.cards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.1}s`;

      // Add hover sound effect (optional - subtle)
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
}

// ========================================
// MAGNETIC BUTTONS
// ========================================
class MagneticButtons {
  constructor() {
    this.buttons = document.querySelectorAll('.hero-cta, .btn-primary');
    if (!this.buttons.length) return;

    this.init();
  }

  init() {
    this.buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => this.onMouseMove(e, btn));
      btn.addEventListener('mouseleave', (e) => this.onMouseLeave(e, btn));
    });
  }

  onMouseMove(e, btn) {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  }

  onMouseLeave(e, btn) {
    btn.style.transform = '';
  }
}

// ========================================
// TEXT SCRAMBLE EFFECT (FOR HERO TITLE)
// ========================================
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}=+*^?#________';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve);
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="scramble-char">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// ========================================
// INITIALIZE EVERYTHING
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Core functionality
  new CustomCursor();
  new GlassHeader();
  new MobileNav();
  new SmoothScroll();
  new FloatingButton();
  new TestimonialSlider();
  new ContactForm();
  new ScrollReveal();
  new GalleryEnhancements();
  new ParallaxEffect();
  new ServiceCardsAnimation();
  new MagneticButtons();

  // Update copyright
  updateCopyrightYear();

  // Add loaded class to body after everything is ready
  document.body.classList.add('loaded');

  // Optional: Text scramble effect for hero title
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    const fx = new TextScramble(heroTitle);

    // Run scramble effect after a short delay
    setTimeout(() => {
      fx.setText(originalText);
    }, 500);
  }
});

// Performance optimization: Add passive event listeners where applicable
document.addEventListener('touchstart', () => {}, { passive: true });
document.addEventListener('touchmove', () => {}, { passive: true });
document.addEventListener('wheel', () => {}, { passive: true });
