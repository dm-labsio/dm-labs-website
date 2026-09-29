import React from "react";
import type { SiteLanguage } from "@/lib/routeLanguage";
import { BUILD_PLANS, BUILD_PRICES, pricingMoney } from "./pricingContent";
import { PRICING_EXPERIENCE } from "./pricingExperience";
import { PRICING_COPY } from "./pricingCopy";

export default function PricingPlanFinder({ locale, goal, onGoal, onChoose }: {
  locale: SiteLanguage; goal: number | null; onGoal: (index: number) => void; onChoose: (index: number) => void;
}) {
  const copy = PRICING_EXPERIENCE[locale];
  return <section className="pricing-finder" aria-labelledby="finder-title">
    <div><p className="brand-micro">{copy.finderLabel}</p><h3 id="finder-title">{copy.finderTitle}</h3><p>{copy.finderIntro}</p></div>
    <div className="pricing-goals" role="group" aria-labelledby="finder-title">
      {copy.goals.map((label, index) => <button key={label} type="button" aria-pressed={goal === index} onClick={() => onGoal(index)}><span className="brand-latin-code" aria-hidden="true">0{index + 1}</span>{label}<span aria-hidden="true">{goal === index ? "✓" : "+"}</span></button>)}
    </div>
    <div className="pricing-finder-result" aria-live="polite" aria-atomic="true">
      {goal !== null && <div key={goal} className="pricing-finder-answer"><p className="brand-micro">{copy.suggested}</p><p className="pricing-finder-name"><bdi lang="en" dir="ltr">{BUILD_PLANS[locale][goal].name}</bdi></p><p className="pricing-finder-cost"><bdi dir="ltr">{pricingMoney(locale,BUILD_PRICES[goal])}</bdi> {PRICING_COPY[locale].once}<span>{PRICING_COPY[locale].recurring}</span></p><p>{copy.reasons[goal]}</p><button type="button" onClick={() => onChoose(goal)}>{copy.usePlan}<span aria-hidden="true">{locale === "he" ? "←" : "→"}</span></button></div>}
    </div>
    <p className="pricing-finder-custom">{copy.customPrompt} <a href="#custom-project">{copy.customLink}</a></p>
  </section>;
}
