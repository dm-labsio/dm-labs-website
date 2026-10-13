import { useEffect, useReducer, useRef } from "react";
import { useBrowserLocation } from "wouter/use-browser-location";
import { isRouteReady, preloadRoute } from "@/pageRoutes";

/**
 * Router location that only moves to a page once its code has downloaded.
 * Until then the current page stays on screen (no blank placeholder), and
 * anything that runs on a page change (scroll to #section, keeping the
 * scroll position on a language switch) runs against the real new page.
 */
export function useReadyLocation(): ReturnType<typeof useBrowserLocation> {
  const [path, navigate] = useBrowserLocation();
  const shown = useRef(path);
  const [, rerender] = useReducer((count: number) => count + 1, 0);
  const ready = isRouteReady(path);
  if (ready) shown.current = path;

  useEffect(() => {
    if (ready) return;
    let current = true;
    preloadRoute(path).then(
      () => current && rerender(),
      () => {
        // The page's code could not be fetched (offline, or a new release
        // replaced the files): fall back to a normal page load.
        if (current) window.location.reload();
      }
    );
    return () => {
      current = false;
    };
  }, [path, ready]);

  return [shown.current, navigate];
}
