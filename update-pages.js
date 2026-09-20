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
  const csvPlans = csvRows.slice(1).map(r => ({
    plan: r[0].trim(),
    leads: r[1].trim(),
    price: r[2].trim(),
    badge: r[3] ? r[3].trim() : '',
    planId: extractPlanId(r[5] || r[4] || ''),
  }));

  const html = fs.readFileSync(ind.html, 'utf8');

  // Find the grid section boundaries
  const gridMarker = '<div class="pricing-grid reveal">';
  const gridStart = html.indexOf(gridMarker);
  if (gridStart < 0) { console.log('SKIP: ' + ind.name); continue; }

  // Find grid end - the closing of pricing-grid-wrap
  let gridEnd = html.indexOf('</div>', gridStart + gridMarker.length);
  // Walk out of the grid div
  let depth = 1;
  let i = gridStart + gridMarker.length;
  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf('<div', i);
    const nextClose = html.indexOf('</div>', i);
    if (nextClose < 0) break;
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth++;
      i = nextOpen + 4;
    } else {
      depth--;
      if (depth === 0) { gridEnd = nextClose + 6; break; }
      i = nextClose + 6;
    }
  }

  // Extract the grid section
  const gridSection = html.substring(gridStart, gridEnd);

  // Find all card positions within the grid section
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

  // Process each card - modify independently
  const modifiedCards = [];
  for (let i = 0; i < Math.max(csvPlans.length, cards.length); i++) {
    const csv = csvPlans[i];
    
    if (i < cards.length) {
      // Modify existing card
      let card = gridSection.substring(cards[i].start, cards[i].end);

      // Remove sale badge
      card = card.replace(/\r?\n\s*<span class="product-badge product-badge--sale">[^<]*<\/span>/, '');

      // Remove membership
      card = card.replace(/\r?\n\s*<div class="product-member">[^<]*<\/div>/, '');

      // Update plan name
      card = card.replace(/(<h3 class="product-plan">)[^<]+(<\/h3>)/, '$1' + csv.plan + '$2');

      // Update leads
      card = card.replace(
        /(<span class="product-subtitle-num">)[^<]+(<\/span>)/,
        '$1' + csv.leads + '$2'
      );

      // Update price - use function to avoid $ in price being treated as backreference
      card = card.replace(
        /(<span class="product-price">)[^<]+(<\/span>)/,
        function() { return '<span class="product-price">' + csv.price + '</span>'; }
      );

      // Update badge
      card = card.replace(
        /(<span class="product-badge">)[^<]+(<\/span>)/,
        '$1' + csv.badge + '$2'
      );

      modifiedCards.push(card);
    } else {
      // Clone last existing card for the missing plan
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

  // Rebuild grid section from before first card + modified cards + after last card
  let newGrid = '';
  if (cards.length > 0) {
    newGrid = gridSection.substring(0, cards[0].start);
    newGrid += modifiedCards.join('\n');
    newGrid += gridSection.substring(cards[cards.length - 1].end);
  } else {
    newGrid = gridSection;
  }

  // Reassemble full HTML
  let newHtml = html.substring(0, gridStart) + newGrid + html.substring(gridEnd);

  // Update JS checkout map - add any plan not already present
  for (let i = 0; i < csvPlans.length; i++) {
    const csv = csvPlans[i];
    const planKey = csv.plan.toLowerCase().replace(/ /g, '-');
    
    // Check if this plan already exists in the JS map
    const plansVarIdx = newHtml.indexOf('var plans = {');
    if (plansVarIdx < 0) continue;
    
    // Find the closing } of the plans object by tracking depth
    let depth = 0;
    let plansEnd = -1;
    for (let j = plansVarIdx; j < newHtml.length; j++) {
      if (newHtml[j] === '{') depth++;
      else if (newHtml[j] === '}') {
        depth--;
        if (depth === 0) { plansEnd = j + 1; break; }
      }
    }
    if (plansEnd < 0) continue;
    
    const plansObj = newHtml.substring(plansVarIdx, plansEnd);
    if (!plansObj.includes("'" + planKey + "'")) {
      // Insert before the closing }
      const jsEntry = ",\n        '" + planKey + "': { id: '" + csv.planId + "', name: '" + csv.plan + "' }";
      newHtml = newHtml.substring(0, plansEnd - 1) + jsEntry + newHtml.substring(plansEnd - 1);
    }
  }

  // Update JSON-LD AggregateOffer lowPrice/highPrice
  const lowestPrice = csvPlans[0].price.replace(/[$,]/g, '');
  const highestPrice = csvPlans[csvPlans.length - 1].price.replace(/[$,]/g, '');
  newHtml = newHtml.replace(/("lowPrice"\s*:\s*")[^"]+(")/, '$1' + lowestPrice + '$2');
  newHtml = newHtml.replace(/("highPrice"\s*:\s*")[^"]+(")/, '$1' + highestPrice + '$2');

  fs.writeFileSync(ind.html, newHtml, 'utf8');
  console.log('Updated: ' + ind.name + ' (' + csvPlans.length + ' CSV plans, ' + cards.length + ' existing cards)');
}

console.log('\nDone!');
