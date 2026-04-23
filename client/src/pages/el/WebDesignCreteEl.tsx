import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useHreflang } from "@/hooks/useHreflang";
import { Check } from "lucide-react";

// Greek Web Design Crete page — /el/web-design-crete
// Primary keyword: "κατασκευή ιστοσελίδας Κρήτη"
// Secondary: "web design Κρήτη", "ιστοσελίδα επιχείρηση Κρήτη", "κατασκευή site Ηράκλειο Χανιά"

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "D&M Labs",
  "description": "Κατασκευή επαγγελματικών ιστοσελίδων για επιχειρήσεις στην Κρήτη. Από €299.",
  "url": "https://dm-labs.io/el/web-design-crete",
  "telephone": "+35797472847",
  "email": "info@dm-labs.io",
  "inLanguage": "el",
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Crete"
  },
  "priceRange": "€€",
  "offers": [
    { "@type": "Offer", "name": "Starter", "price": "299", "priceCurrency": "EUR" },
    { "@type": "Offer", "name": "Business", "price": "399", "priceCurrency": "EUR" },
    { "@type": "Offer", "name": "Premium", "price": "699", "priceCurrency": "EUR" }
  ]
};

const industries = [
  { title: "Εστιατόρια και Ταβέρνες", desc: "Μενού, κρατήσεις, ωράριο. Ιστοσελίδες που γεμίζουν τραπέζια.", icon: "🍽️" },
  { title: "Ξενοδοχεία και Βίλες", desc: "Κρατήσεις, γκαλερί, τιμές. Προσελκύστε επισκέπτες απευθείας.", icon: "🏨" },
  { title: "Ομορφιά και Wellness", desc: "Nail studios, κομμωτήρια, spa. Ιστοσελίδες που γεμίζουν ραντεβού.", icon: "✨" },
  { title: "Fitness και Yoga", desc: "Personal trainers, yoga studios, Pilates. Αποκτήστε νέους πελάτες.", icon: "💪" },
  { title: "Επαγγελματικές Υπηρεσίες", desc: "Δικηγόροι, λογιστές, σύμβουλοι. Αξιόπιστη online παρουσία.", icon: "💼" },
  { title: "Κατασκευές", desc: "Εργολάβοι, ηλεκτρολόγοι, υδραυλικοί. Δείξτε τη δουλειά σας.", icon: "🔨" },
  { title: "Λιανική", desc: "Καταστήματα, μπουτίκ, τοπικά εμπορεύματα.", icon: "🛍️" },
  { title: "Τουρισμός", desc: "Τουριστικά γραφεία, εκδρομές, εμπειρίες Κρήτης.", icon: "🌊" }
];

