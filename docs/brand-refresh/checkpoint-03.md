# Checkpoint 03 — multilingual typography

28 September 2026. Branch: `codex/brand-refresh`. Preview only.

## Implemented system

`client/src/styles/typography.css` owns marketing typography, scoped through Layout's `data-brand` root. Existing conflicting font rules have been removed from page styles. New pages that use Layout inherit these roles automatically.

| Role | English | Greek | Hebrew | Weight |
| --- | --- | --- | --- | --- |
| Page title | Rubik | M PLUS Rounded 1c | Rubik | 900 |
| Section/card title | Rubik | M PLUS Rounded 1c | Rubik | 800 |
| Body | Open Sans | Open Sans | Open Sans | 400 |
| UI/emphasis | Open Sans | Open Sans | Open Sans | 700 |
| Microcopy | Fira Mono | Fira Mono | Open Sans | 400 |

Five licensed WOFF2 files total 255,620 bytes. The manifest records file hashes and verified script samples; licenses accompany the files. Google Fonts requests are removed from the marketing document. Fira Mono is not used for Hebrew glyphs. Latin step numbers are explicitly isolated left-to-right. Demo documents keep their independent styles.

Font proportions are preserved: the JavaScript fitted-line component and legacy width/weight-axis overrides are retired. The English homepage has one visible semantic headline. Body copy uses 18px with 1.55 leading in English/Greek and 1.7 in Hebrew; Hebrew tracking is zero. Buttons can wrap and grow with their labels. Navigation switches to its scrollable menu below 1440px so translated links retain a readable size.

URL language/direction is applied before first paint and synchronized before client navigation paints. A stored language preference cannot override the page being visited.

## Deliberate responsive decisions

- Standard page titles use 48–120px, with a smaller long-form article scale. Greek titles use 32–48px below 600px because wider Greek glyphs otherwise split words on narrow phones. Greek homepage titles top out at 80px; the English homepage tops out at 96px. These are sizing exceptions, not compressed or stretched fonts.
- Headline spans can wrap; an old Hebrew non-wrapping span caused overflow at 320px and is now allowed to wrap.
- The existing static mobile hero grows to fit translated text and CTAs. The desktop scrub remains for the separate hero replacement checkpoint.
- The homepage headline accent uses the approved Deep Cobalt on its light background to remain readable.

## Verification

- TypeScript and whitespace checks pass.
- 142 regression tests across 29 files pass, including font-file integrity/licenses and route language initialization. Tests asserting retired font styles were replaced; existing content/routing checks remain.
- Link integrity: 156 source files, zero issues.
- Full build: 91 canonical pages, 11 demo routes and static 404 prerender successfully; zero errors. Existing bundle-size warning remains.
- Browser computed-style audit on all 91 routes at 320px and 1440px: intended heading families/weights and loaded display fonts. Final 320px audit: no heading or page horizontal overflow.
- Additional 768px checks: home, process, pricing and contact in all three languages, with no heading/page overflow. Visual checks include Greek desktop/mobile headlines, Hebrew service headings, English homepage, Greek FAQ at 375px and the scrollable menu at 320px. A long Greek answer fits its current expansion area at 320px.
- No customer form submitted. No production configuration or asset path changed.

This verifies the typography foundation, not a finished visual review of every page or every state. Complete browser zoom/accessibility, motion, interaction-state and page-by-page copy reviews remain in their respective packages. The next visual checkpoint replaces the homepage scrub with the planned responsive hero. Button art direction, broader palette/layout migration, shell/logo and remaining decorative icon cleanup also remain open.
