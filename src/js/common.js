// src/js/common.js
document.addEventListener("DOMContentLoaded", () => {
  const inHtmlFolder = window.location.pathname.includes("/html/");

  // 🔗 Percorsi corretti
  const links = inHtmlFolder
    ? {
        home: "../../index.html",
        prodotti: "prodotti.html",
        contatti: "contatti.html",
        chisiamo: "chisiamo.html",
        footer: "footer.html",
      }
    : {
        home: "index.html",
        prodotti: "src/html/prodotti.html",
        contatti: "src/html/contatti.html",
        chisiamo: "src/html/chisiamo.html",
        footer: "src/html/footer.html",
      };

  // --- Navbar ---
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.innerHTML = `
      <div class="logo">Fili di Creatività</div>
      <ul class="nav-links">
        <li><a href="${links.home}">Home</a></li>
        <li><a href="${links.prodotti}">Prodotti</a></li>
        <li><a href="${links.contatti}">Contatti</a></li>
        <li>
          <a href="#" id="open-cart-link">
            Carrello <span class="cart-count">0</span>
          </a>
        </li>
        <li><a href="${links.chisiamo}">Chi siamo</a></li>
      </ul>
      <div class="hamburger">☰</div>
    `;
  }

  // --- Apertura carrello Snipcart + contatore ---
  document.addEventListener("snipcart.ready", () => {
    const cartLink = document.getElementById("open-cart-link");
    const cartCount = document.querySelector(".cart-count");

    if (cartLink) {
      cartLink.addEventListener("click", (e) => {
        e.preventDefault();
        Snipcart.api.theme.cart.open();
      });
    }

    if (cartCount) {
      // Aggiorna il contatore all'avvio
      cartCount.textContent = Snipcart.store.getState().cart.items.count;

      // Aggiorna il contatore ad ogni cambiamento nel carrello
      Snipcart.store.subscribe(() => {
        const state = Snipcart.store.getState();
        cartCount.textContent = state.cart.items.count;
      });
    }
  });

  // --- Hamburger menu ---
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      if (navLinks.classList.contains("active")) {
        navLinks.style.position = "fixed";
        navLinks.style.top = "0";
        navLinks.style.left = "0";
        navLinks.style.width = "100%";
        navLinks.style.height = "100%";
        navLinks.style.background = "#fff";
        navLinks.style.flexDirection = "column";
        navLinks.style.justifyContent = "center";
        navLinks.style.alignItems = "center";
        navLinks.style.fontSize = "1.5rem";
        navLinks.style.zIndex = "1000";
      } else {
        navLinks.removeAttribute("style");
        navLinks.classList.remove("active");
      }
    });
  }

  // --- Footer ---
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    fetch(links.footer)
      .then(r => r.text())
      .then(html => (footerPlaceholder.innerHTML = html))
      .catch(err => console.error("Errore nel caricamento del footer:", err));
  }
});
