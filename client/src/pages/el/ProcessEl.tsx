/* ============================================================
   D&M LABS - Διαδικασία Page (Greek)
   Brand: #5B8CFF→#6FE3FF→#8B5CFF gradient
   Σχεδιασμός: Airy vertical timeline - no step numbers, large icons,
           generous breathing room between each stage
   ============================================================ */
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import AnimateIn from "@/components/AnimateIn";
import { MessageCircle, Palette, Code, Rocket, ArrowRight, CheckCircle2, CreditCard } from "lucide-react";

const TRIANGLE_GEO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/triangle-geometry-Rf9Cpg8ynqtbpdNzPsSccU.webp";
const WHATSAPP_URL = "https://wa.me/35797472847?text=%CE%93%CE%B5%CE%B9%CE%B1%20%CF%83%CE%B1%CF%82!%20%CE%98%CE%B1%20%CE%AE%CE%B8%CE%B5%CE%BB%CE%B1%20%CE%BD%CE%B1%20%CF%83%CF%85%CE%B6%CE%B7%CF%84%CE%AE%CF%83%CE%BF%CF%85%CE%BC%CE%B5%20%CE%B3%CE%B9%CE%B1%20%CE%BC%CE%B9%CE%B1%20%CE%B9%CF%83%CF%84%CE%BF%CF%83%CE%B5%CE%BB%CE%AF%CE%B4%CE%B1.";

const steps = [
  {
    step: "01",
    icon: MessageCircle,
    title: "Αρχική Κλήση",
    time: "~1 μέρα",
    desc: "Ξεκινάμε με μια γρήγορη συνομιλία στο WhatsApp. Πείτε μας για την επιχείρησή σας, τι χρειάζεστε και τους στόχους σας. Χωρίς τεχνική ορολογία - απλά μια φιλική συζήτηση.",
    details: ["Κλήση 15-20 λεπτών στο WhatsApp", "Μαθαίνουμε για την επιχείρησή σας", "Μας λέτε τι χρειάζεστε", "Προτείνουμε το καλύτερο πακέτο"],
    color: "#5B8CFF",
  },
  {
    step: "02",
    icon: CreditCard,
    title: "Κλείστε τη Θέση σας",
    time: "Ίδια μέρα",
    desc: "Μόλις συμφωνήσουμε στο εύρος και την τιμή, πληρώνετε και ξεκινάμε αμέσως. Απλά, διαφανή, χωρίς εκπλήξεις.",
    details: ["Σαφείς τιμές - χωρίς κρυφές χρεώσεις", "Πληρώνετε μία φορά, σας ανήκει για πάντα", "Η εργασία ξεκινά αμέσως", "Ασφαλείς επιλογές πληρωμής"],
    color: "#6FE3FF",
  },
  {
    step: "03",
    icon: Palette,
    title: "Σχεδιασμός & Κατασκευή",
    time: "3-7 μέρες",
    desc: "Σχεδιάζουμε και αναπτύσσουμε την ιστοσελίδα σας. Θα βλέπετε την πρόοδο καθ' όλη τη διάρκεια και μπορείτε να δώσετε feedback σε βασικά σημεία.",
    details: ["Custom σχεδιασμός για το brand σας", "Ανάπτυξη με προτεραιότητα στο κινητό", "Τακτικές ενημερώσεις προόδου", "Η γνώμη σας διαμορφώνει το αποτέλεσμα"],
    color: "#8B5CFF",
  },
  {
    step: "04",
    icon: Code,
    title: "Αναθεωρήσεις",
    time: "1-2 μέρες",
    desc: "Ελέγχετε την ιστοσελίδα και ζητάτε αλλαγές. Βελτιώνουμε τα πάντα μέχρι να είστε απόλυτα ικανοποιημένοι με το αποτέλεσμα.",
    details: ["Πλήρης προεπισκόπηση ιστοσελίδας", "Starter: 2 γύροι αναθεωρήσεων, Business: 3, Premium: 5", "Προσαρμόζουμε μέχρι να είστε ικανοποιημένοι", "Χωρίς επιπλέον χρεώσεις για τις συμπεριλαμβανόμενες αναθεωρήσεις"],
    color: "#5B8CFF",
  },
  {
    step: "05",
    icon: Rocket,
    title: "Κυκλοφορία",
    time: "~1 μέρα",
    desc: "Η ιστοσελίδα σας δημοσιεύεται. Αναλαμβάνουμε τη σύνδεση domain, τη ρύθμιση hosting και βεβαιωνόμαστε ότι όλα λειτουργούν τέλεια.",
    details: ["Σύνδεση domain", "Ρύθμιση πιστοποιητικού SSL", "Βελτιστοποίηση ταχύτητας", "Η ιστοσελίδα σας είναι live!"],
    color: "#6FE3FF",
  },
];

