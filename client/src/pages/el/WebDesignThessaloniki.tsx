import { useEffect } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";

// SEO landing page: /web-design-thessaloniki
// Primary keyword: "web design Θεσσαλονίκη"
// Secondary (GR): "κατασκευή ιστοσελίδας Θεσσαλονίκη"
// Tertiary (GR, price-intent): "κατασκευή ιστοσελίδας Θεσσαλονίκη τιμές"
// Design: matches DM-Labs.io site style - light bg, brand gradient accents, clean typography

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "DM-Labs.io",
  url: "https://dm-labs.io",
  telephone: "+35797472847",
  email: "info@dm-labs.io",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Eleftheriou Chandrinou 5",
    addressLocality: "Paphos",
    postalCode: "8045",
    addressCountry: "CY",
  },
  areaServed: ["Θεσσαλονίκη", "Κεντρική Μακεδονία", "Ελλάδα"],
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 40.6401,
      longitude: 22.9444,
    },
    geoRadius: "50000",
  },
  description:
    "Η DM-Labs.io είναι ένα απομακρυσμένο στούντιο web design που δημιουργεί επαγγελματικές, mobile-first, βελτιστοποιημένες για SEO ιστοσελίδες για επιχειρήσεις στη Θεσσαλονίκη και σε όλη την Ελλάδα. Ιστοσελίδες από €299, με παράδοση σε 5-14 ημέρες.",
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Τραπεζική Μεταφορά, PayPal",
  openingHours: "Δε-Πα 09:00-18:00",
  sameAs: ["https://www.instagram.com/dmlabs.io"],
};

const faqs = [
  {
    q: "Πόσο κοστίζει η κατασκευή ιστοσελίδας στη Θεσσαλονίκη;",
    a: "Τα πακέτα μας για επιχειρήσεις στη Θεσσαλονίκη ξεκινούν από €299 για το πακέτο Launch Website. Αυτό περιλαμβάνει πλήρως προσαρμοσμένο σχεδιασμό, responsive για κινητά, αρχική ρύθμιση SEO, φόρμα επικοινωνίας και όλα όσα χρειάζεστε για να βγείτε online. Το πακέτο Growth Website ξεκινά από €749 και το Pro Website από €1,499. Η τιμή για Enterprise / Custom έργα προσαρμόζεται στο εύρος του έργου σας. Οι τιμές εξαρτώνται από τις απαιτήσεις του έργου, γι\
' αυτό συνιστούμε πάντα μια δωρεάν συμβουλευτική συνάντηση πρώτα - με αυτόν τον τρόπο λαμβάνετε μια ακριβή προσφορά χωρίς εκπλήξεις.",
  },
  {
    q: "Εργάζεστε με επιχειρήσεις στη Θεσσαλονίκη απομακρυσμένα;",
    a: "Ναι, αποκλειστικά. Η DM-Labs.io συνεργάζεται με πελάτες σε όλη την Ελλάδα χωρίς να απαιτούνται συναντήσεις πρόσωπο με πρόσωπο. Η πλήρης διαδικασία - αρχική ενημέρωση, σχεδιασμός, αναθεωρήσεις και έναρξη - διαχειρίζεται μέσω WhatsApp, email και βιντεοκλήσεων. Οι περισσότεροι πελάτες μας το βρίσκουν πιο βολικό από τον προγραμματισμό επισκέψεων στο γραφείο, και σημαίνει ότι μπορούμε να κινηθούμε γρηγορότερα. Η απομακρυσμένη εργασία δεν αποτέλεσε ποτέ εμπόδιο για την παράδοση ενός εξαιρετικού αποτελέσματος.",
  },
  {
    q: "Μπορείτε να κατασκευάσετε μια ιστοσελίδα στα ελληνικά;",
    a: "Φυσικά. Φτιάχνουμε δίγλωσσες ιστοσελίδες, τόσο στα ελληνικά όσο και στα αγγλικά, και μια πλήρως ελληνική έκδοση οποιασδήποτε ιστοσελίδας είναι διαθέσιμη κατόπιν αιτήματος. Εάν το κοινό σας είναι κυρίως ελληνόφωνο, μπορούμε επίσης να δημιουργήσουμε μια αποκλειστικά ελληνική ιστοσελίδα. Είμαστε άνετοι να δουλεύουμε με ελληνικό περιεχόμενο και μπορούμε να σας συμβουλεύσουμε για το πώς να δομήσετε το κείμενο για βέλτιστη αναγνωσιμότητα και ορατότητα στις μηχανές αναζήτησης.",
  },
  {
    q: "Πόσος χρόνος χρειάζεται για την κατασκευή μιας ιστοσελίδας για μια επιχείρηση στη Θεσσαλονίκη;",
    a: "Το πακέτο Launch Website συνήθως παραδίδεται εντός 5 έως 7 ημερών από τη στιγμή που έχουμε το περιεχόμενο και την ανατροφοδότησή σας. Τα πακέτα Growth Website και Pro Website χρειάζονται 10 έως 14 ημέρες, ανάλογα με τον αριθμό των σελίδων και τυχόν προσαρμοσμένες λειτουργίες. Σας κρατάμε ενήμερους καθ' όλη τη διάρκεια και δεν εξαφανιζόμαστε μεταξύ των οροσήμων.",
  },
];

