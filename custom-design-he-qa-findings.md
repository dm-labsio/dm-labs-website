# Hebrew Custom-Design Service QA Findings

- The development-preview route `/he/services/custom-design/` renders the full RTL service-detail hierarchy: hero, three rationale cards, deliverables, four-stage process, four FAQs, and contact/pricing CTAs. The shared header, footer, language selector, cookie control, and accessibility control remain present.
- The 390 px full-page visual check shows all Hebrew headings, card text, LTR values, controls, and footer columns contained without horizontal overflow. The desktop browser inspection shows the same structural sections and no links to unfinished Hebrew service-detail pages.
- The generated `dist/public/he/services/custom-design/index.html` declares `lang="he"` and `dir="rtl"`, uses staged `noindex, follow`, self-canonicalizes to the Hebrew route, and emits valid English, Greek, Hebrew, he-IL, and English x-default alternates.
- The production-server probe returned HTTP 200 for `/he/services/custom-design/` and HTTP 404 for the still-unimplemented `/he/services/mobile-first/`, preserving the staged real-404 guard.
