let isKeyboard = false;

function onKeydown(e) {
  if (
    [
      "Tab",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "Enter",
      "Space",
      "Escape",
    ].includes(e.key)
  ) {
    if (!isKeyboard) {
      isKeyboard = true;
      document.body.classList.remove("mouse-navigation");
      document.body.classList.add("keyboard-navigation");
    }
  }
}

function onMouseMove() {
  if (isKeyboard) {
    isKeyboard = false;
    document.body.classList.remove("keyboard-navigation");
    document.body.classList.add("mouse-navigation");
  }
}

function cleanup() {
  document.removeEventListener("keydown", onKeydown);
  document.removeEventListener("mousemove", onMouseMove);
  isKeyboard = false;
}

// Auto-initialisation
document.addEventListener("keydown", onKeydown);
document.addEventListener("mousemove", onMouseMove);
document.body.classList.add("mouse-navigation");

// Support transitions Astro
document.addEventListener("astro:before-swap", cleanup);
document.addEventListener("astro:after-swap", () => {
  document.addEventListener("keydown", onKeydown);
  document.addEventListener("mousemove", onMouseMove);
  document.body.classList.add("mouse-navigation");
});
