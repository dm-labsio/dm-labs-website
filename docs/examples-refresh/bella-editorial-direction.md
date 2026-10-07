# Bella editorial brand and photography direction

7 October 2026. Discussion brief for the second fictional showcase. No website edits or deployment in this phase. Hair and colour atelier is the recommended scope; a full beauty studio remains an alternative pending the user's preference.

Bella should demonstrate an ownable identity, relevant imagery and useful interaction. The recommendation is an independent editorial hair studio, with expressive typography, aubergine and porcelain surfaces, precise service information and a small acid-yellow accent. The existing rose/gold, Cormorant Garamond/Lato treatment is replaced in the proposed direction.

## Brand proposals

| Direction | Palette | Character |
| --- | --- | --- |
| Recommended editorial atelier | Aubergine #321D2F, porcelain #F3EFE7, pale lilac #C9BED3, acid yellow #D4DF66 | Confident and cultured, with a sharper fashion accent. Use aubergine and porcelain for most surfaces; lilac for occasional panels and yellow sparingly for selected states. |
| Cooler alternative | Ink #22262A, oyster #ECE8DF, silver blue #B8C8D3, vermilion #AF3D28 | Architectural, restrained, slightly industrial. |

These are art-direction proposals, not validated colour-contrast specifications. Body copy and controls require contrast checks against their actual backgrounds. Warm, believable skin tones should remain independent of the UI palette.

Working name: Bella Atelier. Keep the existing Bella Salon route and collection identity until a name is chosen. Avoid generic claims such as timeless elegance, elevate your beauty and where luxury meets self-care. Describe the actual work: precision cuts, dimensional colour, texture and finishing. No decorative numbering, arrow buttons or capsule icons.

## Typography shortlist

