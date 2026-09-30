import React from "react";
import type { SiteLanguage } from "@/lib/routeLanguage";
import { pricingPaymentSchedule, PRICING_EXPERIENCE } from "./pricingExperience";
import { pricingMoney } from "./pricingContent";
import { PRICING_COPY } from "./pricingCopy";

export default function PricingEstimate({ locale, build, care, yearly }: {locale: SiteLanguage; build: number | null; care: number | null; yearly: boolean}) {
  const copy = PRICING_EXPERIENCE[locale];
  const t = PRICING_COPY[locale];
  const schedule = pricingPaymentSchedule(build, care, yearly);
  const amount = schedule ? yearly ? schedule.total : schedule.build : null;
  return <div className="pricing-estimate" data-billing={yearly ? "yearly" : "monthly"} aria-live="polite" aria-atomic="true">
    <div><p className="brand-micro">{yearly ? copy.estimateLabel : copy.firstPayment}</p>{amount === null ? <p className="pricing-estimate-pending">{copy.estimatePending}</p> : <p className="pricing-estimate-total" key={`${yearly}-${amount}`}><bdi dir="ltr">{pricingMoney(locale, amount)}</bdi></p>}</div>
    {schedule && !yearly && <div className="pricing-estimate-monthly"><p className="brand-micro">{copy.thenCare}</p><p className="pricing-monthly-amount"><bdi dir="ltr">{pricingMoney(locale, schedule.care)}</bdi><span>{t.month}</span></p><p className="pricing-monthly-start">{copy.monthlyStart}</p></div>}
    <div>{schedule && yearly && <><p>{copy.yearlyExplanation}</p><p>{copy.nextYear}</p></>}<p className="pricing-estimate-tax">{t.tax}</p></div>
  </div>;
}
