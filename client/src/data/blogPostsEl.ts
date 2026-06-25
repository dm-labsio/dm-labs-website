/* ============================================================
   D&M LABS - Greek Blog Posts Data
   All Greek articles live here as structured data.
   ============================================================ */

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
  {
    slug: "website-cost-cyprus-2026-guide",
    elSlug: "posso-kostizei-istoselidha-kypros",
    title: "Πόσο Κοστίζει μια Ιστοσελίδα στην Κύπρο; (Ειλικρινής Οδηγός 2026)",
    date: "2026-03-21",
    readTime: "6 λεπτά",
    category: "Web Design",
    excerpt: "Αναρωτιέστε πόσο κοστίζει μια ιστοσελίδα στην Κύπρο; Οι τιμές κυμαίνονται από €99 έως €10.000+. Εδώ είναι μια ειλικρινής ανάλυση του τι παίρνετε σε κάθε επίπεδο τιμής.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
  },
  {
    slug: "web-design-nail-salon-beauty-studio-cyprus",
    elSlug: "istoselidha-nail-salon-beauty-studio-kypros",
    title: "Γιατί κάθε Nail Salon και Beauty Studio χρειάζεται Επαγγελματική Ιστοσελίδα",
    date: "2026-03-18",
    readTime: "5 λεπτά",
    category: "Beauty & Wellness",
    excerpt: "Τα social media δεν αρκούν. Δείτε πώς μια επαγγελματική ιστοσελίδα βοηθά τα nail salon και beauty studios να αποκτούν περισσότερες κρατήσεις και να χτίζουν εμπιστοσύνη.",
    coverImage: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&q=80",
  },
  {
    slug: "yoga-pilates-studio-website-cyprus",
    elSlug: "istoselidha-yoga-pilates-studio-kypros",
    title: "Η Τέλεια Ιστοσελίδα για Yoga & Pilates Studio στην Κύπρο",
    date: "2026-03-14",
    readTime: "5 λεπτά",
    category: "Health & Fitness",
    excerpt: "Μια ιστοσελίδα yoga studio πρέπει να μεταδίδει ηρεμία, εμπιστοσύνη και να κάνει εύκολη την εγγραφή σε μαθήματα. Δείτε τι κάνει μια ιστοσελίδα yoga studio να ξεχωρίζει.",
    coverImage: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&q=80",
  },
  {
    slug: "how-to-get-found-on-google-cyprus",
    elSlug: "pos-na-vretheite-google-kypros",
    title: "Πώς να Βρεθείτε στη Google ως Τοπική Επιχείρηση στην Κύπρο",
    date: "2026-03-10",
    readTime: "7 λεπτά",
    category: "SEO",
    excerpt: "Ο πρακτικός οδηγός για τοπικό SEO στην Κύπρο. Από το Google Business Profile έως τις τοπικές λέξεις-κλειδιά — όλα όσα χρειάζεστε για να εμφανίζεστε στις αναζητήσεις.",
    coverImage: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=80",
  },
  {
    slug: "restaurant-website-design-cyprus",
    elSlug: "istoselidha-estiatorio-kypros",
    title: "Γιατί το Εστιατόριό σας Χρειάζεται Ιστοσελίδα (Όχι Μόνο Facebook)",
    date: "2026-03-05",
    readTime: "5 λεπτά",
    category: "Εστίαση",
    excerpt: "Το Facebook δεν αρκεί για εστιατόρια. Δείτε πώς μια επαγγελματική ιστοσελίδα αυξάνει τις κρατήσεις, βελτιώνει την εμφάνιση στη Google και χτίζει εμπιστοσύνη.",
    coverImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
  },
  {
    slug: "wix-vs-professional-web-designer-cyprus",
    elSlug: "wix-vs-epaggelmatias-web-designer-kypros",
    title: "Wix ή Επαγγελματίας Web Designer; Η Ειλικρινής Σύγκριση για Κυπριακές Επιχειρήσεις",
    date: "2026-02-28",
    readTime: "6 λεπτά",
    category: "Web Design",
    excerpt: "Wix ή επαγγελματίας web designer; Αναλύουμε κόστος, ποιότητα, SEO και μακροπρόθεσμη αξία για να πάρετε τη σωστή απόφαση για την επιχείρησή σας στην Κύπρο.",
    coverImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80",
  },
  {
    slug: "web-design-greece-guide-2026",
    elSlug: "web-design-ellada-odigos-2026",
    title: "Σχεδιασμός Ιστοσελίδας στην Ελλάδα: Όσα Χρειάζεται να Ξέρει κάθε Επιχείρηση το 2026",
    date: "2026-06-12",
    readTime: "7 λεπτά",
    category: "Web Design",
    excerpt: "Είτε βρίσκεστε στην Αθήνα, στη Θεσσαλονίκη ή οπουδήποτε αλλού στην Ελλάδα, η ιστοσελίδα σας είναι το σημαντικότερο εργαλείο της επιχείρησής σας το 2026. Δείτε τι χρειάζεστε να ξέρετε πριν χτίσετε ή ανακατασκευάσετε την ιστοσελίδα σας.",
    coverImage: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=1200&q=80",
  },
  {
    slug: "geo-get-found-by-chatgpt-cyprus",
    elSlug: "geo-vrethite-apo-chatgpt-kypros",
    title: "GEO: Πώς να Εμφανίζεται η Κυπριακή Επιχείρησή σας στο ChatGPT και στην AI Αναζήτηση",
    date: "2026-06-25",
    readTime: "5 λεπτά",
    category: "SEO & GEO",
    excerpt: "Όταν κάποιος ρωτά το ChatGPT 'καλύτερη εταιρεία web design στην Κύπρο', η επιχείρησή σας πιθανώς δεν εμφανίζεται. Αυτό είναι πρόβλημα GEO — και έχει λύση.",
    coverImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
  },
];