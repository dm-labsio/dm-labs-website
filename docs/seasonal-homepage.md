# Seasonal layer and October offer

Seasonal work on `codex/seasonal-halloween`, originally based on main `14a6c28`.

On 9 October, the owner approved merging this work to main. The branch was integrated with main `5eccb2c`, preserving the newer gallery presentation, tighter homepage spacing, AWAY and Sunday Boat demos. Historical performance comparisons below use `14a6c28`; release checks compare against a fresh build of `5eccb2c`.

Integration checks: TypeScript and link integrity pass; 97 canonical pages and 9 demos prerender successfully with zero SEO audit issues. EN/EL/HE titles, descriptions, H1s and canonical URLs match current main. The full test suite has 302 passing tests and the same 11 failures reproduced on current main (293 passing), with no new failures.

## Individual cutouts, 9 October 2026

Generation mode: built-in image generation, three separate edits with transparent backgrounds. Reference: the approved `glass-pumpkins-560.webp` cluster documented below. The original cluster files remain as references; the homepage now displays only the three separate cutouts below. cwebp resized each to 320 × 320 at quality 82, retaining alpha. No new dependency. Bats, spiders and webs remain code-native SVG decorations.

### amber-pumpkin

Saved path: `client/public/media/seasonal/halloween-2026/amber-pumpkin-320.webp`

Exact prompt:

> Use case: background-extraction. Asset type: individual transparent website ornament. Input image: reference/edit target, the approved Halloween glass cluster. Extract and regenerate ONLY the large amber glass jack-o-lantern: rounded ribbed glass, curly amber stem, warm lit triangular eyes and smiling carved face. Remove the violet pumpkin and ghost completely. Reconstruct any obscured part of the amber pumpkin naturally. Keep its recognizable design, glass material, lilac rim highlights, angle and premium 3D render style. Single object centered in a square frame, entire silhouette including stem/arms visible with about 12% clear padding. Genuine transparent alpha background, no floor, no shadow plane, no backdrop, no text, no watermark, no extra objects. This will be displayed at 70–150 CSS pixels on a dark navy website.

### violet-pumpkin

Saved path: `client/public/media/seasonal/halloween-2026/violet-pumpkin-320.webp`

Exact prompt:

> Use case: background-extraction. Asset type: individual transparent website ornament. Input image: reference/edit target, the approved Halloween glass cluster. Extract and regenerate ONLY the smaller midnight-violet glass pumpkin with its curled stem and glossy fluted ribs. No carved face. Remove the amber pumpkin and ghost completely. Reconstruct the full hidden silhouette naturally. Keep its recognizable design, glass material, lilac rim highlights, angle and premium 3D render style. Single object centered in a square frame, entire silhouette including stem/arms visible with about 12% clear padding. Genuine transparent alpha background, no floor, no shadow plane, no backdrop, no text, no watermark, no extra objects. This will be displayed at 70–150 CSS pixels on a dark navy website.

### glass-ghost

Saved path: `client/public/media/seasonal/halloween-2026/glass-ghost-320.webp`

Exact prompt:

> Use case: background-extraction. Asset type: individual transparent website ornament. Input image: reference/edit target, the approved Halloween glass cluster. Extract and regenerate ONLY the friendly frosted pearlescent glass ghost with two dark oval eyes and little flowing outstretched arms. Remove both pumpkins completely. Reconstruct its complete floating silhouette naturally. Keep its recognizable design, glass material, lilac rim highlights, angle and premium 3D render style. Single object centered in a square frame, entire silhouette including stem/arms visible with about 12% clear padding. Genuine transparent alpha background, no floor, no shadow plane, no backdrop, no text, no watermark, no extra objects. This will be displayed at 70–150 CSS pixels on a dark navy website.

## Controls

### Larger Halloween banner and reel pack, 9 October 2026

Build QA exposed a race between the two seasonal entry points loading the same lazy CSS. They now share one module-import promise (including failures for that page load) before mounting either layer. The new `qa-seasonal-banner.mjs` deliberately holds the stylesheet: all 15 EN/EL/HE × 1440/1024/768/390/320 combinations show zero added banner-load layout shift, stable heading position, clear controls and no overlap. Existing initial locale/font shifts are reported separately, not attributed to the banner. TypeScript, the build and 12 focused tests pass; the full suite has 301 passes and the same 12 baseline failures.

