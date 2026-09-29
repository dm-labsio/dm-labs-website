import React from "react";
import type { SiteLanguage } from "@/lib/routeLanguage";
import { SERVICE_FEATURES, type FoundationService } from "./serviceFeatureContent";
import { FOUNDATION_COPY } from "./serviceFoundationCopy";
import "./ServiceFoundationStory.css";

/** Explanations are always visible, with a composition specific to the service. */
export default function ServiceFoundationStory({ locale, serviceId }: { locale: SiteLanguage; serviceId: FoundationService }) {
  const t = SERVICE_FEATURES[locale][serviceId];
  const copy = FOUNDATION_COPY[locale];
  if (serviceId === "seo") return <section className="container studio-section foundation-editorial foundation-search-reading" aria-labelledby="service-why-title" data-reading-layout="search">
    <header><h2 id="service-why-title">{copy.headings.seo}</h2></header>
    <div className="search-reading-lines">{t.principles.map(([heading, body]) => <article key={heading}><h3>{heading}</h3><p>{body}</p></article>)}</div>
  </section>;
  if (serviceId === "security") return <section className="foundation-editorial foundation-care-reading" aria-labelledby="service-why-title" data-reading-layout="care">
    <div className="container studio-section"><header><h2 id="service-why-title">{copy.headings.security}</h2></header><div className="care-reading-copy">{t.principles.map(([heading, body]) => <article key={heading}><h3>{heading}</h3><p>{body}</p></article>)}</div></div>
  </section>;
  return <section className="container studio-section foundation-editorial foundation-delivery-reading" aria-labelledby="service-why-title" data-reading-layout="delivery">
    <header><h2 id="service-why-title">{copy.headings.turnaround}</h2></header>
    <div className="delivery-reading-copy">{t.principles.map(([heading, body]) => <article key={heading}><h3>{heading}</h3><p>{body}</p></article>)}</div>
  </section>;
}
