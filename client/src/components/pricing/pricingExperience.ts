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
    heroLabel: "Two parts. One clear picture.", buildRange: "Website build", careRange: "Hosting & care", standard: "Standard packages · paid once", ongoing: "Monthly, while we manage your website", annualOption: "Annual care billing is also available.",
    finderLabel: "Find your starting point", finderTitle: "What should your website do?", finderIntro: "Pick your main goal for a suggestion, or compare the plans below.",
    goals: ["Introduce my business", "Bring in enquiries", "Showcase more of my work"],
    reasons: ["A focused one-page or simple two-page website, with the essentials to introduce your business and let people reach you.", "Up to four pages, with a contact form, Maps, testimonials and analytics to support new enquiries.", "Up to seven pages, a gallery or portfolio, richer motion and a blog setup or visual pack."],
    suggested: "Your starting point", usePlan: "Choose this plan", customPrompt: "Need bookings, integrations or multiple languages?", customLink: "Explore a custom project",
    inherits: ["", "Includes Launch Website essentials", "Includes Growth Website features"],
    pages: "Pages", revisions: "Revision rounds", fitLabel: "Best for", fit: ["A simple business introduction", "A business looking for enquiries", "A portfolio or richer content"],
    nextCare: "Next: choose care", review: "Review your estimate", notChosen: "Not chosen yet", clear: "Reset choices", planDetails: "Full package details",
    careFit: ["For occasional content changes", "For regular content changes"], careHeadline: ["Up to 3 small updates / month", "Unlimited reasonable updates"],
    estimateTitle: "See your first-year budget.", estimateLabel: "Build + 12 months of care", estimatePending: "Choose both parts to see your first-year estimate.",
    monthlyExplanation: "The build is a one-time payment. Care is billed monthly. This total adds the build and 12 monthly care payments; it is not an upfront charge.",
    yearlyExplanation: "The build is a one-time payment. Care is paid yearly. This total adds the build and one annual care payment.",
    nextYear: "After the first year, only the selected care plan continues, plus any separately agreed work.",
    differences: "Show only differences", compareNote: "All three plans stay side by side. Switch to see shared features too.",
  },
  el: {
    heroLabel: "Δύο μέρη. Ξεκάθαρο κόστος.", buildRange: "Κατασκευή ιστοσελίδας", careRange: "Φιλοξενία και φροντίδα", standard: "Τυπικά πακέτα · εφάπαξ πληρωμή", ongoing: "Κάθε μήνα, όσο διαχειριζόμαστε το site σας", annualOption: "Διατίθεται και ετήσια χρέωση φροντίδας.",
    finderLabel: "Βρείτε την αφετηρία σας", finderTitle: "Τι θέλετε να πετύχει το site σας;", finderIntro: "Επιλέξτε τον βασικό σας στόχο για μια πρόταση ή συγκρίνετε τα πακέτα παρακάτω.",
    goals: ["Να παρουσιάσω την επιχείρησή μου", "Να δεχτώ νέες επικοινωνίες", "Να αναδείξω περισσότερη δουλειά"],
    reasons: ["Μία ή δύο απλές σελίδες με τα απαραίτητα για να παρουσιάσετε την επιχείρησή σας και να μπορούν να σας βρουν.", "Έως τέσσερις σελίδες, με φόρμα επικοινωνίας, χάρτη, κριτικές και analytics για νέες επικοινωνίες.", "Έως επτά σελίδες, gallery ή portfolio, περισσότερα animations και ρύθμιση blog ή πακέτο οπτικού υλικού."],
    suggested: "Η αφετηρία σας", usePlan: "Επιλογή αυτού του πακέτου", customPrompt: "Χρειάζεστε κρατήσεις, διασυνδέσεις ή πολλές γλώσσες;", customLink: "Δείτε τις προσαρμοσμένες λύσεις",
    inherits: ["", "Με τις βασικές λειτουργίες του Launch Website", "Με τις λειτουργίες του Growth Website"],
    pages: "Σελίδες", revisions: "Γύροι αναθεωρήσεων", fitLabel: "Ταιριάζει σε", fit: ["Μια απλή παρουσίαση επιχείρησης", "Μια επιχείρηση που θέλει νέες επαφές", "Portfolio ή πιο πλούσιο περιεχόμενο"],
    nextCare: "Επόμενο: φροντίδα", review: "Δείτε την εκτίμησή σας", notChosen: "Δεν έχει επιλεγεί", clear: "Επαναφορά επιλογών", planDetails: "Αναλυτικά στοιχεία πακέτου",
    careFit: ["Για περιστασιακές αλλαγές περιεχομένου", "Για συχνές αλλαγές περιεχομένου"], careHeadline: ["Έως 3 μικρές ενημερώσεις / μήνα", "Απεριόριστες εύλογες ενημερώσεις"],
    estimateTitle: "Το κόστος του πρώτου έτους.", estimateLabel: "Κατασκευή + 12 μήνες φροντίδας", estimatePending: "Επιλέξτε και τα δύο μέρη για την εκτίμηση του πρώτου έτους.",
    monthlyExplanation: "Η κατασκευή πληρώνεται εφάπαξ. Η φροντίδα χρεώνεται μηνιαία. Το σύνολο περιλαμβάνει την κατασκευή και 12 μηνιαίες πληρωμές φροντίδας, όχι προκαταβολική χρέωση όλου του ποσού.",
    yearlyExplanation: "Η κατασκευή πληρώνεται εφάπαξ. Η φροντίδα πληρώνεται ετησίως. Το σύνολο περιλαμβάνει την κατασκευή και μία ετήσια πληρωμή φροντίδας.",
    nextYear: "Μετά το πρώτο έτος συνεχίζεται μόνο το επιλεγμένο πλάνο φροντίδας, μαζί με τυχόν πρόσθετες εργασίες που συμφωνούνται ξεχωριστά.",
    differences: "Μόνο οι διαφορές", compareNote: "Τα τρία πακέτα παραμένουν δίπλα δίπλα. Αλλάξτε την επιλογή για να δείτε και τα κοινά χαρακτηριστικά.",
  },
  he: {
    heroLabel: "שני חלקים. עלות ברורה.", buildRange: "בניית האתר", careRange: "אירוח ותחזוקה", standard: "חבילות רגילות · תשלום חד־פעמי", ongoing: "בכל חודש, כל עוד אנחנו מנהלים את האתר", annualOption: "אפשר לבחור גם בתשלום שנתי על התחזוקה.",
    finderLabel: "מוצאים נקודת התחלה", finderTitle: "מה האתר שלכם צריך לעשות?", finderIntro: "בחרו מטרה מרכזית לקבלת הצעה, או השוו את החבילות למטה.",
    goals: ["להציג את העסק שלי", "לקבל פניות חדשות", "להציג יותר מהעבודות שלי"],
    reasons: ["עמוד אחד או שניים פשוטים, עם כל מה שצריך כדי להציג את העסק ולאפשר לאנשים לפנות אליכם.", "עד ארבעה עמודים, עם טופס יצירת קשר, מפה, ביקורות ואנליטיקה כדי לתמוך בפניות חדשות.", "עד שבעה עמודים, גלריה או תיק עבודות, אנימציות עשירות יותר והקמת בלוג או חבילת נכסים חזותיים."],
    suggested: "נקודת ההתחלה שלכם", usePlan: "בחירת החבילה הזאת", customPrompt: "צריכים הזמנות, אינטגרציות או כמה שפות?", customLink: "לפרויקט מותאם אישית",
    inherits: ["", "כולל את הבסיס של Launch Website", "כולל את התכונות של Growth Website"],
    pages: "עמודים", revisions: "סבבי תיקונים", fitLabel: "מתאים ל", fit: ["היכרות פשוטה עם העסק", "עסק שרוצה לקבל פניות", "תיק עבודות או תוכן עשיר יותר"],
    nextCare: "הבא: בחירת תחזוקה", review: "לצפייה באומדן", notChosen: "עדיין לא נבחר", clear: "איפוס הבחירות", planDetails: "כל פרטי החבילה",
    careFit: ["לשינויי תוכן מדי פעם", "לשינויי תוכן באופן שוטף"], careHeadline: ["עד 3 עדכונים קטנים בחודש", "עדכונים סבירים ללא הגבלה"],
    estimateTitle: "התקציב לשנה הראשונה.", estimateLabel: "בנייה + 12 חודשי תחזוקה", estimatePending: "בחרו את שני החלקים כדי לראות אומדן לשנה הראשונה.",
    monthlyExplanation: "הבנייה היא תשלום חד־פעמי. התחזוקה מחויבת מדי חודש. הסכום כולל את הבנייה ו־12 תשלומי תחזוקה חודשיים, ולא נגבה כולו מראש.",
    yearlyExplanation: "הבנייה היא תשלום חד־פעמי. התחזוקה משולמת מדי שנה. הסכום כולל את הבנייה ותשלום שנתי אחד על התחזוקה.",
    nextYear: "אחרי השנה הראשונה ממשיכה רק תוכנית התחזוקה שנבחרה, לצד עבודות נוספות שיוסכמו בנפרד.",
    differences: "הצגת ההבדלים בלבד", compareNote: "שלוש החבילות נשארות זו לצד זו. אפשר לשנות את הבחירה כדי לראות גם את המאפיינים המשותפים.",
  },
} satisfies Record<SiteLanguage, Record<string, string | string[]>>;
