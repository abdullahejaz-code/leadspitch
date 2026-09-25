// Builds pricing-data.js from the live HTML pages.
// Run: node pricing-extract.js
// Use this to re-seed the config if pages were edited outside the pricing admin.

const fs = require('fs');
const path = require('path');

const root = __dirname;
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

function planIdsFromPage(html) {
  const ids = {};
  const block = html.match(/var plans = \{([\s\S]*?)\};/);
  if (!block) return ids;
  const re = /'([\w-]+)':\s*\{\s*id:\s*'(plan_[A-Za-z0-9]+)'/g;
  let m;
  while ((m = re.exec(block[1]))) ids[m[1]] = m[2];
  return ids;
}

function tierKey(planKey) {
  const m = planKey.match(/^(.*)-(5k|25k|50k)(?:niche)?$/);
  return m ? { bundle: m[1], size: m[2] } : null;
}

function extractIndustry(file, ids) {
  const html = read('industries/' + file);
  const slug = file.replace(/\.html$/, '');
  const pricingPart = html.split('id="bundles"')[0];

  const cardRe =
    /<div class="product-card([^"]*)"|class="product-plan">([^<]*)|class="product-badge[^"]*">([^<]*)|class="tooltip">([^<]*)|class="product-subtitle-num">([^<]*)|class="product-price">([^<]*)|data-plan="([^"]*)"/g;

  const plans = {};
  let cur = null;
  let pendingFeatured = false;
  let m;
  while ((m = cardRe.exec(pricingPart))) {
    if (m[1] !== undefined) {
      pendingFeatured = /product-card--featured/.test(m[1]);
    } else if (m[2] !== undefined) {
      cur = { featured: pendingFeatured, badgeOn: false, badge: '', badgeTip: '', vol: '', price: '', wasPrice: '' };
      pendingFeatured = false;
    } else if (cur && m[3] !== undefined && !cur.badgeOn && !cur.badge) {
      cur.badge = m[3].trim();
      cur.badgeOn = cur.badge !== '';
    } else if (cur && m[4] !== undefined && cur.badgeOn && !cur.badgeTip) {
      cur.badgeTip = m[4].trim();
    } else if (cur && m[5] !== undefined && !cur.vol) {
      cur.vol = m[5].trim();
    } else if (cur && m[6] !== undefined && !cur.price) {
      cur.price = m[6].trim();
    } else if (cur && m[7] !== undefined) {
      const key = m[7];
      plans[key] = {
        name: (cur.name || '').trim(),
        vol: cur.vol,
        price: cur.price,
        wasPrice: '',
        badgeOn: cur.badgeOn,
        badge: cur.badge,
        badgeTip: cur.badgeTip,
        featured: cur.featured,
        planId: ids[key] || ''
      };
      cur = null;
    }
    if (m[2] !== undefined) cur.name = m[2];
  }

  // Bundle tiers shown on this industry page
  const bundlePart = html.split('id="bundles"')[1] || '';
  const bRe =
    /class="industry-bundle-name">([^<]*)|class="industry-bundle-save">([^<]*)|class="industry-bundle-tier-price">([^<]*)|data-plan="([^"]*)"/g;
  const tiers = {};
  let save = '';
  let curPrice = '';
  while ((m = bRe.exec(bundlePart))) {
    if (m[1] !== undefined) save = '';
    else if (m[2] !== undefined) save = m[2].replace(/^Save up to\s*/i, '').trim();
    else if (m[3] !== undefined) curPrice = m[3].trim();
    else if (m[4] !== undefined) {
      const t = tierKey(m[4]);
      if (t) tiers[m[4]] = { price: curPrice, wasPrice: '', planId: ids[m[4]] || '' };
      if (save) tiers.save = save;
    }
  }

  return { plans, tiers };
}

