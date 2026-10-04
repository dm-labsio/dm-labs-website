import { usePricingCurrency, Price } from "@/contexts/CurrencyContext";
import { BUILD_PRICE_SUMMARY, BUILD_PLANS, BUILD_PRICES } from "@/components/pricing/pricingContent";
import { useStructuredData } from "@/hooks/useStructuredData";
import { serviceSchemaData } from "@/lib/structuredData";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";

// SEO landing page: /web-design-thessaloniki
// Primary keyword: "κατασκευή ιστοσελίδας Θεσσαλονίκη"
// Secondary: "web design Θεσσαλονίκη"
// Tertiary (price-intent): "κατασκευή ιστοσελίδας Θεσσαλονίκη τιμές"
// Design: matches DM-Labs.io site style - light bg, brand gradient accents, clean typography

const WHATSAPP_URL = `https://wa.me/35797472847?text=${encodeURIComponent("Γεια σας! Θα ήθελα να φτιάξω ιστοσελίδα για την επιχείρησή μου στη Θεσσαλονίκη.")}`;

const baseFaqs = [
  {
    q: "Πόσο κοστίζει η κατασκευή ιστοσελίδας στη Θεσσαλονίκη;",
    a: BUILD_PRICE_SUMMARY.el,
  },
  {
    q: "Δουλεύετε με επιχειρήσεις στη Θεσσαλονίκη από απόσταση;",
    a: "Ναι, και δεν χρειάζεται να συναντηθούμε από κοντά. Η κουβέντα, ο σχεδιασμός, οι διορθώσεις και η δημοσίευση γίνονται μέσω WhatsApp, email και βιντεοκλήσεων. Έτσι δεν χάνετε χρόνο σε ραντεβού, και η δουλειά προχωράει πιο γρήγορα.",
  },
  {
    q: "Μπορείτε να φτιάξετε ιστοσελίδα στα ελληνικά;",
    a: "Φυσικά. Η ιστοσελίδα μπορεί να είναι μόνο στα ελληνικά. Αν τη θέλετε και σε άλλες γλώσσες, γίνεται ως έργο Enterprise / Custom, με προσφορά ανάλογα με τις γλώσσες, το περιεχόμενο και το αν θέλετε να κάνετε αλλαγές μόνοι σας.",
  },
  {
    q: "Σε πόσο καιρό θα είναι έτοιμη η ιστοσελίδα;",
    a: "Το χρονοδιάγραμμα το συμφωνούμε πριν ξεκινήσουμε, ανάλογα με το εύρος και τα υλικά που χρειάζονται. Σας ενημερώνουμε σε κάθε στάδιο. Αλλαγές στο έργο, στο περιεχόμενο ή στα σχόλια μπορεί να επηρεάσουν το πρόγραμμα, και κάθε νέα ημερομηνία τη συμφωνούμε μαζί σας.",
  },
];

