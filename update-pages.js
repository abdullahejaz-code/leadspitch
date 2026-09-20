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
  const m = code.match(/plan="?([A-Za-z0-9_]+)"?/);
  return m ? m[1] : null;
}

function findMatchingCloseDiv(html, openPos) {
  let depth = 1;
  let i = openPos;
  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf('<div', i + 1);
    const nextClose = html.indexOf('</div>', i + 1);
    if (nextClose < 0) return -1;
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth++;
      i = nextOpen + 4;
    } else {
      depth--;
      if (depth === 0) return nextClose + 6;
      i = nextClose + 6;
    }
  }
  return -1;
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
  const csvPlans = csvRows.slice(1).filter(r => r[0].trim() && r[0].trim() !== 'Plan').map(r => ({
    plan: r[0].trim(),
    leads: r[1].trim(),
    price: r[2].trim(),
    badge: r[3] ? r[3].trim() : '',
    planId: extractPlanId(r[5] || r[4] || ''),
  }));

  const htmlFile = ind.html;
  let html = fs.readFileSync(htmlFile, 'utf8');

  const gridMarker = '<div class="pricing-grid reveal">';
  const gridStart = html.indexOf(gridMarker);
  if (gridStart < 0) { console.log('SKIP: ' + ind.name); continue; }

  let gridEnd = html.indexOf('</div>', gridStart + gridMarker.length);
  let depth = 1;
  let i = gridStart + gridMarker.length;
  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf('<div', i);
    const nextClose = html.indexOf('</div>', i);
    if (nextClose < 0) break;
    if (nextOpen >= 0 && nextOpen < nextClose) { depth++; i = nextOpen + 4; }
    else { depth--; if (depth === 0) { gridEnd = nextClose + 6; break; } i = nextClose + 6; }
  }

  const gridSection = html.substring(gridStart, gridEnd);

  const cards = [];
  let searchPos = 0;
  while (true) {
    const cardStart = gridSection.indexOf('<div class="product-card', searchPos);
    if (cardStart < 0) break;
    const cardEnd = findMatchingCloseDiv(gridSection, cardStart);
    if (cardEnd < 0) break;
    cards.push({ start: cardStart, end: cardEnd });
    searchPos = cardEnd;
  }

  const modifiedCards = [];
  for (let ci = 0; ci < Math.max(csvPlans.length, cards.length); ci++) {
    const csv = csvPlans[ci];
    
    if (ci < cards.length) {
      let card = gridSection.substring(cards[ci].start, cards[ci].end);
      card = card.replace(/\r?\n\s*<span class="product-badge product-badge--sale">[^<]*<\/span>/, '');
      card = card.replace(/\r?\n\s*<div class="product-member">[^<]*<\/div>/, '');
      card = card.replace(/(<h3 class="product-plan">)[^<]+(<\/h3>)/, '$1' + csv.plan + '$2');
      card = card.replace(/(<span class="product-subtitle-num">)[^<]+(<\/span>)/, '$1' + csv.leads + '$2');
      card = card.replace(/(<span class="product-price">)[^<]+(<\/span>)/, function() { return '<span class="product-price">' + csv.price + '</span>'; });
      card = card.replace(/(<span class="product-badge">)[^<]+(<\/span>)/, '$1' + csv.badge + '$2');
      modifiedCards.push(card);
    } else {
      const lastCard = modifiedCards[modifiedCards.length - 1];
      let newCard = lastCard;
      const planKey = csv.plan.toLowerCase().replace(/ /g, '-');
      newCard = newCard.replace(/(<h3 class="product-plan">)[^<]+(<\/h3>)/, '$1' + csv.plan + '$2');
      newCard = newCard.replace(/(<span class="product-badge">)[^<]+(<\/span>)/, '$1' + csv.badge + '$2');
      newCard = newCard.replace(/(<span class="product-subtitle-num">)[^<]+(<\/span>)/, '$1' + csv.leads + '$2');
      newCard = newCard.replace(/(<span class="product-price">)[^<]+(<\/span>)/, function() { return '<span class="product-price">' + csv.price + '</span>'; });
      newCard = newCard.replace(/data-plan="[^"]+"/, 'data-plan="' + planKey + '"');
      modifiedCards.push(newCard);
    }
  }

  let newGrid = '';
  if (cards.length > 0) {
    newGrid = gridSection.substring(0, cards[0].start);
    newGrid += modifiedCards.join('\n');
    newGrid += gridSection.substring(cards[cards.length - 1].end);
  } else {
    newGrid = gridSection;
  }

  let newHtml = html.substring(0, gridStart) + newGrid + html.substring(gridEnd);

  // Update JS checkout map
  for (let j = 0; j < csvPlans.length; j++) {
    const csv = csvPlans[j];
    const planKey = csv.plan.toLowerCase().replace(/ /g, '-');
    const plansVarIdx = newHtml.indexOf('var plans = {');
    if (plansVarIdx < 0) continue;
    let depth2 = 0;
    let plansEnd = -1;
    for (let k = plansVarIdx; k < newHtml.length; k++) {
      if (newHtml[k] === '{') depth2++;
      else if (newHtml[k] === '}') { depth2--; if (depth2 === 0) { plansEnd = k + 1; break; } }
    }
    if (plansEnd < 0) continue;
    const plansObj = newHtml.substring(plansVarIdx, plansEnd);
    if (!plansObj.includes("'" + planKey + "'")) {
      const jsEntry = ",\n        '" + planKey + "': { id: '" + csv.planId + "', name: '" + csv.plan + "' }";
      newHtml = newHtml.substring(0, plansEnd - 1) + jsEntry + newHtml.substring(plansEnd - 1);
    }
  }

  // Update JSON-LD
  const lowestPrice = csvPlans[0].price.replace(/[$,]/g, '');
  const highestPrice = csvPlans[csvPlans.length - 1].price.replace(/[$,]/g, '');
  newHtml = newHtml.replace(/("lowPrice"\s*:\s*")[^"]+(")/, '$1' + lowestPrice + '$2');
  newHtml = newHtml.replace(/("highPrice"\s*:\s*")[^"]+(")/, '$1' + highestPrice + '$2');

  // Write
  fs.writeFileSync(htmlFile, newHtml, 'utf8');
  
  // Verify
  const verify = fs.readFileSync(htmlFile, 'utf8');
  const writtenPrices = verify.match(/product-price">[^<]+/g);
  const expectedPrices = csvPlans.map(p => 'product-price">' + p.price);
  
  let allMatch = true;
  for (const ep of expectedPrices) {
    if (!writtenPrices || !writtenPrices.includes(ep)) {
      console.log('MISMATCH ' + ind.name + ': expected ' + ep + ' but got ' + (writtenPrices ? writtenPrices.join(', ') : 'NONE'));
      allMatch = false;
    }
  }
  if (allMatch) {
    console.log('OK: ' + ind.name + ' (' + csvPlans.length + ' plans)');
  }
}

console.log('\nDone!');
