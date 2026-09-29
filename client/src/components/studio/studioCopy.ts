import type { SiteLanguage } from "@/lib/routeLanguage";

export const CAPABILITY_IDS = ["custom-design", "mobile-first", "seo", "performance", "security", "maps", "forms", "social", "turnaround"] as const;
type StudioCopy = {
  services: { label: string; title: [string, string]; lead: string; nav: [string, string, string]; buildTitle: string; buildLead: string; capabilitiesTitle: string; capabilitiesLead: string; capabilities: readonly [string, string][]; customExtra: string; careTitle: string; careLink: string; helpTitle: string; helpCopy: string };
  process: { label: string; title: [string, string]; lead: string; nav: [string, string]; journeyTitle: string; journeyLead: string; outcome: string; steps: readonly { title: string; copy: string; output: string }[]; interlude: string; interludeCopy: string; timingTitle: string; timingLead: string; days: string; from: string; careNote: string; helpTitle: string; helpCopy: string };
  consultation: string; processLink: string; servicesLink: string; pricingLink: string; questionsLink: string;
};

export const STUDIO_COPY: Record<SiteLanguage, StudioCopy> = {
  en: {
    services: {
      label: "Design. Build. Care.", title: ["Your business.", "An unmistakable presence."],
      lead: "A website should make it easy to understand what you do — and why you’re the right choice. We bring the design, the build and the care to make that happen.",
      nav: ["Website packages", "Our capabilities", "Ongoing care"], buildTitle: "The right starting point.", buildLead: "Three clear scopes, built around your brand. Choose what your business needs today, with the option to add more later.",
      capabilitiesTitle: "Good design goes deeper.", capabilitiesLead: "From the first impression to the next enquiry, every detail has a job. These are the capabilities we bring to a project; what’s included depends on your package and agreed scope.",
      capabilities: [
        ["A design that’s yours", "A visual direction shaped around your brand, content and audience."],
        ["Made for mobile", "Layouts and interactions considered for phones, tablets and desktop."],
        ["Search foundations", "A clear page structure, useful metadata and the foundations for search visibility."],
        ["Performance in mind", "Considered code and optimized assets to keep the experience responsive."],
        ["Secure connections", "HTTPS and an SSL certificate as part of your managed hosting."],
        ["A place on the map", "An embedded map that helps visitors find your business."],
        ["A clear way to enquire", "Contact forms that route the right information to your inbox."],
        ["Your channels, connected", "Simple routes to WhatsApp and your social profiles."],
        ["From delivery to care", "An agreed launch plan, followed by support through your care plan."],
      ],
      customExtra: "Dedicated project coordination, priority delivery and ongoing retainers can be agreed around your needs.",
      careTitle: "Launch is the beginning.", careLink: "Compare monthly and annual care", helpTitle: "Tell us what you have in mind.", helpCopy: "A new business, a fresh direction or a site that needs to work harder. Let’s find your next step.",
    },
    process: {
      label: "A clear path, together", title: ["From your first idea", "to your next chapter."], lead: "You bring the business. We bring the design and the build. Here’s how we take it from a conversation to a website you’re ready to share.", nav: ["The five steps", "Typical timing"],
      journeyTitle: "You’ll know what comes next.", journeyLead: "A shared direction, clear feedback points and a real person to talk to. Five steps, with you involved along the way.", outcome: "What we agree", steps: [
        { title: "Start with a conversation.", copy: "A free 15–20 minute discovery call, usually on WhatsApp. We talk about your business, your audience and what the website needs to do. Then we help you choose a suitable package.", output: "Your priorities and a recommended starting point." },
        { title: "Make the scope clear.", copy: "We confirm the pages, features, revision rounds and care plan, then issue your invoice. Standard website builds are paid in full before work begins. We agree the schedule once payment and the required content are ready.", output: "An agreed scope, price and project schedule." },
        { title: "Give the idea a shape.", copy: "We develop a design direction around your brand and share it for approval before development. Then we build the site for mobile and desktop, with progress updates and review points for your feedback.", output: "An approved direction and a working website preview." },
        { title: "Refine it together.", copy: "Review the preview and send your feedback. Launch includes 2 revision rounds, Growth includes 3 and Pro includes 4. We work through the included rounds; additions beyond the agreed scope are quoted separately.", output: "Reviewed content, agreed revisions and approval to launch." },
        { title: "Ready for the real world.", copy: "We connect your domain, configure SSL and check the pages, links and forms before launch. Once you approve, your site goes live. Hosting, updates and support continue through your care plan.", output: "Your live website and a clear route to ongoing support." },
      ], interlude: "A direction you can see. Before we build.", interludeCopy: "Design and development are part of the same conversation. Your feedback shapes the work at clear checkpoints.", timingTitle: "A sense of the schedule.", timingLead: "Typical build estimates in business days, once your agreed content and payment are ready. Scope, approvals and feedback can change the schedule; we confirm yours before starting.", days: "business days", from: "Build from", careNote: "One-time build + ongoing hosting and care from €69/month. Custom projects follow an agreed schedule.", helpTitle: "The first step is a conversation.", helpCopy: "Ask us anything about your idea, the process or the right package. Your first consultation is free, with no obligation.",
    }, consultation: "Get a free consultation", processLink: "See how we work", servicesLink: "Explore our services", pricingLink: "Compare packages & pricing", questionsLink: "Questions? Start here",
  },
  el: {
    services: {
      label: "Σχεδιασμός. Κατασκευή. Φροντίδα.", title: ["Η επιχείρησή σας.", "Μια παρουσία που ξεχωρίζει."], lead: "Η ιστοσελίδα σας πρέπει να δείχνει καθαρά τι κάνετε και γιατί αξίζει να σας επιλέξουν. Φέρνουμε τον σχεδιασμό, την κατασκευή και τη φροντίδα που χρειάζεται.",
      nav: ["Πακέτα ιστοσελίδων", "Οι δυνατότητές μας", "Συνεχής φροντίδα"], buildTitle: "Η σωστή αφετηρία.", buildLead: "Τρία ξεκάθαρα πακέτα, με βάση το brand σας. Επιλέξτε ό,τι χρειάζεται η επιχείρησή σας σήμερα, με δυνατότητα επέκτασης αργότερα.",
      capabilitiesTitle: "Ο καλός σχεδιασμός έχει βάθος.", capabilitiesLead: "Από την πρώτη εντύπωση μέχρι την επικοινωνία, κάθε λεπτομέρεια έχει σκοπό. Αυτές είναι οι δυνατότητες που φέρνουμε σε ένα έργο. Το τι περιλαμβάνεται εξαρτάται από το πακέτο και το συμφωνημένο εύρος.",
      capabilities: [
        ["Σχεδιασμός για εσάς", "Μια οπτική κατεύθυνση βασισμένη στο brand, το περιεχόμενο και το κοινό σας."],
        ["Με το κινητό στο επίκεντρο", "Διάταξη και αλληλεπιδράσεις μελετημένες για κινητά, tablet και υπολογιστές."],
        ["Βάσεις για αναζήτηση", "Ξεκάθαρη δομή σελίδων, χρήσιμα μεταδεδομένα και βάσεις για ορατότητα στην αναζήτηση."],
        ["Με έμφαση στην ταχύτητα", "Προσεγμένος κώδικας και βελτιστοποιημένα αρχεία για ομαλή απόκριση."],
        ["Ασφαλείς συνδέσεις", "HTTPS και πιστοποιητικό SSL ως μέρος της διαχειριζόμενης φιλοξενίας."],
        ["Η θέση σας στον χάρτη", "Ενσωματωμένος χάρτης για να βρίσκουν οι επισκέπτες την επιχείρησή σας."],
        ["Εύκολη επικοινωνία", "Φόρμες που στέλνουν τις σωστές πληροφορίες στο email σας."],
        ["Τα κανάλια σας συνδέονται", "Άμεση πρόσβαση στο WhatsApp και στα προφίλ σας στα social media."],
        ["Από την παράδοση στη φροντίδα", "Συμφωνημένο πλάνο δημοσίευσης και υποστήριξη μέσα από το πλάνο φροντίδας σας."],
      ], customExtra: "Προσωπικός συντονισμός έργου, παράδοση με προτεραιότητα και συνεχής συνεργασία μπορούν να συμφωνηθούν με βάση τις ανάγκες σας.", careTitle: "Η δημοσίευση είναι μόνο η αρχή.", careLink: "Σύγκριση μηνιαίας και ετήσιας φροντίδας", helpTitle: "Πείτε μας τι έχετε στο μυαλό σας.", helpCopy: "Μια νέα επιχείρηση, μια νέα κατεύθυνση ή ένα site που χρειάζεται περισσότερα. Ας βρούμε μαζί το επόμενο βήμα.",
    },
    process: {
      label: "Μια ξεκάθαρη πορεία, μαζί", title: ["Από την πρώτη ιδέα", "στο επόμενο κεφάλαιο."], lead: "Εσείς φέρνετε την επιχείρηση. Εμείς τον σχεδιασμό και την κατασκευή. Έτσι περνάμε από μια συζήτηση σε μια ιστοσελίδα που θέλετε να μοιραστείτε.", nav: ["Τα πέντε βήματα", "Ενδεικτικοί χρόνοι"], journeyTitle: "Ξέρετε πάντα τι ακολουθεί.", journeyLead: "Κοινή κατεύθυνση, ξεκάθαρα σημεία για σχόλια και ένας άνθρωπος δίπλα σας. Πέντε βήματα, με τη δική σας συμμετοχή.", outcome: "Τι συμφωνούμε", steps: [
        { title: "Ξεκινάμε με μια συζήτηση.", copy: "Μια δωρεάν κλήση γνωριμίας 15–20 λεπτών, συνήθως στο WhatsApp. Μιλάμε για την επιχείρηση, το κοινό και τον σκοπό της ιστοσελίδας σας. Μετά σας βοηθάμε να επιλέξετε το κατάλληλο πακέτο.", output: "Οι προτεραιότητές σας και μια προτεινόμενη αφετηρία." },
        { title: "Ορίζουμε το έργο ξεκάθαρα.", copy: "Συμφωνούμε σελίδες, λειτουργίες, γύρους αναθεωρήσεων και πλάνο φροντίδας και εκδίδουμε το τιμολόγιο. Τα βασικά πακέτα εξοφλούνται πριν ξεκινήσει η εργασία. Ορίζουμε το χρονοδιάγραμμα όταν είναι έτοιμα η πληρωμή και το απαραίτητο περιεχόμενο.", output: "Συμφωνημένο εύρος, τιμή και χρονοδιάγραμμα." },
        { title: "Δίνουμε μορφή στην ιδέα.", copy: "Διαμορφώνουμε μια σχεδιαστική κατεύθυνση γύρω από το brand σας και τη στέλνουμε για έγκριση πριν την ανάπτυξη. Έπειτα κατασκευάζουμε το site για κινητά και υπολογιστές, με ενημερώσεις προόδου και συγκεκριμένα σημεία για τα σχόλιά σας.", output: "Εγκεκριμένη κατεύθυνση και λειτουργική προεπισκόπηση." },
        { title: "Το βελτιώνουμε μαζί.", copy: "Ελέγχετε την προεπισκόπηση και στέλνετε τα σχόλιά σας. Το Launch περιλαμβάνει 2 γύρους αναθεωρήσεων, το Growth 3 και το Pro 4. Ολοκληρώνουμε τους συμφωνημένους γύρους. Προσθήκες πέρα από το συμφωνημένο εύρος κοστολογούνται ξεχωριστά.", output: "Ελεγμένο περιεχόμενο, συμφωνημένες αλλαγές και έγκριση δημοσίευσης." },
        { title: "Έτοιμο για τον πραγματικό κόσμο.", copy: "Συνδέουμε το domain, ρυθμίζουμε το SSL και ελέγχουμε σελίδες, συνδέσμους και φόρμες πριν τη δημοσίευση. Με τη δική σας έγκριση, το site βγαίνει online. Φιλοξενία, ενημερώσεις και υποστήριξη συνεχίζονται μέσω του πλάνου φροντίδας σας.", output: "Η ιστοσελίδα σας online, με συνεχή υποστήριξη." },
      ], interlude: "Βλέπετε την κατεύθυνση. Πριν την κατασκευή.", interludeCopy: "Σχεδιασμός και ανάπτυξη είναι μέρος της ίδιας συζήτησης. Τα σχόλιά σας διαμορφώνουν το έργο σε ξεκάθαρα στάδια.", timingTitle: "Μια εικόνα του χρόνου.", timingLead: "Ενδεικτικοί χρόνοι κατασκευής σε εργάσιμες ημέρες, αφού είναι έτοιμα το συμφωνημένο περιεχόμενο και η πληρωμή. Το εύρος, οι εγκρίσεις και τα σχόλια μπορούν να επηρεάσουν τον χρόνο. Επιβεβαιώνουμε το δικό σας πλάνο πριν ξεκινήσουμε.", days: "εργάσιμες ημέρες", from: "Κατασκευή από", careNote: "Εφάπαξ κατασκευή + συνεχής φιλοξενία και φροντίδα από €69/μήνα. Τα ειδικά έργα ακολουθούν συμφωνημένο χρονοδιάγραμμα.", helpTitle: "Το πρώτο βήμα είναι μια συζήτηση.", helpCopy: "Ρωτήστε μας για την ιδέα σας, τη διαδικασία ή το κατάλληλο πακέτο. Η πρώτη συμβουλευτική είναι δωρεάν, χωρίς δέσμευση.",
    }, consultation: "Δωρεάν συμβουλευτική", processLink: "Δείτε πώς δουλεύουμε", servicesLink: "Δείτε τις υπηρεσίες μας", pricingLink: "Σύγκριση πακέτων και τιμών", questionsLink: "Απορίες; Ξεκινήστε εδώ",
  },
  he: {
    services: {
      label: "עיצוב. בנייה. תחזוקה.", title: ["העסק שלכם.", "נוכחות שאי אפשר לפספס."], lead: "האתר שלכם צריך להבהיר מה אתם עושים ולמה כדאי לבחור בכם. אנחנו מביאים את העיצוב, הבנייה והתחזוקה שיעזרו לזה לקרות.", nav: ["חבילות אתרים", "היכולות שלנו", "תחזוקה שוטפת"], buildTitle: "נקודת הפתיחה הנכונה.", buildLead: "שלוש חבילות ברורות, סביב המותג שלכם. בוחרים את מה שהעסק צריך היום, עם אפשרות להוסיף בהמשך.", capabilitiesTitle: "עיצוב טוב יורד לפרטים.", capabilitiesLead: "מהרושם הראשון ועד לפנייה הבאה, לכל פרט יש תפקיד. אלה היכולות שאנחנו מביאים לפרויקט. מה שכלול בפועל תלוי בחבילה ובהיקף שסיכמנו.",
      capabilities: [
        ["עיצוב שהוא שלכם", "כיוון ויזואלי שנבנה סביב המותג, התוכן והקהל שלכם."],
        ["חושבים גם על המובייל", "פריסות ואינטראקציות שמתוכננות לטלפונים, לטאבלטים ולמחשב."],
        ["יסודות לחיפוש", "מבנה עמודים ברור, מטא־דאטה שימושי ותשתית לנראות בחיפוש."],
        ["מהירות כחלק מהתכנון", "קוד מוקפד וקבצים מותאמים לחוויית שימוש מהירה ונעימה."],
        ["חיבור מאובטח", "HTTPS ותעודת SSL כחלק מהאירוח המנוהל שלכם."],
        ["המיקום שלכם על המפה", "מפה מוטמעת שעוזרת למבקרים למצוא את העסק."],
        ["דרך ברורה לפנייה", "טפסי יצירת קשר שמעבירים את המידע הנכון לתיבת המייל שלכם."],
        ["כל הערוצים מתחברים", "גישה פשוטה לוואטסאפ ולפרופילים שלכם ברשתות החברתיות."],
        ["מהמסירה לתחזוקה", "תוכנית השקה מוסכמת ותמיכה בהמשך דרך תוכנית התחזוקה שלכם."],
      ], customExtra: "אפשר לתאם ליווי אישי של מנהל פרויקט, מסירה בעדיפות ועבודה שוטפת בהתאם לצרכים שלכם.", careTitle: "ההשקה היא רק ההתחלה.", careLink: "להשוואת תחזוקה חודשית ושנתית", helpTitle: "ספרו לנו מה יש לכם בראש.", helpCopy: "עסק חדש, כיוון רענן או אתר שצריך לעשות יותר. נמצא יחד את הצעד הבא.",
    },
    process: {
      label: "דרך ברורה, ביחד", title: ["מהרעיון הראשון", "לפרק הבא שלכם."], lead: "אתם מביאים את העסק. אנחנו את העיצוב והבנייה. כך הופכים שיחה לאתר שתרצו לשתף עם כולם.", nav: ["חמשת השלבים", "לוחות זמנים"], journeyTitle: "תמיד תדעו מה השלב הבא.", journeyLead: "כיוון משותף, נקודות ברורות למשוב ואדם שאפשר לדבר איתו. חמישה שלבים, כשאתם חלק מהדרך.", outcome: "מה מסכמים", steps: [
        { title: "מתחילים בשיחה.", copy: "שיחת היכרות ללא עלות של 15–20 דקות, בדרך כלל בוואטסאפ. מדברים על העסק, על הקהל ועל מה שהאתר צריך לעשות. אחר כך עוזרים לכם לבחור חבילה מתאימה.", output: "סדרי העדיפויות שלכם ונקודת פתיחה מומלצת." },
        { title: "מגדירים את ההיקף.", copy: "מסכמים את העמודים, היכולות, סבבי התיקונים ותוכנית התחזוקה, ומוציאים חשבונית. חבילות האתר הרגילות משולמות במלואן לפני תחילת העבודה. קובעים את לוח הזמנים כשהתשלום והתוכן הדרוש מוכנים.", output: "היקף, מחיר ולוח זמנים מוסכמים." },
        { title: "נותנים לרעיון צורה.", copy: "מפתחים כיוון עיצובי סביב המותג שלכם ומציגים אותו לאישור לפני הפיתוח. אחר כך בונים את האתר למובייל ולמחשב, עם עדכוני התקדמות ונקודות בדיקה למשוב שלכם.", output: "כיוון מאושר ותצוגה מקדימה של אתר עובד." },
        { title: "מדייקים ביחד.", copy: "עוברים על התצוגה המקדימה ושולחים משוב. Launch כולל 2 סבבי תיקונים, Growth כולל 3 ו־Pro כולל 4. משלימים את הסבבים שכלולים בחבילה. תוספות מעבר להיקף המוסכם מתומחרות בנפרד.", output: "תוכן בדוק, תיקונים מוסכמים ואישור להשקה." },
        { title: "מוכנים לצאת לעולם.", copy: "מחברים את הדומיין, מגדירים SSL ובודקים את העמודים, הקישורים והטפסים לפני ההשקה. לאחר האישור שלכם, האתר עולה לאוויר. האירוח, העדכונים והתמיכה ממשיכים דרך תוכנית התחזוקה.", output: "האתר שלכם באוויר, עם דרך ברורה לקבלת תמיכה." },
      ], interlude: "רואים את הכיוון. לפני שמתחילים לבנות.", interludeCopy: "העיצוב והפיתוח הם חלק מאותה שיחה. המשוב שלכם מעצב את העבודה בנקודות ברורות לאורך הדרך.", timingTitle: "מקבלים תמונה של לוח הזמנים.", timingLead: "הערכות זמן לבנייה בימי עסקים, לאחר שהתוכן שסוכם והתשלום מוכנים. ההיקף, האישורים והמשוב יכולים להשפיע על לוח הזמנים. מאשרים יחד את התוכנית לפני שמתחילים.", days: "ימי עסקים", from: "בנייה החל מ־", careNote: "בנייה בתשלום חד־פעמי + אירוח ותחזוקה שוטפים החל מ־€69 לחודש. לפרויקטים מותאמים נקבע לוח זמנים בנפרד.", helpTitle: "הצעד הראשון הוא שיחה.", helpCopy: "שאלו אותנו על הרעיון שלכם, על התהליך או על החבילה המתאימה. שיחת הייעוץ הראשונה ללא עלות וללא התחייבות.",
    }, consultation: "לשיחת ייעוץ ללא עלות", processLink: "כך אנחנו עובדים", servicesLink: "לכל השירותים שלנו", pricingLink: "להשוואת חבילות ומחירים", questionsLink: "יש שאלות? מתחילים כאן",
  },
};

export const studioRoute = (locale: SiteLanguage, path: string) => `${locale === "en" ? "" : `/${locale}`}/${path}/`;
