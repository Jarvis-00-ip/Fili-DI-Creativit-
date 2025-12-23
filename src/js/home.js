document.addEventListener("DOMContentLoaded", () => {
    // Hero Video Logic
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        // When video ends, fade it out to show the static image
        heroVideo.addEventListener('ended', () => {
            heroVideo.classList.add('video-hidden');
        });

        // Fallback: If video error or stall, hide it immediately
        heroVideo.addEventListener('error', () => {
            heroVideo.classList.add('video-hidden');
        });
    }

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

    // Optional: Parallax effect for Hero Image
    const heroImg = document.querySelector('.hero-image');
    if (heroImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                // Subtle move down
                heroImg.style.transform = `scale(1.05) translateY(${scrollY * 0.3}px)`;
            }
        });
    }
});
