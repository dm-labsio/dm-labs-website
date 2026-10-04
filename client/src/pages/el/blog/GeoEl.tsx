import "@/components/blog/BlogArticle.css";
import { Link } from "wouter";
import { useGreekArticleSEO } from "@/hooks/useGreekArticleSEO";
import { POSTS_EL } from "@/data/blogPostsEl";

// Greek blog: GEO — /el/blog/geo-vrethite-apo-chatgpt-kypros
// Primary keyword: "GEO", "ChatGPT για επιχειρήσεις", "αναζήτηση με AI"

const readTime = (slug: string) => POSTS_EL.find(post => post.elSlug === slug)?.readTime;

export default function GeoEl() {
  const article = useGreekArticleSEO("geo-vrethite-apo-chatgpt-kypros", {
    title: "GEO: πώς να εμφανίζεται η επιχείρησή σας στο ChatGPT | DM-Labs.io",
    description: "Πώς οι βάσεις του SEO, το χρήσιμο περιεχόμενο και τα σωστά στοιχεία βοηθούν να σας βρίσκουν στην αναζήτηση με AI. Χωρίς υποσχέσεις για κατάταξη ή αναφορά.",
    headline: "GEO: πώς να εμφανίζεται η επιχείρησή σας στο ChatGPT και στην αναζήτηση με AI",
    ogImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
    ogImageAlt: "GEO: αναζήτηση με AI για επιχειρήσεις",
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
            <span className="text-xs font-semibold text-[#5B8CFF] bg-[#5B8CFF]/10 px-2 py-0.5 rounded-full">SEO και GEO</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111315] leading-tight mb-4">
            GEO: πώς να εμφανίζεται η επιχείρησή σας στο ChatGPT και στην αναζήτηση με AI
          </h1>
          <p className="text-lg text-[#5B6472] leading-relaxed">
            Χρήσιμο περιεχόμενο, σωστά στοιχεία και καλές βάσεις SEO βοηθούν να βρίσκει μια επιχείρηση η αναζήτηση με AI. Δείτε τι μπορεί να βελτιωθεί και τι δεν μπορεί να εγγυηθεί κανείς.
          </p>
          <p className="text-sm text-[#5B6472] mt-4">Από την ομάδα της DM-Labs.io</p>
        </header>
        <div className="rounded-2xl overflow-hidden mb-10">
          <img
            src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80"
            alt="GEO: αναζήτηση με AI για επιχειρήσεις"
            className="w-full object-cover"
            style={{ maxHeight: "380px" }}
            loading="eager"
          />
        </div>
        <div className="prose prose-slate max-w-none space-y-8 text-[#374151]">
          <section>
            <p className="leading-relaxed text-lg">
              Κάποιος στη Λεμεσό ανοίγει το ChatGPT και γράφει: <em>«Ποιος κάνει web design;»</em> Ή ρωτά το Perplexity: <em>«Καλό εστιατόριο στην Πάφο;»</em> Ή βλέπει μια απάντηση AI μέσα στο Google, όταν ψάχνει υδραυλικό στη Λευκωσία.
            </p>
            <p className="leading-relaxed">
              Σε όλες αυτές τις περιπτώσεις, η AI δίνει μια απάντηση. Αναφέρει επιχειρήσεις και κάνει προτάσεις. Αν η δική σας επιχείρηση δεν είναι μέσα σε αυτή την απάντηση, για αυτόν τον άνθρωπο δεν υπάρχει.
            </p>
            <p className="leading-relaxed">
              Έτσι γίνεται πια μεγάλο μέρος της αναζήτησης το 2026, και πολλές επιχειρήσεις δεν το έχουν καν πάρει χαμπάρι.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Τι είναι το GEO;</h2>
            <p className="leading-relaxed mb-4">
              GEO σημαίνει <strong>Generative Engine Optimization</strong>: να είναι η επιχείρησή σας ορατή μέσα στις απαντήσεις που δίνει η AI, και όχι μόνο στα κλασικά αποτελέσματα του Google.
            </p>
            <p className="leading-relaxed mb-3">Τα εργαλεία AI που μετράνε αυτή τη στιγμή:</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2"><span><strong>ChatGPT</strong> (OpenAI): αναζήτηση και απαντήσεις μέσα στη συζήτηση</span></li>
              <li className="flex items-start gap-2"><span><strong>Google AI Overviews</strong>: απαντήσεις AI μέσα στην αναζήτηση του Google</span></li>
              <li className="flex items-start gap-2"><span><strong>Perplexity</strong>: αναζήτηση με AI, με συνδέσμους προς τις πηγές</span></li>
              <li className="flex items-start gap-2"><span><strong>Microsoft Copilot</strong>: μέσα στα Windows και στο Bing</span></li>
              <li className="flex items-start gap-2"><span><strong>Claude</strong> (Anthropic): όλο και περισσότεροι το χρησιμοποιούν για έρευνα</span></li>
            </ul>
            <p className="leading-relaxed">
              Όλα αυτά τα εργαλεία διαβάζουν το web, συνδυάζουν πληροφορίες και δίνουν μια απάντηση. Το καθένα διαλέγει πηγές με τον δικό του τρόπο. Οι σωστές βάσεις SEO βοηθούν να σας βρουν, αλλά δεν εγγυώνται ότι θα σας αναφέρουν.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Σε τι διαφέρει το GEO από το SEO;</h2>
            <p className="leading-relaxed mb-4">
              Το κλασικό SEO σάς βάζει σε μια λίστα αποτελεσμάτων. Ο χρήστης βλέπει τον σύνδεσμό σας, αποφασίζει να πατήσει και μπαίνει στην ιστοσελίδα σας. Ο στόχος είναι να είστε όσο πιο ψηλά γίνεται.
            </p>
            <p className="leading-relaxed mb-4">
              Στο GEO δεν υπάρχει λίστα. Η AI δίνει μια απάντηση, και η επιχείρησή σας είτε είναι μέσα είτε όχι. Δεν υπάρχει δεύτερη ή έβδομη θέση: ή σας αναφέρει ή δεν σας αναφέρει.
            </p>
            <div className="bg-[#5B8CFF]/[0.06] border border-[#5B8CFF]/20 rounded-xl p-5 my-6">
              <p className="text-sm font-semibold text-[#111315] mb-1">Η βασική διαφορά:</p>
              <p className="text-sm text-[#5B6472] leading-relaxed">
                Οι βάσεις του SEO βοηθούν και στην κλασική αναζήτηση και στα εργαλεία AI. Το πόσο αξίζει μια αναφορά εξαρτάται από την ερώτηση, το κοινό και το τι κάνει ο επισκέπτης μετά.
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Γιατί πολλές επιχειρήσεις δεν εμφανίζονται</h2>
            <p className="leading-relaxed mb-4">
              Μια επιχείρηση μπορεί να δυσκολεύεται να εμφανιστεί στην αναζήτηση με AI για τρεις βασικούς λόγους:
            </p>
            <p className="leading-relaxed mb-3">
              <strong>Λίγες αναφορές από άλλους.</strong> Μια καινούργια ιστοσελίδα συνήθως έχει λίγους συνδέσμους από άλλες ιστοσελίδες. Αξιόπιστες αναφορές τρίτων, όπως καταχωρίσεις σε καταλόγους, άρθρα στον Τύπο και δημοσιεύσεις του κλάδου, βοηθούν να γίνει πιο ξεκάθαρο ποιοι είστε.
            </p>
            <p className="leading-relaxed mb-3">
              <strong>Λίγες καταχωρίσεις εκτός ιστοσελίδας.</strong> Πολλές επιχειρήσεις έχουν ιστοσελίδα, αλλά σχεδόν καμία καταχώριση στις πλατφόρμες που χρησιμοποιούν συχνά ως πηγές τα εργαλεία AI: Google Business Profile, TripAdvisor, Clutch, DesignRush και τοπικούς καταλόγους. Σωστές καταχωρίσεις βοηθούν να σας βρουν. Και να θυμάστε ότι οι απαντήσεις AI μπορεί να έχουν λάθη, οπότε αξίζει να τις ελέγχετε.
            </p>
            <p className="leading-relaxed">
              <strong>Χωρίς δομημένα δεδομένα.</strong> Τα δομημένα δεδομένα (schema σε μορφή JSON-LD) βοηθούν τις μηχανές αναζήτησης να καταλάβουν το όνομα, την τοποθεσία, τις υπηρεσίες, το τηλέφωνο και το ωράριό σας. Πρέπει όμως να συμφωνούν με όσα γράφει η ιστοσελίδα, και δεν είναι προϋπόθεση για να σας αναφέρει μια AI.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Πώς μοιάζει μια αναφορά σε απάντηση AI;</h2>
            <p className="leading-relaxed mb-4">
              Όταν κάποιος ρωτά το ChatGPT <em>«ποιος κάνει web design στη Λεμεσό;»</em>, μια επιχείρηση με καλές βάσεις μπορεί να εμφανιστεί κάπως έτσι:
            </p>
            <blockquote className="border-l-4 border-[#5B8CFF] pl-5 py-2 bg-[#5B8CFF]/[0.04] rounded-r-xl my-6">
              <p className="text-[#374151] italic leading-relaxed">
                «Για web design στη Λεμεσό, μια επιλογή είναι η [όνομα επιχείρησης], που φτιάχνει ιστοσελίδες για εστιατόρια και καταλύματα και προσφέρει δωρεάν πρώτη συμβουλευτική.»
              </p>
            </blockquote>
            <p className="leading-relaxed">
              Είναι ενδεικτικό παράδειγμα, όχι πραγματική απάντηση κάποιας υπηρεσίας AI ούτε υπόσχεση ότι θα εμφανιστείτε. Αυτό που μετράει τελικά είναι αν ο επισκέπτης που έρχεται κάνει το επόμενο βήμα.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Το πρώτο βήμα: οι βάσεις</h2>
            <p className="leading-relaxed mb-4">
              Το GEO δεν είναι ένα μεμονωμένο κόλπο. Τα εργαλεία AI βασίζονται σε πολλά σήματα για να αποφασίσουν ποιον θα εμπιστευτούν και ποιον θα αναφέρουν. Οι βάσεις έχουν τρία επίπεδα:
            </p>
            <ol className="space-y-3 mb-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5B8CFF] text-white text-xs font-bold flex items-center justify-center mt-0.5">1</span>
                <span><strong>Δομημένα δεδομένα στην ιστοσελίδα σας</strong>: schema σε JSON-LD που λέει καθαρά ποιοι είστε, τι κάνετε, πού βρίσκεστε και, αν θέλετε, πόσο χρεώνετε.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5B8CFF] text-white text-xs font-bold flex items-center justify-center mt-0.5">2</span>
                <span><strong>Αναφορές από τρίτους</strong>: καταχωρίσεις σε καταλόγους και πλατφόρμες που χρησιμοποιούνται συχνά ως πηγές, όπως Google Business Profile, TripAdvisor, Clutch και τοπικοί κατάλογοι επιχειρήσεων.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5B8CFF] text-white text-xs font-bold flex items-center justify-center mt-0.5">3</span>
                <span><strong>Περιεχόμενο που απαντά σε συγκεκριμένες ερωτήσεις</strong>: απαντήστε σε όσα ρωτούν πραγματικά οι πελάτες σας, με ξεκάθαρες πληροφορίες για υπηρεσίες, κόστος και εύρος. Καμία μορφή περιεχομένου δεν εγγυάται αναφορά από AI.</span>
              </li>
            </ol>
            <p className="leading-relaxed">
              Οι επιχειρήσεις που ήδη εμφανίζονται σε απαντήσεις AI για σχετικές ερωτήσεις συνήθως έχουν αυτά τα τρία, συχνά χωρίς να το έχουν σχεδιάσει. Έφτασαν εκεί με καλές συνήθειες SEO, που απλώς δουλεύουν και για το GEO.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Πόσο χρόνο θέλει;</h2>
            <p className="leading-relaxed mb-4">
              Δεν υπάρχει σίγουρη συντόμευση ούτε σταθερό χρονοδιάγραμμα για να εμφανιστείτε σε απαντήσεις AI. Κάθε υπηρεσία βρίσκει και χρησιμοποιεί πληροφορίες με τον δικό της τρόπο.
            </p>
            <p className="leading-relaxed">
              Τα δομημένα δεδομένα, οι σωστές καταχωρίσεις και το χρήσιμο περιεχόμενο βοηθούν τις υπηρεσίες AI να καταλάβουν την επιχείρησή σας. Παρακολουθούμε την ορατότητα με τον καιρό, χωρίς να εγγυόμαστε εμφάνιση, θέση ή συγκεκριμένο χρόνο.
            </p>
          </section>
          <p className="leading-relaxed">Η Google λέει ότι για τις λειτουργίες AI της αναζήτησής της ισχύουν οι ίδιες βάσεις SEO, χωρίς ειδικό schema ή ειδικό αρχείο για AI, και χωρίς εγγύηση εμφάνισης: <a href="https://developers.google.com/search/docs/appearance/ai-features" target="_blank" rel="noopener noreferrer">η επίσημη καθοδήγηση της Google</a>. Η OpenAI χρησιμοποιεί το OAI-SearchBot για την αναζήτηση του ChatGPT: αν του επιτρέπετε την πρόσβαση, η ιστοσελίδα σας μπορεί να εμφανιστεί, χωρίς αυτό να είναι εγγυημένο. <a href="https://developers.openai.com/api/docs/bots" target="_blank" rel="noopener noreferrer">Η τεκμηρίωση της OpenAI</a>.</p>
          <section>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">Τι δεν καλύπτουμε εδώ</h2>
            <p className="leading-relaxed mb-4">
              Αυτό το άρθρο καλύπτει τα βασικά. Την πρόσβαση των μηχανών αναζήτησης, το χρήσιμο περιεχόμενο, τα σωστά στοιχεία της επιχείρησης, τα δομημένα δεδομένα και την πορεία στην αναζήτηση τα ελέγχουμε στη δουλειά SEO που συμφωνούμε για κάθε έργο. Δείτε τα <Link href="/el/pricing/" className="text-[#5B8CFF] hover:underline">πακέτα και τις τιμές</Link>.
            </p>
            <p className="leading-relaxed">
              Αν θέλετε να μάθετε πού βρίσκεται σήμερα η επιχείρησή σας στην αναζήτηση με AI, τι λένε για εσάς το ChatGPT και το Perplexity, τι λείπει και ποια είναι τα κενά, αυτό το καλύπτει η δωρεάν συμβουλευτική μας.
            </p>
          </section>
          <div className="bg-gradient-to-br from-[#5B8CFF] to-[#8B5CF6] rounded-2xl p-8 text-white mt-10">
            <h3 className="text-xl font-bold mb-3">Μάθετε αν η επιχείρησή σας εμφανίζεται στην αναζήτηση με AI</h3>
            <p className="text-white/80 mb-5 leading-relaxed">
              Θα σας δείξουμε τι λένε σήμερα το ChatGPT και το Perplexity για την επιχείρησή σας και τι χρειάζεται για να αλλάξει. Δωρεάν και χωρίς δέσμευση.
            </p>
            <Link
              href="/el/contact/"
              className="inline-block bg-white text-[#5B8CFF] font-bold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors"
            >
              Δωρεάν έλεγχος GEO
            </Link>
          </div>
        </div>
      </article>
      {/* Σχετικά άρθρα */}
      <section className="bg-[#F0F4FF] py-12">
        <div className="container max-w-3xl mx-auto px-4">
          <h2 className="text-lg font-bold text-[#111315] mb-6">Διαβάστε επίσης</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/el/blog/pos-na-vretheite-google-kypros/"
              className="group block bg-white rounded-2xl overflow-hidden border border-[#E8EAF0] hover:border-[#5B8CFF] transition-colors shadow-sm">
              <div className="h-36 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=600&q=80" alt="Εμφάνιση στο Google"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold text-[#5B8CFF] uppercase tracking-wide">SEO</span>
                <h3 className="mt-1 text-sm font-bold text-[#111315] leading-snug group-hover:text-[#5B8CFF] transition-colors">Πώς να εμφανίζεται η επιχείρησή σας στο Google</h3>
                <p className="mt-1 text-xs text-[#5B6472]">{readTime("pos-na-vretheite-google-kypros")}</p>
              </div>
            </Link>
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
          </div>
        </div>
      </section>
    </main>
  );
}
