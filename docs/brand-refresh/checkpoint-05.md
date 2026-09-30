# Checkpoint 05 — shared buttons, logo and navigation

28 September 2026. Branch: `codex/brand-refresh`. Preview only.

## Result and design choices

The shared primary CTA now uses Periwinkle with Midnight lettering, a contained Cyan/Violet light treatment on interaction, and a clear keyboard outline. The local comparison covered solid, cool-light and liquid-fill directions on dark and light backgrounds with EN/EL/HE labels. Cool-light was selected for readable labels, a stable target and consistency with the supplied glass artwork. No third-party component code or additional animation engine was added. The user-supplied button references remain inspiration, not a requirement to reproduce their effects.

The control uses Open Sans 700 at 17px, a minimum 56px height and an 8px corner radius, consistent with the previous hero checkpoint. This resolves the earlier pill-radius suggestion in favour of a compact rectangle. Secondary actions use an outline. The pointer-only light sweep runs once for 650ms; it does not loop or move the hit target. Keyboard focus has an equivalent static light treatment. Reduced motion removes the sweep and transitions, and forced-colour mode retains native system colours. Pricing selections use Deep Cobalt/Pearl, with their existing pressed state intact; the conflicting old purple selection rule is removed.

`BrandButton` preserves native links, button types, disabled/busy/pressed state, handlers and refs. The existing `StarButton` import is a compatibility entry so its existing marketing uses receive the shared design without a broad page rewrite. The homepage primary CTA also uses it. Contact buttons now expose their existing pending state through `aria-busy`; submission logic is unchanged.

## Logo and shell

- Official suite SVGs are copied byte-for-byte into new `/brand/v1/` paths: small flat dark for navigation and full glass dark for the footer. The lettering is outlined in the originals, never retyped or mirrored. Asset-integrity tests compare their SHA-256 digests.
- The sticky Midnight header uses the 200px logo on desktop/tablet and 160px on phones. It stays readable over both pale and dark content.
- At 1440px and above, the six core navigation links (five for Hebrew), language selector and localized free-consultation CTA are visible. Home remains on the logo and contact on the CTA. Every existing destination is retained in the mobile menu/footer.
- Below 1440px, the mobile/tablet drawer provides all destinations, a consultation link, keyboard focus trapping, Escape/close handling, scrolling for short screens, and correct RTL placement. Resizing to desktop closes an open drawer and releases the body scroll lock.
- A single language dropdown retains the existing translation mapping and reading-position behavior. Hebrew blog fallback goes to Hebrew home, rather than inventing an unavailable translation.
- Active navigation identifies parent sections on detail pages. Localized skip links move keyboard focus to main content. Mobile menu/language controls retain functional icons; decorative pictogram removal is tracked separately.
- The Hebrew header consultation CTA now opens `/he/contact/`, matching the other locales and the hero. Existing WhatsApp controls remain available.

## QA evidence

- TypeScript, whitespace and link-integrity checks pass. All 147 tests across 30 files pass, including native button/link semantics, logo integrity, locale navigation and existing content/route regressions.
- Full build/prerender passes: 91 canonical pages, 11 standalone demos and static 404, zero errors. The existing bundle-size warning remains.
- Browser audit of all 91 canonical pages at 320px: no horizontal page overflow or clipped shared-button labels; every header logo loads. RTL checks inspect the label bounds, avoiding false overflow reports from the clipped decorative pseudo-element.
- Desktop header checked in EN/EL/HE at 1440px: all links/CTAs fit, correct direction, 200px logo and no horizontal overflow. Greek and Hebrew phone menu visuals checked, including naturally wrapped Greek CTA copy.
- Mobile keyboard focus trapping, Escape/focus return, localized process-link navigation, body scroll-lock release and 744×375 short-screen scrolling checked. Resizing an open menu to 1440px closes it correctly.
- Language switching, Hebrew blog fallback, service-detail active state and keyboard skip-link focus checked. Pricing Growth + Complete Care selection shows the intended Deep Cobalt state and passes the selected context to the contact form. Empty submission focuses an invalid required field without sending a lead. No browser console errors observed.
- Reduced-motion/forced-colour rules reviewed in source. OS-level motion emulation, complete zoom/screen-reader testing and pending/success/error form simulations remain later gates; these are not claimed as completed here.

## Remaining scope

This completes the shared CTA foundation and header/navigation checkpoint, not every bespoke button or the entire shared shell. Footer layout, form fields, accordion, cookie/WhatsApp/accessibility controls and page-specific compositions remain staged work.

The mobile audit found pre-existing anchor-wrapped native buttons and custom gradient CTAs in Greek regional pages (Crete, Cyprus, Limassol, Nicosia and Thessaloniki) and Greek articles (restaurant, nail salon, yoga, Google visibility, website cost and Wix comparison). Their page-family pass must migrate these to single semantic links using `BrandButton`, preserving destinations and removing obsolete styles. They are not introduced by this change and are not included in the shared-label audit claim.

The current hero remains a functional baseline. The user's requested hero-library research, desktop/mobile prototypes, supplied navy backgrounds, richer editorial layouts and complete generic-icon audit are explicitly queued in `visual-roadmap.md`. Process-page decorative icons are still pending; no global removal is claimed. Homepage and page-family task rows remain in progress.
