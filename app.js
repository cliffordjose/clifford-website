// Custom Cursor
const cursor = document.querySelector('.cursor');
const hoverElements = document.querySelectorAll('a, button, .concept, .ph-image-placer');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// Reveal on Scroll
const reveals = document.querySelectorAll('.ph-content, .ph-image-placer');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    reveals.forEach(reveal => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
// Add reveal base classes
reveals.forEach(el => el.classList.add('reveal'));
revealOnScroll(); // trigger check on load
