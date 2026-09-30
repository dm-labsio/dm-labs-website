# Checkpoint 15 — text-led search, security and delivery

29 September 2026. The user asked to remove the illustrations altogether and give the headlines and introductory copy more presence. This replaces checkpoint 14's numbered-card direction for these three topics in English, Greek and Hebrew. Preview only on `codex/brand-refresh`.

## Changes

- Removed all three hero selectors, numbered cards, search/answer/structure diagrams, visitor/HTTPS/website graphic, care/recovery artwork, delivery WWW treatment, illustration captions and replay controls.
- Expanded the hero into a single text composition: large display headline, larger introduction and the existing consultation/details links over the supplied dark background. Hebrew stays RTL; English/Hebrew Rubik and Greek M PLUS Rounded 1c roles remain.
- Kept all service explanations as visible text. SEO uses heading/body rows, security uses a heading beside its explanations on plain navy, and delivery uses three text columns that stack on mobile. Removed the delivery image and decorative numbering.
- Updated the SEO FAQ in all three languages to ask who controls search appearance, removing its reference to a deleted visual. Service scope, commercial qualifications, CTA destinations and default-open FAQs remain intact.
- Deleted the unused foundation illustration component, styles and illustration-only copy. Removed the now-unused card animation target. The previously approved design, mobile-first and performance illustrations remain unchanged.

## Verification

TypeScript and 212 tests in 36 files pass. Six obsolete card tests were retired; existing 18-route content/metadata tests now verify text-only markup for the nine revised routes and still preserve all meaningful service text. Seven existing animation lifecycle tests remain for the earlier service illustrations.

Full build: 91 canonical routes, 11 demos and static 404, zero errors. All nine generated service documents have one H1, three visible explanatory articles, open scope/FAQs and no illustrations or replay/selection controls. Main JS is 554.31 KB gzip; CSS is 41.53 KB gzip. No new media or dependencies.

Local browser checks cover all nine routes at 320, 768 and 1440px: no overflow, correct locale fonts/direction, enlarged headline/lead, all explanations visible and no illustration controls. Scope/FAQ keyboard close/reopen works in all languages. The earlier three service topics retain their artwork and passed mobile regression checks. No observed console errors or form submissions. Live Preview and unchanged main/production identities are recorded in the external checkpoint-15 QA and deployment notes.

Broader copy, site-wide typography, native-device/screen-reader finishing and the next service batch remain on the roadmap.
