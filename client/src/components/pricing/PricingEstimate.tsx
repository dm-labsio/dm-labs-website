import React from "react";
import type { SiteLanguage } from "@/lib/routeLanguage";
import { firstYearEstimate, PRICING_EXPERIENCE } from "./pricingExperience";
import { pricingMoney } from "./pricingContent";
import { PRICING_COPY } from "./pricingCopy";

export default function PricingEstimate({ locale, build, care, yearly }: {locale: SiteLanguage; build: number | null; care: number | null; yearly: boolean}) {
  const copy = PRICING_EXPERIENCE[locale];
  const total = firstYearEstimate(build, care, yearly);
  return <div className="pricing-estimate" aria-live="polite" aria-atomic="true">
    <div><p className="brand-micro">{copy.estimateLabel}</p>{total === null ? <p className="pricing-estimate-pending">{copy.estimatePending}</p> : <p className="pricing-estimate-total" key={total}><bdi dir="ltr">{pricingMoney(locale,total)}</bdi></p>}</div>
    <div>{total !== null && <><p>{yearly ? copy.yearlyExplanation : copy.monthlyExplanation}</p><p>{copy.nextYear}</p></>}<p className="pricing-estimate-tax">{PRICING_COPY[locale].tax}</p></div>
  </div>;
}
