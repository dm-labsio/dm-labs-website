import React from "react";
import type { SiteLanguage } from "@/lib/routeLanguage";
import BrandButton from "@/components/ui/brand-button";
import { BUILD_PLANS, BUILD_PRICES, CARE_PLANS, CARE_FEATURES, pricingMoney } from "@/components/pricing/pricingContent";
import { PRICING_COPY } from "@/components/pricing/pricingCopy";
import { CAPABILITY_IDS, STUDIO_COPY, studioRoute } from "./studioCopy";
import { StudioClosing, StudioHero, StudioRule } from "./StudioShared";

export default function ServicesPage({ locale }: { locale: SiteLanguage }) {
  const copy = STUDIO_COPY[locale];
  const t = copy.services;
  const pricing = PRICING_COPY[locale];
  const route = (path: string) => studioRoute(locale, path);
  return <div className="studio-page studio-services" lang={locale} dir={locale === "he" ? "rtl" : "ltr"} data-button-surface="dark">
    <StudioHero locale={locale} family="services" />
    <section className="container studio-section" id="website-packages" tabIndex={-1} aria-labelledby="packages-title">
      <div className="studio-intro"><div><p className="brand-micro">{t.nav[0]}</p><h2 id="packages-title">{t.buildTitle}</h2></div><p>{t.buildLead}</p></div>
      <div className="studio-packages">{BUILD_PLANS[locale].map((plan, i) => <article key={plan.name} className={`studio-package studio-package--${i}`}>
        <p className="studio-package-status brand-micro">{i === 1 ? pricing.recommended : <bdi className="brand-latin-code" aria-hidden="true">0{i + 1}</bdi>}</p>
        <h3 className="studio-plan-name"><bdi lang="en" dir="ltr">{plan.name}</bdi></h3>
        <div className="studio-price-line"><bdi dir="ltr" className="studio-price">{pricingMoney(locale, BUILD_PRICES[i])}</bdi><span>{pricing.once}</span></div>
        <a className="studio-recurring" href="#maintenance">{pricing.recurring}</a>
        <p className="studio-package-summary">{plan.summary}</p>
        <ul className="studio-features">{plan.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
        <BrandButton asChild className={i === 1 ? "" : "btn-secondary"}><a href={route("contact")}>{copy.consultation}</a></BrandButton>
      </article>)}</div>
      <div className="studio-package-notes"><p>{pricing.careIntro}</p><a className="studio-link" href={route("pricing")}>{copy.pricingLink}</a></div>
      <p className="studio-small">{pricing.tax}</p>
      <aside className="studio-custom" aria-labelledby="custom-title"><div><p className="brand-micro"><bdi lang="en" dir="ltr">Enterprise / Custom</bdi></p><h3 id="custom-title">{pricing.customTitle}</h3><p>{pricing.customCopy}</p><p>{t.customExtra}</p><a className="studio-link" href={route("contact")}>{pricing.quote}</a></div><ul className="studio-features">{pricing.customFeatures.map(feature => <li key={feature}>{feature}</li>)}</ul></aside>
    </section>
    <section className="studio-capabilities" id="capabilities" tabIndex={-1} aria-labelledby="capabilities-title"><div className="container studio-section">
      <div className="studio-capabilities-intro"><div><p className="brand-micro">{t.nav[1]}</p><h2 id="capabilities-title">{t.capabilitiesTitle}</h2><p>{t.capabilitiesLead}</p></div><img className="studio-tablet-art" src="/media/brand-refresh/v1/studio-tablet.webp" alt="" aria-hidden="true" width="960" height="640" loading="lazy" decoding="async" /></div>
      <StudioRule />
      <div className="studio-capabilities-grid">{t.capabilities.map(([title, description], i) => <article key={CAPABILITY_IDS[i]} id={CAPABILITY_IDS[i]} tabIndex={-1}><p className="brand-micro studio-capability-number" aria-hidden="true"><bdi className="brand-latin-code">0{i + 1}</bdi></p><h3><a href={route(`services/${CAPABILITY_IDS[i]}`)}>{title}<span className="studio-link-arrow" aria-hidden="true">↗</span></a></h3><p>{description}</p></article>)}</div>
    </div></section>
    <section className="container studio-section" id="maintenance" tabIndex={-1} aria-labelledby="care-title">
      <div className="studio-intro"><div><p className="brand-micro">{t.nav[2]}</p><h2 id="care-title">{t.careTitle}</h2></div><p>{pricing.careIntro}</p></div>
      <div className="studio-care-plans">{CARE_PLANS.map((plan, i) => <article key={plan.name}><div className="studio-care-meta"><h3 className="studio-plan-name"><bdi lang="en" dir="ltr">{plan.name}</bdi></h3><div className="studio-price-line"><bdi dir="ltr" className="studio-price">{pricingMoney(locale, plan.monthly)}</bdi><span>{pricing.month}</span></div><p>{pricing.descriptions[i]}</p></div><ul className="studio-features">{CARE_FEATURES[locale][i].map(feature => <li key={feature}>{feature}</li>)}</ul></article>)}</div>
      <a className="studio-link" href={`${route("pricing")}#maintenance`}>{t.careLink}</a>
      <details className="studio-scope"><summary>{pricing.scope}<span aria-hidden="true">+</span></summary><p>{pricing.scopeText}</p><a className="studio-link" href={route("terms")}>{pricing.terms}</a></details>
    </section>
    <StudioClosing locale={locale} family="services" />
  </div>;
}
