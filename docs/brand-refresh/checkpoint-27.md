# Checkpoint 27: SEO and AI-search QA

30 September 2026. Scope: `codex/brand-refresh`, Preview only. Main and the production deployment are unchanged.

## Changes

- Shared metadata now emits absolute production image URLs, complete Open Graph/Twitter image descriptions, the correct locale, large-image preview permission and one linked Organization/WebSite/WebPage graph per route. The shipped logo replaces a nonexistent `/logo.png` reference. An unverified Twitter account tag was removed.
- Static snapshots retain their complete metadata for crawlers. On browser startup, React recreates its own schema scripts so route changes clean up correctly. This fixes homepage schema being inherited by unrelated pages during prerender and scripts persisting after navigation.
- All 12 regional landing pages describe services provided by the same studio. Removed duplicate business entities, a placeholder telephone number, incorrect city-office addresses, inconsistent Instagram references and stale package descriptions from those blocks. Visible location copy and layouts remain.
- Added missing Service/FAQ markup to six Greek/Hebrew service pages and missing FAQ markup to regional pages. Existing English, Greek and Hebrew FAQs use their visible answer data.
- English article FAQs now generate visible HTML and markup from one source. Eleven answers on two articles previously differed. One old fixed shop-launch estimate was replaced by project-specific scheduling.
- All eight Greek articles now have BlogPosting metadata, an article-specific sharing image, visible studio authorship and publication dates drawn from the existing blog index data. English articles use their visible headline, absolute image URLs, explicit language and a visible byline matching the existing author metadata.
- Added VideoObject metadata for the existing introduction video on the three homepages, with its poster, direct media URL, English audio language, duration and first website publication date. Playback remains click-to-load; no extra video download is introduced.
- Updated `llms.txt` to the current scope, package page counts, care billing, content-update wording and project-specific delivery schedule. Corrected old form-in-every-package and unlimited-update claims and normalized its links. No crawler or training permissions were changed.
- Corrected specific unsupported SEO/GEO claims about special AI schema, guaranteed mentions and embedded maps; removed an unsupported Clutch-review assertion from an illustrative AI-answer example. Homepage testimonials remain unchanged and are not emitted as reviews or ratings.
- Shortened five especially long Greek meta descriptions. Sitemap modification dates reflect this metadata update; article publication dates are not set to the audit date.

## Verification

- TypeScript and 273 tests across 46 test files pass.
- Full production build produces 91 canonical routes (39 English, 33 Greek, 19 Hebrew), 11 non-indexable example wrappers and a static 404.
- New build-time checks inspect the rendered DOM: unique titles/descriptions; self-canonicals; language and direction; Open Graph/Twitter consistency; one H1; image alt attributes; JSON-LD parsing; expected page/article/service entities; article headline and publication-date parity; visible FAQ parity; breadcrumb destinations; reciprocal hreflang; sitemap/head parity; local image/schema assets. The build fails when these checks find an issue.
- Latest local audit: 91 pages, 20 articles, 39 service/region pages, 44 FAQ-bearing pages with 220 answers, 556 image elements, and zero audit errors. Empty alt remains intentional for decorative/redundant imagery; no keyword stuffing was added.
- Browser checks cover homepage → blog → article → homepage and direct Greek article → Greek homepage, verifying stale article/FAQ/video metadata is removed. Sampled English, Greek and Hebrew pages have no horizontal overflow at 320px; a Greek article was inspected visually. No browser console errors were observed.
- Read-only production checks: HTTP and www variants return 308 to `https://dm-labs.io/`; robots.txt returns 200 and allows the main site; homepage requests with Googlebot and OAI-SearchBot user-agent identifiers return 200 without a noindex header. These are HTTP simulations, not proof of a visit from crawler-owned IPs.
- Deployment URL, exact commit/tree, live route/media results and production-alias verification are recorded in the workspace's `output/website-refresh/Preview-Deployment.md` and `checkpoint-27-*.json` artifacts after deployment.

## Search guidance and limits

- [Google AI features](https://developers.google.com/search/docs/appearance/ai-features): normal SEO foundations apply; no special AI schema is required. Crawlability and valid markup cannot guarantee indexing, rankings or inclusion in an AI answer.
- [Google's AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): Google does not use llms.txt for visibility or rankings. The existing file was corrected to avoid publishing contradictory business information, not treated as a ranking mechanism.
- [Google's documentation updates](https://developers.google.com/search/updates#may-2026): FAQ rich results stopped appearing on 7 May 2026; documentation was removed in June. Accurate FAQPage markup is retained as semantic description, without promising a Google FAQ feature.
- [Google structured-data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies): markup must describe the actual content. Review markup is absent. These local checks are not a Google certification or a substitute for URL Inspection.
- [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots): OAI-SearchBot governs automated search discovery independently of GPTBot's training role. Existing wildcard access already permits the search crawler.
- Preview deliberately retains Vercel's `X-Robots-Tag: noindex`; production canonicals and sitemap URLs are intentional. Actual indexing, Google-selected canonicals, manual actions and search impressions were not checked through an authenticated Search Console account. After an approved production release, verify representative URLs and the sitemap there.
- This checkpoint covers technical discovery, metadata and directly encountered search claims. The deferred full editorial review, content/example overhaul and performance work remain separate; no ranking or AI-citation forecast is provided.
