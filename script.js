// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initScrollReveal();
  initTypedEffect();
  initCustomCursor();
  initSmoothScroll();
  initCurrentYear();
});

// ===== LOADING SCREEN =====
function initLoader() {
  const loader = document.getElementById('loader');
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = 'auto';
      // Trigger hero animations after loader
      setTimeout(() => {
        document.querySelectorAll('#hero .reveal, #hero .reveal-right').forEach(el => {
          el.classList.add('visible');
        });
      }, 200);
    }, 2000);
  });

  // Fallback - remove loader after 4s max
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }, 4000);
}

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');

  // Scroll behavior
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;

    // Update active nav link
    updateActiveNavLink();
  });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : 'auto';
  });

  // Close mobile nav on link click
  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = 'auto';
    });
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === currentSection) {
      link.classList.add('active');
    }
  });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve - keeps animation retriggerable if needed
      }
    });
  }, observerOptions);

  reveals.forEach(el => {
    // Skip hero elements - they're triggered after loader
    if (!el.closest('#hero')) {
      observer.observe(el);
    }
  });
}

// ===== TYPED TEXT EFFECT =====
function initTypedEffect() {
  const typedElement = document.getElementById('typedText');
  if (!typedElement) return;

  const strings = [
    'Software Engineer crafting elegant solutions with Python.',
    'Designing robust backend architectures and automated systems.',
    'Turning complex challenges into clean, maintainable code.',
    'Based in Bocholt, Germany — building for the world.'
  ];

  let stringIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 50;

  function type() {
    const currentString = strings[stringIndex];

    if (isDeleting) {
      typedElement.textContent = currentString.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 30;
    } else {
      typedElement.textContent = currentString.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 50;
    }

    if (!isDeleting && charIndex === currentString.length) {
      // Pause at end of string
      typingSpeed = 2500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      stringIndex = (stringIndex + 1) % strings.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing after loader
  setTimeout(type, 2500);
}

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  
  if (!cursor || !follower) return;
  
  // Only enable custom cursor on desktop
  if (!window.matchMedia('(pointer: fine)').matches) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update main cursor instantly
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });
  
  // Smooth follow for the follower circle
  function updateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    requestAnimationFrame(updateFollower);
  }
  updateFollower();
  
  // Add hover effect to links and buttons
  const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .expertise-card, .timeline-card');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    });
  });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== CURRENT YEAR =====
function initCurrentYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ===== PROFILE PHOTO FALLBACK =====
document.addEventListener('DOMContentLoaded', () => {
  const heroPhoto = document.getElementById('heroPhoto');
  if (heroPhoto) {
    heroPhoto.addEventListener('error', () => {
      // Create a gradient placeholder with initials
      heroPhoto.style.display = 'none';
      const container = heroPhoto.parentElement;
      const placeholder = document.createElement('div');
      placeholder.style.cssText = `
        width: 100%;
        height: 100%;
        border-radius: 28px;
        background: linear-gradient(135deg, #6c63ff, #00d4aa);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Outfit', sans-serif;
        font-size: 6rem;
        font-weight: 800;
        color: white;
        position: relative;
        z-index: 2;
        border: 2px solid rgba(255,255,255,0.1);
      `;
      placeholder.textContent = 'CJ';
      container.insertBefore(placeholder, heroPhoto);
    });
  }
});

// ===== MOUSE GLOW EFFECT (DESKTOP ONLY) =====
if (window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.expertise-card, .project-card, .timeline-card, .testimonial-card');
    
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}
