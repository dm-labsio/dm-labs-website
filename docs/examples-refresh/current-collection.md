# Current example collection

Updated 9 October 2026 after the user's correction. This supersedes the selection and queue in the initial audit; the audit's visual observations remain useful. All website changes in this phase remain Preview only.

## Existing concepts: five approved refreshes, Luxe rebuilt in Preview, Olio on hold

| Category | Example | Decision |
| --- | --- | --- |
| Restaurants, cafés and food | Nomad Coffee | Keep over Verde. Its subject-specific coffee film offers a stronger visual starting point, while its long scroll/loading behaviour still needs redesign. |
| Restaurants, cafés and food | Olio Deli | Skip. User does not offer e-commerce and wants no cart/checkout showcase. Likely retirement, pending a definitive removal decision. Do not develop further or present it as an approved refresh. |
| Beauty | Bella Salon | Keep for a distinct beauty-brand rebuild. |
| Healthcare | Dr. Elara Dental | Keep for rebuild. |
| Fitness | PulseGym | Keep for rebuild. |
| Architecture | Arcos Architecture | Approved refresh. |
| Real estate | Luxe Realty | Original concept restored for a complete Preview rebuild, authorised 9 October. See [Luxe: Places to live](luxe-places-to-live.md). |

Verde Restaurant is removed completely from the Preview gallery, public demo files and route registrations. The user's reference to “Feirae” is understood as Verde, the restaurant in the previous list. Nomad stays as an existing concept alongside the incoming hospitality brands; it is not automatically replaced by the new coffee brand.

## New examples to add

| Category | Planned example | Status |
| --- | --- | --- |
| Restaurants and cafés | New fish-restaurant brand | Part of the separate branding-library work; identity and assets to be supplied/confirmed. |
| Restaurants and cafés | Another new café/restaurant brand | At least two additional hospitality brands are being developed. The earlier brief mentioned a coffee shop. These are additions to the retained concept, not assumptions that the existing names will be reused. |
| Apps | Ela Pame | Use its existing app branding and asset library. This is a separate app example, not a replacement for childcare. |
| Real estate | Luxe Realty | Moved into the active examples above. Existing name retained; full new identity and property-discovery showcase. |
| Childcare | New, stronger childcare example | Required category, separate from Ela Pame. The weak Little Stars design stays retired; develop a coherent nursery/childcare concept. |
| Healthcare | Psychologist / therapy practice | Future possibility requested by the user. Preserve in backlog; not yet a confirmed build. |

Working collection excluding Olio: six current concepts including the restored Luxe Realty, plus four additions = ten examples. A psychologist would bring it to eleven. Olio remains live only until its removal is confirmed. The user may add further restaurant/café brands.

Horizon Law and Serenity Yoga remain retired. The real Dr. George case study remains unchanged and is not counted among fictional examples.

## Homepage continuity

The homepage keeps a balanced four-card selection in English, Greek and Hebrew:

1. Nomad Coffee
2. Bella Salon
3. Dr. Elara Dental
4. Arcos Architecture, replacing Verde

All four lead to existing demos and preserve the originating homepage language on return. Keep the current two-column desktop / single-column mobile layout until the later gallery redesign. Do not add empty placeholders or links for future brands before those examples exist.

## Next working stage

Nomad Coffee, Bella Atelier, PulseGym and Arcos Architecture have been reviewed positively and released. Dr. Elara Dental has also been approved by the user in Preview, revised around a pure-white clinical identity, a particle-scan hero, magnetic buttons, an outside/inside tooth-condition explorer, visit preferences and an appointment-request demonstration. See [Dr. Elara considered care](elara-considered-care.md). Olio Deli is skipped and marked for likely removal as of 9 October. Luxe Realty is now the active Preview rebuild: a fast photographic reel, multi-select dropdown filters, visible feature tags, a separate price/size sort capsule and animated browsing cards; no enquiry form or e-commerce. Incoming brands still depend on their approved identities.

Develop one brand/example at a time, starting with an available approved brand brief and the user's component references. Fish restaurant is a proposed first project, not a locked order. The new hospitality and childcare identities should not be invented merely to fill the roadmap. On 9 October the user explicitly authorised reusing Luxe Realty and creating its complete new identity.

The initial audit's requirements still apply: coherent branded imagery, specific content, a useful signature interaction, mobile navigation, accessible/reduced-motion behaviour, clear fictional-demo context, QA, then Preview review before proceeding to the next example.

## Verification for this revision

- TypeScript passed; production build rendered 97 canonical pages and seven demos with zero errors and zero SEO audit issues.
- All three galleries now have the same seven entries, including restored Luxe and paused Olio. All three homepages retain four valid example destinations with localized return paths.
- Browser check: the desktop homepage remains a balanced 2 × 2 grid; Arcos opens and closes back to the homepage. Hebrew at 390px has all four localized destinations and no document overflow.
- Full suite: 292 passed; the same eight pre-existing failures recorded in the first audit remain. No new test failures.

## Standalone showcase rule (8 October 2026)

Each dummy website must demonstrate a distinct brand, typography, page composition and signature interaction. Do not recolour or reuse the previous example's structure. Check existing display/body font choices before selecting the next pairing; user explicitly wants different fonts across examples. Match purposeful 21st.dev components to the business, and record the exact references and implementation.

Current font inventory: Nomad uses locally named Nomad Condensed (Barlow Condensed) with Arial; Bella uses Melodrama/Switzer; PulseGym uses Barlow Condensed/Barlow; Arcos uses Syne/IBM Plex Sans; Elara now uses Sora/Source Sans 3; Luxe now uses Bricolage Grotesque/Manrope; paused Olio uses Playfair Display/Lato. Elara's former Hanken Grotesk/Newsreader pairing is retired. Preserve existing approved demos in this task; apply the distinctiveness rule to subsequent work.

## Service-scope correction (9 October 2026)

DM Labs does not currently offer e-commerce. Do not include carts, checkout, payments or purchase flows in new showcase concepts. Stop the proposed Olio shopping rebuild; no Olio code or gallery changes were made. The user said likely removal, so record retirement intent without silently deleting it. Olio shares the Restaurants category with Nomad Coffee, which must remain for the existing and incoming hospitality examples. Remove a dedicated deli/food-retail category if one exists when retirement is confirmed, not the shared restaurant/café category.

## Luxe verification (9 October 2026)

TypeScript and 13 targeted preview/navigation/gallery tests passed. The full build rendered 97 canonical routes and seven demo wrappers, with zero rendering errors and zero SEO audit issues. Browser checks at 320, 390, 768 and 1440 pixels passed, including filters, sort, empty results, combined feature filters, listing tags, dropdown dismissal and sorting, image load recovery, automatic and manual hero changes, removal of saved collections and comparison, and EN/EL/HE return-scroll restoration. The broader suite has known unrelated historical failures and was not rerun for this scoped example rebuild.
