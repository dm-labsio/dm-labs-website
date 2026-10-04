import { Price } from "@/contexts/CurrencyContext";
import "@/components/blog/BlogArticle.css";
import { Link } from "wouter";
import { useGreekArticleSEO } from "@/hooks/useGreekArticleSEO";
import { POSTS_EL } from "@/data/blogPostsEl";

// Greek blog: web design guide — /el/blog/web-design-ellada-odigos-2026
// Primary keyword: "κατασκευή ιστοσελίδας", "web design"

const readTime = (slug: string) => POSTS_EL.find(post => post.elSlug === slug)?.readTime;

export default function WebDesignGreeceEl() {
  const article = useGreekArticleSEO("web-design-ellada-odigos-2026", {
    title: "Κατασκευή ιστοσελίδας: πλήρης οδηγός για το 2026 | DM-Labs.io",
    description: "Όσα πρέπει να ξέρει μια επιχείρηση πριν φτιάξει ιστοσελίδα το 2026: κόστος, τι να ζητήσετε από έναν web designer και πώς να σας βρίσκουν στο Google.",
    headline: "Κατασκευή ιστοσελίδας: όσα πρέπει να ξέρει κάθε επιχείρηση το 2026",
    ogImage: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=1200&q=80",
    ogImageAlt: "Κατασκευή ιστοσελίδας το 2026",
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
            Κατασκευή ιστοσελίδας: όσα πρέπει να ξέρει κάθε επιχείρηση το 2026
          </h1>
          <p className="text-lg text-[#5B6472] leading-relaxed">
            Όπου κι αν βρίσκεται η επιχείρησή σας, η ιστοσελίδα είναι από τα πιο σημαντικά της εργαλεία. Δείτε τι πρέπει να ξέρετε πριν φτιάξετε καινούργια ή ανανεώσετε αυτή που έχετε.
          </p>
          <p className="text-sm text-[#5B6472] mt-4">Από την ομάδα της DM-Labs.io</p>
        </header>

        <div className="rounded-2xl overflow-hidden mb-10">
          <img
            src="https://images.unsplash.com/photo-1555993539-1732b0258235?w=1200&q=80"
            alt="Κατασκευή ιστοσελίδας το 2026"
            className="w-full object-cover"
            style={{ maxHeight: "380px" }}
            loading="eager"
          />
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-[#374151]">

          <section>
            <p className="leading-relaxed text-lg">
              Οι μικρές επιχειρήσεις παλεύουν για την προσοχή του κόσμου. Από τα εστιατόρια της Θεσσαλονίκης μέχρι τα boutique ξενοδοχεία στα νησιά, όλοι θέλουν το ίδιο: να τους βλέπουν. Το 2026, αυτό κρίνεται πρώτα online, και η βάση για όλα είναι η ιστοσελίδα σας.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Γιατί άλλαξε το web design</h2>
            <p className="leading-relaxed mb-4">
              Πριν από μερικά χρόνια, αρκούσε να έχετε μια οποιαδήποτε ιστοσελίδα για να ξεχωρίσετε. Σήμερα έχουν ιστοσελίδα και οι ανταγωνιστές σας, και πολλές είναι καλές. Ο πήχης ανέβηκε, και οι πελάτες έγιναν πιο απαιτητικοί.
            </p>
            <p className="leading-relaxed">
              Σε έρευνα της Google, πάνω από τις μισές επισκέψεις από κινητό εγκαταλείπονταν όταν η σελίδα χρειαζόταν πάνω από 3 δευτερόλεπτα για να φορτώσει. Η ιστοσελίδα σας πρέπει να είναι γρήγορη, καθαρή και σχεδιασμένη πρώτα για το κινητό.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Τι χρειάζεται πραγματικά μια επιχείρηση από την ιστοσελίδα της</h2>
            <p className="leading-relaxed mb-4">
              Οι ανάγκες αλλάζουν από κλάδο σε κλάδο, αλλά οι ιστοσελίδες που φέρνουν αποτελέσματα έχουν κάποια κοινά: ανοίγουν γρήγορα, δουλεύουν άψογα στο κινητό και είναι στημένες για τις τοπικές αναζητήσεις που κάνουν οι πελάτες τους.
            </p>
            <p className="leading-relaxed">
              Η ιστοσελίδα ενός εστιατορίου στην Αθήνα πρέπει να δείχνει το μενού, να έχει εύκολο τρόπο για κράτηση και να είναι στημένη για αναζητήσεις όπως «εστιατόριο [γειτονιά] Αθήνα». Η ιστοσελίδα ενός δικηγορικού γραφείου στη Θεσσαλονίκη πρέπει να εμπνέει σοβαρότητα, να εξηγεί καθαρά τις υπηρεσίες και να είναι στημένη για αναζητήσεις όπως «δικηγόρος Θεσσαλονίκη [ειδικότητα]». Η δομή διαφέρει, οι αρχές όμως είναι ίδιες: σαφήνεια, ταχύτητα και τοπικό SEO.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Πόσο κοστίζει η κατασκευή ιστοσελίδας</h2>
            <p className="leading-relaxed mb-4">
              Οι τιμές διαφέρουν πολύ, ανάλογα με το ποιος φτιάχνει την ιστοσελίδα και τι περιλαμβάνει. Ενδεικτικά, για το 2026:
            </p>
            <div className="overflow-x-auto rounded-xl border border-[#E5E7EB] my-6">
              <table className="w-full text-sm">
                <thead className="bg-[#F3F4F6]">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-[#111315]">Επιλογή</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#111315]">Ενδεικτικό κόστος</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#111315]">Τι παίρνετε</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  <tr><td className="px-4 py-3">Μόνοι σας (Wix, Squarespace)</td><td className="px-4 py-3">Μηνιαία συνδρομή</td><td className="px-4 py-3">Template, περιορισμένο SEO, το brand της πλατφόρμας</td></tr>
                  <tr><td className="px-4 py-3">Freelancer</td><td className="px-4 py-3">€300–€2.000</td><td className="px-4 py-3">Πολύ μεγάλες διαφορές στην ποιότητα, περιορισμένη υποστήριξη</td></tr>
                  <tr><td className="px-4 py-3">Μεγάλο γραφείο web design</td><td className="px-4 py-3">€1.500–€8.000+</td><td className="px-4 py-3">Custom σχεδιασμός, ομάδα, υψηλά λειτουργικά κόστη</td></tr>
                  <tr><td className="px-4 py-3 font-semibold text-[#5B8CFF]">DM-Labs.io</td><td className="px-4 py-3 font-semibold"><Price euros={299} locale="el" />–<Price euros={1499} locale="el" /></td><td className="px-4 py-3">Ποιότητα γραφείου, ξεκάθαρες τιμές, γρήγορη παράδοση</td></tr>
                </tbody>
              </table>
            </div>
            <p className="leading-relaxed mb-4">
              Στις δικές μας τιμές κατασκευής προστίθεται το πακέτο φιλοξενίας και συντήρησης, από <Price euros={69} locale="el" /> τον μήνα.
            </p>
            <p className="leading-relaxed">
              Η μεγάλη απόκλιση στις τιμές δείχνει πόσο διαφέρουν η ποιότητα, η εμπειρία και όσα περιλαμβάνονται. Μια ιστοσελίδα των €300 και μια των €1.500 μπορεί να μοιάζουν σε ένα screenshot, αλλά η διαφορά στις βάσεις του SEO, στην ταχύτητα και στην ποιότητα του κώδικα είναι συχνά τεράστια.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Το πρόβλημα SEO που έχουν πολλές ιστοσελίδες</h2>
            <p className="leading-relaxed mb-4">
              Το πιο συχνό πρόβλημα που βλέπουμε σε ιστοσελίδες επιχειρήσεων δεν είναι ο σχεδιασμός. Είναι το SEO. Μια όμορφη ιστοσελίδα που δεν εμφανίζεται στο Google, δεν τη βλέπει κανείς.
            </p>
            <p className="leading-relaxed mb-4">
              Το σωστό SEO έχει δύο βασικά επίπεδα. Πρώτα το on-page SEO: κάθε σελίδα χρειάζεται δικό της meta title και meta description, σωστή δομή επικεφαλίδων και περιγραφές εικόνων (alt text) στη γλώσσα της σελίδας. Μετά το τοπικό SEO: το Google Business Profile σας πρέπει να είναι επαληθευμένο, πλήρες και με το ίδιο όνομα, διεύθυνση και τηλέφωνο που έχει η ιστοσελίδα σας.
            </p>
            <p className="leading-relaxed">
              Πολλά φτηνά πακέτα τα παραλείπουν όλα αυτά. Παίρνετε μια ιστοσελίδα, αλλά όχι μια ιστοσελίδα που δουλεύει.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Ελληνικά ή και αγγλικά; Χρειάζεστε δίγλωσση ιστοσελίδα;</h2>
            <p className="leading-relaxed mb-4">
              Αν εξυπηρετείτε τουρίστες, expats ή πελάτες από το εξωτερικό, πιθανότατα ναι. Μια ιστοσελίδα σε ελληνικά και αγγλικά ανοίγει την πόρτα και σε όσους δεν μιλούν ελληνικά, και δείχνει επαγγελματισμό.
            </p>
            <p className="leading-relaxed">
              Το μυστικό είναι να γίνει σωστά. Μια δίγλωσση ιστοσελίδα δεν είναι απλώς η ίδια σελίδα μεταφρασμένη. Χρειάζεται ξεχωριστά URL για κάθε γλώσσα, σωστά <code>hreflang</code> tags, για να ξέρει το Google ποια έκδοση να δείξει σε ποιον, και κείμενα που διαβάζονται φυσικά και στις δύο γλώσσες. Στη DM-Labs.io, οι ιστοσελίδες σε περισσότερες γλώσσες γίνονται ως έργο Enterprise / Custom.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Τι να κοιτάξετε όταν διαλέγετε web designer</h2>
            <p className="leading-relaxed mb-4">
              Υπάρχουν εκατοντάδες εταιρείες και freelancers που φτιάχνουν ιστοσελίδες. Αυτά είναι που μετράνε πραγματικά:
            </p>
            <ul className="space-y-3 pl-4">
              <li className="leading-relaxed"><strong>Ξεκάθαρες τιμές</strong>: Αν κάποιος δεν σας δίνει από την αρχή ένα εύρος τιμών, προσέξτε. Πρέπει να ξέρετε τι θα πληρώσετε πριν ξεκινήσει η συζήτηση.</li>
              <li className="leading-relaxed"><strong>Πραγματική δουλειά</strong>: Ζητήστε να δείτε ζωντανές ιστοσελίδες που έχουν φτιάξει, όχι μόνο screenshots. Ανοίξτε τες από το κινητό σας και δείτε πόσο γρήγορα φορτώνουν.</li>
              <li className="leading-relaxed"><strong>SEO στο βασικό πακέτο</strong>: Όχι ως έξτρα. Το on-page SEO πρέπει να είναι μέρος κάθε επαγγελματικής ιστοσελίδας.</li>
              <li className="leading-relaxed"><strong>Ξεκάθαρο χρονοδιάγραμμα</strong>: Ένας σοβαρός συνεργάτης συμφωνεί μαζί σας πότε θα παραδώσει, και το τηρεί.</li>
              <li className="leading-relaxed"><strong>Υποστήριξη μετά την παράδοση</strong>: Τι γίνεται μετά τη δημοσίευση; Ποιον παίρνετε τηλέφωνο όταν κάτι χαλάσει ή θέλετε να αλλάξετε το μενού σας;</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Πώς δουλεύει η DM-Labs.io</h2>
            <p className="leading-relaxed mb-4">
              Φτιάχνουμε ιστοσελίδες για επιχειρήσεις και δουλεύουμε από απόσταση, όπου κι αν βρίσκονται. Οι ιστοσελίδες μας είναι επαγγελματικές, γρήγορες και στημένες για να σας βρίσκουν στο Google και να σας στέλνουν μήνυμα.
            </p>
            <p className="leading-relaxed mb-4">
              Τα <Link href="/el/services/" className="text-[#5B8CFF] hover:underline">πακέτα μας</Link> συνδυάζουν δυνατή εικόνα, γρήγορη εμπειρία και εύκολη επικοινωνία, με εύρος που ταιριάζει στους στόχους σας. Κάθε πακέτο έχει δωρεάν συμβουλευτική, responsive σχεδιασμό, on-page SEO και SSL. Χωρίς κρυφές χρεώσεις.
            </p>
            <p className="leading-relaxed">
              Αν θέλετε να δείτε πώς δουλεύουμε σε συγκεκριμένες πόλεις, ρίξτε μια ματιά στις σελίδες μας για τη <Link href="/el/web-design-thessaloniki/" className="text-[#5B8CFF] hover:underline">Θεσσαλονίκη</Link>, τη <Link href="/el/web-design-limassol/" className="text-[#5B8CFF] hover:underline">Λεμεσό</Link> και τη <Link href="/el/web-design-nicosia/" className="text-[#5B8CFF] hover:underline">Λευκωσία</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Συμπέρασμα</h2>
            <p className="leading-relaxed mb-4">
              Το 2026 δεν αρκεί απλώς να έχετε ιστοσελίδα. Χρειάζεστε μια ιστοσελίδα που ανοίγει γρήγορα, δείχνει επαγγελματική σε κάθε συσκευή, εμφανίζεται στο Google για τις σωστές αναζητήσεις και κάνει εύκολο για τον πελάτη να σας μιλήσει.
            </p>
            <p className="leading-relaxed">
              Αν η ιστοσελίδα που έχετε δεν φέρνει αποτελέσματα, ή αν ξεκινάτε από το μηδέν, το να γίνει σωστά είναι από τις καλύτερες αποφάσεις που μπορείτε να πάρετε για την επιχείρησή σας.
            </p>
          </section>

          <div className="rounded-2xl bg-gradient-to-r from-[#5B8CFF]/10 to-[#8B5CFF]/10 border border-[#5B8CFF]/20 p-8 my-8">
            <h3 className="text-xl font-bold text-[#111315] mb-2">Θέλετε μια ιστοσελίδα που δουλεύει για την επιχείρησή σας;</h3>
            <p className="text-[#5B6472] mb-4">Κλείστε μια δωρεάν συμβουλευτική, χωρίς δέσμευση. Θα δούμε τι έχετε σήμερα, θα σας πούμε τι προτείνουμε και θα σας δώσουμε ξεκάθαρη τιμή, χωρίς πίεση.</p>
            <Link href="/el/contact/" className="inline-block bg-[#5B8CFF] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#4a7be8] transition-colors">
              Δωρεάν συμβουλευτική
            </Link>
          </div>

        </div>
      </article>

      {/* Σχετικά άρθρα */}
      <section className="bg-[#F0F4FF] py-12">
        <div className="container max-w-3xl mx-auto px-4">
          <h2 className="text-lg font-bold text-[#111315] mb-6">Διαβάστε επίσης</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/el/blog/posso-kostizei-istoselidha-kypros/"
              className="group block bg-white rounded-2xl overflow-hidden border border-[#E8EAF0] hover:border-[#5B8CFF] transition-colors shadow-sm">
              <div className="h-36 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" alt="Κόστος ιστοσελίδας"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold text-[#5B8CFF] uppercase tracking-wide">Web design</span>
                <h3 className="mt-1 text-sm font-bold text-[#111315] leading-snug group-hover:text-[#5B8CFF] transition-colors">Πόσο κοστίζει μια ιστοσελίδα;</h3>
                <p className="mt-1 text-xs text-[#5B6472]">{readTime("posso-kostizei-istoselidha-kypros")}</p>
              </div>
            </Link>
            <Link href="/el/blog/geo-vrethite-apo-chatgpt-kypros/"
              className="group block bg-white rounded-2xl overflow-hidden border border-[#E8EAF0] hover:border-[#5B8CFF] transition-colors shadow-sm">
              <div className="h-36 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80" alt="GEO και αναζήτηση με AI"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold text-[#5B8CFF] uppercase tracking-wide">SEO και GEO</span>
                <h3 className="mt-1 text-sm font-bold text-[#111315] leading-snug group-hover:text-[#5B8CFF] transition-colors">GEO: πώς να εμφανίζεται η επιχείρησή σας στο ChatGPT</h3>
                <p className="mt-1 text-xs text-[#5B6472]">{readTime("geo-vrethite-apo-chatgpt-kypros")}</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
