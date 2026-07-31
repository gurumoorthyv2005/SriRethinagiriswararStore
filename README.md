# Sangamam Stores — Multi-Category Store Website

A static HTML/CSS/JS website for a multi-department general store (clothing, footwear,
grocery, stationery, xerox & printing, fancy items, gifts, cool drinks, and daily home
needs). Catalog-style — no cart or payment, just a clean showcase of what the store offers.

No build tools, no frameworks, no dependencies beyond Google Fonts. Just three files:
`index.html`, `style.css`, `script.js`.

## 1. Customize it

Open `index.html` and edit:

- **Store name & tagline** — search for "Sangamam" and the hero text.
- **Category content** — each department is one `<article class="tag ...">` block in the
  `#categories` section. Edit the heading, short line, and the `<li>` items.
- **About section stats** — years in business, days open, etc. (`#about`).
- **Contact details** — address, phone number, and WhatsApp number in `#visit`.
  Replace `+919999999999` in both the `tel:` and `wa.me` links with your real number.
- **Map** — the embedded map uses a plain Google Maps search URL (no API key needed).
  Replace the location in the iframe `src` with your own address,
  URL-encoded.
- **Store hours** — open `script.js` and edit `OPEN_HOUR` / `OPEN_MINUTE` /
  `CLOSE_HOUR` / `CLOSE_MINUTE` so the "Open now / Closed now" badge matches reality.

## 2. Host it free on GitHub Pages

1. Create a new GitHub repository (e.g. `store-website`).
2. Upload `index.html`, `style.css`, and `script.js` to the root of the repo.
3. Go to **Settings → Pages**.
4. Under **Source**, choose the `main` branch and `/ (root)` folder, then **Save**.
5. Wait a minute, then your site will be live at:
   `https://<your-username>.github.io/store-website/`

## 3. For your resume

You can list it as, e.g.:

> **Multi-Category Store Website** — Designed and built a responsive static website
> (HTML, CSS, JS) for a 9-department retail store, featuring a custom signage-inspired
> design system, scroll-reveal animations, and a live open/closed status indicator.
> Hosted on GitHub Pages.

Feel free to swap in your own name/description in the footer credit line in `index.html`.

## Notes

- Everything is vanilla HTML/CSS/JS — no npm install, no build step. Just open
  `index.html` in a browser to preview locally, or use a simple local server
  (e.g. the VS Code "Live Server" extension) for the best experience.
- Fully responsive down to small mobile screens, with a working hamburger menu.
- Respects `prefers-reduced-motion` and has visible keyboard focus states.
