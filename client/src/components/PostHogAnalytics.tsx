import { useEffect, useSyncExternalStore } from "react";
import { Analytics } from "@vercel/analytics/react";
import posthog from "posthog-js";
import { hasAnalyticsConsent, subscribeToConsent } from "@/lib/cookieConsent";

// PostHog project tokens are browser-safe identifiers, not secret API keys.
const PROJECT_TOKEN = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN || "phc_toyMzjsCB4j2RZMTYpPP3qe9ZdrLdYfu4jMWTf4yfnfB";

let initialized = false;

export function syncAnalyticsConsent() {
  if (!hasAnalyticsConsent()) {
    if (initialized) {
      posthog.stopSessionRecording();
      posthog.opt_out_capturing();
    }
    return;
  }
  if (initialized) {
    if (posthog.has_opted_out_capturing()) {
      posthog.opt_in_capturing({ captureEventName: false });
      posthog.startSessionRecording();
    }
    return;
  }

  posthog.init(PROJECT_TOKEN, {
    api_host: "https://eu.i.posthog.com",
    autocapture: true,
    capture_exceptions: true,
    capture_pageview: "history_change",
    ip: false,
    cross_subdomain_cookie: false,
    opt_out_persistence_by_default: true,
    defaults: "2026-05-30",
    disable_session_recording: false,
    session_recording: {
      // Form values remain masked in session replay, including contact enquiries.
      maskAllInputs: true,
    },
  });
  initialized = true;
  posthog.opt_in_capturing({ captureEventName: false });
}

/** Captures a non-identifying conversion only after the visitor has opted in. */
export function capturePostHogEvent(event: string, properties?: Record<string, string>) {
  if (initialized && hasAnalyticsConsent()) posthog.capture(event, properties);
}

export default function PostHogAnalytics() {
  const consented = useSyncExternalStore(subscribeToConsent, hasAnalyticsConsent, () => false);
  useEffect(() => {
    syncAnalyticsConsent();
    return subscribeToConsent(syncAnalyticsConsent);
  }, []);

  return consented ? <Analytics mode={import.meta.env.MODE === "production" ? "production" : "development"} beforeSend={event => hasAnalyticsConsent() ? event : null} /> : null;
}
