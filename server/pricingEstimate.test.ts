import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { pricingPaymentSchedule, comparisonRows, PRICING_EXPERIENCE } from "../client/src/components/pricing/pricingExperience";
import { COMPARISON, pricingMoney } from "../client/src/components/pricing/pricingContent";
import PricingEstimate from "../client/src/components/pricing/PricingEstimate";

const locales = ["en", "el", "he"] as const;
describe("pricing payment schedule", () => {
  it("never presents complete payments for incomplete or invalid selections", () => {
    for (const [build, care] of [[null,null],[0,null],[null,1],[-1,0],[3,1],[0,2],[1.5,0]]) {
      expect(pricingPaymentSchedule(build,care,false)).toBeNull();
      expect(pricingPaymentSchedule(build,care,true)).toBeNull();
    }
  });
  it("keeps monthly care separate and adds only annual care to the build", () => {
    const expectedYearly = [[1049,1694],[1499,2144],[2249,2894]];
    for(let build=0;build<3;build++) for(let care=0;care<2;care++) {
      expect(pricingPaymentSchedule(build,care,false)).toEqual({ build: [299,749,1499][build], care: [69,129][care], total: null });
      expect(pricingPaymentSchedule(build,care,true)).toEqual({ build: [299,749,1499][build], care: [750,1395][care], total: expectedYearly[build][care] });
    }
  });
  it.each(locales)("shows build first and monthly care after launch, or the annual total, in %s", locale => {
    const render = (yearly: boolean) => renderToStaticMarkup(React.createElement(PricingEstimate,{locale,build:1,care:1,yearly}));
    const monthly = render(false);
    expect(monthly).toContain(PRICING_EXPERIENCE[locale].firstPayment);
    expect(monthly).toContain(pricingMoney(locale,749));
    expect(monthly).toContain(pricingMoney(locale,129));
    expect(monthly).toContain(PRICING_EXPERIENCE[locale].monthlyStart);
    expect(monthly).not.toContain(pricingMoney(locale,2297));
    expect(monthly).not.toContain(PRICING_EXPERIENCE[locale].estimateLabel);
    const yearly = render(true);
    expect(yearly).toContain(pricingMoney(locale,2144));
    expect(yearly).toContain(PRICING_EXPERIENCE[locale].estimateLabel);
    expect(yearly).not.toContain('class="pricing-estimate-monthly"');
    const pending = renderToStaticMarkup(React.createElement(PricingEstimate,{locale,build:1,care:null,yearly:false}));
    expect(pending).not.toContain('class="pricing-estimate-total"');
  });
  it.each(locales)("filters only identical comparison rows in %s", locale => {
    expect(comparisonRows(locale,false)).toEqual(COMPARISON[locale]);
    const differences=comparisonRows(locale,true);
    expect(differences).toHaveLength(10);
    expect(differences[0]).toBe(COMPARISON[locale][0]);
    expect(differences.at(-1)).toBe(COMPARISON[locale].at(-1));
    expect(differences.every(row=>row.launch!==row.growth||row.growth!==row.pro)).toBe(true);
    expect(COMPARISON[locale]).toHaveLength(13);
  });
});
