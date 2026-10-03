import { usePricingCurrency } from "@/contexts/CurrencyContext";
import { BUILD_PRICE_SUMMARY, BUILD_PLANS, BUILD_PRICES } from "@/components/pricing/pricingContent";
import { useStructuredData } from "@/hooks/useStructuredData";
import { serviceSchemaData } from "@/lib/structuredData";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";

// SEO landing page: /web-design-limassol
// Target keywords: "web design Λεμεσός", "website design Λεμεσός"
// Design: matches DM-Labs.io site style - light bg, brand gradient accents, clean typography



const baseFaqs = [
  {
    q: "Πόσο κοστίζει η κατασκευή ιστοσελίδας στη Λεμεσό;",
    a: BUILD_PRICE_SUMMARY.el,
  },
  {
    q: "Πόσος χρόνος χρειάζεται για την κατασκευή μιας ιστοσελίδας;",
    a: "Συμφωνούμε το χρονοδιάγραμμα πριν ξεκινήσουμε, με βάση το εύρος και τα απαραίτητα υλικά. Σας ενημερώνουμε σε κάθε στάδιο. Αλλαγές στο έργο, στο περιεχόμενο ή στα σχόλια μπορεί να επηρεάσουν το πρόγραμμα· συμφωνούμε μαζί σας κάθε αναθεώρηση.",
  },
  {
    q: "Συνεργάζεστε με επιχειρήσεις στη Λεμεσό εξ αποστάσεως;",
    a: "Ναι, φυσικά. Συνεργαζόμαστε με επιχειρήσεις διεθνώς, αποκλειστικά online. Η διαδικασία μας βασίζεται στη σαφή επικοινωνία μέσω WhatsApp, email και βιντεοκλήσεων - επομένως η τοποθεσία δεν αποτελεί ποτέ εμπόδιο. Πολλοί από τους πελάτες μας στη Λεμεσό δεν χρειάστηκαν ποτέ συνάντηση πρόσωπο με πρόσωπο.",
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
  useStructuredData("location-jsonld-schema", serviceSchemaData("https://dm-labs.io/el/web-design-limassol/", "el", "Web Design Λεμεσός", "Επαγγελματικό πρακτορείο σχεδιασμού ιστοσελίδων που εξυπηρετεί επιχειρήσεις στη Λεμεσό. Προσαρμοσμένες ιστοσελίδες με έμφαση στην εμπιστοσύνη και την επικοινωνία.", faqs));

  return (
    <main className="bg-white">
      {/* ── HERO ── */}
      <section className="section-spacing bg-gradient-to-br from-[#EEF3FF] via-white to-[#F0EAFF]">
        <div className="container max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#5B8CFF] mb-4">
            Εξυπηρετώντας τη Λεμεσό,
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111315] leading-tight mb-6">
            Κατασκευή Ιστοσελίδας Λεμεσός<br />
            <span className="bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] bg-clip-text text-transparent">
              Επαγγελματικές Ιστοσελίδες για Τοπικές Επιχειρήσεις
            </span>
          </h1>
          <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-8 leading-relaxed">
            Η DM-Labs.io είναι ένα εξειδικευμένο πρακτορείο web design που βοηθά τις επιχειρήσεις της Λεμεσού να αποκτήσουν μια ισχυρή online παρουσία. Δημιουργούμε γρήγορες, mobile-first και conversion-focused ιστοσελίδες ώστε η επιχείρησή σας να ξεχωρίζει σε μια από τις πιο ανταγωνιστικές αγορές της περιοχής.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/el/contact/">
              <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                Λάβετε Δωρεάν Προσφορά
              </button>
            </Link>
            <Link href="/el/pricing/">
              <button className="px-8 py-3.5 rounded-xl border border-[#5B8CFF] text-[#5B8CFF] font-semibold text-base hover:bg-[#EEF3FF] transition-colors">
                Δείτε τις Τιμές
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY LIMASSOL NEEDS A WEBSITE ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-6">
            Γιατί οι Επιχειρήσεις της Λεμεσού Χρειάζονται Επαγγελματική Ιστοσελίδα
          </h2>
          <p className="text-[#5B6472] leading-relaxed mb-5">
            Η Λεμεσός είναι η επιχειρηματική και οικονομική πρωτεύουσα της περιοχής - έδρα διεθνών δικηγορικών γραφείων, ναυτιλιακών εταιρειών, fintech startups και ενός ακμάζοντος τομέα φιλοξενίας. Διαθέτει επίσης μια από τις μεγαλύτερες κοινότητες ομογενών στην Ανατολική Μεσόγειο, με κατοίκους και επισκέπτες από τη Ρωσία, το Ηνωμένο Βασίλειο και όλη την Ευρώπη να αναζητούν ενεργά online για τοπικές υπηρεσίες.
          </p>
          <p className="text-[#5B6472] leading-relaxed mb-5">
            Σε αυτό το περιβάλλον, μια επαγγελματική ιστοσελίδα δεν είναι προαιρετική - είναι η πρώτη σας εντύπωση. Όταν ένας πιθανός πελάτης αναζητά "λογιστής στη Λεμεσό" ή "εστιατόριο κοντά στην παραλία", η ιστοσελίδα σας είτε εργάζεται για εσάς είτε παραδίδει αυτόν τον πελάτη σε έναν ανταγωνιστή. Μια καλοφτιαγμένη ιστοσελίδα με σωστό SEO, γρήγορους χρόνους φόρτωσης και σαφή πρόσκληση για δράση (call to action) μετατρέπει τους επισκέπτες σε πελάτες όλο το εικοσιτετράωρο.
          </p>
          <p className="text-[#5B6472] leading-relaxed">
            Η αγορά της Λεμεσού είναι ανταγωνιστική και ολοένα και πιο ψηφιακή. Οι επιχειρήσεις που επενδύουν σε μια ποιοτική online παρουσία τώρα - πριν από τους ανταγωνιστές τους - κατακτούν την πιο πολύτιμη επισκεψιμότητα από τις μηχανές αναζήτησης και χτίζουν διαρκή αξιοπιστία τόσο με τους τοπικούς όσο και με τους διεθνείς πελάτες.
          </p>
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-3">
            Τι Κατασκευάζουμε για τις Επιχειρήσεις της Λεμεσού
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
                title: "Προσαρμοσμένος Σχεδιασμός",
                desc: "Κανένα έτοιμο πρότυπο. Κάθε ιστοσελίδα σχεδιάζεται από μηδενική βάση για να ταιριάζει με τη μάρκα σας, το κοινό σας και τους στόχους σας.",
              },
              {
                title: "Σχεδιασμός Mobile-First",
                desc: "Η εμπειρία στο κινητό έχει σημασία. Κάθε ιστοσελίδα που κατασκευάζουμε φαίνεται και λειτουργεί τέλεια σε οποιαδήποτε οθόνη.",
              },
              {
                title: "Έτοιμο για SEO",
                desc: "Καθαρός κώδικας, γρήγοροι χρόνοι φόρτωσης, σωστά meta tags και δομημένα δεδομένα (structured data) - όλα όσα χρειάζεται η Google για να κατατάξει την ιστοσελίδα σας.",
              },
              {
                title: "Γρήγορη Παράδοση",
                desc: "Οι περισσότερες ιστοσελίδες παραδίδονται εντός 7 έως 14 ημερών. Κινούμαστε γρήγορα χωρίς εκπτώσεις στην ποιότητα.",
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
            Διαφανείς Τιμές για τις Επιχειρήσεις της Λεμεσού
          </h2>
          <p className="text-[#5B6472] mb-10">
            Χωρίς κρυφές χρεώσεις. Χωρίς ωριαία χρέωση. Μία σταθερή τιμή, όλα περιλαμβάνονται.{" "}
            <Link href="/el/pricing/" className="text-[#5B8CFF] font-medium underline underline-offset-2 hover:text-[#8B5CFF]">
              Δείτε την πλήρη ανάλυση τιμών
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
                    Πιο Δημοφιλές
                  </span>
                )}
                <div className="text-3xl font-extrabold text-[#111315] mb-1">{p.price}</div>
                <div className="font-semibold text-[#111315] mb-3">{p.name}</div>
                <p className="text-[#5B6472] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#9CA3AF] mt-4">
            * Αυτές είναι εισαγωγικές τιμές για περιορισμένο χρονικό διάστημα.
          </p>
        </div>
      </section>

      {/* ── GOOGLE MAPS ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-3">
            Εξ αποστάσεως συνεργασία, Εξυπηρετούμε τη Λεμεσό
          </h2>
          <p className="text-[#5B6472] mb-8">
            Εξυπηρετούμε επιχειρήσεις σε όλη τη Λεμεσό - από την παλιά πόλη και την παραλία μέχρι την επιχειρηματική περιοχή και τα προάστια όπως ο Άγιος Αθανάσιος, τα Πολεμίδια και η Γερμασόγεια.
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
            Είστε έτοιμοι να αποκτήσετε online παρουσία για την επιχείρησή σας στη Λεμεσό;
          </h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            Πείτε μας για την επιχείρησή σας και θα σας στείλουμε δωρεάν πρόταση αφού κατανοήσουμε τις ανάγκες σας. Χωρίς δέσμευση.
          </p>
          <Link href="/el/contact/">
            <button className="px-10 py-4 rounded-xl bg-white text-[#5B8CFF] font-bold text-base hover:bg-blue-50 transition-colors shadow-lg">
              Επικοινωνήστε μαζί μας σήμερα
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
