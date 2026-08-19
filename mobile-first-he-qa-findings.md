# Hebrew Mobile-First Service QA Findings

- The development-preview route `/he/services/mobile-first/` renders the complete RTL service detail: hero, three rationale cards, deliverables, a four-stage process, three FAQs, contact and pricing CTAs, and the shared Hebrew header/footer controls.
- The 390 px full-page capture confirms that the mobile-first content, technical LTR values, cards, CTAs, and footer remain contained without horizontal overflow. Desktop inspection confirms the EN, EL, and HE selector targets point to real counterparts.
- The generated `dist/public/he/services/mobile-first/index.html` declares `lang="he"` and `dir="rtl"`, uses staged `noindex, follow`, self-canonicalizes to the Hebrew route, and emits valid EN, EL, HE, he-IL, and x-default alternates.
- A direct production-server probe returns HTTP 200 for `/he/services/mobile-first/` and HTTP 404 for the still-unimplemented `/he/services/seo/`, preserving the staged real-404 guard.
