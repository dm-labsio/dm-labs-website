import type { SiteLanguage } from "@/lib/routeLanguage";

export const INDUSTRY_IDS = ["restaurant", "beauty", "clinic", "fitness", "realestate", "childcare", "architecture", "deli", "legal"] as const;
type IndustryCopy = { name: string; lead: string; benefits: [string, string, string] };

export const INDUSTRY_COPY: Record<SiteLanguage, readonly IndustryCopy[]> = {
  en: [
    { name: "Restaurants & cafés", lead: "Give people a taste before they arrive.", benefits: ["A menu that is easy to browse on a phone, with clear prices and dietary information.", "Your atmosphere, dishes and story, brought together in a distinctive visual experience.", "A clear route to reservations, directions and opening hours."] },
    { name: "Beauty & wellness", lead: "Let your work make the first impression.", benefits: ["Service menus that explain treatments, prices and what to expect.", "A considered gallery that gives your work the attention it deserves.", "A simple path to an appointment request or your existing booking system."] },
    { name: "Clinics & health", lead: "Make the first visit feel familiar.", benefits: ["Clear explanations of your services and the people providing them.", "Practical information about appointments, location and preparing for a visit.", "An easy way to request an appointment, with a contact flow suited to your practice."] },
    { name: "Fitness & sport", lead: "Turn a little curiosity into a first session.", benefits: ["Classes, training options and membership information people can compare at a glance.", "Introduce your coaches and show what training with you feels like.", "Make trial sessions, timetables and booking links easy to find on mobile."] },
    { name: "Real estate", lead: "Bring every property into focus.", benefits: ["Property galleries with useful details, floor plans and clear location information.", "Present your expertise and the neighbourhoods you know best.", "Turn interest into a viewing request with a focused enquiry form."] },
    { name: "Childcare", lead: "Help families get to know you.", benefits: ["Introduce your team, approach and age-group programmes in clear, welcoming language.", "Show the daily experience through thoughtfully chosen photographs and parent information.", "Make opening hours, admissions and arranging a visit simple to find."] },
    { name: "Architecture", lead: "Let the work lead the conversation.", benefits: ["A visual portfolio with photography, drawings and the story behind each project.", "Explain your approach and the stages of working with your practice.", "Give prospective clients a clear way to describe their project and contact you."] },
    { name: "Deli & food stores", lead: "Make your products worth a closer look.", benefits: ["Product collections that tell the story of ingredients, makers and provenance.", "Seasonal selections, gift ideas and a clear view of what is available.", "An easy route to your store, order enquiries or an existing online shop."] },
    { name: "Legal services", lead: "Clarity before the first conversation.", benefits: ["Explain your areas of practice in language prospective clients understand.", "Introduce your team, experience and approach to working with clients.", "Make it easy to find the right contact and request an initial conversation."] },
  ],
  el: [
    { name: "Εστιατόρια & καφέ", lead: "Να πάρουν μια γεύση πριν καν έρθουν.", benefits: ["Ευανάγνωστο μενού στο κινητό, με ξεκάθαρες τιμές και διατροφικές πληροφορίες.", "Η ατμόσφαιρα, τα πιάτα και η ιστορία σας σε μια ξεχωριστή οπτική εμπειρία.", "Κράτηση, οδηγίες και ωράριο, ένα πάτημα μακριά."] },
    { name: "Ομορφιά & ευεξία", lead: "Αφήστε τη δουλειά σας να μιλήσει πρώτη.", benefits: ["Κατάλογος υπηρεσιών με θεραπείες, τιμές και τι να περιμένει ο πελάτης.", "Μια γκαλερί που δίνει στη δουλειά σας την προσοχή που της αξίζει.", "Εύκολο αίτημα ραντεβού ή σύνδεση με το σύστημα κρατήσεων που ήδη χρησιμοποιείτε."] },
    { name: "Κλινικές & υγεία", lead: "Να νιώθουν ότι σας ξέρουν πριν από το πρώτο ραντεβού.", benefits: ["Κατανοητή παρουσίαση των υπηρεσιών σας και των ανθρώπων που τις παρέχουν.", "Χρήσιμες πληροφορίες για ραντεβού, πρόσβαση και προετοιμασία επίσκεψης.", "Ένας απλός τρόπος για αίτημα ραντεβού, προσαρμοσμένος στη λειτουργία του ιατρείου σας."] },
    { name: "Γυμναστήρια & αθλητισμός", lead: "Από την περιέργεια στην πρώτη προπόνηση.", benefits: ["Μαθήματα, επιλογές προπόνησης και συνδρομές που συγκρίνονται εύκολα.", "Γνωριμία με τους προπονητές και μια ιδέα για το πώς είναι να προπονείται κανείς σε εσάς.", "Δοκιμαστικά μαθήματα, πρόγραμμα και κρατήσεις, εύκολα προσβάσιμα από το κινητό."] },
    { name: "Ακίνητα", lead: "Κάθε ακίνητο, στο προσκήνιο.", benefits: ["Συλλογές φωτογραφιών με χρήσιμα στοιχεία, κατόψεις και πληροφορίες τοποθεσίας.", "Παρουσίαση της εμπειρίας σας και των περιοχών που γνωρίζετε καλά.", "Μια απλή φόρμα για να κλείσουν ραντεβού επίσκεψης όσο είναι ζεστοί."] },
    { name: "Παιδική φροντίδα", lead: "Βοηθήστε τις οικογένειες να σας γνωρίσουν.", benefits: ["Η ομάδα, η προσέγγιση και τα προγράμματα ανά ηλικία, με ζεστή και ξεκάθαρη γλώσσα.", "Η καθημερινή εμπειρία μέσα από προσεγμένες φωτογραφίες και πληροφορίες για γονείς.", "Ωράριο, εγγραφές και προγραμματισμός επίσκεψης σε ένα εύχρηστο σημείο."] },
    { name: "Αρχιτεκτονική", lead: "Αφήστε τα έργα σας να μιλήσουν.", benefits: ["Μια παρουσίαση έργων με φωτογραφίες, σχέδια και την ιστορία πίσω από το καθένα.", "Παρουσίαση της προσέγγισής σας και των σταδίων συνεργασίας με το γραφείο σας.", "Ένας ξεκάθαρος τρόπος για να περιγράψουν οι ενδιαφερόμενοι το έργο τους και να επικοινωνήσουν μαζί σας."] },
    { name: "Ντελικατέσεν & τρόφιμα", lead: "Προϊόντα που αξίζουν μια πιο κοντινή ματιά.", benefits: ["Συλλογές προϊόντων με την ιστορία των υλικών, των παραγωγών και της προέλευσής τους.", "Εποχικές επιλογές, ιδέες δώρων και ξεκάθαρη εικόνα της διαθεσιμότητας.", "Εύκολη πρόσβαση στο κατάστημα, σε αιτήματα παραγγελιών ή στο υπάρχον e-shop σας."] },
    { name: "Νομικές υπηρεσίες", lead: "Ο πελάτης ξέρει τι να περιμένει πριν από το πρώτο ραντεβού.", benefits: ["Οι τομείς ειδίκευσής σας σε γλώσσα που κατανοούν οι μελλοντικοί πελάτες.", "Παρουσίαση της ομάδας, της εμπειρίας και του τρόπου συνεργασίας σας.", "Εύκολη εύρεση του σωστού προσώπου επικοινωνίας και αίτημα για μια πρώτη συζήτηση."] },
  ],
  he: [
    { name: "מסעדות ובתי קפה", lead: "תנו טעימה עוד לפני שמגיעים.", benefits: ["תפריט שנוח לקרוא בנייד, עם מחירים ברורים ומידע על רכיבים והעדפות תזונתיות.", "האווירה, המנות והסיפור שלכם בחוויה חזותית עם אופי.", "דרך ברורה להזמנת מקום, הוראות הגעה ושעות פתיחה."] },
    { name: "יופי וטיפוח", lead: "תנו לעבודה שלכם ליצור את הרושם הראשון.", benefits: ["תפריט שירותים שמסביר על הטיפולים, המחירים ומה צפוי בביקור.", "גלריה מוקפדת שנותנת לעבודה שלכם את הבמה הראויה.", "דרך פשוטה לבקשת תור או למערכת ההזמנות הקיימת שלכם."] },
    { name: "קליניקות ובריאות", lead: "תחושת היכרות, עוד לפני הביקור הראשון.", benefits: ["הסברים ברורים על השירותים שלכם ועל אנשי הצוות שמעניקים אותם.", "מידע שימושי על תורים, מיקום והכנה לביקור.", "דרך נוחה לבקשת תור, בתהליך יצירת קשר שמתאים לקליניקה שלכם."] },
    { name: "כושר וספורט", lead: "מסקרנות קטנה לאימון הראשון.", benefits: ["שיעורים, אפשרויות אימון ומנויים שקל להשוות ביניהם.", "היכרות עם המאמנים והצצה לחוויית האימון אצלכם.", "אימוני ניסיון, מערכת שעות וקישורי הרשמה שקל למצוא גם בנייד."] },
    { name: "נדל״ן", lead: "כל נכס מקבל את תשומת הלב שלו.", benefits: ["גלריות נכסים עם פרטים שימושיים, תוכניות ומידע ברור על המיקום.", "הצגת הניסיון שלכם והיכרותכם עם האזורים שבהם אתם פועלים.", "טופס פשוט לתיאום ביקור בנכס, כל עוד הם חמים."] },
    { name: "מסגרות לגיל הרך", lead: "עזרו למשפחות להכיר אתכם.", benefits: ["היכרות עם הצוות, הגישה החינוכית והתוכניות לפי גיל, בשפה ברורה ומזמינה.", "הצצה לחיי היומיום דרך תמונות שנבחרו בקפידה ומידע להורים.", "שעות פעילות, הרשמה ותיאום ביקור שקל למצוא ולהבין."] },
    { name: "אדריכלות", lead: "תנו לעבודות שלכם לפתוח את השיחה.", benefits: ["תיק עבודות חזותי עם צילומים, שרטוטים והסיפור שמאחורי כל פרויקט.", "הסבר על הגישה שלכם ועל שלבי העבודה עם המשרד.", "דרך ברורה ללקוחות פוטנציאליים לתאר את הפרויקט שלהם וליצור קשר."] },
    { name: "מעדניות וחנויות מזון", lead: "מוצרים ששווה להכיר מקרוב.", benefits: ["קולקציות מוצרים שמספרות על חומרי הגלם, היצרנים והמקור שלהם.", "בחירות עונתיות, רעיונות למתנות ותמונה ברורה של מה שיש בחנות.", "דרך נוחה לחנות, לפניות בנוגע להזמנות או לחנות המקוונת הקיימת."] },
    { name: "שירותים משפטיים", lead: "בהירות לפני השיחה הראשונה.", benefits: ["הסבר על תחומי ההתמחות בשפה שלקוחות פוטנציאליים מבינים.", "היכרות עם הצוות, הניסיון ודרך העבודה מול לקוחות.", "דרך נוחה למצוא את איש הקשר המתאים ולבקש שיחה ראשונית."] },
  ],
};

