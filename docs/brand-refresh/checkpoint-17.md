# Checkpoint 17: homepage video cards and punctuation

29 September 2026. Preview only on `codex/brand-refresh`. The user paused the roadmap to make the homepage more visual, clarify the introduction player and remove em dashes from website copy.

## Homepage

- Introduction player now has a bright lavender/cyan frame, a finite light pass on entering view and a prominent centered play control. Removed the language, duration and summary beneath it. The complete original introduction and its click-to-load desktop/mobile sources are unchanged.
- Replaced six text-heavy service entries with numbered light video cards. Closed cards show short localized teasers; opening reveals the existing full description and service link. Wide desktop layouts expand on mouse hover, with click, keyboard and Escape support. Narrow layouts use tap controls, avoiding hover-triggered layout shifts. Only one card opens at a time.
- Rearranged the homepage process into a heading beside an ordered vertical sequence, retaining all five visible explanations. Pricing and team layouts are unchanged. Supplied dark backgrounds remain throughout the surrounding homepage.
- English, Greek and Hebrew use the existing locale typography roles, with RTL ordering and arrows for Hebrew. The new collapsed card behavior is explicitly requested for these homepage cards; it does not change the default-open preference for service-page scope and FAQs.

## Media and motion

Six supplied light videos provide the design, mobile, search, speed, care and delivery card visuals. Their black letterboxing was cropped; each decorative web excerpt is 4.5 seconds, 960 by 364, H.264, 24fps, without audio, and has fast-start metadata. Files range from 148 to 366 KB, plus WebP posters totaling about 113 KB. Original files remain unchanged on the Mac.

Clips are hosted as separate static URL assets on the Vercel Preview CDN. No Blob store, production asset or external dependency changed. Initially all card videos have no source. Opening a card attaches only its clip, plays it once when visible, pauses outside view or when the tab is hidden, and unloads on close. Reduced-motion and data-saving preferences retain still posters. CSS transitions and the introduction frame pass also respect reduced motion.

## Copy

Removed em dashes from user-visible copy, metadata and the included demo site. Replaced punctuation according to the sentence or label, with a multiplication cross for excluded pricing items while retaining their accessible text. Commercial values and scope are unchanged. Code comments and historical documentation are outside this copy-only request. A source-level check prevents reintroducing em dashes into website strings, templates and JSX text.

## Verification

TypeScript and 241 tests in 40 files pass. Full build prerenders 91 canonical routes, 11 demo routes and the static 404 without errors. A scan of all 114 generated HTML files, including directly served demos and metadata, finds no em dashes in visible copy. Media size/fast-start checks and decode validation pass for all six clips.

Local browser checks cover EN/EL/HE at 320, 768 and 1440px, plus focused 390px mobile checks. All 54 locale/width/card keyboard open-close cases passed, with no horizontal overflow or clipped descriptions. Desktop mouse hover, tap switching, keyboard Escape, service navigation, unique clip playback, finite playback and the introduction player's mobile source were checked. A narrow-screen hover/link interaction issue was fixed and retested. Greek headings, Hebrew RTL, the brighter player treatment and process number spacing were visually reviewed. No observed console errors.

Live Preview verification and unchanged main/production identities are recorded in the external checkpoint-17 QA and deployment notes. Physical-device and screen-reader testing remain part of the later finishing pass. The next maps/forms/social batch and broader roadmap work remain queued.