The banner now has a large greeting, highlighted 10% offer, orange contact button, friendly glass skeleton and stylized red dripping edge. Offer wording, dates and monthly exclusion are unchanged in all three languages. The skeleton is a 19,302-byte transparent 320px WebP; no new animation dependency or continuous motion.

A tiny inline head script is generated by Vite from the existing campaign configuration. It reserves the larger banner's space before first paint only when the campaign/banner is enabled, in date, and not previously dismissed. It skips static snapshots. The regular permanent CSS contains the conditional spacing, so optional chunk loading cannot move the headline. Dismissal retains the current page's space to avoid a jump; a dismissed reload or out-of-date page uses the original spacing. No new large year-round gap is added. The platform-independence test now explicitly permits only this named head hook while retaining its old debug/auth/database runtime guards.

The local reel asset pack is saved outside the deployment under `../deliverables/DM-Labs-Halloween-Assets-2026-10-09.zip`. It contains five original 1254×1254 RGBA PNGs (amber pumpkin, violet pumpkin, ghost, skeleton and original cluster), six website WebPs, five reusable SVG ornaments, five transparent PNG exports of those vectors, README and exact prompts. ZIP integrity checked. These are static assets, not a rendered reel. No customer photos, unrelated artwork, credentials or fonts are included.

Skeleton generation mode: built-in image generation using the approved ghost as a style reference. Website path: `client/public/media/seasonal/halloween-2026/glass-skeleton-320.webp`. High-resolution original preserved in the ZIP's `original-png/glass-skeleton.png`.

Exact skeleton prompt:

> Use case: stylized-concept. Asset type: transparent character cutout for a premium Halloween website banner and social reel. Input image 1 is STYLE REFERENCE ONLY: match the approved ghost's pearlescent glass, warm amber and lavender reflections and friendly sculptural 3D finish. Create one adorable miniature full-body skeleton, oversized round ivory-glass skull, big friendly dark eye sockets, tiny smiling teeth, simplified rounded ribcage and little jointed arms and legs. One hand raised in a cheerful wave. Entire skeleton visible, centered square composition with 10% clear padding. Polished frosted ivory glass with lilac rim lighting and amber highlights. Cute, charming, clearly Halloween, not frightening, no wounds, no gore. Genuine transparent alpha background, no floor, no shadow plane, no text, no watermark, no extra characters or props. Clear silhouette at small website display size, high-resolution detail for reuse in a reel.

Edit `client/src/components/home/seasonal/seasonalConfig.ts` and deploy a reviewed preview.

- `enabled: false`: master off switch. No decoration chunk, stylesheet or artwork is requested.
- `startsAt` / `endsAt`: absolute dates with timezone offsets. The end is exclusive. This campaign runs 9 October through 31 October 2026, ending at midnight on 1 November in the owner's timezone. It does not recur next year.
- `banner`, `artwork`, `webs`: independently disable each element.
- `sitewideBats`: subtle bats on the main marketing site's pages, including pricing. Standalone `/preview/` demos are deliberately untouched.
- `photoOrnament: "webs"`: static corner webs on the two homepage team portraits. Set to `null` to disable independently. The reusable `.seasonal-photo-ornament` overlay slot can hold a Christmas hat in a future Christmas theme; no Christmas campaign or hat is activated now. Photos, crops, names and biographies remain unchanged. These inline SVG overlays add no image requests or animation, stay out of the face area, and share seasonal expiry/dismissal.
- `particles`: enable/disable, mobile and desktop counts, bat/ghost counts, duration, and once-per-session behavior. The renderer caps particles at 24 and the sequence at 4.5 seconds.
- `scrollMotion`: enable/disable short ornament entrances, with a configurable duration capped at 4.5 seconds. Each section plays once per route per session, then stays still. Alternate sections have a small descending spider or bat flight, confined to the edge ornament's space.
- A future theme needs a new decorative module/artwork, not a rewrite of homepage text or structure.

Only `/`, `/el/` and `/he/` show the Halloween banner and pumpkin/ghost/web decorations. Individual amber pumpkins, violet pumpkins and glass ghosts alternate in existing section gutters. English and Greek have eight decorated sections after the hero, giving three of each image overall; Hebrew has seven because it has no client-stories section, with counts differing by at most one. Ornaments alternate left and right. Bats remain visible at the viewport edges on main-site pages while visitors scroll, with one short flight per route per session. No country targeting, permanent headings, metadata, pricing data or schema changed. The banner links to the existing localized contact page.

