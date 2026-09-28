# Pricing typography follow-up

28 September 2026. Preview only, on `codex/brand-refresh`.

The user prefers the English pricing type treatment and reported poor Greek/Hebrew alignment. Inspection of the loaded Preview established that localized headings already use their approved families and 900/800 weights. The concrete mismatches were in currency figures, English plan labels and RTL price alignment; this correction does not claim a complete pricing redesign.

## Correction

- Main build/care prices use the same Rubik 800 numerals, scale, tracking and line-height across EN/EL/HE. Greek prose headings, including the custom-quote heading, keep M PLUS Rounded 1c; Hebrew and English headings keep Rubik. English pricing typography is preserved.
- English product labels (Launch/Growth/Pro Website, Basic/Complete Care and Enterprise / Custom) declare their actual language and isolate LTR text. They consequently use Fira Mono in Hebrew as they already do in English/Greek. Hebrew-language microcopy still intentionally uses Open Sans; Fira Mono has no Hebrew glyphs.
- Removed the legacy rule forcing whole Hebrew price rows into LTR and left alignment. The row now follows its RTL card, while each amount is isolated LTR. Price numerals, localized billing qualifiers and neighboring text retain their own directions.
- Localized step counters explicitly use the isolated Latin microtype role. No prices, plan features, billing calculations, destinations or submission logic change. Localized number formatting is preserved.

## Verification

- All three pricing pages inspected with fonts loaded at 1440px: Rubik 800/56px price figures and Fira Mono 400/14px English plan labels; approved locale heading families at 900/800.
- EN/EL/HE checked at 320, 375 and 768px: no page overflow or clipped prices, plan labels or custom-quote copy. Hebrew price rows align to the right; numeric content remains isolated.
- Yearly billing and Growth + Complete Care selected in all three locales. Each selection passes its package, care and yearly billing context to the correct localized contact form and populates its message. No form submitted; no console errors observed.
- TypeScript, 147 existing tests, link integrity and full prerender/build pass. Existing bundle-size warning remains.

Broader typography parity and more distinctive pricing option layouts remain explicit tasks in `visual-roadmap.md`. The prior foundation checks were not a complete section-by-section visual approval.
