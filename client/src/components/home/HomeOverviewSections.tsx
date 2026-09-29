import HomeServiceCards from "./HomeServiceCards";
import { Link } from "wouter";
import { overviewContent, type HomeLocale } from "./overviewContent";
import "./HomeOverviewSections.css";

const labels = {
  en: {
    services: "What we do", serviceTitle: "Every detail has a job to do.",
    serviceIntro: "A distinctive brand, a fast experience, and a clear way to get in touch. Built around your business.",
    more: "Explore service", process: "How we work", processTitle: "From first conversation to launch.",
    processIntro: "Five clear steps. Direct answers. You know what happens next, and we keep things moving.",
    fullProcess: "See the full process", industries: "Made for your world", industryTitle: "Different businesses. Distinctive websites.",
    industryIntro: "Explore a few design concepts. Your website starts with your brand, your customers, and your goals.",
    categories: ["Restaurants", "Beauty & salons", "Clinics", "Fitness"], example: "Explore concept",
    allExamples: "See all examples", other: "Have something else in mind?", contact: "Ask us anything",
  },
  el: {
    services: "Τι κάνουμε", serviceTitle: "Κάθε λεπτομέρεια έχει έναν σκοπό.",
    serviceIntro: "Ξεχωριστή ταυτότητα, γρήγορη εμπειρία και εύκολη επικοινωνία. Όλα σχεδιασμένα γύρω από την επιχείρησή σας.",
    more: "Δείτε την υπηρεσία", process: "Πώς δουλεύουμε", processTitle: "Από την πρώτη συζήτηση στη δημοσίευση.",
    processIntro: "Πέντε ξεκάθαρα βήματα. Άμεσες απαντήσεις. Ξέρετε τι ακολουθεί και εμείς κρατάμε το έργο σε κίνηση.",
    fullProcess: "Δείτε όλη τη διαδικασία", industries: "Για τον δικό σας κλάδο", industryTitle: "Διαφορετικές επιχειρήσεις. Ξεχωριστές ιστοσελίδες.",
    industryIntro: "Πάρτε μια ιδέα από ενδεικτικά σχέδια. Η δική σας ιστοσελίδα ξεκινά από το brand, τους πελάτες και τους στόχους σας.",
    categories: ["Εστιατόρια", "Ομορφιά & κομμωτήρια", "Κλινικές", "Γυμναστήρια"], example: "Δείτε το παράδειγμα",
    allExamples: "Όλα τα παραδείγματα", other: "Έχετε κάτι άλλο στο μυαλό σας;", contact: "Ρωτήστε μας ό,τι θέλετε",
  },
  he: {
    services: "מה אנחנו עושים", serviceTitle: "לכל פרט באתר יש תפקיד.",
    serviceIntro: "מותג מרשים, חוויה מהירה ודרך ברורה ליצור קשר. הכול מתחיל בעסק שלכם.",
    more: "לפרטים על השירות", process: "איך עובדים יחד", processTitle: "מהשיחה הראשונה ועד ההשקה.",
    processIntro: "חמישה שלבים ברורים. תשובות ישירות. אתם יודעים מה קורה בהמשך, ואנחנו דואגים שהדברים יתקדמו.",
    fullProcess: "לתהליך המלא", industries: "לעולם של העסק שלכם", industryTitle: "עסקים שונים. אתרים עם אופי.",
    industryIntro: "כמה כיווני עיצוב להשראה. האתר שלכם מתחיל במותג, בלקוחות ובמטרות שלכם.",
    categories: ["מסעדות", "יופי וטיפוח", "קליניקות", "כושר"], example: "לצפייה בדוגמה",
    allExamples: "לכל הדוגמאות", other: "יש לכם משהו אחר בראש?", contact: "שאלו אותנו כל דבר",
  },
} as const;

const industries = [
  { image: "restaurant", src: "/media/brand-v1/restaurant-800.webp", small: "/media/brand-v1/restaurant-480.webp", demo: "verde-restaurant" },
  { image: "beauty", src: "/media/brand-v1/beauty-800.webp", small: "/media/brand-v1/beauty-480.webp", demo: "bella-salon" },
  { image: "clinic", src: "/media/brand-v1/clinic-800.webp", small: "/media/brand-v1/clinic-480.webp", demo: "dr-elara-dental" },
  { image: "fitness", src: "/media/brand-v1/fitness-800.webp", small: "/media/brand-v1/fitness-480.webp", demo: "pulse-gym" },
] as const;

type Props = { language: HomeLocale };
const localeRoot = (language: HomeLocale) => language === "en" ? "/" : `/${language}/`;

function SectionIntro({ label, title, body }: { label: string; title: string; body: string }) {
  return <header className="home-overview-intro">
    <p className="home-overview-label">{label}</p>
    <h2>{title}</h2>
    <p className="home-overview-lead">{body}</p>
  </header>;
}

export function HomeServices({ language }: Props) {
  const copy = labels[language];
  return <section id="services" className="home-overview home-overview-services" lang={language} dir={language === "he" ? "rtl" : "ltr"}>
    <div className="container">
      <SectionIntro label={copy.services} title={copy.serviceTitle} body={copy.serviceIntro} />
      <HomeServiceCards language={language} />
    </div>
  </section>;
}

export function HomeProcess({ language }: Props) {
  const copy = labels[language];
  return <section id="process" className="home-overview home-overview-process" lang={language} dir={language === "he" ? "rtl" : "ltr"}>
    <div className="container home-process-layout">
      <div className="home-process-introduction"><SectionIntro label={copy.process} title={copy.processTitle} body={copy.processIntro} /><Link className="home-overview-link home-overview-endlink" href={`${localeRoot(language)}process/`}>{copy.fullProcess}</Link></div>
      <ol className="home-process-list" role="list">
        {overviewContent[language].steps.map(step => <li key={step.number}>
          <span className="home-step-number" aria-hidden="true" lang="en" dir="ltr">{step.number}</span>
          <h3>{step.title}</h3>
          <p className="home-step-time">{step.time}</p>
          <p>{step.body}</p>
        </li>)}
      </ol>
    </div>
  </section>;
}

export function HomeIndustries({ language }: Props) {
  const copy = labels[language];
  const root = localeRoot(language);
  return <section id="industries" className="home-overview home-overview-industries" lang={language} dir={language === "he" ? "rtl" : "ltr"}>
    <div className="container">
      <SectionIntro label={copy.industries} title={copy.industryTitle} body={copy.industryIntro} />
      <div className="home-industry-list">
        {industries.map((item, index) => <a className="home-industry" key={item.image} href={`/preview/${item.demo}/?from=${encodeURIComponent(root)}`}>
          {/* Illustrative still lifes; the visible caption names each linked concept. */}
          <img src={item.src} srcSet={`${item.small} 480w, ${item.src} 800w`} sizes="(max-width: 599px) calc(100vw - 48px), (max-width: 1099px) calc((100vw - 72px) / 2), 300px" width={800} height={600} loading="lazy" decoding="async" alt="" />
          <h3>{copy.categories[index]}</h3>
          <span className="home-overview-link">{copy.example}</span>
        </a>)}
      </div>
      <div className="home-industry-footer">
        <Link className="home-overview-link" href={`${root}templates/`}>{copy.allExamples}</Link>
        <p>{copy.other} <Link className="home-overview-link" href={`${root}contact/`}>{copy.contact}</Link></p>
      </div>
    </div>
  </section>;
}
