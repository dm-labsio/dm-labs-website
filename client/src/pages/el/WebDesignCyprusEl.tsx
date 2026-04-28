// =============================================================================
// /el/web-design-cyprus -- National Cyprus Pillar Page (Greek)
// =============================================================================
import { useEffect } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import AnimateIn from "@/components/AnimateIn";

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "D&M Labs",
  "description": "Επαγγελματική κατασκευή ιστοσελίδων για επιχειρήσεις σε όλη την Κύπρο - Λεμεσός, Λευκωσία, Λάρνακα, Πάφος, Αμμόχωστος και όλες τις επαρχίες.",
  "url": "https://dm-labs.io/el/web-design-cyprus",
  "telephone": "+35797472847",
  "priceRange": "€€",
  "areaServed": [
    { "@type": "City", "name": "Λεμεσός" },
    { "@type": "City", "name": "Λευκωσία" },
    { "@type": "City", "name": "Λάρνακα" },
    { "@type": "City", "name": "Πάφος" },
    { "@type": "City", "name": "Αμμόχωστος" },
    { "@type": "Country", "name": "Κύπρος" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Κατασκευή Ιστοσελίδας Κύπρος Υπηρεσίες",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Starter Ιστοσελίδα Κύπρος", "description": "Επώνυμη επαγγελματική σελίδα για επιχειρήσεις στην Κύπρο" }, "price": "299", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Ιστοσελίδα Κύπρος", "description": "Ιστοσελίδα έως 5 σελίδων με SEO και φόρμες επικοινωνίας για κυπριακές επιχειρήσεις" }, "price": "399", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Premium Ιστοσελίδα Κύπρος", "description": "Πλήρως custom ιστοσελίδα με animations, blog άρθρα και πλήρη δομή SEO" }, "price": "699", "priceCurrency": "EUR" }
    ]
  }
};

const cities = [
  { name: "Λεμεσός", slug: "/el/web-design-limassol", color: "#5B8CFF", bg: "#EEF3FF", desc: "Η επιχειρηματική και χρηματοοικονομική πρωτεύουσα της Κύπρου. Σπίτι χιλιάδων ΜΜΕ, διεθνών εταιρειών και μιας ανθούσας τεχνολογικής σκηνής." },
  { name: "Λευκωσία", slug: "/el/web-design-nicosia", color: "#8B5CFF", bg: "#F3EEFF", desc: "Η πρωτεύουσα της Κύπρου και το κέντρο της κυβέρνησης, του νόμου και των οικονομικών. Υψηλή ζήτηση για επαγγελματικές ιστοσελίδες που χτίζουν αξιοπιστία." },
  { name: "Λάρνακα", slug: null, color: "#0EA5E9", bg: "#E0F2FE", desc: "Ένας αναπτυσσόμενος εμπορικός κόμβος με πολυσύχναστο λιμάνι και διεθνές αεροδρόμιο. Τουρισμός, λιανικό εμπόριο και επιχειρήσεις logistics ανθίζουν εδώ." },
  { name: "Πάφος", slug: null, color: "#10B981", bg: "#D1FAE5", desc: "Ένας σημαντικός τουριστικός προορισμός και κοινότητα expat. Ξενοδοχεία, βίλες, εστιατόρια και κτηματομεσιτικά γραφεία χρειάζονται ισχυρή online παρουσία." },
  { name: "Αμμόχωστος", slug: null, color: "#F59E0B", bg: "#FEF3C7", desc: "Μια παράκτια πόλη με αναπτυσσόμενη οικονομία. Οι επιχειρήσεις εδώ ωφελούνται τεράστια από το να είναι εύρετες στο Google." },
  { name: "Παραλίμνι / Αγία Νάπα", slug: null, color: "#EF4444", bg: "#FEE2E2", desc: "Η τουριστική καρδιά της Κύπρου. Εστιατόρια, clubs, water parks και καταλύματα χρειάζονται ιστοσελίδες που μετατρέπουν τους επισκέπτες σε πελάτες." },
];

