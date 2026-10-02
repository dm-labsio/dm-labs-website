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
    services: "Τι κάνουμε", serviceTitle: "Κάθε λεπτομέρεια έχει τον λόγο της.",
    serviceIntro: "Ταυτότητα που ξεχωρίζει, σελίδες που πετάνε και εύκολη επικοινωνία. Όλα χτισμένα γύρω από την επιχείρησή σας.",
    more: "Δείτε την υπηρεσία", process: "Πώς δουλεύουμε", processTitle: "Από την πρώτη κουβέντα μέχρι να βγει στον αέρα.",
    processIntro: "Πέντε ξεκάθαρα βήματα και απαντήσεις χωρίς καθυστερήσεις. Ξέρετε πάντα τι ακολουθεί, και τίποτα δεν μένει στη μέση.",
    fullProcess: "Δείτε όλη τη διαδικασία", industries: "Για τον δικό σας κλάδο", industryTitle: "Διαφορετικές επιχειρήσεις. Ξεχωριστές ιστοσελίδες.",
    industryIntro: "Πάρτε μια ιδέα από ενδεικτικά σχέδια. Η δική σας ιστοσελίδα ξεκινά από το brand, τους πελάτες και τους στόχους σας.",
    categories: ["Εστιατόρια", "Ομορφιά & κομμωτήρια", "Κλινικές", "Γυμναστήρια"], example: "Δείτε το παράδειγμα",
    allExamples: "Όλα τα παραδείγματα", other: "Έχετε κάτι άλλο στο μυαλό σας;", contact: "Ρωτήστε μας ό,τι θέλετε",
  },
  he: {
    services: "מה אנחנו עושים", serviceTitle: "כל פרט נמצא שם מסיבה.",
    serviceIntro: "מותג מרשים, אתר מהיר ודרך ברורה ליצור קשר. הכול נבנה סביב העסק שלכם.",
    more: "לפרטים על השירות", process: "איך עובדים יחד", processTitle: "מהשיחה הראשונה ועד ההשקה.",
    processIntro: "חמישה שלבים ברורים ותשובות בגובה העיניים. אתם תמיד יודעים מה הלאה, ואנחנו דואגים שהכול יתקדם.",
    fullProcess: "לתהליך המלא", industries: "לעולם של העסק שלכם", industryTitle: "עסקים שונים. אתרים עם אופי.",
    industryIntro: "כמה כיווני עיצוב להשראה. האתר שלכם מתחיל במותג, בלקוחות ובמטרות שלכם.",
    categories: ["מסעדות", "יופי וטיפוח", "קליניקות", "כושר"], example: "לצפייה בדוגמה",
    allExamples: "לכל הדוגמאות", other: "יש לכם משהו אחר בראש?", contact: "שאלו אותנו כל דבר",
  },
} as const;

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
          <p>{step.body}</p>
        </li>)}
      </ol>
    </div>
  </section>;
}

export { default as HomeIndustries } from "./HomeIndustryGallery";
