import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useHreflang } from "@/hooks/useHreflang";

export default function YogaEl() {
  useSEO({
    title: "Ιστοσελίδα για Yoga και Pilates Studio στην Κύπρο | D&M Labs",
    description: "Γιατί το yoga ή pilates studio σας στην Κύπρο χρειάζεται ιστοσελίδα και όχι μόνο Instagram. Πρακτικός οδηγός.",
    canonicalPath: "/el/blog/istoselidha-yoga-pilates-studio-kypros"
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
            <span className="text-xs text-[#9CA3AF]">Μάρτιος 2026</span>
            <span className="text-xs text-[#9CA3AF]">-</span>
            <span className="text-xs text-[#9CA3AF]">5 λεπτά ανάγνωση</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111315] leading-tight mb-4">
            Γιατί το Yoga ή Pilates Studio σας στην Κύπρο Χρειάζεται Ιστοσελίδα (Όχι Μόνο Instagram)
          </h1>
          <p className="text-lg text-[#5B6472] leading-relaxed">
            Το Instagram σας γεμίζει likes αλλά όχι μαθητές; Δείτε πώς μια επαγγελματική ιστοσελίδα αλλάζει τα πράγματα για yoga studios, pilates studios και personal trainers στην Κύπρο.
          </p>
        </header>
        <div className="space-y-8 text-[#374151]">
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Το Πρόβλημα με το Instagram Μόνο</h2>
            <p className="leading-relaxed mb-4">
              Το Instagram είναι εξαιρετικό για να χτίζετε κοινότητα και να δείχνετε τη φιλοσοφία σας. Αλλά όταν κάποιος ψάχνει "yoga Λεμεσός" ή "pilates Λευκωσία" στη Google, το Instagram δεν εμφανίζεται στα πρώτα αποτελέσματα.
            </p>
            <p className="leading-relaxed">
              Επίσης, το Instagram δεν σας ανήκει. Αν αλλάξει ο αλγόριθμος ή κλείσει ο λογαριασμός σας, χάνετε τα πάντα. Μια ιστοσελίδα είναι δική σας - για πάντα.
            </p>
          </section>
          <div className="rounded-2xl overflow-hidden my-8">
            <img
              src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80"
              alt="Yoga studio ιστοσελίδα Κύπρος - επαγγελματική online παρουσία για fitness"
              className="w-full object-cover"
              style={{ maxHeight: "320px" }}
              loading="lazy"
            />
          </div>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Τι Χρειάζεται η Ιστοσελίδα ενός Studio</h2>
            <div className="space-y-4">
              {[
                { title: "Πρόγραμμα μαθημάτων", desc: "Ποιες μέρες, ποιες ώρες, τι είδους μαθήματα. Αυτό είναι το πρώτο πράγμα που ψάχνει ένας νέος μαθητής." },
                { title: "Φιλοσοφία και προσέγγιση", desc: "Τι σας κάνει διαφορετικούς; Ποια είναι η φιλοσοφία σας; Αυτό χτίζει εμπιστοσύνη πριν ο μαθητής έρθει στο πρώτο μάθημα." },
                { title: "Τιμές και πακέτα", desc: "Ξεκάθαρες τιμές για μεμονωμένα μαθήματα, μηνιαία πακέτα, ιδιαίτερα. Χωρίς κρυμμένες χρεώσεις." },
                { title: "Κράτηση ή επικοινωνία", desc: "Κουμπί WhatsApp ή φόρμα κράτησης - κάντε εύκολο για τον μαθητή να ξεκινήσει." },
                { title: "Φωτογραφίες του χώρου", desc: "Ο χώρος σας είναι μέρος της εμπειρίας. Δείξτε τον - φωτεινός, καθαρός, φιλόξενος." }
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-5 border border-[#E8EAF0]">
                  <h3 className="font-bold text-[#111315] mb-1">{item.title}</h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Και για Personal Trainers;</h2>
            <p className="leading-relaxed">
              Αν είστε personal trainer, η ιστοσελίδα σας είναι το "βιογραφικό" σας. Δείχνει την εμπειρία σας, τις πιστοποιήσεις σας, τα αποτελέσματα πελατών σας. Ένας personal trainer με επαγγελματική ιστοσελίδα εμπνέει πολύ περισσότερη εμπιστοσύνη από έναν που έχει μόνο Instagram.
            </p>
          </section>
          <div className="bg-gradient-to-br from-[#EEF3FF] to-[#F0EAFF] rounded-2xl p-8 border border-[#D0DEFF] mt-10">
            <h3 className="text-xl font-bold text-[#111315] mb-3">Ξεκινήστε από €299</h3>
            <p className="text-[#5B6472] mb-6">Ιστοσελίδα για yoga studio, pilates studio ή personal trainer. Παράδοση σε 5-10 ημέρες.</p>
            <Link href="/el/contact">
              <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                Ζητήστε Δωρεάν Πρόταση
              </button>
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
