import NomadPreviewArtwork from "@/components/NomadPreviewArtwork";
import PackageOverview from "@/components/pricing/PackageOverview";
import HomeIntroductionVideo from "@/components/home/HomeIntroductionVideo";
import "@/components/home/HomePageDark.css";
import { HomeServices, HomeProcess, HomeIndustries } from "@/components/home/HomeOverviewSections";
import TeamProfiles from "@/components/TeamProfiles";
/* ============================================================
   DM-Labs.io - Homepage
   Hero with gradient atmosphere + floating devices
   Sections: Hero, Trust Strip, Template Showcase + Industries, Services, Process, Testimonials, Pricing, CTA
   Brand: #5B8CFF→#6FE3FF→#8B5CFF, #F6F6F4 base, #0F172A dark
   ============================================================ */
import StarButton from "@/components/ui/star-button";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import InteractiveExampleCard from "@/components/InteractiveExampleCard";
import HomeHero from "@/components/home/HomeHero";


// ─── Hand-crafted card mockups for homepage template showcase ────
const HOMEPAGE_CARD_DESIGNS: Record<string, React.FC> = {
  "nomad-coffee": () => <NomadPreviewArtwork />,

  "bella-salon": () => (
    <div style={{ height: "220px", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0", background: "#f7f0e8" }}>
      <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&q=80" alt="Bella Salon beauty studio interior" style={{ position: "absolute", right: 0, top: 0, width: "55%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #f7f0e8 45%, transparent 75%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "32px", background: "rgba(247,240,232,0.95)", display: "flex", alignItems: "center", padding: "0 14px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: "11px", fontWeight: 700, color: "#2a1a14", letterSpacing: "0.04em" }}>Bella.</span>
        <div style={{ display: "flex", gap: "10px" }}>
          {["Services","Gallery","Book"].map(l => <span key={l} style={{ fontSize: "7px", color: "#7a5a4a", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>{l}</span>)}
        </div>
      </div>
      <div style={{ position: "absolute", top: "44px", left: "16px", maxWidth: "48%" }}>
        <div style={{ fontSize: "7px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#c4735a", marginBottom: "5px" }}>Beauty Studio</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "18px", fontWeight: 400, color: "#2a1a14", lineHeight: 1.2, marginBottom: "6px", fontStyle: "italic" as const }}>Where Beauty<br/><em style={{ color: "#c4735a" }}>Meets</em> Artistry</div>
        <div style={{ fontSize: "7px", color: "#7a5a4a", lineHeight: 1.5, marginBottom: "8px" }}>Expert hair, skin &amp; nail<br/>treatments in luxury.</div>
        <div style={{ background: "#c4735a", color: "#fff", fontSize: "7px", padding: "4px 10px", display: "inline-block", letterSpacing: "0.1em" }}>Book a Treatment</div>
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
        <div style={{ background: "#2196f3", color: "#fff", fontSize: "7px", padding: "3px 8px", borderRadius: "3px", fontWeight: 600 }}>Book Appointment</div>
      </div>
      <div style={{ position: "absolute", top: "44px", left: "16px", maxWidth: "50%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "6px" }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80" }} />
          <span style={{ fontSize: "7px", color: "#2196f3", fontWeight: 600 }}>Accepting New Patients</span>
        </div>
        <div style={{ fontSize: "17px", fontWeight: 800, color: "#0a1628", lineHeight: 1.15, marginBottom: "5px" }}>Your Smile,<br/><span style={{ color: "#2196f3", fontStyle: "italic" as const, fontFamily: "Georgia, serif" }}>Perfected</span><br/>with Care</div>
        <div style={{ fontSize: "7px", color: "#4a6080", lineHeight: 1.5, marginBottom: "8px" }}>Modern dentistry in a calm,<br/>comfortable environment.</div>
        <div style={{ background: "#2196f3", color: "#fff", fontSize: "7px", padding: "4px 10px", display: "inline-block", borderRadius: "3px", fontWeight: 600 }}>View Treatments</div>
      </div>
      <div style={{ position: "absolute", top: "36px", right: "7px", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)", borderRadius: "20px", padding: "2px 7px", display: "flex", alignItems: "center", gap: "3px" }}>
        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#4ade80" }} />
        <span style={{ color: "#fff", fontSize: "7px", fontWeight: 600, letterSpacing: "0.06em" }}>Demo</span>
      </div>
    </div>
  ),
};

function HomepageCardPreview({ tplId, category }: { tplId: string; category: string }) {
  const Design = HOMEPAGE_CARD_DESIGNS[tplId];
  if (!Design) return null;
  return (
    <div className="relative w-full overflow-hidden">
      <Design />
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
    category: "Cafe & Coffee",
    styleLabel: "Coffee with character",
    previewUrl: "/previews/nomad-coffee.html",
    imageUrl: "/previews/nomad/assets/coffee-still-life-720.webp",
    imageAlt: "Nomad Coffee website example",
    palette: ["#b72d20", "#f1df9c"],
  },
  {
    id: "bella-salon",
    industry: "beauty",
    name: "Bella Salon",
    category: "Beauty & Wellness",
    styleLabel: "Elegant & Feminine",
    previewUrl: "/previews/bella-salon.html",
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&q=80",
    imageAlt: "Bella Salon website example",
    palette: ["#1a0a0f", "#6b2d3e"],
  },
  {
    id: "dr-elara-dental",
    industry: "clinic",
    name: "Dr. Elara Dental",
    category: "Clinics & Health",
    styleLabel: "Clean & Professional",
    previewUrl: "/previews/dr-elara-dental.html",
    imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=700&q=80",
    imageAlt: "Dr. Elara Dental website example",
    palette: ["#0a1628", "#0d2040"],
  },
  {
    id: "arcos-architecture",
    industry: "architecture",
    name: "Arcos Architecture",
    styleLabel: "Architectural & Minimal",
    previewUrl: "/previews/arcos-architecture.html",
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=700&q=80",
    imageAlt: "Arcos Architecture website example",
    palette: ["#1a1916", "#2d2b27"],
  },
];

const TESTIMONIALS = [
  {
    name: "Maria K.",
    role: "Restaurant Owner",
    text: "Our new website brought in three new bookings within the first week. The team understood exactly what we needed and delivered faster than I expected. Highly recommend.",
    rating: 5,
    initial: "M",
  },
  {
    name: "Andreas P.",
    role: "Physiotherapy Clinic",
    text: "Professional, responsive, and genuinely invested in making our clinic look its best online. The mobile version is perfect - most of our patients book from their phones.",
    rating: 5,
    initial: "A",
  },
  {
    name: "Sophia L.",
    role: "Beauty Salon Owner",
    text: "I was nervous about getting a website built but DM-Labs.io made it completely stress-free. They handled everything and the result looks incredible. Worth every cent.",
    rating: 5,
    initial: "S",
  },
];

export default function HomePage() {
  useSEO({
    title: "Best Web Design Agency for Growing Businesses | DM Labs",
    description: "Stand out. Build trust. Win more enquiries. DM Labs creates custom websites with fast delivery and personal care for businesses worldwide.",
  });

  return (
    <div className="editorial-home home-page--dark" lang="en" data-button-surface="dark">
      {/* ═══════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════ */}
      <HomeHero language="en" />

      {/* ═══════════════════════════════════════════
          TRUST STRIP
          ═══════════════════════════════════════════ */}


      <HomeIntroductionVideo language="en" />

      {/* ═══════════════════════════════════════════
          TEMPLATE SHOWCASE + INDUSTRY GRID
          (moved directly after trust strip)
          ═══════════════════════════════════════════ */}
      <section className="home-examples section-spacing relative overflow-hidden">

        <div className="container relative z-10">
          {/* -- Template Showcase Grid -- */}
          <AnimateIn className="text-center mb-10">
            <p className="editorial-label mb-4">Design Inspiration</p>
            <h2 className="editorial-section-heading mb-5">
              Make Your First Impression <span className="editorial-serif">Count</span>
            </h2>
            <p className="editorial-lead max-w-2xl mx-auto">
              Your website sets the standard before you say a word. Explore these <strong className="text-[#edf2ff]">concept designs</strong> to see the possibilities. Your website will be designed around your brand, your customers, and the action you want them to take.
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
                  href={`/preview/${tpl.id}/?from=%2F`}
                  actionText="See example"
                />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateIn className="text-center mb-16">
            <StarButton asChild><Link href="/templates/" className="btn-primary">
              View All Examples

            </Link></StarButton>
          </AnimateIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES OVERVIEW
          ═══════════════════════════════════════════ */}
      <HomeServices language="en" />

      {/* ═══════════════════════════════════════════
          PROCESS OVERVIEW
          ═══════════════════════════════════════════ */}
      <HomeProcess language="en" />

      {/* ═══════════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════════ */}
      <section className="home-stories section-spacing">
        <div className="container">
          <AnimateIn className="text-center mb-14">
              <p className="editorial-label mb-4">Client Stories</p>
            <h2 className="editorial-section-heading mb-5">
              What Our Clients Say
            </h2>
            <p className="editorial-lead max-w-xl mx-auto">
              Early feedback from the businesses we've worked with.
            </p>
          </AnimateIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((t) => (
              <StaggerItem key={t.name}>
                <div className="dm-card h-full flex flex-col relative">

                  {/* Quote text */}
                  <p className="editorial-quote text-[#d5dff0] mb-6 flex-1">
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
      <PackageOverview locale="en" />

      {/* ═══════════════════════════════════════════
          INDUSTRIES WE SERVE
          ═══════════════════════════════════════════ */}
      <HomeIndustries language="en" />

      {/* ═══════════════════════════════════════════
          WHO WE ARE - Team Section
          ═══════════════════════════════════════════ */}
      <section className="home-team section-spacing">
        <div className="container">
          <AnimateIn className="text-center mb-14">
            <p className="editorial-label !text-[#5B8CFF] mb-4">The people behind the work</p>
            <h2 className="editorial-section-heading">Who We Are</h2>
          </AnimateIn>

          <TeamProfiles language="en" />
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
            <p className="editorial-label !text-[#6FE3FF] mb-5">Ready to Start?</p>
            <h2 className="editorial-section-heading !text-white mb-6 max-w-4xl mx-auto">
              Give Customers a Reason to <span className="editorial-serif">Choose You</span>
            </h2>
            <p className="editorial-lead !text-[#D2D8E4] mb-10 max-w-xl mx-auto">
              Tell us where you want your business to go. We will map out the website, scope, and next steps to help you get there. You work directly with the people building it.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <StarButton asChild><Link href="/contact/" className="btn-primary !h-14 !text-base !px-8">

                Get a Free Consultation
              </Link></StarButton>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
