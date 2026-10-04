import { usePricingCurrency, Price } from "@/contexts/CurrencyContext";
import { BUILD_PRICE_SUMMARY, BUILD_PLANS, BUILD_PRICES } from "@/components/pricing/pricingContent";
import { useStructuredData } from "@/hooks/useStructuredData";
import { serviceSchemaData } from "@/lib/structuredData";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";

// SEO landing page: /web-design-limassol
// Target keywords: "web design Λεμεσός", "κατασκευή ιστοσελίδας Λεμεσός"
// Design: matches DM-Labs.io site style - light bg, brand gradient accents, clean typography



const baseFaqs = [
  {
    q: "Πόσο κοστίζει η κατασκευή ιστοσελίδας στη Λεμεσό;",
    a: BUILD_PRICE_SUMMARY.el,
  },
  {
    q: "Σε πόσο καιρό θα είναι έτοιμη η ιστοσελίδα;",
    a: "Το χρονοδιάγραμμα το συμφωνούμε πριν ξεκινήσουμε, ανάλογα με το εύρος και τα υλικά που χρειάζονται. Σας ενημερώνουμε σε κάθε στάδιο. Αλλαγές στο έργο, στο περιεχόμενο ή στα σχόλια μπορεί να επηρεάσουν το πρόγραμμα, και κάθε νέα ημερομηνία τη συμφωνούμε μαζί σας.",
  },
  {
    q: "Δουλεύετε με επιχειρήσεις στη Λεμεσό;",
    a: "Ναι. Η DM-Labs.io δουλεύει με επιχειρήσεις παντού. Η διεύθυνσή μας είναι στην Πάφο, και η κουβέντα, οι διορθώσεις και η παράδοση γίνονται από απόσταση, μέσω WhatsApp, email και βιντεοκλήσεων.",
  },
  {
    q: "Τι μπορεί να έχει η ιστοσελίδα μιας επιχείρησης στη Λεμεσό;",
    a: "Εξαρτάται από το πακέτο και το εύρος του έργου. Συνήθως έχει σελίδες υπηρεσιών, φόρμα επικοινωνίας, χάρτη, κριτικές πελατών, γκαλερί, συνδέσμους για τα social media και τις βάσεις για το SEO.",
  },
  {
    q: "Μπορείτε να προσθέσετε κρατήσεις, CRM ή περισσότερες γλώσσες;",
    a: "Ναι, ως έργο Enterprise / Custom. Η προσφορά εξαρτάται από τα εργαλεία, τον όγκο του περιεχομένου, τις γλώσσες και το τι ακριβώς χρειάζεται να στηθεί.",
  },
];

