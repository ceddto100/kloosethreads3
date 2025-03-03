// Complete updated backend.js file
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle functionality
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navbarMenu = document.querySelector('.navbar');
  
  if (mobileMenuToggle && navbarMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      navbarMenu.classList.toggle('open');
      
      // Change toggle icon
      const isOpen = navbarMenu.classList.contains('open');
      mobileMenuToggle.innerHTML = isOpen ? '✕' : '☰';
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
      videos.forEach(video => {
        // Store original src if not already done
        if (video.src && !video.getAttribute('data-src')) {
          const dataSrc = video.src;
          video.setAttribute('data-src', dataSrc);
          video.removeAttribute('src');
        }
        
        // Create intersection observer to load video when scrolled near
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              video.src = video.getAttribute('data-src');
              observer.unobserve(video);
            }
          });
        }, { threshold: 0.1 });
        
        observer.observe(video);
      });
    } else {
      // On desktop, load all videos directly
      videos.forEach(video => {
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
  
  // 1. Dark Mode Toggle - Keeping your original code with refinements
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      
      // Save preference to localStorage
      const isDarkMode = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDarkMode);
    });
    
    // Check for saved preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }
  
  // 2. Navbar Scroll Effect - Keeping your original code
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('shrink');
      } else {
        navbar.classList.remove('shrink');
      }
    });
  }
  
  // 3. Smooth Scroll for Navigation Links - Keeping your original code with mobile menu close added
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70, // Offset for navbar
          behavior: 'smooth'
        });
      }
      
      // Close mobile menu if open
      if (navbarMenu && navbarMenu.classList.contains('open') && mobileMenuToggle) {
        navbarMenu.classList.remove('open');
        mobileMenuToggle.innerHTML = '☰';
      }
    });
  });
  
  // 4. Custom Cursor Effect - Keeping your original code
  const cursor = document.getElementById('custom-cursor');
  const cursorTrailer = document.getElementById('cursor-trailer');
  
  if (cursor && cursorTrailer) {
    document.addEventListener('mousemove', function(e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      // Delayed effect for cursor trailer
      setTimeout(function() {
        cursorTrailer.style.left = e.clientX + 'px';
        cursorTrailer.style.top = e.clientY + 'px';
      }, 100);
    });
  }
  
  // 5. Floating Action Button - Keeping your original code
  const fab = document.getElementById('fab');
  if (fab) {
    fab.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Show/hide FAB based on scroll position
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        fab.style.display = 'flex';
      } else {
        fab.style.display = 'none';
      }
    });
  }
  
  // 6. Form Validation - Enhanced version of your original code
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      const emailInput = document.querySelector('input[type="email"]');
      const messageInput = document.querySelector('textarea[name="message"]');
      
      let isValid = true;
      const errorMessages = [];
      
      // Reset any previous error styling
      if (emailInput) emailInput.style.borderColor = '';
      if (messageInput) messageInput.style.borderColor = '';
      
      // Email validation
      if (emailInput && !emailInput.value.includes('@')) {
        isValid = false;
        emailInput.style.borderColor = 'red';
        errorMessages.push('Please enter a valid email address');
      }
      
      // Message validation
      if (messageInput && messageInput.value.length < 10) {
        isValid = false;
        messageInput.style.borderColor = 'red';
        errorMessages.push('Message must be at least 10 characters long');
      }
      
      if (!isValid) {
        e.preventDefault();
        alert(errorMessages.join('\n'));
      }
    });
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
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 && 
        rect.bottom >= 0
      );
    }
    
    // Function to check elements and add animation class
    function checkElements(elements) {
      elements.forEach(element => {
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
});
