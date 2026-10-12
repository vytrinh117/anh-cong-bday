# HẮC HẢI KÝ SỰ 2.0 — HD ART Regression QA

**Scope:** Upgrade all website scenic art after approval of C2, without starting C3 gameplay or altering any existing game logic.

**Status:** 47 / 47 Chromium browser checks passed (see `browser_results.json`).

## Pixel quality & scope
- Nine independently AI-generated scene PNGs (1672 × 941 pixels, landscape).
- Nine high-quality WebP serving assets resampled to 1920 × 1080 Full HD.
- One separately composed 900 × 1400 portrait mobile WebP for the hero.
- Source resolution is smaller than 1920 × 1080: resampling does not manufacture additional native fine detail. The 1672 × 941 original PNGs are available in the separately delivered original-artwork archive.
- Existing Bob placeholder and decorative art are SVG (resolution-independent) and retained.
- No AI image is claimed to be an actual photograph of Công, Bob, or a real location.

## Verified functionally in Chromium
- Cinematic intro: enter, skip, replay.
- Birthday letter accessible at 0/4 and closes.
- All four map anchors and quest progress sync.
- Fishing 2 fish, peanut farming 2 harvests, activation of Compute/Network/Lustre, 3 quiz answers, full 4/4 state.
- Drawing color change, mouse drawing, PNG export, clear.
- In-memory storage test: saved progress rehydrated as 4/4; reset to 0/4.
- 8 widths: 320, 375, 390, 640, 768, 1024, 1440, 1920; no horizontal overflow.
- Reduced-motion preference disables hero image animation.
- No uncaught JavaScript exceptions.
- All new art file paths exist and images decode at the documented dimensions.

## Source preservation
The six files `script.js`, `config.js`, `assets/bob-pug.svg`, `assets/coast.svg`, `assets/hero-landscape.svg`, and `assets/favicon.svg` are byte-identical to the approved C2 website. Gameplay state schema and storage key were not modified.

## Limits
The browser environment blocks loading `file://` and `localhost`/HTTP(S) navigation, so Chromium was given the actual authored HTML/CSS/JavaScript/images as inline browser content, with a test-only in-memory localStorage/sessionStorage shim. Real GitHub Pages deployment and persistence across genuine navigation were not tested; please spot-check after uploading.
This is an HD art enhancement of C2, **not** a C3 release.
