export type SiteLanguage = "en" | "el" | "he";

/** Locale follows the URL, including on an English first load after a Hebrew visit. */
export function getRouteLanguage(path: string): SiteLanguage {
  const pathname = path.split(/[?#]/, 1)[0];
  return /^\/he(?:\/|$)/.test(pathname) ? "he" : /^\/el(?:\/|$)/.test(pathname) ? "el" : "en";
}
