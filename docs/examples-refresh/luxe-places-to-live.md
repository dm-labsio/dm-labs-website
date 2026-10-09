# Luxe Realty: Places to live

9 October 2026. Preview-only rebuild of the original Luxe Realty concept, explicitly authorised by the user. No e-commerce, payments, real listings, property enquiries or bookings are offered by this fictional example.

## Identity

Bricolage Grotesque 400–700 with Manrope 400–700. Graphite #202529, white #f7f8f8, silver #dce2e5, mist #e9edf0 and slate #657077. Rounded pill controls, a small arched-window wordmark device and clear photographic surfaces. The previous aubergine/citron palette, square buttons and underline hover treatments have been removed. All six approved photographs are preserved.

## Composition and interactions

The full-screen hero is now a six-frame photographic reel: exterior and interior views of each home. Frames advance every 1.4 seconds with a 420ms dissolve, leaving roughly one second to see each image. Image loading completes before committing a transition. Thumbnail selection and horizontal swipes hold a frame for closer inspection. Automatic motion stops on hover, focus, an open dialog, offscreen, hidden tabs or reduced-motion preference. Manual controls remain available with reduced motion.

The property listings now use six styled dropdowns: location, home type, bedrooms, price range, multi-select features and sorting (featured, price ascending/descending, floor area ascending/descending). Native radio/checkbox inputs preserve keyboard behaviour. Menus close on single selection, Escape or outside click; only one opens at a time. Multi-select features match every chosen tag, and applied-filter chips can be individually removed. Empty results and clear-all remain functional.

Each fictional listing has four visible sample feature tags, also present in its detail dialog. Horizon: sea view, private pool, private garden, terrace. Atelier: rooftop terrace, home office, terrace, city views. Pine: private garden, home office, terrace, private parking. All feature options match at least one home. The core photographs, hero reel and expanding interior gallery are preserved.

At the user's request, all saved-home buttons, comparison, portfolio/fan section, download, associated dialog and localStorage logic were removed. No enquiry form is present. The property details dialog supports Escape, focus return and image retry. Page anchors remain managed so returning from the dummy preserves the source gallery's scroll position.

## Component research and adaptation

