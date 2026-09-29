# Checkpoint 19: pricing as a guided choice

29 September 2026. Preview only on `codex/brand-refresh`.

The user rejected checkpoint 18's visual density and indirect journey. This checkpoint removes the hero range panel and goal finder completely. It supersedes the previous decision to keep direct plan selection in place.

## Result

- One short pricing introduction and a three-step navigation: website, hosting/care, total.
- Three artwork-led website plans reuse the supplied navy glass assets. Large Rubik numerals retain the same design across EN/EL/HE, while Greek and Hebrew prose use their established brand roles. Page limits, revision rounds, package inheritance and features remain explicit.
- New pricing-only choice buttons have a directional action area and a finite fill interaction. Selection lights up the whole card, changes the button and adds a check. A brief confirmation advances to care, then from care to the total, including keyboard focus. Reduced-motion visitors advance immediately without animation. Pending advancement cancels on another action or unmount.
- Artwork uses the existing deferred Anime.js entrance lifecycle, with reduced-motion, visibility and cleanup handling. No new dependencies or media downloads were added.
- Enterprise has a separate wide enclosed composition, supplied folded-glass artwork and a direct custom consultation action. It remains quote-based, outside the standard calculator.
- Care choices distinguish occasional and regular updates visually, with prominent prices and update allowances. Monthly and annual billing retain the canonical amounts and savings.
- The first-year calculation has a prominent coloured result, a build-plus-care breakdown and payment timing/exclusions. Mobile places the total above the breakdown. Choices carry into the localized consultation enquiry. Selecting plans does not submit a request or payment.
- Comparison and FAQ disclosures remain open by default. Comparison filtering and reset remain available. Standard plan prices and scope are unchanged.

## Verification

TypeScript and 249 tests in 42 files passed, including new checks for selection timing, cancellation and reduced motion. The build verifies all canonical and demonstration routes. Browser checks covered EN/EL/HE at 320, 768 and 1440px, plus Hebrew interaction at 390px: no detected page overflow, clipped headings/controls or broken artwork; desktop button bottoms align. Actual pointer and keyboard selections advanced through the stages and calculated the correct monthly/yearly totals. Reset, difference filtering, open questions and enquiry links were checked. No observed browser console errors. Physical-device and screen-reader checks remain part of the finishing pass.

Live Preview and unchanged main/production identities are recorded in the external checkpoint-19 QA/deployment notes. This checkpoint changes only pricing; the wider page roadmap stays queued.
