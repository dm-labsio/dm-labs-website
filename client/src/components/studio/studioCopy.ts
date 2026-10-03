import type { SiteLanguage } from "@/lib/routeLanguage";

export const CAPABILITY_IDS = ["custom-design", "mobile-first", "seo", "performance", "security", "maps", "forms", "social", "turnaround"] as const;
type StudioCopy = {
  services: { label: string; title: [string, string]; lead: string; capabilitiesTitle: string; capabilitiesLead: string; capabilities: readonly [string, string][]; helpTitle: string; helpCopy: string };
  process: { label: string; title: [string, string]; lead: string; nav: [string]; journeyTitle: string; journeyLead: string; outcome: string; steps: readonly { title: string; copy: string; output: string }[]; interlude: string; interludeCopy: string; helpTitle: string; helpCopy: string };
  consultation: string; processLink: string; servicesLink: string; pricingLink: string; questionsLink: string;
};

export const STUDIO_COPY: Record<SiteLanguage, StudioCopy> = {
  en: {
    services: {
      label: "Design. Build. Care.", title: ["Your business.", "An unmistakable presence."],
      lead: "Design that feels like you. A website that works for your visitors. Care that keeps it moving.",

      capabilitiesTitle: "Good design goes deeper.", capabilitiesLead: "Explore each service to see what it can bring to your business.",
      capabilities: [
        ["A design that’s yours", "A visual direction shaped around your brand, content and audience."],
        ["Made for mobile", "Layouts and interactions considered for phones, tablets and desktop."],
        ["Search foundations", "A clear page structure, useful metadata and the foundations for search visibility."],
        ["Performance in mind", "Considered code and optimized assets to keep the experience responsive."],
        ["Secure connections", "HTTPS and an SSL certificate as part of your managed hosting."],
        ["A place on the map", "An embedded map that helps visitors find your business."],
        ["A clear way to enquire", "Contact forms that route the right information to your inbox."],
        ["Your channels, connected", "Simple routes to WhatsApp and your social profiles."],
        ["From delivery to care", "A considered launch, with a team to turn to as your website evolves."],
      ],

      helpTitle: "Tell us what you have in mind.", helpCopy: "A new business, a fresh direction or a site that needs to work harder. Let’s find your next step.",
    },
    process: {
      label: "A clear path, together", title: ["From your first idea", "to your next chapter."], lead: "You bring the business. We bring the design and the build. Here’s how we take it from a conversation to a website you’re ready to share.", nav: ["The five steps"],
      journeyTitle: "You’ll know what comes next.", journeyLead: "A shared direction, clear feedback points and a real person to talk to. Five steps, with you involved along the way.", outcome: "What we agree", steps: [
        { title: "Start with a conversation.", copy: "A free 15–20 minute discovery call, usually on WhatsApp. We talk about your business, your audience and what the website needs to do. Then we help you choose a suitable package.", output: "Your priorities and a recommended starting point." },
        { title: "Make the scope clear.", copy: "We confirm the pages, features, revision rounds and care plan, then issue your invoice. Standard website builds are paid in full before work begins. We agree the schedule once payment and the required content are ready.", output: "An agreed scope, price and project schedule." },
        { title: "Give the idea a shape.", copy: "We develop a design direction around your brand and share it for approval before development. Then we build the site for mobile and desktop, with progress updates and review points for your feedback.", output: "An approved direction and a working website preview." },
        { title: "Refine it together.", copy: "Review the preview and send your feedback. Launch includes 2 revision rounds, Growth includes 3 and Pro includes 4. We work through the included rounds; additions beyond the agreed scope are quoted separately.", output: "Reviewed content, agreed revisions and approval to launch." },
        { title: "Ready for the real world.", copy: "We connect your domain, configure SSL and check the pages, links and forms before launch. Once you approve, your site goes live. Hosting, updates and support continue through your care plan.", output: "Your live website and a clear route to ongoing support." },
      ], interlude: "A direction you can see. Before we build.", interludeCopy: "Design and development are part of the same conversation. Your feedback shapes the work at clear checkpoints.", helpTitle: "The first step is a conversation.", helpCopy: "Ask us anything about your idea, the process or the right package. Your first consultation is free, with no obligation.",
    }, consultation: "Get a free consultation", processLink: "See how we work", servicesLink: "Explore our services", pricingLink: "Compare packages & pricing", questionsLink: "Questions? Start here",
  },
  el: {
    services: {
      label: "Υπηρεσίες κατασκευής ιστοσελίδων",
      title: ["Όλα όσα χρειάζεται", "η ιστοσελίδα σας."],
      lead: "Φτιάχνουμε ιστοσελίδες για επιχειρήσεις, από την αρχή μέχρι το τέλος: τις σχεδιάζουμε, τις στήνουμε, φροντίζουμε να σας βρίσκουν στο Google, και αφού βγει η ιστοσελίδα στον αέρα, συνεχίζουμε να την προσέχουμε. Εσείς δεν χρειάζεται να ασχοληθείτε με τίποτα τεχνικό.",
      capabilitiesTitle: "Τι μπορούμε να κάνουμε για εσάς.",
      capabilitiesLead: "Πατήστε σε μια υπηρεσία για να δείτε τι ακριβώς περιλαμβάνει.",
      capabilities: [
        ["Ιστοσελίδα στα μέτρα σας", "Σχεδιασμένη με βάση την επιχείρηση, τους πελάτες και το ύφος σας, όχι άλλη μια ιστοσελίδα από έτοιμο template."],
        ["Responsive σχεδιασμός", "Πολλοί πελάτες θα μπουν στην ιστοσελίδα σας από το κινητό. Γι’ αυτό τη σχεδιάζουμε πρώτα για τη μικρή οθόνη και μετά για tablet και υπολογιστή."],
        ["Εμφάνιση στο Google (SEO)", "Σωστή δομή, τίτλοι και περιγραφές σε κάθε σελίδα, για να καταλαβαίνει το Google τι κάνετε."],
        ["Ταχύτητα φόρτωσης", "Καθαρός κώδικας και ελαφριές εικόνες, για να ανοίγει η ιστοσελίδα γρήγορα. Κανείς δεν περιμένει μια σελίδα που αργεί."],
        ["Ασφάλεια και συντήρηση", "Πιστοποιητικό SSL, φιλοξενία που διαχειριζόμαστε εμείς και συντήρηση μέσα από το πακέτο που έχετε."],
        ["Google Maps και τοποθεσία", "Χάρτης Google μέσα στην ιστοσελίδα, για να σας βρίσκουν οι πελάτες με ένα πάτημα, χωρίς να ψάχνουν τη διεύθυνση."],
        ["Φόρμες επικοινωνίας", "Μια απλή φόρμα, και τα μηνύματα έρχονται κατευθείαν στο email σας, με όλα τα στοιχεία που χρειάζεστε για να απαντήσετε."],
        ["Social media και WhatsApp", "Κουμπί WhatsApp και σύνδεσμοι για Instagram, Facebook και τα υπόλοιπα, για να σας βρίσκουν και να σας γράφουν εύκολα."],
        ["Γρήγορη παράδοση", "Οργανωμένη δημοσίευση, και αφού η ιστοσελίδα βγει στον αέρα, συνεχίζουμε να είμαστε δίπλα σας."],
      ],
      helpTitle: "Δεν είστε σίγουροι τι χρειάζεστε;",
      helpCopy: "Κανένα πρόβλημα, έτσι ξεκινάνε πολλοί. Στείλτε μας ένα μήνυμα με δυο λόγια για την επιχείρησή σας, και θα σας πούμε ειλικρινά τι αξίζει να κάνετε και τι όχι.",
    },
    process: {
      label: "Πώς κατασκευάζουμε ιστοσελίδες",
      title: ["Από την ιδέα σας", "σε μια ιστοσελίδα που δουλεύει."],
      lead: "Εσείς ξέρετε την επιχείρησή σας καλύτερα από τον καθένα, εμείς ξέρουμε να φτιάχνουμε ιστοσελίδες. Έτσι δουλεύουμε, από την πρώτη κουβέντα μέχρι να βγει η ιστοσελίδα στον αέρα.",
      nav: ["Τα πέντε βήματα"],
      journeyTitle: "Ξέρετε πάντα ποιο είναι το επόμενο βήμα.",
      journeyLead: "Από την αρχή ξέρετε τι θα γίνει και πότε, σας ενημερώνουμε σε όλη τη διαδρομή, και υπάρχει πάντα κάποιος που ξέρει το έργο σας και σας απαντά. Πέντε βήματα, και σε όλα έχετε λόγο.",
      outcome: "Τι συμφωνούμε",
      steps: [
        { title: "Ξεκινάμε με μια κουβέντα.", copy: "Μια σύντομη, δωρεάν γνωριμία 15–20 λεπτών, συνήθως στο WhatsApp. Μας λέτε για την επιχείρηση, για τους πελάτες σας και τι θέλετε να κάνει η ιστοσελίδα, και σας βοηθάμε να διαλέξετε το πακέτο που σας ταιριάζει.", output: "Τι είναι πιο σημαντικό για εσάς και από πού αξίζει να ξεκινήσουμε." },
        { title: "Κλείνουμε τι ακριβώς θα γίνει.", copy: "Συμφωνούμε ποιες σελίδες και λειτουργίες θα έχει η ιστοσελίδα, πόσους γύρους διορθώσεων και ποιο πακέτο συντήρησης, και σας στέλνουμε τιμολόγιο. Τα στάνταρ πακέτα πληρώνονται ολόκληρα πριν ξεκινήσουμε. Μόλις γίνει η πληρωμή και έχουμε το υλικό σας, ορίζουμε και ημερομηνίες.", output: "Τι θα γίνει, πόσο κοστίζει και πότε θα είναι έτοιμο." },
        { title: "Σχεδιάζουμε και χτίζουμε.", copy: "Πρώτα σας δείχνουμε τον σχεδιασμό, και μόνο αφού τον εγκρίνετε ξεκινάμε την κατασκευή. Η ιστοσελίδα φτιάχνεται για κινητό και υπολογιστή, σας ενημερώνουμε στην πορεία και σας λέμε πότε είναι η σειρά σας να πείτε τη γνώμη σας.", output: "Εγκεκριμένος σχεδιασμός και μια προεπισκόπηση που μπορείτε ήδη να δοκιμάσετε." },
        { title: "Διορθώνουμε και βάζουμε τις τελευταίες πινελιές.", copy: "Δοκιμάζετε την ιστοσελίδα και μας στέλνετε τα σχόλιά σας. Στο Launch έχετε 2 γύρους διορθώσεων, στο Growth 3 και στο Pro 4. Κάνουμε όλους τους γύρους που περιλαμβάνει το πακέτο, και ό,τι βγαίνει έξω από τα συμφωνημένα το κοστολογούμε ξεχωριστά.", output: "Ελεγμένο περιεχόμενο, οι διορθώσεις που συμφωνήσαμε και το «ναι» σας για δημοσίευση." },
        { title: "Βγαίνουμε στον αέρα.", copy: "Συνδέουμε το domain, ρυθμίζουμε το SSL και ελέγχουμε ότι όλες οι σελίδες, οι σύνδεσμοι και οι φόρμες δουλεύουν. Μας λέτε «προχωράμε», και η ιστοσελίδα είναι online. Από εκεί και πέρα, η φιλοξενία, οι ενημερώσεις και η υποστήριξη συνεχίζονται μέσα από το πακέτο συντήρησης.", output: "Η ιστοσελίδα σας online, κι εμείς δίπλα σας για ό,τι χρειαστεί." },
      ],
      interlude: "Βλέπετε τον σχεδιασμό πριν χτίσουμε.",
      interludeCopy: "Ο σχεδιασμός και η κατασκευή πάνε χέρι χέρι, και σε κάθε βήμα βλέπετε τη δουλειά και λέτε τη γνώμη σας.",
      helpTitle: "Το πρώτο βήμα είναι μια κουβέντα.",
      helpCopy: "Ρωτήστε μας ό,τι θέλετε για την ιδέα σας, για το πώς δουλεύουμε ή για το ποιο πακέτο σας ταιριάζει. Η πρώτη συμβουλευτική είναι δωρεάν και χωρίς καμία δέσμευση.",
    },
    consultation: "Δωρεάν συμβουλευτική",
    processLink: "Δείτε πώς δουλεύουμε",
    servicesLink: "Δείτε τις υπηρεσίες μας",
    pricingLink: "Σύγκριση πακέτων και τιμών",
    questionsLink: "Έχετε απορίες; Ξεκινήστε από εδώ",
  },
  he: {
    services: {
      label: "שירותי עיצוב ובניית אתרים",
      title: ["כל מה שהאתר שלכם צריך,", "במקום אחד."],
      lead: "אנחנו בונים אתר שמציג את העסק שלכם כמו שמגיע לו להיראות, דואגים שגוגל יבין מה אתם עושים ושומרים עליו גם אחרי ההשקה. אתם ממשיכים לעבוד, ואת כל הצד הטכני תשאירו לנו.",
      capabilitiesTitle: "מה אנחנו עושים בשבילכם.",
      capabilitiesLead: "לחצו על שירות כדי לראות בדיוק מה הוא כולל.",
      capabilities: [
        ["עיצוב אתרים בהתאמה אישית", "אתר שמעוצב לפי העסק, הלקוחות והסגנון שלכם, ולא עוד אתר מתבנית שנראה כמו כולם."],
        ["התאמה מושלמת למובייל", "הרבה מהלקוחות שלכם ייכנסו לאתר מהמובייל, אז קודם כול מתכננים אותו למסך הקטן, ורק אחר כך לטאבלט ולמחשב."],
        ["קידום אורגני (SEO)", "מבנה נכון, כותרות ותיאורים בכל עמוד, כדי שלגוגל יהיה קל להבין מה אתם עושים."],
        ["מהירות טעינה", "קוד נקי ותמונות קלות, כדי שהאתר ייפתח מהר. אף אחד לא מחכה לאתר שנטען לאט."],
        ["אבטחה ותחזוקה", "חיבור מאובטח ותעודת SSL, כחלק מהאחסון שאנחנו מנהלים בשבילכם."],
        ["מפה ומיקום", "מפת Google באתר, כדי שלקוחות יגיעו אליכם בלחיצה אחת, בלי לחפש את הכתובת."],
        ["טפסי יצירת קשר", "טופס שהפניות ממנו מגיעות ישר למייל שלכם, עם כל הפרטים שצריך כדי לחזור ללקוח."],
        ["רשתות חברתיות ו־WhatsApp", "כפתור WhatsApp וקישורים לאינסטגרם, לפייסבוק ולשאר הרשתות, כדי שיהיה קל לפנות אליכם."],
        ["עולים לאוויר מהר", "השקה מסודרת, ואחרי שהאתר באוויר אנחנו ממשיכים ללוות אתכם."],
      ],
      helpTitle: "לא בטוחים מה אתם צריכים?",
      helpCopy: "זה בסדר גמור, ככה הרבה עסקים מתחילים. שלחו לנו הודעה, ספרו בכמה מילים על העסק, ונגיד לכם בכנות מה שווה לעשות ומה לא.",
    },
    process: {
      label: "תהליך בניית אתר",
      title: ["מהרעיון שלכם", "לאתר שעובד בשבילכם."],
      lead: "אתם מכירים את העסק הכי טוב, ואנחנו יודעים לבנות אתרים. ככה זה עובד אצלנו, מהשיחה הראשונה ועד שהאתר באוויר.",
      nav: ["חמשת השלבים"],
      journeyTitle: "תמיד תדעו מה השלב הבא.",
      journeyLead: "כבר מההתחלה ברור מה עושים ומתי, אנחנו מעדכנים אתכם לאורך הדרך, ותמיד יש מישהו שמכיר את הפרויקט ועונה לכם. חמישה שלבים, ובכל אחד מהם אתם בתמונה.",
      outcome: "מה מסכמים",
      steps: [
        { title: "מתחילים בשיחה.", copy: "שיחת היכרות קצרה בחינם, 15–20 דקות, בדרך כלל ב־WhatsApp. תספרו לנו על העסק, על הלקוחות ועל מה שאתם רוצים שהאתר יעשה, ונעזור לכם לבחור את החבילה שהכי מתאימה לכם.", output: "מה הכי חשוב לכם, ומאיפה כדאי להתחיל." },
        { title: "סוגרים מה בדיוק עושים.", copy: "מחליטים יחד אילו עמודים ויכולות יהיו באתר, כמה סבבי תיקונים ואיזו תוכנית תחזוקה, ושולחים לכם חשבונית. בחבילות הרגילות משלמים את הסכום המלא לפני שמתחילים לעבוד. את לוח הזמנים קובעים ברגע שהתשלום התקבל וכל התוכן אצלנו.", output: "מה עושים, כמה זה עולה ומתי זה מוכן." },
        { title: "מעצבים ובונים.", copy: "קודם מראים לכם את העיצוב, ורק אחרי שאישרתם מתחילים לבנות. האתר נבנה למובייל ולמחשב, אנחנו מעדכנים אתכם בדרך ואומרים לכם מתי תורכם לתת הערות.", output: "עיצוב מאושר, וגרסה של האתר שאפשר כבר לגלוש בה." },
        { title: "מתקנים ומדייקים.", copy: "עוברים על האתר ושולחים לנו הערות. ב־Launch יש 2 סבבי תיקונים, ב־Growth יש 3 וב־Pro יש 4. אנחנו עושים את כל הסבבים שכלולים בחבילה, וכל מה שמעבר למה שסיכמנו מתומחר בנפרד.", output: "תוכן בדוק, התיקונים שסיכמנו והאישור שלכם לעלות לאוויר." },
        { title: "עולים לאוויר.", copy: "מחברים את הדומיין, מגדירים SSL ובודקים שכל העמודים, הקישורים והטפסים עובדים. אישרתם? האתר באוויר. מכאן והלאה, האחסון, העדכונים והתמיכה ממשיכים דרך תוכנית התחזוקה.", output: "האתר שלכם באוויר, ואנחנו כאן לכל מה שצריך." },
      ],
      interlude: "רואים את העיצוב לפני שבונים.",
      interludeCopy: "העיצוב והבנייה הולכים יחד, ובכל שלב אתם רואים את העבודה ואומרים מה דעתכם.",
      helpTitle: "הצעד הראשון הוא שיחה.",
      helpCopy: "שאלו אותנו כל מה שבא לכם על הרעיון, על התהליך או על החבילה שמתאימה לכם. שיחת הייעוץ הראשונה בחינם וללא התחייבות.",
    },
    consultation: "לשיחת ייעוץ בחינם",
    processLink: "כך אנחנו עובדים",
    servicesLink: "לכל השירותים שלנו",
    pricingLink: "להשוואת חבילות ומחירים",
    questionsLink: "יש שאלות? מתחילים כאן",
  },
};

export const studioRoute = (locale: SiteLanguage, path: string) => `${locale === "en" ? "" : `/${locale}`}/${path}/`;
