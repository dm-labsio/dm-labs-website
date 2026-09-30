# Checkpoint 18: interactive pricing and clearer plans

29 September 2026. Preview only on `codex/brand-refresh`. The user requested pricing UX research, a more engaging page and clearer plans. Research and design decisions are recorded in [pricing-ux-research.md](pricing-ux-research.md).

## Experience

- The hero separates the standard one-time build range from the required recurring care range. Annual billing is identified as another option.
- Three optional goals suggest Launch, Growth or Pro, with a reason and price. A suggestion is distinct from a selection. Custom requirements have their own path.
- Desktop plans are side by side with aligned bottoms and buttons, visible page/revision counts, concrete best-fit descriptions and explicit package inheritance. Narrow screens stack them. Repeated page/revision list items are represented by the facts above each list rather than duplicated.
- Direct package selections stay in place for comparison. A sticky summary provides the next action and shows build/care costs. Choosing the finder suggestion explicitly advances to care. The rail becomes static on short viewports.
- Care plans lead with their content-update allowance. Monthly and yearly pricing, equivalents and savings use the existing canonical amounts.
- A first-year budget adds the build and twelve months of selected care. Monthly and yearly modes each explain payment timing, exclusions and ongoing care. Missing choices never show a complete total. Reset clears choices, goal and billing. The consultation link preserves package, care and billing in all languages; no request or payment is submitted by selection.
- Feature comparison can show all thirteen rows or the ten differing rows. Selected columns are highlighted. Mobile comparisons and pricing FAQs start open and can be closed.
- New copy follows EN/EL/HE typography roles, with isolated Latin plan names/currency and Hebrew RTL. Navy artwork is reused, with finite CSS feedback that respects reduced motion. No media, dependencies or package prices were added or changed.
- The duplicate floating WhatsApp control is hidden on narrow pricing pages because it overlapped choices; the page's WhatsApp link remains available. Other pages retain their floating control.

## Verification

TypeScript and 246 tests in 41 files pass, including exact first-year calculations, invalid/incomplete states, comparison filtering and existing enquiry/commercial checks. Full build: 91 canonical routes, 11 demos and a static 404, no prerender errors.

Local browser checks cover all three pricing pages at 320, 768 and 1440px, with 390px interaction checks. No page overflow or clipped controls; desktop card/button bottoms align; display fonts and numerals retain their intended locale roles. All 36 build/care/billing combinations produced correct displayed totals and enquiry URLs. All nine goal recommendations, difference filtering, reset, open disclosures and three localized consultation prefills were checked without sending a form. A narrow Greek price-label overlap and the mobile floating-control overlap were fixed and visually retested. No observed browser errors.

Live Preview verification and unchanged main/production identities are recorded in external checkpoint-18 QA/deployment notes. Physical-device and screen-reader testing remain part of the later finishing pass. Homepage and service layouts remain at their previously approved checkpoints; the next service roadmap batch remains queued.
