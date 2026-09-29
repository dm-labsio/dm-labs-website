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
    assurance: "A one-time website build + required hosting & care from €69/month. Clear from the start.",
    buildTitle: "Three clear plans.", buildIntro: "Start with what your business needs today. Each package has a clear scope, with the option to add more later.",
    bestFor: ["A confident first step.", "Turn interest into enquiries.", "A fuller story."],
    recommended: "Recommended", once: "one-time", recurring: "+ hosting & care from €69/month", choose: "Choose", selected: "Selected", compareLink: "Compare every feature",
    customLabel: "Built for your scope", customTitle: "Pricing tailored to your scope", customNote: "Quote based on scope",
    customCopy: "For projects beyond the standard packages, including integrations, multilingual sites, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, and unusual content volume.",
    customFeatures: ["Brand direction and visual identity", "CRM, booking and lead-capture integrations", "Multilingual websites and self-editing CMS", "Custom SEO strategy and performance reporting", "UX and content structure for your audience", "Advanced forms and automated lead routing", "AI or chatbot features where useful", "Dedicated project support and ongoing optimisation"], quote: "Discuss a custom project",
    careTitle: "Choose the care you need.", careIntro: "Hosting & care is required while we manage your website. We keep it online, look after its assets, and take care of the updates.",
    change: "Change", all: "Pairs with every website package", frequency: "Care billing frequency", monthly: "Monthly", yearly: "Yearly", discount: "Save ~10%", billingNote: "Same thoughtful care. Your choice of billing.",
    descriptions: ["The essentials, taken care of.", "A little more ambition. A lot more support."], badge: "Most complete", month: "/ month", year: "/ year", equivalent: "per month equivalent · paid yearly", paidMonthly: "Paid monthly · ongoing hosting & care", saving: "Save", eachYear: "each year", yearlyAvailable: "Yearly billing available at ~10% less",
    features: "What’s included", selection: "Your selection", summaryTitle: "Your website. Our ongoing care.", summaryIntro: "Choose a website and care plan, or let’s find your fit together.", chooseBuild: "Choose your website", chooseCare: "Choose your care", buildCost: "one-time build", annualPaid: "paid yearly", monthlyPaid: "paid monthly", cta: "Get a free consultation", help: "Help me choose", reassurance: "Free. No obligation. Your selection starts a conversation.",
    ownership: "Your paid-for website belongs to you. Hosting & care continues while we manage it. See the terms for ownership and handover details.", terms: "View terms", tax: "Prices exclude applicable taxes. Domain and third-party costs are agreed separately.",
    scope: "Beyond your care plan", scopeText: "New pages, copywriting, extra revision rounds beyond your package allowance, new integrations, redesigns, advanced or full SEO structure, and complex content migration are not included in either maintenance plan and are quoted separately.",
    compareTitle: "The details, side by side.", compareIntro: "Every package includes a responsive build, WhatsApp and social links, and basic SEO foundations. Here’s where they differ.", feature: "Feature", included: "Included", excluded: "Not included", scrollHint: "Scroll across to compare all three plans.",
    questionsTitle: "Good to know.", allQuestions: "Explore all questions", careQuestion: "Do I need a hosting & care plan?", customQuestion: "When is a project Enterprise / Custom?",
    helpTitle: "Not sure which package fits?", helpCopy: "Tell us what your business needs. We’ll help you find the right starting scope.", whatsapp: "Ask us on WhatsApp",
  },
  el: {
    label: "Διαφανείς τιμές", title: ["Τιμές", "Ιστοσελίδας"],
    lead: "Φτιαγμένη για εσάς. Με τη δική μας φροντίδα. Επιλέξτε ιστοσελίδα και μετά τη φιλοξενία και συντήρησή της.", steps: ["Η ιστοσελίδα σας", "Η συνεχής φροντίδα σας"],
    assurance: "Εφάπαξ κατασκευή ιστοσελίδας + υποχρεωτική φιλοξενία & φροντίδα από €69/μήνα. Ξεκάθαρα από την αρχή.",
    buildTitle: "Τρία ξεκάθαρα πακέτα.", buildIntro: "Ξεκινήστε με όσα χρειάζεται η επιχείρησή σας σήμερα. Κάθε πακέτο έχει σαφές εύρος, με δυνατότητα να προσθέσουμε περισσότερα αργότερα.",
    bestFor: ["Ένα σίγουρο πρώτο βήμα.", "Από το ενδιαφέρον στην επικοινωνία.", "Μια πιο ολοκληρωμένη ιστορία."],
    recommended: "Προτείνεται", once: "εφάπαξ", recurring: "+ φιλοξενία & φροντίδα από €69/μήνα", choose: "Επιλογή", selected: "Επιλέχθηκε", compareLink: "Σύγκριση όλων των λειτουργιών",
    customLabel: "Στα μέτρα του έργου σας", customTitle: "Τιμή προσαρμοσμένη στο εύρος του έργου σας", customNote: "Προσφορά βάσει του έργου",
    customCopy: "Για έργα πέρα από τα βασικά πακέτα: ενσωματώσεις, πολυγλωσσικές ιστοσελίδες, CMS για αυτοδιαχείριση, λειτουργίες AI ή chatbot, σύνθετη κίνηση, CRM, κρατήσεις ή μεγάλο όγκο περιεχομένου.",
    customFeatures: ["Στρατηγική branding και οπτική ταυτότητα", "CRM, κρατήσεις και ενσωματώσεις συλλογής επαφών", "Πολυγλωσσικές ιστοσελίδες και CMS για αυτοδιαχείριση", "Εξατομικευμένη στρατηγική SEO και αναφορές απόδοσης", "UX και δομή περιεχομένου για το κοινό σας", "Προηγμένες φόρμες και αυτοματοποιημένη δρομολόγηση αιτημάτων", "Λειτουργίες AI ή chatbot όπου είναι χρήσιμες", "Προσωπική υποστήριξη έργου και συνεχής βελτιστοποίηση"], quote: "Ας συζητήσουμε το έργο σας",
    careTitle: "Η φροντίδα που χρειάζεστε.", careIntro: "Η φιλοξενία & φροντίδα είναι απαραίτητη όσο διαχειριζόμαστε την ιστοσελίδα σας. Την κρατάμε online, φροντίζουμε τα αρχεία της και αναλαμβάνουμε τις ενημερώσεις.",
    change: "Αλλαγή", all: "Συνδυάζεται με κάθε πακέτο ιστοσελίδας", frequency: "Συχνότητα χρέωσης", monthly: "Μηνιαία", yearly: "Ετήσια", discount: "−10% περίπου", billingNote: "Η ίδια φροντίδα. Η χρέωση που σας ταιριάζει.",
    descriptions: ["Όλα τα απαραίτητα, σε καλά χέρια.", "Περισσότερες δυνατότητες. Περισσότερη υποστήριξη."], badge: "Πιο πλήρες", month: "/ μήνα", year: "/ έτος", equivalent: "ανά μήνα κατά μέσο όρο · ετήσια πληρωμή", paidMonthly: "Μηνιαία πληρωμή · συνεχής φιλοξενία & φροντίδα", saving: "Εξοικονόμηση", eachYear: "τον χρόνο", yearlyAvailable: "Ετήσια χρέωση με περίπου 10% χαμηλότερο κόστος",
    features: "Τι περιλαμβάνει", selection: "Η επιλογή σας", summaryTitle: "Η ιστοσελίδα σας. Η φροντίδα μας.", summaryIntro: "Επιλέξτε ιστοσελίδα και φροντίδα ή ας βρούμε μαζί τι σας ταιριάζει.", chooseBuild: "Επιλέξτε ιστοσελίδα", chooseCare: "Επιλέξτε φροντίδα", buildCost: "εφάπαξ κατασκευή", annualPaid: "ετήσια πληρωμή", monthlyPaid: "μηνιαία πληρωμή", cta: "Δωρεάν συμβουλευτική", help: "Βοηθήστε με να επιλέξω", reassurance: "Δωρεάν. Χωρίς δέσμευση. Η επιλογή σας ξεκινά μια συζήτηση.",
    ownership: "Η εξοφλημένη ιστοσελίδα ανήκει σε εσάς. Η φιλοξενία & φροντίδα συνεχίζεται όσο τη διαχειριζόμαστε. Οι όροι εξηγούν τις λεπτομέρειες ιδιοκτησίας και παράδοσης.", terms: "Δείτε τους όρους", tax: "Οι τιμές δεν περιλαμβάνουν τυχόν φόρους. Domain και υπηρεσίες τρίτων συμφωνούνται ξεχωριστά.",
    scope: "Πέρα από το πλάνο φροντίδας", scopeText: "Νέες σελίδες, συγγραφή κειμένων, επιπλέον γύροι αναθεωρήσεων, νέες ενσωματώσεις, επανασχεδιασμός, προηγμένο SEO και σύνθετη μεταφορά περιεχομένου κοστολογούνται ξεχωριστά.",
    compareTitle: "Οι λεπτομέρειες, δίπλα δίπλα.", compareIntro: "Όλα τα πακέτα περιλαμβάνουν responsive κατασκευή, WhatsApp, social links και βασικές SEO βάσεις. Δείτε τι διαφέρει.", feature: "Λειτουργία", included: "Περιλαμβάνεται", excluded: "Δεν περιλαμβάνεται", scrollHint: "Κυλήστε οριζόντια για να συγκρίνετε και τα τρία πακέτα.",
    questionsTitle: "Χρήσιμο να γνωρίζετε.", allQuestions: "Δείτε όλες τις ερωτήσεις", careQuestion: "Χρειάζομαι πλάνο φιλοξενίας και φροντίδας;", customQuestion: "Πότε ένα έργο είναι Enterprise / Custom;",
    helpTitle: "Ποιο πακέτο σας ταιριάζει;", helpCopy: "Πείτε μας τι χρειάζεται η επιχείρησή σας. Θα βρούμε μαζί από πού να ξεκινήσετε.", whatsapp: "Ρωτήστε μας στο WhatsApp",
  },
  he: {
    label: "מחירים שקופים", title: ["מחירי", "עיצוב אתרים"], lead: "נבנה בשבילכם. מטופל על ידינו. בחרו את האתר שלכם, ואז את האירוח והתחזוקה שלו.", steps: ["האתר שלכם", "התחזוקה השוטפת שלכם"],
    assurance: "בניית אתר בתשלום חד־פעמי + אירוח ותחזוקה חובה החל מ־€69 לחודש. ברור מההתחלה.",
    buildTitle: "שלוש חבילות ברורות.", buildIntro: "מתחילים במה שהעסק שלכם צריך היום. לכל חבילה יש היקף ברור, עם אפשרות להוסיף בהמשך.", bestFor: ["צעד ראשון בביטחון.", "מהתעניינות לפניות חדשות.", "תוכן עשיר יותר."],
    recommended: "מומלץ", once: "חד־פעמי", recurring: "+ אירוח ותחזוקה החל מ־€69 לחודש", choose: "בחירת", selected: "נבחר", compareLink: "להשוואת כל האפשרויות",
    customLabel: "נבנה לפי ההיקף שלכם", customTitle: "מחיר מותאם להיקף הפרויקט", customNote: "הצעת מחיר לפי היקף", customCopy: "לאינטגרציות, אתרים רב־לשוניים, CMS, AI, צ׳אטבוטים, CRM, הזמנות, אנימציות מורכבות או נפח תוכן חריג.",
    customFeatures: ["כיוון מותגי וזהות ויזואלית", "אינטגרציות CRM, הזמנות ואיסוף פניות", "אתר רב־לשוני ו-CMS לעריכה עצמית", "אסטרטגיית SEO ודוחות ביצועים מותאמים", "חוויית משתמש ומבנה תוכן לקהל שלכם", "טפסים מתקדמים וניתוב פניות אוטומטי", "יכולות AI או צ׳אטבוט כשזה מתאים", "ליווי של מנהל פרויקט ואופטימיזציה שוטפת"], quote: "בואו נדבר על הפרויקט שלכם",
    careTitle: "התחזוקה שמתאימה לכם.", careIntro: "אירוח ותחזוקה נדרשים כל עוד אנחנו מנהלים את האתר שלכם. אנחנו שומרים עליו זמין, מנהלים את הקבצים ודואגים לעדכונים.",
    change: "שינוי", all: "מתאים לכל חבילת אתר", frequency: "תדירות התשלום", monthly: "חודשי", yearly: "שנתי", discount: "כ־10% הנחה", billingNote: "אותה תשומת לב. תדירות התשלום שמתאימה לכם.",
    descriptions: ["כל מה שצריך, בידיים טובות.", "יותר אפשרויות. יותר תמיכה."], badge: "המקיפה ביותר", month: "/ לחודש", year: "/ לשנה", equivalent: "לחודש בממוצע · בתשלום שנתי", paidMonthly: "תשלום חודשי · אירוח ותחזוקה שוטפים", saving: "חיסכון של", eachYear: "בשנה", yearlyAvailable: "בתשלום שנתי חוסכים כ־10%",
    features: "מה כלול", selection: "הבחירה שלכם", summaryTitle: "האתר שלכם. התחזוקה שלנו.", summaryIntro: "בחרו אתר ותוכנית תחזוקה, או שנמצא יחד את מה שמתאים לכם.", chooseBuild: "בחרו את האתר שלכם", chooseCare: "בחרו תוכנית תחזוקה", buildCost: "לבנייה, בתשלום חד־פעמי", annualPaid: "בתשלום שנתי", monthlyPaid: "בתשלום חודשי", cta: "לשיחת ייעוץ ללא עלות", help: "עזרו לי לבחור", reassurance: "ללא עלות וללא התחייבות. הבחירה שלכם היא התחלה לשיחה.",
    ownership: "האתר ששולם במלואו שייך לכם. האירוח והתחזוקה נמשכים כל עוד אנחנו מנהלים אותו. פרטי הבעלות והעברת האתר מופיעים בתנאי השירות.", terms: "לתנאי השירות", tax: "המחירים אינם כוללים מיסים ככל שחלים. עלויות דומיין ושירותי צד שלישי מוסכמות בנפרד.",
    scope: "מעבר לתוכנית התחזוקה", scopeText: "עמודים חדשים, כתיבה, סבבי תיקונים נוספים, אינטגרציות, עיצוב מחדש, SEO מתקדם והעברת תוכן מורכבת מתומחרים בנפרד.",
    compareTitle: "כל הפרטים, זה לצד זה.", compareIntro: "כל החבילות כוללות התאמה למובייל, WhatsApp, קישורים לרשתות חברתיות ויסודות SEO. כאן רואים את ההבדלים.", feature: "תכונה", included: "כלול", excluded: "לא כלול", scrollHint: "גללו לרוחב להשוואה בין שלוש החבילות.",
    questionsTitle: "כדאי לדעת.", allQuestions: "לכל השאלות והתשובות", careQuestion: "צריך תוכנית אירוח ותחזוקה?", customQuestion: "מתי פרויקט נחשב Enterprise / Custom?",
    helpTitle: "לא בטוחים איזו חבילה מתאימה?", helpCopy: "שתפו אותנו במה שהעסק שלכם צריך. נמצא יחד נקודת פתיחה מתאימה.", whatsapp: "שאלו אותנו בוואטסאפ",
  },
};
