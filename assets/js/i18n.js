/**
 * Bilingual switch (English / Vietnamese).
 *
 * The page markup stays untouched: instead of tagging several hundred
 * elements with data-i18n, each rule below names a CSS selector and the
 * English text found there is the dictionary key. The original English is
 * cached on first switch, so returning to English restores it exactly.
 *
 * Translation policy — proper nouns are left in English on purpose:
 * organisation and product names, job titles as they appear on the CV,
 * technology names, award and certificate titles. Only prose is translated.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "kumo-lang";
  var DEFAULT_LANG = "en";

  /* ------------------------------------------------------------------ *
   * Where translatable copy lives.
   *   text : replace this element's own text nodes, leaving child
   *          elements (icons, <strong>) in place
   *   html : replace innerHTML — for copy that carries inline markup
   *   attr : replace the named attributes
   *   dates: swap the single word "Present" inside a date range
   * ------------------------------------------------------------------ */
  var RULES = [
    { sel: ".navbar-link", mode: "text" },
    { sel: ".article-title", mode: "title" },
    { sel: ".about-text p:not(.typing-wrapper)", mode: "html" },
    { sel: ".typing-static", mode: "text" },
    { sel: ".service-title, .organizations-title, .interests-title, .skills-title", mode: "text" },
    { sel: ".service-item-title", mode: "text" },
    { sel: ".service-item-text", mode: "text" },
    { sel: ".stat-label", mode: "text" },
    { sel: ".timeline .title-wrapper .h3", mode: "text" },
    { sel: ".timeline-item-title", mode: "text" },
    { sel: ".timeline-item > div > span", mode: "dates" },
    { sel: ".timeline-text", mode: "html" },
    { sel: ".contact-title", mode: "text" },
    { sel: ".contact-info time, .contact-info address", mode: "text" },
    { sel: ".contact-card-value", mode: "text" },
    { sel: ".contact-card-label", mode: "text" },
    { sel: ".contact-intro", mode: "html" },
    { sel: ".form-title", mode: "text" },
    { sel: ".skill-category-title", mode: "text" },
    { sel: ".skills-item .h5", mode: "text" },
    { sel: ".toolkit-group-title", mode: "text" },
    { sel: ".kumo-tag", mode: "text" },
    { sel: ".filter-item button, .select-item button", mode: "text" },
    { sel: ".select-value", mode: "text" },
    { sel: ".blog-item-title", mode: "text" },
    { sel: ".blog-text", mode: "text" },
    { sel: ".blog-badge", mode: "text" },
    { sel: ".blog-cta span", mode: "text" },
    { sel: ".project-title", mode: "text" },
    { sel: ".project-category", mode: "text" },
    { sel: ".form-btn span", mode: "text" },
    { sel: ".info_more-btn span", mode: "text" },
    { sel: ".cv-btn-premium", mode: "text" },
    { sel: ".form-input", mode: "attr", attrs: ["placeholder", "aria-label"] },
  ];

  var norm = function (s) {
    return String(s == null ? "" : s).replace(/\s+/g, " ").trim();
  };

  /* Dictionary: normalised English -> Vietnamese. Anything absent is left
     as it stands, which is how proper nouns pass through untranslated. */
  var VI = window.KUMO_VI_STRINGS || {};

  /* ------------------------------------------------------------------ */

  var cache = new WeakMap(); // element -> { html, text, attrs }

  function remember(el, mode, attrs) {
    if (cache.has(el)) return cache.get(el);
    var rec = {};
    if (mode === "title") {
      rec.title = el.getAttribute("data-text");
      if (rec.title == null) rec.title = norm(el.textContent);
    } else if (mode === "html") {
      rec.html = el.innerHTML;
    } else if (mode === "attr") {
      rec.attrs = {};
      attrs.forEach(function (a) { rec.attrs[a] = el.getAttribute(a); });
    } else {
      rec.nodes = [];
      el.childNodes.forEach(function (n) {
        if (n.nodeType === 3) rec.nodes.push({ node: n, value: n.nodeValue });
      });
    }
    cache.set(el, rec);
    return rec;
  }

  function applyRule(rule, lang) {
    var nodes = document.querySelectorAll(rule.sel);
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var rec = remember(el, rule.mode, rule.attrs);

      if (rule.mode === "html") {
        if (lang === "en") { el.innerHTML = rec.html; continue; }
        var t = VI[norm(rec.html)];
        if (t) el.innerHTML = t;
        continue;
      }

      if (rule.mode === "attr") {
        rule.attrs.forEach(function (a) {
          var orig = rec.attrs[a];
          if (orig == null) return;
          if (lang === "en") { el.setAttribute(a, orig); return; }
          var v = VI[norm(orig)];
          if (v) el.setAttribute(a, v);
        });
        continue;
      }

      if (rule.mode === "title") {
        // The title typer owns textContent and reads data-text each tick.
        var src = el.getAttribute("data-text");
        if (src == null) { src = norm(el.textContent); el.setAttribute("data-text", src); }
        if (rec.title == null) rec.title = src;
        var want = lang === "en" ? rec.title : (VI[norm(rec.title)] || rec.title);
        el.setAttribute("data-text", want);
        if (el.classList.contains("typed")) el.textContent = want;
        continue;
      }

      if (rule.mode === "dates") {
        rec.nodes.forEach(function (n) {
          n.node.nodeValue = lang === "en"
            ? n.value
            : n.value.replace(/\bPresent\b/g, "Hiện tại");
        });
        continue;
      }

      // "text": only this element's own text nodes change, so icons and
      // nested markup survive the swap.
      rec.nodes.forEach(function (n) {
        if (lang === "en") { n.node.nodeValue = n.value; return; }
        var key = norm(n.value);
        if (!key) return;
        var vi = VI[key];
        if (!vi) return;
        // The key is whitespace-normalised while the node is raw source, so
        // the translation replaces the node's content outright and only the
        // surrounding whitespace is carried over — a substring replace would
        // silently miss any text node that wraps across lines.
        var edges = /^(\s*)[\s\S]*?(\s*)$/.exec(n.value);
        n.node.nodeValue = edges[1] + vi + edges[2];
      });
    }
  }

  function currentLang() {
    return document.documentElement.getAttribute("data-lang") === "vi" ? "vi" : "en";
  }

  function apply(lang) {
    RULES.forEach(function (r) { applyRule(r, lang); });

    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang === "vi" ? "vi" : "en");

    document.querySelectorAll("[data-lang-btn]").forEach(function (b) {
      var on = b.getAttribute("data-lang-btn") === lang;
      b.setAttribute("aria-pressed", String(on));
      b.classList.toggle("active", on);
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode */ }

    document.dispatchEvent(new CustomEvent("kumo:langchange", { detail: { lang: lang } }));
  }

  function init() {
    var lang = DEFAULT_LANG;
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "vi" || stored === "en") lang = stored;
    } catch (e) { /* ignore */ }

    apply(lang);

    document.querySelectorAll("[data-lang-btn]").forEach(function (b) {
      b.addEventListener("click", function () {
        apply(b.getAttribute("data-lang-btn"));
      });
    });
  }

  if (document.readyState === "complete") {
    init();
  } else {
    // Not just "loading": a deferred script runs at "interactive", which is
    // still before DOMContentLoaded — and before premium-effects.js has
    // captured the article titles into data-text. Waiting for the event
    // means this runs after that handler, so the titles survive.
    document.addEventListener("DOMContentLoaded", init);
  }

  window.KumoI18n = { apply: apply, current: currentLang };
})();
