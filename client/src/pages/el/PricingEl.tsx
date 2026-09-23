import StarButton from "@/components/ui/star-button";
import LocalizedPricingJourney, { PricingSteps } from "@/components/LocalizedPricingJourney";
/* ============================================================
   DM-Labs.io — Σελίδα Τιμών (Greek)
   Mirrors the approved English pricing structure.
   ============================================================ */
import { useSEO } from "@/hooks/useSEO";
import CinematicHeroBackground from "@/components/CinematicHeroBackground";
import { Link } from "wouter";
import AnimateIn from "@/components/AnimateIn";
import { ArrowRight, CheckCircle2, HelpCircle, MessageCircle, ShieldCheck, X } from "lucide-react";

const GRADIENT_BG = "/media/cloudfront/gradient-mesh-bg-nrkTNmAHHWeVJB3ubHRGDu.webp";
const WHATSAPP_URL = "https://wa.me/35797472847?text=%CE%93%CE%B5%CE%B9%CE%B1%20DM-Labs.io!%20%CE%98%CE%B1%20%CE%AE%CE%B8%CE%B5%CE%BB%CE%B1%20%CE%BD%CE%B1%20%CF%83%CF%85%CE%B6%CE%B7%CF%84%CE%AE%CF%83%CF%89%20%CE%B3%CE%B9%CE%B1%20%CE%BC%CE%B9%CE%B1%20%CE%B9%CF%83%CF%84%CE%BF%CF%83%CE%B5%CE%BB%CE%AF%CE%B4%CE%B1.";
type PlanValue = boolean | string;

const buildPlans = [
  { name: "Launch Website", price: "€299", tone: "#5B8CFF", summary: "Μια καθαρή, επαγγελματική online παρουσία για μια νέα επιχείρηση που θέλει να ξεκινήσει σωστά.", features: ["Μικρή ιστοσελίδα μίας ή ελαφριάς δύο σελίδων", "Responsive κατασκευή", "Βασικές SEO βάσεις", "WhatsApp και σύνδεσμοι social media", "2 γύροι αναθεωρήσεων"] },
  { name: "Growth Website", price: "€749", tone: "#8B5CFF", recommended: true, summary: "Ένα site με έμφαση στις μετατροπές, για επιχείρηση που θέλει να τη βρίσκουν, να την εμπιστεύονται και να επικοινωνούν μαζί της.", features: ["Έως 4 σελίδες", "Φόρμα επικοινωνίας", "Google Maps και ενότητα reviews / testimonials", "Βασικό SEO", "Ρύθμιση Search Console και Analytics", "3 γύροι αναθεωρήσεων"] },
  { name: "Pro Website", price: "€1,499", tone: "#6B3FD4", summary: "Μια πιο ολοκληρωμένη ψηφιακή παρουσία με πλουσιότερο περιεχόμενο, motion και ισχυρότερη βάση αναζήτησης.", features: ["Έως 7 σελίδες", "Gallery ή portfolio", "Pop-up και animations με scroll", "Πλήρης SEO δομή", "Ρύθμιση blog ή website visual pack", "4 γύροι αναθεωρήσεων"] },
];



const comparison: Array<{ feature: string; launch: PlanValue; growth: PlanValue; pro: PlanValue }> = [
  { feature: "Σελίδες", launch: "1 ή ελαφριές 2", growth: "Έως 4", pro: "Έως 7" },
  { feature: "Responsive κατασκευή", launch: true, growth: true, pro: true },
  { feature: "WhatsApp και social links", launch: true, growth: true, pro: true },
  { feature: "Βασικές SEO βάσεις", launch: true, growth: true, pro: true },
  { feature: "Φόρμα επικοινωνίας", launch: false, growth: true, pro: true },
  { feature: "Google Maps", launch: false, growth: true, pro: true },
  { feature: "Ενότητα reviews ή testimonials", launch: false, growth: true, pro: true },
  { feature: "Search Console και Analytics", launch: false, growth: true, pro: true },
  { feature: "Gallery ή portfolio", launch: false, growth: false, pro: true },
  { feature: "Pop-up και animations με scroll", launch: false, growth: false, pro: true },
  { feature: "Πλήρης SEO δομή", launch: false, growth: false, pro: true },
  { feature: "Blog setup ή visual pack", launch: false, growth: false, pro: true },
  { feature: "Γύροι αναθεωρήσεων", launch: "2", growth: "3", pro: "4" },
];

