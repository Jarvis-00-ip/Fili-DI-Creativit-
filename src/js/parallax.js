// src/js/parallax.js
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".img-container img");

  if (!images.length) return;

  document.addEventListener("mousemove", (e) => {
    images.forEach(img => {
      const speed = Number(img.getAttribute("data-speed")) || 10;
      const x = (window.innerWidth  - e.pageX * speed) / 1000;
      const y = (window.innerHeight - e.pageY * speed) / 1000;
      img.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
    });
  });

  document.addEventListener("mouseleave", () => {
    images.forEach(img => {
      img.style.transform = "translate(0,0) scale(1)";
    });
  });
});