export default function WebDesignCreteEl() {
  useSEO({
    title: "Κατασκευή Ιστοσελίδας Κρήτη | Ηράκλειο - Χανιά | Από €299",
    description: "Επαγγελματική κατασκευή ιστοσελίδας για επιχειρήσεις στην Κρήτη. Ηράκλειο, Χανιά, Ρέθυμνο, Άγιος Νικόλαος. Custom σχεδιασμός, SEO, mobile-first. Από €299.",
    canonicalPath: "/el/web-design-crete"
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
          style={{ backgroundImage: "url('https://cdn.manus.space/webdev/dm-studio/crete-harbour.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/85 via-[#0F172A]/60 to-transparent" />
        <div className="container max-w-5xl mx-auto relative z-10 py-20">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#6FE3FF] mb-4">
            Κατασκευή Ιστοσελίδας Κρήτη
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight max-w-2xl">
            Επαγγελματική Ιστοσελίδα για την Επιχείρησή σας στην Κρήτη
          </h1>
          <p className="text-lg text-blue-100 mb-3 leading-relaxed max-w-xl">
            Κατασκευάζουμε custom ιστοσελίδες για επιχειρήσεις σε Ηράκλειο, Χανιά, Ρέθυμνο και σε ολόκληρη την Κρήτη. Από €299, παράδοση σε 5-14 ημέρες.
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

      {/* ── INDUSTRIES ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-4">Κλάδοι που Εξυπηρετούμε στην Κρήτη</h2>
          <p className="text-[#5B6472] mb-8 max-w-2xl leading-relaxed">
            Από ταβέρνες στο Ηράκλειο μέχρι βίλες στα Χανιά και personal trainers στο Ρέθυμνο - κατασκευάζουμε ιστοσελίδες για κάθε κλάδο.
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

      {/* ── TOURISM CALLOUT ── */}
      <section className="section-spacing bg-[#F0F4FF]">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#111315] mb-4">
                Η Κρήτη Έχει Εκατομμύρια Τουρίστες - Είναι η Ιστοσελίδα σας Έτοιμη;
              </h2>
              <p className="text-[#5B6472] mb-4 leading-relaxed">
                Κάθε χρόνο εκατομμύρια τουρίστες από όλο τον κόσμο επισκέπτονται την Κρήτη. Ψάχνουν ξενοδοχεία, εστιατόρια, εμπειρίες και υπηρεσίες στο Google - στα αγγλικά, στα γερμανικά, στα ρωσικά.
              </p>
              <p className="text-[#5B6472] leading-relaxed">
                Μια επαγγελματική, πολύγλωσση ιστοσελίδα σας βοηθά να προσελκύσετε αυτούς τους επισκέπτες απευθείας - χωρίς να πληρώνετε προμήθειες σε πλατφόρμες κρατήσεων.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1555993539-1732b0258235?w=700&q=80"
                alt="Τουρισμός Κρήτη - επαγγελματική ιστοσελίδα για τουριστικές επιχειρήσεις"
                className="w-full object-cover"
                style={{ height: "280px" }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-4">Τιμές Κατασκευής Ιστοσελίδας στην Κρήτη</h2>
          <p className="text-[#5B6472] mb-8">Εφάπαξ τιμές, χωρίς μηνιαίες χρεώσεις.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Starter", price: "€299", highlight: false, features: ["1 σελίδα", "Mobile-responsive", "WhatsApp κουμπί", "Βασική SEO", "Παράδοση 5-7 ημέρες"] },
              { name: "Business", price: "€399", highlight: true, features: ["Έως 5 σελίδες", "Φόρμα κράτησης", "Google Maps", "Reviews widget", "SEO", "Παράδοση 7-10 ημέρες"] },
              { name: "Premium", price: "€699", highlight: false, features: ["Έως 7 σελίδες", "Custom animations", "Gallery", "5 SEO άρθρα", "Πλήρης SEO", "Παράδοση 10-14 ημέρες"] }
            ].map((pkg) => (
              <div key={pkg.name} className={`rounded-2xl p-6 border flex flex-col ${pkg.highlight ? "border-[#5B8CFF] bg-gradient-to-br from-[#EEF3FF] to-[#F0EAFF] shadow-xl" : "border-[#E8EAF0] bg-[#F8F9FC] shadow-sm"}`}>
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
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#111315] mb-4">Εξυπηρετούμε σε Ολόκληρη την Κρήτη</h2>
          <p className="text-[#5B6472] mb-6">Ηράκλειο, Χανιά, Ρέθυμνο, Άγιος Νικόλαος και παντού στο νησί.</p>
          <div className="rounded-2xl overflow-hidden border border-[#E8EAF0] shadow-sm">
            <iframe
              title="Χάρτης Κρήτης - Κατασκευή Ιστοσελίδων"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d826025.6!2d24.0!3d35.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x149a5776b8b3c3c3%3A0x400bd2ce2b9c5f0!2sCrete%2C%20Greece!5e0!3m2!1sel!2sgr!4v1"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-8">Συχνές Ερωτήσεις</h2>
          <div className="flex flex-col gap-4">
            {[
              { q: "Χρειάζομαι να είστε φυσικά στην Κρήτη;", a: "Όχι. Δουλεύουμε εξ αποστάσεως με επιχειρήσεις σε ολόκληρη την Ελλάδα και την Κύπρο. Όλη η επικοινωνία γίνεται μέσω email, WhatsApp ή τηλεφώνου." },
              { q: "Σε ποια γλώσσα θα είναι η ιστοσελίδα μου;", a: "Κατασκευάζουμε ιστοσελίδες στα ελληνικά, αγγλικά ή και στις δύο γλώσσες - ανάλογα με τους πελάτες σας. Για τουριστικές επιχειρήσεις στην Κρήτη, συνήθως συνιστούμε αγγλικά ή διγλωσσία." },
              { q: "Πόσο κοστίζει μια ιστοσελίδα για επιχείρηση στην Κρήτη;", a: "Οι τιμές ξεκινούν από €299 για το Starter πακέτο. Δεν υπάρχουν επιπλέον χρεώσεις για τη γεωγραφική τοποθεσία." },
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
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Έτοιμοι για την Ιστοσελίδα σας στην Κρήτη;
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Επικοινωνήστε μαζί μας σήμερα. Δωρεάν πρόταση μέσα σε 24 ώρες.
          </p>
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
