/* ============================================================
   D&M LABS - Homepage
   Hero with gradient atmosphere + floating devices
   Sections: Trust, Services, Process, Business Types, Template Showcase, Pricing, Stats, CTA
   Brand: #5B8CFF→#6FE3FF→#8B5CFF, #F6F6F4 base, #0F172A dark
   ============================================================ */
import { Link } from "wouter";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import {
  Globe, Smartphone, Search, Zap, Shield, Clock,
  CheckCircle2, ArrowRight, MessageCircle,
  Utensils, Scissors, Stethoscope, Briefcase, Dumbbell, ShoppingBag,
  Palette, Code, Rocket, Headphones
} from "lucide-react";

const HERO_DEVICES = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/hero-devices-v2-8JXhBrX7f82um3hxnU6TmE.webp";
const GRADIENT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/gradient-mesh-bg-nrkTNmAHHWeVJB3ubHRGDu.webp";
const TRIANGLE_GEO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/triangle-geometry-Rf9Cpg8ynqtbpdNzPsSccU.webp";
const DARK_CTA_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/dark-cta-bg-LgZ8epcpi9XDGLof5Q9KgS.webp";

// Featured template card images for the homepage showcase
const FEATURED_TEMPLATES = [
  {
    id: "iron-forge-gym",
    industry: "fitness",
    name: "Iron Forge Gym",
    category: "Fitness & Sport",
    styleLabel: "Bold & Energetic",
    cardImage: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/MgTbsRcvqoiXiYbH.png?Expires=1804248067&Signature=eKzwv3T-wSElP2qcg3J4FLEMHcl40qoYKk4jnvNKaP2vXtW6Vm7NVcDqU40OsugAe8wu0hgW5ECxxvML~K~Z8-GR97iqDqCLNNGyLSIaTvkvpM9SDinuGMUi32-9KoSmMGl08yMUkXLU6~lq9aaSeBLwVWA7hK3NvoCAum8qtRbKdLYwpCRTs9d7tWgZsaxujYNFVfQ1dfWhp9epOs1U6KgvzfD8s-~dg40GNN3cBWcXZrTZxt0WflJqL5EbV45SCOlCKjbXXEcoCgcuFmaAmMhkf06Ck58x2uxMI8AekTK6~ojFiURJVGbqqLgaF-5b7hVetymcO4G4Gws3d3Z3MQ__&Key-Pair-Id=K2HSFNDJXOU9YS",
    palette: ["#0A0A0A", "#FF4500", "#1A1A1A", "#F5F5F5", "#FF6B35"],
    paletteNames: ["Black", "Fire Red", "Dark", "Off-White", "Orange"],
  },
  {
    id: "aura-hair-studio",
    industry: "beauty",
    name: "Aura Hair Studio",
    category: "Beauty & Wellness",
    styleLabel: "Luxury Dark",
    cardImage: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/JyHQRjqPVlblrfxy.png?Expires=1804155917&Signature=nXItT-k29wLV-5kRmvnIZi-2~BybQGrUswsZYub5OO8LHaCP7de8yE26ZHoMELyNwHttk686yxhHpSB6b1YCJssJ-4~5AoAIYSITW-s87XJjwZugsuD-CED4gjf3UNTU05~gqRRjO5APKZGgn5idkjrFyF-g12tnho49W9gdcW~AcTJ1H~l~Z1RlMbV051WcZm80PEnBzw0DaC01A0aVfwHM0OEtf1Fh4wLBgFn7aPXXukB~aBrru8Cl5fGSUIX2fhAZ3PB1r2U3YbtfIK-0d7cYzJuJ8~Wd0NJp~sz0R1U79XiZDPEuCsl27~~gv3JVFy5nOZwJCyThZzwcfXGrVA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    palette: ["#0A0A0A", "#C9A84C", "#1A1A1A", "#F5F0E8", "#8B7355"],
    paletteNames: ["Black", "Gold", "Dark", "Cream", "Warm Brown"],
  },
  {
    id: "vitality-medical-clinic",
    industry: "clinic",
    name: "Vitality Medical Clinic",
    category: "Clinics & Health",
    styleLabel: "Clean & Professional",
    cardImage: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/vHiXcgVzfwvNVOeM.png?Expires=1804248063&Signature=ZzohmEbDPrne9IuEegn0BwtkTJXFDhaGAsPBm9laKfqJ0XcUr8wfSoTtoi1aOYtX7JcnT46gXq7AIuGQRJ0tnThKxddiggu8~2k5jMEIv29FNuWZ5a6nYT4-dGBGJUc1ukwLk8Sa8O9o8MfXClwr7FYhC2Jv8748ztNqCntTFB-BRey-LWpcFY5dffhPIIiih1jbkwcbJyC-2TuEfO8uZjhn6YuMNWcBlXGe6yBd~v9U-qFY8B2H9VqsyeuGZKSEwyHug2m5ROSr6~sFi8S41WCC~knstnwhQap7wWqGkzWDNmyYfKaBpdkWBKIgVo99Rgd2OCmsxfCK8eB4kix8BA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    palette: ["#1A3A5C", "#0099CC", "#F0F8FF", "#E8F4FD", "#00B4D8"],
    paletteNames: ["Navy", "Teal", "Ice Blue", "Light Blue", "Cyan"],
  },
];

