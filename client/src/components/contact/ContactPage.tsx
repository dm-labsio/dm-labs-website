import React from "react";
import BrandButton from "@/components/ui/brand-button";
import { capturePostHogEvent } from "@/components/PostHogAnalytics";
import type { SiteLanguage } from "@/lib/routeLanguage";
import ConsultationForm from "./ConsultationForm";
import { CONTACT_COPY, contactWhatsApp } from "./contactCopy";
import "./ContactPage.css";

export default function ContactPage({ locale }: { locale: SiteLanguage }) {
  const t = CONTACT_COPY[locale];
  return <div className="consultation-page" lang={locale} dir={locale === "he" ? "rtl" : "ltr"}>
    <section className="consultation-hero">
      <picture className="consultation-art" aria-hidden="true">
        <source media="(max-width: 767px)" srcSet="/media/brand-refresh/v1/contact-folded-glass-mobile.webp" width="941" height="1672" />
        <img src="/media/brand-refresh/v1/contact-folded-glass-desktop.webp" width="1672" height="941" alt="" fetchPriority="high" />
      </picture>
      <div className="container consultation-hero-content">
        <p className="brand-micro">{t.label}</p>
        <h1>{t.opening}<span>{t.payoff}</span></h1>
        <p className="consultation-hero-intro">{t.intro}</p>
        <div className="consultation-actions">
          <BrandButton asChild><a href="#consultation-form">{t.cta}</a></BrandButton>
          <a className="consultation-direct-link" href={contactWhatsApp(locale)} target="_blank" rel="noopener noreferrer">{t.whatsapp}</a>
        </div>
        <p className="consultation-note">{t.reassurance}</p>
      </div>
    </section>
    <section className="container consultation-content">
      <ConsultationForm key={locale} locale={locale} onSuccess={() => capturePostHogEvent("lead_form_submitted", { form: "contact", locale })} />
      <aside className="consultation-aside">
        <h2>{t.asideTitle.split("\n").map(line => <span key={line}>{line}</span>)}</h2>
        <p>{t.asideCopy}</p>
        <h3 className="brand-micro">{t.nextLabel}</h3>
        <ol className="consultation-steps">{t.next.map((step, index) => <li key={step}><span className="consultation-step-number" aria-hidden="true">0{index + 1}</span><p>{step}</p></li>)}</ol>
        <div className="consultation-direct">
          <h3>{t.directLabel}</h3>
          <a href={contactWhatsApp(locale)} target="_blank" rel="noopener noreferrer">WhatsApp <bdi dir="ltr">+357 97 472 847</bdi></a>
          <a href="mailto:info@dm-labs.io"><bdi dir="ltr">info@dm-labs.io</bdi></a>
          <a href="https://www.instagram.com/dm_labs.io/" target="_blank" rel="noopener noreferrer">{t.instagram} <bdi lang="en">Instagram</bdi></a>
          <p>{t.hours}</p><p>{t.location}</p>
        </div>
      </aside>
    </section>
  </div>;
}
