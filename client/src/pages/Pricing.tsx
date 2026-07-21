/* ============================================================
   DM-Labs.io - Pricing Page
   Public website and maintenance packages.
   ============================================================ */
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import { ArrowRight, CheckCircle2, HelpCircle, MessageCircle, ShieldCheck, X } from "lucide-react";

const GRADIENT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/gradient-mesh-bg-nrkTNmAHHWeVJB3ubHRGDu.webp";
const WHATSAPP_URL = "https://wa.me/35797472847?text=Hi%20DM-Labs.io!%20I%27d%20like%20to%20discuss%20a%20website%20project.";

type PlanValue = boolean | string;

const buildPlans = [
  {
    name: "Launch Website",
    price: "€299",
    tone: "blue",
    summary: "A lean online presence for a new business that needs to launch clearly and professionally.",
    features: [
      "Small one-page or light two-page site",
      "Responsive build",
      "Basic SEO foundations",
      "WhatsApp and social links",
      "2 revision rounds",
    ],
  },
  {
    name: "Growth Website",
    price: "€749",
    tone: "violet",
    recommended: true,
    summary: "A conversion-focused site for a business ready to be found, trusted, and contacted online.",
    features: [
      "Up to 4 pages",
      "Contact form",
      "Google Maps and reviews/testimonials",
      "Basic SEO",
      "Search Console and Analytics setup",
      "3 revision rounds",
    ],
  },
  {
    name: "Pro Website",
    price: "€1,499",
    tone: "purple",
    summary: "A more complete digital presence with richer content, motion, and stronger search foundations.",
    features: [
      "Up to 7 pages",
      "Gallery or portfolio",
      "Pop-up and scroll-driven animations",
      "Full SEO structure",
      "Blog setup or a website visual pack",
      "4 revision rounds",
    ],
  },
];

const comparison: Array<{ feature: string; launch: PlanValue; growth: PlanValue; pro: PlanValue }> = [
  { feature: "Pages", launch: "1 or light 2", growth: "Up to 4", pro: "Up to 7" },
  { feature: "Responsive build", launch: true, growth: true, pro: true },
  { feature: "WhatsApp and social links", launch: true, growth: true, pro: true },
  { feature: "Basic SEO foundations", launch: true, growth: true, pro: true },
  { feature: "Contact form", launch: false, growth: true, pro: true },
  { feature: "Google Maps", launch: false, growth: true, pro: true },
  { feature: "Reviews or testimonials section", launch: false, growth: true, pro: true },
  { feature: "Search Console and Analytics setup", launch: false, growth: true, pro: true },
  { feature: "Gallery or portfolio", launch: false, growth: false, pro: true },
  { feature: "Pop-up and scroll-driven animations", launch: false, growth: false, pro: true },
  { feature: "Full SEO structure", launch: false, growth: false, pro: true },
  { feature: "Blog setup or visual pack", launch: false, growth: false, pro: true },
  { feature: "Revision rounds", launch: "2", growth: "3", pro: "4" },
];

const carePlans = [
  {
    name: "Basic Care",
    price: "€49",
    colour: "#5B8CFF",
    features: [
      "Hosting monitoring",
      "Backups and bug fixing",
      "WhatsApp support",
      "Up to 5 small content updates each month",
      "Cancel anytime, no contract",
    ],
  },
  {
    name: "Complete Care",
    price: "€129",
    colour: "#8B5CFF",
    recommended: true,
    features: [
      "Everything in Basic Care",
      "Ongoing content updates",
      "Priority WhatsApp support",
      "Monthly performance check",
      "One simple banner or section update each month",
      "Cancel anytime, no contract",
    ],
  },
];

function PlanCell({ value, colour }: { value: PlanValue; colour: string }) {
  if (typeof value === "boolean") {
    return value ? <CheckCircle2 size={18} className="mx-auto" style={{ color: colour }} /> : <X size={18} className="text-[#D1D5DB] mx-auto" />;
  }
  return <span className="text-sm text-[#5B6472]">{value}</span>;
}

