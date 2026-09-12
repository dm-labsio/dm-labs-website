import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

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
createRoot(root).render(<App />);
