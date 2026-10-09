# Current example collection

Updated 9 October 2026 after the user approved the Luxe release and confirmed complete removal of Olio Deli from the main website. This supersedes the selection and queue in the initial audit; the audit's visual observations remain useful. The six approved examples are released. Future builds begin in Preview for review.

## Existing concepts: six approved examples

| Category | Example | Decision |
| --- | --- | --- |
| Restaurants, cafés and food | Nomad Coffee | Approved refresh. Keep alongside the new hospitality brands. |
| Beauty | Bella Salon | Approved refresh as Bella Atelier. |
| Healthcare | Dr. Elara Dental | Approved refresh. |
| Fitness | PulseGym | Approved refresh. |
| Architecture | Arcos Architecture | Approved refresh. |
| Real estate | Luxe Realty | Approved refresh, released 9 October. See [Luxe: Places to live](luxe-places-to-live.md). |

Verde Restaurant is removed completely from the Preview gallery, public demo files and route registrations. The user's reference to “Feirae” is understood as Verde, the restaurant in the previous list. Nomad stays as an existing concept alongside the incoming hospitality brands; it is not automatically replaced by the new coffee brand.

## Next three builds: assets supplied by the user

| Category | Planned example | Status |
| --- | --- | --- |
| Hospitality | New hospitality brand | Build from scratch after the user supplies its assets and brief. |
| Restaurants | Fish restaurant | Build from scratch using the incoming brand assets. |
| Cafés | Hartley Café & Bakery | User supplied the complete asset library. New standalone demo built in Preview; see [Hartley direction](hartley-cafe.md). Nomad remains separate. |

Work through these one at a time; order will follow the available assets and the user's preference. Do not invent the identities or publish placeholder cards before the examples exist.

Longer-term backlog: Ela Pame using its existing app branding, a stronger childcare concept, and a possible psychologist/therapy practice. These remain separate from the three newly confirmed builds.

Olio Deli is retired completely: remove its cards in all languages, public demo and route registrations. Keep the shared Restaurants/Cafés category for Nomad and the incoming brands. There are six active fictional examples; the next three will bring the collection to nine.

Horizon Law and Serenity Yoga remain retired. The real Dr. George case study remains unchanged and is not counted among fictional examples.

## Homepage continuity

The homepage keeps a balanced four-card selection in English, Greek and Hebrew:

1. Nomad Coffee
2. Bella Salon
3. Dr. Elara Dental
4. Arcos Architecture, replacing Verde

All four lead to existing demos and preserve the originating homepage language on return. Keep the current two-column desktop / single-column mobile layout until the later gallery redesign. Do not add empty placeholders or links for future brands before those examples exist.

## Next working stage

Nomad Coffee, Bella Atelier, PulseGym, Arcos Architecture, Dr. Elara Dental and Luxe Realty are approved and released. See [Dr. Elara considered care](elara-considered-care.md) and [Luxe: Places to live](luxe-places-to-live.md). Olio Deli removal is confirmed. Await the assets for the three new builds above before designing their identities and structures.

The initial audit's requirements still apply: coherent branded imagery, specific content, a useful signature interaction, mobile navigation, accessible/reduced-motion behaviour, clear fictional-demo context, QA, then Preview review before proceeding to the next example.

## Earlier collection verification (before Olio retirement)

- TypeScript passed; production build rendered 97 canonical pages and seven demos with zero errors and zero SEO audit issues.
- All three galleries now have the same seven entries, including restored Luxe and paused Olio. All three homepages retain four valid example destinations with localized return paths.
- Browser check: the desktop homepage remains a balanced 2 × 2 grid; Arcos opens and closes back to the homepage. Hebrew at 390px has all four localized destinations and no document overflow.
- Full suite: 292 passed; the same eight pre-existing failures recorded in the first audit remain. No new test failures.

## Standalone showcase rule (8 October 2026)

Each dummy website must demonstrate a distinct brand, typography, page composition and signature interaction. Do not recolour or reuse the previous example's structure. Check existing display/body font choices before selecting the next pairing; user explicitly wants different fonts across examples. Match purposeful 21st.dev components to the business, and record the exact references and implementation.

Current font inventory: Nomad uses locally named Nomad Condensed (Barlow Condensed) with Arial; Bella uses Melodrama/Switzer; PulseGym uses Barlow Condensed/Barlow; Arcos uses Syne/IBM Plex Sans; Elara now uses Sora/Source Sans 3; Luxe now uses Bricolage Grotesque/Manrope. Elara's former Hanken Grotesk/Newsreader pairing is retired. Preserve existing approved demos in this task; apply the distinctiveness rule to subsequent work.

## Service-scope correction (9 October 2026)

DM Labs does not currently offer e-commerce. Do not include carts, checkout, payments or purchase flows in new showcase concepts. The user confirmed removal of Olio Deli from the main website on 9 October. Its shared Restaurants/Cafés category stays for Nomad Coffee and the incoming hospitality examples; there is no separate deli category to retain.

## Luxe verification (9 October 2026)

TypeScript and 13 targeted preview/navigation/gallery tests passed. The full build rendered 97 canonical routes and seven demo wrappers, with zero rendering errors and zero SEO audit issues. Browser checks at 320, 390, 768 and 1440 pixels passed, including filters, sort, empty results, combined feature filters, listing tags, dropdown dismissal and sorting, image load recovery, automatic and manual hero changes, removal of saved collections and comparison, and EN/EL/HE return-scroll restoration. The broader suite has known unrelated historical failures and was not rerun for this scoped example rebuild.

## Olio retirement verification (9 October 2026)

Removed the public deli demo, its route registrations and cards in English, Greek and Hebrew. TypeScript and 13 targeted preview/navigation/gallery tests passed. The production build rendered 97 canonical routes and six demo wrappers with zero errors and zero SEO audit issues; no Olio files remain in the build output. Desktop (1440px) and mobile (390px) browser checks found six example cards in every language, retained Nomad in the restaurant filter and no horizontal document overflow. Opening and closing Elara from all three homepages and galleries preserved the original scroll position. Unrelated Arcos working files were excluded from this release.
