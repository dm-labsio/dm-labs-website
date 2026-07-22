# DM-Labs.io v2.0 Redesign Reference

## Brand Name
- New name: **dm-labs.io** (lowercase, with dot)
- Old name: D&M Labs (never use this anywhere)

## Design System Tokens (index.css)
```css
--ink: #0F1118        /* near-black background */
--mist: #EEF1F8       /* off-white surface */
--cyan: #00E5FF       /* accent cyan */
--blue: #4D7EFF       /* accent blue */
--violet: #8B5CFF     /* accent violet */
--blush: #FF6B6B      /* accent blush */
--muted: #6B7280      /* muted text */
--hairline: rgba(15,17,24,0.08)  /* borders on light */
--grad: linear-gradient(135deg, #4D7EFF 0%, #00E5FF 50%, #8B5CFF 100%)
```

## Typography
- Display/headings: **Satoshi** (900 weight, -0.03em letter-spacing, 0.96 line-height)
- Labels/mono: **Space Mono** (uppercase, 9-10px, 0.15-0.2em letter-spacing)
- Body: **Satoshi** (400-500 weight, 1rem, 1.65 line-height)
- CSS class `.mono` = Space Mono uppercase label style

## Geometry
- **ZERO border-radius** on all rectangular surfaces (cards, buttons, panels)
- 2px gap between grid items (not padding)
- Glass panels: `background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(12px)`
- Grain overlay: `.grain` pseudo-element with SVG noise

## Buttons
- Primary: `background: var(--grad); color: #fff; padding: 16px 40px; font-family: Space Mono; font-size: 10px; letter-spacing: .2em; text-transform: uppercase; border-radius: 0`
- Ghost: `border: 1px solid rgba(255,255,255,.3); color: #fff; same padding/font`

## Section Patterns
- Dark sections: `background: var(--ink)` with grid overlay
- Light sections: `background: var(--mist)`
- Section padding: `100px 0` (desktop), `60px 0` (mobile)
- Eyebrow label: `<p class="mono" style="color: var(--cyan)">LABEL</p>`
- H2: Satoshi 900, clamp(1.9rem, 4.4vw, 3.4rem), -0.028em, color #fff (dark) or var(--ink) (light)

## Asset CDN URLs (uploaded Jul 22 2026)
- Logo (no text): uploaded as officiallogo.png
- Hero video (all-keyframe): uploaded as hero-scrub.mp4
- Hero base field: dml-a01-hero-base-field-2560x1440.webp
- Wide banners (2048x720): 10 files uploaded
- Square assets (1254x1254): 10 files uploaded
- Portrait asset (1024x1536): 1 file uploaded
- Landscape 4:3 (1448x1086): 1 file uploaded
- Wide landscape (1672x941): 1 file uploaded

See ASSET_URLS.md for full CDN URLs.

## Rules
1. NO em dashes (—) anywhere
2. NO rounded corners on rectangular surfaces
3. NO "D&M Labs" - always "dm-labs.io"
4. DO NOT change pricing: Launch €299, Growth €749, Pro €1,499, Enterprise from €1,499
5. DO NOT change copywriting/promises
6. Blog post content preserved - only visual chrome updated

## Location Pages (EN)
- /web-design-paphos
- /web-design-limassol
- /web-design-nicosia
- /web-design-cyprus
- /web-design-crete
- /web-design-restaurants-cyprus
- /web-design-thessaloniki

## Location Pages (EL)
- /el/web-design-paphos (WebDesignPaphos in el/)
- /el/web-design-limassol
- /el/web-design-nicosia
- /el/web-design-thessaloniki
- /el/web-design-crete
- /el/web-design-cyprus

## Pages Already Redesigned
- [x] index.css (design system)
- [x] client/index.html (fonts, OG)
- [x] Layout.tsx (nav + footer)
- [x] Home.tsx (all 8 sections)
- [x] Blog.tsx
- [x] Services.tsx
- [x] Pricing.tsx
- [x] Contact.tsx
- [x] FAQ.tsx
- [x] Process.tsx
- [x] Templates.tsx (hero, filter, cards, CTA)

## Pages Still To Do
- [ ] BlogPost.tsx (reading window)
- [ ] WebDesignPaphos.tsx
- [ ] WebDesignLimassol.tsx
- [ ] WebDesignNicosia.tsx
- [ ] WebDesignCyprus.tsx
- [ ] WebDesignCrete.tsx
- [ ] WebDesignRestaurantsCyprus.tsx
- [ ] WebDesignThessaloniki.tsx
- [ ] HomeEl.tsx
- [ ] All other El pages (Services, Pricing, Contact, FAQ, Process, Templates, Blog)
- [ ] All El location pages
- [ ] NotFound.tsx
- [ ] Privacy.tsx, Terms.tsx, CookiePolicy.tsx
- [ ] OG image update
