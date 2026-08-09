/* ============================================================
   D&M LABS - Process Page
   Brand: #5B8CFF→#6FE3FF→#8B5CFF gradient
   Design: Airy vertical timeline - no step numbers, large icons,
           generous breathing room between each stage
   ============================================================ */
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import AnimateIn from "@/components/AnimateIn";
import EditorialFitLine from "@/components/EditorialFitLine";
import { MessageCircle, Palette, Code, Rocket, ArrowRight, CheckCircle2, CreditCard } from "lucide-react";
import type { CSSProperties } from "react";

const TRIANGLE_GEO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/triangle-geometry-Rf9Cpg8ynqtbpdNzPsSccU.webp";
const WHATSAPP_URL = "https://wa.me/35797472847?text=Hi%20D%26M%20Labs!%20I%27d%20like%20to%20discuss%20a%20website%20project.";

const steps = [
  {
    step: "01",
    icon: MessageCircle,
    title: "Discovery Call",
    time: "~1 day",
    desc: "We start with a quick WhatsApp chat. Tell us about your business, what you need, and your goals. No technical jargon. Just a friendly conversation.",
    details: ["15 to 20 minute WhatsApp call", "We learn about your business", "You tell us what you need", "We recommend the best package"],
    color: "#5B8CFF",
  },
  {
    step: "02",
    icon: CreditCard,
    title: "Secure Your Spot",
    time: "Same day",
    desc: "Once we agree on the scope and price, you pay and we begin work immediately. Simple, transparent, no surprises.",
    details: ["Clear pricing - no hidden fees", "Pay once, own it forever", "Work begins immediately", "Secure payment options"],
    color: "#6FE3FF",
  },
  {
    step: "03",
    icon: Palette,
    title: "Design & Build",
    time: "3 to 7 days",
    desc: "We design and develop your website. You'll see progress along the way and can provide feedback at key milestones.",
    details: ["Custom design for your brand", "Mobile-first development", "Regular progress updates", "Your feedback shapes the result"],
    color: "#8B5CFF",
  },
  {
    step: "04",
    icon: Code,
    title: "Review & Revisions",
    time: "1 to 2 days",
    desc: "You review the website and request changes. We refine everything until you're completely happy with the result.",
    details: ["Full website preview", "Two Starter revisions, three Business revisions, five Premium revisions", "We adjust until you're satisfied", "No extra charges for included revisions"],
    color: "#5B8CFF",
  },
  {
    step: "05",
    icon: Rocket,
    title: "Launch",
    time: "~1 day",
    desc: "Your website goes live. We handle domain setup, hosting, and make sure everything works perfectly.",
    details: ["Domain connection", "SSL certificate setup", "Speed optimisation", "Your website is live!"],
    color: "#6FE3FF",
  },
];