export default function HomePage() {
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
            className="absolute inset-0 w-full h-full object-cover opacity-15"
            aria-hidden="true"
          />
        </div>
        <div className="absolute top-10 right-0 w-[500px] h-[500px] opacity-[0.06] animate-float-slower pointer-events-none z-0">
          <img src={TRIANGLE_GEO} alt="" className="w-full h-full object-contain" aria-hidden="true" />
        </div>
        <div className="absolute bottom-0 left-10 w-[300px] h-[300px] opacity-[0.04] animate-float-slow pointer-events-none z-0" style={{ animationDelay: "-8s" }}>
          <img src={TRIANGLE_GEO} alt="" className="w-full h-full object-contain rotate-180" aria-hidden="true" />
        </div>
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5B8CFF] rounded-full blur-[120px] opacity-[0.08] animate-pulse-glow pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#8B5CFF] rounded-full blur-[100px] opacity-[0.06] animate-pulse-glow pointer-events-none z-0" style={{ animationDelay: "-4s" }} />

        <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-8" style={{ paddingTop: "clamp(3rem, 8vh, 8rem)", paddingBottom: "clamp(2rem, 5vh, 6rem)" }}>
          {/* Left: Text */}
          <div className="flex-1 max-w-xl">
            <AnimateIn variant="fade-up" delay={0.1}>
              <p className="text-sm font-medium text-[#5B6472] mb-4 tracking-wide uppercase">
                Complete Website Solutions
              </p>
            </AnimateIn>
            <AnimateIn variant="fade-up" delay={0.2}>
              <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-bold text-[#111315] leading-[1.1] mb-6">
                Elevate Your Business with{" "}
                <span className="brand-gradient-text">Modern Websites</span>
              </h1>
            </AnimateIn>
            <AnimateIn variant="fade-up" delay={0.3}>
              <p className="text-lg text-[#5B6472] leading-relaxed mb-8 max-w-md">
                We create cutting-edge websites that drive results for your business. Professional, fast, and built to convert - starting at just €250.
              </p>
            </AnimateIn>
            <AnimateIn variant="fade-up" delay={0.4}>
              <div className="flex flex-wrap gap-4">
                <Link href="/templates" className="btn-primary">
                  Browse Templates
                  <ArrowRight size={18} />
                </Link>
                <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#5B8CFF] text-[#5B8CFF] font-semibold hover:bg-[#5B8CFF] hover:text-white transition-all duration-300">
                  View All Services
                  <ArrowRight size={18} />
                </Link>
              </div>
            </AnimateIn>
          </div>

          {/* Right: Device Mockup */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <AnimateIn variant="fade-up" delay={0.5} className="relative">
              <div className="animate-float-slow">
                <img
                  src={HERO_DEVICES}
                  alt="D&M Labs website preview on laptop and mobile"
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl drop-shadow-2xl"
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
              "No Hidden Fees",
              "Delivered in Days",
              "Mobile Responsive",
              "SEO Optimised",
              "Free Accessibility Widget",
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
          SERVICES OVERVIEW
          ═══════════════════════════════════════════ */}
      <section className="section-spacing">
        <div className="container">
          <AnimateIn className="text-center mb-16">
            <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Our Services</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111315] mb-4">
              Expert Solutions for Your Online Presence
            </h2>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto">
              Everything you need to establish a professional web presence, from design to launch and beyond.
            </p>
          </AnimateIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: "Custom Website Design", desc: "Unique, branded websites tailored to your business identity and goals. No templates - every site is built from scratch.", anchor: "custom-design" },
              { icon: Smartphone, title: "Mobile-First Development", desc: "Every website is designed mobile-first, ensuring a flawless experience on phones, tablets, and desktops.", anchor: "mobile-first" },
              { icon: Search, title: "SEO Optimisation", desc: "Built-in search engine optimisation so your customers can find you on Google from day one.", anchor: "seo" },
              { icon: Zap, title: "Fast Performance", desc: "Lightning-fast load times with optimised code and assets. Speed matters for conversions and rankings.", anchor: "performance" },
              { icon: Shield, title: "Secure & Reliable", desc: "SSL certificates, secure hosting, and regular backups to keep your website safe and always online.", anchor: "security" },
              { icon: Clock, title: "Quick Turnaround", desc: "From concept to launch in 5–10 business days. We move fast without compromising quality.", anchor: "turnaround" },
            ].map((service) => (
              <StaggerItem key={service.title}>
                <Link href={`/services/${service.anchor}`}>
                  <div className="dm-card h-full cursor-pointer hover:border-[#5B8CFF]/40 hover:-translate-y-1 transition-all duration-300">
                    <div className="icon-container-gradient mb-5">
                      <service.icon size={24} className="text-[#5B8CFF]" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg font-semibold text-[#111315] mb-3">{service.title}</h3>
                    <p className="text-sm text-[#5B6472] leading-relaxed mb-4">{service.desc}</p>
                    <span className="text-sm font-medium text-[#5B8CFF] inline-flex items-center gap-1">
                      Read more <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PROCESS SECTION
          ═══════════════════════════════════════════ */}
      <section className="section-spacing bg-white relative overflow-hidden">
        {/* Subtle triangle in background */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.03] pointer-events-none">
          <img src={TRIANGLE_GEO} alt="" className="w-full h-full object-contain" aria-hidden="true" />
        </div>

        <div className="container relative z-10">
          <AnimateIn className="text-center mb-16">
            <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111315] mb-4">
              From Idea to Launch in 4 Simple Steps
            </h2>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto">
              We've streamlined the process so you can focus on running your business.
            </p>
          </AnimateIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: MessageCircle, step: "01", title: "Discovery Call", desc: "Quick WhatsApp chat to understand your business, goals, and what you need.", color: "#5B8CFF" },
              { icon: Palette, step: "02", title: "Design", desc: "We create a custom design based on your brand, content, and preferences.", color: "#6FE3FF" },
              { icon: Code, step: "03", title: "Build", desc: "Your website is developed with clean code, optimised for speed and SEO.", color: "#8B5CFF" },
              { icon: Rocket, step: "04", title: "Launch", desc: "We deploy your site, connect your domain, and make sure everything works perfectly.", color: "#5B8CFF" },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ background: `${item.color}12` }}>
                    <item.icon size={28} style={{ color: item.color }} strokeWidth={1.75} />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full brand-gradient text-white text-xs font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#111315] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#5B6472] leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateIn className="text-center mt-12">
            <Link href="/process" className="btn-secondary">
              See Full Process
              <ArrowRight size={16} />
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BUSINESS TYPES - now ABOVE pricing
          ═══════════════════════════════════════════ */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <img src={GRADIENT_BG} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        <div className="container relative z-10">
          {/* -- Template Showcase Grid (ABOVE industry icons) -- */}
          <AnimateIn className="text-center mb-10">
            <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Design Inspiration</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#111315] mb-3">
              See What We Can Create for You
            </h3>
            <p className="text-base text-[#5B6472] max-w-xl mx-auto">
              Browse our design templates - each one is a starting point for a fully custom website tailored to your brand.
            </p>
          </AnimateIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 items-stretch">
            {FEATURED_TEMPLATES.map((tpl) => (
              <StaggerItem key={tpl.id} className="flex">
                <Link href={`/templates?industry=${tpl.industry}`} className="flex w-full">
                  <div className="dm-card !p-0 overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group flex flex-col w-full">
                    {/* Card Image - 16:9 ratio, no cropping */}
                    <div className="relative overflow-hidden w-full" style={{ aspectRatio: "16/9" }}>
                      <img
                        src={tpl.cardImage}
                        alt={tpl.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Category badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-[#111315]">
                        {tpl.category}
                      </div>
                    </div>

                    {/* Card Details */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="mb-2">
                        <h4 className="font-semibold text-[#111315] text-base leading-tight">{tpl.name}</h4>
                        <p className="text-xs text-[#5B6472] mt-0.5">{tpl.styleLabel}</p>
                      </div>

                      {/* Learn More - pinned to bottom */}
                      <div className="mt-auto flex items-center gap-1 text-sm font-semibold text-[#5B8CFF] group-hover:gap-2 transition-all">
                        Learn More <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateIn className="text-center mb-16">
            <Link href="/templates" className="btn-primary">
              Browse All Templates
              <ArrowRight size={16} />
            </Link>
          </AnimateIn>

          {/* ── Industry Icon Grid (BELOW template showcase) ── */}
          <AnimateIn className="text-center mb-8">
            <p className="text-base text-[#5B6472]">We serve businesses across these industries:</p>
          </AnimateIn>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: Utensils, label: "Restaurants", industry: "restaurant" },
              { icon: Scissors, label: "Beauty Salons", industry: "beauty" },
              { icon: Stethoscope, label: "Clinics", industry: "clinic" },
              { icon: Dumbbell, label: "Fitness", industry: "fitness" },
              { icon: Briefcase, label: "Consultants", industry: "services", comingSoon: true },
              { icon: ShoppingBag, label: "Retail", industry: "retail", comingSoon: true },
            ].map((biz: any) => (
              <StaggerItem key={biz.label}>
                <Link href={`/templates?industry=${biz.industry}`}>
                  <div className={`dm-card text-center !p-6 cursor-pointer hover:-translate-y-1 transition-all duration-300 ${biz.comingSoon ? 'opacity-60 hover:border-[#5B6472]/30' : 'hover:border-[#5B8CFF]/40'}`}>
                    <div className="icon-container-gradient mx-auto mb-4 !w-14 !h-14">
                      <biz.icon size={24} className={biz.comingSoon ? 'text-[#5B6472]' : 'text-[#5B8CFF]'} strokeWidth={1.75} />
                    </div>
                    <p className="text-sm font-semibold text-[#111315]">{biz.label}</p>
                    <p className={`text-xs mt-1 ${biz.comingSoon ? 'text-[#5B6472]' : 'text-[#5B8CFF]'}`}>
                      {biz.comingSoon ? 'Coming soon' : 'View templates →'}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRICING PREVIEW - now BELOW business types
          ═══════════════════════════════════════════ */}
      <section className="section-spacing bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <img src={GRADIENT_BG} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>

        <div className="container relative z-10">
          <AnimateIn className="text-center mb-16">
            <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Transparent Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111315] mb-4">
              Simple, Honest Pricing
            </h2>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto">
              No hidden fees. No surprises. Transparent pricing for every project.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">

            {/* Starter */}
            <AnimateIn delay={0.1}>
              <div className="dm-card h-full flex flex-col">
                <p className="text-sm font-semibold text-[#5B8CFF] uppercase tracking-wide mb-2">Starter</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-[#111315]">€250</span>
                  <span className="text-sm text-[#5B6472]">one-time</span>
                </div>
                <p className="text-xs text-[#5B8CFF] font-medium mb-4">€200 with maintenance bundle</p>
                <p className="text-sm text-[#5B6472] mb-6">Perfect for new businesses that need a clean, professional online presence fast.</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {["1-page landing site", "Mobile responsive", "WhatsApp button", "Social media links", "Accessibility widget (free)", "2 revision rounds", "5-7 day delivery"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                      <CheckCircle2 size={16} className="text-[#5B8CFF] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-secondary w-full justify-center">
                  Get Started
                </Link>
              </div>
            </AnimateIn>

            {/* Business - Recommended */}
            <AnimateIn delay={0.2}>
              <div className="brand-gradient-border h-full">
                <div className="dm-card h-full flex flex-col !shadow-none relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full brand-gradient text-white text-xs font-semibold whitespace-nowrap">Recommended</span>
                  <p className="text-sm font-semibold text-[#8B5CFF] uppercase tracking-wide mb-2">Business</p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-bold text-[#111315]">€400</span>
                    <span className="text-sm text-[#5B6472]">one-time</span>
                  </div>
                  <p className="text-xs text-[#8B5CFF] font-medium mb-4">€350 with maintenance bundle</p>
                  <p className="text-sm text-[#5B6472] mb-6">For established businesses that need a complete, conversion-focused website.</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {["Up to 5 pages", "Mobile responsive", "WhatsApp button + social media links", "Contact form + booking form", "Google Maps + Reviews widget", "Testimonials section", "Basic SEO optimisation", "Speed optimisation", "Accessibility widget (free)", "3 revision rounds", "7-10 day delivery"].map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                        <CheckCircle2 size={16} className="text-[#8B5CFF] shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-primary w-full justify-center">
                    Get Started
                  </Link>
                </div>
              </div>
            </AnimateIn>

            {/* Professional */}
            <AnimateIn delay={0.3}>
              <div className="dm-card h-full flex flex-col">
                <p className="text-sm font-semibold text-[#6FE3FF] uppercase tracking-wide mb-2">Professional</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-[#111315]">€650</span>
                  <span className="text-sm text-[#5B6472]">one-time</span>
                </div>
                <p className="text-xs text-[#6FE3FF] font-medium mb-4">€600 with maintenance bundle</p>
                <p className="text-sm text-[#5B6472] mb-6">For businesses that want a fully custom, feature-rich website with everything included.</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {["Up to 7 pages", "Fully custom design + animations", "Mobile responsive", "WhatsApp button + social media links", "Contact form + booking form", "Google Maps + Reviews widget", "Testimonials + gallery", "5 SEO blog articles", "Full meta/SEO structure", "Pop-up included", "Accessibility widget (free)", "Unlimited revisions", "10-14 day delivery"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                      <CheckCircle2 size={16} className="text-[#6FE3FF] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-secondary w-full justify-center">
                  Get Started
                </Link>
              </div>
            </AnimateIn>

          </div>

          <AnimateIn className="text-center mt-10">
            <p className="text-sm text-[#5B6472] mb-3">
              All plans include a <span className="font-semibold text-[#111315]">free consultation</span> - no commitment, no pressure.
            </p>
            <Link href="/pricing" className="text-sm font-medium text-[#5B8CFF] hover:underline inline-flex items-center gap-1">
              See full pricing &amp; add-ons <ArrowRight size={14} />
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS SECTION
          ═══════════════════════════════════════════ */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <img src={GRADIENT_BG} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        <div className="container relative z-10">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "50+", label: "Websites Delivered" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "5–10", label: "Days to Launch" },
              { value: "24/7", label: "Support Available" },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center">
                  <p className="text-4xl sm:text-5xl font-bold brand-gradient-text mb-2">{stat.value}</p>
                  <p className="text-sm text-[#5B6472] font-medium">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
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
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            aria-hidden="true"
          />
        </div>

        <div className="container relative z-10 section-spacing text-center">
          <AnimateIn>
            <p className="text-sm font-medium text-[#6FE3FF] mb-4 tracking-wide uppercase">Ready to Start?</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
              Let's Build Your Website Together
            </h2>
            <p className="text-lg text-[#94A3B8] mb-10 max-w-xl mx-auto">
              Get in touch and we'll get back to you within hours. No commitment, no pressure - just a friendly conversation about your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary !h-14 !text-base !px-8">
                <MessageCircle size={20} />
                Contact Us
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
