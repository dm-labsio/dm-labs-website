import type { SiteLanguage } from "@/lib/routeLanguage";
export const FOUNDATION_COPY = {
  en: {
    headings: { seo: "Make it easy to find you.", security: "Care beyond launch.", turnaround: "You stay involved." }, scope: { seo: "The SEO work.", security: "Your care setup.", turnaround: "What delivery includes." },
  },
  el: {
    headings: { seo: "Να σας βρίσκουν πιο εύκολα.", security: "Φροντίδα μετά τη δημοσίευση.", turnaround: "Συμμετέχετε σε κάθε στάδιο." }, scope: { seo: "Η δουλειά στο SEO.", security: "Το πλάνο φροντίδας σας.", turnaround: "Τι περιλαμβάνει η παράδοση." },
  },
  he: {
    headings: { seo: "שיהיה קל למצוא אתכם.", security: "טיפול גם אחרי ההשקה.", turnaround: "אתם חלק מהתהליך." }, scope: { seo: "העבודה על ה-SEO.", security: "תוכנית התחזוקה שלכם.", turnaround: "מה כלול במסירה." },
  },
} satisfies Record<SiteLanguage, unknown>;
