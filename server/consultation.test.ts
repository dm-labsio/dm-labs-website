import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EMPTY_CONSULTATION, submitConsultation, validateConsultation } from "../client/src/lib/consultation";
import { pricingEnquiry, pricingEnquiryQuery } from "../client/src/lib/pricingEnquiry";
import ConsultationForm from "../client/src/components/contact/ConsultationForm";
import { CONTACT_COPY, contactPrivacy, contactWhatsApp } from "../client/src/components/contact/contactCopy";

const fields = { name: " Test Person ", email: " test@example.com ", business: "", message: "" };
afterEach(() => vi.unstubAllGlobals());

describe("consultation validation and delivery acknowledgement", () => {
  it("accepts a name and email without a business or question", () => {
    expect(validateConsultation(fields)).toEqual({});
    expect(validateConsultation(EMPTY_CONSULTATION)).toEqual({ name: "required", email: "email" });
    expect(validateConsultation({ ...fields, name: "  ", email: "test@" })).toEqual({ name: "required", email: "email" });
    expect(validateConsultation({ ...fields, message: "a".repeat(5001) })).toEqual({ message: "long" });
  });
  it.each(["en", "el", "he"] as const)("localizes the optional-message fallback and forwards cancellation in %s", async locale => {
    const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetcher);
    const controller = new AbortController();
    await submitConsultation(fields, locale, controller.signal);
    expect(fetcher).toHaveBeenCalledOnce();
    const [url, options] = fetcher.mock.calls[0];
    expect(url).toBe("https://api.web3forms.com/submit");
    expect(options.signal).toBe(controller.signal);
    expect(JSON.parse(options.body)).toMatchObject({ name: "Test Person", email: "test@example.com", message: CONTACT_COPY[locale].defaultMessage });
  });
  it.each([[200, '{"success":false}'], [200, '{}'], [200, '{"success":"true"}'], [429, '{"success":true}'], [500, 'invalid json']])("never confirms status %s with unacknowledged body %s", async (status, body) => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(body as string, { status: status as number })));
    await expect(submitConsultation(fields, "en", new AbortController().signal)).rejects.toThrow();
  });
  it("rejects invalid data before calling the provider and propagates network failures", async () => {
    const fetcher = vi.fn().mockRejectedValue(new TypeError("Offline")); vi.stubGlobal("fetch", fetcher);
    await expect(submitConsultation(EMPTY_CONSULTATION, "en", new AbortController().signal)).rejects.toThrow("Invalid");
    expect(fetcher).not.toHaveBeenCalled();
    await expect(submitConsultation(fields, "en", new AbortController().signal)).rejects.toThrow("Offline");
  });
});

describe("shared multilingual enquiry contract", () => {
  it("preserves only validated package context when changing language", () => {
    expect(pricingEnquiryQuery("?package=Growth+Website&care=Complete+Care&billing=yearly&email=private%40example.com"))
      .toBe("?package=Growth+Website&care=Complete+Care&billing=yearly");
    expect(pricingEnquiryQuery("?package=untrusted&care=Basic+Care&billing=monthly")).toBe("");
    expect(pricingEnquiryQuery("")).toBe("");
  });
  it.each(["en", "el", "he"] as const)("renders accessible native fields and localized destinations for %s", locale => {
    const html = renderToStaticMarkup(React.createElement(ConsultationForm, { locale }));
    expect(html).toContain(`lang="${locale}" dir="${locale === "he" ? "rtl" : "ltr"}"`);
    expect(html.match(/ required=""/g)).toHaveLength(2);
    for (const field of ["name", "email", "business", "message"]) {
      expect(html).toContain(`for="contact-${locale}-${field}"`);
      expect(html).toContain(`id="contact-${locale}-${field}"`);
    }
    expect(html).toContain('type="email" dir="ltr"');
    expect(html).toContain('type="submit"');
    expect(html).toContain(`href="${contactPrivacy(locale)}"`);
    expect(contactWhatsApp(locale)).toContain("https://wa.me/35797472847?text=");
    const query = "?package=Growth+Website&care=Complete+Care&billing=yearly";
    expect(pricingEnquiry(locale, query)).toContain("Growth Website");
    expect(pricingEnquiry(locale, query)).toContain("Complete Care");
    expect(pricingEnquiry(locale, "?package=untrusted&care=Basic+Care&billing=monthly")).toBe("");
    expect(pricingEnquiry(locale, "?package=Launch+Website&care=Basic+Care&billing=unexpected")).toBe("");
  });
});