const industries = [
  { icon: "🍽️", name: "Εστιατόρια & Καφέ", desc: "Η Κύπρος έχει πάνω από 3.200 επιχειρήσεις τροφίμων και ποτών. Μια γρήγορη, mobile-first ιστοσελίδα με το μενού σας, τις ώρες λειτουργίας και ενσωμάτωση Google Maps αυξάνει τις επισκέψεις και τις κρατήσεις." },
  { icon: "🏨", name: "Ξενοδοχεία & Τουρισμός", desc: "Ο τουρισμός είναι η μεγαλύτερη βιομηχανία της Κύπρου. Ξενοδοχεία, βίλες και tour operators χρειάζονται μια ιστοσελίδα που κατατάσσεται στο Google και μετατρέπει τους διεθνείς επισκέπτες σε πελάτες πριν ακόμα φτάσουν." },
  { icon: "⚖️", name: "Δικηγορικά Γραφεία & Νομικές Υπηρεσίες", desc: "Η Κύπρος είναι σημαντικός ευρωπαϊκός νομικός και χρηματοοικονομικός κόμβος. Δικηγορικά γραφεία και πάροχοι εταιρικών υπηρεσιών χρειάζονται μια επαγγελματική ιστοσελίδα που χτίζει εμπιστοσύνη με πελάτες υψηλής αξίας." },
  { icon: "🏠", name: "Κτηματομεσιτικά & Ακίνητα", desc: "Οι αγοραστές ακινήτων αναζητούν πρώτα online. Μια καθαρή, γρήγορη ιστοσελίδα με listings, χάρτες και φόρμες επικοινωνίας μετατρέπει τους επισκέπτες σε σοβαρούς υποψήφιους αγοραστές." },
  { icon: "🏥", name: "Κλινικές & Υγεία", desc: "Ιδιωτικές κλινικές, οδοντίατροι, φυσιοθεραπευτές και ειδικοί σε όλη την Κύπρο χρειάζονται μια αξιόπιστη online παρουσία για να προσελκύσουν και να διατηρήσουν ασθενείς." },
  { icon: "🛍️", name: "Λιανική & Μπουτίκ", desc: "Είτε έχετε μπουτίκ στη Λεμεσό είτε εξειδικευμένο κατάστημα στη Λευκωσία, μια επαγγελματική ιστοσελίδα βοηθά τους πελάτες να σας βρουν και χτίζει αξιοπιστία πριν ακόμα μπουν στο κατάστημά σας." },
  { icon: "📊", name: "Λογιστική & Χρηματοοικονομικά", desc: "Ο χρηματοοικονομικός τομέας της Κύπρου είναι ένας από τους μεγαλύτερους στην ΕΕ. Μια κομψή, επαγγελματική ιστοσελίδα σηματοδοτεί αξιοπιστία σε εταιρικούς και διεθνείς πελάτες." },
  { icon: "🎓", name: "Εκπαίδευση & Φροντιστήρια", desc: "Ιδιωτικά σχολεία, κέντρα ξένων γλωσσών και φροντιστήρια σε όλη την Κύπρο χρησιμοποιούν ιστοσελίδες για να προσελκύσουν μαθητές και να παρουσιάσουν το πρόγραμμα και τα δίδακτρά τους." },
];

