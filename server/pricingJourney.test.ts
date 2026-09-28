import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import PricingPage from "../client/src/components/pricing/PricingPage";
import { BUILD_PLANS, BUILD_PRICES, CARE_PLANS, CARE_FEATURES, COMPARISON, pricingMoney, pricingContactUrl } from "../client/src/components/pricing/pricingContent";
import { PRICING_COPY } from "../client/src/components/pricing/pricingCopy";
import { pricingEnquiry } from "../client/src/lib/pricingEnquiry";

const locales = ["en", "el", "he"] as const;
describe("shared pricing comparison and enquiry", () => {
  it("retains commercial amounts, scope counts and equivalent comparisons", () => {
    expect(BUILD_PRICES).toEqual([299, 749, 1499]);
    expect(CARE_PLANS.map(p => [p.monthly, p.yearly])).toEqual([[69, 750], [129, 1395]]);
    for (const locale of locales) {
      expect(BUILD_PLANS[locale].map(p => p.name)).toEqual(["Launch Website", "Growth Website", "Pro Website"]);
      expect(BUILD_PLANS[locale].map(p => p.features.length)).toEqual([5, 6, 6]);
      expect(CARE_FEATURES[locale].map(p => p.length)).toEqual([5, 5]);
      expect(COMPARISON[locale]).toHaveLength(13);
      expect(COMPARISON[locale].slice(1, -1).map(({launch,growth,pro}) => [launch,growth,pro])).toEqual(COMPARISON.en.slice(1,-1).map(({launch,growth,pro}) => [launch,growth,pro]));
      expect(COMPARISON[locale].at(-1)).toMatchObject({launch:"2",growth:"3",pro:"4"});
      expect(PRICING_COPY[locale].customFeatures).toHaveLength(8);
    }
  });
  it("formats yearly totals, monthly equivalents and savings without rounding away cents", () => {
    expect(pricingMoney("en", 1395)).toBe("€1,395");
    expect(pricingMoney("en", 1395 / 12)).toBe("€116.25");
    expect(pricingMoney("en", 750 / 12)).toBe("€62.50");
    for (const locale of locales) {
      expect(pricingMoney(locale, 129 * 12 - 1395)).toContain("153");
      expect(pricingMoney(locale, 69 * 12 - 750)).toContain("78");
    }
  });
  it.each(locales)("keeps every package/care/billing combination in the %s enquiry", locale => {
    for (let build=0;build<3;build++) for (let care=0;care<2;care++) for (const yearly of [false,true]) {
      const url=new URL(pricingContactUrl(locale,build,care,yearly),"https://example.test");
      expect(url.pathname).toBe(locale==="en"?"/contact/":`/${locale}/contact/`);
      expect(url.searchParams.get("package")).toBe(BUILD_PLANS.en[build].name);
      expect(url.searchParams.get("care")).toBe(CARE_PLANS[care].name);
      expect(url.searchParams.get("billing")).toBe(yearly?"yearly":"monthly");
      const enquiry=pricingEnquiry(locale,url.search);
      expect(enquiry).toContain(BUILD_PLANS.en[build].name);
      expect(enquiry).toContain(CARE_PLANS[care].name);
    }
    for (const [build,care] of [[null,null],[1,null],[null,1],[10,0]]) expect(pricingContactUrl(locale,build,care,false)).not.toContain("?");
  });
  it.each(locales)("renders meaningful controls, comparable features and localized support links in %s", locale => {
    const html=renderToStaticMarkup(React.createElement(PricingPage,{locale}));
    expect(html.match(/aria-pressed="false"/g)).toHaveLength(5);
    expect(html.match(/type="radio"/g)).toHaveLength(2);
    expect(html.match(/<th scope="row"/g)).toHaveLength(13);
    expect(html.match(/<details\b/g)).toHaveLength(20);
    expect(html).toContain(PRICING_COPY[locale].included);
    expect(html).toContain(PRICING_COPY[locale].excluded);
    expect(html).toContain(`lang="${locale}" dir="${locale==="he"?"rtl":"ltr"}"`);
    for(const path of ["faq","contact","terms"]) expect(html).toContain(`href="${locale==="en"?"":`/${locale}`}/${path}/"`);
    expect(html).not.toContain("before paying");
    expect(html).not.toContain("<svg");
    expect(html).not.toContain("<video");
  });
});
