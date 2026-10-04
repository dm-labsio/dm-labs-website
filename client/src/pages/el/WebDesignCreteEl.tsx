import { usePricingCurrency, Price } from "@/contexts/CurrencyContext";
import { BUILD_PRICE_SUMMARY } from "@/components/pricing/pricingContent";
import { useStructuredData } from "@/hooks/useStructuredData";
import { serviceSchemaData } from "@/lib/structuredData";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";

// SEO landing page: /web-design-crete
// Primary keyword: "κατασκευή ιστοσελίδας Κρήτη"
// Secondary: "web design Κρήτη", "ιστοσελίδα για μικρή επιχείρηση"
// Tertiary: "κατασκευή ιστοσελίδας Ηράκλειο", "κατασκευή ιστοσελίδας Χανιά"
// Design: matches DM-Labs.io site style - light bg, brand gradient accents, clean typography

const WHATSAPP_URL = `https://wa.me/35797472847?text=${encodeURIComponent("Γεια σας! Θα ήθελα να φτιάξω ιστοσελίδα για την επιχείρησή μου στην Κρήτη.")}`;

const baseFaqs = [
  {
    q: "Πόσο κοστίζει μια ιστοσελίδα για μια επιχείρηση στην Κρήτη;",
    a: BUILD_PRICE_SUMMARY.el
  },
  {
    q: "Δουλεύετε με επιχειρήσεις στην Κρήτη από απόσταση;",
    a: "Ναι. Δουλεύουμε με επιχειρήσεις από όλη την Κρήτη, από το Ηράκλειο, τα Χανιά, το Ρέθυμνο, τον Άγιο Νικόλαο και παντού, χωρίς να χρειάζεται να συναντηθούμε από κοντά. Όλα γίνονται μέσω WhatsApp, email και βιντεοκλήσεων, κι έτσι περνάμε πιο γρήγορα από την πρώτη κουβέντα στη δημοσίευση."
  },
  {
    q: "Μπορείτε να φτιάξετε την ιστοσελίδα της επιχείρησής μου στα ελληνικά;",
    a: "Φυσικά. Η ιστοσελίδα μπορεί να είναι μόνο στα ελληνικά, αν οι πελάτες σας είναι κυρίως ελληνόφωνοι. Αν θέλετε και αγγλικά ή άλλες γλώσσες, με επιλογή γλώσσας στη σελίδα, γίνεται ως έργο Enterprise / Custom, με προσφορά ανάλογα με τις γλώσσες και το περιεχόμενο."
  },
  {
    q: "Σε πόσο καιρό θα είναι έτοιμη η ιστοσελίδα;",
    a: "Το χρονοδιάγραμμα το συμφωνούμε πριν ξεκινήσουμε, ανάλογα με το εύρος και τα υλικά που χρειάζονται. Σας ενημερώνουμε σε κάθε στάδιο. Αλλαγές στο έργο, στο περιεχόμενο ή στα σχόλια μπορεί να επηρεάσουν το πρόγραμμα, και κάθε νέα ημερομηνία τη συμφωνούμε μαζί σας."
  },
  {
    q: "Η επιχείρησή μου ζει από τον τουρισμό. Μπορείτε να φτιάξετε ιστοσελίδα για επισκέπτες από το εξωτερικό;",
    a: "Ναι. Μια καλή ιστοσελίδα είναι από τους πιο αποτελεσματικούς τρόπους να σας βρουν οι τουρίστες πριν φτάσουν στο νησί. Ανοίγει γρήγορα στο κινητό, από όπου ψάχνουν πολλοί ταξιδιώτες, και μπορεί να έχει γκαλερί, χάρτη και φόρμα επικοινωνίας. Αν τη χρειάζεστε σε περισσότερες γλώσσες ή με σύστημα κρατήσεων, αυτό γίνεται ως έργο Enterprise / Custom."
  },
  {
    q: "Με ποιες επιχειρήσεις δουλεύετε στην Κρήτη;",
    a: "Με κάθε είδους μικρές και μεσαίες επιχειρήσεις: εστιατόρια, ταβέρνες, ξενοδοχεία, βίλες, κομμωτήρια και κέντρα αισθητικής, στούντιο yoga, δικηγόρους, λογιστές, κατασκευαστικές εταιρείες, μαγαζιά και κάθε λογής επαγγελματίες. Αν θέλετε να σας βρίσκουν online και να δείχνετε επαγγελματίες, μπορούμε να σας φτιάξουμε τη σωστή ιστοσελίδα."
  }
];

