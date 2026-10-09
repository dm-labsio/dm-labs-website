import { useEffect, useState, type ComponentType } from "react";
import type { SiteLanguage } from "@/lib/routeLanguage";
import {
  isSeasonActive,
  isSeasonalHomepage,
  SEASONAL_CONFIG,
} from "./seasonalConfig";

// Both entry points share the same CSS chunk. A second Vite preload can see
// the first link before it has loaded, so share the whole import promise too.
// This caches only code, never a visitor's campaign/session preferences.
let halloweenModule: Promise<typeof import("./HalloweenLayer")> | undefined;
function loadHalloweenModule() {
  // Keep failures cached too: don't retry into a partially loaded stylesheet
  // on SPA navigation. A fresh page load can try the optional layer again.
  return (halloweenModule ??= import("./HalloweenLayer"));
}

/** Decorations are progressive enhancement. Nothing blocks the original hero. */
export default function SeasonalHome({
  language,
  sitewide = false,
}: {
  language: SiteLanguage;
  sitewide?: boolean;
}) {
  const [Layer, setLayer] = useState<ComponentType<{
    language: SiteLanguage;
  }> | null>(null);
  useEffect(() => {
    // Build snapshots retain only the permanent page. This flag is set by our
    // prerender browser, not by bot detection or a public query parameter.
    if (
      (window as Window & { __DM_STATIC_SNAPSHOT__?: boolean })
        .__DM_STATIC_SNAPSHOT__
    )
      return;
    if (
      (!sitewide && !isSeasonalHomepage(location.pathname)) ||
      !isSeasonActive()
    )
      return;
    if (sitewide && !SEASONAL_CONFIG.sitewideBats) return;
    let cancelled = false;
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      if (sessionStorage.getItem(`dm-season-hidden:${SEASONAL_CONFIG.id}`))
        return;
    } catch {
      /* Decorations also work when storage is unavailable. */
    }
    // A sibling's optional chunk may still be in flight when the banner closes.
    // Cancel that mount too, including when session storage is unavailable.
    const hide = () => {
      cancelled = true;
      setLayer(null);
    };
    window.addEventListener("dm-season-hide", hide);
    const load = () => {
      if (cancelled || !isSeasonActive()) return;
      void loadHalloweenModule()
        .then(async module =>
          sitewide ? (await import("./SeasonalBats")).default : module.default
        )
        .then(Component => {
          if (!cancelled && isSeasonActive()) setLayer(() => Component);
        })
        .catch(() => {
          /* A failed optional chunk must never break the page. */
        });
    };
    const schedule = () => {
      if ("requestIdleCallback" in window)
        idle = window.requestIdleCallback(load, { timeout: 2000 });
      else timer = setTimeout(load, 250);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("dm-season-hide", hide);
      window.removeEventListener("load", schedule);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, [sitewide]);
  return Layer ? <Layer language={language} /> : null;
}
