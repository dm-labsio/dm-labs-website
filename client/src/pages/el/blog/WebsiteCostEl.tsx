import { Price } from "@/contexts/CurrencyContext";
import "@/components/blog/BlogArticle.css";
import { Link } from "wouter";
import { useGreekArticleSEO } from "@/hooks/useGreekArticleSEO";

// Greek blog: website cost — /el/blog/posso-kostizei-istoselidha-kypros
// Primary keyword: "πόσο κοστίζει μια ιστοσελίδα"

export default function WebsiteCostEl() {
  const article = useGreekArticleSEO("posso-kostizei-istoselidha-kypros", {
    title: "Πόσο κοστίζει μια ιστοσελίδα; Ειλικρινής οδηγός 2026 | DM-Labs.io",
    description: "Πόσο κοστίζει η κατασκευή ιστοσελίδας το 2026: τι παίρνετε σε κάθε εύρος τιμών, τι περιλαμβάνεται, τι όχι, και πώς να διαλέξετε σωστά.",
    headline: "Πόσο κοστίζει μια ιστοσελίδα; Ειλικρινής οδηγός για το 2026",
    ogImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    ogImageAlt: "Τιμές κατασκευής ιστοσελίδας",
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
            Πόσο κοστίζει μια ιστοσελίδα; Ειλικρινής οδηγός για το 2026
          </h1>
          <p className="text-lg text-[#5B6472] leading-relaxed">
            Αν ψάξετε τιμές για κατασκευή ιστοσελίδας, θα βρείτε τα πάντα: από €99 μέχρι €5.000 και πάνω. Ας δούμε τι κοστίζει πραγματικά και τι παίρνετε για τα χρήματά σας.
          </p>
          <p className="text-sm text-[#5B6472] mt-4">Από την ομάδα της DM-Labs.io</p>
        </header>

        <div className="prose prose-slate max-w-none space-y-8 text-[#374151]">

          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Γιατί οι τιμές διαφέρουν τόσο</h2>
            <p className="leading-relaxed mb-4">
              Στην αγορά θα βρείτε ιστοσελίδες από €99, συνήθως από πλατφόρμες όπως το Fiverr ή από αρχάριους freelancers, μέχρι €5.000 και πάνω από μεγάλα γραφεία web design. Η διαφορά δεν είναι τυχαία.
            </p>
            <p className="leading-relaxed">
              Αυτό που πληρώνετε είναι η εμπειρία, η ποιότητα του σχεδιασμού, η δομή για SEO, η ταχύτητα, η υποστήριξη μετά τη δημοσίευση και, το πιο σημαντικό, ο χρόνος που αφιερώνει κάποιος για να καταλάβει την επιχείρησή σας.
            </p>
          </section>

          <div className="rounded-2xl overflow-hidden my-8">
            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80"
              alt="Τιμές κατασκευής ιστοσελίδας"
              className="w-full object-cover"
              style={{ maxHeight: "320px" }}
              loading="lazy"
            />
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Τι παίρνετε σε κάθε εύρος τιμών</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-[#E8EAF0]">
                <h3 className="font-bold text-[#111315] mb-2">€99–€200: προσοχή</h3>
                <p className="text-[#5B6472] text-sm leading-relaxed">Συνήθως ένα template χωρίς προσαρμογή, χωρίς SEO και χωρίς υποστήριξη. Μπορεί να δείχνει καλό στην αρχή, αλλά δύσκολα θα σας βρει κανείς στο Google, και δεν θα κρατήσει πολύ.</p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-[#E8EAF0]">
                <h3 className="font-bold text-[#111315] mb-2">€299–€1.499: η σωστή ζώνη για μικρές επιχειρήσεις</h3>
                <p className="text-[#5B6472] text-sm leading-relaxed">Επαγγελματική ιστοσελίδα στα μέτρα σας, με σωστή δομή για SEO, responsive σχεδιασμό και υποστήριξη. Σε αυτή τη ζώνη είναι και τα δικά μας πακέτα.</p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-[#E8EAF0]">
                <h3 className="font-bold text-[#111315] mb-2">€1.500–€5.000+: για μεγαλύτερες ανάγκες</h3>
                <p className="text-[#5B6472] text-sm leading-relaxed">Σύνθετα έργα, ειδικές λειτουργίες, e-shop και μεγάλες εταιρείες. Μια μικρή επιχείρηση συνήθως δεν χρειάζεται αυτό το budget.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Τι περιλαμβάνουν τα πακέτα μας</h2>
            <p className="leading-relaxed mb-4">
              Στη DM-Labs.io, τα πακέτα ξεκινούν από <Price euros={299} locale="el" /> και περιλαμβάνουν:
            </p>
            <ul className="space-y-2 pl-4">
              <li className="leading-relaxed">Σχεδιασμό στα μέτρα της επιχείρησής σας, όχι template</li>
              <li className="leading-relaxed">Responsive σχεδιασμό για κινητό, tablet και υπολογιστή</li>
              <li className="leading-relaxed">Τις βάσεις του SEO, για να σας βρίσκουν στο Google</li>
              <li className="leading-relaxed">Γρήγορη φόρτωση</li>
              <li className="leading-relaxed">Γύρους διορθώσεων: 2 στο Launch, 3 στο Growth και 4 στο Pro</li>
              <li className="leading-relaxed">Υποστήριξη μετά τη δημοσίευση, μέσα από το πακέτο συντήρησης</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Τι πληρώνετε ξεχωριστά</h2>
            <p className="leading-relaxed mb-4">
              Δύο πράγματα δεν μπαίνουν στην τιμή της κατασκευής:
            </p>
            <p className="leading-relaxed mb-4">
              <strong>Φιλοξενία και συντήρηση:</strong> Όσο διαχειριζόμαστε εμείς την ιστοσελίδα σας, χρειάζεται πακέτο φιλοξενίας και συντήρησης, από <Price euros={69} locale="el" /> τον μήνα. Περιλαμβάνει τη φιλοξενία, τα backup, τις διορθώσεις και την υποστήριξη.{" "}
              <Link href="/el/pricing/" className="text-[#5B8CFF] hover:underline">Δείτε τα πακέτα συντήρησης</Link>.
            </p>
            <p className="leading-relaxed">
              <strong>Domain:</strong> Το domain (π.χ. myshop.com) συμφωνείται ξεχωριστά. Καλό είναι να είναι στο δικό σας όνομα, και σας βοηθάμε να το κανονίσετε.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Η πιο σημαντική ερώτηση: τι αξίζει για εσάς;</h2>
            <p className="leading-relaxed mb-4">
              Αντί να ρωτάτε «πόσο κοστίζει μια ιστοσελίδα», ρωτήστε: «αν η ιστοσελίδα μου φέρνει έναν πελάτη παραπάνω, πόσο αξίζει αυτό;»
            </p>
            <p className="leading-relaxed">
              Για ένα εστιατόριο, μία παρέα παραπάνω την εβδομάδα σημαίνει πάνω από πενήντα τραπέζια τον χρόνο. Για ένα nail salon, ένα ραντεβού παραπάνω την εβδομάδα είναι τέσσερα με πέντε ραντεβού τον μήνα. Το τι θα φέρει τελικά η ιστοσελίδα εξαρτάται από την επισκεψιμότητα, τη ζήτηση και το πόσοι από όσους επικοινωνούν γίνονται πελάτες.
            </p>
          </section>

          <div className="bg-gradient-to-br from-[#EEF3FF] to-[#F0EAFF] rounded-2xl p-8 border border-[#D0DEFF] mt-10">
            <h3 className="text-xl font-bold text-[#111315] mb-3">Δείτε αναλυτικά τις τιμές μας</h3>
            <p className="text-[#5B6472] mb-6 leading-relaxed">
              Δείτε τα πακέτα κατασκευής και τα πακέτα φιλοξενίας και συντήρησης, για να έχετε όλη την εικόνα του κόστους.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/el/pricing/">
                <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                  Δείτε τις τιμές
                </button>
              </Link>
              <Link href="/el/contact/">
                <button className="px-8 py-3.5 rounded-xl border border-[#5B8CFF] text-[#5B8CFF] font-semibold text-base hover:bg-[#EEF3FF] transition-colors">
                  Ζητήστε προσφορά
                </button>
              </Link>
            </div>
          </div>

        </div>
      </article>
    </main>
  );
}
