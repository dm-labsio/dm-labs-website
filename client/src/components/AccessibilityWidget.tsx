/* D&M LABS - Accessibility Widget
 * Design: Minimal, unobtrusive. Small icon button fixed bottom-left.
 * Opens a compact panel with font size and contrast controls.
 * Does NOT override brand colors or layout - purely additive.
 *
 * IMPORTANT: High contrast is applied to #a11y-content-wrapper (NOT body).
 * Applying filter to body creates a new CSS stacking context which breaks
 * position:fixed elements (they lose viewport-relative positioning).
 * By targeting only the content wrapper, fixed elements (nav, WhatsApp btn,
 * this widget) remain unaffected and always visible.
 */

import { useState, useEffect, useRef } from "react";
import { Accessibility, X, Plus, Minus, Sun } from "lucide-react";

type FontSize = "normal" | "large" | "xlarge";
type Contrast = "normal" | "high";

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>("normal");
  const [contrast, setContrast] = useState<Contrast>("normal");

  // Apply font size to root html element
  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === "large") root.style.fontSize = "110%";
    else if (fontSize === "xlarge") root.style.fontSize = "125%";
    else root.style.fontSize = "";
  }, [fontSize]);

  // Apply high contrast filter to the CONTENT WRAPPER only (not body).
  // This avoids the CSS stacking context bug that breaks position:fixed elements.
  useEffect(() => {
    const wrapper = document.getElementById("a11y-content-wrapper");
    if (!wrapper) return;
    if (contrast === "high") {
      wrapper.style.filter = "contrast(1.5) saturate(0.85)";
      wrapper.style.transition = "filter 0.3s ease";
    } else {
      wrapper.style.filter = "";
      wrapper.style.transition = "filter 0.3s ease";
    }
  }, [contrast]);

  const hasChanges = fontSize !== "normal" || contrast !== "normal";
  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel when clicking/tapping outside (important for mobile)
  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent | TouchEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [open]);

  function reset() {
    setFontSize("normal");
    setContrast("normal");
  }

  return (
    <>
      {/* Trigger button — fixed bottom-left, always visible regardless of contrast state */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Accessibility options"
        aria-expanded={open}
        className="fixed bottom-6 left-5 z-[9998] w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5B8CFF] touch-manipulation"
        style={{
          background: hasChanges ? "#5B8CFF" : "rgba(91,107,114,0.12)",
          color: hasChanges ? "#fff" : "#5B6472",
          backdropFilter: "blur(8px)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <Accessibility size={16} />
      </button>

      {/* Panel — also fixed, outside the filtered wrapper */}
      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-16 left-5 z-[9999] rounded-xl border border-[#E2E5EA] bg-white shadow-lg p-4"
          style={{ width: "min(13rem, calc(100vw - 2.5rem))" }}
          role="dialog"
          aria-label="Accessibility settings"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#111315] uppercase tracking-wide">Accessibility</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close accessibility panel"
              className="text-[#9BA3AF] hover:text-[#111315] transition-colors p-0.5 touch-manipulation"
            >
              <X size={14} />
            </button>
          </div>

          {/* Font size */}
          <div className="mb-3">
            <p className="text-xs text-[#5B6472] mb-1.5">Text Size</p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setFontSize(s => s === "xlarge" ? "large" : s === "large" ? "normal" : "normal")}
                aria-label="Decrease text size"
                disabled={fontSize === "normal"}
                className="w-7 h-7 rounded-lg flex items-center justify-center border border-[#E2E5EA] text-[#5B6472] hover:border-[#5B8CFF] hover:text-[#5B8CFF] disabled:opacity-30 disabled:cursor-not-allowed transition-colors touch-manipulation"
              >
                <Minus size={12} />
              </button>
              <span className="flex-1 text-center text-xs text-[#111315] font-medium">
                {fontSize === "normal" ? "Default" : fontSize === "large" ? "Large" : "X-Large"}
              </span>
              <button
                onClick={() => setFontSize(s => s === "normal" ? "large" : s === "large" ? "xlarge" : "xlarge")}
                aria-label="Increase text size"
                disabled={fontSize === "xlarge"}
                className="w-7 h-7 rounded-lg flex items-center justify-center border border-[#E2E5EA] text-[#5B6472] hover:border-[#5B8CFF] hover:text-[#5B8CFF] disabled:opacity-30 disabled:cursor-not-allowed transition-colors touch-manipulation"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          {/* Contrast */}
          <div className="mb-3">
            <p className="text-xs text-[#5B6472] mb-1.5">Contrast</p>
            <button
              onClick={() => setContrast(c => c === "normal" ? "high" : "normal")}
              aria-pressed={contrast === "high"}
              className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all touch-manipulation"
              style={{
                borderColor: contrast === "high" ? "#5B8CFF" : "#E2E5EA",
                background: contrast === "high" ? "#EEF3FF" : "transparent",
                color: contrast === "high" ? "#5B8CFF" : "#5B6472",
              }}
            >
              <Sun size={12} />
              {contrast === "high" ? "High Contrast: On" : "High Contrast: Off"}
            </button>
          </div>

          {/* Reset */}
          {hasChanges && (
            <button
              onClick={reset}
              className="w-full text-xs text-[#9BA3AF] hover:text-[#5B6472] transition-colors text-center pt-2 border-t border-[#F3F4F6] touch-manipulation"
            >
              Reset to default
            </button>
          )}
        </div>
      )}
    </>
  );
}
