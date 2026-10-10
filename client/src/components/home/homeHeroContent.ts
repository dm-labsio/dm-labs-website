import type { SiteLanguage } from "@/lib/routeLanguage";

export const HOME_HERO_COPY: Record<SiteLanguage, {
  eyebrow: string;
  opening: string;
  payoff: string;
  body: string;
  consultation: string;
  examples: string;
  contactHref: string;
  examplesHref: string;
}> = {
  en: {
    eyebrow: "Built for your next level",
    opening: "Built to impress.",
    payoff: "Designed to convert.",
    body: "Custom websites, distinctive branding and promotional videos. Built around your business, with personal support from start to finish.",
    consultation: "Get a Free Consultation",
    examples: "Website Demos",
    contactHref: "/contact/",
    examplesHref: "/templates/",
  },
  el: {
    eyebrow: "Η νέα σας ιστοσελίδα",
    opening: "Εντυπωσιάζει με το καλημέρα.",
    payoff: "Και φέρνει πελάτες.",
    body: "Ιστοσελίδες στα μέτρα σας, ξεχωριστή εταιρική ταυτότητα και διαφημιστικά βίντεο. Με προσωπική υποστήριξη από την αρχή μέχρι το τέλος.",
    consultation: "Δωρεάν συμβουλευτική",
    examples: "Demo ιστοσελίδων",
    contactHref: "/el/contact/",
    examplesHref: "/el/templates/",
  },
  he: {
    eyebrow: "אתרים לעסקים שרוצים לגדול",
    opening: "בונים לכם אתר",
    payoff: "שיביא יותר לקוחות",
    body: "אתרים בעיצוב אישי, מיתוג עם אופי וסרטוני תדמית ופרסום. הכול מותאם לעסק שלכם, עם ליווי אישי מההתחלה ועד הסוף.",
    consultation: "לשיחת ייעוץ בחינם",
    examples: "לאתרי ההדגמה",
    contactHref: "/he/contact/",
    examplesHref: "/he/templates/",
  },
};
