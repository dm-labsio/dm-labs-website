import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useHreflang } from "@/hooks/useHreflang";

// Greek Process page — /el/process
// Primary keyword: "πώς κατασκευάζεται ιστοσελίδα" / "διαδικασία κατασκευής ιστοσελίδας"

export default function ProcessEl() {
  useSEO({
    title: "Πώς Κατασκευάζουμε την Ιστοσελίδα σας | D&M Labs",
    description: "Η διαδικασία κατασκευής ιστοσελίδας στη D&M Labs - απλή, διαφανής και χωρίς τεχνικές ορολογίες. Από τη συζήτηση μέχρι το launch σε 5-14 ημέρες.",
    canonicalPath: "/el/process"
  });
  useHreflang();

  const steps = [
    {
      num: "01",
      title: "Συζήτηση και Κατανόηση",
      desc: "Ξεκινάμε με μια ελεύθερη συζήτηση για την επιχείρησή σας. Τι κάνετε, ποιοι είναι οι πελάτες σας, τι θέλετε να πετύχετε με την ιστοσελίδα. Δεν χρειάζεστε τεχνικές γνώσεις - εσείς ξέρετε την επιχείρησή σας, εμείς ξέρουμε τις ιστοσελίδες."
    },
    {
      num: "02",
      title: "Πρόταση και Σχεδιασμός",
      desc: "Σας στέλνουμε μια πρόταση με το πακέτο που ταιριάζει στις ανάγκες σας και ξεκινάμε τον σχεδιασμό. Σας δείχνουμε πώς θα μοιάζει η ιστοσελίδα πριν γράψουμε κώδικα, ώστε να εγκρίνετε την κατεύθυνση."
    },
    {
      num: "03",
      title: "Ανάπτυξη",
      desc: "Αναπτύσσουμε την ιστοσελίδα βάσει του εγκεκριμένου σχεδιασμού. Σας κρατάμε ενήμερους σε κάθε βήμα. Δεν εξαφανιζόμαστε για εβδομάδες - υπάρχει πάντα κάποιος να απαντήσει στις ερωτήσεις σας."
    },
    {
      num: "04",
      title: "Αναθεωρήσεις",
      desc: "Σας δείχνουμε την ολοκληρωμένη ιστοσελίδα και ακούμε τα σχόλιά σας. Κάνουμε τις αλλαγές που χρειάζονται μέχρι να είστε απολύτως ικανοποιημένοι. Κάθε πακέτο περιλαμβάνει συγκεκριμένο αριθμό αναθεωρήσεων."
    },
    {
      num: "05",
      title: "Launch",
      desc: "Μόλις εγκρίνετε την ιστοσελίδα, σας καθοδηγούμε για το πώς να αποκτήσετε domain και hosting, και κάνουμε τη δημοσίευση. Η ιστοσελίδα σας είναι online και έτοιμη να δέχεται επισκέπτες."
    },
    {
      num: "06",
      title: "Υποστήριξη μετά το Launch",
      desc: "Δεν εξαφανιζόμαστε μετά το launch. Είμαστε εδώ για ενημερώσεις, αλλαγές και ερωτήσεις. Η επιχείρησή σας αλλάζει - η ιστοσελίδα σας πρέπει να αλλάζει μαζί της."
    }
  ];

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#F0EAFF]">
        <div className="container max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">Η Διαδικασία μας</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111315] mb-4 leading-tight">
            Πώς Κατασκευάζουμε{" "}
            <span className="bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] bg-clip-text text-transparent">
              την Ιστοσελίδα σας
            </span>
          </h1>
          <p className="text-lg text-[#5B6472] mb-3 leading-relaxed">
            Μια απλή, διαφανής διαδικασία χωρίς τεχνικές ορολογίες. Εσείς φέρτε την επιχείρησή σας - εμείς αναλαμβάνουμε τα υπόλοιπα.
          </p>
          <p className="text-sm text-[#9CA3AF] italic">
            Η υπηρεσία παρέχεται στα αγγλικά. Επικοινωνούμε μαζί σας στα ελληνικά.
          </p>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section className="section-spacing">
        <div className="container max-w-3xl mx-auto">
          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="flex gap-6 items-start">
                <div className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#5B8CFF] to-[#8B5CFF] flex items-center justify-center text-white font-extrabold text-sm">
                  {step.num}
                </div>
                <div className="flex-1 bg-white rounded-2xl p-6 border border-[#E8EAF0] shadow-sm">
                  <h2 className="font-bold text-[#111315] text-lg mb-2">{step.title}</h2>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-spacing bg-gradient-to-br from-[#5B8CFF] to-[#8B5CFF]">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Έτοιμοι να ξεκινήσετε;</h2>
          <p className="text-blue-100 text-lg mb-8">
            Επικοινωνήστε μαζί μας για μια δωρεάν συμβουλευτική. Δεν χρειάζεστε να ξέρετε τι θέλετε - θα το βρούμε μαζί.
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
