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

                // Update Dock Active State
                updateActiveDockLink(entry.target.id);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        scrollObserver.observe(section);
    });

    function updateActiveDockLink(sectionId) {
        const links = document.querySelectorAll('.dock-btn');
        links.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

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


    // ==========================================
    // 3. MAGNETIC DOCK (Glassmorphism Tilt)
    // ==========================================
    const dock = document.getElementById('dock');
    if (dock) {
        const dockRect = dock.getBoundingClientRect();
        const dockCenter = {
            x: dockRect.left + dockRect.width / 2,
            y: dockRect.top + dockRect.height / 2
        };

        document.addEventListener('mousemove', (e) => {
            // Check distance to dock
            const distX = e.clientX - dockCenter.x;
            const distY = e.clientY - dockCenter.y;
            const distance = Math.sqrt(distX * distX + distY * distY);

            // Active zone radius
            if (distance < 200) {
                // Calculate tilt
                const maxTilt = 10; // degrees
                const tiltX = (distY / 200) * maxTilt * -1; // Invert for "look at mouse"
                const tiltY = (distX / 200) * maxTilt;

                dock.style.transform = `perspective(500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
            } else {
                // Reset
                dock.style.transform = `perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)`;
            }
        });

        // Update dock center on resize
        window.addEventListener('resize', () => {
            const rect = dock.getBoundingClientRect();
            dockCenter.x = rect.left + rect.width / 2;
            dockCenter.y = rect.top + rect.height / 2;
        });
    }

});
