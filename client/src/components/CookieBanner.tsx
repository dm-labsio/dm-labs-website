import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { X } from "lucide-react";
import { CONSENT_OPEN_EVENT, readAnalyticsConsent, saveAnalyticsConsent } from "@/lib/cookieConsent";

const STRINGS = {
  en: {
    title: "We use cookies",
    body: "With your permission, we use analytics, error tracking and session replay to understand how this site is used. Form inputs are masked in replay. You can change your choice in Cookie settings.",
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
    back: "Back",
    cookieHref: "/cookies/",
    privacyHref: "/privacy/",
  },
  el: {
    title: "Χρησιμοποιούμε cookies",
    body: "Με την άδειά σας, χρησιμοποιούμε ανάλυση επισκεψιμότητας, παρακολούθηση σφαλμάτων και καταγραφή συνεδριών, για να καταλαβαίνουμε πώς χρησιμοποιείται η ιστοσελίδα. Τα πεδία των φορμών αποκρύπτονται στην καταγραφή. Μπορείτε να αλλάξετε την επιλογή σας από τις Ρυθμίσεις cookies.",
    acceptAll: "Αποδοχή όλων",
    reject: "Απόρριψη",
    manage: "Διαχείριση",
    cookiePolicy: "Πολιτική cookies",
    privacyPolicy: "Πολιτική απορρήτου",
    chooseWhich: "Επιλέξτε ποια cookies να επιτρέψετε:",
    essential: "Απαραίτητα",
    required: "Υποχρεωτικά",
    analytics: "Ανάλυση",
    helpUs: "Μας βοηθούν να βελτιωθούμε",
    savePrefs: "Αποθήκευση προτιμήσεων",
    back: "Πίσω",
    cookieHref: "/el/cookies/",
    privacyHref: "/el/privacy/",
  },
  he: {
    title: "אנחנו משתמשים בעוגיות",
    body: "באישורכם, נשתמש באנליטיקה, במעקב שגיאות ובתיעוד ביקורים כדי להבין את השימוש באתר. שדות הטפסים מוסתרים בתיעוד. אפשר לשנות את הבחירה בהגדרות העוגיות.",
    acceptAll: "אישור כל העוגיות",
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
  const [location] = useLocation();
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const locale = location === "/he" || location.startsWith("/he/") ? "he" : location === "/el" || location.startsWith("/el/") ? "el" : "en";
  const t = STRINGS[locale];
  const closeLabel = locale === "he" ? "סגירת הגדרות העוגיות" : locale === "el" ? "Κλείσιμο ρυθμίσεων cookies" : "Close cookie settings";
  const buttonClass = "min-h-11 rounded-lg border border-[#CBD1DC] px-3 py-2 text-sm font-medium text-[#111315] hover:bg-[#F6F6F4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B8CFF]";

  useEffect(() => {
    const timer = readAnalyticsConsent() === null ? window.setTimeout(() => setVisible(true), 1200) : undefined;
    const open = () => {
      window.clearTimeout(timer);
      returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setAnalytics(readAnalyticsConsent() === true);
      setShowPrefs(true);
      setVisible(true);
      window.requestAnimationFrame(() => panel.current?.focus());
    };
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => { window.clearTimeout(timer); window.removeEventListener(CONSENT_OPEN_EVENT, open); };
  }, []);

  const close = () => { setVisible(false); returnFocus.current?.focus(); };
  const save = (value: boolean) => { saveAnalyticsConsent(value); close(); };
  const dismiss = () => { if (readAnalyticsConsent() === null) save(false); else close(); };
  if (!visible) return null;

  return <div ref={panel} tabIndex={-1} className="fixed z-[10000] bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-xl border border-[#E2E5EA] bg-white p-5 shadow-xl text-[#111315]" role="dialog" aria-labelledby="cookie-consent-title" aria-describedby="cookie-consent-description" dir={locale === "he" ? "rtl" : "ltr"} lang={locale} onKeyDown={event => { if (event.key === "Escape") { event.preventDefault(); dismiss(); } }}>
    <div className="flex items-start justify-between gap-3 mb-2">
      <h2 id="cookie-consent-title" className="text-base font-semibold">{t.title}</h2>
      <button type="button" onClick={dismiss} aria-label={closeLabel} className="min-h-11 min-w-11 grid place-items-center rounded-lg focus-visible:outline focus-visible:outline-2"><X size={18} /></button>
    </div>
    <p id="cookie-consent-description" className="text-sm text-[#5B6472] leading-relaxed mb-4">{t.body}</p>
    {showPrefs && <div className="mb-4 space-y-3">
      <p className="text-sm">{t.chooseWhich}</p>
      <div className="flex items-center justify-between gap-3 text-sm"><span>{t.essential}</span><span>{t.required}</span></div>
      <label className="flex min-h-11 items-center justify-between gap-3 text-sm" htmlFor="cookie-analytics"><span>{t.analytics}</span><input id="cookie-analytics" type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} className="h-5 w-5 accent-[#5B8CFF]" /></label>
    </div>}
    <div className="grid grid-cols-2 gap-2">
      <button type="button" className={buttonClass} onClick={() => save(true)}>{t.acceptAll}</button>
      <button type="button" className={buttonClass} onClick={() => save(false)}>{t.reject}</button>
      <button type="button" className={`${buttonClass} col-span-2`} onClick={() => { if (showPrefs) save(analytics); else { setAnalytics(readAnalyticsConsent() === true); setShowPrefs(true); } }}>{showPrefs ? t.savePrefs : t.manage}</button>
    </div>
    <p className="mt-3 text-xs text-[#5B6472] text-center"><a className="underline" href={t.cookieHref}>{t.cookiePolicy}</a>{" · "}<a className="underline" href={t.privacyHref}>{t.privacyPolicy}</a></p>
  </div>;
}
