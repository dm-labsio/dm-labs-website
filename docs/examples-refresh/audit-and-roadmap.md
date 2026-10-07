# Example websites: audit and rebuild roadmap

Reviewed 7 October 2026. This release is Preview only, based on production commit `ab11a756d6300ba84b7aee5184ee6e8b6e0590cf`. Production and main are not part of this release.

## Decision

Reduce eleven fictional demos to seven rebuilding candidates. Remove four weaker demos, their gallery cards in English, Greek and Hebrew, their public HTML files and their preview route registrations. Remove empty categories and the unused legacy CoffeeShopTemplate component. Retired work remains recoverable in Git history, not in a publicly served archive.

Keeping a concept is not a quality endorsement of its current execution. The retained categories offer distinct visitor tasks and opportunities to show different design skills. Each still needs a proper brand, content and interaction pass. Names are working names until the branding library supplies approved identities.

The real Dr. George case study is outside this fictional-demo audit and stays intact.

## Inventory and decisions by category

| Category | Example | Decision | Evidence and design judgment |
| --- | --- | --- | --- |
| Restaurants and cafés | Verde Restaurant | Keep restaurant slot; rebuild as the planned fish restaurant | A usable menu structure and restaurant-specific journey give it a foundation. The generic fine-dining photo, italic headline and green/gold styling do not create a distinctive restaurant. Replace identity and imagery together, not just the logo. |
| Restaurants and cafés | Nomad Coffee | Keep coffee slot; full rebuild | The coffee film creates a distinct moment, but its long pinned scroll delays the actual café. The initial hero can be blank while the video loads. Build the café identity, packaging, menu and location first; make any film optional to the visitor's progress. |
| Beauty and wellness | Bella Salon | Keep for rebuild | A clear appointment task and potential to show a cohesive beauty brand. Current split hero, six numbered service blocks and stock salon image are generic. Replace these with a service finder, editorial imagery and a coherent treatment/booking journey. |
| Clinics and health | Dr. Elara Dental | Keep for rebuild | The treatment explainer gives this a useful educational purpose. Currently it is a video with textual steps, not an interactive 3D model. Teal cards, generic portraits, empty decorative icon containers and unsupported fictional proof need rethinking. Distinguish this concept from the real Dr. George case study. |
| Fitness and sport | PulseGym | Keep for rebuild | Condensed typography and assertive visual tone offer contrast to the quieter examples. The desktop hero statistics overlap its description at the reviewed viewport; the rest is largely repeated text grids. A working class planner would demonstrate more than decorative motion. |
| Fitness and sport | Serenity Yoga | Retire | Stock meditation imagery, sage/cream styling and repeated class cards add little that the beauty and fitness examples cannot demonstrate better. No sufficiently distinct identity or interaction to justify a second fitness concept now. |
| Real estate | Luxe Realty | Retire | Familiar black/gold luxury styling, reused property imagery and a prominent search strip without a search implementation. The architecture example is a better starting point for a distinctive spatial portfolio. A future real-estate concept would need a credible listing/search experience from the start. |
| Childcare | Little Stars Nursery | Retire | Rounded pastel cards, floating badges, decorative shapes and generic child photography are close to the template language we are trying to leave behind. An unexplained accreditation-style claim also appears. Ela Pame will show a much more specific family-focused identity and product experience. |
| Architecture | Arcos Architecture | Keep for rebuild | Stronger typographic identity, sharper edges and asymmetric project imagery. However, the building shown does not convincingly support its residence label, and project exploration is shallow. Build one coherent fictional project in depth, with plans, materials and related views. |
| Deli and food store | Olio Deli | Keep for product/packaging rebuild | Useful opportunity to connect the branding library to packaging and a shopping interaction. Current image/category mismatches include a barista image for pantry goods; the navigation repeats Products. It needs original products and packaging, not another restaurant layout. |
| Legal services | Horizon Law | Retire | Navy/gold, generic serif headings, six practice-area blocks and statistics provide little visual or functional distinction. The hero says four practice areas while six are shown. The concept currently contributes less than the other professional-service examples. |

An additional unlisted `CoffeeShopTemplate.tsx` had no imports or route references. It is removed as obsolete code, not counted as a twelfth live demo.

