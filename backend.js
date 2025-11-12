// Complete updated backend.js file
document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle - unified approach
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.querySelector('nav ul');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', function () {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileMenuToggle.innerHTML = isOpen ? '✕' : '☰';
      mobileMenuToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // Function to check if device is mobile
  function isMobile() {
    return window.innerWidth <= 768;
  }

  // Adjust collage layout for mobile devices
  function adjustCollageForMobile() {
    const collage = document.querySelector('.collage');
    if (collage) {
      const images = collage.querySelectorAll('img');

      // Set index attributes for collage images to create staggered animation
      images.forEach((img, index) => {
        img.style.setProperty('--img-index', index);

        // On mobile, limit visible images to improve performance
        if (isMobile() && index > 8) {
          img.style.display = 'none';
        } else {
          img.style.display = 'block';
        }
      });
    }
  }

  // Function to optimize video loading
  function optimizeVideoLoading() {
    const videos = document.querySelectorAll('iframe');

    // Only load videos when they're close to viewport on mobile
    if (isMobile()) {
      videos.forEach((video) => {
        // Store original src if not already done
        if (video.src && !video.getAttribute('data-src')) {
          const dataSrc = video.src;
          video.setAttribute('data-src', dataSrc);
          video.removeAttribute('src');
        }

        // Create intersection observer to load video when scrolled near
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                video.src = video.getAttribute('data-src');
                observer.unobserve(video);
              }
            });
          },
          { threshold: 0.1 }
        );

        observer.observe(video);
      });
    } else {
      // On desktop, load all videos directly
      videos.forEach((video) => {
        const dataSrc = video.getAttribute('data-src');
        if (dataSrc && !video.src) {
          video.src = dataSrc;
        }
      });
    }
  }

  // Handle window resize events for responsive adjustments
  function handleResize() {
    adjustCollageForMobile();

    // Adjust hero section height on mobile
    const hero = document.getElementById('hero');
    if (hero && isMobile()) {
      hero.style.height = 'auto';
      hero.style.minHeight = '80vh';
    } else if (hero) {
      hero.style.height = '100vh';
    }
  }

  // Navbar Scroll Effect
  const navbar = document.querySelector('header');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('shrink');
      } else {
        navbar.classList.remove('shrink');
      }
    });
  }

  // Smooth Scroll for Navigation Links with mobile menu close
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70, // Offset for navbar
          behavior: 'smooth',
        });
      }

      // Close mobile menu if open
      if (navMenu && navMenu.classList.contains('open') && mobileMenuToggle) {
        navMenu.classList.remove('open');
        mobileMenuToggle.innerHTML = '☰';
      }
    });
  });

  // Floating Action Button
  const fab = document.getElementById('fab');
  if (fab) {
    fab.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });

    // Show/hide FAB based on scroll position
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        fab.style.display = 'flex';
      } else {
        fab.style.display = 'none';
      }
    });
  }

  // Enhanced Form Validation with Feedback
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      const emailInput = this.querySelector('input[type="email"]');
      const messageInput = this.querySelector('textarea[name="message"]');
      const submitButton = this.querySelector('button[type="submit"]');

      let isValid = true;
      const errorMessages = [];

      // Reset any previous error styling
      if (emailInput) emailInput.style.borderColor = '';
      if (messageInput) messageInput.style.borderColor = '';

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput && !emailRegex.test(emailInput.value)) {
        isValid = false;
        emailInput.style.borderColor = 'red';
        errorMessages.push('Please enter a valid email address');
      }

      // Message validation
      if (messageInput && messageInput.value.trim().length < 10) {
        isValid = false;
        messageInput.style.borderColor = 'red';
        errorMessages.push('Message must be at least 10 characters long');
      }

      if (!isValid) {
        e.preventDefault();
        alert(errorMessages.join('\n'));
        return;
      }

      // If valid, show loading state
      e.preventDefault();
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;

      try {
        const response = await fetch(this.action, {
          method: 'POST',
          body: new FormData(this),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          alert('✓ Message sent successfully! We\'ll respond within 24 hours.');
          this.reset();
        } else {
          throw new Error('Failed to send');
        }
      } catch (error) {
        alert('⚠ Error sending message. Please email us directly at kloosethreads@gmail.com or call 770-771-1443.');
      } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    });

    // Add honeypot field for spam prevention
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = '_gotcha';
    honeypot.style.display = 'none';
    honeypot.tabIndex = -1;
    honeypot.autocomplete = 'off';
    contactForm.insertBefore(honeypot, contactForm.firstChild);
  }

  // Scroll Reveal Animation - Improved version of your original code
  function handleScrollReveal() {
    // Get all elements we want to animate
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const paragraphs = document.querySelectorAll('p');
    const images = document.querySelectorAll('img');
    const iframes = document.querySelectorAll('iframe');
    const cards = document.querySelectorAll('.card');
    const ctaButtons = document.querySelectorAll('.cta-button, .card-cta');
    const heroElements = document.querySelectorAll('#hero h1, #hero div, #hero .cta-button');

    // Function to check if an element is in viewport
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 && rect.bottom >= 0;
    }

    // Function to check elements and add animation class
    function checkElements(elements) {
      elements.forEach((element) => {
        if (isElementInViewport(element)) {
          element.classList.add('reveal-visible');
        }
      });
    }

    // Check all elements
    checkElements(headings);
    checkElements(paragraphs);
    checkElements(images);
    checkElements(iframes);
    checkElements(cards);
    checkElements(ctaButtons);
    checkElements(heroElements);
  }

  // Initialize all responsive functions
  handleResize();
  optimizeVideoLoading();
  handleScrollReveal();

  // Add event listeners
  window.addEventListener('resize', handleResize);
  window.addEventListener('scroll', handleScrollReveal);

  // Dynamic copyright year
  const footerCopyright = document.querySelector('footer > div:first-child');
  if (footerCopyright) {
    const currentYear = new Date().getFullYear();
    footerCopyright.textContent = `LooseThreads LLC © ${currentYear}. All rights reserved.`;
  }
});

