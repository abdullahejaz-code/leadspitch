const fs = require("fs");
const path = require("path");

const csvPath = path.join(__dirname, "reference-data");
const outPath = path.join(__dirname, "search-data.js");

// Niche metadata: name, slug, description, keywords
const NICHES = [
  { slug: "accounting-finance", name: "Accounting & Finance", desc: "CPAs, bookkeepers, financial advisors, and accounting firms. Verified contacts for B2B outreach.", keywords: ["cpa", "bookkeeper", "accounting", "finance", "tax", "financial advisor", "audit"] },
  { slug: "agencies-business", name: "Agencies & Business", desc: "Businesses that sell to other businesses. SaaS, agencies, consultants, and vendors.", keywords: ["agency", "marketing", "saas", "consultant", "b2b", "vendor", "business services"] },
  { slug: "automotive", name: "Automotive", desc: "Dealerships, repair shops, auto parts stores, and car washes. Ready for partnership outreach.", keywords: ["dealership", "car", "repair", "auto parts", "mechanic", "vehicle", "truck"] },
  { slug: "beauty-wellness", name: "Beauty & Wellness", desc: "Salons, spas, wellness centers, and beauty businesses. Verified contacts for B2B outreach.", keywords: ["salon", "spa", "beauty", "wellness", "massage", "fitness", "nails", "hair"] },
  { slug: "clinics", name: "Clinics & Healthcare", desc: "Practices, clinics, hospitals, and healthcare providers. Industry-specific contact data.", keywords: ["clinic", "healthcare", "hospital", "doctor", "medical", "practice", "physician"] },
  { slug: "construction", name: "Construction", desc: "Contractors, builders, suppliers, and trade professionals. Verified data for B2B outreach.", keywords: ["contractor", "builder", "construction", "subcontractor", "electrical", "plumbing", "hvac"] },
  { slug: "dentists", name: "Dentists", desc: "Dental practices, orthodontists, oral surgeons, and dental labs. Verified contacts for outreach.", keywords: ["dentist", "dental", "orthodontist", "oral surgeon", "dental lab", "teeth"] },
  { slug: "education", name: "Education & Training", desc: "Schools, universities, training centers, and education providers. Industry-specific contact data.", keywords: ["school", "university", "college", "education", "training", "academy", "learning"] },
  { slug: "events-leisure", name: "Events & Leisure", desc: "Venues, event planners, entertainment companies, and leisure businesses. Ready for outreach.", keywords: ["event", "venue", "entertainment", "leisure", "planner", "recreation", "concert"] },
  { slug: "food-beverage", name: "Food & Beverage", desc: "Restaurants, cafes, food trucks, and catering businesses. Verified data for targeted campaigns.", keywords: ["food", "beverage", "restaurant", "supplier", "catering", "distributor", "manufacturer"] },
  { slug: "home-services", name: "Home Services", desc: "Plumbers, electricians, HVAC, landscapers, and home improvement pros. Verified contacts.", keywords: ["plumber", "electrician", "hvac", "landscaper", "home", "handyman", "cleaning", "pest"] },
  { slug: "hotels-hospitality", name: "Hotels & Hospitality", desc: "Hotels, travel agencies, tour operators, and hospitality businesses. Verified contacts.", keywords: ["hotel", "hospitality", "travel", "resort", "bnb", "tourism", "lodging"] },
  { slug: "legal", name: "Legal", desc: "Law firms, attorneys, paralegals, and legal service providers. Verified data for B2B outreach.", keywords: ["lawyer", "attorney", "law firm", "legal", "paralegal", "solicitor"] },
  { slug: "logistics", name: "Logistics", desc: "Freight, warehousing, shipping, and transportation companies. Verified contacts for partnerships.", keywords: ["logistics", "freight", "warehouse", "shipping", "trucking", "transportation", "supply chain"] },
  { slug: "real-estate", name: "Real Estate", desc: "Brokerages, agents, property managers, and real estate developers. Verified contacts for partnerships.", keywords: ["real estate", "realtor", "broker", "property", "agent", "landlord", "developer"] },
  { slug: "restaurants-cafes", name: "Restaurants & Cafes", desc: "Restaurants, cafes, coffee shops, bakeries, and food businesses. Verified data for targeted campaigns.", keywords: ["restaurant", "cafe", "coffee", "bakery", "dining", "bar", "catering"] }
];

const CSV_FILES = {
  "accounting-finance": "Accounting & Finance - Sheet1.csv",
  "agencies-business": "Agencies & Business Services - Sheet1.csv",
  "automotive": "Automotive - Sheet1.csv",
  "beauty-wellness": "beauty and wellness plans - Sheet1.csv",
  "clinics": "Clinics.csv",
  "construction": "Construction & Contractors - Sheet1.csv",
  "dentists": "Dentist.csv",
  "education": "Education & Training - Sheet1.csv",
  "events-leisure": "Events & Leisure - Sheet1.csv",
  "food-beverage": "Food & Beverage Suppliers - Sheet1.csv",
  "home-services": "home services plans - Sheet1.csv",
  "hotels-hospitality": "Hotels & Hospitality - Sheet1.csv",
  "legal": "Lawyers plans - Sheet1.csv",
  "logistics": "logistics plans - Sheet1.csv",
  "real-estate": "real estate.csv",
  "restaurants-cafes": "Restaurants & Caf\u00e9s - Sheet1 (1).csv"
};

