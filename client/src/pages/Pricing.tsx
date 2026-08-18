/* ============================================================
   DM-Labs.io - Pricing Page
   Public website and maintenance packages.
   ============================================================ */
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import { ArrowRight, CheckCircle2, HelpCircle, MessageCircle, ShieldCheck, X } from "lucide-react";

const GRADIENT_BG = "/media/cloudfront/gradient-mesh-bg-nrkTNmAHHWeVJB3ubHRGDu.webp";
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
    price: "€69",
    colour: "#5B8CFF",
    features: [
      "Hosting monitoring",
      "Backups and bug fixing",
      "WhatsApp support",
      "Up to 3 small content updates each month",
    ],
  },
  {
    name: "Complete Care",
    price: "€129",
    colour: "#8B5CFF",
    recommended: true,
    features: [
      "Everything in Basic Care",
      "Unlimited reasonable updates",
      "Priority WhatsApp support",
      "Monthly performance check",
      "One simple banner or section update each month",
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
    title: "Web Design Pricing | Website Cost & Packages | DM-Labs.io",
    description: "How much does a website cost? Explore clear web design pricing, website packages, and custom project costs from DM-Labs.io.",
  });

  return (
    <div className="pricing-editorial">
      <section className="pricing-editorial-hero relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(4rem, 8vh, 6rem)" }}>
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <img src={GRADIENT_BG} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        <div className="container relative z-10 text-center">
          <AnimateIn>
            <p className="pricing-editorial-label">Transparent Pricing</p>
            <h1 className="pricing-editorial-hero-heading">Web Design <span><em>Pricing</em></span></h1>
            <p className="pricing-editorial-hero-lead">How much does a website cost? Compare clear packages and find the right starting point for your business.</p>
          </AnimateIn>
        </div>
      </section>

      <section className="pricing-editorial-assurance bg-[#EEF3FF] border-y border-[#5B8CFF]/20 py-4">
        <div className="container text-center">
          <p>Every project begins with a free consultation, so we can recommend the right scope before work begins.</p>
        </div>
      </section>

      <section className="pricing-editorial-plans section-spacing bg-white">
        <div className="container">
          <AnimateIn className="pricing-editorial-section-intro text-center">
            <p className="pricing-editorial-label">Choose Your Scope</p>
            <h2 className="pricing-editorial-section-heading">Three clear plans.</h2>
            <p>Every package is designed to give you a focused foundation without unnecessary complexity.</p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {buildPlans.map((plan, index) => {
              const accent = plan.tone === "blue" ? "#5B8CFF" : plan.tone === "violet" ? "#8B5CFF" : "#6B3FD4";
              const card = (
                <div className={`pricing-editorial-plan-card dm-card h-full flex flex-col relative${plan.recommended ? " pricing-editorial-plan-card--recommended" : ""}`}>
                  {plan.recommended && <span className="pricing-editorial-recommended">Recommended</span>}
                  <p className="pricing-editorial-plan-label" style={{ color: accent }}>{plan.name}</p>
                  <div className="pricing-editorial-price-row">
                    <span className="pricing-editorial-plan-price">{plan.price}</span>
                    <span className="pricing-editorial-price-unit">one-time</span>
                  </div>
                  <p className="pricing-editorial-plan-summary">{plan.summary}</p>
                  <ul className="pricing-editorial-feature-list flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-[#111315]">
                        <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: accent }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact/" className={`${plan.recommended ? "btn-primary" : "btn-secondary"} pricing-editorial-card-cta w-full justify-center`}><MessageCircle size={16} /> Get a Free Consultation</Link>
                </div>
              );
              return <AnimateIn delay={0.1 + index * 0.1} key={plan.name}>{card}</AnimateIn>;
            })}
          </div>

          <AnimateIn delay={0.45} className="mt-8 max-w-5xl mx-auto">
            <div className="pricing-editorial-custom-panel rounded-2xl overflow-hidden">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 p-8">
                <div className="flex-shrink-0 lg:w-72">
                  <span className="pricing-editorial-custom-kicker">Built for Your Scope</span>
                  <p className="pricing-editorial-plan-label">Enterprise / Custom</p>
                  <p className="pricing-editorial-custom-price">From €1,499</p>
                  <p className="pricing-editorial-custom-note">Quote based on scope</p>
                  <p className="pricing-editorial-custom-copy">For projects beyond the standard packages, including integrations, multilingual sites, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, and unusual content volume.</p>
                  <Link href="/contact/" className="pricing-editorial-custom-cta"><MessageCircle size={16} /> Request a Quote</Link>
                </div>
                <StaggerContainer className="pricing-editorial-custom-grid flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4" staggerDelay={0.09}>
                  {[
                    "Custom integrations and CRM or booking",
                    "Multilingual and CMS self-editing",
                    "AI or chatbot features",
                    "Complex motion and unusual content scope",
                  ].map((item) => (
                    <StaggerItem key={item} className="pricing-editorial-custom-feature flex items-start gap-2.5"><CheckCircle2 size={16} className="shrink-0 mt-0.5" /><span>{item}</span></StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section id="maintenance" className="pricing-editorial-care section-spacing bg-white">
        <div className="container max-w-4xl">
          <AnimateIn className="pricing-editorial-section-intro text-center">
            <p className="pricing-editorial-label">Keep It Healthy</p>
            <h2 className="pricing-editorial-section-heading">Website Care <em>Plans</em></h2>
            <p>Ongoing care for businesses that want their website monitored, updated, and supported after launch.</p>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {carePlans.map((plan, index) => {
              const card = (
                <div className={`pricing-editorial-care-card dm-card h-full flex flex-col relative${plan.recommended ? " pricing-editorial-plan-card--recommended" : ""}`}>
                  {plan.recommended && <span className="pricing-editorial-recommended">Most Complete</span>}
                  <p className="pricing-editorial-plan-label" style={{ color: plan.colour }}>{plan.name}</p>
                  <div className="pricing-editorial-price-row"><span className="pricing-editorial-care-price">{plan.price}</span><span className="pricing-editorial-price-unit">per month</span></div>
                  <ul className="pricing-editorial-feature-list flex-1">
                    {plan.features.map((feature) => <li key={feature} className="flex items-start gap-2.5 text-sm text-[#111315]"><CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: plan.colour }} />{feature}</li>)}
                  </ul>
                  <Link href="/contact/" className={`${plan.recommended ? "btn-primary" : "btn-secondary"} pricing-editorial-card-cta w-full justify-center`}>Ask About {plan.name}</Link>
                </div>
              );
              return <AnimateIn delay={0.1 + index * 0.1} key={plan.name}>{card}</AnimateIn>;
            })}
          </div>
          <AnimateIn delay={0.35} className="mt-8 max-w-2xl mx-auto">
            <div className="pricing-editorial-scope-guardrail flex items-start gap-3 rounded-xl px-5 py-4">
              <ShieldCheck size={19} className="text-[#5B8CFF] shrink-0 mt-0.5" />
              <p className="text-sm text-[#111315]"><span className="font-semibold">Scope guardrail:</span> New pages, copywriting, extra revision rounds beyond your package allowance, new integrations, redesigns, advanced or full SEO structure, and complex content migration are not included in either maintenance plan and are quoted separately.</p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="pricing-editorial-compare section-spacing">
        <div className="container">
          <AnimateIn className="pricing-editorial-section-intro text-center"><p className="pricing-editorial-label">The Details</p><h2 className="pricing-editorial-section-heading">Compare Website <em>Packages</em></h2></AnimateIn>
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

      <section className="pricing-editorial-questions section-spacing bg-white">
        <div className="container max-w-3xl">
          <AnimateIn className="pricing-editorial-section-intro text-center"><p className="pricing-editorial-label">Good to Know</p><h2 className="pricing-editorial-section-heading">Common <em>Questions</em></h2></AnimateIn>
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

      <section className="pricing-editorial-cta-section section-spacing">
        <div className="container max-w-3xl text-center">
          <AnimateIn>
            <h2 className="pricing-editorial-cta-heading">Not sure which <em>package</em> fits?</h2>
            <p>Tell us what your business needs and we will recommend the right starting scope.</p>
            <div className="pricing-editorial-cta-actions flex flex-col sm:flex-row gap-4 justify-center"><Link href="/contact/" className="btn-primary"><MessageCircle size={18} /> Book Free Consultation</Link><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">WhatsApp Us <ArrowRight size={16} /></a></div>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
