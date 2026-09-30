import { usePricingCurrency } from "@/contexts/CurrencyContext";
import { commercialText } from "../../../../shared/currency";
import React, { useEffect } from "react";
import BrandButton from "@/components/ui/brand-button";
import { contactWhatsApp } from "@/components/contact/contactCopy";
import type { SiteLanguage } from "@/lib/routeLanguage";
import { FAQ_CONTENT, FAQ_TOPICS, faqRoute, faqSchema } from "./faqContent";
import { FAQ_COPY } from "./faqCopy";
import "./FAQPage.css";

// Keep English product names and currency figures intact within Hebrew prose.
function AnswerText({ text, locale }: { text: string; locale: SiteLanguage }) {
  const { text: localize } = usePricingCurrency(locale);
  return <>{text.split(/(Launch Website|Growth Website|Pro Website|Enterprise \/ Custom|Basic Care|Complete Care|€[\d,]+)/g).map((part, index) =>
    /^(Launch Website|Growth Website|Pro Website|Enterprise \/ Custom|Basic Care|Complete Care|€[\d,]+)$/.test(part)
      ? <bdi key={index} lang="en" dir="ltr">{localize(part)}</bdi> : part
  )}</>;
}

export default function FAQPage({ locale }: { locale: SiteLanguage }) {
  const { currency } = usePricingCurrency(locale);
  const t = FAQ_COPY[locale];
  const answers = FAQ_CONTENT[locale];
  useEffect(() => {
    const id = "faq-jsonld-schema";
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) { script = document.createElement("script"); script.id = id; script.type = "application/ld+json"; document.head.appendChild(script); }
    script.textContent = commercialText(JSON.stringify(faqSchema(locale)), locale, currency).replace(/</g, "\\u003c");
    return () => script.remove();
  }, [locale, currency]);

  return <div className="faq-page" lang={locale} dir={locale === "he" ? "rtl" : "ltr"}>
    <section className="faq-hero">
      <picture className="faq-art" aria-hidden="true">
        <source media="(max-width: 767px)" srcSet="/media/brand-refresh/v1/faq-pearl-arcs-mobile.webp" width="941" height="1672" />
        <img src="/media/brand-refresh/v1/faq-pearl-arcs-desktop.webp" width="1672" height="941" alt="" fetchPriority="high" />
      </picture>
      <div className="container faq-hero-copy">
        <p className="brand-micro">{t.label}</p>
        <h1>{t.opening}<span>{t.payoff}</span></h1>
        <p className="faq-intro">{t.intro}</p>
        <a className="faq-text-link" href="#faq-topics">{t.browse}</a>
      </div>
    </section>
    <div className="container faq-reading-layout" id="faq-topics" tabIndex={-1}>
      <nav className="faq-topic-nav" aria-label={t.browse}>
        <p className="brand-micro">{t.browse}</p>
        <ol>{FAQ_TOPICS.map((topic) => <li key={topic.id}><a href={`#${topic.id}`}><span>{t.topics[topic.id].title}</span></a></li>)}</ol>
        <a className="faq-topic-help" href={faqRoute(locale, "contact")}>{t.cta}</a>
      </nav>
      <div className="faq-groups">
        {FAQ_TOPICS.map((topic) => <section key={topic.id} id={topic.id} tabIndex={-1} className="faq-group" aria-labelledby={`${topic.id}-title`}>
          <header className="faq-group-header"><div><h2 id={`${topic.id}-title`}>{t.topics[topic.id].title}</h2><p>{t.topics[topic.id].intro}</p></div></header>
          <div className="faq-questions">{topic.questions.map(id => {
            const item = answers[id];
            return <details key={id} className="faq-question" open={id === "start"}>
              <summary><h3>{item.q}</h3><span className="faq-toggle" aria-hidden="true" /></summary>
              <div className="faq-answer"><p><AnswerText text={item.a} locale={locale} /></p>{item.link && <a href={faqRoute(locale, item.link.path)}>{item.link.label}</a>}</div>
            </details>;
          })}</div>
        </section>)}
      </div>
    </div>
    <section className="faq-help">
      <div className="container faq-help-inner"><p className="brand-micro">{t.label}</p><h2>{t.help}</h2><p className="faq-help-copy">{t.helpCopy}</p>
        <div className="faq-help-actions"><BrandButton asChild><a href={faqRoute(locale, "contact")}>{t.cta}</a></BrandButton><a className="faq-text-link" href={contactWhatsApp(locale)} target="_blank" rel="noopener noreferrer">{t.whatsapp}</a></div>
        <p className="faq-help-note">{t.reassurance}</p>
      </div>
    </section>
  </div>;
}
