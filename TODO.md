# Slideshow Fix — Completed

## Root Cause 1: Slideshow not working (auto/manual)
On department pages, the top-level `typewriterEffect()` call referenced `#typewriter-line`,
which only exists on the main `index.html`. This threw a `TypeError` on department pages,
halting `script.js` before the `DOMContentLoaded` handler registered, so `initSlideshow()`
never ran. Result: no auto-play, no manual navigation, no dots/thumbnails, and the images
appeared inconsistent.

**Fix (script.js):**
- Guarded `typewriterEffect()` so it only runs when `#typewriter-line` exists (main page only).
- Added a null-guard inside the function body for safety.

## Root Cause 2: Images differ / "Image unavailable"
17 Unsplash URLs and several Pexels URLs returned HTTP 404 (broken), causing the graceful
fallback SVG "Image unavailable" placeholder to appear.

**Fix (all 9 department HTML files):**
- Replaced all broken (404) slide image URLs with verified working Pexels URLs (HTTP 200 confirmed).
- Verified all 53 unique image URLs across all department pages return HTTP 200.

## Result
✅ Every department slideshow now initializes correctly with auto-play, manual prev/next,
   dots, thumbnails, swipe, counter, and lightbox.
✅ All images load correctly on every department page (0 broken images).

## Branch
- Branch: `blackboxai/fix-department-slideshow` (pushed to origin)
- Local preview: `python -m http.server 8000` → http://localhost:8000