## What was inspected

- All eleven live HTML demos: desktop first screen and following section, plus source inspection of headings, imagery, forms and event handlers.
- All eleven at a 390 × 844 mobile viewport: document width, first-screen content and navigation availability; visual screenshots for representative layouts.
- Three gallery languages, preview wrapper, build route list and server route allowlist.
- Existing Ela Pame product brief and version 2 asset-bank manifest on the user's Mac. The manifest identifies 483 assets; this is an inventory count, not a claim that all assets were visually reviewed.

No horizontal document overflow was detected in this mobile scan. That does not establish complete mobile usability: navigation is generally hidden without a replacement menu, pages are long, and important interactions still need rebuilding. No genuine bookings, purchases or inquiries were submitted.

All 65 `<img>` entries in the eleven demos reference Unsplash; CSS background images and videos are additional. The issue is not the hosting provider. The set lacks consistent, brand-specific subjects, and some pictures do not match what the copy describes. Several hand-built gallery thumbnails also diverge from the actual demos.

## Research: avoiding the generic AI look

There is no reliable visual test that proves a website was generated by AI. The following are design judgments about sameness, supported by usability research and platform commentary, not an AI detector.

Nielsen Norman Group's eye-tracking findings distinguish useful product/person imagery from decorative filler: people inspect pictures that answer relevant questions and often ignore generic decoration. The article originated in 2010 and was reviewed in August 2026; this is established usability evidence, not a new 2026 trend. [Photos as Web Content](https://www.nngroup.com/articles/photos-as-web-content/).

Webflow describes homogenized design as a risk of over-relying on generative AI. This is an industry platform's perspective, not an independent controlled study. [AI and the future of the web](https://webflow.com/blog/ai-future-of-web).

### Patterns to avoid in this collection

1. The same page recipe under different logos: hero, three benefits, number strip, testimonials, FAQ, CTA. Start with the visitor's task instead.
2. Icons, pills, numbers and floating badges used only to fill space. Use text labels or branded illustration only when they clarify something.
3. Repeated serif-plus-italic headlines, interchangeable slogans and unsupported statistics. Typography and language must come from each brand's character.
4. Unrelated stock images or generated images with inconsistent locations, lighting, products and people. More images are not automatically better.
5. Default glow, glass and gradient treatments on every industry. Such treatments can work, but only with a specific visual reason.
6. Motion that gates content or makes scrolling a chore. The menu, booking route or product must remain directly accessible on a phone.
7. Controls that only look interactive: search with no results, dead product links or forms that imply a real booking. A concept should demonstrate its core task with clearly fictional sample data and an honest demo end state.

### Acceptance rules

- Each brand is recognizable with its logo temporarily hidden. It has its own typography, palette, imagery, composition and tone. DM Labs' navy identity does not become every fictional brand's identity.
- Each example has a different useful signature interaction. Shared code for accessibility and plumbing is welcome; a shared visual template is not the goal.
- Generated imagery uses an approved shot list and reference set. Keep product geometry, packaging, tableware, architecture, lighting and colour treatment consistent across views. Reject malformed hands, distorted objects, plastic-looking food, impossible rooms and incoherent signage. Add exact brand lettering as controlled artwork rather than trusting generated text.
- Show specific dishes, packaging, treatments or app screens. Avoid inventing real endorsements, operating businesses or client results. Gallery and demo context identify fictional concepts.
- A component is chosen for its job, brand fit, touch/keyboard usability and performance. Evaluate the user's upcoming references against those criteria. Do not choose a library first and force every example into it.
- Mobile gets deliberate composition and working navigation. No hover-only information, mandatory drag, long blank video loading state or forced scroll film.
- Motion has a static or reduced-motion equivalent. Use existing Anime.js/Framer Motion where appropriate before adding another dependency.
- Replace gallery mock thumbnails with representative captures when each rebuilt example is ready.

## Rebuild queue and scope

The first three are the user's named priorities. Proposed order is fish restaurant, coffee shop, then Ela Pame, unless the user chooses another starting point. These are directions to develop, not approved identities or a request to generate every asset now.