export default function WebDesignThessalonikiEl() {
  const { copy, euro } = usePricingCurrency("el");
  const faqs = copy(baseFaqs);

  useSEO({
    title: "Κατασκευή ιστοσελίδων στη Θεσσαλονίκη | DM-Labs.io",
    description:
      "Ιστοσελίδες για επιχειρήσεις στη Θεσσαλονίκη που θέλουν περισσότερους πελάτες: σχεδιασμός στα μέτρα σας, άψογη εμφάνιση στο κινητό και SEO. Δωρεάν συμβουλευτική.",
    canonicalPath: "/el/web-design-thessaloniki/",
  });

  useStructuredData("location-jsonld-schema", serviceSchemaData("https://dm-labs.io/el/web-design-thessaloniki/", "el", "Κατασκευή ιστοσελίδων στη Θεσσαλονίκη", "Η DM-Labs.io φτιάχνει από απόσταση ιστοσελίδες για επιχειρήσεις στη Θεσσαλονίκη: επαγγελματικές, responsive και με τις βάσεις του SEO, με χρονοδιάγραμμα που συμφωνούμε από πριν.", faqs));

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#F0EAFF]">
        <div className="container max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">
            Κατασκευή ιστοσελίδων · Θεσσαλονίκη
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111315] mb-4 leading-tight">
            Κατασκευή ιστοσελίδας{" "}
            <span className="bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] bg-clip-text text-transparent">
              στη Θεσσαλονίκη
            </span>
          </h1>
          <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-8 leading-relaxed">
            Η DM-Labs.io φτιάχνει από απόσταση ιστοσελίδες για επιχειρήσεις στη Θεσσαλονίκη: επαγγελματικές, γρήγορες και responsive, για να σας εμπιστεύονται και να σας γράφουν. Σε μια πόλη με τόσο ζωντανή αγορά, η ιστοσελίδα σας πρέπει να ξεχωρίζει.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/el/contact/">
              <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                Ζητήστε δωρεάν προσφορά
              </button>
            </Link>
            <Link href="/el/pricing/">
              <button className="px-8 py-3.5 rounded-xl border border-[#5B8CFF] text-[#5B8CFF] font-semibold text-base hover:bg-[#EEF3FF] transition-colors bg-white">
                Δείτε τις τιμές
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY THESSALONIKI NEEDS A WEBSITE ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-6">
            Γιατί μια επιχείρηση στη Θεσσαλονίκη χρειάζεται επαγγελματική ιστοσελίδα
          </h2>
          <p className="text-[#5B6472] leading-relaxed mb-5">
            Η Θεσσαλονίκη, η συμπρωτεύουσα, είναι μια πόλη με πολύ εμπόριο. Στην Τσιμισκή και στα Λαδάδικα υπάρχουν εκατοντάδες εστιατόρια, μαγαζιά, δικηγορικά γραφεία και επαγγελματίες που διεκδικούν τους ίδιους πελάτες. Το Αριστοτέλειο Πανεπιστήμιο φέρνει στην πόλη δεκάδες χιλιάδες φοιτητές, και η ΔΕΘ, η Διεθνής Έκθεση Θεσσαλονίκης, φέρνει κάθε χρόνο επαγγελματίες και επισκέπτες από το εξωτερικό.
          </p>
          <p className="text-[#5B6472] leading-relaxed mb-5">
            Με τόση κίνηση, ο ανταγωνισμός στο ίντερνετ είναι μεγάλος. Πολλοί ψάχνουν μια επιχείρηση online πριν επικοινωνήσουν μαζί της. Αν η ιστοσελίδα σας είναι αργή, παλιά ή δεν υπάρχει καθόλου, δεν χάνετε απλώς προβολή: στέλνετε τους πελάτες σας στον ανταγωνισμό.
          </p>
          <p className="text-[#5B6472] leading-relaxed mb-5">
            Μια καλή ιστοσελίδα δεν είναι μόνο να δείχνει ωραία. Βοηθάει το Google να καταλάβει τι κάνετε, ανοίγει γρήγορα στο κινητό και φέρνει μηνύματα, χωρίς να χρειάζεται να ασχολείστε συνέχεια μαζί της. Σε μια πυκνή αγορά όπως η Θεσσαλονίκη, αυτό δεν είναι πια πολυτέλεια.
          </p>
          <p className="text-[#5B6472] leading-relaxed">
            Όσοι φτιάχνουν τώρα μια σωστή ιστοσελίδα, πριν γεμίσει ο κλάδος τους στο ίντερνετ, κερδίζουν πρώτοι όσους ψάχνουν στο Google και χτίζουν εμπιστοσύνη με πελάτες από την πόλη και από το εξωτερικό.
          </p>
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-3">
            Τι φτιάχνουμε για επιχειρήσεις στη Θεσσαλονίκη
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
                title: "Εταιρικές ιστοσελίδες",
                desc: "Μια ολοκληρωμένη ιστοσελίδα για την επιχείρησή σας: αρχική, ποιοι είμαστε, υπηρεσίες και επικοινωνία. Για να σας εμπιστεύονται και να σας γράφουν από την πρώτη μέρα.",
              },
              {
                title: "Landing pages",
                desc: "Μία σελίδα με έναν στόχο: να μαζέψει αιτήματα, να προβάλει μια υπηρεσία ή να φέρει κρατήσεις. Φτιάχνεται γρήγορα και πάει κατευθείαν στο θέμα.",
              },
              {
                title: "Σελίδες υπηρεσιών",
                desc: "Ξεχωριστή σελίδα για κάθε βασική σας υπηρεσία, στημένη για όσα ψάχνουν οι πελάτες σας στο Google.",
              },
              {
                title: "Blog και ρύθμιση SEO",
                desc: "Δομή για blog και αρχικές ρυθμίσεις SEO, για να έχει η ιστοσελίδα σας βάσεις να ανεβαίνει στο Google με τον καιρό. Χωρίς να χρειάζεται να καταλαβαίνετε τα τεχνικά.",
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
            Ξεκάθαρες τιμές για επιχειρήσεις στη Θεσσαλονίκη
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
                <div className="text-2xl font-extrabold text-[#111315] mb-1">{p.price}</div>
                <div className="font-semibold text-[#111315] mb-3">{p.name}</div>
                <p className="text-[#5B6472] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#9CA3AF] mt-4">
            Η κατασκευή πληρώνεται μία φορά. Η φιλοξενία και η συντήρηση χρεώνονται ξεχωριστά, από <Price euros={69} locale="el" />/μήνα, όσο διαχειριζόμαστε την ιστοσελίδα σας. Οι τιμές δεν περιλαμβάνουν τυχόν φόρους και χρεώσεις τρίτων που συμφωνούνται ξεχωριστά.
          </p>
        </div>
      </section>

      {/* ── WHY CHOOSE D&M LABS ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-6">
            Γιατί να δουλέψετε με τη DM-Labs.io
          </h2>
          <p className="text-[#5B6472] leading-relaxed mb-8">
            Δουλεύουμε από απόσταση με επιχειρήσεις παντού, από τη Θεσσαλονίκη και την Αθήνα μέχρι μικρότερες πόλεις και νησιά. Δεν χρειάζονται επισκέψεις σε γραφεία ούτε να περιμένετε για ραντεβού. Αναλαμβάνουμε όλη τη διαδικασία, από την πρώτη κουβέντα μέχρι να βγει η ιστοσελίδα στον αέρα, κι εσείς ασχολείστε με την επιχείρησή σας.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "Γρήγορη παράδοση",
                desc: "Δουλεύουμε γρήγορα, μιλάμε ξεκάθαρα και δεν σας αφήνουμε να περιμένετε.",
              },
              {
                title: "Χωρίς τεχνικές γνώσεις",
                desc: "Δεν χρειάζεται να ξέρετε από κώδικα, φιλοξενία ή SEO. Τα αναλαμβάνουμε όλα και σας εξηγούμε με απλά λόγια ό,τι χρειάζεται.",
              },
              {
                title: "Φτιαγμένη για να φέρνει πελάτες",
                desc: "Κάθε σελίδα έχει έναν στόχο: να σας στείλει ο επισκέπτης μήνυμα ή να σας πάρει τηλέφωνο. Ο ωραίος σχεδιασμός αξίζει μόνο όταν φέρνει αποτέλεσμα.",
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
            Σε όλη τη Θεσσαλονίκη
          </h2>
          <p className="text-[#5B6472] mb-8">
            Δουλεύουμε με επιχειρήσεις σε όλη τη Θεσσαλονίκη: από το κέντρο και την παραλία μέχρι την Καλαμαριά, τη Σταυρούπολη, την Πυλαία και όλη την Κεντρική Μακεδονία. Η απόσταση δεν παίζει ρόλο.
          </p>
          <div className="rounded-2xl overflow-hidden border border-[#E8EAF0] shadow-sm" style={{ height: "360px" }}>
            <iframe
              title="Θεσσαλονίκη"
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
        </div>
      </section>
    </main>
  );
}
