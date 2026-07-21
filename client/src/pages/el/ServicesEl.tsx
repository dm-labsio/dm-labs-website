/* ============================================================
   D&M LABS - Υπηρεσίες Page
   Brand: #5B8CFF→#6FE3FF→#8B5CFF gradient, #F6F6F4 base
   ============================================================ */
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import {
  Globe, Smartphone, Search, Zap, Shield, MessageCircle,
  CheckCircle2, ArrowRight, Image, MapPin, FileText, Share2, Headphones, Rocket,
  Users, CalendarCheck, Languages
} from "lucide-react";

const SERVICES_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/services-hero-bg-bfPgb525LqzgdU7JVYn89M.webp";
const TRIANGLE_GEO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/triangle-geometry-Rf9Cpg8ynqtbpdNzPsSccU.webp";
const WHATSAPP_URL = "https://wa.me/35797472847?text=%CE%93%CE%B5%CE%B9%CE%B1%20%CF%83%CE%B1%CF%82!%20%CE%98%CE%B1%20%CE%AE%CE%B8%CE%B5%CE%BB%CE%B1%20%CE%BD%CE%B1%20%CF%83%CF%85%CE%B6%CE%B7%CF%84%CE%AE%CF%83%CE%BF%CF%85%CE%BC%CE%B5%20%CE%B3%CE%B9%CE%B1%20%CE%BC%CE%B9%CE%B1%20%CE%B9%CF%83%CF%84%CE%BF%CF%83%CE%B5%CE%BB%CE%AF%CE%B4%CE%B1.";

