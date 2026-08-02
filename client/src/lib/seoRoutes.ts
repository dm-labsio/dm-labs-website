export const SEO_BASE_URL = "https://dm-labs.io";

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

export const EL_TO_EN_PATHS: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(EN_TO_EL_PATHS)
    .filter(([, elPath]) => elPath !== null)
    .map(([enPath, elPath]) => [elPath as string, enPath]),
);

export type HreflangPair = {
  en: string;
  el: string | null;
};

export function getHreflangPair(path: string): HreflangPair {
  const normalizedPath = normalizeRoutePath(path);
  const isGreek = normalizedPath === "/el" || normalizedPath.startsWith("/el/");

  if (isGreek) {
    return {
      en: EL_TO_EN_PATHS[normalizedPath] ?? (normalizedPath === "/el" ? "/" : normalizedPath.replace(/^\/el/, "") || "/"),
      el: normalizedPath,
    };
  }

  const mappedPath = EN_TO_EL_PATHS[normalizedPath];
  return {
    en: normalizedPath,
    el: mappedPath === undefined ? (normalizedPath === "/" ? "/el" : `/el${normalizedPath}`) : mappedPath,
  };
}