| Order | Concept | Brand/asset work | Useful signature component |
| --- | --- | --- | --- |
| 1 | Fish restaurant, replacing the Verde slot | Identity from the branding library; consistent seafood, tableware, menu, signage and venue imagery | Visual seasonal menu with dish details/dietary information; a clear demonstration of choosing a reservation slot |
| 2 | Coffee shop, replacing the Nomad slot | Café identity, cups, bean bags, menu, counter details and coherent drink photography | A short flavour/brew guide that leads to the relevant beans or drink; a working sample basket if appropriate |
| 3 | Ela Pame app | Reuse the existing approved logo, mascot, tokens and category art from the brand library; verify the v2 open decisions before treating provisional assets as final | An interactive product walkthrough: discover by district/age/time, open an activity, save a plan using fictional sample data |
| 4 | Olio product brand | Product range, own-label packaging, product detail shots and a distinct shop voice | Build a gift box with visible items, quantities and a sample total |
| 5 | Arcos architecture | One believable project family, exterior/interior/material/detail views and accurate labels | Project exploration with plans and material details; natural scrolling and a touch-friendly gallery |
| 6 | Bella beauty brand | Focus the service offering, create a coherent editorial look and treatment photography | Service selection leading to a clear sample appointment summary |
| 7 | Pulse fitness brand | Specific training identity, venue/coaching imagery and a clear class taxonomy | Filter a weekly class schedule and assemble a trial visit |
| 8 | Dr. Elara clinical concept | A calm identity, credible treatment visuals and clear patient information | Patient-led treatment explainer with optional animation and readable static steps |

Ela Pame's existing asset bank lives at `Downloads/ela-pame/ela-pame-asset-bank-v2` and identifies itself as **Ela Pame**. Its product brief describes a parent-facing Cyprus activity app with calm surfaces and playful details. This is an app/brand showcase direction, not authorization to rebuild or publish the actual app in this pass.

## One example at a time

For each example:

1. Establish the brand brief, visitor, offer and one primary task. Check the existing branding library before inventing or generating replacements.
2. Select a small set of references from the user's component sources. Explain the purpose of each chosen component and discard attractive but irrelevant effects.
3. Prepare the brand system and asset shot list. Develop one desktop direction and its mobile counterpart before extending the whole site.
4. Build the core interaction and supporting content. Keep demo actions self-contained; no real bookings, payments or unrelated data collection.
5. QA layout, all visible controls, keyboard use, mobile navigation, reduced motion, image fidelity, loading, errors and return-to-gallery flow. Review localized gallery labels and any languages explicitly included for that demo.
6. Publish Preview for review. Refine that example before opening the next. Production requires a separate release decision.

## This pass

- Four retired demos removed completely from served source and all three galleries.
- Empty Real Estate, Childcare and Legal Services filters removed.
- Seven remaining demos kept in a stable order instead of reshuffling during rerenders.
- Obsolete unlisted coffee component removed.
- Greek and Hebrew full-preview links now preserve their gallery language when visitors close the demo.
- SEO coverage expanded to every remaining static demo rather than a hard-coded subset.
- No new brand identities or imagery generated yet. No retained demo has been represented as redesigned.

### Verification evidence

- TypeScript check passed.
- Production build and prerender passed: 97 canonical pages, seven preview wrappers, zero rendering errors, zero SEO audit issues.
- Full suite: 292 passed, eight failed. The identical eight failures also occur on an untouched archive of production commit `ab11a75`, verified separately. No new failures remain after updating the image-inventory expectation for the deliberate removals.
- Existing failures concern two stale latest-blog-date assertions, two stale route-count assertions, two media-inventory assertions, one punctuation scan and one positioning-copy scan. These are recorded, not silently waived or described as a clean full-suite pass.
- English category filters return the intended remaining demos in a stable order. Full preview opens the correct static HTML in the wrapper.
- English, Greek and Hebrew galleries each contain the same seven demos. Removed categories are absent.
- Browser checks passed for all English filters and representative Greek/Hebrew filters at mobile size. Opening and closing a full preview returns to the correct language in all three entry flows.
- Local HTTP checks: all eight retired wrapper/raw URLs return 404; all fourteen retained wrapper/raw URLs return 200. Removed the old server fallback that gave missing raw demo files a misleading 200 response.
- Preview deployment verification is recorded in the release handoff.
