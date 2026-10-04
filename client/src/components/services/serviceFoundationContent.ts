import type { SiteLanguage } from "@/lib/routeLanguage";
import type { FoundationService, ServiceFeature } from "./serviceFeatureContent";

export const FOUNDATION_FEATURES: Record<SiteLanguage, Record<FoundationService, ServiceFeature>> = {
  en: {
    seo: {
      name: "Search Foundations", title: ["A clearer path", "to being found."], lead: "Help the right people understand what you offer, from their first search to your next conversation.",
      intro: "Useful content and a well-organised website give search a stronger starting point. We build the foundations into your agreed pages, with the depth of work defined by your package.",
      principles: [
        ["Start with a real question.", "Understand what your audience is looking for. Clear service descriptions and useful answers connect their questions to your business."],
        ["Make the page easy to understand.", "Descriptive titles, headings and links give readers a clear route through your content. Relevant local information helps explain where you work."],
        ["Give search engines a clear route.", "Review crawlability, page information and the mobile experience. Search tools help us spot issues and decide what to improve next."],
      ],
      deliverables: ["Descriptive page titles and clear URLs", "Meta descriptions for the agreed pages", "A meaningful heading hierarchy and internal links", "Relevant structured data where included and appropriate", "Useful image descriptions and considered file names", "Sitemap and robots settings checked for launch", "Search Console and Analytics setup in Growth; Pro setup confirmed in your proposal", "Mobile experience and Core Web Vitals reviewed within scope", "Accurate service and location information for the areas you actually serve"],
      faqs: [
        { q: "Can you guarantee a position on Google?", a: "No. Search engines decide what to index and how to rank it. Changes take time and results depend on your content, competition and other factors. We focus on clear foundations and useful improvements." },
        { q: "What does my package include?", a: "Launch includes SEO foundations, Growth adds Search Console and Analytics setup, and Pro provides a fuller SEO structure. We confirm the exact setup in your proposal. Ongoing SEO campaigns, content production and link building are scoped separately; they are not automatically included in a care plan." },
        { q: "Who decides how my website appears in search?", a: "Google can choose different titles and snippets, and structured data does not guarantee an enhanced result. Submitting a sitemap also does not guarantee indexing." },
      ],
    },
    security: {
      name: "Security & Website Care", title: ["Care behind", "every visit."], lead: "A considered setup. Ongoing attention. A clear plan for the moments that need it.",
      intro: "A website needs care beyond launch. We combine a considered hosting setup with the monitoring, backups and support included in your active care plan.",
      principles: [
        ["Protect the connection.", "HTTPS encrypts information as it travels between the visitor and the website. It is one important layer of security, alongside careful configuration and access management."],
        ["Keep giving the site attention.", "Managed hosting, uptime checks and maintenance help identify issues. The tools and response arrangements depend on the site and your care agreement."],
        ["Prepare a way back.", "Backups need a clear scope and recovery approach. We confirm what is covered, how copies are retained and the practical steps for restoring your site."],
      ],
      deliverables: ["HTTPS certificate setup for the managed site", "Managed hosting within your active care plan", "Backup scope, schedule and retention agreed for your website", "Uptime monitoring and a clear route to report issues", "Relevant security headers and access settings reviewed", "Dependency updates and maintenance within the agreed setup", "Consent controls and placement of your approved privacy content where scoped", "Bug fixing and support within your care plan’s terms"],
      faqs: [
        { q: "Does HTTPS mean a website is completely secure?", a: "HTTPS protects the connection. It does not guarantee that a website is free from vulnerabilities. Security also depends on access, configuration, software and ongoing care. We do not promise uninterrupted uptime or absolute protection." },
        { q: "What happens if something goes wrong?", a: "Contact us through your care support channel. We assess the issue and the available recovery options. Backups and bug fixing are included in Basic Care; Complete Care adds priority WhatsApp support. Recovery depends on the incident and the available copies, without a universal recovery-time promise." },
        { q: "Do you provide privacy compliance?", a: "We can implement agreed consent controls and publish your approved privacy information. Those features alone do not establish legal compliance. Your policies and data practices need to suit your business, with specialist advice where needed." },
      ],
    },
    turnaround: {
      name: "Website Delivery", title: ["A clear plan.", "A confident launch."], lead: "See what happens next, give feedback at the right moments and launch when the details are ready.",
      intro: "A smooth project starts with the right materials and a shared plan. We agree the scope, set review points and keep you involved from the first direction to your launch approval.",
      principles: [
        ["Get ready together.", "Gather your content, branding and images, and arrange the access the project needs. We confirm the schedule once payment and the required materials are in place."],
        ["See the work take shape.", "Explore a working preview and bring your feedback together. Your package includes a defined number of revision rounds so the next step stays clear."],
        ["Launch with a final check.", "Review the agreed pages, links and enquiries before approving publication. Domain setup and the handover follow the launch plan we agree with you."],
      ],
      deliverables: ["A kickoff and schedule agreed around content readiness", "A working preview to review before launch", "2 revision rounds for Launch, 3 for Growth and 4 for Pro", "A project schedule agreed before work begins", "Domain and DNS connection within the agreed scope", "30-day bug fixing for faults in our work, subject to the service terms", "WhatsApp coordination and ongoing support through your care plan"],
      faqs: [
        { q: "How long will my website take?", a: "We agree your project schedule before work begins, based on the scope and the materials needed. We keep you updated throughout. Changes to scope, content or feedback may affect the schedule; any revised dates are agreed with you." },
        { q: "What do you need from me?", a: "Your logo and brand guidelines, page content, images you have permission to use, and the necessary account access. Use account invitations or delegated access where available. We confirm missing materials and any content support before setting the schedule." },
        { q: "Can you work to an urgent deadline?", a: "Tell us the date and what needs to be ready. We will check availability and scope before confirming whether an accelerated schedule is possible, with any additional cost agreed first." },
        { q: "What happens after launch?", a: "Faults in work we built are covered for 30 days after launch under the service terms, and while you hold an active care plan. Hosting, ongoing support and eligible updates follow your care plan. New pages, features and other additional work are quoted separately." },
      ],
    },
  },
  el: {
    seo: {
      name: "Εμφάνιση στο Google (SEO)",
      title: ["Να σας βρίσκουν", "όταν ψάχνουν στο Google."],
      lead: "Στήνουμε την ιστοσελίδα έτσι ώστε το Google να καταλαβαίνει τι κάνετε, κι όποιος έρχεται από την αναζήτηση να το καταλαβαίνει γρήγορα και να σας στείλει μήνυμα.",
      intro: "Χρήσιμο περιεχόμενο και μια καλά οργανωμένη ιστοσελίδα είναι η βάση για κάθε SEO. Χτίζουμε αυτή τη βάση στις σελίδες που συμφωνήσαμε, και το πόσο βαθιά πάμε εξαρτάται από το πακέτο σας.",
      principles: [
        ["Ξεκινάμε από αυτό που ψάχνει ο κόσμος.", "Κοιτάμε τι ψάχνουν οι πελάτες σας στο Google. Ξεκάθαρες περιγραφές υπηρεσιών και χρήσιμες απαντήσεις συνδέουν τις ερωτήσεις τους με την επιχείρησή σας."],
        ["Σελίδες που καταλαβαίνει κανείς με μια ματιά.", "Τίτλοι, επικεφαλίδες και σύνδεσμοι που λένε καθαρά τι υπάρχει από πίσω βοηθούν τον αναγνώστη να βρει αυτό που θέλει. Οι τοπικές πληροφορίες δείχνουν πού δραστηριοποιείστε."],
        ["Σωστό τεχνικό SEO.", "Ελέγχουμε αν οι μηχανές αναζήτησης διαβάζουν σωστά τις σελίδες σας, τι πληροφορίες έχει κάθε σελίδα και πώς δείχνει η ιστοσελίδα στο κινητό. Με τα εργαλεία αναζήτησης βλέπουμε τι θέλει διόρθωση και τι να βελτιώσουμε μετά."],
      ],
      deliverables: ["Τίτλοι σελίδων που λένε τι περιέχουν, και καθαρά URL", "Meta descriptions για τις σελίδες που συμφωνήσαμε", "Λογική σειρά επικεφαλίδων και εσωτερικοί σύνδεσμοι", "Δομημένα δεδομένα (schema), όπου περιλαμβάνονται και έχουν νόημα", "Χρήσιμες περιγραφές εικόνων (alt text) και σωστά ονόματα αρχείων", "Έλεγχος του sitemap και των ρυθμίσεων robots πριν τη δημοσίευση", "Search Console και Analytics στο Growth, ενώ για το Pro η ρύθμιση επιβεβαιώνεται στην προσφορά", "Έλεγχος της εμπειρίας στο κινητό και των Core Web Vitals, μέσα στο εύρος του έργου", "Σωστές πληροφορίες για τις υπηρεσίες σας και τις περιοχές που πραγματικά εξυπηρετείτε"],
      faqs: [
        { q: "Μπορείτε να εγγυηθείτε θέση στο Google;", a: "Όχι. Οι μηχανές αναζήτησης αποφασίζουν τι θα εμφανίσουν και σε ποια σειρά. Οι αλλαγές θέλουν χρόνο, και τα αποτελέσματα εξαρτώνται από το περιεχόμενο, τον ανταγωνισμό και άλλους παράγοντες. Εμείς φροντίζουμε για σωστές βάσεις και χρήσιμες βελτιώσεις." },
        { q: "Τι περιλαμβάνει το πακέτο μου;", a: "Το Launch περιλαμβάνει τις βάσεις του SEO, το Growth προσθέτει τη ρύθμιση Search Console και Analytics, και το Pro μια πιο ολοκληρωμένη δομή SEO. Την ακριβή ρύθμιση την επιβεβαιώνουμε στην προσφορά. Συνεχείς καμπάνιες SEO, γράψιμο περιεχομένου και link building συμφωνούνται ξεχωριστά και δεν περιλαμβάνονται αυτόματα στο πακέτο συντήρησης." },
        { q: "Ποιος αποφασίζει πώς εμφανίζεται η ιστοσελίδα μου στην αναζήτηση;", a: "Το Google μπορεί να δείξει άλλον τίτλο ή άλλη περιγραφή από αυτά που ορίσαμε, και τα δομημένα δεδομένα δεν εγγυώνται εμπλουτισμένο αποτέλεσμα. Ούτε η υποβολή sitemap εγγυάται ότι οι σελίδες θα μπουν στο ευρετήριο." },
      ],
    },
    security: {
      name: "Ασφάλεια και συντήρηση",
      title: ["Η ιστοσελίδα σας", "σε καλά χέρια."],
      lead: "Σωστό στήσιμο από την αρχή, συνεχής έλεγχος και ένα ξεκάθαρο σχέδιο για την περίπτωση που κάτι στραβώσει.",
      intro: "Μια ιστοσελίδα θέλει συντήρηση και μετά τη δημοσίευση. Συνδυάζουμε σωστά στημένη φιλοξενία με τον έλεγχο, τα backup και την υποστήριξη που περιλαμβάνει το ενεργό πακέτο συντήρησής σας.",
      principles: [
        ["Ασφαλής σύνδεση.", "Το HTTPS κρυπτογραφεί τις πληροφορίες καθώς ταξιδεύουν ανάμεσα στον επισκέπτη και την ιστοσελίδα. Είναι ένα σημαντικό επίπεδο προστασίας, μαζί με τις σωστές ρυθμίσεις και τον έλεγχο του ποιος έχει πρόσβαση."],
        ["Δεν ξεχνάμε το site μετά τη δημοσίευση.", "Η φιλοξενία που διαχειριζόμαστε εμείς, ο έλεγχος ότι το site είναι online και η συντήρηση βοηθούν να εντοπίζονται τα προβλήματα. Τα εργαλεία και ο τρόπος που ανταποκρινόμαστε εξαρτώνται από το site και από το πακέτο συντήρησης που έχετε."],
        ["Σχέδιο για την επαναφορά.", "Τα backup χρειάζονται ξεκάθαρο εύρος και τρόπο επαναφοράς. Συμφωνούμε τι καλύπτεται, πόσο καιρό κρατάμε τα αντίγραφα και ποια βήματα ακολουθούμε για να επαναφέρουμε το site."],
      ],
      deliverables: ["Ρύθμιση πιστοποιητικού SSL (HTTPS) για το site που διαχειριζόμαστε", "Φιλοξενία που διαχειριζόμαστε εμείς, όσο έχετε ενεργό πακέτο συντήρησης", "Συμφωνημένο εύρος, συχνότητα και διάρκεια φύλαξης των backup", "Έλεγχος ότι το site είναι online και ξεκάθαρος τρόπος να μας πείτε για ένα πρόβλημα", "Έλεγχος των κεφαλίδων ασφαλείας και των ρυθμίσεων πρόσβασης", "Ενημερώσεις λογισμικού και συντήρηση, με βάση τη συμφωνημένη υποδομή", "Ρυθμίσεις συγκατάθεσης για cookies και τοποθέτηση του εγκεκριμένου κειμένου απορρήτου σας, όπου έχει συμφωνηθεί", "Διόρθωση σφαλμάτων και υποστήριξη, σύμφωνα με τους όρους του πακέτου σας"],
      faqs: [
        { q: "Με HTTPS η ιστοσελίδα είναι απόλυτα ασφαλής;", a: "Το HTTPS προστατεύει τη σύνδεση, αλλά δεν εγγυάται ότι η ιστοσελίδα δεν έχει κενά ασφαλείας. Η ασφάλεια εξαρτάται και από την πρόσβαση, τις ρυθμίσεις, το λογισμικό και τη συνεχή συντήρηση. Δεν υποσχόμαστε ότι το site δεν θα πέσει ποτέ, ούτε απόλυτη προστασία." },
        { q: "Τι γίνεται αν κάτι πάει στραβά;", a: "Επικοινωνήστε μαζί μας από το κανάλι υποστήριξης του πακέτου σας. Εξετάζουμε το πρόβλημα και τις επιλογές που υπάρχουν για επαναφορά. Το Basic Care περιλαμβάνει backup και διόρθωση σφαλμάτων, και το Complete Care προσθέτει υποστήριξη στο WhatsApp με προτεραιότητα. Η επαναφορά εξαρτάται από το περιστατικό και από τα αντίγραφα που υπάρχουν, γι’ αυτό δεν δίνουμε έναν σταθερό χρόνο επαναφοράς για όλες τις περιπτώσεις." },
        { q: "Αναλαμβάνετε τη συμμόρφωση με τον GDPR;", a: "Μπορούμε να βάλουμε τις ρυθμίσεις συγκατάθεσης που συμφωνήσαμε και να δημοσιεύσουμε τα κείμενα απορρήτου που έχετε εγκρίνει. Αυτά από μόνα τους δεν σημαίνουν νομική συμμόρφωση. Οι πολιτικές σας και ο τρόπος που χειρίζεστε τα δεδομένα πρέπει να ταιριάζουν στην επιχείρησή σας, με συμβουλή ειδικού όπου χρειάζεται." },
      ],
    },
    turnaround: {
      name: "Γρήγορη παράδοση",
      title: ["Ξεκάθαρο χρονοδιάγραμμα,", "χωρίς εκπλήξεις."],
      lead: "Ξέρετε πάντα τι ακολουθεί, λέτε τη γνώμη σας τη σωστή στιγμή και βγαίνουμε στον αέρα μόνο όταν όλα είναι έτοιμα.",
      intro: "Μια καλή συνεργασία ξεκινά με τα σωστά υλικά και ένα ξεκάθαρο πλάνο. Συμφωνούμε τι θα γίνει, ορίζουμε πότε θα δείτε τη δουλειά, και ξέρετε σε κάθε στιγμή τι γίνεται, από την πρώτη κουβέντα μέχρι το «ναι» για δημοσίευση.",
      principles: [
        ["Ετοιμαζόμαστε μαζί.", "Μαζεύουμε κείμενα, λογότυπο και φωτογραφίες και κανονίζουμε τις προσβάσεις που χρειάζεται το έργο. Το χρονοδιάγραμμα το επιβεβαιώνουμε μόλις γίνει η πληρωμή και έχουμε όλα τα υλικά."],
        ["Βλέπετε τη δουλειά να προχωράει.", "Δοκιμάζετε μια προεπισκόπηση που λειτουργεί κανονικά και μας στέλνετε όλα τα σχόλιά σας μαζί. Το πακέτο σας έχει συγκεκριμένους γύρους διορθώσεων, για να είναι πάντα ξεκάθαρο ποιο είναι το επόμενο βήμα."],
        ["Τελικός έλεγχος, και στον αέρα.", "Ελέγχετε τις σελίδες, τους συνδέσμους και τις φόρμες που συμφωνήσαμε πριν εγκρίνετε τη δημοσίευση. Η σύνδεση του domain και η παράδοση γίνονται όπως τα συμφωνήσαμε."],
      ],
      deliverables: ["Έναρξη και χρονοδιάγραμμα ανάλογα με το πότε είναι έτοιμο το περιεχόμενο", "Προεπισκόπηση που λειτουργεί κανονικά, για έλεγχο πριν τη δημοσίευση", "2 γύροι διορθώσεων στο Launch, 3 στο Growth και 4 στο Pro", "Χρονοδιάγραμμα που συμφωνούμε πριν ξεκινήσει η δουλειά", "Σύνδεση domain και DNS, μέσα στο εύρος που συμφωνήσαμε", "Διόρθωση σφαλμάτων στη δουλειά μας για 30 ημέρες, σύμφωνα με τους όρους παροχής υπηρεσιών", "Συνεννόηση στο WhatsApp και συνεχής υποστήριξη μέσα από το πακέτο συντήρησης"],
      faqs: [
        { q: "Πόσο χρόνο θα πάρει η ιστοσελίδα μου;", a: "Το χρονοδιάγραμμα το συμφωνούμε πριν ξεκινήσουμε, ανάλογα με το εύρος και τα υλικά που χρειάζονται. Σας ενημερώνουμε σε κάθε στάδιο. Αλλαγές στο έργο, στο περιεχόμενο ή στα σχόλια μπορεί να επηρεάσουν το πρόγραμμα, και κάθε νέα ημερομηνία τη συμφωνούμε μαζί σας." },
        { q: "Τι χρειάζεστε από εμένα;", a: "Το λογότυπο και τις οδηγίες του brand σας, τα κείμενα των σελίδων, φωτογραφίες που έχετε δικαίωμα να χρησιμοποιήσετε και τις απαραίτητες προσβάσεις σε λογαριασμούς. Όπου γίνεται, προτιμήστε να μας στείλετε πρόσκληση στον λογαριασμό αντί για κωδικούς. Πριν κλείσουμε το χρονοδιάγραμμα, σας λέμε τι λείπει και αν χρειάζεστε βοήθεια με το περιεχόμενο." },
        { q: "Μπορείτε να προλάβετε μια επείγουσα προθεσμία;", a: "Πείτε μας την ημερομηνία και τι πρέπει να είναι έτοιμο. Ελέγχουμε διαθεσιμότητα και εύρος πριν σας πούμε αν γίνεται πιο γρήγορο χρονοδιάγραμμα, και τυχόν επιπλέον κόστος το συμφωνούμε από πριν." },
        { q: "Τι γίνεται μετά τη δημοσίευση;", a: "Τα σφάλματα στη δουλειά που φτιάξαμε εμείς καλύπτονται για 30 ημέρες μετά τη δημοσίευση, σύμφωνα με τους όρους παροχής υπηρεσιών, και όσο έχετε ενεργό πακέτο συντήρησης. Η φιλοξενία, η υποστήριξη και οι ενημερώσεις που καλύπτονται ακολουθούν το πακέτο σας. Νέες σελίδες, λειτουργίες και άλλες επιπλέον εργασίες κοστολογούνται ξεχωριστά." },
      ],
    },
  },
  he: {
    seo: {
      name: "קידום אורגני (SEO)",
      title: ["שימצאו אתכם", "כשמחפשים בגוגל."],
      lead: "מסדרים את האתר כך שגוגל יבין מה אתם עושים, ושמי שמגיע מהחיפוש יבין את זה מהר ויפנה אליכם.",
      intro: "תוכן טוב ואתר מסודר הם הבסיס לכל קידום אורגני. אנחנו בונים את הבסיס הזה בעמודים שסיכמנו, ועומק העבודה תלוי בחבילה שלכם.",
      principles: [
        ["מתחילים ממה שאנשים מחפשים.", "בודקים מה הלקוחות שלכם מחפשים בגוגל. תיאורי שירות ברורים ותשובות שימושיות מחברים בין השאלות שלהם לעסק שלכם."],
        ["עמוד שמבינים במבט אחד.", "כותרות וקישורים שאומרים בדיוק מה יש מאחוריהם עוזרים לקוראים להתמצא. מידע מקומי מסביר איפה אתם עובדים."],
        ["דרך ברורה לגוגל.", "בודקים שאפשר לסרוק את העמודים בקלות, מה המידע בכל עמוד ואיך האתר נראה במובייל. כלי החיפוש עוזרים לנו לזהות בעיות ולהחליט מה לשפר אחר כך."],
      ],
      deliverables: ["כותרות עמוד שאומרות מה יש בעמוד, וכתובות URL ברורות", "תיאורי מטא לעמודים שסיכמנו", "היררכיית כותרות הגיונית וקישורים פנימיים", "נתונים מובנים, כשהם כלולים ומתאימים", "תיאורי תמונות מועילים ושמות קבצים נכונים", "בדיקת מפת האתר והגדרות robots לפני ההשקה", "Search Console ו־Analytics בחבילת Growth, וב־Pro ההגדרה מאושרת בהצעת המחיר", "בדיקת חוויית המובייל ו־Core Web Vitals במסגרת ההיקף", "מידע מדויק על השירותים ועל האזורים שאתם באמת משרתים"],
      faqs: [
        { q: "אפשר להבטיח מיקום מסוים בגוגל?", a: "לא. מנועי החיפוש מחליטים מה להציג ובאיזה סדר. שינויים לוקחים זמן, והתוצאות תלויות בתוכן, בתחרות ובגורמים נוספים. אנחנו דואגים ליסודות נכונים ולשיפורים שבאמת עוזרים." },
        { q: "מה כלול בחבילה שלי?", a: "Launch כולל את יסודות ה־SEO, Growth מוסיף הגדרה של Search Console ו־Analytics, ו־Pro כולל מבנה SEO רחב יותר. את ההגדרה המדויקת מאשרים בהצעת המחיר. קמפיינים שוטפים של SEO, כתיבת תוכן ובניית קישורים מתומחרים בנפרד, ולא כלולים אוטומטית בתוכנית התחזוקה." },
        { q: "מי קובע איך האתר שלי מופיע בחיפוש?", a: "גוגל יכול להציג כותרת או תיאור אחרים מאלה שהגדרנו, ונתונים מובנים לא מבטיחים תוצאה מורחבת. גם שליחת מפת אתר לא מבטיחה שהעמודים ייכנסו לאינדקס." },
      ],
    },
    security: {
      name: "אבטחה ותחזוקה",
      title: ["האתר שלכם", "בידיים טובות."],
      lead: "הקמה נכונה מההתחלה, מעקב שוטף ותוכנית ברורה למקרה שמשהו משתבש.",
      intro: "אתר צריך טיפול גם אחרי ההשקה. אנחנו משלבים אחסון שמוגדר נכון עם הניטור, הגיבויים והתמיכה שכלולים בתוכנית התחזוקה שלכם.",
      principles: [
        ["חיבור מאובטח.", "HTTPS מצפין את המידע שעובר בין המבקר לאתר. זו שכבת הגנה חשובה, לצד הגדרות נכונות ושליטה במי שיש לו גישה."],
        ["לא שוכחים את האתר אחרי ההשקה.", "אחסון מנוהל, בדיקות שהאתר באוויר ותחזוקה שוטפת עוזרים לזהות בעיות. הכלים ואופן התגובה תלויים באתר ובתוכנית התחזוקה שלכם."],
        ["תוכנית לשחזור.", "גיבויים צריכים היקף ברור ודרך מסודרת לשחזר. מסכמים מה מגובה, כמה זמן שומרים את העותקים ומה עושים כדי להחזיר את האתר."],
      ],
      deliverables: ["הגדרת תעודת HTTPS לאתר שאנחנו מנהלים", "אחסון מנוהל, כל עוד יש תוכנית תחזוקה פעילה", "היקף, תדירות ומשך שמירה של גיבויים, כפי שסיכמנו לאתר", "ניטור שהאתר באוויר ודרך ברורה לדווח על תקלות", "בדיקת כותרות אבטחה והגדרות גישה רלוונטיות", "עדכוני רכיבי תוכנה ותחזוקה, לפי התשתית שסיכמנו", "מנגנוני הסכמה ושילוב טקסט הפרטיות שאישרתם, כשזה בהיקף", "תיקון תקלות ותמיכה לפי התנאים של תוכנית התחזוקה"],
      faqs: [
        { q: "HTTPS אומר שהאתר בטוח לגמרי?", a: "HTTPS מגן על החיבור, אבל לא מבטיח שאין באתר חולשות. האבטחה תלויה גם בגישה, בהגדרות, בתוכנה ובתחזוקה שוטפת. אנחנו לא מבטיחים שהאתר לא ייפול אף פעם, וגם לא הגנה מוחלטת." },
        { q: "מה קורה אם יש תקלה?", a: "פנו אלינו דרך ערוץ התמיכה של תוכנית התחזוקה. אנחנו בודקים את התקלה ואת אפשרויות השחזור. Basic Care כולל גיבויים ותיקון תקלות, ו־Complete Care מוסיף תמיכה בעדיפות ב־WhatsApp. השחזור תלוי באירוע ובעותקים שזמינים, ולכן אין זמן שחזור אחד שמתאים לכל מקרה." },
        { q: "אתם דואגים לעמידה בדרישות הפרטיות?", a: "אנחנו יכולים להטמיע את מנגנוני ההסכמה שסיכמנו ולפרסם את מידע הפרטיות שאישרתם. זה לבד לא אומר שאתם עומדים בדרישות החוק. המדיניות שלכם ואופן הטיפול במידע צריכים להתאים לעסק, עם ייעוץ מקצועי כשצריך." },
      ],
    },
    turnaround: {
      name: "עולים לאוויר מהר",
      title: ["תוכנית ברורה,", "בלי הפתעות בדרך."],
      lead: "תמיד יודעים מה הלאה, נותנים הערות ברגע הנכון ועולים לאוויר רק כשהכול מוכן.",
      intro: "פרויקט טוב מתחיל בחומרים הנכונים ובתוכנית ברורה. מסכמים מה עושים, קובעים מתי תראו את העבודה, ואתם מעורבים מההתחלה ועד האישור לעלות לאוויר.",
      principles: [
        ["מתכוננים ביחד.", "אוספים תוכן, לוגו ותמונות ומסדרים את הגישות שהפרויקט צריך. את לוח הזמנים מאשרים כשהתשלום והחומרים מוכנים."],
        ["רואים את העבודה מתקדמת.", "נכנסים לגרסה של האתר שאפשר ממש לגלוש בה, ושולחים לנו את כל ההערות ביחד. בחבילה יש מספר קבוע של סבבי תיקונים, כך שתמיד ברור מה הצעד הבא."],
        ["בדיקה אחרונה, ועולים לאוויר.", "עוברים על העמודים, הקישורים והטפסים שסיכמנו לפני שאתם מאשרים לפרסם. חיבור הדומיין והעברת האתר נעשים לפי התוכנית שסיכמנו איתכם."],
      ],
      deliverables: ["פגישת פתיחה ולוח זמנים לפי מתי שהתוכן מוכן", "גרסה של האתר לבדיקה לפני ההשקה", "2 סבבי תיקונים ב־Launch, 3 ב־Growth ו־4 ב־Pro", "לוח זמנים שמסכמים לפני שמתחילים לעבוד", "חיבור דומיין ו־DNS במסגרת ההיקף שסיכמנו", "30 יום של תיקון תקלות בעבודה שלנו, לפי תנאי השירות", "תיאום ב־WhatsApp ותמיכה שוטפת דרך תוכנית התחזוקה"],
      faqs: [
        { q: "כמה זמן לוקח לבנות את האתר?", a: "את לוח הזמנים מסכמים לפני שמתחילים, לפי ההיקף והחומרים שצריך. אנחנו מעדכנים אתכם לאורך כל הדרך. שינויים בהיקף, בתוכן או בהערות יכולים להשפיע על הזמנים, וכל תאריך חדש מתואם איתכם." },
        { q: "מה אתם צריכים ממני?", a: "לוגו והנחיות מותג, תוכן לעמודים, תמונות שמותר לכם להשתמש בהן והגישה הדרושה לחשבונות. כשאפשר, עדיף לשלוח הזמנה לחשבון או הרשאת גישה. לפני שקובעים את לוח הזמנים אנחנו בודקים מה חסר ואם צריך עזרה עם התוכן." },
        { q: "אפשר לעמוד בדדליין דחוף?", a: "ספרו לנו מה התאריך ומה חייב להיות מוכן. נבדוק זמינות והיקף לפני שנאשר אם אפשר לקצר את הזמנים, וכל עלות נוספת מסכמים מראש." },
        { q: "מה קורה אחרי ההשקה?", a: "תקלות בעבודה שעשינו מכוסות 30 יום אחרי ההשקה לפי תנאי השירות, ובהמשך כל עוד יש תוכנית תחזוקה פעילה. האחסון, התמיכה והעדכונים שכלולים ממשיכים לפי התוכנית. עמודים, יכולות ועבודה נוספת מתומחרים בנפרד." },
      ],
    },
  },
};
