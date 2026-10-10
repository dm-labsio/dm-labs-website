import type { HomeLocale } from "./overviewContent";

export const SERVICE_CARD_MEDIA = [
  {
    "video": "/media/brand-refresh/v3/service-custom-design-89438c1f3f.mp4",
    "poster": "/media/brand-refresh/v3/service-custom-design-89438c1f3f.webp"
  },
  {
    "video": "/media/brand-refresh/v3/service-mobile-first-402747f3d6.mp4",
    "poster": "/media/brand-refresh/v3/service-mobile-first-402747f3d6.webp"
  },
  {
    "video": "/media/brand-refresh/v3/service-seo-7d20af878d.mp4",
    "poster": "/media/brand-refresh/v3/service-seo-7d20af878d.webp"
  },
  {
    "video": "/media/brand-refresh/v3/service-performance-e586f08749.mp4",
    "poster": "/media/brand-refresh/v3/service-performance-e586f08749.webp"
  },
  {
    "video": "/media/brand-refresh/v3/service-security-bd95c9848b.mp4",
    "poster": "/media/brand-refresh/v3/service-security-bd95c9848b.webp"
  },
  {
    "video": "/media/brand-refresh/v3/service-turnaround-93d74e5c8d.mp4",
    "poster": "/media/brand-refresh/v3/service-turnaround-93d74e5c8d.webp"
  }
] as const;

export const SERVICE_CARD_COPY = {
  "en": {
    "open": "Open card",
    "close": "Close card",
    "more": "Explore service",
    "summaries": [
      "A website with your character.",
      "Easy to choose from a phone.",
      "A stronger path to being found.",
      "Less waiting. More browsing.",
      "Care behind every visit.",
      "A clear route to launch."
    ]
  },
  "el": {
    "open": "Δείτε περισσότερα",
    "close": "Κλείσιμο",
    "more": "Δείτε την υπηρεσία",
    "summaries": [
      "Όχι άλλη μια ιστοσελίδα της σειράς.",
      "Δείχνει άψογα σε κάθε κινητό.",
      "Για να σας βρίσκουν οι σωστοί πελάτες.",
      "Χωρίς αναμονή, χωρίς εκνευρισμό.",
      "Τα τεχνικά δεν είναι δική σας έγνοια.",
      "Χωρίς εκπλήξεις μέχρι την παράδοση."
    ]
  },
  "he": {
    "open": "לפרטים נוספים",
    "close": "סגירה",
    "more": "לפרטים על השירות",
    "summaries": [
      "אתר עם האופי של העסק שלכם.",
      "קל לבחור בכם גם מהמובייל.",
      "כדי שהלקוחות הנכונים ימצאו אתכם.",
      "בלי לחכות, בלי להתעצבן.",
      "אתם רגועים, אנחנו על זה.",
      "בלי הפתעות בדרך להשקה."
    ]
  }
} satisfies Record<HomeLocale, { open: string; close: string; more: string; summaries: string[] }>;
