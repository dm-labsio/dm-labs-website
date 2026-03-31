/**
 * PreviewPage - /preview/:id
 * Renders the mini-site HTML file at full viewport width and height.
 * On mobile: pressing the browser back button closes it naturally.
 * No iframe scaling, no cramping, no phone frames.
 * A slim top bar shows the template name, a clear X close button, and an open-in-tab link.
 */
import { useParams, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { X, ExternalLink } from "lucide-react";

// Inline TEMPLATES map - just id -> { name, previewUrl }
// Kept minimal to avoid importing the full Templates page bundle.
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
  const [loaded, setLoaded] = useState(false);

  const entry = PREVIEW_MAP[params.id ?? ""];

  const goBack = () => {
    // Try to go back in history first, fallback to /templates
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate("/templates");
    }
  };

  useEffect(() => {
    // Prevent body scroll while preview is open
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Handle Escape key to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") goBack(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
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
        {/* Left: template name */}
        <span className="text-white/70 text-xs font-medium tracking-wide truncate max-w-[200px] sm:max-w-[300px]">
          {entry.name}
        </span>

        {/* Right: actions */}
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

          {/* Clear X close button */}
          <button
            onClick={goBack}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all"
            aria-label="Close preview"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Loading shimmer */}
      {!loaded && (
        <div className="absolute inset-0 top-[44px] bg-gray-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-[#5B8CFF] rounded-full animate-spin" />
            <span className="text-gray-400 text-sm">Loading preview...</span>
          </div>
        </div>
      )}

      {/* Full-viewport iframe - no scaling, no cramping */}
      <iframe
        src={entry.url}
        title={entry.name}
        onLoad={() => setLoaded(true)}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
}
