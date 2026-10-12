# HẮC HẢI KÝ SỰ 2.0 — HD Art Upgrade checkpoint

Baseline: C2 website **approved** by the user. This is an **art-only** pass, not C3.

- Replaced 6 existing cinematic images in-place: hero, world map, fishing, farming, HPC, library.
- Added 3 independently produced HD backgrounds for workshop, memories, letter. The memory interlude reuses the memory background.
- Generated a separate hero mobile composition and retained real accessible HTML for all titles, prompts and interactive controls.
- New WebP raster assets are all 1920×1080, except mobile hero 900×1400. Source AI-generated PNGs are 1672×941, so the WebPs use high-quality resampling, **not newly generated native 1920 detail**.
- Original game JavaScript and config remain unchanged.
- Bob illustration (`assets/bob-pug.svg`) and decorative SVGs are resolution-independent and remain untouched. The generated pug in scenic artwork is fictional and is not labeled as a portrait of Bob.
- ZIP root contains `index.html`; upload/extract **contents**, not nested parent folder, to GitHub Pages.

For exact files and byte counts, see `HD_ART_ASSET_MANIFEST.json`.
