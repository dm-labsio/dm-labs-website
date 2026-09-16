import { useEffect } from "react";
import posthog from "posthog-js";

const CONSENT_KEY = "dm_cookie_consent";
const CONSENT_UPDATED_EVENT = "dm-cookie-consent-updated";

// PostHog project tokens are browser-safe identifiers, not secret API keys.
const PROJECT_TOKEN = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN || "phc_toyMzjsCB4j2RZMTYpPP3qe9ZdrLdYfu4jMWTf4yfnfB";

let initialized = false;

function hasAnalyticsConsent() {
  try {
    return JSON.parse(window.localStorage.getItem(CONSENT_KEY) ?? "null")?.analytics === true;
  } catch {
    return false;
  }
}

function initializeIfConsented() {
  if (initialized || !hasAnalyticsConsent()) return;

  posthog.init(PROJECT_TOKEN, {
    api_host: "https://eu.i.posthog.com",
    autocapture: true,
    capture_exceptions: true,
    capture_pageview: "history_change",
    defaults: "2026-05-30",
    disable_session_recording: false,
    session_recording: {
      // Form values remain masked in session replay, including contact enquiries.
      maskAllInputs: true,
    },
  });
  initialized = true;
}

/** Captures a non-identifying conversion only after the visitor has opted in. */
export function capturePostHogEvent(event: string, properties?: Record<string, string>) {
  if (initialized) posthog.capture(event, properties);
}

export default function PostHogAnalytics() {
  useEffect(() => {
    initializeIfConsented();
    window.addEventListener(CONSENT_UPDATED_EVENT, initializeIfConsented);
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, initializeIfConsented);
  }, []);

  return null;
}