function parseCSV(file) {
  const raw = fs.readFileSync(path.join(csvPath, file), "utf8");
  const lines = raw.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n").split("\n");
  const rows = [];
  for (const line of lines) {
    if (!line.trim()) continue;
    rows.push(parseCSVLine(line));
  }
  return rows;
}

function parseCSVLine(line) {
  const out = [];
  let cur = "", inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQ) {
      if (ch === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else inQ = false; }
      else cur += ch;
    } else if (ch === '"') inQ = true;
    else if (ch === ",") { out.push(cur.trim()); cur = ""; }
    else cur += ch;
  }
  out.push(cur.trim());
  return out;
}

function clean(v) {
  if (v == null) return "";
  return String(v).replace(/[?]/g, "").trim();
}

// Column classification by header name
function classifyHeader(name) {
  const n = clean(name).toLowerCase();
  if (/email/.test(n)) return "emails";
  if (/lead|record/.test(n)) return "leads";
  if (/regular|one.?time|price|member/i.test(n) && /price|regular|one/i.test(n)) return "price";
  if (/member|40%|off/i.test(n)) return "member";
  if (/duration|delivery|period|month/.test(n)) return "duration";
  if (/total|subscribe|buy|link|href/i.test(n)) return "linkish";
  if (/best|value/.test(n)) return "misc";
  return "misc";
}

function buildNiche(slug, meta) {
  const rows = parseCSV(CSV_FILES[slug]);
  const plans = [];

  // Find data tables: scan for real header rows where the first cell is exactly "Plan"
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    if (!r.length) continue;
    const firstCell = clean(r[0]).toLowerCase();
    if (firstCell !== "plan") continue;
    const headerText = clean(r.slice(0, 8).join(" ")).toLowerCase();

    if (!/price|regular|verified email|emails/i.test(headerText)) continue;

    // Map columns
    const cols = { emails: null, leads: null, price: null, member: null, link: null };
    for (let c = 0; c < r.length; c++) {
      const cls = classifyHeader(r[c]);
      if (cols[cls] == null && cls !== "misc" && cls !== "duration" && cls !== "linkish") cols[cls] = c;
      else if (cls === "linkish" && cols.link == null) cols.link = c;
    }
    // Parse following rows until a blank/next header
    for (let j = i + 1; j < rows.length; j++) {
      const row = rows[j];
      if (!row.length) break;
      const pname = clean(row[0]);
      if (!pname) break;
      if (/^(plan|monthly)$/i.test(pname)) break;

      // Extract price: prefer explicit price col; else first "$x.xx"
      let price = cols.price != null ? clean(row[cols.price]) : "";
      if (!/^\$\d/.test(price)) {
        for (let c = 0; c < row.length; c++) {
          if (/^\$\d/.test(clean(row[c]))) { price = clean(row[c]); break; }
        }
      }
      if (!/^\$\d/.test(price)) price = null;

      let member = null;
      if (cols.member != null) {
        const m = clean(row[cols.member]);
        if (/^\$\d/.test(m)) member = m;
      } else {
        // second "$x.xx" in the row is member price
        let found = 0;
        for (let c = 0; c < row.length; c++) {
          if (/^\$\d/.test(clean(row[c]))) {
            found++;
            if (found === 2) { member = clean(row[c]); break; }
          }
        }
      }

      let link = cols.link != null ? clean(row[cols.link]) : "";
      if (!/^https?:/.test(link)) {
        for (let c = 0; c < row.length; c++) {
          if (/^https?:/.test(clean(row[c]))) { link = clean(row[c]); break; }
        }
      }
      if (!/^https?:/.test(link)) link = null;

      let emails = cols.emails != null ? clean(row[cols.emails]) : null;
      if (!emails) {
        for (let c = 0; c < row.length && c < 4; c++) {
          if (c === cols.leads || c === cols.price || c === cols.member) continue;
          const v = clean(row[c]);
          if (/^\d/.test(v) && !/^\$\d/.test(v)) { emails = v; break; }
        }
      }
      let leads = cols.leads != null ? clean(row[cols.leads]) : null;
      if (!leads || /month|delivery|duration|period|k\+|months/i.test(leads)) {
        for (let c = 0; c < row.length && c < 4; c++) {
          if (c === cols.emails || c === cols.price || c === cols.member) continue;
          const v = clean(row[c]);
          if (/^\d/.test(v) && !/^\$\d/.test(v) && v !== emails) { leads = v; break; }
        }
      }
      if (leads && /^[0-9.]+$/.test(leads) && leads.length <= 4) {
        // If both emails & leads are numeric short values, keep both but prefer larger as leads for real-estate-like files
      }

      const rec = { niche: meta.name, slug, plan: pname, emails: emails || null, leads: leads || null, price, member, link };
      plans.push(rec);
    }
  }
  return { name: meta.name, slug, url: "industries/" + slug + ".html", desc: meta.desc, keywords: meta.keywords, plans };
}

