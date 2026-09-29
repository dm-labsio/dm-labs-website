# Checkpoint 20: whole-card selection and payment timing

29 September 2026. Preview only on `codex/brand-refresh`.

The user approved the new pricing direction and requested three refinements:

- The full website and care cards now activate their existing native selection button. Artwork, headings, prices, feature text and card spacing all select and advance. Existing controls keep their keyboard behaviour and are not activated twice. The full Enterprise card opens the same custom enquiry destination as its button.
- Page counts and revision rounds are restored to the canonical feature bullets. Separate decorative fact blocks are removed. Care update allowances also return to the feature list, removing the extra numerical callout. Card artwork, selection feedback and aligned buttons remain.
- Monthly billing no longer displays build plus twelve care payments as one total. It shows the one-time build as the first payment and the selected monthly care amount separately. Monthly care starts in the month after the official website launch, as explicitly specified by the user. This timing appears on care cards, the payment summary and the pricing FAQ in EN/EL/HE. Annual billing retains the combined build plus one annual care payment. Prices, allowances, savings and enquiry parameters are unchanged.

TypeScript and 252 tests in 42 files pass. Updated calculation and rendered-summary tests verify that monthly payments remain separate, annual totals remain correct, and incomplete selections never show a complete payment summary. The full build prerenders 91 canonical routes, 11 demo routes and the static 404 with zero errors.

Local browser checks cover EN/EL/HE at 320, 768 and 1440px, plus Hebrew at 390px. No detected horizontal overflow or clipped headings/buttons. Desktop plan and care button bottoms align. All five standard cards were selected through non-button content; keyboard Enter/Space and Enterprise navigation also passed. Monthly and annual summaries, automatic focus progression and localized enquiry URLs were checked without submitting forms. No observed browser console errors.

Live Preview and main/production identity checks are recorded in external checkpoint-20 QA notes. Physical-device and screen-reader checks remain part of the later finishing pass.
