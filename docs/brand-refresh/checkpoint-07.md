# Checkpoint 07 — multilingual FAQ

29 September 2026. Preview-only scope: FAQ in English, Greek and Hebrew, plus the shared language picker's scroll behavior.

## Result

- One shared page and typed content inventory replace divergent FAQ implementations. All 22 existing question topics are retained across all three languages, grouped into getting started, packages/payment, website features and ongoing care. The same content generates FAQ structured data, with cleanup when leaving the page.
- Supplied IMG-003/004 pearl-arc backgrounds frame the hero and closing consultation section. Every FAQ surface is navy, with live HTML text, numbered topic headings and plain disclosure controls. Decorative icon capsules and the pale card grid are removed. Desktop has a sticky topic index; mobile uses a compact in-flow index and native scrolling.
- The original desktop/mobile PNGs are encoded without resizing, recolouring or mirroring: 1672×941 / 19,290 bytes and 941×1672 / 20,586 bytes. Mobile uses its own portrait composition. No animation library, video download or new client-side disclosure state is added.
- Answers use native details/summary without a fixed height, so long Greek answers remain fully readable. English product names and euro amounts are directionally isolated and kept together in Hebrew prose. Display, body and micro-label fonts retain their approved roles; Hebrew canonical/noindex policy is preserved.
- Free-consultation and open-question links lead to localized contact pages and the existing WhatsApp destination. Commercial copy now follows the existing pricing and terms: current package/care amounts, taxes, paid-upfront default with written exceptions, scoped ownership and 30 days' written cancellation notice. Removed inconsistent Greek claims about €10–15 hosting, a free first domain/year or first care month, and cancellation without a contract. No commercial policy or legal page is changed.
- FAQ-scoped horizontal clipping restores viewport scrolling and the sticky index. The shared language dropdown is non-modal, so it does not lock the body and move the sticky header offscreen when opened after scrolling. The mobile navigation drawer retains its modal scroll lock.

## Verification

- TypeScript, all 161 tests across 32 files, link integrity and full build pass. Prerender: 91 canonical routes, 11 demos, static 404; zero errors. Tests cover equivalent question inventory, localized links, native markup, metadata parity and current pricing.
- EN/EL/HE checked at 320, 768 and 1440px: no horizontal overflow; all 22 questions and schema entries present; correct loaded heading/body/micro-label font roles; correct Hebrew direction; responsive art loaded. Desktop and phone compositions inspected, including Greek 375px and Hebrew mixed-direction amounts.
- Native disclosure click, Enter and Space, multiple open answers, topic-anchor focus and desktop sticky position verified. A Greek care answer at 320px reaches 678px and remains fully visible, exceeding the retired 600px limit.
- Header language switching EN → EL → HE verified, including from a scrolled page, with one updated FAQ schema and loaded locale display fonts. Escape closes the language menu and restores trigger focus. Mobile navigation locks scrolling when open and releases it after closing.
- FAQ links to Greek pricing and Hebrew contact verified; FAQ schema is removed on departure. Shared language-picker regression checks on contact and homepage pass. No browser console errors observed. No enquiry or WhatsApp message sent.

## Open work

The user requires dark backgrounds throughout marketing pages. Earlier light contact panels and other light page families remain staged; demos retain their own identities. Site-wide multilingual typography is explicitly still open, including complete-section comparisons after switching languages. FAQ checks do not close that concern.

Next bounded checkpoint: pricing option prominence and comparison, preserving the English typography the user likes, prices, scope and enquiry selection. Homepage hero/motion research, richer editorial layouts, remaining generic-icon removal and final device/screen-reader accessibility checks stay on the roadmap. This phase is not final approval of the site's visual design.

Publish only codex/brand-refresh to Vercel Preview, verify the deployed page and compare main/production against the recorded baseline. Deployment IDs and live results belong in the external Preview-Deployment.md record.
