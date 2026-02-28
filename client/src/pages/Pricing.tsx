/* ============================================================
   D&M LABS — Pricing Page
   Brand: #5B8CFF→#6FE3FF→#8B5CFF gradient
   ============================================================ */
import { Link } from "wouter";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import { CheckCircle2, X, MessageCircle, ArrowRight, HelpCircle } from "lucide-react";

const GRADIENT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/gradient-mesh-bg-nrkTNmAHHWeVJB3ubHRGDu.webp";
const WHATSAPP_URL = "https://wa.me/972584928177?text=Hi%20D%26M%20Labs!%20I%27d%20like%20to%20discuss%20a%20website%20project.";

const comparison = [
  { feature: "Custom-designed pages", starter: "Up to 3", business: "Up to 7" },
  { feature: "Mobile responsive", starter: true, business: true },
  { feature: "Contact form", starter: true, business: true },
  { feature: "WhatsApp button", starter: true, business: true },
  { feature: "Google Maps", starter: true, business: true },
  { feature: "Basic SEO", starter: true, business: true },
  { feature: "Advanced SEO", starter: false, business: true },
  { feature: "Social media integration", starter: false, business: true },
  { feature: "Google Reviews widget", starter: false, business: true },
  { feature: "Speed optimization", starter: false, business: true },
  { feature: "Revision rounds", starter: "1 round", business: "2 rounds" },
  { feature: "Delivery time", starter: "5–7 days", business: "7–10 days" },
];

