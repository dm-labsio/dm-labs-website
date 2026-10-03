import PackageOverview from "@/components/pricing/PackageOverview";
import HomeIntroductionVideo from "@/components/home/HomeIntroductionVideo";
import "@/components/home/HomePageDark.css";
import { HomeServices, HomeProcess, HomeIndustries } from "@/components/home/HomeOverviewSections";
import TeamProfiles from "@/components/TeamProfiles";
/* ============================================================
   D&M LABS - Αρχικήpage
   Hero with gradient atmosphere + floating devices
   Sections: Hero, Trust Strip, Template Showcase + Industries, Υπηρεσίες, Διαδικασία, Testimonials, Τιμές, CTA
   Brand: #5B8CFF→#6FE3FF→#8B5CFF, #F6F6F4 base, #0F172A dark
   ============================================================ */
import StarButton from "@/components/ui/star-button";
import { } from "react";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import InteractiveExampleCard from "@/components/InteractiveExampleCard";
import HomeHero from "@/components/home/HomeHero";


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
        <div style={{ fontSize: "7px", letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "#c8a96e", marginBottom: "4px" }}>Specialty καφές · Λεμεσός</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "18px", fontWeight: 400, color: "#f7f0e6", lineHeight: 1.2, marginBottom: "5px" }}>Καλός καφές,<br/><em style={{ color: "#c8a96e" }}>χωρίς</em> βιασύνη</div>
        <div style={{ fontSize: "7px", color: "rgba(247,240,230,0.65)", lineHeight: 1.5, marginBottom: "8px" }}>Κόκκοι μίας προέλευσης,<br/>καβουρδισμένοι σε μικρές ποσότητες.</div>
        <div style={{ background: "#c8a96e", color: "#1a1208", fontSize: "7px", padding: "4px 10px", fontWeight: 700, display: "inline-block" }}>Το μενού μας</div>
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
        <div style={{ fontSize: "7px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#c4735a", marginBottom: "5px" }}>Στούντιο ομορφιάς</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "18px", fontWeight: 400, color: "#2a1a14", lineHeight: 1.2, marginBottom: "6px", fontStyle: "italic" as const }}>Σας αξίζει<br/><em style={{ color: "#c4735a" }}>να νιώθετε</em> υπέροχα</div>
        <div style={{ fontSize: "7px", color: "#7a5a4a", lineHeight: 1.5, marginBottom: "8px" }}>Μαλλιά, πρόσωπο και νύχια,<br/>σε έναν χώρο μόνο για εσάς.</div>
        <div style={{ background: "#c4735a", color: "#fff", fontSize: "7px", padding: "4px 10px", display: "inline-block", letterSpacing: "0.1em" }}>Κλείστε ραντεβού</div>
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
        <div style={{ background: "#2196f3", color: "#fff", fontSize: "7px", padding: "3px 8px", borderRadius: "3px", fontWeight: 600 }}>Κλείστε ραντεβού</div>
      </div>
      <div style={{ position: "absolute", top: "44px", left: "16px", maxWidth: "50%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "6px" }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80" }} />
          <span style={{ fontSize: "7px", color: "#2196f3", fontWeight: 600 }}>Δεχόμαστε νέους ασθενείς</span>
        </div>
        <div style={{ fontSize: "17px", fontWeight: 800, color: "#0a1628", lineHeight: 1.15, marginBottom: "5px" }}>Χαμογελάστε<br/><span style={{ color: "#2196f3", fontStyle: "italic" as const, fontFamily: "Georgia, serif" }}>ξανά</span><br/>με σιγουριά</div>
        <div style={{ fontSize: "7px", color: "#4a6080", lineHeight: 1.5, marginBottom: "8px" }}>Σύγχρονη οδοντιατρική σε ήρεμο,<br/>άνετο περιβάλλον.</div>
        <div style={{ background: "#2196f3", color: "#fff", fontSize: "7px", padding: "4px 10px", display: "inline-block", borderRadius: "3px", fontWeight: 600 }}>Οι θεραπείες μας</div>
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

