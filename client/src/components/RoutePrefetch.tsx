import { useEffect } from "react";
import { useLocation } from "wouter";
import { getRouteLanguage } from "@/lib/routeLanguage";
import { pageFor, preloadRoute } from "@/pageRoutes";

const MAIN_PAGES = [
  "/services/",
  "/process/",
  "/templates/",
  "/pricing/",
  "/faq/",
  "/contact/",
  "/blog/",
];
const PREFIX = { en: "", el: "/el", he: "/he" } as const;

type Connection = { saveData?: boolean; effectiveType?: string };

let chunkMap: Promise<Record<string, string[]>> | null = null;
const hinted = new Set<string>();

/** Downloads a page's code files without running them (see page-chunks.json). */
async function downloadOnly(path: string) {
  const page = pageFor(path);
  if (!page || page.isLoaded()) return;
  chunkMap ??= fetch("/page-chunks.json").then(response =>
    response.ok ? response.json() : {}
  );
  const files = (await chunkMap)[page.key] ?? [];
  for (const file of files) {
    if (hinted.has(file)) continue;
    hinted.add(file);
    // A plain low-priority request fills the browser cache. Unlike adding
    // <link rel="modulepreload"> tags, it never changes the page, which on
    // this site would make the browser re-check every style on the page.
    await fetch(`/${file}`, {
      priority: "low",
      credentials: "same-origin",
    } as RequestInit).catch(() => {});
  }
}

function internalPath(target: EventTarget | null): string | null {
  const link = target instanceof Element ? target.closest("a[href]") : null;
  if (!(link instanceof HTMLAnchorElement) || link.target === "_blank")
    return null;
  if (link.origin !== window.location.origin) return null;
  return link.pathname;
}

/**
 * Gets a page's code ready before it is needed, so moving between pages stays
 * instant. When a finger touches or a pointer rests on a link, that page is
 * loaded. Once the current page is idle, the main menu pages in the visitor's
 * language are only downloaded (not run), so the open page never stutters.
 */
export default function RoutePrefetch() {
  const [location] = useLocation();
  const language = getRouteLanguage(location);

  useEffect(() => {
    const onIntent = (event: Event) => {
      const path = internalPath(event.target);
      if (path) void preloadRoute(path).catch(() => {});
    };
    document.addEventListener("pointerover", onIntent, { passive: true });
    document.addEventListener("touchstart", onIntent, { passive: true });
    document.addEventListener("focusin", onIntent);
    return () => {
      document.removeEventListener("pointerover", onIntent);
      document.removeEventListener("touchstart", onIntent);
      document.removeEventListener("focusin", onIntent);
    };
  }, []);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: Connection })
      .connection;
    if (
      connection?.saveData ||
      /(^|-)2g$/.test(connection?.effectiveType ?? "")
    )
      return;
    let cancelled = false;
    let handle = 0;
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = (callback: () => void) =>
      hasIdle
        ? window.requestIdleCallback(callback, { timeout: 4000 })
        : window.setTimeout(callback, 1500);
    const cancelIdle = (id: number) =>
      hasIdle ? window.cancelIdleCallback(id) : window.clearTimeout(id);
    const queue = MAIN_PAGES.map(page => `${PREFIX[language]}${page}`);
    const next = () => {
      const path = queue.shift();
      if (!path || cancelled) return;
      handle = idle(() => {
        downloadOnly(path)
          .catch(() => {})
          .finally(next);
      });
    };
    // Start after the current page has finished loading and settled.
    const start = window.setTimeout(next, 2500);
    return () => {
      cancelled = true;
      window.clearTimeout(start);
      cancelIdle(handle);
    };
  }, [language]);

  return null;
}
