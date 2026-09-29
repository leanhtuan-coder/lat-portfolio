/**
 * Kumo design layer — color mode switch.
 *
 * The Kumo token set in assets/css/kumo-design.css is defined for both modes;
 * this only flips `data-mode` on <html> and remembers the choice. The initial
 * value is resolved by an inline script in <head> so there is no flash.
 */
(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.getElementById("kumo-mode-toggle");
  var themeColor = document.querySelector('meta[name="theme-color"]');

  var THEME_COLORS = { dark: "#111111", light: "#fbfbfb" };

  function currentMode() {
    return root.getAttribute("data-mode") === "light" ? "light" : "dark";
  }

  function applyMode(mode) {
    root.setAttribute("data-mode", mode);

    if (themeColor) themeColor.setAttribute("content", THEME_COLORS[mode]);

    if (toggle) {
      var goingTo = mode === "dark" ? "light" : "dark";
      toggle.setAttribute("aria-pressed", String(mode === "light"));
      toggle.setAttribute("aria-label", "Switch to " + goingTo + " mode");
    }

    try {
      localStorage.setItem("kumo-mode", mode);
    } catch (e) {
      /* storage unavailable — the mode still applies for this page view */
    }
  }

  // Sync the button and meta tag with whatever the inline script resolved.
  applyMode(currentMode());

  if (toggle) {
    toggle.addEventListener("click", function () {
      applyMode(currentMode() === "dark" ? "light" : "dark");
    });
  }
})();
