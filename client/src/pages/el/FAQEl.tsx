/* ============================================================
   D&M LABS - Συχνές Ερωτήσεις (Greek)
   ============================================================ */
import { useSEO } from "@/hooks/useSEO";
import { useState, useEffect } from "react";
import AnimateIn from "@/components/AnimateIn";
import { ChevronDown, MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/35797472847?text=%CE%93%CE%B5%CE%B9%CE%B1%20%CF%83%CE%B1%CF%82!%20%CE%88%CF%87%CF%89%20%CE%BC%CE%B9%CE%B1%20%CE%B5%CF%81ώτηση.";

const faqs = [
  {
    category: "Ξεκινώντας",
    items: [
      { q: "Πώς ξεκινάω;", a: "Απλά στείλτε μας μήνυμα στο WhatsApp. Θα κάνουμε μια σύντομη συζήτηση για την επιχείρησή σας, θα προτείνουμε το καλύτερο πακέτο και θα ξεκινήσουμε αμέσως. Χωρίς φόρμες, χωρίς αναμονή." },
      { q: "Τι πληροφορίες χρειάζεται να παρέχω;", a: "Τουλάχιστον το όνομα της επιχείρησής σας και μια σύντομη περιγραφή του τι κάνετε. Αν έχετε λογότυπο, φωτογραφίες ή συγκεκριμένο κείμενο που θέλετε να χρησιμοποιήσετε, τέλεια. Αν όχι, μπορούμε να δουλέψουμε με αυτό που έχετε." },
      { q: "Πόσο καιρό χρειάζεται για να φτιαχτεί η ιστοσελίδα μου;", a: "Οι ιστοσελίδες Starter παραδίδονται σε 5-7 εργάσιμες μέρες. Οι Business ιστοσελίδες σε 7-10 εργάσιμες μέρες. Το χρονοδιάγραμμα ξεκινά μόλις λάβουμε το περιεχόμενό σας και επιβεβαιώσουμε το εύρος του project." },
      { q: "Χρειάζομαι τεχνικές γνώσεις;", a: "Απολύτως όχι. Αναλαμβάνουμε τα πάντα τεχνικά. Χρειάζεται μόνο να μας πείτε για την επιχείρησή σας και τι θέλετε - εμείς φροντίζουμε τα υπόλοιπα." },
      { q: "Συνεργάζεστε με πελάτες εκτός της χώρας σας;", a: "Ναι. Συνεργαζόμαστε με πελάτες παγκοσμίως. Όλη η επικοινωνία γίνεται μέσω WhatsApp και email, οπότε η τοποθεσία δεν αποτελεί ποτέ εμπόδιο. Οι τιμές μας είναι σε ευρώ και εξυπηρετούμε επιχειρήσεις σε όλη την Ευρώπη και πέρα από αυτήν." },
      { q: "Μπορώ να δω προεπισκόπηση πριν πληρώσω;", a: "Ναι. Πριν ξεκινήσει οποιαδήποτε ανάπτυξη, μοιραζόμαστε μια κατεύθυνση σχεδιασμού για έγκρισή σας - χρώματα, διάταξη και γενική εμφάνιση. Δεν θα πληρώσετε τίποτα μέχρι να είστε ικανοποιημένοι με την κατεύθυνση. Κατά τη διάρκεια της ανάπτυξης, μοιραζόμαστε σημεία ελέγχου προόδου ώστε να μπορείτε να παρακολουθείτε και να δίνετε σχόλια σε κάθε στάδιο. Τίποτα δεν οριστικοποιείται χωρίς την έγκρισή σας." },
      { q: "Μπορώ να αναβαθμίσω το πλάνο μου αργότερα;", a: "Απολύτως. Αν ξεκινήσετε με το Starter πλάνο και αργότερα αποφασίσετε ότι χρειάζεστε περισσότερες σελίδες ή λειτουργίες, μπορούμε να αναβαθμίσουμε την ιστοσελίδα σας ανά πάσα στιγμή. Πληρώνετε μόνο τη διαφορά μεταξύ των πλάνων." },
    ],
  },
  {
    category: "Τιμές και Πληρωμή",
    items: [
      { q: "Υπάρχουν κρυφές χρεώσεις;", a: "Όχι. Η τιμή που βλέπετε είναι η τιμή που πληρώνετε. Το domain του πρώτου χρόνου περιλαμβάνεται - το καταχωρούμε για εσάς και ρυθμίζουμε τα πάντα. Μετά τον πρώτο χρόνο, θα λάβετε υπενθύμιση για ανανέωση της άδειας domain (συνήθως €10-15/χρόνο). Το hosting είναι ξεχωριστό ongoing κόστος (συνήθως €10-15/μήνα) και εξηγούμε τα πάντα ξεκάθαρα πριν δεσμευτείτε." },
      { q: "Πώς λειτουργεί η πληρωμή;", a: "Λαμβάνουμε προκαταβολή για να εξασφαλίσουμε το project σας και να ξεκινήσουμε τη δουλειά. Το υπόλοιπο υπόλοιπο οφείλεται κατά την παράδοση, αφού έχετε ελέγξει και εγκρίνει την τελική ιστοσελίδα. Απλό, διαφανές και χωρίς εκπλήξεις." },
      { q: "Ποιες μεθόδους πληρωμής δέχεστε;", a: "Δεχόμαστε τραπεζικές μεταφορές και κύριες μεθόδους πληρωμής. Θα παρέχουμε στοιχεία πληρωμής όταν είστε έτοιμοι να προχωρήσετε." },
      { q: "Είναι δική μου η ιστοσελίδα μετά την κατασκευή;", a: "Ναι, 100%. Μόλις εξοφληθεί πλήρως, η ιστοσελίδα και όλο το περιεχόμενό της ανήκουν αποκλειστικά σε εσάς." },
    ],
  },
  {
    category: "Σχεδιασμός και Λειτουργίες",
    items: [
      { q: "Μπορώ να δω παραδείγματα της δουλειάς σας;", a: "Ναι! Επικοινωνήστε μαζί μας στο WhatsApp και θα μοιραστούμε πρόσφατα παραδείγματα σχετικά με τον κλάδο σας." },
      { q: "Θα λειτουργεί η ιστοσελίδα μου σε κινητά τηλέφωνα;", a: "Απολύτως. Κάθε ιστοσελίδα που φτιάχνουμε είναι mobile-first - δηλαδή σχεδιασμένη να φαίνεται και να λειτουργεί τέλεια σε τηλέφωνα, tablets και υπολογιστές." },
      { q: "Μπορώ να κάνω αλλαγές αφού η ιστοσελίδα είναι ζωντανή;", a: "Ναι. Μικρές αλλαγές κειμένου είναι δωρεάν για τον πρώτο μήνα μετά το launch. Μετά από αυτό, τα πλάνα συντήρησής μας (από €39/μήνα) καλύπτουν συνεχείς ενημερώσεις, ή μπορείτε να ζητήσετε μεμονωμένες αλλαγές." },
      { q: "Παρέχετε hosting;", a: "Ναι. Αναλαμβάνουμε την πλήρη τεχνική εγκατάσταση - hosting, καταχώρηση domain, SSL πιστοποιητικό και τα πάντα ενδιάμεσα. Το domain του πρώτου χρόνου περιλαμβάνεται στην τιμή κατασκευής. Το hosting είναι ξεχωριστό ongoing κόστος (συνήθως €10-15/μήνα) το οποίο εξηγούμε ξεκάθαρα πριν δεσμευτείτε. Θα λάβετε υπενθύμιση όταν το domain σας είναι προς ανανέωση μετά τον πρώτο χρόνο." },
    ],
  },
  {
    category: "Μετά το Launch",
    items: [
      { q: "Τι γίνεται αφού η ιστοσελίδα μου κυκλοφορήσει;", a: "Φροντίζουμε να λειτουργεί τέλεια τα πάντα. Για τον πρώτο μήνα, είμαστε διαθέσιμοι για μικρές προσαρμογές χωρίς επιπλέον κόστος. Μετά από αυτό, μπορείτε να επιλέξετε το πλάνο συντήρησής μας ή να διαχειριστείτε τα πράγματα ανεξάρτητα." },
      { q: "Τι περιλαμβάνει το πλάνο συντήρησης;", a: "Προσφέρουμε δύο επίπεδα: Essential (€39/μήνα) καλύπτει έως 3 ενημερώσεις περιεχομένου, παρακολούθηση hosting, backups και υποστήριξη WhatsApp. Premium (€59/μήνα) προσθέτει απεριόριστες ενημερώσεις, προτεραιότητα απόκρισης, μηνιαίους ελέγχους απόδοσης, εποχιακά banners και προσθήκες νέων ενοτήτων. Χωρίς συμβόλαια - ακύρωση ανά πάσα στιγμή." },
      { q: "Μπορώ να ακυρώσω το πλάνο συντήρησης;", a: "Ναι, ανά πάσα στιγμή. Δεν υπάρχουν συμβόλαια ή δεσμεύσεις. Μπορείτε να ακυρώσετε όποτε θέλετε." },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E2E5EA] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-base font-medium text-[#111315] pr-4 group-hover:text-[#5B8CFF] transition-colors">{q}</span>
        <ChevronDown
          size={20}
          className={`text-[#5B6472] shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-[#5B8CFF]" : ""}`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "600px" : "0", opacity: open ? 1 : 0 }}
      >
        <p className="text-sm text-[#5B6472] leading-relaxed pb-5">{a}</p>
      </div>
    </div>
  );
}

export default function FAQEl() {
  useSEO({
    title: "Συχνές Ερωτήσεις | DM-Labs.io Κατασκευή Ιστοσελίδων",
    description: "Απαντήσεις στις πιο συχνές ερωτήσεις για τη συνεργασία με τη DM-Labs.io. Τιμές, χρόνοι παράδοσης, διαδικασία και πολλά άλλα.",
  });

  useEffect(() => {
    const SCHEMA_ID = "faq-jsonld-schema";
    const allItems = faqs.flatMap(section => section.items);
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": allItems.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    };
    let el = document.getElementById(SCHEMA_ID) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = SCHEMA_ID;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => {
      const s = document.getElementById(SCHEMA_ID);
      if (s) s.remove();
    };
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(4rem, 8vh, 6rem)" }}>
        <div className="container relative z-10 text-center">
          <AnimateIn>
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Συχνές Ερωτήσεις</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5">
              Απαντήσεις στις <span className="brand-gradient-text">Ερωτήσεις σας</span>
            </h1>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto">
              Όλα όσα χρειάζεστε να γνωρίζετε για τη συνεργασία με τη DM-Labs.io. Δεν βρίσκετε την απάντησή σας; Απλά στείλτε μας μήνυμα.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl">
          {faqs.map((section, si) => (
            <AnimateIn key={section.category} delay={si * 0.1} className="mb-12 last:mb-0">
              <h2 className="text-xl font-semibold text-[#111315] mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 brand-gradient rounded-full" />
                {section.category}
              </h2>
              <div className="dm-card !p-0 overflow-hidden">
                <div className="px-6">
                  {section.items.map((item) => (
                    <FAQItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            </AnimateIn>
          ))}
          <p className="text-sm text-[#5B6472] leading-relaxed mt-2">
            Για περισσότερες λεπτομέρειες, δείτε τις υπηρεσίες μας για{" "}
            <a href="/el/services/mobile-first/" className="text-[#5B8CFF] font-medium hover:underline">mobile-first ιστοσελίδες</a>{" "}
            και{" "}
            <a href="/el/services/seo/" className="text-[#5B8CFF] font-medium hover:underline">SEO βάσεις</a>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing dark-section text-center">
        <div className="container">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Έχετε Ακόμα Ερωτήσεις;</h2>
            <p className="text-lg text-[#94A3B8] mb-8 max-w-xl mx-auto">Είμαστε πάντα εδώ να βοηθήσουμε. Στείλτε μας μήνυμα και θα σας απαντήσουμε γρήγορα.</p>
            <a href="/el/contact/" className="btn-primary">
              <MessageCircle size={18} /> Επικοινωνήστε μαζί μας
            </a>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