const faqs = [
  {
    q: "Πόσο κοστίζει η κατασκευή ιστοσελίδας στην Κύπρο;",
    a: "Η κατασκευή ιστοσελίδας στην Κύπρο κυμαίνεται συνήθως από €299 έως €2.500+ ανάλογα με το μέγεθος και την πολυπλοκότητα του project. Στη D&M Labs, το Starter πακέτο μας ξεκινά από €299 για μια επώνυμη επαγγελματική σελίδα, το Business πακέτο είναι €399 για έως 5 σελίδες με φόρμες επικοινωνίας και SEO, και το Premium πακέτο είναι €699 για μια πλήρως custom ιστοσελίδα με animations, blog άρθρα και πλήρη δομή SEO. Όλες οι τιμές είναι διαφανείς, χωρίς κρυφές χρεώσεις."
  },
  {
    q: "Ποια είναι η διαφορά μεταξύ web design και web development στην Κύπρο;",
    a: "Το web design αφορά τη visual πλευρά και την εμπειρία χρήστη - layout, χρώματα, τυπογραφία και πώς φαίνεται και αισθάνεται η ιστοσελίδα. Το web development αφορά την τεχνική κατασκευή - τον κώδικα και τη λειτουργικότητα που κάνει την ιστοσελίδα να δουλεύει. Στη D&M Labs αναλαμβάνουμε και τα δύο: σχεδιάζουμε και αναπτύσσουμε την ιστοσελίδα σας από την αρχή μέχρι το τέλος, ώστε να συνεργάζεστε με μία ομάδα αντί να συντονίζετε μεταξύ σχεδιαστή και developer."
  },
  {
    q: "Χρειάζομαι ιστοσελίδα αν έχω ήδη σελίδα στο Facebook ή Instagram;",
    a: "Ναι. Τα social media είναι ενοικιαζόμενος χώρος - το Facebook και το Instagram μπορούν να αλλάξουν τον αλγόριθμό τους, να περιορίσουν την εμβέλειά σας ή να αναστείλουν τον λογαριασμό σας ανά πάσα στιγμή. Μια ιστοσελίδα είναι δική σας ψηφιακή ιδιοκτησία. Επίσης κατατάσσεται στο Google, που είναι εκεί όπου η πλειοψηφία των Κυπρίων καταναλωτών αναζητά επιχειρήσεις. Η ιστοσελίδα και τα social media λειτουργούν μαζί, αλλά η ιστοσελίδα είναι η βάση."
  },
  {
    q: "Πόσο χρόνο χρειάζεται για να κατασκευαστεί μια ιστοσελίδα στην Κύπρο;",
    a: "Οι Starter ιστοσελίδες μας δημοσιεύονται μέσα σε 5 έως 7 εργάσιμες μέρες από τη στιγμή που θα έχουμε το περιεχόμενο και τα σχόλιά σας. Τα Business πακέτα χρειάζονται 7 έως 10 μέρες και τα Premium πακέτα 10 έως 14 μέρες. Σας ενημερώνουμε καθ' όλη τη διαδικασία και δεν εξαφανιζόμαστε μεταξύ σημαντικών σημείων. Ταχεία παράδοση είναι διαθέσιμη κατόπιν αιτήματος."
  },
  {
    q: "Μπορείτε να φτιάξετε δίγλωσση ιστοσελίδα στα ελληνικά και αγγλικά;",
    a: "Ναι. Φτιάχνουμε δίγλωσσες ιστοσελίδες στα ελληνικά και αγγλικά για επιχειρήσεις που εξυπηρετούν τόσο τοπικό κυπριακό όσο και διεθνές κοινό. Μια πλήρης ελληνική έκδοση είναι διαθέσιμη κατόπιν αιτήματος. Εργαζόμαστε άνετα με ελληνικό περιεχόμενο και συμβουλεύουμε πώς να δομήσετε τα κείμενα τόσο για αναγνωσιμότητα όσο και για ορατότητα στις μηχανές αναζήτησης."
  },
  {
    q: "Προσφέρετε SEO μαζί με τα πακέτα κατασκευής ιστοσελίδας;",
    a: "Όλες οι ιστοσελίδες μας κατασκευάζονται με on-page SEO ως standard - σωστή δομή headings, meta titles, meta descriptions, canonical tags, γρήγορη φόρτωση και mobile-first σχεδιασμός. Τα Business και Premium πακέτα μας περιλαμβάνουν πιο ολοκληρωμένη ρύθμιση SEO. Για επιχειρήσεις που θέλουν συνεχή εργασία SEO (στόχευση λέξεων-κλειδιών, στρατηγική περιεχομένου, link building), το προσφέρουμε ως ξεχωριστή υπηρεσία."
  },
  {
    q: "Συνεργάζεστε με επιχειρήσεις εκτός Λεμεσού και Λευκωσίας;",
    a: "Ναι. Η D&M Labs συνεργάζεται με επιχειρήσεις σε όλη την Κύπρο - Λάρνακα, Πάφος, Αμμόχωστος, Παραλίμνι, Αγία Νάπα και κάθε επαρχία. Επίσης συνεργαζόμαστε με επιχειρήσεις στην Ελλάδα (Αθήνα, Θεσσαλονίκη), το Ηνωμένο Βασίλειο και το Ισραήλ. Όλη η εργασία γίνεται εξ αποστάσεως μέσω WhatsApp, email και video call. Η απόσταση δεν αποτελεί παράγοντα."
  }
];

const whyUs = [
  { icon: "⚡", title: "Γρήγορη Παράδοση", desc: "Οι Starter ιστοσελίδες είναι online σε 5-7 μέρες. Χωρίς αναμονή μηνών για μια βασική σελίδα." },
  { icon: "📱", title: "Mobile-First Σχεδιασμός", desc: "Πάνω από 70% της κυπριακής κίνησης στο web είναι από κινητά. Κάθε ιστοσελίδα που φτιάχνουμε είναι βελτιστοποιημένη πρώτα για τηλέφωνα." },
  { icon: "🔍", title: "SEO Ενσωματωμένο", desc: "On-page SEO, σωστά meta tags, γρήγορη φόρτωση και structured data - περιλαμβάνονται σε κάθε πακέτο." },
  { icon: "💬", title: "Υποστήριξη WhatsApp", desc: "Επικοινωνούμε μέσω WhatsApp, όχι μέσω ticketing systems. Πάντα μιλάτε με πραγματικό άτομο, γρήγορα." },
  { icon: "💶", title: "Διαφανείς Τιμές", desc: "Σταθερές τιμές από €299. Χωρίς χρέωση ανά ώρα, χωρίς κρυφές χρεώσεις, χωρίς εκπλήξεις στο τιμολόγιο." },
  { icon: "🌍", title: "Δίγλωσση Δυνατότητα", desc: "Ελληνικές και αγγλικές ιστοσελίδες για επιχειρήσεις που εξυπηρετούν τόσο τοπικό όσο και διεθνές κοινό." },
];