const niches = NICHES.map((n) => buildNiche(n.slug, n));

const bundles = [
  { name: "Restaurants, Hotels & Construction", desc: "Bundle of Restaurants & Cafes + Hotels & Hospitality + Construction datasets. Save up to $46.", includes: ["Restaurants & Cafes", "Hotels & Hospitality", "Construction"], price25: "$99.98", old25: "$131.98", price50: "$189.98", old50: "$235.98", save: "$46", url: "bundles.html" },
  { name: "Automotive, Logistics & Agencies", desc: "Bundle of Automotive + Logistics & Transportation + Agencies & Business Services datasets. Save up to $44.", includes: ["Automotive", "Logistics & Transportation", "Agencies & Business Services"], price25: "$99.98", old25: "$137.98", price50: "$179.98", old50: "$223.98", save: "$44", url: "bundles.html" },
  { name: "Education, Events & Leisure", desc: "Bundle of Education + Events & Leisure + Accounting & Finance datasets. Save up to $44.", includes: ["Education", "Events & Leisure", "Accounting & Finance"], price25: "$99.98", old25: "$129.98", price50: "$169.98", old50: "$213.98", save: "$44", url: "bundles.html" }
];

const memberships = [
  { name: "Basic Membership", price: "$19.99", url: "membership.html", desc: "40% off Events & Leisure, Education & Training, and Construction datasets. Full CSV export." },
  { name: "Pro Membership", price: "$29.99", url: "membership.html", desc: "40% off 10 industries including Agencies & Business, Automotive, Logistics, Hotels & Hospitality, Home Services, Legal. Priority support." },
  { name: "Max Membership", price: "$49.99", url: "membership.html", desc: "40% off ALL 16 industries and ALL bundles. Bonus leads, priority access to new industries, priority support." }
];

const pages = [
  { title: "Home", url: "index.html", desc: "Buy verified B2B lead data by niche. CSV datasets with emails, phones, and websites across 16+ niches. One flat price, no credits, no software.", keywords: "b2b leads, csv, lead data, verified, buy leads, dataset, niche" },
  { title: "All Niches", url: "industries.html", desc: "Browse all 16 industry-specific datasets, each sourced and verified independently.", keywords: "niches, industries, directory, verticals, datasets" },
  { title: "About LeadsPitch", url: "about.html", desc: "Learn about LeadsPitch, the verified B2B lead data platform.", keywords: "about, company, who we are, team" },
  { title: "Bundles", url: "bundles.html", desc: "Buy multiple niche datasets together and save. Bundle pricing for 25K and 50K email packages.", keywords: "bundles, save, combo, package, multi-niche" },
  { title: "Membership", url: "membership.html", desc: "Memberships with 40% off datasets and bundles. Basic, Pro, and Max tiers.", keywords: "membership, subscribe, 40% off, discount, subscription" },
  { title: "FAQ", url: "faq.html", desc: "Frequently asked questions about LeadsPitch datasets, subscriptions, delivery, and refunds.", keywords: "faq, help, questions, support, answers" },
  { title: "Contact", url: "contact.html", desc: "Get in touch with the LeadsPitch team.", keywords: "contact, email, support, reach out" },
  { title: "Privacy Policy", url: "privacy.html", desc: "How LeadsPitch collects, uses, and shares information.", keywords: "privacy, gdpr, ccpa, policy" },
  { title: "Terms of Service", url: "terms.html", desc: "Terms and conditions for using LeadsPitch.", keywords: "terms, conditions, legal" },
  { title: "Refund Policy", url: "refund.html", desc: "LeadsPitch refund policy for datasets and subscriptions.", keywords: "refund, money back, policy" }
];

function extractFAQs() {
  const html = fs.readFileSync(path.join(__dirname, "faq.html"), "utf8");
  const re = /<span class="acc-q">(.*?)<\/span>[\s\S]*?<div class="acc-inner">([\s\S]*?)<\/div><\/div>/g;
  const out = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    const q = m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    const a = m[2].replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
    if (q) out.push({ q, a, url: "faq.html" });
  }
  return out;
}

const data = { niches, bundles, memberships, pages, faqs: extractFAQs() };

const js =
  "// Auto-generated by generate-search-data.js. Do not edit by hand.\n" +
  "// Run: node generate-search-data.js\n" +
  "window.LEADSPITCH_SEARCH_DATA = " + JSON.stringify(data, null, 2) + ";\n";

fs.writeFileSync(outPath, js, "utf8");
console.log("Wrote " + outPath);
console.log("niches:", niches.length, "| plans:", niches.reduce((n, x) => n + x.plans.length, 0), "| bundles:", bundles.length, "| memberships:", memberships.length, "| pages:", pages.length, "| faqs:", data.faqs.length);
