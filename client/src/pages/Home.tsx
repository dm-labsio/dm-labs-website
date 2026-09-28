import { HomeServices, HomeProcess, HomeIndustries } from "@/components/home/HomeOverviewSections";
import TeamProfiles from "@/components/TeamProfiles";
/* ============================================================
   DM-Labs.io - Homepage
   Hero with gradient atmosphere + floating devices
   Sections: Hero, Trust Strip, Template Showcase + Industries, Services, Process, Testimonials, Pricing, Stats, CTA
   Brand: #5B8CFF→#6FE3FF→#8B5CFF, #F6F6F4 base, #0F172A dark
   ============================================================ */
import StarButton from "@/components/ui/star-button";
import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import EditorialFitLine from "@/components/EditorialFitLine";
import InteractiveExampleCard from "@/components/InteractiveExampleCard";
import HomeHeroScrub from "@/components/HomeHeroScrub";
import { ArrowRight } from "lucide-react";

// ─── Hand-crafted card mockups for homepage template showcase ────
const HOMEPAGE_CARD_DESIGNS: Record<string, React.FC> = {
  "nomad-coffee": () => (
    <div style={{ height: "220px", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0", background: "#1a1208" }}>
      <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80" alt="Nomad Coffee cafe interior with warm lighting" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(26,18,8,0.88) 40%, rgba(26,18,8,0.3) 100%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "32px", display: "flex", alignItems: "center", padding: "0 14px", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: "11px", fontWeight: 700, color: "#c8a96e", letterSpacing: "0.06em" }}>Nomad Co.</span>
        <div style={{ display: "flex", gap: "10px" }}>
          {["Menu","Story","Beans"].map(l => <span key={l} style={{ fontSize: "7px", color: "rgba(200,169,110,0.7)" }}>{l}</span>)}
        </div>
      </div>
      <div style={{ position: "absolute", top: "44px", left: "16px", maxWidth: "55%" }}>
        <div style={{ fontSize: "7px", letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "#c8a96e", marginBottom: "4px" }}>Specialty Coffee</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "18px", fontWeight: 400, color: "#f7f0e6", lineHeight: 1.2, marginBottom: "5px" }}>Coffee Worth<br/><em style={{ color: "#c8a96e" }}>Slow Down</em> For</div>
        <div style={{ fontSize: "7px", color: "rgba(247,240,230,0.65)", lineHeight: 1.5, marginBottom: "8px" }}>Single-origin beans, hand-roasted<br/>in small batches.</div>
        <div style={{ background: "#c8a96e", color: "#1a1208", fontSize: "7px", padding: "4px 10px", fontWeight: 700, display: "inline-block" }}>View Our Menu</div>
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

const GRADIENT_BG = "/media/cloudfront/gradient-mesh-bg-nrkTNmAHHWeVJB3ubHRGDu.webp";
const TRIANGLE_GEO = "/media/cloudfront/triangle-geometry-Rf9Cpg8ynqtbpdNzPsSccU.webp";
const DARK_CTA_BG = "/media/cloudfront/dark-cta-bg-LgZ8epcpi9XDGLof5Q9KgS.webp";

// Featured live-preview mini-sites for the homepage showcase
// Using the same mini-site HTML files as the Templates page
const FEATURED_TEMPLATES = [
  {
    id: "nomad-coffee",
    industry: "restaurant",
    name: "Nomad Coffee",
    category: "Cafe & Coffee",
    styleLabel: "Artisan Minimal",
    previewUrl: "/previews/nomad-coffee.html",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80",
    imageAlt: "Nomad Coffee website example",
    palette: ["#1a1208", "#2c1f0e"],
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
    id: "verde-restaurant",
    industry: "restaurant",
    name: "Verde Restaurant",
    styleLabel: "Fresh Mediterranean",
    previewUrl: "/previews/verde-restaurant.html",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80",
    imageAlt: "Verde Restaurant website example",
    palette: ["#1a2e1a", "#2d5a27"],
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

  // This graph is serialized into the prerendered homepage and is the single source of homepage structured data.
  useEffect(() => {
    const existingSchema = document.getElementById("home-jsonld-schema");
    if (existingSchema) return;
    const offers = [
      { "@type": "Offer", "name": "Launch Website", "description": "1-page landing site, mobile responsive, WhatsApp button, basic SEO, 2 revision rounds.", "price": "299", "priceCurrency": "EUR" },
      { "@type": "Offer", "name": "Growth Website", "description": "Up to 4 pages, contact form, map, testimonials, basic SEO, Search Console and Analytics setup, 3 revision rounds.", "price": "749", "priceCurrency": "EUR" },
      { "@type": "Offer", "name": "Pro Website", "description": "Up to 7 pages, gallery, pop-up, scroll animations, full SEO structure, blog setup or a website visual pack, 4 revision rounds.", "price": "1499", "priceCurrency": "EUR" },
      { "@type": "Offer", "name": "Enterprise / Custom", "description": "Pricing tailored to your scope for integrations, multilingual websites, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, and unusual content volume." }
    ];
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfessionalService",
          "@id": "https://dm-labs.io/#professionalservice",
          "name": "DM-Labs.io",
          "alternateName": "DM-Labs",
          "description": "Custom websites built to strengthen your brand and turn interest into enquiries. Fast delivery and personal care for businesses worldwide.",
          "url": "https://dm-labs.io/",
          "logo": "https://dm-labs.io/logo.png",
          "image": "https://dm-labs.io/social/dm-labs-growth-social-card-centered.png",
          "telephone": "+35797472847",
          "email": "info@dm-labs.io",
          "priceRange": "€299-€1,499",
          "address": { "@type": "PostalAddress", "streetAddress": "Eleftheriou Chandrinou", "postalCode": "8045", "addressLocality": "Paphos", "addressCountry": "CY" },
          "areaServed": "Worldwide",
          "employee": [
            {
              "@type": "Person",
              "name": "Anastacia B.",
              "jobTitle": "Creative Director & AI Specialist",
              "image": "https://dm-labs.io/media/manus/AtkkCmVLLZyIDtDx.webp"
            },
            {
              "@type": "Person",
              "name": "Tom B.",
              "jobTitle": "Technical Director & SEO Expert",
              "image": "https://dm-labs.io/media/manus/DVIoYisVQvzbqoiR.webp"
            }
          ],
          "sameAs": ["https://www.instagram.com/dm_labs.io/"],
          "hasOfferCatalog": { "@type": "OfferCatalog", "name": "Website Packages", "itemListElement": offers }
        },
        {
          "@type": "WebSite",
          "@id": "https://dm-labs.io/#website",
          "url": "https://dm-labs.io/",
          "name": "DM-Labs.io",
          "description": "Web design for growing businesses worldwide",
          "publisher": { "@id": "https://dm-labs.io/#professionalservice" },
          "inLanguage": ["en", "el", "he"]
        }
      ]
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "home-jsonld-schema";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { document.getElementById("home-jsonld-schema")?.remove(); };
  }, []);
  return (
    <div className="editorial-home">
      {/* ═══════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════ */}
      <HomeHeroScrub>
        <div className="editorial-hero-copy">
        <p className="editorial-label mb-5">
          Built for your next level
        </p>
        <h1 className="sr-only">Built to impress. Designed to convert.</h1>
        <div className="editorial-hero-fit" aria-hidden="true">
          <EditorialFitLine maxSizeRatio={0.17}>Built to</EditorialFitLine>
          <EditorialFitLine maxSizeRatio={0.17}><em className="editorial-serif">impress.</em></EditorialFitLine>
          <EditorialFitLine maxSizeRatio={0.17}>Designed to</EditorialFitLine>
          <EditorialFitLine maxSizeRatio={0.17}><em className="editorial-serif">convert.</em></EditorialFitLine>
        </div>
        <p className="editorial-lead mb-8 max-w-2xl mx-auto">
          Look established. Earn trust. Make the next enquiry easy. We build sharp, fast websites and handle the technical details, so you can focus on your business. Wherever you do business.
        </p>
        <div className="editorial-hero-actions flex flex-wrap gap-4 justify-center">
          <StarButton asChild><Link href="/contact/" className="btn-primary">
            Get a Free Consultation
            <ArrowRight size={18} />
          </Link></StarButton>
          <Link href="/templates/" className="editorial-outline-button">
            Browse Examples
            <ArrowRight size={18} />
          </Link>
        </div>
        </div>
      </HomeHeroScrub>

      {/* ═══════════════════════════════════════════
          TRUST STRIP
          ═══════════════════════════════════════════ */}
      <section className="bg-white border-y border-[#E2E5EA]">
        <div className="container py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              "Designed to earn trust",
              "Delivered in Days",
              "Mobile Responsive",
              "SEO Optimised",
              "Direct access to Tom & Anastacia",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-[#5B6472]">

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
            <p className="editorial-label mb-4">Design Inspiration</p>
            <h2 className="editorial-section-heading mb-5">
              Make Your First Impression <span className="editorial-serif">Count</span>
            </h2>
            <p className="editorial-lead max-w-2xl mx-auto">
              Your website sets the standard before you say a word. Explore these <strong className="text-[#111315]">concept designs</strong> to see the possibilities. Your website will be designed around your brand, your customers, and the action you want them to take.
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
              <ArrowRight size={16} />
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
      <section className="section-spacing bg-white">
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
                  <p className="editorial-quote text-[#3D4550] mb-6 flex-1">
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
            <p className="editorial-label mb-4">Transparent Pricing</p>
            <h2 className="editorial-section-heading mb-5">
              Invest in Your <span className="editorial-serif">Next Level</span>
            </h2>
            <p className="editorial-lead max-w-2xl mx-auto mb-5">
              Choose the scope that fits your ambition. Know what you are getting before we start.
            </p>
           </AnimateIn>

          <div
            className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 py-4 px-6 mb-10 rounded-xl text-center sm:text-left"
            style={{ background: "linear-gradient(90deg, #5B8CFF 0%, #6FE3FF 50%, #8B5CFF 100%)" }}
          >
            <span className="editorial-label !text-white">Built around your business</span>
            <span className="hidden sm:block w-px h-5 bg-white/40" />
            <span className="text-sm sm:text-base text-white/90 font-medium">Website build + ongoing hosting and care. See full pricing for your complete investment.</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">

            {/* Launch Website */}
            <AnimateIn delay={0.1}>
              <div className="dm-card h-full flex flex-col">
                <p className="editorial-label !text-[#5B8CFF] mb-3">Launch Website</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="editorial-price">€299</span>
                  <span className="text-sm text-[#5B6472]">one-time</span>
                </div>
                <p className="text-sm text-[#5B6472] mb-6">A lean online presence for a new business that needs to launch clearly and professionally.</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {["Small one-page or light two-page site", "Responsive build", "Basic SEO foundations", "WhatsApp and social links", "2 revision rounds"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">

                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact/" className="btn-secondary w-full justify-center">Get a Free Consultation</Link>
              </div>
            </AnimateIn>

            {/* Growth Website - Recommended */}
            <AnimateIn delay={0.2}>
              <div className="brand-gradient-border h-full">
                <div className="dm-card h-full flex flex-col !shadow-none relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full brand-gradient text-white text-xs font-semibold whitespace-nowrap">Recommended</span>
                  <p className="editorial-label !text-[#8B5CFF] mb-3">Growth Website</p>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="editorial-price">€749</span>
                    <span className="text-sm text-[#5B6472]">one-time</span>
                  </div>
                  <p className="text-sm text-[#5B6472] mb-6">A conversion-focused site for a business ready to be found, trusted, and contacted online.</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {["Up to 4 pages", "Contact form", "Google Maps and reviews/testimonials", "Basic SEO", "Search Console and Analytics setup", "3 revision rounds"].map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">

                        {f}
                      </li>
                    ))}
                  </ul>
                  <StarButton asChild><Link href="/contact/" className="btn-primary w-full justify-center">Get a Free Consultation</Link></StarButton>
                </div>
              </div>
            </AnimateIn>

            {/* Pro Website */}
            <AnimateIn delay={0.3}>
              <div className="dm-card h-full flex flex-col">
                <p className="editorial-label !text-[#3D9CBB] mb-3">Pro Website</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="editorial-price">€1,499</span>
                  <span className="text-sm text-[#5B6472]">one-time</span>
                </div>
                <p className="text-sm text-[#5B6472] mb-6">For a more complete digital presence with richer content, motion, and stronger search foundations.</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {["Up to 7 pages", "Gallery or portfolio", "Pop-up and scroll-driven animations", "Full SEO structure", "Blog setup or website visual pack", "4 revision rounds"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">

                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact/" className="btn-secondary w-full justify-center">Get a Free Consultation</Link>
              </div>
            </AnimateIn>

          </div>

          {/* Enterprise Wide Banner */}
          <AnimateIn delay={0.4} className="mt-8 max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1117 0%, #161b2e 50%, #0d1117 100%)", border: "1px solid rgba(91,140,255,0.2)" }}>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 p-8">

                {/* Left: label + price + description */}
                <div className="flex-shrink-0 lg:w-64">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "linear-gradient(90deg, #5B8CFF, #8B5CFF)", color: "#fff" }}>Built for You</span>
                  <p className="editorial-label !text-[#6FE3FF] mb-2">Enterprise / Custom</p>
                  <p className="editorial-price !text-white mb-2 enterprise-scope-title">Pricing tailored to your scope</p>
                  <p className="text-xs font-medium mb-4" style={{ color: "#5B8CFF" }}>Quote based on scope</p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    For integrations, multilingual builds, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, or unusual content volume.
                  </p>
                  <Link
                    href="/contact/"
                    className="mt-6 inline-flex items-center justify-center gap-2 py-3 px-8 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(90deg, #5B8CFF, #8B5CFF)" }}
                  >
                     Contact Us
                  </Link>
                </div>

                {/* Divider */}
                <div className="hidden lg:block w-px self-stretch" style={{ background: "rgba(91,140,255,0.2)" }} />

                {/* Right: feature grid */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
                  {[
                    { label: "Fully custom design from scratch" },
                    { label: "Scope designed around your project" },
                    { label: "CRM and booking integrations" },
                    { label: "Multi-language support" },
                    { label: "Dedicated project manager" },
                    { label: "Priority support and delivery" },
                    { label: "Ongoing retainer option" },
                    { label: "Custom SEO and content strategy" },
                  ].map(({ label }) => (
                    <div key={label} className="flex items-start gap-2.5">

                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{label}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </AnimateIn>

          <AnimateIn className="text-center mt-10">
            <p className="text-sm text-[#5B6472] mb-3">
              All plans include a <span className="font-semibold text-[#111315]">free consultation</span> - no commitment, no pressure.
            </p>
            <Link href="/pricing/" className="text-sm font-medium text-[#5B8CFF] hover:underline inline-flex items-center gap-1">
              See full pricing &amp; add-ons <ArrowRight size={14} />
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          INDUSTRIES WE SERVE
          ═══════════════════════════════════════════ */}
      <HomeIndustries language="en" />

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
              { value: "5-14", label: "Days to Launch", sub: "from first call" },
              { value: "5★", label: "Client Satisfaction", sub: "our standard" },
              { value: "100%", label: "Mobile Optimised", sub: "every project" },
              { value: "∞", label: "Ongoing Support", sub: "we’re always here" },
            ].map((stat, i) => (
              <StaggerItem key={stat.label}>
                <div className="text-center group">
                  {/* Divider line on desktop */}
                  <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-0 w-px h-12 bg-white/10" />
                  <p
                    className="editorial-stat-value text-4xl sm:text-5xl lg:text-6xl mb-2 transition-transform duration-300 group-hover:scale-110"
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