export default function ServicesElPage() {
  useSEO({
    title: "Υπηρεσίες Web Σχεδιασμός Κύπρος | DM-Labs.io",
    description: "Επαγγελματικές υπηρεσίες web design στην Κύπρο. Custom ιστοσελίδες, mobile-first ανάπτυξη, SEO βελτιστοποίηση και συντήρηση. Από €299.",
  });
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(4rem, 8vh, 6rem)" }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src={SERVICES_BG} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        <div className="absolute top-10 right-10 w-[300px] h-[300px] opacity-[0.04] animate-float-slower pointer-events-none">
          <img src={TRIANGLE_GEO} alt="" className="w-full h-full object-contain" aria-hidden="true" />
        </div>
        <div className="container relative z-10 text-center">
          <AnimateIn>
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Τι Προσφέρουμε</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5">
              Υπηρεσίες που <span className="brand-gradient-text">Φέρνουν Αποτελέσματα</span>
            </h1>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto">
              Είμαστε μια εξειδικευμένη εταιρεία κατασκευής ιστοσελίδων που εστιάζει στη δημιουργία επαγγελματικών, υψηλής ποιότητας ιστοσελίδων. Από τον custom σχεδιασμό έως τη βελτιστοποίηση SEO, αναλαμβάνουμε τα πάντα.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Core Packages */}
      <section className="section-spacing bg-white">
        <div className="container">
          <AnimateIn className="mb-16">
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Βασικές Υπηρεσίες</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111315] mb-4">Πακέτα Ιστοσελίδων</h2>
          </AnimateIn>

          {/* Τιμές Εκκίνησης Full-Width Banner */}
          <div
            className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 py-4 px-6 mb-10 rounded-xl"
            style={{ background: "linear-gradient(90deg, #5B8CFF 0%, #6FE3FF 50%, #8B5CFF 100%)" }}
          >
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-white animate-pulse opacity-80" />
            <span className="text-base sm:text-lg font-bold text-white tracking-widest uppercase">Τιμές Εκκίνησης</span>
            <span className="hidden sm:block w-px h-5 bg-white/40" />
            <span className="text-sm sm:text-base text-white/90 font-medium">Εισαγωγικές τιμές διαθέσιμες τώρα. <span className="font-bold text-white">Κλείστε τη θέση σας σήμερα.</span></span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

            {/* Starter */}
            <AnimateIn delay={0.1}>
              <div className="dm-card h-full flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="icon-container-gradient">
                    <Globe size={24} className="text-[#5B8CFF]" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#5B8CFF] uppercase tracking-wide">Starter</p>
                      <p className="text-2xl font-bold text-[#111315]">€299 <span className="text-sm font-normal text-[#5B6472]">εφάπαξ</span></p>
                      <p className="text-xs text-[#5B8CFF] font-medium">€249 με πακέτο συντήρησης</p>
                  </div>
                </div>
                <p className="text-sm text-[#5B6472] mb-5 leading-relaxed">
                  Ιδανικό για νέες επιχειρήσεις που χρειάζονται γρήγορα μια καθαρή, επαγγελματική online παρουσία.
                </p>
                <ul className="space-y-3 mb-6 flex-1">
                  {["Επώνυμη επαγγελματική σελίδα", "Responsive για κινητά", "Κουμπί WhatsApp", "Σύνδεσμοι social media", "Widget προσβασιμότητας (δωρεάν)", "2 γύροι αναθεωρήσεων", "Παράδοση σε 5-7 μέρες"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                      <CheckCircle2 size={16} className="text-[#5B8CFF] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/el/contact" className="btn-secondary w-full justify-center">Δωρεάν Συμβουλευτική</a>
              </div>
            </AnimateIn>

            {/* Business - Προτεινόμενο */}
            <AnimateIn delay={0.2}>
              <div className="brand-gradient-border h-full">
                <div className="dm-card h-full !shadow-none relative flex flex-col">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full brand-gradient text-white text-xs font-semibold whitespace-nowrap">Προτεινόμενο</span>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="icon-container-gradient">
                      <Rocket size={24} className="text-[#8B5CFF]" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#8B5CFF] uppercase tracking-wide">Business</p>
                      <p className="text-2xl font-bold text-[#111315]">€399 <span className="text-sm font-normal text-[#5B6472]">εφάπαξ</span></p>
                      <p className="text-xs text-[#8B5CFF] font-medium">€349 με πακέτο συντήρησης</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#5B6472] mb-5 leading-relaxed">
                    Για καθιερωμένες επιχειρήσεις που χρειάζονται ολοκληρωμένη ιστοσελίδα εστιασμένη στις μετατροπές.
                  </p>
                  <ul className="space-y-3 mb-6 flex-1">
                    {["Έως 5 σελίδες", "Responsive για κινητά", "Κουμπί WhatsApp + social media", "Φόρμα επικοινωνίας + κρατήσεων", "Google Maps + Reviews widget", "Ενότητα μαρτυριών", "Βασική SEO βελτιστοποίηση", "Βελτιστοποίηση ταχύτητας", "Widget προσβασιμότητας (δωρεάν)", "3 γύροι αναθεωρήσεων", "Παράδοση σε 7-10 μέρες"].map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                        <CheckCircle2 size={16} className="text-[#8B5CFF] shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="/el/contact" className="btn-primary w-full justify-center">Δωρεάν Συμβουλευτική</a>
                </div>
              </div>
            </AnimateIn>

            {/* Premium */}
            <AnimateIn delay={0.3}>
              <div className="dm-card h-full flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="icon-container-gradient">
                    <Globe size={24} className="text-[#6FE3FF]" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#6FE3FF] uppercase tracking-wide">Premium</p>
                      <p className="text-2xl font-bold text-[#111315]">€699 <span className="text-sm font-normal text-[#5B6472]">εφάπαξ</span></p>
                      <p className="text-xs text-[#6FE3FF] font-medium">€649 με πακέτο συντήρησης</p>
                  </div>
                </div>
                <p className="text-sm text-[#5B6472] mb-5 leading-relaxed">
                  Για επιχειρήσεις που θέλουν πλήρως custom ιστοσελίδα με όλα τα χαρακτηριστικά.
                </p>
                <ul className="space-y-3 mb-6 flex-1">
                  {["Έως 7 σελίδες", "Πλήρως custom σχεδιασμός + animations", "Responsive για κινητά", "Κουμπί WhatsApp + social media", "Φόρμα επικοινωνίας + κρατήσεων", "Google Maps + Reviews widget", "Μαρτυρίες + gallery", "5 SEO blog άρθρα", "Πλήρης meta/SEO δομή", "Βελτιστοποίηση ταχύτητας", "Pop-up συμπεριλαμβάνεται", "Widget προσβασιμότητας (δωρεάν)", "5 γύροι αναθεωρήσεων", "Παράδοση σε 10-14 μέρες"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                      <CheckCircle2 size={16} className="text-[#6FE3FF] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/el/contact" className="btn-secondary w-full justify-center">Δωρεάν Συμβουλευτική</a>
              </div>
            </AnimateIn>

          </div>

          {/* Enterprise Wide Banner */}
          <AnimateIn delay={0.4} className="mt-8">
            <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1117 0%, #161b2e 50%, #0d1117 100%)", border: "1px solid rgba(91,140,255,0.2)" }}>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 p-8">

                {/* Left: label + price + description */}
                <div className="flex-shrink-0 lg:w-72">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "linear-gradient(90deg, #5B8CFF, #8B5CFF)", color: "#fff" }}>Φτιαγμένο για Εσάς</span>
                  <p className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: "#6FE3FF" }}>Enterprise</p>
                  <p className="text-4xl font-bold text-white mb-1">Προσαρμοσμένη</p>
                  <p className="text-xs font-medium mb-4" style={{ color: "#5B8CFF" }}>Τιμολόγηση προσαρμοσμένη στο project σας</p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Για μεγαλύτερες επιχειρήσεις και οργανισμούς που χρειάζονται πλήρως custom λύση.
                  </p>
                  <a
                    href="/el/contact"
                    className="mt-6 inline-flex items-center justify-center gap-2 py-3 px-8 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(90deg, #5B8CFF, #8B5CFF)" }}
                  >
                    <MessageCircle size={16} /> Επικοινωνήστε μαζί μας
                  </a>
                </div>

                {/* Divider */}
                <div className="hidden lg:block w-px self-stretch" style={{ background: "rgba(91,140,255,0.2)" }} />

                {/* Right: feature grid */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
                  {[
                    { icon: Globe, label: "Πλήρως custom σχεδιασμός από μηδέν" },
                    { icon: Zap, label: "Απεριόριστες σελίδες" },
                    { icon: CalendarCheck, label: "CRM και ενσωματώσεις κρατήσεων" },
                    { icon: Languages, label: "Υποστήριξη πολλαπλών γλωσσών" },
                    { icon: Users, label: "Αφοσιωμένος project manager" },
                    { icon: Headphones, label: "Προτεραιότητα υποστήριξης και παράδοσης" },
                    { icon: ArrowRight, label: "Επιλογή ongoing retainer" },
                    { icon: CheckCircle2, label: "Προσαρμοσμένη στρατηγική SEO & περιεχομένου" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-start gap-2.5">
                      <Icon size={15} className="shrink-0 mt-0.5" style={{ color: "#6FE3FF" }} />
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{label}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </AnimateIn>

        </div>
      </section>

      {/* Τι Περιλαμβάνεται */}
      <section className="section-spacing">
        <div className="container">
          <AnimateIn className="text-center mb-16">
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Σε Κάθε Ιστοσελίδα</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111315]">Ό,τι Χρειάζεστε, Τίποτα Παραπάνω</h2>
          </AnimateIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              { icon: Smartphone, title: "Κατάλληλο για Κινητά", desc: "Τέλεια εμφάνιση σε κάθε συσκευή - κινητά, tablet και desktop.", anchor: "mobile-first" },
              { icon: Search, title: "SEO Βελτιστοποιημένο", desc: "Ενσωματωμένη βελτιστοποίηση μηχανών αναζήτησης ώστε οι πελάτες να σας βρίσκουν στο Google.", anchor: "seo" },
              { icon: Zap, title: "Γρήγορη Φόρτωση", desc: "Βελτιστοποιημένος κώδικας και assets για εξαιρετικά γρήγορες ταχύτητες σελίδας.", anchor: "performance" },
              { icon: Shield, title: "Ασφάλεια SSL", desc: "Δωρεάν πιστοποιητικό SSL για να παραμένει η ιστοσελίδα σας και οι επισκέπτες ασφαλείς.", anchor: "security" },
              { icon: Image, title: "Custom Σχεδιασμός", desc: "Κανένα έτοιμο πρότυπο - κάθε ιστοσελίδα είναι προσαρμοσμένη στην ταυτότητα της μάρκας σας.", anchor: "custom-design" },
              { icon: MapPin, title: "Google Maps", desc: "Ενσωματωμένοι χάρτες ώστε οι πελάτες να βρίσκουν εύκολα τη φυσική σας τοποθεσία.", anchor: "maps" },
              { icon: FileText, title: "Φόρμες Επικοινωνίας", desc: "Επαγγελματικές φόρμες που στέλνουν αιτήματα απευθείας στο email σας.", anchor: "forms" },
              { icon: Share2, title: "Ενσωμάτωση Social Media", desc: "Σύνδεσμοι σε όλα τα προφίλ σας στα social media σε ένα μέρος.", anchor: "social" },
              { icon: Headphones, title: "Υποστήριξη Μετά την Κυκλοφορία", desc: "Δεν εξαφανιζόμαστε μετά την κυκλοφορία - συνεχής υποστήριξη όταν τη χρειάζεστε.", anchor: "turnaround" },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <Link href={`/el/services/${item.anchor}`}>
                  <div id={item.anchor} className="dm-card h-full !p-6 scroll-mt-24 cursor-pointer hover:border-[#5B8CFF]/40 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="icon-container-gradient !w-12 !h-12 !rounded-xl">
                        <item.icon size={20} className="text-[#5B8CFF]" strokeWidth={1.75} />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-[#111315] mb-1">{item.title}</h3>
                        <p className="text-sm text-[#5B6472] leading-relaxed mb-2">{item.desc}</p>
                        <span className="text-xs font-medium text-[#5B8CFF] inline-flex items-center gap-1">Διαβάστε περισσότερα →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Monthly Maintenance */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimateIn>
              <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Προαιρετική Υπηρεσία</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#111315] mb-5">
                Μηνιαία Συντήρηση - <span className="brand-gradient-text">από €39/μήνα</span>
              </h2>
              <p className="text-lg text-[#5B6472] mb-6 leading-relaxed">
                Κρατήστε την ιστοσελίδα σας ενημερωμένη, ασφαλή και σε κορυφαία απόδοση. Επιλέξτε το πλάνο που ταιριάζει στις ανάγκες σας.
              </p>
              <div className="space-y-5 mb-8">
                <div className="dm-card !p-5">
                  <p className="text-sm font-semibold text-[#5B8CFF] uppercase tracking-wide mb-2">Essential - €39/μήνα</p>
                  <ul className="space-y-2">
                    {["Έως 3 ενημερώσεις περιεχομένου/μήνα", "Κείμενα, εικόνες, τιμές & ωράρια", "Παρακολούθηση hosting & διαθεσιμότητας", "Υποστήριξη WhatsApp (απάντηση 48ω)", "Μηνιαίο backup"].map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                        <CheckCircle2 size={15} className="text-[#5B8CFF] shrink-0 mt-0.5" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="dm-card !p-5 border-[#8B5CFF]/30">
                  <p className="text-sm font-semibold text-[#8B5CFF] uppercase tracking-wide mb-2">Premium - €59/μήνα</p>
                  <ul className="space-y-2">
                    {["Ενημερώσεις περιεχομένου", "Προτεραιότητα απόκρισης WhatsApp", "Μηνιαίος έλεγχος απόδοσης", "Εποχιακά banners & προσφορές", "Προσθήκη νέων ενοτήτων", "Παρακολούθηση hosting & διαθεσιμότητας", "Μηνιαίο backup"].map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                        <CheckCircle2 size={15} className="text-[#8B5CFF] shrink-0 mt-0.5" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <a href="/el/contact" className="btn-primary">
                <MessageCircle size={18} />
                Ρωτήστε για τη Συντήρηση
              </a>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <div className="dm-card !bg-[#F6F6F4]">
                <div className="text-center py-8">
                  <div className="flex items-baseline justify-center gap-3 mb-2">
                    <span className="text-5xl font-bold brand-gradient-text">€39</span>
                    <span className="text-2xl text-[#5B6472]">ή</span>
                    <span className="text-5xl font-bold brand-gradient-text">€59</span>
                  </div>
                  <p className="text-lg text-[#5B6472] mb-6">ανά μήνα</p>
                  <div className="w-16 h-0.5 brand-gradient mx-auto rounded-full mb-6" />
                  <p className="text-sm text-[#5B6472] max-w-xs mx-auto">Ακύρωση ανά πάσα στιγμή. Χωρίς συμβόλαια. Χωρίς δεσμεύσεις. Απλά συνεχής φροντίδα για την ιστοσελίδα σας.</p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing dark-section text-center">
        <div className="container">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Έτοιμοι να Ξεκινήσετε;</h2>
            <p className="text-lg text-[#94A3B8] mb-8 max-w-xl mx-auto">Στείλτε μας μήνυμα και θα συζητήσουμε ποιο πακέτο ταιριάζει στην επιχείρησή σας.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/el/contact" className="btn-primary">
                <MessageCircle size={18} />
                Συνομιλήστε στο WhatsApp
              </a>
              <Link href="/el/pricing" className="btn-secondary !border-white/20 !text-white hover:!border-white/40">
                Σύγκριση Τιμών <ArrowRight size={16} />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
