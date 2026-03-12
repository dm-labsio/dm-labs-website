/* ============================================================
   D&M LABS - Pricing Page
   3 tiers: Starter €299 / Business €399 (recommended) / Premium €699
   Add-ons + 2 maintenance tiers (Essential €39 / Premium €59)
   Bundle deal: €50 off build when signing up for maintenance at same time.
   ============================================================ */
import { Link } from "wouter";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import { CheckCircle2, X, MessageCircle, ArrowRight, HelpCircle, Languages, CalendarCheck, Bell, Accessibility, Tag } from "lucide-react";

const GRADIENT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/gradient-mesh-bg-nrkTNmAHHWeVJB3ubHRGDu.webp";
const WHATSAPP_URL = "https://wa.me/35797472847?text=Hi%20D%26M%20Labs!%20I%27d%20like%20to%20discuss%20a%20website%20project.";

const comparison = [
  { feature: "Custom-designed pages", starter: "1 page", business: "Up to 5", pro: "Up to 7" },
  { feature: "Mobile responsive", starter: true, business: true, pro: true },
  { feature: "WhatsApp button", starter: true, business: true, pro: true },
  { feature: "Social media links", starter: true, business: true, pro: true },
  { feature: "Accessibility widget", starter: true, business: true, pro: true },
  { feature: "Contact form", starter: false, business: true, pro: true },
  { feature: "Booking form", starter: false, business: true, pro: true },
  { feature: "Google Maps", starter: false, business: true, pro: true },
  { feature: "Testimonials section", starter: false, business: true, pro: true },
  { feature: "Basic SEO optimisation", starter: false, business: true, pro: true },
  { feature: "Google Reviews widget", starter: false, business: true, pro: true },
  { feature: "Speed optimisation", starter: false, business: true, pro: true },
  { feature: "Gallery", starter: false, business: false, pro: true },
  { feature: "Custom animations", starter: false, business: false, pro: true },
  { feature: "5 SEO blog articles", starter: false, business: false, pro: true },
  { feature: "Full meta/SEO structure", starter: false, business: false, pro: true },
  { feature: "Pop-up included", starter: false, business: false, pro: true },
  { feature: "Revision rounds", starter: "2 rounds", business: "3 rounds", pro: "5 rounds" },
  { feature: "Delivery time", starter: "5-7 days", business: "7-10 days", pro: "10-14 days" },
];

