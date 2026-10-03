import type { SiteLanguage } from "@/lib/routeLanguage";

type PricingCopy = {
  label: string; title: [string, string]; lead: string; steps: [string, string];
  assurance: string; buildTitle: string; buildIntro: string; bestFor: [string, string, string];
  recommended: string; once: string; recurring: string; choose: string; selected: string; compareLink: string;
  customLabel: string; customTitle: string; customNote: string; customCopy: string; customFeatures: string[]; quote: string;
  careTitle: string; careIntro: string; change: string; all: string; frequency: string; monthly: string; yearly: string;
  discount: string; billingNote: string; descriptions: [string, string]; badge: string; month: string; year: string;
  equivalent: string; paidMonthly: string; saving: string; eachYear: string; yearlyAvailable: string;
  features: string; selection: string; summaryTitle: string; summaryIntro: string; chooseBuild: string; chooseCare: string;
  buildCost: string; annualPaid: string; monthlyPaid: string; cta: string; help: string; reassurance: string;
  ownership: string; terms: string; tax: string; scope: string; scopeText: string;
  compareTitle: string; compareIntro: string; feature: string; included: string; excluded: string; scrollHint: string;
  questionsTitle: string; allQuestions: string; careQuestion: string; customQuestion: string;
  helpTitle: string; helpCopy: string; whatsapp: string;
};

