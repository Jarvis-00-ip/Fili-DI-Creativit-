
document.addEventListener("DOMContentLoaded", () => {
    // Intersection Observer for Story Blocks
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    const storyBlocks = document.querySelectorAll('.story-block');
    storyBlocks.forEach(block => observer.observe(block));

    // Optional: Parallax effect for Hero
    const heroBg = document.querySelector('.home-hero-bg');
    if (heroBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                // Subtle move down
                heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.3}px)`;
            }
        });
    }
});
