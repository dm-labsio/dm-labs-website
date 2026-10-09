import { useEffect, useState, type ComponentType } from "react";
import type { SiteLanguage } from "@/lib/routeLanguage";
import {
  isSeasonActive,
  isSeasonalHomepage,
  SEASONAL_CONFIG,
} from "./seasonalConfig";

/** Decorations are progressive enhancement. Nothing blocks the original hero. */
export default function SeasonalHome({ language }: { language: SiteLanguage }) {
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
    if (!isSeasonalHomepage(location.pathname) || !isSeasonActive()) return;
    let cancelled = false;
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      if (sessionStorage.getItem(`dm-season-hidden:${SEASONAL_CONFIG.id}`))
        return;
    } catch {
      /* Decorations also work when storage is unavailable. */
    }
    const load = () => {
      if (cancelled || !isSeasonActive()) return;
      void import("./HalloweenLayer")
        .then(module => {
          if (!cancelled && isSeasonActive()) setLayer(() => module.default);
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
      window.removeEventListener("load", schedule);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, []);
  return Layer ? <Layer language={language} /> : null;
}
