import React from "react";
import type { SiteLanguage } from "@/lib/routeLanguage";
import { BUILD_PLANS, BUILD_PRICES, pricingMoney } from "@/components/pricing/pricingContent";
import { PRICING_COPY } from "@/components/pricing/pricingCopy";
import { STUDIO_COPY, studioRoute } from "./studioCopy";
import { StudioClosing, StudioHero, StudioRule } from "./StudioShared";

const TIMING = ["5–7", "7–10", "10–14"] as const;

export default function ProcessPage({ locale }: { locale: SiteLanguage }) {
  const copy = STUDIO_COPY[locale];
  const t = copy.process;
  return <div className="studio-page studio-process" lang={locale} dir={locale === "he" ? "rtl" : "ltr"} data-button-surface="dark">
    <StudioHero locale={locale} family="process" />
    <section id="journey" tabIndex={-1} className="container studio-section studio-journey" aria-labelledby="journey-title">
      <div className="studio-journey-intro"><p className="brand-micro">{t.nav[0]}</p><h2 id="journey-title">{t.journeyTitle}</h2><p>{t.journeyLead}</p><a className="studio-link" href={studioRoute(locale, "faq")}>{copy.questionsLink}</a></div>
      <ol className="studio-chapters">{t.steps.map((step, i) => <li key={step.title} id={`step-${i + 1}`}>
        <StudioRule />
        <div className="studio-chapter"><span className="studio-chapter-number" aria-hidden="true"><bdi dir="ltr">0{i + 1}</bdi></span><div><h3>{step.title}</h3><p>{step.copy}</p><div className="studio-outcome"><p className="brand-micro">{t.outcome}</p><p>{step.output}</p></div></div></div>
        {i === 2 && <aside className="studio-design-break"><img src="/media/brand-refresh/v1/studio-tablet.webp" width="960" height="640" alt="" aria-hidden="true" loading="lazy" decoding="async" /><div><h4>{t.interlude}</h4><p>{t.interludeCopy}</p></div></aside>}
      </li>)}</ol>
    </section>
    <section className="studio-timing" id="timing" tabIndex={-1} aria-labelledby="timing-title"><div className="container studio-section">
      <div className="studio-intro"><div><p className="brand-micro">{t.nav[1]}</p><h2 id="timing-title">{t.timingTitle}</h2></div><p>{t.timingLead}</p></div>
      <div className="studio-timing-grid">{BUILD_PLANS[locale].map((plan, i) => <article className={`studio-time studio-time--${i}`} key={plan.name}><h3 className="studio-plan-name"><bdi lang="en" dir="ltr">{plan.name}</bdi></h3><p className="studio-duration"><bdi dir="ltr">{TIMING[i]}</bdi><span>{t.days}</span></p><div className="studio-duration-line" aria-hidden="true" /><p>{t.from} <bdi className="studio-inline-price" dir="ltr">{pricingMoney(locale, BUILD_PRICES[i])}</bdi></p></article>)}</div>
      <p>{t.careNote}</p><p className="studio-small">{PRICING_COPY[locale].tax}</p><a className="studio-link" href={studioRoute(locale, "pricing")}>{copy.pricingLink}</a>
    </div></section>
    <StudioClosing locale={locale} family="process" />
  </div>;
}
