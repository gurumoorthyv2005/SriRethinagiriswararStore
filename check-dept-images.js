const fs = require('fs');
const https = require('https');
const http = require('http');

const files = [
  'clothing.html','grocery.html','xerox-printing.html','gifts.html','footwear.html',
'stationery.html','cool-drinks.html','daily-home-needs.html','fancy-items.html'
];

function checkUrl(url) {
  return new Promise((resolve) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { timeout: 15000 }, (res) => {
      res.resume();
      resolve({ url, status: res.statusCode });
    });
    req.on('error', () => resolve({ url, status: 'ERR' }));
    req.on('timeout', () => { req.destroy(); resolve({ url, status: 'TIMEOUT' }); });
  });
}

(async () => {
  const all = [];
  for (const f of files) {
    const html = fs.readFileSync(f, 'utf8');
    const imgs = [...html.matchAll(/<img src="([^"]+)"/g)].map(m => m[1]);
    for (const src of imgs) all.push({ file: f, src });
  }
  console.log('Total images:', all.length);
  const results = [];
  // Check a subset (first pass) to keep it quick
  for (const item of all) {
    const r = await checkUrl(item.src);
    results.push({ file: item.file, status: r.status, url: item.src });
    console.log(`${item.file} | ${r.status} | ${item.src.slice(0, 90)}`);
  }
  fs.writeFileSync('image-check-results.json', JSON.stringify(results, null, 2));
})().catch(e => console.error(e));