export default function Pricing() {
  useSEO({
    title: "Website Pricing Cyprus | DM-Labs.io",
    description: "Website packages for Cyprus businesses: Launch from €299, Growth €749, Pro €1,499, and custom scope from €1,499. Clear scope, no hidden fees.",
  });

  return (
    <>
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(4rem, 8vh, 6rem)" }}>
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <img src={GRADIENT_BG} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        <div className="container relative z-10 text-center">
          <AnimateIn>
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Transparent Pricing</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5">Website Pricing for <span className="brand-gradient-text">Cyprus Businesses</span></h1>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto">Clear scope, clear pricing, and a free consultation before you commit. Choose the right starting point for your business.</p>
          </AnimateIn>
        </div>
      </section>

      <section className="bg-[#EEF3FF] border-y border-[#5B8CFF]/20 py-4">
        <div className="container text-center">
          <p className="text-sm font-semibold text-[#111315]">Packages from €299. Every project starts with a free consultation, so we can recommend the right scope before work begins.</p>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {buildPlans.map((plan, index) => {
              const accent = plan.tone === "blue" ? "#5B8CFF" : plan.tone === "violet" ? "#8B5CFF" : "#6B3FD4";
              const card = (
                <div className="dm-card h-full flex flex-col !shadow-none relative">
                  {plan.recommended && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full brand-gradient text-white text-xs font-semibold whitespace-nowrap">Recommended</span>}
                  <p className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: accent }}>{plan.name}</p>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-bold text-[#111315]">{plan.price}</span>
                    <span className="text-sm text-[#5B6472]">one-time</span>
                  </div>
                  <p className="text-sm text-[#5B6472] mb-6">{plan.summary}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-[#111315]">
                        <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: accent }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className={plan.recommended ? "btn-primary w-full justify-center" : "btn-secondary w-full justify-center"}><MessageCircle size={16} /> Get a Free Consultation</Link>
                </div>
              );
              return <AnimateIn delay={0.1 + index * 0.1} key={plan.name}>{plan.recommended ? <div className="brand-gradient-border h-full">{card}</div> : card}</AnimateIn>;
            })}
          </div>

          <AnimateIn delay={0.45} className="mt-8 max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1117 0%, #161b2e 50%, #0d1117 100%)", border: "1px solid rgba(91,140,255,0.2)" }}>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 p-8">
                <div className="flex-shrink-0 lg:w-72">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "linear-gradient(90deg, #5B8CFF, #8B5CFF)", color: "#fff" }}>Built for Your Scope</span>
                  <p className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: "#6FE3FF" }}>Enterprise / Custom</p>
                  <p className="text-4xl font-bold text-white mb-1">From €1,499</p>
                  <p className="text-xs font-medium mb-4" style={{ color: "#5B8CFF" }}>Quote based on scope</p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>For projects beyond the standard packages, including integrations, multilingual sites, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, and unusual content volume.</p>
                  <Link href="/contact" className="mt-6 inline-flex items-center justify-center gap-2 py-3 px-8 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90" style={{ background: "linear-gradient(90deg, #5B8CFF, #8B5CFF)" }}><MessageCircle size={16} /> Request a Quote</Link>
                </div>
                <div className="hidden lg:block w-px self-stretch" style={{ background: "rgba(91,140,255,0.2)" }} />
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {[
                    "Custom integrations and CRM or booking",
                    "Multilingual and CMS self-editing",
                    "AI or chatbot features",
                    "Complex motion and unusual content scope",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5"><CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: "#6FE3FF" }} /><span className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{item}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section id="maintenance" className="section-spacing bg-white">
        <div className="container max-w-4xl">
          <AnimateIn className="text-center mb-10">
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Keep It Healthy</p>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">Monthly Website Care</h2>
            <p className="text-[#5B6472] max-w-xl mx-auto">Ongoing care for businesses that want their website monitored, updated, and supported after launch.</p>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {carePlans.map((plan, index) => {
              const card = (
                <div className="dm-card h-full flex flex-col !shadow-none relative">
                  {plan.recommended && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full brand-gradient text-white text-xs font-semibold whitespace-nowrap">Most Complete</span>}
                  <p className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: plan.colour }}>{plan.name}</p>
                  <div className="flex items-baseline gap-1 mb-4"><span className="text-3xl font-bold text-[#111315]">{plan.price}</span><span className="text-sm text-[#5B6472]">/month</span></div>
                  <ul className="space-y-3 flex-1">
                    {plan.features.map((feature) => <li key={feature} className="flex items-start gap-2.5 text-sm text-[#111315]"><CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: plan.colour }} />{feature}</li>)}
                  </ul>
                  <Link href="/contact" className={plan.recommended ? "btn-primary w-full justify-center mt-6" : "btn-secondary w-full justify-center mt-6"}>Ask About {plan.name}</Link>
                </div>
              );
              return <AnimateIn delay={0.1 + index * 0.1} key={plan.name}>{plan.recommended ? <div className="brand-gradient-border h-full">{card}</div> : card}</AnimateIn>;
            })}
          </div>
          <AnimateIn delay={0.35} className="mt-8 max-w-2xl mx-auto">
            <div className="flex items-start gap-3 bg-[#EEF3FF] border border-[#5B8CFF]/20 rounded-xl px-5 py-4">
              <ShieldCheck size={19} className="text-[#5B8CFF] shrink-0 mt-0.5" />
              <p className="text-sm text-[#111315]"><span className="font-semibold">Scope guardrail:</span> New pages, copywriting, extra revision rounds beyond your package allowance, new integrations, redesigns, advanced or full SEO structure, and complex content migration are not included in either maintenance plan and are quoted separately.</p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container">
          <AnimateIn className="text-center mb-12"><h2 className="text-3xl font-bold text-[#111315] mb-4">Compare Website Packages</h2></AnimateIn>
          <AnimateIn delay={0.1}>
            <div className="overflow-x-auto rounded-2xl border border-[#E8EAF0] max-w-4xl mx-auto">
              <table className="text-sm" style={{ minWidth: "560px", width: "100%" }}>
                <thead><tr className="border-b border-[#E8EAF0]"><th className="text-left py-4 px-4 font-semibold text-[#111315]">Feature</th><th className="py-4 px-4 font-semibold text-[#5B8CFF] text-center">Launch<br /><span className="font-normal text-xs text-[#5B6472]">€299</span></th><th className="py-4 px-4 font-semibold text-[#8B5CFF] text-center bg-[#8B5CFF]/[0.03]">Growth<br /><span className="font-normal text-xs text-[#5B6472]">€749</span></th><th className="py-4 px-4 font-semibold text-center" style={{ color: "#6B3FD4" }}>Pro<br /><span className="font-normal text-xs text-[#5B6472]">€1,499</span></th></tr></thead>
                <tbody>{comparison.map((row, index) => <tr key={row.feature} className={index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"}><td className="py-3.5 px-4 text-[#111315] font-medium">{row.feature}</td><td className="py-3.5 px-4 text-center"><PlanCell value={row.launch} colour="#5B8CFF" /></td><td className="py-3.5 px-4 text-center bg-[#8B5CFF]/[0.03]"><PlanCell value={row.growth} colour="#8B5CFF" /></td><td className="py-3.5 px-4 text-center"><PlanCell value={row.pro} colour="#6B3FD4" /></td></tr>)}</tbody>
              </table>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="container max-w-3xl">
          <AnimateIn className="text-center mb-12"><h2 className="text-3xl font-bold text-[#111315] mb-4">Common Questions</h2></AnimateIn>
          <StaggerContainer className="space-y-4">
            {[
              { q: "Can I see a preview before paying?", a: "Yes. We share a design direction for your approval before development proceeds." },
              { q: "Can I upgrade later?", a: "Yes. We can quote the additional scope if you need more pages, features, or a larger package after launch." },
              { q: "Are there hidden fees?", a: "No. We agree the scope and price before work begins. Domain and third-party service costs, where relevant, are explained separately." },
              { q: "What is not included in maintenance?", a: "New pages, copywriting, extra revision rounds, new integrations, redesigns, advanced SEO work, and complex content migration are quoted separately." },
              { q: "Do I own my website?", a: "Yes. Once paid, the website and its content belong to you." },
              { q: "When is a project Enterprise / Custom?", a: "Enterprise / Custom is for work beyond the standard package scope, such as integrations, multilingual content, CMS self-editing, AI features, complex motion, CRM or booking, or unusual content volume." },
            ].map((item) => <StaggerItem key={item.q}><div className="dm-card !p-6"><div className="flex items-start gap-3"><HelpCircle size={20} className="text-[#5B8CFF] shrink-0 mt-0.5" /><div><h3 className="text-base font-semibold text-[#111315] mb-2">{item.q}</h3><p className="text-sm text-[#5B6472] leading-relaxed">{item.a}</p></div></div></div></StaggerItem>)}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container max-w-3xl text-center">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111315] mb-5">Not sure which package fits?</h2>
            <p className="text-lg text-[#5B6472] mb-8">Tell us what your business needs and we will recommend the right starting scope.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center"><Link href="/contact" className="btn-primary"><MessageCircle size={18} /> Book Free Consultation</Link><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">WhatsApp Us <ArrowRight size={16} /></a></div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