export default function WebDesignThessalonikiEl() {
  useSEO({
    title: "Κατασκευή Ιστοσελίδας Θεσσαλονίκη | Επαγγελματικές Ιστοσελίδες από €299 | DM-Labs.io",
    description:
      "Επαγγελματικό web design για επιχειρήσεις στη Θεσσαλονίκη. Προσαρμοσμένες ιστοσελίδες που κατασκευάζονται σε 5-14 ημέρες από €299. Mobile-first, βελτιστοποιημένες για SEO, χωρίς κρυφές χρεώσεις. Λάβετε μια δωρεάν συμβουλευτική συνάντηση.",
    canonicalPath: "/el/web-design-thessaloniki/",
  });

  useEffect(() => {
    // Inject LocalBusiness schema
    const existing = document.getElementById("schema-thessaloniki");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "schema-thessaloniki";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schemaMarkup);
    document.head.appendChild(script);
    return () => {
      const s = document.getElementById("schema-thessaloniki");
      if (s) s.remove();
    };
  }, []);

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#F0EAFF]">
        <div className="container max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">
            Κατασκευή Ιστοσελίδας Θεσσαλονίκη
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111315] mb-4 leading-tight">
            Επαγγελματικές Ιστοσελίδες για{" "}
            <span className="bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] bg-clip-text text-transparent">
              Επιχειρήσεις στη Θεσσαλονίκη
            </span>
          </h1>
          <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-8 leading-relaxed">
            Η DM-Labs.io είναι ένα απομακρυσμένο στούντιο web design που βοηθά τις επιχειρήσεις στη Θεσσαλονίκη να χτίσουν μια ισχυρή, αξιόπιστη online παρουσία. Παραδίδουμε γρήγορες, mobile-first και εστιασμένες στη μετατροπή ιστοσελίδες - ξεκινώντας από €299 - ώστε η επιχείρησή σας να ξεχωρίζει στη δεύτερη μεγαλύτερη πόλη της Ελλάδας.
          </p>
          <p className="text-sm text-[#9CA3AF] mb-8">
            (Αυτή η σελίδα είναι επίσης διαθέσιμη στα αγγλικά κατόπιν αιτήματος.)
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/el/contact/">
              <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                Λάβετε Δωρεάν Προσφορά
              </button>
            </Link>
            <Link href="/el/pricing/">
              <button className="px-8 py-3.5 rounded-xl border border-[#5B8CFF] text-[#5B8CFF] font-semibold text-base hover:bg-[#EEF3FF] transition-colors bg-white">
                Δείτε τις Τιμές
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY THESSALONIKI NEEDS A WEBSITE ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-6">
            Γιατί οι Επιχειρήσεις στη Θεσσαλονίκη Χρειάζονται Επαγγελματική Ιστοσελίδα
          </h2>
          <p className="text-[#5B6472] leading-relaxed mb-5">
            Η Θεσσαλονίκη είναι η δεύτερη μεγαλύτερη πόλη της Ελλάδας και μία από τις πιο εμπορικά δραστήριες. Οι επιχειρηματικές περιοχές κατά μήκος της οδού Τσιμισκή και η ιστορική γειτονιά των Λαδάδικων φιλοξενούν εκατοντάδες εστιατόρια, μπουτίκ, δικηγορικά γραφεία και επαγγελματικές υπηρεσίες που ανταγωνίζονται για τους ίδιους τοπικούς πελάτες. Το Αριστοτέλειο Πανεπιστήμιο φέρνει πάνω από 100.000 φοιτητές και ακαδημαϊκούς στην πόλη, και η Διεθνής Έκθεση Θεσσαλονίκης - μία από τις μεγαλύτερες εμπορικές εκθέσεις στη Νοτιοανατολική Ευρώπη - προσελκύει επιχειρηματικούς επισκέπτες από όλη την ήπειρο κάθε χρόνο.
          </p>
          <p className="text-[#5B6472] leading-relaxed mb-5">
            Αυτό το επίπεδο οικονομικής δραστηριότητας σημαίνει επίσης ένα ιδιαίτερα ανταγωνιστικό ψηφιακό τοπίο. Σύμφωνα με τα δεδομένα της Google, πάνω από το 60% των Ελλήνων καταναλωτών αναζητά μια επιχείρηση online πριν επικοινωνήσει. Αν η ιστοσελίδα σας είναι αργή, παλιά ή απλά δεν υπάρχει, δεν χάνετε απλά ορατότητα - στέλνετε ενεργά πιθανούς πελάτες στους ανταγωνιστές σας που έχουν επαγγελματική online παρουσία.
          </p>
          <p className="text-[#5B6472] leading-relaxed mb-5">
            Μια καλοφτιαγμένη ιστοσελίδα κάνει περισσότερα από το να φαίνεται ωραία. Κατατάσσεται στο Google για τις αναζητήσεις που ήδη κάνουν οι πελάτες σας, φορτώνει γρήγορα στο κινητό και μετατρέπει τους επισκέπτες σε ερωτήσεις χωρίς να απαιτεί καμία συνεχή προσπάθεια από εσάς. Για μια επιχείρηση στη Θεσσαλονίκη - όπου η αγορά είναι πυκνή και οι ψηφιακές προσδοκίες αυξάνονται - αυτού του είδους η παρουσία δεν είναι πλέον κάτι προαιρετικό.
          </p>
          <p className="text-[#5B6472] leading-relaxed">
            Οι επιχειρήσεις που επενδύουν σε μια ποιοτική ιστοσελίδα τώρα, πριν ο τομέας τους γίνει πλήρως κορεσμένος online, είναι αυτές που κατακτούν την πιο πολύτιμη επισκεψιμότητα από αναζητήσεις και χτίζουν διαρκή αξιοπιστία τόσο με τοπικούς όσο και με διεθνείς πελάτες.
          </p>
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-3">
            Τι Κατασκευάζουμε για τις Επιχειρήσεις της Θεσσαλονίκης
          </h2>
          <p className="text-[#5B6472] mb-10">
            Κάθε ιστοσελίδα που παραδίδουμε είναι φτιαγμένη για να αποδίδει - όχι απλώς για να φαίνεται ωραία.{" "}
            <Link href="/el/services/" className="text-[#5B8CFF] font-medium underline underline-offset-2 hover:text-[#8B5CFF]">
              Δείτε όλες τις υπηρεσίες μας
            </Link>
            .
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Εταιρικές Ιστοσελίδες",
                desc: "Μια πλήρης, πολυσέλιδη ιστοσελίδα για την επιχείρησή σας - αρχική, σχετικα με εμάς, υπηρεσίες και επικοινωνία. Σχεδιασμένη για να χτίζει εμπιστοσύνη και να μετατρέπει τους επισκέπτες σε πελάτες από την πρώτη μέρα.",
              },
              {
                title: "Σελίδες Προορισμού",
                desc: "Μια μεμονωμένη, εστιασμένη σελίδα που έχει χτιστεί γύρω από έναν στόχο - είτε πρόκειται για τη συλλογή leads, την προώθηση μιας υπηρεσίας ή την αύξηση των κρατήσεων. Γρήγορη κατασκευή, γρήγορη μετατροπή.",
              },
              {
                title: "Σελίδες Υπηρεσιών",
                desc: "Αφιερωμένες σελίδες για κάθε μία από τις βασικές σας υπηρεσίες, βελτιστοποιημένες για τις συγκεκριμένες αναζητήσεις που κάνουν οι πελάτες σας στη Θεσσαλονίκη και σε όλη την Ελλάδα.",
              },
              {
                title: "Blog και SEO Setup",
                desc: "Μια δομή blog και αρχική διαμόρφωση SEO που δίνει στην ιστοσελίδα σας τη βάση για να καταταγεί στο Google με την πάροδο του χρόνου - χωρίς να χρειάζεται να κατανοήσετε την τεχνική πλευρά.",
              },
            ].map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-6 border border-[#E8EAF0] shadow-sm">
                <h3 className="font-bold text-[#111315] text-lg mb-2">{s.title}</h3>
                <p className="text-[#5B6472] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING SUMMARY ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-3">
            Διαφανείς Τιμές για Επιχειρήσεις στη Θεσσαλονίκη
          </h2>
          <p className="text-[#5B6472] mb-10">
            Χωρίς κρυφές χρεώσεις. Χωρίς ωριαία χρέωση. Μία σταθερή τιμή, με όλα να περιλαμβάνονται.{" "}
            <Link href="/el/pricing/" className="text-[#5B8CFF] font-medium underline underline-offset-2 hover:text-[#8B5CFF]">
              Δείτε την πλήρη ανάλυση τιμών
            </Link>
            .
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: "Launch Website",
                price: "από €299",
                desc: "Ιδανικό για νέες επιχειρήσεις που χρειάζονται γρήγορα μια καθαρή, επαγγελματική online παρουσία. Ό,τι χρειάζεστε για να ξεκινήσετε με σιγουριά.",
                highlight: false,
              },
              {
                name: "Growth Website",
                price: "από €749",
                desc: "Για καθιερωμένες επιχειρήσεις που χρειάζονται ολοκληρωμένη ιστοσελίδα με περισσότερες σελίδες, ισχυρότερο SEO και κομψό σχεδιασμό.",
                highlight: true,
              },
              {
                name: "Pro Website",
                price: "από €1,499",
                desc: "Για επιχειρήσεις που θέλουν μια πλήρως προσαρμοσμένη ιστοσελίδα πλούσια σε χαρακτηριστικά, με τα πάντα να περιλαμβάνονται - από προσαρμοσμένη λειτουργικότητα έως υποστήριξη κατά προτεραιότητα.",
                highlight: false,
              },
            ].map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl p-6 border ${
                  p.highlight
                    ? "border-[#5B8CFF] bg-gradient-to-br from-[#EEF3FF] to-[#F0EAFF] shadow-md"
                    : "border-[#E8EAF0] bg-white shadow-sm"
                }`}
              >
                {p.highlight && (
                  <span className="inline-block text-xs font-semibold text-[#5B8CFF] uppercase tracking-wider mb-2">
                    Πιο Δημοφιλές
                  </span>
                )}
                <div className="text-2xl font-extrabold text-[#111315] mb-1">{p.price}</div>
                <div className="font-semibold text-[#111315] mb-3">{p.name}</div>
                <p className="text-[#5B6472] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#9CA3AF] mt-4">
            Όλες οι τιμές είναι εφάπαξ. Χωρίς μηνιαίες χρεώσεις, χωρίς κρυφά κόστη.
          </p>
        </div>
      </section>

      {/* ── WHY CHOOSE D&M LABS ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-6">
            Γιατί οι Επιχειρήσεις της Θεσσαλονίκης Επιλέγουν τη DM-Labs.io
          </h2>
          <p className="text-[#5B6472] leading-relaxed mb-8">
            Η DM-Labs.io είναι ένα απομακρυσμένο στούντιο web design. Συνεργαζόμαστε με επιχειρήσεις σε όλη την Ελλάδα - από τη Θεσσαλονίκη και την Αθήνα μέχρι μικρότερες πόλεις και νησιά - εξ ολοκλήρου online. Χωρίς επισκέψεις στο γραφείο, χωρίς καθυστερήσεις για συναντήσεις πρόσωπο με πρόσωπο. Η πλήρης διαδικασία, από την πρώτη κλήση μέχρι την έναρξη, διαχειρίζεται από εμάς ώστε να μπορείτε να εστιάσετε στη λειτουργία της επιχείρησής σας.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "Γρήγορη παράδοση",
                desc: "Οι περισσότερες ιστοσελίδες παραδίδονται εντός 5 έως 14 ημερών. Δουλεύουμε γρήγορα, επικοινωνούμε με σαφήνεια και δεν σας αφήνουμε να περιμένετε.",
              },
              {
                title: "Δεν απαιτείται τεχνική γνώση",
                desc: "Δεν χρειάζεται να καταλαβαίνετε από κώδικα, hosting ή SEO. Αναλαμβάνουμε τα πάντα και εξηγούμε ό,τι έχει σημασία με απλά λόγια.",
              },
              {
                title: "Φτιαγμένες για μετατροπές",
                desc: "Κάθε σελίδα σχεδιάζεται με έναν στόχο στο μυαλό - τη μετατροπή των επισκεπτών σε πελάτες. Ο καλός σχεδιασμός είναι χρήσιμος μόνο αν φέρνει αποτελέσματα.",
              },
            ].map((w) => (
              <div key={w.title} className="bg-white rounded-2xl p-6 border border-[#E8EAF0] shadow-sm">
                <h3 className="font-bold text-[#111315] text-lg mb-2">{w.title}</h3>
                <p className="text-[#5B6472] text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-3">
            Εξυπηρετούμε Επιχειρήσεις σε όλη τη Θεσσαλονίκη
          </h2>
          <p className="text-[#5B6472] mb-8">
            Συνεργαζόμαστε με επιχειρήσεις σε όλη τη Θεσσαλονίκη - από το κέντρο και την παραλία μέχρι την Καλαμαριά, τη Σταυρούπολη, την Πυλαία και την ευρύτερη περιοχή της Κεντρικής Μακεδονίας. Η απόσταση δεν αποτελεί παράγοντα.
          </p>
          <div className="rounded-2xl overflow-hidden border border-[#E8EAF0] shadow-sm" style={{ height: "360px" }}>
            <iframe
              title="Θεσσαλονίκη, Ελλάδα"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47480.85!2d22.9444!3d40.6401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a838f41428e0ed%3A0x9bae715b8d574a9!2sΘεσσαλονίκη%2C%20Greece!5e0!3m2!1sen!2sgr!4v1700000000000!5m2!1sen!2sgr"
            />
          </div>
        </div>
      </section>

      {/* ── Συχνές Ερωτήσεις ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-10">
            Συχνές Ερωτήσεις
          </h2>
          <div className="flex flex-col gap-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-6 border border-[#E8EAF0] shadow-sm">
                <h3 className="font-bold text-[#111315] text-base mb-3">{faq.q}</h3>
                <p className="text-[#5B6472] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-spacing bg-gradient-to-br from-[#5B8CFF] to-[#8B5CFF]">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Είστε έτοιμοι να βάλετε την επιχείρησή σας στη Θεσσαλονίκη online;
          </h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            Πείτε μας για την επιχείρησή σας και θα σας στείλουμε δωρεάν πρόταση μέσα σε 24 ώρες. Χωρίς δέσμευση. Μπορείτε επίσης να επικοινωνήσετε μαζί μας απευθείας στο WhatsApp - απαντάμε γρήγορα.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/el/contact/">
              <button className="px-10 py-4 rounded-xl bg-white text-[#5B8CFF] font-bold text-base hover:bg-blue-50 transition-colors shadow-lg">
                Επικοινωνήστε μαζί μας
              </button>
            </Link>
            <a
              href="https://wa.me/35797472847?text=%CE%93%CE%B5%CE%B9%CE%B1%20%CF%83%CE%B1%CF%82!%20%CE%95%CE%BD%CE%B4%CE%B9%CE%B1%CF%86%CE%AD%CF%81%CE%BF%CE%BC%CE%B1%CE%B9%20%CE%B3%CE%B9%CE%B1%20%CE%B9%CF%83%CF%84%CE%BF%CF%83%CE%B5%CE%BB%CE%AF%CE%B4%CE%B1%20%CE%B3%CE%B9%CE%B1%20%CF%84%CE%B7%CE%BD%20%CE%B5%CF%80%CE%B9%CF%87%CE%B5%CE%AF%CF%81%CE%B7%CF%83%CE%AE%20%CE%BC%CE%BF%CF%85%20%CF%83%CF%84%CE%B7%20%CE%98%CE%B5%CF%83%CF%83%CE%B1%CE%BB%CE%BF%CE%BD%CE%AF%CE%BA%CE%B7."
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-10 py-4 rounded-xl bg-white/20 border border-white/40 text-white font-bold text-base hover:bg-white/30 transition-colors">
                Συνομιλήστε στο WhatsApp
              </button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