const TRIANGLE_GEO = "/media/cloudfront/triangle-geometry-Rf9Cpg8ynqtbpdNzPsSccU.webp";
const DARK_CTA_BG = "/media/brand-refresh/v1/faq-pearl-arcs-desktop.webp";

// Featured live-preview mini-sites for the homepage showcase
// Using the same mini-site HTML files as the Templates page
const FEATURED_TEMPLATES = [
  {
    id: "nomad-coffee",
    industry: "restaurant",
    name: "Nomad Coffee",
    category: "Καφέ",
    styleLabel: "Minimal και ζεστό",
    previewUrl: "/previews/nomad-coffee.html",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80",
    imageAlt: "Παράδειγμα ιστοσελίδας για το Nomad Coffee",
    palette: ["#1a1208", "#2c1f0e"],
  },
  {
    id: "bella-salon",
    industry: "beauty",
    name: "Bella Salon",
    category: "Ομορφιά και ευεξία",
    styleLabel: "Κομψό και θηλυκό",
    previewUrl: "/previews/bella-salon.html",
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&q=80",
    imageAlt: "Παράδειγμα ιστοσελίδας για το Bella Salon",
    palette: ["#1a0a0f", "#6b2d3e"],
  },
  {
    id: "dr-elara-dental",
    industry: "clinic",
    name: "Dr. Elara Dental",
    category: "Ιατρεία και υγεία",
    styleLabel: "Καθαρό και επαγγελματικό",
    previewUrl: "/previews/dr-elara-dental.html",
    imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=700&q=80",
    imageAlt: "Παράδειγμα ιστοσελίδας για το Dr. Elara Dental",
    palette: ["#0a1628", "#0d2040"],
  },
  {
    id: "verde-restaurant",
    industry: "restaurant",
    name: "Verde Restaurant",
    styleLabel: "Φρέσκο μεσογειακό",
    previewUrl: "/previews/verde-restaurant.html",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80",
    imageAlt: "Παράδειγμα ιστοσελίδας για το Verde Restaurant",
    palette: ["#1a2e1a", "#2d5a27"],
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
    title: "Κατασκευή ιστοσελίδων για επιχειρήσεις | DM Labs",
    description: "Φτιάχνουμε ιστοσελίδες που φέρνουν πελάτες: σχεδιασμός στα μέτρα σας, άψογη εμφάνιση στο κινητό, SEO και συντήρηση. Δωρεάν συμβουλευτική με τον Tom και την Anastacia.",
  });
  return (
    <div className="home-page--dark" lang="el" data-button-surface="dark">
      {/* ═══════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════ */}
      <HomeHero language="el" />

      {/* ═══════════════════════════════════════════
          TRUST STRIP
          ═══════════════════════════════════════════ */}


      <HomeIntroductionVideo language="el" />

      {/* ═══════════════════════════════════════════
          TEMPLATE SHOWCASE + INDUSTRY GRID
          (moved directly after trust strip)
          ═══════════════════════════════════════════ */}
      <section className="home-examples section-spacing relative overflow-hidden">

        <div className="container relative z-10">
          {/* -- Template Showcase Grid -- */}
          <AnimateIn className="text-center mb-10">
            <p className="text-sm font-medium text-[#b8bfff] mb-3 tracking-wide uppercase">Ιδέες σχεδιασμού</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#edf2ff] mb-3">
              Δεύτερη ευκαιρία για πρώτη εντύπωση δεν υπάρχει
            </h2>
            <p className="text-base text-[#bdc9df] max-w-2xl mx-auto">
              Ο κόσμος σας κρίνει από την ιστοσελίδα σας μέσα σε λίγα δευτερόλεπτα, πριν καν σας πάρει τηλέφωνο. Ρίξτε μια ματιά σε αυτά τα <strong className="text-[#edf2ff]">ενδεικτικά σχέδια</strong> για ιδέες, και τη δική σας θα τη στήσουμε από το μηδέν, με βάση το brand, τους πελάτες και τους στόχους σας.
            </p>
          </AnimateIn>

          <StaggerContainer className="mx-auto mb-10 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {FEATURED_TEMPLATES.map((tpl) => (
              <StaggerItem key={tpl.id} className="flex min-w-0">
                <InteractiveExampleCard
                  title={tpl.name}
                  subtitle={tpl.styleLabel}
                  imageUrl={tpl.imageUrl}
                  imageAlt={tpl.imageAlt}
                href={`/preview/${tpl.id}/?from=%2Fel%2F`}
                  actionText="Δείτε παράδειγμα"
                />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateIn className="text-center mb-16">
            <StarButton asChild><Link href="/el/templates/" className="btn-primary">
              Όλα τα παραδείγματα

            </Link></StarButton>
          </AnimateIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES OVERVIEW
          ═══════════════════════════════════════════ */}
      <HomeServices language="el" />

      {/* ═══════════════════════════════════════════
          PROCESS OVERVIEW
          ═══════════════════════════════════════════ */}
      <HomeProcess language="el" />

      {/* ═══════════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════════ */}
      <section className="home-stories section-spacing">
        <div className="container">
          <AnimateIn className="text-center mb-14">
              <p className="text-sm font-medium text-[#b8bfff] mb-3 tracking-wide uppercase">Ιστορίες πελατών</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#edf2ff] mb-4">
              Τι λένε οι πελάτες μας
            </h2>
            <p className="text-lg text-[#bdc9df] max-w-xl mx-auto">
              Πρώτες εντυπώσεις από τις επιχειρήσεις με τις οποίες έχουμε συνεργαστεί.
            </p>
          </AnimateIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((t) => (
              <StaggerItem key={t.name}>
                <div className="dm-card h-full flex flex-col relative">

                  {/* Quote text */}
                  <p className="text-sm text-[#d5dff0] leading-relaxed mb-6 flex-1 italic">
                    "{t.text}"
                  </p>
                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[#34435f]">
                    <div className="w-10 h-10 rounded-full brand-gradient flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {t.initial}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#edf2ff]">{t.name}</p>
                      <p className="text-xs text-[#bdc9df]">{t.role}</p>
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
      <PackageOverview locale="el" />

      {/* ═══════════════════════════════════════════
          INDUSTRIES WE SERVE
          ═══════════════════════════════════════════ */}
      <HomeIndustries language="el" />

      {/* ═══════════════════════════════════════════
          WHO WE ARE - Team Section
          ═══════════════════════════════════════════ */}
      <section className="home-team section-spacing">
        <div className="container">
          <AnimateIn className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5B8CFF] mb-3">Οι άνθρωποι πίσω από τη δουλειά</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#edf2ff]">Ποιοι είμαστε</h2>
          </AnimateIn>

          <TeamProfiles language="el" />
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
            <p className="text-sm font-medium text-[#6FE3FF] mb-4 tracking-wide uppercase">Ξεκινάμε;</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
              Δώστε στους πελάτες σας έναν λόγο να διαλέξουν εσάς
            </h2>
            <p className="text-lg text-[#94A3B8] mb-10 max-w-xl mx-auto">
              Πείτε μας πού θέλετε να πάει η επιχείρησή σας και θα τα κανονίσουμε μαζί: πώς θα είναι η ιστοσελίδα, τι θα περιλαμβάνει και ποιο είναι το επόμενο βήμα. Και σε όλη τη διαδρομή μιλάτε κατευθείαν με αυτούς που τη φτιάχνουν, χωρίς μεσάζοντες και χωρίς χαλασμένο τηλέφωνο.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <StarButton asChild><Link href="/el/contact/" className="btn-primary !h-14 !text-base !px-8">

                Δωρεάν συμβουλευτική
              </Link></StarButton>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
