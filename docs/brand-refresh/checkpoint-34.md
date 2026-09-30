# Checkpoint 34: Currency policies and approved production release

30 September 2026. The user approved the currency Preview and explicitly requested related policy updates and publication to main/production.

## Policy changes

Terms, Privacy and Cookie Policy updated in English, Greek and Hebrew (nine pages).

- Terms explain approximate IP-country currency selection, the EUR fallback, independence from language, possible VPN/location errors and written-quote correction.
- Fixed reference conversions and upward rounding are distinguished from live bank exchange rates. Original EUR prices remain unchanged.
- Selecting a plan or sending an enquiry does not order or pay for a service. Scope, total including applicable taxes/required charges, currency and recurring billing are confirmed before acceptance/payment. The invoice reflects that agreement. Display errors are addressed before acceptance, and later rate/display changes do not unilaterally change an accepted quote or agreed invoice.
- The client's own bank/provider conversion and transfer fees are their responsibility unless otherwise agreed and subject to law. Any additional fee allocation required by DM-Labs must be disclosed/agreed in advance. Non-excludable statutory rights remain preserved.
- Privacy identifies Vercel's approximate IP-country derivation, country-only use for currency and currency-only browser response; no GPS, behavioural or willingness-to-pay assessment.
- Legitimate-interest basis, contact/right to object, current-page memory, no separate currency IP/country record, and existing hosting-log processing are explained. Selected currency/prices included in a sent enquiry follow existing enquiry/client-record retention.
- Cookie policy states that currency display adds no cookies or local/session storage and does not enable or require analytics.
- Legal paragraphs receive readable spacing. Existing headings, routes and other commercial terms remain intact. The international-positioning regression guard now permits country names only in the three explicitly marked currency-location paragraphs.

## Proportionality rationale and source review

Purpose: understandable local-currency price presentation. Necessity: without a picker, coarse country inferred by the existing host from a request already needed to serve the website supports the requested automatic presentation; precise device location and persistent identifiers are unnecessary. Balancing/safeguards: same EUR base with disclosed stable conversions/rounding, no behavioural price profiling, no separate feature log or persistent currency identifier, no automated purchase, EUR fallback and written quote before acceptance; privacy notice and objection contact supplied. This is an implementation assessment, not jurisdiction-specific legal certification.

Official guidance checked on 30 September 2026:
- https://europa.eu/youreurope/citizens/consumers/shopping/contract-information/index_en.htm (clear price/contract information before acceptance)
- https://www.edpb.europa.eu/sme/be-compliant/process-personal-data-lawfully_en (legitimate-interest purpose, necessity and balancing)
- https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/legal-grounds-processing-data_en (processing grounds and transparency)
- https://vercel.com/docs/headers/request-headers (platform country header)

Policies clarify responsibilities but cannot guarantee legal protection. Applicable tax treatment and final invoices must reflect the actual client/project and jurisdiction.

## Verification

- TypeScript passes; all 291 tests in 47 files pass.
- Full build/prerender: 91 canonical pages, 11 example wrappers, root 404; zero prerender errors and zero rendered SEO issues.
- Built-site browser QA: all nine legal pages at 390px; no horizontal overflow; Hebrew RTL and English/Greek LTR; section counts remain 16/12/10. Hebrew currency clauses visually checked; spacing readable. Desktop Hebrew inspected at 1280px.
- Local IL fixture returns ILS across all languages, including after analytics rejection. Browser console: zero errors observed. The endpoint returns currency only with private/no-store and noindex headers; reviewed against the privacy wording.
- Currency conversion, totals, enquiry handoff, schemas and fallback regression coverage from checkpoint 33 passes again. No actual enquiry or payment submitted.
- Preview, merge and production verification are recorded in the workspace release log after deployment.
