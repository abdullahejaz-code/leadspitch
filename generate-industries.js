// Industry Page Generator — Redesigned Template
// Run: node generate-industries.js
// Produces: industries/[slug].html for each industry
// Template: Hero → One-time → Bundles → Related → Preview → FAQ → Compare → CTA
// Theme: Dark default, light via toggle (data-theme="light"), persisted to localStorage

const fs = require('fs');
const path = require('path');

const industries = [
  {
    slug: "automotive",
    name: "Automotive",
    metaDesc: "Leads Pitch verified automotive business data — dealerships, repair shops, parts suppliers, and automotive service providers.",
    heroSub: "Dealerships, repair shops, parts suppliers, and automotive businesses. Verified business data for sales intelligence.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "27K", price: "$27.98", member: "$16.79", planId: "plan_Cu3F9t93BukgK", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "105K", price: "$49.98", member: "$29.99", planId: "plan_hR7mjOUxc8F6t", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "180K", price: "$79.98", member: "$47.99", planId: "plan_pBDfqlXAXsXdo", badge: "Best Value" },
      { plan: "Business", emails: "100K", leads: "375K", price: "$135.98", member: "$81.59", planId: "plan_hu9ZU6e0UECtq", badge: "High Volume" },
      { plan: "Scale", emails: "200K", leads: "650K", price: "$199.98", member: "$119.99", planId: "plan_cym5Kt7UNLrPl", badge: "Massive Volume" },
      { plan: "Enterprise", emails: "300K", leads: "1.15M+", price: "$279.98", member: "$167.99", planId: "plan_aEJf73xKt4igl", badge: "Complete Database" }
    ],
    faqs: [
      { q: "What types of automotive businesses are included?", a: "The dataset covers dealerships, auto repair shops, parts suppliers, body shops, car washes, and other automotive service businesses." },
      { q: "Can I filter by business type?", a: "Contact us for custom datasets filtered by dealership, repair shop, parts supplier, or other types." },
      { q: "Is this data for US businesses only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the automotive data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["construction", "accounting-finance", "clinics", "dentists", "education", "home-services", "restaurants-cafes", "events-leisure", "food-beverage", "agencies-business", "beauty-wellness", "hotels-hospitality", "legal", "logistics", "real-estate"],
    bundles: ["trades-services", "local-business", "ultimate-local", "all-industry"]
  },
  {
    slug: "construction",
    name: "Construction",
    metaDesc: "Leads Pitch verified construction business data — general contractors, builders, subcontractors, and construction companies.",
    heroSub: "General contractors, builders, subcontractors, and construction companies. Verified business data for sales intelligence.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "26K", price: "$25.98", member: "$15.59", planId: "plan_4016VESqCmBfG", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "105K", price: "$45.98", member: "$27.59", planId: "plan_W8waYmfC8Dk5h", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "175K", price: "$75.98", member: "$45.59", planId: "plan_RTk0RLBUBJ2mE", badge: "Best Value" },
      { plan: "Business", emails: "100K", leads: "360K", price: "$129.98", member: "$77.99", planId: "plan_GmPSYV2Oetev6", badge: "High Volume" },
      { plan: "Scale", emails: "200K", leads: "760K", price: "$199.98", member: "$119.99", planId: "plan_SORdfInzkB3Qt", badge: "Enterprise Ready" },
      { plan: "Enterprise", emails: "350K", leads: "1.3M+", price: "$279.98", member: "$167.99", planId: "plan_S8REQ5hVMCoxT", badge: "Complete Database" }
    ],
    faqs: [
      { q: "What types of construction companies are included?", a: "The dataset covers general contractors, home builders, subcontractors, specialty trades, and construction management firms." },
      { q: "Can I filter by trade or project type?", a: "Contact us for custom datasets filtered by trade, project type, or geography." },
      { q: "Is this data for licensed contractors only?", a: "The dataset includes businesses in the construction industry. License verification is not included." },
      { q: "How current is the construction data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["automotive", "accounting-finance", "clinics", "dentists", "education", "home-services", "restaurants-cafes", "events-leisure", "food-beverage", "agencies-business", "beauty-wellness", "hotels-hospitality", "legal", "logistics", "real-estate"],
    bundles: ["real-estate-property", "trades-services", "ultimate-local", "all-industry"]
  },
  {
    slug: "accounting-finance",
    name: "Accounting & Finance",
    metaDesc: "Leads Pitch verified accounting business data — CPAs, bookkeepers, financial advisors, and accounting firms.",
    heroSub: "CPAs, bookkeepers, financial advisors, and accounting firms. Verified business data for sales intelligence.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "23K", price: "$23.98", member: "$14.39", planId: "plan_Kl8EV5U6fxGXN", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "82K", price: "$39.98", member: "$23.99", planId: "plan_FZIXCJHW8E0Cz", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "135K", price: "$65.98", member: "$39.59", planId: "plan_XeaKRTtwCqHZc", badge: "Best Value" },
      { plan: "Business", emails: "65K", leads: "185K", price: "$99.98", member: "$59.99", planId: "plan_HUtmdH3lzvGnn", badge: "Complete Database" }
    ],
    faqs: [
      { q: "What types of accounting businesses are included?", a: "The dataset covers CPA firms, bookkeeping services, financial advisors, tax preparation firms, and other accounting and finance businesses." },
      { q: "Can I filter by accounting specialty?", a: "Contact us for custom datasets filtered by firm type, specialty, client size, or geography." },
      { q: "Is this data for US businesses only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the accounting data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["automotive", "construction", "clinics", "dentists", "education", "home-services", "restaurants-cafes", "events-leisure", "food-beverage", "agencies-business", "beauty-wellness", "hotels-hospitality", "legal", "logistics", "real-estate"],
    bundles: ["professional-services", "premium-high-ticket", "all-industry"]
  },
  {
    slug: "clinics",
    name: "Clinics",
    metaDesc: "Leads Pitch verified healthcare business data — practices, clinics, hospitals, and medical providers.",
    heroSub: "Practices, clinics, hospitals, and healthcare providers. Niche-specific contact data for outreach and partnerships.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "26.4K", price: "$23.98", member: "$14.39", planId: "plan_UyqaxhhOeZJbG", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "90K", price: "$39.98", member: "$23.99", planId: "plan_ND7Ee33dJFeHu", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "130.7K", price: "$69.98", member: "$41.99", planId: "plan_9EReD9jkX2RbA", badge: "Best Value" },
      { plan: "Business", emails: "100K", leads: "307.8K", price: "$119.98", member: "$71.99", planId: "plan_cPJy4Q4EsCW8p", badge: "High Volume" }
    ],
    faqs: [
      { q: "What types of healthcare practices are included?", a: "The dataset covers medical practices, clinics, hospitals, specialty care providers, urgent care centers, and other healthcare facilities." },
      { q: "Can I filter by medical specialty?", a: "Contact us for custom datasets filtered by practice type, specialty, facility size, or geography." },
      { q: "Is this data for US practices only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the healthcare data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["automotive", "construction", "accounting-finance", "dentists", "education", "home-services", "restaurants-cafes", "events-leisure", "food-beverage", "agencies-business", "beauty-wellness", "hotels-hospitality", "legal", "logistics", "real-estate"],
    bundles: ["healthcare-wellness", "premium-high-ticket", "all-industry"]
  },
  {
    slug: "dentists",
    name: "Dentists",
    metaDesc: "Leads Pitch verified dental business data — dental practices, orthodontists, oral surgeons, and dental labs.",
    heroSub: "Dental practices, orthodontists, oral surgeons, and dental labs. Verified contacts for outreach and partnerships.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "28K", price: "$25.98", member: "$15.59", planId: "plan_ujCgorFTIT12O", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "95K", price: "$45.98", member: "$27.59", planId: "plan_nnOkSiUmcaj1B", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "145K", price: "$75.98", member: "$45.59", planId: "plan_8vGKTKyWnI3KP", badge: "Best Value" },
      { plan: "Business", emails: "100K", leads: "330K", price: "$129.98", member: "$77.99", planId: "plan_0YBRcmjccogXz", badge: "High Volume" }
    ],
    faqs: [
      { q: "What types of dental practices are included?", a: "The dataset covers general dentistry practices, orthodontists, oral surgeons, pediatric dentists, dental labs, and other dental providers." },
      { q: "Can I filter by dental specialty?", a: "Contact us for custom datasets filtered by practice type, specialty, or geography." },
      { q: "Is this data for US practices only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the dental data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["automotive", "construction", "accounting-finance", "clinics", "education", "home-services", "restaurants-cafes", "events-leisure", "food-beverage", "agencies-business", "beauty-wellness", "hotels-hospitality", "legal", "logistics", "real-estate"],
    bundles: ["healthcare-wellness", "premium-high-ticket", "all-industry"]
  },
  {
    slug: "education",
    name: "Education & Training",
    metaDesc: "Leads Pitch verified education business data — schools, universities, training centers, and education providers.",
    heroSub: "Schools, universities, training centers, and education providers. Niche-specific contact data for outreach.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "25K", price: "$23.98", member: "$14.39", planId: "plan_kMjdnOSXKhGqD", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "95K", price: "$43.98", member: "$26.39", planId: "plan_V6HKj416jPjel", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "155K", price: "$71.98", member: "$43.19", planId: "plan_ErkQqGSiYMD2a", badge: "Best Value" },
      { plan: "Business", emails: "100K", leads: "330K", price: "$123.98", member: "$74.39", planId: "plan_0vE0wYXnJGXME", badge: "High Volume" },
      { plan: "Enterprise", emails: "175K", leads: "590K+", price: "$189.98", member: "$113.99", planId: "plan_o0gy4HHXJvW8s", badge: "Complete Database" }
    ],
    faqs: [
      { q: "What types of education institutions are included?", a: "The dataset covers schools, universities, training centers, tutoring services, online education providers, and other education businesses." },
      { q: "Can I filter by institution type?", a: "Contact us for custom datasets filtered by institution type, size, level, or geography." },
      { q: "Is this data for US institutions only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the education data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["automotive", "construction", "accounting-finance", "clinics", "dentists", "home-services", "restaurants-cafes", "events-leisure", "food-beverage", "agencies-business", "beauty-wellness", "hotels-hospitality", "legal", "logistics", "real-estate"],
    bundles: ["ecommerce-growth", "all-industry"]
  },
  {
    slug: "home-services",
    name: "Home Services",
    metaDesc: "Leads Pitch verified home services business data — plumbers, electricians, HVAC, landscapers, and home improvement pros.",
    heroSub: "Plumbers, electricians, HVAC, landscapers, and home improvement pros. Verified contacts for B2B outreach.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "26K", price: "$25.98", member: "$15.59", planId: "plan_rYOE7Pa1IwtEX", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "100K", price: "$45.98", member: "$27.59", planId: "plan_fNNqudcMlAfUS", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "170K", price: "$75.98", member: "$45.59", planId: "plan_VK3Mh1DEZaAJh", badge: "Best Value" },
      { plan: "Business", emails: "100K", leads: "350K", price: "$129.98", member: "$77.99", planId: "plan_29buO0Nuxi5AY", badge: "High Volume" },
      { plan: "Scale", emails: "200K", leads: "700K", price: "$199.98", member: "$119.99", planId: "plan_u7qkytrQyD4O3", badge: "Massive Volume" },
      { plan: "Enterprise", emails: "300K", leads: "1.05M", price: "$259.98", member: "$155.99", planId: "plan_cSbkrBP0VNNfm", badge: "Enterprise Ready" },
      { plan: "Complete Database", emails: "430K+", leads: "1.5M+", price: "$319.98", member: "$191.99", planId: "plan_FvQ4t6j8p9bxl", badge: "Complete Database" }
    ],
    faqs: [
      { q: "What types of home service businesses are included?", a: "The dataset covers plumbers, electricians, HVAC contractors, landscapers, roofers, painters, and other home improvement professionals." },
      { q: "Can I filter by trade or service type?", a: "Contact us for custom datasets filtered by trade, service area, or geography." },
      { q: "Is this data for US businesses only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the home services data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["automotive", "construction", "accounting-finance", "clinics", "dentists", "education", "restaurants-cafes", "events-leisure", "food-beverage", "agencies-business", "beauty-wellness", "hotels-hospitality", "legal", "logistics", "real-estate"],
    bundles: ["starter-duo", "real-estate-property", "trades-services", "local-business", "ultimate-local", "all-industry"]
  },
  {
    slug: "restaurants-cafes",
    name: "Restaurants & Cafes",
    metaDesc: "Leads Pitch verified restaurant and cafe business data — restaurants, cafes, coffee shops, bakeries, and food service businesses.",
    heroSub: "Restaurants, cafes, coffee shops, bakeries, and food service businesses. Niche-specific contact data for outreach and partnerships.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "28K", price: "$27.98", member: "$16.79", planId: "plan_mMF0oShgEGSQ8", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "100K", price: "$49.98", member: "$29.99", planId: "plan_KUWsYxK9okQIJ", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "170K", price: "$69.98", member: "$41.99", planId: "plan_fG1BGh7hVvOzP", badge: "Best Value" },
      { plan: "Business", emails: "100K", leads: "360K", price: "$129.98", member: "$77.99", planId: "plan_luUtDGUArZ6PD", badge: "High Volume" },
      { plan: "Enterprise", emails: "200K", leads: "760K+", price: "$199.98", member: "$119.99", planId: "plan_ocxXLHcwhISGX", badge: "Complete Database" }
    ],
    faqs: [
      { q: "What types of restaurants are included?", a: "The dataset covers full-service restaurants, fast casual, cafes, coffee shops, bakeries, food trucks, and other food service businesses." },
      { q: "Can I filter by cuisine or restaurant size?", a: "Contact us for custom datasets filtered by cuisine, seating capacity, or geography." },
      { q: "Is this data for US businesses only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the restaurant data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["automotive", "construction", "accounting-finance", "clinics", "dentists", "education", "home-services", "events-leisure", "food-beverage", "agencies-business", "beauty-wellness", "hotels-hospitality", "legal", "logistics", "real-estate"],
    bundles: ["hospitality-leisure", "local-business", "ultimate-local", "all-industry"]
  },
  {
    slug: "events-leisure",
    name: "Events & Leisure",
    metaDesc: "Leads Pitch verified events and leisure business data — event venues, planners, entertainment, and recreation providers.",
    heroSub: "Event venues, planners, entertainment companies, and recreation businesses. Verified contact data for partnerships.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "26K", price: "$25.98", member: "$15.59", planId: "plan_rQGK7oEwVAUY1", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "95K", price: "$45.98", member: "$27.59", planId: "plan_Jsdjhlr4EoV0n", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "155K", price: "$75.98", member: "$45.59", planId: "plan_Ol8Q9Ons3d3bH", badge: "Best Value" },
      { plan: "Business", emails: "110K", leads: "330K", price: "$125.98", member: "$75.59", planId: "plan_SALSxQPpqpXEZ", badge: "High Volume" }
    ],
    faqs: [
      { q: "What types of events businesses are included?", a: "The dataset covers event venues, event planners, entertainment companies, recreation facilities, and leisure businesses." },
      { q: "Can I filter by venue type or event size?", a: "Contact us for custom datasets filtered by venue type, event capacity, or geography." },
      { q: "Is this data for US businesses only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the events data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["automotive", "construction", "accounting-finance", "clinics", "dentists", "education", "home-services", "restaurants-cafes", "food-beverage", "agencies-business", "beauty-wellness", "hotels-hospitality", "legal", "logistics", "real-estate"],
    bundles: ["hospitality-leisure", "local-business", "ultimate-local", "all-industry"]
  },
  {
    slug: "food-beverage",
    name: "Food & Beverage Suppliers",
    metaDesc: "Leads Pitch verified food and beverage supplier business data — distributors, manufacturers, and suppliers.",
    heroSub: "Food distributors, beverage suppliers, manufacturers, and wholesale businesses. Verified business data for sales intelligence.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "26K", price: "$27.98", member: "$16.79", planId: "plan_lFpGgxKnvWr8b", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "95K", price: "$49.98", member: "$29.99", planId: "plan_ndKq3UlhuOB6M", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "165K", price: "$79.98", member: "$47.99", planId: "plan_jwlcTHlCbwphB", badge: "Best Value" },
      { plan: "Business", emails: "100K", leads: "340K", price: "$135.98", member: "$81.59", planId: "plan_1sCGEBxSkFqZ3", badge: "High Volume" },
      { plan: "Enterprise", emails: "170K", leads: "620K+", price: "$219.98", member: "$131.99", planId: "plan_ZnHpu2j2usvzX", badge: "Complete Database" }
    ],
    faqs: [
      { q: "What types of food and beverage businesses are included?", a: "The dataset covers food distributors, beverage suppliers, manufacturers, wholesalers, and other F&B supply chain businesses." },
      { q: "Can I filter by product category?", a: "Contact us for custom datasets filtered by product type, distribution area, or geography." },
      { q: "Is this data for US businesses only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the F&B data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["automotive", "construction", "accounting-finance", "clinics", "dentists", "education", "home-services", "restaurants-cafes", "events-leisure", "agencies-business", "beauty-wellness", "hotels-hospitality", "legal", "logistics", "real-estate"],
    bundles: ["hospitality-leisure", "local-business", "ultimate-local", "all-industry"]
  },
  {
    slug: "agencies-business",
    name: "Agencies & Business Services",
    metaDesc: "Leads Pitch verified agency and business services data — business services agencies, consulting firms, and B2B service providers.",
    heroSub: "business services agencies, consulting firms, IT services, and B2B service providers. Verified contact data for partnerships.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "26K", price: "$25.98", member: "$15.59", planId: "plan_nAfRyWgBLPUGR", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "100K", price: "$47.98", member: "$28.79", planId: "plan_7lQdttPlCVPjT", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "170K", price: "$77.98", member: "$46.79", planId: "plan_3sP56E6iEeyrP", badge: "Best Value" },
      { plan: "Business", emails: "100K", leads: "350K", price: "$129.98", member: "$77.99", planId: "plan_LDvgfXk9GIy3U", badge: "High Volume" },
      { plan: "Enterprise", emails: "300K", leads: "1.05M+", price: "$269.98", member: "$161.99", planId: "plan_CkJzlt32zgUCU", badge: "Complete Database" }
    ],
    faqs: [
      { q: "What types of agencies are included?", a: "The dataset covers business services agencies, consulting firms, consulting companies, IT service providers, and other B2B service businesses." },
      { q: "Can I filter by agency specialty?", a: "Contact us for custom datasets filtered by agency type, size, or geography." },
      { q: "Is this data for US agencies only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the agency data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["automotive", "construction", "accounting-finance", "clinics", "dentists", "education", "home-services", "restaurants-cafes", "events-leisure", "food-beverage", "beauty-wellness", "hotels-hospitality", "legal", "logistics", "real-estate"],
    bundles: ["professional-services", "ecommerce-growth", "all-industry"]
  },
  {
    slug: "beauty-wellness",
    name: "Beauty & Wellness",
    metaDesc: "Leads Pitch verified beauty and wellness business data — salons, spas, clinics, and wellness providers.",
    heroSub: "Salons, spas, wellness centers, and beauty businesses. Verified business data for sales intelligence.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "24K", price: "$23.98", member: "$14.39", planId: "plan_hmiPPHfCuoFES", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "90K", price: "$43.98", member: "$26.39", planId: "plan_fRYKIPQCp1y7B", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "150K", price: "$71.98", member: "$43.19", planId: "plan_gvnuFaCL4KARR", badge: "Best Value" },
      { plan: "Business", emails: "100K", leads: "320K", price: "$123.98", member: "$74.39", planId: "plan_QJBO3labbblD0", badge: "High Volume" },
      { plan: "Enterprise", emails: "200K", leads: "680K+", price: "$189.98", member: "$113.99", planId: "plan_bUc6UHgQA9TBT", badge: "Complete Database" }
    ],
    faqs: [
      { q: "What types of beauty and wellness businesses are included?", a: "The dataset covers hair salons, nail salons, spas, day spas, med spas, wellness centers, and other beauty and wellness service providers." },
      { q: "Can I filter by service type?", a: "Contact us for custom datasets filtered by business type, services offered, or geography." },
      { q: "Is this data for US businesses only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the beauty & wellness data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["automotive", "construction", "accounting-finance", "clinics", "dentists", "education", "home-services", "restaurants-cafes", "events-leisure", "food-beverage", "agencies-business", "hotels-hospitality", "legal", "logistics", "real-estate"],
    bundles: ["starter-duo", "healthcare-wellness", "local-business", "ultimate-local", "all-industry"]
  },
  {
    slug: "hotels-hospitality",
    name: "Hotels & Hospitality",
    metaDesc: "Leads Pitch verified hotel and hospitality business data — hotels, resorts, B&Bs, and hospitality providers.",
    heroSub: "Hotels, resorts, bed & breakfasts, and hospitality businesses. Verified business data for sales intelligence.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "25K", price: "$31.98", member: "$19.19", planId: "plan_RNOO9E7FfPV3d", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "90K", price: "$55.98", member: "$33.59", planId: "plan_etAl1Y5sjlREF", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "155K", price: "$89.98", member: "$53.99", planId: "plan_6ALX0u0p5tZ1H", badge: "Best Value" },
      { plan: "Business", emails: "75K", leads: "250K", price: "$139.98", member: "$83.99", planId: "plan_yoU0XHohrynoD", badge: "Complete Database" }
    ],
    faqs: [
      { q: "What types of hospitality businesses are included?", a: "The dataset covers hotels, resorts, bed & breakfasts, inns, motels, and other hospitality providers." },
      { q: "Can I filter by property type or size?", a: "Contact us for custom datasets filtered by property type, room count, or geography." },
      { q: "Is this data for US businesses only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the hospitality data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["automotive", "construction", "accounting-finance", "clinics", "dentists", "education", "home-services", "restaurants-cafes", "events-leisure", "food-beverage", "agencies-business", "beauty-wellness", "legal", "logistics", "real-estate"],
    bundles: ["hospitality-leisure", "ultimate-local", "all-industry"]
  },
  {
    slug: "legal",
    name: "Legal",
    metaDesc: "Leads Pitch verified legal niche business data — law firms, attorneys, and legal practices.",
    heroSub: "Law firms, solo practitioners, and legal service providers. Verified contact data for business development and partnerships.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "24K", price: "$27.98", member: "$16.79", planId: "plan_blFovqQUkQlgO", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "90K", price: "$41.98", member: "$25.19", planId: "plan_axHYteeaF6X31", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "145K", price: "$69.98", member: "$41.99", planId: "plan_9PQiFOoZGAMHI", badge: "Best Value" },
      { plan: "Business", emails: "100K", leads: "300K", price: "$119.98", member: "$71.99", planId: "plan_0crzreWdanZmf", badge: "High Volume" },
      { plan: "Enterprise", emails: "300K", leads: "900K+", price: "$259.98", member: "$155.99", planId: "plan_SHLvXWJZcuRKQ", badge: "Complete Database" }
    ],
    faqs: [
      { q: "What types of legal practices are included?", a: "The dataset covers law firms of all sizes, solo practitioners, corporate legal departments, and legal service providers." },
      { q: "Can I filter by practice area?", a: "Contact us for custom datasets filtered by practice area, firm size, or geography." },
      { q: "Is this data compliant with legal advertising rules?", a: "We provide publicly available business contact information. Review your jurisdiction's advertising rules before starting outreach." },
      { q: "How often is the legal dataset updated?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["automotive", "construction", "accounting-finance", "clinics", "dentists", "education", "home-services", "restaurants-cafes", "events-leisure", "food-beverage", "agencies-business", "beauty-wellness", "hotels-hospitality", "logistics", "real-estate"],
    bundles: ["professional-services", "premium-high-ticket", "all-industry"]
  },
  {
    slug: "logistics",
    name: "Logistics & Transportation",
    metaDesc: "Leads Pitch verified logistics and transportation business data — freight, trucking, warehousing, and supply chain companies.",
    heroSub: "Freight companies, trucking firms, warehouses, and supply chain businesses. Verified contact data for partnerships.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "24K", price: "$23.98", member: "$14.39", planId: "plan_KnDso3aEfemUP", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "85K", price: "$39.98", member: "$23.99", planId: "plan_Cl6ge8GnVX7r0", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "140K", price: "$65.98", member: "$39.59", planId: "plan_sHrsVW9guBIaV", badge: "Best Value" },
      { plan: "Business", emails: "85K", leads: "255K", price: "$109.98", member: "$65.99", planId: "plan_aZszGE9qHLc4M", badge: "Complete Database" }
    ],
    faqs: [
      { q: "What types of logistics companies are included?", a: "The dataset covers freight carriers, trucking companies, warehousing, 3PL providers, last-mile delivery, and supply chain businesses." },
      { q: "Can I filter by fleet size or equipment type?", a: "Contact us for custom datasets with fleet size, equipment type, or other specific filters." },
      { q: "Is this data for US companies only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the logistics data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["automotive", "construction", "accounting-finance", "clinics", "dentists", "education", "home-services", "restaurants-cafes", "events-leisure", "food-beverage", "agencies-business", "beauty-wellness", "hotels-hospitality", "legal", "real-estate"],
    bundles: ["ecommerce-growth", "trades-services", "all-industry"]
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    metaDesc: "Leads Pitch verified real estate business data — realtors, brokers, property managers, and real estate professionals.",
    heroSub: "Realtors, brokers, property managers, and real estate professionals. Verified contacts for verified outreach.",
    oneTime: [
      { plan: "Starter", emails: "1K", leads: "3K", price: "$15.98", member: "$9.59", planId: "plan_1xeQn9BxBQy6H", badge: "Entry Plan" },
      { plan: "Growth", emails: "2.5K", leads: "8K", price: "$23.98", member: "$14.39", planId: "plan_k5KCXjTYEJ5tT", badge: "Most Popular" },
      { plan: "Professional", emails: "5K", leads: "16K", price: "$35.98", member: "$21.59", planId: "plan_1S7ufkiT91vAh", badge: "Most Popular" },
      { plan: "Business", emails: "10K", leads: "32K", price: "$55.98", member: "$33.59", planId: "plan_WwQZaGAU9sAwZ", badge: "Best Value" },
      { plan: "Scale", emails: "25K", leads: "80K", price: "$89.98", member: "$53.99", planId: "plan_gFmnytXJab25o", badge: "High Volume" },
      { plan: "Enterprise", emails: "50K", leads: "160K", price: "$139.98", member: "$83.99", planId: "plan_i9dflQdPIbgw4", badge: "Complete Database" }
    ],
    faqs: [
      { q: "What types of real estate professionals are included?", a: "The dataset covers realtors, brokers, property managers, leasing agents, real estate developers, and other real estate professionals." },
      { q: "Can I filter by property type or specialty?", a: "Contact us for custom datasets filtered by residential, commercial, property type, or geography." },
      { q: "Is this data for US professionals only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the real estate data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["automotive", "construction", "accounting-finance", "clinics", "dentists", "education", "home-services", "restaurants-cafes", "events-leisure", "food-beverage", "agencies-business", "beauty-wellness", "hotels-hospitality", "legal", "logistics"],
    bundles: ["real-estate-property", "premium-high-ticket", "all-industry"]
  }
];

// Per-industry SEO data (titles, H1s, intro copy, and keyword lists from SEO research)
const industrySeo = {
  "automotive": {
    title: "Buy Automotive Leads | Verified Auto Dealer & Repair Shop Contact Lists | LeadsPitch",
    h1: "Get verified automotive leads & contact lists",
    intro: "Verified automotive business leads for dealerships, repair shops, parts suppliers, and auto service providers. Get verified ${data.name.toLowerCase()} business data — contacts and decision-makers as a one-time CSV pack —.",
    keywords: ["buy automotive leads", "auto dealer contact list", "automotive business business database", "verified auto shop leads", "buy automotive lead packs", "car dealership owner contacts", "local auto service leads", "targeted automotive B2B leads", "fresh automotive contact packs", "automotive decision maker data"]
  },
  "construction": {
    title: "Buy Construction Leads | Verified Contractor business databases & Datasets | LeadsPitch",
    h1: "Get verified construction leads & contractor contact lists",
    intro: "Target general contractors, builders, and subcontractors with verified construction leads. Buy a contractor business database, local construction leads, or targeted construction B2B leads as a one-time CSV pack —.",
    keywords: ["buy construction leads", "contractor business database", "verified contractor contact database", "construction company owner contacts", "buy contractor lead packs", "local construction leads", "general contractor contact list", "targeted construction B2B leads", "fresh contractor leads for sale", "construction decision maker data"]
  },
  "accounting-finance": {
    title: "Buy Accounting & Finance Leads | Verified CPA & Bookkeeper Contact Lists | LeadsPitch",
    h1: "Get verified accounting & finance leads",
    intro: "Reach CPAs, bookkeepers, financial advisors, and accounting firms with verified accounting leads. Buy an accounting business database, local CPA contacts, or targeted finance B2B leads as a one-time CSV pack —.",
    keywords: ["buy accounting leads", "CPA contact list", "accounting firm business database", "verified bookkeeper leads", "buy finance lead packs", "financial advisor contacts", "local accounting business leads", "targeted CPA leads", "fresh accounting contact packs", "accounting decision maker data"]
  },
  "clinics": {
    title: "Buy Healthcare & Clinic Leads | Verified Medical Practice Contact Lists | LeadsPitch",
    h1: "Get verified healthcare & clinic leads",
    intro: "Target medical practices, clinics, and healthcare providers with verified healthcare leads. Buy a clinic business database, local practice contacts, or targeted healthcare B2B leads as a one-time CSV pack —.",
    keywords: ["buy healthcare leads", "clinic contact list", "medical practice business database", "verified healthcare leads", "buy clinic lead packs", "hospital and practice contacts", "local healthcare business leads", "targeted medical leads", "fresh healthcare contact packs", "healthcare decision maker data"]
  },
  "dentists": {
    title: "Buy Dentist Leads | Verified Dental Practice Contact Lists | LeadsPitch",
    h1: "Get verified dentist leads & dental practice contacts",
    intro: "Build your dental outreach pipeline with verified dentist leads. Buy a dental practice business database, orthodontist contacts, or local dentist leads as a one-time CSV pack —.",
    keywords: ["buy dentist leads", "dental practice contact list", "dentist business database", "verified dental leads database", "buy orthodontist lead packs", "oral surgeon contacts", "local dental practice leads", "targeted dentist leads", "fresh dental contact packs", "dental decision maker data"]
  },
  "education": {
    title: "Buy Education & Training Leads | Verified School Contact Lists | LeadsPitch",
    h1: "Get verified education & training leads",
    intro: "Target schools, universities, training centers, and education providers with verified education leads. Buy a school business database, training center contacts, or targeted education B2B leads as a one-time CSV pack —.",
    keywords: ["buy education leads", "school contact list", "education business database", "verified training center leads", "buy education lead packs", "university and school contacts", "local education business leads", "targeted training leads", "fresh education contact packs", "education decision maker data"]
  },
  "home-services": {
    title: "Buy Home Services Leads | Verified Plumber & HVAC Contact Lists | LeadsPitch",
    h1: "Get verified home services leads",
    intro: "Reach plumbers, electricians, HVAC contractors, and home improvement professionals with verified home services leads. Buy a contractor business database, local trades contacts, or targeted home services B2B leads as a one-time CSV pack —.",
    keywords: ["buy home services leads", "plumber contact list", "HVAC business database", "verified contractor leads", "buy home improvement lead packs", "electrician and landscaper contacts", "local home services business leads", "targeted trades leads", "fresh home services contact packs", "home services decision maker data"]
  },
  "restaurants-cafes": {
    title: "Buy Restaurant Leads | Verified Restaurant & Cafe Contact Lists | LeadsPitch",
    h1: "Get verified restaurant & cafe leads",
    intro: "Grow your food service client base with verified restaurant leads. Buy a restaurant business database, local restaurant owner contacts, or targeted cafe and coffee shop leads as a one-time CSV pack —.",
    keywords: ["buy restaurant leads", "restaurant owner contact list", "restaurant business database", "verified restaurant leads", "cafe and coffee shop leads", "local restaurant business leads", "restaurant and hotel contacts", "fresh restaurant contact packs", "restaurant decision maker data", "food service leads"]
  },
  "events-leisure": {
    title: "Buy Events & Leisure Leads | Verified Event Venue Contact Lists | LeadsPitch",
    h1: "Get verified events & leisure leads",
    intro: "Target event venues, planners, and recreation businesses with verified events leads. Buy an event venue contact list or leisure business leads as a one-time CSV pack —.",
    keywords: ["buy events leads", "event venue contact list", "events business database", "verified events leads", "buy events lead packs", "event planner contacts", "local events business leads", "targeted leisure leads", "fresh events contact packs", "events decision maker data"]
  },
  "food-beverage": {
    title: "Buy Food & Beverage Supplier Leads | Verified F&B Contact Lists | LeadsPitch",
    h1: "Get verified food & beverage supplier leads",
    intro: "Reach distributors, manufacturers, and wholesale suppliers with verified food and beverage leads. Buy a food supplier business database or targeted F&B B2B leads as a one-time CSV pack —.",
    keywords: ["buy food and beverage leads", "food distributor contact list", "F&B business database", "verified food supplier leads", "buy food supply lead packs", "wholesale food contacts", "local F&B business leads", "targeted beverage supplier leads", "fresh food contact packs", "food and beverage decision maker data"]
  },
  "agencies-business": {
    title: "Buy Marketing Agency Leads | Verified Agency & Business Services Contacts | LeadsPitch",
    h1: "Get verified business services agency leads",
    intro: "Target business services agencies, consulting firms, and B2B service providers with verified agency leads. Get an agency business database or professional services contact pack as a one-time CSV —.",
    keywords: ["buy agency leads", "business agency contact list", "agency business database", "verified agency leads database", "buy agency lead packs", "consulting firm owner contacts", "local agency leads", "targeted B2B service leads", "fresh agency contact packs", "agency decision maker data"]
  },
  "beauty-wellness": {
    title: "Buy Beauty & Wellness Leads | Verified Salon & Spa Contact Lists | LeadsPitch",
    h1: "Get verified beauty & wellness leads",
    intro: "Target salons, spas, wellness centers, and beauty businesses with verified beauty & wellness leads. Buy a salon business database, spa owner contacts, or targeted beauty business leads as a one-time CSV pack —.",
    keywords: ["buy beauty leads", "salon contact list", "spa business database", "verified beauty business leads", "buy wellness lead packs", "salon owner contacts", "local beauty business leads", "targeted wellness leads", "fresh beauty contact packs", "beauty and wellness decision maker data"]
  },
  "hotels-hospitality": {
    title: "Buy Hotel & Hospitality Leads | Verified Hotel Owner Contact Lists | LeadsPitch",
    h1: "Get verified hotel & hospitality leads",
    intro: "Reach hotel owners, resorts, and hospitality providers with verified hospitality leads. Buy a hotel owner contact list or local hotel and travel leads as a one-time CSV pack —.",
    keywords: ["buy hospitality leads", "hotel owner contact list", "hotel business database", "verified hospitality leads", "buy hospitality lead packs", "resort and B&B contacts", "local hotel leads", "targeted tourism business leads", "fresh hospitality contact packs", "hospitality decision maker data"]
  },
  "legal": {
    title: "Buy Lawyer Leads | Verified Attorney & Law Firm business databases | LeadsPitch",
    h1: "Get verified lawyer leads & attorney contact lists",
    intro: "Build your legal business development pipeline with verified lawyer leads. Buy an attorney business database, law firm owner contacts, or local law firm leads as a one-time CSV pack —.",
    keywords: ["buy lawyer leads", "attorney contact list", "law firm business database", "verified lawyer leads database", "buy attorney lead packs", "legal practice owner contacts", "local law firm leads", "targeted legal professional leads", "fresh lawyer contact packs", "lawyer decision maker data"]
  },
  "logistics": {
    title: "Buy Logistics & Trucking Leads | Verified Logistics Company Contact Lists | LeadsPitch",
    h1: "Get verified logistics & transportation leads",
    intro: "Reach freight companies, trucking firms, and warehousing businesses with verified logistics leads. Buy a trucking company contact list or logistics business database as a one-time CSV pack —.",
    keywords: ["buy logistics leads", "trucking company contact list", "logistics and transport business database", "verified logistics leads", "buy transport lead packs", "freight and shipping contacts", "local logistics business leads", "targeted logistics B2B leads", "fresh logistics contact packs", "transport decision maker data"]
  },
  "real-estate": {
    title: "Buy Real Estate Leads | Verified Realtor & Broker Contact Lists | LeadsPitch",
    h1: "Get verified real estate leads & agent contact lists",
    intro: "Target realtors, brokers, property managers, and real estate professionals with verified real estate leads. Buy a realtor business database, local agent contacts, or targeted real estate B2B leads as a one-time CSV pack —.",
    keywords: ["buy real estate leads", "realtor contact list", "real estate agent business database", "verified realtor leads", "buy real estate lead packs", "broker and property manager contacts", "local real estate business leads", "targeted real estate agent leads", "fresh real estate contact packs", "real estate decision maker data"]
  },
};

// Bundle data
const bundleData = {
  "starter-duo": {
    name: "Starter Duo Pack",
    industries: ["Home Services", "Beauty & Wellness"],
    tiers: [
      { label: "5K/niche", price: "$79", planId: "plan_pa1W11zZOlnur" },
      { label: "25K/niche", price: "$299", planId: "plan_xayb8cL86uwWd" },
      { label: "50K/niche", price: "$499", planId: "plan_GOujg0WhjvMu3" }
    ],
    save: "$100"
  },
  "healthcare-wellness": {
    name: "Healthcare & Wellness Pack",
    industries: ["Clinics", "Dentists", "Beauty & Wellness"],
    tiers: [
      { label: "5K/niche", price: "$119", planId: "plan_jXy1ZlO5l6TcK" },
      { label: "25K/niche", price: "$429", planId: "plan_6lmHM90X3Umy4" },
      { label: "50K/niche", price: "$699", planId: "plan_FhskaTVegQ4rO" }
    ],
    save: "$200"
  },
  "real-estate-property": {
    name: "Real Estate & Property Pack",
    industries: ["Real Estate", "Construction", "Home Services"],
    tiers: [
      { label: "5K/niche", price: "$139", planId: "plan_IQJOItoAnyUS5" },
      { label: "25K/niche", price: "$499", planId: "plan_Q0KmxoQlNBs2j" },
      { label: "50K/niche", price: "$829", planId: "plan_qonxYDoFFjM2r" }
    ],
    save: "$70"
  },
  "professional-services": {
    name: "Professional Services Pack",
    industries: ["Legal", "Accounting & Finance", "Agencies & Business Services"],
    tiers: [
      { label: "5K/niche", price: "$139", planId: "plan_79rDxSo35wYFt" },
      { label: "25K/niche", price: "$499", planId: "plan_tbxF5LC6aDf5x" },
      { label: "50K/niche", price: "$829", planId: "plan_JuDx5EnzLqwTf" }
    ],
    save: "$70"
  },
  "ecommerce-growth": {
    name: "E-commerce & Growth Pack",
    industries: ["Agencies & Business Services", "Logistics & Transportation", "Education & Training"],
    tiers: [
      { label: "5K/niche", price: "$119", planId: "plan_Zq7rsVu3XN79k" },
      { label: "25K/niche", price: "$429", planId: "plan_Q3YqRzfdM7hj3" },
      { label: "50K/niche", price: "$699", planId: "plan_7hwzboPBsTIBi" }
    ],
    save: "$200"
  },
  "trades-services": {
    name: "Trades & Services Pack",
    industries: ["Construction", "Automotive", "Home Services", "Logistics & Transportation"],
    tiers: [
      { label: "5K/niche", price: "$159", planId: "plan_a17sf40GB4sSq" },
      { label: "25K/niche", price: "$579", planId: "plan_s8ai146OhdlBs" },
      { label: "50K/niche", price: "$949", planId: "plan_UDVIHrsM4EPZz" }
    ],
    save: "$250"
  },
  "hospitality-leisure": {
    name: "Hospitality & Leisure Pack",
    industries: ["Hotels & Hospitality", "Restaurants & Cafes", "Events & Leisure", "Food & Beverage Suppliers"],
    tiers: [
      { label: "5K/niche", price: "$149", planId: "plan_ygqz0vFsjxwcr" },
      { label: "25K/niche", price: "$549", planId: "plan_HGQxn8uJQeVvt" },
      { label: "50K/niche", price: "$899", planId: "plan_qQaXtvMLSuWNa" }
    ],
    save: "$300"
  },
  "premium-high-ticket": {
    name: "Premium High-Ticket Pack",
    industries: ["Legal", "Accounting & Finance", "Real Estate", "Clinics", "Dentists"],
    tiers: [
      { label: "5K/niche", price: "$199", planId: "plan_ft4tybCPjJLmX" },
      { label: "25K/niche", price: "$749", planId: "plan_1eHcyozlhMQKT" },
      { label: "50K/niche", price: "$1,249", planId: "plan_cj1q71o9E3UCt" }
    ],
    save: "$250"
  },
  "local-business": {
    name: "Local Business Pack",
    industries: ["Home Services", "Beauty & Wellness", "Food & Beverage Suppliers", "Restaurants & Cafes", "Automotive", "Events & Leisure"],
    tiers: [
      { label: "5K/niche", price: "$249", planId: "plan_h4Fmt2aBvClcu" },
      { label: "25K/niche", price: "$899", planId: "plan_1sGv0yL2wDjxH" },
      { label: "50K/niche", price: "$1,499", planId: "plan_CcZS2C0ZnayaD" }
    ],
    save: "$300"
  },
  "ultimate-local": {
    name: "Ultimate Local Domination",
    industries: ["Home Services", "Beauty & Wellness", "Food & Beverage Suppliers", "Restaurants & Cafes", "Automotive", "Events & Leisure", "Hotels & Hospitality", "Construction"],
    tiers: [
      { label: "5K/niche", price: "$279", planId: "plan_4WA6zwoGOKYXx" },
      { label: "25K/niche", price: "$999", planId: "plan_v9DKFQz6VqKPa" },
      { label: "50K/niche", price: "$1,699", planId: "plan_xT3Fjhem1lnrK" }
    ],
    save: "$700"
  },
  "all-industry": {
    name: "All-Industry Domination",
    industries: ["Automotive", "Construction", "Accounting & Finance", "Clinics", "Dentists", "Education & Training", "Home Services", "Restaurants & Cafes", "Events & Leisure", "Food & Beverage Suppliers", "Agencies & Business Services", "Beauty & Wellness", "Hotels & Hospitality", "Legal", "Logistics & Transportation", "Real Estate"],
    tiers: [
      { label: "5K/niche", price: "$599", planId: "plan_5zuWegWTFoKO8" },
      { label: "25K/niche", price: "$1,999", planId: "plan_RqlSlFod3fdse" },
      { label: "50K/niche", price: "$2,500", planId: "plan_X1oLU4JIVRuYE" }
    ],
    save: "$1,800"
  }
};

// All industries for the "More Industries" grid
const allIndustryLinks = industries.map(i => ({ slug: i.slug, name: i.name }));

// Template function
function generatePage(data) {
  // An industry is "soon" (coming soon) when its purchase links are still placeholders
  const soon = data.oneTime.every(p => p.link === '#');
  const seo = industrySeo[data.slug] || {
    title: data.name + ' Dataset | LeadsPitch',
    h1: data.name + ' business data',
    intro: data.heroSub,
    keywords: []
  };
  const pageUrl = 'https://leadspitch.com/industries/' + data.slug;
  const canonicalUrl = 'https://leadspitch.com/industries/' + data.slug;
  const availability = soon ? 'https://schema.org/PreOrder' : 'https://schema.org/InStock';

  // Build "Explore More Datasets" pills (all related industries, duplicated for seamless loop)
  const exploreIndustries = data.related
    ? data.related.map(slug => allIndustryLinks.find(i => i.slug === slug)).filter(Boolean)
    : allIndustryLinks.filter(i => i.slug !== data.slug);
  const explorePills = exploreIndustries.map(i =>
    `              <a class="explore-pill" href="/industries/${i.slug}">${i.name}</a>`
  ).join('\n');
  const exploreIndustriesHtml = explorePills + '\n' + explorePills + '\n' + explorePills;

  // Qualitative comparison table (no specific competitor pricing claims)
  const comparisonHtml = `
    <hr class="section-divider">

    <!-- Comparison -->
    <section id="compare">
      <div class="wrap">
        <div class="section-head">
          <h2>How we compare with typical B2B data platforms</h2>
          <p class="compare-lede">No per-seat software, no credit meters, no dashboard to learn. You get a finished dataset and get on with your work.</p>
        </div>
        <div class="compare-table-wrap reveal">
          <table class="compare-table">
            <thead>
              <tr>
                <th scope="col">What matters</th>
                <th scope="col">LeadsPitch</th>
                <th scope="col">Typical SaaS data platform</th>
                <th scope="col">DIY data collection</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Pricing model</th><td>One-time packs, no subscription</td><td>Per-seat subscriptions with credits</td><td>Usage-based, pay per extraction</td></tr>
              <tr><th scope="row">Data verification</th><td>Verified contacts included</td><td>Verification often an add-on</td><td>You verify everything yourself</td></tr>
              <tr><th scope="row">Setup time</th><td>CSV / Excel, ready to use</td><td>Onboarding, tools, integrations</td><td>Infrastructure and code required</td></tr>
              <tr><th scope="row">Minimum commitment</th><td>None — buy what you need</td><td>Annual contracts are common</td><td>Time and technical effort</td></tr>
              <tr><th scope="row">Support</th><td>Direct, human support</td><td>Ticket queues</td><td>Community forums</td></tr>
              <tr><th scope="row">Format</th><td>CSV / Excel, ready to use</td><td>API and CRM focused</td><td>Raw unverified data</td></tr>
            </tbody>
          </table>
        </div>
        <p class="compare-note">Plans and features change often. This comparison focuses on how business contact data is sold, not on specific competitor pricing.</p>
      </div>
    </section>`;

  // Build one-time pricing cards
  const badgeTips = {
    "Entry Plan": "A small, affordable sample to test the quality of the dataset.",
    "Great Value": "Low cost per record for entry-level outreach.",
    "Most Popular": "The tier most buyers choose — the best balance of price and volume.",
    "Best Value": "The best per-record price for most dataset sizes.",
    "High Volume": "Built for larger datasets and sustained data volume.",
    "Massive Volume": "For high-volume data across a wide audience.",
    "Enterprise Ready": "Ready for enterprise-scale outreach and integrations.",
    "Growing Enterprise": "A stepping stone for teams scaling their outreach.",
    "Complete Database": "Every verified record we currently have for this industry.",
    "Complete Coverage": "Full coverage of verified records in this industry.",
    "Scale": "Maximum volume for agency and enterprise datasets."
  };
  const infoIcon = '<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor"/><path d="M8 7v4M8 5.5v0" stroke="currentColor" stroke-linecap="round"/></svg>';
  const oneTimeCardsHtml = data.oneTime.map((p, i) => {
    const isFeatured = p.badge === "Most Popular" || p.badge === "Best Value";
    const isLarge = i < 2;
    const featuredClass = isFeatured ? ' product-card--featured' : '';
    const largeClass = isLarge ? ' product-card--large' : '';
    const badgeTip = p.badge ? (badgeTips[p.badge] || 'About this ' + data.name + ' plan.') : '';
    const badgeHtml = p.badge
      ? `<span class="tooltip-wrap"><span class="product-badge">${p.badge}</span><span class="tooltip">${badgeTip}</span></span>`
      : '';
    const memberHtml = soon
      ? `<div class="product-member product-member--soon">Coming soon — request access</div>`
      : `<div class="product-member">40% off with membership: ${p.member}</div>`;
    const ctaHtml = soon
      ? `<a class="product-cta btn-outline" href="/contact">Request access</a>`
      : `<button class="product-cta btn-primary" data-plan="${p.plan.toLowerCase().replace(/\s+/g, '-')}" type="button">Get now</button>`;
    const leadsTip = `Total ${data.name.toLowerCase()} business records in this dataset.`;
    const emailsTip = 'Verified email addresses included in this dataset.';
    return `          <div class="product-card${featuredClass}${largeClass}">
            <div class="product-head">
              <h3 class="product-plan">${p.plan}</h3>
              ${badgeHtml}
            </div>
            <p class="product-subtitle">
              <span class="product-subtitle-item"><span class="product-subtitle-num">${p.leads}</span> <span class="product-subtitle-label">Leads</span> <span class="tooltip-wrap tooltip-icon">${infoIcon}<span class="tooltip">${leadsTip}</span></span></span>
            </p>
            <div class="product-price-row">
              <span class="product-badge product-badge--sale">20% OFF</span>
              <span class="product-price">${p.price}</span>
              <span class="product-price-note">one-time</span>
            </div>
            ${memberHtml}
            ${ctaHtml}
            <div class="product-includes">
              <p class="product-includes-label">What's included</p>
              <ul class="product-includes-list">
                <li>Verified Emails</li>
                <li>Phone Numbers</li>
                <li>Company Name</li>
                <li>Contact Name</li>
                <li>Competitor Details</li>
                <li>City &amp; State</li>
                <li>Property Location</li>
                <li>Company Website</li>
                <li>Industry Information</li>
                <li>Rating &amp; Reviews</li>
              </ul>
              <button class="product-includes-more" type="button" aria-expanded="false">
                <span class="product-includes-more-label">Show more</span>
                <svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </button>
            </div>
          </div>`;
  }).join('\n');

  // Build FAQs
  const faqsHtml = data.faqs.map((f, i) => `
          <div class="faq-item">
            <button class="faq-q" type="button" aria-expanded="false" aria-controls="faq-${i}-answer">
              ${f.q}
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 7.5l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </button>
            <div class="faq-a" id="faq-${i}-answer"><div class="faq-a-text">
              ${f.a}
            </div></div>
          </div>`).join('\n');

  return `<!doctype html>
<html lang="en"><head>
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PWP5C6SP');</script>
<!-- End Google Tag Manager -->
  <meta charset="utf-8">
  <script>
    (function () {
      try {
        var t = localStorage.getItem("theme");
        if (t !== "light" && t !== "dark") {
          t = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
        }
        document.documentElement.setAttribute("data-theme", t);
      } catch (e) {}
    })();
  </script>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="../public/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="../public/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="../public/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="../public/apple-touch-icon.png">
  <link rel="manifest" href="../public/site.webmanifest">
  <title>${seo.title}</title>
  <meta name="description" content="${data.metaDesc}">
  <meta name="keywords" content="${seo.keywords.join(', ')}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:title" content="${seo.title}">
  <meta property="og:description" content="${data.metaDesc}">
  <meta property="og:type" content="product">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:site_name" content="LeadsPitch">
  <meta property="og:image" content="https://leadspitch.com/public/sample-excel.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${seo.title}">
  <meta name="twitter:description" content="${data.metaDesc}">
  <meta name="twitter:image" content="https://leadspitch.com/public/sample-excel.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet">
  <script async defer src="https://js.whop.com/static/checkout/loader.js"></script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LeadsPitch",
    "alternateName": ["Leads Pitch", "Lead Pitch", "leadspitch.com", "leadspitch"],
    "url": "https://leadspitch.com",
    "logo": "https://leadspitch.com/public/logo.png",
    "description": "Business data platform offering one-time dataset purchases and membership discounts across 15 industries.",
    "sameAs": []
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "LeadsPitch",
    "url": "https://leadspitch.com",
    "description": "Buy verified, industry-specific business leads as ready-to-use CSV datasets."
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "${data.name} Dataset",
    "description": "${data.metaDesc}",
    "url": "${pageUrl}",
    "image": "https://leadspitch.com/public/sample-excel.png",
    "brand": { "@type": "Organization", "name": "LeadsPitch" },
    "category": "${data.name}",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "${data.oneTime[0].price.replace('$','')}",
      "highPrice": "${data.oneTime[data.oneTime.length-1].price.replace('$','')}",
      "priceCurrency": "USD",
      "availability": "${availability}"
    }
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://leadspitch.com/" },
      { "@type": "ListItem", "position": 2, "name": "Industries", "item": "https://leadspitch.com/industries" },
      { "@type": "ListItem", "position": 3, "name": "${data.name}", "item": "${pageUrl}" }
    ]
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
${data.faqs.map(f => `      {
        "@type": "Question",
        "name": ${JSON.stringify(f.q)},
        "acceptedAnswer": { "@type": "Answer", "text": ${JSON.stringify(f.a)} }
      }`).join(',\n')}
    ]
  }
  </script>
  <style>
    :root {
      --bg: #000000;
      --bg-elevated: #0a0a0a;
      --surface: #111113;
      --surface-2: #1a1a1e;
      --fg: #f0f0f2;
      --muted: #a0a0a8;
      --faint: #6b6b73;
      --border: #222228;
      --border-soft: #1a1a1e;
      --accent: #3b82f6;
      --accent-soft: rgba(59, 130, 246, 0.1);
      --accent-text: #3b82f6;
      --success: #22c55e;
      --warning: #f59e0b;
      --error: #ef4444;
      --font-display: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --font-mono: "SF Mono", "JetBrains Mono", ui-monospace, Menlo, monospace;
      --radius: 999px;
      --max: 1120px;
      --gutter: clamp(1.25rem, 4vw, 2.5rem);
      --nav-h: 72px;
    }
    [data-theme="light"] {
      --bg: #ffffff;
      --bg-elevated: #f9fafb;
      --surface: #ffffff;
      --surface-2: #f3f4f6;
      --fg: #111111;
      --muted: #374151;
      --faint: #6b7280;
      --border: #e5e7eb;
      --border-soft: #f3f4f6;
      --accent: #3b82f6;
      --accent-soft: rgba(59, 130, 246, 0.08);
      --accent-text: #3b82f6;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; scroll-padding-top: 80px; }
    body {
      font-family: var(--font-body); font-size: 16px; line-height: 1.6;
      color: var(--fg); background: var(--bg);
      -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
    }
    img, svg { display: block; max-width: 100%; }
    a { color: inherit; text-decoration: none; }
    button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }
    :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
    .wrap { max-width: var(--max); margin: 0 auto; padding: 0 var(--gutter); }

    /* Nav */
    .site-header {
      position: sticky;
      top: 0;
      z-index: 50;
      height: var(--nav-h);
      background: transparent;
      transition: background 200ms ease;
    }
    .site-header.is-scrolled {
      background: rgba(15, 15, 15, 0.92);
      -webkit-backdrop-filter: blur(20px);
      backdrop-filter: blur(20px);
    }
    .nav {
      height: var(--nav-h);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      position: relative;
    }
    .header-logo {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: var(--ink);
      flex-shrink: 0;
      margin-left: 0.35rem;
    }
    .header-logo:hover { opacity: 0.7; }
    .header-logo-img {
      width: 48px;
      height: 48px;
      border-radius: 10px;
    }
    .header-logo-text {
      font-family: "Gevora", "Arial Black", Impact, sans-serif;
      font-size: 1.1rem;
      letter-spacing: 0.04em;
      font-weight: 400;
      text-transform: uppercase;
    }
    .logo {
      display: inline-flex;
      align-items: center;
      gap: 0.65rem;
      font-weight: 600;
      letter-spacing: -0.02em;
      font-size: 1.05rem;
      flex-shrink: 0;
    }
    .logo img {
      height: 24px;
      width: auto;
    }

    /* Pill Nav Container */
    .nav-pill {
      display: none;
      align-items: center;
      gap: 0.125rem;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 100px;
      padding: 0.375rem 0.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }
    @media (min-width: 768px) {
      .nav-pill { display: inline-flex; margin: 0 auto; }
    }
    .nav-pill a,
    .nav-pill .nav-dropdown-toggle {
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--muted);
      padding: 0.5rem 0.875rem;
      border-radius: 100px;
      white-space: nowrap;
      transition: color 180ms ease, background 180ms ease;
      text-decoration: none;
      position: relative;
    }
    .nav-pill a:hover,
    .nav-pill .nav-dropdown-toggle:hover {
      color: var(--fg);
      background: var(--surface-2);
    }
    .nav-pill a.active {
      color: var(--fg);
      background: var(--surface-2);
      font-weight: 600;
    }

    /* Dropdown Toggle */
    .nav-dropdown { position: relative; }
    .nav-dropdown-toggle {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      background: none;
      border: none;
      cursor: pointer;
      font: inherit;
    }
    .nav-dropdown-toggle svg {
      width: 10px;
      height: 10px;
      transition: transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .nav-dropdown-toggle[aria-expanded="true"] svg {
      transform: rotate(180deg);
    }

    /* iOS Bubble Pop Dropdown */
    .nav-dropdown-menu {
      position: absolute;
      top: calc(100% + 12px);
      left: 50%;
      width: 480px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06);
      padding: 0.5rem;
      z-index: 100;
      opacity: 0;
      transform: translateX(-50%) scale(0.9) translateY(-8px);
      transform-origin: top center;
      pointer-events: none;
      transition: opacity 250ms cubic-bezier(0.34, 1.56, 0.64, 1),
                  transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .nav-dropdown.open .nav-dropdown-menu {
      opacity: 1;
      transform: translateX(-50%) scale(1) translateY(0);
      pointer-events: auto;
    }
    .nav-dropdown-menu a {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      padding: 0.6rem 0.875rem;
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--muted);
      border-radius: 10px;
      white-space: nowrap;
      transition: color 160ms ease, background 160ms ease, transform 160ms ease;
      text-decoration: none;
    }
    .nav-dropdown-menu a::after { display: none; }
    .nav-dropdown-menu a:hover {
      color: var(--fg);
      background: var(--surface-2);
      transform: translateX(2px);
    }
    .nav-dropdown-menu a::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--border);
      flex-shrink: 0;
      transition: background 160ms ease, transform 160ms ease;
    }
    .nav-dropdown-menu a:hover::before {
      background: var(--fg);
      transform: scale(1.2);
    }

    /* Nav CTA */
    .nav-cta { display: none; }
    .nav-cta .btn-primary {
      background: var(--accent);
      color: #ffffff;
      border: 1px solid var(--accent);
      font-size: 0.8125rem;
      font-weight: 500;
      padding: 0.5rem 1.25rem;
      min-height: 36px;
      border-radius: 100px;
      transition: background 180ms ease, box-shadow 180ms ease, transform 150ms ease;
      text-decoration: none;
    }
    .nav-cta .btn-primary:hover {
      background: #2563eb;
      border-color: #2563eb;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      transform: translateY(-1px);
    }

    /* Mobile Toggle */
    .nav-toggle {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border: none;
      border-radius: 100px;
      background: var(--surface);
      border: 1px solid var(--border);
      transition: background 150ms ease;
    }
    .nav-toggle:hover { background: var(--surface-2); }
    .nav-toggle span {
      display: block;
      width: 16px;
      height: 1.5px;
      background: var(--fg);
      position: relative;
      transition: background 180ms ease;
    }
    .nav-toggle span::before,
    .nav-toggle span::after {
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      height: 1.5px;
      background: var(--fg);
      transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease;
    }
    .nav-toggle span::before { top: -5px; }
    .nav-toggle span::after { top: 5px; }
    .nav-toggle[aria-expanded="true"] span { background: transparent; }
    .nav-toggle[aria-expanded="true"] span::before {
      top: 0;
      transform: rotate(45deg);
    }
    .nav-toggle[aria-expanded="true"] span::after {
      top: 0;
      transform: rotate(-45deg);
    }

    /* Mobile Panel */
    .mobile-panel {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 100;
      background: var(--bg);
      flex-direction: column;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    .mobile-panel.open { display: flex; }
    .mobile-panel .mobile-nav-links {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: 0;
      width: 100%;
      padding: 5rem var(--gutter) 2rem;
    }
    .mobile-panel .mobile-nav-links a {
      display: flex;
      align-items: center;
      min-height: 48px;
      padding: 0.75rem 0;
      font-size: 1.25rem;
      font-family: var(--font-display);
      font-weight: 400;
      color: var(--muted);
      letter-spacing: -0.02em;
      border-bottom: 1px solid var(--border-soft);
      width: 100%;
      text-decoration: none;
      transition: color 200ms ease, padding-left 200ms ease;
    }
    .mobile-panel .mobile-nav-links a:hover,
    .mobile-panel .mobile-nav-links a:active {
      color: var(--fg);
      padding-left: 0.75rem;
    }
    .mobile-dropdown-toggle {
      display: flex;
      align-items: center;
      min-height: 48px;
      padding: 0.75rem 0;
      font-size: 1.25rem;
      font-family: var(--font-display);
      font-weight: 400;
      color: var(--muted);
      letter-spacing: -0.02em;
      border: none;
      background: none;
      cursor: pointer;
      width: 100%;
      text-align: left;
      border-bottom: 1px solid var(--border-soft);
      transition: color 200ms ease, padding-left 200ms ease;
    }
    .mobile-dropdown-toggle svg {
      width: 14px;
      height: 14px;
      transition: transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .mobile-dropdown-toggle[aria-expanded="true"] svg { transform: rotate(180deg); }
    .mobile-dropdown-toggle:hover { color: var(--fg); padding-left: 0.75rem; }
    .mobile-dropdown-panel {
      display: none;
      flex-direction: column;
      padding-left: 1rem;
      max-height: 0;
      overflow: hidden;
      transition: max-height 350ms cubic-bezier(0.34, 1.56, 0.64, 1),
                  opacity 250ms ease;
      opacity: 0;
    }
    .mobile-dropdown-panel.open {
      display: flex;
      max-height: 50vh;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      opacity: 1;
    }
    .mobile-dropdown-panel a {
      display: flex;
      align-items: center;
      min-height: 40px;
      padding: 0.5rem 0;
      font-size: 1rem;
      font-family: var(--font-display);
      font-weight: 400;
      color: var(--faint);
      border-bottom: 1px solid var(--border-soft);
      text-decoration: none;
      transition: color 200ms ease, padding-left 200ms ease;
    }
    .mobile-dropdown-panel a:hover { color: var(--fg); padding-left: 0.5rem; }
    .mobile-panel .mobile-nav-cta {
      position: relative;
      z-index: 1;
      padding: 1rem var(--gutter) 2rem;
      width: 100%;
    }
    .mobile-panel .mobile-nav-cta .btn {
      width: 100%;
      background: var(--accent);
      color: #ffffff;
      border: none;
    }
    .mobile-panel .mobile-nav-cta .btn:hover { background: #2563eb; }
    .mobile-close {
      position: absolute;
      top: 1rem;
      right: var(--gutter);
      z-index: 2;
      width: 44px;
      height: 44px;
      display: grid;
      place-items: center;
      border: none;
      border-radius: 100px;
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--fg);
      transition: background 150ms ease;
    }
    .mobile-close:hover { background: var(--surface-2); }
    .mobile-close svg { width: 18px; height: 18px; }

    @media (min-width: 768px) {
      .nav-cta { display: flex; }
      .nav-toggle, .mobile-panel { display: none !important; }
    }
    .nav-dropdown.open .nav-dropdown-menu { display: grid; }
    .nav-dropdown-menu a {
      display: block; padding: 0.5rem 0.75rem; font-size: 0.8125rem;
      color: var(--muted); border-radius: 8px; white-space: nowrap;
      transition: color 160ms ease, background 160ms ease;
    }
    .nav-dropdown-menu a::after { display: none; }
    .nav-dropdown-menu a:hover { color: var(--fg); background: var(--surface-2); }
    .mobile-dropdown-toggle {
      display: flex; align-items: center; gap: 0.5rem;
      padding: 0.9rem 0; font-size: 1.3rem; font-family: var(--font-display);
      font-weight: 400; color: var(--muted); letter-spacing: -0.02em;
      border: none; background: none; cursor: pointer; width: 100%; text-align: left;
      border-bottom: 1px solid var(--border-soft);
      transition: color 200ms ease, padding-left 200ms ease;
    }
    .mobile-dropdown-toggle svg { width: 14px; height: 14px; transition: transform 200ms ease; }
    .mobile-dropdown-toggle[aria-expanded="true"] svg { transform: rotate(180deg); }
    .mobile-dropdown-toggle:hover { color: var(--fg); padding-left: 0.75rem; }
    .mobile-dropdown-panel { display: none; flex-direction: column; padding-left: 1rem; }
    .mobile-dropdown-panel.open { display: flex; }
    .mobile-dropdown-panel a {
      display: flex; align-items: center; padding: 0.6rem 0;
      font-size: 1.1rem; font-family: var(--font-display); font-weight: 400;
      color: var(--faint); border-bottom: 1px solid var(--border-soft);
      transition: color 200ms ease, padding-left 200ms ease;
    }
    .mobile-dropdown-panel a:hover { color: var(--fg); padding-left: 0.5rem; }

    /* Shared */
    .btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
      min-height: 44px; padding: 0.7rem 1.25rem; font-size: 0.9375rem; font-weight: 500;
      border-radius: var(--radius); cursor: pointer; text-decoration: none;
      transition: background 180ms ease, color 180ms ease, border-color 180ms ease, transform 180ms ease;
    }
    .btn:active { transform: translateY(1px); }
    .btn-primary { background: var(--accent); color: #ffffff; border: 1px solid var(--accent); }
    .btn-primary:hover { background: var(--accent-text); border-color: var(--accent-text); }
    .btn-outline { background: transparent; color: var(--fg); border: 1px solid var(--border); }
    .btn-outline:hover { border-color: var(--faint); background: var(--surface); }
    .btn-sm { min-height: 36px; padding: 0.45rem 0.9rem; font-size: 0.8125rem; }
    .link-inline {
      color: var(--fg); text-decoration: underline; text-decoration-color: var(--faint);
      text-underline-offset: 0.18em; transition: text-decoration-color 160ms ease;
    }
    .link-inline:hover { text-decoration-color: var(--fg); }

    /* Breadcrumbs */
    .breadcrumbs { padding: 1rem 0 0; font-size: 0.8125rem; color: var(--faint); }
    .breadcrumbs a { color: var(--muted); transition: color 160ms ease; }
    .breadcrumbs a:hover { color: var(--fg); }
    .breadcrumbs .sep { margin: 0 0.4rem; }

    /* Hero */
    .hero {
      padding: clamp(2.5rem, 6vw, 4rem) 0 clamp(4rem, 8vw, 6rem);
      text-align: center;
    }
    .hero h1 {
      font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 700; line-height: 1.12; letter-spacing: -0.02em;
      max-width: 28ch; margin: 0.75rem auto;
    }
    .hero-sub {
      font-size: clamp(0.95rem, 1.3vw, 1.05rem); line-height: 1.65;
      color: var(--muted); max-width: 52ch; margin-inline: auto;
    }
    .hero-intro {
      margin-top: 1rem; font-size: 0.95rem; line-height: 1.7;
      color: var(--muted); max-width: 56ch; margin-inline: auto;
    }
    .hero-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; margin-top: 1.5rem; }

    /* Section */
    section { padding: clamp(2.5rem, 5vw, 4rem) 0; }
    .section-head { display: grid; gap: 0.6rem; margin-bottom: clamp(1.5rem, 3vw, 2.5rem); }
    .section-head h2 {
      font-family: var(--font-display); font-size: clamp(1.5rem, 2.8vw, 2.2rem);
      font-weight: 700; letter-spacing: -0.02em; line-height: 1.15;
    }

    /* Product Cards - stacked containers */
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
      background: #39FF14; color: #000;
      white-space: nowrap;
    }
    .product-badge--sale { background: #ef4444; color: #fff; }
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
    [data-theme="light"] .product-badge--sale { background: #ef4444; color: #fff; }

    /* Tooltip */
    .tooltip-wrap { position: relative; display: inline-flex; align-items: center; }
    .tooltip {
      position: absolute; bottom: calc(100% + 8px); right: -8px;
      width: 220px; padding: 0.65rem 0.75rem;
      background: #1a1a1e; border: 1px solid #2a2a2e; border-radius: 8px;
      font-size: 0.75rem; line-height: 1.5; color: #d4d4d8;
      box-shadow: 0 8px 24px rgba(0,0,0,0.4);
      opacity: 0; pointer-events: none;
      transform: translateY(4px);
      transition: opacity 180ms ease, transform 180ms ease;
      z-index: 20;
    }
    .tooltip::after {
      content: ""; position: absolute; top: 100%; right: 14px;
      border: 5px solid transparent; border-top-color: #2a2a2e;
    }
    .tooltip-wrap:hover .tooltip,
    .tooltip-wrap.active .tooltip {
      opacity: 1; pointer-events: auto; transform: translateY(0);
    }
    [data-theme="light"] .tooltip {
      background: #fff; border-color: #e5e7eb; color: #374151;
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    }
    [data-theme="light"] .tooltip::after { border-top-color: #e5e7eb; }
    .tooltip-icon {
      display: inline-flex; align-items: center; justify-content: center;
      width: 16px; height: 16px; margin-left: 0.35rem;
      color: #52525b; cursor: help; flex-shrink: 0;
    }
    .tooltip-icon svg { width: 14px; height: 14px; }

    /* Coming soon */
    .soon-pill {
      display: inline-block; margin-left: 0.6rem; padding: 0.15rem 0.6rem;
      border-radius: 20px; background: var(--accent); color: #fff;
      font-size: 0.62rem; font-weight: 600; letter-spacing: 0.08em;
      text-transform: uppercase; vertical-align: middle;
    }
    .coming-soon-note {
      margin: 1rem 0 0; padding: 0.9rem 1.1rem;
      border: 1px dashed var(--border); border-radius: var(--radius);
      background: var(--bg-elevated); font-size: 0.88rem; color: var(--muted);
      max-width: 46rem;
    }
    .coming-soon-note a { text-decoration: underline; }

    /* Comparison table */
    .compare-lede { color: var(--muted); max-width: 46ch; }
    .compare-table-wrap { overflow-x: auto; }
    .compare-table {
      width: 100%; min-width: 680px; border-collapse: collapse; font-size: 0.9rem;
    }
    .compare-table th, .compare-table td {
      text-align: left; padding: 0.9rem 1rem; border-bottom: 1px solid var(--border-soft);
      vertical-align: top;
    }
    .compare-table thead th {
      font-size: 0.75rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.05em; color: var(--faint);
    }
    .compare-table tbody th { font-weight: 600; }
    .compare-table tbody tr:hover { background: var(--surface-2); }
    .compare-note { margin-top: 1rem; font-size: 0.8rem; color: var(--faint); max-width: 52ch; }

    /* Section divider */
    .section-divider { border-top: 1px solid var(--border-soft); }

    /* Bundle cards on industry pages */
    .industry-bundles-grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }
    .industry-bundle-card {
      border: 1px solid var(--border); border-radius: 12px;
      background: var(--surface); padding: 1.25rem 1.5rem;
      display: grid; gap: 0.75rem;
    }
    .industry-bundle-head { display: flex; align-items: baseline; justify-content: space-between; gap: 0.75rem; }
    .industry-bundle-name { font-family: var(--font-display); font-size: 1.05rem; font-weight: 700; letter-spacing: -0.01em; color: var(--text); margin: 0; }
    .industry-bundle-save { font-size: 0.72rem; font-weight: 600; color: var(--muted); white-space: nowrap; letter-spacing: 0.01em; }
    .industry-bundle-niches { font-size: 0.75rem; color: var(--faint); line-height: 1.5; margin: 0; }
    .industry-bundle-tiers { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; }
    .industry-bundle-tier {
      display: grid; gap: 0.2rem; padding: 0.7rem 0.5rem;
      border: 1px solid var(--border-soft); border-radius: 8px; text-align: center;
      background: var(--bg-elevated);
    }
    .industry-bundle-tier-label { font-size: 0.68rem; color: var(--faint); font-weight: 500; letter-spacing: 0.02em; }
    .industry-bundle-tier-price { font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; letter-spacing: -0.02em; }
    .industry-bundle-tier .btn { margin-top: 0.25rem; min-height: 32px; padding: 0.35rem 0.6rem; font-size: 0.75rem; }
    .industry-bundle-link { display: inline-block; font-size: 0.78rem; color: var(--muted); text-decoration: none; margin-top: 0.25rem; }
    .industry-bundle-link:hover { color: var(--text); text-decoration: underline; }
    @media (max-width: 699px) { .industry-bundles-grid { grid-template-columns: 1fr; } .industry-bundle-tiers { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 420px) { .industry-bundle-tiers { grid-template-columns: 1fr; } }

    /* Related / More Industries */
    .related-grid {
      display: grid; gap: 0.75rem;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
    .related-card {
      display: grid; grid-template-columns: 1fr auto; align-items: center;
      gap: 0.75rem; padding: 1rem 1.25rem;
      border: 1px solid var(--border); border-radius: var(--radius);
      background: var(--surface);
      transition: border-color 180ms ease, transform 180ms ease;
    }
    .related-card:hover { border-color: var(--accent); transform: translateY(-1px); }
    .related-card h3 { font-size: 0.9375rem; font-weight: 500; }
    .related-arrow {
      width: 24px; height: 24px; border-radius: 50%;
      border: 1px solid var(--border); display: grid; place-items: center;
      color: var(--muted); flex-shrink: 0;
      transition: color 160ms ease, border-color 160ms ease;
    }
    .related-arrow svg { width: 12px; height: 12px; }
    .related-card:hover .related-arrow { color: var(--accent); border-color: var(--accent); }

    /* FAQ (Subframe style) */
    .faq-section { max-width: 720px; margin-inline: auto; }
    .faq-heading {
      font-size: clamp(3.5rem, 8vw, 6rem);
      font-weight: 700;
      letter-spacing: -0.04em;
      line-height: 1;
      color: var(--fg);
      margin-bottom: 0.5rem;
    }
    .faq-subtitle {
      font-size: clamp(1.1rem, 2.5vw, 1.5rem);
      font-weight: 400;
      font-style: italic;
      color: var(--faint);
      margin-bottom: clamp(2rem, 5vw, 3.5rem);
    }
    .faq-list { display: grid; gap: 0.5rem; }
    .faq-item {
      border-radius: var(--radius);
      background: var(--surface-2);
      overflow: hidden;
      transition: background 200ms ease;
    }
    .faq-item:hover { background: #222226; }
    .faq-item.open { background: #222226; }
    .faq-q {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      text-align: left;
      padding: 1.25rem 1.5rem;
      font-size: clamp(0.95rem, 2vw, 1.1rem);
      font-weight: 500;
      letter-spacing: -0.01em;
      color: var(--fg);
      background: none;
      border: none;
      cursor: pointer;
      font-family: var(--font-body);
    }
    .faq-q svg {
      width: 20px; height: 20px;
      color: var(--faint);
      flex: 0 0 auto;
      transition: transform 250ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .faq-item.open .faq-q svg { transform: rotate(180deg); }
    .faq-a { max-height: 0; overflow: hidden; transition: max-height 320ms cubic-bezier(0.22, 1, 0.36, 1); }
    .faq-item.open .faq-a { max-height: 300px; }
    .faq-a-text {
      padding: 0 1.5rem 1.25rem;
      color: var(--muted);
      font-size: 0.875rem;
      line-height: 1.65;
      max-width: 62ch;
    }
    .faq-more { margin-top: 1.5rem; font-size: 0.875rem; color: var(--faint); text-align: center; }
    [data-theme="light"] .faq-item:hover,
    [data-theme="light"] .faq-item.open { background: #ededf0; }

    /* Bottom CTA */
    .bottom-cta { padding: clamp(2.5rem, 5vw, 4rem) 0; text-align: center; }
    .bottom-cta h2 {
      font-family: var(--font-display); font-size: clamp(1.5rem, 2.5vw, 2rem);
      font-weight: 600; line-height: 1.2; letter-spacing: -0.02em;
      margin-bottom: 0.75rem;
    }
    .bottom-cta p {
      font-size: 1rem; line-height: 1.7; color: var(--muted);
      margin-bottom: 1.75rem; max-width: 42ch; margin-inline: auto;
    }
    .bottom-cta-actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }

    /* Gevora Font */
    @font-face { font-family: "Gevora"; src: url("../public/Gevora font.ttf") format("truetype"); font-weight: 400; font-style: normal; font-display: swap; }

    /* Footer — dark theme (default), matching membership.html */
    .site-footer { background: #0f0f0f; color: #a0a0a8; padding: clamp(2.5rem, 5vw, 4rem) 0 0; margin-top: 1rem; border-top: 1px solid var(--border-soft); }
    .footer-top { display: grid; gap: 2rem; grid-template-columns: 1fr; padding-bottom: clamp(2rem, 4vw, 3rem); border-bottom: 1px solid var(--border-soft); }
    @media (min-width: 700px) { .footer-top { grid-template-columns: 26ch 1fr; } }
    .footer-brand .logo { font-family: "Gevora", "Arial Black", Impact, sans-serif; letter-spacing: 0.04em; text-transform: uppercase; color: #fff; margin-bottom: 0.9rem; }
    .footer-brand p { color: #a0a0a8; font-size: var(--text-sm); line-height: 1.55; }
    .footer-grid { display: grid; gap: 2rem; grid-template-columns: repeat(2, 1fr); }
    @media (min-width: 700px) { .footer-grid { grid-template-columns: repeat(4, 1fr); } }
    .footer-col h4 { font-size: var(--text-xs); font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #fff; margin-bottom: 0.9rem; }
    .footer-col a { display: block; color: #a0a0a8; font-size: var(--text-sm); padding: 0.25rem 0; transition: color 150ms ease; }
    .footer-col a:hover { color: #fff; }
    .footer-bottom { margin-top: 2rem; padding: 1.25rem 0; border-top: 1px solid var(--border-soft); display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; justify-content: space-between; color: #a0a0a8; font-size: var(--text-xs); }
    .footer-giant { width: 100%; padding-top: clamp(0.75rem, 2vw, 2rem); text-align: center; }
    .footer-giant__text { font-family: "Gevora", "Arial Black", Impact, sans-serif; font-size: clamp(2rem, 7.5vw, 12rem); line-height: 0.85; letter-spacing: 0.01em; white-space: nowrap; color: #1a1a1e; user-select: none; }
    .footer-email { margin-top: 0.75rem; }
    .footer-email a { color: var(--faint); font-size: var(--text-sm); text-decoration: none; transition: color 150ms ease; }
    .footer-email a:hover { color: var(--fg); }
    [data-theme="light"] .site-footer { background: #fff; color: #374151; border-top-color: #e5e7eb; }
    [data-theme="light"] .footer-brand .logo { color: #111; }
    [data-theme="light"] .footer-brand p { color: #6b7280; }
    [data-theme="light"] .footer-col h4 { color: #111; }
    [data-theme="light"] .footer-col a { color: #6b7280; }
    [data-theme="light"] .footer-col a:hover { color: #111; }
    [data-theme="light"] .footer-bottom { color: #9ca3af; border-top-color: #e5e7eb; }

    /* Reveal */
    .reveal { opacity: 0; transform: translateY(12px); transition: opacity 700ms ease, transform 700ms ease; }
    .reveal.is-in { opacity: 1; transform: none; }

    /* Heading fall from above — hidden by default via CSS (no JS flash) */
    h1:not(.no-heading-fall),
    h2:not(.no-heading-fall),
    h3:not(.no-heading-fall) {
      opacity: 0; transform: translateY(-16px);
      transition: opacity 650ms ease, transform 650ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    /* Inside .reveal sections: parent reveal triggers heading fall automatically */
    .reveal h1:not(.no-heading-fall),
    .reveal h2:not(.no-heading-fall),
    .reveal h3:not(.no-heading-fall) {
      transition: opacity 650ms ease 120ms, transform 650ms cubic-bezier(0.22, 1, 0.36, 1) 120ms;
    }
    .reveal.is-in h1:not(.no-heading-fall),
    .reveal.is-in h2:not(.no-heading-fall),
    .reveal.is-in h3:not(.no-heading-fall),
    h1.is-in:not(.no-heading-fall),
    h2.is-in:not(.no-heading-fall),
    h3.is-in:not(.no-heading-fall) {
      opacity: 1; transform: none;
    }

    /* Explore Related Datasets Marquee */
    .explore-marquee {
      overflow: hidden; position: relative;
      padding: 0.75rem 0;
    }
    .explore-marquee::before, .explore-marquee::after {
      content: ''; position: absolute; top: 0; bottom: 0;
      width: 80px; z-index: 2; pointer-events: none;
    }
    .explore-marquee::before {
      left: 0; background: linear-gradient(to right, var(--bg), transparent);
    }
    .explore-marquee::after {
      right: 0; background: linear-gradient(to left, var(--bg), transparent);
    }
    .explore-marquee__track {
      display: flex; gap: 0.75rem; width: max-content;
      animation: explore-scroll 12s linear infinite;
    }
    .explore-marquee:hover .explore-marquee__track {
      animation-play-state: paused;
    }
    .explore-pill {
      flex-shrink: 0;
      padding: 0.625rem 1.25rem;
      border: 1px solid var(--border); border-radius: 999px;
      background: var(--surface);
      font-size: 0.875rem; font-weight: 500;
      color: var(--fg); text-decoration: none; white-space: nowrap;
      transition: border-color 180ms ease, background 180ms ease, color 180ms ease, transform 180ms ease, box-shadow 180ms ease;
    }
    .explore-pill:hover {
      border-color: var(--accent); background: var(--surface-2);
      transform: translateY(-1px); box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }
    @keyframes explore-scroll {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @media (prefers-reduced-motion: reduce) {
      .explore-marquee__track { animation: none !important; }
    }

    @media (max-width: 699px) {
      .hero { padding: clamp(1.5rem, 4vw, 2rem) 0 clamp(5rem, 10vw, 8rem); }
      .hero h1 { font-size: clamp(1.6rem, 5vw, 2rem); }
      .hero-sub { font-size: 0.9rem; }
      .pricing-grid { grid-template-columns: 1fr; }
      .related-grid { grid-template-columns: 1fr; }
      .bottom-cta { padding: clamp(2rem, 5vw, 3rem) 0; }
      .bottom-cta h2 { font-size: 1.25rem; }
      .bottom-cta p { font-size: 0.875rem; margin-bottom: 1.25rem; }
      .bottom-cta-actions { flex-direction: column; }
      .bottom-cta-actions .btn { width: 100%; }
    }
    @media (max-width: 480px) {
      .product-card { padding: 1.25rem; }
      .product-plan { font-size: 1.25rem; }
      .product-price { font-size: 2rem; }
      .product-includes-list { gap: 0.4rem; }
      .product-includes-list li { font-size: 0.75rem; }
      .faq-heading { font-size: clamp(2.5rem, 10vw, 4rem); }
    }
    @media (min-width: 700px) and (max-width: 900px) {
      .pricing-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (min-width: 800px) { .footer-grid { grid-template-columns: 1fr 1fr 1fr 1fr; } }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important; animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important; scroll-behavior: auto !important;
      }
      .reveal h1, .reveal h2, .reveal h3,
      h1, h2, h3 { opacity: 1; transform: none; }
    }

    /* Theme Toggle */
    .theme-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 999px;
      transition: background 180ms ease, color 180ms ease;
      flex-shrink: 0;
      color: var(--muted);
    }
    .theme-toggle:hover { background: var(--surface-2); color: var(--fg); }
    .theme-toggle svg { width: 16px; height: 16px; }
    .theme-toggle .icon-moon { display: block; }
    .theme-toggle .icon-sun { display: none; }
    [data-theme="dark"] .theme-toggle .icon-moon { display: none; }
    [data-theme="dark"] .theme-toggle .icon-sun { display: block; }
    @media (max-width: 767px) {
      .header-logo + .nav-pill + .theme-toggle { display: none; }
      .header-logo-img { display: block; }
      .header-logo-text { display: none; }
    }
    .mobile-theme-toggle {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1.1rem 0;
      font-size: 1.5rem;
      font-family: var(--font-display);
      font-weight: 400;
      letter-spacing: -0.02em;
      color: var(--muted);
      border-bottom: 1px solid var(--border-soft);
      width: 100%;
      text-align: left;
      transition: color 200ms ease, padding-left 200ms ease;
    }
    .mobile-theme-toggle:hover, .mobile-theme-toggle:active { color: var(--fg); padding-left: 0.75rem; }
    .mobile-theme-toggle .icon-moon { display: block; }
    .mobile-theme-toggle .icon-sun { display: none; }
    [data-theme="dark"] .mobile-theme-toggle .icon-moon { display: none; }
    [data-theme="dark"] .mobile-theme-toggle .icon-sun { display: block; }

    /* Light Theme Overrides */
    [data-theme="light"] .site-header.is-scrolled { background: rgba(255,255,255,0.92); }
    [data-theme="light"] .nav-pill { background: #fff; border-color: #e5e7eb; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
    [data-theme="light"] .site-footer { background: #fff; color: #374151; border-top-color: #e5e7eb; }
    [data-theme="light"] .footer-top { border-bottom-color: #e5e7eb; }
    [data-theme="light"] .footer-brand .logo { color: #111; }
    [data-theme="light"] .footer-brand p { color: #6b7280; }
    [data-theme="light"] .footer-col h4 { color: #9ca3af; }
    [data-theme="light"] .footer-col a { color: #6b7280; }
    [data-theme="light"] .footer-col a:hover { color: #111; }
    [data-theme="light"] .footer-bottom { border-top-color: #e5e7eb; color: #9ca3af; }
    [data-theme="light"] .footer-giant__text { color: #111; }
    [data-theme="dark"] .btn-primary { background: #ffffff; color: #000000; border-color: #ffffff; }
    [data-theme="dark"] .btn-outline { background: transparent; color: #fff; border-color: #333; }
    [data-theme="light"] .btn-primary { background: #111; color: #fff; border-color: #111; }
    [data-theme="light"] .btn-primary:hover { background: #333; border-color: #333; }
    [data-theme="light"] .btn-outline { background: transparent; color: #111; border-color: #d1d5db; }
    [data-theme="light"] .btn-outline:hover { background: #111; color: #fff; border-color: #111; }
    [data-theme="light"] .mobile-panel { background: #fff; }
    [data-theme="light"] .mobile-nav-cta .btn { background: #111; color: #fff; }
    [data-theme="light"] .mobile-close { background: #f3f4f6; border-color: #e5e7eb; }
    [data-theme="light"] .nav-toggle { background: #f3f4f6; border-color: #e5e7eb; }
    [data-theme="light"] .nav-toggle span,
    [data-theme="light"] .nav-toggle span::before,
    [data-theme="light"] .nav-toggle span::after { background: #111; }
    [data-theme="light"] .theme-toggle { color: #6b7280; }
    [data-theme="light"] .theme-toggle:hover { background: #f3f4f6; color: #111; }
  
    /* ── Footer reveal (Mobbin-style) ────────────────────────── */
    main {
      position: relative;
      z-index: 1;
      background: var(--bg);
      min-height: calc(100vh - var(--nav-h));
      border-radius: 0 0 46px 46px;
      box-shadow: 0 1px 2px rgba(20, 20, 28, 0.05), 0 24px 48px -20px rgba(20, 20, 28, 0.18);
      overflow: clip;
    }
    html { background-color: #0a0a0a; }
    .site-footer,
    [data-theme="dark"] .site-footer,
    [data-theme="light"] .site-footer {
      position: static;
      background: #0a0a0a;
      color: #d1d5db;
      border-top: 0;
    }
    .site-footer .footer-brand .logo,
    [data-theme="dark"] .site-footer .footer-brand .logo,
    [data-theme="light"] .site-footer .footer-brand .logo { color: #ffffff; }
    .site-footer .footer-brand p,
    [data-theme="dark"] .site-footer .footer-brand p,
    [data-theme="light"] .site-footer .footer-brand p { color: #9ca3af; }
    .site-footer .footer-col h4,
    [data-theme="dark"] .site-footer .footer-col h4,
    [data-theme="light"] .site-footer .footer-col h4 { color: #9ca3af; }
    .site-footer .footer-col a,
    [data-theme="dark"] .site-footer .footer-col a,
    [data-theme="light"] .site-footer .footer-col a { color: #a0a0a8; }
    .site-footer .footer-col a:hover,
    [data-theme="dark"] .site-footer .footer-col a:hover,
    [data-theme="light"] .site-footer .footer-col a:hover { color: #ffffff; }
    .site-footer .footer-top,
    [data-theme="dark"] .site-footer .footer-top,
    [data-theme="light"] .site-footer .footer-top { border-bottom-color: #1f1f23; }
    .site-footer .footer-bottom,
    [data-theme="dark"] .site-footer .footer-bottom,
    [data-theme="light"] .site-footer .footer-bottom { color: #6b7280; border-top-color: #1f1f23; }
    .site-footer .footer-giant__text,
    [data-theme="light"] .site-footer .footer-giant__text,
    [data-theme="dark"] .site-footer .footer-giant__text { color: rgba(255, 255, 255, 0.08); }
    @media (max-width: 600px) {
      main { border-radius: 0 0 28px 28px; }
    }

    /* Checkout Modal */
    .checkout-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(8px);
      z-index: 99999;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      opacity: 0;
      transition: opacity 0.25s ease;
      isolation: isolate;
    }
    .checkout-modal-overlay.active {
      display: flex;
      opacity: 1;
    }
    .checkout-modal {
      background: #1a1a1e;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      width: 100%;
      max-width: 520px;
      height: auto;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05);
      transform: translateY(20px);
      transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
      z-index: 1;
    }
    .checkout-modal-overlay.active .checkout-modal {
      transform: translateY(0);
    }
    .checkout-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.25rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      background: #1a1a1e;
      position: relative;
      z-index: 2;
      flex-shrink: 0;
    }
    .checkout-modal-header h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: #fff;
    }
    .checkout-modal-close {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      border: none;
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      cursor: pointer;
      display: grid;
      place-items: center;
      transition: background 0.15s, color 0.15s;
    }
    .checkout-modal-close:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    .checkout-modal-body {
      padding: 0;
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
      background: #1a1a1e;
    }
    .checkout-modal-body iframe {
      width: 100% !important;
      min-height: 600px !important;
      border: none !important;
    }
    .whop-checkout-container {
      width: 100%;
      min-height: 600px;
      background: #1a1a1e;
    }
    @media (max-width: 520px) {
      .checkout-modal {
        max-width: 100%;
        max-height: 100vh;
        border-radius: 0;
        height: 100%;
      }
      .checkout-modal-overlay {
        padding: 0;
      }
      .checkout-modal-body iframe {
        min-height: 500px !important;
      }
    }
    @media (min-height: 800px) {
      .checkout-modal {
        max-height: 85vh;
      }
    }
</style>
</head>
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PWP5C6SP"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

  <header class="site-header" id="top">
    <div class="wrap nav">
      <a class="header-logo" href="/" aria-label="LeadsPitch home"><img src="../public/logo.png" alt="" class="header-logo-img"><span class="header-logo-text">LeadsPitch</span></a>
      <nav class="nav-pill" aria-label="Primary">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <div class="nav-dropdown">
          <button class="nav-dropdown-toggle" type="button" aria-expanded="false" aria-haspopup="true">
            Niches
            <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="nav-dropdown-menu" role="menu">
            <a href="/industries/accounting-finance" role="menuitem">Accounting &amp; Finance</a>
            <a href="/industries/agencies-business" role="menuitem">Agencies &amp; Business</a>
            <a href="/industries/automotive" role="menuitem">Automotive</a>
            <a href="/industries/beauty-wellness" role="menuitem">Beauty &amp; Wellness</a>
            <a href="/industries/clinics" role="menuitem">Clinics</a>
            <a href="/industries/construction" role="menuitem">Construction</a>
            <a href="/industries/dentists" role="menuitem">Dentists</a>
            <a href="/industries/education" role="menuitem">Education &amp; Training</a>
            <a href="/industries/events-leisure" role="menuitem">Events &amp; Leisure</a>
            <a href="/industries/food-beverage" role="menuitem">Food &amp; Beverage</a>
            <a href="/industries/home-services" role="menuitem">Home Services</a>
            <a href="/industries/hotels-hospitality" role="menuitem">Hotels &amp; Hospitality</a>
            <a href="/industries/legal" role="menuitem">Legal</a>
            <a href="/industries/logistics" role="menuitem">Logistics</a>
            <a href="/industries/real-estate" role="menuitem">Real Estate</a>
            <a href="/industries/restaurants-cafes" role="menuitem">Restaurants &amp; Cafes</a>
          </div>
        </div>
        <a href="/bundles">Bundles</a>
        <a href="/membership">Membership</a>
        <a href="/faq">FAQs</a>
        <a href="/contact">Contact</a>
        <div class="nav-dropdown">
          <button class="nav-dropdown-toggle" type="button" aria-expanded="false" aria-haspopup="true">
            Legal
            <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="nav-dropdown-menu" role="menu">
            <a href="/privacy" role="menuitem">Privacy Policy</a>
            <a href="/terms" role="menuitem">Terms of Service</a>
            <a href="/refund" role="menuitem">Refund Policy</a>
          </div>
        </div>
      </nav>
      <button class="theme-toggle" type="button" aria-label="Toggle dark mode">
        <svg class="icon-moon" viewBox="0 0 24 24" fill="currentColor"><path d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73 8.15 8.15 0 0 1-8.14-8.14 8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 14 11.69 1 1 0 0 0-.36-1.05z"/></svg>
        <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
      </button>
      <div class="nav-right">
        <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">
          <span></span>
        </button>
      </div>
    </div>
  </header>

  <div class="mobile-panel" id="mobile-nav" role="dialog" aria-modal="true" aria-label="Navigation menu">
    <button class="mobile-close" type="button" aria-label="Close menu">
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M5 5l10 10M15 5L5 15"></path></svg>
    </button>
    <div class="mobile-nav-links">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <button class="mobile-dropdown-toggle" type="button" aria-expanded="false">
        Niches
        <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="mobile-dropdown-panel">
        <a href="/industries/accounting-finance">Accounting &amp; Finance</a>
        <a href="/industries/agencies-business">Agencies &amp; Business</a>
        <a href="/industries/automotive">Automotive</a>
        <a href="/industries/beauty-wellness">Beauty &amp; Wellness</a>
        <a href="/industries/clinics">Clinics</a>
        <a href="/industries/construction">Construction</a>
        <a href="/industries/dentists">Dentists</a>
        <a href="/industries/education">Education &amp; Training</a>
        <a href="/industries/events-leisure">Events &amp; Leisure</a>
        <a href="/industries/food-beverage">Food &amp; Beverage</a>
        <a href="/industries/home-services">Home Services</a>
        <a href="/industries/hotels-hospitality">Hotels &amp; Hospitality</a>
        <a href="/industries/legal">Legal</a>
        <a href="/industries/logistics">Logistics</a>
        <a href="/industries/real-estate">Real Estate</a>
        <a href="/industries/restaurants-cafes">Restaurants &amp; Cafes</a>
      </div>
      <a href="/bundles">Bundles</a>
      <a href="/membership">Membership</a>
      <a href="/faq">FAQs</a>
      <a href="/contact">Contact</a>
      <button class="mobile-dropdown-toggle" type="button" aria-expanded="false">
        Legal
        <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="mobile-dropdown-panel">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
        <a href="/refund">Refund Policy</a>
      </div>
      <button class="mobile-theme-toggle" type="button" aria-label="Toggle dark mode">
        <svg class="icon-moon" viewBox="0 0 24 24" fill="currentColor"><path d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73 8.15 8.15 0 0 1-8.14-8.14 8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 14 11.69 1 1 0 0 0-.36-1.05z"/></svg>
        <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
        <span>Dark mode</span>
      </button>
    </div>
    <div class="mobile-nav-cta">
      <a class="btn btn-primary" href="/bundles">See Bundles</a>
    </div>
  </div>

  <main>

    <!-- Breadcrumbs -->
    <div class="wrap">
      <nav class="breadcrumbs reveal" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span class="sep" aria-hidden="true">/</span>
        <a href="/industries">Niches</a>
        <span class="sep" aria-hidden="true">/</span>
        <span aria-current="page">${data.name}</span>
      </nav>
    </div>

    <!-- Hero -->
    <section class="hero">
      <div class="wrap">
        <h1 class="reveal">${seo.h1}${soon ? ' <span class="soon-pill">Coming soon</span>' : ''}</h1>
        <p class="hero-sub reveal">${data.heroSub}</p>
        <p class="hero-intro reveal">${seo.intro}</p>
        <div class="hero-actions reveal">
          ${soon
            ? '<a class="btn btn-primary" href="/contact">Request access</a>\n          <a class="btn btn-outline" href="#pricing">See pricing</a>'
            : '<a class="btn btn-primary" href="#pricing">See pricing</a>\n          <a class="btn btn-outline" href="#faqs">FAQs</a>'}
        </div>
      </div>
    </section>

    <!-- One-Time Pricing -->
    <section id="pricing">
      <div class="wrap">
        <div class="section-head">
          <h2>Buy a single dataset</h2>
        </div>
        ${soon ? '<p class="coming-soon-note">This dataset is coming soon. Pricing below is indicative — <a class="link-inline" href="/contact">request access</a> and we\'ll notify you when it\'s live.</p>' : ''}
        <div class="pricing-grid-wrap">
          <div class="pricing-grid reveal">
${oneTimeCardsHtml}
          </div>
        </div>
      </div>
    </section>

    <hr class="section-divider">

    <!-- Bundles -->
    <section id="bundles">
      <div class="wrap">
        <div class="section-head">
          <h2>Bundles that include ${data.name}</h2>
          <p class="section-sub">Save more when you buy multiple niche datasets together.</p>
        </div>
        <div class="industry-bundles-grid reveal">
${data.bundles.map(key => {
  const b = bundleData[key];
  if (!b) return '';
  const nichesText = b.industries.join(' + ');
  const tiersHtml = b.tiers.map(t => `            <div class="industry-bundle-tier">
              <span class="industry-bundle-tier-label">${t.label}</span>
              <span class="industry-bundle-tier-price">${t.price}</span>
              <button class="btn btn-outline industry-bundle-cta" data-plan="${key}-${t.label.replace(/[^a-z0-9]/gi,'').toLowerCase()}" type="button">Get bundle</button>
            </div>`).join('\n');
  return `          <div class="industry-bundle-card">
            <div class="industry-bundle-head">
              <h3 class="industry-bundle-name">${b.name}</h3>
              <span class="industry-bundle-save">Save up to ${b.save}</span>
            </div>
            <p class="industry-bundle-niches">Includes: ${nichesText}</p>
            <div class="industry-bundle-tiers">
${tiersHtml}
            </div>
            <a class="industry-bundle-link" href="/bundles">See all bundles &rarr;</a>
          </div>`;
}).join('\n')}
        </div>
      </div>
    </section>

    <hr class="section-divider">

    <!-- Related Industries -->
    <section id="related">
      <div class="wrap">
        <div class="section-head">
          <h2>Explore related datasets</h2>
        </div>
      </div>
      <div class="explore-marquee">
        <div class="explore-marquee__track">
${exploreIndustriesHtml}
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faqs">
      <div class="wrap faq-section">
        <h2 class="faq-heading">FAQ.</h2>
        <p class="faq-subtitle">Questions about this dataset.</p>
        <div class="faq-list">
${faqsHtml}
        </div>
        <p class="faq-more">
          More questions? <a class="link-inline" href="/faq">See all FAQs</a> or <a class="link-inline" href="/contact">contact us</a>.
        </p>
      </div>
    </section>
${comparisonHtml}

    <!-- Bottom CTA -->
    <section class="bottom-cta">
      <div class="wrap">
        <div class="reveal">
          <h2>Ready to get ${data.name.toLowerCase()} data?</h2>
          <p>${soon ? 'This dataset is coming soon. Request access and we\'ll notify you the moment it\'s live.' : 'Choose a one-time dataset that fits your business needs.'}</p>
          <div class="bottom-cta-actions">
            ${soon
              ? '<a class="btn btn-primary" href="/contact">Request access</a>\n            <a class="btn btn-outline" href="/industries">Browse niches</a>'
              : '<a class="btn btn-primary" href="#pricing">See pricing</a>\n            <a class="btn btn-outline" href="/contact">Contact us</a>'}
          </div>
        </div>
      </div>
    </section>

  </main>

  <footer class="site-footer">
    <div class="wrap footer-top">
      <div class="footer-brand">
        <p class="logo">LeadsPitch</p>
        <p>Verified B2B lead data, provided as CSV. Subscriptions, one-time purchases, and membership discounts across 16 niches.</p>
        <p class="footer-email"><a href="mailto:contact@leadspitch.com">contact@leadspitch.com</a></p>
      </div>
      <div class="footer-grid">
        <div class="footer-col">
          <h4>Product</h4>
          <a href="/#how-it-works">How it works</a>
          <a href="/industries">Niches</a>
          <a href="/bundles">B2B datasets</a>
          <a href="/membership">Membership</a>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/faq">FAQ</a>
        </div>
        <div class="footer-col">
          <h4>Legal</h4>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/refund">Refund Policy</a>
        </div>
        <div class="footer-col">
          <h4>Popular</h4>
          <a href="/industries/real-estate">Real Estate leads</a>
          <a href="/industries/clinics">Clinics leads</a>
          <a href="/industries/dentists">Dentists leads</a>
          <a href="/industries/legal">Lawyers leads</a>
        </div>
      </div>
    </div>
    <div class="wrap footer-bottom">
      <span>&copy; <span id="y"></span> LeadsPitch</span>
      <span>Verified B2B data, ready to use.</span>
    </div>
    <div class="footer-giant" id="footer-giant">
      <span class="footer-giant__text" id="giant-text">LEADSPITCH</span>
    </div>
  </footer>

  <script>
    (function () {
      var header = document.querySelector(".site-header");
      var toggle = document.querySelector(".nav-toggle");
      var panel = document.getElementById("mobile-nav");

      function onScroll() {
        if (!header) return;
        header.classList.toggle("is-scrolled", window.scrollY > 8);
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      if (toggle && panel) {
        var closeBtn = panel.querySelector(".mobile-close");
        function openNav() {
          toggle.setAttribute("aria-expanded", "true");
          toggle.setAttribute("aria-label", "Close menu");
          panel.classList.add("open");
          document.body.style.overflow = "hidden";
        }
        function closeNav() {
          toggle.setAttribute("aria-expanded", "false");
          toggle.setAttribute("aria-label", "Open menu");
          panel.classList.remove("open");
          document.body.style.overflow = "";
        }
        toggle.addEventListener("click", function () {
          var open = toggle.getAttribute("aria-expanded") === "true";
          if (open) closeNav(); else openNav();
        });
        if (closeBtn) closeBtn.addEventListener("click", closeNav);
        panel.querySelectorAll("a").forEach(function (a) {
          a.addEventListener("click", closeNav);
        });
      }

      document.querySelectorAll(".nav-dropdown").forEach(function(dropdown) {
        var toggle = dropdown.querySelector(".nav-dropdown-toggle");
        if (!toggle) return;
        toggle.addEventListener("click", function(e) {
          e.stopPropagation();
          var wasOpen = dropdown.classList.contains("open");
          document.querySelectorAll(".nav-dropdown.open").forEach(function(d) { d.classList.remove("open"); d.querySelector(".nav-dropdown-toggle").setAttribute("aria-expanded", "false"); });
          if (!wasOpen) { dropdown.classList.add("open"); toggle.setAttribute("aria-expanded", "true"); }
        });
      });
      document.addEventListener("click", function() {
        document.querySelectorAll(".nav-dropdown.open").forEach(function(d) { d.classList.remove("open"); d.querySelector(".nav-dropdown-toggle").setAttribute("aria-expanded", "false"); });
      });

      document.querySelectorAll(".mobile-dropdown-toggle").forEach(function(btn) {
        btn.addEventListener("click", function() {
          var panel = btn.nextElementSibling;
          if (!panel) return;
          var isOpen = btn.getAttribute("aria-expanded") === "true";
          btn.setAttribute("aria-expanded", isOpen ? "false" : "true");
          panel.classList.toggle("open");
        });
      });

      document.querySelectorAll(".faq-item").forEach(function (item) {
        var btn = item.querySelector(".faq-q");
        if (!btn) return;
        btn.addEventListener("click", function () {
          var isOpen = item.classList.contains("open");
          document.querySelectorAll(".faq-item.open").forEach(function (el) {
            el.classList.remove("open");
            var b = el.querySelector(".faq-q");
            if (b) b.setAttribute("aria-expanded", "false");
          });
          if (!isOpen) {
            item.classList.add("open");
            btn.setAttribute("aria-expanded", "true");
          }
        });
      });

      document.querySelectorAll(".product-includes-more").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var includes = btn.closest(".product-includes");
          if (!includes) return;
          var isOpen = includes.classList.contains("open");
          includes.classList.toggle("open");
          btn.setAttribute("aria-expanded", isOpen ? "false" : "true");
          var label = btn.querySelector(".product-includes-more-label");
          if (label) label.textContent = isOpen ? "Show more" : "Show less";
        });
      });

      document.querySelectorAll(".tooltip-wrap").forEach(function (wrap) {
        wrap.addEventListener("click", function (e) {
          e.stopPropagation();
          var wasActive = wrap.classList.contains("active");
          document.querySelectorAll(".tooltip-wrap.active").forEach(function (w) { w.classList.remove("active"); });
          if (!wasActive) wrap.classList.add("active");
        });
      });
      document.addEventListener("click", function () {
        document.querySelectorAll(".tooltip-wrap.active").forEach(function (w) { w.classList.remove("active"); });
      });

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
      document.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });

      /* Heading fall — standalone headings outside .reveal get their own observer */
      (function () {
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (!("IntersectionObserver" in window)) return;
        var hIo = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              hIo.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
        document.querySelectorAll("h1:not(.no-heading-fall), h2:not(.no-heading-fall), h3:not(.no-heading-fall)").forEach(function (h) {
          if (!h.closest(".reveal") && !h.closest(".site-footer")) hIo.observe(h);
        });
      })();

      (function () {
        var container = document.getElementById("footer-giant");
        var text = document.getElementById("giant-text");
        if (!container || !text) return;
        function fit() {
          var avail = container.offsetWidth;
          if (!avail) return;
          text.style.fontSize = "100px";
          var textW = text.offsetWidth;
          if (!textW) return;
          text.style.fontSize = Math.floor((avail / textW) * 100) + "px";
        }
        fit(); setTimeout(fit,100); setTimeout(fit,300); setTimeout(fit,600); setTimeout(fit,1000);
        var rt; window.addEventListener("resize",function(){ if(rt) clearTimeout(rt); rt=setTimeout(fit,100); });
      })();

      var year = document.getElementById("y");
      if (year) year.textContent = String(new Date().getFullYear());
    })();
    /* Theme Toggle */
    (function () {
      var root = document.documentElement;
      var toggles = document.querySelectorAll(".theme-toggle, .mobile-theme-toggle");
      var mql = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;
      var hasSaved = (function () { try { return localStorage.getItem("theme") !== null; } catch (e) { return false; } })();
      function current() { return root.getAttribute("data-theme") === "light" ? "light" : "dark"; }
      function updateToggleLabel() {
        var isLight = current() === "light";
        for (var i = 0; i < toggles.length; i++) {
          var span = toggles[i].querySelector("span");
          if (span) span.textContent = isLight ? "Light mode" : "Dark mode";
          toggles[i].setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
        }
      }
      function setTheme(theme) {
        root.setAttribute("data-theme", theme);
        try { localStorage.setItem("theme", theme); } catch (e) {}
        hasSaved = true;
        updateToggleLabel();
      }
      function toggleTheme() { setTheme(current() === "light" ? "dark" : "light"); }
      function onSystemChange() {
        if (hasSaved) return;
        root.setAttribute("data-theme", mql.matches ? "light" : "dark");
        updateToggleLabel();
      }
      updateToggleLabel();
      for (var i = 0; i < toggles.length; i++) {
        toggles[i].addEventListener("click", toggleTheme);
      }
      if (mql) {
        if (mql.addEventListener) mql.addEventListener("change", onSystemChange);
        else if (mql.addListener) mql.addListener(onSystemChange);
      }
    })();
  </script>

  <script src="../search-data.js"></script>
  <script src="../search.js"></script>

  <!-- Checkout Modal -->
  <div class="checkout-modal-overlay" id="checkout-modal-overlay">
    <div class="checkout-modal">
      <div class="checkout-modal-header">
        <h3 id="checkout-modal-title">Complete your purchase</h3>
        <button class="checkout-modal-close" id="checkout-modal-close" aria-label="Close checkout">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      <div class="checkout-modal-body" id="checkout-modal-body">
      </div>
    </div>
  </div>

  <script>
    (function() {
      var overlay = document.getElementById('checkout-modal-overlay');
      var modalBody = document.getElementById('checkout-modal-body');
      var modalTitle = document.getElementById('checkout-modal-title');
      var closeBtn = document.getElementById('checkout-modal-close');

      var plans = {
${data.oneTime.map(p => `        '${p.plan.toLowerCase().replace(/\s+/g, '-')}': { id: '${p.planId}', name: '${p.plan}' }`).join(',\n')},
${data.bundles.map(key => {
  const b = bundleData[key];
  if (!b) return '';
  return b.tiers.map(t => {
    const planKey = key + '-' + t.label.replace(/[^a-z0-9]/gi,'').toLowerCase();
    return `        '${planKey}': { id: '${t.planId}', name: '${b.name} ' + '${t.label}' }`;
  }).join(',\n');
}).join(',\n')}
      };

      function openCheckout(planKey) {
        var plan = plans[planKey];
        if (!plan) return;

        modalTitle.textContent = plan.name + ' Plan';
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        modalBody.innerHTML = '';

        var container = document.createElement('div');
        container.className = 'whop-checkout-container';
        container.setAttribute('data-whop-checkout-plan-id', plan.id);
        container.setAttribute('data-whop-checkout-theme', 'dark');
        container.style.width = '100%';
        container.style.minHeight = '600px';
        modalBody.appendChild(container);

        if (window.WhopCheckout && typeof window.WhopCheckout.load === 'function') {
          try {
            window.WhopCheckout.load().then(function(sdk) {
              if (sdk && typeof sdk.mountCheckout === 'function') {
                sdk.mountCheckout(container, { planId: plan.id, theme: 'dark' });
              }
            }).catch(function() {});
          } catch(e) {}
        }
      }

      function closeCheckout() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        modalBody.innerHTML = '';
      }

      closeBtn.addEventListener('click', closeCheckout);
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeCheckout();
      });
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) closeCheckout();
      });

      document.querySelectorAll('.product-cta[data-plan]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          var planKey = btn.getAttribute('data-plan');
          openCheckout(planKey);
        });
      });

      document.querySelectorAll('.industry-bundle-cta[data-plan]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          var planKey = btn.getAttribute('data-plan');
          openCheckout(planKey);
        });
      });

      window.LeadsPitchCheckout = { open: openCheckout, close: closeCheckout };
    })();
  </script>

</body></html>`;
}

// Generate all pages
const outDir = path.join(__dirname, 'industries');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

industries.forEach(function(ind) {
  const html = generatePage(ind);
  const filePath = path.join(outDir, ind.slug + '.html');
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Generated: industries/' + ind.slug + '.html');
});

console.log('\nDone! Generated ' + industries.length + ' industry pages.');
