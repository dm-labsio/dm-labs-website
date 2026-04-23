import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useHreflang } from "@/hooks/useHreflang";

// Greek Services page — /el/services
// Primary keyword: "υπηρεσίες κατασκευής ιστοσελίδων" / "web design υπηρεσίες Κύπρος"

export default function ServicesEl() {
  useSEO({
    title: "Υπηρεσίες Κατασκευής Ιστοσελίδων | D&M Labs | Κύπρος - Ελλάδα",
    description: "Επαγγελματικές υπηρεσίες κατασκευής ιστοσελίδων για επιχειρήσεις στην Κύπρο και την Ελλάδα. Custom σχεδιασμός, SEO, mobile-first. Από €299.",
    canonicalPath: "/el/services"
  });
  useHreflang();

  const services = [
    {
      title: "Custom Σχεδιασμός Ιστοσελίδας",
      desc: "Κάθε ιστοσελίδα σχεδιάζεται από μηδέν βάσει της επιχείρησής σας. Δεν χρησιμοποιούμε έτοιμα templates - φτιάχνουμε κάτι μοναδικό που αντικατοπτρίζει την ταυτότητα της επιχείρησής σας.",
      icon: "🎨"
    },
    {
      title: "Mobile-First Ανάπτυξη",
      desc: "Πάνω από το 70% των χρηστών σήμερα περιηγούνται από κινητό. Κάθε ιστοσελίδα που φτιάχνουμε είναι σχεδιασμένη πρώτα για κινητό και μετά για desktop.",
      icon: "📱"
    },
    {
      title: "SEO Βελτιστοποίηση",
      desc: "Κάθε ιστοσελίδα παραδίδεται με σωστή SEO δομή - σωστούς τίτλους, meta descriptions, heading structure, image alt texts και γρήγορους χρόνους φόρτωσης. Η ιστοσελίδα σας θα είναι έτοιμη να βρεθεί στη Google από την πρώτη μέρα.",
      icon: "🔍"
    },
    {
      title: "Φόρμες Επικοινωνίας και Κράτησης",
      desc: "Φόρμες που λειτουργούν - επικοινωνίας, κράτησης ραντεβού, αιτήσεων. Κάθε μήνυμα φτάνει απευθείας στο email σας.",
      icon: "📬"
    },
    {
      title: "Google Maps Ενσωμάτωση",
      desc: "Βοηθήστε τους πελάτες σας να σας βρουν εύκολα. Ενσωματώνουμε Google Maps σε κάθε ιστοσελίδα που το χρειάζεται.",
      icon: "📍"
    },
    {
      title: "Ταχύτητα και Απόδοση",
      desc: "Μια αργή ιστοσελίδα χάνει επισκέπτες. Βελτιστοποιούμε κάθε ιστοσελίδα για γρήγορους χρόνους φόρτωσης - καλύτερη εμπειρία χρήστη και καλύτερη κατάταξη στη Google.",
      icon: "⚡"
    },
    {
      title: "Ενσωμάτωση AI Εργαλείων",
      desc: "Χρησιμοποιούμε τα καλύτερα AI εργαλεία της αγοράς για να παραδώσουμε πιο αποτελεσματικές ιστοσελίδες - χωρίς να αντικαθιστούν τον ανθρώπινο σχεδιασμό και κρίση.",
      icon: "🤖"
    },
    {
      title: "Συνεχής Υποστήριξη",
      desc: "Δεν εξαφανιζόμαστε μετά το launch. Είμαστε εδώ για ενημερώσεις, αλλαγές και ερωτήσεις. Η επιχείρησή σας αλλάζει - η ιστοσελίδα σας πρέπει να αλλάζει μαζί της.",
      icon: "🤝"
    }
  ];

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#F0EAFF]">
        <div className="container max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">Υπηρεσίες</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111315] mb-4 leading-tight">
            Τι Προσφέρουμε
          </h1>
          <p className="text-lg text-[#5B6472] mb-3 leading-relaxed">
            Από τον σχεδιασμό μέχρι το launch και μετά - αναλαμβάνουμε τα πάντα ώστε εσείς να επικεντρωθείτε στην επιχείρησή σας.
          </p>
          <p className="text-sm text-[#9CA3AF] italic">
            Η υπηρεσία παρέχεται στα αγγλικά. Επικοινωνούμε μαζί σας στα ελληνικά.
          </p>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-6 border border-[#E8EAF0] shadow-sm">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h2 className="font-bold text-[#111315] text-lg mb-2">{s.title}</h2>
                <p className="text-[#5B6472] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS TEASER ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#111315] mb-4">Πώς Δουλεύουμε</h2>
          <p className="text-[#5B6472] mb-8 leading-relaxed">
            Η διαδικασία μας είναι απλή και διαφανής. Από την πρώτη συζήτηση μέχρι το launch, ξέρετε πάντα σε ποιο στάδιο βρισκόμαστε.
          </p>
          <Link href="/el/process">
            <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
              Δείτε τη Διαδικασία μας
            </button>
          </Link>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-spacing bg-gradient-to-br from-[#5B8CFF] to-[#8B5CFF]">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Έτοιμοι να ξεκινήσετε;</h2>
          <p className="text-blue-100 text-lg mb-8">
            Επικοινωνήστε μαζί μας για μια δωρεάν συμβουλευτική. Απαντάμε μέσα σε 24 ώρες.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/el/contact">
              <button className="px-10 py-4 rounded-xl bg-white text-[#5B8CFF] font-bold text-base hover:bg-blue-50 transition-colors shadow-lg">
                Επικοινωνήστε μαζί μας
              </button>
            </Link>
            <Link href="/el/pricing">
              <button className="px-10 py-4 rounded-xl bg-white/20 border border-white/40 text-white font-bold text-base hover:bg-white/30 transition-colors">
                Δείτε τις Τιμές
              </button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
