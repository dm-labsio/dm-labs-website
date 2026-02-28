/* D&M Studio — GDPR Cookie Consent Banner
   GDPR compliant: Accept All / Reject Non-Essential / Manage Preferences
   Non-intrusive, thumb-friendly, does not block WhatsApp button */

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const COOKIE_KEY = "dm_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      // Small delay so it doesn't flash immediately
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ essential: true, analytics: true }));
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ essential: true, analytics: false }));
    setVisible(false);
  };

  const savePrefs = () => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ essential: true, analytics }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 bg-white rounded-2xl shadow-2xl border border-border p-5"
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">🍪</span>
          <h2 className="font-semibold text-sm text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            We use cookies
          </h2>
        </div>
        <button
          onClick={reject}
          className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
          aria-label="Close and reject non-essential cookies"
        >
          <X size={16} />
        </button>
      </div>

      {!showPrefs ? (
        <>
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            We use cookies to improve your experience on our website. You can choose which cookies to allow.
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={accept}
              className="w-full py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-[oklch(0.52_0.19_264)] transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Accept All
            </button>
            <div className="flex gap-2">
              <button
                onClick={reject}
                className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={() => setShowPrefs(true)}
                className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Manage
              </button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            <a href="/cookies" className="underline hover:text-foreground transition-colors">Cookie Policy</a>
            {" · "}
            <a href="/privacy" className="underline hover:text-foreground transition-colors">Privacy Policy</a>
          </p>
        </>
      ) : (
        <>
          <p className="text-xs text-muted-foreground mb-3">Choose which cookies to allow:</p>
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Essential cookies</p>
                <p className="text-xs text-muted-foreground">Required for the website to work</p>
              </div>
              <div className="w-10 h-5 bg-primary rounded-full flex items-center justify-end px-0.5 cursor-not-allowed opacity-60">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Analytics cookies</p>
                <p className="text-xs text-muted-foreground">Help us improve our website</p>
              </div>
              <button
                onClick={() => setAnalytics(!analytics)}
                className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${analytics ? "bg-primary justify-end" : "bg-muted justify-start"}`}
                aria-label={analytics ? "Disable analytics cookies" : "Enable analytics cookies"}
                role="switch"
                aria-checked={analytics}
              >
                <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
              </button>
            </div>
          </div>
          <button
            onClick={savePrefs}
            className="w-full py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-[oklch(0.52_0.19_264)] transition-colors"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Save Preferences
          </button>
          <button
            onClick={() => setShowPrefs(false)}
            className="w-full mt-2 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </button>
        </>
      )}
    </div>
  );
}
