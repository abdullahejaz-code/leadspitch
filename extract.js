const fs = require('fs');

function parseCSV(text) {
  const rows = [];
  let current = '';
  let inQuotes = false;
  let fields = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i+1] === '"') { current += '"'; i++; }
      else if (ch === '"') { inQuotes = false; }
      else { current += ch; }
    } else {
      if (ch === '"') { inQuotes = true; }
      else if (ch === ',') { fields.push(current); current = ''; }
      else if (ch === '\n' || (ch === '\r' && text[i+1] === '\n')) {
        fields.push(current); current = '';
        if (ch === '\r') i++;
        rows.push(fields); fields = [];
      } else { current += ch; }
    }
  }
  if (current || fields.length) { fields.push(current); rows.push(fields); }
  return rows.filter(r => r.length > 1 && r[0].trim());
}

function extractPlanId(code) {
  const m = code.match(/plan=([A-Za-z0-9_]+)/);
  return m ? m[1] : null;
}

const industries = [
  { csv: 'reference-data/pricings and details - Accounting & Finance.csv', html: 'industries/accounting-finance.html', name: 'Accounting & Finance' },
  { csv: 'reference-data/pricings and details - Agencies & Business Services.csv', html: 'industries/agencies-business.html', name: 'Agencies & Business' },
  { csv: 'reference-data/pricings and details - Automotive.csv', html: 'industries/automotive.html', name: 'Automotive' },
  { csv: 'reference-data/pricings and details - Beauty and Wellness.csv', html: 'industries/beauty-wellness.html', name: 'Beauty & Wellness' },
  { csv: 'reference-data/pricings and details - Clinics.csv', html: 'industries/clinics.html', name: 'Clinics' },
  { csv: 'reference-data/pricings and details - Construction & Contractors.csv', html: 'industries/construction.html', name: 'Construction' },
  { csv: 'reference-data/pricings and details - Dentist.csv', html: 'industries/dentists.html', name: 'Dentists' },
  { csv: 'reference-data/pricings and details - Education & Traning.csv', html: 'industries/education.html', name: 'Education' },
  { csv: 'reference-data/pricings and details - Events & Leisure.csv', html: 'industries/events-leisure.html', name: 'Events & Leisure' },
  { csv: 'reference-data/pricings and details - Food & Beverage.csv', html: 'industries/food-beverage.html', name: 'Food & Beverage' },
  { csv: 'reference-data/pricings and details - home services.csv', html: 'industries/home-services.html', name: 'Home Services' },
  { csv: 'reference-data/pricings and details - Hotels & Hospitality.csv', html: 'industries/hotels-hospitality.html', name: 'Hotels & Hospitality' },
  { csv: 'reference-data/pricings and details - Legal.csv', html: 'industries/legal.html', name: 'Legal' },
  { csv: 'reference-data/pricings and details - logistics.csv', html: 'industries/logistics.html', name: 'Logistics' },
  { csv: 'reference-data/pricings and details - real estate (1).csv', html: 'industries/real-estate.html', name: 'Real Estate' },
  { csv: 'reference-data/pricings and details - Restaurants and cafes.csv', html: 'industries/restaurants-cafes.html', name: 'Restaurants & Cafes' },
];

for (const ind of industries) {
  const csvText = fs.readFileSync(ind.csv, 'utf8');
  const csvRows = parseCSV(csvText);
  const csvPlans = csvRows.slice(1).map(r => ({
    plan: r[0].trim(),
    leads: r[1].trim(),
    price: r[2].trim(),
    planId: extractPlanId(r[5] || r[4] || ''),
  }));

  const html = fs.readFileSync(ind.html, 'utf8');

  // Extract JS plan map
  const jsPlanMap = {};
  const jsMatches = [...html.matchAll(/'([a-z-]+)':\s*\{\s*id:\s*'([^']+)'/g)];
  for (const m of jsMatches) { jsPlanMap[m[1]] = m[2]; }

  // Extract from grid section only
  const gridStart = html.indexOf('pricing-grid-wrap');
  const gridHtml = gridStart >= 0 ? html.substring(gridStart) : html;
  const gridPlanNames = [...gridHtml.matchAll(/class="product-plan">([^<]+)</g)].map(m => m[1].trim());
  const gridLeads = [...gridHtml.matchAll(/class="product-subtitle-num">([^<]+)</g)].map(m => m[1].trim());
  const gridPrices = [...gridHtml.matchAll(/class="product-price">([^<]+)</g)].map(m => m[1].trim());

  console.log('=== ' + ind.name + ' ===');
  console.log('CSV plans: ' + csvPlans.length + ' | HTML cards: ' + gridPlanNames.length);
  
  for (let i = 0; i < csvPlans.length; i++) {
    const csv = csvPlans[i];
    const htmlPlan = gridPlanNames[i] || 'MISSING';
    const htmlLead = gridLeads[i] || 'MISSING';
    const htmlPrice = gridPrices[i] || 'MISSING';
    const key = csv.plan.toLowerCase().replace(/ /g, '-');
    const htmlPlanId = jsPlanMap[key] || 'MISSING';
    
    const issues = [];
    if (csv.plan !== htmlPlan) issues.push('name: csv=' + csv.plan + ' html=' + htmlPlan);
    if (csv.leads.replace(/,/g,'').toLowerCase() !== htmlLead.replace(/,/g,'').toLowerCase()) issues.push('leads: csv=' + csv.leads + ' html=' + htmlLead);
    if (csv.price.replace(',','') !== htmlPrice.replace(',','')) issues.push('price: csv=' + csv.price + ' html=' + htmlPrice);
    if (csv.planId && csv.planId !== htmlPlanId) issues.push('planId: csv=' + csv.planId + ' html=' + htmlPlanId);
    
    if (issues.length) {
      console.log('  MISMATCH ' + csv.plan + ': ' + issues.join(' | '));
    } else {
      console.log('  OK ' + csv.plan);
    }
  }
  
  // Check for extra cards in HTML that are not in CSV
  if (gridPlanNames.length > csvPlans.length) {
    for (let i = csvPlans.length; i < gridPlanNames.length; i++) {
      console.log('  EXTRA in HTML: ' + gridPlanNames[i] + ' ' + gridLeads[i] + ' ' + gridPrices[i]);
    }
  }
  console.log('');
}
