// src/js/common.js 
document.addEventListener("DOMContentLoaded", () => {
  // Determine depth relative to root (index.html location)
  // We assume the structure: root/index.html and root/src/html/...
  // Count how many levels deep we are from the "root" folder.

  const path = window.location.pathname;
  let prefix = "";
  let homeLink = "index.html";
  let rootPrefix = "";

  // Logic: "src/html" is the pivotal folder.
  // if we are in src/html/..., we need to go up 2 levels + extra levels for subfolders.

  if (path.includes("/src/html/")) {
    const parts = path.split("/src/html/")[1].split("/");
    const depth = parts.length - 1; // -1 because the file itself is a part

    // Base prefix for assets/css/js which are in src or root
    // To get back to 'src/html/' level from current file:
    let toSrcHtml = "";
    for (let i = 0; i < depth; i++) {
      toSrcHtml += "../";
    }

    // Default prefix for links pointing to other html files (siblings or children of src/html)
    prefix = toSrcHtml;

    // To get back to root (where index.html is)
    // We are in src/html/... (depth) -> need to go up depth + 2 (html->src->root)
    let toRoot = "../../" + toSrcHtml;

    homeLink = toRoot + "index.html";
    rootPrefix = toRoot;
  } else {
    // We are at root (index.html) or some other folder at root level
    prefix = "src/html/";
    homeLink = "index.html";
    rootPrefix = "";
  }

  const links = {
    home: homeLink,
    prodotti: prefix + "candele.html",
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
    // rootPrefix is already calculated at the top
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
