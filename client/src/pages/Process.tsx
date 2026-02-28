/* ============================================================
   D&M LABS — Process Page
   Brand: #5B8CFF→#6FE3FF→#8B5CFF gradient
   ============================================================ */
import { Link } from "wouter";
import AnimateIn from "@/components/AnimateIn";
import { MessageCircle, Palette, Code, Rocket, ArrowRight, CheckCircle2, CreditCard } from "lucide-react";

const TRIANGLE_GEO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/triangle-geometry-Rf9Cpg8ynqtbpdNzPsSccU.webp";
const WHATSAPP_URL = "https://wa.me/972584928177?text=Hi%20D%26M%20Labs!%20I%27d%20like%20to%20discuss%20a%20website%20project.";

const steps = [
  { icon: MessageCircle, step: "01", title: "Discovery Call", desc: "We start with a quick WhatsApp chat. Tell us about your business, what you need, and your goals. No technical jargon — just a friendly conversation.", details: ["15–20 minute WhatsApp call", "We learn about your business", "You tell us what you need", "We recommend the best package"], color: "#5B8CFF" },
  { icon: CreditCard, step: "02", title: "50% Deposit", desc: "Once we agree on the scope and price, you pay 50% upfront. This secures your spot and we begin work immediately.", details: ["Clear pricing — no surprises", "50% upfront, 50% on delivery", "Work begins immediately", "Secure payment options"], color: "#6FE3FF" },
  { icon: Palette, step: "03", title: "Design & Build", desc: "We design and develop your website. You'll see progress along the way and can provide feedback at key milestones.", details: ["Custom design for your brand", "Mobile-first development", "Regular progress updates", "Your feedback shapes the result"], color: "#8B5CFF" },
  { icon: Code, step: "04", title: "Review & Revisions", desc: "You review the website and request changes. We refine everything until you're completely happy with the result.", details: ["Full website preview", "1–2 rounds of revisions included", "We adjust until you're satisfied", "No extra charges for included revisions"], color: "#5B8CFF" },
  { icon: Rocket, step: "05", title: "Launch", desc: "Final 50% payment, and your website goes live. We handle domain setup, hosting, and make sure everything works perfectly.", details: ["Domain connection", "SSL certificate setup", "Speed optimization", "Your website is live!"], color: "#6FE3FF" },
];

export default function Process() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(4rem, 8vh, 6rem)" }}>
        <div className="absolute top-10 left-10 w-[300px] h-[300px] opacity-[0.04] animate-float-slower pointer-events-none">
          <img src={TRIANGLE_GEO} alt="" className="w-full h-full object-contain" aria-hidden="true" />
        </div>
        <div className="container relative z-10 text-center">
          <AnimateIn>
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">How It Works</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5">From Idea to <span className="brand-gradient-text">Launch</span></h1>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto">A simple, transparent process designed to get your website live as quickly as possible — without the stress.</p>
          </AnimateIn>
        </div>
      </section>

      {/* Steps */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl">
          <div className="space-y-0">
            {steps.map((step, i) => (
              <AnimateIn key={step.step} delay={i * 0.1}>
                <div className="relative flex gap-6 sm:gap-8 pb-12 last:pb-0">
                  {i < steps.length - 1 && (
                    <div className="absolute left-[27px] sm:left-[31px] top-16 bottom-0 w-[2px]" style={{ background: `linear-gradient(to bottom, ${step.color}, ${steps[i + 1].color})` }} />
                  )}
                  <div className="relative z-10 shrink-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center" style={{ background: `${step.color}14` }}>
                      <step.icon size={26} style={{ color: step.color }} strokeWidth={1.75} />
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold brand-gradient-text">{step.step}</span>
                      <h3 className="text-xl font-semibold text-[#111315]">{step.title}</h3>
                    </div>
                    <p className="text-sm text-[#5B6472] leading-relaxed mb-4">{step.desc}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {step.details.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-[#111315]">
                          <CheckCircle2 size={14} style={{ color: step.color }} className="shrink-0 mt-0.5" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-spacing">
        <div className="container">
          <AnimateIn className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111315] mb-4">Typical Timeline</h2>
            <p className="text-lg text-[#5B6472]">Most projects go from first message to live website in under two weeks.</p>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { label: "Starter Website", time: "5–7 days", price: "€250" },
                { label: "Business Website", time: "7–10 days", price: "€350" },
                { label: "Revisions", time: "1–2 days", price: "Included" },
              ].map((item) => (
                <div key={item.label} className="dm-card text-center !p-6">
                  <p className="text-2xl font-bold brand-gradient-text mb-1">{item.time}</p>
                  <p className="text-sm font-semibold text-[#111315] mb-1">{item.label}</p>
                  <p className="text-xs text-[#5B6472]">{item.price}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing dark-section text-center">
        <div className="container">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Ready to Start the Process?</h2>
            <p className="text-lg text-[#94A3B8] mb-8 max-w-xl mx-auto">The first step is a quick, no-pressure WhatsApp chat. Let's talk about your business.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary"><MessageCircle size={18} /> Start the Conversation</a>
              <Link href="/pricing" className="btn-secondary !border-white/20 !text-white hover:!border-white/40">View Pricing <ArrowRight size={16} /></Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
