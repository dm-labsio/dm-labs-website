/**
 * PreviewPage — /preview/:id
 * Renders the mini-site HTML file at full viewport width and height.
 * On mobile: pressing the browser back button closes it naturally.
 * No iframe scaling, no cramping, no phone frames.
 * A slim top bar shows the template name and a back button.
 */
import { useParams, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";

// Inline TEMPLATES map — just id → { name, previewUrl }
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

  useEffect(() => {
    // Prevent body scroll while preview is open
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
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
          Back to Templates
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-white" style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Slim top bar */}
      <div
        className="flex items-center justify-between shrink-0"
        style={{
          height: "48px",
          background: "#111",
          padding: "0 12px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <button
          onClick={() => navigate("/templates")}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
          style={{ background: "none", border: "none", cursor: "pointer", padding: "8px 4px" }}
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Back to Templates</span>
          <span className="sm:hidden">Back</span>
        </button>

        <span className="text-white/60 text-xs font-medium tracking-wide uppercase truncate max-w-[180px]">
          {entry.name}
        </span>

        <a
          href={entry.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-xs"
        >
          <ExternalLink size={14} />
          <span className="hidden sm:inline">Open in tab</span>
        </a>
      </div>

      {/* Loading shimmer */}
      {!loaded && (
        <div className="absolute inset-0 top-[48px] bg-gray-100 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            <span className="text-gray-400 text-sm">Loading preview...</span>
          </div>
        </div>
      )}

      {/* Full-viewport iframe — no scaling, no cramping */}
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
