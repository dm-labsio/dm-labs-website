/* ============================================================
   D&M LABS — Services Page
   Brand: #5B8CFF→#6FE3FF→#8B5CFF gradient, #F6F6F4 base
   ============================================================ */
import { Link } from "wouter";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import {
  Globe, Smartphone, Search, Zap, Shield, MessageCircle,
  CheckCircle2, ArrowRight, Image, MapPin, FileText, Share2, Headphones, Rocket
} from "lucide-react";

const SERVICES_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/services-hero-bg-bfPgb525LqzgdU7JVYn89M.webp";
const TRIANGLE_GEO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/triangle-geometry-Rf9Cpg8ynqtbpdNzPsSccU.webp";
const WHATSAPP_URL = "https://wa.me/972584928177?text=Hi%20D%26M%20Labs!%20I%27d%20like%20to%20discuss%20a%20website%20project.";

export default function Services() {
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
              From custom design to SEO optimization, we provide everything your business needs to succeed online.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Core Packages */}
      <section className="section-spacing bg-white">
        <div className="container">
          <AnimateIn className="mb-16">
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Core Services</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111315]">Website Packages</h2>
          </AnimateIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Starter */}
            <AnimateIn delay={0.1}>
              <div className="dm-card h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="icon-container-gradient">
                    <Globe size={24} className="text-[#5B8CFF]" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#111315]">Starter Website</h3>
                    <p className="text-2xl font-bold brand-gradient-text">€250</p>
                  </div>
                </div>
                <p className="text-sm text-[#5B6472] mb-6 leading-relaxed">
                  Perfect for new businesses or freelancers who need a clean, professional online presence. Includes everything to get started.
                </p>
                <ul className="space-y-3 mb-6">
                  {["Up to 3 custom-designed pages", "Fully mobile responsive", "Contact form with email notifications", "Google Maps integration", "Basic SEO setup", "Social media links", "1 round of revisions", "5–7 day delivery"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                      <CheckCircle2 size={16} className="text-[#5B8CFF] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">Get Started</a>
              </div>
            </AnimateIn>

            {/* Business */}
            <AnimateIn delay={0.2}>
              <div className="brand-gradient-border h-full">
                <div className="dm-card h-full !shadow-none relative">
                  <span className="absolute -top-3 left-6 px-4 py-1 rounded-full brand-gradient text-white text-xs font-semibold">Most Popular</span>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="icon-container-gradient">
                      <Rocket size={24} className="text-[#8B5CFF]" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#111315]">Business Website</h3>
                      <p className="text-2xl font-bold brand-gradient-text">€350</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#5B6472] mb-6 leading-relaxed">
                    For established businesses that need a complete, conversion-focused website with advanced features and integrations.
                  </p>
                  <ul className="space-y-3 mb-6">
                    {["Up to 7 custom-designed pages", "Fully mobile responsive", "Contact form + WhatsApp button", "Google Maps + Reviews integration", "Advanced SEO optimization", "Social media integration", "Speed optimization", "2 rounds of revisions", "7–10 day delivery"].map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                        <CheckCircle2 size={16} className="text-[#8B5CFF] shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">Get Started</a>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-spacing">
        <div className="container">
          <AnimateIn className="text-center mb-16">
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Included in Every Website</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111315]">Everything You Need, Nothing You Don't</h2>
          </AnimateIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Smartphone, title: "Mobile Responsive", desc: "Looks perfect on every device — phones, tablets, and desktops." },
              { icon: Search, title: "SEO Optimized", desc: "Built-in search engine optimization so customers find you on Google." },
              { icon: Zap, title: "Fast Loading", desc: "Optimized code and assets for lightning-fast page speeds." },
              { icon: Shield, title: "SSL Security", desc: "Free SSL certificate to keep your site and visitors secure." },
              { icon: Image, title: "Custom Design", desc: "No templates — every design is tailored to your brand identity." },
              { icon: MapPin, title: "Google Maps", desc: "Embedded maps so customers can find your physical location easily." },
              { icon: FileText, title: "Contact Forms", desc: "Professional forms that send inquiries directly to your email." },
              { icon: Share2, title: "Social Integration", desc: "Links to all your social media profiles in one place." },
              { icon: Headphones, title: "Post-Launch Support", desc: "We don't disappear after launch — ongoing support when you need it." },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="dm-card h-full !p-6">
                  <div className="flex items-start gap-4">
                    <div className="icon-container-gradient !w-12 !h-12 !rounded-xl">
                      <item.icon size={20} className="text-[#5B8CFF]" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#111315] mb-1">{item.title}</h3>
                      <p className="text-sm text-[#5B6472] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
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
                Monthly Maintenance — <span className="brand-gradient-text">€50/mo</span>
              </h2>
              <p className="text-lg text-[#5B6472] mb-8 leading-relaxed">
                Keep your website fresh, secure, and performing at its best. We handle the technical stuff so you can focus on your business.
              </p>
              <ul className="space-y-4 mb-8">
                {["Monthly content updates (text, images, prices)", "Security monitoring and updates", "Performance optimization", "Hosting and domain management", "Priority WhatsApp support", "Monthly analytics report"].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[#111315]">
                    <CheckCircle2 size={18} className="text-[#5B8CFF] shrink-0 mt-0.5" />
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <MessageCircle size={18} />
                Ask About Maintenance
              </a>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <div className="dm-card !bg-[#F6F6F4]">
                <div className="text-center py-8">
                  <p className="text-6xl font-bold brand-gradient-text mb-2">€50</p>
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
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
              <Link href="/pricing" className="btn-secondary !border-white/20 !text-white hover:!border-white/40">
                Compare Pricing <ArrowRight size={16} />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
