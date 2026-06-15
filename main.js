/* ============================================================================
   EXECUTIVE TILING — MAIN SCRIPT
   Reads content from content/site-content.js (window.SITE) and wires up the UI.
   Written defensively: every block checks its target exists before running,
   so the same file is safe to load on every page.
   ============================================================================ */
(function () {
  "use strict";
  var S = window.SITE || {};
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ── Inject business details into [data-content="key"] placeholders ─────── */
  function injectBusiness() {
    var b = S.business || {};
    $$("[data-content]").forEach(function (el) {
      var key = el.getAttribute("data-content");
      if (b[key] == null) return;
      if (el.tagName === "A") {
        if (key === "phoneDisplay") { el.href = "tel:" + (b.phoneDial || ""); el.textContent = b[key]; }
        else if (key === "email") { el.href = "mailto:" + b.email; el.textContent = b.email; }
        else { el.textContent = b[key]; }
      } else {
        el.textContent = b[key];
      }
    });
    // any element marked data-tel becomes a click-to-call link
    $$("[data-tel]").forEach(function (el) { el.href = "tel:" + (b.phoneDial || ""); });
  }

  /* ── Render service cards (services page + homepage feature) ────────────── */
  function renderServices() {
    var groups = [
      { key: "residential", host: "#svc-residential" },
      { key: "commercial", host: "#svc-commercial" },
      { key: "specialty", host: "#svc-specialty" },
      { key: "featured", host: "#svc-featured" } // homepage subset
    ];
    var n = 1;
    groups.forEach(function (g) {
      var host = $(g.host);
      if (!host || !S.services) return;
      var items = g.key === "featured"
        ? [].concat(S.services.residential.slice(0, 3), S.services.commercial.slice(0, 1), S.services.specialty.slice(0, 1)).slice(0, 6)
        : S.services[g.key];
      if (!items) return;
      host.innerHTML = items.map(function (it) {
        var num = ("0" + (n++)).slice(-2);
        return '<article class="svc-card reveal">' +
          '<span class="svc-card__num">' + num + '</span>' +
          '<h4>' + it.title + '</h4>' +
          '<p>' + it.desc + '</p>' +
          '</article>';
      }).join("");
    });
  }

  /* ── Render gallery + filtering ─────────────────────────────────────────── */
  function renderGallery() {
    var grid = $("#gal-grid");
    if (!grid || !S.gallery) return;
    var limit = parseInt(grid.getAttribute("data-limit") || "0", 10);
    var items = limit ? S.gallery.slice(0, limit) : S.gallery;
    var TONE = {
      bathrooms: "tile-ph--marble", kitchens: "tile-ph--warm",
      commercial: "tile-ph--graphite", waterproofing: "tile-ph--dark",
      outdoor: "tile-ph--stone", residential: "tile-ph--stone"
    };
    grid.innerHTML = items.map(function (it) {
      var bg = it.image
        ? ' style="background-image:url(\'' + it.image + '\')"'
        : "";
      var cls = "tile-ph " + (it.image ? "tile-ph--has-img" : (TONE[it.category] || "tile-ph--stone"));
      return '<article class="gal-item reveal" data-cat="' + it.category + '">' +
        '<div class="' + cls + '"' + bg + '></div>' +
        '<div class="gal-item__cap"><span>' + it.category + '</span><strong>' + it.title + '</strong></div>' +
        '</article>';
    }).join("");

    var filter = $("#gal-filter");
    if (!filter) return;
    filter.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      $$("button", filter).forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var cat = btn.getAttribute("data-filter");
      $$(".gal-item", grid).forEach(function (item) {
        var show = cat === "all" || item.getAttribute("data-cat") === cat;
        item.classList.toggle("hide", !show);
      });
    });
  }

  /* ── Render testimonials ────────────────────────────────────────────────── */
  function renderTestimonials() {
    var host = $("#testimonial-grid");
    if (!host || !S.testimonials) return;
    var limit = parseInt(host.getAttribute("data-limit") || "0", 10);
    var items = limit ? S.testimonials.slice(0, limit) : S.testimonials;
    host.innerHTML = items.map(function (t) {
      return '<figure class="quote-card reveal">' +
        '<span class="quote-card__mark">&ldquo;</span>' +
        '<blockquote>' + t.quote + '</blockquote>' +
        '<cite><b>' + t.author + '</b><span>' + t.location + (t.type ? ' &middot; ' + t.type : "") + '</span></cite>' +
        '</figure>';
    }).join("");
  }

  /* ── Render rotating trust strip ────────────────────────────────────────── */
  function renderStrip() {
    var track = $("#trust-strip");
    if (!track || !S.trustLines) return;
    var one = S.trustLines.map(function (l) { return "<span>" + l + "</span>"; }).join("");
    track.innerHTML = one + one; // duplicated for seamless marquee
  }

  /* ── Header scroll state ────────────────────────────────────────────────── */
  function header() {
    var hdr = $("#hdr");
    if (!hdr) return;
    var onScroll = function () { hdr.classList.toggle("scrolled", window.scrollY > 24); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ── Mobile nav toggle ──────────────────────────────────────────────────── */
  function nav() {
    var navEl = $("#nav");
    var burger = $("#burger");
    if (!navEl || !burger) return;
    var toggle = function (open) {
      navEl.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    };
    burger.addEventListener("click", function () { toggle(!navEl.classList.contains("open")); });
    $$("#nav .nav__links a").forEach(function (a) { a.addEventListener("click", function () { toggle(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") toggle(false); });
  }

  /* ── Active nav link ────────────────────────────────────────────────────── */
  function activeLink() {
    var path = location.pathname.split("/").pop() || "index.html";
    $$("#nav .nav__links a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === path || (path === "index.html" && (href === "index.html" || href === "./"))) {
        a.setAttribute("aria-current", "page");
      }
    });
  }

  /* ── Scroll reveal ──────────────────────────────────────────────────────── */
  function reveal() {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ── Forms (no backend — show confirmation, ready to wire up later) ─────── */
  function forms() {
    $$("form[data-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        var success = $("#" + form.getAttribute("data-success"));
        if (success) {
          form.style.display = "none";
          success.classList.add("show");
          success.setAttribute("tabindex", "-1");
          success.focus();
        }
        /* TO CONNECT REAL SUBMISSIONS: send `new FormData(form)` to your
           email service / Formspree / backend endpoint here. */
      });
    });
  }

  /* ── Footer year ────────────────────────────────────────────────────────── */
  function year() { var y = $("#year"); if (y) y.textContent = new Date().getFullYear(); }

  document.addEventListener("DOMContentLoaded", function () {
    injectBusiness();
    renderServices();
    renderGallery();
    renderTestimonials();
    renderStrip();
    header();
    nav();
    activeLink();
    forms();
    year();
    reveal(); // last, after dynamic content is in the DOM
  });
})();
