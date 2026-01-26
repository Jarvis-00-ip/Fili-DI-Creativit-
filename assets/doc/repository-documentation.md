# Fili di Creatività - Repository Documentation

## 📋 Panoramica del Sito

**Fili di Creatività** è un sito e-commerce artigianale che vende prodotti fatti a mano, principalmente candele personalizzate, tessuti personalizzati, oggetti e borracce/tazze. Il sito è costruito con HTML, CSS e JavaScript vanilla (senza framework), con un'architettura modulare e stile moderno.

---

## 🗂️ Struttura della Repository

```
Fili-DI-Creativit-/
├── index.html              # Homepage principale
├── favicon.ico             # Icona del sito
├── CNAME                   # Configurazione dominio personalizzato
├── README.md               # Documentazione base
│
├── assets/                 # Risorse multimediali
│   ├── img/               # Immagini organizzate per categoria
│   │   ├── bouquet/       # 33 immagini bouquet (gallery + hero)
│   │   ├── candele/       # 20 immagini candele
│   │   ├── oggetti/       # 14 immagini oggetti personalizzati
│   │   ├── tessuti/       # 7 immagini tessuti
│   │   ├── tazze-borracce/# 1 immagine
│   │   ├── chi-siamo/     # 4 immagini "chi siamo"
│   │   ├── contatti/      # 1 immagine
│   │   ├── home/          # 2 immagini homepage
│   │   └── common/        # 11 immagini condivise (logo, ecc.)
│   │
│   ├── doc/               # Documentazione extra
│   └── foto stock/        # Foto di riserva
│
└── src/                   # Cartella sorgente principale
    ├── html/              # Pagine HTML
    ├── css/               # Fogli di stile
    └── js/                # Script JavaScript
```

---

## 📄 Architettura delle Pagine HTML

### **Pagine Principali** (`src/html/`)

1. **Categorie Prodotti**:
   - `candele.html` - Catalogo candele (11 KB)
   - `tessuti.html` - Catalogo tessuti
   - `oggetti.html` - Catalogo oggetti personalizzati
   - `tazze-borracce.html` - Catalogo tazze e borracce
   - `prodotti.html` - Pagina principale prodotti (16 KB, con carousel)

2. **Pagine Anteprima** (Mini-landing per categorIe):
   - `candele-anteprima.html`
   - `tessuti-anteprima.html`
   - `oggetti-anteprima.html`
   - `tazze-borracce-anteprima.html`

3. **Pagine Informative**:
   - `chisiamo.html` - Chi siamo
   - `contatti.html` - Pagina contatti con form
   - `bouquet-story.html` - Storia dei bouquet

4. **Componenti**:
   - `footer.html` - Footer condiviso (iniettato dinamicamente)

### **Pagine Prodotto Dettagliate** (`src/html/shop/`)

Organizzate in 4 sottocartelle per categoria:

#### **1. Candele** (`shop/candele/` - 16 prodotti):
- Alberelli: `alberello-a-spiga.html`, `alberello-classico.html`, `alberello-spirale.html`
- Bouquet: `bouquet-classico.html` ⭐ (con slider 28 immagini), `bouquet-con-vaso-in-ceramica.html`
- Candele in vasetto: 4 varianti (liscio grande/medio, rigato con albero/fiore)
- Fiori: `fiori-grandi.html`, `fiori-medi.html`, `fiori-piccoli.html`
- Personaggi: `dea-bendata.html`, `lomino-di-marzapane.html`, `orsetto-classico.html`, `schiaccianoci.html`

#### **2. Tessuti** (`shop/personalizzazione-tessuti/` - 5 prodotti):
- `bavaglino.html`
- `kit-nascita.html`
- `porta-ciuccio.html`
- `porta-ciuccio-pack.html`
- `sacchetta.html`

#### **3. Oggetti** (`shop/personalizzazione-oggetti/` - 2 prodotti):
- `portachiavi.html`
- `gadget.html`

#### **4. Borracce** (`shop/borracce/` - 2 prodotti):
- `tazza.html`
- `borraccia.html`

---

## 🎨 Architettura CSS

### **Fogli di Stile Globali** (`src/css/`)

1. **`common.css`** (9.5 KB) - **Fondamentale**:
   - Variabili CSS (`:root`)
   - Reset e base styles
   - **Navbar** dinamica (logo, menu, hamburger mobile)
   - **Footer** condiviso
   - Utilità generali (buttons, cards, etc.)

2. **`style-base.css`** (6.2 KB):
   - Design system base
   - Typography
   - Layout patterns
   - Componenti riutilizzabili

3. **`mobile-menu.css`** (2 KB):
   - Menu hamburger responsivo
   - Overlay e animazioni mobile

### **Fogli di Stile per Pagine**

Ogni pagina ha il suo CSS dedicato:

- **Homepage**: `home.css`, `index.css`
- **Prodotti**: `prodotti.css` (carousel), `product.css` (pagina singola con slider)
- **Categorie**: `candele.css`, `tessuti.css`, `oggetti.css`, `tazze-borracce.css`
- **Anteprime**: `candele-anteprima.css`, etc.
- **Info**: `chi-siamo.css`, `contatti.css`, `bouquet-story.css`
- **E-commerce**: `carrello.css` (Snipcart styling)

### **Architettura Slider Prodotto** (`product.css`)

Il sistema slider è stato recentemente implementato per `bouquet-classico.html`:

```css
.product-slider-container  /* Contenitore principale */
.product-slider-track      /* Track per le immagini */
.product-slide             /* Singola immagine */
.slider-btn                /* Pulsanti ‹ › */
.slider-counter            /* Contatore "1 / 28" */
```

---

## ⚙️ Architettura JavaScript

