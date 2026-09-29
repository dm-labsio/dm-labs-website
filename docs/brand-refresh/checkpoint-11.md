# Checkpoint 11 — individual services, first batch

29 September 2026. Nine routes: custom design, mobile-first and performance in EN/EL/HE. Publish only `codex/brand-refresh` to Preview.

## Result

The first three service topics now share a localized page system with navy backgrounds, open typographic sections, an explicit scope list, four process steps, native FAQ disclosures, related services and consultation links. Custom design uses a supplied monitor composition; mobile-first includes a keyboard-operable phone/tablet/desktop layout study; performance explains loading, interaction and visual stability without fabricated scores. All essential content is immediately available. No decorative generic icons, capsules, scrub effect or new animation dependency.

English and Greek retain the existing parameterized route renderer for the remaining six topics. Hebrew uses three thin wrappers around the shared implementation. All 27 service URLs remain available. Services overview and pricing layouts are unchanged in this checkpoint.

## Content, typography and assets

- Preserves brand/layout/image/type work, responsive navigation/forms/content checks and image/code/cache/delivery performance work. Package limits and separately quoted work are explicit. Custom design retains Launch/Growth/Pro scope and 2/3/4 revision rounds; a full identity or custom illustration project is additional scope.
- Removes unsupported mobile-traffic statistics, blanket device support, guaranteed Lighthouse results and unsubstantiated speed improvements. Monthly performance reviews correctly refer to Complete Care, consistent with the current pricing source.
- LCP, INP and CLS replace the retired FID wording. Lab checks are distinguished from real-visitor data; no performance or ranking guarantee. Primary references: [Web Vitals](https://web.dev/articles/vitals), [Google Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals), [mobile-first indexing](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing).
- Localized display typography follows the existing brand tokens; body copy uses Open Sans and Hebrew uses RTL/logical layout. Latin metric abbreviations remain isolated and unmirrored. Service and FAQ structured data are generated from the same localized copy as the visible page. Existing indexing policy remains in the shared SEO hook.
- Adds one 960×640 WebP derivative of supplied IMG-017, `service-design-monitor.webp`, 28,102 bytes. Reuses existing folded-glass, pearl-arc, glass-sculpture and performance background derivatives. Original artwork, Blob objects, dependencies and lockfiles are unchanged.

## Verification

- TypeScript and 186 tests in 35 files pass. New rendered-page tests cover all nine routes, core content, commercial scope, localized destinations and schema parity. Full link/build/prerender passes: 91 canonical routes, 11 demos, static 404, zero errors.
- Generated documents for all nine routes have one H1, one main landmark, the correct canonical and complete service/FAQ structured data. Main JS gzip is 554.92 KB versus 551.64 KB before this batch; the existing chunk-size warning remains a later performance concern.
- Local browser checks cover all nine pages at 320/768/1440px: no horizontal overflow or clipped text, correct direction, intended fonts and supplied images loaded. Visual review includes English custom-design desktop, Greek mobile-first phone and custom-design desktop deliverables, and Hebrew performance desktop/phone.
- All nine consultation links reach localized contact pages. Twelve pricing/process/back/related navigation checks pass. All 30 FAQs open with Enter; Space closes the first question on each page. All three layout-study views respond to Enter/Space in each language with accurate pressed state and live captions. Deliverables anchor receives focus below the sticky header. HE→EL switching preserves the service and resets the study to phone. Service schema is removed when leaving for other page families. No observed browser application errors; no enquiry submitted.
- Motion is limited to the shared finite in-view rule and a user-triggered width transition, gated by reduced-motion preference. Physical-device, screen-reader, full zoom and OS preference checks remain final gates; this checkpoint does not claim those were completed.

Live Preview verification and unchanged main/production identities are recorded externally after deployment.

## Deferred feedback and next batch

Keep package panels and their actions aligned at the bottom, consistently on Services and Pricing in every language, in the planned package-layout finishing pass. Explore the former light hero videos over dark page bodies as an undecided design option; do not restore them in this batch.

Next bounded group: SEO, security and delivery/turnaround service pages in EN/EL/HE, followed by maps, forms and social integration. The remaining homepage, contact light panels, examples/editorial/legal pages, footer, whole-site typography and final accessibility/device checks remain open.