const industries = [
  {
    title: "Εστιατόρια και ταβέρνες",
    desc: "Το μενού, οι φωτογραφίες, η τοποθεσία σας και ένας εύκολος τρόπος να κλείσουν τραπέζι. Για να σας βρίσκουν και οι ντόπιοι και οι τουρίστες που ψάχνουν πού να φάνε καλά.",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    alt: "Παραδοσιακή ταβέρνα με τραπέζια έξω, στην Κρήτη"
  },
  {
    title: "Ξενοδοχεία, βίλες και καταλύματα",
    desc: "Δείξτε το κατάλυμά σας με ωραία γκαλερί, πληροφορίες για διαθεσιμότητα και φόρμα για να σας ζητούν κράτηση απευθείας. Έτσι εξαρτάστε λιγότερο από τις πλατφόρμες και έχετε δική σας επαφή με τους επισκέπτες.",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
    alt: "Βίλα με πισίνα στην Κρήτη"
  },
  {
    title: "Ομορφιά και ευεξία",
    desc: "Κομμωτήρια, στούντιο νυχιών, θεραπευτές μασάζ και κέντρα αισθητικής. Μια καθαρή ιστοσελίδα με τις υπηρεσίες, τις τιμές σας και έναν εύκολο τρόπο να κλείνουν ραντεβού.",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",
    alt: "Το εσωτερικό ενός σαλονιού ομορφιάς"
  },
  {
    title: "Επαγγελματικές υπηρεσίες",
    desc: "Δικηγόροι, λογιστές, αρχιτέκτονες και σύμβουλοι. Μια σοβαρή, καλά οργανωμένη ιστοσελίδα που δείχνει τι ξέρετε να κάνετε και διευκολύνει τον πελάτη να σας γράψει.",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80",
    alt: "Επαγγελματική συνάντηση"
  },
  {
    title: "Μαγαζιά και μπουτίκ",
    desc: "Τα προϊόντα σας, η τοποθεσία και τα στοιχεία επικοινωνίας, σε μια προσεγμένη ιστοσελίδα. Για να σας βρίσκουν οι πελάτες πριν έρθουν στο μαγαζί.",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
    alt: "Κατάστημα μπουτίκ"
  },
  {
    title: "Κατασκευές και τεχνικά επαγγέλματα",
    desc: "Εργολάβοι, ηλεκτρολόγοι και υδραυλικοί. Μια απλή ιστοσελίδα που δείχνει τη δουλειά και τις υπηρεσίες σας, για να σας παίρνουν εύκολα τηλέφωνο ή να σας στέλνουν μήνυμα.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    alt: "Κατασκευαστική επιχείρηση"
  },
  {
    title: "Γυμναστική και yoga",
    desc: "Personal trainers, στούντιο yoga, δάσκαλοι Pilates και σύμβουλοι ευεξίας. Μια ιστοσελίδα με τα μαθήματα και τον τρόπο που δουλεύετε, και έναν εύκολο τρόπο να κλείνουν μάθημα μαζί σας.",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
    alt: "Στούντιο yoga και γυμναστικής"
  }
];

