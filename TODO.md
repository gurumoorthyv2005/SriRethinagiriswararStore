# Slideshow Fix — TODO

## Root Cause
On department pages, the top-level `typewriterEffect()` call references `#typewriter-line`,
which only exists on the main `index.html`. This throws a `TypeError` on department pages,
halting `script.js` before the `DOMContentLoaded` handler registers, so `initSlideshow()`
never runs. Result: no auto-play, no manual navigation, no dots/thumbnails, and the images
appear inconsistent.

## Steps
- [x] Guard the top-level `typewriterEffect()` call so it only runs when the elements exist
- [x] Guard the `typewriterEffect()` function body against missing elements
- [x] Make slideshow autoplay robust (avoid stacking intervals) so auto + manual both work

## Status
✅ All fixes applied and verified. The typewriter no longer crashes department pages, so
`initSlideshow()` now runs and both auto-play and manual navigation (prev/next, dots,
thumbnails, swipe) work correctly on every department page.
