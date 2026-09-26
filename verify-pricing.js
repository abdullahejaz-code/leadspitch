// Full verification of the pricing system. Run: node verify-pricing.js
const fs = require('fs');
const path = require('path');
const root = __dirname;

let pass = 0;
let fail = 0;
const problems = [];

function check(name, ok, detail) {
  if (ok) { pass++; } else { fail++; problems.push((detail ? detail + ' — ' : '') + name); }
}

const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const count = (s, re) => (s.match(re) || []).length;

const industryFiles = fs.readdirSync(path.join(root, 'industries')).filter((f) => f.endsWith('.html')).sort();
const allPages = ['index.html', 'bundles.html'].concat(industryFiles.map((f) => 'industries/' + f));

/* ---------- 1. config file ---------- */
check('pricing-data.js exists', fs.existsSync(path.join(root, 'pricing-data.js')));

const sandbox = {};
(new Function('window', read('pricing-data.js')))(sandbox);
const CFG = sandbox.LP_PRICING;
check('pricing-data.js defines window.LP_PRICING', !!CFG);
check('config has industries', CFG && typeof CFG.industries === 'object');
check('config has bundles', CFG && typeof CFG.bundles === 'object');
check('config has home', CFG && typeof CFG.home === 'object');

const industryCount = CFG ? Object.keys(CFG.industries).length : 0;
check('16 industries in config', industryCount === 16, 'found ' + industryCount);

/* ---------- 2. runtime file parses ---------- */
let applySrc = '';
try {
  applySrc = read('pricing-apply.js');
  new Function(applySrc);
  check('pricing-apply.js parses', true);
} catch (e) {
  check('pricing-apply.js parses', false, e.message);
}

let adminSrc = '';
try {
  adminSrc = read('pricing-admin.html');
  const blocks = adminSrc.match(/<script>([\s\S]*?)<\/script>/g) || [];
  check('pricing-admin.html has inline script(s)', blocks.length >= 1, 'found ' + blocks.length);
  blocks.forEach((b, i) => new Function(b.replace(/^<script>/, '').replace(/<\/script>$/, '')));
  check('pricing-admin inline script(s) parse', true, blocks.length + ' block(s)');
} catch (e) {
  check('pricing-admin inline script(s) parse', false, e.message);
}

/* ---------- 2b. the editor stays private ---------- */
const gitignore = read('.gitignore');
check('.gitignore excludes pricing-admin.html', /(^|\n)\s*pricing-admin\.html\s*($|\n)/.test(gitignore));
let vercelignore = '';
try { vercelignore = read('.vercelignore'); } catch (e) { /* missing is fine for git deploys */ }
check('.vercelignore excludes pricing-admin.html', /(^|\n)\s*pricing-admin\.html\s*($|\n)/.test(vercelignore));
check('editor declares noindex', /<meta[^>]+name="robots"[^>]+noindex/i.test(adminSrc));
check('editor has a local-only gate', /__LP_ADMIN_OK\s*===?\s*false/.test(adminSrc) &&
  /location\.protocol === 'file:'/.test(adminSrc));
check('editor gate checks loopback', /127\.0\.0\.1/.test(adminSrc) && /localhost/.test(adminSrc));
check('no public page links to the editor', allPages.every((p) => {
  try { return !read(p).includes('pricing-admin'); } catch (e) { return true; }
}));

