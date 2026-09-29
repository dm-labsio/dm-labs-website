# Checkpoint 10 — services and process, in three languages

29 September 2026. Bounded to the EN/EL/HE services overview and process pages. Publish only the existing `codex/brand-refresh` branch to Preview.

## Result

Six duplicated page implementations now use shared localized ServicesPage and ProcessPage components. Navy surfaces continue through all page sections. Services uses supplied glass backgrounds, staggered package panels, a tablet illustration and open typographic capability links. Process uses five numbered chapters, a sticky desktop introduction, a design interlude and a timing comparison. All copy is visible without waiting for motion; only decorative divider lines draw once for 1.2 seconds when they enter view. CSS restricts this motion to no-preference; native scrolling and anchor focus remain intact.

Removed the generic decorative pictograms, capsules, pale panels, obsolete scoped CSS and protected light hero videos from these six page bodies. Shared footer decoration, service-detail pages and other page families are separate work. Functional arrows, navigation, accessibility and WhatsApp controls remain.

Uses IMG-041/042 as distinct right/left compositions, IMG-044 on phones and IMG-021 as language-neutral abstract design art. Original assets are neither mirrored nor recolored. Four WebP derivatives total 127,792 bytes; the process/closing sections reuse existing IMG-055 artwork. No master file, Blob object, library or lockfile change.

## Content and typography

- Build prices, package features, custom capabilities and care features come from the existing shared pricing source. The ongoing-care qualifier appears beside every package price. Care is required while DM Labs manages the site, matching the approved pricing and FAQ; the retired “optional” wording is removed.
- The capabilities section explicitly distinguishes available services from features included in a chosen package. All nine detail routes and existing feature anchors survive in every language.
- Process preserves five stages and the 5–7 / 7–10 / 10–14 estimates, qualified as business days after payment/content readiness. Full payment before standard builds, design approval, 2/3/4 revision rounds and separately quoted extra scope align with existing FAQ/terms. No new commercial policy or guaranteed outcome.
- Consultation CTAs consistently reach the localized contact page. Hebrew no longer bypasses the consultation journey through a mislabeled button; the shared WhatsApp entry remains available.
- Localized display faces retain the canonical typography system; plan names use Fira Mono 400 and all price/timing numerals use Rubik 800. Hebrew uses logical spacing and isolated Latin names/numbers. Existing route SEO/indexing policy is preserved; process descriptions now qualify the timeline and the Greek services title is corrected.

## Verification

- TypeScript, 167 tests across 34 files, link integrity and full build/prerender pass: 91 canonical routes, 11 demos and static 404, zero errors. Obsolete layout-literal tests are replaced with rendered multilingual scope, direction, anchor, price, chapter and destination checks.
- Main bundle: 551.64 KB gzip in local Vite output, down from 556.08 KB. The existing large-chunk warning remains; this is not a full performance certification.
- Local browser checks for all six pages at actual 320/768/1440px: no page/text overflow, one H1, intended fonts loaded, images loaded and unmirrored. Visual review covered EN desktop hero/packages/capabilities/timing, Greek phone hero/tablet packages and Hebrew desktop process/phone prices. Mobile nav contrast and tablet package placement were refined during QA.
- 50 local destination clicks pass, including all 27 service-detail links and localized consultation/pricing/FAQ/terms journeys. Care disclosures open with Enter in all three languages. EN → HE → EL switching retains the process route and applies the correct direction/typeface. Anchor navigation focuses the target and the shared header stays sticky. No observed application console errors; no enquiry sent.
- Six generated route documents contain a complete page, one H1 and one main landmark. Decorative motion is CSS-gated and finite; OS reduced-motion emulation, physical devices, full zoom and screen-reader checks remain final validation gates.

Live Preview verification and unchanged main/production identities are recorded externally in `Preview-Deployment.md` and `checkpoint-10-qa.json` after deployment.

## Next bounded phase

Continue into service-detail pages, beginning with custom design, mobile-first and performance in EN/EL/HE. Preserve all nine service topics and their existing URLs across subsequent batches. The rest of the homepage, contact light panels, examples/editorial/legal pages, shared footer decoration, full-site multilingual finishing and final device/accessibility gates remain open. Do not describe the entire refresh as complete.
