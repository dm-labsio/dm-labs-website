# Homepage seasonal layer

Preview-only work on `codex/seasonal-halloween`, based on main `14a6c28`.

## Controls

Edit `client/src/components/home/seasonal/seasonalConfig.ts` and deploy a reviewed preview.

- `enabled: false`: master off switch. No decoration chunk, stylesheet or artwork is requested.
- `startsAt` / `endsAt`: absolute dates with timezone offsets. The end is exclusive. This campaign runs 9 October through 31 October 2026, ending at midnight on 1 November in the owner's timezone. It does not recur next year.
- `banner`, `artwork`, `webs`: independently disable each element.
- `particles`: enable/disable, mobile and desktop counts, bat/ghost counts, duration, and once-per-session behavior. The renderer caps particles at 24 and the sequence at 4.5 seconds.
- A future theme needs a new decorative module/artwork, not a rewrite of homepage text or structure.

Only `/`, `/el/` and `/he/` are eligible. No country targeting, offers, discounts, prices, claims, headings, metadata, links or schema were changed. The banner links to the existing localized contact page.

## Runtime and accessibility

The permanent page renders normally without JavaScript. The optional module loads after window load and an idle opportunity. It fails silently if unavailable. Decorations never receive pointer events; the small banner has an accessible close button. Closing restores focus to the main consultation link and stores only a session dismissal preference. The short sequence also remembers that it played for the session. Storage denial does not break rendering.

Reduced motion and Save-Data disable the sequence. Scrolling the hero out of view or hiding the document stops it. Expiry is checked on page entry, visibility changes and once per minute while mounted. An already-open tab can retain the static decoration for up to one minute after expiry; a new visit after expiry never loads the module.

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
- `node scripts/qa-seasonal-performance.mjs BASELINE_PUBLIC_FOLDER CANDIDATE_PUBLIC_FOLDER OUTPUT_FOLDER`

Keep build folders immutable during performance tests. The performance script runs three paired cold-cache samples per device with identical local gzip servers: desktop 10 Mbps / 40 ms / 1x CPU, mobile 1.6 Mbps / 150 ms / 4x CPU. Reports LCP, cumulative layout shifts, long-task blocking and total transferred bytes. These are controlled lab comparisons, not field Core Web Vitals or a universal speed guarantee. Unrelated remote integrations are blocked identically, and analytics consent is denied in both variants.

## Existing main-branch test debt

A clean `git archive 14a6c28` baseline has 292 passing / 12 failing tests. This branch initially has 297 passing / the same 12 failures (five new seasonal tests; no new failing test names). The existing failures concern stale page/media counts, old blog dates, demo SEO/copy assertions, country-name guards and punctuation. They were not repaired or weakened as part of this scoped feature. The complete build and its SEO audit pass. Do not represent the full test suite as green or automatically release this branch.

## Measured preview checks, 9 October 2026

The initial complete preview (`4996145`) passed the deployed browser suite across EN/EL/HE at 1440, 390 and 320 pixels, including navigation, dismissal, reduced motion, date boundaries, blocked storage, failed optional chunk, Save-Data and offscreen cancellation. The follow-up polish only reduces the mobile ornament from 140 to 120 CSS pixels so the ghost clears the main CTA; it uses the same 280px image file.

Three-run paired lab medians against unchanged main:

| Metric | Desktop baseline / Halloween | Throttled mobile baseline / Halloween |
| --- | --- | --- |
| Largest contentful paint | 384 / 380 ms | 1824 / 1816 ms |
| Layout shift (unrounded) | 0.00013736 / 0.00013736 | 0.00006546 / 0.00006546 |
| Long-task blocking during observation | 10 / 2 ms | 324 / 380 ms |
| Transferred bytes | 1,242,479 / 1,305,505 | 1,310,993 / 1,333,729 |

Main-content loading and layout were essentially unchanged in this sample. The mobile run incurred an additional 56ms median long-task blocking under 4x CPU slowdown. This is a bounded enhancement, not a zero-cost or field-performance guarantee. The optional JS/CSS is about 3.5KB gzip; the bootstrap adds about 0.9KB gzip. The two responsive artwork files are approximately 17KB and 57KB. Pre-rendered headline, title, description and canonical match the baseline in all three languages.