/* ---------- 2c. one-click local helper ---------- */
let serverSrc = null;
try { serverSrc = read('pricing-server.js'); } catch (e) { /* missing is a failure below */ }
check('pricing-server.js exists', !!serverSrc);
try {
  if (serverSrc) new Function(serverSrc.replace(/^#![^\n]*\n/, ''));   // strip the shebang
  check('pricing-server.js parses', !!serverSrc);
} catch (e) {
  check('pricing-server.js parses', false, e.message);
}
check('server binds loopback only', !!serverSrc &&
  serverSrc.includes("server.listen(PORT, '127.0.0.1'") &&
  !serverSrc.includes("server.listen(PORT, '0.0.0.0'"));
check('server validates config bodies', !!serverSrc && serverSrc.includes('validConfig'));
check('server caps request size', !!serverSrc && serverSrc.includes('MAX_BODY'));
check('server rejects non-local requests', !!serverSrc && serverSrc.includes('isLoopback') && serverSrc.includes('hostIsLocal'));
check('vercelignore excludes the helper', /pricing-server\.js/.test(vercelignore) && /Open Pricing Editor\.bat/.test(vercelignore));
check('editor saves through the helper', adminSrc.includes('isLocalHelper') && adminSrc.includes("'/save'"));
check('editor has a Publish button', adminSrc.includes('id="btn-publish"'));
check('editor hides Publish outside the helper', adminSrc.includes('pubBtn.hidden'));
check('editor marks helper-served pages', adminSrc.includes('<!--LP-SERVED-->') && adminSrc.includes('lp-local'));
check('launcher script exists', fs.existsSync(path.join(root, 'Open Pricing Editor.bat')));

/* ---------- 3. every page is wired ---------- */
let totalPlans = 0;
let totalTiers = 0;

for (const page of allPages) {
  const html = read(page);
  const isIndex = page === 'index.html';
  const prefix = page.indexOf('/') === 0 || page.indexOf('industries') !== 0 ? '' : '../';

  check(page + ': one pricing-data.js tag', count(html, /pricing-data\.js/g) === 1);
  check(page + ': one pricing-apply.js tag', count(html, /pricing-apply\.js/g) === 1);
  check(page + ': pricing-data.js before pricing-apply.js',
    html.indexOf('pricing-data.js') < html.indexOf('pricing-apply.js'));
  check(page + ': both tags are inside <head>',
    html.indexOf('pricing-apply.js') < html.indexOf('</head>'));
  check(page + ': no legacy _lpId override', count(html, /var _lpId/g) === 0);

  const overrideCount = count(html, /var _lp = window\.LP_Pricing\.checkout\(planKey, plan\)/g);
  if (isIndex) {
    check('index.html: no checkout override (no checkout there)', overrideCount === 0);
  } else {
    check(page + ': exactly one checkout override', overrideCount === 1, 'found ' + overrideCount);
    check(page + ': override sits between plan lookup and null guard',
      /var plan = plans\[planKey\];\s*\r?\n\s*if \(window\.LP_Pricing && window\.LP_Pricing\.checkout\)[\s\S]{0,220}?if \(!plan\) return;/.test(html));
    check(page + ': plans map present', /var plans = \{/.test(html));
  }

  // relative path correctness
  const dataTag = html.match(/<script src="([^"]*pricing-data\.js)"><\/script>/);
  const applyTag = html.match(/<script src="([^"]*pricing-apply\.js)"><\/script>/);
  if (dataTag && applyTag) {
    const want = page.indexOf('industries/') === 0 ? '../pricing-data.js' : 'pricing-data.js';
    check(page + ': correct relative path ' + want, dataTag[1] === want && applyTag[1] === (want === 'pricing-data.js' ? 'pricing-apply.js' : '../pricing-apply.js'),
      dataTag[1] + ' / ' + applyTag[1]);
    // target file actually exists relative to the page
    const dir = path.dirname(path.join(root, page));
    check(page + ': pricing-data.js resolves on disk', fs.existsSync(path.join(dir, dataTag[1])));
    check(page + ': pricing-apply.js resolves on disk', fs.existsSync(path.join(dir, applyTag[1])));
  } else {
    check(page + ': script tags found', false);
  }
}

/* ---------- 4. config covers every button on every page ---------- */
for (const page of allPages) {
  if (page === 'index.html') continue;
  const html = read(page);
  const idsBlock = (html.match(/var plans = \{([\s\S]*?)\};/) || [])[1] || '';
  const ids = {};
  let m;
  const idRe = /'([\w-]+)':\s*\{\s*id:\s*'(plan_[A-Za-z0-9]+)'/g;
  while ((m = idRe.exec(idsBlock))) ids[m[1]] = m[2];

  const keys = [...new Set([...html.matchAll(/data-plan="([^"]+)"/g)].map((x) => x[1]))];
  for (const k of keys) {
    check(page + ': checkout map has an id for "' + k + '"', !!ids[k]);
  }

  if (page.indexOf('industries/') === 0) {
    const slug = path.basename(page, '.html');
    const ind = CFG.industries[slug];
    check('config covers ' + slug, !!ind && !!ind.plans, 'missing from pricing-data.js');
    // every product card button must resolve to a config plan
    const pricingPart = html.split('id="bundles"')[0];
    const planKeys = [...new Set([...pricingPart.matchAll(/data-plan="([^"]+)"/g)].map((x) => x[1]))];
    for (const k of planKeys) {
      check(slug + ': config has plan "' + k + '"', !!(ind && ind.plans && ind.plans[k]));
      if (ind && ind.plans && ind.plans[k]) {
        totalPlans++;
        const p = ind.plans[k];
        check(slug + '/' + k + ': has price', !!p.price, 'no price');
        check(slug + '/' + k + ': has planId', !!p.planId, 'no planId');
        check(slug + '/' + k + ': planId matches config map', p.planId === ids[k],
          p.planId + ' vs ' + ids[k]);
        check(slug + '/' + k + ': name present', !!p.name);
      }
    }
    // duplicate planId within an industry
    if (ind && ind.plans) {
      const seen = {};
      for (const k of Object.keys(ind.plans)) {
        const id = ind.plans[k].planId;
        if (seen[id]) check(slug + ': duplicate planId ' + id, false, seen[id] + ' and ' + k);
        seen[id] = k;
      }
    }
    // bundle tiers referenced by the page exist in config
    const bundlePart = html.split('id="bundles"')[1] || '';
    const bundleKeys = [...new Set([...bundlePart.matchAll(/data-plan="([^"]+)"/g)].map((x) => x[1]))];
    for (const k of bundleKeys) {
      const mm = k.match(/^(.*)-(5k|25k|50k)niche$/);
      check(slug + ': bundle key "' + k + '" is parseable', !!mm);
      if (mm) {
        const b = CFG.bundles[mm[1]];
        check(slug + ': bundle "' + mm[1] + '" in config', !!b);
        if (b) {
          const t = b.tiers[mm[2]];
          check(slug + ': tier ' + mm[2] + ' of ' + mm[1] + ' in config', !!t);
          if (t) {
            totalTiers++;
            check(slug + '/' + k + ': tier price present', !!t.price);
            check(slug + '/' + k + ': tier planId matches page map', t.planId === ids[k],
              t.planId + ' vs ' + ids[k]);
          }
        }
      }
    }
  } else if (page === 'bundles.html') {
    const keys = [...new Set([...html.matchAll(/data-plan="([^"]+)"/g)].map((x) => x[1]))];
    for (const k of keys) {
      const mm = k.match(/^(.*)-(5k|25k|50k)$/);
      check('bundles.html: key "' + k + '" parseable', !!mm);
      if (mm) {
        const b = CFG.bundles[mm[1]];
        check('bundles.html: bundle "' + mm[1] + '" in config', !!b);
        if (b && b.tiers[mm[2]]) {
          totalTiers++;
          check('bundles.html/' + k + ': planId matches page map', b.tiers[mm[2]].planId === ids[k]);
        }
      }
    }
  }
}

/* ---------- 5. no orphan config entries ---------- */
for (const slug of Object.keys(CFG.industries)) {
  check('industry ' + slug + ' has a page file', fs.existsSync(path.join(root, 'industries', slug + '.html')));
}
for (const bk of Object.keys(CFG.bundles)) {
  const t = CFG.bundles[bk].tiers || {};
  const sizes = Object.keys(t);
  check('bundle ' + bk + ' has 3 tiers', sizes.length === 3, sizes.join(','));
}

/* ---------- 6. admin page references only real config paths ---------- */
{
  const paths = [...adminSrc.matchAll(/data-path="([^"]+)"/g)].map((x) => x[1]);
  for (const p of paths) {
    if (p.indexOf('home.') === 0) {
      const parts = p.split('.');
      let o = CFG;
      for (const seg of parts) o = o && o[seg];
      check('admin static path resolves: ' + p, o !== undefined);
    }
  }
}

/* ---------- 7. generator template keeps the wiring ---------- */
{
  const gen = read('generate-industries.js');
  check('generator emits pricing-data.js', gen.indexOf('pricing-data.js') !== -1);
  check('generator emits pricing-apply.js', gen.indexOf('pricing-apply.js') !== -1);
  check('generator emits checkout override', gen.indexOf('LP_Pricing.checkout') !== -1);
  check('generator script tags sit before </head>', gen.indexOf('pricing-apply.js') < gen.indexOf('</head>'));
}

/* ---------- 8. install script is idempotent (dry run) ---------- */
{
  const before = allPages.map((p) => read(p));
  const cp = require('child_process');
  const out = cp.execSync('node pricing-install.js', { cwd: root }).toString();
  const after = allPages.map((p) => read(p));
  let changed = 0;
  for (let i = 0; i < before.length; i++) if (before[i] !== after[i]) changed++;
  check('re-running pricing-install.js changes nothing', changed === 0, changed + ' file(s) changed');
  check('install reports no work', /0 page\(s\) tagged, 0 override\(s\) injected, 0 old override\(s\) upgraded/.test(out), out.trim());
}

/* ---------- 9. no duplicated tags after repeated runs ---------- */
for (const page of allPages) {
  const html = read(page);
  check(page + ': still one pricing-data tag', count(html, /pricing-data\.js/g) === 1);
  check(page + ': still one pricing-apply tag', count(html, /pricing-apply\.js/g) === 1);
}

console.log('\n  checks passed: ' + pass);
console.log('  checks failed: ' + fail);
if (problems.length) {
  console.log('\n  FAILURES:');
  problems.forEach((p) => console.log('   x ' + p));
}
process.exit(fail ? 1 : 0);