export default function Process() {
  useSEO({
    title: "Our Process | How We Build Websites | DM-Labs.io",
    description: "From discovery call to launch in 5-14 days. See exactly how DM-Labs.io designs and builds your website, step by step.",
  });
  return (
    <div className="process-editorial">
      {/* Hero */}
      <section className="process-editorial-hero relative overflow-hidden">
        <div className="process-editorial-hero-geometry absolute top-10 left-10 w-[300px] h-[300px] opacity-[0.04] pointer-events-none">
          <img src={TRIANGLE_GEO} alt="" className="w-full h-full object-contain" aria-hidden="true" />
        </div>
        <div className="container relative z-10">
          <AnimateIn>
            <p className="process-editorial-label">How It Works</p>
            <h1 className="process-editorial-hero-heading" aria-label="From Idea to Launch">
              <EditorialFitLine className="process-editorial-fit-line" maxSizeRatio={0.15}>From Idea to</EditorialFitLine>
              <span className="process-editorial-hero-heading-emphasis"><em>Launch</em></span>
            </h1>
            <p className="process-editorial-lead">
              A simple, transparent process designed to get your website live as quickly as possible, without the stress.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Steps */}
      <section className="process-editorial-track section-spacing bg-white">
        <div className="container max-w-5xl">
          <AnimateIn className="process-editorial-track-intro">
            <p className="process-editorial-label">The Journey</p>
            <h2 className="process-editorial-section-heading">Five clear stages. <em>One focused outcome.</em></h2>
          </AnimateIn>
          <div className="relative">
            {/* Connector line remains behind every icon and is animated only when motion is allowed. */}
            <div
              className="process-editorial-rail absolute left-[35px] sm:left-[39px] top-[96px] sm:top-[104px] bottom-[96px] sm:bottom-[104px] w-[2px] pointer-events-none"
              style={{ zIndex: 1 }}
            />

            <div className="process-editorial-step-list space-y-0">
              {steps.map((step, i) => (
                <AnimateIn key={step.title} delay={i * 0.1} variant={i % 2 === 0 ? "fade-right" : "fade-left"}>
                  <article className="process-editorial-step relative flex gap-8 sm:gap-10" style={{ "--process-accent": step.color, paddingBottom: i < steps.length - 1 ? "clamp(3.5rem, 7vh, 6rem)" : 0 } as CSSProperties}>
                    {/* Icon box is above the connector line. */}
                    <div className="shrink-0 flex flex-col items-center" style={{ position: "relative", zIndex: 10 }}>
                      <div className="process-editorial-icon w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] rounded-2xl flex items-center justify-center" style={{ boxShadow: "0 0 0 4px white" }}>
                        <step.icon size={34} className="process-editorial-icon-svg" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="process-editorial-step-content flex-1 pt-3">
                      <div className="process-editorial-step-meta flex items-center gap-3 mb-3">
                        <span className="process-editorial-step-index">{step.step}</span>
                        <span className="process-editorial-step-time">{step.time}</span>
                      </div>
                      <h3 className="process-editorial-step-title">{step.title}</h3>
                      <p className="process-editorial-step-desc">{step.desc}</p>
                      <ul className="process-editorial-step-details grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {step.details.map((d) => (
                          <li key={d} className="flex items-start gap-2.5">
                            <CheckCircle2 size={16} className="process-editorial-detail-check shrink-0 mt-0.5" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="process-editorial-timeline section-spacing">
        <div className="container">
          <AnimateIn className="text-center mb-12">
            <p className="process-editorial-label">Pace With Purpose</p>
            <h2 className="process-editorial-section-heading process-editorial-section-heading-centered">Typical <em>Timeline</em></h2>
            <p className="process-editorial-timeline-lead">Most projects go from first message to live website in under two weeks.</p>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div className="process-editorial-timeline-grid grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { label: "Launch Website", time: "5 to 7 days", price: "from €299" },
                { label: "Business Website", time: "7 to 10 days", price: "from €749" },
                { label: "Premium Website", time: "10 to 14 days", price: "from €1,499" },
              ].map((item) => (
                <div key={item.label} className="process-editorial-timeline-card dm-card text-left !p-8">
                  <p className="process-editorial-timeline-time">{item.time}</p>
                  <p className="process-editorial-timeline-label">{item.label}</p>
                  <p className="process-editorial-timeline-price">{item.price}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="process-editorial-cta section-spacing dark-section text-center">
        <div className="container">
          <AnimateIn>
            <p className="process-editorial-label process-editorial-label-light">The Next Step</p>
            <h2 className="process-editorial-cta-heading">Ready to <em>Start</em> the Process?</h2>
            <p className="text-lg text-[#94A3B8] mb-8 max-w-xl mx-auto">
              The first step is a quick, no-pressure WhatsApp chat. Let's talk about your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact/" className="btn-primary">
                <MessageCircle size={18} /> Start the Conversation
              </a>
              <Link href="/pricing/" className="btn-secondary !border-white/20 !text-white hover:!border-white/40">
                View Pricing <ArrowRight size={16} />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
