import React from "react";
import HomeFilmPlayer from "./HomeFilmPlayer";
import type { HomeLocale } from "./overviewContent";
import {
  HOME_INTRODUCTION_COPY,
  HOME_INTRODUCTION_MEDIA,
} from "./homeIntroductionContent";
import "./HomeIntroductionVideo.css";
import { useStructuredData } from "@/hooks/useStructuredData";
import { absoluteImageUrl, ORGANIZATION_ID } from "@/lib/structuredData";

export default function HomeIntroductionVideo({
  language,
}: {
  language: HomeLocale;
}) {
  const copy = HOME_INTRODUCTION_COPY[language];
  const pageUrl = `https://dm-labs.io/${language === "en" ? "" : `${language}/`}`;
  useStructuredData("introduction-video-jsonld", {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${pageUrl}#introduction-video`,
    name: copy.title,
    description: "DM-Labs.io introduces the studio and its website services.",
    thumbnailUrl: absoluteImageUrl(HOME_INTRODUCTION_MEDIA.poster),
    contentUrl: absoluteImageUrl(HOME_INTRODUCTION_MEDIA.desktop),
    uploadDate: "2026-09-29",
    duration: "PT31.1S",
    inLanguage: "en",
    creator: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": `${pageUrl}#webpage` },
  });
  return (
    <section
      className="home-film"
      id="meet-dm-labs"
      lang={language}
      dir={language === "he" ? "rtl" : "ltr"}
      aria-labelledby="home-film-title"
    >
      <div className="container">
        <h2 className="sr-only" id="home-film-title">
          {copy.title}
        </h2>
        <HomeFilmPlayer
          language={language}
          cover={
            <>
              <img
                className="home-film-cover-art"
                src="/media/brand-refresh/v1/studio-glass-right.webp"
                alt=""
                width={1672}
                height={941}
                loading="lazy"
                decoding="async"
              />
              <header className="home-film-cover-copy">
                <p className="brand-micro">{copy.label}</p>
                <span className="home-film-cover-title" aria-hidden="true">
                  {copy.title}
                </span>
              </header>
            </>
          }
        />
      </div>
    </section>
  );
}