const addons = [
  { icon: Languages, label: "Multilingual - 2 languages", price: "€80" },
  { icon: Languages, label: "Multilingual - up to 4 languages", price: "€150" },
  { icon: CalendarCheck, label: "Booking / reservation redirect (Calendly, Wolt, etc.)", price: "€30" },
  { icon: Bell, label: "Pop-up (promo, announcement, cookie notice)", price: "€40" },
  { icon: Accessibility, label: "Full WCAG 2.1 AA accessibility audit", price: "€40" },
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
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-5">
              No hidden fees. No surprises. Choose the package that fits your business - every plan includes a free consultation.
            </p>
            {/* Launching Prices Badge */}
            <span className="inline-flex items-center px-5 py-2 rounded-full brand-gradient text-white text-sm font-semibold tracking-wide">
              Launching Prices
            </span>
          </AnimateIn>
        </div>
      </section>

      {/* Bundle Deal Banner */}
      <section className="bg-[#EEF3FF] border-y border-[#5B8CFF]/20 py-4">
        <div className="container">
          <AnimateIn>
            <div className="flex items-center justify-center gap-3 flex-wrap text-center">
              <Tag size={18} className="text-[#5B8CFF] shrink-0" />
              <p className="text-sm font-semibold text-[#111315]">
                Bundle Deal: Add a monthly maintenance plan at checkout and get <span className="text-[#5B8CFF]">€50 off your build price</span> - one-time discount, applied once at the start.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">

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
                  {[
                    "Branded Business Page",
                    "Mobile responsive",
                    "WhatsApp button",
                    "Social media links",
                    "Accessibility widget (free)",
                    "2 revision rounds",
                    "5-7 day delivery",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                      <CheckCircle2 size={16} className="text-[#5B8CFF] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/contact" className="btn-secondary w-full justify-center">
                  <MessageCircle size={16} /> Get Started
                </a>
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
                    {[
                      "Up to 5 pages",
                      "Mobile responsive",
                      "WhatsApp button + social media links",
                      "Contact form + booking form",
                      "Google Maps + Reviews widget",
                      "Testimonials section",
                      "Basic SEO optimisation",
                      "Speed optimisation",
                      "Accessibility widget (free)",
                      "3 revision rounds",
                      "7-10 day delivery",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                        <CheckCircle2 size={16} className="text-[#8B5CFF] shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="/contact" className="btn-primary w-full justify-center">
                    <MessageCircle size={16} /> Get Started
                  </a>
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
                  {[
                    "Up to 7 pages",
                    "Fully custom design + animations",
                    "Mobile responsive",
                    "WhatsApp button + social media links",
                    "Contact form + booking form",
                    "Google Maps + Reviews widget",
                    "Testimonials + gallery",
                    "5 SEO blog articles",
                    "Full meta/SEO structure",
                    "Speed optimisation",
                    "Pop-up included",
                    "Accessibility widget (free)",
                    "5 revision rounds",
                    "10-14 day delivery",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                      <CheckCircle2 size={16} className="text-[#6FE3FF] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/contact" className="btn-secondary w-full justify-center">
                  <MessageCircle size={16} /> Get Started
                </a>
              </div>
            </AnimateIn>

          </div>
          <AnimateIn delay={0.4} className="text-center mt-8">
            <p className="text-sm text-[#5B6472]">
              All plans include a <span className="font-semibold text-[#111315]">free consultation</span> - no commitment, no pressure. Just a friendly chat about your business.
            </p>
            <p className="text-sm text-[#5B6472] mt-3 flex items-center justify-center gap-2">
              <CheckCircle2 size={15} className="text-[#5B8CFF]" />
              <span><span className="font-semibold text-[#111315]">Satisfaction guaranteed</span> - we work until you're happy with the result.</span>
            </p>
            <p className="text-sm text-[#5B6472] mt-2">
              <a href="#maintenance" className="text-[#5B8CFF] hover:underline font-medium">Also see: Monthly Maintenance Plans ↓</a>
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Add-ons */}
      <section className="section-spacing">
        <div className="container max-w-3xl">
          <AnimateIn className="text-center mb-12">
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Optional Extras</p>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">Add-Ons</h2>
            <p className="text-[#5B6472]">Enhance your website with these optional features, available for any plan.</p>
          </AnimateIn>
          <StaggerContainer className="space-y-3">
            {addons.map((a) => (
              <StaggerItem key={a.label}>
                <div className="dm-card !p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="icon-container-gradient !w-10 !h-10 shrink-0">
                      <a.icon size={18} className="text-[#5B8CFF]" strokeWidth={1.75} />
                    </div>
                    <p className="text-sm font-medium text-[#111315]">{a.label}</p>
                  </div>
                  <span className="text-base font-bold text-[#5B8CFF] shrink-0">{a.price}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <AnimateIn delay={0.3} className="mt-6">
            <div className="dm-card !p-5 flex items-start gap-4 border-[#5B8CFF]/20 bg-[#5B8CFF]/[0.03]">
              <Accessibility size={20} className="text-[#5B8CFF] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#111315] mb-1">Accessibility included in every plan</p>
                <p className="text-xs text-[#5B6472] leading-relaxed">
                  Every website we build includes a basic <strong>accessibility widget</strong> at no extra cost - covering font size controls, contrast adjustments, and keyboard navigation. For businesses that need a full WCAG 2.1 AA audit and compliance certificate, we offer this as a €40 add-on.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Maintenance */}
      <section id="maintenance" className="section-spacing bg-white">
        <div className="container max-w-4xl">
          <AnimateIn className="text-center mb-4">
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Keep It Fresh</p>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">Monthly Maintenance</h2>
            <p className="text-[#5B6472] max-w-xl mx-auto">Your website is a living thing. Keep it updated, fast, and relevant with one of our maintenance plans.</p>
          </AnimateIn>

          {/* Bundle reminder */}
          <AnimateIn delay={0.1} className="mb-10">
            <div className="max-w-2xl mx-auto flex items-start gap-3 bg-[#EEF3FF] border border-[#5B8CFF]/20 rounded-xl px-5 py-4">
              <Tag size={18} className="text-[#5B8CFF] shrink-0 mt-0.5" />
              <p className="text-sm text-[#111315]">
                <span className="font-semibold">Bundle deal:</span> Sign up for any maintenance plan together with your website build and get <span className="font-semibold text-[#5B8CFF]">€50 off your build price</span>. This is a one-time discount applied at the start - your monthly plan continues at the regular rate afterwards. Cancel anytime, no long-term contract.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <AnimateIn delay={0.2}>
              <div className="dm-card h-full flex flex-col">
                <p className="text-sm font-semibold text-[#5B8CFF] uppercase tracking-wide mb-2">Essential</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold text-[#111315]">€39</span>
                  <span className="text-sm text-[#5B6472]">/month</span>
                </div>
                <ul className="space-y-3 flex-1">
                  {["Up to 3 content updates/month", "Text, images, prices and hours", "Hosting and uptime monitoring", "WhatsApp support (48h response)", "Monthly backup"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                      <CheckCircle2 size={15} className="text-[#5B8CFF] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/contact" className="btn-secondary w-full justify-center mt-6">Choose Essential</a>
              </div>
            </AnimateIn>
            <AnimateIn delay={0.3}>
              <div className="brand-gradient-border h-full">
                <div className="dm-card h-full flex flex-col !shadow-none">
                  <p className="text-sm font-semibold text-[#8B5CFF] uppercase tracking-wide mb-2">Premium</p>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-bold text-[#111315]">€59</span>
                    <span className="text-sm text-[#5B6472]">/month</span>
                  </div>
                  <ul className="space-y-3 flex-1">
                    {["Unlimited content updates", "Priority WhatsApp response", "Monthly performance check", "Seasonal banners and promotions", "New section additions", "Hosting and uptime monitoring", "Monthly backup"].map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[#111315]">
                        <CheckCircle2 size={15} className="text-[#8B5CFF] shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="/contact" className="btn-primary w-full justify-center mt-6">Choose Premium</a>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-spacing">
        <div className="container">
          <AnimateIn className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#111315] mb-4">Compare Plans</h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div className="overflow-x-auto rounded-2xl border border-[#E8EAF0] max-w-4xl mx-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E8EAF0]">
                    <th className="text-left py-4 px-4 font-semibold text-[#111315]">Feature</th>
                    <th className="py-4 px-4 font-semibold text-[#5B8CFF] text-center">Starter<br /><span className="font-normal text-xs text-[#5B6472]">€299</span></th>
                    <th className="py-4 px-4 font-semibold text-[#8B5CFF] text-center bg-[#8B5CFF]/[0.03]">Business<br /><span className="font-normal text-xs text-[#5B6472]">€399</span></th>
                    <th className="py-4 px-4 font-semibold text-[#6FE3FF] text-center">Premium<br /><span className="font-normal text-xs text-[#5B6472]">€699</span></th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"}>
                      <td className="py-3.5 px-4 text-[#111315] font-medium">{row.feature}</td>
                      <td className="py-3.5 px-4 text-center">
                        {typeof row.starter === "boolean" ? (
                          row.starter ? <CheckCircle2 size={18} className="text-[#5B8CFF] mx-auto" /> : <X size={18} className="text-[#D1D5DB] mx-auto" />
                        ) : (
                          <span className="text-sm text-[#5B6472]">{row.starter}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center bg-[#8B5CFF]/[0.03]">
                        {typeof row.business === "boolean" ? (
                          row.business ? <CheckCircle2 size={18} className="text-[#8B5CFF] mx-auto" /> : <X size={18} className="text-[#D1D5DB] mx-auto" />
                        ) : (
                          <span className="text-sm text-[#5B6472]">{row.business}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {typeof row.pro === "boolean" ? (
                          row.pro ? <CheckCircle2 size={18} className="text-[#6FE3FF] mx-auto" /> : <X size={18} className="text-[#D1D5DB] mx-auto" />
                        ) : (
                          <span className="text-sm text-[#5B6472]">{row.pro}</span>
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

      {/* FAQ Preview */}
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl">
          <AnimateIn className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#111315] mb-4">Common Questions</h2>
          </AnimateIn>
          <StaggerContainer className="space-y-4">
            {[
              { q: "Can I see a preview before paying?", a: "Yes. We always share a design preview for your approval before we proceed to development. You won't pay a penny until you're happy with the direction." },
              { q: "Can I upgrade my plan later?", a: "Absolutely. If you start with the Starter plan and later decide you need more pages or features, we can upgrade your site at any time. You only pay the difference." },
              { q: "Are there any hidden fees?", a: "No. The price you see is the price you pay. Hosting and domain costs are separate (typically €10-15/month) but we will explain everything upfront." },
              { q: "What is the maintenance bundle deal?", a: "If you sign up for any monthly maintenance plan at the same time as your website build, you get €50 off your build price. This is a one-time discount - your monthly plan continues at the regular rate afterwards. You can cancel the maintenance plan at any time with no penalty." },
              { q: "What if I need changes after launch?", a: "Small text changes are free for the first month. After that, our maintenance plans cover ongoing updates, or you can request individual changes at an agreed rate." },
              { q: "Do I own my website?", a: "Yes, 100%. Once paid, the website and all its content belong to you." },
              { q: "Is the consultation really free?", a: "Absolutely. We start with a no-pressure WhatsApp chat to understand your business and recommend the right package. No commitment required." },
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
            <p className="text-lg text-[#94A3B8] mb-8 max-w-xl mx-auto">Let's discuss which package is the best fit. Free consultation - no commitment, no pressure.</p>
            <a href="/contact" className="btn-primary">
              <MessageCircle size={18} /> Book a Free Consultation
            </a>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
