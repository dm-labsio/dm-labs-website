import React from "react";
import type { SiteLanguage } from "@/lib/routeLanguage";
import { HOME_HERO_COPY } from "./homeHeroContent";
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
            <a href={copy.contactHref} className="home-hero-primary">{copy.consultation}<span aria-hidden="true">{language === "he" ? "←" : "→"}</span></a>
            <a href={copy.examplesHref} className="home-hero-secondary">{copy.examples}</a>
          </div>
          <p className="home-hero-note">{copy.note}</p>
        </div>
        <div className="home-hero-art" aria-hidden="true">
          <img
            src="/media/brand-v1/home-glass-sculpture-960.webp"
            srcSet="/media/brand-v1/home-glass-sculpture-480.webp 480w, /media/brand-v1/home-glass-sculpture-960.webp 960w"
            sizes="(max-width: 767px) 280px, (max-width: 1023px) 380px, 44vw"
            alt="" width="960" height="1091" fetchPriority="high" decoding="async"
          />
          <div className="home-hero-light" />
        </div>
      </div>
    </section>
  );
}
