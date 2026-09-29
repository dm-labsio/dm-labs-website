import React from "react";
import type { SiteLanguage } from "@/lib/routeLanguage";
import { PackageCards, CarePackageCards, CustomPackage } from "@/components/pricing/PackageOverview";
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
      <PackageCards locale={locale} />
      <div className="studio-package-notes"><p>{pricing.careIntro}</p><a className="studio-link" href={route("pricing")}>{copy.pricingLink}</a></div>
      <p className="studio-small">{pricing.tax}</p>
      <CustomPackage locale={locale} />
    </section>
    <section className="studio-capabilities" id="capabilities" tabIndex={-1} aria-labelledby="capabilities-title"><div className="container studio-section">
      <div className="studio-capabilities-intro"><div><p className="brand-micro">{t.nav[1]}</p><h2 id="capabilities-title">{t.capabilitiesTitle}</h2><p>{t.capabilitiesLead}</p></div><img className="studio-tablet-art" src="/media/brand-refresh/v1/studio-tablet.webp" alt="" aria-hidden="true" width="960" height="640" loading="lazy" decoding="async" /></div>
      <StudioRule />
      <div className="studio-capabilities-grid">{t.capabilities.map(([title, description], i) => <article key={CAPABILITY_IDS[i]} id={CAPABILITY_IDS[i]} tabIndex={-1}><p className="brand-micro studio-capability-number" aria-hidden="true"><bdi className="brand-latin-code">0{i + 1}</bdi></p><h3><a href={route(`services/${CAPABILITY_IDS[i]}`)}>{title}<span className="studio-link-arrow" aria-hidden="true">↗</span></a></h3><p>{description}</p></article>)}</div>
    </div></section>
    <section className="container studio-section" id="maintenance" tabIndex={-1} aria-labelledby="care-title">
      <div className="studio-intro"><div><p className="brand-micro">{t.nav[2]}</p><h2 id="care-title">{t.careTitle}</h2></div><p>{pricing.careIntro}</p></div>
      <CarePackageCards locale={locale} />
      <a className="studio-link" href={`${route("pricing")}#maintenance`}>{t.careLink}</a>
      <details className="studio-scope" open><summary>{pricing.scope}<span aria-hidden="true">+</span></summary><p>{pricing.scopeText}</p><a className="studio-link" href={route("terms")}>{pricing.terms}</a></details>
    </section>
    <StudioClosing locale={locale} family="services" />
  </div>;
}
