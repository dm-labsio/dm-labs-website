/* D&M Studio — Pricing Page
   Transparent pricing, friendly tone, price anchor on Business Website
   No pressure, no hidden costs, reassurance throughout */

import { Link } from "wouter";
import { motion } from "framer-motion";
import { Check, ArrowRight, Shield, Clock, RefreshCw, Star } from "lucide-react";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";

const WHATSAPP_URL = "https://wa.me/972584928177";

const plans = [
  {
    name: "Starter Website", price: "€250", tagline: "Perfect for small businesses starting online",
    desc: "A professional single-page website. Everything your customers need to find you and get in touch.",
    delivery: "5–7 working days",
    features: ["Single landing page website", "Mobile-optimized design", "Contact form setup", "WhatsApp button integration", "Basic SEO structure", "Secure hosting ready", "Up to 2 revision rounds"],
    maintenance: { label: "Optional maintenance", price: "€15/month" },
    highlight: false, cta: "Get Started",
  },
  {
    name: "Business Website", price: "€350", tagline: "Best for businesses ready to grow",
    desc: "A complete multi-page website. Up to 5 pages covering everything your business needs to build trust and attract customers.",
    delivery: "7–10 working days",
    features: ["Up to 5 separate pages", "Mobile + speed optimized", "Contact form with notifications", "WhatsApp button integration", "Google-ready SEO setup", "Secure hosting ready", "Up to 2 revision rounds", "Domain connection assistance"],
    maintenance: { label: "Optional maintenance", price: "€25/month" },
    highlight: true, cta: "Get Started",
  },
];

const guarantees = [
  { icon: Shield, title: "No long contracts", desc: "Pay per project. No monthly commitments unless you choose maintenance." },
  { icon: Clock, title: "Clear timelines", desc: "We tell you exactly how long your website will take before we start." },
  { icon: RefreshCw, title: "Revisions included", desc: "Up to 2 revision rounds are included in every package." },
];

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function Pricing() {
  return (
    <div>
      {/* Hero */}
      <section className="section bg-background pt-24 lg:pt-32">
        <div className="container">
          <AnimateIn className="max-w-2xl">
            <span className="section-label">Pricing</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-5" style={{ letterSpacing: "-0.02em" }}>
              Simple pricing.<br />No surprises.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Everything you need to get started online. Two clear options. No hidden fees. No confusing add-ons.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mb-10">
            {plans.map((plan, i) => (
              <AnimateIn key={plan.name} delay={i * 0.15}>
                <motion.div
                  className={`rounded-2xl p-8 border h-full ${
                    plan.highlight
                      ? "pricing-highlight bg-white shadow-xl relative"
                      : "border-border bg-background shadow-sm"
                  }`}
                  whileHover={{ y: -4, boxShadow: "0 16px 48px oklch(0.18 0.01 260 / 0.1)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold shadow-md">
                        <Star size={11} fill="currentColor" aria-hidden="true" />
                        Best Value
                      </span>
                    </div>
                  )}

                  <h2 className="text-2xl font-bold text-foreground mb-1">{plan.name}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{plan.tagline}</p>

                  <div className="mb-5">
                    <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground text-sm ml-2">one-time</span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{plan.desc}</p>

                  <ul className="space-y-2.5 mb-7">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                        <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={12} className="text-primary" aria-hidden="true" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="p-4 rounded-xl bg-muted/50 mb-7">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{plan.maintenance.label}</p>
                        <p className="text-sm text-foreground mt-0.5">Updates, security &amp; support</p>
                      </div>
                      <span className="text-lg font-bold text-foreground">{plan.maintenance.price}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock size={12} aria-hidden="true" />
                      <span>Delivery: {plan.delivery} after materials received</span>
                    </div>
                  </div>

                  <motion.a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold text-base transition-all duration-200 ${
                      plan.highlight
                        ? "bg-primary text-white shadow-md"
                        : "border-2 border-foreground/15 text-foreground hover:border-primary hover:text-primary"
                    }`}
                    style={{ minHeight: "52px" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {plan.cta} — {plan.price}
                  </motion.a>
                  <p className="text-center text-xs text-muted-foreground mt-3">No obligation consultation</p>
                </motion.div>
              </AnimateIn>
            ))}
          </div>

          {/* Payment info */}
          <AnimateIn delay={0.3} className="max-w-3xl p-6 rounded-2xl bg-accent/30 border border-accent">
            <h3 className="font-semibold text-foreground mb-2">How payment works</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We split the payment in two. You pay 50% before we start, and the remaining 50% before we launch your website. This way, you only pay the second half when you're happy with the result.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Guarantees */}
      <section className="section bg-background">
        <div className="container">
          <AnimateIn className="max-w-xl mb-10">
            <span className="section-label">Our Promise</span>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What you can always expect
            </h2>
          </AnimateIn>

          <StaggerContainer className="grid sm:grid-cols-3 gap-5 max-w-3xl" staggerDelay={0.1}>
            {guarantees.map((g) => (
              <StaggerItem key={g.title}>
                <motion.div
                  className="bg-white rounded-2xl p-6 border border-border h-full"
                  whileHover={{ y: -3, boxShadow: "0 8px 30px oklch(0.18 0.01 260 / 0.06)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center mb-4">
                    <g.icon size={20} className="text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{g.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{g.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Comparison table */}
      <section className="section bg-white">
        <div className="container">
          <AnimateIn className="max-w-3xl">
            <span className="section-label">Compare</span>
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Which option is right for you?
            </h2>

            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left py-4 px-6 font-semibold text-foreground">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-foreground">Starter<br /><span className="text-primary font-bold">€250</span></th>
                    <th className="text-center py-4 px-4 font-semibold text-foreground bg-accent/30">Business<br /><span className="text-primary font-bold">€350</span></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Number of pages", "1 page", "Up to 5 pages"],
                    ["Mobile optimized", "✓", "✓"],
                    ["WhatsApp integration", "✓", "✓"],
                    ["Contact form", "✓", "✓"],
                    ["SEO setup", "Basic", "Full"],
                    ["Speed optimization", "Standard", "Advanced"],
                    ["Delivery time", "5–7 days", "7–10 days"],
                    ["Revision rounds", "2 rounds", "2 rounds"],
                    ["Domain assistance", "—", "✓"],
                    ["Optional maintenance", "€15/mo", "€25/mo"],
                  ].map(([feature, starter, business]) => (
                    <tr key={feature} className="border-t border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-3.5 px-6 text-foreground">{feature}</td>
                      <td className="py-3.5 px-4 text-center text-muted-foreground">{starter}</td>
                      <td className="py-3.5 px-4 text-center text-foreground font-medium bg-accent/10">{business}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-foreground">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, oklch(0.58 0.19 264) 0%, transparent 50%)" }} aria-hidden="true" />
        <div className="container relative z-10 text-center">
          <AnimateIn>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Not sure which plan to choose?
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
              Send us a message. We'll help you decide based on your business needs.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] text-white font-semibold text-base shadow-xl"
                whileHover={{ scale: 1.04, boxShadow: "0 16px 48px rgba(37, 211, 102, 0.3)" }}
                whileTap={{ scale: 0.97 }}
              >
                <WhatsAppIcon />
                Chat on WhatsApp
              </motion.a>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/faq"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-colors"
                >
                  Read FAQ <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </motion.div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
