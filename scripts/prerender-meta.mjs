/**
 * DM-Labs.io - Post-Build Meta Injection Script
 * ============================================
 * Runs AFTER `vite build` to inject per-route <title>, <meta description>,
 * <link rel="canonical">, hreflang alternates, og:title, og:description,
 * og:url, and twitter:* tags into separate index.html files for each route.
 *
 * Bilingual: English routes at / and Greek routes at /el/
 * Each route gets hreflang="en", hreflang="el", and hreflang="x-default"
 *
 * Usage: node scripts/prerender-meta.mjs
 * Called automatically via: pnpm run build (see package.json)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, "../dist/public");
const BASE_URL = "https://dm-labs.io";
const DEFAULT_OG_IMAGE = `${BASE_URL}/social/dm-labs-growth-social-card.png`;
const DEFAULT_OG_IMAGE_ALT = "We build your website. Built for growth. DM Labs";

// ─── English Blog Posts ───────────────────────────────────────────────────────

const BLOG_POSTS = [
  {
    slug: "website-cost-cyprus-2026-guide",
    title: "Website Cost Cyprus 2026 | Honest Pricing Guide",
    description: "Wondering about website cost in Cyprus? We break down every price range honestly - from DIY builders to agencies - so you know exactly what to expect.",
    elSlug: "posso-kostizei-istoselidha-kypros",
  },
  {
    slug: "web-design-nail-salon-beauty-studio-cyprus",
    title: "Web Design Nail Salon Cyprus | Beauty Studio Websites",
    description: "Nail salon or beauty studio in Cyprus? Here is exactly what your website needs to attract clients and show up on Google. Make your business the next choice.",
    elSlug: "istoselidha-nail-salon-beauty-studio-kypros",
  },
  {
    slug: "yoga-pilates-studio-website-cyprus",
    title: "Website for Yoga Studio Cyprus | Pilates Web Design",
    description: "Running a yoga or Pilates studio in Cyprus? Here is why Instagram alone is not enough and what your website needs to fill classes consistently.",
    elSlug: "istoselidha-yoga-pilates-studio-kypros",
  },
  {
    slug: "how-to-get-found-on-google-cyprus",
    title: "How to Get Found on Google Cyprus | Local SEO Guide",
    description: "A plain-English guide to local SEO in Cyprus. Learn how to get your small business on Google Maps and in search results - step by step.",
    elSlug: "pos-na-vretheite-google-kypros",
  },
  {
    slug: "restaurant-website-design-cyprus",
    title: "Why Cyprus Restaurants Need More Than Facebook | DM-Labs.io",
    description: "Running a restaurant in Cyprus? Here is why a Facebook page is not enough and what your website needs to attract diners, drive reservations, and beat the competition.",
    elSlug: "istoselidha-estiatorio-kypros",
  },
  {
    slug: "wix-vs-professional-web-designer-cyprus",
    title: "Wix vs Professional Web Designer Cyprus | Honest Comparison",
    description: "Wix or a professional web designer? We give you an honest, no-jargon answer for small business owners in Cyprus - and explain why the right choice depends on where you are in your business journey.",
    elSlug: "wix-vs-epaggelmatias-web-designer-kypros",
  },
  {
    slug: "web-design-greece-guide-2026",
    title: "Web Design Greece Guide 2026 | DM-Labs.io",
    description: "Everything Greek businesses need to know about professional web design in 2026. Costs, timelines, what to look for, and how to get found on Google.",
    elSlug: "web-design-ellada-odigos-2026",
  },
  {
    slug: "geo-get-found-by-chatgpt-cyprus",
    title: "GEO: How to Get Found by ChatGPT and AI Search | DM-Labs.io",
    description: "SEO is no longer enough. Learn what Generative Engine Optimization (GEO) is and why Cyprus businesses need it to get found by ChatGPT, Perplexity, and Google AI.",
    elSlug: "geo-vrethite-apo-chatgpt-kypros",
  },
];

// ─── English Static Routes ────────────────────────────────────────────────────

const EN_STATIC_ROUTES = [
  {
    path: "/",
    title: "Best Web Design Agency for Growing Businesses | DM Labs",
    description: "Stand out. Build trust. Win more enquiries. DM Labs creates custom websites with fast delivery and personal care for businesses in Cyprus, Greece, Israel and beyond.",
    elPath: "/el",
  },
  {
    path: "/services",
    title: "Web Design Services for Business Growth | DM Labs",
    description: "Custom design, fast development, SEO foundations and ongoing care. Websites built to earn trust and help your business win more enquiries.",
    elPath: "/el/services",
  },
  {
    path: "/process",
    title: "Our Process | How We Build Websites | DM-Labs.io",
    description: "See how DM-Labs.io moves from discovery and scope through design, build, review, and launch for your website project.",
    elPath: "/el/process",
  },
  {
    path: "/pricing",
    title: "Website Pricing Cyprus | DM-Labs.io",
    description: "Compare website builds and hosting and care plans. Clear scope, transparent billing and custom options for growing businesses.",
    elPath: "/el/pricing",
  },
  {
    path: "/faq",
    title: "Website Design FAQ | DM-Labs.io",
    description: "Answers to common questions about DM-Labs.io website packages, pricing, SEO foundations, website care, and project scope.",
    elPath: "/el/faq",
  },
  {
    path: "/contact",
    title: "Contact DM-Labs.io | Get a Free Website Quote",
    description: "Contact DM-Labs.io for a free website consultation. Tell us about your business, content, and website goals by WhatsApp, email, or contact form.",
    elPath: "/el/contact",
  },
  {
    path: "/examples",
    title: "Website Examples | See Our Work | DM-Labs.io",
    description: "Explore concept website designs by DM-Labs.io for restaurants, salons, dental clinics, yoga studios, and more. Explore the design possibilities for your brand.",
    elPath: "/el/examples",
  },
  {
    path: "/blog",
    title: "Blog | Web Design Tips & Guides | DM-Labs.io",
    description: "Practical guides, honest advice, and web design insights for businesses in Cyprus and beyond.",
    elPath: "/el/blog",
  },
  {
    path: "/web-design-limassol",
    title: "Web Design Limassol | Websites Built for Growth | DM-Labs.io",
    description: "DM-Labs.io builds professional, mobile-first websites for Limassol businesses. Distinctive design, clear routes to enquiry, and direct support from design to launch.",
    elPath: "/el/web-design-limassol",
  },
  {
    path: "/web-design-thessaloniki",
    title: "Web Design Thessaloniki | Websites Built for Growth | DM-Labs.io",
    description: "DM-Labs.io builds professional, mobile-first websites for Thessaloniki businesses. Distinctive design, clear routes to enquiry, and direct support from design to launch.",
    elPath: "/el/web-design-thessaloniki",
  },
  {
    path: "/web-design-nicosia",
    title: "Web Design Nicosia | Websites Built for Growth | DM-Labs.io",
    description: "DM-Labs.io builds professional, mobile-first websites for Nicosia businesses. Distinctive design, clear routes to enquiry, and direct support from design to launch.",
    elPath: "/el/web-design-nicosia",
  },
  {
    path: "/web-design-cyprus",
    title: "Web Design Cyprus | Websites Built for Growth | DM-Labs.io",
    description: "Professional web design for businesses across Cyprus. Distinctive design, fast delivery and personal care, built around your business goals.",
    elPath: "/el/web-design-cyprus",
  },
  {
    path: "/web-design-crete",
    title: "Web Design Crete | Websites Built for Growth | DM-Labs.io",
    description: "Professional web design for small businesses across Crete. Distinctive design, clear routes to enquiry, and direct support from design to launch.",
    elPath: "/el/web-design-crete",
  },
  {
    path: "/web-design-paphos",
    title: "Web Design Paphos | Websites Built for Growth | DM-Labs.io",
    description: "Professional website design in Paphos, Cyprus. Distinctive design, fast delivery and personal care, built around your business goals.",
  },
  {
    path: "/web-design-restaurants-cyprus",
    title: "Restaurant Website Design Cyprus | DM-Labs.io",
    description: "Professional website design for restaurants in Cyprus. Online menus, reservations, Google visibility. Explore the design possibilities for your brand.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy | DM-Labs.io",
    description: "Privacy policy for DM-Labs.io web design services.",
    elPath: "/el/privacy",
  },
  {
    path: "/cookies",
    title: "Cookie Policy | DM-Labs.io",
    description: "Cookie policy for DM-Labs.io web design services.",
    elPath: "/el/cookies",
  },
  {
    path: "/terms",
    title: "Terms of Service | DM-Labs.io",
    description: "Terms of service for DM-Labs.io web design services.",
    elPath: "/el/terms",
  },
  // English blog posts (bilingual — have a Greek counterpart)
  ...BLOG_POSTS.map((post) => ({
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.description,
    elPath: `/el/blog/${post.elSlug}`,
  })),
  // English-only blog posts (no Greek counterpart — self-referencing hreflang)
  {
    path: "/blog/google-search-console-ai-seo-prompts",
    title: "7 AI Prompts for Google Search Console SEO",
    description: "Turn Google Search Console data into SEO actions with seven copy-ready AI prompts for quick wins, content gaps, CTR, decay and planning.",
    // No elPath — this post is English-only; hreflang will self-reference
  },
  {
    path: "/blog/website-leads-real-estate-construction-hospitality",
    title: "How to Get More Website Leads | Property, Construction & Hotels",
    description: "A practical guide for real estate, construction, hotel, and villa businesses on turning website visitors into viewing requests, project enquiries, and direct bookings.",
    // No elPath — this post is intentionally English-only; hreflang will self-reference
  },
  {
    path: "/blog/google-ai-mode-near-me-cyprus",
    title: "Google AI Answers \"Near Me\" Searches in Cyprus (2026)",
    description: "Google AI Mode now answers \"near me\" questions in Greek and English. Here's what decides which Cyprus business it recommends — and how to become it.",
    // No elPath — this post is intentionally English-only; hreflang will self-reference
  },
];

// ─── Greek Static Routes ──────────────────────────────────────────────────────

const EL_STATIC_ROUTES = [
  {
    path: "/el",
    title: "Η καλύτερη εταιρεία web design για επιχειρήσεις που αναπτύσσονται | DM Labs",
    description: "Ξεχωρίστε. Κερδίστε εμπιστοσύνη. Προσελκύστε περισσότερες επαφές. Custom ιστοσελίδες, γρήγορη παράδοση και προσωπική φροντίδα σε Κύπρο, Ελλάδα, Ισραήλ και πέρα.",
    enPath: "/",
  },
  {
    path: "/el/services",
    title: "Υπηρεσίες Web Design | DM-Labs.io",
    description: "Επαγγελματικές υπηρεσίες κατασκευής ιστοσελίδων. Custom ιστοσελίδες, mobile-first ανάπτυξη, SEO βελτιστοποίηση. Γρήγορη παράδοση και προσωπική φροντίδα.",
    enPath: "/services",
  },
  {
    path: "/el/process",
    title: "Η Διαδικασία μας | Πώς Κατασκευάζουμε Ιστοσελίδες | DM-Labs.io",
    description: "Δείτε πώς η DM-Labs.io μετατρέπει την πρώτη συζήτηση και το συμφωνημένο scope σε design, build, review και launch.",
    enPath: "/process",
  },
  {
    path: "/el/pricing",
    title: "Τιμές Κατασκευής Ιστοσελίδας | DM-Labs.io",
    description: "Συγκρίνετε πακέτα ιστοσελίδας, φιλοξενίας και συντήρησης. Ξεκάθαρο εύρος έργου, διαφανής χρέωση και custom επιλογές από τη DM-Labs.io.",
    enPath: "/pricing",
  },
  {
    path: "/el/faq",
    title: "Συχνές Ερωτήσεις Ιστοσελίδων | DM-Labs.io",
    description: "Απαντήσεις για πακέτα κατασκευής ιστοσελίδας, pricing, SEO βάσεις, website care και project scope από τη DM-Labs.io.",
    enPath: "/faq",
  },
  {
    path: "/el/contact",
    title: "Επικοινωνία | Δωρεάν Πρόταση | DM-Labs.io",
    description: "Επικοινωνήστε με τη DM-Labs.io για δωρεάν συμβουλευτική μέσω WhatsApp, email ή φόρμας επικοινωνίας.",
    enPath: "/contact",
  },
  {
    path: "/el/blog",
    title: "Blog | Συμβουλές Κατασκευής Ιστοσελίδας | DM-Labs.io",
    description: "Άρθρα και συμβουλές για κατασκευή ιστοσελίδας, SEO και online παρουσία για επιχειρήσεις στην Κύπρο και την Ελλάδα.",
    enPath: "/blog",
  },
  {
    path: "/el/web-design-limassol",
    title: "Κατασκευή Ιστοσελίδας Λεμεσός | Ιστοσελίδες για Ανάπτυξη | DM-Labs.io",
    description: "Επαγγελματική κατασκευή ιστοσελίδας για επιχειρήσεις στη Λεμεσό. Custom σχεδιασμός, SEO και mobile-first ανάπτυξη. Σχεδιασμός που εμπνέει εμπιστοσύνη, γρήγορη παράδοση και προσωπική φροντίδα.",
    enPath: "/web-design-limassol",
  },
  {
    path: "/el/web-design-thessaloniki",
    title: "Κατασκευή Ιστοσελίδας Θεσσαλονίκη | Ιστοσελίδες για Ανάπτυξη | DM-Labs.io",
    description: "Επαγγελματική κατασκευή ιστοσελίδας για επιχειρήσεις στη Θεσσαλονίκη. Custom σχεδιασμός, SEO, mobile-first. Γρήγορη παράδοση και προσωπική φροντίδα.",
    enPath: "/web-design-thessaloniki",
  },
  {
    path: "/el/web-design-nicosia",
    title: "Κατασκευή Ιστοσελίδας Λευκωσία | Ιστοσελίδες για Ανάπτυξη | DM-Labs.io",
    description: "Επαγγελματική κατασκευή ιστοσελίδας για επιχειρήσεις στη Λευκωσία. Custom σχεδιασμός, SEO, mobile-first. Γρήγορη παράδοση και προσωπική φροντίδα.",
    enPath: "/web-design-nicosia",
  },
  {
    path: "/el/web-design-cyprus",
    title: "Κατασκευή Ιστοσελίδας Κύπρος | Ιστοσελίδες για Ανάπτυξη | DM-Labs.io",
    description: "Επαγγελματική κατασκευή ιστοσελίδας για επιχειρήσεις σε όλη την Κύπρο. Σχεδιασμός που εμπνέει εμπιστοσύνη, γρήγορη παράδοση και προσωπική φροντίδα.",
    enPath: "/web-design-cyprus",
  },
  {
    path: "/el/web-design-crete",
    title: "Κατασκευή Ιστοσελίδας Κρήτη | Ιστοσελίδες για Ανάπτυξη | DM-Labs.io",
    description: "Επαγγελματική κατασκευή ιστοσελίδας για επιχειρήσεις στην Κρήτη - Ηράκλειο, Χανιά, Ρέθυμνο. Custom ιστοσελίδες με έμφαση στην εμπιστοσύνη και την επικοινωνία.",
    enPath: "/web-design-crete",
  },
  {
    path: "/el/privacy",
    title: "Πολιτική Απορρήτου | DM-Labs.io",
    description: "Πολιτική απορρήτου της DM-Labs.io.",
    enPath: "/privacy",
  },
  {
    // /el/cookies is the canonical slug; /el/cookie-policy 301s to /el/cookies at server level
    path: "/el/cookies",
    title: "Πολιτική Cookies | DM-Labs.io",
    description: "Πολιτική cookies της ιστοσελίδας DM-Labs.io.",
    enPath: "/cookies",
  },
  {
    path: "/el/terms",
    title: "Όροι Χρήσης | DM-Labs.io",
    description: "Όροι χρήσης της ιστοσελίδας DM-Labs.io.",
    enPath: "/terms",
  },
  // Greek blog posts
  {
    path: "/el/blog/wix-vs-epaggelmatias-web-designer-kypros",
    title: "Wix ή Επαγγελματίας Web Designer; Τι Συμφέρει στην Κύπρο | DM-Labs.io",
    description: "Μια ειλικρινής σύγκριση Wix, WordPress και επαγγελματικής κατασκευής ιστοσελίδας για επιχειρήσεις στην Κύπρο.",
    enPath: "/blog/wix-vs-professional-web-designer-cyprus",
  },
  {
    path: "/el/blog/posso-kostizei-istoselidha-kypros",
    title: "Πόσο Κοστίζει μια Ιστοσελίδα στην Κύπρο; (Ειλικρινής Οδηγός 2026) | DM-Labs.io",
    description: "Η αλήθεια για τις τιμές κατασκευής ιστοσελίδας στην Κύπρο το 2026. Τι περιλαμβάνεται και πώς να επιλέξετε σωστά.",
    enPath: "/blog/website-cost-cyprus-2026-guide",
  },
  {
    path: "/el/blog/istoselidha-nail-salon-beauty-studio-kypros",
    title: "Ιστοσελίδα για Nail Salon και Beauty Studio στην Κύπρο | DM-Labs.io",
    description: "Τι χρειάζεται η ιστοσελίδα ενός nail salon ή beauty studio στην Κύπρο για να φέρνει νέους πελάτες.",
    enPath: "/blog/web-design-nail-salon-beauty-studio-cyprus",
  },
  {
    path: "/el/blog/istoselidha-yoga-pilates-studio-kypros",
    title: "Ιστοσελίδα για Yoga και Pilates Studio στην Κύπρο | DM-Labs.io",
    description: "Γιατί το yoga ή pilates studio σας στην Κύπρο χρειάζεται ιστοσελίδα και όχι μόνο Instagram.",
    enPath: "/blog/yoga-pilates-studio-website-cyprus",
  },
  {
    path: "/el/blog/pos-na-vretheite-google-kypros",
    title: "Πώς να Βρεθεί η Επιχείρησή σας στη Google στην Κύπρο | DM-Labs.io",
    description: "Απλός οδηγός για να εμφανίζεται η επιχείρησή σας στη Google στην Κύπρο. Χωρίς τεχνικές ορολογίες.",
    enPath: "/blog/how-to-get-found-on-google-cyprus",
  },
  {
    path: "/el/blog/istoselidha-estiatorio-kypros",
    title: "Γιατί Κάθε Εστιατόριο στην Κύπρο Χρειάζεται Ιστοσελίδα | DM-Labs.io",
    description: "Το Facebook δεν αρκεί για εστιατόριο στην Κύπρο. Δείτε τι χάνετε χωρίς επαγγελματική ιστοσελίδα.",
    enPath: "/blog/restaurant-website-design-cyprus",
  },
  {
    path: "/el/blog/web-design-ellada-odigos-2026",
    title: "Οδηγός Web Design Ελλάδα 2026 | DM-Labs.io",
    description: "Όλα όσα πρέπει να γνωρίζουν οι ελληνικές επιχειρήσεις για επαγγελματική κατασκευή ιστοσελίδας το 2026.",
    enPath: "/blog/web-design-greece-guide-2026",
  },
  {
    path: "/el/blog/geo-vrethite-apo-chatgpt-kypros",
    title: "GEO: Πώς να Βρεθείτε από το ChatGPT | DM-Labs.io",
    description: "Το SEO δεν αρκεί πλέον. Μάθετε τι είναι το GEO και γιατί οι επιχειρήσεις στην Κύπρο χρειάζονται να εμφανίζονται στο ChatGPT και στο Google AI.",
    enPath: "/blog/geo-get-found-by-chatgpt-cyprus",
  },
  {
    path: "/el/examples",
    title: "Παραδείγματα Ιστοσελίδων | DM-Labs.io",
    description: "Δείτε το portfolio μας με custom ιστοσελίδες για επιχειρήσεις στην Κύπρο και την Ελλάδα. Κάθε site χτίζεται από μηδέν.",
    enPath: "/examples",
  },
];

// ─── Crawlable route content ───────────────────────────────────────────────────
// The React app replaces this content after JavaScript loads. It is deliberately
// relevant, visible fallback content so visitors and crawlers receive a real,
// route-specific page before the client application starts.
const ROUTE_FALLBACKS = {
  "/": {
    h1: "Professional Web Design in Paphos & Cyprus",
    paragraphs: [
      "DM-Labs.io designs and builds custom, mobile-first websites for businesses in Paphos and across Cyprus.",
      "Choose a website package around your goals or discuss a custom scope for integrations, multilingual content, booking, CRM, and other complex requirements.",
    ],
  },
  "/services": {
    h1: "Web Design Services for Businesses in Paphos & Cyprus",
    paragraphs: [
      "DM-Labs.io provides website design, web development, search-friendly foundations, and optional ongoing website care.",
      "Every project is scoped around your business, content, and the actions you want visitors to take.",
    ],
  },
  "/pricing": {
    h1: "Website Pricing for Cyprus Businesses",
    paragraphs: [
      "Launch Website packages start at €299, Growth Website packages start at €749, and Pro Website packages start at €1,499.",
      "Enterprise / Custom pricing is tailored to scope. Basic Care is €69 per month with up to 3 small content updates, while Complete Care is €129 per month with unlimited reasonable updates.",
    ],
  },
  "/faq": {
    h1: "DM-Labs.io Website Design FAQ",
    paragraphs: [
      "Find clear answers about website packages, project scope, search-friendly foundations, and ongoing website care.",
      "For a project-specific recommendation, contact DM-Labs.io for a free consultation.",
    ],
  },
  "/web-design-paphos": {
    h1: "Web Design in Paphos",
    paragraphs: [
      "DM-Labs.io is based in Paphos and builds professional, mobile-first websites for local businesses and organisations across Cyprus.",
      "Choose Launch, Growth, Pro, or Enterprise / Custom to match your business goals and requirements.",
    ],
  },
  "/web-design-cyprus": {
    h1: "Professional Web Design in Cyprus",
    paragraphs: [
      "DM-Labs.io designs and builds responsive, search-friendly websites for businesses across Cyprus.",
      "Choose a website package around your goals or discuss a custom scope for advanced features and integrations.",
    ],
  },
  "/web-design-limassol": {
    h1: "Web Design for Limassol Businesses",
    paragraphs: [
      "DM-Labs.io builds professional, responsive websites for businesses in Limassol and across Cyprus.",
      "Website packages are built around your goals, with custom scope available for more complex projects.",
    ],
  },
  "/web-design-restaurants-cyprus": {
    h1: "Restaurant Website Design in Cyprus",
    paragraphs: [
      "DM-Labs.io builds practical restaurant websites with clear menus, contact information, booking paths, and mobile-friendly implementation.",
      "Choose a website package around your goals or discuss a custom scope for booking and integration requirements.",
    ],
  },
  // NOTE: The three blog-post entries below are STOPGAP only.
  // prerender-full.mjs now captures the full rendered DOM for every route,
  // making these fallback snippets redundant. They are kept here temporarily
  // so a fallback still exists if prerender-full.mjs fails during a build.
  // Once prerender-full.mjs is confirmed stable in production, delete these
  // three entries and the entire ROUTE_FALLBACKS mechanism.
  "/blog/restaurant-website-design-cyprus": {
    h1: "Why Cyprus Restaurants Need More Than Facebook",
    paragraphs: [
      "Over 3,200 restaurants operate in Cyprus. Most rely on Facebook and word of mouth. A Facebook page cannot be found on Google, cannot take a reservation at 11pm, and cannot show up when someone searches \"seafood Limassol\" or \"breakfast café Paphos.\"",
      "When someone searches \"restaurant Nicosia\" or \"breakfast café Paphos,\" Google shows two types of results: the local pack and organic results. Both are driven by your website and your Google Business Profile working together. If your business is based in <a href=\"/web-design-paphos\">Paphos</a>, the local competition is still relatively thin — a well-structured website can rank faster and more affordably than in larger cities.",
      "Your website should make people want a table at your restaurant. Our <a href=\"/web-design-restaurants-cyprus\">restaurant websites</a> put your food, atmosphere, and next step in focus. We agree the scope, features, and delivery schedule before starting.",
    ],
  },
  "/blog/wix-vs-professional-web-designer-cyprus": {
    h1: "Wix vs Professional Web Designer Cyprus",
    paragraphs: [
      "Wix is a capable tool that works well for specific situations. For a small business in <a href=\"/web-design-cyprus\">Cyprus</a> that wants to be found on Google, look professional, and not spend hours managing a platform, a professional web designer is the better investment.",
      "The real question is not whether Wix can build a website — it can. The question is whether the result will rank on Google, load fast enough to keep visitors, and represent your business at the level your customers expect. For most Cyprus businesses, the answer points clearly toward professional design.",
      "Our <a href=\"/pricing\">website packages</a> combine custom design, mobile-first development, SEO foundations, and fast delivery. See the full build and ongoing care options to plan your investment.",
    ],
  },
  "/blog/web-design-greece-guide-2026": {
    h1: "Web Design Greece Guide 2026",
    paragraphs: [
      "Greek businesses face a specific challenge online: most competitors still rely on outdated websites or social media alone. A well-built, search-optimised website is one of the most reliable ways to stand out in any Greek city or island market in 2026.",
      "We have worked with businesses in <a href=\"/web-design-thessaloniki\">Thessaloniki</a>, Athens, and across the Greek islands including <a href=\"/web-design-crete\">Crete</a>, as well as in <a href=\"/web-design-limassol\">Limassol</a> and <a href=\"/web-design-nicosia\">Nicosia</a> in Cyprus. If you are looking for a web design partner who understands the Greek market and delivers on time, we would love to hear from you.",
      "Our <a href=\"/pricing\">web design packages</a> match your website scope to your business goals. Every package includes a free consultation, mobile-first development, on-page SEO setup, and SSL certificate.",
    ],
  },
};

function buildFallbackBody(route) {
  const fallback = ROUTE_FALLBACKS[route.path] ?? {
    h1: route.title.replace(/\s*\|\s*DM-Labs\.io.*$/i, "").trim(),
    paragraphs: [route.description],
  };
  // paragraphs may contain trusted internal HTML (e.g. <a href="..."> links);
  // only the h1 and plain-text fallback paragraphs need escaping.
  const paragraphs = fallback.paragraphs
    .map((paragraph) => `<p style="margin:0 0 1rem;color:#475569;line-height:1.65">${paragraph}</p>`)
    .join("\n");

  return `\n      <main data-seo-fallback="true" style="max-width:1120px;margin:0 auto;padding:5rem 1.5rem;font-family:Inter,Arial,sans-serif">\n        <p style="margin:0 0 .75rem;color:#5b8cff;font-size:.8rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase">DM-Labs.io</p>\n        <h1 style="margin:0 0 1.25rem;color:#0f172a;font-size:clamp(2rem,5vw,3.5rem);line-height:1.12">${escapeHtml(fallback.h1)}</h1>\n        ${paragraphs}\n        <p style="margin:1.5rem 0 0"><a href="/contact/" style="color:#355ec9;font-weight:600">Get a free consultation</a> · <a href="/pricing/" style="color:#355ec9;font-weight:600">View website packages</a></p>\n      </main>`;
}

// ─── HTML injection helper ────────────────────────────────────────────────────

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function injectMetaTags(html, route) {
  const { path: routePath, title, description } = route;
  // Platform adds trailing slash to all paths except root — match it in canonicals
  const trailingSlash = routePath === "/" ? "" : "/";
  const canonicalUrl = `${BASE_URL}${routePath}${trailingSlash}`;
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const safeCanonical = escapeHtml(canonicalUrl);
  const safeOgImage = escapeHtml(DEFAULT_OG_IMAGE);

  // Determine hreflang alternates (add trailing slash to match platform behavior)
  const addSlash = (p) => p === "/" ? p : (p.endsWith("/") ? p : p + "/");
  const isGreek = routePath.startsWith("/el");
  let enUrl, elUrl;

  if (isGreek) {
    elUrl = `${BASE_URL}${addSlash(routePath)}`;
    enUrl = route.enPath ? `${BASE_URL}${addSlash(route.enPath)}` : null;
  } else {
    enUrl = `${BASE_URL}${addSlash(routePath)}`;
    elUrl = route.elPath ? `${BASE_URL}${addSlash(route.elPath)}` : null;
  }

  // Build hreflang tags
  let hreflangTags = "";
  if (enUrl) {
    hreflangTags += `\n  <link rel="alternate" hreflang="en" href="${escapeHtml(enUrl)}" />`;
    hreflangTags += `\n  <link rel="alternate" hreflang="x-default" href="${escapeHtml(enUrl)}" />`;
  }
  if (elUrl) {
    hreflangTags += `\n  <link rel="alternate" hreflang="el" href="${escapeHtml(elUrl)}" />`;
  }

  // Set html lang attribute
  const htmlLang = isGreek ? "el" : "en";

  // Build the complete meta block to inject
  const metaBlock = `
  <title>${safeTitle}</title>
  <meta name="description" content="${safeDesc}" />
  <link rel="canonical" href="${safeCanonical}" />${hreflangTags}
  <meta property="og:title" content="${safeTitle}" />
  <meta property="og:description" content="${safeDesc}" />
  <meta property="og:url" content="${safeCanonical}" />
  <meta property="og:image" content="${safeOgImage}" />
  <meta property="og:image:secure_url" content="${safeOgImage}" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="675" />
  <meta property="og:image:alt" content="${DEFAULT_OG_IMAGE_ALT}" />
  <meta property="og:type" content="${routePath.includes("/blog/") ? "article" : "website"}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${safeTitle}" />
  <meta name="twitter:description" content="${safeDesc}" />
  <meta name="twitter:image" content="${safeOgImage}" />
  <meta name="twitter:image:alt" content="${DEFAULT_OG_IMAGE_ALT}" />`;

  let result = html;

  // Replace existing lang attribute on <html> tag
  result = result.replace(/(<html[^>]*)\slang="[^"]*"/, `$1 lang="${htmlLang}"`);
  // If no lang attribute exists, add it
  if (!result.match(/lang="/)) {
    result = result.replace(/<html([^>]*)>/, `<html$1 lang="${htmlLang}">`);
  }

  // Remove existing <title>...</title>
  result = result.replace(/<title>[^<]*<\/title>/gi, "");

  // Remove existing meta name="description"
  result = result.replace(/<meta\s+name="description"[^>]*>/gi, "");

  // Remove existing canonical link
  result = result.replace(/<link\s+rel="canonical"[^>]*>/gi, "");

  // Remove existing hreflang links
  result = result.replace(/<link\s+rel="alternate"[^>]*hreflang[^>]*>/gi, "");

  // Remove existing og:* meta tags
  result = result.replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, "");

  // Remove existing twitter:* meta tags
  result = result.replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, "");

  // Inject the new meta block right after <head>
  result = result.replace(/<head>/, `<head>${metaBlock}`);

  // Preserve meaningful route content in the initial HTML. React replaces this
  // fallback on load, so the page remains a single consistent experience.
  const fallbackBody = buildFallbackBody(route);
  result = result.replace(/<div id="root"><\/div>/, `<div id="root">${fallbackBody}\n    </div>`);

  return result;
}

// ─── Main execution ───────────────────────────────────────────────────────────

function main() {
  const baseHtmlPath = path.join(DIST_DIR, "index.html");

  if (!fs.existsSync(baseHtmlPath)) {
    console.error(`ERROR: Build output not found at ${baseHtmlPath}`);
    console.error("   Run 'pnpm run build' first, then this script.");
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, "utf-8");
  let successCount = 0;
  let errorCount = 0;

  const ALL_ROUTES = [...EN_STATIC_ROUTES, ...EL_STATIC_ROUTES];

  for (const route of ALL_ROUTES) {
    try {
      // Determine the output directory for this route
      const routeDir =
        route.path === "/"
          ? DIST_DIR
          : path.join(DIST_DIR, ...route.path.split("/").filter(Boolean));

      // Create directory if it doesn't exist
      fs.mkdirSync(routeDir, { recursive: true });

      // Inject meta tags into a copy of the base HTML
      const injectedHtml = injectMetaTags(baseHtml, route);

      // Write the route-specific index.html
      const outputPath = path.join(routeDir, "index.html");
      fs.writeFileSync(outputPath, injectedHtml, "utf-8");

      console.log(`OK ${route.path}`);
      successCount++;
    } catch (err) {
      console.error(`ERROR: Failed for ${route.path}: ${err.message}`);
      errorCount++;
    }
  }

  console.log(`\nPre-render complete: ${successCount} routes OK, ${errorCount} errors`);

  if (errorCount > 0) {
    process.exit(1);
  }
}

main();
