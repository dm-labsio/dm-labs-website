import PackageOverview from "@/components/pricing/PackageOverview";
import HomeIntroductionVideo from "@/components/home/HomeIntroductionVideo";
import "@/components/home/HomePageDark.css";
import { HomeServices, HomeProcess, HomeIndustries } from "@/components/home/HomeOverviewSections";
import TeamProfiles from "@/components/TeamProfiles";
/* ============================================================
   D&M LABS - Αρχικήpage
   Hero with gradient atmosphere + floating devices
   Sections: Hero, Trust Strip, Template Showcase + Industries, Υπηρεσίες, Διαδικασία, Τιμές, CTA
   Brand: #5B8CFF→#6FE3FF→#8B5CFF, #F6F6F4 base, #0F172A dark
   ============================================================ */
import StarButton from "@/components/ui/star-button";
import { } from "react";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import AnimateIn from "@/components/AnimateIn";
import HomeWorkGallery from "@/components/home/HomeWorkGallery";
import HomeHero from "@/components/home/HomeHero";


const DARK_CTA_BG = "/media/brand-refresh/v1/faq-pearl-arcs-desktop.webp";

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
      <HomeWorkGallery locale="el" />

      {/* ═══════════════════════════════════════════
          SERVICES OVERVIEW
          ═══════════════════════════════════════════ */}
      <HomeServices language="el" />

      {/* ═══════════════════════════════════════════
          PROCESS OVERVIEW
          ═══════════════════════════════════════════ */}
      <HomeProcess language="el" />

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
