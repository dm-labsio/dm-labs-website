import React from "react";
import type { SiteLanguage } from "@/lib/routeLanguage";
import { BUILD_PLANS, BUILD_PRICES, CARE_FEATURES, CARE_PLANS, pricingMoney } from "./pricingContent";
import { PRICING_COPY } from "./pricingCopy";
import { PRICING_EXPERIENCE } from "./pricingExperience";
import { BUILD_ANCHORS, CARE_ANCHORS, PACKAGE_ART } from "./packageVisuals";
import "./PricingPage.css";
import "./PackageOverview.css";

const COPY = {
  en: { label: "Website packages", title: "A clear next step.", intro: "Three website packages. A custom option for everything beyond.", serviceIntro: "Complete website packages. The features we include depend on your package and agreed scope.", view: "Explore", care: "See care options", custom: "Something more?", compare: "Compare all plans", careNote: "Hosting & care from €69/month while we manage your website. Monthly care starts the month after official launch." },
  el: { label: "Πακέτα ιστοσελίδων", title: "Το επόμενο βήμα, ξεκάθαρα.", intro: "Τρία πακέτα ιστοσελίδων. Και μια custom λύση για κάτι περισσότερο.", serviceIntro: "Ολοκληρωμένα πακέτα ιστοσελίδων. Οι λειτουργίες εξαρτώνται από το πακέτο και το συμφωνημένο εύρος του έργου.", view: "Δείτε το", care: "Επιλογές φροντίδας", custom: "Κάτι περισσότερο;", compare: "Σύγκριση πακέτων", careNote: "Φιλοξενία και φροντίδα από €69/μήνα όσο διαχειριζόμαστε το site σας. Η μηνιαία φροντίδα ξεκινά τον μήνα μετά την επίσημη δημοσίευση." },
  he: { label: "חבילות אתרים", title: "הצעד הבא, ברור ופשוט.", intro: "שלוש חבילות לבניית אתר. ופתרון אישי לכל מה שמעבר.", serviceIntro: "חבילות לבניית אתר שלם. היכולות שכלולות תלויות בחבילה ובהיקף הפרויקט שסוכם.", view: "לפרטי", care: "לתוכניות התחזוקה", custom: "צריכים יותר?", compare: "להשוואת החבילות", careNote: "אירוח ותחזוקה החל מ־€69 לחודש כל עוד אנחנו מנהלים את האתר. התחזוקה החודשית מתחילה בחודש שאחרי ההשקה הרשמית." },
} as const;

const route = (locale: SiteLanguage, path: string) => `${locale === "en" ? "" : `/${locale}`}/${path}/`;
const Latin = ({ children }: { children: React.ReactNode }) => <bdi lang="en" dir="ltr">{children}</bdi>;
const Arrow = ({ locale }: { locale: SiteLanguage }) => <span className="pricing-choice-arrow" aria-hidden="true">{locale === "he" ? "←" : "→"}</span>;

