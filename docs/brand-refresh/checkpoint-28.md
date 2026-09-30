# Checkpoint 28: Services as an exploration page

30 September 2026. Scope: the English, Greek and Hebrew Services overview pages on `codex/brand-refresh`, Preview only.

## Changes

- Removed website packages, enterprise/custom packages, care plans, prices, tax notes and package-scope disclosures from the Services overview. The pricing page and individual service pages retain their existing content.
- Removed the three-item package/capabilities/maintenance navigation. One hero action now leads directly to the services, with a shorter introduction in each language.
- Made each of the nine service entries one semantic link, covering its illustration, underlined title, description and surrounding space. Each link has a localized accessible name and description and retains its existing detail-page destination.
- Drew nine lightweight vector topic illustrations using a shared geometric style, violet/cyan strokes and triangle details. They have no enclosing capsules, arrow affordances, decorative numbering, image downloads or new library dependencies.
- Added subtle background and illustration feedback for hover, keyboard focus and press. Movement is optional under the reduced-motion preference, and information is visible without hover or JavaScript animation.
- Desktop uses a three-column grid, tablet uses two columns and mobile uses compact icon-and-text rows. Hebrew mirrors the layout naturally.
- Removed package offers from the three overview pages' structured data to match the new visible content. Canonicals, language alternatives and metadata remain intact.

## Verification

- TypeScript and all 273 tests across 46 files pass. Existing journey tests now check that all nine complete cards link to the correct locale and that plans, prices and the old navigation are absent. Shared structured-data tests check that Services has no package offer catalog.
- Full build passes: 91 canonical pages and 11 example wrappers; the rendered SEO audit reports zero issues.
- Browser layout matrix: English, Greek and Hebrew at 320, 390, 768 and 1440 pixels. Every view has nine underlined links, no pricing sections, no old jump menu, no clipped card/hero text and no horizontal page overflow.
- Visually inspected English desktop/mobile, Greek mobile and Hebrew mobile. Confirmed the explore-services anchor moves focus to the destination, the first service receives a visible 3px keyboard focus outline, and Enter follows its localized link.
- Followed an English mobile service, a Greek design service using the keyboard, and a Hebrew map service by clicking its description. Browser console checks returned no errors.
- Deployment commit/URL, live route checks and unchanged production/main evidence are recorded in the workspace's `output/website-refresh/checkpoint-28-*.json` and `Preview-Deployment.md` after publishing.

The layout checks use browser viewport emulation, not physical-device testing. Icons are decorative supplements to clear textual links, not the sole navigation cue.
