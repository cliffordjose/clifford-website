// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Unobserve after showing for a one-time animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize elements and observer
document.addEventListener('DOMContentLoaded', () => {
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.85)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            navbar.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.5)';
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
        }
    });

    // Smooth scrolling for anchor links to prevent layout jump and account for fixed navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
