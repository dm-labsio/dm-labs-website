import React from "react";
import type { SiteLanguage } from "@/lib/routeLanguage";
import { CAPABILITY_IDS, STUDIO_COPY, studioRoute } from "./studioCopy";
import { StudioClosing, StudioHero } from "./StudioShared";
import { ServiceMark } from "./ServiceMark";

export default function ServicesPage({ locale }: { locale: SiteLanguage }) {
  const copy = STUDIO_COPY[locale];
  const t = copy.services;
  const route = (path: string) => studioRoute(locale, path);
  return <div className="studio-page studio-services" lang={locale} dir={locale === "he" ? "rtl" : "ltr"} data-button-surface="dark">
    <StudioHero locale={locale} family="services" />
    <section className="studio-capabilities" id="capabilities" tabIndex={-1} aria-labelledby="capabilities-title"><div className="container studio-section">
      <div className="studio-capabilities-intro"><h2 id="capabilities-title">{t.capabilitiesTitle}</h2><p>{t.capabilitiesLead}</p></div>
      <div className="studio-capabilities-grid">{t.capabilities.map(([title, description], i) => {
        const id = CAPABILITY_IDS[i];
        return <article key={id} id={id} tabIndex={-1}>
          <a className="studio-service-link" href={route(`services/${id}`)} aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
            <span className="studio-service-mark"><ServiceMark service={id} /></span>
            <div className="studio-service-content"><h3 id={`${id}-title`}>{title}</h3><p id={`${id}-description`}>{description}</p></div>
          </a>
        </article>;
      })}</div>
    </div></section>
    <StudioClosing locale={locale} family="services" />
  </div>;
}
