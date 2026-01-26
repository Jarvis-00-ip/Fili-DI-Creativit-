// src/js/common.js 
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  let prefix;
  let homeLink;

  if (path.includes("/src/html/shop/")) {
    prefix = "../../";
    homeLink = "../../../../index.html"; // relativo (4 livelli up: candele -> shop -> html -> src -> root)
  } else if (path.includes("/src/html/")) {
    prefix = "";
    homeLink = "../../index.html"; // relativo (2 livelli up: html -> src -> root)
  } else {
    prefix = "src/html/";
    homeLink = "index.html"; // relativo (root)
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
    // Calcola il percorso relativo per la root
    let rootPrefix = "";
    if (path.includes("/src/html/shop/")) {
      rootPrefix = "../../../../";
    } else if (path.includes("/src/html/")) {
      rootPrefix = "../../";
    } else {
      rootPrefix = "";
    }

    const footerHTML = `
    <footer>
      <div class="footer-container">
        <!-- Contatti -->
        <div class="footer-section">
          <h3>Contatti</h3>
          <p>
            <a href="mailto:lauracaprotti2000@gmail.com">
              <img src="${rootPrefix}assets/img/common/email.webp" alt="Email" class="icon"> info@filidicreativita.com
            </a>
          </p>
        </div>

        <!-- Social -->
        <div class="footer-section">
          <h3>Seguici</h3>
          <p>
            <a href="https://instagram.com/filidicreativita" target="_blank">
              <img src="${rootPrefix}assets/img/common/instagram.webp" alt="Instagram" class="icon"> Instagram
            </a>
          </p>
          <p>
            <a href="https://facebook.com/filidicreativita" target="_blank">
              <img src="${rootPrefix}assets/img/common/facebook.webp" alt="Facebook" class="icon"> Facebook
            </a>
          </p>
          <p>
            <a href="https://tiktok.com/@filidicreativita" target="_blank">
              <img src="${rootPrefix}assets/img/common/tiktok.webp" alt="TikTok" class="icon"> TikTok
            </a>
          </p>
        </div>

        <!-- Info -->
        <div class="footer-section">
          <h3>Info</h3>
          <p>&copy; 2025 Fili di Creatività</p>
          <p>Tutti i diritti riservati</p>
          <p><a href="#">Privacy Policy</a> | <a href="#">Termini & Condizioni</a></p>
        </div>
      </div>
    </footer>
    `;

    footerPlaceholder.innerHTML = footerHTML;
  }
});
