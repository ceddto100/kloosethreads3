// ================================
// KlooseThreads - backend.js
// Progressive, defensive enhancements.
// Won't alter layout; only behavior.
// ================================

document.addEventListener('DOMContentLoaded', function () {
  // ------------------------------
  // Helpers
  // ------------------------------
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const isMobile = () => window.innerWidth <= 768;

  // ------------------------------
  // 0) Mobile Menu Toggle (supports BOTH your old IDs and current HTML)
  //   - Old: #mobileMenuToggle + .navbar
  //   - New: .menu-toggle + nav ul (from your HTML)
  // ------------------------------
  const mobileMenuToggle = $('#mobileMenuToggle') || $('.menu-toggle');
  const navbarMenu       = $('.navbar') || $('nav ul');

  if (mobileMenuToggle && navbarMenu) {
    // Initialize ARIA for accessibility if using .menu-toggle/new nav
    mobileMenuToggle.setAttribute('aria-expanded', 'false');

    const toggleMenu = () => {
      navbarMenu.classList.toggle('open');
      const isOpen = navbarMenu.classList.contains('open');
      // Icon/text handling
      if (mobileMenuToggle.id === 'mobileMenuToggle') {
        mobileMenuToggle.innerHTML = isOpen ? '✕' : '☰';
      }
      mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
    };

    mobileMenuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a nav link (mobile)
    $$('a', navbarMenu).forEach(a => a.addEventListener('click', () => {
      if (navbarMenu.classList.contains('open')) {
        navbarMenu.classList.remove('open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        if (mobileMenuToggle.id === 'mobileMenuToggle') mobileMenuToggle.innerHTML = '☰';
      }
    }));
  }

  // ------------------------------
  // 1) Collage: index + mobile trim (kept from your file)
  // ------------------------------
  function adjustCollageForMobile() {
    const collage = $('.collage');
    if (!collage) return;
    const images = $$('img', collage);

    images.forEach((img, index) => {
      img.style.setProperty('--img-index', index);
      if (isMobile() && index > 8) {
        img.style.display = 'none';
      } else {
        img.style.display = 'block';
      }
    });
  }

  // ------------------------------
  // 2) Optimize Video Loading (iframes)
  //    - Mobile: lazy via IntersectionObserver
  //    - Desktop: load immediately
  // ------------------------------
  function optimizeVideoLoading() {
    const videos = $$('iframe');
    if (!videos.length) return;

    if (isMobile()) {
      videos.forEach(video => {
        if (video.src && !video.getAttribute('data-src')) {
          video.setAttribute('data-src', video.src);
          video.removeAttribute('src');
        }
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const ds = video.getAttribute('data-src');
              if (ds && !video.src) video.src = ds;
              observer.unobserve(video);
            }
          });
        }, { threshold: 0.1 });
        observer.observe(video);
      });
    } else {
      videos.forEach(video => {
        const ds = video.getAttribute('data-src');
        if (ds && !video.src) video.src = ds;
      });
    }
  }

  // ------------------------------
  // 3) Responsive hero height (kept from your file)
  // ------------------------------
  function handleResize() {
    adjustCollageForMobile();

    const hero = $('#hero');
    if (hero) {
      if (isMobile()) {
        hero.style.height = 'auto';
        hero.style.minHeight = '80vh';
      } else {
        hero.style.height = '100vh';
        hero.style.minHeight = '';
      }
    }
  }

  // ------------------------------
  // 4) Dark Mode
  // Supports either #darkModeToggle or #theme-toggle (if you add it later)
  // ------------------------------
  (function darkMode() {
    const toggle = $('#darkModeToggle') || $('#theme-toggle');
    const STORAGE_KEY = 'kt-theme';
    const root = document.documentElement;

    const apply = (mode) => {
      // If you’re already using body.dark-mode in your CSS, keep it in sync:
      document.body.classList.toggle('dark-mode', mode === 'dark');
      root.setAttribute('data-theme', mode);
      try { localStorage.setItem(STORAGE_KEY, mode); } catch {}
    };

    // Init from storage or system
    const saved = (() => { try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }})();
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (saved) {
      apply(saved);
    } else if (prefersDark.matches) {
      apply('dark');
    } else {
      apply('light');
    }

    // Watch system change only if user hasn’t chosen explicitly
    prefersDark.addEventListener?.('change', (e) => {
      const chosen = (() => { try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }})();
      if (!chosen) apply(e.matches ? 'dark' : 'light');
    });

    // Click to toggle
    toggle?.addEventListener('click', () => {
      const cur = (document.body.classList.contains('dark-mode') || root.getAttribute('data-theme') === 'dark') ? 'dark' : 'light';
      apply(cur === 'dark' ? 'light' : 'dark');
    });
  })();

  // ------------------------------
  // 5) Navbar scroll shrink (kept from your file)
  // Supports #navbar; falls back to <header>
  // ------------------------------
  (function navbarShrink() {
    const navbar = $('#navbar') || $('header');
    if (!navbar) return;
    const onScroll = () => {
      if (window.scrollY > 50) navbar.classList.add('shrink');
      else navbar.classList.remove('shrink');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  // ------------------------------
  // 6) Smooth Scroll for in-page anchors (kept, safer)
  // ------------------------------
  (function smoothAnchors() {
    $$('nav a[href^="#"], a[href^="#"]').forEach(link => {
      link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const target = $(targetId);
        if (!target) return;
        e.preventDefault();

        // Scroll with minimal offset; your layout uses fixed header
        const headerHeight = ($('header')?.offsetHeight || 70);
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight + 4;

        window.scrollTo({ top, behavior: 'smooth' });
        history.pushState(null, '', targetId);

        // Close mobile menu if open
        if (navbarMenu && navbarMenu.classList.contains('open') && mobileMenuToggle) {
          navbarMenu.classList.remove('open');
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
          if (mobileMenuToggle.id === 'mobileMenuToggle') mobileMenuToggle.innerHTML = '☰';
        }
      });
    });
  })();

  // ------------------------------
  // 7) Custom Cursor (kept from your file)
  // ------------------------------
  (function customCursor() {
    const cursor = $('#custom-cursor');
    const trailer = $('#cursor-trailer');
    if (!(cursor && trailer)) return;

    let raf = null;
    const move = (e) => {
      const { clientX: x, clientY: y } = e;
      cursor.style.left = x + 'px';
      cursor.style.top = y + 'px';

      // small delay for trailer
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        trailer.style.left = x + 'px';
        trailer.style.top = y + 'px';
      });
    };
    document.addEventListener('mousemove', move, { passive: true });
  })();

  // ------------------------------
  // 8) Floating Action Button (kept from your file)
  // ------------------------------
  (function fabTop() {
    const fab = $('#fab');
    if (!fab) return;

    fab.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const onScroll = () => {
      fab.style.display = (window.scrollY > 300) ? 'flex' : 'none';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  // ------------------------------
  // 9) Contact Form Validation (kept; now targets your #contact form)
  // ------------------------------
  (function formValidation() {
    const contactForm = $('#contact-form') || $('#contact form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
      const emailInput = contactForm.querySelector('input[type="email"]');
      const messageInput = contactForm.querySelector('textarea[name="message"]');

      let isValid = true;
      const errors = [];

      if (emailInput) emailInput.style.borderColor = '';
      if (messageInput) messageInput.style.borderColor = '';

      if (emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        isValid = false;
        emailInput.style.borderColor = 'red';
        errors.push('Please enter a valid email address.');
      }

      if (messageInput && messageInput.value.trim().length < 10) {
        isValid = false;
        messageInput.style.borderColor = 'red';
        errors.push('Message must be at least 10 characters long.');
      }

      if (!isValid) {
        e.preventDefault();
        alert(errors.join('\n'));
      }
    });
  })();

  // ------------------------------
  // 10) Scroll Reveal (improved)
  //    Uses IntersectionObserver with a simple fallback.
  //    Adds .reveal-visible to typical elements.
  // ------------------------------
  (function scrollReveal() {
    const groups = [
      'h1','h2','h3','h4','h5','h6',
      'p','img','iframe',
      '.card','.cta-button','.card-cta',
      '#hero h1', '#hero div', '#hero .cta-button',
      '.about-block', '.gallery-img-wrap', '.loyalty-card', 'section#contact', 'footer', 'header'
    ];

    const elements = $$(groups.join(','));

    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('reveal-visible'));
      return;
    }

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    elements.forEach(el => io.observe(el));
  })();

  // ------------------------------
  // 11) Keyboard Lightbox Controls (Esc/←/→)
  //     Navigates anchors #imgN (based on current DOM)
  // ------------------------------
  (function lightboxKeys() {
    const boxes = $$("div[id^='img']").filter(d => /^img\d+$/i.test(d.id));
    if (!boxes.length) return;

    const ids = boxes
      .map(d => d.id)
      .sort((a, b) => Number(a.replace('img', '')) - Number(b.replace('img', '')))
      .map(id => `#${id}`);

    const currentIndex = () => ids.indexOf(location.hash);

    window.addEventListener('keydown', (e) => {
      const idx = currentIndex();
      if (idx === -1) return;
      if (e.key === 'Escape') location.hash = '#gallery';
      if (e.key === 'ArrowRight') location.hash = ids[(idx + 1) % ids.length];
      if (e.key === 'ArrowLeft')  location.hash = ids[(idx - 1 + ids.length) % ids.length];
    });
  })();

  // ------------------------------
  // 12) Lazy-load upgrade for images (CLS friendly)
  // ------------------------------
  (function lazyImages() {
    const imgs = $$('.gallery-img, .lightbox img, section img');
    imgs.forEach(img => {
      if (!img.getAttribute('loading')) img.setAttribute('loading', 'lazy');
      if (!img.getAttribute('width'))  img.setAttribute('width',  '600');
      if (!img.getAttribute('height')) img.setAttribute('height', '600');
    });
  })();

  // ------------------------------
  // 13) Tiny hygiene
  //     - Fix common filename typo in DOM: fururesport -> futuresport
  //     - Secure external links
  // ------------------------------
  (function hygiene() {
    $$('img, source').forEach(node => {
      const attr = node.tagName === 'SOURCE' ? 'srcset' : 'src';
      const v = node.getAttribute(attr);
      if (!v) return;
      if (v.includes('fururesport.png')) {
        node.setAttribute(attr, v.replace('fururesport.png', 'futuresport.png'));
      }
    });

    $$("a[target='_blank']").forEach(a => {
      const rel = (a.getAttribute('rel') || '').split(/\s+/).filter(Boolean);
      if (!rel.includes('noopener')) rel.push('noopener');
      if (!rel.includes('noreferrer')) rel.push('noreferrer');
      a.setAttribute('rel', rel.join(' '));
    });
  })();

  // ------------------------------
  // Init/responsive listeners (kept)
  // ------------------------------
  handleResize();
  optimizeVideoLoading();

  window.addEventListener('resize', handleResize);
});


