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
    // 2. ANTIGRAVITY MOUSE PHYSICS (Parallax)
    // ==========================================
    const floatingWrappers = document.querySelectorAll('.image-wrapper'); // Apply physics to wrapper to preserve CSS animation on child
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    // Soft damping factor for "fluid" feel
    const damping = 0.05;

    document.addEventListener('mousemove', (e) => {
        // Normalize mouse position -1 to 1
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    });

    function animatePhysics() {
        // Smoothly interpolate current values to target values
        targetX += (mouseX - targetX) * damping;
        targetY += (mouseY - targetY) * damping;

        floatingWrappers.forEach((wrapper, index) => {
            // Reverse direction for some images for depth variety
            const direction = index % 2 === 0 ? 1 : -1;
            const intensity = 20; // Max pixel shift

            const moveX = targetX * intensity * direction;
            const moveY = targetY * intensity * direction;

            // Apply to wrapper
            wrapper.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });

        // Loop
        requestAnimationFrame(animatePhysics);
    }

    // Initialize Physics Loop
    // Check if user prefers reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        animatePhysics();
    }
});
