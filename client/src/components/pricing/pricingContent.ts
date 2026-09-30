import type { SiteLanguage } from "@/lib/routeLanguage";

export const BUILD_PRICES = [299, 749, 1499] as const;
export const CARE_PLANS = [{ name: "Basic Care", monthly: 69, yearly: 750 }, { name: "Complete Care", monthly: 129, yearly: 1395 }] as const;
export const BUILD_PRICE_SUMMARY = {
  en: "Launch Website is €299 for one page or two simple pages, Growth Website is €749 for up to 4 pages, and Pro Website is €1,499 for up to 7 pages. Contact forms are included with Growth and Pro. Enterprise / Custom is quoted for your scope. The build is a one-time cost; hosting and care are required while we manage your website, from €69 per month. Prices exclude applicable taxes and separately agreed third-party costs.",
  el: "Το Launch Website κοστίζει €299 για μία σελίδα ή δύο απλές σελίδες, το Growth Website €749 για έως 4 σελίδες και το Pro Website €1,499 για έως 7 σελίδες. Φόρμα επικοινωνίας περιλαμβάνεται στα Growth και Pro. Το Enterprise / Custom κοστολογείται βάσει του έργου. Η κατασκευή χρεώνεται εφάπαξ. Φιλοξενία και συντήρηση απαιτούνται όσο διαχειριζόμαστε την ιστοσελίδα σας, από €69 τον μήνα. Οι τιμές δεν περιλαμβάνουν τυχόν φόρους και χωριστά συμφωνημένες χρεώσεις τρίτων.",
} as const;

export const BUILD_PLANS: Record<SiteLanguage, readonly { name: string; summary: string; features: readonly string[] }[]> = {
  "en": [
    {
      "name": "Launch Website",
      "summary": "A lean online presence for a new business that needs to launch clearly and professionally.",
      "features": [
        "One page, or two simple pages",
        "Responsive build",
        "Basic SEO foundations",
        "WhatsApp and social links",
        "2 revision rounds"
      ]
    },
    {
      "name": "Growth Website",
      "summary": "A conversion-focused site for a business ready to be found, trusted, and contacted online.",
      "features": [
        "Up to 4 pages",
        "Contact form",
        "Google Maps and reviews/testimonials",
        "Basic SEO",
        "Search Console and Analytics setup",
        "3 revision rounds"
      ]
    },
    {
      "name": "Pro Website",
      "summary": "A more complete digital presence with richer content, motion, and stronger search foundations.",
      "features": [
        "Up to 7 pages",
        "Gallery or portfolio",
        "Pop-up and scroll-driven animations",
        "Full SEO structure",
        "Blog setup or a website visual pack",
        "4 revision rounds"
      ]
    }
  ],
  "el": [
    {
      "name": "Launch Website",
      "summary": "Μια καθαρή, επαγγελματική online παρουσία για μια νέα επιχείρηση που θέλει να ξεκινήσει σωστά.",
      "features": [
        "Μία σελίδα ή δύο απλές σελίδες",
        "Responsive κατασκευή",
        "Βασικές SEO βάσεις",
        "WhatsApp και σύνδεσμοι social media",
        "2 γύροι αναθεωρήσεων"
      ]
    },
    {
      "name": "Growth Website",
      "summary": "Ένα site με έμφαση στις μετατροπές, για επιχείρηση που θέλει να τη βρίσκουν, να την εμπιστεύονται και να επικοινωνούν μαζί της.",
      "features": [
        "Έως 4 σελίδες",
        "Φόρμα επικοινωνίας",
        "Google Maps και ενότητα reviews / testimonials",
        "Βασικό SEO",
        "Ρύθμιση Search Console και Analytics",
        "3 γύροι αναθεωρήσεων"
      ]
    },
    {
      "name": "Pro Website",
      "summary": "Μια πιο ολοκληρωμένη ψηφιακή παρουσία με πλουσιότερο περιεχόμενο, motion και ισχυρότερη βάση αναζήτησης.",
      "features": [
        "Έως 7 σελίδες",
        "Gallery ή portfolio",
        "Pop-up και animations με scroll",
        "Πλήρης SEO δομή",
        "Ρύθμιση blog ή website visual pack",
        "4 γύροι αναθεωρήσεων"
      ]
    }
  ],
  "he": [
    {
      "name": "Launch Website",
      "summary": "נקודת פתיחה מקצועית ומזמינה לעסק בתחילת הדרך.",
      "features": [
        "עמוד אחד או שניים פשוטים",
        "מותאם למובייל",
        "יסודות SEO",
        "WhatsApp ורשתות חברתיות",
        "2 סבבי תיקונים"
      ]
    },
    {
      "name": "Growth Website",
      "summary": "אתר שעוזר ללקוחות הנכונים למצוא אתכם וליצור קשר בביטחון.",
      "features": [
        "עד 4 עמודים",
        "טופס יצירת קשר",
        "Google Maps וביקורות",
        "SEO בסיסי",
        "Search Console ו-Analytics",
        "3 סבבי תיקונים"
      ]
    },
    {
      "name": "Pro Website",
      "summary": "נוכחות דיגיטלית עשירה יותר, עם תוכן ותשתית חיפוש שמוכנים לצמוח איתכם.",
      "features": [
        "עד 7 עמודים",
        "גלריה או תיק עבודות",
        "אנימציות Popup וגלילה",
        "מבנה SEO מלא",
        "בלוג או חבילת נכסים",
        "4 סבבי תיקונים"
      ]
    }
  ]
};

