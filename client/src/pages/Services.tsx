/* ============================================================
   DM-Labs.io - Services Page
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
const WHATSAPP_URL = "https://wa.me/35797472847?text=Hi%20DM-Labs.io!%20I%27d%20like%20to%20discuss%20a%20website%20project.";

export default function Services() {
  useSEO({
    title: "Web Design Services Paphos & Cyprus | DM-Labs.io",
    description: "Custom website design in Paphos and across Cyprus. Launch, Growth and Pro website packages from €299, plus ongoing care.",
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
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">What We Offer</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5">
              Services That <span className="brand-gradient-text">Drive Results</span>
            </h1>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto">
              We are a small web design agency focused on building professional, high-quality websites. From custom design to SEO optimisation, we handle everything so you don't have to.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Core Packages */}
      <section className="section-spacing bg-white">
        <div className="container">
          <AnimateIn className="mb-16">
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Core Services</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111315] mb-4">Website Packages</h2>
          </AnimateIn>

          <div
            className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 py-4 px-6 mb-10 rounded-xl"
            style={{ background: "linear-gradient(90deg, #5B8CFF 0%, #6FE3FF 50%, #8B5CFF 100%)" }}
          >
            <span className="text-base sm:text-lg font-bold text-white tracking-widest uppercase">Packages from €299</span>
            <span className="hidden sm:block w-px h-5 bg-white/40" />
            <span className="text-sm sm:text-base text-white/90 font-medium">Clear scope, transparent pricing, and a free consultation before you commit.</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

            {/* Launch Website */}
            <AnimateIn delay={0.1}>
              <div className="dm-card h-full flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="icon-container-gradient"><Globe size={24} className="text-[#5B8CFF]" strokeWidth={1.75} /></div>
                  <div><p className="text-xs font-semibold text-[#5B8CFF] uppercase tracking-wide">Launch Website</p><p className="text-2xl font-bold text-[#111315]">€299 <span className="text-sm font-normal text-[#5B6472]">one-time</span></p></div>
                </div>
                <p className="text-sm text-[#5B6472] mb-5 leading-relaxed">A lean online presence for a new business that needs to launch clearly and professionally.</p>
                <ul className="space-y-3 mb-6 flex-1">
                  {["Small one-page or light two-page site", "Responsive build", "Basic SEO foundations", "WhatsApp and social links", "2 revision rounds"].map((f) => <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]"><CheckCircle2 size={16} className="text-[#5B8CFF] shrink-0 mt-0.5" />{f}</li>)}
                </ul>
                <a href="/contact/" className="btn-secondary w-full justify-center">Get a Free Consultation</a>
              </div>
            </AnimateIn>

            {/* Growth Website - Recommended */}
            <AnimateIn delay={0.2}>
              <div className="brand-gradient-border h-full">
                <div className="dm-card h-full !shadow-none relative flex flex-col">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full brand-gradient text-white text-xs font-semibold whitespace-nowrap">Recommended</span>
                  <div className="flex items-center gap-4 mb-4"><div className="icon-container-gradient"><Rocket size={24} className="text-[#8B5CFF]" strokeWidth={1.75} /></div><div><p className="text-xs font-semibold text-[#8B5CFF] uppercase tracking-wide">Growth Website</p><p className="text-2xl font-bold text-[#111315]">€749 <span className="text-sm font-normal text-[#5B6472]">one-time</span></p></div></div>
                  <p className="text-sm text-[#5B6472] mb-5 leading-relaxed">A conversion-focused site for a business ready to be found, trusted, and contacted online.</p>
                  <ul className="space-y-3 mb-6 flex-1">
                    {["Up to 4 pages", "Contact form", "Google Maps and reviews/testimonials", "Basic SEO", "Search Console and Analytics setup", "3 revision rounds"].map((f) => <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]"><CheckCircle2 size={16} className="text-[#8B5CFF] shrink-0 mt-0.5" />{f}</li>)}
                  </ul>
                  <a href="/contact/" className="btn-primary w-full justify-center">Get a Free Consultation</a>
                </div>
              </div>
            </AnimateIn>

            {/* Pro Website */}
            <AnimateIn delay={0.3}>
              <div className="dm-card h-full flex flex-col">
                <div className="flex items-center gap-4 mb-4"><div className="icon-container-gradient"><Globe size={24} className="text-[#6FE3FF]" strokeWidth={1.75} /></div><div><p className="text-xs font-semibold text-[#6FE3FF] uppercase tracking-wide">Pro Website</p><p className="text-2xl font-bold text-[#111315]">€1,499 <span className="text-sm font-normal text-[#5B6472]">one-time</span></p></div></div>
                <p className="text-sm text-[#5B6472] mb-5 leading-relaxed">For a more complete digital presence with richer content, motion, and stronger search foundations.</p>
                <ul className="space-y-3 mb-6 flex-1">
                  {["Up to 7 pages", "Gallery or portfolio", "Pop-up and scroll-driven animations", "Full SEO structure", "Blog setup or a website visual pack", "4 revision rounds"].map((f) => <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]"><CheckCircle2 size={16} className="text-[#6FE3FF] shrink-0 mt-0.5" />{f}</li>)}
                </ul>
                <a href="/contact/" className="btn-secondary w-full justify-center">Get a Free Consultation</a>
              </div>
            </AnimateIn>

          </div>

          {/* Enterprise Wide Banner */}
          <AnimateIn delay={0.4} className="mt-8">
            <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1117 0%, #161b2e 50%, #0d1117 100%)", border: "1px solid rgba(91,140,255,0.2)" }}>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 p-8">

                {/* Left: label + price + description */}
                <div className="flex-shrink-0 lg:w-72">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "linear-gradient(90deg, #5B8CFF, #8B5CFF)", color: "#fff" }}>Built for You</span>
                  <p className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: "#6FE3FF" }}>Enterprise / Custom</p>
                  <p className="text-4xl font-bold text-white mb-1">From €1,499</p>
                  <p className="text-xs font-medium mb-4" style={{ color: "#5B8CFF" }}>Quote based on scope</p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    For integrations, multilingual builds, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, or unusual content volume.
                  </p>
                  <a
                    href="/contact/"
                    className="mt-6 inline-flex items-center justify-center gap-2 py-3 px-8 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(90deg, #5B8CFF, #8B5CFF)" }}
                  >
                    <MessageCircle size={16} /> Contact Us
                  </a>
                </div>

                {/* Divider */}
                <div className="hidden lg:block w-px self-stretch" style={{ background: "rgba(91,140,255,0.2)" }} />

                {/* Right: feature grid */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
                  {[
                    { icon: Globe, label: "Fully custom design from scratch" },
                    { icon: Zap, label: "Scope designed around your project" },
                    { icon: CalendarCheck, label: "CRM and booking integrations" },
                    { icon: Languages, label: "Multi-language support" },
                    { icon: Users, label: "Dedicated project manager" },
                    { icon: Headphones, label: "Priority support and delivery" },
                    { icon: ArrowRight, label: "Ongoing retainer option" },
                    { icon: CheckCircle2, label: "Custom SEO and content strategy" },
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

      {/* What's Included */}
      <section className="section-spacing">
        <div className="container">
          <AnimateIn className="text-center mb-16">
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Included in Every Website</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111315]">Everything You Need, Nothing You Don't</h2>
          </AnimateIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              { icon: Smartphone, title: "Mobile Responsive", desc: "Looks perfect on every device - phones, tablets, and desktops.", anchor: "mobile-first" },
              { icon: Search, title: "SEO Optimised", desc: "Built-in search engine optimisation so customers find you on Google.", anchor: "seo" },
              { icon: Zap, title: "Fast Loading", desc: "Optimised code and assets for lightning-fast page speeds.", anchor: "performance" },
              { icon: Shield, title: "SSL Security", desc: "Free SSL certificate to keep your site and visitors secure.", anchor: "security" },
              { icon: Image, title: "Custom Design", desc: "No off-the-shelf designs - every website is tailored to your brand identity.", anchor: "custom-design" },
              { icon: MapPin, title: "Google Maps", desc: "Embedded maps so customers can find your physical location easily.", anchor: "maps" },
              { icon: FileText, title: "Contact Forms", desc: "Professional forms that send inquiries directly to your email.", anchor: "forms" },
              { icon: Share2, title: "Social Integration", desc: "Links to all your social media profiles in one place.", anchor: "social" },
              { icon: Headphones, title: "Post-Launch Support", desc: "We don't disappear after launch - ongoing support when you need it.", anchor: "turnaround" },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <Link href={`/services/${item.anchor}/`}>
                  <div id={item.anchor} className="dm-card h-full !p-6 scroll-mt-24 cursor-pointer hover:border-[#5B8CFF]/40 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="icon-container-gradient !w-12 !h-12 !rounded-xl">
                        <item.icon size={20} className="text-[#5B8CFF]" strokeWidth={1.75} />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-[#111315] mb-1">{item.title}</h3>
                        <p className="text-sm text-[#5B6472] leading-relaxed mb-2">{item.desc}</p>
                        <span className="text-xs font-medium text-[#5B8CFF] inline-flex items-center gap-1">Learn more →</span>
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
              <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Optional Add-On</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#111315] mb-5">
                Website Care Plans - <span className="brand-gradient-text">from €49/mo</span>
              </h2>
              <p className="text-lg text-[#5B6472] mb-6 leading-relaxed">
                Keep your website fresh, secure, and performing. Choose the plan that fits your needs.
              </p>
              <div className="space-y-5 mb-8">
                <div className="dm-card !p-5">
                  <p className="text-sm font-semibold text-[#5B8CFF] uppercase tracking-wide mb-2">Basic Care — €49/month</p>
                  <ul className="space-y-2">
                    {["Hosting monitoring", "Backups and bug fixing", "WhatsApp support", "Up to 5 small content updates per month", "Cancel anytime, no contract"].map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                        <CheckCircle2 size={15} className="text-[#5B8CFF] shrink-0 mt-0.5" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="dm-card !p-5 border-[#8B5CFF]/30">
                  <p className="text-sm font-semibold text-[#8B5CFF] uppercase tracking-wide mb-2">Complete Care — ongoing content updates</p>
                  <ul className="space-y-2">
                    {["Everything in Basic Care", "Ongoing content updates", "Priority WhatsApp support", "Monthly performance check", "One simple banner or section update each month", "Cancel anytime, no contract"].map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                        <CheckCircle2 size={15} className="text-[#8B5CFF] shrink-0 mt-0.5" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <a href="/contact/" className="btn-primary">
                <MessageCircle size={18} />
                Ask About Maintenance
              </a>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <div className="dm-card !bg-[#F6F6F4]">
                <div className="text-center py-8">
                  <div className="flex items-baseline justify-center gap-3 mb-2">
                    <span className="text-5xl font-bold brand-gradient-text">€49</span>
                    <span className="text-2xl text-[#5B6472]">or</span>
                    <span className="text-5xl font-bold brand-gradient-text">€129</span>
                  </div>
                  <p className="text-lg text-[#5B6472] mb-6">per month</p>
                  <div className="w-16 h-0.5 brand-gradient mx-auto rounded-full mb-6" />
                  <p className="text-sm text-[#5B6472] max-w-xs mx-auto">Cancel anytime. No contracts. No commitments. Just ongoing care for your website.</p>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Ready to Get Started?</h2>
            <p className="text-lg text-[#94A3B8] mb-8 max-w-xl mx-auto">Send us a message and we'll discuss which package is right for your business.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact/" className="btn-primary">
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
              <Link href="/pricing/" className="btn-secondary !border-white/20 !text-white hover:!border-white/40">
                Compare Pricing <ArrowRight size={16} />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
