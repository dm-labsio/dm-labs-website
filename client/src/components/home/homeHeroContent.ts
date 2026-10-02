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
    body: "Distinctive, fast websites that earn trust and turn interest into enquiries. We handle the technical details. You focus on your business.",
    consultation: "Get a Free Consultation",
    examples: "Browse Examples",
    contactHref: "/contact/",
    examplesHref: "/templates/",
  },
  el: {
    eyebrow: "Η νέα σας ιστοσελίδα",
    opening: "Εντυπωσιάζει με το καλημέρα.",
    payoff: "Και φέρνει πελάτες.",
    body: "Ξεχωρίζει, ανοίγει αστραπιαία και κάνει τους επισκέπτες να σας εμπιστευτούν και να σας γράψουν. Τα τεχνικά τα αναλαμβάνουμε εμείς, εσείς ασχολείστε με αυτό που ξέρετε καλύτερα.",
    consultation: "Δωρεάν συμβουλευτική",
    examples: "Δείτε παραδείγματα",
    contactHref: "/el/contact/",
    examplesHref: "/el/templates/",
  },
  he: {
    eyebrow: "אתרים לעסקים שרוצים לגדול",
    opening: "בונים לכם אתר",
    payoff: "שיביא יותר לקוחות",
    body: "מרשים, מהיר ועם כל מה שצריך כדי שלקוחות יסמכו עליכם ויפנו אליכם. את הצד הטכני אנחנו לוקחים עלינו, ואתם ממשיכים לעשות את מה שאתם הכי טובים בו.",
    consultation: "לשיחת ייעוץ חינם",
    examples: "לדוגמאות",
    contactHref: "/he/contact/",
    examplesHref: "/he/templates/",
  },
};
