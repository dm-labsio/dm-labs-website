import { BUILD_ANCHORS, CARE_ANCHORS, PACKAGE_ART } from "./packageVisuals";
import React, { useEffect, useRef, useState } from "react";
import BrandButton from "@/components/ui/brand-button";
import { contactWhatsApp } from "@/components/contact/contactCopy";
import { FAQ_CONTENT } from "@/components/faq/faqContent";
import type { SiteLanguage } from "@/lib/routeLanguage";
import { BUILD_PLANS, BUILD_PRICES, CARE_PLANS, CARE_FEATURES, pricingContactUrl, pricingMoney } from "./pricingContent";
import { PRICING_COPY } from "./pricingCopy";
import { useServiceMotion } from "@/components/services/useServiceMotion";
import PricingEstimate from "./PricingEstimate";
import { PRICING_EXPERIENCE, comparisonRows } from "./pricingExperience";
import { movePricingTo as moveTo, schedulePricingAdvance } from "./pricingNavigation";
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

/** Expand the native control's pointer target without nesting interactive elements. */
function activateCard(event: React.MouseEvent<HTMLElement>) {
  if (!(event.target instanceof Element) || event.target.closest("a, button, input, summary")) return;
  event.currentTarget.querySelector<HTMLElement>(".pricing-choice, a.pricing-action")?.click();
}

