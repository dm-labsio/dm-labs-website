# Checkpoint 14 — revise the service foundations

29 September 2026. User feedback replaces checkpoint 13’s visual direction: the three pages felt repetitive, the selectors barely changed the artwork, the same SEO tile appeared twice, and scope/questions were unnecessarily closed. This revision stays on `codex/brand-refresh`, Preview only.

## Requested changes

- SEO, security and delivery now each have one numbered card selector. Every selection replaces the illustration and its content, rather than highlighting the same diagram. Security changes between a connection diagram, a care board and recovery copies. SEO changes between a search result, page content and site structure. Delivery changes between a preparation brief, working preview with feedback, and launch checks.
- Replaced the second interactive artwork with three distinct reading compositions: ruled SEO text, security explanations over supplied dark glass art, and a delivery spread using the supplied design-review image. All these explanations are visible. There is no duplicate hero demonstration.
- Removed the SEO architecture tiles, the “Room to live” text and the separate “Your idea / Your website / A useful answer / A stronger starting point” interlude. Section headings are simpler. Removed the other English room/rooms metaphors from website source and corresponding refreshed multilingual phrases. The remaining older Greek/Hebrew space and room metaphors were also removed from shared demo and service copy after a publishing check caught them. The larger copy rewrite remains deferred, as requested.
- Scope and FAQs start open and remain closable with native controls. This applies consistently to all six refreshed service topics, 18 routes. Removed the repeated four-step process section and its unused content from those routes. A localized link to the full Process page remains in the scope section. The standalone Process page is retained.

## Motion, typography and scope

Cards use a short 350 ms Anime.js entrance with a small horizontal shift and fade. Stable card height avoids page movement when changing selections. No replay of the old layered-board bounce, looping, autoplay carousel or scroll scrubbing. Existing cleanup, reduced-motion and optional-engine fallback remain in place; reduced-motion CSS also explicitly covers the new cards.

English/Hebrew Rubik, Greek M PLUS Rounded 1c and shared Open Sans roles are preserved. Hebrew content follows RTL; source art remains unmirrored. Greek security cards have additional vertical allowance for translated text. Phone preparation sheets become readable rows rather than breaking long words into narrow columns.

No dependencies, media files, prices, package entitlements, forms, production configuration or Blob objects changed. Scope/FAQ schema continues to use the same content source. Care and delivery qualifications from checkpoint 13 remain intact.

## Verification

218 tests in 36 files pass. Updated shared-render coverage checks all 18 service routes for default-open details, preserved scope/FAQ content, localized links and absence of the repeated process block. New checks confirm that each selected scene replaces its content, and SEO has neither old architecture tiles nor the duplicate image break. Existing seven motion lifecycle tests remain passing.

Browser checks cover the nine redesigned routes at 320/768/1440px, all 27 card selections by keyboard, and close/reopen behavior for native disclosures. Card geometry checks verify unique scene content and stable height; two Greek clipping issues were corrected and rechecked. All nine earlier service routes were also checked on narrow screens for the shared changes. No console errors or horizontal page overflow. Visual review includes all three security states, Hebrew SEO structure and the corrected Greek preparation layout. Physical-device and screen-reader checks remain later finishing tasks.

TypeScript and the full build pass: 91 canonical routes, 11 demos and static 404, zero errors. Generated HTML checks cover all 18 refreshed service routes, including default-open details, one H1/main, canonical URL and removal of the process block. Main JavaScript is about 556.6 KB gzip (559.39 KB previously); the optional animation chunk remains 15.25 KB. No media payload added.

Live Preview checks and unchanged main/production identities are recorded in the external checkpoint-14 QA and deployment log. The next service batch remains queued while the user reviews these revisions.