export default function ProcessElPage() {
  useSEO({
    title: "Η Διαδικασία μας | Πώς Κατασκευάζουμε Ιστοσελίδες | D&M Labs",
    description: "Από την αρχική κλήση μέχρι την κυκλοφορία σε 5-14 μέρες. Δείτε ακριβώς πώς η D&M Labs σχεδιάζει και κατασκευάζει την ιστοσελίδα σας, βήμα προς βήμα.",
  });
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(4rem, 8vh, 6rem)" }}>
        <div className="absolute top-10 left-10 w-[300px] h-[300px] opacity-[0.04] animate-float-slower pointer-events-none">
          <img src={TRIANGLE_GEO} alt="" className="w-full h-full object-contain" aria-hidden="true" />
        </div>
        <div className="container relative z-10 text-center">
          <AnimateIn>
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Πώς Λειτουργεί</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5">
              Από την Ιδέα στην <span className="brand-gradient-text">Κυκλοφορία</span>
            </h1>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto">
              Μια απλή, διαφανής διαδικασία σχεδιασμένη για να δημοσιεύσει την ιστοσελίδα σας όσο πιο γρήγορα γίνεται - χωρίς άγχος.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Steps */}
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl">
          <div className="relative">
{/* Vertical connector line - sits between icons, hidden behind each icon box */}
            <div
              className="absolute left-[35px] sm:left-[39px] top-[96px] sm:top-[104px] bottom-[96px] sm:bottom-[104px] w-[2px] pointer-events-none"
              style={{ background: "linear-gradient(to bottom, #5B8CFF, #6FE3FF, #8B5CFF, #5B8CFF, #6FE3FF)", zIndex: 1 }}
            />

            <div className="space-y-0">
              {steps.map((step, i) => (
                <AnimateIn key={step.title} delay={i * 0.12}>
                  <div className="relative flex gap-8 sm:gap-10" style={{ paddingBottom: i < steps.length - 1 ? "clamp(3rem, 6vh, 5rem)" : 0 }}>
                    {/* Icon circle - z-10 so it sits above the connector line */}
                    <div className="shrink-0 flex flex-col items-center" style={{ position: "relative", zIndex: 10 }}>
                      <div
                        className="w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] rounded-2xl flex items-center justify-center shadow-sm"
                        style={{ background: `white`, border: `1.5px solid ${step.color}30`, boxShadow: `0 0 0 4px white` }}
                      >
                        <div className="w-full h-full rounded-2xl flex items-center justify-center" style={{ background: `${step.color}18` }}>
                          <step.icon size={34} style={{ color: step.color }} strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-3">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-white px-2.5 py-1 rounded-full" style={{ background: step.color }}>Βήμα {step.step}</span>
                        <span className="text-xs font-semibold text-[#5B6472] bg-[#F0F4FF] px-2.5 py-1 rounded-full">{step.time}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#111315] mb-3">{step.title}</h3>
                      <p className="text-base text-[#5B6472] leading-relaxed mb-5 max-w-xl">{step.desc}</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {step.details.map((d) => (
                          <li key={d} className="flex items-start gap-2.5 text-sm text-[#111315]">
                            <CheckCircle2 size={16} style={{ color: step.color }} className="shrink-0 mt-0.5" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-spacing">
        <div className="container">
          <AnimateIn className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111315] mb-4">Τυπικό Χρονοδιάγραμμα</h2>
            <p className="text-lg text-[#5B6472]">Τα περισσότερα projects ολοκληρώνονται από το πρώτο μήνυμα μέχρι τη δημοσίευση σε λιγότερο από δύο εβδομάδες.</p>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { label: "Starter Ιστοσελίδα", time: "5-7 μέρες", price: "από €299" },
                { label: "Business Ιστοσελίδα", time: "7-10 μέρες", price: "από €399" },
                { label: "Premium Ιστοσελίδα", time: "10-14 μέρες", price: "από €699" },
              ].map((item) => (
                <div key={item.label} className="dm-card text-center !p-8">
                  <p className="text-3xl font-bold brand-gradient-text mb-2">{item.time}</p>
                  <p className="text-sm font-semibold text-[#111315] mb-1">{item.label}</p>
                  <p className="text-xs text-[#5B6472]">{item.price}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing dark-section text-center">
        <div className="container">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Έτοιμοι να Ξεκινήσετε;</h2>
            <p className="text-lg text-[#94A3B8] mb-8 max-w-xl mx-auto">
              Το πρώτο βήμα είναι μια γρήγορη, χωρίς δέσμευση συνομιλία στο WhatsApp. Ας μιλήσουμε για την επιχείρησή σας.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/el/contact" className="btn-primary">
                <MessageCircle size={18} /> Ξεκινήστε τη Συζήτηση
              </a>
              <Link href="/el/pricing" className="btn-secondary !border-white/20 !text-white hover:!border-white/40">
                Δείτε τις Τιμές <ArrowRight size={16} />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
