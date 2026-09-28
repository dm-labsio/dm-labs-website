import React, { useState } from "react";
import BrandButton from "@/components/ui/brand-button";
import { contactWhatsApp } from "@/components/contact/contactCopy";
import { FAQ_CONTENT } from "@/components/faq/faqContent";
import type { SiteLanguage } from "@/lib/routeLanguage";
import { BUILD_PLANS, BUILD_PRICES, CARE_PLANS, CARE_FEATURES, COMPARISON, pricingContactUrl, pricingMoney } from "./pricingContent";
import { PRICING_COPY } from "./pricingCopy";
import "./PricingPage.css";

function Latin({ children }: { children: React.ReactNode }) {
  return <bdi lang="en" dir="ltr">{children}</bdi>;
}

function PricingText({ text }: { text: string }) {
  return <>{text.split(/(Launch Website|Growth Website|Pro Website|Enterprise \/ Custom|Basic Care|Complete Care|€[\d,.]+(?:\/(?:month|μήνα))?)/g).map((part, i) => {
    if (part.startsWith("€")) {
      const [amount, unit] = part.split("/");
      return <span key={i} className="pricing-inline-amount"><Latin>{amount}</Latin>{unit && `/${unit}`}</span>;
    }
    return /^(Launch Website|Growth Website|Pro Website|Enterprise \/ Custom|Basic Care|Complete Care)$/.test(part)
      ? <Latin key={i}>{part}</Latin> : part;
  })}</>;
}

function moveTo(id: string) {
  const target = document.getElementById(id);
  target?.focus({ preventScroll: true });
  target?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
}

