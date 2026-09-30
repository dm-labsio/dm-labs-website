# Checkpoint 22: portrait industry gallery and more compact reading

29 September 2026. Preview only on `codex/brand-refresh`.

## Changes

- Balanced the founder portraits and biographies in EN/EL/HE. The photo fills its panel height, the wider desktop composition reduces wrapping, and biography text uses a readable 16px body scale. Mobile retains the localized read-more controls.
- Corrected the industry gallery to portrait cards with square corners and no numbering. Desktop shows a compact image grid; phones use a horizontal strip of portrait cards. Each of the nine industries opens its own accessible detail panel with localized benefits and consultation link. Escape closes the panel and focus returns to the selected card. The final custom-industry card stays in the gallery.
- Preserved the approved desktop service-card layout. Below 768px the six services form one native swipe track, with localized previous/next buttons. Hebrew scroll direction follows RTL. Expanding a card preserves the original on-demand video and reduced-motion behavior. Narrow-phone Greek titles have a smaller size to keep whole words inside the cards.
- Replaced the oversized EN/EL blog indexes with one shared compact design: dark supplied background, smaller article headings, lighter metadata, concise mobile rows and immediate article search. Greek search ignores accents. Existing article titles, URLs, dates, images and metadata remain. Individual article pages and the established Hebrew blog fallback are outside this checkpoint.
- Removed the retired Blog index style layer. No new libraries or media uploads.

## Verification

TypeScript passes. All 258 tests in 44 files pass, including localized industry detail content, preserved article destinations and Greek search normalization. Full build prerenders 91 canonical routes, 11 example routes and the static 404 with zero errors. Link and em-dash checks pass.

Browser checks cover all three homepages at 320, 768 and 1440px, plus the services at 390px. No page-width overflow or remaining clipped headings in the changed sections. Verified matching founder photo/panel heights on desktop, square portrait cards, modal scrolling at 320px, Escape and focus return, and Hebrew next-card navigation and expansion. Blog checks cover English and Greek on small phones, tablets and desktop: compact heading scale, search results, empty-state recovery and an existing Greek article link. No observed browser console errors.

Physical-device and screen-reader testing remain part of the later finishing pass. Preview deployment identity and unchanged main/production checks are recorded in external checkpoint-22 QA notes.
