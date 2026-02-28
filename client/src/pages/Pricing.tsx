/* D&M Studio — Pricing Page
   Transparent pricing, friendly tone, price anchor on Business Website
   No pressure, no hidden costs, reassurance throughout */

import { Link } from "wouter";
import { Check, ArrowRight, Shield, Clock, RefreshCw } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/972584928188";

const plans = [
  {
    name: "Starter Website",
    price: "€250",
    tagline: "Perfect for small businesses starting online",
    desc: "A professional single-page website. Everything your customers need to find you and get in touch.",
    delivery: "5–7 working days",
    features: [
      "Single landing page website",
      "Mobile-optimized design",
      "Contact form setup",
      "WhatsApp button integration",
      "Basic SEO structure",
      "Secure hosting ready",
      "Up to 2 revision rounds",
    ],
    maintenance: { label: "Optional maintenance", price: "€15/month" },
    highlight: false,
    cta: "Get Started",
  },
  {
    name: "Business Website",
    price: "€350",
    tagline: "Best for businesses ready to grow",
    desc: "A complete multi-page website. Up to 5 pages covering everything your business needs to build trust and attract customers.",
    delivery: "7–10 working days",
    features: [
      "Up to 5 separate pages",
      "Mobile + speed optimized",
      "Contact form with notifications",
      "WhatsApp button integration",
      "Google-ready SEO setup",
      "Secure hosting ready",
      "Up to 2 revision rounds",
      "Domain connection assistance",
    ],
    maintenance: { label: "Optional maintenance", price: "€25/month" },
    highlight: true,
    cta: "Get Started",
  },
];

const guarantees = [
  { icon: Shield, title: "No long contracts", desc: "Pay per project. No monthly commitments unless you choose maintenance." },
  { icon: Clock, title: "Clear timelines", desc: "We tell you exactly how long your website will take before we start." },
  { icon: RefreshCw, title: "Revisions included", desc: "Up to 2 revision rounds are included in every package." },
];

export default function Pricing() {
  return (
    <div>
      {/* Hero */}
      <section className="section bg-background pt-24 lg:pt-32">
        <div className="container">
          <div className="max-w-2xl">
            <span className="section-label">Pricing</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.02em" }}>
              Simple pricing.<br />No surprises.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Everything you need to get started online. Two clear options. No hidden fees. No confusing add-ons.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mb-10">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 border card-lift ${
                  plan.highlight
                    ? "pricing-highlight bg-white shadow-xl"
                    : "border-border bg-background shadow-sm"
                }`}
              >
                {plan.highlight && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold mb-5">
                    Best Value
                  </div>
                )}

                <h2 className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{plan.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{plan.tagline}</p>

                <div className="mb-5">
                  <span className="text-5xl font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{plan.price}</span>
                  <span className="text-muted-foreground text-sm ml-2">one-time</span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{plan.desc}</p>

                <ul className="space-y-2.5 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                      <Check size={14} className="text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
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
                    <span className="text-lg font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{plan.maintenance.price}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock size={12} aria-hidden="true" />
                    <span>Delivery: {plan.delivery} after materials received</span>
                  </div>
                </div>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold text-base transition-all duration-200 ${
                    plan.highlight
                      ? "bg-primary text-white hover:bg-[oklch(0.52_0.19_264)] shadow-md hover:shadow-lg"
                      : "border-2 border-foreground/20 text-foreground hover:border-primary hover:text-primary"
                  }`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "52px" }}
                >
                  {plan.cta} — {plan.price}
                </a>
                <p className="text-center text-xs text-muted-foreground mt-3">No obligation consultation</p>
              </div>
            ))}
          </div>

          {/* Payment info */}
          <div className="max-w-3xl p-6 rounded-2xl bg-accent/30 border border-accent">
            <h3 className="font-semibold text-foreground mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>How payment works</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We split the payment in two. You pay 50% before we start, and the remaining 50% before we launch your website. This way, you only pay the second half when you're happy with the result.
            </p>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="section bg-background">
        <div className="container">
          <div className="max-w-xl mb-10">
            <span className="section-label">Our Promise</span>
            <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              What you can always expect
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 max-w-3xl">
            {guarantees.map((g) => (
              <div key={g.title} className="bg-white rounded-2xl p-6 border border-border">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-4">
                  <g.icon size={20} className="text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-foreground mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{g.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl">
            <span className="section-label">Compare</span>
            <h2 className="text-3xl font-bold text-foreground mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Which option is right for you?
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-6 font-semibold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Feature</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Starter<br /><span className="text-primary font-bold">€250</span></th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Business<br /><span className="text-primary font-bold">€350</span></th>
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
                    <tr key={feature} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 pr-6 text-foreground">{feature}</td>
                      <td className="py-3 px-4 text-center text-muted-foreground">{starter}</td>
                      <td className="py-3 px-4 text-center text-muted-foreground font-medium">{business}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-foreground">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Not sure which plan to choose?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
            Send us a message. We'll help you decide based on your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] text-white font-semibold text-base hover:bg-[#1ebe5d] transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Read FAQ <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
