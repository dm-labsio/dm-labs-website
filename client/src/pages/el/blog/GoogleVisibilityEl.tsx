import "@/components/blog/BlogArticle.css";
import { Link } from "wouter";
import { useGreekArticleSEO } from "@/hooks/useGreekArticleSEO";

export default function GoogleVisibilityEl() {
  const article = useGreekArticleSEO("pos-na-vretheite-google-kypros", {
    title: "Πώς να εμφανίζεται η επιχείρησή σας στο Google | DM-Labs.io",
    description: "Τρία βήματα για να σας βρίσκουν στο Google όταν ψάχνουν αυτό που κάνετε: Google Business Profile, σωστή ιστοσελίδα και χρήσιμο περιεχόμενο. Χωρίς τεχνικούς όρους.",
    headline: "Πώς να εμφανίζεται η επιχείρησή σας στο Google: ένας απλός οδηγός",
    ogImage: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80",
    ogImageAlt: "Εμφάνιση στο Google για μικρές επιχειρήσεις",
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
            Πώς να εμφανίζεται η επιχείρησή σας στο Google: ένας απλός οδηγός
          </h1>
          <p className="text-lg text-[#5B6472] leading-relaxed">
            Χωρίς τεχνικούς όρους: τι χρειάζεται για να σας βρίσκουν στο Google όταν κάποιος ψάχνει αυτό που κάνετε.
          </p>
          <p className="text-sm text-[#5B6472] mt-4">Από την ομάδα της DM-Labs.io</p>
        </header>
        <div className="space-y-8 text-[#374151]">
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Γιατί μετράει να σας βρίσκουν στο Google</h2>
            <p className="leading-relaxed mb-4">
              Κάθε μέρα, πολύς κόσμος ψάχνει στο Google επιχειρήσεις σαν τη δική σας: «κομμωτήριο Λεμεσός», «λογιστής Λευκωσία», «εστιατόριο Πάφος». Αν δεν εμφανίζεστε στα αποτελέσματα, αυτοί οι πελάτες πηγαίνουν στον ανταγωνισμό.
            </p>
          </section>
          <div className="rounded-2xl overflow-hidden my-8">
            <img
              src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80"
              alt="Εμφάνιση στο Google για μικρές επιχειρήσεις"
              className="w-full object-cover"
              style={{ maxHeight: "320px" }}
              loading="lazy"
            />
          </div>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Βήμα 1: Google Business Profile</h2>
            <p className="leading-relaxed mb-4">
              Το πρώτο και πιο σημαντικό βήμα είναι να δημιουργήσετε ή να διεκδικήσετε το προφίλ της επιχείρησής σας στο Google (Google Business Profile). Είναι δωρεάν, και από εκεί εμφανίζεστε στον χάρτη και στα τοπικά αποτελέσματα.
            </p>
            <p className="leading-relaxed">
              Συμπληρώστε σωστά διεύθυνση, τηλέφωνο, ωράριο, κατηγορία και φωτογραφίες. Και ζητήστε από ικανοποιημένους πελάτες να σας αφήσουν κριτική: σύμφωνα με το ίδιο το Google, ο αριθμός και η βαθμολογία των κριτικών μετράνε στην τοπική κατάταξη.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Βήμα 2: Μια ιστοσελίδα στημένη σωστά για SEO</h2>
            <p className="leading-relaxed mb-4">
              Το προφίλ στο Google σάς βοηθά στις τοπικές αναζητήσεις. Για να εμφανίζεστε και σε πιο γενικές αναζητήσεις, χρειάζεστε ιστοσελίδα.
            </p>
            <p className="leading-relaxed">
              Μια σωστά φτιαγμένη ιστοσελίδα έχει καλούς τίτλους και περιγραφές σε κάθε σελίδα, σωστή δομή επικεφαλίδων (H1, H2, H3), γρήγορη φόρτωση και responsive σχεδιασμό. Όλα αυτά βοηθούν το Google να καταλάβει τι κάνετε και να σας δείχνει στις σωστές αναζητήσεις.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Βήμα 3: Περιεχόμενο που απαντά σε ερωτήσεις</h2>
            <p className="leading-relaxed">
              Το Google προτιμά σελίδες που απαντούν σε όσα ρωτά ο κόσμος. Αν έχετε εστιατόριο, γράψτε για το μενού και τα πιάτα που σας ξεχωρίζουν. Αν είστε λογιστής, γράψτε για τις υπηρεσίες, τις τιμές και τις ερωτήσεις που ακούτε συχνά. Αυτό είναι στην ουσία το SEO, και δεν χρειάζεται να είναι περίπλοκο.
            </p>
          </section>
          <div className="bg-gradient-to-br from-[#EEF3FF] to-[#F0EAFF] rounded-2xl p-8 border border-[#D0DEFF] mt-10">
            <h3 className="text-xl font-bold text-[#111315] mb-3">Θέλετε να σας βρίσκουν στο Google;</h3>
            <p className="text-[#5B6472] mb-6">Φτιάχνουμε ιστοσελίδες με σωστή δομή για SEO από την αρχή. Δεν χρειάζεται να ξέρετε τίποτα τεχνικό.</p>
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
