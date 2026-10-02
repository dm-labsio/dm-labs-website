import { convertedPrice, type Currency } from "../../../../shared/currency";
import type { SiteLanguage } from "@/lib/routeLanguage";
import { BUILD_PRICES, CARE_PLANS, COMPARISON } from "./pricingContent";

/** Monthly care is a later recurring payment, never an annual lump sum. */
export function pricingPaymentSchedule(build: number | null, care: number | null, yearly: boolean, currency: Currency = "EUR") {
  if (build === null || care === null || BUILD_PRICES[build] === undefined || !CARE_PLANS[care]) return null;
  const buildCost = convertedPrice(BUILD_PRICES[build], currency);
  const careCost = convertedPrice(yearly ? CARE_PLANS[care].yearly : CARE_PLANS[care].monthly, currency);
  return { build: buildCost, care: careCost, total: yearly ? buildCost + careCost : null };
}

export function comparisonRows(locale: SiteLanguage, differencesOnly: boolean) {
  return COMPARISON[locale].filter(row => !differencesOnly || row.launch !== row.growth || row.growth !== row.pro);
}

export const PRICING_EXPERIENCE = {
  en: {
    flowSteps: ["Website", "Hosting & care", "Your costs"], clear: "Start again", customShort: "More languages, more connections, something entirely your own.", customExamples: "Multilingual · CMS · CRM · Bookings · AI", careIntro: "Required while we manage your website. Choose how much ongoing support you need.",
    inherits: ["", "Includes Launch Website essentials", "Includes Growth Website features"],
    fit: ["A simple business introduction", "A business looking for enquiries", "A portfolio or richer content"],
    careFit: ["For occasional content changes", "For regular content changes"],
    estimateTitle: "Your first year. All added up.", estimateLabel: "Build + one year of care", estimatePending: "Choose a website and care plan to see your payments.",
    monthlyExplanation: "Pay for the website build first. Monthly care is charged separately, starting the month after the official launch.",
    yearlyExplanation: "The build is a one-time payment. Care is paid yearly. This total adds the build and one annual care payment.",
    nextYear: "After the first year, only the selected care plan continues, plus any separately agreed work.",
    differences: "Show only differences", compareNote: "All three plans stay side by side. Switch to see shared features too.",
    paymentTitle: "Your build first. Care after launch.",
    firstPayment: "First payment · website build",
    thenCare: "Then, monthly care",
    monthlyStart: "Starting the month after your website’s official launch.",
  },
  el: {
    flowSteps: ["Ιστοσελίδα", "Συντήρηση", "Το κόστος σας"], clear: "Από την αρχή", customShort: "Περισσότερες γλώσσες, συνδέσεις με άλλα συστήματα και μια λύση στα μέτρα σας.", customExamples: "Πολυγλωσσία · CMS · CRM · Κρατήσεις · AI", careIntro: "Χρειάζεται όσο διαχειριζόμαστε την ιστοσελίδα σας. Διαλέξτε πόση βοήθεια θέλετε.",
    inherits: ["", "Περιλαμβάνει ό,τι έχει το Launch Website", "Περιλαμβάνει ό,τι έχει το Growth Website"],
    fit: ["Για μια απλή παρουσίαση της επιχείρησης", "Για επιχειρήσεις που θέλουν νέους πελάτες", "Για παρουσίαση έργων ή περισσότερο περιεχόμενο"],
    careFit: ["Για περιστασιακές αλλαγές περιεχομένου", "Για συχνές αλλαγές περιεχομένου"],
    estimateTitle: "Τι πληρώνετε τον πρώτο χρόνο.", estimateLabel: "Κατασκευή + ένας χρόνος συντήρησης", estimatePending: "Διαλέξτε ιστοσελίδα και πακέτο συντήρησης για να δείτε τι θα πληρώσετε.",
    monthlyExplanation: "Πρώτα πληρώνετε την κατασκευή της ιστοσελίδας. Η συντήρηση χρεώνεται ξεχωριστά κάθε μήνα, από τον μήνα μετά την επίσημη δημοσίευση.",
    yearlyExplanation: "Η κατασκευή πληρώνεται μία φορά και η συντήρηση μία φορά τον χρόνο. Το σύνολο περιλαμβάνει την κατασκευή και την πρώτη ετήσια πληρωμή συντήρησης.",
    nextYear: "Από τον δεύτερο χρόνο πληρώνετε μόνο το πακέτο συντήρησης που διαλέξατε, και ό,τι έξτρα συμφωνήσουμε ξεχωριστά.",
    differences: "Μόνο οι διαφορές", compareNote: "Τα τρία πακέτα μένουν δίπλα δίπλα. Αλλάξτε την επιλογή για να δείτε και όσα έχουν κοινά.",
    paymentTitle: "Πρώτα η κατασκευή, μετά η συντήρηση.",
    firstPayment: "Πρώτη πληρωμή · κατασκευή ιστοσελίδας",
    thenCare: "Στη συνέχεια, μηνιαία συντήρηση",
    monthlyStart: "Από τον μήνα μετά την επίσημη δημοσίευση της ιστοσελίδας.",
  },
  he: {
    flowSteps: ["אתר", "אחסון ותחזוקה", "כמה זה עולה"], clear: "להתחיל מחדש", customShort: "יותר שפות, יותר חיבורים ופתרון שמתאים בדיוק לכם.", customExamples: "ריבוי שפות · CMS · CRM · הזמנות · AI", careIntro: "חובה כל עוד אנחנו מנהלים את האתר. בחרו כמה עזרה שוטפת אתם צריכים.",
    inherits: ["", "כולל את הבסיס של Launch Website", "כולל את התכונות של Growth Website"],
    fit: ["לאתר תדמית פשוט", "לעסק שרוצה יותר פניות", "לתיק עבודות או הרבה תוכן"],
    careFit: ["לשינויי תוכן מדי פעם", "לשינויי תוכן באופן שוטף"],
    estimateTitle: "התקציב לשנה הראשונה.", estimateLabel: "בנייה + שנת תחזוקה", estimatePending: "בחרו אתר ותוכנית תחזוקה כדי לראות את התשלומים שלכם.",
    monthlyExplanation: "משלמים קודם על בניית האתר. התחזוקה החודשית מחויבת בנפרד, החל מהחודש שאחרי ההשקה הרשמית.",
    yearlyExplanation: "הבנייה היא תשלום חד־פעמי. התחזוקה משולמת מדי שנה. הסכום כולל את הבנייה ותשלום שנתי אחד על התחזוקה.",
    nextYear: "אחרי השנה הראשונה ממשיכה רק תוכנית התחזוקה שנבחרה, לצד עבודות נוספות שיוסכמו בנפרד.",
    differences: "הצגת ההבדלים בלבד", compareNote: "שלוש החבילות נשארות זו לצד זו. אפשר לשנות את הבחירה כדי לראות גם את המאפיינים המשותפים.",
    paymentTitle: "קודם בניית האתר. אחר כך התחזוקה.",
    firstPayment: "תשלום ראשון · בניית האתר",
    thenCare: "אחר כך, תחזוקה חודשית",
    monthlyStart: "החל מהחודש שאחרי ההשקה הרשמית של האתר.",
  },
} satisfies Record<SiteLanguage, Record<string, string | string[]>>;
