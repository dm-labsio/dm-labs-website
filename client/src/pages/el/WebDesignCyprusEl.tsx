import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useHreflang } from "@/hooks/useHreflang";
import { Check } from "lucide-react";

// Greek Web Design Cyprus page — /el/web-design-cyprus
// Primary keyword: "κατασκευή ιστοσελίδας Κύπρος"
// Secondary: "web design Κύπρος", "ιστοσελίδα επιχείρηση Κύπρος", "κατασκευή site Κύπρος"

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "D&M Labs",
  "description": "Κατασκευή επαγγελματικών ιστοσελίδων για επιχειρήσεις στην Κύπρο. Από €299.",
  "url": "https://dm-labs.io/el/web-design-cyprus",
  "telephone": "+35797472847",
  "email": "info@dm-labs.io",
  "inLanguage": "el",
  "areaServed": {
    "@type": "Country",
    "name": "Cyprus"
  },
  "priceRange": "€€",
  "offers": [
    { "@type": "Offer", "name": "Starter", "price": "299", "priceCurrency": "EUR" },
    { "@type": "Offer", "name": "Business", "price": "399", "priceCurrency": "EUR" },
    { "@type": "Offer", "name": "Premium", "price": "699", "priceCurrency": "EUR" }
  ]
};

const industries = [
  { title: "Εστιατόρια και Καφέ", desc: "Μενού, κρατήσεις, ωράριο, φωτογραφίες. Ιστοσελίδες που γεμίζουν τραπέζια.", icon: "🍽️" },
  { title: "Ξενοδοχεία και Βίλες", desc: "Κρατήσεις, γκαλερί, τιμές, τοποθεσία. Προσελκύστε επισκέπτες απευθείας.", icon: "🏨" },
  { title: "Ομορφιά και Wellness", desc: "Nail studios, κομμωτήρια, spa, yoga. Ιστοσελίδες που γεμίζουν ραντεβού.", icon: "✨" },
  { title: "Fitness και Personal Training", desc: "Personal trainers, γυμναστήρια, Pilates. Δείξτε τα προγράμματά σας και αποκτήστε νέους πελάτες.", icon: "💪" },
  { title: "Επαγγελματικές Υπηρεσίες", desc: "Δικηγόροι, λογιστές, σύμβουλοι. Μια αξιόπιστη online παρουσία.", icon: "💼" },
  { title: "Κατασκευές και Ανακαινίσεις", desc: "Εργολάβοι, ηλεκτρολόγοι, υδραυλικοί. Δείξτε τη δουλειά σας.", icon: "🔨" },
  { title: "Λιανική και Μπουτίκ", desc: "Καταστήματα, τοπικά εμπορεύματα. Επαγγελματική online παρουσία.", icon: "🛍️" },
  { title: "Τουρισμός και Εμπειρίες", desc: "Τουριστικά γραφεία, εκδρομές, εμπειρίες. Προσελκύστε τουρίστες από όλο τον κόσμο.", icon: "🌊" }
];

const cities = [
  { name: "Λεμεσός", href: "/el/web-design-limassol", desc: "Κατασκευή ιστοσελίδας Λεμεσός" },
  { name: "Λευκωσία", href: "/el/web-design-nicosia", desc: "Κατασκευή ιστοσελίδας Λευκωσία" },
];

