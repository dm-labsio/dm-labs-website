import { Price } from "@/contexts/CurrencyContext";
import "@/components/blog/BlogArticle.css";
import { Link } from "wouter";
import { useGreekArticleSEO } from "@/hooks/useGreekArticleSEO";

export default function NailSalonEl() {
  const article = useGreekArticleSEO("istoselidha-nail-salon-beauty-studio-kypros", {
    title: "Ιστοσελίδα για nail salon και beauty studio | DM-Labs.io",
    description: "Τι πρέπει να έχει η ιστοσελίδα ενός nail salon ή beauty studio για να γεμίζει το πρόγραμμα με ραντεβού. Πρακτικός οδηγός.",
    headline: "Ιστοσελίδα για nail salon και beauty studio: τι χρειάζεστε πραγματικά",
    ogImage: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
    ogImageAlt: "Ιστοσελίδα για nail salon και στούντιο ομορφιάς",
  });

  return (
    <main className="blog-article-page bg-[#F6F6F4] min-w-0 overflow-x-hidden">
      <article className="container max-w-3xl mx-auto py-16 px-4">
        <div className="mb-8">
          <Link href="/el/blog/" className="text-[#5B8CFF] text-sm font-medium hover:underline">Πίσω στα άρθρα</Link>
        </div>
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <time className="text-xs text-[#9CA3AF]" dateTime={article.date}>{new Date(`${article.date}T12:00:00Z`).toLocaleDateString("el-GR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time>
            <span className="text-xs text-[#9CA3AF]">·</span>
            <span className="text-xs text-[#9CA3AF]">{article.readTime} ανάγνωση</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111315] leading-tight mb-4">
            Ιστοσελίδα για nail salon και beauty studio: τι χρειάζεστε πραγματικά
          </h1>
          <p className="text-lg text-[#5B6472] leading-relaxed">
            Έχετε nail salon ή beauty studio; Δείτε τι χρειάζεται η ιστοσελίδα σας για να κλείνετε περισσότερα ραντεβού και να σας βρίσκουν στο Google.
          </p>
          <p className="text-sm text-[#5B6472] mt-4">Από την ομάδα της DM-Labs.io</p>
        </header>
        <div className="space-y-8 text-[#374151]">
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Γιατί το Instagram δεν αρκεί</h2>
            <p className="leading-relaxed mb-4">
              Το Instagram είναι ιδανικό για να δείχνετε τη δουλειά σας. Όταν όμως κάποιος ψάχνει στο Google «nail salon Λεμεσός» ή «beauty studio Λευκωσία», βλέπει πρώτα τον χάρτη με τις επιχειρήσεις της περιοχής και ιστοσελίδες. Ένα προφίλ στο Instagram σπάνια εμφανίζεται εκεί.
            </p>
            <p className="leading-relaxed">
              Χωρίς ιστοσελίδα, χάνετε κάθε μέρα πελάτες που ψάχνουν ακριβώς αυτό που κάνετε.
            </p>
          </section>
          <div className="rounded-2xl overflow-hidden my-8">
            <img
              src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80"
              alt="Ιστοσελίδα για nail salon και στούντιο ομορφιάς"
              className="w-full object-cover"
              style={{ maxHeight: "320px" }}
              loading="lazy"
            />
          </div>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Τι πρέπει να έχει η ιστοσελίδα σας</h2>
            <div className="space-y-4">
              {[
                { title: "Γκαλερί με τη δουλειά σας", desc: "Φωτογραφίες από nail art, βαφές και περιποιήσεις. Είναι το πρώτο πράγμα που κοιτάζει ένας νέος πελάτης." },
                { title: "Υπηρεσίες και τιμές", desc: "Μια ξεκάθαρη λίστα με το τι κάνετε και πόσο κοστίζει. Ο κόσμος δεν θέλει να τηλεφωνεί για να μάθει τιμές." },
                { title: "Κράτηση ή κουμπί WhatsApp", desc: "Κάντε το εύκολο: ένα κουμπί WhatsApp ή ένα σύστημα κρατήσεων, για να κλείνει ο πελάτης ραντεβού με ένα πάτημα." },
                { title: "Ωράριο και τοποθεσία", desc: "Πότε είστε ανοιχτά, πού βρίσκεστε και πώς θα έρθουν. Βασικά πράγματα, που όμως λείπουν από πολλές ιστοσελίδες." },
                { title: "Κριτικές πελατών", desc: "Οι κριτικές στο Google δείχνουν ότι είστε αξιόπιστοι και μετράνε στα τοπικά αποτελέσματα. Βάλτε μερικές και στην ιστοσελίδα σας." }
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-5 border border-[#E8EAF0]">
                  <h3 className="font-bold text-[#111315] mb-1">{item.title}</h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Πόσο κοστίζει;</h2>
            <p className="leading-relaxed">
              Μια ιστοσελίδα για nail salon ή beauty studio ξεκινά από <Price euros={299} locale="el" /> με το Launch, που είναι μία σελίδα ή δύο απλές σελίδες. Με <Price euros={749} locale="el" />, το Growth έχει έως 4 σελίδες, φόρμα επικοινωνίας, χάρτη και κριτικές πελατών. Αν θέλετε ξεχωριστή γκαλερί, αυτή περιλαμβάνεται στο Pro, και ένα σύστημα κρατήσεων γίνεται ως έργο Enterprise / Custom. Η φιλοξενία και η συντήρηση ξεκινούν από <Price euros={69} locale="el" /> τον μήνα, και το χρονοδιάγραμμα το συμφωνούμε πριν ξεκινήσουμε.
            </p>
          </section>
          <div className="bg-gradient-to-br from-[#EEF3FF] to-[#F0EAFF] rounded-2xl p-8 border border-[#D0DEFF] mt-10">
            <h3 className="text-xl font-bold text-[#111315] mb-3">Ζητήστε δωρεάν προσφορά</h3>
            <p className="text-[#5B6472] mb-6">Πείτε μας δυο λόγια για το studio σας, και μόλις καταλάβουμε τι χρειάζεστε, σας στέλνουμε πρόταση.</p>
            <Link href="/el/contact/">
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