export default function WebDesignLimassol() {
  const { copy, euro } = usePricingCurrency("el");
  const faqs = copy(baseFaqs);

  useSEO({
    title: "Κατασκευή ιστοσελίδων στη Λεμεσό | DM-Labs.io",
    description: "Ιστοσελίδες για επιχειρήσεις στη Λεμεσό που θέλουν να τις βρίσκουν και να τους στέλνουν μήνυμα: άψογες στο κινητό, με γερές βάσεις SEO. Δωρεάν συμβουλευτική.",
    canonicalPath: "/el/web-design-limassol/",
  });
  useStructuredData("location-jsonld-schema", serviceSchemaData("https://dm-labs.io/el/web-design-limassol/", "el", "Κατασκευή ιστοσελίδων στη Λεμεσό", "Ιστοσελίδες για επιχειρήσεις στη Λεμεσό, σχεδιασμένες από το μηδέν για να εμπνέουν εμπιστοσύνη και να φέρνουν μηνύματα.", faqs));

  return (
    <main className="bg-white">
      {/* ── HERO ── */}
      <section className="section-spacing bg-gradient-to-br from-[#EEF3FF] via-white to-[#F0EAFF]">
        <div className="container max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#5B8CFF] mb-4">
            Web design · Λεμεσός
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111315] leading-tight mb-6">
            Κατασκευή ιστοσελίδας στη Λεμεσό<br />
            <span className="bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] bg-clip-text text-transparent">
              Ιστοσελίδες που φέρνουν πελάτες
            </span>
          </h1>
          <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-8 leading-relaxed">
            Φτιάχνουμε ξεκάθαρες, επαγγελματικές και responsive ιστοσελίδες για επιχειρήσεις στη Λεμεσό. Για να δείχνει η επιχείρησή σας σοβαρή, να σας εμπιστεύονται και να έχει ο πελάτης έναν καλό λόγο να σας πάρει τηλέφωνο.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/el/contact/">
              <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                Ζητήστε δωρεάν προσφορά
              </button>
            </Link>
            <Link href="/el/pricing/">
              <button className="px-8 py-3.5 rounded-xl border border-[#5B8CFF] text-[#5B8CFF] font-semibold text-base hover:bg-[#EEF3FF] transition-colors">
                Δείτε τις τιμές
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY LIMASSOL NEEDS A WEBSITE ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-6">
            Γιατί μια επιχείρηση στη Λεμεσό χρειάζεται σωστή ιστοσελίδα
          </h2>
          <p className="text-[#5B6472] leading-relaxed mb-5">
            Η Λεμεσός έχει από όλα: ναυτιλιακές εταιρείες, δικηγορικά γραφεία, εταιρείες τεχνολογίας, εστιατόρια και πολύ τουρισμό. Έχει επίσης πολλούς κατοίκους και επισκέπτες από το εξωτερικό, που ψάχνουν τοπικές υπηρεσίες στο ίντερνετ.
          </p>
          <p className="text-[#5B6472] leading-relaxed mb-5">
            Σε μια τέτοια αγορά, η ιστοσελίδα είναι η πρώτη εντύπωση. Όταν κάποιος ψάχνει «λογιστής Λεμεσός» ή «εστιατόριο κοντά στη θάλασσα», είτε βρίσκει εσάς είτε κάποιον ανταγωνιστή σας. Μια καλοφτιαγμένη ιστοσελίδα, με σωστό SEO, γρήγορη φόρτωση και ξεκάθαρο κουμπί για επικοινωνία, δουλεύει για εσάς όλο το εικοσιτετράωρο.
          </p>
          <p className="text-[#5B6472] leading-relaxed">
            Ο ανταγωνισμός στη Λεμεσό μεγαλώνει, και όλο και περισσότερα γίνονται online. Όσοι φτιάχνουν τώρα μια σωστή ιστοσελίδα, πριν από τους ανταγωνιστές τους, κερδίζουν πρώτοι όσους ψάχνουν στο Google και χτίζουν εμπιστοσύνη με πελάτες από την πόλη και από το εξωτερικό.
          </p>
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-3">
            Τι φτιάχνουμε για επιχειρήσεις στη Λεμεσό
          </h2>
          <p className="text-[#5B6472] mb-10">
            Κάθε ιστοσελίδα που φτιάχνουμε έχει δουλειά να κάνει, δεν είναι μόνο για να δείχνει ωραία.{" "}
            <Link href="/el/services/" className="text-[#5B8CFF] font-medium underline underline-offset-2 hover:text-[#8B5CFF]">
              Όλες οι υπηρεσίες μας
            </Link>
            .
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Ιστοσελίδα στα μέτρα σας",
                desc: "Χωρίς έτοιμα templates. Σχεδιάζουμε από το μηδέν, με βάση το brand, τους πελάτες και τους στόχους σας.",
              },
              {
                title: "Responsive σχεδιασμός",
                desc: "Η ιστοσελίδα δείχνει και δουλεύει σωστά σε κάθε οθόνη, από το κινητό μέχρι τον υπολογιστή.",
              },
              {
                title: "Εμφάνιση στο Google (SEO)",
                desc: "Καθαρός κώδικας, γρήγορη φόρτωση, σωστοί τίτλοι και περιγραφές: οι βάσεις για να καταλαβαίνει το Google τι κάνετε.",
              },
              {
                title: "Γρήγορη παράδοση",
                desc: "Το χρονοδιάγραμμα το συμφωνούμε από την αρχή και σας ενημερώνουμε σε κάθε βήμα. Ξέρετε πάντα τι ακολουθεί.",
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
            Ξεκάθαρες τιμές για επιχειρήσεις στη Λεμεσό
          </h2>
          <p className="text-[#5B6472] mb-10">
            Χωρίς κρυφές χρεώσεις και χωρίς χρέωση με την ώρα. Η κατασκευή έχει σταθερή τιμή, που τη συμφωνούμε από πριν.{" "}
            <Link href="/el/pricing/" className="text-[#5B8CFF] font-medium underline underline-offset-2 hover:text-[#8B5CFF]">
              Όλες οι τιμές αναλυτικά
            </Link>
            .
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {BUILD_PLANS.el.map((plan, index) => ({ ...plan, desc: plan.summary, price: euro(BUILD_PRICES[index]), highlight: index === 1 })).map((p) => (
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
                    Προτεινόμενο
                  </span>
                )}
                <div className="text-3xl font-extrabold text-[#111315] mb-1">{p.price}</div>
                <div className="font-semibold text-[#111315] mb-3">{p.name}</div>
                <p className="text-[#5B6472] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#9CA3AF] mt-4">
            Η κατασκευή πληρώνεται μία φορά. Όσο διαχειριζόμαστε την ιστοσελίδα σας, χρειάζεται και πακέτο φιλοξενίας και συντήρησης, από <Price euros={69} locale="el" />/μήνα. Οι τιμές δεν περιλαμβάνουν τυχόν φόρους και χρεώσεις τρίτων που συμφωνούνται ξεχωριστά.
          </p>
        </div>
      </section>

      {/* ── GOOGLE MAPS ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-3">
            Συνεργασία από απόσταση, σε όλη τη Λεμεσό
          </h2>
          <p className="text-[#5B6472] mb-8">
            Δουλεύουμε με επιχειρήσεις σε όλη τη Λεμεσό: από την παλιά πόλη και την παραλία μέχρι τον Άγιο Αθανάσιο, τα Πολεμίδια και τη Γερμασόγεια.
          </p>
          <div className="rounded-2xl overflow-hidden border border-[#E8EAF0] shadow-sm" style={{ height: "360px" }}>
            <iframe
              title="Λεμεσός"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52427.36!2d33.0413!3d34.6841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14e733d5b1b3b3b3%3A0x1234567890abcdef!2sΛεμεσός%2C%20Cyprus!5e0!3m2!1sen!2scy!4v1700000000000!5m2!1sen!2scy"
            />
          </div>
        </div>
      </section>

      {/* ── Συχνές Ερωτήσεις ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-10">
            Συχνές ερωτήσεις
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
            Θέλετε καινούργια ιστοσελίδα για την επιχείρησή σας στη Λεμεσό;
          </h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            Πείτε μας δυο λόγια για την επιχείρησή σας και θα σας προτείνουμε από πού να ξεκινήσετε. Η πρώτη κουβέντα είναι δωρεάν και χωρίς δέσμευση.
          </p>
          <Link href="/el/contact/">
            <button className="px-10 py-4 rounded-xl bg-white text-[#5B8CFF] font-bold text-base hover:bg-blue-50 transition-colors shadow-lg">
              Επικοινωνήστε μαζί μας
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
