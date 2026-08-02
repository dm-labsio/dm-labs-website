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
import { getHreflangPair, normalizeRoutePath, SEO_BASE_URL, withTrailingSlash } from "@/lib/seoRoutes";

const BASE_URL = SEO_BASE_URL;
const DEFAULT_TITLE = "DM-Labs.io | Web Design in Paphos & Cyprus from €299";
const DEFAULT_DESCRIPTION =
  "DM-Labs.io builds custom, mobile-first websites for businesses in Paphos and across Cyprus. Clear scope, SEO foundations, and packages from €299.";
const DEFAULT_OG_IMAGE = "https://dm-labs.io/og-image.png";

interface SEOOptions {
  title?: string;
  description?: string;
  ogImage?: string;
  ogImageAlt?: string; // Sets og:image:alt for accessibility and SEO
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
      ogImageAlt,
      ogType = "website",
      canonicalPath,
    } = options;

    // Determine canonical path: use override if provided, otherwise use current wouter location.
    const cleanPath = normalizeRoutePath(canonicalPath ?? location);
    // The Manus/Cloudflare platform adds a trailing slash to all paths except root.
    // Canonicals must match the final URL the platform serves to avoid "Page with redirect" in GSC.
    const finalPath = withTrailingSlash(cleanPath);
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
    if (ogImageAlt) setOgTag("og:image:alt", ogImageAlt);
    setOgTag("og:type", ogType);
    setOgTag("og:site_name", "DM-Labs.io");

    // Update Twitter tags
    setOgTag("twitter:title", title);
    setOgTag("twitter:description", description);
    setOgTag("twitter:image", ogImage);

    // Inject hreflang link tags using the same final canonical path normalizer.
    const pair = getHreflangPair(cleanPath);
    if (pair.el) {
      setHreflangTags(withTrailingSlash(pair.en), withTrailingSlash(pair.el));
    } else {
      // English-only post: emit self-referencing hreflang (en + x-default only, no el).
      const selfUrl = `${BASE_URL}${withTrailingSlash(pair.en)}`;
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
