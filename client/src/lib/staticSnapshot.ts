/**
 * True only in the build browser that saves each page as static HTML
 * (scripts/prerender-full.mjs). Effects that react to the build browser's
 * window size or scroll position skip it, so the saved page matches what a
 * visitor's browser renders first and can be adopted (hydrated) as-is.
 */
export function isStaticSnapshot(): boolean {
  return Boolean(
    (window as Window & { __DM_STATIC_SNAPSHOT__?: boolean })
      .__DM_STATIC_SNAPSHOT__
  );
}
