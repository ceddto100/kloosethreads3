// JavaScript to adjust collage for mobile devices
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if device is mobile
    function isMobile() {
      return window.innerWidth <= 768;
    }
    
    // Function to adjust collage styling for mobile
    
  });

  //new code
  // Main JavaScript for Loose Threads LLC website
document.addEventListener('DOMContentLoaded', function() {
  
    // 1. Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Optional: Save preference to localStorage
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
      });
      
      // Check for saved preference
      const savedDarkMode = localStorage.getItem('darkMode') === 'true';
      if (savedDarkMode) {
        document.body.classList.add('dark-mode');
      }
    }
    
    // 2. Navbar Scroll Effect
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
    
    // 3. Smooth Scroll for Navigation Links
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
      });
    });
    
    // 4. Custom Cursor Effect
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
    
    // 5. Floating Action Button
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
    
    // 6. Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        const emailInput = document.querySelector('input[type="email"]');
        const messageInput = document.querySelector('textarea[name="message"]');
        
        let isValid = true;
        
        // Simple email validation
        if (emailInput && !emailInput.value.includes('@')) {
          isValid = false;
          emailInput.style.borderColor = 'red';
        } else if (emailInput) {
          emailInput.style.borderColor = '';
        }
        
        // Message validation
        if (messageInput && messageInput.value.length < 10) {
          isValid = false;
          messageInput.style.borderColor = 'red';
        } else if (messageInput) {
          messageInput.style.borderColor = '';
        }
        
        if (!isValid) {
          e.preventDefault();
          alert('Please fill out all fields correctly.');
        }
      });
    }
  });
// Scroll Reveal Animation JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get all elements we want to animate
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const paragraphs = document.querySelectorAll('p');
  const images = document.querySelectorAll('img');
  const iframes = document.querySelectorAll('iframe');
  const cards = document.querySelectorAll('.card');
  const ctaButtons = document.querySelectorAll('.cta-button, .card-cta');
  const heroElements = document.querySelectorAll('#hero h1, #hero div, #hero .cta-button');
  
  // Set index attributes for collage images to create staggered animation
  const collageImages = document.querySelectorAll('.collage img');
  collageImages.forEach((img, index) => {
    img.style.setProperty('--img-index', index);
  });
  
  // Function to check if an element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 && 
      rect.bottom >= 0
    );
  }
  
  // Function to handle scroll event
  function handleScroll() {
    // Check all elements
    checkElements(headings);
    checkElements(paragraphs);
    checkElements(images);
    checkElements(iframes);
    checkElements(cards);
    checkElements(ctaButtons);
    checkElements(heroElements);
  }
  
  // Function to check if elements are in viewport and add animation class
  function checkElements(elements) {
    elements.forEach(element => {
      if (isElementInViewport(element)) {
        element.classList.add('reveal-visible');
      }
    });
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
  
  // Trigger once on page load to reveal elements already in viewport
  handleScroll();
});
