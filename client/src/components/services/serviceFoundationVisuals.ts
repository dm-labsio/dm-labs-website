import type { SiteLanguage } from "@/lib/routeLanguage";

export const FOUNDATION_VISUALS = {
  en: {
    seo: ["The question", "The page", "The structure"], security: ["Connection", "Care", "Recovery"], turnaround: ["Prepare", "Preview", "Launch"],
    note: "Illustrative study · select a chapter to explore", search: "Spaces made for everyday life", result: "Thoughtful spaces. Considered details.", description: "An independent design studio. Discover the approach, explore the work and start a conversation.", page: "Room to live.", path: ["Home", "Services", "Projects"],
    layers: ["Encrypted connection", "Ongoing care", "Recovery copies"], layerNote: "Considered at every layer.", versions: ["Website", "Content", "Settings"],
    milestones: ["Direction agreed", "Feedback together", "Your final approval"], project: "From idea to online.", deliveryNotes: ["Content · brand · access", "Build · review · refine", "Check · approve · publish"],
    seoTitle: ["A useful answer.", "A stronger starting point."], securityTitle: ["Behind the experience.", "Care that continues."], turnaroundTitle: ["Space to review.", "Confidence to launch."],
  },
  el: {
    seo: ["Η ερώτηση", "Η σελίδα", "Η δομή"], security: ["Σύνδεση", "Φροντίδα", "Επαναφορά"], turnaround: ["Προετοιμασία", "Προεπισκόπηση", "Δημοσίευση"],
    note: "Ενδεικτική μελέτη · επιλέξτε ένα κεφάλαιο", search: "Χώροι για την καθημερινή ζωή", result: "Όμορφοι χώροι. Προσεγμένες λεπτομέρειες.", description: "Ένα ανεξάρτητο στούντιο σχεδιασμού. Γνωρίστε την προσέγγιση, δείτε τη δουλειά και ξεκινήστε μια συζήτηση.", page: "Χώρος για ζωή.", path: ["Αρχική", "Υπηρεσίες", "Έργα"],
    layers: ["Κρυπτογραφημένη σύνδεση", "Συνεχής φροντίδα", "Αντίγραφα επαναφοράς"], layerNote: "Προσοχή σε κάθε επίπεδο.", versions: ["Ιστοσελίδα", "Περιεχόμενο", "Ρυθμίσεις"],
    milestones: ["Συμφωνημένη κατεύθυνση", "Συγκεντρωμένα σχόλια", "Η τελική σας έγκριση"], project: "Από την ιδέα στο διαδίκτυο.", deliveryNotes: ["Περιεχόμενο · brand · πρόσβαση", "Κατασκευή · έλεγχος · βελτίωση", "Έλεγχος · έγκριση · δημοσίευση"],
    seoTitle: ["Μια χρήσιμη απάντηση.", "Μια καλύτερη αφετηρία."], securityTitle: ["Πίσω από την εμπειρία.", "Φροντίδα που συνεχίζεται."], turnaroundTitle: ["Χώρος για έλεγχο.", "Σιγουριά για το ξεκίνημα."],
  },
  he: {
    seo: ["השאלה", "העמוד", "המבנה"], security: ["חיבור", "תחזוקה", "שחזור"], turnaround: ["הכנה", "תצוגה", "השקה"],
    note: "המחשה רעיונית · בחרו פרק כדי לגלות עוד", search: "חללים שמתאימים לחיי היום־יום", result: "חללים נעימים. פרטים מחושבים.", description: "סטודיו עצמאי לעיצוב. מכירים את הגישה, מגלים את העבודות ומתחילים שיחה.", page: "מקום לחיות.", path: ["בית", "שירותים", "פרויקטים"],
    layers: ["חיבור מוצפן", "תחזוקה שוטפת", "עותקים לשחזור"], layerNote: "תשומת לב בכל שכבה.", versions: ["אתר", "תוכן", "הגדרות"],
    milestones: ["כיוון מוסכם", "משוב מרוכז", "האישור הסופי שלכם"], project: "מרעיון לאתר חי.", deliveryNotes: ["תוכן · מותג · גישה", "בונים · בודקים · משפרים", "בודקים · מאשרים · מפרסמים"],
    seoTitle: ["תשובה שימושית.", "נקודת פתיחה טובה יותר."], securityTitle: ["מאחורי החוויה.", "טיפול שממשיך."], turnaroundTitle: ["מקום לבדוק.", "ביטחון להשיק."],
  },
} satisfies Record<SiteLanguage, unknown>;
