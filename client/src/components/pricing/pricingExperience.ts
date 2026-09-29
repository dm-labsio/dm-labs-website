import type { SiteLanguage } from "@/lib/routeLanguage";
import { BUILD_PRICES, CARE_PLANS, COMPARISON } from "./pricingContent";

/** A planning total, not an invoice or a payment due today. */
export function firstYearEstimate(build: number | null, care: number | null, yearly: boolean) {
  if (build === null || care === null || BUILD_PRICES[build] === undefined || !CARE_PLANS[care]) return null;
  return BUILD_PRICES[build] + (yearly ? CARE_PLANS[care].yearly : CARE_PLANS[care].monthly * 12);
}

export function comparisonRows(locale: SiteLanguage, differencesOnly: boolean) {
  return COMPARISON[locale].filter(row => !differencesOnly || row.launch !== row.growth || row.growth !== row.pro);
}

export const PRICING_EXPERIENCE = {
  en: {
    flowSteps: ["Website", "Hosting & care", "Your total"], clear: "Start again", simplePages: "One page, or two simple pages", upTo: "Up to", customShort: "More languages, more connections, something entirely your own.", customExamples: "Multilingual · CMS · CRM · Bookings · AI", careIntro: "Required while we manage your website. Choose how much ongoing support you need.", twelvePayments: "12 monthly care payments",
    inherits: ["", "Includes Launch Website essentials", "Includes Growth Website features"],
    pages: "Pages", revisions: "Revision rounds", fitLabel: "Best for", fit: ["A simple business introduction", "A business looking for enquiries", "A portfolio or richer content"],
    careFit: ["For occasional content changes", "For regular content changes"], careHeadline: ["Up to 3 small updates / month", "Unlimited reasonable updates"],
    estimateTitle: "Your first year. All added up.", estimateLabel: "Build + 12 months of care", estimatePending: "Choose both parts to see your first-year estimate.",
    monthlyExplanation: "The build is a one-time payment. Care is billed monthly. This total adds the build and 12 monthly care payments; it is not an upfront charge.",
    yearlyExplanation: "The build is a one-time payment. Care is paid yearly. This total adds the build and one annual care payment.",
    nextYear: "After the first year, only the selected care plan continues, plus any separately agreed work.",
    differences: "Show only differences", compareNote: "All three plans stay side by side. Switch to see shared features too.",
  },
  el: {
    flowSteps: ["Ιστοσελίδα", "Φιλοξενία & φροντίδα", "Σύνολο"], clear: "Από την αρχή", simplePages: "Μία σελίδα ή δύο απλές", upTo: "Έως", customShort: "Περισσότερες γλώσσες, διασυνδέσεις και μια λύση στα μέτρα σας.", customExamples: "Πολυγλωσσία · CMS · CRM · Κρατήσεις · AI", careIntro: "Απαραίτητη όσο διαχειριζόμαστε το site σας. Επιλέξτε την υποστήριξη που χρειάζεστε.", twelvePayments: "12 μηνιαίες πληρωμές φροντίδας",
    inherits: ["", "Με τις βασικές λειτουργίες του Launch Website", "Με τις λειτουργίες του Growth Website"],
    pages: "Σελίδες", revisions: "Γύροι αναθεωρήσεων", fitLabel: "Ταιριάζει σε", fit: ["Μια απλή παρουσίαση επιχείρησης", "Μια επιχείρηση που θέλει νέες επαφές", "Portfolio ή πιο πλούσιο περιεχόμενο"],
    careFit: ["Για περιστασιακές αλλαγές περιεχομένου", "Για συχνές αλλαγές περιεχομένου"], careHeadline: ["Έως 3 μικρές ενημερώσεις / μήνα", "Απεριόριστες εύλογες ενημερώσεις"],
    estimateTitle: "Το κόστος του πρώτου έτους.", estimateLabel: "Κατασκευή + 12 μήνες φροντίδας", estimatePending: "Επιλέξτε και τα δύο μέρη για την εκτίμηση του πρώτου έτους.",
    monthlyExplanation: "Η κατασκευή πληρώνεται εφάπαξ. Η φροντίδα χρεώνεται μηνιαία. Το σύνολο περιλαμβάνει την κατασκευή και 12 μηνιαίες πληρωμές φροντίδας, όχι προκαταβολική χρέωση όλου του ποσού.",
    yearlyExplanation: "Η κατασκευή πληρώνεται εφάπαξ. Η φροντίδα πληρώνεται ετησίως. Το σύνολο περιλαμβάνει την κατασκευή και μία ετήσια πληρωμή φροντίδας.",
    nextYear: "Μετά το πρώτο έτος συνεχίζεται μόνο το επιλεγμένο πλάνο φροντίδας, μαζί με τυχόν πρόσθετες εργασίες που συμφωνούνται ξεχωριστά.",
    differences: "Μόνο οι διαφορές", compareNote: "Τα τρία πακέτα παραμένουν δίπλα δίπλα. Αλλάξτε την επιλογή για να δείτε και τα κοινά χαρακτηριστικά.",
  },
  he: {
    flowSteps: ["אתר", "אירוח ותחזוקה", "הסכום שלכם"], clear: "להתחיל מחדש", simplePages: "עמוד אחד או שניים פשוטים", upTo: "עד", customShort: "יותר שפות, יותר חיבורים ופתרון שמתאים בדיוק לכם.", customExamples: "ריבוי שפות · CMS · CRM · הזמנות · AI", careIntro: "נדרשים כל עוד אנחנו מנהלים את האתר. בחרו כמה תמיכה שוטפת אתם צריכים.", twelvePayments: "12 תשלומי תחזוקה חודשיים",
    inherits: ["", "כולל את הבסיס של Launch Website", "כולל את התכונות של Growth Website"],
    pages: "עמודים", revisions: "סבבי תיקונים", fitLabel: "מתאים ל", fit: ["היכרות פשוטה עם העסק", "עסק שרוצה לקבל פניות", "תיק עבודות או תוכן עשיר יותר"],
    careFit: ["לשינויי תוכן מדי פעם", "לשינויי תוכן באופן שוטף"], careHeadline: ["עד 3 עדכונים קטנים בחודש", "עדכונים סבירים ללא הגבלה"],
    estimateTitle: "התקציב לשנה הראשונה.", estimateLabel: "בנייה + 12 חודשי תחזוקה", estimatePending: "בחרו את שני החלקים כדי לראות אומדן לשנה הראשונה.",
    monthlyExplanation: "הבנייה היא תשלום חד־פעמי. התחזוקה מחויבת מדי חודש. הסכום כולל את הבנייה ו־12 תשלומי תחזוקה חודשיים, ולא נגבה כולו מראש.",
    yearlyExplanation: "הבנייה היא תשלום חד־פעמי. התחזוקה משולמת מדי שנה. הסכום כולל את הבנייה ותשלום שנתי אחד על התחזוקה.",
    nextYear: "אחרי השנה הראשונה ממשיכה רק תוכנית התחזוקה שנבחרה, לצד עבודות נוספות שיוסכמו בנפרד.",
    differences: "הצגת ההבדלים בלבד", compareNote: "שלוש החבילות נשארות זו לצד זו. אפשר לשנות את הבחירה כדי לראות גם את המאפיינים המשותפים.",
  },
} satisfies Record<SiteLanguage, Record<string, string | string[]>>;
