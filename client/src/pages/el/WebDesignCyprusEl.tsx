import { usePricingCurrency, Price } from "@/contexts/CurrencyContext";
import { BUILD_PRICE_SUMMARY, BUILD_PLANS, BUILD_PRICES } from "@/components/pricing/pricingContent";
// =============================================================================
// /el/web-design-cyprus -- National Cyprus Pillar Page (Greek)
// =============================================================================
import { useStructuredData } from "@/hooks/useStructuredData";
import { serviceSchemaData } from "@/lib/structuredData";
import StarButton from "@/components/ui/star-button";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import AnimateIn from "@/components/AnimateIn";

const WHATSAPP_URL = `https://wa.me/35797472847?text=${encodeURIComponent("Γεια σας! Θα ήθελα να φτιάξω ιστοσελίδα για την επιχείρησή μου.")}`;

const cities = [
  { name: "Λεμεσός", title: "Κατασκευή ιστοσελίδας στη Λεμεσό", link: "Η σελίδα για τη Λεμεσό", slug: "/el/web-design-limassol/", color: "#5B8CFF", bg: "#EEF3FF", desc: "Ναυτιλία, τεχνολογία, δικηγορικά γραφεία, εστίαση και τουρισμός. Μια πόλη με πολύ ανταγωνισμό, όπου μια καλή ιστοσελίδα κάνει τη διαφορά." },
  { name: "Λευκωσία", title: "Κατασκευή ιστοσελίδας στη Λευκωσία", link: "Η σελίδα για τη Λευκωσία", slug: "/el/web-design-nicosia/", color: "#8B5CFF", bg: "#F3EEFF", desc: "Υπουργεία, δικαστήρια, τράπεζες, δικηγορικά και λογιστικά γραφεία. Εδώ ο πελάτης θέλει πρώτα απ’ όλα μια ιστοσελίδα που να εμπνέει εμπιστοσύνη." },
  { name: "Λάρνακα", title: "Κατασκευή ιστοσελίδας στη Λάρνακα", link: "Ζητήστε προσφορά", slug: null, color: "#0EA5E9", bg: "#E0F2FE", desc: "Από τις Φοινικούδες μέχρι τα προάστια: τουρισμός, εμπόριο, εστίαση και επαγγελματίες που θέλουν να τους βρίσκουν εύκολα." },
  { name: "Πάφος", title: "Κατασκευή ιστοσελίδας στην Πάφο", link: "Ζητήστε προσφορά", slug: null, color: "#10B981", bg: "#D1FAE5", desc: "Εδώ είναι η διεύθυνσή μας. Ξενοδοχεία, βίλες, εστιατόρια και μεσιτικά γραφεία, με πολλούς πελάτες από το εξωτερικό." },
  { name: "Αμμόχωστος", title: "Κατασκευή ιστοσελίδας στην επαρχία Αμμοχώστου", link: "Ζητήστε προσφορά", slug: null, color: "#F59E0B", bg: "#FEF3C7", desc: "Αγία Νάπα, Πρωταράς, Παραλίμνι: καταλύματα, εστιατόρια, beach bars και δραστηριότητες που ζουν από τον τουρισμό." },
  { name: "Από απόσταση", title: "Από οπουδήποτε", link: "Ζητήστε προσφορά", slug: null, color: "#EF4444", bg: "#FEE2E2", desc: "Δεν χρειάζεται να είμαστε στην ίδια πόλη. Η συνεργασία γίνεται από απόσταση, με εύρος και χρονοδιάγραμμα που συμφωνούμε από πριν." },
];