export const PRICING_COPY: Record<SiteLanguage, PricingCopy> = {
  en: {
    label: "Transparent pricing", title: ["Web Design", "Pricing"],
    lead: "Built for you. Cared for by us. Choose your website, then the hosting & care that keeps it running.",
    steps: ["Your website", "Your ongoing care"],
    assurance: "One-time website build + required hosting & care from €69/month.",
    buildTitle: "Three clear plans.", buildIntro: "Start with what your business needs today. Each package has a clear scope, with the option to add more later.",
    bestFor: ["A confident first step.", "Turn interest into enquiries.", "A fuller story."],
    recommended: "Recommended", once: "one-time", recurring: "+ hosting & care from €69/month", choose: "Choose", selected: "Selected", compareLink: "Compare every feature",
    customLabel: "Built for your scope", customTitle: "Pricing tailored to your scope", customNote: "Quote based on scope",
    customCopy: "For projects beyond the standard packages, including integrations, multilingual sites, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, and unusual content volume.",
    customFeatures: ["Brand direction and visual identity", "CRM, booking and lead-capture integrations", "Multilingual websites and self-editing CMS", "Custom SEO strategy and performance reporting", "UX and content structure for your audience", "Advanced forms and automated lead routing", "AI or chatbot features where useful", "Dedicated project support and ongoing optimisation"], quote: "Discuss a custom project",
    careTitle: "Choose the care you need.", careIntro: "Hosting & care is required while we manage your website. We keep it online, look after its assets, and take care of the updates.",
    change: "Change", all: "Pairs with every website package", frequency: "Care billing frequency", monthly: "Monthly", yearly: "Yearly", discount: "Save with yearly", billingNote: "Same thoughtful care. Your choice of billing.",
    descriptions: ["The essentials, taken care of.", "A little more ambition. A lot more support."], badge: "Most complete", month: "/ month", year: "/ year", equivalent: "per month equivalent · paid yearly", paidMonthly: "Monthly, from the month after official launch", saving: "Save", eachYear: "each year", yearlyAvailable: "Yearly billing available at ~10% less",
    features: "What’s included", selection: "Your selection", summaryTitle: "Your website. Our ongoing care.", summaryIntro: "Choose a website and care plan, or let’s find your fit together.", chooseBuild: "Choose your website", chooseCare: "Choose your care", buildCost: "one-time build", annualPaid: "paid yearly", monthlyPaid: "paid monthly", cta: "Get a free consultation", help: "Help me choose", reassurance: "Free. No obligation. Your selection starts a conversation.",
    ownership: "Your paid-for website belongs to you. Hosting & care continues while we manage it. See the terms for ownership and handover details.", terms: "View terms", tax: "Prices exclude applicable taxes. Domain and third-party costs are agreed separately.",
    scope: "Beyond your care plan", scopeText: "New pages, copywriting, extra revision rounds beyond your package allowance, new integrations, redesigns, advanced or full SEO structure, and complex content migration are not included in either maintenance plan and are quoted separately.",
    compareTitle: "The details, side by side.", compareIntro: "Every package includes a responsive build, WhatsApp and social links, and basic SEO foundations. Here’s where they differ.", feature: "Feature", included: "Included", excluded: "Not included", scrollHint: "Scroll across to compare all three plans.",
    questionsTitle: "Good to know.", allQuestions: "Explore all questions", careQuestion: "Do I need a hosting & care plan?", customQuestion: "When is a project Enterprise / Custom?",
    helpTitle: "Not sure which package fits?", helpCopy: "Tell us what your business needs. We’ll help you find the right starting scope.", whatsapp: "Ask us on WhatsApp",
  },
  el: {
    label: "Ξεκάθαρες τιμές", title: ["Τιμές", "κατασκευής ιστοσελίδας"],
    lead: "Δύο απλά βήματα: διαλέγετε την ιστοσελίδα που σας ταιριάζει και μετά το πακέτο φιλοξενίας και συντήρησης που θα την κρατάει σε φόρμα.", steps: ["Η ιστοσελίδα σας", "Φιλοξενία και συντήρηση"],
    assurance: "Την κατασκευή την πληρώνετε μία φορά. Μετά χρειάζεται και πακέτο φιλοξενίας και συντήρησης, από €69/μήνα.",
    buildTitle: "Τρία πακέτα, ένα για κάθε στάδιο.", buildIntro: "Ξεκινήστε με ό,τι χρειάζεται η επιχείρησή σας σήμερα. Σε κάθε πακέτο βλέπετε ακριβώς τι περιλαμβάνει, κι αν αργότερα θέλετε κι άλλα, τα προσθέτουμε.",
    bestFor: ["Ένα σίγουρο πρώτο βήμα.", "Για να χτυπάει το τηλέφωνο.", "Όλο το πακέτο."],
    recommended: "Προτεινόμενο", once: "εφάπαξ", recurring: "+ φιλοξενία και συντήρηση από €69/μήνα", choose: "Επιλογή", selected: "Επιλέχθηκε", compareLink: "Δείτε τη σύγκριση αναλυτικά",
    customLabel: "Στα μέτρα του έργου σας", customTitle: "Τιμή προσαρμοσμένη στο εύρος του έργου σας", customNote: "Προσφορά ανάλογα με το έργο",
    customCopy: "Όταν χρειάζεστε κάτι πέρα από τα πακέτα: συνδέσεις με άλλα συστήματα, ιστοσελίδα σε πολλές γλώσσες, δυνατότητα να την ενημερώνετε μόνοι σας, AI ή chatbot, πιο σύνθετα animations, CRM, κρατήσεις ή πολύ περιεχόμενο.",
    customFeatures: ["Στρατηγική branding και οπτική ταυτότητα", "CRM, κρατήσεις και εργαλεία που μαζεύουν τα αιτήματα των πελατών σας", "Ιστοσελίδες σε πολλές γλώσσες, με διαχείριση από εσάς", "Στρατηγική SEO στα μέτρα σας και αναφορές για τα αποτελέσματα", "UX και δομή περιεχομένου για το κοινό σας", "Πιο σύνθετες φόρμες που στέλνουν κάθε αίτημα αυτόματα στο σωστό άτομο", "Λειτουργίες AI ή chatbot, όπου έχει νόημα", "Προσωπική υποστήριξη και συνεχείς βελτιώσεις"], quote: "Ας τα πούμε για το έργο σας",
    careTitle: "Συντήρηση χωρίς έγνοιες.", careIntro: "Όσο διαχειριζόμαστε την ιστοσελίδα σας, χρειάζεται πακέτο φιλοξενίας και συντήρησης. Εμείς την κρατάμε online, προσέχουμε τα αρχεία της και αναλαμβάνουμε τις ενημερώσεις, για να μη χρειάζεται να έχετε εσείς τον νου σας.",
    change: "Αλλαγή", all: "Ταιριάζει με κάθε πακέτο ιστοσελίδας", frequency: "Πώς θέλετε να πληρώνετε", monthly: "Μηνιαία", yearly: "Ετήσια", discount: "Οικονομία με ετήσια πληρωμή", billingNote: "Ίδια συντήρηση, όποιον τρόπο πληρωμής κι αν διαλέξετε.",
    descriptions: ["Όλα τα απαραίτητα, σε καλά χέρια.", "Περισσότερη βοήθεια, όποτε τη χρειάζεστε."], badge: "Το πιο πλήρες", month: "/ μήνα", year: "/ έτος", equivalent: "ανά μήνα κατά μέσο όρο · ετήσια πληρωμή", paidMonthly: "Κάθε μήνα, από τον μήνα μετά την επίσημη δημοσίευση", saving: "Εξοικονόμηση", eachYear: "τον χρόνο", yearlyAvailable: "Με ετήσια πληρωμή γλιτώνετε περίπου 10%",
    features: "Τι περιλαμβάνει", selection: "Η επιλογή σας", summaryTitle: "Με μια ματιά.", summaryIntro: "Διαλέξτε ιστοσελίδα και πακέτο συντήρησης, ή πείτε μας και θα βρούμε μαζί τι σας ταιριάζει.", chooseBuild: "Επιλέξτε ιστοσελίδα", chooseCare: "Επιλέξτε πακέτο συντήρησης", buildCost: "εφάπαξ κατασκευή", annualPaid: "ετήσια πληρωμή", monthlyPaid: "μηνιαία πληρωμή", cta: "Δωρεάν συμβουλευτική", help: "Βοηθήστε με να διαλέξω", reassurance: "Δωρεάν και χωρίς δέσμευση. Απλώς ξεκινάμε την κουβέντα.",
    ownership: "Μόλις εξοφληθεί, η ιστοσελίδα είναι δική σας. Η φιλοξενία και η συντήρηση συνεχίζονται όσο τη διαχειριζόμαστε εμείς. Όλες οι λεπτομέρειες για την ιδιοκτησία και την παράδοση είναι στους όρους.", terms: "Δείτε τους όρους", tax: "Οι τιμές δεν περιλαμβάνουν τυχόν φόρους. Το domain και οι υπηρεσίες τρίτων συμφωνούνται ξεχωριστά.",
    scope: "Τι δεν καλύπτει η συντήρηση", scopeText: "Νέες σελίδες, συγγραφή κειμένων, επιπλέον γύροι διορθώσεων, νέες συνδέσεις, επανασχεδιασμός, προχωρημένο SEO και σύνθετη μεταφορά περιεχομένου χρεώνονται ξεχωριστά.",
    compareTitle: "Οι λεπτομέρειες, δίπλα δίπλα.", compareIntro: "Όλα τα πακέτα έχουν προσαρμογή σε κινητά, WhatsApp, συνδέσμους για τα social media και τις βάσεις για το SEO. Εδώ βλέπετε τι αλλάζει από το ένα στο άλλο.", feature: "Λειτουργία", included: "Περιλαμβάνεται", excluded: "Δεν περιλαμβάνεται", scrollHint: "Σύρετε δεξιά-αριστερά για να δείτε και τα τρία πακέτα.",
    questionsTitle: "Καλό να το ξέρετε.", allQuestions: "Δείτε όλες τις ερωτήσεις", careQuestion: "Χρειάζομαι πακέτο φιλοξενίας και συντήρησης;", customQuestion: "Πότε ένα έργο θεωρείται Enterprise / Custom;",
    helpTitle: "Ποιο πακέτο σας ταιριάζει;", helpCopy: "Πείτε μας τι χρειάζεται η επιχείρησή σας. Θα βρούμε μαζί από πού να ξεκινήσετε.", whatsapp: "Ρωτήστε μας στο WhatsApp",
  },
  he: {
    label: "מחירים שקופים", title: ["מחירי", "עיצוב אתרים"], lead: "זה פשוט: בוחרים את האתר שמתאים לכם, ואחר כך את תוכנית האחסון והתחזוקה שתשמור עליו.", steps: ["האתר שלכם", "אחסון ותחזוקה"],
    assurance: "על בניית האתר משלמים פעם אחת, ואחסון ותחזוקה הם חובה, החל מ־€69 לחודש.",
    buildTitle: "שלוש חבילות ברורות.", buildIntro: "מתחילים ממה שהעסק צריך היום. בכל חבילה כתוב בדיוק מה כלול, ואם בהמשך תרצו עוד, פשוט מוסיפים.", bestFor: ["צעד ראשון, בראש שקט.", "כדי שהטלפון יתחיל לצלצל.", "בלי לוותר על כלום."],
    recommended: "מומלץ", once: "חד־פעמי", recurring: "+ אחסון ותחזוקה החל מ־€69 לחודש", choose: "בחירת", selected: "נבחר", compareLink: "להשוואת כל האפשרויות",
    customLabel: "תפור בדיוק עליכם", customTitle: "מחיר מותאם להיקף הפרויקט", customNote: "הצעת מחיר לפי היקף", customCopy: "כשצריך משהו מעבר לחבילות: חיבור למערכות אחרות, אתר בכמה שפות, אפשרות לערוך לבד, AI או צ׳אטבוט, CRM, הזמנות, אנימציות מורכבות או הרבה תוכן.",
    customFeatures: ["מיתוג וזהות ויזואלית", "חיבור ל-CRM, למערכת הזמנות ולאיסוף פניות", "אתר בכמה שפות, עם אפשרות לערוך לבד", "אסטרטגיית SEO מותאמת ודוחות על התוצאות", "חוויית משתמש ומבנה תוכן לקהל שלכם", "טפסים מתקדמים שמעבירים כל פנייה לאדם הנכון", "יכולות AI או צ׳אטבוט כשזה מתאים", "ליווי אישי לאורך הפרויקט ושיפורים שוטפים"], quote: "בואו נדבר על הפרויקט שלכם",
    careTitle: "תחזוקה בלי כאב ראש.", careIntro: "כל עוד אנחנו מנהלים את האתר שלכם, צריך תוכנית אחסון ותחזוקה. אנחנו דואגים שהאתר תמיד באוויר, מנהלים את הקבצים ומטפלים בעדכונים, כדי שאתם לא תצטרכו לחשוב על זה.",
    change: "שינוי", all: "מתאים לכל חבילת אתר", frequency: "איך נוח לכם לשלם", monthly: "חודשי", yearly: "שנתי", discount: "חיסכון בתשלום שנתי", billingNote: "אותה תחזוקה בדיוק, רק תבחרו איך נוח לכם לשלם.",
    descriptions: ["כל מה שצריך, בידיים טובות.", "יותר עזרה, בכל פעם שצריך."], badge: "המקיפה ביותר", month: "/ לחודש", year: "/ לשנה", equivalent: "לחודש בממוצע · בתשלום שנתי", paidMonthly: "בכל חודש, החל מהחודש שאחרי ההשקה הרשמית", saving: "חיסכון של", eachYear: "בשנה", yearlyAvailable: "בתשלום שנתי חוסכים כ־10%",
    features: "מה כלול", selection: "הבחירה שלכם", summaryTitle: "הבחירה שלכם במבט אחד.", summaryIntro: "בחרו אתר ותוכנית תחזוקה, או דברו איתנו ונמצא יחד את מה שמתאים לכם.", chooseBuild: "בחרו את האתר שלכם", chooseCare: "בחרו תוכנית תחזוקה", buildCost: "לבנייה, בתשלום חד־פעמי", annualPaid: "בתשלום שנתי", monthlyPaid: "בתשלום חודשי", cta: "לשיחת ייעוץ בחינם", help: "עזרו לי לבחור", reassurance: "בחינם וללא התחייבות. הבחירה שלכם היא רק נקודת פתיחה לשיחה.",
    ownership: "ברגע ששילמתם במלואו, האתר שלכם. האחסון והתחזוקה נמשכים כל עוד אנחנו מנהלים אותו, וכל הפרטים על בעלות והעברת האתר מופיעים בתנאי השירות.", terms: "לתנאי השירות", tax: "המחירים אינם כוללים מיסים ככל שחלים. עלויות דומיין ושירותי צד שלישי מוסכמות בנפרד.",
    scope: "מה לא כלול בתחזוקה", scopeText: "עמודים חדשים, כתיבת תוכן, סבבי תיקונים נוספים, חיבורים חדשים, עיצוב מחדש, SEO מתקדם והעברת תוכן מורכבת מתומחרים בנפרד.",
    compareTitle: "כל הפרטים, זה לצד זה.", compareIntro: "כל החבילות כוללות התאמה מלאה למובייל, WhatsApp, קישורים לרשתות החברתיות ויסודות SEO. כאן רואים מה משתנה בין חבילה לחבילה.", feature: "תכונה", included: "כלול", excluded: "לא כלול", scrollHint: "החליקו הצידה כדי לראות את שלוש החבילות.",
    questionsTitle: "כדאי לדעת.", allQuestions: "לכל השאלות והתשובות", careQuestion: "צריך תוכנית אחסון ותחזוקה?", customQuestion: "מתי פרויקט נחשב Enterprise / Custom?",
    helpTitle: "לא בטוחים איזו חבילה מתאימה?", helpCopy: "ספרו לנו מה העסק שלכם צריך, ונמצא יחד מאיפה הכי נכון להתחיל.", whatsapp: "שאלו אותנו ב-WhatsApp",
  },
};
