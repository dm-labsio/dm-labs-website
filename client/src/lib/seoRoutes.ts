export const SEO_BASE_URL = "https://dm-labs.io";

export type SiteLocale = "en" | "el" | "he";

export const withTrailingSlash = (path: string) => path === "/" ? "/" : (path.endsWith("/") ? path : `${path}/`);

export const normalizeRoutePath = (path: string) => {
  const cleanPath = path.split("?")[0].split("#")[0] || "/";
  return cleanPath === "/" ? "/" : cleanPath.replace(/\/+$/, "");
};

export const EN_TO_EL_PATHS: Readonly<Record<string, string | null>> = {
  "/": "/el",
  "/blog/website-cost-cyprus-2026-guide": "/el/blog/posso-kostizei-istoselidha-kypros",
  "/blog/web-design-nail-salon-beauty-studio-cyprus": "/el/blog/istoselidha-nail-salon-beauty-studio-kypros",
  "/blog/yoga-pilates-studio-website-cyprus": "/el/blog/istoselidha-yoga-pilates-studio-kypros",
  "/blog/how-to-get-found-on-google-cyprus": "/el/blog/pos-na-vretheite-google-kypros",
  "/blog/restaurant-website-design-cyprus": "/el/blog/istoselidha-estiatorio-kypros",
  "/blog/wix-vs-professional-web-designer-cyprus": "/el/blog/wix-vs-epaggelmatias-web-designer-kypros",
  "/blog/web-design-greece-guide-2026": "/el/blog/web-design-ellada-odigos-2026",
  "/blog/geo-get-found-by-chatgpt-cyprus": "/el/blog/geo-vrethite-apo-chatgpt-kypros",
  "/blog/google-search-console-ai-seo-prompts": null,
  "/web-design-paphos": null,
  "/web-design-restaurants-cyprus": null,
};

/**
 * Hebrew mappings remain deliberately empty until each translated route is
 * implemented, prerendered, and reviewed. This prevents fabricated Hebrew
 * hreflang URLs or language-switch targets during the staged rollout.
 */
export const EN_TO_HE_PATHS: Readonly<Record<string, string | null>> = {};

const EL_LANGUAGE_TOGGLE_FALLBACKS: Readonly<Record<string, string>> = {
  "/web-design-paphos": "/el/web-design-cyprus",
  "/web-design-restaurants-cyprus": "/el/web-design-cyprus",
};

export const EL_TO_EN_PATHS: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(EN_TO_EL_PATHS)
    .filter(([, elPath]) => elPath !== null)
    .map(([enPath, elPath]) => [elPath as string, enPath]),
);

export const HE_TO_EN_PATHS: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(EN_TO_HE_PATHS)
    .filter(([, hePath]) => hePath !== null)
    .map(([enPath, hePath]) => [hePath as string, enPath]),
);

export type HreflangRouteSet = {
  en: string;
  el: string | null;
  he: string | null;
};

/**
 * Returns only real translation targets. A null locale must never be emitted as
 * hreflang and must never be treated as an indexable alternate URL.
 */
export function getHreflangRouteSet(path: string): HreflangRouteSet {
  const normalizedPath = normalizeRoutePath(path);
  const isGreek = normalizedPath === "/el" || normalizedPath.startsWith("/el/");
  const isHebrew = normalizedPath === "/he" || normalizedPath.startsWith("/he/");

  const enPath = isGreek
    ? (EL_TO_EN_PATHS[normalizedPath] ?? (normalizedPath === "/el" ? "/" : normalizedPath.replace(/^\/el/, "") || "/"))
    : isHebrew
      ? (HE_TO_EN_PATHS[normalizedPath] ?? (normalizedPath === "/he" ? "/" : normalizedPath.replace(/^\/he/, "") || "/"))
      : normalizedPath;

  const hasExplicitGreekMapping = Object.prototype.hasOwnProperty.call(EN_TO_EL_PATHS, enPath);

  return {
    en: enPath,
    // An explicit null is a deliberate missing translation. Only absent keys
    // use the established same-slug Greek fallback convention.
    el: isGreek
      ? normalizedPath
      : hasExplicitGreekMapping
        ? EN_TO_EL_PATHS[enPath]
        : (enPath === "/" ? "/el" : `/el${enPath}`),
    he: isHebrew ? normalizedPath : (EN_TO_HE_PATHS[enPath] ?? null),
  };
}

/** Backwards-compatible English/Greek view used by established site code. */
export type HreflangPair = Pick<HreflangRouteSet, "en" | "el">;

export function getHreflangPair(path: string): HreflangPair {
  const { en, el } = getHreflangRouteSet(path);
  return { en, el };
}

/**
 * Visitor navigation fallback for English pages without a Greek translation.
 * This is deliberately separate from hreflang: missing translations must never
 * emit a fabricated Greek alternate URL.
 */
export function getGreekLanguageTogglePath(path: string): string {
  const normalizedPath = normalizeRoutePath(path);
  const { el } = getHreflangRouteSet(normalizedPath);
  return el ?? EL_LANGUAGE_TOGGLE_FALLBACKS[normalizedPath] ?? "/el";
}

/**
 * Hebrew is not exposed in the public selector until a mapped, real Hebrew
 * route exists. When the selector is enabled later, this gives it a safe home
 * fallback while hreflang remains limited to actual translated targets.
 */
export function getHebrewLanguageTogglePath(path: string): string {
  return getHreflangRouteSet(path).he ?? "/he";
}