### **Script Globali** (`src/js/`)

1. **`common.js`** (5.8 KB) - **CORE DEL SITO**:
   - **Iniezione Navbar**: Genera il menu dinamicamente
   - **Iniezione Footer**: Carica `footer.html` in tutte le pagine
   - **Path Resolution**: Calcola percorsi corretti in base alla profondità del file
   - **Mobile Menu**: Gestisce apertura/chiusura hamburger
   - **Responsive**: Adatta navbar a desktop/mobile
   
   **Funzionalità chiave**:
   - `calculateDepth()` - Determina livello del file
   - `createNavbar()` - Crea HTML navbar
   - `loadFooter()` - Inietta footer
   - Gestore eventi menu mobile

2. **`home.js`** (2 KB):
   - Gestione video hero (autoplay, fallback immagine)
   - Animazioni scroll

3. **`parallax.js`** (700 B):
   - Effetti parallax per sezioni

4. **`scroll-animation.js`** (434 B):
   - Animazioni reveal on scroll

5. **`scrollButton.js`** (629 B):
   - Pulsante "torna su"

### **Script Inline**

- **Slider Prodotto**: `bouquet-classico.html` ha uno script inline (90 righe) che:
  - Carica dinamicamente 28 immagini
  - Gestisce navigazione (arrow + swipe)
  - Aggiorna counter "X / Y"

---

## 🏗️ Pattern Architetturali

### **1. Component Injection Pattern**

Il sito usa un pattern di "iniezione" per navbar e footer:

```html
<!-- In ogni pagina -->
<nav class="navbar"></nav>
<!-- common.js lo popola dinamicamente -->
```

**Vantaggi**:
- Unico punto di modifica per navbar/footer
- Manutenzione semplificata
- Consistenza su tutte le pagine

### **2. Modular CSS Architecture**

```
common.css        → Base + Variabili + Componenti globali
style-base.css    → Design system
[pagina].css      → Stili specifici pagina
mobile-menu.css   → Override mobile (caricato ultimo)
```

### **3. Path-Aware JavaScript**

`common.js` calcola automaticamente la profondità dei file:

```javascript
function calculateDepth() {
  const pathname = window.location.pathname;
  // Conta quanti livelli sotto root
  // index.html → depth 0
  // src/html/candele.html → depth 2
  // src/html/shop/candele/bouquet.html → depth 4
}
```

Questo permette link relativi corretti da qualsiasi profondità.

### **4. Progressive Enhancement**

- Immagini: `loading="lazy"` per performance
- Video: Fallback a immagine statica
- JavaScript: Non-blocking, `defer` attributes

---

## 🛒 Integrazione E-commerce

Il sito usa **Snipcart v3.7.1** per il carrello:

- **Configurazione**: Chiave API in ogni prodotto
- **Stili Custom**: `carrello.css` per branding
- **Prodotti**: Alcuni hanno pulsante "Aggiungi al carrello", altri "Richiedi informazioni" (mailto)

---

## 📱 Responsive Design

### **Breakpoint Principali**:
- Desktop: `> 768px`
- Mobile: `≤ 768px`

### **Strategia Mobile-First**:
1. Menu hamburger (`mobile-menu.css`)
2. CSS Grid/Flexbox per layout fluidi
3. Aspect ratios per immagini
4. Touch gestures (slider swipe support)

---

## 🌟 Caratteristiche Speciali

### **1. Carousel 3D** (`prodotti.html`)
- Mostra 3 prodotti in evidenza
- Navigazione frecce + dots
- Responsive

### **2. Slider Prodotto Avanzato** (`bouquet-classico.html`)
- 28 immagini gallery
- Counter numerico "1 / 28"
- Swipe touch support
- Lazy loading

### **3. Video Hero** (`index.html`)
- Video autoplay con overlay
- Fallback immagine statica
- Link cliccabile

---

## 📊 Statistiche Repository

- **Pagine HTML**: ~40 file
- **CSS Files**: 20 file (~85 KB totali)
- **JS Files**: 5 file (~10 KB totali)
- **Immagini**: ~70 file organizzati per categoria
- **Prodotti Totali**: 25 pagine prodotto dettagliate

---

## 🔧 Modifiche Recenti

1. **Encoding Fix**: Sostituito `&euro;` con `€` in tutte le pagine
2. **Semantic HTML**: Aggiunto tag `<main>` in tutte le pagine
3. **Slider Implementation**: Creato slider immagini per Bouquet Classico
4. **JS Refactoring**: Migliorata logica path resolution in `common.js`
5. **Cleanup**: Rimossi script `window.FOOTER_SRC` inutilizzati

---

## 💡 Best Practices Implementate

✅ UTF-8 encoding ovunque  
✅ Semantic HTML5  
✅ Modular CSS architecture  
✅ Component-based structure  
✅ Lazy loading images  
✅ Mobile-first responsive  
✅ Accessibility (aria-labels, alt texts)  
✅ SEO meta tags  
✅ Performance optimizations  

---

## 🚀 Come Aggiungere Nuovi Prodotti

1. **Copia** un file prodotto esistente dalla categoria appropriata
2. **Modifica** il contenuto (titolo, prezzo, immagini, descrizione)
3. **Aggiorna** il file categoria (es. `candele.html`) per linkare il nuovo prodotto
4. **CSS**: Eredita automaticamente da `product.css`
5. **Navbar/Footer**: Iniettati automaticamente da `common.js`

---

## 📝 Note Tecniche

- **No Framework**: Vanilla HTML/CSS/JS puro
- **No Build Process**: File statici, deployment diretto
- **Hosting**: Configurato per GitHub Pages (CNAME presente)
- **Browser Support**: Moderno (ES6+, CSS Grid, Custom Properties)
