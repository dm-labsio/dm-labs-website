import WorkGallery from "./WorkGallery";
import { workCopy, type WorkLocale } from "./workData";
import "./our-work.css";

export default function OurWorkPage({ locale }: { locale: WorkLocale }) {
  const copy = workCopy[locale];
  return (
    <div className="our-work" dir={locale === "he" ? "rtl" : "ltr"}>
      <header className="work-intro container">
        <p className="brand-micro">DM Labs Studio</p>
        <h1>{copy.title}</h1>
        <p className="work-intro-copy">{copy.intro}</p>
      </header>
      <section className="work-service" aria-labelledby="web-design-title">
        <div className="work-service-heading container">
          <h2 id="web-design-title">{copy.web}</h2>
          <p className="brand-micro">{copy.demos}</p>
        </div>
        <WorkGallery locale={locale} />
      </section>
      <section className="work-contact container">
        <div>
          <h2>{copy.cta}</h2>
          <p>{copy.ctaCopy}</p>
        </div>
        <a href={`${locale === "en" ? "" : `/${locale}`}/contact/`}>
          {copy.contact}
        </a>
      </section>
    </div>
  );
}
