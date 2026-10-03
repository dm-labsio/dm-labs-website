import type { SiteLanguage } from "@/lib/routeLanguage";
import type { RefreshedService } from "./serviceFeatureContent";

type ServiceSeo = { title: string; description: string };

// Search titles and descriptions written for Greek and Hebrew searchers. English
// keeps using the page name and intro. The visible page and its schema are unchanged.
export const SERVICE_SEO: Partial<Record<SiteLanguage, Record<RefreshedService, ServiceSeo>>> = {
  el: {
    "custom-design": {
      title: "Σχεδιασμός ιστοσελίδας στα μέτρα σας | DM-Labs.io",
      description: "Όχι άλλη μια ιστοσελίδα από έτοιμο template. Τη σχεδιάζουμε με βάση το brand, τους πελάτες και το ύφος σας, και σας δείχνουμε το σχέδιο πριν την κατασκευή.",
    },
    "mobile-first": {
      title: "Ιστοσελίδα που δείχνει άψογα στο κινητό | DM-Labs.io",
      description: "Πολλοί πελάτες θα σας γνωρίσουν από το κινητό τους. Σχεδιάζουμε πρώτα για τη μικρή οθόνη, ώστε να διαβάζεται εύκολα και να σας στέλνουν μήνυμα με ένα πάτημα.",
    },
    performance: {
      title: "Γρήγορη ιστοσελίδα: ταχύτητα φόρτωσης | DM-Labs.io",
      description: "Κανείς δεν περιμένει μια σελίδα που αργεί. Ελαφριές εικόνες, καθαρός κώδικας και έλεγχοι Lighthouse και PageSpeed, για να ανοίγει γρήγορα και στο κινητό.",
    },
    seo: {
      title: "SEO για ιστοσελίδες: εμφάνιση στο Google | DM-Labs.io",
      description: "Για να καταλαβαίνει το Google τι κάνετε: σωστή δομή, τίτλοι και περιγραφές σε κάθε σελίδα και δομημένα δεδομένα. Χωρίς υποσχέσεις για πρώτη θέση, με γερές βάσεις.",
    },
    security: {
      title: "Ασφάλεια και συντήρηση ιστοσελίδας | DM-Labs.io",
      description: "Πιστοποιητικό SSL, αντίγραφα ασφαλείας, έλεγχος ότι το site είναι online και διόρθωση σφαλμάτων, μέσα από το πακέτο φιλοξενίας και συντήρησης.",
    },
    turnaround: {
      title: "Κατασκευή ιστοσελίδας με ξεκάθαρο χρονοδιάγραμμα | DM-Labs.io",
      description: "Χρονοδιάγραμμα που συμφωνούμε από πριν, προεπισκόπηση πριν τη δημοσίευση και συγκεκριμένοι γύροι διορθώσεων. Χωρίς εκπλήξεις, και ξέρετε πάντα τι ακολουθεί.",
    },
  },
  he: {
    "custom-design": {
      title: "עיצוב אתרים בהתאמה אישית לעסקים | DM-Labs.io",
      description: "לא עוד אתר מתבנית. אנחנו מעצבים את האתר לפי המותג, הלקוחות והסגנון שלכם, ומראים לכם את העיצוב לפני שמתחילים לבנות.",
    },
    "mobile-first": {
      title: "אתר מותאם למובייל | DM-Labs.io",
      description: "הרבה מהלקוחות שלכם ייכנסו מהמובייל. אנחנו מתכננים את האתר קודם למסך הקטן, כך שיהיה קל לקרוא, לנווט וליצור איתכם קשר.",
    },
    performance: {
      title: "אתר מהיר: מהירות טעינה | DM-Labs.io",
      description: "אף אחד לא מחכה לאתר שנטען לאט. תמונות קלות, קוד נקי ובדיקות Lighthouse ו־PageSpeed, כדי שהאתר ייפתח מהר גם במובייל.",
    },
    seo: {
      title: "קידום אורגני (SEO) לאתרים | DM-Labs.io",
      description: "שגוגל יבין מה אתם עושים: מבנה נכון, כותרות ותיאורים בכל עמוד ונתונים מובנים. בלי הבטחות למקום ראשון, עם יסודות שעובדים.",
    },
    security: {
      title: "אבטחת אתרים ותחזוקה שוטפת | DM-Labs.io",
      description: "תעודת SSL, גיבויים, ניטור ותיקון תקלות, כחלק מתוכנית האחסון והתחזוקה. האתר שלכם בידיים טובות גם אחרי ההשקה.",
    },
    turnaround: {
      title: "בניית אתר בלוח זמנים ברור | DM-Labs.io",
      description: "לוח זמנים שמסכמים מראש, גרסה לבדיקה לפני ההשקה וסבבי תיקונים מוגדרים. בלי הפתעות בדרך, ואתם תמיד יודעים מה השלב הבא.",
    },
  },
};