export const CARE_FEATURES: Record<SiteLanguage, readonly (readonly string[])[]> = {
  "en": [
    [
      "Managed hosting & uptime monitoring",
      "Website assets & database management, where applicable",
      "Backups and bug fixing",
      "WhatsApp support",
      "Up to 3 small content updates each month"
    ],
    [
      "Everything in Basic Care",
      "Content updates when you need them",
      "Priority WhatsApp support",
      "Monthly performance check",
      "One simple banner or section update each month"
    ]
  ],
  "el": [
    [
      "Διαχειριζόμενη φιλοξενία & παρακολούθηση διαθεσιμότητας",
      "Διαχείριση αρχείων και βάσης δεδομένων, όπου υπάρχει",
      "Αντίγραφα ασφαλείας και διόρθωση σφαλμάτων",
      "Υποστήριξη μέσω WhatsApp",
      "Έως 3 μικρές ενημερώσεις περιεχομένου κάθε μήνα"
    ],
    [
      "Όλα όσα περιλαμβάνει το Basic Care",
      "Ενημερώσεις περιεχομένου όταν τις χρειάζεστε",
      "Υποστήριξη WhatsApp με προτεραιότητα",
      "Μηνιαίος έλεγχος απόδοσης",
      "Ένα απλό banner ή ενημέρωση ενότητας κάθε μήνα"
    ]
  ],
  "he": [
    [
      "אירוח מנוהל וניטור זמינות",
      "ניהול קבצי האתר ומסד הנתונים, אם קיים",
      "גיבויים ותיקוני תקלות",
      "תמיכה ב־WhatsApp",
      "עד 3 עדכוני תוכן קטנים בחודש"
    ],
    [
      "כל מה שכלול ב־Basic Care",
      "עדכוני תוכן כשצריך",
      "תמיכת WhatsApp בעדיפות",
      "בדיקת ביצועים חודשית",
      "עדכון באנר או אזור פשוט בחודש"
    ]
  ]
};