const industries = [
  { icon: "🍽️", name: "Εστιατόρια και καφέ", desc: "Μενού, ωράριο, χάρτης και ένα κουμπί για να σας πάρουν τηλέφωνο ή να σας γράψουν στο WhatsApp. Μια γρήγορη ιστοσελίδα, που διαβάζεται άνετα στο κινητό, φέρνει κόσμο στο τραπέζι." },
  { icon: "🏨", name: "Ξενοδοχεία και τουρισμός", desc: "Ξενοδοχεία, βίλες και tour operators θέλουν μια ιστοσελίδα που να τη βρίσκουν στο Google και να πείθει τον επισκέπτη πριν καν φτάσει." },
  { icon: "⚖️", name: "Δικηγορικά γραφεία", desc: "Δικηγόροι και πάροχοι εταιρικών υπηρεσιών χρειάζονται μια σοβαρή και ξεκάθαρη ιστοσελίδα, που να εμπνέει εμπιστοσύνη από την πρώτη ματιά." },
  { icon: "🏠", name: "Μεσιτικά γραφεία και ακίνητα", desc: "Όποιος ψάχνει σπίτι ξεκινά από το ίντερνετ. Τα ακίνητά σας με φωτογραφίες, χάρτη και μια απλή φόρμα, για να σας ζητούν ραντεβού." },
  { icon: "🏥", name: "Ιατρεία και υγεία", desc: "Ιδιωτικά ιατρεία, οδοντίατροι και φυσιοθεραπευτές: οι ασθενείς θέλουν να δουν ποιοι είστε και να κλείσουν ραντεβού χωρίς ταλαιπωρία." },
  { icon: "🛍️", name: "Καταστήματα και μπουτίκ", desc: "Είτε έχετε μπουτίκ στη Λεμεσό είτε μαγαζί στη Λευκωσία, η ιστοσελίδα βοηθά τον πελάτη να σας βρει και να σας εμπιστευτεί πριν μπει στο μαγαζί." },
  { icon: "📊", name: "Λογιστικά γραφεία", desc: "Μια προσεγμένη ιστοσελίδα δείχνει στους εταιρικούς πελάτες ότι είστε σοβαρός συνεργάτης." },
  { icon: "🎓", name: "Φροντιστήρια και σχολές", desc: "Με μια ιστοσελίδα, φροντιστήρια, κέντρα ξένων γλωσσών και ιδιωτικά σχολεία δείχνουν τα τμήματα, τα προγράμματα και τα δίδακτρα, και οι γονείς βρίσκουν εύκολα ό,τι ψάχνουν." },
];

