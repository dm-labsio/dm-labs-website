import "@/components/blog/BlogArticle.css";
import { Link } from "wouter";
import { useGreekArticleSEO } from "@/hooks/useGreekArticleSEO";

export default function ΕστιατόριοEl() {
  const article = useGreekArticleSEO("istoselidha-estiatorio-kypros", {
    title: "Γιατί Κάθε Εστιατόριο Χρειάζεται Ιστοσελίδα | DM-Labs.io",
    description: "Το Facebook δεν αρκεί για εστιατόριο. Δείτε τι χάνετε χωρίς επαγγελματική ιστοσελίδα και πώς να το διορθώσετε.",
    headline: "Γιατί Κάθε Εστιατόριο Χρειάζεται Ιστοσελίδα (Όχι Μόνο Facebook)",
    ogImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    ogImageAlt: "Εστιατόριο ιστοσελίδα - επαγγελματική online παρουσία για εστίαση",
  });

  return (
    <main className="blog-article-page bg-[#F6F6F4] min-w-0 overflow-x-hidden">
      <article className="container max-w-3xl mx-auto py-16 px-4">
        <div className="mb-8">
          <Link href="/el/blog/" className="text-[#5B8CFF] text-sm font-medium hover:underline">Πίσω στο Άρθρα</Link>
        </div>
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <time className="text-xs text-[#9CA3AF]" dateTime={article.date}>{new Date(`${article.date}T12:00:00Z`).toLocaleDateString("el-GR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time>
            <span className="text-xs text-[#9CA3AF]">-</span>
            <span className="text-xs text-[#9CA3AF]">5 λεπτά ανάγνωση</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111315] leading-tight mb-4">
            Γιατί Κάθε Εστιατόριο Χρειάζεται Ιστοσελίδα (Όχι Μόνο Facebook)
          </h1>
          <p className="text-lg text-[#5B6472] leading-relaxed">
            Έχετε εστιατόριο, καφέ ή ταβέρνα και βασίζεστε στο Facebook; Δείτε τι χάνετε κάθε μέρα χωρίς επαγγελματική ιστοσελίδα.
          </p>
          <p className="text-sm text-[#5B6472] mt-4">Από την ομάδα DM-Labs.io</p>
        </header>
        <div className="space-y-8 text-[#374151]">
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Το Facebook Δεν Εμφανίζεται στη Google</h2>
            <p className="leading-relaxed mb-4">
              Όταν ένας τουρίστας ή ένας κάτοικος ψάχνει "εστιατόριο Λεμεσός" ή "ταβέρνα Λάρνακα" στη Google, τα αποτελέσματα που βλέπει είναι ιστοσελίδες - όχι Facebook pages.
            </p>
            <p className="leading-relaxed">
              Αν δεν έχετε ιστοσελίδα, δεν υπάρχετε για αυτούς τους ανθρώπους. Αυτό μπορεί να σημαίνει χαμένες κρατήσεις κάθε μέρα.
            </p>
          </section>
          <div className="rounded-2xl overflow-hidden my-8">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
              alt="Εστιατόριο ιστοσελίδα - επαγγελματική online παρουσία για εστίαση"
              className="w-full object-cover"
              style={{ maxHeight: "320px" }}
              loading="lazy"
            />
          </div>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Τι Χρειάζεται η Ιστοσελίδα ενός Εστιατορίου</h2>
            <div className="space-y-4">
              {[
                { title: "Μενού", desc: "Ψηφιακό μενού με φωτογραφίες και τιμές. Οι πελάτες θέλουν να δουν τι σερβίρετε πριν αποφασίσουν να έρθουν." },
                { title: "Κρατήσεις", desc: "Φόρμα κράτησης ή κουμπί WhatsApp για εύκολη επικοινωνία. Μειώνει τις χαμένες κρατήσεις." },
                { title: "Ωράριο και τοποθεσία", desc: "Πότε είστε ανοιχτοί, πού βρίσκεστε, πάρκινγκ. Βασικές πληροφορίες που οι πελάτες ψάχνουν." },
                { title: "Φωτογραφίες", desc: "Ο χώρος σας, τα πιάτα σας, η ατμόσφαιρα. Αυτό πουλάει." },
                { title: "Reviews", desc: "Τα Google reviews σας δείχνουν αξιοπιστία και βοηθούν στο SEO." }
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-5 border border-[#E8EAF0]">
                  <h3 className="font-bold text-[#111315] mb-1">{item.title}</h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Και οι Τουρίστες;</h2>
            <p className="leading-relaxed">
              Οι επισκέπτες της περιοχής σας ψάχνουν εστιατόρια στη Google πριν φτάσουν ή μόλις φτάσουν. Αν δεν έχετε ιστοσελίδα, δεν σας βρίσκουν. Αν έχετε, μπορείτε να τους προσελκύσετε πριν καν πατήσουν το πόδι τους στην πόλη σας.
            </p>
          </section>
          <div className="bg-gradient-to-br from-[#EEF3FF] to-[#F0EAFF] rounded-2xl p-8 border border-[#D0DEFF] mt-10">
            <h3 className="text-xl font-bold text-[#111315] mb-3">Μια ιστοσελίδα αντάξια του εστιατορίου σας</h3>
            <p className="text-[#5B6472] mb-6">Μενού, κρατήσεις, φωτογραφίες, SEO. Το χρονοδιάγραμμα συμφωνείται πριν ξεκινήσουμε.</p>
            <Link href="/el/contact/">
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
