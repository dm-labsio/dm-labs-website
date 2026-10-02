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
    body: "Σκεφτείτε την ιστοσελίδα σας σαν τον καλύτερο πωλητή σας: δουλεύει όλο το εικοσιτετράωρο, είναι πάντα στην τρίχα και ξέρει πώς να κάνει τον πελάτη να σας πάρει τηλέφωνο. Εσείς συνεχίζετε να κάνετε αυτό που ξέρετε καλύτερα, κι εμείς αναλαμβάνουμε όλα τα τεχνικά, από το Α ως το Ω.",
    consultation: "Δωρεάν συμβουλευτική",
    examples: "Δείτε παραδείγματα",
    contactHref: "/el/contact/",
    examplesHref: "/el/templates/",
  },
  he: {
    eyebrow: "אתרים לעסקים שרוצים לגדול",
    opening: "בונים לכם אתר",
    payoff: "שיביא יותר לקוחות",
    body: "תחשבו על האתר כמו על איש המכירות הכי טוב שלכם: עובד מסביב לשעון, תמיד מצוחצח ויודע בדיוק איך לגרום ללקוחות להרים טלפון. אתם ממשיכים לעשות את מה שאתם הכי טובים בו, ואת כל הצד הטכני אנחנו לוקחים עלינו, מא׳ ועד ת׳.",
    consultation: "לשיחת ייעוץ בחינם",
    examples: "לדוגמאות",
    contactHref: "/he/contact/",
    examplesHref: "/he/templates/",
  },
};
