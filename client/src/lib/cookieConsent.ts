export const CONSENT_KEY = "dm_cookie_consent";
export const CONSENT_UPDATED_EVENT = "dm-cookie-consent-updated";
export const CONSENT_OPEN_EVENT = "dm-cookie-consent-open";
let sessionChoice: boolean | null = null;

export function readAnalyticsConsent(): boolean | null {
  if (typeof window === "undefined") return null;
  if (sessionChoice !== null) return sessionChoice;
  try {
    const value = JSON.parse(window.localStorage.getItem(CONSENT_KEY) ?? "null");
    return typeof value?.analytics === "boolean" ? value.analytics : sessionChoice;
  } catch { return sessionChoice; }
}

export function hasAnalyticsConsent() { return readAnalyticsConsent() === true; }

export function saveAnalyticsConsent(analytics: boolean) {
  sessionChoice = analytics;
  try { window.localStorage.setItem(CONSENT_KEY, JSON.stringify({ essential: true, analytics })); } catch { /* Keep the choice for this visit if storage is blocked. */ }
  window.dispatchEvent(new Event(CONSENT_UPDATED_EVENT));
}

export function subscribeToConsent(callback: () => void) {
  const storage = (event: StorageEvent) => {
    if (event.key === CONSENT_KEY || event.key === null) { sessionChoice = null; callback(); }
  };
  window.addEventListener(CONSENT_UPDATED_EVENT, callback);
  window.addEventListener("storage", storage);
  return () => {
    window.removeEventListener(CONSENT_UPDATED_EVENT, callback);
    window.removeEventListener("storage", storage);
  };
}

export function openCookiePreferences() { window.dispatchEvent(new Event(CONSENT_OPEN_EVENT)); }
