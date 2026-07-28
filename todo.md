# D&M Labs Complete Redesign — Todo

## Phase 1: Brand Foundation
- [ ] Upload D&M Labs logo to CDN
- [ ] Rewrite index.css with brand colors (#F6F6F4, #0F172A, gradient #5B8CFF→#6FE3FF→#8B5CFF)
- [ ] Set up Inter font with proper weights (Regular, Medium, SemiBold, Bold)
- [ ] Define spacing tokens (8px grid), radius system, animation timing variables
- [ ] Update index.html with new title "D&M Labs" and meta tags

## Phase 2: Generate Visual Assets
- [ ] Generate hero device mockup (laptop + phone with abstract website UI)
- [ ] Generate gradient mesh background for hero
- [ ] Generate floating triangle geometry SVG/PNG
- [ ] Generate ambient glow elements

## Phase 3: Navigation + Layout
- [ ] Glassmorphism sticky nav (rgba(246,246,244,0.75) + backdrop-blur)
- [ ] D&M Labs logo in nav
- [ ] Gradient CTA button "Get Started"
- [ ] Mobile hamburger with slide panel
- [ ] Dark footer (#0F172A) with brand identity

## Phase 4: Hero Section
- [ ] Left: headline + subtitle + dual CTAs
- [ ] Right: floating device mockups with parallax
- [ ] Background gradient atmosphere layers
- [ ] Floating triangle animation (20s+ loop)
- [ ] Trust strip below hero

## Phase 5: Homepage Sections
- [ ] Services grid (3 cards with icons)
- [ ] Process flow (4 steps with "You do / We do")
- [ ] Pricing comparison (Starter / Business / Maintenance)
- [ ] Business types grid
- [ ] Stats section
- [ ] Final CTA (dark section)

## Phase 6: Sub-pages
- [ ] Services page with new design system
- [ ] Process page with new design system
- [ ] Pricing page with new design system
- [ ] FAQ page with new design system
- [ ] Contact page with new design system
- [ ] Legal pages with new design system

## Phase 7: Motion System
- [ ] Scroll reveal animations (fade + 20px upward, 450ms)
- [ ] Card hover effects (elevation + shadow)
- [ ] Button hover (lift + glow)
- [ ] Nav scroll transition (opacity + blur)
- [ ] FAQ accordion (250ms smooth)
- [ ] prefers-reduced-motion respect

## Phase 8: QA
- [ ] Desktop QA all pages
- [ ] Mobile QA all pages
- [ ] All links working
- [ ] WhatsApp number correct (+972584928177)
- [ ] Email correct (dudeandmadame@gmail.com)
- [ ] Performance check

---

## Current Sprint: Bug Fixes + Content Updates (Mar 2026)

### Phase 2: Bug Fixes
- [ ] Industry bar on homepage: add left/right scroll arrows
- [ ] Modal desktop view: fix image cut/not responsive when viewed on mobile
- [ ] Process page: fix connector line z-index so it goes BEHIND icons, not over them
- [ ] Remove all 50/50 payment references — replace with upfront payment framing
- [ ] Footer: replace "Chat on WhatsApp" with link to /contact page

### Phase 3: UI Changes
- [ ] Templates page: change "Get This Template" CTA to "View Pricing" → /pricing
- [ ] Plan sticker colours: unified — one colour per plan (Starter=blue, Business=purple, Professional=teal)
- [ ] Add "Custom Website" blank template card — first position in ALL industries
- [ ] British English pass across all pages
- [ ] Contact form: wire up to send email
- [ ] Location: update to "Based in Europe & Worldwide Service"

### Phase 4: Pricing & Add-ons
- [ ] Restructure pricing: Starter €250 (1-page), Business €350 (3-5 pages, RECOMMENDED), Professional €450 (5-7 pages)
- [ ] Add-ons: Multilingual (2 lang €80 / 4 lang €150), Booking redirect €30, Pop-up €40, Accessibility audit €40
- [ ] Maintenance: Essential €39/mo, Premium €59/mo with full descriptions
- [ ] Free consultation — make clear everywhere
- [ ] Accessibility: UserWay widget free in all plans, full audit as €40 add-on
- [ ] Revisions: Starter 1 round, Business 2 rounds, Professional 3 rounds
- [ ] Pop-up: included in Professional, €40 add-on for others

---

## Current Sprint: Mar 31, 2026

### Fix homepage example cards
- [ ] Replace iframe-based HomepageTemplateThumb with static card mockups for all 3 featured templates
- [ ] Ensure Bella Salon and Dr. Elara Dental have clear hero imagery like Nomad Coffee

### Remove e-commerce/shop references
- [ ] Home.tsx Enterprise: remove e-commerce from feature text
- [ ] Services.tsx Enterprise: remove e-commerce from feature text
- [ ] Pricing.tsx Enterprise: remove e-commerce from feature text + FAQ
- [ ] Olio Deli card: Shop -> Menu/Products, Shop Now -> Browse Products

### Remove calendar references from mini-sites
- [ ] Check pulse-gym.html Schedule references (keep - this is class schedule, not calendar widget)
- [ ] Check serenity-yoga.html Schedule references (keep - this is class schedule, not calendar widget)

### Rename Templates to Examples everywhere
- [ ] Layout.tsx nav link
- [ ] Templates.tsx page hero text
- [ ] Templates.tsx waMessage strings
- [ ] Templates.tsx hover text and copy
- [ ] Home.tsx any visible template references

### Full QA audit
- [ ] All 11 preview URLs load
- [ ] Industry filters work
- [ ] Modal and full preview flow
- [ ] No em/en dashes
- [ ] No emojis
- [ ] TypeScript 0 errors

---

## Blog SEO Fixes (Jul 2026)
- [x] Restaurant blog metaTitle: changed from "Restaurant Website Design Cyprus | ..." to "Why Cyprus Restaurants Need More Than Facebook | DM-Labs.io" (no longer competing with /web-design-restaurants-cyprus)
- [x] Restaurant blog pricing: updated €249/€399/€699 (Starter/Business/Premium) to €299/€749/€1,499 (Launch/Growth/Pro)
- [x] Restaurant blog CTA: changed from /contact to /web-design-restaurants-cyprus with "See Our Restaurant Packages" label
- [x] Added inbound link to /web-design-paphos from restaurant blog (mentions Paphos in Google search context)
- [x] Added inbound link to /web-design-cyprus from wix-vs-designer blog ("small business in Cyprus" sentence)
- [x] Added inbound link to /web-design-crete from Greece guide blog (Greek islands mention)
- [x] Added inbound link to /web-design-restaurants-cyprus from restaurant blog body text and CTA
- [x] Fixed old pricing in website-cost blog (EN): table row €299-€699 → €299-€1,499; package names updated
- [x] Fixed old pricing in nail salon blog (EN): metaDescription and body text €249 → €299
- [x] Fixed old pricing in yoga blog (EN): body text €249 → €299
- [x] Fixed old pricing in Greece guide blog (EN): table row and DM-Labs.io paragraph €299-€699 → €299-€1,499
- [x] Fixed old pricing in Greek website cost blog (WebsiteCostEl.tsx): section header €299-€699 → €299-€1.499; CTA text Starter/Business/Premium → Launch/Growth/Pro
- [x] Fixed old pricing in Greek nail salon blog (NailSalonEl.tsx): €299 Starter/€399 Business → €299 Launch/€749 Growth
- [x] Fixed old pricing in Greek Greece guide blog (WebDesignGreeceEl.tsx): table row €299-€699 → €299-€1.499; paragraph updated to Launch/Pro package names

## Full-page prerender — hard requirement (Jul 2026)

- [x] STOPGAP: Add ROUTE_FALLBACKS entries for restaurant blog, wix-vs-designer blog, greece guide blog with real internal links in static HTML
- [x] REAL FIX: Install Playwright and write scripts/prerender-full.mjs — starts production server, visits each route headlessly, waits for React hydration, saves full rendered DOM as route index.html
- [x] prerender-full.mjs must preserve all canonical/hreflang/og meta tags currently injected by prerender-meta.mjs (React useSEO hook writes them at render time; Playwright captures them)
- [ ] Retire prerender-meta.mjs and ROUTE_FALLBACKS entirely once full-DOM snapshot is in place — must not coexist as a fourth sync point
- [x] Update package.json build script: replace prerender-meta.mjs call with prerender-full.mjs
- [x] Verify every route's raw HTML (curl --no-js) contains full article body and all internal links before JS runs — confirmed: restaurant blog has 11,470 words, all location links present, no data-seo-fallback block
- [ ] Add as hard requirement to site redesign brief: every route's raw HTML must contain full real content (not a fallback snippet) before JavaScript runs

## Technical SEO Fixes — GSC Issues (Jul 28 2026)

- [x] Task 1: Fix catch-all to return HTTP 404 for unknown paths (not 200 with homepage)
- [x] Task 1: Add noindex meta tag to NotFound page
- [x] Task 2: Add 301 redirects for 6 Greek slugs on English paths
- [x] Task 2: Add 301 for /blog/website-yoga-pilates-studio-cyprus → /blog/yoga-pilates-studio-website-cyprus
- [x] Task 2: Add 301 for /$ → /
- [x] Task 3: Replace language switcher buttons with real <a href> elements
- [x] Task 3: Deduplicate language switcher (CSS hide one, not two interactive controls)
- [x] Task 3: Add hreflang link tags to useSEO hook (injected into <head> on every page)
- [x] Task 3: Add visible language link in footer (EN pages show Greek link, EL pages show English link)
- [x] Task 4: Add server-level 301 trailing-slash redirect (/path/ → /path)
- [x] Task 5: Add canonical tag to Templates page for query-string variants
- [x] Task 6: Add missing pages to sitemap (/services/*, /privacy, /terms, /cookies + EL equivalents)
- [x] Task 6: Remove /el/blog/istoselidha-nail-salon-beauty-studio-kypros from sitemap if it redirects
- [x] Task 7: Remove Disallow: /previews/ from robots.txt
- [x] Task 7: Add <meta name="robots" content="noindex, nofollow"> to all /previews/*.html files

## GSC SEO Fixes - Round 2 (Jul 28 2026)
- [x] Critical: Remove trailing-slash redirect middleware (was causing ERR_TOO_MANY_REDIRECTS on all pages)
- [x] Fix: Add /services/* and /el/services/* to STATIC_ROUTES in vite.ts (were returning HTTP 404)
- [x] Fix: Add /el/services/* as <loc> entries in sitemap.xml (9 pages missing from sitemap)
- [x] Fix: Add /services/* and /el/services/* to prerender-full.mjs routes
- [x] Fix: Remove ?open= and ?industry= query-string links in Home.tsx and HomeEl.tsx (replaced with clean /templates links)
- [x] Fix: Add aria-hidden="true" to mobile LangToggle container (prevents duplicate crawlable links)
- [x] Fix: NotFound.tsx — correct title to "Page Not Found | DM-Labs.io", add noindex, remove canonical

## GSC SEO Fixes - Round 3 (Jul 28 2026)

- [x] Fix critical noindex bug: /404 removed from prerender routes (was contaminating all subsequent pages via shared browser context)
- [x] Fix useSEO: always reset robots meta to "index, follow" on every call (prevents noindex leaking from NotFound)
- [x] Fix canonical URLs: useSEO now generates trailing-slash canonicals (matching Manus/Cloudflare platform behavior)
- [x] Fix prerender-meta.mjs: canonical and hreflang URLs now use trailing slashes
- [x] Fix sitemap.xml: all 68 <loc> and 202 hreflang href entries now use trailing slashes
- [x] Fix TemplatesEl.tsx: canonicalPath changed from /el/examples to /el/templates

## GSC SEO Fixes - Round 4 (Jul 28 2026)

- [x] Fix /el/cookies/ returning 404: added to prerender-full.mjs and prerender-meta.mjs routes
- [x] Fix hreflang trailing slashes: useSEO now applies addTrailingSlash() to both en and el paths before injecting hreflang tags
- [x] Fix 404 raw HTML metadata: serveStatic now patches root index.html inline for unknown paths — injects noindex,nofollow, sets "Page Not Found | DM-Labs.io" title, removes canonical tag

## New Blog Post - GSC AI Prompts (Jul 28 2026)

- [x] Add blog post "7 AI Prompts for Google Search Console SEO" (slug: google-search-console-ai-seo-prompts)
- [x] Add two editorial insertions (DM-Labs.io origin note after "Below are seven prompts…"; About DM-Labs.io at end)
- [x] Add visible byline "By DM-Labs.io" to BlogPost.tsx hero
- [x] Add og:site_name "DM-Labs.io" to useSEO hook (applies to all pages)
- [x] Article structured data already in BlogPost.tsx (publisher: DM-Labs.io)
- [x] Canonical derived from route (no hardcoded canonicalPath) — self-references /blog/google-search-console-ai-seo-prompts/
- [x] Add to prerender-full.mjs EN_BLOG_SLUGS
- [x] Add to prerender-meta.mjs EN_STATIC_ROUTES (EN-only, no elPath)
- [x] Add to sitemap.xml (EN-only entry, no el hreflang)
- [x] Fix SLUG_MAP in useSEO: add null entry for EN-only post, update geo slug, handle self-referencing hreflang
- [x] Fix stale SLUG_MAP entry: /blog/geo-ai-search-visibility-cyprus → /blog/geo-get-found-by-chatgpt-cyprus

## Blog Banner Image Fix (Jul 28 2026)

- [x] Fix broken blog banner image: moved from /manus-storage/ proxy URL to /google-search-console-ai-seo-prompts-banner.ea3da3a3.jpg in client/public/ (Vite static asset, works in both dev and production without storage proxy)
