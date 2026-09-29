import type { SiteLanguage } from "@/lib/routeLanguage";

export const FOUNDATION_VISUALS = {
  en: {
    seo: ["The search", "The answer", "The structure"], security: ["Connection", "Care", "Recovery"], turnaround: ["Prepare", "Preview", "Launch"],
    note: "Illustration · choose a card", search: "Website design for my business", result: "A website that works for your business.", description: "Design, development and ongoing care. Explore the services and talk to us about your project.", page: "Your business. Clearly online.", path: ["Home", "Services", "Contact"], pageParts: ["What you do", "How to get in touch"],
    layers: ["Protect the connection.", "Keep the site cared for.", "Prepare a way back."], endpoints: ["Visitor", "Website"], care: ["Monitor", "Maintain", "Support"], versions: ["Website", "Content", "Settings"], restore: "Restore", recovery: "A copy to recover from.",
    milestones: ["Get the essentials together.", "See it. Refine it.", "Approve. Then go live."], materials: ["Content", "Brand", "Access"], review: ["Working preview", "Your feedback"], launch: ["Final checks", "Your approval", "Domain connected"],
    headings: { seo: "Make it easy to find you.", security: "Care beyond launch.", turnaround: "You stay involved." }, scope: { seo: "The SEO work.", security: "Your care setup.", turnaround: "What delivery includes." },
  },
  el: {
    seo: ["Η αναζήτηση", "Η απάντηση", "Η δομή"], security: ["Σύνδεση", "Φροντίδα", "Επαναφορά"], turnaround: ["Προετοιμασία", "Προεπισκόπηση", "Δημοσίευση"],
    note: "Απεικόνιση · επιλέξτε κάρτα", search: "Ιστοσελίδα για την επιχείρησή μου", result: "Μια ιστοσελίδα που δουλεύει για εσάς.", description: "Σχεδιασμός, ανάπτυξη και συνεχής φροντίδα. Δείτε τις υπηρεσίες και μιλήστε μας για το έργο σας.", page: "Η επιχείρησή σας. Ξεκάθαρα online.", path: ["Αρχική", "Υπηρεσίες", "Επικοινωνία"], pageParts: ["Τι προσφέρετε", "Πώς επικοινωνούν μαζί σας"],
    layers: ["Προστασία της σύνδεσης.", "Συνεχής φροντίδα του site.", "Έτοιμοι για επαναφορά."], endpoints: ["Επισκέπτης", "Ιστοσελίδα"], care: ["Παρακολούθηση", "Συντήρηση", "Υποστήριξη"], versions: ["Ιστοσελίδα", "Περιεχόμενο", "Ρυθμίσεις"], restore: "Επαναφορά", recovery: "Ένα αντίγραφο για ανάκτηση.",
    milestones: ["Συγκεντρώνουμε τα απαραίτητα.", "Βλέπετε. Βελτιώνουμε.", "Εγκρίνετε. Δημοσιεύουμε."], materials: ["Περιεχόμενο", "Brand", "Πρόσβαση"], review: ["Λειτουργική προεπισκόπηση", "Τα σχόλιά σας"], launch: ["Τελικοί έλεγχοι", "Η έγκρισή σας", "Σύνδεση domain"],
    headings: { seo: "Να σας βρίσκουν πιο εύκολα.", security: "Φροντίδα μετά τη δημοσίευση.", turnaround: "Συμμετέχετε σε κάθε στάδιο." }, scope: { seo: "Η δουλειά στο SEO.", security: "Το πλάνο φροντίδας σας.", turnaround: "Τι περιλαμβάνει η παράδοση." },
  },
  he: {
    seo: ["החיפוש", "התשובה", "המבנה"], security: ["חיבור", "תחזוקה", "שחזור"], turnaround: ["הכנה", "תצוגה", "השקה"],
    note: "המחשה · בחרו כרטיס", search: "בניית אתר לעסק שלי", result: "אתר שעובד בשביל העסק שלכם.", description: "עיצוב, פיתוח ותחזוקה שוטפת. מכירים את השירותים ומדברים איתנו על הפרויקט שלכם.", page: "העסק שלכם. ברור גם ברשת.", path: ["בית", "שירותים", "יצירת קשר"], pageParts: ["מה אתם מציעים", "איך יוצרים קשר"],
    layers: ["מגינים על החיבור.", "ממשיכים לטפל באתר.", "מתכוננים לשחזור."], endpoints: ["מבקרים", "אתר"], care: ["ניטור", "תחזוקה", "תמיכה"], versions: ["אתר", "תוכן", "הגדרות"], restore: "שחזור", recovery: "עותק שאפשר לשחזר ממנו.",
    milestones: ["אוספים את מה שצריך.", "רואים. משפרים.", "מאשרים. ואז משיקים."], materials: ["תוכן", "מותג", "גישה"], review: ["תצוגה עובדת", "המשוב שלכם"], launch: ["בדיקות אחרונות", "האישור שלכם", "חיבור דומיין"],
    headings: { seo: "שיהיה קל למצוא אתכם.", security: "טיפול גם אחרי ההשקה.", turnaround: "אתם חלק מהתהליך." }, scope: { seo: "העבודה על ה-SEO.", security: "תוכנית התחזוקה שלכם.", turnaround: "מה כלול במסירה." },
  },
} satisfies Record<SiteLanguage, unknown>;
