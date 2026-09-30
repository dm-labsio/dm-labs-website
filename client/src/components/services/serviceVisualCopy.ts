import type { SiteLanguage } from "@/lib/routeLanguage";

export const SERVICE_VISUAL_COPY = {
  en: {
    explore: "Explore the details", story: "A closer look", scope: "View the full scope",
    design: ["First impression", "Brand language", "Clear direction"], mobile: ["Reading order", "Every screen", "Made for touch"], performance: ["Load", "Respond", "Stay steady"],
    type: "Type with character.", colour: "A palette with purpose.", layout: "Your story, clearly told.",
    concept: "Illustrative website concept", project: "FORM / STUDIO", siteEyebrow: "Design in focus", siteTitle: "A different perspective.", siteBody: "Considered details. Lasting impressions.", siteAction: "Explore the collection", siteNav: "Work / About / Contact", siteBottom: "Thoughtful by design", siteCollection: "The collection", siteNote: "Design · Craft · Detail",
    filmTitle: ["From a first idea", "to something that feels like you."], mobileTitle: ["Same story.", "A considered view, every time."], performanceTitle: ["A lighter page.", "A clearer path forward."],
    filmCaption: "Design study · illustrative imagery", flowNote: "An illustration of the experience, not a measured speed result.", flowAction: "Try the interaction", flowResult: "Ready to explore", before: "Your idea", after: "Your website", scopeShort: "The right details, agreed together.",
  },
  el: {
    explore: "Δείτε τις λεπτομέρειες", story: "Μια πιο κοντινή ματιά", scope: "Δείτε το πλήρες εύρος",
    design: ["Πρώτη εντύπωση", "Γλώσσα του brand", "Σαφής κατεύθυνση"], mobile: ["Σειρά ανάγνωσης", "Κάθε οθόνη", "Για την αφή"], performance: ["Φόρτωση", "Απόκριση", "Σταθερότητα"],
    type: "Γράμματα με χαρακτήρα.", colour: "Χρώμα με σκοπό.", layout: "Η ιστορία σας, ξεκάθαρα.",
    concept: "Ενδεικτική σχεδιαστική πρόταση", project: "FORM / STUDIO", siteEyebrow: "Ο σχεδιασμός στο επίκεντρο", siteTitle: "Μια διαφορετική ματιά.", siteBody: "Προσεγμένες λεπτομέρειες. Εντυπώσεις που μένουν.", siteAction: "Δείτε τη συλλογή", siteNav: "Έργα / Σχετικά / Επικοινωνία", siteBottom: "Σχεδιασμός με σκέψη", siteCollection: "Η συλλογή", siteNote: "Σχεδιασμός · Δημιουργία · Λεπτομέρεια",
    filmTitle: ["Από την πρώτη ιδέα", "σε κάτι που σας εκφράζει."], mobileTitle: ["Η ίδια ιστορία.", "Προσεγμένη σε κάθε οθόνη."], performanceTitle: ["Πιο ελαφριά σελίδα.", "Πιο ξεκάθαρη συνέχεια."],
    filmCaption: "Σχεδιαστική μελέτη · ενδεικτικές εικόνες", flowNote: "Απεικόνιση της εμπειρίας, όχι μέτρηση ταχύτητας.", flowAction: "Δοκιμάστε την απόκριση", flowResult: "Έτοιμο για εξερεύνηση", before: "Η ιδέα σας", after: "Η ιστοσελίδα σας", scopeShort: "Οι σωστές λεπτομέρειες, με κοινή συμφωνία.",
  },
  he: {
    explore: "מבט מקרוב", story: "נכנסים לפרטים", scope: "לכל פרטי העבודה",
    design: ["רושם ראשוני", "שפה מותגית", "כיוון ברור"], mobile: ["סדר הקריאה", "בכל מסך", "נוח למגע"], performance: ["טעינה", "תגובה", "יציבות"],
    type: "אותיות עם אופי.", colour: "צבע עם כוונה.", layout: "הסיפור שלכם, ברור.",
    concept: "קונספט אתר להמחשה", project: "FORM / STUDIO", siteEyebrow: "עיצוב במוקד", siteTitle: "נקודת מבט אחרת.", siteBody: "פרטים עם מחשבה. רושם שנשאר.", siteAction: "לגלות את הקולקציה", siteNav: "עבודות / אודות / קשר", siteBottom: "מעוצב עם מחשבה", siteCollection: "הקולקציה", siteNote: "עיצוב · יצירה · פרטים",
    filmTitle: ["מהרעיון הראשון", "למשהו שמרגיש כמוכם."], mobileTitle: ["אותו סיפור.", "מחשבה בכל גודל מסך."], performanceTitle: ["עמוד קל יותר.", "דרך ברורה להמשך."],
    filmCaption: "המחשת עיצוב · תמונות להמחשה", flowNote: "המחשה של החוויה, לא תוצאת מדידת מהירות.", flowAction: "נסו את התגובה", flowResult: "מוכנים לגלות", before: "הרעיון שלכם", after: "האתר שלכם", scopeShort: "הפרטים הנכונים, בתיאום מלא.",
  },
} satisfies Record<SiteLanguage, unknown>;
