import { usePricingCurrency, Price } from "@/contexts/CurrencyContext";
/* ============================================================
   D&M LABS — /web-design-nicosia landing page
   Design: #0F172A dark, #5B8CFF→#8B5CFF gradient accents, #F6F6F4 bg
   SEO target: "κατασκευή ιστοσελίδας Λευκωσία", "web design Λευκωσία"
   LocalBusiness schema injected on mount
   ============================================================ */
import { Link } from "wouter";
import { useStructuredData } from "@/hooks/useStructuredData";
import { serviceSchemaData } from "@/lib/structuredData";
import { useSEO } from "@/hooks/useSEO";
import AnimateIn from "@/components/AnimateIn";
import { BUILD_PLANS, BUILD_PRICES, BUILD_PRICE_SUMMARY } from "@/components/pricing/pricingContent";

const WHATSAPP_URL = `https://wa.me/35797472847?text=${encodeURIComponent("Γεια σας! Θα ήθελα να φτιάξω ιστοσελίδα για την επιχείρησή μου στη Λευκωσία.")}`;

const baseFaqs = [
  {
    q: "Πόσο κοστίζει μια ιστοσελίδα για μια επιχείρηση στη Λευκωσία;",
    a: BUILD_PRICE_SUMMARY.el
  },
  {
    q: "Δουλεύετε με επιχειρήσεις στη Λευκωσία από απόσταση;",
    a: "Ναι, και δεν χρειάζεται να συναντηθούμε από κοντά. Όλη η διαδικασία, από την πρώτη κουβέντα μέχρι τον σχεδιασμό, τις διορθώσεις και τη δημοσίευση, γίνεται μέσω WhatsApp, email και βιντεοκλήσεων."
  },
  {
    q: "Μπορείτε να φτιάξετε ιστοσελίδα στα ελληνικά και στα αγγλικά;",
    a: "Ναι. Η ιστοσελίδα μπορεί να είναι μόνο στα ελληνικά. Αν τη θέλετε σε περισσότερες γλώσσες, όπως ελληνικά και αγγλικά, γίνεται ως έργο Enterprise / Custom, με προσφορά ανάλογα με τις γλώσσες, το περιεχόμενο και το αν θέλετε να κάνετε αλλαγές μόνοι σας."
  },
  {
    q: "Σε πόσο καιρό θα είναι έτοιμη η ιστοσελίδα;",
    a: "Το χρονοδιάγραμμα το συμφωνούμε πριν ξεκινήσουμε, ανάλογα με το εύρος και τα υλικά που χρειάζονται. Σας ενημερώνουμε σε κάθε στάδιο. Αλλαγές στο έργο, στο περιεχόμενο ή στα σχόλια μπορεί να επηρεάσουν το πρόγραμμα, και κάθε νέα ημερομηνία τη συμφωνούμε μαζί σας."
  }
];

const industries = [
  { name: "Δικηγορικά γραφεία", icon: "⚖️", desc: "Στη Λευκωσία είναι τα ανώτατα δικαστήρια και πολλά από τα μεγαλύτερα δικηγορικά γραφεία. Μια προσεγμένη ιστοσελίδα δείχνει σοβαρότητα και φέρνει τους πελάτες που θέλετε." },
  { name: "Εστιατόρια και καφέ", icon: "🍽️", desc: "Από την παλιά πόλη μέχρι την Έγκωμη, η Λευκωσία έχει πολύ ανταγωνισμό στην εστίαση. Μια γρήγορη ιστοσελίδα με το μενού σας φέρνει κρατήσεις και κόσμο στο μαγαζί." },
  { name: "Ιατρεία και υγεία", icon: "🏥", desc: "Ιδιωτικά ιατρεία, οδοντίατροι και ειδικοί γιατροί χρειάζονται μια ιστοσελίδα που να εμπνέει εμπιστοσύνη, για να τους βρίσκουν νέοι ασθενείς και να μένουν οι παλιοί." },
  { name: "Καταστήματα και μπουτίκ", icon: "🛍️", desc: "Είτε στη Μακαρίου είτε σε ένα στενό της γειτονιάς, η ιστοσελίδα σάς φέρνει πελάτες και πέρα από όσους περνούν απ’ έξω." },
  { name: "Λογιστικά γραφεία", icon: "📊", desc: "Πολλά λογιστικά και ελεγκτικά γραφεία έχουν έδρα στη Λευκωσία. Μια προσεγμένη ιστοσελίδα δείχνει επαγγελματισμό στους εταιρικούς πελάτες." },
  { name: "Μεσιτικά γραφεία", icon: "🏠", desc: "Όποιος ψάχνει ακίνητο ξεκινά από το ίντερνετ. Μια καθαρή, γρήγορη ιστοσελίδα με τα ακίνητά σας και φόρμα επικοινωνίας φέρνει ενδιαφερόμενους που σας γράφουν." },
];

