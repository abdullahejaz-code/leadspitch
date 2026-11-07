/* LeadsPitch pricing runtime
 * Reads window.LP_PRICING (pricing-data.js) and applies it to the page:
 *   - current price and strike-through "was" price
 *   - badges (text, tooltip, show/hide) and the featured highlight
 *   - Whop plan IDs used by the checkout modal
 *   - JSON-LD AggregateOffer low/high price
 * Loaded from <head> so prices are patched before first paint.
 */
(function () {
  'use strict';

  var CFG = window.LP_PRICING;
  if (!CFG) return;

  var CSS = [
    '.lp-was{display:inline-block;text-decoration:line-through;color:var(--faint,#8a919e);font-weight:600;white-space:nowrap;}',
    '.product-price-row .lp-was{font-family:var(--font-display,inherit);font-size:1.05rem;letter-spacing:-0.02em;}',
    '.industry-bundle-tier .lp-was{font-size:.8rem;}',
    '.bundle-tier .lp-was{font-size:.78rem;}',
    '.pricing-card__price .lp-was{font-size:.95rem;margin-right:.35rem;}'
  ].join('');

  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function injectStyle() {
    if (document.getElementById('lp-pricing-style')) return;
    var s = document.createElement('style');
    s.id = 'lp-pricing-style';
    s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  function setText(node, text) {
    if (node && text != null && node.textContent !== text) node.textContent = text;
  }

  function setUnitPrice(el, price) {
    // never blank a price out - an empty config value means "leave the page as-is"
    if (!el || !price) return;
    setText(el, price);
  }

  /* Insert/remove a struck-through price immediately before the live price element. */
  function applyWas(priceEl, was) {
    if (!priceEl || !priceEl.parentNode) return;
    var found = null;
    var prev = priceEl.previousSibling;
    if (prev && prev.nodeType === 1 && /\blp-was\b/.test(prev.className || '')) found = prev;
    if (!found) found = priceEl.parentNode.querySelector('.lp-was');

    if (was) {
      if (!found) {
        found = document.createElement('span');
        found.className = 'lp-was';
        priceEl.parentNode.insertBefore(found, priceEl);
      }
      if (found.textContent !== was) found.textContent = was;
    } else if (found && found.parentNode) {
      found.parentNode.removeChild(found);
    }
  }

  function saveText(v) {
    return /^save/i.test(v) ? v : 'Save up to ' + v;
  }

  function currentSlug() {
    var m =
      location.pathname.match(/\/industries\/([^\/]+?)(?:\.html)?\/?$/) ||
      location.pathname.match(/industries[\\\/]([^\\\/]+?)(?:\.html)?$/);
    return m ? decodeURIComponent(m[1]) : null;
  }

  function bundleTier(key) {
    var m = typeof key === 'string' && key.match(/^(.*)-(5k|25k|50k)(?:niche)?$/);
    if (!m || !CFG.bundles || !CFG.bundles[m[1]]) return null;
    var t = CFG.bundles[m[1]].tiers && CFG.bundles[m[1]].tiers[m[2]];
    return t ? { bundle: CFG.bundles[m[1]], tier: t } : null;
  }

  /* ---- Whop plan id lookup, used by the page's checkout modal ---- */
  function planId(key) {
    if (!key) return null;
    var b = bundleTier(key);
    if (b) return b.tier.planId || null;
    var slug = currentSlug();
    var ind = slug && CFG.industries && CFG.industries[slug];
    if (ind && ind.plans && ind.plans[key]) return ind.plans[key].planId || null;
    return null;
  }

  function planName(key) {
    if (!key) return null;
    var slug = currentSlug();
    var ind = slug && CFG.industries && CFG.industries[slug];
    if (ind && ind.plans && ind.plans[key] && ind.plans[key].name) return ind.plans[key].name;
    return null;
  }

  /* Full replacement for the page's inline `plans[planKey]` entry. */
  function checkout(key, fallback) {
    var id = planId(key);
    if (!id) return null;
    return {
      id: id,
      name: planName(key) || (fallback && fallback.name) || key
    };
  }

  /* ---- Section patchers ---- */
  function applyIndustryPlans(slug) {
    var ind = CFG.industries && CFG.industries[slug];
    if (!ind || !ind.plans) return;

    qsa('.product-card').forEach(function (card) {
      var btn = card.querySelector('[data-plan]');
      if (!btn) return;
      var plan = ind.plans[btn.getAttribute('data-plan')];
      if (!plan) return;

      var priceEl = card.querySelector('.product-price');
      setUnitPrice(priceEl, plan.price);
      applyWas(priceEl, plan.wasPrice);

      var nameEl = card.querySelector('.product-plan');
      if (nameEl && plan.name) setText(nameEl, plan.name);

      var badge = card.querySelector('.product-badge');
      if (badge) {
        var wrap = badge.parentNode;
        if (plan.badgeOn && plan.badge) {
          setText(badge, plan.badge);
          wrap.style.display = '';
          var tip = wrap.querySelector('.tooltip');
          if (tip && plan.badgeTip) setText(tip, plan.badgeTip);
        } else {
          wrap.style.display = 'none';
        }
      }

      if (plan.featured) card.classList.add('product-card--featured');
      else card.classList.remove('product-card--featured');

      var vol = card.querySelector('.product-subtitle-num');
      if (vol && plan.vol) setText(vol, plan.vol);
    });
  }

  function applyIndustryBundles() {
    if (!CFG.bundles) return;

    qsa('.industry-bundle-tier').forEach(function (tier) {
      var btn = tier.querySelector('[data-plan]');
      if (!btn) return;
      var b = bundleTier(btn.getAttribute('data-plan'));
      if (!b) return;
      var priceEl = tier.querySelector('.industry-bundle-tier-price');
      setUnitPrice(priceEl, b.tier.price);
      applyWas(priceEl, b.tier.wasPrice);
    });

    qsa('.industry-bundle-card').forEach(function (card) {
      var btn = card.querySelector('[data-plan]');
      if (!btn) return;
      var m = btn.getAttribute('data-plan').match(/^(.*)-(?:5k|25k|50k)niche$/);
      var bundle = m && CFG.bundles[m[1]];
      if (!bundle) return;
      var saveEl = card.querySelector('.industry-bundle-save');
      if (!saveEl) return;
      if (bundle.save) {
        setText(saveEl, saveText(bundle.save));
        saveEl.style.display = '';
      } else {
        saveEl.style.display = 'none';
      }
    });
  }

  function applyBundlesPage() {
    if (!CFG.bundles) return;

    qsa('.bundle-card').forEach(function (card) {
      var headBtn = card.querySelector('[data-plan]');
      if (!headBtn) return;
      var m = headBtn.getAttribute('data-plan').match(/^(.*)-(?:5k|25k|50k)$/);
      var bundle = m && CFG.bundles[m[1]];
      if (!bundle) return;

      var saveEl = card.querySelector('.bundle-save');
      if (saveEl) {
        if (bundle.save) {
          setText(saveEl, saveText(bundle.save));
          saveEl.style.display = '';
        } else {
          saveEl.style.display = 'none';
        }
      }

      qsa('.bundle-tier', card).forEach(function (tier) {
        var btn = tier.querySelector('[data-plan]');
        if (!btn) return;
        var t = bundleTier(btn.getAttribute('data-plan'));
        if (!t) return;
        var priceEl = tier.querySelector('.bundle-new-price');
        setUnitPrice(priceEl, t.tier.price);
        applyWas(priceEl, t.tier.wasPrice);
      });
    });
  }

  function paintHomeCard(card, cfg) {
    if (!card || !cfg) return;
    var priceEl = card.querySelector('.pricing-card__price');
    if (priceEl) {
      while (priceEl.firstChild) priceEl.removeChild(priceEl.firstChild);
      if (cfg.wasPrice) {
        var was = document.createElement('span');
        was.className = 'lp-was';
        was.textContent = cfg.wasPrice;
        priceEl.appendChild(was);
      }
      priceEl.appendChild(document.createTextNode(cfg.price || ''));
      if (cfg.unit) {
        priceEl.appendChild(document.createTextNode(' '));
        var span = document.createElement('span');
        span.textContent = cfg.unit;
        priceEl.appendChild(span);
      }
    }
    var badge = card.querySelector('.pricing-badge--sale, .member-perk');
    if (badge) {
      if (cfg.badgeOn && cfg.badge) {
        setText(badge, cfg.badge);
        badge.style.display = '';
      } else {
        badge.style.display = 'none';
      }
    }
  }

  function applyHome() {
    if (!CFG.home) return;
    var cards = qsa('.pricing-card');
    if (cards[0]) paintHomeCard(cards[0], CFG.home.single);
    if (cards[1]) paintHomeCard(cards[1], CFG.home.bundles);
  }

  function applyJsonLd() {
    var nums = [];
    qsa('.product-price, .industry-bundle-tier-price, .bundle-new-price').forEach(function (n) {
      var v = parseFloat(String(n.textContent).replace(/[^0-9.]/g, ''));
      if (!isNaN(v)) nums.push(v);
    });
    if (!nums.length) return;
    var fmt = function (n) {
      return String(parseFloat(n.toFixed(2)));
    };
    var low = fmt(Math.min.apply(null, nums));
    var high = fmt(Math.max.apply(null, nums));

    qsa('script[type="application/ld+json"]').forEach(function (s) {
      var obj;
      try {
        obj = JSON.parse(s.textContent);
      } catch (e) {
        return;
      }
      if (
        obj &&
        obj['@type'] === 'Product' &&
        obj.offers &&
        obj.offers['@type'] === 'AggregateOffer' &&
        obj.offers.lowPrice !== undefined
      ) {
        obj.offers.lowPrice = low;
        obj.offers.highPrice = high;
        s.textContent = JSON.stringify(obj, null, 2);
      }
    });
  }

  function run() {
    injectStyle();
    var slug = currentSlug();
    if (slug && CFG.industries && CFG.industries[slug]) {
      applyIndustryPlans(slug);
      applyIndustryBundles();
    }
    if (CFG.bundles && document.querySelector('.bundle-card')) applyBundlesPage();
    applyHome();
    applyJsonLd();
  }

  window.LP_Pricing = { planId: planId, planName: planName, checkout: checkout, config: CFG, refresh: run };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
