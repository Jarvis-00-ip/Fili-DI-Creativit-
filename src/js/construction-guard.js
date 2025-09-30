// Costruzione Guard
// Blocco di protezione per pagine non pubbliche

(function () {
  // 🔑 Modifica qui la chiave di accesso
  const secretKey = "beta=12345";

  // Pagina 404 (modifica se cambia percorso)
  const notFoundPage = "/src/html/404.html";

  // Se l'URL non contiene la chiave segreta → redirect a 404
  if (!window.location.search.includes(secretKey)) {
    window.location.replace(notFoundPage);
  }
})();
