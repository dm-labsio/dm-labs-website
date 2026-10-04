import "@/components/blog/BlogArticle.css";
import { Link } from "wouter";
import { useGreekArticleSEO } from "@/hooks/useGreekArticleSEO";

export default function YogaEl() {
  const article = useGreekArticleSEO("istoselidha-yoga-pilates-studio-kypros", {
    title: "Ιστοσελίδα για στούντιο yoga και pilates | DM-Labs.io",
    description: "Γιατί ένα στούντιο yoga ή pilates χρειάζεται ιστοσελίδα και όχι μόνο Instagram, και τι πρέπει να έχει. Πρακτικός οδηγός.",
    headline: "Γιατί το στούντιο yoga ή pilates σας χρειάζεται ιστοσελίδα (όχι μόνο Instagram)",
    ogImage: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80",
    ogImageAlt: "Ιστοσελίδα για στούντιο yoga και pilates",
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
            Γιατί το στούντιο yoga ή pilates σας χρειάζεται ιστοσελίδα (όχι μόνο Instagram)
          </h1>
          <p className="text-lg text-[#5B6472] leading-relaxed">
            Το Instagram σάς φέρνει likes αλλά όχι μαθητές; Δείτε τι αλλάζει μια ιστοσελίδα για στούντιο yoga, pilates και personal trainers.
          </p>
          <p className="text-sm text-[#5B6472] mt-4">Από την ομάδα της DM-Labs.io</p>
        </header>
        <div className="space-y-8 text-[#374151]">
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Το πρόβλημα όταν έχετε μόνο Instagram</h2>
            <p className="leading-relaxed mb-4">
              Το Instagram είναι ιδανικό για να χτίζετε κοινότητα και να δείχνετε τον τρόπο που δουλεύετε. Όταν όμως κάποιος ψάχνει στο Google «yoga Λεμεσός» ή «pilates Λευκωσία», βλέπει πρώτα τον χάρτη και ιστοσελίδες. Ένα προφίλ στο Instagram σπάνια εμφανίζεται εκεί.
            </p>
            <p className="leading-relaxed">
              Και κάτι ακόμα: το Instagram δεν σας ανήκει. Αν αλλάξει ο αλγόριθμος ή κλειδώσει ο λογαριασμός σας, χάνετε την επαφή με τους μαθητές σας. Η ιστοσελίδα είναι δική σας.
            </p>
          </section>
          <div className="rounded-2xl overflow-hidden my-8">
            <img
              src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80"
              alt="Ιστοσελίδα για στούντιο yoga και pilates"
              className="w-full object-cover"
              style={{ maxHeight: "320px" }}
              loading="lazy"
            />
          </div>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Τι χρειάζεται η ιστοσελίδα ενός στούντιο</h2>
            <div className="space-y-4">
              {[
                { title: "Πρόγραμμα μαθημάτων", desc: "Ποιες μέρες, ποιες ώρες, τι μαθήματα. Είναι το πρώτο που ψάχνει ένας νέος μαθητής." },
                { title: "Φιλοσοφία και προσέγγιση", desc: "Τι σας κάνει διαφορετικούς; Πώς είναι ένα μάθημα μαζί σας; Αυτά χτίζουν εμπιστοσύνη πριν καν έρθει κάποιος στο πρώτο μάθημα." },
                { title: "Τιμές και πακέτα", desc: "Ξεκάθαρες τιμές για μεμονωμένα μαθήματα, μηνιαία πακέτα και ιδιαίτερα, χωρίς κρυφές χρεώσεις." },
                { title: "Κράτηση ή επικοινωνία", desc: "Ένα κουμπί WhatsApp ή μια φόρμα, για να ξεκινήσει ο μαθητής χωρίς κόπο." },
                { title: "Φωτογραφίες του χώρου", desc: "Ο χώρος σας είναι μέρος της εμπειρίας. Δείξτε τον: φωτεινό, καθαρό, φιλόξενο." }
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-5 border border-[#E8EAF0]">
                  <h3 className="font-bold text-[#111315] mb-1">{item.title}</h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Και για personal trainers;</h2>
            <p className="leading-relaxed">
              Αν είστε personal trainer, η ιστοσελίδα είναι το βιογραφικό σας. Δείχνει την εμπειρία, τις πιστοποιήσεις και τα αποτελέσματα των πελατών σας. Ένας trainer με προσεγμένη ιστοσελίδα εμπνέει περισσότερη εμπιστοσύνη από κάποιον που έχει μόνο Instagram.
            </p>
          </section>
          <div className="bg-gradient-to-br from-[#EEF3FF] to-[#F0EAFF] rounded-2xl p-8 border border-[#D0DEFF] mt-10">
            <h3 className="text-xl font-bold text-[#111315] mb-3">Ας γίνει το στούντιό σας η πρώτη επιλογή</h3>
            <p className="text-[#5B6472] mb-6">Ιστοσελίδα για στούντιο yoga, pilates ή personal trainer. Το χρονοδιάγραμμα το συμφωνούμε πριν ξεκινήσουμε.</p>
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
