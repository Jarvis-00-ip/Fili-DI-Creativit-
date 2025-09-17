// src/js/common.js
document.addEventListener("DOMContentLoaded", () => {
  // Sei in /src/html/... ?
  const inHtmlFolder = window.location.pathname.includes("/html/");

  // Percorsi pagine
  const links = inHtmlFolder
    ? {
        home: "../../index.html",
        prodotti: "prodotti.html",
        contatti: "contatti.html",
        carrello: "carrello.html",
        chisiamo: "chisiamo.html",
        footer: "footer.html",
      }
    : {
        home: "index.html",
        prodotti: "src/html/prodotti.html",
        contatti: "src/html/contatti.html",
        carrello: "src/html/carrello.html",
        chisiamo: "src/html/chisiamo.html",
        footer: "src/html/footer.html",
      };

  // Percorso icone
  const iconsPath = inHtmlFolder ? "../../assets/img/" : "assets/img/";

  // Inietta navbar
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.innerHTML = `
      <div class="logo">Fili di Creatività</div>
      <ul class="nav-links">
        <li><a href="${links.home}">Home</a></li>
        <li><a href="${links.prodotti}">Prodotti</a></li>
        <li><a href="${links.contatti}">Contatti</a></li>
        <li><a href="${links.carrello}">Carrello</a></li>
        <li><a href="${links.chisiamo}">Chi siamo</a></li>

        <!-- Icone auth -->
        <li id="btn-login">
          <button class="nav-icon snipcart-customer-signin" title="Accedi">
            <img src="${iconsPath}login-icon.png" alt="Login" />
          </button>
        </li>

        <li id="btn-account" style="display:none;">
          <button class="nav-icon snipcart-customer-profile" title="Il mio account">
            <img src="${iconsPath}user-icon.png" alt="Account" />
          </button>
        </li>

        <li id="btn-logout" style="display:none;">
          <button class="nav-icon snipcart-customer-signout" title="Esci">
            <img src="${iconsPath}logout-icon.png" alt="Logout" />
          </button>
        </li>
      </ul>
      <div class="hamburger">☰</div>
    `;
  }

  // Hamburger overlay
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

  // Footer
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    fetch(links.footer)
      .then(r => r.text())
      .then(html => (footerPlaceholder.innerHTML = html))
      .catch(err => console.error("Errore nel caricamento del footer:", err));
  }

  // Toggling icone in base allo stato Snipcart
  function bindSnipcartUI() {
    const btnLogin  = document.getElementById("btn-login");
    const btnAcc    = document.getElementById("btn-account");
    const btnLogout = document.getElementById("btn-logout");

    if (!window.Snipcart || !window.Snipcart.store) return;

    const render = () => {
      const { customer } = window.Snipcart.store.getState();
      // console.log("Snipcart stato utente:", customer.status);

      const signedIn = customer.status === "SignedIn";

      if (btnLogin)  btnLogin.style.display  = signedIn ? "none"  : "block";
      if (btnAcc)    btnAcc.style.display    = signedIn ? "block" : "none";
      if (btnLogout) btnLogout.style.display = signedIn ? "block" : "none";
    };

    render();
    window.Snipcart.store.subscribe(render);
  }

  // Aspetta Snipcart
  document.addEventListener("snipcart.ready", bindSnipcartUI);
});
