import PackageOverview from "@/components/pricing/PackageOverview";
import HomeIntroductionVideo from "@/components/home/HomeIntroductionVideo";
import "@/components/home/HomePageDark.css";
import "@/pages/home-polish.css";
import { HomeServices, HomeProcess, HomeIndustries } from "@/components/home/HomeOverviewSections";
import TeamProfiles from "@/components/TeamProfiles";
/* ============================================================
   DM-Labs.io - Homepage
   Hero with gradient atmosphere + floating devices
   Sections: Hero, Trust Strip, Template Showcase + Industries, Services, Process, Pricing, CTA
   Brand: #5B8CFF→#6FE3FF→#8B5CFF, #F6F6F4 base, #0F172A dark
   ============================================================ */
import StarButton from "@/components/ui/star-button";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import AnimateIn from "@/components/AnimateIn";
import HomeWorkGallery from "@/components/home/HomeWorkGallery";
import HomeHero from "@/components/home/HomeHero";


const DARK_CTA_BG = "/media/brand-refresh/v1/faq-pearl-arcs-desktop.webp";

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
      <HomeWorkGallery locale="en" />

      {/* ═══════════════════════════════════════════
          SERVICES OVERVIEW
          ═══════════════════════════════════════════ */}
      <HomeServices language="en" />

      {/* ═══════════════════════════════════════════
          PROCESS OVERVIEW
          ═══════════════════════════════════════════ */}
      <HomeProcess language="en" />

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
