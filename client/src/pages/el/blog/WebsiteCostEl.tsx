import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useHreflang } from "@/hooks/useHreflang";

// Greek blog: website cost Cyprus — /el/blog/posso-kostizei-istoselidha-kypros
// Primary keyword: "πόσο κοστίζει ιστοσελίδα Κύπρος"

export default function WebsiteCostEl() {
  useSEO({
    title: "Πόσο Κοστίζει μια Ιστοσελίδα στην Κύπρο; (Ειλικρινής Οδηγός 2026) | D&M Labs",
    description: "Η αλήθεια για τις τιμές κατασκευής ιστοσελίδας στην Κύπρο το 2026. Τι περιλαμβάνεται, τι δεν περιλαμβάνεται και πώς να επιλέξετε σωστά.",
    canonicalPath: "/el/blog/posso-kostizei-istoselidha-kypros"
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
            <span className="text-xs text-[#9CA3AF]">Ιανουάριος 2026</span>
            <span className="text-xs text-[#9CA3AF]">-</span>
            <span className="text-xs text-[#9CA3AF]">6 λεπτά ανάγνωση</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111315] leading-tight mb-4">
            Πόσο Κοστίζει μια Ιστοσελίδα στην Κύπρο; (Ειλικρινής Οδηγός 2026)
          </h1>
          <p className="text-lg text-[#5B6472] leading-relaxed">
            Αν ψάχνετε για τιμές κατασκευής ιστοσελίδας στην Κύπρο, θα βρείτε τα πάντα: από €99 μέχρι €5.000+. Εδώ είναι η αλήθεια για το τι πραγματικά κοστίζει και τι παίρνετε για τα χρήματά σας.
          </p>
        </header>

        <div className="prose prose-slate max-w-none space-y-8 text-[#374151]">

          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Γιατί οι Τιμές Ποικίλλουν Τόσο Πολύ</h2>
            <p className="leading-relaxed mb-4">
              Στην Κύπρο, μπορείτε να βρείτε ιστοσελίδες από €99 (συνήθως από freelancers χωρίς εμπειρία ή από πλατφόρμες όπως Fiverr) μέχρι €5.000+ από μεγάλες εταιρείες web design. Η διαφορά δεν είναι τυχαία.
            </p>
            <p className="leading-relaxed">
              Αυτό που πληρώνετε είναι: εμπειρία, ποιότητα σχεδιασμού, SEO δομή, ταχύτητα, υποστήριξη μετά το launch και - το πιο σημαντικό - τον χρόνο που αφιερώνει κάποιος για να καταλάβει την επιχείρησή σας.
            </p>
          </section>

          <div className="rounded-2xl overflow-hidden my-8">
            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80"
              alt="Τιμές κατασκευής ιστοσελίδας Κύπρος - οδηγός pricing 2026"
              className="w-full object-cover"
              style={{ maxHeight: "320px" }}
              loading="lazy"
            />
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Τι Κοστίζει τι στην Κύπρο</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-[#E8EAF0]">
                <h3 className="font-bold text-[#111315] mb-2">€99 - €200: Προσοχή</h3>
                <p className="text-[#5B6472] text-sm leading-relaxed">Συνήθως template χωρίς προσαρμογή, χωρίς SEO, χωρίς υποστήριξη. Μπορεί να φαίνεται καλό στην αρχή, αλλά δεν θα σας βρει η Google και δεν θα αντέξει στον χρόνο.</p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-[#E8EAF0]">
                <h3 className="font-bold text-[#111315] mb-2">€299 - €699: Το γλυκό σημείο για μικρές επιχειρήσεις</h3>
                <p className="text-[#5B6472] text-sm leading-relaxed">Επαγγελματική ιστοσελίδα με custom σχεδιασμό, σωστή SEO δομή, mobile-first ανάπτυξη και υποστήριξη. Αυτή είναι η κατηγορία που εξυπηρετούμε εμείς.</p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-[#E8EAF0]">
                <h3 className="font-bold text-[#111315] mb-2">€1.000 - €5.000+: Για μεγαλύτερες ανάγκες</h3>
                <p className="text-[#5B6472] text-sm leading-relaxed">Πολύπλοκα projects, custom λειτουργικότητα, μεγάλες εταιρείες. Αν είστε μικρή επιχείρηση, δεν χρειάζεστε αυτό το budget.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Τι Περιλαμβάνεται στις Τιμές μας</h2>
            <p className="leading-relaxed mb-4">
              Στη D&M Labs, οι τιμές μας ξεκινούν από €299 και περιλαμβάνουν:
            </p>
            <ul className="space-y-2 pl-4">
              <li className="leading-relaxed">Custom σχεδιασμό βάσει της επιχείρησής σας - όχι template</li>
              <li className="leading-relaxed">Mobile-responsive ανάπτυξη (δουλεύει σε κινητά, tablet, desktop)</li>
              <li className="leading-relaxed">Σωστή SEO δομή για να σας βρει η Google</li>
              <li className="leading-relaxed">Γρήγορους χρόνους φόρτωσης</li>
              <li className="leading-relaxed">Αναθεωρήσεις μέχρι να είστε ικανοποιημένοι</li>
              <li className="leading-relaxed">Υποστήριξη μετά το launch</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Τι Δεν Περιλαμβάνεται (και Γιατί)</h2>
            <p className="leading-relaxed mb-4">
              Δύο πράγματα που δεν περιλαμβάνονται στην τιμή κατασκευής:
            </p>
            <p className="leading-relaxed mb-4">
              <strong>Domain (όνομα ιστοσελίδας):</strong> Το domain (π.χ. myshop.com.cy) κοστίζει €10-20 ετησίως και πρέπει να είναι δικό σας - όχι του web designer. Σας καθοδηγούμε για το πώς να το αποκτήσετε.
            </p>
            <p className="leading-relaxed">
              <strong>Hosting:</strong> Ο server που "φιλοξενεί" την ιστοσελίδα σας κοστίζει €5-15 ευρώ τον μήνα. Και πάλι, θέλουμε εσείς να είστε ιδιοκτήτες - σας βοηθάμε να επιλέξετε και να ρυθμίσετε το hosting.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Η Πιο Σημαντική Ερώτηση: Τι Αξίζει για σας;</h2>
            <p className="leading-relaxed mb-4">
              Αντί να ρωτάτε "πόσο κοστίζει μια ιστοσελίδα", ρωτήστε: "αν η ιστοσελίδα μου φέρει έναν επιπλέον πελάτη τον μήνα, πόσο αξίζει αυτό;"
            </p>
            <p className="leading-relaxed">
              Για ένα εστιατόριο στη Λεμεσό, ένας επιπλέον πελάτης τον μήνα αξίζει εύκολα €50-100. Για ένα nail salon, μια επιπλέον κράτηση την εβδομάδα αξίζει €200+ τον μήνα. Μια ιστοσελίδα €299 αποσβένεται σε λίγες εβδομάδες.
            </p>
          </section>

          <div className="bg-gradient-to-br from-[#EEF3FF] to-[#F0EAFF] rounded-2xl p-8 border border-[#D0DEFF] mt-10">
            <h3 className="text-xl font-bold text-[#111315] mb-3">Δείτε τις Αναλυτικές Τιμές μας</h3>
            <p className="text-[#5B6472] mb-6 leading-relaxed">
              Starter από €299, Business €399, Premium €699. Εφάπαξ τιμές, χωρίς μηνιαίες χρεώσεις.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/el/pricing">
                <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                  Δείτε τον Τιμοκατάλογο
                </button>
              </Link>
              <Link href="/el/contact">
                <button className="px-8 py-3.5 rounded-xl border border-[#5B8CFF] text-[#5B8CFF] font-semibold text-base hover:bg-[#EEF3FF] transition-colors">
                  Ζητήστε Πρόταση
                </button>
              </Link>
            </div>
          </div>

        </div>
      </article>
    </main>
  );
}
