import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const sdk = vi.hoisted(() => ({ init: vi.fn(), capture: vi.fn(), startSessionRecording: vi.fn(), stopSessionRecording: vi.fn(), opt_out_capturing: vi.fn(), opt_in_capturing: vi.fn(), has_opted_out_capturing: vi.fn() }));
vi.mock("posthog-js", () => ({ default: sdk }));

let stored: Map<string, string>;
beforeEach(() => {
  vi.resetModules(); vi.clearAllMocks();
  stored = new Map();
  const target = new EventTarget();
  Object.assign(target, { localStorage: { getItem: (key: string) => stored.get(key) ?? null, setItem: (key: string, value: string) => stored.set(key, value) } });
  vi.stubGlobal("window", target);
});
afterEach(() => vi.unstubAllGlobals());

describe("analytics consent lifecycle", () => {
  it("does not initialize analytics or capture enquiries without affirmative consent", async () => {
    const analytics = await import("../client/src/components/PostHogAnalytics");
    analytics.syncAnalyticsConsent(); analytics.capturePostHogEvent("consultation_sent");
    expect(sdk.init).not.toHaveBeenCalled(); expect(sdk.capture).not.toHaveBeenCalled();
  });
  it("stops recording, opts out and blocks conversion capture after withdrawal; reconsent reuses the SDK", async () => {
    const consent = await import("../client/src/lib/cookieConsent");
    const analytics = await import("../client/src/components/PostHogAnalytics");
    const unsubscribe = consent.subscribeToConsent(analytics.syncAnalyticsConsent);
    consent.saveAnalyticsConsent(true);
    expect(sdk.init).toHaveBeenCalledOnce();
    analytics.capturePostHogEvent("consultation_sent"); expect(sdk.capture).toHaveBeenCalledOnce();
    consent.saveAnalyticsConsent(false);
    expect(sdk.stopSessionRecording).toHaveBeenCalledOnce(); expect(sdk.opt_out_capturing).toHaveBeenCalledOnce();
    analytics.capturePostHogEvent("consultation_sent"); expect(sdk.capture).toHaveBeenCalledOnce();
    sdk.has_opted_out_capturing.mockReturnValue(true);
    consent.saveAnalyticsConsent(true);
    expect(sdk.init).toHaveBeenCalledOnce(); expect(sdk.opt_in_capturing).toHaveBeenCalledTimes(2);
    expect(sdk.startSessionRecording).toHaveBeenCalledOnce();
    unsubscribe();
  });
  it("treats malformed or non-boolean stored values as undecided", async () => {
    const consent = await import("../client/src/lib/cookieConsent");
    for (const value of ['broken', '{"analytics":"true"}', '{}']) {
      stored.set(consent.CONSENT_KEY, value);
      expect(consent.readAnalyticsConsent()).toBeNull(); expect(consent.hasAnalyticsConsent()).toBe(false);
    }
  });
  it("retains the choice for the visit when browser storage is unavailable", async () => {
    const consent = await import("../client/src/lib/cookieConsent");
    Object.defineProperty(window, "localStorage", { get: () => { throw new Error("Storage blocked"); } });
    expect(() => consent.saveAnalyticsConsent(false)).not.toThrow();
    expect(consent.readAnalyticsConsent()).toBe(false);
    consent.saveAnalyticsConsent(true); expect(consent.hasAnalyticsConsent()).toBe(true);
  });
  it("responds to consent withdrawal in another tab and removes listeners on cleanup", async () => {
    const consent = await import("../client/src/lib/cookieConsent");
    const callback = vi.fn(); const unsubscribe = consent.subscribeToConsent(callback);
    consent.saveAnalyticsConsent(true);
    stored.set(consent.CONSENT_KEY, '{"analytics":false}');
    const event = new Event("storage"); Object.assign(event, { key: consent.CONSENT_KEY }); window.dispatchEvent(event);
    expect(consent.hasAnalyticsConsent()).toBe(false); expect(callback).toHaveBeenCalledTimes(2);
    unsubscribe(); window.dispatchEvent(event); expect(callback).toHaveBeenCalledTimes(2);
  });
  it("honours withdrawal immediately even when storage is readable but no longer writable", async () => {
    const consent = await import("../client/src/lib/cookieConsent");
    stored.set(consent.CONSENT_KEY, '{"analytics":true}');
    window.localStorage.setItem = () => { throw new Error("Quota exceeded"); };
    consent.saveAnalyticsConsent(false);
    expect(consent.hasAnalyticsConsent()).toBe(false);
  });
});