function extractBundles(ids) {
  const html = read('bundles.html');
  const re =
    /class="bundle-name">([^<]*)|class="bundle-save">([^<]*)|class="bundle-new-price">([^<]*)|data-plan="([^"]*)"/g;
  const out = {};
  let name = '';
  let save = '';
  let curPrice = '';
  let m;
  while ((m = re.exec(html))) {
    if (m[1] !== undefined) {
      name = m[1].trim();
    } else if (m[2] !== undefined) {
      save = m[2].replace(/^Save up to\s*/i, '').trim();
    } else if (m[3] !== undefined) {
      curPrice = m[3].trim();
    } else if (m[4] !== undefined) {
      const t = tierKey(m[4]);
      if (!t) continue;
      if (!out[t.bundle]) out[t.bundle] = { name: '', save: '', tiers: {} };
      out[t.bundle].name = name;
      out[t.bundle].save = save;
      out[t.bundle].tiers[t.size] = {
        price: curPrice,
        wasPrice: '',
        planId: ids[m[4]] || ''
      };
    }
  }
  return out;
}

function extractHome() {
  const html = read('index.html');
  const prices = [...html.matchAll(/class="pricing-card__price">([^<]*)/g)].map((x) => x[1].trim());
  const unit = (html.match(/class="pricing-card__price">[^<]*<span>([^<]*)<\/span>/) || [])[1] || '';
  const sale = (html.match(/class="pricing-badge--sale">([^<]*)/) || [])[1] || '';
  const perk = (html.match(/class="member-perk">([^<]*)/) || [])[1] || '';
  return {
    single: { price: prices[0] || '', wasPrice: '', unit: unit.trim(), badgeOn: !!sale, badge: sale.trim() },
    bundles: { price: prices[1] || '', badgeOn: !!perk, badge: perk.trim() }
  };
}

const industryFiles = fs
  .readdirSync(path.join(root, 'industries'))
  .filter((f) => f.endsWith('.html'))
  .sort();

const industries = {};
const sharedTiers = {};

for (const file of industryFiles) {
  const ids = planIdsFromPage(read('industries/' + file));
  const { plans, tiers } = extractIndustry(file, ids);
  const slug = file.replace(/\.html$/, '');
  industries[slug] = { plans };
  const { save, ...tierOnly } = tiers;
  Object.assign(sharedTiers, tierOnly);
}

const bundleIds = planIdsFromPage(read('bundles.html'));
const bundles = extractBundles(bundleIds);

// Prefer the industry pages' values for shared tier prices when they disagree
for (const key of Object.keys(bundles)) {
  for (const size of Object.keys(bundles[key].tiers || {})) {
    const globalKey = key + '-' + size + 'niche';
    if (sharedTiers[globalKey]) {
      if (!bundles[key].tiers[size].price) bundles[key].tiers[size].price = sharedTiers[globalKey].price;
      if (!bundles[key].tiers[size].planId) bundles[key].tiers[size].planId = sharedTiers[globalKey].planId;
    }
  }
}

const config = {
  industries,
  bundles,
  home: extractHome()
};

const header = `/* LeadsPitch pricing configuration
 * Single source of truth for every price, badge, strike-through price and Whop plan ID.
 * Edit with the local pricing editor (pricing-admin.html). That file is gitignored and
 * refuses to run on any public host, so it never reaches the live site.
 * Applied at runtime by pricing-apply.js -- no page regeneration required.
 */
window.LP_PRICING = `;

const body = JSON.stringify(config, null, 2) + ';\n';

fs.writeFileSync(path.join(root, 'pricing-data.js'), header + body, 'utf8');

console.log('Wrote pricing-data.js');
console.log('  industries: ' + Object.keys(industries).length);
console.log('  plan entries: ' + Object.values(industries).reduce((n, i) => n + Object.keys(i.plans).length, 0));
console.log('  bundles: ' + Object.keys(bundles).length);
console.log('  tier entries: ' + Object.values(bundles).reduce((n, b) => n + Object.keys(b.tiers).length, 0));