export const COMPARISON: Record<SiteLanguage, readonly { feature: string; launch: boolean | string; growth: boolean | string; pro: boolean | string }[]> = {
  "en": [
    {
      "feature": "Pages",
      "launch": "1–2 simple",
      "growth": "Up to 4",
      "pro": "Up to 7"
    },
    {
      "feature": "Responsive build",
      "launch": true,
      "growth": true,
      "pro": true
    },
    {
      "feature": "WhatsApp and social links",
      "launch": true,
      "growth": true,
      "pro": true
    },
    {
      "feature": "Basic SEO foundations",
      "launch": true,
      "growth": true,
      "pro": true
    },
    {
      "feature": "Contact form",
      "launch": false,
      "growth": true,
      "pro": true
    },
    {
      "feature": "Google Maps",
      "launch": false,
      "growth": true,
      "pro": true
    },
    {
      "feature": "Reviews or testimonials section",
      "launch": false,
      "growth": true,
      "pro": true
    },
    {
      "feature": "Search Console and Analytics setup",
      "launch": false,
      "growth": true,
      "pro": true
    },
    {
      "feature": "Gallery or portfolio",
      "launch": false,
      "growth": false,
      "pro": true
    },
    {
      "feature": "Pop-up and scroll-driven animations",
      "launch": false,
      "growth": false,
      "pro": true
    },
    {
      "feature": "Full SEO structure",
      "launch": false,
      "growth": false,
      "pro": true
    },
    {
      "feature": "Blog setup or visual pack",
      "launch": false,
      "growth": false,
      "pro": true
    },
    {
      "feature": "Revision rounds",
      "launch": "2",
      "growth": "3",
      "pro": "4"
    }
  ],
  "el": [
    {
      "feature": "Σελίδες",
      "launch": "1–2 απλές",
      "growth": "Έως 4",
      "pro": "Έως 7"
    },
    {
      "feature": "Responsive κατασκευή",
      "launch": true,
      "growth": true,
      "pro": true
    },
    {
      "feature": "WhatsApp και social links",
      "launch": true,
      "growth": true,
      "pro": true
    },
    {
      "feature": "Βασικές SEO βάσεις",
      "launch": true,
      "growth": true,
      "pro": true
    },
    {
      "feature": "Φόρμα επικοινωνίας",
      "launch": false,
      "growth": true,
      "pro": true
    },
    {
      "feature": "Google Maps",
      "launch": false,
      "growth": true,
      "pro": true
    },
    {
      "feature": "Ενότητα reviews ή testimonials",
      "launch": false,
      "growth": true,
      "pro": true
    },
    {
      "feature": "Search Console και Analytics",
      "launch": false,
      "growth": true,
      "pro": true
    },
    {
      "feature": "Gallery ή portfolio",
      "launch": false,
      "growth": false,
      "pro": true
    },
    {
      "feature": "Pop-up και animations με scroll",
      "launch": false,
      "growth": false,
      "pro": true
    },
    {
      "feature": "Πλήρης SEO δομή",
      "launch": false,
      "growth": false,
      "pro": true
    },
    {
      "feature": "Blog setup ή visual pack",
      "launch": false,
      "growth": false,
      "pro": true
    },
    {
      "feature": "Γύροι αναθεωρήσεων",
      "launch": "2",
      "growth": "3",
      "pro": "4"
    }
  ],
  "he": [
    {
      "feature": "עמודים",
      "launch": "1–2 פשוטים",
      "growth": "עד 4",
      "pro": "עד 7"
    },
    {
      "feature": "מותאם למובייל",
      "launch": true,
      "growth": true,
      "pro": true
    },
    {
      "feature": "WhatsApp ורשתות חברתיות",
      "launch": true,
      "growth": true,
      "pro": true
    },
    {
      "feature": "יסודות SEO",
      "launch": true,
      "growth": true,
      "pro": true
    },
    {
      "feature": "טופס יצירת קשר",
      "launch": false,
      "growth": true,
      "pro": true
    },
    {
      "feature": "Google Maps",
      "launch": false,
      "growth": true,
      "pro": true
    },
    {
      "feature": "ביקורות או המלצות",
      "launch": false,
      "growth": true,
      "pro": true
    },
    {
      "feature": "הגדרת Search Console ו-Analytics",
      "launch": false,
      "growth": true,
      "pro": true
    },
    {
      "feature": "גלריה או תיק עבודות",
      "launch": false,
      "growth": false,
      "pro": true
    },
    {
      "feature": "אנימציות Popup וגלילה",
      "launch": false,
      "growth": false,
      "pro": true
    },
    {
      "feature": "מבנה SEO מלא",
      "launch": false,
      "growth": false,
      "pro": true
    },
    {
      "feature": "בלוג או חבילת נכסים",
      "launch": false,
      "growth": false,
      "pro": true
    },
    {
      "feature": "סבבי תיקונים",
      "launch": "2",
      "growth": "3",
      "pro": "4"
    }
  ]
};

export function pricingMoney(locale: SiteLanguage, value: number) {
  if (locale === "en") return `€${value.toLocaleString("en-IE", {minimumFractionDigits: Number.isInteger(value) ? 0 : 2, maximumFractionDigits: 2})}`;
  return new Intl.NumberFormat(locale === "el" ? "el-GR" : "he-IL", {style: "currency", currency: "EUR", minimumFractionDigits: Number.isInteger(value) ? 0 : 2, maximumFractionDigits: 2}).format(value);
}

export function pricingContactUrl(locale: SiteLanguage, build: number | null, care: number | null, yearly: boolean) {
  const base = locale === "en" ? "/contact/" : `/${locale}/contact/`;
  if (build === null || care === null || !BUILD_PLANS.en[build] || !CARE_PLANS[care]) return base;
  return `${base}?${new URLSearchParams({package: BUILD_PLANS.en[build].name, care: CARE_PLANS[care].name, billing: yearly ? "yearly" : "monthly"})}`;
}