## Tom's October 2026 offer: apply manually when quoting

Owner-approved on 9 October 2026: **10% off the one-time website build price for people who contact DM Labs during October 2026.** This is based on the enquiry month, not an invented booking or payment deadline. **Monthly hosting/maintenance fees are excluded and remain unchanged.**

Remember to apply this reduction to the one-time build amount when discussing/quoting eligible October leads. There is no automatic checkout discount, no change to package prices, and no discount announcement on pricing pages. The offer is advertised only in the homepage banner, in English, Greek and Hebrew, with the monthly exclusion visible. The configuration records `oneTimePercent: 10`, `monthlyPercent: 0`, `enquiryMonth: "2026-10"` as an internal reminder; the banner copy must stay consistent with those facts. Do not extend this offer to another month without approval.

## Runtime and accessibility

The permanent page renders normally without JavaScript. The optional module loads after window load and an idle opportunity. It fails silently if unavailable. Decorations never receive pointer events; the small banner has an accessible close button. Closing restores focus to the main consultation link and stores only a session dismissal preference. The short sequence also remembers that it played for the session. Storage denial does not break rendering.

Reduced motion and Save-Data disable the sequence. Scrolling the hero out of view or hiding the document stops it. Expiry is checked on page entry, visibility changes and once per minute while mounted. An already-open tab can retain the static decoration for up to one minute after expiry; a new visit after expiry never loads the module.

The sitewide bats have their own bounded flight and then settle into still silhouettes; hidden tabs and reduced motion stop it. Section animation starts when its small edge scene enters the viewport, not when the whole section appears. Leaving the viewport, hiding the tab or enabling reduced motion cancels it. Save-Data prevents it. Dismissing the homepage banner also dismisses section ornaments and sitewide bats for that session. No extra images are requested on non-home pages. Section ornaments reuse three transparent 320px cutouts with lazy loading and low fetch priority. Their combined size is 56,568 bytes. The permanent hero CSS reserves slightly more breathing room above the text on tablet/mobile so the longer offer cannot shift content as it loads or closes. This space remains when the seasonal layer is disabled.

Prerender sets `window.__DM_STATIC_SNAPSHOT__` in its own browser. This prevents decorations and their dynamic stylesheet from being frozen into cached HTML; the runtime rechecks the schedule. This is not user-agent/bot detection. Normal users and crawlers get the same permanent homepage and the same public runtime logic.

## Artwork provenance

Created with the built-in image-generation tool, then resized/compressed with cwebp, preserving alpha. No outside stock media or added animation dependency.

Assets:
- `client/public/media/seasonal/halloween-2026/glass-pumpkins-560.webp`
- `client/public/media/seasonal/halloween-2026/glass-pumpkins-280.webp`

Final generation prompt:

> Use case: stylized-concept. Asset type: transparent decorative cutout for a premium dark navy web-design studio homepage. Create one elegant compact three-dimensional still-life: a large smoky amber glass jack-o-lantern, a smaller midnight-violet glass pumpkin tucked beside it, and a small friendly translucent frosted-glass ghost floating slightly above the smaller pumpkin. Sophisticated studio product render, sculptural ribbed glass, controlled internal warm amber glow through a subtle carved pumpkin face, pale lilac rim reflections, glass ghost with two tiny dark oval eyes, no horror. Composition square, entire cluster centered, generous transparent margins, all silhouettes fully visible, mostly occupying lower two-thirds, ghost upper right, large pumpkin lower left. Designed to complement dark navy #101729 and lavender #A8B8FF. Real transparent alpha background, no floor, no scenery, no hard rectangular backdrop, no text, no logo, no watermark, no bats or spider webs (those are separate code animations).

## Repeatable verification

- `npm run check`
- `npm exec vitest -- run server/seasonalHome.test.ts server/homeHero.test.ts`
- `npm run build` (97 canonical pages, 7 previews)
- `node scripts/qa-seasonal-home.mjs PREVIEW_URL OUTPUT_FOLDER`
- `node scripts/qa-seasonal-banner.mjs PREVIEW_URL OUTPUT_FOLDER` (built preview; deliberately delays the shared seasonal stylesheet)
- `node scripts/qa-seasonal-scroll.mjs PREVIEW_URL OUTPUT_FOLDER`
- `node scripts/qa-seasonal-performance.mjs BASELINE_PUBLIC_FOLDER CANDIDATE_PUBLIC_FOLDER OUTPUT_FOLDER`

