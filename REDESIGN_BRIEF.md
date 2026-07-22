# DM-Labs.io Redesign Brief — v2.0 (22 July 2026)

## Brand
- Name: **DM-Labs.io** everywhere. Never "D&M Labs". Audit for ampersand form.
- Tagline: **Websites that work.**
- Logo: triangle play-button icon with cyan→blue→violet→blush gradient (officiallogo.png)

## Hard Rules
- No long em dashes (—) anywhere on the site
- Do NOT change pricing or promises
- No text baked into images (all copy is live HTML)
- No rounded corners on rectangular surfaces (border-radius: 0 default)
- Buttons are rectangular, not pills
- Chamfer (14px cut-corner via clip-path) on feature surfaces only — 1-2 max
- Blush (#E879F9) never as solid fill — gradient tail only
- One gradient accent per headline max
- Mobile is primary (65-75% traffic)
- prefers-reduced-motion: complete static site
- No WebGL on phones

## Design Tokens
```css
--mist: #EEF1F8; --cloud: #F7F9FC;
--ink: #0B1B36; --slate: #5A6B87; --slate-soft: #8B99B0;
--cyan: #22D3EE; --blue: #3B82F6; --violet: #8B5CF6; --blush: #E879F9;
--glass: rgba(255,255,255,.55); --glass-deep: rgba(255,255,255,.72);
--rim: rgba(255,255,255,.90); --hairline: rgba(11,27,54,.07);
--grad: linear-gradient(100deg,#22D3EE,#3B82F6,#8B5CF6,#E879F9);
--r-none: 0; --r-hair: 2px; --chamfer: 14px;
--ease-out: cubic-bezier(.22,1,.36,1);
--t-fast: 180ms; --t-base: 320ms; --t-slow: 700ms; --t-reveal: 900ms;
```

## Typography
- **Satoshi** (900/700/500/400) — headlines, body
- **Space Mono** (400/700) — eyebrows, labels, metadata, buttons, mono ticker
- Google Fonts CDN for dev: Space Mono + Space Grotesk
- Satoshi from fontshare CDN (dev only; self-host for prod)
- Space Mono for: eyebrow labels, numbering, metadata, window filenames, button labels
- Never Space Mono for: body copy, headlines, anything >8 words, anything <11px

## Type Scale
- Display XL (hero): Satoshi 900, clamp(2.4rem,6.6vw,5.6rem), -.03em, .94 leading
- Display L (section): Satoshi 900, clamp(1.9rem,4.4vw,3.4rem), -.028em, 1.02
- Display M: Satoshi 700, clamp(1.5rem,2.6vw,2.1rem), -.022em, 1.1
- Body L: Satoshi 500, 1.0625-1.1875rem, 0, 1.65
- Body: Satoshi 400, .95rem, 0, 1.62
- Accent: Space Mono 400, 11px, .2em, uppercase, text-indent:.2em

## Homepage Sections
[00] HERO — video scroll scrub (currentTime approach) OR image sequence canvas
[01] PROOF BAR — mono ticker: availability, delivery time, stack
[02] CAPABILITIES — glass panels demonstrating claims
[03] WORK — four-up preview grid (2×2, 16:10, gap 2px, sharp edges)
[04] PROCESS — horizontal pinned 5-step track DAY 01→DAY 14
[05] TEAM — AI-leverage story, not headshots-and-bios
[06] PRICING — deliberately still, no animation
[07] CTA — full-bleed, single action, magnetic button
FOOTER — Space Mono annotation, coordinates, WhatsApp

## REMOVE from current site
- Mesh gradients
- Duplicated team cards
- Stats row (5★ / 100% / ∞)
- Industries grid

## Blog System (§9.4-9.5)
- Desktop metaphor: icon grid (5 cols desktop / 3 tablet / 2 mobile)
- Menu bar: DM-LABS.IO / BLOG, post count, filter
- Dock: ALL · GUIDES · SEO · CASE NOTES
- Icon anatomy: glass file icon 96×96, title (Satoshi 500 15px, 2 lines max), meta (Space Mono 11px)
- Every icon is a real <a href> to canonical URL
- Window system: .win chrome, sharp, title bar with progress bar
- Post window: 62-68ch measure, Satoshi 400 18px, 1.75 leading
- /blog/all plain list always exists (SEO escape hatch)

## Assets Inventory
### Uploaded files:
- officiallogo.png — 2000×2000, triangle play-button logo, cyan→violet gradient
- dml-a01-hero-base-field-2560x1440.webp — light atmospheric field (cool lavender/cyan)
- dmlabshomepagevideo.mp4 — hero video for scroll scrub
- Wide banners (2048×720, 128:45): 10 files — iridescent wave/light leak atmospheres
  - ChatGPTImageJul22,2026,11_33_29AM(1).webp through (10).webp
- Wide banners (2048×682, 3:1): 3 files — similar atmospheric
  - ChatGPTImageJul22,2026,11_30_22AM(3).webp, (4).webp, (10).webp
- Square PNGs (1254×1254): 8 files — decorative glows, orbs, light effects (transparent bg)
  - ChatGPTImageJul22,2026,11_22_34AM(1).png — radial cyan/violet bloom glow
  - ChatGPTImageJul22,2026,11_22_34AM(2).png
  - ChatGPTImageJul22,2026,11_22_36AM(4).png
  - ChatGPTImageJul22,2026,11_22_36AM(5).png
  - ChatGPTImageJul22,2026,11_22_37AM(6).png
  - ChatGPTImageJul22,2026,11_22_37AM(8).png
  - ChatGPTImageJul22,2026,11_22_37AM(9).png
  - ChatGPTImageJul22,2026,11_22_38AM(10).png
- Portrait PNG (1024×1536): ChatGPTImageJul22,2026,11_30_20AM(1).png — person/team photo
- Landscape PNG (1448×1086): ChatGPTImageJul22,2026,11_30_22AM(2).png — team/office
- Square PNGs (1254×1254): 3 files — UI mockup/device frames (baked-in UI, decoration only)
  - ChatGPTImageJul22,2026,11_30_22AM(5).png
  - ChatGPTImageJul22,2026,11_30_23AM(6).png
  - ChatGPTImageJul22,2026,11_30_23AM(7).png
  - ChatGPTImageJul22,2026,11_30_24AM(9).png
- Wide PNG (1672×941): ChatGPTImageJul22,2026,11_51_42AM.png — wide mockup/device frame
- Square PNG (1254×1254): ChatGPTImageJul22,2026,11_30_23AM(8).png

### Asset rules:
- Wide banners: use at low opacity behind content, never full strength, never behind body copy
- Square glows: decorative, animate with CSS transforms on PNG
- Baked-in UI assets: decoration only, never real UI
- Grade pink-skewing assets cooler before use

## OG Image / Social Preview
- Current preview is bad — needs new OG image
- Logo + title overlaid, never baked into generated art
- Per-page OG images for blog posts

## VideoScrollHero Component
- Uses video currentTime scrubbing (not canvas frames)
- GSAP ScrollTrigger, pinned section
- CONFIG block at top for easy customization
- headline: eyebrow, title, titleAccent, body, cta, ctaHref
- accentGradient, ctaGradient
- headlineRevealAt: 0.78 (scroll progress)
- lerpFactor: 0.6, scrub: 0.8
- scrollLength: '+=300%'
- CRITICAL: never put CSS filter:blur on full-screen headline container
- Blur MUST be scoped to .headline-inner only

## Name Change Checklist
- [ ] All "D&M Labs" → "DM-Labs.io"
- [ ] WhatsApp prefill text
- [ ] OG tags / JSON-LD name field
- [ ] Footer
- [ ] Email references
- [ ] Social carousel assets (decoration only, note in code)
