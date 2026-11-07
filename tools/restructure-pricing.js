const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'industries');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.html')).sort();

const NEW_CSS = `    /* Product Cards - stacked containers */
    .pricing-grid-wrap {
      margin: 0;
    }
    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;
      align-items: stretch;
    }
    .product-card {
      background: #18181c;
      border: 1px solid #222228;
      border-radius: 16px;
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      position: relative;
      transition: background 200ms ease, border-color 200ms ease;
    }
    .product-card:hover { background: #1c1c20; border-color: #2a2a30; }
    .product-card--featured { background: #131317; border-color: #3b82f6; }
    .product-card--featured:hover { background: #16161b; border-color: #60a5fa; }
    .product-card--monthly { background: #18181c; }
    .product-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 0.75rem;
    }
    .product-badge {
      display: inline-block; width: fit-content;
      font-family: var(--font-mono); font-size: 0.65rem; font-weight: 600;
      letter-spacing: 0.08em; text-transform: uppercase;
      padding: 0.2rem 0.5rem; border-radius: 6px;
      background: var(--accent); color: #fff;
      white-space: nowrap;
    }
    .product-badge--monthly { background: var(--surface-2); color: var(--muted); }
    .product-plan {
      font-family: var(--font-display);
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--fg);
      margin: 0;
    }
    .product-subtitle {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem 0.75rem;
      font-size: 0.875rem;
      color: var(--muted);
      line-height: 1.5;
      margin: 0;
    }
    .product-subtitle-item { display: inline-flex; align-items: center; gap: 0.35rem; }
    .product-subtitle-num { font-weight: 700; color: var(--fg); }
    .product-subtitle-label { color: var(--muted); }
    .product-subtitle-sep { color: var(--faint); }
    .product-subtitle .tooltip-icon { color: var(--faint); }
    .product-price-row { display: flex; align-items: baseline; gap: 0.35rem; }
    .product-price {
      font-family: var(--font-display);
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: -0.03em;
      color: var(--fg);
      line-height: 1;
    }
    .product-price-note { font-size: 0.8rem; color: var(--faint); font-weight: 400; }
    .product-member { font-size: 0.75rem; color: var(--success); font-weight: 500; }
    .product-cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 46px;
      padding: 0.75rem 1rem;
      font-size: 0.9375rem;
      font-weight: 600;
      border-radius: 999px;
      text-decoration: none;
      text-align: center;
      transition: background 180ms ease, color 180ms ease, border-color 180ms ease, transform 180ms ease;
    }
    .product-cta:active { transform: translateY(1px); }
    .product-includes { margin-top: 0.1rem; }
    .product-includes-label {
      font-size: 0.7rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.06em; color: var(--faint);
      margin: 0 0 0.6rem;
    }
    .product-includes-list {
      list-style: none; padding: 0; margin: 0;
      display: grid; gap: 0.5rem;
      max-height: 6.75rem;
      overflow: hidden;
      -webkit-mask-image: linear-gradient(to bottom, black 58%, transparent 100%);
      mask-image: linear-gradient(to bottom, black 58%, transparent 100%);
      transition: max-height 280ms ease, mask-image 280ms ease, -webkit-mask-image 280ms ease;
    }
    .product-includes.open .product-includes-list {
      max-height: 50rem;
      -webkit-mask-image: none;
      mask-image: none;
    }
    .product-includes-list li {
      font-size: 0.8125rem; color: var(--muted);
      padding-left: 1.15rem; position: relative;
    }
    .product-includes-list li::before {
      content: "\\2713"; position: absolute; left: 0; top: 0;
      color: var(--success); font-size: 0.7rem; font-weight: 700;
    }
    .product-includes-more {
      display: inline-flex; align-items: center; gap: 0.4rem;
      margin-top: 0.65rem;
      font-size: 0.8125rem; font-weight: 600;
      color: var(--accent-text);
      background: none; border: none; cursor: pointer; padding: 0;
      transition: color 160ms ease;
    }
    .product-includes-more:hover { color: #60a5fa; }
    .product-includes-more svg { width: 14px; height: 14px; transition: transform 200ms ease; }
    .product-includes.open .product-includes-more svg { transform: rotate(180deg); }
    .product-member--soon { color: var(--faint); font-weight: 500; }
    [data-theme="light"] .pricing-grid { gap: 1.25rem; }
    [data-theme="light"] .product-card { background: #ffffff; border-color: #e5e7eb; }
    [data-theme="light"] .product-card:hover { background: #f9fafb; border-color: #d1d5db; }
    [data-theme="light"] .product-card--featured { background: #f8fafc; border-color: #3b82f6; }
    [data-theme="light"] .product-card--featured:hover { background: #f1f5f9; border-color: #60a5fa; }
    [data-theme="light"] .product-badge--monthly { background: #e5e7eb; color: #4b5563; }
`;

