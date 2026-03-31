/**
 * PreviewPage - /preview/:id
 * Renders the mini-site HTML at full viewport.
 *
 * ROOT CAUSE: iframe anchor links (href="#section") push entries into the
 * parent page's history stack. The browser back button then steps through
 * each hash entry one-by-one instead of closing the preview.
 *
 * PROVEN FIX (tested and verified):
 * 1. srcdoc instead of src — loads HTML content directly, no URL-based history.
 * 2. After iframe loads, attach a CAPTURING click listener to the iframe's
 *    contentDocument. This fires BEFORE the browser processes the hash link,
 *    allowing us to call preventDefault() and use scrollIntoView() instead.
 *    This completely stops history entries from being pushed.
 * 3. goBack() always calls navigate("/templates") — never history.back().
 * 4. popstate listener intercepts browser back button → navigate("/templates").
 */
import { useParams, useLocation } from "wouter";
import { useEffect, useState, useRef, useCallback } from "react";
import { X, ExternalLink } from "lucide-react";

const PREVIEW_MAP: Record<string, { name: string; url: string }> = {
  "bella-salon":          { name: "Bella Salon",          url: "/previews/bella-salon.html" },
  "verde-restaurant":     { name: "Verde Restaurant",     url: "/previews/verde-restaurant.html" },
  "pulse-gym":            { name: "Pulse Gym",            url: "/previews/pulse-gym.html" },
  "dr-elara-dental":      { name: "Dr. Elara Dental",     url: "/previews/dr-elara-dental.html" },
  "nomad-coffee":         { name: "Nomad Coffee",         url: "/previews/nomad-coffee.html" },
  "serenity-yoga":        { name: "Serenity Yoga",        url: "/previews/serenity-yoga.html" },
  "luxe-realty":          { name: "Luxe Realty",          url: "/previews/luxe-realty.html" },
  "little-stars-nursery": { name: "Little Stars Nursery", url: "/previews/little-stars-nursery.html" },
  "arcos-architecture":   { name: "Arcos Architecture",   url: "/previews/arcos-architecture.html" },
  "olio-deli":            { name: "Olio Deli",            url: "/previews/olio-deli.html" },
  "horizon-law":          { name: "Horizon Law",          url: "/previews/horizon-law.html" },
};

export default function PreviewPage() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const [srcdoc, setSrcdoc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const entry = PREVIEW_MAP[params.id ?? ""];

  // Always navigate directly to /templates — never use history.back()
  const goBack = useCallback(() => {
    navigate("/templates");
  }, [navigate]);

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

  // Prevent body scroll + intercept browser back button
  useEffect(() => {
    document.body.style.overflow = "hidden";
    // Push sentinel so the first back press is caught by our listener
    window.history.pushState({ previewSentinel: true }, "");

    const onPopState = () => {
      // Any back press while preview is open → go directly to /templates
      navigate("/templates");
    };
    window.addEventListener("popstate", onPopState);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("popstate", onPopState);
    };
  }, [navigate]);

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
        dest.scrollIntoView({ behavior: "smooth", block: "start" });
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
          onClick={() => navigate("/templates")}
          className="px-6 py-3 rounded-full font-semibold text-white"
          style={{ background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)" }}
        >
          Back to Examples
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
            <ExternalLink size={13} />
            <span className="hidden sm:inline">New tab</span>
          </a>

          {/* X close — always navigates directly to /templates in one click */}
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
              Back to Examples
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
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      )}
    </div>
  );
}
