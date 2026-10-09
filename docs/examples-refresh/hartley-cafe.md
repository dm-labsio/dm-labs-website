# Hartley Café & Bakery

Source: the user's HARTLEY-complete-library.zip, supplied 9 October 2026. All 123 archive entries extracted to the sibling workspace output/hartley-source/HARTLEY-library. Original assets are retained outside the public repository; web derivatives are in client/public/previews/hartley/assets.

## Approved identity

Use the supplied outlined Hartley logo, Rubik Black headings, Jost supporting copy and approved lettering artwork. Navy #082438, warm white #FAF7F2, dusty pink #DDB8AD, periwinkle #899ACA. Spotted pen-drawn dog and periwinkle illustrations. No replacement mascot, generic luxury serif, typewriter, decorative shadow, synthetic grain or gradient. Photography keeps its original colours. These are the final library's rules, taking precedence over earlier exploratory images in the shared conversation.

## Website demo

A standalone one-page English café experience, reviewed in Preview before production. This is the English-style café among the three incoming projects. Hospitality and the fish restaurant remain pending their assets. The gallery is called Our Work, with Website Demos as the category, in English, Greek and Hebrew. Existing /templates/ URLs and canonical relationships remain stable. No branding carousel is added in this phase.

- Kinetic poster hero: staggered coffee/cake/company lettering, floating cafe photography and original dog/flower illustrations. Cursor/touch parallax, ambient floating on mobile, explicit See the menu link, fixed accessible heading text, and reduced-motion fallback.
- Three illustrated menu chapters: coffee, bakes and tea. Keyboard tabs and page-turn controls update the photograph and menu together.
- Tea pairing selector now changes the large photograph, caption, tasting notes and food pairing together. On mobile the choices sit above the photograph, which stays visible after selection. Rapid selections cannot display stale images. The supplied afternoon-tea PDF remains downloadable.
- Cake-wrapping flip using the matching supplied packing photographs.
- Complete café photographs in a compact three-print gallery with scroll drift and hover tilt. No pop-ups or click-to-open behavior.
- Straight-edged double-rule buttons with rolling labels; menu and tea options use flat underlined controls. No capsule buttons.
- No e-commerce, real booking, submission, invented address or testimonial. The source loyalty offer is not activated.

## Component research

New reference patterns, not used in the prior demos:

- [Text Rotate / Landing Hero, Daniel Petho](https://21st.dev/@danielpetho/components/text-rotate/landing-hero).
- [Parallax Floating, Daniel Petho](https://21st.dev/@danielpetho/components/parallax-floating).
- [Text Roll, Julien Thibeaut](https://21st.dev/@ibelick/components/text-roll), adapted for button labels.
- [Animated Link, Ruixen](https://21st.dev/@ruixen.ui/components/animated-link), underline idea only, without arrows.
- [Book slider, Aaris Khan](https://21st.dev/@aarispathan15/components/book-slider).
- [Flip Gallery, Le Thanh](https://21st.dev/@minhxthanh/components/flip-gallery).

Reviewed public descriptions and usage examples. Implemented original native HTML/CSS/JavaScript adaptations rather than copying unaudited source. No paid or unlicensed component source incorporated. The menu is a compact perspective transition, not the full third-party book simulator. See the public SOURCES.txt.

## Shared copy cleanup

Our Work / Η δουλειά μας / העבודות שלנו names the page and navigation. Website Demos / Demo ιστοσελίδων / אתרי הדגמה names the interactive examples. Removed redundant fictional-brand-by-DM credits from all six previous demo headers/footers. Functional notices at demo booking actions remain to explain that nothing is sent.

## QA

TypeScript and 22 targeted typography, gallery and preview-navigation tests passed. Full production build: 97 canonical pages, seven demo wrappers, zero rendering errors and zero SEO audit issues. Hartley browser checks passed at 320, 390, 768 and 1440px: no overflow or uncaught errors, loaded visible imagery, hero menu navigation, menu keyboard controls and paging, tea choice updates, PDF download, parcel flip, complete non-clickable photographs and straight-edged controls. Automatic motion and reduced-motion fallback verified. EN/EL/HE gallery checks verify the renamed headings, seven cards, Hartley wrapper interaction/download and exact scroll restoration. Existing Elara journeys still pass from all three homepages and galleries. These are browser viewport checks, not physical-phone tests. Main is unchanged; review in Preview first.

## Compact-layout revision

User feedback: shorten sections, replace the unclear hero carousel, remove photo dialogs and all capsule buttons. Revised 9 October 2026. At 390px the page measures about 4,490px versus 5,969px previously; at 1440px, 4,814px versus 6,685px. Original source assets and branding are unchanged. Smaller spacing, shorter photo sections, compact headings and a three-photo gallery reduce scrolling while preserving readable menu copy. The menu, tea selector, original menu PDF and parcel reveal remain functional.

Revision browser QA: 320/390/768/1440px, no horizontal overflow or uncaught errors, all visible imagery loaded; hero CTA scroll/focus, menu tabs/keyboard/paging, tea options, PDF contents, parcel toggle, complete gallery aspect ratios and absence of modal interactions verified. Automatic shutter sequence, reduced-motion stop and offscreen pause verified.

## Kinetic hero and tea selection revision

The user approved the rest of the page but asked for a stronger, previously unused hero and meaningful tea-choice feedback. The paired slideshow is retired. The new hero adapts Fancy Components' rotating typography and parallax-floating composition in original vanilla JavaScript/CSS; no upstream implementation or dependencies were copied. New tea photos were generated with the built-in image_gen tool, using the supplied cafe photograph as a visual reference. Full prompts and original images: ../output/hartley-tea/prompts.json and breakfast.png, grey.png, mint.png. Published derivatives: client/public/previews/hartley/assets/tea-breakfast.webp, tea-grey.webp, tea-mint.webp.

QA includes four responsive widths, all three tea choices and rapid switching, photo visibility after mobile selection, clear hero CTA and rotating-word fit, cursor parallax, reduced-motion and offscreen pause, and the existing gallery/menu/download/parcel flows. Main remains unchanged.
