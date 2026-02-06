document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. SCROLL REVEAL ANIMATIONS
    // ==========================================
    const observerOptions = {
        root: null,
        threshold: 0.3
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reveal text
                const text = entry.target.querySelector('.text-content');
                if (text) text.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        scrollObserver.observe(section);
    });

    // ==========================================
    // 2. ANTIGRAVITY MOUSE PHYSICS (REMOVED)
    // ==========================================
    // The physics module has been removed to prevent conflicts with 
    // the CSS-based responsive transforms and ensure stability.

});
