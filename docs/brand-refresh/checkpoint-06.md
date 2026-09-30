# Checkpoint 06 — consultation/contact, English, Greek and Hebrew

29 September 2026. Preview-only scope: three contact routes, one shared consultation form, their copy and supplied background art. The broader pricing/FAQ journey and the user's deferred visual feedback remain open.

## Result

- `ContactPage` and `ConsultationForm` replace three divergent page/form implementations. The offer is a free consultation or an open question. Only name and email are required; business and question are optional. Existing WhatsApp number, email, Instagram and privacy destinations are preserved.
- Contact's generic icon capsules and repeated method cards are replaced with an open numbered explanation, direct text links and a clear form. The shared footer, floating controls and existing lower conversation-video interlude are unchanged, so no global icon-removal claim is made.
- The hero uses supplied IMG-001/002, `01-folded-glass-desktop.png` (1672×941) and `02-folded-glass-mobile.png` (941×1672), from the user's `Downloads/asstets` folder. WebP copies retain dimensions and composition, with no mirroring/recolouring: 21,482 and 23,526 bytes. Separate phone art and direction-aware dark overlays protect text. This static contact background is independent of the later homepage motion research.
- Rubik 900/800 remains EN/HE display; M PLUS Rounded 1c 900/800 remains Greek display; Open Sans serves body, labels and fields. HTML language/direction and isolated Latin contact details are explicit. Hebrew canonical/noindex policy remains unchanged.
- Pricing's validated package, care and billing selection prefill remains available in all three locales through the same helper. Header/footer language links retain only the validated package/care/billing parameters on contact routes; arbitrary URL fields are dropped.

## Form behavior

Client validation focuses the first invalid field and associates its localized error. Sending disables fields and prevents duplicate requests. Success requires HTTP success plus the provider's explicit `success: true`; the form's existing public endpoint/key are retained. This follows the [Web3Forms React example](https://docs.web3forms.com/how-to-guides/js-frameworks/react-js/simple-react-contact-form) and [response contract](https://docs.web3forms.com/getting-started/api-reference).

Failure and a 20-second timeout retain entered text and offer retry/direct contact. Success clears fields, focuses its status and offers another enquiry. Unmount aborts outstanding work. Analytics records the existing contact event only after acknowledgement; an analytics error cannot turn a successful request into a displayed failure. The previous 24-hour promise is removed; a request does not claim a confirmed appointment.

## Verification

- TypeScript and 157 tests across 31 files pass; link integrity and full build/prerender pass (91 canonical routes, 11 demos and static 404, zero errors). Updated the media inventory for two new backgrounds. Old tests locking the superseded contact markup/copy were replaced with meaningful shared validation, provider-response, locale and pricing-context tests.
- Browser layout/loaded-font audit: all three contact routes at 320, 768 and 1440px, no page/field/button overflow, correct heading fonts/weights/direction and loaded background. All three locales inspected on desktop and phone; English has a smaller narrow-phone floor to keep “conversation” intact.
- Local dev-only fixture exercises the actual shared form with an injected simulated transport. Required/invalid-email focus, pending disabled controls, failure retention, double-click protection, retry, acknowledged success and reset/focus are checked. Greek and Hebrew optional empty questions succeed; localized status fits a 320px phone. Hebrew pending timeout recovers after 20 seconds and preserves fields. Pricing Growth + Complete Care/yearly was selected and transferred to Hebrew contact, then switched to English and Greek without losing the selection. No console errors observed.
- `qa-consultation.html` is not a production build input; QA fixture text and entry are absent from built assets. No test enquiry is sent to Web3Forms; actual email delivery is not claimed. Native screen-reader and device-level motion/zoom checks remain final accessibility gates.

## Next bounded work

Continue the consultation journey with FAQ copy/interaction and pricing choice clarity as separate small checkpoints. Preserve current pricing typography. The queued homepage wow-factor research, desktop/mobile animation prototypes, broader navy-background placement, editorial compositions and remaining decorative-icon audit stay in the roadmap. Do not reinterpret this checkpoint as final approval of all visual design.
