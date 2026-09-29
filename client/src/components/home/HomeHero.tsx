import React from "react";
import BrandButton from "../ui/brand-button";
import type { SiteLanguage } from "@/lib/routeLanguage";
import { HOME_HERO_COPY } from "./homeHeroContent";
import HomeHeroScene from "./HomeHeroScene";
import "./HomeHero.css";

/** Normal document flow and complete HTML content, independent of media or motion. */
export default function HomeHero({ language }: { language: SiteLanguage }) {
  const copy = HOME_HERO_COPY[language];
  return (
    <section className="home-hero" lang={language} dir={language === "he" ? "rtl" : "ltr"} aria-labelledby="home-hero-heading">
      <div className="container home-hero-grid">
        <div className="home-hero-copy">
          <p className="home-hero-eyebrow brand-micro">{copy.eyebrow}</p>
          <h1 id="home-hero-heading" className="home-hero-title">
            {copy.opening}{" "}<span className="home-hero-payoff">{copy.payoff}</span>
          </h1>
          <p className="home-hero-description">{copy.body}</p>
          <div className="home-hero-actions">
            <BrandButton asChild><a href={copy.contactHref} className="home-hero-primary">{copy.consultation}</a></BrandButton>
            <a href={copy.examplesHref} className="home-hero-secondary">{copy.examples}</a>
          </div>
        </div>
        <HomeHeroScene language={language} />
      </div>
    </section>
  );
}
