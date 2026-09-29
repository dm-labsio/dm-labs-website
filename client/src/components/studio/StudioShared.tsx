import React, { useRef } from "react";
import { useInView } from "framer-motion";
import BrandButton from "@/components/ui/brand-button";
import type { SiteLanguage } from "@/lib/routeLanguage";
import { STUDIO_COPY, studioRoute } from "./studioCopy";
import "./StudioPage.css";

export function StudioRule() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 1 });
  return <div ref={ref} className="studio-rule" data-visible={visible} aria-hidden="true"><span /></div>;
}

export function StudioHero({ locale, family }: { locale: SiteLanguage; family: "services" | "process" }) {
  const t = STUDIO_COPY[locale];
  const copy = t[family];
  const links = family === "services" ? ["website-packages", "capabilities", "maintenance"] : ["journey", "timing"];
  return <section className={`studio-hero studio-hero--${family}`} aria-labelledby="studio-title">
    <picture className="studio-hero-art" aria-hidden="true">
      <source media="(max-width: 767px)" srcSet="/media/brand-refresh/v1/studio-glass-mobile.webp" width="760" height="1352" />
      <img src={family === "process" ? "/media/brand-refresh/v1/pricing-glass-arcs-desktop.webp" : locale === "he" ? "/media/brand-refresh/v1/studio-glass-left.webp" : "/media/brand-refresh/v1/studio-glass-right.webp"} width={family === "process" ? 1680 : 1672} height={family === "process" ? 938 : 941} alt="" fetchPriority="high" />
    </picture>
    <div className="container studio-hero-content">
      <p className="brand-micro">{copy.label}</p>
      <h1 id="studio-title">{copy.title[0]} <span>{copy.title[1]}</span></h1>
      <p className="studio-lead">{copy.lead}</p>
      <BrandButton asChild><a href={studioRoute(locale, "contact")}>{t.consultation}</a></BrandButton>
      <nav className="studio-jump-links" aria-label={copy.label}>{copy.nav.map((label, i) => <a href={`#${links[i]}`} key={label}><bdi className="brand-latin-code" aria-hidden="true">0{i + 1}</bdi>{label}</a>)}</nav>
    </div>
  </section>;
}

export function StudioClosing({ locale, family }: { locale: SiteLanguage; family: "services" | "process" }) {
  const t = STUDIO_COPY[locale];
  return <section className="studio-closing"><div className="container studio-section">
    <p className="brand-micro">{t.consultation}</p><h2>{t[family].helpTitle}</h2><p>{t[family].helpCopy}</p>
    <div className="studio-actions"><BrandButton asChild><a href={studioRoute(locale, "contact")}>{t.consultation}</a></BrandButton><a className="studio-link" href={studioRoute(locale, family === "services" ? "process" : "services")}>{family === "services" ? t.processLink : t.servicesLink}</a></div>
  </div></section>;
}