const cardRe = /<div class="product-card[^"]*">[\s\S]*?<\/a>\s*<\/div>/g;

function attr(html, name) {
  const m = html.match(new RegExp(name + '="([^"]*)"'));
  return m ? m[1] : '';
}

function extractCard(html) {
  const d = {};
  d.classes = attr(html, 'class');
  d.isMonthly = d.classes.includes('product-card--monthly');
  if (d.isMonthly) {
    d.badge = html.match(/<span class="product-badge product-badge--monthly">[^<]*<\/span>/)[0];
  } else {
    d.badge = html.match(/<span class="tooltip-wrap"><span class="product-badge">[^<]*<\/span><span class="tooltip">[\s\S]*?<\/span><\/span>/)[0];
  }
  d.plan = html.match(/<h3 class="product-plan">([\s\S]*?)<\/h3>/)[1];
  d.priceRow = html.match(/<div class="product-price-row">([\s\S]*?)<\/div>/)[0];
  const member = html.match(/<div class="product-member">([\s\S]*?)<\/div>/);
  d.member = member ? member[0] : null;
  d.stats = [];
  const statRe = /<div class="product-stat">([\s\S]*?)<\/div>/g;
  let m;
  while ((m = statRe.exec(html))) {
    const num = m[1].match(/<span class="product-stat-num">([\s\S]*?)<\/span>/)[1];
    const labelInner = m[1].match(/<span class="product-stat-label">([\s\S]*?)<\/span>/)[1];
    const tip = m[1].match(/<span class="tooltip-wrap tooltip-icon">[\s\S]*?<\/span><\/span>/);
    const labelText = labelInner.split('<span class="tooltip-wrap')[0].trim();
    d.stats.push({ num, labelText, tip: tip ? tip[0] : '' });
  }
  d.includesItems = html.match(/<ul class="product-includes-list">([\s\S]*?)<\/ul>/)[1];
  d.cta = {
    href: attr(html.match(/<a class="product-cta[^"]*"[^>]*>/)[0], 'href'),
    target: attr(html.match(/<a class="product-cta[^"]*"[^>]*>/)[0], 'target'),
    rel: attr(html.match(/<a class="product-cta[^"]*"[^>]*>/)[0], 'rel'),
    text: html.match(/<a class="product-cta[^"]*"[^>]*>([\s\S]*?)<\/a>/)[1].trim(),
  };
  return d;
}

function buildCard(html) {
  const d = extractCard(html);
  const I = '            ';
  const I2 = I + '  ';
  const I3 = I + '    ';
  const lines = [];
  lines.push('<div class="' + d.classes + '">');
  lines.push(I + '<div class="product-head">');
  lines.push(I2 + '<h3 class="product-plan">' + d.plan + '</h3>');
  lines.push(I2 + d.badge);
  lines.push(I + '</div>');
  lines.push(I + '<p class="product-subtitle">');
  d.stats.forEach((s, idx) => {
    lines.push(I2 + '<span class="product-subtitle-item"><span class="product-subtitle-num">' + s.num + '</span> <span class="product-subtitle-label">' + s.labelText + '</span>' + (s.tip ? ' ' + s.tip : '') + '</span>');
    if (idx < d.stats.length - 1) lines.push(I2 + '<span class="product-subtitle-sep">\u00b7</span>');
  });
  lines.push(I + '</p>');
  lines.push(I + d.priceRow);
  if (d.member) lines.push(I + d.member);
  lines.push(I + '<a class="product-cta btn-primary" href="' + d.cta.href + '" target="' + d.cta.target + '" rel="' + d.cta.rel + '">' + d.cta.text + '</a>');
  lines.push(I + '<div class="product-includes">');
  lines.push(I2 + '<p class="product-includes-label">What\'s included</p>');
  lines.push(I2 + '<ul class="product-includes-list">');
  const items = d.includesItems.trim().split('\n').map((x) => x.trim()).filter(Boolean).join('\n' + I3);
  lines.push(I3 + items);
  lines.push(I2 + '</ul>');
  lines.push(I2 + '<button class="product-includes-more" type="button" aria-expanded="false">');
  lines.push(I3 + '<span class="product-includes-more-label">Show more</span>');
  lines.push(I3 + '<svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>');
  lines.push(I2 + '</button>');
  lines.push(I + '</div>');
  lines.push('          </div>');
  return lines.join('\n');
}

const OLD_JS = `      document.querySelectorAll(".product-includes-toggle").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var list = btn.nextElementSibling;
          if (!list) return;
          var isOpen = btn.getAttribute("aria-expanded") === "true";
          btn.setAttribute("aria-expanded", isOpen ? "false" : "true");
          list.classList.toggle("open");
        });
      });`;

const NEW_JS = `      document.querySelectorAll(".product-includes-more").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var includes = btn.closest(".product-includes");
          if (!includes) return;
          var isOpen = includes.classList.contains("open");
          includes.classList.toggle("open");
          btn.setAttribute("aria-expanded", isOpen ? "false" : "true");
          var label = btn.querySelector(".product-includes-more-label");
          if (label) label.textContent = isOpen ? "Show more" : "Show less";
        });
      });`;

const strayLightRe = /^[ \t]*\[data-theme="light"\] \.(product|pricing)[^\n]*\}[ \t]*$/gm;
const cardPlusRe = /^[ \t]*\.product-card \+ \.product-card[^\n]*\}[ \t]*$/gm;

let report = [];
for (const f of files) {
  const filePath = path.join(dir, f);
  let c = fs.readFileSync(filePath, 'utf8');

  const beforeCount = (c.match(/<div class="product-card[^"]*">/g) || []).length;

  // 1. remove stray single-line light-theme product/pricing rules (outside new CSS)
  c = c.replace(strayLightRe, '');

  // 2. remove obsolete .product-card + .product-card media-query rules
  c = c.replace(cardPlusRe, '');

  // 3. replace product CSS block
  const startIdx = c.indexOf('/* Product Cards');
  const tooltipIdx = c.indexOf('/* Tooltip');
  if (startIdx < 0 || tooltipIdx < 0 || tooltipIdx < startIdx) {
    report.push(f + ': CSS block boundary not found, skipped CSS replacement');
  } else {
    c = c.slice(0, startIdx) + NEW_CSS + c.slice(tooltipIdx);
  }

  // 4. transform cards
  const cards = c.match(cardRe);
  if (!cards || cards.length !== beforeCount) {
    report.push(f + ': card count mismatch before=' + beforeCount + ' matched=' + (cards ? cards.length : 0));
  } else {
    c = c.replace(cardRe, buildCard);
  }

  // 5. replace JS handler
  if (c.includes(OLD_JS)) {
    c = c.replace(OLD_JS, NEW_JS);
  } else {
    report.push(f + ': JS handler not found');
  }

  fs.writeFileSync(filePath, c, 'utf8');

  // validation
  const newCount = (c.match(/<div class="product-card[^"]*">/g) || []).length;
  const moreCount = (c.match(/class="product-includes-more"/g) || []).length;
  const subtitleCount = (c.match(/class="product-subtitle"/g) || []).length;
  const toggleCount = (c.match(/class="product-includes-toggle"/g) || []).length;
  const statCount = (c.match(/class="product-stat"/g) || []).length;
  if (newCount !== beforeCount) report.push(f + ': after card count mismatch ' + newCount + ' vs ' + beforeCount);
  if (moreCount !== beforeCount) report.push(f + ': show-more count mismatch ' + moreCount);
  if (subtitleCount !== beforeCount) report.push(f + ': subtitle count mismatch ' + subtitleCount);
  if (toggleCount > 0) report.push(f + ': leftover product-includes-toggle ' + toggleCount);
  if (statCount > 0) report.push(f + ': leftover product-stat ' + statCount);
}

console.log(report.length ? 'ISSUES:\n' + report.join('\n') : 'ALL OK - 16 files transformed');