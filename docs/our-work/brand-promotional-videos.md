# Our Work: brand and promotional videos

## Direction and sources

Use **Brand & promotional videos**, covering brand stories, social reels and campaigns. This describes the purchased output without presenting the production tool as the service. This is terminology research, not a search-volume study.

Industry references:
- https://housesparrowfilms.com/services/promotional-videos/ (brand films, launches, campaigns)
- https://www.squaretwomedia.co.uk/brand-and-campaign-films (brand and campaign films)
- https://www.blackgrousemedia.com/services/videography (brand films, promotional videos, social reels)

Interaction reference:
- https://21st.dev/@0xUrvish/components/expandable-gallery
- https://uselayouts.com/docs/components/expandable-gallery

The production comparison uses the original expanding-gallery pattern. The October 10 Preview iteration instead exposes all eight films in a mixed-format grid, with related films adjacent. No upstream component source was copied. Covers retain their complete native aspect ratios, with a pointer cursor, subtle hover lift and visible keyboard focus rather than overlaid icons or labels. Desktop uses two justified rows. Mobile places the Sunday Boat landscape above two portrait films, then pairs AWAY's two formats and groups the three campaign reels in a compact row. A short translated hint below the gallery explains that the films are clickable without covering the artwork. A controlled Radix dialog supplies focus trapping, Escape and restored focus. Native video controls retain browser audio, seek and fullscreen behavior.

## Media inventory and covers

Supplied October 10, 2026. Eight user-provided films, four collections:
- Sunday Boat: social menu reel, 19.29 seconds; landscape brand identity film, 30 seconds. These are distinct films, not interchangeable crops.
- Hartley: portrait café brand story, 48.53 seconds.
- AWAY: portrait hospitality edit and landscape edit, 15 seconds each.
- DM Labs: Boo, 12.6 seconds; Trick or treat, 14.2 seconds; Scarier than Halloween, 16.8 seconds. Grouped as promotional campaign work, not a current discount CTA on this page.

Web H.264/AAC copies preserve complete duration, sound and framing, with MP4 metadata moved to the front for progressive playback. Hartley is 720 × 1280; other copies retain the supplied dimensions. All originals remain untouched in Downloads. Combined web copies are about 40.3 MB, versus about 122 MB supplied. Only the selected film downloads; the initial gallery loads no video.

The mixed grid uses each film's optimized WebP poster, rather than four project composites. Sunday Boat's landscape cover is a clear final brand frame at 29.8 seconds, replacing a blurred transition frame with a versioned URL to respect immutable caching. Hartley's café moment, AWAY's hospitality artwork and DM Labs' campaign frames remain from the supplied films. No new generated imagery. Covers and full playback always use object-fit: contain. Each cover opens its exact film; the existing related-film options remain inside the viewer.

## Navigation, languages and discovery

- EN, EL and HE copy; RTL layout, original English film artwork retained.
- Opening a film adds `?film=project&clip=clip`; Back closes the viewer. Closing returns to the same page position and restores focus. Format/clip switches replace the viewer's history entry.
- Deep links open the selected clip. Invalid projects safely leave the gallery visible; invalid clips fall back to the project's first clip.
- One video exists at a time. Closing, changing clips, leaving the page or hiding the tab stops old playback.
- Page titles/descriptions include video. Existing canonical, hreflang and locale indexing policy remain intact.
- Each film has truthful VideoObject metadata: supplied title, description, duration, actual dimensions, thumbnail and first-party content URL. Upload date represents first addition to this portfolio on October 10, 2026. A portfolio gallery is not a dedicated watch page; no rich-result eligibility or ranking is promised.

## QA

`node scripts/qa-work-films.mjs` exercises all eight videos at desktop and mobile widths in all three languages, unloaded-by-default media, format switching, aspect ratios, playback, native controls, modal keyboard focus, history, scroll restoration, 320px RTL, direct linking and reduced motion. Build and the repository's SEO document audit remain required before release.

Release scope: Preview only for this iteration. Production and unrelated Arcos work are preserved.