export default function WebDesignNicosiaEl() {
  const { copy, euro } = usePricingCurrency("el");
  const faqs = copy(baseFaqs);

  useSEO({
    title: "Κατασκευή ιστοσελίδων στη Λευκωσία | DM-Labs.io",
    description: "Ιστοσελίδες για επιχειρήσεις στη Λευκωσία, στημένες για να φέρνουν μηνύματα και τηλεφωνήματα. Άψογες στο κινητό, με SEO και χωρίς κρυφές χρεώσεις. Δωρεάν συμβουλευτική.",
    canonicalPath: "/el/web-design-nicosia/"
  });

  useStructuredData("location-jsonld-schema", serviceSchemaData("https://dm-labs.io/el/web-design-nicosia/", "el", "Κατασκευή ιστοσελίδων στη Λευκωσία", "Η DM-Labs.io σχεδιάζει και φτιάχνει ιστοσελίδες για επιχειρήσεις στη Λευκωσία και παντού. Responsive, με τις βάσεις του SEO και χρονοδιάγραμμα που συμφωνούμε από πριν.", faqs));

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#F0EAFF]">
        <div className="container max-w-4xl mx-auto text-center">
          <AnimateIn>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">
              Κατασκευή ιστοσελίδων · Λευκωσία
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111315] mb-4 leading-tight">
              Κατασκευή ιστοσελίδας{" "}
              <span className="bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] bg-clip-text text-transparent">
                στη Λευκωσία
              </span>
            </h1>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-8 leading-relaxed">
              Η DM-Labs.io φτιάχνει ιστοσελίδες για επιχειρήσεις στη Λευκωσία: γρήγορες, responsive και στημένες για να σας εμπιστεύονται και να σας γράφουν. Σε μια πόλη με τόσο ανταγωνισμό, η ιστοσελίδα σας πρέπει να ξεχωρίζει.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/el/contact/">
                <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                  Δωρεάν συμβουλευτική
                </button>
              </Link>
              <Link href="/el/pricing/">
                <button className="px-8 py-3.5 rounded-xl border border-[#5B8CFF] text-[#5B8CFF] font-semibold text-base hover:bg-[#EEF3FF] transition-colors bg-white">
                  Δείτε τις τιμές
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
              Γιατί μια επιχείρηση στη Λευκωσία χρειάζεται σωστή ιστοσελίδα
            </h2>
            <p className="text-[#5B6472] leading-relaxed mb-6">
              Η Λευκωσία είναι η πρωτεύουσα και το κέντρο του εμπορίου, της δικαιοσύνης και της δημόσιας διοίκησης. Εδώ βρίσκονται πολλά δικηγορικά γραφεία, εταιρείες χρηματοοικονομικών υπηρεσιών, ιδιωτικά ιατρεία και καταστήματα. Ο ανταγωνισμός είναι μεγάλος, και οι περισσότεροι πελάτες ξεκινούν το ψάξιμο από το Google.
            </p>
            <p className="text-[#5B6472] leading-relaxed mb-6">
              Μια αργή, παλιά ή ανύπαρκτη ιστοσελίδα δεν είναι απλώς χαμένη ευκαιρία: σας κοστίζει πελάτες. Ο κόσμος κρίνει μια επιχείρηση και από την ιστοσελίδα της, και σε μια αγορά με τόσους επαγγελματίες όπως η Λευκωσία, η πρώτη εντύπωση μετράει πολύ.
            </p>
            <p className="text-[#5B6472] leading-relaxed">
              Φτιάχνουμε ιστοσελίδες γρήγορες, responsive και σωστά στημένες για το Google από την πρώτη μέρα. Είτε έχετε δικηγορικό γραφείο στη Μακαρίου, εστιατόριο στην παλιά πόλη ή ιατρείο στον Στρόβολο, φτιάχνουμε την ιστοσελίδα που φέρνει μηνύματα και πελάτες.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── INDUSTRIES WE SERVE ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-3">
              Κλάδοι που εξυπηρετούμε στη Λευκωσία
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              Δουλεύουμε με κάθε είδους επιχειρήσεις στη Λευκωσία. Κάθε ιστοσελίδα φτιάχνεται για τις ανάγκες του δικού σας κλάδου, όχι από ένα γενικό template.
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
              Τιμές κατασκευής ιστοσελίδας στη Λευκωσία
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              Ξεκάθαρες τιμές, χωρίς κρυφές χρεώσεις και χωρίς χρέωση με την ώρα. Κάθε πακέτο έχει σχεδιασμό στα μέτρα σας, responsive κατασκευή και τις βάσεις του SEO. Η φόρμα επικοινωνίας περιλαμβάνεται στο Growth και στο Pro.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {BUILD_PLANS.el.map((plan, index) => ({ ...plan, desc: plan.summary, price: euro(BUILD_PRICES[index]), highlight: index === 1 })).map((pkg) => (
              <AnimateIn key={pkg.name}>
                <div className={`rounded-2xl p-6 border h-full flex flex-col ${pkg.highlight ? "border-[#5B8CFF] shadow-lg bg-gradient-to-b from-[#EEF3FF] to-white" : "border-[#E8EAF0] shadow-sm bg-white"}`}>
                  {pkg.highlight && (
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#5B8CFF] mb-2">Προτεινόμενο</span>
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
                      Ζητήστε προσφορά
                    </button>
                  </Link>
                </div>
              </AnimateIn>
            ))}
          </div>
          <p className="text-xs text-[#9CA3AF] mt-4">
            Η κατασκευή πληρώνεται μία φορά. Όσο διαχειριζόμαστε την ιστοσελίδα σας, χρειάζεται και πακέτο φιλοξενίας και συντήρησης, από <Price euros={69} locale="el" />/μήνα. Οι τιμές δεν περιλαμβάνουν τυχόν φόρους και χρεώσεις τρίτων που συμφωνούνται ξεχωριστά.
          </p>
        </div>
      </section>

      {/* ── WHY D&M LABS ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">
              Γιατί να δουλέψετε με τη DM-Labs.io
            </h2>
            <p className="text-[#5B6472] leading-relaxed mb-8">
              Δουλεύουμε από απόσταση με επιχειρήσεις παντού, από τη Λευκωσία και τη Λεμεσό μέχρι μικρότερες πόλεις. Δεν χρειάζονται επισκέψεις σε γραφεία ούτε να περιμένετε για ραντεβού. Αναλαμβάνουμε όλη τη διαδικασία, από την πρώτη κουβέντα μέχρι να βγει η ιστοσελίδα στον αέρα, κι εσείς ασχολείστε με την επιχείρησή σας.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "Γρήγορη παράδοση",
                desc: "Δουλεύουμε γρήγορα, μιλάμε ξεκάθαρα και δεν σας αφήνουμε να περιμένετε."
              },
              {
                title: "Χωρίς τεχνικές γνώσεις",
                desc: "Δεν χρειάζεται να ξέρετε από κώδικα, φιλοξενία ή SEO. Τα αναλαμβάνουμε όλα και σας εξηγούμε με απλά λόγια ό,τι χρειάζεται."
              },
              {
                title: "Φτιαγμένη για να φέρνει πελάτες",
                desc: "Κάθε σελίδα έχει έναν στόχο: να σας στείλει ο επισκέπτης μήνυμα ή να σας πάρει τηλέφωνο. Ο ωραίος σχεδιασμός αξίζει μόνο όταν φέρνει αποτέλεσμα."
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
              Σε όλη τη Λευκωσία
            </h2>
            <p className="text-[#5B6472] mb-8">
              Δουλεύουμε με επιχειρήσεις σε όλη τη Λευκωσία: από την παλιά πόλη μέσα στα τείχη και τη Μακαρίου μέχρι τον Στρόβολο, την Αγλαντζιά, τα Λατσιά, τη Λακατάμια και όλη την επαρχία. Η απόσταση δεν είναι εμπόδιο.
            </p>
          </AnimateIn>
          <div className="rounded-2xl overflow-hidden border border-[#E8EAF0] shadow-sm" style={{ height: "360px" }}>
            <iframe
              title="Λευκωσία"
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
              Και σε άλλες πόλεις
            </h2>
            <p className="text-[#5B6472] mb-6 leading-relaxed">
              Η DM-Labs.io δουλεύει με επιχειρήσεις παντού. Έχουμε ξεχωριστές σελίδες και για:
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/el/web-design-limassol/">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#5B8CFF] text-[#5B8CFF] font-semibold text-sm hover:bg-[#EEF3FF] transition-colors cursor-pointer">
                  Κατασκευή ιστοσελίδας στη Λεμεσό
                </span>
              </Link>
              <Link href="/el/web-design-thessaloniki/">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#8B5CFF] text-[#8B5CFF] font-semibold text-sm hover:bg-[#F3EEFF] transition-colors cursor-pointer">
                  Κατασκευή ιστοσελίδας στη Θεσσαλονίκη
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
              Συχνές ερωτήσεις
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
              Ας φτιάξουμε την ιστοσελίδα της επιχείρησής σας.
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Πείτε μας δυο λόγια για την επιχείρησή σας. Μόλις καταλάβουμε τι χρειάζεστε, σας στέλνουμε δωρεάν πρόταση, χωρίς δέσμευση. Μπορείτε επίσης να μας γράψετε κατευθείαν στο WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/el/contact/">
                <button className="px-10 py-4 rounded-xl bg-white text-[#5B8CFF] font-bold text-base hover:bg-blue-50 transition-colors shadow-lg">
                  Επικοινωνήστε μαζί μας
                </button>
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-10 py-4 rounded-xl bg-white/20 border border-white/40 text-white font-bold text-base hover:bg-white/30 transition-colors">
                  Γράψτε μας στο WhatsApp
                </button>
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

    </main>
  );
}
