import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useHreflang } from "@/hooks/useHreflang";

export default function GoogleVisibilityEl() {
  useSEO({
    title: "Πώς να Βρεθεί η Επιχείρησή σας στη Google στην Κύπρο | DM-Labs.io",
    description: "Απλός οδηγός για να εμφανίζεται η επιχείρησή σας στη Google στην Κύπρο. Χωρίς τεχνικές ορολογίες.",
    canonicalPath: "/el/blog/pos-na-vretheite-google-kypros"
  });
  useHreflang();

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">
      <article className="container max-w-3xl mx-auto py-16 px-4">
        <div className="mb-8">
          <Link href="/el/blog" className="text-[#5B8CFF] text-sm font-medium hover:underline">← Πίσω στο Άρθρα</Link>
        </div>
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-[#9CA3AF]">Μάρτιος 2026</span>
            <span className="text-xs text-[#9CA3AF]">-</span>
            <span className="text-xs text-[#9CA3AF]">6 λεπτά ανάγνωση</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111315] leading-tight mb-4">
            Πώς να Βρεθεί η Επιχείρησή σας στη Google στην Κύπρο: Ένας Απλός Οδηγός
          </h1>
          <p className="text-lg text-[#5B6472] leading-relaxed">
            Χωρίς τεχνικές ορολογίες - τι πρέπει να κάνετε για να εμφανίζεστε στη Google όταν κάποιος ψάχνει για αυτό που προσφέρετε στην Κύπρο.
          </p>
        </header>
        <div className="space-y-8 text-[#374151]">
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Γιατί Είναι Σημαντικό να Βρίσκεστε στη Google</h2>
            <p className="leading-relaxed mb-4">
              Κάθε μέρα, χιλιάδες άνθρωποι στην Κύπρο ψάχνουν στη Google για επιχειρήσεις όπως η δική σας. "Κομμωτήριο Λεμεσός", "λογιστής Λευκωσία", "εστιατόριο Πάφος". Αν δεν εμφανίζεστε στα αποτελέσματα, αυτοί οι άνθρωποι πηγαίνουν στον ανταγωνισμό σας.
            </p>
          </section>
          <div className="rounded-2xl overflow-hidden my-8">
            <img
              src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80"
              alt="Εμφάνιση επιχείρησης στη Google Κύπρος - SEO για μικρές επιχειρήσεις"
              className="w-full object-cover"
              style={{ maxHeight: "320px" }}
              loading="lazy"
            />
          </div>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Βήμα 1: Google Business Profile</h2>
            <p className="leading-relaxed mb-4">
              Το πρώτο και πιο σημαντικό βήμα είναι να δημιουργήσετε ή να διεκδικήσετε το Google Business Profile σας. Αυτό είναι δωρεάν και σας εμφανίζει στους χάρτες και στα τοπικά αποτελέσματα.
            </p>
            <p className="leading-relaxed">
              Βεβαιωθείτε ότι έχετε: σωστή διεύθυνση, τηλέφωνο, ωράριο, φωτογραφίες και κατηγορία επιχείρησης. Και ζητήστε από ικανοποιημένους πελάτες να αφήσουν reviews.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Βήμα 2: Επαγγελματική Ιστοσελίδα με Σωστή SEO Δομή</h2>
            <p className="leading-relaxed mb-4">
              Το Google Business Profile σας βοηθά στις τοπικές αναζητήσεις, αλλά για να εμφανίζεστε σε ευρύτερες αναζητήσεις χρειάζεστε ιστοσελίδα.
            </p>
            <p className="leading-relaxed">
              Μια σωστά κατασκευασμένη ιστοσελίδα έχει: σωστούς τίτλους σελίδων, περιγραφές, δομή κειμένου (H1, H2, H3), γρήγορους χρόνους φόρτωσης και mobile-friendly σχεδιασμό. Όλα αυτά βοηθούν τη Google να καταλάβει τι κάνετε και να σας εμφανίζει στα σωστά αποτελέσματα.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Βήμα 3: Περιεχόμενο που Απαντά σε Ερωτήσεις</h2>
            <p className="leading-relaxed">
              Η Google αγαπά ιστοσελίδες που απαντούν σε ερωτήσεις που κάνουν οι χρήστες. Αν έχετε εστιατόριο, γράψτε για το μενού σας, τις ειδικότητές σας, την ιστορία σας. Αν είστε λογιστής, γράψτε για τις υπηρεσίες σας, τις τιμές σας, τις συχνές ερωτήσεις. Αυτό είναι το SEO - και δεν χρειάζεται να είναι περίπλοκο.
            </p>
          </section>
          <div className="bg-gradient-to-br from-[#EEF3FF] to-[#F0EAFF] rounded-2xl p-8 border border-[#D0DEFF] mt-10">
            <h3 className="text-xl font-bold text-[#111315] mb-3">Θέλετε να σας Βρίσκει η Google;</h3>
            <p className="text-[#5B6472] mb-6">Κατασκευάζουμε ιστοσελίδες με σωστή SEO δομή από την αρχή. Δεν χρειάζεστε να ξέρετε τίποτα τεχνικό.</p>
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