export const INDUSTRY_UI = {
  en: { label: "Made for your world", title: "Your business. Its own story.", intro: "Explore what your website could do for your industry.", more: "Explore the possibilities", less: "Close details", contact: "Talk about your business", other: "Can’t find your industry?", otherCopy: "No problem. Tell us what you do and what you want your website to achieve. We’ll take it from there.", cta: "Ask us anything" },
  el: { label: "Για τον δικό σας κλάδο", title: "Κάθε επιχείρηση έχει τη δική της ιστορία.", intro: "Δείτε τι μπορεί να κάνει μια ιστοσελίδα για τον δικό σας χώρο.", more: "Δείτε τις δυνατότητες", less: "Κλείσιμο λεπτομερειών", contact: "Ας μιλήσουμε για την επιχείρησή σας", other: "Δεν βρίσκετε τον κλάδο σας;", otherCopy: "Κανένα πρόβλημα. Πείτε μας τι κάνετε και τι θέλετε να πετύχει η ιστοσελίδα σας. Τα υπόλοιπα τα συζητάμε μαζί.", cta: "Ρωτήστε μας ό,τι θέλετε" },
  he: { label: "בדיוק לתחום שלכם", title: "לכל עסק יש סיפור משלו.", intro: "תראו מה אתר טוב יכול לעשות בתחום שלכם.", more: "לגלות את האפשרויות", less: "סגירת הפרטים", contact: "בואו נדבר על העסק שלכם", other: "לא מצאתם את התחום שלכם?", otherCopy: "אין בעיה. ספרו לנו מה אתם עושים ומה תרצו שהאתר ישיג עבורכם. משם נמשיך יחד.", cta: "שאלו אותנו כל דבר" },
} as const;

export const INDUSTRY_IMAGES = [
  { src: "/media/brand-v1/restaurant-800.webp", small: "/media/brand-v1/restaurant-480.webp" },
  { src: "/media/brand-v1/beauty-800.webp", small: "/media/brand-v1/beauty-480.webp" },
  { src: "/media/brand-v1/clinic-800.webp", small: "/media/brand-v1/clinic-480.webp" },
  { src: "/media/brand-v1/fitness-800.webp", small: "/media/brand-v1/fitness-480.webp" },
  { src: "/media/brand-v1/realestate-800.webp", small: "/media/brand-v1/realestate-480.webp" },
  { src: "/media/brand-v1/childcare-800.webp", small: "/media/brand-v1/childcare-480.webp" },
  { src: "/media/brand-v1/architecture-800.webp", small: "/media/brand-v1/architecture-480.webp" },
  { src: "/media/brand-v1/deli-800.webp", small: "/media/brand-v1/deli-480.webp" },
  { src: "/media/brand-v1/legal-800.webp", small: "/media/brand-v1/legal-480.webp" },
] as const;
