/* ============================================================
   D&M LABS - Σελίδα Τιμών (Greek)
   3 πακέτα: Starter €299 / Business €399 (προτεινόμενο) / Premium €699
   Extras + 2 επίπεδα συντήρησης (Essential €39 / Premium €59)
   Προσφορά bundle: €50 έκπτωση στην κατασκευή με ταυτόχρονη εγγραφή σε συντήρηση.
   ============================================================ */
import { useSEO } from "@/hooks/useSEO";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import { CheckCircle2, X, MessageCircle, ArrowRight, HelpCircle, Languages, CalendarCheck, Bell, Accessibility, Tag, Zap, Globe, Users, Headphones } from "lucide-react";

const GRADIENT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/gradient-mesh-bg-nrkTNmAHHWeVJB3ubHRGDu.webp";
const WHATSAPP_URL = "https://wa.me/35797472847?text=%CE%93%CE%B5%CE%B9%CE%B1%20%CF%83%CE%B1%CF%82!%20%CE%98%CE%B1%20%CE%AE%CE%B8%CE%B5%CE%BB%CE%B1%20%CE%BD%CE%B1%20%CF%83%CF%85%CE%B6%CE%B7%CF%84%CE%AE%CF%83%CE%BF%CF%85%CE%BC%CE%B5%20%CE%B3%CE%B9%CE%B1%20%CE%BC%CE%B9%CE%B1%20%CE%B9%CF%83%CF%84%CE%BF%CF%83%CE%B5%CE%BB%CE%AF%CE%B4%CE%B1.";

const comparison = [
  { feature: "Σελίδες custom σχεδιασμού", starter: "1 σελίδα", business: "Έως 5", pro: "Έως 7" },
  { feature: "Responsive για κινητά", starter: true, business: true, pro: true },
  { feature: "Κουμπί WhatsApp", starter: true, business: true, pro: true },
  { feature: "Σύνδεσμοι social media", starter: true, business: true, pro: true },
  { feature: "Widget προσβασιμότητας", starter: true, business: true, pro: true },
  { feature: "Φόρμα επικοινωνίας", starter: false, business: true, pro: true },
  { feature: "Φόρμα κρατήσεων", starter: false, business: true, pro: true },
  { feature: "Google Maps", starter: false, business: true, pro: true },
  { feature: "Ενότητα μαρτυριών", starter: false, business: true, pro: true },
  { feature: "Βασική SEO βελτιστοποίηση", starter: false, business: true, pro: true },
  { feature: "Google Reviews widget", starter: false, business: true, pro: true },
  { feature: "Βελτιστοποίηση ταχύτητας", starter: false, business: true, pro: true },
  { feature: "Gallery (συλλογή φωτογραφιών)", starter: false, business: false, pro: true },
  { feature: "Προσαρμοσμένες κινούμενες εικόνες", starter: false, business: false, pro: true },
  { feature: "5 SEO blog άρθρα", starter: false, business: false, pro: true },
  { feature: "Πλήρης meta/SEO δομή", starter: false, business: false, pro: true },
  { feature: "Pop-up συμπεριλαμβάνεται", starter: false, business: false, pro: true },
  { feature: "Γύροι αναθεωρήσεων", starter: "2 γύροι", business: "3 γύροι", pro: "5 γύροι" },
  { feature: "Χρόνος παράδοσης", starter: "5-7 μέρες", business: "7-10 μέρες", pro: "10-14 μέρες" },
];

const addons = [
  { icon: Languages, label: "Πολύγλωσση ιστοσελίδα - 2 γλώσσες", price: "€80" },
  { icon: Languages, label: "Πολύγλωσση ιστοσελίδα - έως 4 γλώσσες", price: "€150" },
  { icon: CalendarCheck, label: "Ανακατεύθυνση κρατήσεων (Calendly, Wolt κ.ά.)", price: "€30" },
  { icon: Bell, label: "Pop-up (προσφορά, ανακοίνωση, cookie notice)", price: "€40" },
  { icon: Accessibility, label: "Πλήρης έλεγχος προσβασιμότητας WCAG 2.1 AA", price: "€40" },
];