/** Shared pricing visuals, with ordinary links. No selection state or automatic progression. */
export function PackageCards({ locale, compact = false }: { locale: SiteLanguage; compact?: boolean }) {
  const t = PRICING_COPY[locale];
  const x = PRICING_EXPERIENCE[locale];
  return <div className={`pricing-catalog${compact ? " pricing-catalog--compact" : ""}`} lang={locale} dir={locale === "he" ? "rtl" : "ltr"}>
    <div className="pricing-builds">{BUILD_PLANS[locale].map((plan, i) => <article key={plan.name} aria-label={plan.name} data-plan={i} className="pricing-build package-card">
      <div className="pricing-build-stage">
        <div className="pricing-card-art" aria-hidden="true"><img src={`/media/brand-refresh/v1/${PACKAGE_ART[i]}`} width="840" height="560" loading="lazy" decoding="async" alt="" /></div>
        <div className="pricing-plan-top"><h3 lang="en"><Latin>{plan.name.split(" ")[0]}</Latin><span className="pricing-plan-category">Website</span></h3><span className="pricing-choice-stamp" aria-hidden="true">0{i + 1}</span></div>
        <div className="pricing-build-amount"><bdi dir="ltr" className="pricing-display-price">{pricingMoney(locale, BUILD_PRICES[i])}</bdi><span className="pricing-price-unit">{t.once}</span></div>
      </div>
      <div className="pricing-build-content">
        <p className="pricing-fit">{x.fit[i]}</p>
        {!compact && <div className="pricing-build-detail">{x.inherits[i] && <p className="pricing-inherits">{x.inherits[i]}</p>}<ul className="pricing-features">{plan.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div>}
        <a className="pricing-choice" href={`${route(locale, "pricing")}#${BUILD_ANCHORS[i]}`}><span>{COPY[locale].view} <Latin>{plan.name.split(" ")[0]}</Latin></span><Arrow locale={locale} /></a>
      </div>
    </article>)}</div>
  </div>;
}

export function CustomPackage({ locale, compact = false }: { locale: SiteLanguage; compact?: boolean }) {
  const t = PRICING_COPY[locale];
  return <aside className={`pricing-catalog package-custom${compact ? " package-custom--compact" : ""}`} lang={locale} dir={locale === "he" ? "rtl" : "ltr"}>
    <div><p className="brand-micro">{COPY[locale].custom}</p><h3><Latin>Enterprise / Custom</Latin></h3><p>{t.customNote}</p></div>
    {!compact && <ul className="pricing-features">{t.customFeatures.map(feature => <li key={feature}>{feature}</li>)}</ul>}
    <a className="pricing-choice" href={`${route(locale, "pricing")}#custom-project`}><span>{t.quote}</span><Arrow locale={locale} /></a>
  </aside>;
}

export function CarePackageCards({ locale }: { locale: SiteLanguage }) {
  const t = PRICING_COPY[locale];
  return <div className="pricing-catalog pricing-care-grid" lang={locale} dir={locale === "he" ? "rtl" : "ltr"}>{CARE_PLANS.map((plan, i) => <article key={plan.name} className={`pricing-care package-card${i === 1 ? " is-featured" : ""}`}>
    <div className="pricing-care-top"><h3 lang="en"><Latin>{plan.name}</Latin></h3><span className="pricing-choice-stamp" aria-hidden="true">0{i + 1}</span></div>
    <p className="pricing-care-description">{PRICING_EXPERIENCE[locale].careFit[i]}</p>
    <div className="pricing-care-amount"><div className="pricing-care-price-row"><bdi dir="ltr" className="pricing-display-price">{pricingMoney(locale, plan.monthly)}</bdi><span className="pricing-price-unit">{t.month}</span></div><p className="pricing-billing-detail">{t.paidMonthly}</p></div>
    <ul className="pricing-features">{CARE_FEATURES[locale][i].map(feature => <li key={feature}>{feature}</li>)}</ul>
    <a className="pricing-choice" href={`${route(locale, "pricing")}#${CARE_ANCHORS[i]}`}><span>{COPY[locale].care}<span className="sr-only">: {plan.name}</span></span><Arrow locale={locale} /></a>
  </article>)}</div>;
}

export default function PackageOverview({ locale, context = "home" }: { locale: SiteLanguage; context?: "home" | "service" }) {
  const t = COPY[locale];
  return <section id="pricing" tabIndex={-1} className="package-overview" lang={locale} dir={locale === "he" ? "rtl" : "ltr"} aria-labelledby="package-overview-title">
    <div className="container"><header className="package-overview-heading"><div><p className="brand-micro">{t.label}</p><h2 id="package-overview-title">{t.title}</h2><p>{context === "home" ? t.intro : t.serviceIntro}</p></div><a className="pricing-text-link" href={route(locale, "pricing")}>{t.compare}<span aria-hidden="true">{locale === "he" ? " ←" : " →"}</span></a></header>
      <PackageCards locale={locale} compact />
      <CustomPackage locale={locale} compact />
      <p className="package-overview-note">{t.careNote} <a href={`${route(locale, "pricing")}#maintenance`}>{t.care}</a></p>
      <p className="package-overview-tax">{PRICING_COPY[locale].tax}</p>
    </div>
  </section>;
}
