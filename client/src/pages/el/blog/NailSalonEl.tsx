import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useHreflang } from "@/hooks/useHreflang";

export default function NailSalonEl() {
  useSEO({
    title: "Ιστοσελίδα για Nail Salon και Beauty Studio στην Κύπρο | D&M Labs",
    description: "Τι χρειάζεται η ιστοσελίδα ενός nail salon ή beauty studio στην Κύπρο για να φέρνει νέους πελάτες. Πρακτικός οδηγός.",
    canonicalPath: "/el/blog/istoselidha-nail-salon-beauty-studio-kypros"
  });
  useHreflang();

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">
      <article className="container max-w-3xl mx-auto py-16 px-4">
        <div className="mb-8">
          <Link href="/el/blog" className="text-[#5B8CFF] text-sm font-medium hover:underline">← Πίσω στο Blog</Link>
        </div>
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-[#9CA3AF]">Φεβρουάριος 2026</span>
            <span className="text-xs text-[#9CA3AF]">-</span>
            <span className="text-xs text-[#9CA3AF]">5 λεπτά ανάγνωση</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111315] leading-tight mb-4">
            Ιστοσελίδα για Nail Salon και Beauty Studio στην Κύπρο: Τι Χρειάζεστε Πραγματικά
          </h1>
          <p className="text-lg text-[#5B6472] leading-relaxed">
            Έχετε nail salon ή beauty studio στην Κύπρο; Δείτε τι πρέπει να έχει η ιστοσελίδα σας για να γεμίζει ραντεβού και να βρίσκεστε στη Google.
          </p>
        </header>
        <div className="space-y-8 text-[#374151]">
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Γιατί το Instagram Δεν Αρκεί</h2>
            <p className="leading-relaxed mb-4">
              Το Instagram είναι εξαιρετικό για να δείχνετε τη δουλειά σας. Αλλά όταν κάποιος ψάχνει "nail salon Λεμεσός" ή "beauty studio Λευκωσία" στη Google, το Instagram δεν εμφανίζεται στα πρώτα αποτελέσματα. Εμφανίζονται ιστοσελίδες.
            </p>
            <p className="leading-relaxed">
              Αν δεν έχετε ιστοσελίδα, χάνετε πελάτες που ψάχνουν ακριβώς αυτό που προσφέρετε - κάθε μέρα.
            </p>
          </section>
          <div className="rounded-2xl overflow-hidden my-8">
            <img
              src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80"
              alt="Nail salon beauty studio ιστοσελίδα Κύπρος - επαγγελματική online παρουσία"
              className="w-full object-cover"
              style={{ maxHeight: "320px" }}
              loading="lazy"
            />
          </div>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Τι Πρέπει να Έχει η Ιστοσελίδα σας</h2>
            <div className="space-y-4">
              {[
                { title: "Γκαλερί με τη δουλειά σας", desc: "Φωτογραφίες από τις υπηρεσίες σας - nail art, βαφές, περιποίηση. Αυτό είναι το πρώτο πράγμα που κοιτάει ένας νέος πελάτης." },
                { title: "Λίστα υπηρεσιών και τιμών", desc: "Ξεκάθαρη λίστα με τι προσφέρετε και πόσο κοστίζει. Οι πελάτες δεν θέλουν να τηλεφωνούν για να μάθουν τιμές." },
                { title: "Σύστημα κράτησης ή WhatsApp κουμπί", desc: "Κάντε εύκολο για τον πελάτη να κλείσει ραντεβού. Ένα απλό WhatsApp κουμπί μπορεί να διπλασιάσει τις κρατήσεις σας." },
                { title: "Ωράριο και τοποθεσία", desc: "Πότε είστε ανοιχτοί, πού βρίσκεστε, πώς να σας βρουν. Βασικές πληροφορίες που πολλές ιστοσελίδες παραλείπουν." },
                { title: "Reviews από πελάτες", desc: "Τα Google reviews σας στην ιστοσελίδα σας δείχνουν αξιοπιστία και βοηθούν στο SEO." }
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-5 border border-[#E8EAF0]">
                  <h3 className="font-bold text-[#111315] mb-1">{item.title}</h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Πόσο Κοστίζει;</h2>
            <p className="leading-relaxed">
              Μια επαγγελματική ιστοσελίδα για nail salon ή beauty studio στην Κύπρο κοστίζει από €299 (Starter - 1 σελίδα) μέχρι €399 (Business - έως 5 σελίδες με γκαλερί, κρατήσεις και reviews). Παράδοση σε 5-10 ημέρες.
            </p>
          </section>
          <div className="bg-gradient-to-br from-[#EEF3FF] to-[#F0EAFF] rounded-2xl p-8 border border-[#D0DEFF] mt-10">
            <h3 className="text-xl font-bold text-[#111315] mb-3">Ζητήστε Δωρεάν Πρόταση</h3>
            <p className="text-[#5B6472] mb-6">Πείτε μας για το studio σας και θα σας στείλουμε πρόταση μέσα σε 24 ώρες.</p>
            <Link href="/el/contact">
              <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                Επικοινωνήστε μαζί μας
              </button>
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
