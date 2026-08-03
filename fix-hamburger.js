const fs = require('fs');
const path = require('path');

const root = path.join(__dirname);

const files = [
  'about.html', 'bundles.html', 'contact.html', 'faq.html',
  'industries.html', 'membership.html', 'privacy.html',
  'refund.html', 'terms.html',
  'industries/accounting-finance.html', 'industries/agencies-business.html',
  'industries/automotive.html', 'industries/beauty-wellness.html',
  'industries/clinics.html', 'industries/construction.html',
  'industries/dentists.html', 'industries/education.html',
  'industries/events-leisure.html', 'industries/food-beverage.html',
  'industries/home-services.html', 'industries/hotels-hospitality.html',
  'industries/legal.html', 'industries/logistics.html',
  'industries/real-estate.html', 'industries/restaurants-cafes.html'
];

files.forEach(file => {
  const filePath = path.join(root, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${file} - not found`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Add .nav-right wrapper CSS if not present
  if (!content.includes('.nav-right')) {
    const navCtaPattern = /\.nav-cta\s*\{\s*display:\s*none;\s*\}/;
    if (navCtaPattern.test(content)) {
      content = content.replace(navCtaPattern, 
        '.nav-right {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      justify-self: end;\n    }\n    .nav-cta { display: none; }');
      changed = true;
      console.log(`Added .nav-right CSS in ${file}`);
    }
  }

  // Fix HTML structure: wrap nav-cta and nav-toggle in .nav-right
  // Pattern: <div class="nav-cta">...</div>\n      <button class="nav-toggle"...
  const htmlPattern = /(<div class="nav-cta">[\s\S]*?<\/div>)\s*(<button class="nav-toggle"[\s\S]*?<\/button>)/;
  if (htmlPattern.test(content) && !content.includes('nav-right')) {
    content = content.replace(htmlPattern, '<div class="nav-right">\n      $1\n      $2\n    </div>');
    changed = true;
    console.log(`Wrapped nav-cta and nav-toggle in .nav-right in ${file}`);
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Saved ${file}`);
  } else {
    console.log(`No changes for ${file}`);
  }
});

console.log('Done!');
