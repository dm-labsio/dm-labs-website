import "@/components/blog/BlogArticle.css";
import { Link } from "wouter";
import { useGreekArticleSEO } from "@/hooks/useGreekArticleSEO";

export default function RestaurantEl() {
  const article = useGreekArticleSEO("istoselidha-estiatorio-kypros", {
    title: "Γιατί κάθε εστιατόριο χρειάζεται ιστοσελίδα | DM-Labs.io",
    description: "Το Facebook δεν φτάνει για ένα εστιατόριο. Δείτε τι χάνετε χωρίς ιστοσελίδα και τι πρέπει να έχει για να φέρνει κρατήσεις.",
    headline: "Γιατί κάθε εστιατόριο χρειάζεται ιστοσελίδα (όχι μόνο Facebook)",
    ogImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    ogImageAlt: "Ιστοσελίδα για εστιατόρια και ταβέρνες",
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
            Γιατί κάθε εστιατόριο χρειάζεται ιστοσελίδα (όχι μόνο Facebook)
          </h1>
          <p className="text-lg text-[#5B6472] leading-relaxed">
            Έχετε εστιατόριο, καφέ ή ταβέρνα και βασίζεστε στο Facebook; Δείτε τι χάνετε κάθε μέρα χωρίς ιστοσελίδα.
          </p>
          <p className="text-sm text-[#5B6472] mt-4">Από την ομάδα της DM-Labs.io</p>
        </header>
        <div className="space-y-8 text-[#374151]">
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Όταν σας ψάχνουν στο Google</h2>
            <p className="leading-relaxed mb-4">
              Όταν ένας τουρίστας ή ένας ντόπιος ψάχνει στο Google «εστιατόριο Λεμεσός» ή «ταβέρνα Λάρνακα», βλέπει πρώτα τον χάρτη με τα μαγαζιά της περιοχής και από κάτω ιστοσελίδες. Μια σελίδα στο Facebook σπάνια εμφανίζεται σε τέτοιες αναζητήσεις.
            </p>
            <p className="leading-relaxed">
              Χωρίς ιστοσελίδα και χωρίς σωστό προφίλ στο Google, για αυτόν τον κόσμο απλώς δεν υπάρχετε. Και αυτό μπορεί να σημαίνει χαμένα τραπέζια κάθε μέρα.
            </p>
          </section>
          <div className="rounded-2xl overflow-hidden my-8">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
              alt="Ιστοσελίδα για εστιατόρια και ταβέρνες"
              className="w-full object-cover"
              style={{ maxHeight: "320px" }}
              loading="lazy"
            />
          </div>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Τι χρειάζεται η ιστοσελίδα ενός εστιατορίου</h2>
            <div className="space-y-4">
              {[
                { title: "Μενού", desc: "Μενού με φωτογραφίες και τιμές, που διαβάζεται άνετα στο κινητό. Ο κόσμος θέλει να δει τι σερβίρετε πριν αποφασίσει να έρθει." },
                { title: "Κρατήσεις", desc: "Ένα κουμπί WhatsApp ή μια φόρμα, για να κλείνουν τραπέζι εύκολα. Όσο πιο απλό, τόσο λιγότερες χαμένες κρατήσεις." },
                { title: "Ωράριο και τοποθεσία", desc: "Πότε είστε ανοιχτά, πού βρίσκεστε, αν υπάρχει πάρκινγκ. Τα βασικά που ψάχνει κάθε πελάτης." },
                { title: "Φωτογραφίες", desc: "Ο χώρος, τα πιάτα, η ατμόσφαιρα. Αυτά πουλάνε." },
                { title: "Κριτικές", desc: "Οι κριτικές στο Google δείχνουν ότι είστε αξιόπιστοι και μετράνε στα τοπικά αποτελέσματα." }
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-5 border border-[#E8EAF0]">
                  <h3 className="font-bold text-[#111315] mb-1">{item.title}</h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Και οι τουρίστες;</h2>
            <p className="leading-relaxed">
              Οι τουρίστες ψάχνουν στο Google πού να φάνε, πριν φτάσουν ή μόλις φτάσουν. Χωρίς ιστοσελίδα δεν σας βρίσκουν. Με μια καλή ιστοσελίδα, μπορούν να σας διαλέξουν πριν καν πατήσουν το πόδι τους στην πόλη σας.
            </p>
          </section>
          <div className="bg-gradient-to-br from-[#EEF3FF] to-[#F0EAFF] rounded-2xl p-8 border border-[#D0DEFF] mt-10">
            <h3 className="text-xl font-bold text-[#111315] mb-3">Μια ιστοσελίδα αντάξια του εστιατορίου σας</h3>
            <p className="text-[#5B6472] mb-6">Μενού, τρόπος κράτησης, φωτογραφίες και SEO. Το χρονοδιάγραμμα το συμφωνούμε πριν ξεκινήσουμε.</p>
            <Link href="/el/contact/">
              <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                Ζητήστε δωρεάν προσφορά
              </button>
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
