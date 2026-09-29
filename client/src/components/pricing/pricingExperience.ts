import type { SiteLanguage } from "@/lib/routeLanguage";
import { BUILD_PRICES, CARE_PLANS, COMPARISON } from "./pricingContent";

/** Monthly care is a later recurring payment, never an annual lump sum. */
export function pricingPaymentSchedule(build: number | null, care: number | null, yearly: boolean) {
  if (build === null || care === null || BUILD_PRICES[build] === undefined || !CARE_PLANS[care]) return null;
  const buildCost = BUILD_PRICES[build];
  const careCost = yearly ? CARE_PLANS[care].yearly : CARE_PLANS[care].monthly;
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
    flowSteps: ["Ιστοσελίδα", "Φιλοξενία & φροντίδα", "Το κόστος σας"], clear: "Από την αρχή", customShort: "Περισσότερες γλώσσες, διασυνδέσεις και μια λύση στα μέτρα σας.", customExamples: "Πολυγλωσσία · CMS · CRM · Κρατήσεις · AI", careIntro: "Απαραίτητη όσο διαχειριζόμαστε το site σας. Επιλέξτε την υποστήριξη που χρειάζεστε.",
    inherits: ["", "Με τις βασικές λειτουργίες του Launch Website", "Με τις λειτουργίες του Growth Website"],
    fit: ["Μια απλή παρουσίαση επιχείρησης", "Μια επιχείρηση που θέλει νέες επαφές", "Portfolio ή πιο πλούσιο περιεχόμενο"],
    careFit: ["Για περιστασιακές αλλαγές περιεχομένου", "Για συχνές αλλαγές περιεχομένου"],
    estimateTitle: "Το κόστος του πρώτου έτους.", estimateLabel: "Κατασκευή + ένα έτος φροντίδας", estimatePending: "Επιλέξτε ιστοσελίδα και φροντίδα για να δείτε τις πληρωμές σας.",
    monthlyExplanation: "Πληρώνετε πρώτα την κατασκευή της ιστοσελίδας. Η μηνιαία φροντίδα χρεώνεται ξεχωριστά, από τον μήνα μετά την επίσημη έναρξη λειτουργίας.",
    yearlyExplanation: "Η κατασκευή πληρώνεται εφάπαξ. Η φροντίδα πληρώνεται ετησίως. Το σύνολο περιλαμβάνει την κατασκευή και μία ετήσια πληρωμή φροντίδας.",
    nextYear: "Μετά το πρώτο έτος συνεχίζεται μόνο το επιλεγμένο πλάνο φροντίδας, μαζί με τυχόν πρόσθετες εργασίες που συμφωνούνται ξεχωριστά.",
    differences: "Μόνο οι διαφορές", compareNote: "Τα τρία πακέτα παραμένουν δίπλα δίπλα. Αλλάξτε την επιλογή για να δείτε και τα κοινά χαρακτηριστικά.",
    paymentTitle: "Πρώτα η κατασκευή. Μετά η φροντίδα.",
    firstPayment: "Πρώτη πληρωμή · κατασκευή ιστοσελίδας",
    thenCare: "Στη συνέχεια, μηνιαία φροντίδα",
    monthlyStart: "Από τον μήνα μετά την επίσημη έναρξη λειτουργίας της ιστοσελίδας.",
  },
  he: {
    flowSteps: ["אתר", "אירוח ותחזוקה", "העלויות שלכם"], clear: "להתחיל מחדש", customShort: "יותר שפות, יותר חיבורים ופתרון שמתאים בדיוק לכם.", customExamples: "ריבוי שפות · CMS · CRM · הזמנות · AI", careIntro: "נדרשים כל עוד אנחנו מנהלים את האתר. בחרו כמה תמיכה שוטפת אתם צריכים.",
    inherits: ["", "כולל את הבסיס של Launch Website", "כולל את התכונות של Growth Website"],
    fit: ["היכרות פשוטה עם העסק", "עסק שרוצה לקבל פניות", "תיק עבודות או תוכן עשיר יותר"],
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
