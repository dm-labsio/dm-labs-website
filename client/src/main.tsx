import { createRoot } from "react-dom/client";
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

// This project has no real server-side rendering: scripts/prerender-full.mjs
// captures a fully client-rendered DOM snapshot (via this same createRoot
// path, visiting an initially empty #root during the build) and saves it as
// static HTML for crawlers/first paint. A real visitor's browser therefore
// always loads non-empty markup, but that markup was never produced by
// react-dom/server — hydrateRoot expects server-hydratable output and uses a
// different useId() scheme than createRoot, which deterministically mismatches
// on every Radix UI id (present on every page via the header's language
// switcher), forcing React to discard and rebuild the affected subtree with a
// visible flash and a console error. createRoot always matches how the
// snapshot was actually produced, so there is nothing to diff against and no
// mismatch is possible; crawlers still see the full prerendered HTML source
// regardless of which client API mounts the app afterward.
// Keep the prerendered page visible while the small lookup resolves and this
// page's own code downloads (in parallel). The first interactive render
// already has the right prices and the full page; timeout/failure uses EUR.
// A failed page download still mounts; the router then retries it.
void Promise.all([
  loadVisitorCurrency(),
  preloadRoute(window.location.pathname).catch(() => {}),
]).then(([currency]) => {
  document.documentElement.dataset.currency = currency;
  createRoot(root).render(<CurrencyProvider currency={currency}><App /></CurrencyProvider>);
});
