/* D&M LABS - GDPR Cookie Consent Banner */
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
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => { localStorage.setItem(COOKIE_KEY, JSON.stringify({ essential: true, analytics: true })); setVisible(false); };
  const reject = () => { localStorage.setItem(COOKIE_KEY, JSON.stringify({ essential: true, analytics: false })); setVisible(false); };
  const savePrefs = () => { localStorage.setItem(COOKIE_KEY, JSON.stringify({ essential: true, analytics })); setVisible(false); };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 bg-white rounded-2xl shadow-2xl border border-[#E2E5EA] p-5"
      role="dialog" aria-label="Cookie consent" aria-live="polite"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h2 className="font-semibold text-sm text-[#111315]">We use cookies</h2>
        <button onClick={reject} className="text-[#5B6472] hover:text-[#111315] transition-colors p-1 rounded" aria-label="Close">
          <X size={16} />
        </button>
      </div>

      {!showPrefs ? (
        <>
          <p className="text-xs text-[#5B6472] leading-relaxed mb-4">We use cookies to improve your experience. You can choose which cookies to allow.</p>
          <div className="flex flex-col gap-2">
            <button onClick={accept} className="w-full py-2.5 rounded-xl brand-gradient text-white text-sm font-semibold hover:opacity-90 transition-opacity">Accept All</button>
            <div className="flex gap-2">
              <button onClick={reject} className="flex-1 py-2.5 rounded-xl border border-[#E2E5EA] text-sm font-medium text-[#111315] hover:bg-[#F6F6F4] transition-colors">Reject</button>
              <button onClick={() => setShowPrefs(true)} className="flex-1 py-2.5 rounded-xl border border-[#E2E5EA] text-sm font-medium text-[#111315] hover:bg-[#F6F6F4] transition-colors">Manage</button>
            </div>
          </div>
          <p className="text-xs text-[#5B6472] mt-3 text-center">
            <a href="/cookies" className="underline hover:text-[#5B8CFF] transition-colors">Cookie Policy</a>
            {" · "}
            <a href="/privacy" className="underline hover:text-[#5B8CFF] transition-colors">Privacy Policy</a>
          </p>
        </>
      ) : (
        <>
          <p className="text-xs text-[#5B6472] mb-3">Choose which cookies to allow:</p>
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-[#111315]">Essential</p><p className="text-xs text-[#5B6472]">Required</p></div>
              <div className="w-10 h-5 bg-[#5B8CFF] rounded-full flex items-center justify-end px-0.5 opacity-60 cursor-not-allowed"><div className="w-4 h-4 bg-white rounded-full" /></div>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-[#111315]">Analytics</p><p className="text-xs text-[#5B6472]">Help us improve</p></div>
              <button onClick={() => setAnalytics(!analytics)} className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${analytics ? "bg-[#5B8CFF] justify-end" : "bg-[#E2E5EA] justify-start"}`} role="switch" aria-checked={analytics}>
                <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
              </button>
            </div>
          </div>
          <button onClick={savePrefs} className="w-full py-2.5 rounded-xl brand-gradient text-white text-sm font-semibold hover:opacity-90 transition-opacity">Save Preferences</button>
          <button onClick={() => setShowPrefs(false)} className="w-full mt-2 py-2 text-xs text-[#5B6472] hover:text-[#111315] transition-colors">← Back</button>
        </>
      )}
    </div>
  );
}
