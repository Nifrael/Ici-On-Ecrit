let isOpen = false;

function init() {
  const btn = document.querySelector(".menu-button");
  const menu = document.querySelector(".menu");

  if (!btn || !menu) return;

  function open() {
    isOpen = true;
    btn.classList.add("active");
    menu.classList.add("show");
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "Fermer le menu");
    menu.setAttribute("aria-hidden", "false");

    setTimeout(() => {
      const firstLink = menu.querySelector("a");
      if (firstLink) firstLink.focus();
    }, 100);
  }

  function close() {
    isOpen = false;
    btn.classList.remove("active");
    menu.classList.remove("show");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Ouvrir le menu");
    menu.setAttribute("aria-hidden", "true");
    btn.focus();
  }

  function toggle() {
    isOpen ? close() : open();
  }

  function onBtnClick() {
    toggle();
  }

  function onBtnKey(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  }

  function onDocKey(e) {
    if (e.key === "Escape" && isOpen) close();
  }

  function onDocClick(e) {
    if (isOpen && !btn.contains(e.target) && !menu.contains(e.target)) {
      close();
    }
  }

  // Ajouter les écouteurs
  btn.addEventListener("click", onBtnClick);
  btn.addEventListener("keydown", onBtnKey);
  document.addEventListener("keydown", onDocKey);
  document.addEventListener("click", onDocClick);

  // Configuration ARIA initiale
  btn.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-hidden", "true");

  // Nettoyage pour transitions Astro
  function cleanup() {
    btn.removeEventListener("click", onBtnClick);
    btn.removeEventListener("keydown", onBtnKey);
    document.removeEventListener("keydown", onDocKey);
    document.removeEventListener("click", onDocClick);

    if (isOpen) close();
    isOpen = false;
  }

  document.addEventListener("astro:before-swap", cleanup);
}

// Auto-initialisation
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// Réinitialisation après transitions Astro
document.addEventListener("astro:after-swap", init);
