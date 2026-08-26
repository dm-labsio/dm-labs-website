/* ============================================================
   D&M LABS — /web-design-nicosia landing page
   Design: #0F172A dark, #5B8CFF→#8B5CFF gradient accents, #F6F6F4 bg
   SEO target: "web design Λευκωσία", "website design Λευκωσία Cyprus"
   LocalBusiness schema injected on mount
   ============================================================ */
import { Link } from "wouter";
import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import AnimateIn from "@/components/AnimateIn";

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "DM-Labs.io",
  "description": "Η DM-Labs.io σχεδιάζει και κατασκευάζει επαγγελματικές ιστοσελίδες για επιχειρήσεις στη Λευκωσία και σε όλη την Κύπρο. Mobile-first, βελτιστοποιημένες για SEO, με παράδοση σε 5-14 ημέρες.",
  "url": "https://dm-labs.io/el/web-design-nicosia/",
  "logo": "https://dm-labs.io/logo.png",
  "image": "https://dm-labs.io/social/dm-labs-website-social-card.png",
  "telephone": "+35797472847",
  "email": "info@dm-labs.io",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Λευκωσία",
    "addressCountry": "CY"
  },
  "areaServed": [
    { "@type": "City", "name": "Λευκωσία" },
    { "@type": "City", "name": "Στρόβολος" },
    { "@type": "City", "name": "Αγλαντζιά" },
    { "@type": "City", "name": "Λατσιά" },
    { "@type": "City", "name": "Λακατάμια" },
    { "@type": "AdministrativeArea", "name": "Επαρχία Λευκωσίας" }
  ],
  "priceRange": "€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Τραπεζική Μεταφορά, PayPal",
  "openingHours": "Δε-Πα 09:00-18:00",
  "sameAs": [
    "https://www.instagram.com/dmlabs.io"
  ]
};

const faqs = [
  {
    q: "Πόσο κοστίζει μια ιστοσελίδα για μια επιχείρηση στη Λευκωσία;",
    a: "Τα πακέτα μας ξεκινούν από €299 για μια ιστοσελίδα Launch Website — μια πλήρως προσαρμοσμένη, responsive για κινητά ιστοσελίδα με εγκατάσταση SEO, φόρμα επικοινωνίας και όλα όσα χρειάζεστε για να βγείτε live. Το πακέτο Growth Website ξεκινά από €749 και το Pro Website από €1,499. Η τιμή για Enterprise / Custom έργα προσαρμόζεται στο εύρος του έργου σας. Πάντα προτείνουμε μια δωρεάν συμβουλευτική συνάντηση πρώτα, ώστε να λάβετε μια ακριβή προσφορά χωρίς εκπλήξεις."
  },
  {
    q: "Συνεργάζεστε με επιχειρήσεις στη Λευκωσία εξ αποστάσεως;",
    a: "Ναι, αποκλειστικά. Η DM-Labs.io συνεργάζεται με πελάτες σε όλη την Κύπρο χωρίς να απαιτούνται συναντήσεις από κοντά. Η όλη διαδικασία — αρχική ενημέρωση, σχεδιασμός, αναθεωρήσεις και έναρξη — διεκπεραιώνεται μέσω WhatsApp, email και βιντεοκλήσεων. Οι περισσότεροι πελάτες το βρίσκουν ταχύτερο και πιο βολικό από τον προγραμματισμό επισκέψεων στο γραφείο."
  },
  {
    q: "Μπορείτε να φτιάξετε μια ιστοσελίδα στα ελληνικά και στα αγγλικά;",
    a: "Φυσικά. Φτιάχνουμε δίγλωσσες ιστοσελίδες τόσο στα ελληνικά όσο και στα αγγλικά, και μια πλήρης ελληνική έκδοση είναι διαθέσιμη κατόπιν αιτήματος. Εάν το κοινό σας είναι κυρίως ελληνόφωνο, μπορούμε να δημιουργήσουμε μια αποκλειστικά ελληνική ιστοσελίδα. Είμαστε άνετοι να δουλεύουμε με ελληνικό περιεχόμενο και να συμβουλεύουμε για το πώς να δομήσετε το κείμενο για αναγνωσιμότητα και ορατότητα στις μηχανές αναζήτησης."
  },
  {
    q: "Πόσος χρόνος χρειάζεται για την κατασκευή μιας ιστοσελίδας για μια επιχείρηση στη Λευκωσία;",
    a: "Το πακέτο Launch Website συνήθως παραδίδεται εντός 5 έως 7 ημερών από τη στιγμή που έχουμε το περιεχόμενο και τα σχόλιά σας. Τα πακέτα Growth Website και Pro Website χρειάζονται 10 έως 14 ημέρες, ανάλογα με τον αριθμό των σελίδων και τυχόν προσαρμοσμένες λειτουργίες. Σας κρατάμε ενήμερους καθ' όλη τη διάρκεια και δεν εξαφανιζόμαστε μεταξύ των οροσήμων."
  }
];

