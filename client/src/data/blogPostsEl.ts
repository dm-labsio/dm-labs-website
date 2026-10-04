/* ============================================================
   D&M LABS - Greek Blog Posts Data
   All Greek articles live here as structured data.
   ============================================================ */

import { DR_GEORGE_CASE_STUDY_EL } from "./drGeorgeCaseStudyLocales";

export interface BlogPostEl {
  slug: string;
  elSlug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  coverImage: string;
}

export const POSTS_EL: BlogPostEl[] = [
  { ...DR_GEORGE_CASE_STUDY_EL, elSlug: DR_GEORGE_CASE_STUDY_EL.slug },
  {
    slug: "website-cost-cyprus-2026-guide",
    elSlug: "posso-kostizei-istoselidha-kypros",
    title: "Πόσο κοστίζει μια ιστοσελίδα; Ειλικρινής οδηγός για το 2026",
    date: "2026-03-21",
    readTime: "2 λεπτά",
    category: "Web design",
    excerpt: "Θα βρείτε ιστοσελίδες από €99 μέχρι €5.000 και πάνω. Δείτε τι παίρνετε σε κάθε εύρος τιμών, τι περιλαμβάνεται και τι πληρώνετε ξεχωριστά.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
  },
  {
    slug: "web-design-nail-salon-beauty-studio-cyprus",
    elSlug: "istoselidha-nail-salon-beauty-studio-kypros",
    title: "Ιστοσελίδα για nail salon και beauty studio: τι χρειάζεστε πραγματικά",
    date: "2026-03-18",
    readTime: "2 λεπτά",
    category: "Ομορφιά και ευεξία",
    excerpt: "Το Instagram δεν φτάνει. Δείτε τι πρέπει να έχει η ιστοσελίδα ενός nail salon ή beauty studio για να κλείνει περισσότερα ραντεβού.",
    coverImage: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&q=80",
  },
  {
    slug: "yoga-pilates-studio-website-cyprus",
    elSlug: "istoselidha-yoga-pilates-studio-kypros",
    title: "Γιατί το στούντιο yoga ή pilates σας χρειάζεται ιστοσελίδα (όχι μόνο Instagram)",
    date: "2026-03-14",
    readTime: "2 λεπτά",
    category: "Υγεία και γυμναστική",
    excerpt: "Το Instagram φέρνει likes, όχι πάντα μαθητές. Δείτε τι πρέπει να έχει η ιστοσελίδα ενός στούντιο yoga ή pilates για να γράφονται εύκολα νέοι μαθητές.",
    coverImage: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&q=80",
  },
  {
    slug: "how-to-get-found-on-google-cyprus",
    elSlug: "pos-na-vretheite-google-kypros",
    title: "Πώς να εμφανίζεται η επιχείρησή σας στο Google: ένας απλός οδηγός",
    date: "2026-03-10",
    readTime: "2 λεπτά",
    category: "SEO",
    excerpt: "Τρία βήματα για να σας βρίσκουν στο Google: σωστό Google Business Profile, ιστοσελίδα στημένη για SEO και περιεχόμενο που απαντά σε όσα ρωτά ο κόσμος.",
    coverImage: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=80",
  },
  {
    slug: "restaurant-website-design-cyprus",
    elSlug: "istoselidha-estiatorio-kypros",
    title: "Γιατί κάθε εστιατόριο χρειάζεται ιστοσελίδα (όχι μόνο Facebook)",
    date: "2026-03-05",
    readTime: "2 λεπτά",
    category: "Εστίαση",
    excerpt: "Το Facebook δεν φτάνει για ένα εστιατόριο. Δείτε τι χάνετε χωρίς ιστοσελίδα και τι πρέπει να έχει για να σας βρίσκουν στο Google και να κλείνουν τραπέζι.",
    coverImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
  },
  {
    slug: "wix-vs-professional-web-designer-cyprus",
    elSlug: "wix-vs-epaggelmatias-web-designer-kypros",
    title: "Wix ή επαγγελματίας web designer; Τι συμφέρει την επιχείρησή σας",
    date: "2026-02-28",
    readTime: "4 λεπτά",
    category: "Web design",
    excerpt: "Wix ή επαγγελματίας web designer; Συγκρίνουμε κόστος, χρόνο, SEO και το ποιος έχει τον έλεγχο, για να διαλέξετε σωστά για την επιχείρησή σας.",
    coverImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80",
  },
  {
    slug: "web-design-greece-guide-2026",
    elSlug: "web-design-ellada-odigos-2026",
    title: "Κατασκευή ιστοσελίδας: όσα πρέπει να ξέρει κάθε επιχείρηση το 2026",
    date: "2026-06-12",
    readTime: "5 λεπτά",
    category: "Web design",
    excerpt: "Κόστος, SEO, δίγλωσσες ιστοσελίδες και τι να ζητήσετε από έναν web designer: όσα πρέπει να ξέρετε πριν φτιάξετε ή ανανεώσετε την ιστοσελίδα σας.",
    coverImage: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=1200&q=80",
  },
  {
    slug: "geo-get-found-by-chatgpt-cyprus",
    elSlug: "geo-vrethite-apo-chatgpt-kypros",
    title: "GEO: πώς να εμφανίζεται η επιχείρησή σας στο ChatGPT και στην αναζήτηση με AI",
    date: "2026-06-25",
    readTime: "5 λεπτά",
    category: "SEO και GEO",
    excerpt: "Όταν κάποιος ρωτά το ChatGPT ποιος κάνει αυτό που κάνετε, εμφανίζεται η επιχείρησή σας; Τι είναι το GEO, τι βοηθά και τι δεν μπορεί να εγγυηθεί κανείς.",
    coverImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
  },
];