const baseFaqs = [
  {
    q: "Πόσο κοστίζει η κατασκευή ιστοσελίδας;",
    a: BUILD_PRICE_SUMMARY.el
  },
  {
    q: "Τι διαφορά έχει το web design από το web development;",
    a: "Το web design είναι το πώς δείχνει και πώς δουλεύει η ιστοσελίδα για τον επισκέπτη: η διάταξη, τα χρώματα, οι γραμματοσειρές, το πόσο εύκολα βρίσκει κανείς αυτό που ψάχνει. Το web development είναι η τεχνική πλευρά, ο κώδικας που την κάνει να λειτουργεί. Εμείς κάνουμε και τα δύο, οπότε μιλάτε με μία ομάδα και όχι ξεχωριστά με σχεδιαστή και προγραμματιστή."
  },
  {
    q: "Χρειάζομαι ιστοσελίδα, αφού έχω ήδη Facebook ή Instagram;",
    a: "Ναι. Στα social media είστε φιλοξενούμενοι: η πλατφόρμα μπορεί να αλλάξει τον αλγόριθμο, να μειώσει το πόσοι βλέπουν τις αναρτήσεις σας ή ακόμα και να αναστείλει τον λογαριασμό σας. Η ιστοσελίδα είναι δική σας. Και εμφανίζεται στο Google, εκεί που ψάχνει ο κόσμος όταν χρειάζεται μια επιχείρηση. Τα social media και η ιστοσελίδα δουλεύουν μαζί, αλλά η βάση είναι η ιστοσελίδα."
  },
  {
    q: "Σε πόσο καιρό θα είναι έτοιμη η ιστοσελίδα;",
    a: "Το χρονοδιάγραμμα το συμφωνούμε πριν ξεκινήσουμε, ανάλογα με το εύρος και τα υλικά που χρειάζονται. Σας ενημερώνουμε σε κάθε στάδιο. Αλλαγές στο έργο, στο περιεχόμενο ή στα σχόλια μπορεί να επηρεάσουν το πρόγραμμα, και κάθε νέα ημερομηνία τη συμφωνούμε μαζί σας."
  },
  {
    q: "Μπορείτε να φτιάξετε ιστοσελίδα σε ελληνικά και αγγλικά;",
    a: "Ναι. Οι ιστοσελίδες σε περισσότερες από μία γλώσσες γίνονται ως έργο Enterprise / Custom, γιατί το κόστος εξαρτάται από τις γλώσσες, το περιεχόμενο και το αν θέλετε να κάνετε αλλαγές μόνοι σας. Πείτε μας ποιες γλώσσες χρειάζεστε και θα σας δώσουμε προσφορά."
  },
  {
    q: "Περιλαμβάνεται SEO στα πακέτα;",
    a: "Ναι. Κάθε ιστοσελίδα έχει τις βάσεις του SEO: σωστή σειρά επικεφαλίδων, τίτλους και περιγραφές για το Google, γρήγορη φόρτωση και responsive σχεδιασμό. Το Growth προσθέτει τη ρύθμιση Search Console και Analytics, και το Pro μια πιο ολοκληρωμένη δομή SEO. Αν θέλετε συνεχή δουλειά, όπως έρευνα λέξεων-κλειδιών, περιεχόμενο και link building, τη συμφωνούμε ξεχωριστά."
  },
  {
    q: "Δουλεύετε και με επιχειρήσεις εκτός Λεμεσού και Λευκωσίας;",
    a: "Ναι, και όχι μόνο στις πόλεις που βλέπετε εδώ. Η συνεργασία γίνεται από απόσταση: η κουβέντα, ο σχεδιασμός, οι διορθώσεις και η παράδοση γίνονται μέσω WhatsApp, email και βιντεοκλήσεων, με ένα πλάνο που συμφωνούμε από την αρχή."
  }
];

const whyUs = [
  { icon: "⚡", title: "Γρήγορη παράδοση", desc: "Δουλεύουμε με πλάνο και ξέρετε πάντα ποιο είναι το επόμενο βήμα." },
  { icon: "📱", title: "Responsive σχεδιασμός", desc: "Πολλοί θα σας γνωρίσουν πρώτα από το κινητό. Γι’ αυτό σχεδιάζουμε πρώτα για τη μικρή οθόνη." },
  { icon: "🔍", title: "SEO από την αρχή", desc: "Οι βάσεις του SEO είναι σε κάθε πακέτο: τίτλοι, περιγραφές, σωστή δομή και γρήγορη φόρτωση." },
  { icon: "💬", title: "Υποστήριξη στο WhatsApp", desc: "Μας γράφετε στο WhatsApp, όχι σε σύστημα με tickets, και σας απαντά άνθρωπος που ξέρει το έργο σας." },
  { icon: "💶", title: "Ξεκάθαρες τιμές", desc: "Εύρος και τιμή τα συμφωνούμε από πριν. Χωρίς χρέωση με την ώρα και χωρίς εκπλήξεις στο τιμολόγιο." },
  { icon: "🌍", title: "Και σε άλλες γλώσσες", desc: "Αν οι πελάτες σας μιλούν και αγγλικά ή άλλες γλώσσες, φτιάχνουμε την ιστοσελίδα σε περισσότερες γλώσσες, ως έργο Enterprise / Custom." },
];

