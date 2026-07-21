/* ============================================================
   D&M LABS - Αρχικήpage
   Hero with gradient atmosphere + floating devices
   Sections: Hero, Trust Strip, Template Showcase + Industries, Υπηρεσίες, Διαδικασία, Testimonials, Τιμές, Stats, CTA
   Brand: #5B8CFF→#6FE3FF→#8B5CFF, #F6F6F4 base, #0F172A dark
   ============================================================ */
import { } from "react";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import {
  Globe, Smartphone, Search, Zap, Shield, Clock,
  CheckCircle2, ArrowRight, MessageCircle,
  Utensils, Scissors, Stethoscope, Dumbbell,
  Palette, Code, Rocket, Headphones, Quote, HelpCircle,
  Users, CalendarCheck, Languages
} from "lucide-react";

// ─── Hand-crafted card mockups for homepage template showcase ────
const HOMEPAGE_CARD_DESIGNS: Record<string, React.FC> = {
  "nomad-coffee": () => (
    <div style={{ height: "220px", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0", background: "#1a1208" }}>
      <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80" alt="Nomad Coffee cafe interior with warm lighting" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(26,18,8,0.88) 40%, rgba(26,18,8,0.3) 100%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "32px", display: "flex", alignItems: "center", padding: "0 14px", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: "11px", fontWeight: 700, color: "#c8a96e", letterSpacing: "0.06em" }}>Nomad Co.</span>
        <div style={{ display: "flex", gap: "10px" }}>
          {["Μενού","Ιστορία","Κόκκοι"].map(l => <span key={l} style={{ fontSize: "7px", color: "rgba(200,169,110,0.7)" }}>{l}</span>)}
        </div>
      </div>
      <div style={{ position: "absolute", top: "44px", left: "16px", maxWidth: "55%" }}>
        <div style={{ fontSize: "7px", letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "#c8a96e", marginBottom: "4px" }}>Specialty Coffee - Λεμεσός</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "18px", fontWeight: 400, color: "#f7f0e6", lineHeight: 1.2, marginBottom: "5px" }}>Καφές που Αξίζει<br/><em style={{ color: "#c8a96e" }}>να Χαλαρώσεις</em> Για</div>
        <div style={{ fontSize: "7px", color: "rgba(247,240,230,0.65)", lineHeight: 1.5, marginBottom: "8px" }}>Κόκκοι μονής προέλευσης,<br/>ψημένοι σε μικρές παρτίδες.</div>
        <div style={{ background: "#c8a96e", color: "#1a1208", fontSize: "7px", padding: "4px 10px", fontWeight: 700, display: "inline-block" }}>Δείτε το Μενού μας</div>
      </div>
      <div style={{ position: "absolute", top: "36px", right: "7px", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", borderRadius: "20px", padding: "2px 7px", display: "flex", alignItems: "center", gap: "3px" }}>
        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#4ade80" }} />
        <span style={{ color: "#fff", fontSize: "7px", fontWeight: 600, letterSpacing: "0.06em" }}>Demo</span>
      </div>
    </div>
  ),
  "bella-salon": () => (
    <div style={{ height: "220px", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0", background: "#f7f0e8" }}>
      <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&q=80" alt="Bella Salon beauty studio interior" style={{ position: "absolute", right: 0, top: 0, width: "55%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #f7f0e8 45%, transparent 75%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "32px", background: "rgba(247,240,232,0.95)", display: "flex", alignItems: "center", padding: "0 14px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: "11px", fontWeight: 700, color: "#2a1a14", letterSpacing: "0.04em" }}>Bella.</span>
        <div style={{ display: "flex", gap: "10px" }}>
          {["Υπηρεσίες","Γκαλερί","Κράτηση"].map(l => <span key={l} style={{ fontSize: "7px", color: "#7a5a4a", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>{l}</span>)}
        </div>
      </div>
      <div style={{ position: "absolute", top: "44px", left: "16px", maxWidth: "48%" }}>
        <div style={{ fontSize: "7px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#c4735a", marginBottom: "5px" }}>Ομορφιά Studio</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "18px", fontWeight: 400, color: "#2a1a14", lineHeight: 1.2, marginBottom: "6px", fontStyle: "italic" as const }}>Όπου η Ομορφιά<br/><em style={{ color: "#c4735a" }}>Συναντά</em> την Τέχνη</div>
        <div style={{ fontSize: "7px", color: "#7a5a4a", lineHeight: 1.5, marginBottom: "8px" }}>Εξειδικευμένες περιποιήσεις<br/>σε πολυτελές περιβάλλον.</div>
        <div style={{ background: "#c4735a", color: "#fff", fontSize: "7px", padding: "4px 10px", display: "inline-block", letterSpacing: "0.1em" }}>Κλείστε Ραντεβού</div>
      </div>
      <div style={{ position: "absolute", top: "36px", right: "7px", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)", borderRadius: "20px", padding: "2px 7px", display: "flex", alignItems: "center", gap: "3px" }}>
        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#4ade80" }} />
        <span style={{ color: "#fff", fontSize: "7px", fontWeight: 600, letterSpacing: "0.06em" }}>Demo</span>
      </div>
    </div>
  ),
  "dr-elara-dental": () => (
    <div style={{ height: "220px", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0", background: "#f5f9ff" }}>
      <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=700&q=80" alt="Dr. Elara Dental modern dental clinic" style={{ position: "absolute", right: 0, top: 0, width: "50%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #f5f9ff 48%, transparent 72%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "32px", background: "rgba(245,249,255,0.97)", display: "flex", alignItems: "center", padding: "0 14px", justifyContent: "space-between", borderBottom: "1px solid rgba(33,150,243,0.12)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div style={{ width: "14px", height: "14px", borderRadius: "3px", background: "#2196f3" }} />
          <span style={{ fontSize: "9px", fontWeight: 700, color: "#0a1628" }}>Dr. Elara Dental</span>
        </div>
        <div style={{ background: "#2196f3", color: "#fff", fontSize: "7px", padding: "3px 8px", borderRadius: "3px", fontWeight: 600 }}>Κλείστε Ραντεβού</div>
      </div>
      <div style={{ position: "absolute", top: "44px", left: "16px", maxWidth: "50%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "6px" }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80" }} />
          <span style={{ fontSize: "7px", color: "#2196f3", fontWeight: 600 }}>Δεχόμαστε Νέους Ασθενείς</span>
        </div>
        <div style={{ fontSize: "17px", fontWeight: 800, color: "#0a1628", lineHeight: 1.15, marginBottom: "5px" }}>Το Χαμόγελό σας,<br/><span style={{ color: "#2196f3", fontStyle: "italic" as const, fontFamily: "Georgia, serif" }}>Τέλειο</span><br/>με Φροντίδα</div>
        <div style={{ fontSize: "7px", color: "#4a6080", lineHeight: 1.5, marginBottom: "8px" }}>Σύγχρονη οδοντιατρική σε ήρεμο,<br/>άνετο περιβάλλον.</div>
        <div style={{ background: "#2196f3", color: "#fff", fontSize: "7px", padding: "4px 10px", display: "inline-block", borderRadius: "3px", fontWeight: 600 }}>Δείτε Θεραπείες</div>
      </div>
      <div style={{ position: "absolute", top: "36px", right: "7px", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)", borderRadius: "20px", padding: "2px 7px", display: "flex", alignItems: "center", gap: "3px" }}>
        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#4ade80" }} />
        <span style={{ color: "#fff", fontSize: "7px", fontWeight: 600, letterSpacing: "0.06em" }}>Demo</span>
      </div>
    </div>
  ),
};

function HomeElCardPreview({ tplId, category }: { tplId: string; category: string }) {
  const CardDesign = HOMEPAGE_CARD_DESIGNS[tplId];
  if (!CardDesign) return null;
  return (
    <div className="relative w-full overflow-hidden">
      <CardDesign />
      {/* Category badge */}
      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-[#111315] z-10">
        {category}
      </div>
    </div>
  );
}

const HERO_DEVICES = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/hero-devices-v2-8JXhBrX7f82um3hxnU6TmE.webp";
const GRADIENT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/gradient-mesh-bg-nrkTNmAHHWeVJB3ubHRGDu.webp";
const TRIANGLE_GEO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/triangle-geometry-Rf9Cpg8ynqtbpdNzPsSccU.webp";
const DARK_CTA_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/dark-cta-bg-LgZ8epcpi9XDGLof5Q9KgS.webp";

// Featured live-preview mini-sites for the homepage showcase
// Using the same mini-site HTML files as the Templates page
const FEATURED_TEMPLATES = [
  {
    id: "nomad-coffee",
    industry: "restaurant",
    name: "Nomad Coffee",
    category: "Καφετέρια & Καφές",
    styleLabel: "Artisan Minimal",
    previewUrl: "/previews/nomad-coffee.html",
    palette: ["#1a1208", "#2c1f0e"],
  },
  {
    id: "bella-salon",
    industry: "beauty",
    name: "Bella Salon",
    category: "Ομορφιά & Wellness",
    styleLabel: "Κομψό & Θηλυκό",
    previewUrl: "/previews/bella-salon.html",
    palette: ["#1a0a0f", "#6b2d3e"],
  },
  {
    id: "dr-elara-dental",
    industry: "clinic",
    name: "Dr. Elara Dental",
    category: "Κλινικές & Υγεία",
    styleLabel: "Καθαρό & Επαγγελματικό",
    previewUrl: "/previews/dr-elara-dental.html",
    palette: ["#0a1628", "#0d2040"],
  },
];

const TESTIMONIALS = [
  {
    name: "Maria K.",
    role: "Ιδιοκτήτρια Εστιατορίου",
    text: "Η νέα μας ιστοσελίδα έφερε τρεις νέες κρατήσεις μέσα στην πρώτη εβδομάδα. Η ομάδα κατάλαβε ακριβώς τι χρειαζόμασταν και παρέδωσε πιο γρήγορα από ό,τι περίμενα. Το συνιστώ ανεπιφύλακτα.",
    rating: 5,
    initial: "M",
  },
  {
    name: "Andreas P.",
    role: "Κλινική Φυσιοθεραπείας",
    text: "Επαγγελματικοί, άμεσοι και πραγματικά αφοσιωμένοι στο να κάνουν την κλινική μας να φαίνεται στο καλύτερό της online. Η mobile έκδοση είναι τέλεια - οι περισσότεροι ασθενείς μας κλείνουν ραντεβού από το κινητό τους.",
    rating: 5,
    initial: "A",
  },
  {
    name: "Sophia L.",
    role: "Ιδιοκτήτρια Σαλονιού Ομορφιάς",
    text: "Ήμουν ανήσυχη για την κατασκευή ιστοσελίδας, αλλά η DM-Labs.io έκανε όλη τη διαδικασία εντελώς άνετη και χωρίς άγχος. Ανέλαβαν τα πάντα και το αποτέλεσμα είναι εκπληκτικό. Άξιζε κάθε σεντ.",
    rating: 5,
    initial: "S",
  },
];

export default function HomeElPage() {
  useSEO({
    title: "DM-Labs.io | Επαγγελματικός Σχεδιασμός Ιστοσελίδων από €299",
    description: "Η DM-Labs.io κατασκευάζει custom, mobile-first ιστοσελίδες για επιχειρήσεις. Γρήγορη παράδοση, έτοιμες για SEO, από €299.",
  });
  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: "90vh" }}>
        {/* Background Atmosphere Layers */}
        <div className="absolute inset-0 z-0">
          <img
            src={GRADIENT_BG}
            alt=""
            role="presentation"
            className="absolute inset-0 w-full h-full object-cover opacity-15"
            aria-hidden="true"
          />
        </div>
        <div className="absolute top-10 right-0 w-[500px] h-[500px] opacity-[0.06] animate-float-slower pointer-events-none z-0">
          <img src={TRIANGLE_GEO} alt="" role="presentation" className="w-full h-full object-contain" aria-hidden="true" />
        </div>
        <div className="absolute bottom-0 left-10 w-[300px] h-[300px] opacity-[0.04] animate-float-slow pointer-events-none z-0" style={{ animationDelay: "-8s" }}>
          <img src={TRIANGLE_GEO} alt="" role="presentation" className="w-full h-full object-contain rotate-180" aria-hidden="true" />
        </div>
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5B8CFF] rounded-full blur-[120px] opacity-[0.08] animate-pulse-glow pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#8B5CFF] rounded-full blur-[100px] opacity-[0.06] animate-pulse-glow pointer-events-none z-0" style={{ animationDelay: "-4s" }} />

        <div className="container relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-8" style={{ paddingTop: "clamp(3rem, 8vh, 8rem)", paddingBottom: "clamp(2rem, 5vh, 6rem)" }}>
          {/* Left: Text */}
          <div className="flex-1 max-w-xl text-center md:text-left">
            <AnimateIn variant="fade-up" delay={0.1}>
              <p className="text-sm font-medium text-[#5B6472] mb-4 tracking-wide uppercase">
                Ολοκληρωμένες Λύσεις Ιστοσελίδας
              </p>
            </AnimateIn>
            <AnimateIn variant="fade-up" delay={0.2}>
              <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-bold text-[#111315] leading-[1.1] mb-6">
                Η επιχείρησή σας είναι σπουδαία.{" "}
                <span className="brand-gradient-text">Η ιστοσελίδα σας πρέπει να το δείχνει.</span>
              </h1>
            </AnimateIn>
            <AnimateIn variant="fade-up" delay={0.3}>
              <p className="text-lg text-[#5B6472] leading-relaxed mb-8 max-w-md">
                Είμαστε μια εξειδικευμένη εταιρεία web design. Φτιάχνουμε επαγγελματικές, γρήγορες ιστοσελίδες που φέρνουν αποτελέσματα για επιχειρήσεις σαν τη δική σας - από €299.
              </p>
            </AnimateIn>

            <AnimateIn variant="fade-up" delay={0.4}>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link href="/el/contact" className="btn-primary">
                  Δωρεάν Συμβουλευτική
                  <ArrowRight size={18} />
                </Link>
                <Link href="/el/templates" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#5B8CFF] text-[#5B8CFF] font-semibold hover:bg-[#5B8CFF] hover:text-white transition-all duration-300">
                  Δείτε Παραδείγματα
                  <ArrowRight size={18} />
                </Link>
              </div>
            </AnimateIn>
          </div>

          {/* Right: Device Mockup */}
          <div className="flex-1 flex justify-center md:justify-end">
            <AnimateIn variant="fade-up" delay={0.5} className="relative">
              <div className="animate-float-slow">
                <img
                  src={HERO_DEVICES}
                  alt="DM-Labs.io website preview on laptop and mobile"
                  className="w-full max-w-[260px] sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl drop-shadow-2xl"
                />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRUST STRIP
          ═══════════════════════════════════════════ */}
      <section className="bg-white border-y border-[#E2E5EA]">
        <div className="container py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              "Χωρίς Κρυφές Χρεώσεις",
              "Παράδοση σε Μέρες",
              "Mobile Responsive",
              "SEO Βελτιστοποιημένο",
              "Ευρωπαϊκή Ομάδα",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-[#5B6472]">
                <CheckCircle2 size={16} className="text-[#5B8CFF] shrink-0" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TEMPLATE SHOWCASE + INDUSTRY GRID
          (moved directly after trust strip)
          ═══════════════════════════════════════════ */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <img src={GRADIENT_BG} alt="" role="presentation" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        <div className="container relative z-10">
          {/* -- Template Showcase Grid -- */}
          <AnimateIn className="text-center mb-10">
            <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Έμπνευση Σχεδιασμού</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111315] mb-3">
              Δείτε Τι Μπορούμε να Δημιουργήσουμε για Εσάς
            </h2>
            <p className="text-base text-[#5B6472] max-w-2xl mx-auto">
              Κάθε ιστοσελίδα που φτιάχνουμε είναι <strong className="text-[#111315]">εντελώς custom</strong> - σχεδιασμένη από μηδενική βάση γύρω από το brand σας, το περιεχόμενό σας και τους πελάτες σας. Αυτά τα παραδείγματα δείχνουν το εύρος στυλ και κλάδων με τους οποίους δουλεύουμε. Σκεφτείτε τα ως έμπνευση, όχι ως έτοιμα πακέτα.
            </p>
          </AnimateIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 items-stretch">
            {FEATURED_TEMPLATES.map((tpl) => (
              <StaggerItem key={tpl.id} className="flex">
                <Link href={`/el/examples?open=${tpl.id}`} className="flex w-full">
                  <div className="dm-card !p-0 overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group flex flex-col w-full">
                    {/* Hand-crafted card mockup */}
                    <HomeElCardPreview tplId={tpl.id} category={tpl.category} />

                    {/* Card Details */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="mb-2">
                        <h4 className="font-semibold text-[#111315] text-base leading-tight">{tpl.name}</h4>
                        <p className="text-xs text-[#5B6472] mt-0.5">{tpl.styleLabel}</p>
                      </div>

                      {/* Learn More - pinned to bottom */}
                      <div className="mt-auto flex items-center gap-1 text-sm font-semibold text-[#5B8CFF] group-hover:gap-2 transition-all">
                        Δείτε παράδειγμα <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateIn className="text-center mb-16">
            <Link href="/el/examples" className="btn-primary">
              Δείτε Όλα τα Παραδείγματα
              <ArrowRight size={16} />
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES OVERVIEW
          ═══════════════════════════════════════════ */}
      <section className="section-spacing">
        <div className="container">
          <AnimateIn className="text-center mb-16">
            <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Οι Υπηρεσίες μας</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111315] mb-4">
              Εξειδικευμένες Λύσεις για την Online Παρουσία σας
            </h2>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto">
              Ό,τι χρειάζεστε για να αποκτήσετε επαγγελματική παρουσία στο διαδίκτυο, από τον σχεδιασμό μέχρι την κυκλοφορία και πέρα από αυτή.
            </p>
          </AnimateIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: Globe, title: "Custom Σχεδιασμός Ιστοσελίδας", desc: "Μοναδικές, branded ιστοσελίδες προσαρμοσμένες στην ταυτότητα και τους στόχους της επιχείρησής σας. Κανένα έτοιμο πρότυπο - κάθε ιστοσελίδα φτιάχνεται από μηδενική βάση.", anchor: "custom-design" },
              { icon: Smartphone, title: "Mobile-First Ανάπτυξη", desc: "Κάθε ιστοσελίδα σχεδιάζεται mobile-first, εξασφαλίζοντας άψογη εμπειρία σε κινητά, tablet και desktop.", anchor: "mobile-first" },
              { icon: Search, title: "SEO Βελτιστοποίηση", desc: "Ενσωματωμένη βελτιστοποίηση μηχανών αναζήτησης ώστε οι πελάτες σας να σας βρίσκουν στο Google από την πρώτη μέρα.", anchor: "seo" },
              { icon: Zap, title: "Γρήγορη Απόδοση", desc: "Εξαιρετικά γρήγοροι χρόνοι φόρτωσης με βελτιστοποιημένο κώδικα. Η ταχύτητα έχει σημασία για τις μετατροπές και τις κατατάξεις.", anchor: "performance" },
              { icon: Shield, title: "Ασφαλής και Αξιόπιστη", desc: "Πιστοποιητικά SSL, ασφαλής φιλοξενία και τακτικά αντίγραφα ασφαλείας για να παραμένει η ιστοσελίδα σας ασφαλής και πάντα διαθέσιμη.", anchor: "security" },
              { icon: Clock, title: "Γρήγορη Παράδοση", desc: "Από την ιδέα στην κυκλοφορία σε 5-14 εργάσιμες μέρες. Κινούμαστε γρήγορα χωρίς να θυσιάζουμε την ποιότητα.", anchor: "turnaround" },
            ].map((service) => (
              <StaggerItem key={service.title}>
                <Link href={`/el/services/${service.anchor}`}>
                  <div className="dm-card h-full cursor-pointer hover:border-[#5B8CFF]/40 hover:-translate-y-1 transition-all duration-300">
                    <div className="icon-container-gradient mb-5">
                      <service.icon size={24} className="text-[#5B8CFF]" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg font-semibold text-[#111315] mb-2">{service.title}</h3>
                    <p className="text-sm text-[#5B6472] leading-relaxed mb-4">{service.desc}</p>
                    <span className="text-sm font-medium text-[#5B8CFF] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Μάθετε περισσότερα <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PROCESS OVERVIEW
          ═══════════════════════════════════════════ */}
      <section className="section-spacing relative overflow-hidden" style={{ background: "linear-gradient(135deg, #F8FAFF 0%, #F0F4FF 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <img src={GRADIENT_BG} alt="" role="presentation" className="w-full h-full object-cover" aria-hidden="true" />
        </div>

        <div className="container relative z-10">
          <AnimateIn className="text-center mb-16">
            <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Πώς Λειτουργεί</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111315] mb-4">
              Από την Ιδέα στο Κυκλοφορία σε 5 Απλά Βήματα
            </h2>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto">
              Έχουμε απλοποιήσει τη διαδικασία ώστε εσείς να εστιάζετε στη διαχείριση της επιχείρησής σας.
            </p>
          </AnimateIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: MessageCircle, step: "01", title: "Αρχική Κλήση", desc: "Γρήγορη συνομιλία μέσω WhatsApp για να κατανοήσουμε την επιχείρησή σας και τους στόχους σας.", time: "~1 μέρα", color: "#5B8CFF" },
              { icon: Palette, step: "02", title: "Σχεδιασμός", desc: "Δημιουργούμε custom σχεδιασμό βάσει του brand και των προτιμήσεων σας.", time: "2-3 μέρες", color: "#6FE3FF" },
              { icon: Code, step: "03", title: "Κατασκευή", desc: "Η ιστοσελίδα σας αναπτύσσεται με καθαρό κώδικα, βελτιστοποιημένη για ταχύτητα και SEO.", time: "3-5 μέρες", color: "#8B5CFF" },
              { icon: Headphones, step: "04", title: "Αναθεωρήσεις", desc: "Βελτιώνουμε τον σχεδιασμό βάσει των σχολίων σας μέχρι να είστε απόλυτα ικανοποιημένοι.", time: "1-2 μέρες", color: "#5B8CFF" },
              { icon: Rocket, step: "05", title: "Κυκλοφορία", desc: "Δημοσιεύουμε την ιστοσελίδα σας, συνδέουμε το domain σας και βεβαιωνόμαστε ότι όλα λειτουργούν.", time: "~1 μέρα", color: "#6FE3FF" },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ background: `${item.color}12` }}>
                    <item.icon size={28} style={{ color: item.color }} strokeWidth={1.75} />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full brand-gradient text-white text-xs font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-[#111315] mb-1">{item.title}</h3>
                  <p className="text-xs text-[#8B5CFF] font-medium mb-2">{item.time}</p>
                  <p className="text-sm text-[#5B6472] leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateIn className="text-center mt-12">
            <Link href="/el/process" className="btn-secondary">
              Δείτε Ολόκληρη τη Διαδικασία
              <ArrowRight size={16} />
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════════ */}
      <section className="section-spacing bg-white">
        <div className="container">
          <AnimateIn className="text-center mb-14">
              <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Ιστορίες Πελατών</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111315] mb-4">
              Τι Λένε οι Πελάτες μας
            </h2>
            <p className="text-lg text-[#5B6472] max-w-xl mx-auto">
              Πρώτες εντυπώσεις από τις επιχειρήσεις με τις οποίες έχουμε συνεργαστεί.
            </p>
          </AnimateIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((t) => (
              <StaggerItem key={t.name}>
                <div className="dm-card h-full flex flex-col relative">
                  {/* Quote icon */}
                  <div className="absolute top-5 right-5 opacity-10">
                    <Quote size={40} className="text-[#5B8CFF]" />
                  </div>
                
                  {/* Quote text */}
                  <p className="text-sm text-[#3D4550] leading-relaxed mb-6 flex-1 italic">
                    "{t.text}"
                  </p>
                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[#E2E5EA]">
                    <div className="w-10 h-10 rounded-full brand-gradient flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {t.initial}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#111315]">{t.name}</p>
                      <p className="text-xs text-[#5B6472]">{t.role}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRICING PREVIEW
          ═══════════════════════════════════════════ */}
      <section className="section-spacing relative overflow-hidden" style={{ background: "linear-gradient(135deg, #F8FAFF 0%, #F0F4FF 100%)" }}>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <img src={GRADIENT_BG} alt="" role="presentation" className="w-full h-full object-cover" aria-hidden="true" />
        </div>

        <div className="container relative z-10">
          <AnimateIn className="text-center mb-16">
            <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Διαφανείς Τιμές</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111315] mb-4">
              Απλές, Ειλικρινείς Τιμές
            </h2>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-5">
              Χωρίς κρυφές χρεώσεις. Χωρίς εκπλήξεις. Διαφανείς τιμές για κάθε project.
            </p>
           </AnimateIn>

          {/* Τιμές Εκκίνησης Full-Width Banner */}
          <div
            className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 py-4 px-6 mb-10 rounded-xl text-center sm:text-left"
            style={{ background: "linear-gradient(90deg, #5B8CFF 0%, #6FE3FF 50%, #8B5CFF 100%)" }}
          >
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-white animate-pulse opacity-80" />
            <span className="text-base sm:text-lg font-bold text-white tracking-widest uppercase">Τιμές Εκκίνησης</span>
            <span className="hidden sm:block w-px h-5 bg-white/40" />
            <span className="text-sm sm:text-base text-white/90 font-medium">Εισαγωγικές τιμές διαθέσιμες τώρα. <span className="font-bold text-white">Κλείστε τη θέση σας σήμερα.</span></span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">

            {/* Starter */}
            <AnimateIn delay={0.1}>
              <div className="dm-card h-full flex flex-col">
                <p className="text-sm font-semibold text-[#5B8CFF] uppercase tracking-wide mb-2">Starter</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-[#111315]">€299</span>
                  <span className="text-sm text-[#5B6472]">εφάπαξ</span>
                </div>
                <p className="text-xs text-[#5B8CFF] font-medium mb-4">€249 με πακέτο συντήρησης</p>
                <p className="text-sm text-[#5B6472] mb-6">Ιδανικό για νέες επιχειρήσεις που χρειάζονται γρήγορα μια καθαρή, επαγγελματική παρουσία στο διαδίκτυο.</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {["Επώνυμη επαγγελματική σελίδα", "Responsive για κινητά", "Κουμπί WhatsApp", "Σύνδεσμοι social media", "Widget προσβασιμότητας (δωρεάν)", "2 γύροι αναθεωρήσεων", "Παράδοση σε 5-7 μέρες"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                      <CheckCircle2 size={16} className="text-[#5B8CFF] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/el/contact" className="btn-secondary w-full justify-center">
                  Δωρεάν Συμβουλευτική
                </Link>
              </div>
            </AnimateIn>

            {/* Business - Προτεινόμενο */}
            <AnimateIn delay={0.2}>
              <div className="brand-gradient-border h-full">
                <div className="dm-card h-full flex flex-col !shadow-none relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full brand-gradient text-white text-xs font-semibold whitespace-nowrap">Προτεινόμενο</span>
                  <p className="text-sm font-semibold text-[#8B5CFF] uppercase tracking-wide mb-2">Business</p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-bold text-[#111315]">€399</span>
                    <span className="text-sm text-[#5B6472]">εφάπαξ</span>
                  </div>
                  <p className="text-xs text-[#8B5CFF] font-medium mb-4">€349 με πακέτο συντήρησης</p>
                  <p className="text-sm text-[#5B6472] mb-6">Για εδραιωμένες επιχειρήσεις που χρειάζονται μια ολοκληρωμένη ιστοσελίδα με έμφαση στις μετατροπές.</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {["Έως 5 σελίδες", "Responsive για κινητά", "Κουμπί WhatsApp + social media", "Φόρμα επικοινωνίας + κρατήσεων", "Google Maps + Reviews widget", "Ενότητα μαρτυριών", "Βασική SEO βελτιστοποίηση", "Βελτιστοποίηση ταχύτητας", "Widget προσβασιμότητας (δωρεάν)", "3 γύροι αναθεωρήσεων", "Παράδοση σε 7-10 μέρες"].map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                        <CheckCircle2 size={16} className="text-[#8B5CFF] shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/el/contact" className="btn-primary w-full justify-center">
                    Δωρεάν Συμβουλευτική
                  </Link>
                </div>
              </div>
            </AnimateIn>

            {/* Premium */}
            <AnimateIn delay={0.3}>
              <div className="dm-card h-full flex flex-col">
                <p className="text-sm font-semibold text-[#6FE3FF] uppercase tracking-wide mb-2">Premium</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-[#111315]">€699</span>
                  <span className="text-sm text-[#5B6472]">εφάπαξ</span>
                </div>
                <p className="text-xs text-[#6FE3FF] font-medium mb-4">€649 με πακέτο συντήρησης</p>
                <p className="text-sm text-[#5B6472] mb-6">Για επιχειρήσεις που θέλουν μια εντελώς custom, πλούσια σε λειτουργίες ιστοσελίδα με τα πάντα συμπεριλαμβανόμενα.</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {["Έως 7 σελίδες", "Πλήρως custom σχεδιασμός + animations", "Responsive για κινητά", "Κουμπί WhatsApp + social media", "Φόρμα επικοινωνίας + κρατήσεων", "Google Maps + Reviews widget", "Μαρτυρίες + gallery", "5 SEO blog άρθρα", "Πλήρης meta/SEO δομή", "Pop-up συμπεριλαμβάνεται", "Widget προσβασιμότητας (δωρεάν)", "5 γύροι αναθεωρήσεων", "Παράδοση σε 10-14 μέρες"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                      <CheckCircle2 size={16} className="text-[#6FE3FF] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/el/contact" className="btn-secondary w-full justify-center">
                  Δωρεάν Συμβουλευτική
                </Link>
              </div>
            </AnimateIn>

          </div>

          {/* Enterprise Wide Banner */}
          <AnimateIn delay={0.4} className="mt-8 max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1117 0%, #161b2e 50%, #0d1117 100%)", border: "1px solid rgba(91,140,255,0.2)" }}>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 p-8">

                {/* Left: label + price + description */}
                <div className="flex-shrink-0 lg:w-64">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "linear-gradient(90deg, #5B8CFF, #8B5CFF)", color: "#fff" }}>Φτιαγμένο για Εσάς</span>
                  <p className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: "#6FE3FF" }}>Enterprise</p>
                  <p className="text-4xl font-bold text-white mb-1">Προσαρμοσμένη</p>
                  <p className="text-xs font-medium mb-4" style={{ color: "#5B8CFF" }}>Τιμολόγηση προσαρμοσμένη στο project σας</p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Για μεγαλύτερες επιχειρήσεις και οργανισμούς που χρειάζονται μια πλήρως εξατομικευμένη λύση χτισμένη γύρω από τους στόχους τους.
                  </p>
                  <Link
                    href="/el/contact"
                    className="mt-6 inline-flex items-center justify-center gap-2 py-3 px-8 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(90deg, #5B8CFF, #8B5CFF)" }}
                  >
                    <MessageCircle size={16} /> Επικοινωνήστε μαζί μας
                  </Link>
                </div>

                {/* Divider */}
                <div className="hidden lg:block w-px self-stretch" style={{ background: "rgba(91,140,255,0.2)" }} />

                {/* Right: feature grid */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
                  {[
                    { icon: Globe, label: "Πλήρως custom σχεδιασμός από μηδενική βάση" },
                    { icon: Zap, label: "Απεριόριστες σελίδες" },
                    { icon: CalendarCheck, label: "Ενσωματώσεις CRM και κρατήσεων" },
                    { icon: Languages, label: "Υποστήριξη πολλαπλών γλωσσών" },
                    { icon: Users, label: "Αποκλειστικός project manager" },
                    { icon: Headphones, label: "Προτεραιότητα υποστήριξης και παράδοσης" },
                    { icon: ArrowRight, label: "Επιλογή συνεχούς συνεργασίας" },
                    { icon: CheckCircle2, label: "Custom SEO και στρατηγική περιεχομένου" },
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

          <AnimateIn className="text-center mt-10">
            <p className="text-sm text-[#5B6472] mb-3">
              Όλα τα πλάνα περιλαμβάνουν <span className="font-semibold text-[#111315]">δωρεάν συμβουλευτική</span> - χωρίς δέσμευση, χωρίς πίεση.
            </p>
            <Link href="/el/pricing" className="text-sm font-medium text-[#5B8CFF] hover:underline inline-flex items-center gap-1">
              Δείτε πλήρεις τιμές και πρόσθετα <ArrowRight size={14} />
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          INDUSTRIES WE SERVE
          ═══════════════════════════════════════════ */}
      <section className="section-spacing bg-white">
        <div className="container">
          <AnimateIn className="text-center mb-8">
            <p className="text-base text-[#5B6472]">Κλάδοι με τους οποίους συνεργαζόμαστε:</p>
          </AnimateIn>
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Utensils, label: "Εστιατόρια", industry: "restaurant" },
              { icon: Scissors, label: "Κομμωτήρια και Σαλόνια Ομορφιάς", industry: "beauty" },
              { icon: Stethoscope, label: "Κλινικές", industry: "clinic" },
              { icon: Dumbbell, label: "Fitness και Γυμναστήρια", industry: "fitness" },

            ].map((biz) => (
              <StaggerItem key={biz.label}>
                <Link href={`/el/examples?industry=${biz.industry}`}>
                  <div className="dm-card text-center !p-6 cursor-pointer hover:-translate-y-1 hover:border-[#5B8CFF]/40 transition-all duration-300">
                    <div className="icon-container-gradient mx-auto mb-4 !w-14 !h-14">
                      <biz.icon size={24} className="text-[#5B8CFF]" strokeWidth={1.75} />
                    </div>
                    <p className="text-sm font-semibold text-[#111315]">{biz.label}</p>
                    <p className="text-xs mt-1 text-[#5B8CFF]">Δείτε παραδείγματα →</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
          {/* Can't find your industry CTA */}
          <AnimateIn className="text-center mt-10">
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#F8FAFF] border border-[#5B8CFF]/20">
              <HelpCircle size={18} className="text-[#5B8CFF] shrink-0" />
              <p className="text-sm text-[#5B6472]">
                <strong className="text-[#111315]">Δεν βλέπετε τον κλάδο σας;</strong>{" "}
                Συνεργαζόμαστε με όλους τους τύπους επιχειρήσεων.{" "}
                <Link href="/el/contact" className="text-[#5B8CFF] font-medium hover:underline">
                  Επικοινωνήστε μαζί μας →
                </Link>
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS BANNER - vivid gradient, animated on scroll
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-16 sm:py-20"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E2A4A 50%, #0F172A 100%)" }}
      >
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#5B8CFF] rounded-full blur-[100px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#8B5CFF] rounded-full blur-[100px] opacity-15 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-[#6FE3FF] rounded-full blur-[80px] opacity-10 pointer-events-none" />
        <div className="container relative z-10">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: "5-14", label: "Μέρες έως Κυκλοφορία", sub: "από την πρώτη κλήση" },
              { value: "5★", label: "Ικανοποίηση Πελατών", sub: "το πρότυπό μας" },
              { value: "100%", label: "Mobile Βελτιστοποιημένο", sub: "κάθε project" },
              { value: "∞", label: "Συνεχής Υποστήριξη", sub: "είμαστε πάντα εδώ" },
            ].map((stat, i) => (
              <StaggerItem key={stat.label}>
                <div className="text-center group">
                  {/* Divider line on desktop */}
                  <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-0 w-px h-12 bg-white/10" />
                  <p
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: i % 2 === 0
                        ? "linear-gradient(135deg, #6FE3FF 0%, #5B8CFF 100%)"
                        : "linear-gradient(135deg, #A78BFF 0%, #6FE3FF 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-base font-semibold text-white mb-1">{stat.label}</p>
                  <p className="text-xs text-[#94A3B8]">{stat.sub}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHO WE ARE - Team Section
          ═══════════════════════════════════════════ */}
      <section className="section-spacing bg-white">
        <div className="container">
          <AnimateIn className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5B8CFF] mb-3">Οι άνθρωποι πίσω από τη δουλειά</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111315]">Ποιοι Είμαστε</h2>
          </AnimateIn>

          {/* Two stacked cards - horizontal on desktop, photo-top on mobile */}
          <div className="flex flex-col gap-8 max-w-3xl mx-auto">

            {/* Anastacia Card */}
            <AnimateIn delay={0.1}>
              <div className="group rounded-2xl border border-[#E2E5EA] bg-[#F8FAFF] hover:border-[#5B8CFF]/40 hover:shadow-xl transition-all duration-500 overflow-hidden">
                {/* MOBILE: compact horizontal - square photo left, text right */}
                <div className="flex md:hidden flex-row">
                  <div className="relative flex-shrink-0 overflow-hidden" style={{ width: '120px', minHeight: '160px' }}>
                    <img
                      src="https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/AtkkCmVLLZyIDtDx.jpg?Expires=1805807307&Signature=tzN5G6aXHi-UfC~wwQP9QpBquJu7jfUai~BOy1r~7Qda~jKdARzVUNxj2kHpbAYeKbodOKiH2SAISEd-8ahuVDDuFT8FRpVVIODCAoHNwGdtS3R-NxO1Rdk6jMzGgV6LBrV8NYFkC9UVgmTirPdOvuu0nU~oQveGK8laTlItVMz6lh1~fvBDI9XtPeOq5uoeavcTWtr6pK2-NzM9P3aou8f2OUmFe5dIPmosvEEq6tqZM-TMP~gysouA6xxzog2U90vPjLusE6VBWtCm6UC6DhakpHinArKvNun2PS-sm7Zqc8QqZkI1KD7dJEhDThyb5TRTwhDWXZELMMR1n-LeaA__&Key-Pair-Id=K2HSFNDJXOU9YS"
                      alt="Anastacia B. - Creative Director and AI Specialist at DM-Labs.io"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ objectPosition: 'center top' }}
                    />
                    <div className="absolute inset-y-0 right-0 w-5 bg-gradient-to-r from-transparent to-[#F8FAFF]" />
                  </div>
                  <div className="flex flex-col justify-between p-4 flex-1 min-w-0">
                    <div>
                      <h3 className="text-base font-bold text-[#111315] mb-0.5">Anastacia B.</h3>
                      <p className="text-xs font-semibold text-[#5B8CFF] mb-2">Creative Director &amp; AI Specialist</p>
                      <p className="text-xs text-[#5B6472] leading-relaxed">
                        Εργάστηκα με παγκόσμιες εταιρείες τεχνολογίας σε ψηφιακά προϊόντα και εφαρμογές τεχνητής νοημοσύνης. Ξέρω πώς να χρησιμοποιώ τα καλύτερα AI εργαλεία που υπάρχουν σήμερα - όχι για να αντικαταστήσουν τη δημιουργικότητα, αλλά για να παραδίδουμε πιο αποτελεσματικά αποτελέσματα, πιο γρήγορα, για κάθε πελάτη.
                      </p>
                    </div>
                    <div className="border-t border-[#E2E5EA] mt-3 pt-2">
                      <p className="text-xs italic text-[#111315] font-medium">&ldquo;Η ιστοσελίδα σας πρέπει να δουλεύει τόσο σκληρά όσο εσείς.&rdquo;</p>
                    </div>
                  </div>
                </div>

                {/* DESKTOP: horizontal flex - photo left, content right */}
                <div className="hidden md:flex flex-row">
                  <div className="relative flex-shrink-0 overflow-hidden" style={{ width: '200px', minHeight: '240px', maxHeight: '280px' }}>
                    <img
                      src="https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/AtkkCmVLLZyIDtDx.jpg?Expires=1805807307&Signature=tzN5G6aXHi-UfC~wwQP9QpBquJu7jfUai~BOy1r~7Qda~jKdARzVUNxj2kHpbAYeKbodOKiH2SAISEd-8ahuVDDuFT8FRpVVIODCAoHNwGdtS3R-NxO1Rdk6jMzGgV6LBrV8NYFkC9UVgmTirPdOvuu0nU~oQveGK8laTlItVMz6lh1~fvBDI9XtPeOq5uoeavcTWtr6pK2-NzM9P3aou8f2OUmFe5dIPmosvEEq6tqZM-TMP~gysouA6xxzog2U90vPjLusE6VBWtCm6UC6DhakpHinArKvNun2PS-sm7Zqc8QqZkI1KD7dJEhDThyb5TRTwhDWXZELMMR1n-LeaA__&Key-Pair-Id=K2HSFNDJXOU9YS"
                      alt="Anastacia B. - Creative Director and AI Specialist at DM-Labs.io"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: 'top center' }}
                    />
                    <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-r from-transparent to-[#F8FAFF]" />
                  </div>
                  <div className="flex flex-col justify-between p-7 flex-1">
                    <div>
                      <h3 className="text-xl font-bold text-[#111315] mb-0.5">Anastacia B.</h3>
                      <p className="text-sm font-semibold text-[#5B8CFF] mb-4">Creative Director &amp; AI Specialist</p>
                      <p className="text-sm text-[#5B6472] leading-relaxed">
                        Εργάστηκα με παγκόσμιες εταιρείες τεχνολογίας σε ψηφιακά προϊόντα και εφαρμογές τεχνητής νοημοσύνης. Καταλαβαίνω πώς να χρησιμοποιώ τα καλύτερα AI εργαλεία που υπάρχουν σήμερα - όχι για να αντικαταστήσουν τη δημιουργικότητα ή την ανθρώπινη κρίση, αλλά για να παραδίδουμε πιο αποτελεσματικά αποτελέσματα.
                      </p>
                    </div>
                    <div className="border-t border-[#E2E5EA] mt-5 pt-4">
                      <p className="text-sm italic text-[#111315] font-medium">&ldquo;Η ιστοσελίδα σας πρέπει να δουλεύει τόσο σκληρά όσο εσείς.&rdquo;</p>
                    </div>
                  </div>
                </div>


              </div>
            </AnimateIn>

            {/* Tom Card */}
            <AnimateIn delay={0.2}>
              <div className="group rounded-2xl border border-[#E2E5EA] bg-[#F8FAFF] hover:border-[#5B8CFF]/40 hover:shadow-xl transition-all duration-500 overflow-hidden">
                {/* MOBILE: compact horizontal - square photo left, text right */}
                <div className="flex md:hidden flex-row">
                  <div className="relative flex-shrink-0 overflow-hidden" style={{ width: '120px', minHeight: '160px' }}>
                    <img
                      src="https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/DVIoYisVQvzbqoiR.jpg?Expires=1805807307&Signature=sDadHPBIxNAi6lkiWTu64ioOt9Wvou6x~Akos8AKqATejLSMgwmbAZD8f~0e84UTqmXjYaSsbjvvamw1Y1h-3RSEbbutiwjpHPXGka~ZJRodfIKQQSPM9XytIixV9yDrEswB-7Jilroiu0d8A4D1mxlyvc1E0RR1AS2FrGj7ROLWp4T4vmB7rmiX0pXVhawbhH5D0H87lIyXVQ~Ue3ujz4AiyETwbvGuppqmVRXpmyZaqoDZTE9e1plVUn4-pR1jG9l2Pblw-D9VBnUxZuiBxEx2C5BUJOnjFEM6hS6RzjFEGwjQrEa3UFRhednppWiPKLZSbrjPQnzoh-jisjzTQA__&Key-Pair-Id=K2HSFNDJXOU9YS"
                      alt="Tom B. - Technical Director and SEO Expert at DM-Labs.io"
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-y-0 right-0 w-5 bg-gradient-to-r from-transparent to-[#F8FAFF]" />
                  </div>
                  <div className="flex flex-col justify-between p-4 flex-1 min-w-0">
                    <div>
                      <h3 className="text-base font-bold text-[#111315] mb-0.5">Tom B.</h3>
                      <p className="text-xs font-semibold text-[#5B8CFF] mb-2">Technical Director &amp; SEO Expert</p>
                      <p className="text-xs text-[#5B6472] leading-relaxed">
                        Το υπόβαθρό μου είναι στην αυτοματοποίηση, την ανάπτυξη και την ενσωμάτωση πολύπλοκων συστημάτων για παγκόσμιους οργανισμούς. Λατρεύω να λύνω το τεχνικό κομμάτι ώστε εσείς να μην χρειάζεται να το σκέφτεστε.
                      </p>
                    </div>
                    <div className="border-t border-[#E2E5EA] mt-3 pt-2">
                      <p className="text-xs italic text-[#111315] font-medium">&ldquo;Πρώτα λύσε το πρόβλημα. Μετά γράψε τον κώδικα.&rdquo;</p>
                    </div>
                  </div>
                </div>

                {/* DESKTOP: horizontal flex */}
                <div className="hidden md:flex flex-row">
                  <div className="relative flex-shrink-0 overflow-hidden" style={{ width: '200px', maxHeight: '280px' }}>
                    <img
                      src="https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/DVIoYisVQvzbqoiR.jpg?Expires=1805807307&Signature=sDadHPBIxNAi6lkiWTu64ioOt9Wvou6x~Akos8AKqATejLSMgwmbAZD8f~0e84UTqmXjYaSsbjvvamw1Y1h-3RSEbbutiwjpHPXGka~ZJRodfIKQQSPM9XytIixV9yDrEswB-7Jilroiu0d8A4D1mxlyvc1E0RR1AS2FrGj7ROLWp4T4vmB7rmiX0pXVhawbhH5D0H87lIyXVQ~Ue3ujz4AiyETwbvGuppqmVRXpmyZaqoDZTE9e1plVUn4-pR1jG9l2Pblw-D9VBnUxZuiBxEx2C5BUJOnjFEM6hS6RzjFEGwjQrEa3UFRhednppWiPKLZSbrjPQnzoh-jisjzTQA__&Key-Pair-Id=K2HSFNDJXOU9YS"
                      alt="Tom B. - Technical Director & SEO Expert at DM-Labs.io"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-r from-transparent to-[#F8FAFF]" />
                  </div>
                  <div className="flex flex-col justify-between p-7 flex-1">
                    <div>
                      <h3 className="text-xl font-bold text-[#111315] mb-0.5">Tom B.</h3>
                      <p className="text-sm font-semibold text-[#5B8CFF] mb-4">Technical Director &amp; SEO Expert</p>
                      <p className="text-sm text-[#5B6472] leading-relaxed">
                        Το υπόβαθρό μου είναι στην αυτοματοποίηση, την ανάπτυξη και την ενσωμάτωση πολύπλοκων συστημάτων για παγκόσμιους οργανισμούς. Λατρεύω να λύνω το τεχνικό κομμάτι ώστε εσείς να μην χρειάζεται να το σκέφτεστε - αυτό που παίρνετε είναι μια ιστοσελίδα γερή, γρήγορη και χτισμένη για να αντέξει.
                      </p>
                    </div>
                    <div className="border-t border-[#E2E5EA] mt-5 pt-4">
                      <p className="text-sm italic text-[#111315] font-medium">&ldquo;Πρώτα λύσε το πρόβλημα. Μετά γράψε τον κώδικα.&rdquo;</p>
                    </div>
                  </div>
                </div>


              </div>
            </AnimateIn>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FINAL CTA
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{ background: "#0F172A" }}
        >
          <img
            src={DARK_CTA_BG}
            alt=""
            role="presentation"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            aria-hidden="true"
          />
        </div>

        <div className="container relative z-10 section-spacing text-center">
          <AnimateIn>
            <p className="text-sm font-medium text-[#6FE3FF] mb-4 tracking-wide uppercase">Έτοιμοι να Ξεκινήσετε;</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
              Ας Χτίσουμε την Ιστοσελίδα σας Μαζί
            </h2>
            <p className="text-lg text-[#94A3B8] mb-10 max-w-xl mx-auto">
              Επικοινωνήστε μαζί μας και θα σας απαντήσουμε μέσα σε ώρες. Χωρίς δέσμευση, χωρίς πίεση - απλά μια φιλική συνομιλία για την επιχείρησή σας.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/el/contact" className="btn-primary !h-14 !text-base !px-8">
                <MessageCircle size={20} />
                Δωρεάν Visual Concept
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