- [Gambarino by Théo Guillard through Indian Type Foundry](https://www.fontshare.com/fonts/gambarino): recommended initial display face. Its condensed proportions, unusual capitals and short descenders give it an editorial character. It has one regular style; do not synthesize bold or italic. Use for the wordmark and short large headings, not booking controls or body paragraphs.
- [General Sans](https://www.fontshare.com/fonts/general-sans): proposed reading and interface partner. Its role is to keep treatment details, durations, prices and forms straightforward.
- [Grand Slang by Nikolas Type](https://www.nikolastype.com/fonts/grand-slang/): stronger paid alternative for a more calligraphic, art-directed voice. Its mixture of serif and grotesque features has more personality than a standard fashion Didone. A suitable license is required before implementation; none has been purchased.

Fontshare lists Gambarino as closed source under its ITF Free Font License, not open source. Retain the applicable license when obtaining files. The published Gambarino language list and Grand Slang glyph specimen do not establish Greek or Hebrew support. Keep this concept in its existing English scope initially; if translated later, design and test language-specific companions rather than allow accidental fallback fonts.

Monotype's [beauty-brand typography review](https://www.monotype.com/resources/fonts-and-luxury-brands-beauty) illustrates how similar established beauty brands can become through repeated type choices. The proposed pairings are our design judgement, not a claim that a particular font proves AI authorship.

## Selected 21st components and adaptations

| Component | Intended purpose | Bella adaptation |
| --- | --- | --- |
| [Hover Image List by Edu Calvo](https://21st.dev/@educalvolpz/components/hover-image-list) | An editorial list of Cut, Colour and Finish that reveals relevant work | Keep each service's description, starting price and duration visible. Add image changes on desktop hover and keyboard focus. On touch, show the active image inline and use explicit tap selection. Remove cursor skew, stock icons and decorative effects. |
| [Gallery Modal Accordion by UI Layout](https://21st.dev/@uilayout.contact/components/gallery-modal-accordion) | Expand a selected look into a large view with useful details | Use a stable editorial grid rather than narrow hidden slivers. A tap/click opens the image and its cut, colour and upkeep notes. On mobile use a full-width dialog with a visible Close control and predictable focus return. No horizontal scrolling required. |
| [Appointment picker by Origin UI](https://21st.dev/@originui/components/calendar/appointment-picker) | A complete interactive booking demonstration | Connect service choice, duration, illustrative availability and a review summary. Changing service or date must clear incompatible time choices. End in a clearly labelled demo confirmation. Do not send real bookings or collect unnecessary contact data. |
| [Editorial Collage Hero by felipemenezes098](https://21st.dev/@felipemenezes098/components/hero-04) | A reference for image hierarchy and an editorial opening | Use one dominant campaign photograph and one supporting detail, with substantial whitespace. Rework the composition for Bella; omit the stock soft wash, duplicate calls to action and heavy overlap on small screens. |

Reviewed the public component descriptions and usage examples, plus 21st's page metadata through its read-only page tool. Full Gallery Modal Accordion source is locked; it has not been audited or copied. Its metadata reports `no-license`, so use it only as interaction inspiration unless reuse permission is established. Hover Image List metadata reports MIT; Origin UI's calendar page lists MIT. Recheck license files for the exact component version before copying code. The collage hero's license remains unverified.

The existing demo is standalone HTML. Adapt suitable interaction patterns to its architecture, or deliberately adopt a component implementation after reviewing its dependencies. Do not introduce Next.js merely because a component demo uses it.

## Useful showcase behaviour

The primary journey is lookbook → select a look → matching service → choose a sample appointment → review demo booking. A selected look can prefill the appointment summary. A short consultation helper could ask about desired change, styling time and maintenance preference, then show an editable suggested service with a clear reason. It should use transparent rules, not pretend to assess hair or skin from a photograph.

Concentrate motion in opening a look and changing service selection. Keep native scrolling, text legible during transitions and reduced-motion alternatives. Avoid continuous image movement, cursor-dependent tasks, hidden service information and autoplay carousels. Mobile interactions must have explicit touch equivalents.

Do not build generated before-and-after results as evidence of salon performance. If a style comparison is later useful, label it as two fictional styling concepts and preserve the same person's identity, viewpoint and lighting.

## Research basis and limits

- [NN/g Photos as Web Content](https://www.nngroup.com/articles/photos-as-web-content/) distinguishes relevant, informative imagery from decorative filler. For Bella, a close view of a haircut, hair texture or a working tool should explain a service. This does not demonstrate that synthetic images earn the same trust as real client photography.
- [NN/g Icon Usability](https://www.nngroup.com/articles/icon-usability/) supports visible labels when an icon's meaning is uncertain. Use service names and actual work imagery rather than generic scissors, sparkle and leaf badges.
- [Webflow's 2026 design trends](https://webflow.com/blog/web-design-trends-2026) is an industry perspective on visual differentiation, not a controlled AI-detection study. Our criteria are specificity, hierarchy and consistency rather than a blacklist of colours or fonts.
- [Adobe's realistic-photo prompt workflow](https://helpx.adobe.com/nz/firefly/how-to/generate-realistic-photos.html) recommends references and explicit direction for action, composition, lighting and material detail. These are useful art-direction principles across tools; results must still be checked in the actual generator used.
- [Adobe's image prompting guidance](https://community.adobe.com/p/firefly-image-guide) separates subject, style references and composition, and warns against conflicting controls and prompt instructions. Keep the prompt internally consistent and edit one variable at a time.
- [Adobe's portrait-lighting guide](https://www.adobe.com/creativecloud/photography/discover/portrait-lighting.html) describes the effects of light placement, diffusion and the balance between main and fill. Use coherent light direction and exposure rather than contradictory cinematic buzzwords.
- [Adobe Stock's authenticity guidance](https://adobestock.adobe.com/rs/269-YNG-601/images/2022-Summer-Call-for-Content.pdf) advises against removing distinctive permanent features through retouching. For our fictional models, preserve stable facial identity, natural skin variation and age rather than giving every person one polished face.

No prompt can guarantee an image is indistinguishable from a photograph. Lens and exposure terms are visual guidance, not real capture metadata. High resolution does not fix implausible anatomy, inconsistent lighting or weak art direction.

## Asset bank

Start with three proof assets before generating the full set: campaign portrait, hair-detail photograph and studio still life. Review them together at full size and inside the intended mobile crops.

Target first complete set: eight original images.

1. Campaign portrait with separately composed landscape and portrait crops. One adult fictional subject, distinctive cut, quiet pose and negative space for the headline.
2. Second look on a different adult fictional subject with a different age, hair texture and appearance, while retaining the campaign's light and colour treatment.
3. Detail of the first subject's cut, preserving face, colour, parting and clothing from its reference.
4. Detail of the second subject's colour and texture, preserving identity and geometry.
5. In-progress service image showing one simple, mechanically credible action.
6. Working-studio interior with repeatable materials: aubergine lacquer, brushed steel, warm plaster and linen.
7. Tools-and-materials still life for the service selector.
8. Brand object photograph for the case study: appointment card, comb sleeve and paper wrap. Apply exact identity artwork after the photography, rather than trust generated small lettering.

These are generated concept assets for a fictional studio. Do not describe them as actual clients, staff, premises or treatment outcomes. Store original outputs, selected exports, generation prompts, reference IDs, crop/focal-point notes and intended placement. Generate mobile compositions deliberately instead of cropping through faces, hairstyles or hands.

## Photography acceptance criteria

- Every frame has a purpose: show the cut, the colour, the texture, the service or the setting.
- Describe a specific adult subject, pose and emotional state. Avoid the same symmetrical smiling model repeated across the bank.
- Preserve plausible pores, fine facial hair, hair roots, flyaways and variation in strand thickness. Avoid both porcelain smoothing and exaggerated universal pores or freckles.
- Choose one coherent lighting setup, consistent shadow direction and believable reflections. Keep the catchlights consistent with the source.
- Choose plausible depth of field. Critical hair detail should not dissolve into cosmetic blur; background defocus must not erase geometry around ears or tools.
- Check hands, fingers, ears, teeth, hairlines, scissor joints, comb teeth, contact points and mirror reflections. Avoid unnecessarily complex hand actions in initial proof assets.
- Keep wardrobe, jewellery, nail treatment and colour grading consistent across a sequence. References should control identity; text prompts alone are not sufficient.
- Reject waxy skin, repeated curl patterns, impossible wet shine, glowing hair edges, disconnected strands, fused jewellery, floating tools, illegible prominent text and architecture with inconsistent mirrors or furniture.
- Use restrained retouching, natural exposure roll-off and selective detail. Do not add grain or defects as a blanket shortcut for authenticity.
- Inspect at 100 percent and at actual card size. Review desktop and mobile crops. Correct one targeted issue per revision and preserve approved features.

## Prompt masters

These are initial art-direction prompts for discussion, not claims about assets already generated. Use the built-in image generation tool when generation begins. References should be the approved fictional subjects and brand assets, not an unlicensed campaign copied from another brand.

### Campaign portrait

Use case: photorealistic-natural. Asset type: editorial campaign portrait for fictional Bella Atelier, an independent hair and colour studio. An adult woman in her late thirties with a slightly asymmetrical jawline, dark brown eyes and a chin-length dark chestnut bob with a precise but natural edge. Seated in three-quarter view, shoulders relaxed, gaze just beside the lens, lips at rest; no advertising smile. Plain charcoal cotton top, no jewellery. Quiet warm-plaster studio wall with space on the left for live website typography. A large diffused window at camera left and gentle negative fill at right; believable soft falloff and consistent eye catchlights. Eye-level portrait, an 85mm-equivalent field of view and moderate depth of field: the eyes and front outline of the haircut are sharply resolved, with the background gently separated. Natural skin tone variation, restrained pores and fine facial hair, individual strands, roots and a few flyaways. The haircut is the subject. Porcelain and aubergine environment accents, neutral skin rendering. Understated fashion editorial, restrained retouching. No waxy skin, exaggerated freckles, glamour glow, extreme bokeh, hair halos, plastic shine, text, logos or watermark. Landscape 3:2, composed for a separate portrait adaptation rather than assuming a centre crop.

### Matching haircut detail

Use case: identity-preserve. Edit/reference input: approved Bella campaign portrait. Create a new close side/back crop documenting the same bob's line at the nape. Preserve the subject's identity, hair colour, density, parting, garment and window-light direction. Show plausible individual strands, a few natural flyaways and a believable transition from hair to skin. The nape and lower cut line are in focus; the rest falls away gradually. No hands, new jewellery, changed face, increased gloss or skin smoothing. Warm neutral colour, restrained contrast. Portrait 4:5. This is a second view of the same fictional look, not a before-and-after transformation.

### Studio still life

Use case: photorealistic-natural. Asset type: editorial detail for a fictional hair studio's service section. A dark aubergine acetate wide-tooth comb, one pair of closed stainless-steel hairdressing scissors with physically correct finger rings and pivot, a neatly folded off-white linen towel and an empty brushed-steel mixing bowl on a warm-grey worktop. A restrained, functional arrangement after preparation for a client, not floating product advertising. Diffused daylight from camera left, soft consistent shadows and credible reflections. Three-quarter close view, 50mm-equivalent perspective, enough depth of field to understand the tools. Fine wear on the steel, linen weave and subtle acetate translucency; surfaces clean but not digitally perfect. No hair clipping confetti, plants, flowers, candles, marble pedestal, fake lettering, watermark or oversized highlights. Landscape 3:2 with a clear crop-safe centre.

### Supporting illustration option

Use illustration only where it clarifies something photography cannot: a consistent three-view line study of a bob's outline, or a simple diagram explaining colour placement. Use one restrained ink weight and an actual hair-shape reference. No decorative female-face line-art badge, random sparkles or stock leaf emblem. A vector-native diagram should remain vector-native and be checked against the explanation it accompanies.

## Next review

Review the hair-only versus full-beauty scope, the aubergine palette and the Gambarino versus Grand Slang personality. Then create the three proof assets and a small typographic composition before rebuilding the page. All implementation and deployment remain Preview only.

## Implemented first preview, 7 October 2026

The user asked to stop expanding the generated asset bank and build the demo, with greater emphasis on hair. The first face portrait and its mobile variant are not used. The opening uses the curly colour detail; the lookbook uses the curly portrait and bob detail. The working identity is Bella Atelier on the unchanged bella-salon route.

The implemented palette is aubergine, porcelain, lilac and a restrained acid-yellow accent. Gambarino Regular and General Sans 400/500/600 are served unchanged from the official Fontshare CDN under the ITF Free Font License. Official source and license links are recorded in the preview's SOURCES.txt. There are no new dependencies or externally requested images. Font files use the official Fontshare CDN to avoid redistributing font binaries in the repository; system fallback fonts remain available if that host cannot load.

The 21st.dev references informed original native HTML/CSS/JavaScript interactions: service rows update relevant photography on desktop hover/focus or touch selection; the lookbook opens a native dialog with portrait/detail switching; selecting a look carries its matching service to the appointment section. The appointment demo uses a bounded calendar, sample hours that account for service duration, invalid-slot reset, review and a clearly fictional confirmation. No messages, payments or real bookings are sent. Native dialogs, keyboard focus restoration and reduced-motion alternatives are included. Image transitions, hover treatments and viewport reveals are brief and do not take over scrolling.

Verification: scripts/qa-bella.mjs checks 320, 390, 700, 768, 1024 and 1440px widths, fonts and image requests, no horizontal overflow, lookbook detail switching and Escape focus return, service preview selection, appointment selection, invalidation, review, reset and the actual iframe wrapper route. Local run passed all views with no page errors or asset failures. Booking boundary checks cover past dates, Sundays, invalid dates, the booking horizon and service duration versus closing time. The repository production build completed, with link integrity passing and 97 canonical pages plus six previews prerendered, zero SEO audit issues. The existing main-app bundle-size warning remains unrelated to this standalone demo.

Further image art direction can be refined against this functioning layout. The demo intentionally uses a small coherent image set instead of generating every possible section photograph before testing the composition.
