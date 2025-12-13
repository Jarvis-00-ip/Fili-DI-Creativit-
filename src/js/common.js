// src/js/common.js 
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  let prefix;
  let homeLink;

  if (path.includes("/src/html/shop/")) {
    prefix = "../../";
    homeLink = "/index.html"; // assoluto
  } else if (path.includes("/src/html/")) {
    prefix = "";
    homeLink = "/index.html"; // assoluto
  } else {
    prefix = "src/html/";
    homeLink = "/index.html"; // assoluto
  }

  const links = {
    home: homeLink,
    prodotti: prefix + "prodotti.html",
    contatti: prefix + "contatti.html",
    chisiamo: prefix + "chisiamo.html",
    footer: prefix + "footer.html",
  };

  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.innerHTML = `
      <div class="logo">
        <a href="${links.home}">
          <span class="logo-main">Fili di</span> 
          <span class="logo-highlight">Creatività</span>
        </a>
      </div>
      <ul class="nav-links" id="navLinks">
        <li><a href="${links.home}">Home</a></li>
        <li><a href="${links.prodotti}">Prodotti</a></li>
        <li><a href="${links.contatti}">Contatti</a></li>

        <!-- CARRELLO (DISABILITATO) -->
        <!--
        <li>
          <a href="#" id="open-cart-link">
            Carrello <span class="cart-count">0</span>
          </a>
        </li>
        -->

        <li><a href="${links.chisiamo}">Chi siamo</a></li>
      </ul>
      <div class="hamburger" id="hamburger">☰</div>
    `;
  }

  // SNIPCART + BADGE QUANTITÀ (DISABILITATO)
  /*
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
      cartCount.textContent = Snipcart.store.getState().cart.items.count;
      Snipcart.store.subscribe(() => {
        const state = Snipcart.store.getState();
        cartCount.textContent = state.cart.items.count;
      });
    }
  });
  */

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      if (navLinks.classList.contains("active")) {
        if (!document.getElementById("closeMenu")) {
          const closeBtn = document.createElement("button");
          closeBtn.id = "closeMenu";
          closeBtn.classList.add("close-menu");
          closeBtn.textContent = "✖";
          navLinks.appendChild(closeBtn);
          closeBtn.addEventListener("click", () => {
            navLinks.classList.remove("active");
            closeBtn.remove();
          });
        }
      }
    });
  }

  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    const footerPath = window.FOOTER_SRC || links.footer;
    fetch(footerPath)
      .then((r) => r.text())
      .then((html) => (footerPlaceholder.innerHTML = html))
      .catch((err) => console.error("Errore nel caricamento del footer:", err));
  }
});
