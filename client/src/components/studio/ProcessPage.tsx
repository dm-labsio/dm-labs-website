import React from "react";
import type { SiteLanguage } from "@/lib/routeLanguage";
import { STUDIO_COPY, studioRoute } from "./studioCopy";
import { StudioClosing, StudioHero, StudioRule } from "./StudioShared";


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
    <StudioClosing locale={locale} family="process" />
  </div>;
}
