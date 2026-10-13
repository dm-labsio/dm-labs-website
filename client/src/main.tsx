import { createRoot, hydrateRoot } from "react-dom/client";
import { useEffect, type ReactElement } from "react";
// Styles first, in their original order (see pageStyles.ts), then the app.
import "./pageStyles";
import App from "./App";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { loadVisitorCurrency } from "./lib/visitorCurrency";
import { preloadRoute } from "./pageRoutes";
import "./index.css";

// Snapshots already contain SEO scripts for crawlers. Recreate them for this
// mount so route effects own cleanup and cannot leak metadata to another page.
document.head.querySelectorAll('script[type="application/ld+json"]').forEach(script => script.remove());

const root = document.getElementById("root")!;

// How the page starts:
//
// scripts/prerender-full.mjs saves every page as static HTML. In that build
// browser (window.__DM_STATIC_SNAPSHOT__), the app is rendered to HTML with
// react-dom/server, then adopted with hydrateRoot so effects run (SEO tags,
// structured data). If that adoption matched exactly, the page is marked
// data-hydratable="true" before it is saved.
//
// A visitor's browser then adopts (hydrates) that saved HTML instead of
// redrawing it: the page on screen is reused, so nothing is painted twice and
// far less work happens on a phone. Hydration needs the HTML to have been
// produced by react-dom/server (useId values differ from a client render,
// which is why plain createRoot snapshots could never be hydrated).
//
// Anything else falls back to a full client render, exactly as before:
// pages not marked hydratable, a visitor whose currency differs from the
// saved prices, or development. If hydration still finds a difference,
// React re-renders on its own; onRecoverableError only reports it.
type SnapshotWindow = Window & { __DM_STATIC_SNAPSHOT__?: boolean; __DM_APP_READY__?: boolean };

/** Signals that the first render has committed (the build's hydration check waits for it). */
function AppReady() {
  useEffect(() => {
    (window as SnapshotWindow).__DM_APP_READY__ = true;
  }, []);
  return null;
}
const snapshotMode = Boolean((window as SnapshotWindow).__DM_STATIC_SNAPSHOT__);
const savedCurrency = document.documentElement.dataset.currency;
const canHydrate = root.dataset.hydratable === "true" && root.firstElementChild !== null;

function reportMismatch(error: unknown) {
  if (snapshotMode) root.dataset.hydratable = "false";
  console.warn("[hydration] page re-rendered on the client:", error);
}

async function renderSnapshot(app: ReactElement) {
  // Build-time only: the server renderer never ships to visitors' first load.
  try {
    const { renderToString } = await import("react-dom/server");
    root.innerHTML = renderToString(app);
    root.dataset.hydratable = "true";
    hydrateRoot(root, app, { onRecoverableError: reportMismatch });
  } catch (error) {
    console.warn("[hydration] server render failed, saving a client render:", error);
    root.innerHTML = "";
    delete root.dataset.hydratable;
    createRoot(root).render(app);
  }
}

// Keep the saved page visible while the small currency lookup resolves and
// this page's own code downloads (in parallel). The first render already has
// the right prices and the full page; timeout/failure uses EUR.
// A failed page download still mounts; the router then retries it.
void Promise.all([
  loadVisitorCurrency(),
  preloadRoute(window.location.pathname).catch(() => {}),
]).then(([currency]) => {
  document.documentElement.dataset.currency = currency;
  const app = <CurrencyProvider currency={currency}><App /><AppReady /></CurrencyProvider>;
  if (snapshotMode) {
    void renderSnapshot(app);
  } else if (canHydrate && savedCurrency === currency) {
    hydrateRoot(root, app, { onRecoverableError: reportMismatch });
  } else {
    root.removeAttribute("data-hydratable");
    createRoot(root).render(app);
  }
});
