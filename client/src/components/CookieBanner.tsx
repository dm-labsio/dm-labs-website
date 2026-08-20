/* D&M LABS - GDPR Cookie Consent Banner — EN/EL/HE */
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const COOKIE_KEY = "dm_cookie_consent";

const STRINGS = {
  en: {
    title: "We use cookies",
    body: "We use cookies to improve your experience. You can choose which cookies to allow.",
    acceptAll: "Accept All",
    reject: "Reject",
    manage: "Manage",
    cookiePolicy: "Cookie Policy",
    privacyPolicy: "Privacy Policy",
    chooseWhich: "Choose which cookies to allow:",
    essential: "Essential",
    required: "Required",
    analytics: "Analytics",
    helpUs: "Help us improve",
    savePrefs: "Save Preferences",
    back: "← Back",
    cookieHref: "/cookies/",
    privacyHref: "/privacy/",
  },
  el: {
    title: "Χρησιμοποιούμε cookies",
    body: "Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία σας. Μπορείτε να επιλέξετε ποια cookies να επιτρέψετε.",
    acceptAll: "Αποδοχή Όλων",
    reject: "Απόρριψη",
    manage: "Διαχείριση",
    cookiePolicy: "Πολιτική Cookies",
    privacyPolicy: "Πολιτική Απορρήτου",
    chooseWhich: "Επιλέξτε ποια cookies να επιτρέψετε:",
    essential: "Απαραίτητα",
    required: "Υποχρεωτικά",
    analytics: "Αναλυτικά",
    helpUs: "Μας βοηθούν να βελτιωθούμε",
    savePrefs: "Αποθήκευση Προτιμήσεων",
    back: "← Πίσω",
    cookieHref: "/el/cookies/",
    privacyHref: "/el/privacy/",
  },
  he: {
    title: "אנחנו משתמשים בעוגיות",
    body: "אנחנו משתמשים בעוגיות כדי לשפר את החוויה באתר. ניתן לבחור אילו עוגיות לאפשר.",
    acceptAll: "אני מאשר/ת",
    reject: "לא, תודה",
    manage: "הגדרות",
    cookiePolicy: "מדיניות עוגיות",
    privacyPolicy: "מדיניות פרטיות",
    chooseWhich: "בחרו אילו עוגיות לאפשר:",
    essential: "חיוניות",
    required: "נדרשות",
    analytics: "אנליטיקה",
    helpUs: "עוזרות לנו להשתפר",
    savePrefs: "שמירת העדפות",
    back: "חזרה",
    cookieHref: "/he/cookies/",
    privacyHref: "/he/privacy/",
  },
};

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  const locale = typeof window !== "undefined" && window.location.pathname.startsWith("/he")
    ? "he"
    : typeof window !== "undefined" && window.location.pathname.startsWith("/el") ? "el" : "en";
  const t = STRINGS[locale];
  const isHebrew = locale === "he";

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
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
      className={`fixed bottom-5 z-50 w-[min(16rem,calc(100vw-2rem))] bg-white rounded-xl shadow-xl border border-[#E2E5EA] p-3 ${isHebrew ? "left-4 right-auto text-right sm:left-6" : "right-4 left-auto sm:right-6"}`}
      role="dialog" aria-label="Cookie consent" aria-live="polite"
      dir={isHebrew ? "rtl" : undefined}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h2 className="font-semibold text-sm text-[#111315]">{t.title}</h2>
        <button onClick={reject} className="text-[#5B6472] hover:text-[#111315] transition-colors p-1 rounded" aria-label="Close">
          <X size={16} />
        </button>
      </div>

      {!showPrefs ? (
        <>
          <p className="text-xs text-[#5B6472] leading-relaxed mb-3">{t.body}</p>
          <div className="flex flex-col gap-2">
            <button onClick={accept} className="w-full min-h-10 py-2 rounded-xl brand-gradient text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center" style={{ textAlign: "center" }}>{t.acceptAll}</button>
            <div className="flex gap-2">
            <button onClick={reject} className="flex-1 min-h-10 py-2 rounded-xl border border-[#E2E5EA] text-sm font-medium text-[#111315] hover:bg-[#F6F6F4] transition-colors text-center">{t.reject}</button>
            <button onClick={() => setShowPrefs(true)} className="flex-1 min-h-10 py-2 rounded-xl border border-[#E2E5EA] text-sm font-medium text-[#111315] hover:bg-[#F6F6F4] transition-colors text-center">{t.manage}</button>
            </div>
          </div>
          <p className="text-xs text-[#5B6472] mt-3 text-center">
            <a href={t.cookieHref} className="underline hover:text-[#5B8CFF] transition-colors">{t.cookiePolicy}</a>
            {" · "}
            <a href={t.privacyHref} className="underline hover:text-[#5B8CFF] transition-colors">{t.privacyPolicy}</a>
          </p>
        </>
      ) : (
        <>
          <p className="text-xs text-[#5B6472] mb-3">{t.chooseWhich}</p>
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#111315]">{t.essential}</p>
                <p className="text-xs text-[#5B6472]">{t.required}</p>
              </div>
              <div className="w-10 h-5 bg-[#5B8CFF] rounded-full flex items-center justify-end px-0.5 opacity-60 cursor-not-allowed">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#111315]">{t.analytics}</p>
                <p className="text-xs text-[#5B6472]">{t.helpUs}</p>
              </div>
              <button
                onClick={() => setAnalytics(!analytics)}
                className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${analytics ? "bg-[#5B8CFF] justify-end" : "bg-[#E2E5EA] justify-start"}`}
                role="switch" aria-checked={analytics}
              >
                <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
              </button>
            </div>
          </div>
          <button onClick={savePrefs} className="w-full min-h-11 py-2.5 rounded-xl brand-gradient text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center" style={{ textAlign: "center" }}>{t.savePrefs}</button>
          <button onClick={() => setShowPrefs(false)} className="w-full mt-2 py-2 text-xs text-[#5B6472] hover:text-[#111315] transition-colors">{t.back}</button>
        </>
      )}
    </div>
  );
}
