// ===== MAIN.JS =====
// Entry point: called after DOM is ready.
// Order matters: render → createIcons → interactions

document.addEventListener("DOMContentLoaded", () => {
  // 1. Render all dynamic content from DATA
  renderAll();

  // 2. Initialise Lucide icons (must run AFTER renderAll inserts icon elements)
  lucide.createIcons();

  // 3. Wire up all interactions
  initInteractions();

  // 4. Set initial dark mode class
  document.documentElement.classList.add("dark");
});
