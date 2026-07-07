/**
 * D&M Labs - Post-Build Meta Injection Script
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
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

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
    description: "Nail salon or beauty studio in Cyprus? Here is exactly what your website needs to attract clients and show up on Google - from €299.",
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
    title: "Restaurant Website Design Cyprus | Why You Need More Than Facebook",
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
    title: "Web Design Greece Guide 2026 | D&M Labs",
    description: "Everything Greek businesses need to know about professional web design in 2026. Costs, timelines, what to look for, and how to get found on Google.",
    elSlug: "web-design-ellada-odigos-2026",
  },
  {
    slug: "geo-get-found-by-chatgpt-cyprus",
    title: "GEO: How to Get Found by ChatGPT and AI Search | D&M Labs",
    description: "SEO is no longer enough. Learn what Generative Engine Optimization (GEO) is and why Cyprus businesses need it to get found by ChatGPT, Perplexity, and Google AI.",
    elSlug: "geo-vrethite-apo-chatgpt-kypros",
  },
];

// ─── English Static Routes ────────────────────────────────────────────────────

const EN_STATIC_ROUTES = [
  {
    path: "/",
    title: "D&M Labs | Professional Website Design from €299",
    description: "D&M Labs builds custom, mobile-first websites for businesses. Fast delivery, SEO-ready, starting from €299.",
    elPath: "/el",
  },
  {
    path: "/services",
    title: "Web Design Services Cyprus | D&M Labs",
    description: "Professional web design services in Cyprus. Custom websites, mobile-first development, SEO optimisation, and ongoing maintenance. From €299.",
    elPath: "/el/services",
  },
  {
    path: "/process",
    title: "Our Process | How We Build Websites | D&M Labs",
    description: "From discovery call to launch in 5-14 days. See exactly how D&M Labs designs and builds your website, step by step.",
    elPath: "/el/process",
  },
  {
    path: "/pricing",
    title: "Website Pricing Cyprus | D&M Labs",
    description: "Transparent website pricing for businesses in Cyprus. Starter from €299, Business €399, Premium €699. No hidden fees.",
    elPath: "/el/pricing",
  },
  {
    path: "/faq",
    title: "FAQ | D&M Labs Web Design",
    description: "Answers to the most common questions about working with D&M Labs. Pricing, timelines, process, and more.",
    elPath: "/el/faq",
  },
  {
    path: "/contact",
    title: "Contact D&M Labs | Get a Free Website Quote",
    description: "Get in touch with D&M Labs for a free website consultation. We reply within 24 hours. WhatsApp, email, or contact form.",
    elPath: "/el/contact",
  },
  {
    path: "/examples",
    title: "Website Examples | See Our Work | D&M Labs",
    description: "Browse real website examples built by D&M Labs for restaurants, salons, dental clinics, yoga studios, and more. Starting from €299.",
    elPath: "/el/examples",
  },
  {
    path: "/blog",
    title: "Blog | Web Design Tips & Guides | D&M Labs",
    description: "Practical guides, honest advice, and web design insights for businesses in Cyprus and beyond.",
    elPath: "/el/blog",
  },
  {
    path: "/web-design-limassol",
    title: "Web Design Limassol | Websites from €299 | D&M Labs",
    description: "D&M Labs builds professional websites for Limassol businesses from €299. Mobile-first, SEO-ready, fast delivery. Get online today.",
    elPath: "/el/web-design-limassol",
  },
  {
    path: "/web-design-thessaloniki",
    title: "Web Design Thessaloniki | Professional Websites from €299 | D&M Labs",
    description: "Professional web design for businesses in Thessaloniki. Custom websites built in 5-14 days from €299. Mobile-first, SEO-optimised, no hidden fees.",
    elPath: "/el/web-design-thessaloniki",
  },
  {
    path: "/web-design-nicosia",
    title: "Web Design Nicosia | Professional Websites from €299 | D&M Labs",
    description: "Professional web design for businesses in Nicosia, Cyprus. Custom websites built in 5-14 days from €299. Mobile-first, SEO-optimised, no hidden fees.",
    elPath: "/el/web-design-nicosia",
  },
  {
    path: "/web-design-cyprus",
    title: "Web Design Cyprus | Professional Websites from €299 | D&M Labs",
    description: "Professional web design for businesses across Cyprus. Custom websites from €299. Mobile-first, SEO-optimised, delivered in 5-14 days.",
    elPath: "/el/web-design-cyprus",
  },
  {
    path: "/web-design-crete",
    title: "Web Design Crete | Professional Websites from €299 | D&M Labs",
    description: "Professional web design for small businesses across Crete - Heraklion, Chania, Rethymno and beyond. Custom websites from €299, delivered in 5-14 days.",
    elPath: "/el/web-design-crete",
  },
  {
    path: "/web-design-paphos",
    title: "Web Design Paphos | Professional Websites from €299 | D&M Labs",
    description: "Professional web design for businesses in Paphos, Cyprus. Custom websites built in 5-14 days from €299. Mobile-first, SEO-optimised, no hidden fees.",
  },
  {
    path: "/web-design-restaurants-cyprus",
    title: "Restaurant Website Design Cyprus | D&M Labs",
    description: "Professional website design for restaurants in Cyprus. Online menus, reservations, Google visibility. Starting from €299.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy | D&M Labs",
    description: "Privacy policy for D&M Labs web design services.",
    elPath: "/el/privacy",
  },
  {
    path: "/cookies",
    title: "Cookie Policy | D&M Labs",
    description: "Cookie policy for D&M Labs web design services.",
    elPath: "/el/cookie-policy",
  },
  {
    path: "/terms",
    title: "Terms of Service | D&M Labs",
    description: "Terms of service for D&M Labs web design services.",
    elPath: "/el/terms",
  },
  // English blog posts
  ...BLOG_POSTS.map((post) => ({
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.description,
    elPath: `/el/blog/${post.elSlug}`,
  })),
];

// ─── Greek Static Routes ──────────────────────────────────────────────────────

const EL_STATIC_ROUTES = [
  {
    path: "/el",
    title: "D&M Labs | Κατασκευή Ιστοσελίδων από €299",
    description: "Η D&M Labs κατασκευάζει custom, mobile-first ιστοσελίδες για επιχειρήσεις. Γρήγορη παράδοση, SEO-ready, από €299.",
    enPath: "/",
  },
  {
    path: "/el/services",
    title: "Υπηρεσίες Web Design | D&M Labs",
    description: "Επαγγελματικές υπηρεσίες κατασκευής ιστοσελίδων. Custom ιστοσελίδες, mobile-first ανάπτυξη, SEO βελτιστοποίηση. Από €299.",
    enPath: "/services",
  },
  {
    path: "/el/process",
    title: "Η Διαδικασία μας | Πώς Κατασκευάζουμε Ιστοσελίδες | D&M Labs",
    description: "Από την πρώτη επικοινωνία μέχρι το launch σε 5-14 ημέρες. Δείτε ακριβώς πώς η D&M Labs σχεδιάζει και κατασκευάζει την ιστοσελίδα σας.",
    enPath: "/process",
  },
  {
    path: "/el/pricing",
    title: "Τιμές Κατασκευής Ιστοσελίδας | D&M Labs",
    description: "Διαφανείς τιμές κατασκευής ιστοσελίδας. Starter από €299, Business €399, Premium €699. Χωρίς κρυφές χρεώσεις.",
    enPath: "/pricing",
  },
  {
    path: "/el/faq",
    title: "Συχνές Ερωτήσεις | D&M Labs",
    description: "Απαντήσεις στις πιο συχνές ερωτήσεις για τη συνεργασία με τη D&M Labs. Τιμές, χρόνοι παράδοσης, διαδικασία και άλλα.",
    enPath: "/faq",
  },
  {
    path: "/el/contact",
    title: "Επικοινωνία | Δωρεάν Πρόταση | D&M Labs",
    description: "Επικοινωνήστε με τη D&M Labs για δωρεάν συμβουλευτική. Απαντάμε μέσα σε 24 ώρες. WhatsApp, email ή φόρμα επικοινωνίας.",
    enPath: "/contact",
  },
  {
    path: "/el/blog",
    title: "Blog | Συμβουλές Κατασκευής Ιστοσελίδας | D&M Labs",
    description: "Άρθρα και συμβουλές για κατασκευή ιστοσελίδας, SEO και online παρουσία για επιχειρήσεις στην Κύπρο και την Ελλάδα.",
    enPath: "/blog",
  },
  {
    path: "/el/web-design-limassol",
    title: "Κατασκευή Ιστοσελίδας Λεμεσός | Από €299 | D&M Labs",
    description: "Επαγγελματική κατασκευή ιστοσελίδας για επιχειρήσεις στη Λεμεσό. Custom σχεδιασμός, SEO, mobile-first. Starter €299, Business €399, Premium €699.",
    enPath: "/web-design-limassol",
  },
  {
    path: "/el/web-design-thessaloniki",
    title: "Κατασκευή Ιστοσελίδας Θεσσαλονίκη | Από €299 | D&M Labs",
    description: "Επαγγελματική κατασκευή ιστοσελίδας για επιχειρήσεις στη Θεσσαλονίκη. Custom σχεδιασμός, SEO, mobile-first. Από €299.",
    enPath: "/web-design-thessaloniki",
  },
  {
    path: "/el/web-design-nicosia",
    title: "Κατασκευή Ιστοσελίδας Λευκωσία | Από €299 | D&M Labs",
    description: "Επαγγελματική κατασκευή ιστοσελίδας για επιχειρήσεις στη Λευκωσία. Custom σχεδιασμός, SEO, mobile-first. Από €299.",
    enPath: "/web-design-nicosia",
  },
  {
    path: "/el/web-design-cyprus",
    title: "Κατασκευή Ιστοσελίδας Κύπρος | Επαγγελματικές Ιστοσελίδες από €299 | D&M Labs",
    description: "Επαγγελματική κατασκευή ιστοσελίδας για επιχειρήσεις σε όλη την Κύπρο. Custom ιστοσελίδες από €299. Mobile-first, SEO-optimised, παράδοση σε 5-14 ημέρες.",
    enPath: "/web-design-cyprus",
  },
  {
    path: "/el/web-design-crete",
    title: "Κατασκευή Ιστοσελίδας Κρήτη | Από €299 | D&M Labs",
    description: "Επαγγελματική κατασκευή ιστοσελίδας για επιχειρήσεις στην Κρήτη - Ηράκλειο, Χανιά, Ρέθυμνο. Custom ιστοσελίδες από €299.",
    enPath: "/web-design-crete",
  },
  {
    path: "/el/privacy",
    title: "Πολιτική Απορρήτου | D&M Labs",
    description: "Πολιτική απορρήτου της D&M Labs.",
    enPath: "/privacy",
  },
  {
    path: "/el/cookie-policy",
    title: "Πολιτική Cookies | D&M Labs",
    description: "Πολιτική cookies της ιστοσελίδας D&M Labs.",
    enPath: "/cookies",
  },
  {
    path: "/el/terms",
    title: "Όροι Χρήσης | D&M Labs",
    description: "Όροι χρήσης της ιστοσελίδας D&M Labs.",
    enPath: "/terms",
  },
  // Greek blog posts
  {
    path: "/el/blog/wix-vs-epaggelmatias-web-designer-kypros",
    title: "Wix ή Επαγγελματίας Web Designer; Τι Συμφέρει στην Κύπρο | D&M Labs",
    description: "Μια ειλικρινής σύγκριση Wix, WordPress και επαγγελματικής κατασκευής ιστοσελίδας για επιχειρήσεις στην Κύπρο.",
    enPath: "/blog/wix-vs-professional-web-designer-cyprus",
  },
  {
    path: "/el/blog/posso-kostizei-istoselidha-kypros",
    title: "Πόσο Κοστίζει μια Ιστοσελίδα στην Κύπρο; (Ειλικρινής Οδηγός 2026) | D&M Labs",
    description: "Η αλήθεια για τις τιμές κατασκευής ιστοσελίδας στην Κύπρο το 2026. Τι περιλαμβάνεται και πώς να επιλέξετε σωστά.",
    enPath: "/blog/website-cost-cyprus-2026-guide",
  },
  {
    path: "/el/blog/istoselidha-nail-salon-beauty-studio-kypros",
    title: "Ιστοσελίδα για Nail Salon και Beauty Studio στην Κύπρο | D&M Labs",
    description: "Τι χρειάζεται η ιστοσελίδα ενός nail salon ή beauty studio στην Κύπρο για να φέρνει νέους πελάτες.",
    enPath: "/blog/web-design-nail-salon-beauty-studio-cyprus",
  },
  {
    path: "/el/blog/istoselidha-yoga-pilates-studio-kypros",
    title: "Ιστοσελίδα για Yoga και Pilates Studio στην Κύπρο | D&M Labs",
    description: "Γιατί το yoga ή pilates studio σας στην Κύπρο χρειάζεται ιστοσελίδα και όχι μόνο Instagram.",
    enPath: "/blog/yoga-pilates-studio-website-cyprus",
  },
  {
    path: "/el/blog/pos-na-vretheite-google-kypros",
    title: "Πώς να Βρεθεί η Επιχείρησή σας στη Google στην Κύπρο | D&M Labs",
    description: "Απλός οδηγός για να εμφανίζεται η επιχείρησή σας στη Google στην Κύπρο. Χωρίς τεχνικές ορολογίες.",
    enPath: "/blog/how-to-get-found-on-google-cyprus",
  },
  {
    path: "/el/blog/istoselidha-estiatorio-kypros",
    title: "Γιατί Κάθε Εστιατόριο στην Κύπρο Χρειάζεται Ιστοσελίδα | D&M Labs",
    description: "Το Facebook δεν αρκεί για εστιατόριο στην Κύπρο. Δείτε τι χάνετε χωρίς επαγγελματική ιστοσελίδα.",
    enPath: "/blog/restaurant-website-design-cyprus",
  },
  {
    path: "/el/blog/web-design-ellada-odigos-2026",
    title: "Οδηγός Web Design Ελλάδα 2026 | D&M Labs",
    description: "Όλα όσα πρέπει να γνωρίζουν οι ελληνικές επιχειρήσεις για επαγγελματική κατασκευή ιστοσελίδας το 2026.",
    enPath: "/blog/web-design-greece-guide-2026",
  },
  {
    path: "/el/blog/geo-vrethite-apo-chatgpt-kypros",
    title: "GEO: Πώς να Βρεθείτε από το ChatGPT | D&M Labs",
    description: "Το SEO δεν αρκεί πλέον. Μάθετε τι είναι το GEO και γιατί οι επιχειρήσεις στην Κύπρο χρειάζονται να εμφανίζονται στο ChatGPT και στο Google AI.",
    enPath: "/blog/geo-get-found-by-chatgpt-cyprus",
  },
  {
    path: "/el/examples",
    title: "Παραδείγματα Ιστοσελίδων | D&M Labs",
    description: "Δείτε το portfolio μας με custom ιστοσελίδες για επιχειρήσεις στην Κύπρο και την Ελλάδα. Κάθε site χτίζεται από μηδέν.",
    enPath: "/examples",
  },
];

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
  const canonicalUrl = `${BASE_URL}${routePath}`;
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const safeCanonical = escapeHtml(canonicalUrl);
  const safeOgImage = escapeHtml(DEFAULT_OG_IMAGE);

  // Determine hreflang alternates
  const isGreek = routePath.startsWith("/el");
  let enUrl, elUrl;

  if (isGreek) {
    elUrl = `${BASE_URL}${routePath}`;
    enUrl = route.enPath ? `${BASE_URL}${route.enPath}` : null;
  } else {
    enUrl = `${BASE_URL}${routePath}`;
    elUrl = route.elPath ? `${BASE_URL}${route.elPath}` : null;
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
  <meta property="og:type" content="${routePath.includes("/blog/") ? "article" : "website"}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${safeTitle}" />
  <meta name="twitter:description" content="${safeDesc}" />
  <meta name="twitter:image" content="${safeOgImage}" />`;

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