export default function WebDesignCyprusEl() {
  const { copy, euro } = usePricingCurrency("el");
  const faqs = copy(baseFaqs);

  useSEO({
    title: "Κατασκευή ιστοσελίδας για τοπικές επιχειρήσεις | DM-Labs.io",
    description: "Ιστοσελίδα για την επιχείρησή σας, στημένη για να φέρνει μηνύματα και τηλεφωνήματα: άψογη στο κινητό και με γερές βάσεις SEO. Δωρεάν συμβουλευτική.",
    canonicalPath: "/el/web-design-cyprus/"
  });

  useStructuredData("location-jsonld-schema", serviceSchemaData("https://dm-labs.io/el/web-design-cyprus/", "el", "Κατασκευή ιστοσελίδων", "Ιστοσελίδες για επιχειρήσεις, σχεδιασμένες από το μηδέν, με συνεργασία από απόσταση.", faqs));

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">

      {/* -- HERO -- */}
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#F0EAFF]">
        <div className="container max-w-4xl mx-auto text-center">
          <AnimateIn>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">
              Κατασκευή ιστοσελίδων
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111315] mb-4 leading-tight">
              Κατασκευή ιστοσελίδας{" "}
              <span className="bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] bg-clip-text text-transparent">
                για την επιχείρησή σας
              </span>
            </h1>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-6 leading-relaxed">
              Η DM-Labs.io σχεδιάζει και φτιάχνει ιστοσελίδες για επιχειρήσεις, από την πρώτη ιδέα μέχρι να βγουν στον αέρα. Γρήγορες, responsive και στημένες σωστά για το Google, για να σας βρίσκουν οι πελάτες και να σας στέλνουν μήνυμα.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/el/contact/">
                <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                  Ζητήστε δωρεάν προσφορά
                </button>
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-8 py-3.5 rounded-xl bg-white border border-[#E8EAF0] text-[#111315] font-semibold text-base hover:bg-[#F8F9FC] transition-colors shadow-sm">
                  Γράψτε μας στο WhatsApp
                </button>
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* -- ΧΡΕΙΑΖΕΤΑΙ Η ΕΠΙΧΕΙΡΗΣΗ ΣΑΣ ΙΣΤΟΣΕΛΙΔΑ -- */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-6">
              Χρειάζεται η επιχείρησή σας ιστοσελίδα;
            </h2>
            <div className="prose prose-lg max-w-none text-[#5B6472] leading-relaxed space-y-5">
              <p>
                Με δυο λόγια, ναι. Πριν αγοράσει κάτι ή κλείσει ένα ραντεβού, ο πελάτης ψάχνει πρώτα στο Google. Αν η επιχείρησή σας δεν εμφανίζεται εκεί, για πολλούς απλώς δεν υπάρχει. Και όσο περνάει ο καιρός, τόσο περισσότερο κοστίζει <strong>να μην έχετε ιστοσελίδα</strong>.
              </p>
              <p>
                <strong>Η κατασκευή ιστοσελίδας</strong> έχει αλλάξει πολύ τα τελευταία χρόνια. Μια απλή σελίδα με τα στοιχεία σας δεν φτάνει πια. Από ένα εστιατόριο στη Λεμεσό μέχρι ένα δικηγορικό γραφείο στη Λευκωσία, ένα ξενοδοχείο στην Πάφο ή ένα ιατρείο στη Λάρνακα, όλοι χρειάζονται μια ιστοσελίδα που ανοίγει γρήγορα στο κινητό, εμφανίζεται στο Google και φέρνει τηλεφωνήματα, μηνύματα και κρατήσεις.
              </p>
              <p>
                Αυτό ακριβώς φτιάχνουμε στη DM-Labs.io: <strong>επαγγελματικές ιστοσελίδες για επιχειρήσεις</strong>. Κάθε ιστοσελίδα είναι responsive, έχει τις βάσεις του SEO από την πρώτη μέρα και είναι σχεδιασμένη για να δείχνει η επιχείρησή σας σοβαρή και αξιόπιστη.
              </p>
              <p>
                Είτε ψάχνετε την πρώτη σας ιστοσελίδα, είτε έχετε εστιατόριο και θέλετε το μενού online, είτε θέλετε απλώς περισσότερους πελάτες από το Google, ξεκινάμε από <strong>τους στόχους σας</strong> και σχεδιάζουμε με βάση αυτούς.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* -- ΤΙ ΦΤΙΑΧΝΟΥΜΕ -- */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">
              Τι φτιάχνουμε για επιχειρήσεις
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              Αναλαμβάνουμε <strong>τον σχεδιασμό και την κατασκευή της ιστοσελίδας</strong> από την αρχή ως το τέλος: από την πρώτη ιδέα μέχρι να βγει στον αέρα, και μετά.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Εταιρικές ιστοσελίδες", desc: "Ολοκληρωμένες ιστοσελίδες για επιχειρήσεις υπηρεσιών, συμβούλους και τοπικές επιχειρήσεις. Καθαρός σχεδιασμός, γρήγορη φόρτωση και σωστή δομή για το Google." },
              { title: "Ιστοσελίδες για ξενοδοχεία και τουρισμό", desc: "Όλες οι πληροφορίες που ψάχνει ο επισκέπτης, σε σελίδες που διαβάζονται άνετα στο κινητό, με τρόπο να σας ρωτήσει ή να κάνει κράτηση όπου χρειάζεται." },
              { title: "Ακίνητα και portfolio", desc: "Ιστοσελίδες που δείχνουν ακίνητα, έργα, γκαλερί και φωτογραφική δουλειά όπως τους αξίζει." },
              { title: "Επαγγελματικές υπηρεσίες", desc: "Ξεκάθαρες σελίδες υπηρεσιών, φόρμες επικοινωνίας, χάρτης και κριτικές, για δικηγόρους, λογιστές, ιατρεία και συμβούλους." },
              { title: "Enterprise / Custom", desc: "Για πιο σύνθετα έργα: συνδέσεις με άλλα συστήματα, CRM ή κρατήσεις, ιστοσελίδα σε πολλές γλώσσες, λειτουργίες AI και ό,τι άλλο ξεφεύγει από τα πακέτα." },
              { title: "Φιλοξενία και συντήρηση", desc: "Με το Basic Care ή το Complete Care αναλαμβάνουμε τη φιλοξενία, τα backup, τις διορθώσεις, τις αλλαγές στο περιεχόμενο και την υποστήριξη." },
            ].map((item) => (
              <AnimateIn key={item.title}>
                <div className="bg-white rounded-2xl p-6 border border-[#E8EAF0] shadow-sm h-full">
                  <h3 className="font-bold text-[#111315] text-base mb-2">{item.title}</h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* -- ΚΛΑΔΟΙ -- */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">
              Κλάδοι που εξυπηρετούμε
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              Μερικοί από τους κλάδους για τους οποίους φτιάχνουμε ιστοσελίδες:
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {industries.map((ind) => (
              <AnimateIn key={ind.name}>
                <div className="flex gap-4 bg-[#F8F9FC] rounded-2xl p-5 border border-[#E8EAF0]">
                  <span className="text-2xl mt-0.5">{ind.icon}</span>
                  <div>
                    <h3 className="font-bold text-[#111315] text-sm mb-1">{ind.name}</h3>
                    <p className="text-[#5B6472] text-sm leading-relaxed">{ind.desc}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* -- ΤΙΜΕΣ -- */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-3">
              Τιμές κατασκευής ιστοσελίδας
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              Ξεκάθαρες τιμές, χωρίς χρέωση με την ώρα και χωρίς εκπλήξεις στο τιμολόγιο. Τόσο κοστίζει μια ιστοσελίδα με τη DM-Labs.io:
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {BUILD_PLANS.el.map((plan, index) => ({ ...plan, desc: plan.summary, price: euro(BUILD_PRICES[index]), highlight: index === 1 })).map((pkg) => (
              <AnimateIn key={pkg.name}>
                <div className={`rounded-2xl p-6 border h-full flex flex-col ${pkg.highlight ? "bg-gradient-to-br from-[#5B8CFF] to-[#8B5CFF] border-transparent text-white shadow-lg" : "bg-white border-[#E8EAF0] text-[#111315] shadow-sm"}`}>
                  <div className="mb-4">
                    <span className={`text-xs font-bold uppercase tracking-widest ${pkg.highlight ? "text-blue-100" : "text-[#5B8CFF]"}`}>{pkg.name}</span>
                    <div className={`text-4xl font-extrabold mt-1 ${pkg.highlight ? "text-white" : "text-[#111315]"}`}>{pkg.price}</div>
                  </div>
                  <p className={`text-sm mb-5 leading-relaxed ${pkg.highlight ? "text-blue-100" : "text-[#5B6472]"}`}>{pkg.desc}</p>
                  <ul className="flex flex-col gap-2 mb-6 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className={`flex items-center gap-2 text-sm ${pkg.highlight ? "text-white" : "text-[#5B6472]"}`}>
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${pkg.highlight ? "bg-white/20 text-white" : "bg-[#EEF3FF] text-[#5B8CFF]"}`}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/el/contact/">
                    <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${pkg.highlight ? "bg-white text-[#5B8CFF] hover:bg-blue-50" : "bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white hover:opacity-90"}`}>
                      Ζητήστε δωρεάν προσφορά
                    </button>
                  </Link>
                </div>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn>
            <p className="text-center text-sm text-[#5B6472] mt-8">
              Η κατασκευή πληρώνεται μία φορά. Όσο διαχειριζόμαστε την ιστοσελίδα σας, χρειάζεται και πακέτο φιλοξενίας και συντήρησης, από <Price euros={69} locale="el" />/μήνα. Οι τιμές δεν περιλαμβάνουν τυχόν φόρους και χρεώσεις τρίτων που συμφωνούνται ξεχωριστά.{" "}
              <Link href="/el/pricing/">
                <span className="text-[#5B8CFF] font-semibold hover:underline cursor-pointer">Όλες οι τιμές</span>
              </Link>
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* -- ΓΙΑΤΙ DM-LABS.IO -- */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">
              Γιατί να διαλέξετε τη DM-Labs.io
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              <strong>Web designers</strong> υπάρχουν πολλοί. Αυτό που κάνουμε αλλιώς:
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map((item) => (
              <AnimateIn key={item.title}>
                <div className="bg-[#F8F9FC] rounded-2xl p-5 border border-[#E8EAF0]">
                  <span className="text-2xl mb-3 block">{item.icon}</span>
                  <h3 className="font-bold text-[#111315] text-sm mb-1">{item.title}</h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* -- ΠΟΛΕΙΣ -- */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">
              Όπου κι αν βρίσκεστε
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              Δουλεύουμε με επιχειρήσεις σε κάθε πόλη. Για τη Λεμεσό και τη Λευκωσία έχουμε ξεχωριστές σελίδες. Για όλες τις άλλες περιοχές, απλώς ζητήστε μας προσφορά.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cities.map((city) => (
              <AnimateIn key={city.name}>
                <div className="bg-white rounded-2xl p-5 border border-[#E8EAF0] shadow-sm h-full flex flex-col">
                  <h3 className="font-bold text-[#111315] text-base mb-2">
                    {city.title}
                  </h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed flex-1 mb-4">{city.desc}</p>
                  {city.slug ? (
                    <Link href={city.slug}>
                      <span style={{ color: city.color }} className="text-sm font-semibold hover:underline cursor-pointer">
                        {city.link}
                      </span>
                    </Link>
                  ) : (
                    <Link href="/el/contact/">
                      <span style={{ color: city.color }} className="text-sm font-semibold hover:underline cursor-pointer">
                        {city.link}
                      </span>
                    </Link>
                  )}
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* -- ΠΩΣ ΔΟΥΛΕΥΟΥΜΕ -- */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">
              Πώς αποκτάτε ιστοσελίδα για την επιχείρησή σας
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              Με τη DM-Labs.io, μια <strong>επαγγελματική ιστοσελίδα</strong> είναι θέμα τεσσάρων απλών βημάτων:
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: "01", title: "Δωρεάν συμβουλευτική", desc: "Μας λέτε για την επιχείρηση, τους στόχους και τον προϋπολογισμό σας. Σας προτείνουμε το πακέτο που σας ταιριάζει και απαντάμε σε ό,τι ρωτήσετε, χωρίς δέσμευση." },
              { step: "02", title: "Σχεδιασμός και κατασκευή", desc: "Σχεδιάζουμε την ιστοσελίδα και σας στέλνουμε μια προεπισκόπηση για να πείτε τη γνώμη σας. Τίποτα δεν δημοσιεύεται πριν το εγκρίνετε." },
              { step: "03", title: "Διορθώσεις και έγκριση", desc: "Ελέγχετε την ιστοσελίδα, κάνουμε τις τελευταίες αλλαγές και δίνετε το «ναι» για δημοσίευση." },
              { step: "04", title: "Στον αέρα, με υποστήριξη", desc: "Η ιστοσελίδα βγαίνει online. Αναλαμβάνουμε τα τεχνικά, δηλαδή τη σύνδεση του domain, τη φιλοξενία και το SSL, και είμαστε δίπλα σας και μετά." },
            ].map((s) => (
              <AnimateIn key={s.step}>
                <div className="bg-[#F8F9FC] rounded-2xl p-5 border border-[#E8EAF0]">
                  <span className="text-3xl font-extrabold text-[#5B8CFF] opacity-30 block mb-2">{s.step}</span>
                  <h3 className="font-bold text-[#111315] text-sm mb-2">{s.title}</h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* -- ΣΥΝΕΡΓΑΣΙΑ ΑΠΟ ΑΠΟΣΤΑΣΗ -- */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-3">
              Συνεργασία από απόσταση
            </h2>
            <p className="text-[#5B6472] mb-8 leading-relaxed">
              Η DM-Labs.io δουλεύει με επιχειρήσεις παντού. Συζητάμε τους στόχους σας, συμφωνούμε εύρος και χρονοδιάγραμμα, και σας ενημερώνουμε σε κάθε βήμα. Όλη η συνεργασία γίνεται από απόσταση.
            </p>
          </AnimateIn>
          <StarButton asChild><Link href="/el/contact/" className="btn-primary">Ας τα πούμε</Link></StarButton>
        </div>
      </section>

      {/* -- ΣΥΧΝΕΣ ΕΡΩΤΗΣΕΙΣ -- */}
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-10">
              Συχνές ερωτήσεις για την κατασκευή ιστοσελίδας
            </h2>
          </AnimateIn>
          <div className="flex flex-col gap-6">
            {faqs.map((faq) => (
              <AnimateIn key={faq.q}>
                <div className="bg-[#F8F9FC] rounded-2xl p-6 border border-[#E8EAF0] shadow-sm">
                  <h3 className="font-bold text-[#111315] text-base mb-3">{faq.q}</h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{faq.a}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* -- CTA -- */}
      <section className="section-spacing bg-gradient-to-br from-[#5B8CFF] to-[#8B5CFF]">
        <div className="container max-w-3xl mx-auto text-center">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ας φτιάξουμε την ιστοσελίδα της επιχείρησής σας.
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Πείτε μας δυο λόγια για την επιχείρησή σας. Μόλις καταλάβουμε τι χρειάζεστε, σας στέλνουμε δωρεάν πρόταση, χωρίς δέσμευση. Μπορείτε επίσης να μας γράψετε κατευθείαν στο WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/el/contact/">
                <button className="px-10 py-4 rounded-xl bg-white text-[#5B8CFF] font-bold text-base hover:bg-blue-50 transition-colors shadow-lg">
                  Δωρεάν συμβουλευτική
                </button>
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-10 py-4 rounded-xl bg-white/20 border border-white/40 text-white font-bold text-base hover:bg-white/30 transition-colors">
                  Γράψτε μας στο WhatsApp
                </button>
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

    </main>
  );
}
