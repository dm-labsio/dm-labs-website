/* ============================================================
   DM-Labs.io — Σελίδα Τιμών (Greek)
   ============================================================ */
import { useSEO } from "@/hooks/useSEO";
import AnimateIn from "@/components/AnimateIn";
import { CheckCircle2, MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/35797472847?text=%CE%93%CE%B5%CE%B9%CE%B1%20DM-Labs.io!%20%CE%98%CE%B1%20%CE%AE%CE%B8%CE%B5%CE%BB%CE%B1%20%CE%BD%CE%B1%20%CF%83%CF%85%CE%B6%CE%B7%CF%84%CE%AE%CF%83%CF%89%20%CE%B3%CE%B9%CE%B1%20%CE%BC%CE%B9%CE%B1%20%CE%B9%CF%83%CF%84%CE%BF%CF%83%CE%B5%CE%BB%CE%AF%CE%B4%CE%B1.";

const packages = [
  {
    name: "Launch Website",
    price: "€299",
    description: "Για μια μικρή επιχείρηση που χρειάζεται μια καθαρή, επαγγελματική online παρουσία.",
    features: ["Μικρή ιστοσελίδα μίας ή ελαφριάς δύο σελίδων", "Responsive κατασκευή", "Βασικές SEO βάσεις", "WhatsApp και σύνδεσμοι social media", "2 γύροι αναθεωρήσεων"],
  },
  {
    name: "Growth Website",
    price: "€749",
    description: "Για επιχειρήσεις που χρειάζονται περισσότερες υπηρεσίες, πληροφορίες και καθαρές διαδρομές επικοινωνίας.",
    features: ["Έως 4 σελίδες", "Φόρμα επικοινωνίας", "Google Maps και reviews / testimonials", "Βασικό SEO", "Ρύθμιση Search Console και Analytics", "3 γύροι αναθεωρήσεων"],
  },
  {
    name: "Pro Website",
    price: "€1,499",
    description: "Για επιχειρήσεις που χρειάζονται πλουσιότερη παρουσίαση και πιο ολοκληρωμένη SEO δομή.",
    features: ["Έως 7 σελίδες", "Gallery ή portfolio", "Pop-up και animations με scroll", "Πλήρης SEO δομή", "Ρύθμιση blog ή website visual pack", "4 γύροι αναθεωρήσεων"],
  },
];

const carePlans = [
  { name: "Basic Care", price: "€69 / μήνα", features: ["Monitoring hosting", "Backups και διόρθωση bugs", "Υποστήριξη μέσω WhatsApp", "Έως 3 μικρές ενημερώσεις περιεχομένου κάθε μήνα", "Χωρίς συμβόλαιο — ακύρωση οποιαδήποτε στιγμή"] },
  { name: "Complete Care", price: "€129 / μήνα", features: ["Όλα όσα περιλαμβάνει το Basic Care", "Απεριόριστες λογικές ενημερώσεις", "Priority WhatsApp support", "Μηνιαίος έλεγχος απόδοσης", "Ένα απλό banner ή section update τον μήνα", "Χωρίς συμβόλαιο — ακύρωση οποιαδήποτε στιγμή"] },
];

const faqs = [
  { q: "Πόσο κοστίζει μια ιστοσελίδα;", a: "Το Launch Website ξεκινά από €299, το Growth Website από €749 και το Pro Website από €1.499. Η τιμή για Enterprise / Custom έργα προσαρμόζεται στο εύρος του έργου σας." },
  { q: "Τι είναι Enterprise / Custom;", a: "Είναι το scope για έργα πέρα από τα standard πακέτα, όπως integrations, πολύγλωσσες ιστοσελίδες, CMS για self-editing, AI ή chatbot features, complex motion, CRM ή booking και ασυνήθιστα μεγάλο όγκο περιεχομένου." },
  { q: "Τι δεν περιλαμβάνει το πακέτο συντήρησης;", a: "Νέες σελίδες, copywriting, επιπλέον γύροι αναθεωρήσεων πέρα από το πακέτο σας, νέες integrations, redesigns, advanced ή full SEO structure και complex content migration δεν περιλαμβάνονται και κοστολογούνται ξεχωριστά." },
  { q: "Υπάρχει συμβόλαιο για το website care;", a: "Όχι. Τα Basic Care και Complete Care δεν έχουν συμβόλαιο και μπορούν να ακυρωθούν οποιαδήποτε στιγμή." },
];

export default function PricingEl() {
  useSEO({
    title: "Τιμές Κατασκευής Ιστοσελίδας | DM-Labs.io",
    description: "Διαφανείς τιμές κατασκευής ιστοσελίδας: Launch από €299, Growth από €749, Pro από €1.499 και custom scope από DM-Labs.io.",
  });

  return (
    <main className="min-w-0 overflow-x-hidden bg-[#F6F6F4]">
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(4rem, 8vh, 6rem)" }}>
        <div className="container relative z-10 text-center">
          <AnimateIn><p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Διαφανείς Τιμές</p><h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5">Ιστοσελίδες με <span className="brand-gradient-text">Καθαρό Scope</span></h1><p className="text-lg text-[#5B6472] max-w-2xl mx-auto">Επιλέξτε μια καθαρή αρχική επιλογή για την επιχείρησή σας ή ζητήστε custom προσφορά για πιο σύνθετες ανάγκες.</p></AnimateIn>
        </div>
      </section>

      <section className="section-spacing bg-white"><div className="container"><div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-5xl mx-auto">{packages.map((plan, index) => <AnimateIn key={plan.name} delay={index * 0.1}><article className={index === 1 ? "brand-gradient-border h-full" : "h-full"}><div className="dm-card h-full flex flex-col"><p className="text-sm font-semibold text-[#5B8CFF] uppercase tracking-wide mb-2">{plan.name}</p><p className="text-4xl font-bold text-[#111315] mb-4">{plan.price}</p><p className="text-sm text-[#5B6472] mb-6 leading-relaxed">{plan.description}</p><ul className="space-y-3 mb-8 flex-1">{plan.features.map((feature) => <li key={feature} className="flex items-start gap-2.5 text-sm text-[#111315]"><CheckCircle2 size={16} className="text-[#5B8CFF] shrink-0 mt-0.5" />{feature}</li>)}</ul><a href="/el/contact/" className={index === 1 ? "btn-primary w-full justify-center" : "btn-secondary w-full justify-center"}><MessageCircle size={16} /> Δωρεάν Συμβουλευτική</a></div></article></AnimateIn>)}</div>
        <AnimateIn delay={0.35} className="mt-8 max-w-5xl mx-auto"><section className="rounded-2xl p-8 text-white" style={{ background: "linear-gradient(135deg, #0d1117 0%, #161b2e 50%, #0d1117 100%)" }}><div className="flex flex-col lg:flex-row lg:items-center gap-8"><div className="flex-shrink-0 lg:w-72"><p className="text-sm font-semibold text-[#6FE3FF] uppercase tracking-wide">Enterprise / Custom</p><h2 className="text-3xl font-bold mt-1 enterprise-scope-title">Τιμή προσαρμοσμένη στο εύρος του έργου σας</h2><p className="text-white/70 text-sm mt-3">Για έργα με σύνθετες ανάγκες, προσαρμοσμένα γύρω από τους στόχους και το κοινό σας.</p><a href="/el/contact/" className="btn-primary shrink-0 mt-6">Ζητήστε Προσφορά</a></div><div className="grid flex-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">{["Στρατηγική branding και οπτική ταυτότητα", "Ενσωματώσεις CRM, κρατήσεων και συλλογής leads", "Πολύγλωσση ιστοσελίδα και CMS για αυτοδιαχείριση", "Εξατομικευμένη στρατηγική SEO και αναφορές απόδοσης", "UX και δομή περιεχομένου για το κοινό σας", "Προηγμένες φόρμες και αυτοματοποιημένη δρομολόγηση αιτημάτων", "AI ή chatbot λειτουργίες όπου χρειάζονται", "Υπεύθυνος έργου και συνεχής βελτιστοποίηση"].map(item => <div key={item} className="flex items-start gap-2.5 text-sm text-white/80"><CheckCircle2 size={16} className="text-[#6FE3FF] shrink-0 mt-0.5" />{item}</div>)}</div></div></section></AnimateIn>
      </div></section>

      <section className="section-spacing"><div className="container max-w-5xl"><AnimateIn><h2 className="text-3xl sm:text-4xl font-bold text-[#111315] text-center mb-4">Website Care</h2><p className="text-[#5B6472] text-center mb-10 max-w-2xl mx-auto">Προαιρετική μηνιαία φροντίδα για monitoring, backups, fixes, περιεχόμενο και υποστήριξη.</p></AnimateIn><div className="grid grid-cols-1 md:grid-cols-2 gap-7">{carePlans.map((plan, index) => <AnimateIn key={plan.name} delay={index * 0.1}><article className={index === 1 ? "brand-gradient-border h-full" : "h-full"}><div className="dm-card h-full"><p className="text-sm font-semibold text-[#5B8CFF] uppercase tracking-wide mb-2">{plan.name}</p><p className="text-3xl font-bold text-[#111315] mb-6">{plan.price}</p><ul className="space-y-3">{plan.features.map((feature) => <li key={feature} className="flex items-start gap-2.5 text-sm text-[#111315]"><CheckCircle2 size={16} className="text-[#5B8CFF] shrink-0 mt-0.5" />{feature}</li>)}</ul></div></article></AnimateIn>)}</div><AnimateIn delay={0.25}><p className="text-sm text-[#5B6472] leading-relaxed rounded-xl bg-white border border-[#E2E5EA] p-5 mt-7">Δεν περιλαμβάνονται στα πακέτα care: νέες σελίδες, copywriting, επιπλέον γύροι αναθεωρήσεων πέρα από το πακέτο σας, νέες integrations, redesigns, advanced ή full SEO structure και complex content migration. Αυτές οι εργασίες κοστολογούνται ξεχωριστά.</p></AnimateIn></div></section>

      <section className="section-spacing bg-white"><div className="container max-w-3xl"><AnimateIn><h2 className="text-3xl font-bold text-[#111315] text-center mb-8">Συχνές Ερωτήσεις για Τιμές</h2></AnimateIn><div className="space-y-4">{faqs.map((item) => <AnimateIn key={item.q}><article className="dm-card !p-6"><h3 className="font-semibold text-[#111315] mb-2">{item.q}</h3><p className="text-sm text-[#5B6472] leading-relaxed">{item.a}</p></article></AnimateIn>)}</div></div></section>

      <section className="section-spacing dark-section text-center"><div className="container"><AnimateIn><h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Δεν είστε σίγουροι ποιο scope χρειάζεστε;</h2><p className="text-lg text-[#94A3B8] mb-8 max-w-xl mx-auto">Μιλήστε με το DM-Labs.io για να βρούμε το κατάλληλο σημείο εκκίνησης για την επιχείρησή σας.</p><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary"><MessageCircle size={18} /> Μιλήστε μαζί μας στο WhatsApp</a></AnimateIn></div></section>
    </main>
  );
}