function PlanCell({ value, colour }: { value: PlanValue; colour: string }) {
  if (typeof value === "boolean") return value ? <CheckCircle2 size={18} className="mx-auto" style={{ color: colour }} /> : <X size={18} className="text-[#D1D5DB] mx-auto" />;
  return <span className="text-sm text-[#5B6472]">{value}</span>;
}

export default function PricingEl() {
  useSEO({ title: "Τιμές Κατασκευής Ιστοσελίδας | DM-Labs.io", description: "Πόσο κοστίζει μια ιστοσελίδα; Δείτε καθαρές τιμές web design, πακέτα ιστοσελίδας και custom scope από το DM-Labs.io." });

  return (
    <div className="pricing-editorial pricing-journey" lang="el">
      <section className="cinematic-hero-surface pricing-editorial-hero relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(4rem, 8vh, 6rem)" }}>
        <CinematicHeroBackground kind="pricing" />
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"><img src={GRADIENT_BG} alt="" className="w-full h-full object-cover" aria-hidden="true" /></div>
        <div className="container relative z-10 text-center"><AnimateIn><p className="pricing-editorial-label">Διαφανείς Τιμές</p><h1 className="pricing-editorial-hero-heading">Τιμές <span><em>Ιστοσελίδας</em></span></h1><p className="pricing-editorial-hero-lead">Φτιαγμένη για εσάς. Με τη δική μας φροντίδα. Επιλέξτε ιστοσελίδα και μετά τη φιλοξενία και συντήρησή της.</p><PricingSteps locale="el" /></AnimateIn></div>
      </section>

      <LocalizedPricingJourney locale="el" plans={buildPlans} custom={<AnimateIn delay={0.45} className="mt-8 max-w-5xl mx-auto"><div className="pricing-editorial-custom-panel rounded-2xl overflow-hidden"><div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 p-8"><div className="flex-shrink-0 lg:w-72"><span className="pricing-editorial-custom-kicker">Χτισμένο για το δικό σας Scope</span><p className="pricing-editorial-plan-label">Enterprise / Custom</p><p className="pricing-editorial-custom-price">Τιμή προσαρμοσμένη στο scope σας</p><p className="pricing-editorial-custom-note">Προσφορά βάσει του scope</p><p className="pricing-editorial-custom-copy">Για έργα πέρα από τα standard πακέτα, όπως integrations, πολυγλωσσά sites, CMS για αυτοδιαχείριση, AI ή chatbot features, complex motion, CRM ή booking και ασυνήθιστο όγκο περιεχομένου.</p><Link href="/el/contact/" className="pricing-editorial-custom-cta"><MessageCircle size={16} /> Ζητήστε Προσφορά</Link></div><div className="pricing-editorial-custom-grid flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">{["Στρατηγική branding και οπτική ταυτότητα", "CRM, κρατήσεις και ενσωματώσεις συλλογής leads", "Πολυγλωσσες ιστοσελίδες και CMS για αυτοδιαχείριση", "Εξατομικευμένη στρατηγική SEO και αναφορές απόδοσης", "UX και δομή περιεχομένου για το κοινό σας", "Προηγμένες φόρμες και αυτοματοποιημένη δρομολόγηση αιτημάτων", "AI ή chatbot λειτουργίες όπου είναι χρήσιμες", "Αφοσιωμένη υποστήριξη έργου και συνεχής βελτιστοποίηση"].map((item) => <div key={item} className="pricing-editorial-custom-feature flex items-start gap-2.5"><CheckCircle2 size={16} className="shrink-0 mt-0.5" /><span>{item}</span></div>)}</div></div></div></AnimateIn>} />

      <section className="pricing-editorial-compare section-spacing"><div className="container"><AnimateIn className="pricing-editorial-section-intro text-center"><p className="pricing-editorial-label">Οι Λεπτομέρειες</p><h2 className="pricing-editorial-section-heading">Σύγκριση <em>Πακέτων</em></h2></AnimateIn><AnimateIn delay={0.1}><div className="overflow-x-auto rounded-2xl border border-[#E8EAF0] max-w-4xl mx-auto"><table className="text-sm" style={{ minWidth: "560px", width: "100%" }}><thead><tr className="border-b border-[#E8EAF0]"><th className="text-left py-4 px-4 font-semibold text-[#111315]">Λειτουργία</th><th className="py-4 px-4 font-semibold text-[#5B8CFF] text-center">Launch<br /><span className="font-normal text-xs text-[#5B6472]">€299</span></th><th className="py-4 px-4 font-semibold text-[#8B5CFF] text-center bg-[#8B5CFF]/[0.03]">Growth<br /><span className="font-normal text-xs text-[#5B6472]">€749</span></th><th className="py-4 px-4 font-semibold text-center" style={{ color: "#6B3FD4" }}>Pro<br /><span className="font-normal text-xs text-[#5B6472]">€1,499</span></th></tr></thead><tbody>{comparison.map((row, index) => <tr key={row.feature} className={index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"}><td className="py-3.5 px-4 text-[#111315] font-medium">{row.feature}</td><td className="py-3.5 px-4 text-center"><PlanCell value={row.launch} colour="#5B8CFF" /></td><td className="py-3.5 px-4 text-center bg-[#8B5CFF]/[0.03]"><PlanCell value={row.growth} colour="#8B5CFF" /></td><td className="py-3.5 px-4 text-center"><PlanCell value={row.pro} colour="#6B3FD4" /></td></tr>)}</tbody></table></div></AnimateIn></div></section>

      <section className="pricing-editorial-questions section-spacing bg-white"><div className="container max-w-3xl"><AnimateIn className="pricing-editorial-section-intro text-center"><p className="pricing-editorial-label">Χρήσιμο να Γνωρίζετε</p><h2 className="pricing-editorial-section-heading">Συχνές <em>Ερωτήσεις</em></h2></AnimateIn><div className="space-y-4">{[{ q: "Μπορώ να δω ένα preview πριν πληρώσω;", a: "Ναι. Μοιραζόμαστε μια σχεδιαστική κατεύθυνση για έγκριση πριν προχωρήσει η ανάπτυξη." }, { q: "Μπορώ να κάνω upgrade αργότερα;", a: "Ναι. Μπορούμε να κοστολογήσουμε επιπλέον scope αν χρειάζεστε περισσότερες σελίδες, λειτουργίες ή μεγαλύτερο πακέτο μετά την κυκλοφορία." }, { q: "Υπάρχουν κρυφές χρεώσεις;", a: "Όχι. Συμφωνούμε το scope και την τιμή πριν ξεκινήσει η δουλειά. Κόστη domain και υπηρεσιών τρίτων εξηγούνται ξεχωριστά όπου χρειάζεται." }, { q: "Τι δεν περιλαμβάνεται στη συντήρηση;", a: "Νέες σελίδες, copywriting, επιπλέον γύροι αναθεωρήσεων, νέες integrations, redesigns, advanced SEO και complex content migration κοστολογούνται ξεχωριστά." }, { q: "Μου ανήκει η ιστοσελίδα;", a: "Ναι. Μετά την πλήρη εξόφληση, η ιστοσελίδα και το περιεχόμενό της ανήκουν σε εσάς." }, { q: "Πότε ένα έργο είναι Enterprise / Custom;", a: "Όταν το έργο ξεπερνά το standard package scope, όπως integrations, πολυγλωσσό περιεχόμενο, CMS αυτοδιαχείρισης, AI λειτουργίες, complex motion, CRM, booking ή ασυνήθιστο όγκο περιεχομένου." }].map((item) => <AnimateIn key={item.q}><div className="dm-card !p-6"><div className="flex items-start gap-3"><HelpCircle size={20} className="text-[#5B8CFF] shrink-0 mt-0.5" /><div><h3 className="text-base font-semibold text-[#111315] mb-2">{item.q}</h3><p className="text-sm text-[#5B6472] leading-relaxed">{item.a}</p></div></div></div></AnimateIn>)}</div></div></section>

      <section className="pricing-editorial-cta-section section-spacing"><div className="container max-w-3xl text-center"><AnimateIn><h2 className="pricing-editorial-cta-heading">Δεν είστε σίγουροι ποιο <em>πακέτο</em> ταιριάζει;</h2><p>Πείτε μας τι χρειάζεται η επιχείρησή σας και θα προτείνουμε το σωστό αρχικό scope.</p><div className="pricing-editorial-cta-actions flex flex-col sm:flex-row gap-4 justify-center"><StarButton asChild><Link href="/el/contact/" className="btn-primary"><MessageCircle size={18} /> Κλείστε Δωρεάν Συμβουλευτική</Link></StarButton><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">WhatsApp <ArrowRight size={16} /></a></div></AnimateIn></div></section>
    </div>
  );
}
