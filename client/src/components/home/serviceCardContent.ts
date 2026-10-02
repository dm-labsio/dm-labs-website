import type { HomeLocale } from "./overviewContent";

export const SERVICE_CARD_MEDIA = [
  {
    "video": "/media/brand-refresh/v1/service-design-motion-3d74146a6c.mp4",
    "poster": "/media/brand-refresh/v1/service-design-poster.webp"
  },
  {
    "video": "/media/brand-refresh/v1/service-mobile-motion-3224da750f.mp4",
    "poster": "/media/brand-refresh/v1/service-mobile-poster.webp"
  },
  {
    "video": "/media/brand-refresh/v1/service-search-motion-0761052153.mp4",
    "poster": "/media/brand-refresh/v1/service-search-poster.webp"
  },
  {
    "video": "/media/brand-refresh/v1/service-speed-motion-7074228398.mp4",
    "poster": "/media/brand-refresh/v1/service-speed-poster.webp"
  },
  {
    "video": "/media/brand-refresh/v1/service-care-motion-00d9a422a4.mp4",
    "poster": "/media/brand-refresh/v1/service-care-poster.webp"
  },
  {
    "video": "/media/brand-refresh/v1/service-delivery-motion-21b4f26570.mp4",
    "poster": "/media/brand-refresh/v1/service-delivery-poster.webp"
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
      "Μια ιστοσελίδα με τον χαρακτήρα σας.",
      "Σας διαλέγουν εύκολα από το κινητό.",
      "Για να σας βρίσκουν οι σωστοί πελάτες.",
      "Χωρίς αναμονή, χωρίς εκνευρισμό.",
      "Εσείς ήσυχοι, εμείς σε επιφυλακή.",
      "Χωρίς εκπλήξεις μέχρι την παράδοση."
    ]
  },
  "he": {
    "open": "לפרטים נוספים",
    "close": "סגירה",
    "more": "לפרטים על השירות",
    "summaries": [
      "אתר עם האופי של העסק שלכם.",
      "קל לבחור בכם גם מהטלפון.",
      "כדי שהלקוחות הנכונים ימצאו אתכם.",
      "בלי לחכות, בלי להתעצבן.",
      "אתם רגועים, אנחנו על זה.",
      "בלי הפתעות בדרך להשקה."
    ]
  }
} satisfies Record<HomeLocale, { open: string; close: string; more: string; summaries: string[] }>;