// Enhanced Testimonials slider with Progress Dots
(() => {
  const slider = document.querySelector('#testimonials .testimonial-slider');
  if (!slider) return;

  const track = slider.querySelector('.testimonial-track');
  const slides = Array.from(slider.querySelectorAll('.testimonial-slide'));
  const prevBtn = slider.querySelector('#testimonial-prev');
  const nextBtn = slider.querySelector('#testimonial-next');
  const dots = Array.from(document.querySelectorAll('.testimonial-dot'));

  let index = 0;
  const total = slides.length;
  let autoPlayInterval;

  function update() {
    const offset = -index * slider.clientWidth;
    track.style.transform = `translateX(${offset}px)`;

    // Update ARIA attributes
    slides.forEach((slide, i) => {
      slide.setAttribute('aria-hidden', i !== index);
    });

    // Update progress dots
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function go(delta) {
    index = (index + delta + total) % total;
    update();
    resetAutoPlay();
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => go(1), 5000); // Change slide every 5 seconds
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // Button controls
  prevBtn?.addEventListener('click', () => go(-1));
  nextBtn?.addEventListener('click', () => go(1));

  // Dot controls - click to jump to specific testimonial
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      index = i;
      update();
      resetAutoPlay();
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!slider.matches(':hover')) return; // Only when slider is focused
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });

  // Resize handling
  window.addEventListener('resize', update);

  // Touch/swipe support
  let startX = null;
  let isDragging = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = false;
    stopAutoPlay();
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (startX === null) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;

    if (Math.abs(diff) > 10) {
      isDragging = true;
    }
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isDragging || startX === null) {
      startAutoPlay();
      return;
    }

    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      go(diff > 0 ? -1 : 1);
    } else {
      startAutoPlay();
    }

    startX = null;
    isDragging = false;
  });

  // Pause on hover
  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);

  // Initialize
  update();
  startAutoPlay();
})();

// Scroll Fade-In Animations
(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Apply fade-in to service cards, testimonials, and other elements
  document.querySelectorAll('.service-card, .about-block, .gallery-img-wrap, .loyalty-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
})();

// Toast Notification System
const Toast = {
  create(message, type = 'success') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? '✓' : '⚠';

    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-message">${message}</div>
      <button class="toast-close" aria-label="Close">×</button>
    `;

    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => toast.classList.add('show'), 10);

    // Auto-hide after 5 seconds
    const autoHideTimer = setTimeout(() => this.hide(toast), 5000);

    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
      clearTimeout(autoHideTimer);
      this.hide(toast);
    });

    return toast;
  },

  hide(toast) {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  },

  success(message) {
    return this.create(message, 'success');
  },

  error(message) {
    return this.create(message, 'error');
  }
};

// Replace alert() with Toast in form validation (update existing form code)
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  // Remove the existing submit listener and replace with toast version
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const emailInput = this.querySelector('input[type="email"]');
    const messageInput = this.querySelector('textarea[name="message"]');
    const submitButton = this.querySelector('button[type="submit"]');

    let isValid = true;
    const errorMessages = [];

    // Reset any previous error styling
    if (emailInput) emailInput.style.borderColor = '';
    if (messageInput) messageInput.style.borderColor = '';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput && !emailRegex.test(emailInput.value)) {
      isValid = false;
      emailInput.style.borderColor = 'red';
      errorMessages.push('Please enter a valid email address');
    }

    // Message validation
    if (messageInput && messageInput.value.trim().length < 10) {
      isValid = false;
      messageInput.style.borderColor = 'red';
      errorMessages.push('Message must be at least 10 characters long');
    }

    if (!isValid) {
      Toast.error(errorMessages.join('<br>'));
      return;
    }

    // If valid, show loading state
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
      const response = await fetch(this.action, {
        method: 'POST',
        body: new FormData(this),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        Toast.success('Message sent successfully! We\'ll respond within 24 hours.');
        this.reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      Toast.error('Error sending message. Please email us directly at kloosethreads@gmail.com or call 770-771-1443.');
    } finally {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  }, true); // Use capture to override previous listener
});