export default function Pricing() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(4rem, 8vh, 6rem)" }}>
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <img src={GRADIENT_BG} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        <div className="container relative z-10 text-center">
          <AnimateIn>
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Transparent Pricing</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5">
              Simple, <span className="brand-gradient-text">Honest Pricing</span>
            </h1>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto">
              No hidden fees. No surprises. Choose the package that fits your business, pay 50% upfront, and 50% on delivery.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <AnimateIn delay={0.1}>
              <div className="dm-card h-full flex flex-col">
                <p className="text-sm font-medium text-[#5B8CFF] mb-2">Starter</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-[#111315]">€250</span>
                  <span className="text-sm text-[#5B6472]">one-time</span>
                </div>
                <p className="text-xs text-[#5B6472] mb-6">€125 upfront + €125 on delivery</p>
                <p className="text-sm text-[#5B6472] mb-6">Perfect for new businesses that need a professional online presence.</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {["Up to 3 pages", "Mobile responsive", "Contact form", "Google Maps", "Basic SEO", "1 revision round"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                      <CheckCircle2 size={16} className="text-[#5B8CFF] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full justify-center">Choose Starter</a>
              </div>
            </AnimateIn>

            {/* Business */}
            <AnimateIn delay={0.2}>
              <div className="brand-gradient-border h-full">
                <div className="dm-card h-full flex flex-col !shadow-none relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full brand-gradient text-white text-xs font-semibold">Most Popular</span>
                  <p className="text-sm font-medium text-[#8B5CFF] mb-2">Business</p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-bold text-[#111315]">€350</span>
                    <span className="text-sm text-[#5B6472]">one-time</span>
                  </div>
                  <p className="text-xs text-[#5B6472] mb-6">€175 upfront + €175 on delivery</p>
                  <p className="text-sm text-[#5B6472] mb-6">For established businesses that need a complete, conversion-focused website.</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {["Up to 7 pages", "Mobile responsive", "Contact form + WhatsApp", "Google Maps + Reviews", "Advanced SEO", "2 revision rounds", "Social media integration", "Speed optimization"].map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                        <CheckCircle2 size={16} className="text-[#8B5CFF] shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">Choose Business</a>
                </div>
              </div>
            </AnimateIn>

            {/* Maintenance */}
            <AnimateIn delay={0.3}>
              <div className="dm-card h-full flex flex-col">
                <p className="text-sm font-medium text-[#5B8CFF] mb-2">Maintenance</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-[#111315]">€50</span>
                  <span className="text-sm text-[#5B6472]">/month</span>
                </div>
                <p className="text-xs text-[#5B6472] mb-6">Cancel anytime — no contracts</p>
                <p className="text-sm text-[#5B6472] mb-6">Keep your website updated, secure, and performing at its best.</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {["Monthly content updates", "Security monitoring", "Performance optimization", "Hosting management", "Priority support", "Monthly analytics report"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                      <CheckCircle2 size={16} className="text-[#5B8CFF] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full justify-center">Learn More</a>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-spacing">
        <div className="container">
          <AnimateIn className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111315] mb-4">Feature Comparison</h2>
            <p className="text-lg text-[#5B6472]">See exactly what's included in each package.</p>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div className="max-w-3xl mx-auto overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#E2E5EA]">
                    <th className="text-left py-4 pr-4 text-sm font-semibold text-[#111315]">Feature</th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-[#5B8CFF]">Starter — €250</th>
                    <th className="text-center py-4 pl-4 text-sm font-semibold text-[#8B5CFF]">Business — €350</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.feature} className="border-b border-[#E2E5EA]">
                      <td className="py-3.5 pr-4 text-sm text-[#111315]">{row.feature}</td>
                      <td className="py-3.5 px-4 text-center">
                        {typeof row.starter === "boolean" ? (
                          row.starter ? <CheckCircle2 size={18} className="text-[#5B8CFF] mx-auto" /> : <X size={18} className="text-[#D1D5DB] mx-auto" />
                        ) : (
                          <span className="text-sm text-[#5B6472]">{row.starter}</span>
                        )}
                      </td>
                      <td className="py-3.5 pl-4 text-center">
                        {typeof row.business === "boolean" ? (
                          row.business ? <CheckCircle2 size={18} className="text-[#8B5CFF] mx-auto" /> : <X size={18} className="text-[#D1D5DB] mx-auto" />
                        ) : (
                          <span className="text-sm text-[#5B6472]">{row.business}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Payment Info */}
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl">
          <AnimateIn className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#111315] mb-4">How Payment Works</h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="dm-card text-center">
                <div className="w-12 h-12 rounded-full brand-gradient text-white text-lg font-bold flex items-center justify-center mx-auto mb-4">1</div>
                <h3 className="text-lg font-semibold text-[#111315] mb-2">50% Upfront</h3>
                <p className="text-sm text-[#5B6472]">Pay half when we agree on the project scope. This secures your spot and we start immediately.</p>
              </div>
              <div className="dm-card text-center">
                <div className="w-12 h-12 rounded-full brand-gradient text-white text-lg font-bold flex items-center justify-center mx-auto mb-4">2</div>
                <h3 className="text-lg font-semibold text-[#111315] mb-2">50% On Delivery</h3>
                <p className="text-sm text-[#5B6472]">Pay the remaining half only when you're happy with the result and ready to launch.</p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="section-spacing">
        <div className="container max-w-3xl">
          <AnimateIn className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#111315] mb-4">Common Questions</h2>
          </AnimateIn>
          <StaggerContainer className="space-y-4">
            {[
              { q: "Are there any hidden fees?", a: "No. The price you see is the price you pay. Hosting and domain costs are separate (typically €10–15/month) but we'll explain everything upfront." },
              { q: "What if I need changes after launch?", a: "Small text changes are free for the first month. After that, our maintenance plan covers ongoing updates, or you can request individual changes." },
              { q: "Do I own my website?", a: "Yes, 100%. Once paid in full, the website and all its content belong to you." },
            ].map((item) => (
              <StaggerItem key={item.q}>
                <div className="dm-card !p-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle size={20} className="text-[#5B8CFF] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-base font-semibold text-[#111315] mb-2">{item.q}</h3>
                      <p className="text-sm text-[#5B6472] leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <AnimateIn className="text-center mt-8">
            <Link href="/faq" className="text-sm font-medium text-[#5B8CFF] hover:underline inline-flex items-center gap-1">
              See all FAQs <ArrowRight size={14} />
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing dark-section text-center">
        <div className="container">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Ready to Invest in Your Business?</h2>
            <p className="text-lg text-[#94A3B8] mb-8 max-w-xl mx-auto">Let's discuss which package is the best fit. No pressure, no commitment.</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