export default function PricingPage({ locale }: { locale: SiteLanguage }) {
  const t = PRICING_COPY[locale];
  const plans = BUILD_PLANS[locale];
  const x = PRICING_EXPERIENCE[locale];
  const artwork = useServiceMotion(locale);
  const cancelAdvance = useRef<() => void>(() => {});
  useEffect(() => () => cancelAdvance.current(), [locale]);
  const advanceTo = (id: string) => {
    cancelAdvance.current();
    cancelAdvance.current = schedulePricingAdvance(id);
  };
  const [differencesOnly, setDifferencesOnly] = useState(false);
  const rows = comparisonRows(locale, differencesOnly);
  const [buildIndex, setBuildIndex] = useState<number | null>(null);
  const [careIndex, setCareIndex] = useState<number | null>(null);
  const [yearly, setYearly] = useState(false);
  const build = buildIndex === null ? null : plans[buildIndex];
  const care = careIndex === null ? null : CARE_PLANS[careIndex];
  const money = (value: number) => pricingMoney(locale, value);
  const route = (path: string) => `${locale === "en" ? "" : `/${locale}`}/${path}/`;
  const faq = FAQ_CONTENT[locale];
  const questions = [
    { q: t.careQuestion, a: `${t.careIntro} ${x.monthlyExplanation}` },
    faq.design, faq.extend, faq["extra-costs"], faq["care-exclusions"], faq.ownership,
    { q: t.customQuestion, a: t.customCopy },
  ];

  const step = buildIndex === null ? 0 : careIndex === null ? 1 : 2;
  const stepTargets = ["website-packages", "maintenance", "your-selection"];
  const art = PACKAGE_ART;

  return <div className="pricing-page pricing-journey" lang={locale} dir={locale === "he" ? "rtl" : "ltr"} data-button-surface="dark" onClickCapture={() => cancelAdvance.current()}>
    <header className="pricing-heading container">
      <p className="brand-micro">{t.label}</p>
      <h1>{t.title[0]} <span>{t.title[1]}</span></h1>
      <p className="pricing-lead"><PricingText text={t.assurance} /></p>
    </header>

    <nav className="pricing-progress" aria-label={t.selection}><ol className="container">{x.flowSteps.map((label, i) => <li key={label} className={step >= i ? "is-reached" : ""}>
      <a href={`#${stepTargets[i]}`} aria-current={step === i ? "step" : undefined}><span className="brand-latin-code">0{i + 1}</span><span>{label}</span>{step > i && <span className="pricing-step-check" aria-label={t.selected}>✓</span>}</a>
    </li>)}</ol></nav>
    <p className="sr-only" role="status">{build ? `${t.selected}: ${build.name}.` : ""} {care ? `${t.selected}: ${care.name}.` : ""}</p>

    <section id="website-packages" tabIndex={-1} className="pricing-section pricing-build-section container" aria-labelledby="website-packages-title">
      <div className="pricing-section-intro"><h2 id="website-packages-title">{t.chooseBuild}</h2><a className="pricing-text-link" href="#comparison">{t.compareLink}</a></div>
      <div className="pricing-builds" ref={artwork.root}>{plans.map((plan, i) => <article key={plan.name} id={BUILD_ANCHORS[i]} tabIndex={-1} data-plan={i} onClick={activateCard} className={`pricing-build${buildIndex === i ? " is-selected" : ""}`} aria-labelledby={`build-${i}`}>
        <div className="pricing-build-stage">
          <div className="pricing-card-art" aria-hidden="true"><img data-motion-piece src={`/media/brand-refresh/v1/${art[i]}`} width="840" height="560" alt="" /></div>
          <div className="pricing-plan-top"><h3 id={`build-${i}`} lang="en"><Latin>{plan.name.split(" ")[0]}</Latin><span className="pricing-plan-category">Website</span></h3><span className="pricing-choice-stamp" aria-hidden="true">{buildIndex === i ? "✓" : null}</span></div>
          <div className="pricing-build-amount"><bdi dir="ltr" className="pricing-display-price">{money(BUILD_PRICES[i])}</bdi><span className="pricing-price-unit">{t.once}</span></div>
        </div>
        <div className="pricing-build-content">
          <p className="pricing-fit">{x.fit[i]}</p>
          <div className="pricing-build-detail">{x.inherits[i] && <p className="pricing-inherits"><PricingText text={x.inherits[i]} /></p>}<ul className="pricing-features">{plan.features.map(feature => <li key={feature}><PricingText text={feature} /></li>)}</ul></div>
          <button type="button" className="pricing-choice" aria-pressed={buildIndex === i} aria-label={`${buildIndex === i ? t.selected : t.choose} ${plan.name}`} onClick={() => {setBuildIndex(i);advanceTo("maintenance");}}><span>{buildIndex === i ? t.selected : t.choose} <Latin>{plan.name.split(" ")[0]}</Latin></span></button>
          <p className="pricing-recurring"><PricingText text={t.recurring} /></p>
        </div>
      </article>)}</div>
      <aside id="custom-project" onClick={activateCard} className="pricing-custom" aria-labelledby="custom-title">
        <div className="pricing-custom-art" aria-hidden="true"><img src="/media/brand-refresh/v1/contact-folded-glass-desktop.webp" width="1680" height="938" alt="" loading="lazy" /></div>
        <div className="pricing-custom-name"><p className="brand-micro">{t.customLabel}</p><h3 id="custom-title"><Latin>Enterprise<span> / Custom</span></Latin></h3><p className="pricing-custom-note">{t.customNote}</p></div>
        <div className="pricing-custom-content"><p>{x.customShort}</p><p className="pricing-custom-capabilities">{x.customExamples}</p><BrandButton asChild className="pricing-action"><a href={route("contact")}>{t.quote}</a></BrandButton></div>
      </aside>
    </section>

    <section id="maintenance" tabIndex={-1} className="pricing-care-section" aria-labelledby="care-title"><div className="container pricing-section">
      <div className="pricing-section-intro"><div><p className="brand-micro"><Latin>02 /</Latin> {x.flowSteps[1]}</p><h2 id="care-title">{t.careTitle}</h2><p>{x.careIntro}</p></div>{build && <div className="pricing-build-context"><span>{t.selected}</span><strong><Latin>{build.name}</Latin></strong><a href="#website-packages">{t.change}</a></div>}</div>
      <fieldset className="pricing-billing"><legend>{t.frequency}</legend><div>{[false, true].map(annual => <label key={String(annual)} className={yearly === annual ? "is-active" : ""}><input type="radio" name="care-billing" value={annual ? "yearly" : "monthly"} checked={yearly === annual} onChange={() => setYearly(annual)} /><span>{annual ? t.yearly : t.monthly}</span>{annual && <small>{t.discount}</small>}</label>)}</div></fieldset>
      <div className="pricing-care-grid">{CARE_PLANS.map((plan, i) => <article key={plan.name} id={CARE_ANCHORS[i]} tabIndex={-1} onClick={activateCard} aria-labelledby={`care-${i}`} className={`pricing-care${i === 1 ? " is-featured" : ""}${careIndex === i ? " is-selected" : ""}`}>
        <div className="pricing-care-top"><h3 id={`care-${i}`} lang="en"><Latin>{plan.name}</Latin></h3><span className="pricing-choice-stamp" aria-hidden="true">{careIndex === i ? "✓" : null}</span></div>
        <p className="pricing-care-description">{x.careFit[i]}</p>
        <div className="pricing-care-amount" aria-live="polite" aria-atomic="true"><div className="pricing-care-price-row"><bdi dir="ltr" className="pricing-display-price" key={yearly ? "year" : "month"}>{money(yearly ? plan.yearly : plan.monthly)}</bdi><span className="pricing-price-unit">{yearly ? t.year : t.month}</span></div><p className="pricing-billing-detail">{yearly ? <><Latin>{money(plan.yearly / 12)}</Latin> {t.equivalent}</> : t.paidMonthly}</p>{yearly && <p className="pricing-saving">{t.saving} <Latin>{money(plan.monthly * 12 - plan.yearly)}</Latin> {t.eachYear}</p>}</div>
        <ul className="pricing-features">{CARE_FEATURES[locale][i].map(feature => <li key={feature}><PricingText text={feature} /></li>)}</ul>
        <button type="button" className="pricing-choice" aria-pressed={careIndex === i} onClick={() => {setCareIndex(i);advanceTo(buildIndex === null ? "website-packages" : "your-selection");}}><span>{careIndex === i ? t.selected : t.choose} <Latin>{plan.name}</Latin></span></button>
      </article>)}</div>
    </div></section>

    <section className={`pricing-total-section${build && care ? " is-complete" : ""}`} id="your-selection" tabIndex={-1} aria-labelledby="selection-title"><div className="container pricing-section">
      <div className="pricing-section-intro"><div><p className="brand-micro"><Latin>03 /</Latin> {x.flowSteps[2]}</p><h2 id="selection-title">{yearly ? x.estimateTitle : x.paymentTitle}</h2></div>{(build || care) && <button type="button" className="pricing-reset" onClick={() => {setBuildIndex(null);setCareIndex(null);setYearly(false);moveTo("website-packages");}}>{x.clear}</button>}</div>
      <div className="pricing-receipt">
        <div className="pricing-selection-items">
          <div><p className="brand-micro">{t.steps[0]}</p>{build && buildIndex !== null ? <><p className="pricing-selection-name"><Latin>{build.name}</Latin></p><p className="pricing-selection-cost"><strong><Latin>{money(BUILD_PRICES[buildIndex])}</Latin></strong><span>{t.buildCost}</span></p></> : <a href="#website-packages">{t.chooseBuild}</a>}{build && <a className="pricing-change" href="#website-packages">{t.change}</a>}</div>
          <span className="pricing-receipt-plus" aria-hidden="true">{yearly ? "+" : "↓"}</span>
          <div><p className="brand-micro">{t.steps[1]}</p>{care ? <><p className="pricing-selection-name"><Latin>{care.name}</Latin></p><p className="pricing-selection-cost"><strong><Latin>{money(yearly ? care.yearly : care.monthly)}</Latin></strong><span>{yearly ? t.annualPaid : t.monthlyPaid}</span></p></> : <a href="#maintenance">{t.chooseCare}</a>}{care && <a className="pricing-change" href="#maintenance">{t.change}</a>}</div>
        </div>
        <PricingEstimate locale={locale} build={buildIndex} care={careIndex} yearly={yearly} />
      </div>
      <div className="pricing-selection-action"><BrandButton asChild className="pricing-action"><a href={pricingContactUrl(locale, buildIndex, careIndex, yearly)}>{build && care ? t.cta : t.help}</a></BrandButton><p>{t.reassurance}</p></div>
      <div className="pricing-terms"><p>{t.ownership} <a href={route("terms")}>{t.terms}</a></p></div>
      <aside className="pricing-scope"><h3>{t.scope}</h3><p>{t.scopeText}</p></aside>
    </div></section>

    <section className="pricing-section container" id="comparison" tabIndex={-1} aria-labelledby="comparison-title"><div className="pricing-section-intro"><div><p className="brand-micro">{t.compareLink}</p><h2 id="comparison-title">{t.compareTitle}</h2><p>{t.compareIntro}</p></div></div>
      <label className="pricing-differences"><input type="checkbox" checked={differencesOnly} onChange={event => setDifferencesOnly(event.target.checked)} /><span>{x.differences}</span></label>
      <div className="pricing-table-scroll" role="region" aria-labelledby="comparison-title" tabIndex={0}><table className="pricing-table"><caption className="sr-only">{t.compareTitle}</caption><thead><tr><th scope="col">{t.feature}</th>{plans.map((plan, i) => <th scope="col" key={plan.name} data-selected={buildIndex === i}><Latin>{plan.name.split(" ")[0]}</Latin><span><Latin>{money(BUILD_PRICES[i])}</Latin></span></th>)}</tr></thead><tbody>{rows.map(row => <tr key={row.feature}><th scope="row">{row.feature}</th>{([row.launch, row.growth, row.pro]).map((value, i) => <td key={i} data-selected={buildIndex === i}>{typeof value === "boolean" ? <><span aria-hidden="true" className={value ? "pricing-included" : "pricing-excluded"}>{value ? "✓" : "×"}</span><span className="sr-only">{value ? t.included : t.excluded}</span></> : value}</td>)}</tr>)}</tbody></table></div>
      <div className="pricing-mobile-comparison">{rows.map(row => <details key={row.feature} open>
        <summary><h3>{row.feature}</h3><span className="pricing-disclosure-mark" aria-hidden="true" /></summary>
        <dl className="pricing-mobile-values">{([row.launch, row.growth, row.pro]).map((value, i) => <div key={i} data-selected={buildIndex === i}><dt lang="en"><Latin>{plans[i].name.split(" ")[0]}</Latin></dt><dd>{typeof value === "boolean" ? <><span aria-hidden="true" className={value ? "pricing-included" : "pricing-excluded"}>{value ? "✓" : "×"}</span><span className="sr-only">{value ? t.included : t.excluded}</span></> : value}</dd></div>)}</dl>
      </details>)}</div>
    </section>
    <section className="pricing-questions container pricing-section" aria-labelledby="pricing-questions-title"><div className="pricing-section-intro"><h2 id="pricing-questions-title">{t.questionsTitle}</h2><a className="pricing-text-link" href={route("faq")}>{t.allQuestions}</a></div><div>{questions.map(item => <details key={item.q} open><summary><h3>{item.q}</h3><span className="pricing-disclosure-mark" aria-hidden="true" /></summary><p><PricingText text={item.a} /></p></details>)}</div></section>
    <section className="pricing-help"><div className="container pricing-section"><h2>{t.helpTitle}</h2><p>{t.helpCopy}</p><div><BrandButton asChild><a href={route("contact")}>{t.cta}</a></BrandButton><a className="pricing-text-link" href={contactWhatsApp(locale)} target="_blank" rel="noopener noreferrer">{t.whatsapp}</a></div></div></section>
  </div>;
}
