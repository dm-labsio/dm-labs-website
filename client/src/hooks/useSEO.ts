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
import { getHreflangRouteSet, type HreflangRouteSet, normalizeRoutePath, SEO_BASE_URL, withTrailingSlash } from "@/lib/seoRoutes";

const BASE_URL = SEO_BASE_URL;
const DEFAULT_TITLE = "DM-Labs.io | Web Design in Paphos & Cyprus from €299";
const DEFAULT_DESCRIPTION =
  "DM-Labs.io builds custom, mobile-first websites for businesses in Paphos and across Cyprus. Clear scope, SEO foundations, and packages from €299.";
const DEFAULT_OG_IMAGE = "https://dm-labs.io/social/dm-labs-website-social-card.png";
const DEFAULT_OG_IMAGE_ALT = "We build your website. Unbeatable prices. DM-Labs.io";
const DEFAULT_OG_IMAGE_WIDTH = "1200";
const DEFAULT_OG_IMAGE_HEIGHT = "675";

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

function removeOgTag(property: string) {
  document.querySelector(`meta[property="${property}"]`)?.remove();
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

function setHreflangTags(routes: HreflangRouteSet) {
  // Remove any existing hreflang tags first
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

  const tags = [
    { hreflang: "en", href: `${BASE_URL}${withTrailingSlash(routes.en)}` },
    ...(routes.el ? [{ hreflang: "el", href: `${BASE_URL}${withTrailingSlash(routes.el)}` }] : []),
    ...(routes.he ? [
      { hreflang: "he", href: `${BASE_URL}${withTrailingSlash(routes.he)}` },
      { hreflang: "he-IL", href: `${BASE_URL}${withTrailingSlash(routes.he)}` },
    ] : []),
    { hreflang: "x-default", href: `${BASE_URL}${withTrailingSlash(routes.en)}` },
  ];

  tags.forEach(({ hreflang, href }) => {
    const el = document.createElement("link");
    el.setAttribute("rel", "alternate");
    el.setAttribute("hreflang", hreflang);
    el.setAttribute("href", href);
    document.head.appendChild(el);
  });
}

function setBreadcrumbSchema(cleanPath: string, finalPath: string, title: string) {
  const isGreek = cleanPath === "/el" || cleanPath.startsWith("/el/");
  const isHebrew = cleanPath === "/he" || cleanPath.startsWith("/he/");
  const pathWithoutLocale = isGreek
    ? cleanPath.slice(3) || "/"
    : isHebrew
      ? cleanPath.slice(3) || "/"
      : cleanPath;
  const category = pathWithoutLocale.startsWith("/services/")
    ? "services"
    : pathWithoutLocale.startsWith("/blog/")
      ? "blog"
      : pathWithoutLocale.startsWith("/web-design-")
        ? "location"
        : null;
  const schemaId = "route-breadcrumb-jsonld";
  const existing = document.getElementById(schemaId);

  if (!category) {
    existing?.remove();
    return;
  }

  const homePath = isGreek ? "/el/" : isHebrew ? "/he/" : "/";
  const items: Array<{ "@type": string; position: number; name: string; item: string }> = [
    { "@type": "ListItem", position: 1, name: isGreek ? "Αρχική" : isHebrew ? "דף הבית" : "Home", item: `${BASE_URL}${homePath}` },
  ];
  if (category === "services" || category === "blog") {
    const localePrefix = isGreek ? "/el" : isHebrew ? "/he" : "";
    const parentPath = `${localePrefix}/${category}/`;
    items.push({
      "@type": "ListItem",
      position: 2,
      name: category === "services"
        ? (isGreek ? "Υπηρεσίες" : isHebrew ? "שירותים" : "Services")
        : (isGreek ? "Άρθρα" : isHebrew ? "מאמרים" : "Blog"),
      item: `${BASE_URL}${parentPath}`,
    });
  }
  items.push({
    "@type": "ListItem",
    position: items.length + 1,
    name: title.replace(/\s*\|\s*DM-Labs\.io.*$/i, "").trim(),
    item: `${BASE_URL}${finalPath}`,
  });

  const script = existing instanceof HTMLScriptElement ? existing : document.createElement("script");
  script.id = schemaId;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  });
  if (!existing) document.head.appendChild(script);
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
    // Production routes use a trailing slash everywhere except the root URL.
    // Canonicals must match the final public URL to avoid "Page with redirect" in GSC.
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
    const resolvedOgImageAlt = ogImageAlt ?? (ogImage === DEFAULT_OG_IMAGE ? DEFAULT_OG_IMAGE_ALT : undefined);
    setOgTag("og:image", ogImage);
    if (resolvedOgImageAlt) setOgTag("og:image:alt", resolvedOgImageAlt);
    else removeOgTag("og:image:alt");
    if (ogImage === DEFAULT_OG_IMAGE) {
      setOgTag("og:image:secure_url", DEFAULT_OG_IMAGE);
      setOgTag("og:image:type", "image/png");
      setOgTag("og:image:width", DEFAULT_OG_IMAGE_WIDTH);
      setOgTag("og:image:height", DEFAULT_OG_IMAGE_HEIGHT);
    } else {
      ["og:image:secure_url", "og:image:type", "og:image:width", "og:image:height"].forEach(removeOgTag);
    }
    setOgTag("og:type", ogType);
    setOgTag("og:site_name", "DM-Labs.io");

    // Update Twitter tags
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", ogImage);
    if (resolvedOgImageAlt) setMetaTag("twitter:image:alt", resolvedOgImageAlt);

    // Emit only reciprocal, real translation targets. Hebrew stays absent until
    // a route has been implemented and mapped as part of the staged rollout.
    setHreflangTags(getHreflangRouteSet(cleanPath));
    setBreadcrumbSchema(cleanPath, finalPath, title);
  }, [location, options.title, options.description, options.ogImage, options.ogImageAlt, options.ogType, options.canonicalPath]);
}

export default useSEO;
