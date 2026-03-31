/* ============================================================
   D&M LABS - useSEO Hook
   Dynamically updates <title>, meta description, canonical URL,
   og:url, og:title, og:description on every route change.
   
   Usage (basic — auto-derives canonical from current path):
     useSEO({ title: "Pricing | D&M Labs", description: "..." })
   
   Usage (blog post with custom OG image):
     useSEO({ title: post.metaTitle, description: post.metaDescription, ogImage: post.coverImage, ogType: "article" })
   ============================================================ */

import { useEffect } from "react";
import { useLocation } from "wouter";

const BASE_URL = "https://dm-labs.io";
const DEFAULT_TITLE = "D&M Labs - Professional Website Design for Your Business";
const DEFAULT_DESCRIPTION =
  "Custom websites built fast, built right. Mobile-first, SEO-optimised, launched in 5-14 days. Starting from €299.";
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
    const canonicalUrl = `${BASE_URL}${cleanPath}`;

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

    // Update Twitter tags
    setOgTag("twitter:title", title);
    setOgTag("twitter:description", description);
    setOgTag("twitter:image", ogImage);
  }, [location, options.title, options.description, options.ogImage, options.ogType, options.canonicalPath]);
}

export default useSEO;
