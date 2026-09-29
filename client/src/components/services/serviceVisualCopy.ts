import type { SiteLanguage } from "@/lib/routeLanguage";

export const SERVICE_VISUAL_COPY = {
  en: {
    explore: "Explore the details", replay: "Replay the movement", story: "A closer look", choose: "Choose a chapter to explore.", scope: "View the full scope", journey: "Four steps. One shared direction.",
    design: ["First impression", "Brand language", "Clear direction"], mobile: ["Reading order", "Room to adapt", "Made for touch"], performance: ["Load", "Respond", "Stay steady"],
    type: "Type with character.", colour: "A palette with purpose.", layout: "Space to tell your story.",
    concept: "Illustrative website concept", project: "FORM / STUDIO", siteEyebrow: "Spaces for living", siteTitle: "Room for a different perspective.", siteBody: "Considered spaces. Lasting impressions.", siteAction: "Explore the collection", siteNav: "Spaces / About / Contact", siteBottom: "Thoughtful by design", siteCollection: "The collection", siteNote: "Architecture · Interiors · Objects",
    filmTitle: ["From a first idea", "to something that feels like you."], mobileTitle: ["Same story.", "A considered view, every time."], performanceTitle: ["A lighter page.", "A clearer path forward."],
    filmCaption: "Design study · illustrative imagery", flowNote: "An illustration of the experience, not a measured speed result.", flowAction: "Try the interaction", flowResult: "Ready to explore", before: "Your idea", after: "Your website", scopeShort: "The right details, agreed together.",
  },
  el: {
    explore: "Δείτε τις λεπτομέρειες", replay: "Επανάληψη κίνησης", story: "Μια πιο κοντινή ματιά", choose: "Επιλέξτε ένα κεφάλαιο για να το εξερευνήσετε.", scope: "Δείτε το πλήρες εύρος", journey: "Τέσσερα βήματα. Μια κοινή κατεύθυνση.",
    design: ["Πρώτη εντύπωση", "Γλώσσα του brand", "Σαφής κατεύθυνση"], mobile: ["Σειρά ανάγνωσης", "Χώρος προσαρμογής", "Για την αφή"], performance: ["Φόρτωση", "Απόκριση", "Σταθερότητα"],
    type: "Γράμματα με χαρακτήρα.", colour: "Χρώμα με σκοπό.", layout: "Χώρος για την ιστορία σας.",
    concept: "Ενδεικτική σχεδιαστική πρόταση", project: "FORM / STUDIO", siteEyebrow: "Χώροι για ζωή", siteTitle: "Χώρος για μια άλλη ματιά.", siteBody: "Προσεγμένοι χώροι. Εντυπώσεις που μένουν.", siteAction: "Δείτε τη συλλογή", siteNav: "Χώροι / Σχετικά / Επικοινωνία", siteBottom: "Σχεδιασμός με σκέψη", siteCollection: "Η συλλογή", siteNote: "Αρχιτεκτονική · Εσωτερικοί χώροι · Αντικείμενα",
    filmTitle: ["Από την πρώτη ιδέα", "σε κάτι που σας εκφράζει."], mobileTitle: ["Η ίδια ιστορία.", "Προσεγμένη σε κάθε οθόνη."], performanceTitle: ["Πιο ελαφριά σελίδα.", "Πιο ξεκάθαρη συνέχεια."],
    filmCaption: "Σχεδιαστική μελέτη · ενδεικτικές εικόνες", flowNote: "Απεικόνιση της εμπειρίας, όχι μέτρηση ταχύτητας.", flowAction: "Δοκιμάστε την απόκριση", flowResult: "Έτοιμο για εξερεύνηση", before: "Η ιδέα σας", after: "Η ιστοσελίδα σας", scopeShort: "Οι σωστές λεπτομέρειες, με κοινή συμφωνία.",
  },
  he: {
    explore: "מבט מקרוב", replay: "לנגן את התנועה שוב", story: "נכנסים לפרטים", choose: "בחרו פרק וגלו את הפרטים.", scope: "לכל פרטי העבודה", journey: "ארבעה צעדים. כיוון משותף אחד.",
    design: ["רושם ראשוני", "שפה מותגית", "כיוון ברור"], mobile: ["סדר הקריאה", "מקום להתאים", "נוח למגע"], performance: ["טעינה", "תגובה", "יציבות"],
    type: "אותיות עם אופי.", colour: "צבע עם כוונה.", layout: "מקום לסיפור שלכם.",
    concept: "קונספט אתר להמחשה", project: "FORM / STUDIO", siteEyebrow: "מקום לחיות בו", siteTitle: "מקום לנקודת מבט אחרת.", siteBody: "חללים עם מחשבה. רושם שנשאר.", siteAction: "לגלות את הקולקציה", siteNav: "חללים / אודות / קשר", siteBottom: "מעוצב עם מחשבה", siteCollection: "הקולקציה", siteNote: "אדריכלות · עיצוב פנים · חפצים",
    filmTitle: ["מהרעיון הראשון", "למשהו שמרגיש כמוכם."], mobileTitle: ["אותו סיפור.", "מחשבה בכל גודל מסך."], performanceTitle: ["עמוד קל יותר.", "דרך ברורה להמשך."],
    filmCaption: "המחשת עיצוב · תמונות להמחשה", flowNote: "המחשה של החוויה, לא תוצאת מדידת מהירות.", flowAction: "נסו את התגובה", flowResult: "מוכנים לגלות", before: "הרעיון שלכם", after: "האתר שלכם", scopeShort: "הפרטים הנכונים, בתיאום מלא.",
  },
} satisfies Record<SiteLanguage, unknown>;