export default function WebDesignCyprusEl() {
  useSEO({
    title: "Κατασκευή Ιστοσελίδας Κύπρος | Επαγγελματικές Ιστοσελίδες από €299 | D&M Labs",
    description: "Επαγγελματική κατασκευή ιστοσελίδων για επιχειρήσεις σε όλη την Κύπρο - Λεμεσός, Λευκωσία, Λάρνακα, Πάφος και πέρα. Custom ιστοσελίδες από €299. Mobile-first, βελτιστοποιημένες για SEO, παράδοση σε 5-14 μέρες. Δωρεάν συμβουλευτική.",
    canonicalPath: "/el/web-design-cyprus"
  });

  useEffect(() => {
    const existing = document.getElementById("schema-cyprus");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "schema-cyprus";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schemaMarkup);
    document.head.appendChild(script);
    return () => {
      const s = document.getElementById("schema-cyprus");
      if (s) s.remove();
    };
  }, []);

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">

      {/* -- HERO -- */}
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#F0EAFF]">
        <div className="container max-w-4xl mx-auto text-center">
          <AnimateIn>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">
              Κατασκευή Ιστοσελίδας Κύπρος
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111315] mb-4 leading-tight">
              Επαγγελματική{" "}
              <span className="bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] bg-clip-text text-transparent">
                Κατασκευή Ιστοσελίδας στην Κύπρο
              </span>
              {" "}από €299
            </h1>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-6 leading-relaxed">
              Η D&M Labs είναι ένα studio σχεδιασμού και ανάπτυξης ιστοσελίδων που εξυπηρετεί επιχειρήσεις σε όλη την Κύπρο - από Λεμεσό και Λευκωσία μέχρι Λάρνακα, Πάφο και Αμμόχωστο. Φτιάχνουμε γρήγορες, mobile-first, βελτιστοποιημένες για SEO ιστοσελίδες που βοηθούν τις κυπριακές επιχειρήσεις να βρεθούν στο Google και να μετατρέψουν τους επισκέπτες σε πελάτες.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/el/contact">
                <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                  Λάβετε Δωρεάν Προσφορά
                </button>
              </Link>
              <a
                href="https://wa.me/35797472847?text=%CE%93%CE%B5%CE%B9%CE%B1%20%CF%83%CE%B1%CF%82!%20%CE%95%CE%BD%CE%B4%CE%B9%CE%B1%CF%86%CE%AD%CF%81%CE%BF%CE%BC%CE%B1%CE%B9%20%CE%B3%CE%B9%CE%B1%20%CE%B9%CF%83%CF%84%CE%BF%CF%83%CE%B5%CE%BB%CE%AF%CE%B4%CE%B1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-8 py-3.5 rounded-xl bg-white border border-[#E8EAF0] text-[#111315] font-semibold text-base hover:bg-[#F8F9FC] transition-colors shadow-sm">
                  Στείλτε μας στο WhatsApp
                </button>
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* -- ΓΙΑΤΙ Η ΚΥΠΡΙΑΚΗ ΕΠΙΧΕΙΡΗΣΗ ΣΑΣ ΧΡΕΙΑΖΕΤΑΙ ΙΣΤΟΣΕΛΙΔΑ -- */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-6">
              Χρειάζεται η Κυπριακή Επιχείρησή σας Ιστοσελίδα;
            </h2>
            <div className="prose prose-lg max-w-none text-[#5B6472] leading-relaxed space-y-5">
              <p>
                Η σύντομη απάντηση είναι ναι - και η μακρύτερη είναι ότι το κόστος του να <strong>μην έχετε ιστοσελίδα</strong> στην Κύπρο μεγαλώνει κάθε χρόνο. Πάνω από το 80% των Κυπρίων καταναλωτών αναζητά στο Google πριν κάνει μια αγορά ή κλείσει μια υπηρεσία. Αν η επιχείρησή σας δεν εμφανίζεται σε αυτά τα αποτελέσματα αναζήτησης, είστε αόρατοι στην πλειοψηφία των πιθανών πελατών σας.
              </p>
              <p>
                <strong>Η κατασκευή ιστοσελίδας στην Κύπρο</strong> έχει εξελιχθεί σημαντικά τα τελευταία πέντε χρόνια. Μια βασική brochure σελίδα δεν αρκεί πλέον. Επιχειρήσεις σε όλη την Κύπρο - από εστιατόρια στη Λεμεσό μέχρι δικηγορικά γραφεία στη Λευκωσία, από ξενοδοχεία στην Πάφο μέχρι κλινικές στη Λάρνακα - χρειάζονται μια ιστοσελίδα που φορτώνει γρήγορα στο κινητό, κατατάσσεται στο Google και μετατρέπει τους επισκέπτες σε ερωτήματα ή κρατήσεις.
              </p>
              <p>
                Στη D&M Labs, κατασκευάζουμε <strong>επαγγελματικές ιστοσελίδες για κυπριακές επιχειρήσεις</strong> που κάνουν ακριβώς αυτό. Κάθε ιστοσελίδα που παραδίδουμε είναι mobile-first (γιατί πάνω από 70% της κίνησης στο web στην Κύπρο προέρχεται από smartphones), βελτιστοποιημένη για SEO από την πρώτη μέρα, και σχεδιασμένη ώστε η επιχείρησή σας να φαίνεται αξιόπιστη και επαγγελματική στους πιθανούς πελάτες.
              </p>
              <p>
                Είτε είστε μικρός επιχειρηματίας στη Λευκωσία που ψάχνει την πρώτη σας ιστοσελίδα, εστιατόριο στη Λεμεσό που χρειάζεται online μενού και φόρμα κρατήσεων, ή επιχείρηση υπηρεσιών που θέλει να προσελκύσει περισσότερους πελάτες από το Google - έχουμε πακέτο για εσάς ξεκινώντας από <strong>€299</strong>.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* -- ΤΙ ΚΑΤΑΣΚΕΥΑΖΟΥΜΕ -- */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">
              Τι Κατασκευάζουμε για Κυπριακές Επιχειρήσεις
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              Είμαστε ένα full-service studio <strong>σχεδιασμού και ανάπτυξης ιστοσελίδων στην Κύπρο</strong>. Αναλαμβάνουμε τα πάντα, από την αρχική ιδέα σχεδιασμού μέχρι την τελική δημοσίευση - και μετά.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Επαγγελματικές Ιστοσελίδες", desc: "Επαγγελματικές πολυσέλιδες ιστοσελίδες για επιχειρήσεις υπηρεσιών, συμβουλευτικές εταιρείες και agencies σε όλη την Κύπρο. Καθαρός σχεδιασμός, γρήγορη φόρτωση και κατασκευασμένες για κατάταξη στο Google." },
              { title: "Ιστοσελίδες Εστιατορίων & Καφέ", desc: "Mobile-first ιστοσελίδες με ψηφιακά μενού, ωράρια λειτουργίας, Google Maps και φόρμες κρατήσεων. Σχεδιασμένες για να αυξήσουν τις επισκέψεις και τα online ερωτήματα." },
              { title: "Ιστοσελίδες Ξενοδοχείων & Τουρισμού", desc: "Ιστοσελίδες εστιασμένες στις κρατήσεις για ξενοδοχεία, βίλες, διαμερίσματα και tour operators στην Κύπρο. Βελτιστοποιημένες για διεθνείς επισκέπτες που αναζητούν στα αγγλικά, ρωσικά και ελληνικά." },
              { title: "Portfolio & Δημιουργικές Ιστοσελίδες", desc: "Showcase ιστοσελίδες για αρχιτέκτονες, φωτογράφους, interior designers και δημιουργικούς επαγγελματίες σε όλη την Κύπρο." },
              { title: "Ιστοσελίδες Επαγγελματικών Υπηρεσιών", desc: "Ιστοσελίδες που χτίζουν αξιοπιστία για δικηγορικά γραφεία, λογιστές, κλινικές και συμβουλευτικές εταιρείες. Σχεδιασμένες για μετατροπή ερωτημάτων υψηλής αξίας." },
              { title: "Σελίδες Προορισμού & SEO", desc: "Στοχευμένες landing pages κατασκευασμένες για κατάταξη σε συγκεκριμένες λέξεις-κλειδιά - 'κατασκευή ιστοσελίδας Λεμεσός', 'οδοντίατρος Λευκωσία', 'ενοικίαση αυτοκινήτου Λάρνακα' - και μετατροπή επισκεπτών σε leads." },
            ].map((item) => (
              <AnimateIn key={item.title}>
                <div className="bg-white rounded-2xl p-6 border border-[#E8EAF0] shadow-sm h-full">
                  <h3 className="font-bold text-[#111315] text-base mb-2">{item.title}</h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* -- ΚΛΑΔΟΙ -- */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">
              Κλάδοι που Εξυπηρετούμε σε Όλη την Κύπρο
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              Έχουμε κατασκευάσει ιστοσελίδες για επιχειρήσεις σχεδόν σε κάθε τομέα της κυπριακής οικονομίας. Αυτοί είναι οι κλάδοι με τους οποίους συνεργαζόμαστε πιο συχνά:
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {industries.map((ind) => (
              <AnimateIn key={ind.name}>
                <div className="flex gap-4 bg-[#F8F9FC] rounded-2xl p-5 border border-[#E8EAF0]">
                  <span className="text-2xl mt-0.5">{ind.icon}</span>
                  <div>
                    <h3 className="font-bold text-[#111315] text-sm mb-1">{ind.name}</h3>
                    <p className="text-[#5B6472] text-sm leading-relaxed">{ind.desc}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* -- ΤΙΜΕΣ -- */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-3">
              Τιμές Κατασκευής Ιστοσελίδας στην Κύπρο
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              Πιστεύουμε στη διαφανή, σταθερή τιμολόγηση. Χωρίς χρέωση ανά ώρα, χωρίς εκπλήξεις στο τιμολόγιο. Αυτό κοστίζει μια επαγγελματική ιστοσελίδα με τη D&M Labs:
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                price: "€299",
                desc: "Ιδανικό για νέες επιχειρήσεις που χρειάζονται γρήγορα μια καθαρή, επαγγελματική παρουσία στο διαδίκτυο.",
                features: [
                  "Επώνυμη επαγγελματική σελίδα",
                  "Responsive για κινητά",
                  "Κουμπί WhatsApp",
                  "Σύνδεσμοι social media",
                  "Widget προσβασιμότητας",
                  "2 γύροι αναθεωρήσεων",
                  "Παράδοση σε 5-7 μέρες",
                ],
                highlight: false,
              },
              {
                name: "Business",
                price: "€399",
                desc: "Για καθιερωμένες κυπριακές επιχειρήσεις που χρειάζονται μια ολοκληρωμένη ιστοσελίδα με έμφαση στη μετατροπή επισκεπτών σε πελάτες.",
                features: [
                  "Έως 5 σελίδες",
                  "Responsive για κινητά",
                  "Φόρμα επικοινωνίας + κρατήσεων",
                  "Google Maps + Reviews widget",
                  "Ενότητα μαρτυριών",
                  "Βασική SEO βελτιστοποίηση",
                  "Βελτιστοποίηση ταχύτητας",
                  "3 γύροι αναθεωρήσεων",
                  "Παράδοση σε 7-10 μέρες",
                ],
                highlight: true,
              },
              {
                name: "Premium",
                price: "€699",
                desc: "Για επιχειρήσεις που θέλουν μια πλήρως custom, πλούσια σε χαρακτηριστικά ιστοσελίδα με τα πάντα συμπεριλαμβανόμενα.",
                features: [
                  "Έως 7 σελίδες",
                  "Πλήρως custom σχεδιασμός + animations",
                  "Φόρμα επικοινωνίας + κρατήσεων",
                  "Google Maps + Reviews widget",
                  "Μαρτυρίες + gallery",
                  "5 SEO blog άρθρα",
                  "Πλήρης meta/SEO δομή",
                  "Pop-up συμπεριλαμβάνεται",
                  "5 γύροι αναθεωρήσεων",
                  "Παράδοση σε 10-14 μέρες",
                ],
                highlight: false,
              },
            ].map((pkg) => (
              <AnimateIn key={pkg.name}>
                <div className={`rounded-2xl p-6 border h-full flex flex-col ${pkg.highlight ? "bg-gradient-to-br from-[#5B8CFF] to-[#8B5CFF] border-transparent text-white shadow-lg" : "bg-white border-[#E8EAF0] text-[#111315] shadow-sm"}`}>
                  <div className="mb-4">
                    <span className={`text-xs font-bold uppercase tracking-widest ${pkg.highlight ? "text-blue-100" : "text-[#5B8CFF]"}`}>{pkg.name}</span>
                    <div className={`text-4xl font-extrabold mt-1 ${pkg.highlight ? "text-white" : "text-[#111315]"}`}>{pkg.price}</div>
                  </div>
                  <p className={`text-sm mb-5 leading-relaxed ${pkg.highlight ? "text-blue-100" : "text-[#5B6472]"}`}>{pkg.desc}</p>
                  <ul className="flex flex-col gap-2 mb-6 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className={`flex items-center gap-2 text-sm ${pkg.highlight ? "text-white" : "text-[#5B6472]"}`}>
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${pkg.highlight ? "bg-white/20 text-white" : "bg-[#EEF3FF] text-[#5B8CFF]"}`}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/el/contact">
                    <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${pkg.highlight ? "bg-white text-[#5B8CFF] hover:bg-blue-50" : "bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white hover:opacity-90"}`}>
                      Λάβετε Δωρεάν Προσφορά
                    </button>
                  </Link>
                </div>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn>
            <p className="text-center text-sm text-[#5B6472] mt-8">
              Όλες οι τιμές είναι εφάπαξ. Χωρίς μηνιαίες χρεώσεις εκτός αν επιλέξετε προαιρετικό πλάνο συντήρησης.{" "}
              <Link href="/el/pricing">
                <span className="text-[#5B8CFF] font-semibold hover:underline cursor-pointer">Δείτε πλήρεις τιμές</span>
              </Link>
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* -- ΓΙΑΤΙ D&M LABS -- */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">
              Γιατί να Επιλέξετε τη D&M Labs για Κατασκευή Ιστοσελίδας στην Κύπρο
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              Υπάρχουν δεκάδες <strong>web designers στην Κύπρο</strong>. Αυτό που κάνει τη D&M Labs διαφορετική:
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map((item) => (
              <AnimateIn key={item.title}>
                <div className="bg-[#F8F9FC] rounded-2xl p-5 border border-[#E8EAF0]">
                  <span className="text-2xl mb-3 block">{item.icon}</span>
                  <h3 className="font-bold text-[#111315] text-sm mb-1">{item.title}</h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* -- ΠΟΛΕΙΣ -- */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">
              Κατασκευή Ιστοσελίδας σε Όλη την Κύπρο
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              Εξυπηρετούμε επιχειρήσεις σε κάθε πόλη και επαρχία της Κύπρου. Κάντε κλικ σε μια πόλη παρακάτω για να μάθετε περισσότερα για τις υπηρεσίες μας στην περιοχή σας.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cities.map((city) => (
              <AnimateIn key={city.name}>
                <div className="bg-white rounded-2xl p-5 border border-[#E8EAF0] shadow-sm h-full flex flex-col">
                  <h3 className="font-bold text-[#111315] text-base mb-2">
                    Κατασκευή Ιστοσελίδας {city.name}
                  </h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed flex-1 mb-4">{city.desc}</p>
                  {city.slug ? (
                    <Link href={city.slug}>
                      <span style={{ color: city.color }} className="text-sm font-semibold hover:underline cursor-pointer">
                        Δείτε τη σελίδα {city.name} →
                      </span>
                    </Link>
                  ) : (
                    <Link href="/el/contact">
                      <span style={{ color: city.color }} className="text-sm font-semibold hover:underline cursor-pointer">
                        Ζητήστε προσφορά για {city.name} →
                      </span>
                    </Link>
                  )}
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* -- ΠΩΣ ΛΕΙΤΟΥΡΓΕΙ -- */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">
              Πώς να Αποκτήσετε Ιστοσελίδα για την Κυπριακή Επιχείρησή σας
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              Η απόκτηση μιας <strong>επαγγελματικής ιστοσελίδας στην Κύπρο</strong> με τη D&M Labs είναι μια απλή διαδικασία τεσσάρων βημάτων:
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: "01", title: "Δωρεάν Συμβουλευτική", desc: "Πείτε μας για την επιχείρησή σας, τους στόχους σας και τον προϋπολογισμό σας. Θα προτείνουμε το κατάλληλο πακέτο και θα απαντήσουμε σε κάθε ερώτηση - χωρίς δέσμευση." },
              { step: "02", title: "Σχεδιασμός & Κατασκευή", desc: "Σχεδιάζουμε την ιστοσελίδα σας και μοιραζόμαστε μια ζωντανή προεπισκόπηση για τα σχόλιά σας. Μπορείτε να ζητήσετε αλλαγές πριν δημοσιευτεί οτιδήποτε." },
              { step: "03", title: "Αναθεώρηση & Έγκριση", desc: "Ελέγχετε την ολοκληρωμένη ιστοσελίδα, κάνουμε τις τελικές προσαρμογές και εγκρίνετε τη δημοσίευση." },
              { step: "04", title: "Κυκλοφορία & Υποστήριξη", desc: "Η ιστοσελίδα σας δημοσιεύεται. Αναλαμβάνουμε την τεχνική ρύθμιση - domain, hosting, πιστοποιητικό SSL - και παρέχουμε υποστήριξη μετά τη δημοσίευση." },
            ].map((s) => (
              <AnimateIn key={s.step}>
                <div className="bg-[#F8F9FC] rounded-2xl p-5 border border-[#E8EAF0]">
                  <span className="text-3xl font-extrabold text-[#5B8CFF] opacity-30 block mb-2">{s.step}</span>
                  <h3 className="font-bold text-[#111315] text-sm mb-2">{s.title}</h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* -- ΧΑΡΤΗΣ -- */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-3">
              Εξυπηρετούμε Επιχειρήσεις σε Όλη την Κύπρο
            </h2>
            <p className="text-[#5B6472] mb-8 leading-relaxed">
              Η D&M Labs συνεργάζεται με επιχειρήσεις σε όλη την Κύπρο - από Λεμεσό και Λευκωσία μέχρι Λάρνακα, Πάφο, Αμμόχωστο, Παραλίμνι και κάθε επαρχία ενδιάμεσα. Εξυπηρετούμε επίσης επιχειρήσεις στην Ελλάδα (Αθήνα, Θεσσαλονίκη) και διεθνώς. Η απόσταση δεν αποτελεί ποτέ παράγοντα.
            </p>
          </AnimateIn>
          <div className="rounded-2xl overflow-hidden border border-[#E8EAF0] shadow-sm" style={{ height: "360px" }}>
            <iframe
              title="Κύπρος"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d524000!2d33.0!3d35.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de1767b0b5c3e7%3A0x5a4e7e1b2a3c4d5e!2sCyprus!5e0!3m2!1sen!2scy!4v1700000000001!5m2!1sen!2scy"
            />
          </div>
        </div>
      </section>

      {/* -- ΣΥΧΝΕΣ ΕΡΩΤΗΣΕΙΣ -- */}
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-10">
              Συχνές Ερωτήσεις - Κατασκευή Ιστοσελίδας Κύπρος
            </h2>
          </AnimateIn>
          <div className="flex flex-col gap-6">
            {faqs.map((faq) => (
              <AnimateIn key={faq.q}>
                <div className="bg-[#F8F9FC] rounded-2xl p-6 border border-[#E8EAF0] shadow-sm">
                  <h3 className="font-bold text-[#111315] text-base mb-3">{faq.q}</h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{faq.a}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* -- CTA -- */}
      <section className="section-spacing bg-gradient-to-br from-[#5B8CFF] to-[#8B5CFF]">
        <div className="container max-w-3xl mx-auto text-center">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Έτοιμοι να φέρετε την κυπριακή επιχείρησή σας online;
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Πείτε μας για την επιχείρησή σας και θα σας στείλουμε δωρεάν πρόταση μέσα σε 24 ώρες. Χωρίς δέσμευση. Μπορείτε επίσης να μας στείλετε απευθείας στο WhatsApp - απαντάμε γρήγορα.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/el/contact">
                <button className="px-10 py-4 rounded-xl bg-white text-[#5B8CFF] font-bold text-base hover:bg-blue-50 transition-colors shadow-lg">
                  Δωρεάν Συμβουλευτική
                </button>
              </Link>
              <a
                href="https://wa.me/35797472847?text=%CE%93%CE%B5%CE%B9%CE%B1%20%CF%83%CE%B1%CF%82!%20%CE%95%CE%BD%CE%B4%CE%B9%CE%B1%CF%86%CE%AD%CF%81%CE%BF%CE%BC%CE%B1%CE%B9%20%CE%B3%CE%B9%CE%B1%20%CE%B9%CF%83%CF%84%CE%BF%CF%83%CE%B5%CE%BB%CE%AF%CE%B4%CE%B1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-10 py-4 rounded-xl bg-white/20 border border-white/40 text-white font-bold text-base hover:bg-white/30 transition-colors">
                  Συνομιλήστε στο WhatsApp
                </button>
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

    </main>
  );
}
