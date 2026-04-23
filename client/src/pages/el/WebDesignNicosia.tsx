import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useHreflang } from "@/hooks/useHreflang";
import { Check } from "lucide-react";

// Greek Web Design Nicosia page — /el/web-design-nicosia
// Primary keyword: "κατασκευή ιστοσελίδας Λευκωσία"
// Secondary: "web design Λευκωσία", "ιστοσελίδα επιχείρηση Λευκωσία"

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "D&M Labs",
  "description": "Κατασκευή επαγγελματικών ιστοσελίδων για επιχειρήσεις στη Λευκωσία. Από €299.",
  "url": "https://dm-labs.io/el/web-design-nicosia",
  "telephone": "+35797472847",
  "email": "info@dm-labs.io",
  "inLanguage": "el",
  "areaServed": {
    "@type": "City",
    "name": "Nicosia"
  },
  "priceRange": "€€"
};

export default function WebDesignNicosiaEl() {
  useSEO({
    title: "Κατασκευή Ιστοσελίδας Λευκωσία | Από €299 | D&M Labs",
    description: "Επαγγελματική κατασκευή ιστοσελίδας για επιχειρήσεις στη Λευκωσία. Custom σχεδιασμός, SEO, mobile-first. Starter €299, Business €399, Premium €699.",
    canonicalPath: "/el/web-design-nicosia"
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
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/85 via-[#0F172A]/60 to-transparent" />
        <div className="container max-w-5xl mx-auto relative z-10 py-20">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#6FE3FF] mb-4">
            Κατασκευή Ιστοσελίδας Λευκωσία
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight max-w-2xl">
            Επαγγελματική Ιστοσελίδα για την Επιχείρησή σας στη Λευκωσία
          </h1>
          <p className="text-lg text-blue-100 mb-3 leading-relaxed max-w-xl">
            Κατασκευάζουμε custom, mobile-first ιστοσελίδες για επιχειρήσεις στη Λευκωσία. Από €299, παράδοση σε 5-14 ημέρες.
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

      {/* ── WHY NICOSIA ── */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-4">
            Γιατί η Επιχείρησή σας στη Λευκωσία Χρειάζεται Ιστοσελίδα
          </h2>
          <p className="text-[#5B6472] mb-6 leading-relaxed max-w-2xl">
            Η Λευκωσία είναι η πρωτεύουσα της Κύπρου και το επιχειρηματικό κέντρο του νησιού. Εδώ βρίσκονται οι περισσότερες εταιρείες, τα γραφεία και οι επαγγελματικές υπηρεσίες - και ο ανταγωνισμός για online ορατότητα είναι πιο έντονος από ποτέ.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Βρεθείτε στη Google", desc: "Κατασκευάζουμε κάθε ιστοσελίδα με σωστή SEO δομή ώστε να εμφανίζεστε όταν κάποιος ψάχνει για αυτό που προσφέρετε στη Λευκωσία." },
              { title: "Αξιοπιστία", desc: "Στη Λευκωσία, οι επαγγελματικές υπηρεσίες κρίνονται από την online παρουσία τους. Μια επαγγελματική ιστοσελίδα δείχνει αξιοπιστία και σοβαρότητα." },
              { title: "Διαθέσιμοι 24/7", desc: "Η ιστοσελίδα σας δουλεύει ακόμα και όταν εσείς δεν είστε. Πελάτες μπορούν να βρουν πληροφορίες και να επικοινωνήσουν οποιαδήποτε ώρα." },
              { title: "Ανταγωνιστικό Πλεονέκτημα", desc: "Στη Λευκωσία, μια καλά σχεδιασμένη ιστοσελίδα σας ξεχωρίζει από τον ανταγωνισμό και σας φέρνει νέους πελάτες." }
            ].map((w) => (
              <div key={w.title} className="bg-[#F8F9FC] rounded-2xl p-6 border border-[#E8EAF0]">
                <h3 className="font-bold text-[#111315] text-base mb-2">{w.title}</h3>
                <p className="text-[#5B6472] text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-4">Τιμές Κατασκευής Ιστοσελίδας στη Λευκωσία</h2>
          <p className="text-[#5B6472] mb-8">Εφάπαξ τιμές, χωρίς μηνιαίες χρεώσεις.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Starter", price: "€299", highlight: false, features: ["1 σελίδα", "Mobile-responsive", "WhatsApp κουμπί", "Βασική SEO", "Παράδοση 5-7 ημέρες"] },
              { name: "Business", price: "€399", highlight: true, features: ["Έως 5 σελίδες", "Φόρμα επικοινωνίας", "Google Maps", "Reviews widget", "SEO", "Παράδοση 7-10 ημέρες"] },
              { name: "Premium", price: "€699", highlight: false, features: ["Έως 7 σελίδες", "Custom animations", "Gallery", "5 SEO άρθρα", "Πλήρης SEO", "Παράδοση 10-14 ημέρες"] }
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
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#111315] mb-4">Εξυπηρετούμε τη Λευκωσία και Ολόκληρη την Κύπρο</h2>
          <div className="rounded-2xl overflow-hidden border border-[#E8EAF0] shadow-sm">
            <iframe
              title="Χάρτης Λευκωσίας - Κατασκευή Ιστοσελίδων"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52428.3!2d33.36!3d35.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de1767b1b3c3c3%3A0x400bd2ce2b9c5f0!2sNicosia%2C%20Cyprus!5e0!3m2!1sel!2sgr!4v1"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-spacing">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-8">Συχνές Ερωτήσεις</h2>
          <div className="flex flex-col gap-4">
            {[
              { q: "Πόσο κοστίζει μια ιστοσελίδα στη Λευκωσία;", a: "Οι τιμές ξεκινούν από €299 για το Starter πακέτο. Δεν υπάρχουν επιπλέον χρεώσεις για τη γεωγραφική τοποθεσία." },
              { q: "Χρειάζεστε να συναντηθούμε φυσικά;", a: "Όχι. Δουλεύουμε εξ αποστάσεως με επικοινωνία μέσω email, WhatsApp ή τηλεφώνου." },
              { q: "Σε ποια γλώσσα παρέχεται η υπηρεσία;", a: "Η υπηρεσία κατασκευής παρέχεται στα αγγλικά, αλλά επικοινωνούμε μαζί σας στα ελληνικά χωρίς κανένα πρόβλημα." }
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
          <h2 className="text-3xl font-extrabold text-white mb-4">Έτοιμοι για την Ιστοσελίδα σας στη Λευκωσία;</h2>
          <p className="text-blue-100 text-lg mb-8">Δωρεάν πρόταση μέσα σε 24 ώρες.</p>
          <Link href="/el/contact">
            <button className="px-10 py-4 rounded-xl bg-white text-[#5B8CFF] font-bold text-base hover:bg-blue-50 transition-colors shadow-lg">
              Ζητήστε Δωρεάν Πρόταση
            </button>
          </Link>
        </div>
      </section>

    </main>
  );
}
