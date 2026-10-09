# Crawl, image and portfolio SEO audit

Scope: Preview branch only. Production was inspected read-only. No Search Console property access or URL Inspection data was available, so these checks establish technical readiness, not Google's actual indexing or ranking decisions.

## Findings and fixes

- Existing production canonicals, metadata, reciprocal language links, robots rules and real 404 responses were sound. Preview responses correctly include `X-Robots-Tag: noindex`.
- Branding stories previously required a click and had no crawlable link destination. Added nine prerendered pages: Hartley, AWAY and Sunday Boat in English, Greek and Hebrew at `/[locale/]templates/branding/[brand]/`. Cards now have real links; ordinary clicks retain the existing modal, X/Back/Escape, focus and exact scroll restoration. New-tab clicks and visitors without JavaScript receive the complete case study.
- Added distinct case-study titles/descriptions, canonical URLs, reciprocal hreflang, breadcrumbs, representative social images with descriptions/dimensions, and CreativeWork/ImageObject metadata. Portfolio projects are accurately described as design concepts, not commissioned client endorsements or purchasable products.
- Added an ItemList for the visible web design and branding portfolio. The website demos remain noindex; their cover images are discoverable on the indexable Our Work and homepage galleries.
- Added object-specific, localized alternative descriptions to the branding images and website covers. Blog cards reuse their existing image descriptions when supplied and their localized article title otherwise. Decorative artwork and duplicate symbols retain empty alt text intentionally. No keyword stuffing, invented licenses, or fake review schema was added.
- Copied five portfolio logos/symbols out of `/previews/`, whose response rules prohibit indexing, into `/media/branding/`. Demo URLs remain unchanged.
- Added a build-generated `/sitemap-images.xml`, declared in robots.txt. It includes actual described first-party images and responsive variants from indexable page HTML, not unused uploads or demo pages. Current output: 34 landing pages and 256 image references. External stock-image hosts are not claimed as owned sitemap assets.
- Strengthened the build audit to require descriptions for key portfolio and blog imagery. Fixed stale Twitter image-alt cleanup on route changes and added explicit social-image dimension support.

## Verification

- TypeScript check and 26 focused SEO/routing/portfolio tests passed.
- Full build: 106 canonical pages, nine noindex demos, zero prerender or SEO errors.
- 766 image elements checked for alt attributes; 287 described content-image instances (the remainder includes decorative/repeated assets and site chrome).
- Crawler-style HTTP checks: all 106 canonical pages and 113 distinct first-party image URLs passed. All 33 external editorial-image URLs returned HTTP 200 and image content types.
- Initial HTML contains titles, canonicals, content and structured data without JavaScript. Branding links and complete image galleries work with JavaScript disabled in all three languages.
- Branding gallery regression: 320/390/768/1440-pixel layouts, image decoding, all projects, X/Back/Escape, exact scroll/focus restoration, direct links and reduced motion passed.
- Standalone case studies: narrow mobile, desktop and Hebrew RTL checked for overflow, image loading and browser errors.

## Search limitations and release follow-up

Google chooses what to index and display. Correct schema does not guarantee rich results or AI citations. Standard FAQ markup remains checked against visible questions/answers, without promising FAQ rich-result eligibility.

After production approval, verify the production sitemap and image sitemap in Search Console, and optionally request indexing for Our Work and the new case-study pages. Do not submit Preview URLs. Image sitemap discovery is also provided through robots.txt. No speculative GEO meta tags or hidden keyword content are required.

References:
- https://developers.google.com/search/docs/appearance/google-images
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