export default function PricingPage({ locale }: { locale: SiteLanguage }) {
  const t = PRICING_COPY[locale];
  const plans = BUILD_PLANS[locale];
  const [buildIndex, setBuildIndex] = useState<number | null>(null);
  const [careIndex, setCareIndex] = useState<number | null>(null);
  const [yearly, setYearly] = useState(false);
  const build = buildIndex === null ? null : plans[buildIndex];
  const care = careIndex === null ? null : CARE_PLANS[careIndex];
  const money = (value: number) => pricingMoney(locale, value);
  const route = (path: string) => `${locale === "en" ? "" : `/${locale}`}/${path}/`;
  const faq = FAQ_CONTENT[locale];
  const questions = [
    { q: t.careQuestion, a: t.careIntro },
    faq.design, faq.extend, faq["extra-costs"], faq["care-exclusions"], faq.ownership,
    { q: t.customQuestion, a: t.customCopy },
  ];

  return <div className="pricing-page pricing-journey" lang={locale} dir={locale === "he" ? "rtl" : "ltr"} data-button-surface="dark">
    <section className="pricing-hero">
      <picture className="pricing-art" aria-hidden="true">
        <source media="(max-width: 767px)" srcSet="/media/brand-refresh/v1/pricing-glass-arcs-mobile.webp" width="760" height="424" />
        <img src="/media/brand-refresh/v1/pricing-glass-arcs-desktop.webp" width="1680" height="938" alt="" fetchPriority="high" />
      </picture>
      <div className="container pricing-hero-inner">
        <p className="brand-micro">{t.label}</p>
        <h1>{t.title[0]}{" "}<span>{t.title[1]}</span></h1>
        <p className="pricing-lead">{t.lead}</p>
        <nav className="pricing-steps" aria-label={t.label}>{t.steps.map((step, i) => <a key={step} href={i === 0 ? "#website-packages" : "#maintenance"}><span className="brand-latin-code" aria-hidden="true">0{i + 1}</span>{step}</a>)}</nav>
      </div>
    </section>
    <div className="pricing-assurance"><div className="container"><p><PricingText text={t.assurance} /></p></div></div>

    <section id="website-packages" tabIndex={-1} className="pricing-section container" aria-labelledby="website-packages-title">
      <div className="pricing-section-intro"><div><p className="brand-micro"><Latin>01 /</Latin> {t.steps[0]}</p><h2 id="website-packages-title">{t.buildTitle}</h2><p>{t.buildIntro}</p></div><a className="pricing-text-link" href="#comparison">{t.compareLink}</a></div>
      <div className="pricing-builds">{plans.map((plan, i) => <article key={plan.name} className={`pricing-build${i === 1 ? " is-recommended" : ""}${buildIndex === i ? " is-selected" : ""}`} aria-labelledby={`build-${i}`}>
        <div className="pricing-build-price">
          <p className="pricing-plan-status brand-micro">{i === 1 ? t.recommended : <span className="brand-latin-code" aria-hidden="true">0{i + 1}</span>}</p>
          <h3 id={`build-${i}`} className="pricing-editorial-plan-label" lang="en"><Latin>{plan.name}</Latin></h3>
          <div className="pricing-editorial-price-row"><bdi dir="ltr" className="pricing-editorial-plan-price">{money(BUILD_PRICES[i])}</bdi><span className="pricing-price-unit">{t.once}</span></div>
          <a href="#maintenance" className="pricing-recurring"><PricingText text={t.recurring} /></a>
          <BrandButton type="button" className={i === 1 || buildIndex === i ? "" : "btn-secondary"} aria-pressed={buildIndex === i} aria-label={`${buildIndex === i ? t.selected : t.choose} ${plan.name}`} onClick={() => { setBuildIndex(i); moveTo("maintenance"); }}><span>{buildIndex === i ? t.selected : t.choose} <Latin>{plan.name.split(" ")[0]}</Latin></span></BrandButton>
        </div>
        <div className="pricing-build-detail"><p className="pricing-fit">{t.bestFor[i]}</p><p className="pricing-build-summary">{plan.summary}</p><p className="brand-micro pricing-features-label">{t.features}</p><ul className="pricing-features">{plan.features.map(feature => <li key={feature}><PricingText text={feature} /></li>)}</ul></div>
      </article>)}</div>
      <aside className="pricing-custom" aria-labelledby="custom-title">
        <div><p className="brand-micro">{t.customLabel}</p><p className="pricing-editorial-plan-label" lang="en"><Latin>Enterprise / Custom</Latin></p><h3 id="custom-title">{t.customTitle}</h3><p className="pricing-custom-note">{t.customNote}</p><p>{t.customCopy}</p><a href={route("contact")} className="pricing-text-link">{t.quote}</a></div>
        <ul className="pricing-custom-features">{t.customFeatures.map(item => <li key={item}>{item}</li>)}</ul>
      </aside>
    </section>

    <section id="maintenance" tabIndex={-1} className="pricing-care-section" aria-labelledby="care-title"><div className="container pricing-section">
      <div className="pricing-section-intro"><div><p className="brand-micro"><Latin>02 /</Latin> {t.steps[1]}</p><h2 id="care-title">{t.careTitle}</h2><p>{t.careIntro}</p></div><div className="pricing-build-context">{build ? <><Latin>{build.name}</Latin><span>{t.selected}</span><a href="#website-packages">{t.change}</a></> : <p>{t.all}</p>}</div></div>
      <fieldset className="pricing-billing"><legend>{t.frequency}</legend><div>{[false, true].map(annual => <label key={String(annual)} className={yearly === annual ? "is-active" : ""}><input type="radio" name="care-billing" value={annual ? "yearly" : "monthly"} checked={yearly === annual} onChange={() => setYearly(annual)} /><span>{annual ? t.yearly : t.monthly}</span>{annual && <small>{t.discount}</small>}</label>)}</div><p>{t.billingNote}</p></fieldset>
      <div className="pricing-care-grid">{CARE_PLANS.map((plan, i) => <article key={plan.name} aria-labelledby={`care-${i}`} className={`pricing-care${i === 1 ? " is-featured" : ""}${careIndex === i ? " is-selected" : ""}`}>
        <div className="pricing-care-heading"><h3 id={`care-${i}`} className="pricing-editorial-plan-label" lang="en"><Latin>{plan.name}</Latin></h3>{i === 1 && <p className="brand-micro">{t.badge}</p>}</div>
        <p className="pricing-care-description">{t.descriptions[i]}</p>
        <div className="pricing-care-amount" aria-live="polite" aria-atomic="true"><div className="pricing-editorial-price-row"><bdi dir="ltr" className="pricing-editorial-care-price">{money(yearly ? plan.yearly : plan.monthly)}</bdi><span className="pricing-price-unit">{yearly ? t.year : t.month}</span></div><p className="pricing-billing-detail">{yearly ? <><Latin>{money(plan.yearly / 12)}</Latin> {t.equivalent}</> : t.paidMonthly}</p><p className="pricing-saving">{yearly ? <>{t.saving} <Latin>{money(plan.monthly * 12 - plan.yearly)}</Latin> {t.eachYear}</> : t.yearlyAvailable}</p></div>
        <ul className="pricing-features">{CARE_FEATURES[locale][i].map(feature => <li key={feature}><PricingText text={feature} /></li>)}</ul>
        <BrandButton type="button" className={i === 1 || careIndex === i ? "" : "btn-secondary"} aria-pressed={careIndex === i} onClick={() => setCareIndex(i)}><span>{careIndex === i ? t.selected : t.choose} <Latin>{plan.name}</Latin></span></BrandButton>
      </article>)}</div>
      <section className="pricing-selection" id="your-selection" tabIndex={-1} aria-labelledby="selection-title">
        <p className="brand-micro">{t.selection}</p><h3 id="selection-title">{t.summaryTitle}</h3>{(!build || !care) && <p>{t.summaryIntro}</p>}
        <div className="pricing-selection-items" aria-live="polite" aria-atomic="true">
          <div><p className="brand-micro">{t.steps[0]}</p>{build && buildIndex !== null ? <><p className="pricing-selection-name"><Latin>{build.name}</Latin></p><p className="pricing-selection-cost"><strong><Latin>{money(BUILD_PRICES[buildIndex])}</Latin></strong><span>{t.buildCost}</span></p></> : <a href="#website-packages">{t.chooseBuild}</a>}{build && <a className="pricing-change" href="#website-packages">{t.change}</a>}</div>
          <div><p className="brand-micro">{t.steps[1]}</p>{care ? <><p className="pricing-selection-name"><Latin>{care.name}</Latin></p><p className="pricing-selection-cost"><strong><Latin>{money(yearly ? care.yearly : care.monthly)}</Latin></strong><span>{yearly ? t.annualPaid : t.monthlyPaid}</span></p></> : <a href="#maintenance">{t.chooseCare}</a>}{care && <a className="pricing-change" href="#maintenance">{t.change}</a>}</div>
        </div>
        <div className="pricing-selection-action"><BrandButton asChild><a href={pricingContactUrl(locale, buildIndex, careIndex, yearly)}>{build && care ? t.cta : t.help}</a></BrandButton><p>{t.reassurance}</p></div>
      </section>
      <div className="pricing-terms"><p>{t.ownership} <a href={route("terms")}>{t.terms}</a></p><p>{t.tax}</p></div>
      <aside className="pricing-scope"><h3>{t.scope}</h3><p>{t.scopeText}</p></aside>
    </div></section>

    <section className="pricing-section container" id="comparison" tabIndex={-1} aria-labelledby="comparison-title"><div className="pricing-section-intro"><div><p className="brand-micro">{t.compareLink}</p><h2 id="comparison-title">{t.compareTitle}</h2><p>{t.compareIntro}</p></div></div>
      <div className="pricing-table-scroll" role="region" aria-labelledby="comparison-title" tabIndex={0}><table className="pricing-table"><caption className="sr-only">{t.compareTitle}</caption><thead><tr><th scope="col">{t.feature}</th>{plans.map((plan, i) => <th scope="col" key={plan.name}><Latin>{plan.name.split(" ")[0]}</Latin><span><Latin>{money(BUILD_PRICES[i])}</Latin></span></th>)}</tr></thead><tbody>{COMPARISON[locale].map(row => <tr key={row.feature}><th scope="row">{row.feature}</th>{([row.launch, row.growth, row.pro]).map((value, i) => <td key={i}>{typeof value === "boolean" ? <><span aria-hidden="true" className={value ? "pricing-included" : "pricing-excluded"}>{value ? "✓" : "—"}</span><span className="sr-only">{value ? t.included : t.excluded}</span></> : value}</td>)}</tr>)}</tbody></table></div>
      <div className="pricing-mobile-comparison">{COMPARISON[locale].map((row, index) => <details key={row.feature} open={index === 0}>
        <summary><h3>{row.feature}</h3><span className="pricing-disclosure-mark" aria-hidden="true" /></summary>
        <dl className="pricing-mobile-values">{([row.launch, row.growth, row.pro]).map((value, i) => <div key={i}><dt lang="en"><Latin>{plans[i].name.split(" ")[0]}</Latin></dt><dd>{typeof value === "boolean" ? <><span aria-hidden="true" className={value ? "pricing-included" : "pricing-excluded"}>{value ? "✓" : "—"}</span><span className="sr-only">{value ? t.included : t.excluded}</span></> : value}</dd></div>)}</dl>
      </details>)}</div>
    </section>
    <section className="pricing-questions container pricing-section" aria-labelledby="pricing-questions-title"><div className="pricing-section-intro"><h2 id="pricing-questions-title">{t.questionsTitle}</h2><a className="pricing-text-link" href={route("faq")}>{t.allQuestions}</a></div><div>{questions.map(item => <details key={item.q}><summary><h3>{item.q}</h3><span className="pricing-disclosure-mark" aria-hidden="true" /></summary><p><PricingText text={item.a} /></p></details>)}</div></section>
    <section className="pricing-help"><div className="container pricing-section"><h2>{t.helpTitle}</h2><p>{t.helpCopy}</p><div><BrandButton asChild><a href={route("contact")}>{t.cta}</a></BrandButton><a className="pricing-text-link" href={contactWhatsApp(locale)} target="_blank" rel="noopener noreferrer">{t.whatsapp}</a></div></div></section>
  </div>;
}
