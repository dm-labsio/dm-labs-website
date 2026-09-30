# Checkpoint 33: Automatic regional currencies

30 September 2026. Preview only, on `codex/brand-refresh`. No main merge or production deployment authorized for this feature.

## Behavior

- Vercel's `x-vercel-ip-country` header selects ILS for IL, USD for US, CAD for CA and EUR for every other/unknown country. No picker, browser-location prompt, language-based inference, currency preference cookie or IP storage.
- A same-origin GET endpoint returns only the currency code with private/no-store browser and CDN headers. Invalid responses, lookup failure or a 1.5-second timeout fall back to EUR. The static EUR page remains visible while the lookup resolves; the first interactive React render uses the resolved currency.
- Existing EUR prices remain unchanged. Stable ECB reference rates dated 29 September 2026: USD 1.1355, CAD 1.6101, ILS 3.4702 per EUR. Source: https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml. Rates are pinned in `shared/currency.ts`; no live exchange-rate dependency.
- Converted base prices below EUR 200 round upward to multiples of 5 (10 for ILS); larger prices round upward to multiples of 25 (50 for ILS).
- Totals and annual savings use already-rounded individual prices. Monthly care remains separate from the initial build payment and begins the month after official launch. The optional annual monthly equivalent is clearly approximate and uses whole units.
- USD/CAD codes remain explicit; large price figures give the code smaller typography. Locale-specific number formatting and bidirectional isolation protect Hebrew figures.
- Shared website/care pricing, summaries, FAQs and their structured data, regional landing pages, terms, and explicitly identified DM-Labs offers within articles use the visitor currency. Historical market comparisons, third-party prices, demo coffee menus and statutory EUR thresholds remain in their original currency. Unused template price data is not displayed.
- Contact selections preserve validated currency context across language switches. Enquiry and contact-page WhatsApp text include the displayed build and recurring prices. No messages are sent by this feature or QA.
- Terms no longer state that every price is in euros. Agreed price/payment currency remain confirmed on the invoice; no bank or FX-fee explanation was added.
- Canonicals, hreflang and sitemap URLs stay unchanged. Offer schema follows displayed currency/amounts. Static HTML and the explicit regional table in llms.txt remain useful without JavaScript.

## Stable price table

| Item | EUR | USD | CAD | ILS |
| --- | ---: | ---: | ---: | ---: |
| Launch | 299 | 350 | 500 | 1,050 |
| Growth | 749 | 875 | 1,225 | 2,600 |
| Pro | 1,499 | 1,725 | 2,425 | 5,250 |
| Basic Care / month | 69 | 80 | 115 | 240 |
| Complete Care / month | 129 | 150 | 210 | 450 |
| Basic Care / year | 750 | 875 | 1,225 | 2,650 |
| Complete Care / year | 1,395 | 1,600 | 2,250 | 4,850 |

## Verification

- TypeScript passes; 291 tests across 47 files pass. New checks cover all country mappings/fallbacks, pinned price tables, upward rounding, all build/care combinations, monthly versus annual totals, four currencies in three languages, matching Offer schema, validated enquiry context, endpoint caching/methods and lookup failures/timeouts.
- Full build: 91 canonical routes and 11 example wrappers, zero prerender errors and zero rendered SEO issues.
- Browser QA with local country fixtures: CAD English/Greek/Hebrew, ILS Hebrew; 1440, 390 and 320 pixel viewports. No horizontal overflow; compact homepage cards and five-digit Hebrew yearly total remain readable. This uses viewport emulation, not physical phones or foreign VPNs.
- Card-surface selection, monthly care, annual care, automatic journey progression and contact handoff checked. CAD Pro + annual Complete Care totals 4,675; ILS Pro + annual Complete Care totals 10,100; monthly view keeps build and care separate.
- Hebrew FAQ: all 22 structured answers match rendered text, with shekel amounts and no stale EUR offers. Greek regional landing prices use CAD with the original canonical URL. No browser console errors observed.
- Live Preview and unchanged main/production verification will be recorded in the workspace deployment log.
