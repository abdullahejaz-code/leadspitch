// Industry Page Generator — New Template
// Run: node generate-industries.js
// Produces: industries/[slug].html for each industry
// Template: Hero → Products → Bundles → More Industries → FAQs → CTA

const fs = require('fs');
const path = require('path');

const industries = [
  {
    slug: "automotive",
    name: "Automotive",
    metaDesc: "Verified automotive business data — dealerships, repair shops, parts suppliers, and automotive service providers.",
    heroSub: "Dealerships, repair shops, parts suppliers, and automotive businesses. Verified contact data for B2B outreach.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "27K", price: "$13.99", member: "$8.39", link: "https://whop.com/automotive-leadspitch/starter-automotive", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "105K", price: "$24.99", member: "$14.99", link: "https://whop.com/automotive-leadspitch/growth-automotive", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "180K", price: "$39.99", member: "$23.99", link: "https://whop.com/automotive-leadspitch/professional-automotive", badge: "Best Value" },
      { plan: "Business", emails: "100K", leads: "375K", price: "$67.99", member: "$40.79", link: "https://whop.com/automotive-leadspitch/business-automotive", badge: "High Volume" },
      { plan: "Scale", emails: "200K", leads: "650K", price: "$99.99", member: "$59.99", link: "https://whop.com/automotive-leadspitch/scale-automotive", badge: "Massive Volume" },
      { plan: "Enterprise", emails: "300K", leads: "1.15M+", price: "$139.99", member: "$83.99", link: "https://whop.com/automotive-leadspitch/enterprise-automotive", badge: "Complete Database" }
    ],
    monthly: [
      { plan: "Starter", emails: "25K", leads: "95K+", duration: "12 Months", price: "$84.99", link: "https://whop.com/automotive-leadspitch/starter-automotive-monthly-data-plan-for-12-months" },
      { plan: "Growth", emails: "50K", leads: "190K+", duration: "6 Months", price: "$94.99", link: "https://whop.com/automotive-leadspitch/growth-automotive-monthly-data-plan-for-6-months" },
      { plan: "Professional", emails: "75K", leads: "285K+", duration: "4 Months", price: "$104.99", link: "https://whop.com/automotive-leadspitch/professional-automotive-monthly-data-plan-for-4-months" },
      { plan: "Business", emails: "100K", leads: "380K+", duration: "3 Months", price: "$119.99", link: "https://whop.com/automotive-leadspitch/business-automotive-monthly-data-plan-for-3-months" }
    ],
    faqs: [
      { q: "What types of automotive businesses are included?", a: "The dataset covers dealerships, auto repair shops, parts suppliers, body shops, car washes, and other automotive service businesses." },
      { q: "Can I filter by business type?", a: "Contact us for custom datasets filtered by dealership, repair shop, parts supplier, or other types." },
      { q: "Is this data for US businesses only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the automotive data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["logistics", "construction", "food-beverage"],
    bundles: ["automotive-logistics-agencies"]
  },
  {
    slug: "construction",
    name: "Construction",
    metaDesc: "Verified construction business data — general contractors, builders, subcontractors, and construction companies.",
    heroSub: "General contractors, builders, subcontractors, and construction companies. Verified contact data for B2B outreach.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "26K", price: "$12.99", member: "$7.79", link: "https://whop.com/construction-contractors-leadspitch/starter-construction-contractors", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "105K", price: "$22.99", member: "$13.79", link: "https://whop.com/construction-contractors-leadspitch/growth-construction-contractors", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "175K", price: "$37.99", member: "$22.79", link: "https://whop.com/construction-contractors-leadspitch/professional-construction-contractors", badge: "Best Value" },
      { plan: "Business", emails: "100K", leads: "360K", price: "$64.99", member: "$38.99", link: "https://whop.com/construction-contractors-leadspitch/business-construction-contractors", badge: "High Volume" },
      { plan: "Scale", emails: "200K", leads: "760K", price: "$99.99", member: "$59.99", link: "https://whop.com/construction-contractors-leadspitch/scale-construction-contractors", badge: "Enterprise Ready" },
      { plan: "Enterprise", emails: "350K", leads: "1.3M+", price: "$139.99", member: "$83.99", link: "https://whop.com/construction-contractors-leadspitch/enterprise-construction-contractors", badge: "Complete Database" }
    ],
    monthly: [
      { plan: "Starter", emails: "30K", leads: "110K+", duration: "12 Months", price: "$79.99", link: "https://whop.com/construction-contractors-leadspitch/starter-construction-contractors-monthly-data-plan-for-12-months" },
      { plan: "Growth", emails: "60K", leads: "220K+", duration: "6 Months", price: "$89.99", link: "https://whop.com/construction-contractors-leadspitch/growth-construction-contractors-monthly-data-plan-for-6-months" },
      { plan: "Professional", emails: "90K", leads: "320K+", duration: "4 Months", price: "$99.99", link: "https://whop.com/construction-contractors-leadspitch/professional-construction-contractors-monthly-data-plan-for-3-months" },
      { plan: "Business", emails: "120K", leads: "430K+", duration: "3 Months", price: "$114.99", link: "https://whop.com/construction-contractors-leadspitch/business-construction-contractors-monthly-data-plan-for-3-months" }
    ],
    faqs: [
      { q: "What types of construction companies are included?", a: "The dataset covers general contractors, home builders, subcontractors, specialty trades, and construction management firms." },
      { q: "Can I filter by trade or project type?", a: "Contact us for custom datasets filtered by trade, project type, or geography." },
      { q: "Is this data for licensed contractors only?", a: "The dataset includes businesses in the construction industry. License verification is not included." },
      { q: "How current is the construction data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["automotive", "logistics", "hotels-hospitality"],
    bundles: ["restaurants-hotels-construction"]
  },
  {
    slug: "accounting-finance",
    name: "Accounting & Finance",
    metaDesc: "Verified accounting business data — CPAs, bookkeepers, financial advisors, and accounting firms.",
    heroSub: "CPAs, bookkeepers, financial advisors, and accounting firms. Verified contact data for B2B outreach.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "23K", price: "$11.99", member: "$7.99", link: "https://whop.com/accounting-finance-leadspitch/starter-accounting-finance", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "82K", price: "$19.99", member: "$11.99", link: "https://whop.com/accounting-finance-leadspitch/growth-accounting-finance", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "135K", price: "$32.99", member: "$19.99", link: "https://whop.com/accounting-finance-leadspitch/professional-accounting-finance", badge: "Best Value" },
      { plan: "Business", emails: "65K", leads: "185K", price: "$49.99", member: "$29.99", link: "https://whop.com/accounting-finance-leadspitch/business-accounting-finance", badge: "Complete Database" }
    ],
    monthly: [
      { plan: "Starter", emails: "5K", leads: "16K+", duration: "12 Months", price: "$34.99", link: "https://whop.com/accounting-finance-leadspitch/starter-accounting-finance-monthly-data-plan-for-12-months" },
      { plan: "Growth", emails: "10.5K", leads: "33K+", duration: "6 Months", price: "$39.99", link: "https://whop.com/accounting-finance-leadspitch/growth-accounting-finance-monthly-data-plan-for-6-months" },
      { plan: "Professional", emails: "16K", leads: "48K+", duration: "4 Months", price: "$44.99", link: "https://whop.com/accounting-finance-leadspitch/professional-accounting-finance-monthly-data-plan-for-12-months" },
      { plan: "Business", emails: "21K", leads: "66K+", duration: "3 Months", price: "$49.99", link: "https://whop.com/accounting-finance-leadspitch/business-accounting-finance-monthly-data-plan-for-12-months" }
    ],
    faqs: [
      { q: "What types of accounting businesses are included?", a: "The dataset covers CPA firms, bookkeeping services, financial advisors, tax preparation firms, and other accounting and finance businesses." },
      { q: "Can I filter by accounting specialty?", a: "Contact us for custom datasets filtered by firm type, specialty, client size, or geography." },
      { q: "Is this data for US businesses only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the accounting data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["agencies-business", "legal", "home-services"],
    bundles: []
  },
  {
    slug: "clinics",
    name: "Clinics & Healthcare",
    metaDesc: "Verified healthcare business data — practices, clinics, hospitals, and medical providers.",
    heroSub: "Practices, clinics, hospitals, and healthcare providers. Industry-specific contact data for outreach and partnerships.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "26.4K", price: "$11.99", member: "$7.19", link: "https://whop.com/health-care-leads/starter-clinics-leads", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "90K", price: "$19.99", member: "$11.99", link: "https://whop.com/health-care-leads/growth-clinics-leads", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "130.7K", price: "$34.99", member: "$20.99", link: "https://whop.com/health-care-leads/professional-clinics-leads", badge: "Best Value" },
      { plan: "Business", emails: "100K", leads: "307.8K", price: "$59.99", member: "$35.99", link: "https://whop.com/health-care-leads/business-clinics-leads", badge: "High Volume" }
    ],
    monthly: [
      { plan: "Starter", emails: "8K", leads: "42K+", duration: "12 Months", price: "$39.99", link: "https://whop.com/health-care-leads/clinics-starter-monthly-data-plan-for-12-months" },
      { plan: "Growth", emails: "17K", leads: "89K+", duration: "6 Months", price: "$44.99", link: "https://whop.com/health-care-leads/clinics-growth-monthly-data-plan-for-6-months" },
      { plan: "Professional", emails: "25K", leads: "132K+", duration: "4 Months", price: "$49.99", link: "https://whop.com/health-care-leads/clinics-professional-monthly-data-plan-for-4-months" },
      { plan: "Business", emails: "34K", leads: "180K+", duration: "3 Months", price: "$54.99", link: "https://whop.com/health-care-leads/clinics-business-monthly-data-plan-for-3-months" }
    ],
    faqs: [
      { q: "What types of healthcare practices are included?", a: "The dataset covers medical practices, clinics, hospitals, specialty care providers, urgent care centers, and other healthcare facilities." },
      { q: "Can I filter by medical specialty?", a: "Contact us for custom datasets filtered by practice type, specialty, facility size, or geography." },
      { q: "Is this data for US practices only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the healthcare data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["dentists", "home-services", "beauty-wellness"],
    bundles: []
  },
  {
    slug: "dentists",
    name: "Dentists",
    metaDesc: "Verified dental business data — dental practices, orthodontists, oral surgeons, and dental labs.",
    heroSub: "Dental practices, orthodontists, oral surgeons, and dental labs. Verified contacts for outreach and partnerships.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "28K", price: "$12.99", member: "$7.79", link: "https://whop.com/destists-leads/starter-dentist-leads", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "95K", price: "$22.99", member: "$13.79", link: "https://whop.com/destists-leads/growth-dentist-leads", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "145K", price: "$37.99", member: "$22.79", link: "https://whop.com/destists-leads/professional-dentist-leads", badge: "Best Value" },
      { plan: "Business", emails: "100K", leads: "330K", price: "$64.99", member: "$38.99", link: "https://whop.com/destists-leads/business-dentist-leads", badge: "High Volume" }
    ],
    monthly: [
      { plan: "Starter", emails: "9K", leads: "50K+", duration: "12 Months", price: "$42.99", link: "https://whop.com/destists-leads/dentists-starter-monthly-data-plan-for-12-months" },
      { plan: "Growth", emails: "19K", leads: "105K+", duration: "6 Months", price: "$47.99", link: "https://whop.com/destists-leads/dentists-growth-monthly-data-plan-for-6-months" },
      { plan: "Professional", emails: "28K", leads: "155K+", duration: "4 Months", price: "$54.99", link: "https://whop.com/destists-leads/dentists-professional-monthly-data-plan-for-4-months" },
      { plan: "Business", emails: "38K", leads: "210K+", duration: "3 Months", price: "$59.99", link: "https://whop.com/destists-leads/dentists-business-monthly-data-plan-for-3-months" }
    ],
    faqs: [
      { q: "What types of dental practices are included?", a: "The dataset covers general dentistry practices, orthodontists, oral surgeons, pediatric dentists, dental labs, and other dental providers." },
      { q: "Can I filter by dental specialty?", a: "Contact us for custom datasets filtered by practice type, specialty, or geography." },
      { q: "Is this data for US practices only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the dental data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["clinics", "home-services", "agencies-business"],
    bundles: []
  },
  {
    slug: "education",
    name: "Education & Training",
    metaDesc: "Verified education business data — schools, universities, training centers, and education providers.",
    heroSub: "Schools, universities, training centers, and education providers. Industry-specific contact data for outreach.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "25K", price: "$11.99", member: "$7.19", link: "https://whop.com/education-training-c476/starter-education-training", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "95K", price: "$21.99", member: "$13.19", link: "https://whop.com/education-training-c476/growth-education-training", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "155K", price: "$35.99", member: "$21.59", link: "https://whop.com/education-training-c476/professional-education-training", badge: "Best Value" },
      { plan: "Business", emails: "100K", leads: "330K", price: "$61.99", member: "$37.19", link: "https://whop.com/education-training-c476/business-education-training", badge: "High Volume" },
      { plan: "Enterprise", emails: "175K", leads: "590K+", price: "$94.99", member: "$56.99", link: "https://whop.com/education-training-c476/enterprise-education-training", badge: "Complete Database" }
    ],
    monthly: [
      { plan: "Starter", emails: "14.5K", leads: "50K+", duration: "12 Months", price: "$59.99", link: "https://whop.com/education-training-c476/starter-education-training-monthly-data-plan-for-12-months" },
      { plan: "Growth", emails: "29.5K", leads: "100K+", duration: "6 Months", price: "$64.99", link: "https://whop.com/education-training-c476/growth-education-training-monthly-data-plan-for-6-months" },
      { plan: "Professional", emails: "44K", leads: "150K+", duration: "4 Months", price: "$69.99", link: "https://whop.com/education-training-c476/professional-education-training-monthly-data-plan-for-4-months" },
      { plan: "Business", emails: "69K", leads: "200K+", duration: "3 Months", price: "$74.99", link: "https://whop.com/education-training-c476/business-education-training-monthly-data-plan-for-12-months/" }
    ],
    faqs: [
      { q: "What types of education institutions are included?", a: "The dataset covers schools, universities, training centers, tutoring services, online education providers, and other education businesses." },
      { q: "Can I filter by institution type?", a: "Contact us for custom datasets filtered by institution type, size, level, or geography." },
      { q: "Is this data for US institutions only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the education data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["events-leisure", "home-services", "agencies-business"],
    bundles: []
  },
  {
    slug: "home-services",
    name: "Home Services",
    metaDesc: "Verified home services business data — plumbers, electricians, HVAC, landscapers, and home improvement pros.",
    heroSub: "Plumbers, electricians, HVAC, landscapers, and home improvement pros. Verified contacts for B2B outreach.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "26K", price: "$12.99", member: "$7.79", link: "https://whop.com/home-services-leadspitch/starter-home-services/", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "100K", price: "$22.99", member: "$13.79", link: "https://whop.com/home-services-leadspitch/growth-home-services/", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "170K", price: "$37.99", member: "$22.79", link: "https://whop.com/home-services-leadspitch/professional-home-services/", badge: "Best Value" },
      { plan: "Business", emails: "100K", leads: "350K", price: "$64.99", member: "$38.99", link: "https://whop.com/home-services-leadspitch/business-home-services/", badge: "High Volume" },
      { plan: "Scale", emails: "200K", leads: "700K", price: "$99.99", member: "$59.99", link: "https://whop.com/home-services-leadspitch/scale-home-services/", badge: "Growing Enterprise" },
      { plan: "Enterprise", emails: "300K", leads: "1.05M", price: "$129.99", member: "$77.99", link: "https://whop.com/home-services-leadspitch/enterprise-home-services/", badge: "Enterprise Ready" },
      { plan: "Complete Database", emails: "430K+", leads: "1.5M+", price: "$159.99", member: "$95.99", link: "https://whop.com/home-services-leadspitch/complete-database-home-services/", badge: "Complete Coverage" }
    ],
    monthly: [
      { plan: "Starter", emails: "36K", leads: "125K+", duration: "12 Months", price: "$89.99", link: "https://whop.com/home-services-leadspitch/starter-home-services-monthly-data-plan-for-12-months/" },
      { plan: "Growth", emails: "72K", leads: "250K+", duration: "6 Months", price: "$99.99", link: "https://whop.com/home-services-leadspitch/growth-home-services-monthly-data-plan-for-6-months/" },
      { plan: "Professional", emails: "108K", leads: "375K+", duration: "4 Months", price: "$114.99", link: "https://whop.com/home-services-leadspitch/professional-home-services-monthly-data-plan-for-4-months/" },
      { plan: "Business", emails: "144K", leads: "500K+", duration: "3 Months", price: "$129.99", link: "https://whop.com/home-services-leadspitch/business-home-services-monthly-data-plan-for-3-months/" }
    ],
    faqs: [
      { q: "What types of home service businesses are included?", a: "The dataset covers plumbers, electricians, HVAC contractors, landscapers, roofers, painters, and other home improvement professionals." },
      { q: "Can I filter by trade or service type?", a: "Contact us for custom datasets filtered by trade, service area, or geography." },
      { q: "Is this data for US businesses only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the home services data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["construction", "automotive", "agencies-business"],
    bundles: []
  },
  {
    slug: "restaurants-cafes",
    name: "Restaurants & Cafes",
    metaDesc: "Verified restaurant and cafe business data — restaurants, cafes, coffee shops, bakeries, and food service businesses.",
    heroSub: "Restaurants, cafes, coffee shops, bakeries, and food service businesses. Industry-specific contact data for outreach and partnerships.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "28K", price: "$13.99", member: "$8.39", link: "https://whop.com/restaurants-cafes/starter-restaurants-cafes/", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "100K", price: "$24.99", member: "$14.99", link: "https://whop.com/restaurants-cafes/growth-restaurants-cafes/", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "170K", price: "$34.99", member: "$20.99", link: "https://whop.com/restaurants-cafes/professional-restaurants-cafes/", badge: "Best Value" },
      { plan: "Business", emails: "100K", leads: "360K", price: "$64.99", member: "$38.99", link: "https://whop.com/restaurants-cafes/business-restaurants-cafes/", badge: "High Volume" },
      { plan: "Enterprise", emails: "200K", leads: "760K+", price: "$99.99", member: "$59.99", link: "https://whop.com/restaurants-cafes/enterprise-restaurants-cafes/", badge: "Complete Database" }
    ],
    monthly: [
      { plan: "Starter", emails: "17K", leads: "60K+", duration: "12 Months", price: "$64.99", link: "https://whop.com/restaurants-cafes/starter-restaurants-cafes-monthly-data-plan-for-12-months/" },
      { plan: "Growth", emails: "34K", leads: "120K+", duration: "6 Months", price: "$69.99", link: "https://whop.com/restaurants-cafes/growth-restaurants-cafes-monthly-data-plan-for-6-months/" },
      { plan: "Professional", emails: "50K", leads: "180K+", duration: "4 Months", price: "$74.99", link: "https://whop.com/restaurants-cafes/professional-restaurants-cafes-monthly-data-plan-for-4-months/" },
      { plan: "Business", emails: "67K", leads: "240K+", duration: "3 Months", price: "$79.99", link: "https://whop.com/restaurants-cafes/business-restaurants-cafes-monthly-data-plan-for-3-months/" }
    ],
    faqs: [
      { q: "What types of restaurants are included?", a: "The dataset covers full-service restaurants, fast casual, cafes, coffee shops, bakeries, food trucks, and other food service businesses." },
      { q: "Can I filter by cuisine or restaurant size?", a: "Contact us for custom datasets filtered by cuisine, seating capacity, or geography." },
      { q: "Is this data for US businesses only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the restaurant data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["events-leisure", "food-beverage", "hotels-hospitality"],
    bundles: ["restaurants-hotels-construction"]
  },
  {
    slug: "events-leisure",
    name: "Events & Leisure",
    metaDesc: "Verified events and leisure business data — event venues, planners, entertainment, and recreation providers.",
    heroSub: "Event venues, planners, entertainment companies, and recreation businesses. Verified contact data for partnerships.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "26K", price: "$12.99", member: "$7.79", link: "https://whop.com/events-leisure-leadspitch/starter-events-leisure/", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "95K", price: "$22.99", member: "$13.79", link: "https://whop.com/events-leisure-leadspitch/growth-events-leisure/", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "155K", price: "$37.99", member: "$22.79", link: "https://whop.com/events-leisure-leadspitch/professional-events-leisure/", badge: "Best Value" },
      { plan: "Business", emails: "110K", leads: "330K", price: "$62.99", member: "$37.79", link: "https://whop.com/events-leisure-leadspitch/business-events-leisure/", badge: "High Volume" }
    ],
    monthly: [
      { plan: "Starter", emails: "9K", leads: "30K+", duration: "12 Months", price: "$44.99", link: "https://whop.com/events-leisure-leadspitch/starter-events-leisure-monthly-data-plan-for-12-months/" },
      { plan: "Growth", emails: "18K", leads: "60K+", duration: "6 Months", price: "$49.99", link: "https://whop.com/events-leisure-leadspitch/growth-events-leisure-monthly-data-plan-for-6-months/" },
      { plan: "Professional", emails: "27K", leads: "90K+", duration: "4 Months", price: "$54.99", link: "https://whop.com/events-leisure-leadspitch/professional-events-leisure-monthly-data-plan-for-4-months/" },
      { plan: "Business", emails: "37K", leads: "125K+", duration: "3 Months", price: "$59.99", link: "https://whop.com/events-leisure-leadspitch/business-events-leisure-monthly-data-plan-for-3-months/" }
    ],
    faqs: [
      { q: "What types of events businesses are included?", a: "The dataset covers event venues, event planners, entertainment companies, recreation facilities, and leisure businesses." },
      { q: "Can I filter by venue type or event size?", a: "Contact us for custom datasets filtered by venue type, event capacity, or geography." },
      { q: "Is this data for US businesses only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the events data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["restaurants-cafes", "beauty-wellness", "hotels-hospitality"],
    bundles: []
  },
  {
    slug: "food-beverage",
    name: "Food & Beverage Suppliers",
    metaDesc: "Verified food and beverage supplier business data — distributors, manufacturers, and suppliers.",
    heroSub: "Food distributors, beverage suppliers, manufacturers, and wholesale businesses. Verified contact data for B2B outreach.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "26K", price: "$13.99", member: "$8.39", link: "https://whop.com/food-beverage-suppliers/starter-food-beverage-suppliers/", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "95K", price: "$24.99", member: "$14.99", link: "https://whop.com/food-beverage-suppliers/growth-food-beverage-suppliers/", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "165K", price: "$39.99", member: "$23.99", link: "https://whop.com/food-beverage-suppliers/professional-food-beverage-suppliers/", badge: "Best Value" },
      { plan: "Business", emails: "100K", leads: "340K", price: "$67.99", member: "$40.79", link: "https://whop.com/food-beverage-suppliers/business-food-beverage-suppliers/", badge: "High Volume" },
      { plan: "Enterprise", emails: "170K", leads: "620K+", price: "$109.99", member: "$65.99", link: "https://whop.com/food-beverage-suppliers/enterprise-food-beverage-suppliers/", badge: "Complete Database" }
    ],
    monthly: [
      { plan: "Starter", emails: "14K", leads: "50K+", duration: "12 Months", price: "$69.99", link: "https://whop.com/food-beverage-suppliers/starter-food-beverage-suppliers-monthly-data-plan-for-12-months/" },
      { plan: "Growth", emails: "28K", leads: "100K+", duration: "6 Months", price: "$74.99", link: "https://whop.com/food-beverage-suppliers/growth-food-beverage-suppliers-monthly-data-plan-for-6-months/" },
      { plan: "Professional", emails: "42K", leads: "150K+", duration: "4 Months", price: "$79.99", link: "https://whop.com/food-beverage-suppliers/professional-food-beverage-suppliers-monthly-data-plan-for-4-months/" },
      { plan: "Business", emails: "56K", leads: "200K+", duration: "3 Months", price: "$84.99", link: "https://whop.com/food-beverage-suppliers/business-food-beverage-suppliers-monthly-data-plan-for-3-months/" }
    ],
    faqs: [
      { q: "What types of food and beverage businesses are included?", a: "The dataset covers food distributors, beverage suppliers, manufacturers, wholesalers, and other F&B supply chain businesses." },
      { q: "Can I filter by product category?", a: "Contact us for custom datasets filtered by product type, distribution area, or geography." },
      { q: "Is this data for US businesses only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the F&B data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["restaurants-cafes", "logistics", "agencies-business"],
    bundles: []
  },
  {
    slug: "agencies-business",
    name: "Agencies & Business Services",
    metaDesc: "Verified agency and business services data — marketing agencies, consulting firms, and B2B service providers.",
    heroSub: "Marketing agencies, consulting firms, IT services, and B2B service providers. Verified contact data for partnerships.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "26K", price: "$12.99", member: "$7.79", link: "https://whop.com/agencies-business-services/starter-agencies-business-services/", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "100K", price: "$23.99", member: "$14.39", link: "https://whop.com/agencies-business-services/growth-agencies-business-services/", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "170K", price: "$38.99", member: "$23.39", link: "https://whop.com/agencies-business-services/professional-agencies-business-services/", badge: "Best Value" },
      { plan: "Business", emails: "100K", leads: "350K", price: "$64.99", member: "$38.99", link: "https://whop.com/agencies-business-services/business-agencies-business-services/", badge: "High Volume" },
      { plan: "Enterprise", emails: "300K", leads: "1.05M+", price: "$134.99", member: "$80.99", link: "https://whop.com/agencies-business-services/enterprise-agencies-business-services/", badge: "Complete Database" }
    ],
    monthly: [
      { plan: "Starter", emails: "25K", leads: "88K+", duration: "12 Months", price: "$79.99", link: "https://whop.com/agencies-business-services/starter-agencies-business-services-monthly-data-plan-for-12-months/" },
      { plan: "Growth", emails: "50K", leads: "176K+", duration: "6 Months", price: "$89.99", link: "https://whop.com/agencies-business-services/growth-agencies-business-services-monthly-data-plan-for-6-months/" },
      { plan: "Professional", emails: "75K", leads: "264K+", duration: "4 Months", price: "$99.99", link: "https://whop.com/agencies-business-services/professional-agencies-business-services-monthly-data-plan-for-4-months/" },
      { plan: "Business", emails: "100K", leads: "352K+", duration: "3 Months", price: "$114.99", link: "https://whop.com/agencies-business-services/business-agencies-business-services-monthly-data-plan-for-3-months/" }
    ],
    faqs: [
      { q: "What types of agencies are included?", a: "The dataset covers marketing agencies, advertising firms, consulting companies, IT service providers, and other B2B service businesses." },
      { q: "Can I filter by agency specialty?", a: "Contact us for custom datasets filtered by agency type, size, or geography." },
      { q: "Is this data for US agencies only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the agency data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["automotive", "logistics", "food-beverage"],
    bundles: ["automotive-logistics-agencies"]
  },
  {
    slug: "beauty-wellness",
    name: "Beauty & Wellness",
    metaDesc: "Verified beauty and wellness business data — salons, spas, clinics, and wellness providers.",
    heroSub: "Salons, spas, wellness centers, and beauty businesses. Verified contact data for B2B outreach.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "24K", price: "$11.99", member: "$7.19", link: "https://whop.com/beauty-wellness-leadspitch/starter-beauty-wellness", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "90K", price: "$21.99", member: "$13.19", link: "https://whop.com/beauty-wellness-leadspitch/growth-beauty-wellness", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "150K", price: "$35.99", member: "$21.59", link: "https://whop.com/beauty-wellness-leadspitch/professional-beauty-wellness", badge: "Best Value" },
      { plan: "Business", emails: "100K", leads: "320K", price: "$61.99", member: "$37.19", link: "https://whop.com/beauty-wellness-leadspitch/business-beauty-wellness", badge: "High Volume" },
      { plan: "Enterprise", emails: "200K", leads: "680K+", price: "$94.99", member: "$56.99", link: "https://whop.com/beauty-wellness-leadspitch/enterprise-beauty-wellness", badge: "Complete Database" }
    ],
    monthly: [
      { plan: "Starter", emails: "8K", leads: "28K+", duration: "12 Months", price: "$39.99", link: "https://whop.com/beauty-wellness-leadspitch/starter-beauty-wellness-monthly-data-plan-for-12-months" },
      { plan: "Growth", emails: "16K", leads: "56K+", duration: "6 Months", price: "$44.99", link: "https://whop.com/beauty-wellness-leadspitch/growth-beauty-wellness-monthly-data-plan-for-6-months" },
      { plan: "Professional", emails: "24K", leads: "84K+", duration: "4 Months", price: "$49.99", link: "https://whop.com/beauty-wellness-leadspitch/professional-beauty-wellness-monthly-data-plan-for-4-months" },
      { plan: "Business", emails: "32K", leads: "112K+", duration: "3 Months", price: "$54.99", link: "https://whop.com/beauty-wellness-leadspitch/business-beauty-wellness-monthly-data-plan-for-3-months" }
    ],
    faqs: [
      { q: "What types of beauty and wellness businesses are included?", a: "The dataset covers hair salons, nail salons, spas, day spas, med spas, wellness centers, and other beauty and wellness service providers." },
      { q: "Can I filter by service type?", a: "Contact us for custom datasets filtered by business type, services offered, or geography." },
      { q: "Is this data for US businesses only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the beauty & wellness data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["clinics", "events-leisure", "home-services"],
    bundles: []
  },
  {
    slug: "hotels-hospitality",
    name: "Hotels & Hospitality",
    metaDesc: "Verified hotel and hospitality business data — hotels, resorts, B&Bs, and hospitality providers.",
    heroSub: "Hotels, resorts, bed & breakfasts, and hospitality businesses. Verified contact data for B2B outreach.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "25K", price: "$15.99", member: "$9.59", link: "https://whop.com/hotels-hospitality/starter-hotels-hospitality", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "90K", price: "$27.99", member: "$16.79", link: "https://whop.com/hotels-hospitality/growth-hotels-hospitality", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "155K", price: "$44.99", member: "$26.99", link: "https://whop.com/hotels-hospitality/professional-hotels-hospitality", badge: "Best Value" },
      { plan: "Business", emails: "75K", leads: "250K", price: "$69.99", member: "$41.99", link: "https://whop.com/hotels-hospitality/business-hotels-hospitality", badge: "Complete Database" }
    ],
    monthly: [
      { plan: "Starter", emails: "6.5K", leads: "22K+", duration: "12 Months", price: "$49.99", link: "https://whop.com/hotels-hospitality/starter-hotels-hospitality-monthly-data-plan-for-12-months" },
      { plan: "Growth", emails: "13K", leads: "44K+", duration: "6 Months", price: "$54.99", link: "https://whop.com/hotels-hospitality/growth-hotels-hospitality-monthly-data-plan-for-6-months" },
      { plan: "Professional", emails: "19K", leads: "66K+", duration: "4 Months", price: "$59.99", link: "https://whop.com/hotels-hospitality/professional-hotels-hospitality-monthly-data-plan-for-4-months" },
      { plan: "Business", emails: "26K", leads: "88K+", duration: "3 Months", price: "$64.99", link: "https://whop.com/hotels-hospitality/business-hotels-hospitality-monthly-data-plan-for-12-months" }
    ],
    faqs: [
      { q: "What types of hospitality businesses are included?", a: "The dataset covers hotels, resorts, bed & breakfasts, inns, motels, and other hospitality providers." },
      { q: "Can I filter by property type or size?", a: "Contact us for custom datasets filtered by property type, room count, or geography." },
      { q: "Is this data for US businesses only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the hospitality data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["legal", "restaurants-cafes", "beauty-wellness"],
    bundles: ["restaurants-hotels-construction"]
  },
  {
    slug: "legal",
    name: "Legal",
    metaDesc: "Verified legal industry business data — law firms, attorneys, and legal practices.",
    heroSub: "Law firms, solo practitioners, and legal service providers. Verified contact data for business development and partnerships.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "24K", price: "$13.99", member: "$8.39", link: "https://whop.com/legal-leadspitch/starter-lawyer-leads/", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "90K", price: "$20.99", member: "$12.59", link: "https://whop.com/legal-leadspitch/growth-lawyer-leads/", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "145K", price: "$34.99", member: "$20.99", link: "https://whop.com/legal-leadspitch/professional-lawyer-leads/", badge: "Best Value" },
      { plan: "Business", emails: "100K", leads: "300K", price: "$59.99", member: "$35.99", link: "https://whop.com/legal-leadspitch/business-lawyer-leads/", badge: "High Volume" },
      { plan: "Enterprise", emails: "300K", leads: "900K+", price: "$129.99", member: "$77.99", link: "https://whop.com/legal-leadspitch/enterprise-lawyer-leads/", badge: "Complete Database" }
    ],
    monthly: [
      { plan: "Starter", emails: "25K", leads: "75K+", duration: "12 Months", price: "$79.99", link: "https://whop.com/legal-leadspitch/lawyers-starter-monthly-data-plan-for-12-months/" },
      { plan: "Growth", emails: "50K", leads: "150K+", duration: "6 Months", price: "$89.99", link: "https://whop.com/legal-leadspitch/lawyers-growth-monthly-data-plan-for-6-months/" },
      { plan: "Professional", emails: "75K", leads: "225K+", duration: "4 Months", price: "$99.99", link: "https://whop.com/legal-leadspitch/lawyers-professional-monthly-data-plan-for-4-months/" },
      { plan: "Business", emails: "100K", leads: "300K+", duration: "3 Months", price: "$109.99", link: "https://whop.com/legal-leadspitch/lawyers-enterprise-monthly-data-plan-for-3-months/" }
    ],
    faqs: [
      { q: "What types of legal practices are included?", a: "The dataset covers law firms of all sizes, solo practitioners, corporate legal departments, and legal service providers." },
      { q: "Can I filter by practice area?", a: "Contact us for custom datasets filtered by practice area, firm size, or geography." },
      { q: "Is this data compliant with legal advertising rules?", a: "We provide publicly available business contact information. Review your jurisdiction's advertising rules before starting outreach." },
      { q: "How often is the legal dataset updated?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["agencies-business", "construction", "hotels-hospitality"],
    bundles: []
  },
  {
    slug: "logistics",
    name: "Logistics & Transportation",
    metaDesc: "Verified logistics and transportation business data — freight, trucking, warehousing, and supply chain companies.",
    heroSub: "Freight companies, trucking firms, warehouses, and supply chain businesses. Verified contact data for partnerships.",
    oneTime: [
      { plan: "Starter", emails: "5K", leads: "24K", price: "$11.99", member: "$7.19", link: "https://whop.com/logistics-and-others/starter-logistics-and-others/", badge: "Entry Plan" },
      { plan: "Growth", emails: "25K", leads: "85K", price: "$19.99", member: "$11.99", link: "https://whop.com/logistics-and-others/growth-logistics-and-others/", badge: "Most Popular" },
      { plan: "Professional", emails: "50K", leads: "140K", price: "$32.99", member: "$19.79", link: "https://whop.com/logistics-and-others/professional-logistics-and-others/", badge: "Best Value" },
      { plan: "Business", emails: "85K", leads: "255K", price: "$54.99", member: "$32.99", link: "https://whop.com/logistics-and-others/business-logistics-and-others/", badge: "High Volume" }
    ],
    monthly: [
      { plan: "Starter", emails: "7K", leads: "21K+", duration: "12 Months", price: "$36.99", link: "https://whop.com/logistics-and-others/starter-logistics-and-others-monthly-data-plan-for-12-months/" },
      { plan: "Growth", emails: "14K", leads: "42K+", duration: "6 Months", price: "$41.99", link: "https://whop.com/logistics-and-others/growth-logistics-and-others-monthly-data-plan-for-6-months/" },
      { plan: "Professional", emails: "21K", leads: "63K+", duration: "4 Months", price: "$46.99", link: "https://whop.com/logistics-and-others/professional-logistics-and-others-monthly-data-plan-for-4-months/" },
      { plan: "Business", emails: "28K", leads: "84K+", duration: "3 Months", price: "$51.99", link: "https://whop.com/logistics-and-others/business-logistics-and-others-monthly-data-plan-for-3-months/" }
    ],
    faqs: [
      { q: "What types of logistics companies are included?", a: "The dataset covers freight carriers, trucking companies, warehousing, 3PL providers, last-mile delivery, and supply chain businesses." },
      { q: "Can I filter by fleet size or equipment type?", a: "Contact us for custom datasets with fleet size, equipment type, or other specific filters." },
      { q: "Is this data for US companies only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the logistics data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["automotive", "construction", "agencies-business"],
    bundles: ["automotive-logistics-agencies"]
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    metaDesc: "Verified real estate business data — realtors, brokers, property managers, and real estate professionals.",
    heroSub: "Realtors, brokers, property managers, and real estate professionals. Verified contacts for targeted campaigns.",
    oneTime: [
      { plan: "Starter", emails: "1K", leads: "3K", price: "$7.99", member: "$4.79", link: "https://whop.com/real-estate-leads-d0ea/real-estate-leades-1k/", badge: "Entry Plan" },
      { plan: "Growth", emails: "2.5K", leads: "8K", price: "$11.99", member: "$7.19", link: "https://whop.com/real-estate-leads-d0ea/growth-real-estate-leads", badge: "Great Value" },
      { plan: "Professional", emails: "5K", leads: "16K", price: "$17.99", member: "$10.79", link: "https://whop.com/real-estate-leads-d0ea/professional-real-estate-leads", badge: "Most Popular" },
      { plan: "Business", emails: "10K", leads: "32K", price: "$27.99", member: "$16.79", link: "https://whop.com/real-estate-leads-d0ea/business-real-estate-leads-83/", badge: "Best Value" },
      { plan: "Scale", emails: "25K", leads: "80K", price: "$44.99", member: "$26.99", link: "https://whop.com/real-estate-leads-d0ea/scale-real-estate-leads", badge: "High Volume" },
      { plan: "Enterprise", emails: "50K", leads: "160K", price: "$69.99", member: "$41.99", link: "https://whop.com/real-estate-leads-d0ea/enterprise-real-estate-leads", badge: "Complete Coverage" }
    ],
    monthly: [
      { plan: "Starter", emails: "5K", leads: "~15K", duration: "12 Months", price: "$49.99", link: "https://whop.com/real-estate-leads-d0ea/real-estate-starter-monthly-data-plan-for-12-months/" },
      { plan: "Growth", emails: "10K", leads: "~30K", duration: "6 Months", price: "$59.99", link: "https://whop.com/real-estate-leads-d0ea/real-estate-growth-monthly-data-plan-for-6-months/" },
      { plan: "Professional", emails: "15K", leads: "~45K", duration: "4 Months", price: "$69.99", link: "https://whop.com/real-estate-leads-d0ea/real-estate-professional-monthly-data-plan-for-4-months" },
      { plan: "Business", emails: "20K", leads: "~60K", duration: "3 Months", price: "$79.99", link: "https://whop.com/real-estate-leads-d0ea/real-estate-business-monthly-data-plan-for-3-months" }
    ],
    faqs: [
      { q: "What types of real estate professionals are included?", a: "The dataset covers realtors, brokers, property managers, leasing agents, real estate developers, and other real estate professionals." },
      { q: "Can I filter by property type or specialty?", a: "Contact us for custom datasets filtered by residential, commercial, property type, or geography." },
      { q: "Is this data for US professionals only?", a: "The primary dataset covers US businesses. International datasets are available on request." },
      { q: "How current is the real estate data?", a: "Subscription data refreshes on your billing cycle. One-time datasets reflect current data at purchase." }
    ],
    related: ["construction", "home-services", "legal"],
    bundles: []
  }
];

// Per-industry SEO data (titles, H1s, intro copy, and keyword lists from SEO research)
const industrySeo = {
  "automotive": {
    title: "Buy Automotive Leads | Verified Auto Dealer & Repair Shop Contact Lists",
    h1: "Buy verified automotive leads & contact lists",
    intro: "Verified automotive business leads for dealerships, repair shops, parts suppliers, and auto service providers. Buy a targeted automotive email list or fresh auto shop leads as a one-time pack or monthly subscription — delivered as a ready-to-use CSV.",
    keywords: ["buy automotive leads", "auto dealer contact list", "automotive business email list", "verified auto shop leads", "buy automotive lead packs", "car dealership owner contacts", "local auto service leads", "targeted automotive B2B leads", "fresh automotive contact packs", "automotive decision maker data"]
  },
  "construction": {
    title: "Buy Construction Leads | Verified Contractor Email Lists & Datasets",
    h1: "Buy verified construction leads & contractor contact lists",
    intro: "Target general contractors, builders, and subcontractors with verified construction leads. Buy a contractor email list, local construction leads, or targeted construction B2B leads as a one-time CSV pack or monthly subscription.",
    keywords: ["buy construction leads", "contractor email list", "verified contractor contact database", "construction company owner contacts", "buy contractor lead packs", "local construction leads", "general contractor contact list", "targeted construction B2B leads", "fresh contractor leads for sale", "construction decision maker data"]
  },
  "accounting-finance": {
    title: "Buy Accounting & Finance Leads | Verified CPA & Bookkeeper Contact Lists",
    h1: "Buy verified accounting & finance leads",
    intro: "Reach CPAs, bookkeepers, financial advisors, and accounting firms with verified accounting leads. Buy an accounting email list, local CPA contacts, or targeted finance B2B leads as a one-time CSV pack or monthly subscription.",
    keywords: ["buy accounting leads", "CPA contact list", "accounting firm email list", "verified bookkeeper leads", "buy finance lead packs", "financial advisor contacts", "local accounting business leads", "targeted CPA leads", "fresh accounting contact packs", "accounting decision maker data"]
  },
  "clinics": {
    title: "Buy Healthcare & Clinic Leads | Verified Medical Practice Contact Lists",
    h1: "Buy verified healthcare & clinic leads",
    intro: "Target medical practices, clinics, and healthcare providers with verified healthcare leads. Buy a clinic email list, local practice contacts, or targeted healthcare B2B leads as a one-time CSV pack or monthly subscription.",
    keywords: ["buy healthcare leads", "clinic contact list", "medical practice email list", "verified healthcare leads", "buy clinic lead packs", "hospital and practice contacts", "local healthcare business leads", "targeted medical leads", "fresh healthcare contact packs", "healthcare decision maker data"]
  },
  "dentists": {
    title: "Buy Dentist Leads | Verified Dental Practice Contact Lists",
    h1: "Buy verified dentist leads & dental practice contacts",
    intro: "Build your dental outreach pipeline with verified dentist leads. Buy a dental practice email list, orthodontist contacts, or local dentist leads as a one-time CSV pack or monthly subscription.",
    keywords: ["buy dentist leads", "dental practice contact list", "dentist email list", "verified dental leads database", "buy orthodontist lead packs", "oral surgeon contacts", "local dental practice leads", "targeted dentist leads", "fresh dental contact packs", "dental decision maker data"]
  },
  "education": {
    title: "Buy Education & Training Leads | Verified School Contact Lists",
    h1: "Buy verified education & training leads",
    intro: "Target schools, universities, training centers, and education providers with verified education leads. Buy a school email list, training center contacts, or targeted education B2B leads as a one-time CSV pack or monthly subscription.",
    keywords: ["buy education leads", "school contact list", "education email list", "verified training center leads", "buy education lead packs", "university and school contacts", "local education business leads", "targeted training leads", "fresh education contact packs", "education decision maker data"]
  },
  "home-services": {
    title: "Buy Home Services Leads | Verified Plumber & HVAC Contact Lists",
    h1: "Buy verified home services leads",
    intro: "Reach plumbers, electricians, HVAC contractors, and home improvement professionals with verified home services leads. Buy a contractor email list, local trades contacts, or targeted home services B2B leads as a one-time CSV pack or monthly subscription.",
    keywords: ["buy home services leads", "plumber contact list", "HVAC email list", "verified contractor leads", "buy home improvement lead packs", "electrician and landscaper contacts", "local home services business leads", "targeted trades leads", "fresh home services contact packs", "home services decision maker data"]
  },
  "restaurants-cafes": {
    title: "Buy Restaurant Leads | Verified Restaurant & Cafe Contact Lists",
    h1: "Buy verified restaurant & cafe leads",
    intro: "Grow your food service client base with verified restaurant leads. Buy a restaurant email list, local restaurant owner contacts, or targeted cafe and coffee shop leads as a one-time CSV pack or monthly subscription.",
    keywords: ["buy restaurant leads", "restaurant owner contact list", "restaurant email list", "verified restaurant leads", "cafe and coffee shop leads", "local restaurant business leads", "restaurant and hotel contacts", "fresh restaurant contact packs", "restaurant decision maker data", "food service leads"]
  },
  "events-leisure": {
    title: "Buy Events & Leisure Leads | Verified Event Venue Contact Lists",
    h1: "Buy verified events & leisure leads",
    intro: "Target event venues, planners, and recreation businesses with verified events leads. Buy an event venue contact list or leisure business leads as a one-time CSV pack or monthly subscription.",
    keywords: ["buy events leads", "event venue contact list", "events email list", "verified events leads", "buy events lead packs", "event planner contacts", "local events business leads", "targeted leisure leads", "fresh events contact packs", "events decision maker data"]
  },
  "food-beverage": {
    title: "Buy Food & Beverage Supplier Leads | Verified F&B Contact Lists",
    h1: "Buy verified food & beverage supplier leads",
    intro: "Reach distributors, manufacturers, and wholesale suppliers with verified food and beverage leads. Buy a food supplier email list or targeted F&B B2B leads as a one-time CSV pack or monthly subscription.",
    keywords: ["buy food and beverage leads", "food distributor contact list", "F&B email list", "verified food supplier leads", "buy food supply lead packs", "wholesale food contacts", "local F&B business leads", "targeted beverage supplier leads", "fresh food contact packs", "food and beverage decision maker data"]
  },
  "agencies-business": {
    title: "Buy Marketing Agency Leads | Verified Agency & Business Services Contacts",
    h1: "Buy verified marketing agency leads",
    intro: "Target marketing agencies, consulting firms, and B2B service providers with verified agency leads. Buy an agency email list or professional services contact pack as a one-time CSV or monthly subscription.",
    keywords: ["buy agency leads", "marketing agency contact list", "agency email list", "verified agency leads database", "buy agency lead packs", "consulting firm owner contacts", "local agency leads", "targeted B2B service leads", "fresh agency contact packs", "agency decision maker data"]
  },
  "beauty-wellness": {
    title: "Buy Beauty & Wellness Leads | Verified Salon & Spa Contact Lists",
    h1: "Buy verified beauty & wellness leads",
    intro: "Target salons, spas, wellness centers, and beauty businesses with verified beauty & wellness leads. Buy a salon email list, spa owner contacts, or targeted beauty business leads as a one-time CSV pack or monthly subscription.",
    keywords: ["buy beauty leads", "salon contact list", "spa email list", "verified beauty business leads", "buy wellness lead packs", "salon owner contacts", "local beauty business leads", "targeted wellness leads", "fresh beauty contact packs", "beauty and wellness decision maker data"]
  },
  "hotels-hospitality": {
    title: "Buy Hotel & Hospitality Leads | Verified Hotel Owner Contact Lists",
    h1: "Buy verified hotel & hospitality leads",
    intro: "Reach hotel owners, resorts, and hospitality providers with verified hospitality leads. Buy a hotel owner contact list or local hotel and travel leads as a one-time CSV pack or monthly subscription.",
    keywords: ["buy hospitality leads", "hotel owner contact list", "hotel email list", "verified hospitality leads", "buy hospitality lead packs", "resort and B&B contacts", "local hotel leads", "targeted tourism business leads", "fresh hospitality contact packs", "hospitality decision maker data"]
  },
  "legal": {
    title: "Buy Lawyer Leads | Verified Attorney & Law Firm Email Lists",
    h1: "Buy verified lawyer leads & attorney contact lists",
    intro: "Build your legal business development pipeline with verified lawyer leads. Buy an attorney email list, law firm owner contacts, or local law firm leads as a one-time CSV pack or monthly subscription.",
    keywords: ["buy lawyer leads", "attorney contact list", "law firm email list", "verified lawyer leads database", "buy attorney lead packs", "legal practice owner contacts", "local law firm leads", "targeted legal professional leads", "fresh lawyer contact packs", "lawyer decision maker data"]
  },
  "logistics": {
    title: "Buy Logistics & Trucking Leads | Verified Logistics Company Contact Lists",
    h1: "Buy verified logistics & transportation leads",
    intro: "Reach freight companies, trucking firms, and warehousing businesses with verified logistics leads. Buy a trucking company contact list or logistics email list as a one-time CSV pack or monthly subscription.",
    keywords: ["buy logistics leads", "trucking company contact list", "logistics and transport email list", "verified logistics leads", "buy transport lead packs", "freight and shipping contacts", "local logistics business leads", "targeted logistics B2B leads", "fresh logistics contact packs", "transport decision maker data"]
  },
  "real-estate": {
    title: "Buy Real Estate Leads | Verified Realtor & Broker Contact Lists",
    h1: "Buy verified real estate leads & agent contact lists",
    intro: "Target realtors, brokers, property managers, and real estate professionals with verified real estate leads. Buy a realtor email list, local agent contacts, or targeted real estate B2B leads as a one-time CSV pack or monthly subscription.",
    keywords: ["buy real estate leads", "realtor contact list", "real estate agent email list", "verified realtor leads", "buy real estate lead packs", "broker and property manager contacts", "local real estate business leads", "targeted real estate agent leads", "fresh real estate contact packs", "real estate decision maker data"]
  },
};

// Bundle data
const bundleData = {
  "restaurants-hotels-construction": {
    name: "Restaurants, Hotels & Construction",
    industries: ["Restaurants & Cafes", "Hotels & Hospitality", "Construction"],
    price25k: "$49.99", price25kRetail: "$65.99", price25kSave: "$16",
    price50k: "$94.99", price50kRetail: "$117.99", price50kSave: "$23",
    link25k: "https://whop.com/bundles-leadspitch/bundle-s1-restaurants-hotels-hospitality-construction-25k/",
    link50k: "https://whop.com/bundles-leadspitch/bundle-s1-restaurants-hotels-hospitality-construction-50k/"
  },
  "automotive-logistics-agencies": {
    name: "Automotive, Logistics & Agencies",
    industries: ["Automotive", "Logistics & Transportation", "Agencies & Business Services"],
    price25k: "$49.99", price25kRetail: "$68.99", price25kSave: "$19",
    price50k: "$89.99", price50kRetail: "$111.99", price50kSave: "$22",
    link25k: "https://whop.com/bundles-leadspitch/bundle-s2-automotive-logistics-agencies-business-services-25k/",
    link50k: "https://whop.com/bundles-leadspitch/bundle-s2-automotive-logistics-agencies-business-services-50k/"
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
  const pageUrl = 'https://leadspitch.com/industries/' + data.slug + '.html';
  const availability = soon ? 'https://schema.org/PreOrder' : 'https://schema.org/InStock';

  // Build "Explore More Datasets" grid (3-6 related industries)
  const exploreIndustries = data.related
    ? data.related.slice(0, 6).map(slug => allIndustryLinks.find(i => i.slug === slug)).filter(Boolean)
    : allIndustryLinks.filter(i => i.slug !== data.slug).slice(0, 6);
  const exploreIndustriesHtml = exploreIndustries.map(i =>
    `            <a class="explore-card" href="${i.slug}.html">
              <h3>${i.name}</h3>
              <span class="explore-arrow" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
            </a>`
  ).join('\n');

  // Qualitative comparison table (no specific competitor pricing claims)
  const comparisonHtml = `
    <hr class="section-divider">

    <!-- Comparison -->
    <section id="compare">
      <div class="wrap">
        <div class="section-head">
          <p class="eyebrow">Why LeadsPitch</p>
          <h2>How we compare with typical B2B data platforms</h2>
          <p class="compare-lede">No per-seat software, no credit meters, no dashboard to learn. You get a finished dataset and get on with outreach.</p>
        </div>
        <div class="compare-table-wrap reveal">
          <table class="compare-table">
            <thead>
              <tr>
                <th scope="col">What matters</th>
                <th scope="col">LeadsPitch</th>
                <th scope="col">Typical SaaS data platform</th>
                <th scope="col">DIY scraping tools</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Pricing model</th><td>One-time packs + flat monthly</td><td>Per-seat subscriptions with credits</td><td>Usage-based, pay per scrape</td></tr>
              <tr><th scope="row">Data verification</th><td>Verified contacts included</td><td>Verification often an add-on</td><td>You verify everything yourself</td></tr>
              <tr><th scope="row">Setup time</th><td>Instant CSV download</td><td>Onboarding, tools, integrations</td><td>Infrastructure and code required</td></tr>
              <tr><th scope="row">Minimum commitment</th><td>None — buy what you need</td><td>Annual contracts are common</td><td>Time and technical effort</td></tr>
              <tr><th scope="row">Support</th><td>Direct, human support</td><td>Ticket queues</td><td>Community forums</td></tr>
              <tr><th scope="row">Delivery format</th><td>CSV / Excel, ready to use</td><td>API and CRM focused</td><td>Raw scraped output</td></tr>
            </tbody>
          </table>
        </div>
        <p class="compare-note">Plans and features change often. This comparison focuses on how business contact data is sold and delivered, not on specific competitor pricing.</p>
      </div>
    </section>`;

  // Build one-time pricing cards
  const oneTimeCardsHtml = data.oneTime.map((p, i) => {
    const isFeatured = p.badge === "Most Popular" || p.badge === "Best Value";
    const isLarge = i < 2;
    const featuredClass = isFeatured ? ' product-card--featured' : '';
    const largeClass = isLarge ? ' product-card--large' : '';
    const badgeHtml = p.badge ? `<span class="product-badge">${p.badge}</span>` : '';
    const memberHtml = soon
      ? `<div class="product-member product-member--soon">Coming soon — request access</div>`
      : `<div class="product-member">40% OFF with membership: ${p.member}</div>`;
    const ctaHtml = soon
      ? `<a class="product-cta btn-outline" href="../contact.html">Request access</a>`
      : `<a class="product-cta${isFeatured ? ' btn-primary' : ' btn-outline'}" href="${p.link}" target="_blank" rel="noopener">Buy now</a>`;
    return `          <div class="product-card${featuredClass}${largeClass}">
            ${badgeHtml}
            <h3 class="product-plan">${p.plan}</h3>
            <div class="product-price-row">
              <span class="product-price">${p.price}</span>
              <span class="product-price-note">one-time</span>
            </div>
            ${memberHtml}
            <div class="product-stats">
              <div class="product-stat">
                <span class="product-stat-num">${p.leads}</span>
                <span class="product-stat-label">Leads</span>
              </div>
              <div class="product-stat-divider"></div>
              <div class="product-stat">
                <span class="product-stat-num">${p.emails}</span>
                <span class="product-stat-label">Emails</span>
              </div>
            </div>
            <div class="product-includes">
              <button class="product-includes-toggle" type="button" aria-expanded="false">
                What's included
                <svg viewBox="0 0 18 18" fill="none"><path d="M9 3v12M3 9h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>
              </button>
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
            </div>
            ${ctaHtml}
          </div>`;
  }).join('\n');

  // Build monthly pricing cards
  const monthlyCardsHtml = data.monthly.map((p, i) => {
    const isLarge = i < 2;
    const largeClass = isLarge ? ' product-card--large' : '';
    const ctaHtml = soon
      ? `<a class="product-cta btn-outline" href="../contact.html">Request access</a>`
      : `<a class="product-cta btn-outline" href="${p.link}" target="_blank" rel="noopener">Start subscription</a>`;
    return `          <div class="product-card product-card--monthly${largeClass}">
            <span class="product-badge product-badge--monthly">Monthly</span>
            <h3 class="product-plan">${p.plan}</h3>
            <div class="product-price-row">
              <span class="product-price">${p.price}</span>
              <span class="product-price-note">/ ${p.duration.toLowerCase()}</span>
            </div>
            <div class="product-stats">
              <div class="product-stat">
                <span class="product-stat-num">${p.leads}</span>
                <span class="product-stat-label">Leads/mo</span>
              </div>
              <div class="product-stat-divider"></div>
              <div class="product-stat">
                <span class="product-stat-num">${p.emails}</span>
                <span class="product-stat-label">Emails/mo</span>
              </div>
            </div>
            <div class="product-includes">
              <button class="product-includes-toggle" type="button" aria-expanded="false">
                What's included
                <svg viewBox="0 0 18 18" fill="none"><path d="M9 3v12M3 9h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>
              </button>
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
            </div>
            ${ctaHtml}
          </div>`;
  }).join('\n');

  // Build bundles section
  let bundlesHtml = '';
  if (data.bundles && data.bundles.length > 0) {
    const bundleCards = data.bundles.map(bundleKey => {
      const b = bundleData[bundleKey];
      if (!b) return '';
      return `        <div class="bundle-card">
          <div class="bundle-card-top">
            <h3 class="bundle-name">${b.name}</h3>
            <span class="bundle-save">Save up to ${b.price50kSave}</span>
          </div>
          <div class="bundle-tags">
            ${b.industries.map(ind => `<span class="bundle-tag">${ind}</span>`).join('\n            ')}
          </div>
          <div class="bundle-body">
            <div class="bundle-tiers">
              <div class="bundle-tier">
                <span class="bundle-tier-label">25K Emails</span>
                <div class="bundle-tier-price">
                  <span class="bundle-old-price">${b.price25kRetail}</span>
                  <span class="bundle-new-price">${b.price25k}</span>
                </div>
                <a class="btn btn-outline btn-sm" href="${b.link25k}" target="_blank" rel="noopener">Get bundle</a>
              </div>
              <div class="bundle-tier bundle-tier--featured">
                <span class="bundle-tier-label">50K Emails</span>
                <div class="bundle-tier-price">
                  <span class="bundle-old-price">${b.price50kRetail}</span>
                  <span class="bundle-new-price">${b.price50k}</span>
                </div>
                <a class="btn btn-primary btn-sm" href="${b.link50k}" target="_blank" rel="noopener">Get bundle</a>
              </div>
            </div>
            <p class="bundle-industries">Includes: ${b.industries.join(' + ')}</p>
          </div>
        </div>`;
    }).join('\n');

    bundlesHtml = `
    <hr class="section-divider">

    <!-- Bundles -->
    <section id="bundles">
      <div class="wrap">
        <div class="section-head">
          <p class="eyebrow">Industry bundles</p>
          <h2>Save more with multi-industry bundles</h2>
        </div>
        <div class="bundles-grid reveal">
${bundleCards}
        </div>
      </div>
    </section>`;
  }

  // Build FAQs
  const faqsHtml = data.faqs.map((f, i) => `
          <div class="faq-item${i === 0 ? ' open' : ''}">
            <button class="faq-q" type="button" aria-expanded="${i === 0 ? 'true' : 'false'}" aria-controls="faq-${i}-answer">
              ${f.q}
              <svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M9 3v12M3 9h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>
            </button>
            <div class="faq-a" id="faq-${i}-answer"><div class="faq-a-text">
              ${f.a}
            </div></div>
          </div>`).join('\n');

  return `<!doctype html>
<html lang="en"><head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${seo.title}</title>
  <meta name="description" content="${data.metaDesc}">
  <meta name="keywords" content="${seo.keywords.join(', ')}">
  <link rel="canonical" href="${pageUrl}">
  <meta property="og:title" content="${seo.title}">
  <meta property="og:description" content="${data.metaDesc}">
  <meta property="og:type" content="product">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:site_name" content="LeadsPitch">
  <meta property="og:image" content="https://leadspitch.com/public/sample-excel.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${seo.title}">
  <meta name="twitter:description" content="${data.metaDesc}">
  <meta name="twitter:image" content="https://leadspitch.com/public/sample-excel.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LeadsPitch",
    "url": "https://leadspitch.com",
    "logo": "https://leadspitch.com/public/logo.svg",
    "description": "Business data platform offering one-time dataset purchases and monthly subscriptions across 15 industries.",
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
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://leadspitch.com/index.html" },
      { "@type": "ListItem", "position": 2, "name": "Industries", "item": "https://leadspitch.com/industries.html" },
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
      --bg: #ffffff;
      --bg-elevated: #f9fafb;
      --surface: #ffffff;
      --surface-2: #f3f4f6;
      --fg: #111111;
      --muted: #374151;
      --faint: #6b7280;
      --border: #e5e7eb;
      --border-soft: #f3f4f6;
      --accent: #111111;
      --accent-soft: rgba(17, 17, 17, 0.05);
      --accent-text: #111111;
      --success: #10b981;
      --font-display: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --font-mono: "SF Mono", "JetBrains Mono", ui-monospace, Menlo, monospace;
      --radius: 12px;
      --max: 1120px;
      --gutter: clamp(1.25rem, 4vw, 2.5rem);
      --nav-h: 72px;
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
      background: rgba(255, 255, 255, 0.92);
      -webkit-backdrop-filter: blur(20px);
      backdrop-filter: blur(20px);
    }
    .nav {
      height: var(--nav-h);
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 1rem;
      position: relative;
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
      .nav-pill { display: inline-flex; }
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
      min-width: 240px;
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
      background: var(--fg);
      color: #ffffff;
      border: 1px solid var(--fg);
      font-size: 0.8125rem;
      font-weight: 500;
      padding: 0.5rem 1.25rem;
      min-height: 36px;
      border-radius: 100px;
      transition: background 180ms ease, box-shadow 180ms ease, transform 150ms ease;
      text-decoration: none;
    }
    .nav-cta .btn-primary:hover {
      background: #242424;
      border-color: #242424;
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
      justify-content: center;
      padding: 5rem var(--gutter) 3rem;
    }
    .mobile-panel.open { display: flex; }
    .mobile-panel .mobile-nav-links {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: 0;
      width: 100%;
      max-width: 320px;
    }
    .mobile-panel .mobile-nav-links a {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1.1rem 0;
      font-size: 1.5rem;
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
      gap: 0.5rem;
      padding: 1.1rem 0;
      font-size: 1.5rem;
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
      width: 16px;
      height: 16px;
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
      max-height: 600px;
      opacity: 1;
    }
    .mobile-dropdown-panel a {
      display: flex;
      align-items: center;
      padding: 0.7rem 0;
      font-size: 1.1rem;
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
      margin-top: 2rem;
      width: 100%;
      max-width: 320px;
    }
    .mobile-panel .mobile-nav-cta .btn {
      width: 100%;
      background: var(--fg);
      color: #ffffff;
      border: none;
    }
    .mobile-panel .mobile-nav-cta .btn:hover { background: #242424; }
    .mobile-close {
      position: absolute;
      top: 1.25rem;
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
    .nav-dropdown.open .nav-dropdown-menu { display: block; }
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
    .eyebrow {
      font-family: var(--font-mono); font-size: 0.7rem; font-weight: 500;
      letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent-text);
    }
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
    .breadcrumbs span { margin: 0 0.4rem; }

    /* Hero */
    .hero { padding: clamp(2rem, 5vw, 3.5rem) 0 clamp(3rem, 6vw, 5rem); }
    .hero h1 {
      font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 600; line-height: 1.12; letter-spacing: -0.02em;
      margin: 0.75rem 0 0.75rem;
    }
    .hero-sub {
      font-size: clamp(0.95rem, 1.3vw, 1.05rem); line-height: 1.65;
      color: var(--muted); max-width: 52ch;
    }
    .hero-intro {
      margin-top: 1rem; font-size: 0.95rem; line-height: 1.7;
      color: var(--muted); max-width: 56ch;
    }
    .hero-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.5rem; }

    /* Section */
    section { padding: clamp(2.5rem, 5vw, 4rem) 0; }
    .section-head { display: grid; gap: 0.6rem; margin-bottom: clamp(1.5rem, 3vw, 2.5rem); }
    .section-head h2 {
      font-family: var(--font-display); font-size: clamp(1.5rem, 2.8vw, 2.2rem);
      font-weight: 600; letter-spacing: -0.02em; line-height: 1.15;
    }

    /* Product Cards — New Design */
    .pricing-grid {
      display: grid; gap: 1rem;
      grid-template-columns: repeat(3, 1fr);
    }
    .product-card {
      border: 1px solid var(--border); border-radius: var(--radius);
      background: var(--surface); padding: 1.25rem;
      display: grid; gap: 0.4rem; position: relative;
      transition: border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease;
    }
    .product-card:hover {
      border-color: var(--accent); transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.06);
    }
    .product-card--featured {
      border-color: var(--accent); border-width: 2px;
      background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
    }
    .product-card--featured:hover { box-shadow: 0 12px 32px rgba(0,0,0,0.1); }
    .product-badge {
      display: inline-block; width: fit-content;
      font-family: var(--font-mono); font-size: 0.6rem; font-weight: 600;
      letter-spacing: 0.08em; text-transform: uppercase;
      padding: 0.2rem 0.5rem; border-radius: 6px;
      background: var(--accent); color: #fff;
    }
    .product-badge--monthly { background: var(--surface-2); color: var(--muted); }
    .product-plan {
      font-family: var(--font-display); font-size: 1.1rem;
      font-weight: 600; letter-spacing: -0.015em; margin-top: 0.25rem;
    }
    .product-price-row { display: flex; align-items: baseline; gap: 0.35rem; }
    .product-price {
      font-family: var(--font-display); font-size: 1.75rem;
      font-weight: 700; letter-spacing: -0.03em;
    }
    .product-price-note { font-size: 0.8rem; color: var(--faint); font-weight: 400; }
    .product-member { font-size: 0.75rem; color: var(--success); font-weight: 500; }
    .product-stats {
      display: flex; align-items: center; gap: 0.75rem;
      padding: 0.6rem 0; margin: 0.15rem 0;
      border-top: 1px solid var(--border-soft);
      border-bottom: 1px solid var(--border-soft);
    }
    .product-stat { display: flex; flex-direction: column; }
    .product-stat-num {
      font-family: var(--font-display); font-size: 1.15rem;
      font-weight: 700; letter-spacing: -0.02em; line-height: 1.2;
    }
    .product-stat-label {
      font-size: 0.7rem; color: var(--faint); text-transform: uppercase;
      letter-spacing: 0.05em; font-weight: 500;
    }
    .product-stat-divider { width: 1px; height: 28px; background: var(--border); }
    .product-includes { margin: 0.15rem 0; }
    .product-includes-toggle {
      display: flex; align-items: center; gap: 0.4rem;
      font-size: 0.75rem; font-weight: 500; color: var(--muted);
      padding: 0.35rem 0; width: 100%; text-align: left;
      transition: color 160ms ease;
    }
    .product-includes-toggle svg { width: 14px; height: 14px; transition: transform 200ms ease; }
    .product-includes-toggle[aria-expanded="true"] svg { transform: rotate(45deg); }
    .product-includes-list {
      list-style: none; padding: 0; margin: 0;
      display: none; grid; gap: 0.2rem; padding-bottom: 0.5rem;
    }
    .product-includes-list.open { display: grid; }
    .product-includes-list li {
      font-size: 0.78rem; color: var(--muted);
      padding-left: 1rem; position: relative;
    }
    .product-includes-list li::before {
      content: "\\2713"; position: absolute; left: 0; top: 0;
      color: var(--success); font-size: 0.7rem; font-weight: 700;
    }
    .product-cta { width: 100%; margin-top: 0.5rem; text-align: center; }
    .product-card--monthly { background: var(--bg-elevated); }
    .product-member--soon { color: var(--faint); font-weight: 500; }

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

    /* Bundles */
    .bundles-grid {
      display: grid; gap: 1.25rem;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    }
    .bundle-card {
      border: 1px solid var(--border); border-radius: 16px;
      background: var(--surface); overflow: hidden;
      display: grid;
      transition: border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease;
    }
    .bundle-card:hover { border-color: var(--accent); transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
    .bundle-card-top {
      background: linear-gradient(135deg, #111111 0%, #374151 100%);
      padding: 1.25rem 1.5rem;
      display: flex; flex-direction: column; gap: 0.6rem;
    }
    .bundle-name {
      font-family: var(--font-display); font-size: 1.15rem;
      font-weight: 700; letter-spacing: -0.01em; color: #ffffff;
    }
    .bundle-save {
      display: inline-block; width: fit-content;
      font-size: 0.7rem; font-weight: 700; color: #111111;
      background: #10b981; padding: 0.25rem 0.6rem; border-radius: 20px;
      letter-spacing: 0.02em;
    }
    .bundle-tags {
      display: flex; flex-wrap: wrap; gap: 0.35rem;
      padding: 0 1.5rem; margin-top: -0.5rem; position: relative; z-index: 1;
    }
    .bundle-tag {
      font-size: 0.68rem; font-weight: 500; color: var(--muted);
      background: var(--surface-2); padding: 0.2rem 0.55rem;
      border-radius: 20px; border: 1px solid var(--border-soft);
    }
    .bundle-body {
      padding: 1.25rem 1.5rem 1.5rem;
      display: grid; gap: 0.75rem;
    }
    .bundle-tiers { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
    .bundle-tier {
      display: grid; gap: 0.4rem; padding: 1rem 0.75rem;
      border: 1px solid var(--border-soft); border-radius: 12px; text-align: center;
      background: var(--bg-elevated);
      transition: border-color 160ms ease;
    }
    .bundle-tier:hover { border-color: var(--border); }
    .bundle-tier--featured {
      border-color: var(--accent); background: var(--surface);
      position: relative;
    }
    .bundle-tier--featured::before {
      content: "Best value"; position: absolute; top: -0.5rem; left: 50%; transform: translateX(-50%);
      font-size: 0.6rem; font-weight: 600; color: #fff; background: var(--accent);
      padding: 0.15rem 0.5rem; border-radius: 10px; white-space: nowrap;
      letter-spacing: 0.03em; text-transform: uppercase;
    }
    .bundle-tier-label { font-size: 0.72rem; color: var(--faint); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
    .bundle-tier-price { display: flex; align-items: baseline; justify-content: center; gap: 0.35rem; }
    .bundle-old-price { font-size: 0.78rem; color: var(--faint); text-decoration: line-through; }
    .bundle-new-price { font-family: var(--font-display); font-size: 1.4rem; font-weight: 700; letter-spacing: -0.02em; }
    .bundle-tier .btn { margin-top: 0.25rem; }
    .bundle-industries { font-size: 0.75rem; color: var(--faint); text-align: center; line-height: 1.5; }

    /* Section divider */
    .section-divider { border-top: 1px solid var(--border-soft); }

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

    /* FAQ */
    .faq-section { max-width: 720px; }
    .faq-list {
      display: grid; gap: 0.5rem;
      border-top: none;
    }
    .faq-item {
      border: 1px solid var(--border);
      border-radius: 16px;
      background: var(--surface);
      overflow: hidden;
      transition: border-color 200ms ease, box-shadow 200ms ease;
    }
    .faq-item:hover { border-color: #d1d5db; }
    .faq-item.open {
      border-color: var(--accent);
      box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    }
    .faq-q {
      width: 100%; display: flex; align-items: center;
      justify-content: space-between; gap: 1rem;
      text-align: left; padding: 1rem 1.25rem;
      font-size: 0.9375rem; font-weight: 500; letter-spacing: -0.01em;
    }
    .faq-q svg {
      width: 18px; height: 18px; color: var(--faint);
      flex: 0 0 auto; transition: transform 250ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .faq-item.open .faq-q svg { transform: rotate(45deg); color: var(--fg); }
    .faq-a {
      display: grid; grid-template-rows: 0fr;
      transition: grid-template-rows 350ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .faq-item.open .faq-a { grid-template-rows: 1fr; }
    .faq-a > div { overflow: hidden; }
    .faq-a-text {
      padding: 0 1.25rem 1.25rem; color: var(--muted);
      font-size: 0.9rem; line-height: 1.65; max-width: 62ch;
    }
    .faq-more {
      margin-top: 1.5rem;
      font-size: 0.92rem;
      color: var(--muted);
    }

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

    /* Footer — Full black */
    .site-footer {
      background: #000000; color: #d1d5db;
      padding: clamp(3rem, 6vw, 5rem) 0 0; margin-top: 1rem; text-align: center;
    }
    .footer-display {
      font-family: var(--font-display); font-weight: 700;
      font-size: clamp(3rem, 10vw, 7.5rem); letter-spacing: -0.03em; line-height: 0.95;
      color: #ffffff; padding-bottom: clamp(1.5rem, 3vw, 2.5rem);
      border-bottom: 1px solid #374151; margin-bottom: clamp(2rem, 4vw, 3rem);
      text-wrap: balance;
    }
    .footer-logo { display: flex; justify-content: center; margin-bottom: clamp(1.5rem, 3vw, 2.5rem); padding-bottom: clamp(1.5rem, 3vw, 2.5rem); border-bottom: 1px solid #374151; }
    .footer-logo img { height: clamp(64px, 9vw, 120px); width: auto; }
    .footer-grid { display: grid; gap: 2rem; justify-items: center; }
    .footer-grid a { color: #9ca3af; transition: color 150ms ease; }
    .footer-grid a:hover { color: #ffffff; }
    .footer-brand p { margin-top: 0; color: #6b7280; font-size: 0.92rem; line-height: 1.55; max-width: 28ch; }
    .footer-col h4 { font-size: 0.78rem; font-family: var(--font-body); font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #9ca3af; margin-bottom: 0.9rem; }
    .footer-col a { display: block; color: #9ca3af; font-size: 0.92rem; padding: 0.25rem 0; transition: color 150ms ease; }
    .footer-col a:hover { color: #ffffff; }
    .footer-bottom { margin-top: 2.5rem; padding: 1.25rem 0; border-top: 1px solid #374151; display: flex; flex-wrap: wrap; gap: 0.75rem 1.5rem; justify-content: center; color: #6b7280; font-size: 0.82rem; }

    /* Reveal */
    .reveal { opacity: 0; transform: translateY(12px); transition: opacity 700ms ease, transform 700ms ease; }
    .reveal.is-in { opacity: 1; transform: none; }

    /* Sample Data Preview */
    .sample-lede { color: var(--muted); max-width: 52ch; font-size: 0.95rem; line-height: 1.65; }
    .sample-preview {
      border: 1px solid var(--border); border-radius: var(--radius);
      overflow: hidden; background: var(--surface);
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }
    .sample-preview img { width: 100%; height: auto; display: block; }

    /* Explore More Datasets */
    .explore-grid {
      display: grid; gap: 0.75rem;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }
    .explore-card {
      display: grid; grid-template-columns: 1fr auto; align-items: center;
      gap: 0.75rem; padding: 1rem 1.25rem;
      border: 1px solid var(--border); border-radius: var(--radius);
      background: var(--surface);
      transition: border-color 180ms ease, transform 180ms ease, box-shadow 180ms ease;
    }
    .explore-card:hover {
      border-color: var(--accent); transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    }
    .explore-card h3 { font-size: 0.9375rem; font-weight: 500; letter-spacing: -0.01em; }
    .explore-arrow {
      width: 26px; height: 26px; border-radius: 50%;
      border: 1px solid var(--border); display: grid; place-items: center;
      color: var(--muted); flex-shrink: 0;
      transition: color 160ms ease, border-color 160ms ease, transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .explore-arrow svg { width: 13px; height: 13px; }
    .explore-card:hover .explore-arrow {
      color: var(--accent); border-color: var(--accent); transform: translateX(2px);
    }

    @media (max-width: 699px) {
      .hero { padding: clamp(1.5rem, 4vw, 2rem) 0 clamp(2rem, 4vw, 3rem); }
      .hero h1 { font-size: clamp(1.6rem, 5vw, 2rem); }
      .hero-sub { font-size: 0.9rem; }
      .pricing-grid { grid-template-columns: 1fr; }
      .bundles-grid { grid-template-columns: 1fr; }
      .related-grid { grid-template-columns: 1fr; }
      .explore-grid { grid-template-columns: repeat(2, 1fr); gap: 0.5rem; }
      .explore-card { padding: 0.75rem 1rem; }
      .explore-card h3 { font-size: 0.8125rem; }
      .bottom-cta { padding: clamp(2rem, 5vw, 3rem) 0; }
      .bottom-cta h2 { font-size: 1.25rem; }
      .bottom-cta p { font-size: 0.875rem; margin-bottom: 1.25rem; }
      .bottom-cta-actions { flex-direction: column; }
      .bottom-cta-actions .btn { width: 100%; }
      .mobile-panel .mobile-nav-links a { font-size: 1.2rem; padding: 0.85rem 0; }
      .mobile-panel { padding: 4rem var(--gutter) 2rem; }
    }
    @media (min-width: 700px) and (max-width: 900px) {
      .pricing-grid { grid-template-columns: repeat(2, 1fr); }
      .explore-grid { grid-template-columns: repeat(3, 1fr); }
    }
    @media (min-width: 800px) { .footer-grid { grid-template-columns: 1fr 1fr 1fr 1fr; } }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important; animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important; scroll-behavior: auto !important;
      }
    }
  </style>
</head>
<body>

  <header class="site-header" id="top">
    <div class="wrap nav">
      <a class="logo" href="../index.html" aria-label="LeadsPitch home">
        <img src="../public/logo.svg" alt="LeadsPitch" onerror="this.insertAdjacentText('afterend','LeadsPitch');this.remove()">
      </a>
      <nav class="nav-pill" aria-label="Primary">
        <a href="../index.html">Home</a>
        <a href="../about.html">About</a>
        <div class="nav-dropdown">
          <button class="nav-dropdown-toggle" type="button" aria-expanded="false" aria-haspopup="true">
            Industries
            <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="nav-dropdown-menu" role="menu">
            <a href="accounting-finance.html" role="menuitem">Accounting &amp; Finance</a>
            <a href="agencies-business.html" role="menuitem">Agencies &amp; Business</a>
            <a href="automotive.html" role="menuitem">Automotive</a>
            <a href="beauty-wellness.html" role="menuitem">Beauty &amp; Wellness</a>
            <a href="clinics.html" role="menuitem">Clinics &amp; Healthcare</a>
            <a href="construction.html" role="menuitem">Construction</a>
            <a href="dentists.html" role="menuitem">Dentists</a>
            <a href="education.html" role="menuitem">Education &amp; Training</a>
            <a href="events-leisure.html" role="menuitem">Events &amp; Leisure</a>
            <a href="food-beverage.html" role="menuitem">Food &amp; Beverage Suppliers</a>
            <a href="home-services.html" role="menuitem">Home Services</a>
            <a href="hotels-hospitality.html" role="menuitem">Hotels &amp; Hospitality</a>
            <a href="legal.html" role="menuitem">Legal</a>
            <a href="logistics.html" role="menuitem">Logistics</a>
            <a href="real-estate.html" role="menuitem">Real Estate</a>
            <a href="restaurants-cafes.html" role="menuitem">Restaurants &amp; Cafes</a>
          </div>
        </div>
        <a href="../bundles.html">Bundles</a>
        <a href="../membership.html">Membership</a>
        <a href="../faq.html">FAQs</a>
        <a href="../contact.html">Contact</a>
      </nav>
      <div class="nav-cta">
        <a class="btn-primary" href="../contact.html">Request Data</a>
      </div>
      <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">
        <span></span>
      </button>
    </div>
  </header>

  <div class="mobile-panel" id="mobile-nav">
    <button class="mobile-close" type="button" aria-label="Close menu">
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M5 5l10 10M15 5L5 15"></path></svg>
    </button>
    <div class="mobile-nav-links">
      <a href="../index.html">Home</a>
      <a href="../about.html">About</a>
      <button class="mobile-dropdown-toggle" type="button" aria-expanded="false">
        Industries
        <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="mobile-dropdown-panel">
        <a href="accounting-finance.html">Accounting &amp; Finance</a>
        <a href="agencies-business.html">Agencies &amp; Business</a>
        <a href="automotive.html">Automotive</a>
        <a href="beauty-wellness.html">Beauty &amp; Wellness</a>
        <a href="clinics.html">Clinics &amp; Healthcare</a>
        <a href="construction.html">Construction</a>
        <a href="dentists.html">Dentists</a>
        <a href="education.html">Education &amp; Training</a>
        <a href="events-leisure.html">Events &amp; Leisure</a>
        <a href="food-beverage.html">Food &amp; Beverage Suppliers</a>
        <a href="home-services.html">Home Services</a>
        <a href="hotels-hospitality.html">Hotels &amp; Hospitality</a>
        <a href="legal.html">Legal</a>
        <a href="logistics.html">Logistics</a>
        <a href="real-estate.html">Real Estate</a>
        <a href="restaurants-cafes.html">Restaurants &amp; Cafes</a>
      </div>
    </div>
    <div class="mobile-nav-cta">
      <a class="btn btn-primary" href="../contact.html">Request Data</a>
    </div>
  </div>

  <main>

    <!-- Breadcrumbs -->
    <div class="wrap">
      <nav class="breadcrumbs reveal" aria-label="Breadcrumb">
        <a href="../index.html">Home</a><span>&rsaquo;</span>
        <a href="../industries.html">Industries</a><span>&rsaquo;</span>
        <span>${data.name}</span>
      </nav>
    </div>

    <!-- Hero -->
    <section class="hero">
      <div class="wrap">
        <p class="eyebrow reveal">${data.name} Dataset${soon ? ' <span class="soon-pill">Coming soon</span>' : ''}</p>
        <h1 class="reveal">${seo.h1}</h1>
        <p class="hero-sub reveal">${data.heroSub}</p>
        <p class="hero-intro reveal">${seo.intro}</p>
        <div class="hero-actions reveal">
          ${soon
            ? '<a class="btn btn-primary" href="../contact.html">Request access</a>\n          <a class="btn btn-outline" href="#pricing">See pricing</a>'
            : '<a class="btn btn-primary" href="#pricing">See pricing</a>\n          <a class="btn btn-outline" href="#faqs">FAQs</a>'}
        </div>
      </div>
    </section>

    <!-- One-Time Pricing -->
    <section id="pricing">
      <div class="wrap">
        <div class="section-head">
          <p class="eyebrow">One-time purchase</p>
          <h2>Buy a single dataset</h2>
        </div>
        ${soon ? '<p class="coming-soon-note">This dataset is coming soon. Pricing below is indicative — <a class="link-inline" href="../contact.html">request access</a> and we\'ll notify you when it\'s live.</p>' : ''}
        <div class="pricing-grid reveal">
${oneTimeCardsHtml}
        </div>
      </div>
    </section>

    <hr class="section-divider">

    <!-- Monthly Pricing -->
    <section>
      <div class="wrap">
        <div class="section-head">
          <p class="eyebrow">Monthly subscription</p>
          <h2>Get fresh data every month</h2>
        </div>
        <div class="pricing-grid reveal">
${monthlyCardsHtml}
        </div>
      </div>
    </section>

    <hr class="section-divider">

    <!-- Sample Data -->
    <section id="sample-data">
      <div class="wrap">
        <div class="section-head">
          <p class="eyebrow">Sample preview</p>
          <h2>See what you get</h2>
          <p class="sample-lede">Every dataset includes verified business names, contact details, emails, phone numbers, ratings, and more — delivered as a ready-to-use CSV.</p>
        </div>
        <div class="sample-preview reveal">
          <img src="../public/sample-excel.png" alt="Sample ${data.name} dataset preview showing columns for name, owner, emails, phone, address, website, description, reviews, rating, and competitors" width="1200" height="400" loading="lazy">
        </div>
      </div>
    </section>
${comparisonHtml}
${bundlesHtml}

    <!-- Explore More Datasets -->
    <section>
      <div class="wrap">
        <div class="section-head">
          <p class="eyebrow">Explore more</p>
          <h2>More datasets to explore</h2>
        </div>
        <div class="explore-grid reveal">
${exploreIndustriesHtml}
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faqs">
      <div class="wrap faq-section">
        <div class="section-head">
          <p class="eyebrow">FAQ</p>
          <h2>Questions about this dataset</h2>
        </div>
        <div class="faq-list">
${faqsHtml}
        </div>
        <p class="faq-more">
          More questions? <a class="link-inline" href="../faq.html">See all FAQs</a> or <a class="link-inline" href="../contact.html">contact us</a>.
        </p>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="bottom-cta">
      <div class="wrap">
        <div class="reveal">
          <h2>Ready to get ${data.name.toLowerCase()} data?</h2>
          <p>${soon ? 'This dataset is coming soon. Request access and we\'ll notify you the moment it\'s live.' : 'Choose a one-time dataset or subscribe for fresh data every month.'}</p>
          <div class="bottom-cta-actions">
            ${soon
              ? '<a class="btn btn-primary" href="../contact.html">Request access</a>\n            <a class="btn btn-outline" href="../industries.html">Browse industries</a>'
              : '<a class="btn btn-primary" href="#pricing">See pricing</a>\n            <a class="btn btn-outline" href="../contact.html">Contact us</a>'}
          </div>
        </div>
      </div>
    </section>

  </main>

  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-logo">
        <img src="../public/leadspitch-footer.png" alt="LeadsPitch" onerror="this.parentElement.innerHTML='<span style=&quot;color:#fff;font-size:1.5rem;font-weight:700&quot;>LeadsPitch</span>'">
      </div>
    </div>
    <div class="wrap footer-grid">
      <div class="footer-brand"><p>Business data platform. Subscriptions, one-time purchases, and membership discounts across 16 industries.</p></div>
      <div class="footer-col"><h4>Product</h4><a href="../index.html#how-it-works">How it works</a><a href="../industries.html">Industries</a><a href="../bundles.html">Bundles</a><a href="../faq.html">FAQ</a></div>
      <div class="footer-col"><h4>Company</h4><a href="../about.html">About</a><a href="../contact.html">Contact</a><a href="../membership.html">Memberships</a><a href="../index.html#trust">Trust</a></div>
      <div class="footer-col"><h4>Legal</h4><a href="../privacy.html">Privacy Policy</a><a href="../terms.html">Terms of Service</a><a href="../refund.html">Refund Policy</a></div>
    </div>
    <div class="wrap footer-bottom">
      <span>&copy; 2026 LeadsPitch</span>
      <span>Business data, delivered your way.</span>
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

      document.querySelectorAll(".product-includes-toggle").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var list = btn.nextElementSibling;
          if (!list) return;
          var isOpen = btn.getAttribute("aria-expanded") === "true";
          btn.setAttribute("aria-expanded", isOpen ? "false" : "true");
          list.classList.toggle("open");
        });
      });

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
      document.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });
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
