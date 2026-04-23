import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useHreflang } from "@/hooks/useHreflang";
import { Check } from "lucide-react";

// Greek Pricing page — /el/pricing
// Primary keyword: "τιμές κατασκευής ιστοσελίδας" / "κόστος ιστοσελίδας Κύπρος"

const packages = [
  {
    name: "Starter",
    price: "€299",
    tagline: "Η τέλεια αρχή για κάθε επιχείρηση",
    delivery: "5-7 ημέρες",
    revisions: "2 αναθεωρήσεις",
    highlight: false,
    features: [
      "Branded Business Page (1 σελίδα)",
      "Mobile-responsive σχεδιασμός",
      "Κουμπί WhatsApp",
      "Σύνδεσμοι social media",
      "Accessibility widget",
      "Βασική SEO ρύθμιση",
      "Φόρμα επικοινωνίας",
      "Hosting setup guidance",
    ]
  },
  {
    name: "Business",
    price: "€399",
    tagline: "Για επιχειρήσεις που θέλουν να ξεχωρίζουν",
    delivery: "7-10 ημέρες",
    revisions: "3 αναθεωρήσεις",
    highlight: true,
    features: [
      "Έως 5 σελίδες",
      "Φόρμα επικοινωνίας και κράτησης",
      "Google Maps ενσωμάτωση",
      "Reviews widget",
      "Testimonials section",
      "SEO βελτιστοποίηση",
      "Speed optimisation",
      "Mobile-first σχεδιασμός",
    ]
  },
  {
    name: "Premium",
    price: "€699",
    tagline: "Πλήρης online παρουσία με SEO περιεχόμενο",
    delivery: "10-14 ημέρες",
    revisions: "5 αναθεωρήσεις",
    highlight: false,
    features: [
      "Έως 7 σελίδες",
      "Custom σχεδιασμός και animations",
      "Gallery",
      "5 SEO blog άρθρα",
      "Πλήρης meta/SEO δομή",
      "Pop-up",
      "Speed optimisation",
      "Hosting setup guidance",
    ]
  }
];

export default function PricingEl() {
  useSEO({
    title: "Τιμές Κατασκευής Ιστοσελίδας | D&M Labs | Κύπρος - Ελλάδα",
    description: "Διαφανείς τιμές κατασκευής ιστοσελίδας για επιχειρήσεις στην Κύπρο και την Ελλάδα. Starter €299, Business €399, Premium €699. Χωρίς κρυφές χρεώσεις.",
    canonicalPath: "/el/pricing"
  });
  useHreflang();

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#F0EAFF]">
        <div className="container max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">Τιμοκατάλογος</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111315] mb-4 leading-tight">
            Τιμές Κατασκευής{" "}
            <span className="bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] bg-clip-text text-transparent">
              Ιστοσελίδας
            </span>
          </h1>
          <p className="text-lg text-[#5B6472] mb-3 leading-relaxed">
            Μία σταθερή τιμή, όλα συμπεριλαμβάνονται. Χωρίς κρυφές χρεώσεις, χωρίς μηνιαίες συνδρομές, χωρίς εκπλήξεις.
          </p>
          <p className="text-sm text-[#9CA3AF] italic">
            Η υπηρεσία παρέχεται στα αγγλικά. Επικοινωνούμε μαζί σας στα ελληνικά.
          </p>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="section-spacing">
        <div className="container max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl p-8 border flex flex-col ${
                  pkg.highlight
                    ? "border-[#5B8CFF] bg-gradient-to-br from-[#EEF3FF] to-[#F0EAFF] shadow-xl"
                    : "border-[#E8EAF0] bg-white shadow-sm"
                }`}
              >
                {pkg.highlight && (
                  <span className="inline-block text-xs font-semibold text-[#5B8CFF] uppercase tracking-wider mb-3">
                    Πιο Δημοφιλές
                  </span>
                )}
                <div className="text-3xl font-extrabold text-[#111315] mb-1">{pkg.price}</div>
                <div className="text-xl font-bold text-[#111315] mb-1">{pkg.name}</div>
                <p className="text-sm text-[#5B6472] mb-2">{pkg.tagline}</p>
                <p className="text-xs text-[#9CA3AF] mb-6">
                  Παράδοση: {pkg.delivery} - {pkg.revisions}
                </p>
                <ul className="space-y-2 flex-1 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#5B6472]">
                      <Check size={15} className="text-[#5B8CFF] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/el/contact">
                  <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    pkg.highlight
                      ? "bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white hover:opacity-90"
                      : "border border-[#5B8CFF] text-[#5B8CFF] hover:bg-[#EEF3FF]"
                  }`}>
                    Ξεκινήστε Τώρα
                  </button>
                </Link>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#9CA3AF] text-center mt-6">
            Όλες οι τιμές είναι εφάπαξ. Δεν υπάρχουν μηνιαίες χρεώσεις ή κρυφά κόστη.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-10">Συχνές Ερωτήσεις για τις Τιμές</h2>
          <div className="flex flex-col gap-6">
            {[
              {
                q: "Τι περιλαμβάνεται στην τιμή;",
                a: "Κάθε πακέτο περιλαμβάνει τον πλήρη σχεδιασμό και ανάπτυξη της ιστοσελίδας, βασική SEO ρύθμιση, mobile-responsive σχεδιασμό, φόρμα επικοινωνίας και όλα τα χαρακτηριστικά που αναφέρονται στο πακέτο. Δεν υπάρχουν κρυφές χρεώσεις."
              },
              {
                q: "Τι γίνεται με το hosting και το domain;",
                a: "Σας καθοδηγούμε για το πώς να αποκτήσετε το δικό σας domain (όνομα ιστοσελίδας) και hosting. Θέλουμε εσείς να είστε ιδιοκτήτες της ιστοσελίδας σας - όχι εμείς. Το κόστος domain και hosting είναι συνήθως €10-30 ετησίως και πληρώνεται απευθείας στον πάροχο."
              },
              {
                q: "Μπορώ να κάνω αλλαγές μετά την παράδοση;",
                a: "Φυσικά. Για μικρές αλλαγές (κείμενα, φωτογραφίες, τιμές) επικοινωνείτε μαζί μας και τις κάνουμε γρήγορα. Για μεγαλύτερες αλλαγές ή νέες σελίδες, συμφωνούμε σε μια μικρή αμοιβή ανάλογα με το εύρος της εργασίας."
              },
              {
                q: "Πόσο καιρό παίρνει να φτιαχτεί η ιστοσελίδα μου;",
                a: "Το Starter πακέτο παραδίδεται σε 5-7 ημέρες από τη στιγμή που έχουμε το περιεχόμενό σας. Το Business παραδίδεται σε 7-10 ημέρες και το Premium σε 10-14 ημέρες. Σας κρατάμε ενήμερους σε κάθε βήμα."
              }
            ].map((faq) => (
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
          <h2 className="text-3xl font-extrabold text-white mb-4">Έχετε ερωτήσεις;</h2>
          <p className="text-blue-100 text-lg mb-8">
            Επικοινωνήστε μαζί μας και θα σας στείλουμε δωρεάν πρόταση μέσα σε 24 ώρες.
          </p>
          <Link href="/el/contact">
            <button className="px-10 py-4 rounded-xl bg-white text-[#5B8CFF] font-bold text-base hover:bg-blue-50 transition-colors shadow-lg">
              Επικοινωνήστε μαζί μας
            </button>
          </Link>
        </div>
      </section>

    </main>
  );
}
