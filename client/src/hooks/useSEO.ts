import { useCurrency } from "@/contexts/CurrencyContext";
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
import { getHreflangRouteSet, isIndexableHebrewRoute, type HreflangRouteSet, normalizeRoutePath, SEO_BASE_URL, withTrailingSlash } from "@/lib/seoRoutes";

import { getRouteLanguage } from "@/lib/routeLanguage";
import { absoluteImageUrl, pageSchema } from "@/lib/structuredData";

const BASE_URL = SEO_BASE_URL;
const DEFAULT_TITLE = "Best Web Design Agency for Growing Businesses | DM Labs";
const DEFAULT_DESCRIPTION =
  "Stand out. Build trust. Win more enquiries. DM Labs creates custom websites with fast delivery and personal care for businesses worldwide.";
const DEFAULT_OG_IMAGE = "https://dm-labs.io/social/dm-labs-growth-social-card-centered.png";
const DEFAULT_OG_IMAGE_ALT = "We build your website. Built for growth. DM Labs";
// The social card is shared on Greek and Hebrew pages too, so its description follows the page language.
const LOCALIZED_OG_IMAGE_ALT: Partial<Record<ReturnType<typeof getRouteLanguage>, string>> = {
  el: "DM Labs: φτιάχνουμε την ιστοσελίδα σας, για να μεγαλώσει η επιχείρησή σας",
  he: "DM Labs: אנחנו בונים לכם את האתר, כדי שהעסק שלכם יגדל",
};
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
  /** Temporary preview staging pages may be rendered fully but remain noindex until approved. */
  noindex?: boolean;
  /** Sets an Open Graph locale for a localized page, for example `he_IL`. */
  ogLocale?: string;
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
    name: title.replace(/\s*\|\s*DM[ -]?Labs(?:\.io)?.*$/i, "").trim(),
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
  const currency = useCurrency();

  useEffect(() => {
    const {
      title = DEFAULT_TITLE,
      description = DEFAULT_DESCRIPTION,
      ogImage = DEFAULT_OG_IMAGE,
      ogImageAlt,
      ogType = "website",
      canonicalPath,
      noindex = false,
      ogLocale,
    } = options;

    // Determine canonical path: use override if provided, otherwise use current wouter location.
    const cleanPath = normalizeRoutePath(canonicalPath ?? location);
    // Production routes use a trailing slash everywhere except the root URL.
    // Canonicals must match the final public URL to avoid "Page with redirect" in GSC.
    const finalPath = withTrailingSlash(cleanPath);
    const canonicalUrl = `${BASE_URL}${finalPath}`;

    // Completed Hebrew routes are now explicitly approved for indexing. This
    // safely supersedes their temporary per-page staging flag while leaving
    // preview demos and genuine 404 behavior untouched.
    const shouldNoindex = isIndexableHebrewRoute(cleanPath) ? false : noindex;
    setMetaTag("robots", shouldNoindex ? "noindex, follow" : "index, follow, max-image-preview:large");

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
    const locale = getRouteLanguage(cleanPath);
    const resolvedOgImageAlt = ogImageAlt ?? (ogImage === DEFAULT_OG_IMAGE ? LOCALIZED_OG_IMAGE_ALT[locale] ?? DEFAULT_OG_IMAGE_ALT : title);
    const imageUrl = absoluteImageUrl(ogImage);
    setOgTag("og:image", imageUrl);
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
    setOgTag("og:locale", ogLocale ?? { en: "en_GB", el: "el_GR", he: "he_IL" }[locale]);

    // Update Twitter tags
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", imageUrl);
    if (resolvedOgImageAlt) setMetaTag("twitter:image:alt", resolvedOgImageAlt);

    // Emit only reciprocal, real translation targets. Completed Hebrew routes
    // participate through the explicit route map; Hebrew blog URLs remain absent.
    setHreflangTags(getHreflangRouteSet(cleanPath));
    setBreadcrumbSchema(cleanPath, finalPath, title);
    const schema = document.getElementById("page-jsonld-schema") ?? document.createElement("script");
    schema.id = "page-jsonld-schema";
    schema.setAttribute("type", "application/ld+json");
    schema.textContent = JSON.stringify(pageSchema(canonicalUrl, title, description, locale, imageUrl, resolvedOgImageAlt, currency)).replace(/</g, "\\u003c");
    if (!schema.parentNode) document.head.appendChild(schema);
    return () => {
      schema.remove();
      document.getElementById("route-breadcrumb-jsonld")?.remove();
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    };
  }, [location, currency, options.title, options.description, options.ogImage, options.ogImageAlt, options.ogType, options.canonicalPath, options.noindex, options.ogLocale]);
}

export default useSEO;
