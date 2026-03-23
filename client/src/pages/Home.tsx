/* ============================================================
   D&M LABS - Homepage
   Hero with gradient atmosphere + floating devices
   Sections: Hero, Trust Strip, Template Showcase + Industries, Services, Process, Testimonials, Pricing, Stats, CTA
   Brand: #5B8CFF→#6FE3FF→#8B5CFF, #F6F6F4 base, #0F172A dark
   ============================================================ */
import { Link } from "wouter";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import {
  Globe, Smartphone, Search, Zap, Shield, Clock,
  CheckCircle2, ArrowRight, MessageCircle,
  Utensils, Scissors, Stethoscope, Briefcase, Dumbbell, ShoppingBag,
  Palette, Code, Rocket, Headphones, Quote, HelpCircle
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
  },
  {
    id: "aura-hair-studio",
    industry: "beauty",
    name: "Aura Hair Studio",
    category: "Beauty & Wellness",
    styleLabel: "Luxury Dark",
    cardImage: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/JyHQRjqPVlblrfxy.png?Expires=1804155917&Signature=nXItT-k29wLV-5kRmvnIZi-2~BybQGrUswsZYub5OO8LHaCP7de8yE26ZHoMELyNwHttk686yxhHpSB6b1YCJssJ-4~5AoAIYSITW-s87XJjwZugsuD-CED4gjf3UNTU05~gqRRjO5APKZGgn5idkjrFyF-g12tnho49W9gdcW~AcTJ1H~l~Z1RlMbV051WcZm80PEnBzw0DaC01A0aVfwHM0OEtf1Fh4wLBgFn7aPXXukB~aBrru8Cl5fGSUIX2fhAZ3PB1r2U3YbtfIK-0d7cYzJuJ8~Wd0NJp~sz0R1U79XiZDPEuCsl27~~gv3JVFy5nOZwJCyThZzwcfXGrVA__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
  {
    id: "vitality-medical-clinic",
    industry: "clinic",
    name: "Vitality Medical Clinic",
    category: "Clinics & Health",
    styleLabel: "Clean & Professional",
    cardImage: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/vHiXcgVzfwvNVOeM.png?Expires=1804248063&Signature=ZzohmEbDPrne9IuEegn0BwtkTJXFDhaGAsPBm9laKfqJ0XcUr8wfSoTtoi1aOYtX7JcnT46gXq7AIuGQRJ0tnThKxddiggu8~2k5jMEIv29FNuWZ5a6nYT4-dGBGJUc1ukwLk8Sa8O9o8MfXClwr7FYhC2Jv8748ztNqCntTFB-BRey-LWpcFY5dffhPIIiih1jbkwcbJyC-2TuEfO8uZjhn6YuMNWcBlXGe6yBd~v9U-qFY8B2H9VqsyeuGZKSEwyHug2m5ROSr6~sFi8S41WCC~knstnwhQap7wWqGkzWDNmyYfKaBpdkWBKIgVo99Rgd2OCmsxfCK8eB4kix8BA__&Key-Pair-Id=K2HSFNDJXOU9YS",
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
    text: "I was nervous about getting a website built but D&M Labs made it completely stress-free. They handled everything and the result looks incredible. Worth every cent.",
    rating: 5,
    initial: "S",
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
                We are a dedicated web design agency. We build professional, fast, and conversion-focused websites for businesses like yours - from €299.
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
              "European-Based Team",
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
          <img src={GRADIENT_BG} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        <div className="container relative z-10">
          {/* -- Template Showcase Grid -- */}
          <AnimateIn className="text-center mb-10">
            <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Design Inspiration</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111315] mb-3">
              See What We Can Create for You
            </h2>
            <p className="text-base text-[#5B6472] max-w-2xl mx-auto">
              Every website we build is <strong className="text-[#111315]">fully custom</strong> - designed from scratch around your brand, your content, and your customers. These examples show the range of styles and industries we work with. Think of them as inspiration, not off-the-shelf templates.
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
                        See example <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateIn className="text-center mb-16">
            <Link href="/templates" className="btn-primary">
              Browse All Examples
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
              { icon: Clock, title: "Quick Turnaround", desc: "From concept to launch in 5-14 business days. We move fast without compromising quality.", anchor: "turnaround" },
            ].map((service) => (
              <StaggerItem key={service.title}>
                <Link href={`/services/${service.anchor}`}>
                  <div className="dm-card h-full cursor-pointer hover:border-[#5B8CFF]/40 hover:-translate-y-1 transition-all duration-300">
                    <div className="icon-container-gradient mb-5">
                      <service.icon size={24} className="text-[#5B8CFF]" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg font-semibold text-[#111315] mb-2">{service.title}</h3>
                    <p className="text-sm text-[#5B6472] leading-relaxed mb-4">{service.desc}</p>
                    <span className="text-sm font-medium text-[#5B8CFF] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
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
          PROCESS OVERVIEW
          ═══════════════════════════════════════════ */}
      <section className="section-spacing relative overflow-hidden" style={{ background: "linear-gradient(135deg, #F8FAFF 0%, #F0F4FF 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <img src={GRADIENT_BG} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>

        <div className="container relative z-10">
          <AnimateIn className="text-center mb-16">
            <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111315] mb-4">
              From Idea to Launch in 5 Simple Steps
            </h2>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto">
              We've streamlined the process so you can focus on running your business.
            </p>
          </AnimateIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: MessageCircle, step: "01", title: "Discovery Call", desc: "Quick WhatsApp chat to understand your business and goals.", time: "~1 day", color: "#5B8CFF" },
              { icon: Palette, step: "02", title: "Design", desc: "We create a custom design based on your brand and preferences.", time: "2-3 days", color: "#6FE3FF" },
              { icon: Code, step: "03", title: "Build", desc: "Your website is developed with clean code, optimised for speed and SEO.", time: "3-5 days", color: "#8B5CFF" },
              { icon: Headphones, step: "04", title: "Revisions", desc: "We refine the design based on your feedback until you're happy.", time: "1-2 days", color: "#5B8CFF" },
              { icon: Rocket, step: "05", title: "Launch", desc: "We deploy your site, connect your domain, and make sure everything works.", time: "~1 day", color: "#6FE3FF" },
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
            <Link href="/process" className="btn-secondary">
              See Full Process
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
              <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Client Stories</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111315] mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-[#5B6472] max-w-xl mx-auto">
              Early feedback from the businesses we've worked with.
            </p>
          </AnimateIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          <img src={GRADIENT_BG} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>

        <div className="container relative z-10">
          <AnimateIn className="text-center mb-16">
            <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Transparent Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111315] mb-4">
              Simple, Honest Pricing
            </h2>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-5">
              No hidden fees. No surprises. Transparent pricing for every project.
            </p>
           </AnimateIn>

          {/* Launching Prices Full-Width Banner */}
          <div
            className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 py-4 px-8 mb-10"
            style={{ background: "linear-gradient(90deg, #5B8CFF 0%, #6FE3FF 50%, #8B5CFF 100%)" }}
          >
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-white animate-pulse opacity-80" />
            <span className="text-base sm:text-lg font-bold text-white tracking-widest uppercase">Launching Prices</span>
            <span className="hidden sm:block w-px h-5 bg-white/40" />
            <span className="text-sm sm:text-base text-white/90 font-medium">Introductory rates available now. <span className="font-bold text-white">Claim yours today.</span></span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">

            {/* Starter */}
            <AnimateIn delay={0.1}>
              <div className="dm-card h-full flex flex-col">
                <p className="text-sm font-semibold text-[#5B8CFF] uppercase tracking-wide mb-2">Starter</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-[#111315]">€299</span>
                  <span className="text-sm text-[#5B6472]">one-time</span>
                </div>
                <p className="text-xs text-[#5B8CFF] font-medium mb-4">€249 with maintenance bundle</p>
                <p className="text-sm text-[#5B6472] mb-6">Perfect for new businesses that need a clean, professional online presence fast.</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {["Branded Business Page", "Mobile responsive", "WhatsApp button", "Social media links", "Accessibility widget (free)", "2 revision rounds", "5-7 day delivery"].map((f) => (
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
                    <span className="text-4xl font-bold text-[#111315]">€399</span>
                    <span className="text-sm text-[#5B6472]">one-time</span>
                  </div>
                  <p className="text-xs text-[#8B5CFF] font-medium mb-4">€349 with maintenance bundle</p>
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

            {/* Premium */}
            <AnimateIn delay={0.3}>
              <div className="dm-card h-full flex flex-col">
                <p className="text-sm font-semibold text-[#6FE3FF] uppercase tracking-wide mb-2">Premium</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-[#111315]">€699</span>
                  <span className="text-sm text-[#5B6472]">one-time</span>
                </div>
                <p className="text-xs text-[#6FE3FF] font-medium mb-4">€649 with maintenance bundle</p>
                <p className="text-sm text-[#5B6472] mb-6">For businesses that want a fully custom, feature-rich website with everything included.</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {["Up to 7 pages", "Fully custom design + animations", "Mobile responsive", "WhatsApp button + social media links", "Contact form + booking form", "Google Maps + Reviews widget", "Testimonials + gallery", "5 SEO blog articles", "Full meta/SEO structure", "Pop-up included", "Accessibility widget (free)", "5 revision rounds", "10-14 day delivery"].map((f) => (
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
          INDUSTRIES WE SERVE
          ═══════════════════════════════════════════ */}
      <section className="section-spacing bg-white">
        <div className="container">
          <AnimateIn className="text-center mb-8">
            <p className="text-base text-[#5B6472]">Industries we work with:</p>
          </AnimateIn>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: Utensils, label: "Restaurants", industry: "restaurant" },
              { icon: Scissors, label: "Beauty Salons", industry: "beauty" },
              { icon: Stethoscope, label: "Clinics", industry: "clinic" },
              { icon: Dumbbell, label: "Fitness", industry: "fitness" },
              { icon: Briefcase, label: "Consultants", industry: "services" },
              { icon: ShoppingBag, label: "Retail", industry: "retail" },
            ].map((biz) => (
              <StaggerItem key={biz.label}>
                <Link href={`/templates?industry=${biz.industry}`}>
                  <div className="dm-card text-center !p-6 cursor-pointer hover:-translate-y-1 hover:border-[#5B8CFF]/40 transition-all duration-300">
                    <div className="icon-container-gradient mx-auto mb-4 !w-14 !h-14">
                      <biz.icon size={24} className="text-[#5B8CFF]" strokeWidth={1.75} />
                    </div>
                    <p className="text-sm font-semibold text-[#111315]">{biz.label}</p>
                    <p className="text-xs mt-1 text-[#5B8CFF]">View examples →</p>
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
                <strong className="text-[#111315]">Don't see your industry?</strong>{" "}
                We work with all types of businesses.{" "}
                <Link href="/contact" className="text-[#5B8CFF] font-medium hover:underline">
                  Get in touch →
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
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
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
                    className="text-5xl sm:text-6xl font-bold mb-2 transition-transform duration-300 group-hover:scale-110"
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
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5B8CFF] mb-3">The people behind the work</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111315]">Who We Are</h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">

            {/* Anastacia Card */}
            <AnimateIn delay={0.1}>
              <div className="group rounded-2xl border border-[#E2E5EA] bg-[#F8FAFF] hover:border-[#5B8CFF]/40 hover:shadow-xl transition-all duration-500 p-7">
                {/* Top: avatar + name/role */}
                <div className="flex items-center gap-5 mb-5">
                  <div className="relative flex-shrink-0 w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#E2E5EA] group-hover:ring-[#5B8CFF]/50 transition-all duration-300">
                    <img
                      src="https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/AtkkCmVLLZyIDtDx.jpg?Expires=1805807307&Signature=tzN5G6aXHi-UfC~wwQP9QpBquJu7jfUai~BOy1r~7Qda~jKdARzVUNxj2kHpbAYeKbodOKiH2SAISEd-8ahuVDDuFT8FRpVVIODCAoHNwGdtS3R-NxO1Rdk6jMzGgV6LBrV8NYFkC9UVgmTirPdOvuu0nU~oQveGK8laTlItVMz6lh1~fvBDI9XtPeOq5uoeavcTWtr6pK2-NzM9P3aou8f2OUmFe5dIPmosvEEq6tqZM-TMP~gysouA6xxzog2U90vPjLusE6VBWtCm6UC6DhakpHinArKvNun2PS-sm7Zqc8QqZkI1KD7dJEhDThyb5TRTwhDWXZELMMR1n-LeaA__&Key-Pair-Id=K2HSFNDJXOU9YS"
                      alt="Anastacia B. - Creative Director & AI Specialist at D&M Labs"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{ objectPosition: 'center 10%' }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#111315]">Anastacia B.</h3>
                    <p className="text-sm font-medium text-[#5B8CFF] mt-0.5">Creative Director &amp; AI Specialist</p>
                  </div>
                </div>
                {/* Bio */}
                <p className="text-sm text-[#5B6472] leading-relaxed mb-6">
                  I worked with global tech companies, training AI models and making sure digital products actually work the way they should. I bring that same dedication with quality and detail to every website we build - because your online presence deserves more than just a pretty template.
                </p>
                {/* Catchphrase */}
                <div className="border-t border-[#E2E5EA] pt-5">
                  <p className="text-sm italic text-[#111315] font-medium leading-snug">
                    &ldquo;Your website should work as hard as you do.&rdquo;
                  </p>
                </div>
              </div>
            </AnimateIn>

            {/* Tom Card */}
            <AnimateIn delay={0.25}>
              <div className="group rounded-2xl border border-[#E2E5EA] bg-[#F8FAFF] hover:border-[#5B8CFF]/40 hover:shadow-xl transition-all duration-500 p-7">
                {/* Top: avatar + name/role */}
                <div className="flex items-center gap-5 mb-5">
                  <div className="relative flex-shrink-0 w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#E2E5EA] group-hover:ring-[#5B8CFF]/50 transition-all duration-300">
                    <img
                      src="https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/DVIoYisVQvzbqoiR.jpg?Expires=1805807307&Signature=sDadHPBIxNAi6lkiWTu64ioOt9Wvou6x~Akos8AKqATejLSMgwmbAZD8f~0e84UTqmXjYaSsbjvvamw1Y1h-3RSEbbutiwjpHPXGka~ZJRodfIKQQSPM9XytIixV9yDrEswB-7Jilroiu0d8A4D1mxlyvc1E0RR1AS2FrGj7ROLWp4T4vmB7rmiX0pXVhawbhH5D0H87lIyXVQ~Ue3ujz4AiyETwbvGuppqmVRXpmyZaqoDZTE9e1plVUn4-pR1jG9l2Pblw-D9VBnUxZuiBxEx2C5BUJOnjFEM6hS6RzjFEGwjQrEa3UFRhednppWiPKLZSbrjPQnzoh-jisjzTQA__&Key-Pair-Id=K2HSFNDJXOU9YS"
                      alt="Tom B. - Technical Director & SEO Expert at D&M Labs"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#111315]">Tom B.</h3>
                    <p className="text-sm font-medium text-[#5B8CFF] mt-0.5">Technical Director &amp; SEO Expert</p>
                  </div>
                </div>
                {/* Bio */}
                <p className="text-sm text-[#5B6472] leading-relaxed mb-6">
                  My background is in automation, development, and integrating complex systems for global organisations. I love solving the technical side of things so you never have to think about it - what you get is a site that is solid, fast, and built to last.
                </p>
                {/* Catchphrase */}
                <div className="border-t border-[#E2E5EA] pt-5">
                  <p className="text-sm italic text-[#111315] font-medium leading-snug">
                    &ldquo;First, solve the problem. Then, write the code.&rdquo;
                  </p>
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
