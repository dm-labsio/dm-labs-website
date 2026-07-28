/* ============================================================
   DM-Labs.io - useSEO Hook
   Dynamically updates <title>, meta description, canonical URL,
   og:url, og:title, og:description, and hreflang link tags on
   every route change.
   
   Usage (basic — auto-derives canonical from current path):
     useSEO({ title: "Pricing | DM-Labs.io", description: "..." })
   
   Usage (blog post with custom OG image):
     useSEO({ title: post.metaTitle, description: post.metaDescription, ogImage: post.coverImage, ogType: "article" })
   ============================================================ */

import { useEffect } from "react";
import { useLocation } from "wouter";

const BASE_URL = "https://dm-labs.io";
const DEFAULT_TITLE = "DM-Labs.io | Web Design in Paphos & Cyprus from €299";
const DEFAULT_DESCRIPTION =
  "DM-Labs.io builds custom, mobile-first websites for businesses in Paphos and across Cyprus. Clear scope, SEO foundations, and packages from €299.";
const DEFAULT_OG_IMAGE = "https://dm-labs.io/og-image.png";

interface SEOOptions {
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: string;
  /** Override the canonical path if needed (e.g. for paginated pages). Defaults to current route. */
  canonicalPath?: string;
}

function setMetaTag(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setOgTag(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.href = href;
}

// ── Hreflang helpers ──────────────────────────────────────────────────────────
// Maps every EN path to its EL counterpart. Paths not in this map use the
// simple /el prefix convention (e.g. /pricing → /el/pricing).
const SLUG_MAP_EN_TO_EL: Record<string, string | null> = {
  "/": "/el",
  "/blog/website-cost-cyprus-2026-guide": "/el/blog/posso-kostizei-istoselidha-kypros",
  "/blog/web-design-nail-salon-beauty-studio-cyprus": "/el/blog/istoselidha-nail-salon-beauty-studio-kypros",
  "/blog/yoga-pilates-studio-website-cyprus": "/el/blog/istoselidha-yoga-pilates-studio-kypros",
  "/blog/how-to-get-found-on-google-cyprus": "/el/blog/pos-na-vretheite-google-kypros",
  "/blog/restaurant-website-design-cyprus": "/el/blog/istoselidha-estiatorio-kypros",
  "/blog/wix-vs-professional-web-designer-cyprus": "/el/blog/wix-vs-epaggelmatias-web-designer-kypros",
  "/blog/web-design-greece-guide-2026": "/el/blog/web-design-ellada-odigos-2026",
  "/blog/geo-get-found-by-chatgpt-cyprus": "/el/blog/geo-vrethite-apo-chatgpt-kypros",
  // English-only posts (null = no EL counterpart, hreflang will self-reference)
  "/blog/google-search-console-ai-seo-prompts": null,
};
const SLUG_MAP_EL_TO_EN: Record<string, string> = Object.fromEntries(
  Object.entries(SLUG_MAP_EN_TO_EL)
    .filter(([, el]) => el !== null)
    .map(([en, el]) => [el as string, en])
);

function deriveHreflangPair(path: string): { en: string; el: string } | null {
  const isEl = path.startsWith("/el");

  if (isEl) {
    // EL → EN
    const enPath = SLUG_MAP_EL_TO_EN[path] ?? (path === "/el" ? "/" : path.replace(/^\/el/, ""));
    return { en: enPath, el: path };
  } else {
    // EN → EL: check if this is an EN-only post (null in map)
    if (path in SLUG_MAP_EN_TO_EL && SLUG_MAP_EN_TO_EL[path] === null) {
      // EN-only: emit only hreflang="en" and hreflang="x-default" (self-referencing)
      return null;
    }
    const elPath = SLUG_MAP_EN_TO_EL[path] ?? (path === "/" ? "/el" : "/el" + path);
    return { en: path, el: elPath as string };
  }
}

function setHreflangTags(enPath: string, elPath: string) {
  // Remove any existing hreflang tags first
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

  const tags = [
    { hreflang: "en", href: `${BASE_URL}${enPath}` },
    { hreflang: "el", href: `${BASE_URL}${elPath}` },
    { hreflang: "x-default", href: `${BASE_URL}${enPath}` },
  ];

  tags.forEach(({ hreflang, href }) => {
    const el = document.createElement("link");
    el.setAttribute("rel", "alternate");
    el.setAttribute("hreflang", hreflang);
    el.setAttribute("href", href);
    document.head.appendChild(el);
  });
}

export function useSEO(options: SEOOptions = {}) {
  const [location] = useLocation();

  useEffect(() => {
    const {
      title = DEFAULT_TITLE,
      description = DEFAULT_DESCRIPTION,
      ogImage = DEFAULT_OG_IMAGE,
      ogType = "website",
      canonicalPath,
    } = options;

    // Determine canonical path: use override if provided, otherwise use current wouter location.
    // Strip trailing slash except for the root "/".
    let path = canonicalPath ?? location;
    if (path !== "/" && path.endsWith("/")) {
      path = path.slice(0, -1);
    }
    // Strip query strings and hashes from canonical (canonical should be the clean URL)
    const cleanPath = path.split("?")[0].split("#")[0];
    // The Manus/Cloudflare platform adds a trailing slash to all paths except root.
    // Canonicals must match the final URL the platform serves to avoid "Page with redirect" in GSC.
    const finalPath = cleanPath === "/" ? "/" : (cleanPath.endsWith("/") ? cleanPath : cleanPath + "/");
    const canonicalUrl = `${BASE_URL}${finalPath}`;

    // Ensure robots meta is always reset to indexable on real pages
    setMetaTag("robots", "index, follow");

    // Update <title>
    document.title = title;

    // Update meta description
    setMetaTag("description", description);

    // Update canonical
    setCanonical(canonicalUrl);

    // Update OG tags
    setOgTag("og:title", title);
    setOgTag("og:description", description);
    setOgTag("og:url", canonicalUrl);
    setOgTag("og:image", ogImage);
    setOgTag("og:type", ogType);
    setOgTag("og:site_name", "DM-Labs.io");

    // Update Twitter tags
    setOgTag("twitter:title", title);
    setOgTag("twitter:description", description);
    setOgTag("twitter:image", ogImage);

    // Inject hreflang link tags
    // Apply same trailing-slash rule as canonical: all paths except root get a trailing slash.
    const addTrailingSlash = (p: string) => p === "/" ? p : (p.endsWith("/") ? p : p + "/");
    const pair = deriveHreflangPair(cleanPath);
    if (pair) {
      setHreflangTags(addTrailingSlash(pair.en), addTrailingSlash(pair.el));
    } else if (cleanPath in SLUG_MAP_EN_TO_EL && SLUG_MAP_EN_TO_EL[cleanPath] === null) {
      // EN-only post: emit self-referencing hreflang (en + x-default only, no el)
      const selfUrl = `${BASE_URL}${addTrailingSlash(cleanPath)}`;
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
      ["en", "x-default"].forEach(lang => {
        const el = document.createElement("link");
        el.setAttribute("rel", "alternate");
        el.setAttribute("hreflang", lang);
        el.setAttribute("href", selfUrl);
        document.head.appendChild(el);
      });
    }
  }, [location, options.title, options.description, options.ogImage, options.ogType, options.canonicalPath]);
}

export default useSEO;
