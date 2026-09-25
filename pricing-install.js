// Wires pricing-data.js + pricing-apply.js into every page (idempotent).
// Run: node pricing-install.js
const fs = require('fs');
const path = require('path');

const root = __dirname;

const NEW_OVERRIDE =
  'if (window.LP_Pricing && window.LP_Pricing.checkout) { var _lp = window.LP_Pricing.checkout(planKey, plan); if (_lp) plan = _lp; }';

// previously-injected line (planId only) - replaced in place when found
const OLD_OVERRIDE_RE =
  /[ \t]*if \(window\.LP_Pricing && window\.LP_Pricing\.planId\)[^\n]*\r?\n/;

const pages = [
  { file: 'index.html', prefix: '' },
  { file: 'bundles.html', prefix: '' }
].concat(
  fs.readdirSync(path.join(root, 'industries')).filter((f) => f.endsWith('.html')).map((f) => ({
    file: 'industries/' + f,
    prefix: '../'
  }))
);

let scriptTagged = 0;
let overridden = 0;
let upgraded = 0;

for (const page of pages) {
  const p = path.join(root, page.file);
  let html = fs.readFileSync(p, 'utf8');
  const original = html;

  // 1. <script> tags in <head>
  if (html.indexOf('pricing-apply.js') === -1) {
    const tags =
      '\n  <script src="' + page.prefix + 'pricing-data.js"></script>\n' +
      '  <script src="' + page.prefix + 'pricing-apply.js"></script>\n';
    if (html.indexOf('</head>') === -1) throw new Error('no </head> in ' + page.file);
    html = html.replace('</head>', tags + '</head>');
    scriptTagged++;
  }

  // 2. checkout override inside openCheckout()
  if (html.indexOf('LP_Pricing.checkout') === -1) {
    if (OLD_OVERRIDE_RE.test(html)) {
      html = html.replace(OLD_OVERRIDE_RE, '');
      upgraded++;
    }
    const before = html;
    html = html.replace(
      /([ \t]*)(var plan = plans\[planKey\];)([ \t]*\r?\n)([ \t]*if \(!plan\) return;)/,
      (m, ind) =>
        ind + 'var plan = plans[planKey];\n' +
        ind + NEW_OVERRIDE + '\n' +
        ind + 'if (!plan) return;'
    );
    if (html.indexOf('LP_Pricing.checkout') !== -1) overridden++;
    else if (html !== original) throw new Error('override not injected into ' + page.file);
  }

  if (html !== original) fs.writeFileSync(p, html, 'utf8');
}

console.log(
  'pricing-install: ' + scriptTagged + ' page(s) tagged, ' +
  overridden + ' override(s) injected, ' + upgraded + ' old override(s) upgraded'
);
