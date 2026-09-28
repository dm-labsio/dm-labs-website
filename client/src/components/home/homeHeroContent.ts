import type { SiteLanguage } from "@/lib/routeLanguage";

export const HOME_HERO_COPY: Record<SiteLanguage, {
  eyebrow: string;
  opening: string;
  payoff: string;
  body: string;
  consultation: string;
  examples: string;
  note: string;
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
    note: "No pressure. Just a conversation.",
    contactHref: "/contact/",
    examplesHref: "/templates/",
  },
  el: {
    eyebrow: "Για το επόμενο βήμα σας",
    opening: "Εντυπωσιάζει με την πρώτη ματιά.",
    payoff: "Μετατρέπει το ενδιαφέρον σε πελάτες.",
    body: "Ξεχωριστές, γρήγορες ιστοσελίδες που εμπνέουν εμπιστοσύνη και φέρνουν περισσότερες επαφές. Εμείς αναλαμβάνουμε τα τεχνικά. Εσείς εστιάζετε στην επιχείρησή σας.",
    consultation: "Δωρεάν Συμβουλευτική",
    examples: "Δείτε Παραδείγματα",
    note: "Χωρίς πίεση. Ας μιλήσουμε.",
    contactHref: "/el/contact/",
    examplesHref: "/el/templates/",
  },
  he: {
    eyebrow: "אתרים מדויקים לעסקים עם שאיפות",
    opening: "בונים לכם אתר",
    payoff: "שיביא יותר לקוחות",
    body: "אתרים מרשימים ומהירים שבונים אמון והופכים עניין לפניות. אנחנו מטפלים בפרטים הטכניים, כדי שתוכלו להתמקד בעסק שלכם.",
    consultation: "שיחת ייעוץ ללא עלות",
    examples: "דוגמאות לעבודה",
    note: "בלי לחץ. מתחילים בשיחה.",
    contactHref: "/he/contact/",
    examplesHref: "/he/templates/",
  },
};
