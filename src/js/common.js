// src/js/common.js
document.addEventListener("DOMContentLoaded", () => {
  // rileva se la pagina è in /html/ oppure in root
  const inHtmlFolder = window.location.pathname.includes("/html/");

  // 🔗 percorsi corretti
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

  // Inietta la navbar
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

        <!-- Login (solo se sloggato) -->
        <li id="login-btn">
          <button class="snipcart-customer-signin">
            <img src="../../assets/img/login-icon.png" alt="Login" style="height:20px; vertical-align:middle;">
          </button>
        </li>

        <!-- Account menu (solo se loggato) -->
        <li id="account-menu" style="display:none; position:relative;">
          <button id="account-toggle">Account ⌄</button>
          <ul id="account-dropdown" style="display:none; position:absolute; top:100%; left:0; background:white; padding:0.5rem; border:1px solid #ccc; border-radius:5px; list-style:none; min-width:150px; box-shadow:0 2px 6px rgba(0,0,0,0.15); z-index:5000;">
            <li>
              <button id="account-info" class="snipcart-customer-signin" style="background:none; border:none; cursor:pointer; padding:5px 10px; width:100%; text-align:left;">
                Il mio account
              </button>
            </li>
            <li>
              <button class="snipcart-customer-signout" style="background:none; border:none; cursor:pointer; padding:5px 10px; width:100%; text-align:left;">
                Esci
              </button>
            </li>
          </ul>
        </li>
      </ul>
      <div class="hamburger">☰</div>
    `;
  }

  // Gestione hamburger menu (overlay fullscreen)
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

  // Caricamento footer
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    fetch(links.footer)
      .then(response => response.text())
      .then(data => {
        footerPlaceholder.innerHTML = data;
      })
      .catch(error =>
        console.error("Errore nel caricamento del footer:", error)
      );
  }

  // Gestione login/logout con Snipcart
  document.addEventListener("snipcart.ready", () => {
    const loginBtn = document.getElementById("login-btn");
    const accountMenu = document.getElementById("account-menu");
    const accountToggle = document.getElementById("account-toggle");
    const accountDropdown = document.getElementById("account-dropdown");
    const accountInfo = document.getElementById("account-info");

    // Aggiorna lo stato quando cambia il customer
    window.Snipcart.store.subscribe(() => {
      const state = window.Snipcart.store.getState();
      const customer = state.customer;

      console.log("Snipcart stato utente:", customer.status);

      if (customer.status === "SignedIn") {
        if (loginBtn) loginBtn.style.display = "none";
        if (accountMenu) accountMenu.style.display = "block";

        if (accountInfo) accountInfo.textContent = "Il mio account";
      } else {
        if (loginBtn) loginBtn.style.display = "block";
        if (accountMenu) accountMenu.style.display = "none";
        if (accountDropdown) accountDropdown.style.display = "none";
      }
    });

    // Gestione dropdown Account
    if (accountToggle) {
      accountToggle.addEventListener("click", () => {
        if (accountDropdown.style.display === "none" || accountDropdown.style.display === "") {
          accountDropdown.style.display = "block";
        } else {
          accountDropdown.style.display = "none";
        }
      });
    }
  });
});
// fine common.js
