# Checkpoint 26: pre-production QA and repairs

This checkpoint stays on `codex/brand-refresh` and is deployed to Preview. Main, production deployments, domains and account settings are unchanged.

## Repairs

- Cookie settings can be reopened from every footer in English, Greek and Hebrew. Visitors can reject previously accepted analytics; PostHog capture and replay stop, and Vercel Analytics is also consent-gated. Invalid or unavailable browser storage fails safely. Re-consent resumes recording. Focus returns to the settings control when the panel closes.
- Privacy and cookie notices now distinguish hosting connection data from optional analytics, disclose pseudonymous analytics and masked replay, identify Vercel Analytics, and explain withdrawal through the footer. The connected PostHog project's current replay retention is 30 days, verified read-only. No account settings were changed.
- Removed old 24-hour proposal/reply promises and open-ended revision wording. Qualified form-delivery and search-placement claims. Removed unsupported GEO/SEO result timelines.
- Complete Care now says “Content updates when you need them,” with the equivalent Greek and Hebrew copy. Existing exclusions for new pages, integrations and redesigns remain. Basic Care's existing three-update allowance is unchanged.
- Older landing pages now share package definitions with pricing: Launch 1–2 simple pages, Growth up to 4, Pro up to 7. Corrected outdated included forms, booking systems, translations, articles, page counts and “no monthly charges” wording. Managed hosting/care and tax/third-party-cost qualifications are explicit. Terms reflect the already approved monthly-care start after official launch and the care requirement while DM Labs manages the site.
- Corrected seasonal contact-time wording to EET / EEST and localized the Greek accessibility controls.
- Updated Express and Nano ID within their current major versions; pinned the existing Recharts dependency to patched Lodash 4.18.1. The production dependency advisory scan fell from 11 findings to zero. No major framework upgrade.

## Verification evidence

- TypeScript passes. 266 tests in 45 files pass, including six new consent lifecycle tests. Existing pricing tests cover every build/care/billing combination and localized estimates; enquiry tests cover validation, provider acknowledgement, errors and timeout handling.
- The complete build prerenders 91 canonical pages, 11 example wrappers and the real 404 page.
- A separate audit of all 91 built pages checks canonical URL, language, description, a single H1, duplicate IDs, local assets and cross-page section anchors. All 1,173 local asset references resolve; no findings.
- 51 external asset/iframe URLs checked. Image/video requests succeeded. Google Maps rejects HEAD requests, so the six map URLs were verified separately using GET and returned 200. This confirms availability, not the accuracy of a map's place data.
- Browser checks at 320px and 1440px cover shared home and pricing pages in all three languages; narrow-screen checks cover all nine legal pages, the three forms service pages and updated Greek Nicosia landing page. No horizontal page or heading overflow was found in those checks. Long English and Greek blog titles remain readable.
- Whole-card pricing selection works; Growth + Complete Care shows €749 first and €129 monthly after launch, or €2,144 for build plus annual care. The choice carries into contact and survives EN → EL → HE switching.
- Local simulated enquiry transport: empty-field validation, disabled pending submit, failure with preserved input and direct-contact alternatives, retry and confirmed success. Greek and Hebrew success states checked. No real enquiries were sent.
- Cookie accept → reopen → reject → reload retains rejection; settings return focus, Greek/Hebrew controls are translated, and the panel fits 320px. SDK lifecycle is checked with mocks; this is not a packet-level privacy audit.
- Mobile menu Escape returns focus to its trigger. Greek text enlargement to 125% remains contained. The homepage explanatory video plays the 720p source on mobile with native controls and no media error.

## Business and operational follow-up

- Actual contact-form delivery to the intended inbox still needs an authorized real submission and receipt confirmation. Provider acknowledgement alone cannot prove inbox delivery.
- Terms retain existing commercial provisions that need owner/qualified legal review: the €50 bundle discount and four-month recovery rule, annual/quarterly cancellation and refund treatment, €25 late-payment charge, and liability cap. These were not invented or renegotiated during QA.
- The privacy policy's existing contact/client retention promises (12 and 24 months) need to match the real deletion process. Analytics-event/error retention was not confirmed by the available project settings.
- Testimonials remain unchanged at the owner's explicit request and are not counted as verified client evidence.
- Examples and broader blog/service redesigns remain deferred. Decorative animation respects reduced-motion preferences; the requested removal of visible pause controls remains. No claim of full WCAG certification, legal compliance, penetration testing or physical-device testing is made.

## References used

- [PostHog replay controls](https://posthog.com/docs/libraries/js/usage#session-replay) for explicit recording stop/start.
- [European Commission guidance on consent](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/legal-grounds-processing-data_en) for making withdrawal accessible.
- [Lodash advisory](https://github.com/advisories/GHSA-r5fr-rjxr-66jc), [path-to-regexp advisory](https://github.com/advisories/GHSA-37ch-88jc-xwx2), and [Nano ID advisory](https://github.com/advisories/GHSA-28wg-ghj8-5hjv) for the targeted dependency repairs. The full audit output is kept with the local QA artifacts.
