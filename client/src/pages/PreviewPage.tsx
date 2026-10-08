/** Standalone demos use srcdoc so internal anchor navigation never pollutes browser history. */
import { useParams, useLocation } from "wouter";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { X } from "lucide-react";
import { PREVIEW_ORIGIN_KEY, safePreviewReturnPath } from "@/lib/previewNavigation";

const PREVIEW_MAP: Record<string, { name: string; url: string }> = {
  "luxe-realty": { name: "Luxe Realty", url: "/previews/luxe-realty.html" },
  "bella-salon":          { name: "Bella Salon",          url: "/previews/bella-salon.html" },
  "pulse-gym":            { name: "Pulse Gym",            url: "/previews/pulse-gym.html" },
  "dr-elara-dental":      { name: "Dr. Elara Dental",     url: "/previews/dr-elara-dental.html" },
  "nomad-coffee":         { name: "Nomad Coffee",         url: "/previews/nomad-coffee.html" },
  "arcos-architecture":   { name: "Arcos Architecture",   url: "/previews/arcos-architecture.html" },
  "olio-deli":            { name: "Olio Deli",            url: "/previews/olio-deli.html" },
};

function setPreviewNoindexHead() {
  let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
  if (!robots) {
    robots = document.createElement("meta");
    robots.name = "robots";
    document.head.appendChild(robots);
  }
  robots.content = "noindex, follow";
  document.querySelector('link[rel="canonical"]')?.remove();
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((element) => element.remove());
}

function getReturnPath() {
  const requestedPath = new URLSearchParams(window.location.search).get("from");
  return safePreviewReturnPath(requestedPath);
}

export default function PreviewPage() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const [srcdoc, setSrcdoc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const returnPath = useMemo(getReturnPath, []);

  const entry = PREVIEW_MAP[params.id ?? ""];

  // Preview mock-ups are useful conversion assets, not indexable editorial pages.
  // This runs before the prerender snapshot and also protects the dynamic Express route.
  useEffect(() => {
    setPreviewNoindexHead();
  }, []);

  // A site-opened example has a real source entry. Direct links use a safe fallback.
  const goBack = useCallback(() => {
    if (window.history.state?.[PREVIEW_ORIGIN_KEY] === returnPath) {
      window.history.back();
    } else {
      navigate(returnPath, { replace: true });
    }
  }, [navigate, returnPath]);

  // Fetch HTML content for srcdoc (no URL = cleaner history baseline)
  useEffect(() => {
    if (!entry) return;
    setLoading(true);
    setError(false);
    fetch(entry.url)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load");
        return r.text();
      })
      .then((html) => {
        setSrcdoc(html);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [entry]);

  // Native Back returns to the source entry; no duplicate preview/sentinel entries.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") goBack(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [goBack]);

  // After iframe loads: attach capturing click listener to intercept hash links
  // This fires BEFORE the browser processes the anchor navigation, so we can
  // call preventDefault() and use scrollIntoView() instead — no history push.
  const handleIframeLoad = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    try {
      const doc = iframe.contentDocument;
      if (!doc) return;

      const clickHandler = (e: Event) => {
        // Interactive one-page demos manage focus/menu state themselves while
        // preventing hash history entries. Keep the fallback for older demos.
        if (doc.documentElement.dataset.previewNavigation === "managed") return;
        let el = e.target as HTMLElement | null;
        // Walk up to find the anchor element
        while (el && el.tagName !== "A") { el = el.parentElement; }
        if (!el) return;
        const href = (el as HTMLAnchorElement).getAttribute("href");
        // Intercept ALL hash links (both href="#" and href="#section")
        if (!href || href.charAt(0) !== "#") return;
        // Prevent the default hash navigation (which would push a history entry)
        e.preventDefault();
        e.stopImmediatePropagation();
        const id = href.slice(1);
        if (!id) return; // href="#" — just prevent, no scroll needed
        const dest = doc.getElementById(id) || doc.querySelector(`[name="${id}"]`);
        if (!dest) return;
        // Scroll to the target section instead
        const reducedMotion = iframe.contentWindow?.matchMedia("(prefers-reduced-motion: reduce)").matches;
        dest.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
      };

      // Use capture: true so we intercept before the browser's default handler
      doc.addEventListener("click", clickHandler, true);
    } catch {
      // Cross-origin or not accessible — ignore
    }
  }, []);

  if (!entry) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-4">
        <p className="text-gray-500 text-lg">Preview not found.</p>
        <button
          onClick={goBack}
          className="px-6 py-3 rounded-full font-semibold text-white"
          style={{ background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)" }}
        >
          Back to DM-Labs
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-white">
      {/* Slim top bar */}
      <div
        className="flex items-center justify-between shrink-0 px-3 sm:px-4"
        style={{
          height: "44px",
          background: "#111315",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span className="text-white/70 text-xs font-medium tracking-wide truncate max-w-[200px] sm:max-w-[300px]">
          {entry.name}
        </span>

        <div className="flex items-center gap-2">
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-xs px-2 py-1.5 rounded-lg hover:bg-white/10"
          >

            <span className="hidden sm:inline">New tab</span>
          </a>

          {/* X close — returns to the page that opened this preview in one click. */}
          <button
            onClick={goBack}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all"
            aria-label="Close preview"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-[#5B8CFF] rounded-full animate-spin" />
            <span className="text-gray-400 text-sm">Loading preview…</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <p className="text-gray-500">Could not load preview.</p>
            <button
              onClick={goBack}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white"
              style={{ background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)" }}
            >
              Back to DM-Labs
            </button>
          </div>
        </div>
      )}

      {/* srcdoc iframe — capturing click listener prevents hash history pollution */}
      {srcdoc && !loading && (
        <iframe
          ref={iframeRef}
          srcDoc={srcdoc}
          title={entry.name}
          onLoad={handleIframeLoad}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            border: "none",
            display: "block",
          }}
          sandbox={`allow-scripts allow-same-origin allow-forms allow-popups${["pulse-gym", "arcos-architecture"].includes(params.id ?? "") ? " allow-downloads" : ""}`}
        />
      )}
    </div>
  );
}
