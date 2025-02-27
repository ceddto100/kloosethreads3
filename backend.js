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