const industries = [
  { name: "Δικηγορικά Γραφεία & Νομικές Υπηρεσίες", icon: "⚖️", desc: "Η Λευκωσία είναι ο νομικός και οικονομικός κόμβος της Κύπρου. Μια επαγγελματική ιστοσελίδα χτίζει αξιοπιστία και προσελκύει πελάτες υψηλής αξίας." },
  { name: "Εστιατόρια & Καφέ", icon: "🍽️", desc: "Από την παλιά πόλη μέχρι την Έγκωμη, η γαστρονομική σκηνή της Λευκωσίας είναι ανταγωνιστική. Μια γρήγορη ιστοσελίδα με πλούσιο μενού αυξάνει τις κρατήσεις και τις επισκέψεις." },
  { name: "Κλινικές & Υγεία", icon: "🏥", desc: "Οι ιδιωτικές κλινικές, οι οδοντίατροι και οι ειδικοί γιατροί στη Λευκωσία χρειάζονται μια αξιόπιστη online παρουσία για να προσελκύσουν και να διατηρήσουν ασθενείς." },
  { name: "Λιανική & Μπουτίκ", icon: "🛍️", desc: "Είτε στη λεωφόρο Μακαρίου είτε σε έναν παράδρομο της γειτονιάς, μια ιστοσελίδα επεκτείνει την εμβέλειά σας πέρα από την πελατεία του δρόμου." },
  { name: "Λογιστική & Χρηματοοικονομικά", icon: "📊", desc: "Ο χρηματοοικονομικός τομέας της Κύπρου έχει κέντρο τη Λευκωσία. Μια κομψή ιστοσελίδα σηματοδοτεί επαγγελματισμό στους εταιρικούς πελάτες." },
  { name: "Κτηματομεσιτικά Γραφεία", icon: "🏠", desc: "Οι αγοραστές ακινήτων ψάχνουν πρώτα online. Μια καθαρή, γρήγορη ιστοσελίδα με καταχωρίσεις και φόρμες επικοινωνίας μετατρέπει τους επισκέπτες σε ενδιαφερόμενους." },
];

