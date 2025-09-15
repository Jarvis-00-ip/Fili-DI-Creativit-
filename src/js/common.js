// src/js/common.js
document.addEventListener("DOMContentLoaded", () => {
  const inHtmlFolder = window.location.pathname.includes("/html/");

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
        prodotti: "html/prodotti.html",
        contatti: "html/contatti.html",
        carrello: "html/carrello.html",
        chisiamo: "html/chisiamo.html",
        footer: "html/footer.html",
      };

  // 🔧 Inietta SOLO se la navbar è vuota (così Index può avere una navbar statica sua)
  const navbar = document.querySelector(".navbar");
  if (navbar && navbar.childElementCount === 0) {
    navbar.innerHTML = `
      <div class="logo">Fili di Creatività</div>
      <ul class="nav-links">
        <li><a href="${links.home}">Home</a></li>
        <li><a href="${links.prodotti}">Prodotti</a></li>
        <li><a href="${links.contatti}">Contatti</a></li>
        <li><a href="${links.carrello}">Carrello</a></li>
        <li><a href="${links.chisiamo}">Chi siamo</a></li>
        <li><button class="snipcart-customer-signin">👤 Accedi</button></li>
        <li><button class="snipcart-customer-signout">🚪 Esci</button></li>
      </ul>
      <div class="hamburger">☰</div>
    `;
  }

  // Burger overlay + fix overlay fantasma
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

  // Footer dinamico
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    fetch(links.footer)
      .then((r) => r.text())
      .then((html) => (footerPlaceholder.innerHTML = html))
      .catch((err) => console.error("Errore footer:", err));
  }
});