export default function WebDesignCreteEl() {
  const { copy } = usePricingCurrency("el");
  const faqs = copy(baseFaqs);

  useSEO({
    title: "Κατασκευή ιστοσελίδων στην Κρήτη | DM-Labs.io",
    description: "Ιστοσελίδες για ταβέρνες, καταλύματα, μαγαζιά και επαγγελματίες στην Κρήτη: σχεδιασμός στα μέτρα σας, άψογη εμφάνιση στο κινητό και SEO. Δωρεάν συμβουλευτική.",
    canonicalPath: "/el/web-design-crete/"
  });

  useStructuredData("location-jsonld-schema", serviceSchemaData("https://dm-labs.io/el/web-design-crete/", "el", "Κατασκευή ιστοσελίδων στην Κρήτη", "Η DM-Labs.io φτιάχνει από απόσταση ιστοσελίδες για μικρές επιχειρήσεις σε όλη την Κρήτη, από το Ηράκλειο και τα Χανιά μέχρι το Ρέθυμνο: επαγγελματικές, responsive και με τις βάσεις του SEO.", faqs));

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#F0EAFF]">
        <div className="container max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">
            Κατασκευή ιστοσελίδων · Κρήτη
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111315] mb-4 leading-tight">
            Κατασκευή ιστοσελίδας{" "}
            <span className="bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] bg-clip-text text-transparent">
              για επιχειρήσεις στην Κρήτη
            </span>
          </h1>
          <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-6 leading-relaxed">
            Η DM-Labs.io φτιάχνει επαγγελματικές, γρήγορες και responsive ιστοσελίδες για μικρές επιχειρήσεις σε όλη την Κρήτη, από το Ηράκλειο και τα Χανιά μέχρι το Ρέθυμνο, τον Άγιο Νικόλαο και κάθε χωριό. Με γρήγορη παράδοση και προσωπική υποστήριξη, από τον σχεδιασμό μέχρι τη δημοσίευση.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/el/contact/">
              <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                Δωρεάν συμβουλευτική
              </button>
            </Link>
            <Link href="/el/pricing/">
              <button className="px-8 py-3.5 rounded-xl border border-[#5B8CFF] text-[#5B8CFF] font-semibold text-base hover:bg-[#EEF3FF] transition-colors bg-white">
                Δείτε τις τιμές
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── HERO IMAGE ── */}
      <section className="pb-0">
        <div className="container max-w-4xl mx-auto px-4">
          <figure className="rounded-2xl overflow-hidden shadow-md">
            <img
              src="/media/manus/NIKoLQKtylnVMtQG.webp"
              alt="Το παλιό λιμάνι των Χανίων στο ηλιοβασίλεμα"
              className="w-full h-auto object-cover"
            />
          </figure>
        </div>
      </section>

      {/* ── WHO WE BUILD FOR ── */}
      <section className="section-spacing">
        <div className="container mx-auto text-center">
          <p className="text-sm font-semibold text-[#5B6472] mb-6">
            Φτιάχνουμε ιστοσελίδες για
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60">
            <p className="font-display font-bold text-xl">Εστιατόρια</p>
            <p className="font-display font-bold text-xl">Στούντιο yoga</p>
            <p className="font-display font-bold text-xl">Δικηγορικά γραφεία</p>
            <p className="font-display font-bold text-xl">Boutique ξενοδοχεία</p>
            <p className="font-display font-bold text-xl">Κέντρα αισθητικής</p>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section-spacing bg-white">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">
              Όλα όσα χρειάζεστε
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111315] mb-4 leading-tight">
              Ιστοσελίδες που δουλεύουν για τη μικρή σας επιχείρηση
            </h2>
            <p className="text-lg text-[#5B6472] leading-relaxed">
              Σχεδιάζουμε την ιστοσελίδα με βάση τις ανάγκες της επιχείρησής σας. Τι ακριβώς περιλαμβάνει εξαρτάται από το πακέτο και το εύρος που συμφωνούμε. Η κατασκευή πληρώνεται μία φορά, και η φιλοξενία και η συντήρηση χρεώνονται ξεχωριστά όσο διαχειριζόμαστε την ιστοσελίδα.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Ιστοσελίδα με το δικό σας brand", desc: "Σχεδιασμένη από το μηδέν, με το λογότυπο, τα χρώματα και το ύφος σας." },
              { title: "Responsive για κινητά", desc: "Δείχνει σωστά σε κάθε συσκευή: κινητό, tablet και υπολογιστή." },
              { title: "Ταχύτητα φόρτωσης", desc: "Ανοίγει γρήγορα, για να μη φεύγουν οι επισκέπτες και να σας βοηθάει στο Google." },
              { title: "Οι βάσεις του SEO", desc: "Σωστοί τίτλοι, περιγραφές και δομή, για να σας βρίσκουν όταν ψάχνουν αυτό που κάνετε." },
              { title: "Φόρμα επικοινωνίας", desc: "Ένας εύκολος τρόπος να σας στέλνουν μήνυμα, στο Growth και στο Pro." },
              { title: "Σύνδεση με social media", desc: "Σύνδεσμοι για τα προφίλ σας, για να σας ακολουθούν περισσότεροι." },
              { title: "Google Maps", desc: "Χάρτης μέσα στην ιστοσελίδα, για να σας βρίσκουν εύκολα." },
              { title: "Πιστοποιητικό SSL", desc: "Ασφαλής σύνδεση, με το λουκέτο HTTPS δίπλα στη διεύθυνσή σας." },
              { title: "Κουμπί WhatsApp", desc: "Για να σας στέλνουν μήνυμα κατευθείαν από την ιστοσελίδα." }
            ].map(f => (
              <div key={f.title} className="bg-[#F6F6F4] p-6 rounded-xl">
                <h3 className="font-bold text-lg text-[#111315] mb-2">{f.title}</h3>
                <p className="text-[#5B6472] text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="section-spacing">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">
              Για κάθε επιχείρηση στην Κρήτη
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111315] mb-4 leading-tight">
              Ιστοσελίδες για κάθε είδους επιχείρηση
            </h2>
            <p className="text-lg text-[#5B6472] leading-relaxed">
              Από εστιατόρια στο Ηράκλειο μέχρι βίλες στα Χανιά, φτιάχνουμε ιστοσελίδες που ταιριάζουν στις ανάγκες κάθε τοπικής επιχείρησης και τη βοηθούν να ξεχωρίσει.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map(i => (
              <div key={i.title} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200/80">
                <img src={i.img} alt={i.alt} className="w-full h-40 object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-lg text-[#111315] mb-2">{i.title}</h3>
                  <p className="text-[#5B6472] text-sm">{i.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING CTA ── */}
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#F0EAFF]">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111315] mb-4 leading-tight">
            Ξεκάθαρες τιμές, χωρίς εκπλήξεις
          </h2>
          <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-6 leading-relaxed">
            Διαλέξτε το πακέτο που ταιριάζει στις ανάγκες και στον προϋπολογισμό σας. Η κατασκευή πληρώνεται μία φορά, και η φιλοξενία και η συντήρηση ξεκινούν από <Price euros={69} locale="el" /> τον μήνα. Όλα τα κόστη τα ξέρετε από πριν.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/el/pricing/">
              <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                Πακέτα και τιμές
              </button>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-3.5 rounded-xl border border-[#5B8CFF] text-[#5B8CFF] font-semibold text-base hover:bg-[#EEF3FF] transition-colors bg-white">
                Γράψτε μας στο WhatsApp
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111315] mb-4 leading-tight">
              Συχνές ερωτήσεις
            </h2>
            <p className="text-lg text-[#5B6472] leading-relaxed">
              Έχετε απορίες; Εδώ θα βρείτε όσα μας ρωτούν πιο συχνά οι επιχειρήσεις στην Κρήτη.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-[#F6F6F4] p-4 rounded-xl cursor-pointer group">
                <summary className="flex justify-between items-center font-semibold text-lg text-[#111315] group-open:mb-2">
                  {faq.q}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 ml-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="text-[#5B6472] text-base leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto text-center bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-200/80">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111315] mb-4 leading-tight">
            Θέλετε καινούργια ιστοσελίδα για την επιχείρησή σας στην Κρήτη;
          </h2>
          <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-6 leading-relaxed">
            Ας φτιάξουμε μαζί μια επαγγελματική, γρήγορη ιστοσελίδα που φέρνει πελάτες. Η πρώτη κουβέντα είναι δωρεάν και χωρίς καμία δέσμευση: συζητάμε τι χρειάζεστε και σας δίνουμε ξεκάθαρη προσφορά.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/el/contact/">
              <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                Ζητήστε δωρεάν προσφορά
              </button>
            </Link>
            <Link href="/el/templates/">
              <button className="px-8 py-3.5 rounded-xl border border-gray-300 text-[#111315] font-semibold text-base hover:bg-gray-50 transition-colors bg-white">
                Δείτε παραδείγματα
              </button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
