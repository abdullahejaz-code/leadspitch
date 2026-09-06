/* LeadsPitch global site search
   - Injects a search button into the header nav (desktop + mobile)
   - Live search overlay that auto-updates on every keystroke
   - Searches: niches, datasets/plans, bundles, membership, pages, FAQ
   - Highlights matched text and ranks results by relevance
   - Works on root pages and industries/*.html (path-aware)
*/
(function () {
  "use strict";

  if (window.__LS_SEARCH_INIT__) return;
  window.__LS_SEARCH_INIT__ = true;

  // Auto-inject the stylesheet (kept in the same folder as search.js)
  var basePath = /\/industries\//.test(location.pathname) ? "../" : "";
  var cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.href = basePath + "search.css";
  document.head.appendChild(cssLink);

  var DATA = window.LEADSPITCH_SEARCH_DATA;
  if (!DATA) {
    setTimeout(function () {
      DATA = window.LEADSPITCH_SEARCH_DATA;
      if (DATA) boot();
    }, 300);
    return;
  }
  boot();

  function boot() {
    var BASE = /\/industries\//.test(location.pathname) ? "../" : "";

    /* ── Build unified search records ─────────────────────────── */
    var records = [];

    DATA.niches.forEach(function (n) {
      records.push({
        type: "niche",
        label: "Niche",
        title: n.name,
        url: BASE + n.url,
        external: false,
        _t: n.name.toLowerCase(),
        _k: (n.keywords || []).join(" ").toLowerCase(),
        _b: n.desc.toLowerCase()
      });
    });

    DATA.niches.forEach(function (n) {
      (n.plans || []).forEach(function (p) {
        records.push({
          type: "plan",
          label: "Dataset",
          group: n.name,
          title: p.plan + " — " + n.name,
          subtitle: p.plan + " dataset",
          price: p.price,
          member: p.member,
          emails: p.emails,
          leads: p.leads,
          url: p.link || n.url,
          pageUrl: BASE + n.url,
          external: /^https?:/.test(p.link || ""),
          _t: (p.plan + " " + n.name).toLowerCase(),
          _k: n.name.toLowerCase() + " " + (n.keywords || []).join(" "),
          _b: [p.emails, p.leads, p.price, p.member, n.desc].filter(Boolean).join(" ").toLowerCase()
        });
      });

    DATA.bundles.forEach(function (b) {
      records.push({
        type: "bundle",
        label: "Bundle",
        title: b.name,
        price: b.price25,
        member: b.price50,
        subtitle: "25K " + b.price25 + " / 50K " + b.price50 + " · save up to " + b.save,
        url: BASE + b.url,
        external: false,
        _t: b.name.toLowerCase(),
        _k: (b.includes || []).join(" ").toLowerCase() + " bundle combo save discount",
        _b: b.desc.toLowerCase()
      });
    });

    DATA.memberships.forEach(function (m) {
      records.push({
        type: "membership",
        label: "Membership",
        title: m.name,
        price: m.price,
        subtitle: m.price + " · 40% off datasets",
        url: BASE + m.url,
        external: false,
        _t: m.name.toLowerCase(),
        _k: "membership subscribe 40% off discount subscription",
        _b: m.desc.toLowerCase()
      });
    });

    DATA.pages.forEach(function (p) {
      records.push({
        type: "page",
        label: "Page",
        title: p.title,
        subtitle: "Page",
        url: BASE + p.url,
        external: false,
        _t: p.title.toLowerCase(),
        _k: (p.keywords || "").toLowerCase(),
        _b: p.desc.toLowerCase()
      });
    });

    DATA.faqs.forEach(function (f) {
      records.push({
        type: "faq",
        label: "FAQ",
        title: f.q,
        subtitle: "FAQ",
        url: BASE + f.url,
        external: false,
        _t: f.q.toLowerCase(),
        _k: "faq help question answer " + f.a.toLowerCase(),
        _b: f.a.toLowerCase()
      });
    });

    /* ── Search & ranking ─────────────────────────────────────── */
    function tokenize(q) {
      var s = q.toLowerCase().replace(/[$]/g, "").trim();
      var words = s.match(/[\w\u00C0-\u024F'-]+/g) || [];
      return {
        raw: s,
        phrase: s,
        words: words.filter(function (w) { return w.length >= 2; })
      };
    }

    function scoreRec(rec, tok) {
      var score = 0;
      if (tok.phrase && tok.phrase.length >= 3 && rec._t.indexOf(tok.phrase) !== -1) score += 40;
      if (tok.phrase && tok.phrase.length >= 3 && rec._k.indexOf(tok.phrase) !== -1) score += 24;
      if (tok.words.length === 0) return 0;
      var titleHits = 0, keyHits = 0, bodyHits = 0;
      tok.words.forEach(function (w) {
        if (rec._t === w) score += 20;
        else if (rec._t.indexOf(w) === 0) score += 14;
        else if (rec._t.indexOf(w) !== -1) score += 10;
        if (rec._k.indexOf(w) !== -1) score += 6;
        if (rec._b.indexOf(w) !== -1) score += 2;
      });
      return score;
    }

    function search(q) {
      var tok = tokenize(q);
      if (!tok.words.length && tok.phrase.length < 2) return [];
      return records
        .map(function (r) { return { rec: r, s: scoreRec(r, tok) }; })
        .filter(function (x) { return x.s > 0; })
        .sort(function (a, b) { return b.s - a.s || a.rec.title.localeCompare(b.rec.title); })
        .slice(0, 60);
    }

    /* ── Highlighting ─────────────────────────────────────────── */
    function esc(s) {
      return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }

    function hl(text, tok) {
      var safe = esc(text);
      var phrases = tok.words.slice(0, 6);
      phrases.sort(function (a, b) { return b.length - a.length; });
      var hasMark = false;
      phrases.forEach(function (w) {
        var re = new RegExp("(" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
        safe = safe.replace(re, function (m) { hasMark = true; return "<mark>" + m + "</mark>"; });
      });
      if (tok.phrase && tok.phrase.length >= 3 && !hasMark) {
        var re = new RegExp("(" + tok.phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
        safe = safe.replace(re, "<mark>$1</mark>");
      }
      return safe;
    }

    /* ── Overlay DOM ──────────────────────────────────────────── */
    var overlay = document.createElement("div");
    overlay.className = "ls-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Search LeadsPitch");
    overlay.innerHTML =
      '<div class="ls-overlay__scrim"></div>' +
      '<div class="ls-overlay__box">' +
        '<div class="ls-overlay__head">' +
          '<svg class="ls-overlay__icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="7.5" cy="7.5" r="5.5"></circle><path d="M12 12l4 4"></path></svg>' +
          '<input class="ls-overlay__input" type="search" placeholder="Search niches, datasets, plans, prices, FAQs\u2026" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Search LeadsPitch">' +
          '<button class="ls-overlay__close" type="button" aria-label="Close search">' +
            '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15"></path></svg>' +
          '</button>' +
        '</div>' +
        '<div class="ls-overlay__hint" hidden>Searching everything \u2014 niches, datasets, prices, bundles, membership, FAQs</div>' +
        '<div class="ls-overlay__results" role="listbox" aria-label="Search results"></div>' +
        '<div class="ls-overlay__empty" hidden>No results found. Try another term.</div>' +
      '</div>';

    document.body.appendChild(overlay);

    var scrim = overlay.querySelector(".ls-overlay__scrim");
    var input = overlay.querySelector(".ls-overlay__input");
    var resultsEl = overlay.querySelector(".ls-overlay__results");
    var emptyEl = overlay.querySelector(".ls-overlay__empty");
    var hintEl = overlay.querySelector(".ls-overlay__hint");
    var closeBtn = overlay.querySelector(".ls-overlay__close");

    function openSearch() {
      overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
      setTimeout(function () { input.focus(); }, 30);
    }
    function closeSearch() {
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
      input.value = "";
      resultsEl.innerHTML = "";
      emptyEl.hidden = true;
      hintEl.hidden = false;
    }
    function isOpen() { return overlay.classList.contains("is-open"); }

    closeBtn.addEventListener("click", closeSearch);
    scrim.addEventListener("click", closeSearch);
    overlay.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeSearch();
    });

    /* ── Nav buttons ──────────────────────────────────────────── */
    var triggerSVG =
      '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="7.5" cy="7.5" r="5.5"></circle><path d="M12 12l4 4"></path></svg>';

    var desktopBtn = document.createElement("button");
    desktopBtn.type = "button";
    desktopBtn.className = "ls-search-trigger ls-search-trigger--desktop";
    desktopBtn.setAttribute("aria-label", "Search LeadsPitch");
    desktopBtn.innerHTML = triggerSVG;
    desktopBtn.addEventListener("click", openSearch);

    var themeToggle = document.querySelector(".theme-toggle");
    if (themeToggle && themeToggle.parentNode) {
      themeToggle.parentNode.insertBefore(desktopBtn, themeToggle.nextSibling);
    } else {
      var navPill = document.querySelector(".nav-pill");
      if (navPill && navPill.parentNode) navPill.parentNode.appendChild(desktopBtn);
    }

    // Mobile: put a search button next to the hamburger
    var mobileBtn = document.createElement("button");
    mobileBtn.type = "button";
    mobileBtn.className = "ls-search-trigger ls-search-trigger--mobile";
    mobileBtn.setAttribute("aria-label", "Search LeadsPitch");
    mobileBtn.innerHTML = triggerSVG;
    mobileBtn.addEventListener("click", openSearch);

    var navRight = document.querySelector(".nav-right");
    var navToggle = document.querySelector(".nav-toggle");
    var hasHamburger = !!(navRight || navToggle);
    if (navRight) {
      navRight.insertBefore(mobileBtn, navRight.firstChild);
    } else if (navToggle && navToggle.parentNode) {
      navToggle.parentNode.insertBefore(mobileBtn, navToggle);
    } else {
      // Pages without a hamburger menu (e.g. pricing-preview): keep the
      // desktop button visible on all screen sizes instead.
      desktopBtn.classList.add("ls-search-trigger--always");
    }

    // Mobile panel: add a "Search" entry at the top of the menu
    var mobileLinks = document.querySelector(".mobile-nav-links");
    if (mobileLinks) {
      var searchLink = document.createElement("button");
      searchLink.type = "button";
      searchLink.className = "ls-mobile-search";
      searchLink.innerHTML = triggerSVG + "<span>Search</span>";
      searchLink.addEventListener("click", function () {
        var panel = document.getElementById("mobile-nav");
        if (panel) panel.classList.remove("open");
        var t = document.querySelector(".nav-toggle");
        if (t) { t.setAttribute("aria-expanded", "false"); t.setAttribute("aria-label", "Open menu"); }
        document.body.style.overflow = "";
        openSearch();
      });
      mobileLinks.insertBefore(searchLink, mobileLinks.firstChild);
    }

    // "/" keyboard shortcut
    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && !/input|textarea|select/i.test(document.activeElement.tagName || "")) {
        e.preventDefault();
        openSearch();
      }
    });

    /* ── Live results rendering ───────────────────────────────── */
    var GROUP_ORDER = ["niche", "plan", "bundle", "membership", "page", "faq"];
    var GROUP_LABELS = {
      niche: "Niches",
      plan: "Datasets & plans",
      bundle: "Bundles",
      membership: "Membership",
      page: "Pages",
      faq: "FAQ"
    };
    var GROUP_CAPS = { niche: 8, plan: 8, bundle: 3, membership: 3, page: 6, faq: 6 };

    function render(results, tok) {
      resultsEl.innerHTML = "";
      if (!results.length) {
        resultsEl.innerHTML = "";
        emptyEl.hidden = false;
        hintEl.hidden = true;
        return;
      }
      emptyEl.hidden = true;
      hintEl.hidden = true;

      var byGroup = {};
      results.forEach(function (x) {
        (byGroup[x.rec.type] = byGroup[x.rec.type] || []).push(x);
      });

      GROUP_ORDER.forEach(function (g) {
        if (!byGroup[g]) return;
        var group = document.createElement("div");
        group.className = "ls-group";

        var head = document.createElement("div");
        head.className = "ls-group__head";
        head.textContent = GROUP_LABELS[g] || g;
        group.appendChild(head);

        byGroup[g].slice(0, GROUP_CAPS[g] || 8).forEach(function (x) {
          group.appendChild(renderItem(x.rec, x.s, tok));
        });
        resultsEl.appendChild(group);
      });
    }

    function renderItem(rec, score, tok) {
      var a = document.createElement("a");
      a.className = "ls-item ls-item--" + rec.type;
      a.setAttribute("role", "option");
      if (rec.external) {
        a.setAttribute("href", rec.url);
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener");
      } else {
        a.setAttribute("href", rec.url);
      }

      var left = document.createElement("span");
      left.className = "ls-item__main";

      var label = document.createElement("span");
      label.className = "ls-item__label";
      label.textContent = rec.label;
      left.appendChild(label);

      var title = document.createElement("span");
      title.className = "ls-item__title";
      title.innerHTML = hl(rec.title, tok);
      left.appendChild(title);

      var metaBits = [];
      if (rec.group) metaBits.push('<span class="ls-item__group">' + esc(rec.group) + "</span>");
      if (rec.price) metaBits.push('<span class="ls-item__price">' + esc(rec.price) + "</span>");
      if (rec.member && rec.member !== rec.price) metaBits.push('<span class="ls-item__member">40% off: ' + esc(rec.member) + "</span>");
      if (rec.emails) metaBits.push('<span class="ls-item__meta">' + esc(rec.emails) + " emails</span>");
      if (rec.leads) metaBits.push('<span class="ls-item__meta">' + esc(rec.leads) + " records</span>");
      if (rec.subtitle && rec.subtitle !== "Page") metaBits.push('<span class="ls-item__meta">' + esc(rec.subtitle) + "</span>");

      if (metaBits.length) {
        var meta = document.createElement("span");
        meta.className = "ls-item__meta-row";
        meta.innerHTML = metaBits.join("");
        left.appendChild(meta);
      }

      a.appendChild(left);

      var arrow = document.createElement("span");
      arrow.className = "ls-item__arrow";
      arrow.innerHTML = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"></path></svg>';
      a.appendChild(arrow);

      return a;
    }

    var debounce = null;
    input.addEventListener("input", function () {
      var q = input.value;
      clearTimeout(debounce);
      debounce = setTimeout(function () {
        render(search(q), tokenize(q));
      }, 90);
    });
  }
})();