- [Image Stream Hero by Ruixen on 21st](https://21st.dev/@ruixen.ui/components/image-stream-hero): evaluated its continually moving photographic presentation. Adapted the image-led motion principle into a legible full-bleed reel, rather than importing the original perspective corridor.
- [Image Fan Carousel by Ayushmaan Singh on 21st](https://21st.dev/@ayushmxxn/components/image-fan-carousel): informed an earlier portfolio treatment, now removed at the user’s request.
- [Accordion 03 by Ali Imam on 21st](https://21st.dev/@designali-in/components/accordion-03), and [UI Layouts image accordion](https://www.ui-layouts.com/components/image-accordions): expanding lifestyle panels, vertical on mobile, retained from the first version.
- [Expandable Cards by Aceternity](https://ui.aceternity.com/components/expandable-card): informed the property card to native detail-dialog pattern.
- These are original lightweight adaptations, not copied component source or newly installed libraries.

## Assets

Six original illustrations generated using the built-in image-generation tool. Exterior references guide each corresponding interior. These are illustrative paired views, not surveyed architecture or measured floor plans. Each is exported to 800px and 1600px WebP variants in `client/public/previews/luxe/assets/`: `coast`, `city`, `pine`, `coast-inside`, `city-inside`, `pine-inside`. Gallery cover: `client/public/media/examples/luxe/cover-v3.webp`, captured from the actual page. The source PNGs remain in the tool output directory. Final exact prompt set follows below.

## Integration and verification

Restored `luxe-realty` to the preview wrapper, server allowlist, prerender list and all three EN/EL/HE example galleries, with localized gallery copy and one shared current cover. The dummy itself is English. Other approved example designs are preserved. Olio remains paused, with possible removal recorded separately. Production requires a separate release decision.

QA script: `scripts/qa-luxe.mjs`; reports and screenshots: `../output/website-refresh/luxe/`. Covers 320/390/768/1440px, dropdown bounds and dismissal, every feature tag, combined filters and no matches, all sort orders, property photography and retry, hero motion, removal of saved controls, and EN/EL/HE gallery return-scroll behaviour. Physical phones and Safari are not claimed as tested.

## Coast

Use case: photorealistic-natural. Create an exceptional architectural property photograph, horizontal 3:2, for a fictional Greek real-estate brand. A distinctive contemporary coastal house near the Athens Riviera: two storeys of pale white mineral plaster, a very broad thin cantilevered upper floor, dark aubergine bronze window frames, floor-to-ceiling glazing. The LOWER LEFT of the image contains a textured white boundary wall and some softly planted grasses, centre-right the dramatic cantilevered house, a restrained rectangular pool in foreground right, distant blue-grey sea glimpsed at far right. NOT a courtyard house. Soft bright overcast Mediterranean afternoon, neutral cool whites, almost no hard shadows, no sun rays. A lived-in elegant terrace with two aubergine woven lounge chairs, striped pale cushions, a small silver outdoor table, understated planting. Shot by an architectural magazine photographer at human eye level, 28mm shift lens, perfectly straight verticals, natural stone imperfections, realistic water surface, generous space and striking strong horizontal lines. Photographic, not CGI/plastic/stock mansion. No people, cars, text, logos, artificial bloom, gold, excessive beige, harsh sun, mansion arches. White and aubergine architecture against sea and subtle greenery. Full bleed image, no borders. This is the main hero property named The Horizon House; aim for an arresting believable premium photograph.

## City

Use case: photorealistic-natural. Horizontal 3:2 editorial real-estate photograph of a striking contemporary penthouse terrace in Athens, a fictional property called The City Atelier. Camera stands on the roof terrace looking diagonally towards a wide sliding glass opening into a beautifully furnished loft living room. Distinctive oxidised aubergine painted steel frames, pale grey terrazzo floor, deep burgundy curved modular sofa inside, a round walnut dining table, thoughtful abstract framed art, stainless-steel low coffee table. Outside one generous square built-in planter with a small olive tree, two sculptural woven chairs and soft linen upholstery. Layered neighbouring Athens apartment blocks visible at far left beyond a simple steel balustrade, believable urban view, not a tourist postcard. Real inhabited home with a couple of books and one ceramic vessel, no clutter or unnecessary decor. Bright overcast neutral daylight, soft reflections in glass, natural materials and imperfections, straight vertical lines, architectural magazine photography, 35mm lens. Broad horizontal framing, balanced geometry and sophisticated burgundy/white/grey palette. Not a villa, no pool, no ocean, no arches, no people, no text/logos, no harsh shadows, no sun rays, no orange filter, no CGI gloss.

## Pine

Use case: photorealistic-natural. Horizontal 3:2 architectural magazine photograph of a fictional distinctive modern family house on a wooded plot in northern Athens, called The Pine Residence. Long low two-storey house with dark olive-green standing seam zinc upper cladding, lightly textured off-white brick lower walls, large square glazing and a simple broad flat roof. Mature Mediterranean pine trees naturally frame the house on the left and right. A wide pale gravel path, low native planting, outdoor dining table with four burgundy chairs beneath a restrained pergola. Glimpse a well-furnished living room through one clear large window: muted green sofa and warm oak shelves. Shot at human eye level with 35mm architectural lens, perfectly straight verticals. Soft cloudy morning with diffuse light and subtle contact shadows, verdant cool greens and dark wine accents, tactile materials, believable inhabited architecture. Exquisite but natural, not a sterile real estate render. No water/pool, no arches, no courtyard, no people, no text, no logos, no hard shadows/sun rays, no orange/sepia grading. An appealing private leafy home clearly different from a white coastal villa.

## CoastInside

Use case: photorealistic-natural. Create a SECOND architectural photograph of the EXACT SAME fictional coastal house in the reference. Preserve its white mineral plaster, dark aubergine bronze glazing frames, silver-white stone terrace, the two deep aubergine woven lounge chairs with striped cushions, rectangular pool and blue-grey sea beyond. New camera stands INSIDE the ground-floor living area looking outward through the broad sliding glazing towards that SAME terrace and sea. Interior is thoughtfully furnished with a muted off-white modular sofa at left foreground, walnut and brushed steel low table with two books, dark dining table glimpsed at right, pale stone floor and plain white ceiling. No generic empty room. Match the exterior geometry and weather: soft cloudy Mediterranean daylight, no harsh shadows, no sun rays. Realistic fine material detail, restrained styling, architectural magazine photograph 28mm lens, straight verticals. Landscape 3:2 full bleed. No people, text, logos, decorative arches, extra pool, courtyard, impossible window reflections, orange colour cast or CGI gloss. The exterior reference is the identity and spatial reference, not an image to paste on a wall.

## CityInside

Use case: photorealistic-natural. A second photographic view of the EXACT SAME Athens penthouse in the reference image. Now stand inside the living room and look diagonally past the SAME deep burgundy curved sofa and rounded brushed stainless steel coffee table to the SAME wide aubergine-framed sliding glass opening. Beyond it preserve the grey terrazzo roof terrace, the two woven chairs with pale cushions, the square aubergine planter with olive tree and layered Athens apartment roofs. Keep the simple white ceiling, walnut dining table and abstract wall art from the reference in the same design language. The exact same furniture, proportions, palette and soft cloudy daylight, photographed from an interior reverse angle with 35mm lens, no sun rays or hard shadows, no people. Lifelike architectural editorial photography, natural upholstery folds and authentic materials, fine detail, modestly lived in with books, no excessive decor. Horizontal 3:2 full bleed; no text, no logos, no pool or ocean, no arches, no CGI gloss. This is an alternative view of one consistent home, not a new apartment.

## PineInside

Use case: photorealistic-natural. Create a second architectural photograph inside the EXACT SAME fictional pine-garden house shown in the reference. Camera stands in its ground-floor living room looking towards the large square garden glazing. Preserve the muted olive-green modular sofa, warm oak shelving, low rounded coffee table visible through the reference window, soft off-white brick and white plaster walls, dark olive metal window frames. Beyond the glass show the same pale gravel garden and mature Mediterranean pines, with the burgundy outdoor dining chairs and simple pergola glimpsed to one side. Comfortable contemporary family interior with one textured rug, a couple of books and ceramics, tactile upholstery and natural timber, no sterile emptiness. Overcast cool morning soft daylight, no sun rays, no dramatic shadows, no amber lighting. Fine architectural magazine photography, straight verticals, 28mm lens. Horizontal 3:2 full bleed. No people, no text, no logos, no arches, no water or pool, no impossible reflections. Cohesive companion photograph, not a different house.


## Verification result for the first version

TypeScript passed; 13 targeted preview/navigation/gallery regression tests passed. Full build: 97 canonical routes, seven demo wrappers, zero rendering errors and zero SEO audit issues. The browser journey described above passed at all four widths, with no uncaught page errors. React review: the shared cover component is static, correctly sized, lazy-loaded and has decorative alt text; localized gallery data adds no hooks or global listeners.

## Revision verification, 9 October 2026

Browser checks passed at 320, 390, 768 and 1440px: no horizontal overflow; all six-frame manual controls; setting, bedroom and budget filtering; sorting and empty states; property galleries; shortlist comparison and persistence; portfolio download contents; Escape and restored body scrolling. Automatic movement, held manual selection, failed-image recovery and blocked storage passed. EN/EL/HE gallery entry and return preserve the original scroll position. No uncaught page errors or form POSTs. TypeScript and the 13 targeted navigation/gallery regression tests passed. Physical devices and Safari remain outside this verification.

Native Chromium touch simulation inside the parent preview also passed: horizontal hero swipe, mobile filtering, property details and adding a home to comparison.

## Filter-focused revision

The user approved the overall design and requested removal of all personal-collection/compare controls, plus dropdown filtering and sorting with useful sample tags. Implementation is scoped to Luxe and its localized example-card descriptions and cover. Preview only.

Verification for the filter-focused revision: TypeScript, all 13 targeted navigation/gallery tests and full prerender passed (97 canonical pages, seven previews, zero errors or SEO audit issues). Chromium checks passed at 320/390/768/1440px for every tag, combined/no-result filters, all five sort orders, dropdown bounds/dismissal, removed controls, photograph switching, failure recovery and EN/EL/HE return position. A phone-sized iframe check also passed native keyboard selection and touch filtering/sorting.