export default function WebDesignNicosiaEl() {
  useSEO({
    title: "Κατασκευή Ιστοσελίδας Λευκωσία | Επαγγελματικές Ιστοσελίδες από €299 | DM-Labs.io",
    description: "Επαγγελματική κατασκευή ιστοσελίδων για επιχειρήσεις στη Λευκωσία, Κύπρος. Προσαρμοσμένες ιστοσελίδες σε 5-14 ημέρες από €299. Mobile-first, βελτιστοποιημένες για SEO, χωρίς κρυφές χρεώσεις. Δωρεάν συμβουλευτική.",
    canonicalPath: "/el/web-design-nicosia/"
  });

  useEffect(() => {
    const existing = document.getElementById("schema-nicosia");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "schema-nicosia";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schemaMarkup);
    document.head.appendChild(script);
    return () => {
      const s = document.getElementById("schema-nicosia");
      if (s) s.remove();
    };
  }, []);

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#F0EAFF]">
        <div className="container max-w-4xl mx-auto text-center">
          <AnimateIn>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">
              Κατασκευή Ιστοσελίδας Λευκωσία
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111315] mb-4 leading-tight">
              Επαγγελματικές Ιστοσελίδες για{" "}
              <span className="bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] bg-clip-text text-transparent">
                Επιχειρήσεις στη Λευκωσία
              </span>
            </h1>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-8 leading-relaxed">
              Η DM-Labs.io είναι ένα στούντιο σχεδιασμού ιστοσελίδων που βοηθά τις επιχειρήσεις στη Λευκωσία να χτίσουν μια ισχυρή, αξιόπιστη online παρουσία. Παραδίδουμε γρήγορες, mobile-first και εστιασμένες στη μετατροπή ιστοσελίδες — ξεκινώντας από €299 — ώστε η επιχείρησή σας να ξεχωρίζει στην πρωτεύουσα της Κύπρου.
            </p>
            <p className="text-sm text-[#9CA3AF] mb-8">
              Αυτή η σελίδα είναι διαθέσιμη και στα αγγλικά κατόπιν αιτήματος.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/el/contact/">
                <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                  Λάβετε Δωρεάν Συμβουλευτική
                </button>
              </Link>
              <Link href="/el/pricing/">
                <button className="px-8 py-3.5 rounded-xl border border-[#5B8CFF] text-[#5B8CFF] font-semibold text-base hover:bg-[#EEF3FF] transition-colors bg-white">
                  Δείτε τις Τιμές
                </button>
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── WHY NICOSIA BUSINESSES NEED A WEBSITE ── */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">
              Γιατί οι Επιχειρήσεις της Λευκωσίας Χρειάζονται μια Σωστή Ιστοσελίδα το 2026
            </h2>
            <p className="text-[#5B6472] leading-relaxed mb-6">
              Η Λευκωσία είναι η εμπορική, νομική και διοικητική πρωτεύουσα της Κύπρου. Φιλοξενεί τη μεγαλύτερη συγκέντρωση δικηγορικών γραφείων, εταιρειών χρηματοοικονομικών υπηρεσιών, κυβερνητικών αναδόχων, ιδιωτικών κλινικών και επιχειρήσεων λιανικής. Ο ανταγωνισμός είναι έντονος — και το πρώτο μέρος που οι περισσότεροι πιθανοί πελάτες ψάχνουν είναι το Google.
            </p>
            <p className="text-[#5B6472] leading-relaxed mb-6">
              Μια αργή, ξεπερασμένη ή ανύπαρκτη ιστοσελίδα δεν είναι απλώς μια χαμένη ευκαιρία — σας κοστίζει ενεργά πελάτες. Μελέτες δείχνουν σταθερά ότι πάνω από το 75% των χρηστών κρίνουν την αξιοπιστία μιας εταιρείας με βάση το design της ιστοσελίδας της. Σε μια τόσο επαγγελματική αγορά όπως η Λευκωσία, οι πρώτες εντυπώσεις είναι το παν.
            </p>
            <p className="text-[#5B6472] leading-relaxed">
              Η DM-Labs.io κατασκευάζει ιστοσελίδες που είναι γρήγορες, mobile-first και βελτιστοποιημένες για το Google από την πρώτη μέρα. Είτε είστε δικηγορικό γραφείο στη λεωφόρο Μακαρίου, εστιατόριο στην παλιά πόλη ή κλινική στον Στρόβολο, χτίζουμε το είδος της ιστοσελίδας που μετατρέπει τους επισκέπτες σε πελάτες.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── INDUSTRIES WE SERVE ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-3">
              Κλάδοι που Εξυπηρετούμε στη Λευκωσία
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              Συνεργαζόμαστε με ένα ευρύ φάσμα επιχειρήσεων σε όλη τη Λευκωσία. Κάθε ιστοσελίδα κατασκευάζεται σύμφωνα με τις συγκεκριμένες ανάγκες του κλάδου σας — όχι με ένα γενικό πρότυπο.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind) => (
              <AnimateIn key={ind.name}>
                <div className="bg-white rounded-2xl p-6 border border-[#E8EAF0] shadow-sm h-full">
                  <span className="text-3xl mb-3 block">{ind.icon}</span>
                  <h3 className="font-bold text-[#111315] text-base mb-2">{ind.name}</h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{ind.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-3">
              Τιμές Κατασκευής Ιστοσελίδας για Επιχειρήσεις στη Λευκωσία
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              Διαφανής, σταθερή τιμολόγηση. Χωρίς κρυφές χρεώσεις, χωρίς εκπλήξεις με ωριαία χρέωση. Κάθε πακέτο περιλαμβάνει προσαρμοσμένο σχεδιασμό, mobile-first κατασκευή, εγκατάσταση SEO και φόρμα επικοινωνίας.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: "Launch Website",
                price: "€299",
                desc: "Ιδανικό για αυτοαπασχολούμενους, freelancers και μικρές επιχειρήσεις που χρειάζονται μια καθαρή, επαγγελματική online παρουσία.",
                features: ["Έως 5 σελίδες", "Responsive για κινητά", "Φόρμα επικοινωνίας", "Βασική εγκατάσταση SEO", "Ενσωμάτωση Google Maps", "Παράδοση σε 5-7 ημέρες"],
                highlight: false
              },
              {
                name: "Growth Website",
                price: "€749",
                desc: "Ιδανικό για καθιερωμένες επιχειρήσεις στη Λευκωσία που χρειάζονται περισσότερο περιεχόμενο, περισσότερες σελίδες και ισχυρότερα θεμέλια SEO.",
                features: ["Έως 10 σελίδες", "Προηγμένη εγκατάσταση SEO", "Ενότητα άρθρων ή νέων", "Κουμπί συνομιλίας WhatsApp", "Ενσωμάτωση Analytics", "Παράδοση σε 7-10 ημέρες"],
                highlight: true
              },
              {
                name: "Pro Website",
                price: "€1,499",
                desc: "Για επιχειρήσεις που θέλουν μια πλήρως προσαρμοσμένη ιστοσελίδα με πλούσια χαρακτηριστικά, όπως συστήματα κρατήσεων, πολυγλωσσικό περιεχόμενο ή e-commerce.",
                features: ["Απεριόριστες σελίδες", "Σύστημα κρατήσεων / ερωτήσεων", "Δίγλωσσο (Ελληνικά + Αγγλικά)", "Προσαρμοσμένα animations", "Υποστήριξη κατά προτεραιότητα", "Παράδοση σε 10-14 ημέρες"],
                highlight: false
              }
            ].map((pkg) => (
              <AnimateIn key={pkg.name}>
                <div className={`rounded-2xl p-6 border h-full flex flex-col ${pkg.highlight ? "border-[#5B8CFF] shadow-lg bg-gradient-to-b from-[#EEF3FF] to-white" : "border-[#E8EAF0] shadow-sm bg-white"}`}>
                  {pkg.highlight && (
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#5B8CFF] mb-2">Πιο Δημοφιλές</span>
                  )}
                  <h3 className="font-extrabold text-[#111315] text-xl mb-1">{pkg.name}</h3>
                  <p className="text-3xl font-extrabold text-[#5B8CFF] mb-3">{pkg.price}</p>
                  <p className="text-[#5B6472] text-sm leading-relaxed mb-4">{pkg.desc}</p>
                  <ul className="flex flex-col gap-2 mb-6 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[#374151]">
                        <span className="text-[#5B8CFF] mt-0.5 shrink-0">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/el/contact/">
                    <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${pkg.highlight ? "bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white hover:opacity-90" : "border border-[#5B8CFF] text-[#5B8CFF] hover:bg-[#EEF3FF]"}`}>
                      Ξεκινήστε
                    </button>
                  </Link>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY D&M LABS ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">
              Γιατί οι Επιχειρήσεις της Λευκωσίας Επιλέγουν τη DM-Labs.io
            </h2>
            <p className="text-[#5B6472] leading-relaxed mb-8">
              Η DM-Labs.io είναι ένα απομακρυσμένο στούντιο σχεδιασμού ιστοσελίδων. Συνεργαζόμαστε με επιχειρήσεις σε όλη την Κύπρο — από τη Λευκωσία και τη Λεμεσό μέχρι μικρότερες πόλεις — εξ ολοκλήρου online. Χωρίς επισκέψεις στο γραφείο, χωρίς καθυστερήσεις για συναντήσεις από κοντά. Την πλήρη διαδικασία, από την πρώτη κλήση μέχρι την έναρξη, τη διαχειριζόμαστε εμείς, ώστε να μπορείτε να εστιάσετε στη λειτουργία της επιχείρησής σας.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "Γρήγορη παράδοση",
                desc: "Οι περισσότερες ιστοσελίδες είναι online εντός 5 έως 14 ημερών. Δουλεύουμε γρήγορα, επικοινωνούμε ξεκάθαρα και δεν σας αφήνουμε να περιμένετε."
              },
              {
                title: "Δεν απαιτούνται τεχνικές γνώσεις",
                desc: "Δεν χρειάζεται να καταλαβαίνετε από κώδικα, hosting ή SEO. Αναλαμβάνουμε τα πάντα και εξηγούμε ό,τι έχει σημασία με απλά λόγια."
              },
              {
                title: "Κατασκευασμένες για μετατροπές",
                desc: "Κάθε σελίδα σχεδιάζεται με έναν στόχο - να μετατρέπει τους επισκέπτες σε υποψήφιους πελάτες. Ένας καλός σχεδιασμός έχει αξία μόνο αν φέρνει αποτελέσματα."
              }
            ].map((w) => (
              <AnimateIn key={w.title}>
                <div className="bg-white rounded-2xl p-6 border border-[#E8EAF0] shadow-sm">
                  <h3 className="font-bold text-[#111315] text-lg mb-2">{w.title}</h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{w.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-3">
              Εξυπηρετούμε Επιχειρήσεις σε όλη τη Λευκωσία
            </h2>
            <p className="text-[#5B6472] mb-8">
              Συνεργαζόμαστε με επιχειρήσεις σε όλη τη Λευκωσία — από την παλιά περιτειχισμένη πόλη και τη λεωφόρο Μακαρίου μέχρι τον Στρόβολο, την Αγλαντζιά, τα Λατσιά, τη Λακατάμια και την ευρύτερη Επαρχία Λευκωσίας. Η απόσταση δεν αποτελεί εμπόδιο.
            </p>
          </AnimateIn>
          <div className="rounded-2xl overflow-hidden border border-[#E8EAF0] shadow-sm" style={{ height: "360px" }}>
            <iframe
              title="Λευκωσία, Κύπρος"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52000!2d33.3642!3d35.1856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de1767b0b5c3e7%3A0x5a4e7e1b2a3c4d5e!2sNicosia%2C%20Cyprus!5e0!3m2!1sel!2scy!4v1700000000001!5m2!1sel!2scy"
            />
          </div>
        </div>
      </section>

      {/* ── CROSS-LINKS ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">
              Εξυπηρετούμε και Άλλες Πόλεις
            </h2>
            <p className="text-[#5B6472] mb-6 leading-relaxed">
              Η DM-Labs.io συνεργάζεται με επιχειρήσεις σε όλη την Κύπρο και όχι μόνο. Έχουμε επίσης ειδικές σελίδες για άλλες πόλεις που εξυπηρετούμε:
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/el/web-design-limassol/">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#5B8CFF] text-[#5B8CFF] font-semibold text-sm hover:bg-[#EEF3FF] transition-colors cursor-pointer">
                  Κατασκευή Ιστοσελίδας Λεμεσός →
                </span>
              </Link>
              <Link href="/el/web-design-thessaloniki/">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#8B5CFF] text-[#8B5CFF] font-semibold text-sm hover:bg-[#F3EEFF] transition-colors cursor-pointer">
                  Κατασκευή Ιστοσελίδας Θεσσαλονίκη →
                </span>
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Συχνές Ερωτήσεις ── */}
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-10">
              Συχνές Ερωτήσεις
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

      {/* ── CTA ── */}
      <section className="section-spacing bg-gradient-to-br from-[#5B8CFF] to-[#8B5CFF]">
        <div className="container max-w-3xl mx-auto text-center">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Είστε έτοιμοι να βάλετε την επιχείρησή σας στη Λευκωσία online;
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Πείτε μας για την επιχείρησή σας και θα σας στείλουμε μια δωρεάν πρόταση μέσα σε 24 ώρες. Χωρίς δέσμευση. Μπορείτε επίσης να επικοινωνήσετε μαζί μας απευθείας στο WhatsApp — απαντάμε γρήγορα.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/el/contact/">
                <button className="px-10 py-4 rounded-xl bg-white text-[#5B8CFF] font-bold text-base hover:bg-blue-50 transition-colors shadow-lg">
                  Επικοινωνήστε μαζί μας
                </button>
              </Link>
              <a
                href="https://wa.me/35797472847?text=%CE%93%CE%B5%CE%B9%CE%B1%20%CF%83%CE%B1%CF%82!%20%CE%95%CE%BD%CE%B4%CE%B9%CE%B1%CF%86%CE%AD%CF%81%CE%BF%CE%BC%CE%B1%CE%B9%20%CE%B3%CE%B9%CE%B1%20%CE%B9%CF%83%CF%84%CE%BF%CF%83%CE%B5%CE%BB%CE%AF%CE%B4%CE%B1%20%CE%B3%CE%B9%CE%B1%20%CF%84%CE%B7%CE%BD%20%CE%B5%CF%80%CE%B9%CF%87%CE%B5%CE%AF%CF%81%CE%B7%CF%83%CE%AE%20%CE%BC%CE%BF%CF%85%20%CF%83%CF%84%CE%B7%20%CE%9B%CE%B5%CF%85%CE%BA%CF%89%CF%83ία."
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