export default function WebDesignCyprusEl() {
  useSEO({
    title: "Κατασκευή Ιστοσελίδας Κύπρος | Από €299 | D&M Labs",
    description: "Επαγγελματική κατασκευή ιστοσελίδας για επιχειρήσεις στην Κύπρο. Custom σχεδιασμός, SEO, mobile-first. Starter €299, Business €399, Premium €699. Παράδοση σε 5-14 ημέρες.",
    canonicalPath: "/el/web-design-cyprus"
  });
  useHreflang();

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ── HERO ── */}
      <section className="min-h-[80vh] flex items-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/85 via-[#0F172A]/60 to-transparent" />
        <div className="container max-w-5xl mx-auto relative z-10 py-20">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#6FE3FF] mb-4">
            Κατασκευή Ιστοσελίδας Κύπρος
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight max-w-2xl">
            Επαγγελματική Ιστοσελίδα για την Επιχείρησή σας στην Κύπρο
          </h1>
          <p className="text-lg text-blue-100 mb-3 leading-relaxed max-w-xl">
            Κατασκευάζουμε custom, mobile-first ιστοσελίδες για επιχειρήσεις σε ολόκληρη την Κύπρο. Από €299, παράδοση σε 5-14 ημέρες.
          </p>
          <p className="text-sm text-blue-200/70 mb-8 italic">
            Η υπηρεσία παρέχεται στα αγγλικά. Επικοινωνούμε μαζί σας στα ελληνικά.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/el/contact">
              <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity shadow-lg">
                Ζητήστε Δωρεάν Πρόταση
              </button>
            </Link>
            <Link href="/el/pricing">
              <button className="px-8 py-3.5 rounded-xl border border-white/40 text-white font-semibold text-base hover:bg-white/10 transition-colors">
                Δείτε τις Τιμές
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY WEBSITE ── */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-4">
            Γιατί η Επιχείρησή σας στην Κύπρο Χρειάζεται Ιστοσελίδα
          </h2>
          <p className="text-[#5B6472] mb-8 leading-relaxed max-w-2xl">
            Στην Κύπρο, οι περισσότεροι καταναλωτές ψάχνουν στο Google πριν επισκεφτούν μια επιχείρηση. Αν δεν έχετε ιστοσελίδα, χάνετε πελάτες κάθε μέρα σε ανταγωνιστές που έχουν.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Βρεθείτε στη Google", desc: "Μια σωστά φτιαγμένη ιστοσελίδα εμφανίζεται στα αποτελέσματα αναζήτησης όταν κάποιος ψάχνει για αυτό που προσφέρετε στην Κύπρο." },
              { title: "Αξιοπιστία και Εμπιστοσύνη", desc: "Μια επαγγελματική ιστοσελίδα δείχνει ότι η επιχείρησή σας είναι σοβαρή. Οι πελάτες εμπιστεύονται επιχειρήσεις με καλή online παρουσία." },
              { title: "Διαθέσιμοι 24/7", desc: "Η ιστοσελίδα σας δουλεύει ακόμα και όταν εσείς δεν είστε. Πελάτες μπορούν να βρουν πληροφορίες, να επικοινωνήσουν ή να κάνουν κράτηση οποιαδήποτε ώρα." },
              { title: "Ανταγωνιστικό Πλεονέκτημα", desc: "Πολλές επιχειρήσεις στην Κύπρο δεν έχουν ακόμα καλή ιστοσελίδα. Αυτή είναι η ευκαιρία σας να ξεχωρίσετε." }
            ].map((w) => (
              <div key={w.title} className="bg-[#F8F9FC] rounded-2xl p-6 border border-[#E8EAF0]">
                <h3 className="font-bold text-[#111315] text-base mb-2">{w.title}</h3>
                <p className="text-[#5B6472] text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-4">Κλάδοι που Εξυπηρετούμε στην Κύπρο</h2>
          <p className="text-[#5B6472] mb-8 leading-relaxed max-w-2xl">
            Έχουμε εμπειρία με επιχειρήσεις από πολλούς κλάδους στην Κύπρο. Κάθε ιστοσελίδα σχεδιάζεται βάσει των αναγκών του συγκεκριμένου κλάδου.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {industries.map((ind) => (
              <div key={ind.title} className="bg-white rounded-2xl p-5 border border-[#E8EAF0] shadow-sm text-center">
                <div className="text-2xl mb-2">{ind.icon}</div>
                <h3 className="font-bold text-[#111315] text-sm mb-1">{ind.title}</h3>
                <p className="text-[#5B6472] text-xs leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-4">Τιμές Κατασκευής Ιστοσελίδας στην Κύπρο</h2>
          <p className="text-[#5B6472] mb-8">Εφάπαξ τιμές, χωρίς μηνιαίες χρεώσεις.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Starter", price: "€299", highlight: false,
                features: ["1 σελίδα", "Mobile-responsive", "WhatsApp κουμπί", "Social links", "Βασική SEO", "Παράδοση 5-7 ημέρες"]
              },
              {
                name: "Business", price: "€399", highlight: true,
                features: ["Έως 5 σελίδες", "Φόρμα επικοινωνίας", "Google Maps", "Reviews widget", "SEO βελτιστοποίηση", "Παράδοση 7-10 ημέρες"]
              },
              {
                name: "Premium", price: "€699", highlight: false,
                features: ["Έως 7 σελίδες", "Custom animations", "Gallery", "5 SEO άρθρα", "Πλήρης SEO δομή", "Παράδοση 10-14 ημέρες"]
              }
            ].map((pkg) => (
              <div key={pkg.name} className={`rounded-2xl p-6 border flex flex-col ${pkg.highlight ? "border-[#5B8CFF] bg-gradient-to-br from-[#EEF3FF] to-[#F0EAFF] shadow-xl" : "border-[#E8EAF0] bg-white shadow-sm"}`}>
                {pkg.highlight && <span className="text-xs font-semibold text-[#5B8CFF] uppercase tracking-wider mb-2">Πιο Δημοφιλές</span>}
                <div className="text-2xl font-extrabold text-[#111315] mb-1">{pkg.price}</div>
                <div className="font-bold text-[#111315] mb-4">{pkg.name}</div>
                <ul className="space-y-2 flex-1 mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#5B6472]">
                      <Check size={14} className="text-[#5B8CFF] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/el/contact">
                  <button className={`w-full py-3 rounded-xl font-semibold text-sm ${pkg.highlight ? "bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white hover:opacity-90" : "border border-[#5B8CFF] text-[#5B8CFF] hover:bg-[#EEF3FF]"}`}>
                    Ξεκινήστε Τώρα
                  </button>
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center mt-4">
            <Link href="/el/pricing" className="text-[#5B8CFF] text-sm font-medium underline underline-offset-2">
              Δείτε αναλυτικά τον τιμοκατάλογο
            </Link>
          </p>
        </div>
      </section>

      {/* ── CITIES ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-4">Εξυπηρετούμε σε Όλη την Κύπρο</h2>
          <p className="text-[#5B6472] mb-8">Λεμεσός, Λευκωσία, Λάρνακα, Πάφος και παντού στην Κύπρο.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cities.map((c) => (
              <Link key={c.name} href={c.href}>
                <div className="bg-white rounded-2xl p-5 border border-[#E8EAF0] shadow-sm hover:border-[#5B8CFF] hover:shadow-md transition-all cursor-pointer">
                  <h3 className="font-bold text-[#111315] text-base mb-1">{c.name}</h3>
                  <p className="text-[#5B6472] text-sm">{c.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-[#5B6472] text-sm mt-4">
            Επίσης εξυπηρετούμε Λάρνακα, Πάφο και άλλες περιοχές της Κύπρου.{" "}
            <Link href="/el/contact" className="text-[#5B8CFF] underline underline-offset-2">Επικοινωνήστε μαζί μας</Link>.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-8">Συχνές Ερωτήσεις</h2>
          <div className="flex flex-col gap-4">
            {[
              { q: "Πόσο κοστίζει μια ιστοσελίδα στην Κύπρο;", a: "Οι τιμές μας ξεκινούν από €299 για μια επαγγελματική branded σελίδα. Το Business πακέτο (έως 5 σελίδες) κοστίζει €399 και το Premium (έως 7 σελίδες με SEO άρθρα) €699. Όλες οι τιμές είναι εφάπαξ." },
              { q: "Πόσο καιρό παίρνει η κατασκευή;", a: "Το Starter παραδίδεται σε 5-7 ημέρες, το Business σε 7-10 ημέρες και το Premium σε 10-14 ημέρες. Σας κρατάμε ενήμερους σε κάθε βήμα." },
              { q: "Χρειάζομαι τεχνικές γνώσεις;", a: "Καθόλου. Εσείς φέρτε την επιχείρησή σας - εμείς αναλαμβάνουμε τα πάντα." },
              { q: "Σε ποια γλώσσα παρέχεται η υπηρεσία;", a: "Η υπηρεσία κατασκευής παρέχεται στα αγγλικά, αλλά επικοινωνούμε μαζί σας στα ελληνικά χωρίς κανένα πρόβλημα." },
              { q: "Εξυπηρετείτε και άλλες περιοχές εκτός Κύπρου;", a: "Ναι, εξυπηρετούμε επιχειρήσεις σε ολόκληρη την Ελλάδα - Θεσσαλονίκη, Κρήτη, Αθήνα και αλλού. Δουλεύουμε εξ αποστάσεως." }
            ].map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-6 border border-[#E8EAF0] shadow-sm">
                <h3 className="font-bold text-[#111315] text-base mb-2">{faq.q}</h3>
                <p className="text-[#5B6472] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-spacing bg-gradient-to-br from-[#5B8CFF] to-[#8B5CFF]">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Έτοιμοι για την Ιστοσελίδα σας στην Κύπρο;
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Επικοινωνήστε μαζί μας σήμερα για μια δωρεάν πρόταση. Απαντάμε μέσα σε 24 ώρες.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/el/contact">
              <button className="px-10 py-4 rounded-xl bg-white text-[#5B8CFF] font-bold text-base hover:bg-blue-50 transition-colors shadow-lg">
                Ζητήστε Δωρεάν Πρόταση
              </button>
            </Link>
            <a href="https://wa.me/35797472847?text=Γεια%20σας!%20Θέλω%20ιστοσελίδα%20για%20την%20επιχείρησή%20μου%20στην%20Κύπρο." target="_blank" rel="noopener noreferrer">
              <button className="px-10 py-4 rounded-xl bg-white/20 border border-white/40 text-white font-bold text-base hover:bg-white/30 transition-colors">
                WhatsApp
              </button>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
