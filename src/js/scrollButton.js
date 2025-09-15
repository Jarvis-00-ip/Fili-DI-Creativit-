document.addEventListener("DOMContentLoaded", () => {
  const btnTop = document.querySelector(".btn-top");
  let lastScroll = 0;

  if (!btnTop) return;

  window.addEventListener("scroll", () => {
    let currentScroll = window.pageYOffset;

    // Mostra se in cima
    if (currentScroll < 100) {
      btnTop.classList.remove("hidden");
    } 
    // Nascondi quando scrolli giù
    else if (currentScroll > lastScroll) {
      btnTop.classList.add("hidden");
    } 
    // Riapparire quando risali
    else {
      btnTop.classList.remove("hidden");
    }

    lastScroll = currentScroll;
  });
});