Keep build folders immutable during performance tests. The performance script runs three paired cold-cache samples per device with identical local gzip servers: desktop 10 Mbps / 40 ms / 1x CPU, mobile 1.6 Mbps / 150 ms / 4x CPU. Reports LCP, cumulative layout shifts, long-task blocking and total transferred bytes. These are controlled lab comparisons, not field Core Web Vitals or a universal speed guarantee. Unrelated remote integrations are blocked identically, and analytics consent is denied in both variants.

## Existing main-branch test debt

A clean `git archive 14a6c28` baseline has 292 passing / 12 failing tests. This branch initially has 297 passing / the same 12 failures (five new seasonal tests; no new failing test names). The existing failures concern stale page/media counts, old blog dates, demo SEO/copy assertions, country-name guards and punctuation. They were not repaired or weakened as part of this scoped feature. The complete build and its SEO audit pass. Do not represent the full test suite as green or automatically release this branch.

## Measured preview checks, 9 October 2026

### Separate-cutout and scroll-motion iteration

Current local candidate: TypeScript and 11 focused tests pass. Full suite: 300 passing, the same 12 failures as clean `14a6c28`. Build/prerender: 97 canonical pages, 7 previews, zero SEO issues. All three homepage H1/title/description/canonical values match the baseline; no seasonal markup is frozen in HTML.

Homepage and photo suites pass EN/EL/HE at 1440/390/320px. New scroll checks additionally cover 1024/768px, balanced image counts, actual animation start/settle, offscreen cancellation, session non-replay, reduced motion, Save-Data, image loading, pointer transparency and no horizontal overflow. Compact cutouts fit existing section bottom padding without changing layout. Screenshots were inspected for readable copy and clear controls.

Three paired cold-cache lab medians against `14a6c28`, using the same conditions documented above:

| Metric | Desktop baseline / candidate | Throttled mobile baseline / candidate |
| --- | --- | --- |
| Largest contentful paint | 388 / 384 ms | 1816 / 1812 ms |
| Layout shift (unrounded) | 0.00013736 / 0.00013736 | 0.00006546 / 0.00006546 |
| Long-task blocking during observation | 14 / 9 ms | 316 / 304 ms |
| Transferred bytes | 1,242,479 / 1,295,637 | 1,310,993 / 1,364,151 |

All existing performance budgets pass. Initial transfer adds 53,158 bytes on both devices; LCP and layout shift are effectively unchanged in these samples. This is a controlled lab result, not a field-performance guarantee. Optional Halloween CSS/JS plus sitewide-bat JS total about 6.3KB gzip. No continuous animation or frame-by-frame JavaScript loop was added.

### Earlier cluster-artwork iteration

The initial complete preview (`4996145`) passed the deployed browser suite across EN/EL/HE at 1440, 390 and 320 pixels, including navigation, dismissal, reduced motion, date boundaries, blocked storage, failed optional chunk, Save-Data and offscreen cancellation. The follow-up polish only reduces the mobile ornament from 140 to 120 CSS pixels so the ghost clears the main CTA; it uses the same 280px image file.

Three-run paired lab medians against unchanged main:

| Metric | Desktop baseline / Halloween | Throttled mobile baseline / Halloween |
| --- | --- | --- |
| Largest contentful paint | 384 / 380 ms | 1824 / 1816 ms |
| Layout shift (unrounded) | 0.00013736 / 0.00013736 | 0.00006546 / 0.00006546 |
| Long-task blocking during observation | 10 / 2 ms | 324 / 380 ms |
| Transferred bytes | 1,242,479 / 1,305,505 | 1,310,993 / 1,333,729 |

Main-content loading and layout were essentially unchanged in this sample. The mobile run incurred an additional 56ms median long-task blocking under 4x CPU slowdown. This is a bounded enhancement, not a zero-cost or field-performance guarantee. The optional JS/CSS is about 3.5KB gzip; the bootstrap adds about 0.9KB gzip. The two responsive artwork files are approximately 17KB and 57KB. Pre-rendered headline, title, description and canonical match the baseline in all three languages.
