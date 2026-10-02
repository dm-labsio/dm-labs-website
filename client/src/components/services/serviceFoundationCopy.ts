import type { SiteLanguage } from "@/lib/routeLanguage";
export const FOUNDATION_COPY = {
  en: {
    headings: { seo: "Make it easy to find you.", security: "Care beyond launch.", turnaround: "You stay involved." }, scope: { seo: "The SEO work.", security: "Your care setup.", turnaround: "What delivery includes." },
  },
  el: {
    headings: {
      seo: "Ξεκάθαρο για τον επισκέπτη, ξεκάθαρο και για το Google.",
      security: "Δεν σας αφήνουμε στη μέση.",
      turnaround: "Είστε μέσα σε κάθε βήμα.",
    },
    scope: {
      seo: "Τι κάνουμε για το SEO.",
      security: "Το πακέτο συντήρησής σας.",
      turnaround: "Τι περιλαμβάνει η παράδοση.",
    },
  },
  he: {
    headings: {
      seo: "שיהיה קל למצוא אתכם.",
      security: "לא משאירים אתכם לבד אחרי ההשקה.",
      turnaround: "אתם חלק מהתהליך.",
    },
    scope: {
      seo: "מה עושים ב־SEO.",
      security: "תוכנית התחזוקה שלכם.",
      turnaround: "מה כלול עד ההשקה.",
    },
  },
} satisfies Record<SiteLanguage, unknown>;