export default function PricingEl() {
  useSEO({
    title: "Τιμές Κατασκευής Ιστοσελίδας | D&M Labs",
    description: "Διαφανείς τιμές κατασκευής ιστοσελίδας για επιχειρήσεις στην Κύπρο και Ελλάδα. Starter από €299, Business €399, Premium €699. Χωρίς κρυφές χρεώσεις.",
  });
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(4rem, 8vh, 6rem)" }}>
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <img src={GRADIENT_BG} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        <div className="container relative z-10 text-center">
          <AnimateIn>
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Διαφανείς Τιμές</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5">
              Απλές, <span className="brand-gradient-text">Ειλικρινείς Τιμές</span>
            </h1>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-5">
              Χωρίς κρυφές χρεώσεις. Χωρίς εκπλήξεις. Επιλέξτε το πακέτο που ταιριάζει στην επιχείρησή σας - κάθε πλάνο περιλαμβάνει δωρεάν συμβουλευτική.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Τιμές Εκκίνησης Full-Width Banner */}
      <div
        className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 py-4 px-8"
        style={{ background: "linear-gradient(90deg, #5B8CFF 0%, #6FE3FF 50%, #8B5CFF 100%)" }}
      >
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-white animate-pulse opacity-80" />
        <span className="text-base sm:text-lg font-bold text-white tracking-widest uppercase">Τιμές Εκκίνησης</span>
        <span className="hidden sm:block w-px h-5 bg-white/40" />
        <span className="text-sm sm:text-base text-white/90 font-medium">Εισαγωγικές τιμές διαθέσιμες τώρα. <span className="font-bold text-white">Κλείστε τη θέση σας σήμερα.</span></span>
      </div>

      {/* Bundle Deal Banner */}
      <section className="bg-[#EEF3FF] border-y border-[#5B8CFF]/20 py-4">
        <div className="container">
          <AnimateIn>
            <div className="flex items-center justify-center gap-3 flex-wrap text-center">
              <Tag size={18} className="text-[#5B8CFF] shrink-0" />
              <p className="text-sm font-semibold text-[#111315]">
                Προσφορά Bundle: Προσθέστε μηνιαίο πλάνο συντήρησης και κερδίστε <span className="text-[#5B8CFF]">€50 έκπτωση στην κατασκευή</span> - εφάπαξ έκπτωση, που εφαρμόζεται μία φορά στην αρχή.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Κάρτες Τιμών */}
      <section className="section-spacing bg-white">
        <div className="container">

          {/* 3 Standard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">

            {/* Starter */}
            <AnimateIn delay={0.1}>
              <div className="dm-card h-full flex flex-col">
                <p className="text-sm font-semibold text-[#5B8CFF] uppercase tracking-wide mb-2">Starter</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-[#111315]">€299</span>
                  <span className="text-sm text-[#5B6472]">εφάπαξ</span>
                </div>
                <p className="text-xs text-[#5B8CFF] font-medium mb-4">€249 με πακέτο συντήρησης</p>
                <p className="text-sm text-[#5B6472] mb-6">Ιδανικό για νέες επιχειρήσεις που χρειάζονται γρήγορα μια καθαρή, επαγγελματική online παρουσία.</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Επώνυμη επαγγελματική σελίδα",
                    "Responsive για κινητά",
                    "Κουμπί WhatsApp",
                    "Σύνδεσμοι social media",
                    "Widget προσβασιμότητας (δωρεάν)",
                    "2 γύροι αναθεωρήσεων",
                    "Παράδοση σε 5-7 μέρες",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                      <CheckCircle2 size={16} className="text-[#5B8CFF] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/el/contact" className="btn-secondary w-full justify-center">
                  <MessageCircle size={16} /> Δωρεάν Συμβουλευτική
                </a>
              </div>
            </AnimateIn>

            {/* Business - Προτεινόμενο */}
            <AnimateIn delay={0.2}>
              <div className="relative pt-5 h-full">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 z-10 px-4 py-1 rounded-full brand-gradient text-white text-xs font-semibold whitespace-nowrap shadow-sm">Προτεινόμενο</span>
                <div className="brand-gradient-border h-full">
                  <div className="dm-card h-full flex flex-col !shadow-none">
                    <p className="text-sm font-semibold text-[#8B5CFF] uppercase tracking-wide mb-2">Business</p>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-4xl font-bold text-[#111315]">€399</span>
                      <span className="text-sm text-[#5B6472]">εφάπαξ</span>
                    </div>
                    <p className="text-xs text-[#8B5CFF] font-medium mb-4">€349 με πακέτο συντήρησης</p>
                    <p className="text-sm text-[#5B6472] mb-6">Για καθιερωμένες επιχειρήσεις που χρειάζονται ολοκληρωμένη ιστοσελίδα εστιασμένη στις μετατροπές.</p>
                    <ul className="space-y-3 mb-8 flex-1">
                      {[
                        "Έως 5 σελίδες",
                        "Responsive για κινητά",
                        "Κουμπί WhatsApp + σύνδεσμοι social media",
                        "Φόρμα επικοινωνίας + φόρμα κρατήσεων",
                        "Google Maps + Reviews widget",
                        "Ενότητα μαρτυριών",
                        "Βασική SEO βελτιστοποίηση",
                        "Βελτιστοποίηση ταχύτητας",
                        "Widget προσβασιμότητας (δωρεάν)",
                        "3 γύροι αναθεωρήσεων",
                        "Παράδοση σε 7-10 μέρες",
                      ].map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                          <CheckCircle2 size={16} className="text-[#8B5CFF] shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a href="/el/contact" className="btn-primary w-full justify-center">
                      <MessageCircle size={16} /> Δωρεάν Συμβουλευτική
                    </a>
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* Premium */}
            <AnimateIn delay={0.3}>
              <div className="dm-card h-full flex flex-col" style={{ background: "linear-gradient(160deg, #f8f9ff 0%, #ffffff 100%)", border: "1px solid #e0e7ff" }}>
                <p className="text-sm font-semibold text-[#6B3FD4] uppercase tracking-wide mb-2">Premium</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-[#111315]">€699</span>
                  <span className="text-sm text-[#5B6472]">εφάπαξ</span>
                </div>
                <p className="text-xs font-medium mb-4" style={{ color: "#6B3FD4" }}>€649 με πακέτο συντήρησης</p>
                <p className="text-sm text-[#5B6472] mb-6">Για επιχειρήσεις που θέλουν πλήρως custom ιστοσελίδα με όλα τα χαρακτηριστικά.</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Έως 7 σελίδες",
                    "Πλήρως custom σχεδιασμός + animations",
                    "Responsive για κινητά",
                    "Κουμπί WhatsApp + σύνδεσμοι social media",
                    "Φόρμα επικοινωνίας + φόρμα κρατήσεων",
                    "Google Maps + Reviews widget",
                    "Μαρτυρίες + gallery",
                    "5 SEO blog άρθρα",
                    "Πλήρης meta/SEO δομή",
                    "Βελτιστοποίηση ταχύτητας",
                    "Pop-up συμπεριλαμβάνεται",
                    "Widget προσβασιμότητας (δωρεάν)",
                    "5 γύροι αναθεωρήσεων",
                    "Παράδοση σε 10-14 μέρες",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                      <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: "#6B3FD4" }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/el/contact" className="btn-secondary w-full justify-center">
                  <MessageCircle size={16} /> Δωρεάν Συμβουλευτική
                </a>
              </div>
            </AnimateIn>

          </div>

          {/* Enterprise Wide Banner */}
          <AnimateIn delay={0.4} className="mt-8 max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1117 0%, #161b2e 50%, #0d1117 100%)", border: "1px solid rgba(91,140,255,0.2)" }}>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 p-8">

                {/* Left: label + price + description */}
                <div className="flex-shrink-0 lg:w-72">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "linear-gradient(90deg, #5B8CFF, #8B5CFF)", color: "#fff" }}>Φτιαγμένο για Εσάς</span>
                  <p className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: "#6FE3FF" }}>Enterprise</p>
                  <p className="text-4xl font-bold text-white mb-1">Προσαρμοσμένη</p>
                  <p className="text-xs font-medium mb-4" style={{ color: "#5B8CFF" }}>Τιμολόγηση προσαρμοσμένη στο project σας</p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Για μεγαλύτερες επιχειρήσεις, εταιρείες με πολλαπλές τοποθεσίες και οργανισμούς που χρειάζονται πλήρως custom λύση σχεδιασμένη γύρω από τους στόχους τους.
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

          <AnimateIn delay={0.5} className="text-center mt-8">
            <p className="text-sm text-[#5B6472]">
              Όλα τα πλάνα περιλαμβάνουν <span className="font-semibold text-[#111315]">δωρεάν συμβουλευτική</span> - χωρίς δέσμευση, χωρίς πίεση. Απλά μια φιλική συζήτηση για την επιχείρησή σας.
            </p>
            <p className="text-sm text-[#5B6472] mt-3 flex items-center justify-center gap-2">
              Προτιμάτε να μιλήσετε απευθείας;{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-[#5B8CFF] font-medium hover:underline inline-flex items-center gap-1">
                Στείλτε μήνυμα στο WhatsApp <ArrowRight size={14} />
              </a>
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Extras */}
      <section className="section-spacing">
        <div className="container max-w-3xl">
          <AnimateIn className="text-center mb-12">
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Προαιρετικά Extras</p>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">Πρόσθετες Υπηρεσίες</h2>
            <p className="text-[#5B6472]">Εμπλουτίστε την ιστοσελίδα σας με αυτές τις προαιρετικές λειτουργίες, διαθέσιμες για οποιοδήποτε πλάνο.</p>
          </AnimateIn>
          <StaggerContainer className="space-y-3">
            {addons.map((a) => (
              <StaggerItem key={a.label}>
                <div className="dm-card !p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="icon-container-gradient !w-10 !h-10 shrink-0">
                      <a.icon size={18} className="text-[#5B8CFF]" strokeWidth={1.75} />
                    </div>
                    <p className="text-sm font-medium text-[#111315]">{a.label}</p>
                  </div>
                  <span className="text-base font-bold text-[#5B8CFF] shrink-0">{a.price}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <AnimateIn delay={0.3} className="mt-6">
            <div className="dm-card !p-5 flex items-start gap-4 border-[#5B8CFF]/20 bg-[#5B8CFF]/[0.03]">
              <Accessibility size={20} className="text-[#5B8CFF] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#111315] mb-1">Προσβασιμότητα σε κάθε πλάνο</p>
                <p className="text-xs text-[#5B6472] leading-relaxed">
                  Κάθε ιστοσελίδα που φτιάχνουμε περιλαμβάνει βασικό <strong>εργαλείο προσβασιμότητας</strong> χωρίς επιπλέον κόστος - με έλεγχο μεγέθους γραμματοσειράς, ρύθμιση αντίθεσης και πλοήγηση με πληκτρολόγιο. Για επιχειρήσεις που χρειάζονται πλήρη έλεγχο WCAG 2.1 AA και πιστοποιητικό συμμόρφωσης, το προσφέρουμε ως πρόσθετο €40.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Μηνιαία Συντήρηση */}
      <section id="maintenance" className="section-spacing bg-white">
        <div className="container max-w-4xl">
          <AnimateIn className="text-center mb-4">
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Κρατήστε την Ενημερωμένη</p>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">Μηνιαία Συντήρηση</h2>
            <p className="text-[#5B6472] max-w-xl mx-auto">Η ιστοσελίδα σας είναι ζωντανό πράγμα. Κρατήστε την ενημερωμένη, γρήγορη και σχετική με ένα από τα πλάνα συντήρησής μας.</p>
          </AnimateIn>

          {/* Bundle reminder */}
          <AnimateIn delay={0.1} className="mb-10">
            <div className="max-w-2xl mx-auto flex items-start gap-3 bg-[#EEF3FF] border border-[#5B8CFF]/20 rounded-xl px-5 py-4">
              <Tag size={18} className="text-[#5B8CFF] shrink-0 mt-0.5" />
              <p className="text-sm text-[#111315]">
                <span className="font-semibold">Προσφορά bundle:</span> Εγγραφείτε σε οποιοδήποτε μηνιαίο πλάνο συντήρησης ταυτόχρονα με την κατασκευή της ιστοσελίδας σας και κερδίστε <span className="font-semibold text-[#5B8CFF]">€50 έκπτωση στην κατασκευή</span>. Πρόκειται για εφάπαξ έκπτωση που εφαρμόζεται στην αρχή - το μηνιαίο πλάνο συνεχίζεται στην κανονική τιμή. Ακύρωση ανά πάσα στιγμή, χωρίς μακροχρόνιο συμβόλαιο.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <AnimateIn delay={0.2}>
              <div className="dm-card h-full flex flex-col">
                <p className="text-sm font-semibold text-[#5B8CFF] uppercase tracking-wide mb-2">Essential</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold text-[#111315]">€39</span>
                  <span className="text-sm text-[#5B6472]">/μήνα</span>
                </div>
                <ul className="space-y-3 flex-1">
                  {[
                    "Έως 3 ενημερώσεις περιεχομένου/μήνα",
                    "Κείμενα, εικόνες, τιμές και ωράρια",
                    "Παρακολούθηση hosting και διαθεσιμότητας",
                    "Υποστήριξη WhatsApp (απάντηση 48ω)",
                    "Μηνιαίο backup",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                      <CheckCircle2 size={15} className="text-[#5B8CFF] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/el/contact" className="btn-secondary w-full justify-center mt-6">Επιλέξτε Essential</a>
              </div>
            </AnimateIn>
            <AnimateIn delay={0.3}>
              <div className="brand-gradient-border h-full">
                <div className="dm-card h-full flex flex-col !shadow-none">
                  <p className="text-sm font-semibold text-[#8B5CFF] uppercase tracking-wide mb-2">Premium</p>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-bold text-[#111315]">€59</span>
                    <span className="text-sm text-[#5B6472]">/μήνα</span>
                  </div>
                  <ul className="space-y-3 flex-1">
                    {[
                      "Απεριόριστες ενημερώσεις περιεχομένου",
                      "Προτεραιότητα απόκρισης WhatsApp",
                      "Μηνιαίος έλεγχος απόδοσης",
                      "Εποχιακά banners και προσφορές",
                      "Προσθήκη νέων ενοτήτων",
                      "Παρακολούθηση hosting και διαθεσιμότητας",
                      "Μηνιαίο backup",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                        <CheckCircle2 size={15} className="text-[#8B5CFF] shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="/el/contact" className="btn-primary w-full justify-center mt-6">Επιλέξτε Premium</a>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Πίνακας Σύγκρισης */}
      <section className="section-spacing">
        <div className="container">
          <AnimateIn className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#111315] mb-4">Σύγκριση Πλάνων</h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div className="overflow-x-auto rounded-2xl border border-[#E8EAF0] max-w-4xl mx-auto">
              <table className="text-sm" style={{ minWidth: '480px', width: '100%' }}>
                <thead>
                  <tr className="border-b border-[#E8EAF0]">
                    <th className="text-left py-4 px-4 font-semibold text-[#111315]" style={{ minWidth: '160px' }}>Χαρακτηριστικό</th>
                    <th className="py-4 px-4 font-semibold text-[#5B8CFF] text-center" style={{ minWidth: '80px' }}>Starter<br /><span className="font-normal text-xs text-[#5B6472]">€299</span></th>
                    <th className="py-4 px-4 font-semibold text-[#8B5CFF] text-center bg-[#8B5CFF]/[0.03]" style={{ minWidth: '80px' }}>Business<br /><span className="font-normal text-xs text-[#5B6472]">€399</span></th>
                    <th className="py-4 px-4 font-semibold text-center" style={{ minWidth: '80px', color: '#6B3FD4' }}>Premium<br /><span className="font-normal text-xs text-[#5B6472]">€699</span></th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"}>
                      <td className="py-3.5 px-4 text-[#111315] font-medium">{row.feature}</td>
                      <td className="py-3.5 px-4 text-center">
                        {typeof row.starter === "boolean" ? (
                          row.starter ? <CheckCircle2 size={18} className="text-[#5B8CFF] mx-auto" /> : <X size={18} className="text-[#D1D5DB] mx-auto" />
                        ) : (
                          <span className="text-sm text-[#5B6472]">{row.starter}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center bg-[#8B5CFF]/[0.03]">
                        {typeof row.business === "boolean" ? (
                          row.business ? <CheckCircle2 size={18} className="text-[#8B5CFF] mx-auto" /> : <X size={18} className="text-[#D1D5DB] mx-auto" />
                        ) : (
                          <span className="text-sm text-[#5B6472]">{row.business}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {typeof row.pro === "boolean" ? (
                          row.pro ? <CheckCircle2 size={18} className="mx-auto" style={{ color: '#6B3FD4' }} /> : <X size={18} className="text-[#D1D5DB] mx-auto" />
                        ) : (
                          <span className="text-sm text-[#5B6472]">{row.pro}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Συχνές Ερωτήσεις */}
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl">
          <AnimateIn className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#111315] mb-4">Συχνές Ερωτήσεις</h2>
          </AnimateIn>
          <StaggerContainer className="space-y-4">
            {[
              { q: "Μπορώ να δω προεπισκόπηση πριν πληρώσω;", a: "Ναι. Πάντα μοιραζόμαστε μια προεπισκόπηση σχεδιασμού για έγκρισή σας πριν προχωρήσουμε στην ανάπτυξη. Δεν θα πληρώσετε ούτε ένα ευρώ μέχρι να είστε ικανοποιημένοι με την κατεύθυνση." },
              { q: "Μπορώ να αναβαθμίσω το πλάνο μου αργότερα;", a: "Φυσικά. Αν ξεκινήσετε με το Starter πλάνο και αργότερα αποφασίσετε ότι χρειάζεστε περισσότερες σελίδες ή λειτουργίες, μπορούμε να αναβαθμίσουμε την ιστοσελίδα σας ανά πάσα στιγμή. Πληρώνετε μόνο τη διαφορά." },
              { q: "Υπάρχουν κρυφές χρεώσεις;", a: "Όχι. Η τιμή που βλέπετε είναι η τιμή που πληρώνετε. Τα κόστη hosting και domain είναι ξεχωριστά (συνήθως €10-15/μήνα) αλλά θα σας εξηγήσουμε τα πάντα εκ των προτέρων." },
              { q: "Τι είναι η προσφορά bundle συντήρησης;", a: "Αν εγγραφείτε σε οποιοδήποτε μηνιαίο πλάνο συντήρησης ταυτόχρονα με την κατασκευή της ιστοσελίδας σας, κερδίζετε €50 έκπτωση στην κατασκευή. Πρόκειται για εφάπαξ έκπτωση - το μηνιαίο πλάνο συνεχίζεται στην κανονική τιμή. Μπορείτε να ακυρώσετε το πλάνο συντήρησης ανά πάσα στιγμή χωρίς ποινή." },
              { q: "Τι γίνεται αν χρειαστώ αλλαγές μετά το launch;", a: "Μικρές αλλαγές κειμένου είναι δωρεάν για τον πρώτο μήνα. Μετά από αυτό, τα πλάνα συντήρησής μας καλύπτουν συνεχείς ενημερώσεις, ή μπορείτε να ζητήσετε μεμονωμένες αλλαγές σε συμφωνημένη τιμή." },
              { q: "Είναι δική μου η ιστοσελίδα;", a: "Ναι, 100%. Μόλις πληρωθεί, η ιστοσελίδα και όλο το περιεχόμενό της ανήκουν σε εσάς." },
              { q: "Είναι πραγματικά δωρεάν η συμβουλευτική;", a: "Απολύτως. Ξεκινάμε με μια χαλαρή συνομιλία στο WhatsApp για να κατανοήσουμε την επιχείρησή σας και να προτείνουμε το κατάλληλο πακέτο. Χωρίς δέσμευση." },
              { q: "Τι θεωρείται Enterprise project;", a: "Το Enterprise αφορά επιχειρήσεις που χρειάζονται κάτι πέρα από τα τυπικά μας πακέτα - σκεφτείτε multi-page builds με custom ενσωματώσεις, CRM συνδέσεις, υποστήριξη πολλαπλών γλωσσών, ή οργανισμούς που θέλουν αφοσιωμένο project manager και ongoing retainer. Αν δεν είστε σίγουροι, απλά επικοινωνήστε μαζί μας και θα σας συμβουλεύσουμε ειλικρινά." },
            ].map((item) => (
              <StaggerItem key={item.q}>
                <div className="dm-card !p-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle size={20} className="text-[#5B8CFF] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-base font-semibold text-[#111315] mb-2">{item.q}</h3>
                      <p className="text-sm text-[#5B6472] leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="container max-w-3xl text-center">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111315] mb-5">Έτοιμοι να ξεκινήσετε;</h2>
            <p className="text-lg text-[#5B6472] mb-8">Κλείστε δωρεάν συμβουλευτική και θα σας προτείνουμε το κατάλληλο πλάνο για την επιχείρησή σας.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/el/contact" className="btn-primary">
                <MessageCircle size={18} /> Κλείστε Δωρεάν Συμβουλευτική
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                WhatsApp
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
