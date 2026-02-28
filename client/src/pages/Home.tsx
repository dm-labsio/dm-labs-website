/* D&M Studio — Homepage
   Sections: Hero, Trust Signals, How It Works, Services Overview,
             Pricing Preview, Business Types, Visual Proof, Final CTA
   Design: Confident Minimal | Left-anchored | Mobile-first */

import { Link } from "wouter";
import { Check, ArrowRight, MessageCircle, Palette, Code2, Rocket, Star, Utensils, Scissors, Building2, Stethoscope, Briefcase, Car } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/972584928188";

const HERO_MOCKUP = "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/RAfMmBIXolRvmQlX.png?Expires=1803815430&Signature=eQK7k6JZTkCqcHw8ByKOxFmkoeGR1FLc5WhtPz9wzTgCV-sjopE6bR8T6lDYhhGnxijc--ceCCDPAloE5jIUPo27jsf0OiI9swdEQyPr7rZL6Yl18F1TfrLxhWggw-5agg0lMNepsEnwg~1zL16ZjI7PCeUX4hAMK9oy4Z0mJZRLGHepudz04RmUB0XdoVs6z1gS2MG5YTVryQABV0Pg9H1MvFhCOfFLfrFQnW1A~-higS5LGC0lVBVIOJwjynEG31JJpxbmViDzsbmLIxffJpbwaTcSdxX3kQKydTxMBzDNiZlczLr-KrmeQAAj3c5Eo8GBIMv9VP0kZ5b6f3U0hw__&Key-Pair-Id=K2HSFNDJXOU9YS";
const HERO_BG = "";
const PREVIEW_CARDS = "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/OiNCEkFpXDLcTnMU.png?Expires=1803815435&Signature=dJs2BM04dH4HTdApwPprphYEBToFGGQ9o3sFIkNdOIDWHSvFUBxYfvsPuClUsilRJoJM5Lxqk8cGKuIz51-3MtH5zGboXr3nKAdhFKXZBn1pXUpIHs79WYkgHJ2zDaeR6OnNtXLquni7fBj7bQi6YMjey~TpiFK1V~Mhm2POHDJ8JJTkSeyp34OHrEvFmSLtPOyeZP~NL7iAQk24toQS8Sp7M7oa6dbUORny-MOKSJKwHZWQ47vFWk4P~neRgUJ7tNDQG-7oVnMsW2Fn8pPFaKHITVdWGU9NAXgBOm3SCdlf7VAO4wn6X~bueNu55HA~gXoaJxp4UZApKJERcBYfEQ__&Key-Pair-Id=K2HSFNDJXOU9YS";
const CTA_BG = "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/FiLxjTVAuMPhQYln.png?Expires=1803815440&Signature=TQdifNRwhNQoofh6dJQy2xlSM9GR2NbyBf~WLRj2gpUJFlzUfZcl0D-BKISH5wGu-hUvOf~NjDuS7JWrsiyHNdzElYEl2x4vgwFLFGU9FRvT6DH2Kkgxe5Ngpu3vdXh06F97M5SOWuaMAWey6EIl3xBEvOriAJ8YpKdXS4vJBdoeRFCPDb4YuS-anyaCYYB295YK7fVqg4Rk-gLfCHkF~kEhoxKrqGClbCZuFNel1LesI~eILOfV0~~I2Axqf6wfPiBF6R2jZ3YTciTPKkCR2lgoDLdwzQ8ADRzTST1Y-xEDln5omATaFSN6H6sOmCrCCTEfB9QGbFcJbdY4czBcXA__&Key-Pair-Id=K2HSFNDJXOU9YS";

const trustSignals = [
  "No technical knowledge needed",
  "Fast delivery — websites in days",
  "Clear pricing, no surprises",
  "Mobile-ready websites",
];

const steps = [
  { icon: MessageCircle, step: "01", title: "Quick chat", desc: "We learn about your business in a short conversation. No forms, no stress." },
  { icon: Palette, step: "02", title: "We design", desc: "We prepare your website structure. You review and approve before we build." },
  { icon: Code2, step: "03", title: "We build", desc: "We build everything. Mobile-ready, fast, and optimized for your customers." },
  { icon: Rocket, step: "04", title: "You go live", desc: "Your website launches. Customers can find you online immediately." },
];

const services = [
  {
    name: "Starter Website",
    price: "€250",
    tagline: "Perfect for getting online fast",
    desc: "A clean, professional single-page website. Everything your customers need to find you and get in touch.",
    delivery: "5–7 working days",
    features: ["Single landing page", "Mobile optimized", "Contact form + WhatsApp", "Basic SEO setup"],
  },
  {
    name: "Business Website",
    price: "€350",
    tagline: "Ideal for growing businesses",
    desc: "A full multi-page website with room to grow. Up to 5 pages covering everything your business needs.",
    delivery: "7–10 working days",
    features: ["Up to 5 pages", "Mobile + speed optimized", "WhatsApp integration", "Google-ready SEO"],
    highlight: true,
  },
];

const businessTypes = [
  { icon: Utensils, label: "Restaurants" },
  { icon: Scissors, label: "Beauty Salons" },
  { icon: Building2, label: "Real Estate" },
  { icon: Stethoscope, label: "Clinics" },
  { icon: Briefcase, label: "Consultants" },
  { icon: Car, label: "Car Rentals" },
];

export default function Home() {
  return (
    <div>
      {/* ── HERO ── */}
      <section
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{ background: "#F6F6F4" }}
      >
        {/* Gradient background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.6,
          }}
          aria-hidden="true"
        />

        <div className="container relative z-10 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text — left */}
            <div>
              <span className="section-label">Website Studio</span>
              <h1
                className="text-[2.4rem] sm:text-5xl lg:text-[3.5rem] font-bold text-foreground leading-[1.1] mb-5"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.03em" }}
              >
                Simple websites<br />
                for small<br />
                <span className="gradient-text">businesses.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
                We design and launch professional websites so your customers can find you online. No technical knowledge needed — we handle everything.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-primary text-white font-semibold text-base hover:bg-[oklch(0.52_0.19_264)] transition-all duration-200 shadow-md hover:shadow-lg"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "52px" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Start My Website
                </a>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border-2 border-foreground/20 text-foreground font-semibold text-base hover:border-primary hover:text-primary transition-all duration-200"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "52px" }}
                >
                  See Pricing
                  <ArrowRight size={16} />
                </Link>
              </div>

              <p className="text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" aria-hidden="true" />
                  Usually replies within a few hours
                </span>
              </p>

              {/* Trust signals */}
              <div className="mt-8 pt-8 border-t border-border grid grid-cols-2 gap-2.5">
                {trustSignals.map((t) => (
                  <div key={t} className="trust-badge">
                    <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                    <span className="text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual — right */}
            <div className="relative hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-lg">
                {/* Soft glow behind */}
                <div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: "radial-gradient(ellipse at center, oklch(0.58 0.18 264 / 0.12) 0%, transparent 70%)",
                    transform: "scale(1.2)",
                  }}
                  aria-hidden="true"
                />
                <img
                  src={HERO_MOCKUP}
                  alt="Website preview mockup showing a professional small business website on laptop and mobile"
                  className="relative w-full drop-shadow-2xl"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="bg-foreground py-5">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              "Websites from €250",
              "Delivered in days",
              "No contracts",
              "We handle everything",
              "Mobile-first design",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-white/80 text-sm font-medium">
                <Check size={14} className="text-primary flex-shrink-0" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section bg-white" id="how-it-works">
        <div className="container">
          <div className="max-w-xl mb-12">
            <span className="section-label">The Process</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Four simple steps to your new website
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Most businesses launch their website in under 10 days. You provide the basics — we handle everything else.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div
                key={s.step}
                className="relative bg-background rounded-2xl p-6 border border-border card-lift"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                    <s.icon size={20} className="text-primary" aria-hidden="true" />
                  </div>
                  <span className="text-3xl font-bold text-foreground/8 select-none" aria-hidden="true">{s.step}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/process"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-200"
            >
              See the full process <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ── */}
      <section className="section bg-background" id="services">
        <div className="container">
          <div className="max-w-xl mb-12">
            <span className="section-label">Services</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Choose the right website for your business
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Two clear options. No hidden costs. No confusing packages.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            {services.map((s) => (
              <div
                key={s.name}
                className={`rounded-2xl p-7 border card-lift ${
                  s.highlight
                    ? "pricing-highlight bg-white shadow-lg"
                    : "bg-white border-border shadow-sm"
                }`}
              >
                {s.highlight && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-primary text-xs font-semibold mb-4">
                    <Star size={11} fill="currentColor" aria-hidden="true" />
                    Most Popular
                  </div>
                )}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{s.tagline}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.price}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2 mb-6">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <Check size={14} className="text-primary flex-shrink-0" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mb-5">
                  <span className="font-medium">Delivery:</span> {s.delivery} after materials received
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    s.highlight
                      ? "bg-primary text-white hover:bg-[oklch(0.52_0.19_264)]"
                      : "border-2 border-foreground/20 text-foreground hover:border-primary hover:text-primary"
                  }`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-200"
            >
              See full service details <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ── */}
      <section className="section bg-white" id="pricing-preview">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="section-label">Pricing</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Simple pricing. No surprises.
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to get started online. No long contracts. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-background rounded-2xl p-6 border border-border text-center">
              <h3 className="font-bold text-lg text-foreground mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Starter</h3>
              <p className="text-4xl font-bold text-foreground my-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>€250</p>
              <p className="text-sm text-muted-foreground">Single page website</p>
              <p className="text-xs text-muted-foreground mt-1">+ optional €15/mo maintenance</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-primary text-center shadow-lg relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">Best Value</span>
              </div>
              <h3 className="font-bold text-lg text-foreground mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Business</h3>
              <p className="text-4xl font-bold text-foreground my-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>€350</p>
              <p className="text-sm text-muted-foreground">Up to 5 pages</p>
              <p className="text-xs text-muted-foreground mt-1">+ optional €25/mo maintenance</p>
            </div>
            <div className="bg-background rounded-2xl p-6 border border-border text-center">
              <h3 className="font-bold text-lg text-foreground mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Maintenance</h3>
              <p className="text-4xl font-bold text-foreground my-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>€15<span className="text-lg font-medium text-muted-foreground">/mo</span></p>
              <p className="text-sm text-muted-foreground">Updates &amp; support</p>
              <p className="text-xs text-muted-foreground mt-1">Optional add-on</p>
            </div>
          </div>

          <div className="text-center mt-8 space-y-3">
            <p className="text-sm text-muted-foreground">
              50% to start · 50% before launch · No obligation consultation
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-200"
            >
              See full pricing details <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHO WE HELP ── */}
      <section className="section bg-background" id="who-we-help">
        <div className="container">
          <div className="max-w-xl mb-12">
            <span className="section-label">Who We Help</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Built for businesses like yours
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We work with small businesses every day. If your customers need to find you online, we can help.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {businessTypes.map((b) => (
              <div
                key={b.label}
                className="bg-white rounded-2xl p-5 border border-border text-center card-lift flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <b.icon size={22} className="text-primary" aria-hidden="true" />
                </div>
                <span className="text-sm font-medium text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{b.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 accent-border-left">
            <p className="text-muted-foreground text-sm leading-relaxed">
              <strong className="text-foreground">Don't see your industry?</strong> We help all kinds of small businesses. If you're not sure, just ask us — we'll let you know if we can help.
            </p>
          </div>
        </div>
      </section>

      {/* ── VISUAL PROOF ── */}
      <section className="section bg-white overflow-hidden" id="examples">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label">Example Layouts</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Clean, professional websites that convert
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Every website we build is designed to help your customers find you and get in touch easily. Clean, fast, and mobile-ready.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Designed for mobile phones first",
                  "Fast loading on any connection",
                  "Easy for customers to navigate",
                  "Clear contact options on every page",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-primary" aria-hidden="true" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-semibold hover:bg-[oklch(0.52_0.19_264)] transition-colors"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Start My Website
              </a>
            </div>
            <div className="relative">
              <img
                src={PREVIEW_CARDS}
                alt="Example website layouts created by D&M Studio for small businesses"
                className="w-full rounded-2xl shadow-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── REASSURANCE STRIP ── */}
      <section className="py-12 bg-accent/40">
        <div className="container">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { value: "5–7 days", label: "Average delivery time", sub: "From first chat to live website" },
              { value: "€250", label: "Starting price", sub: "No hidden fees, ever" },
              { value: "100%", label: "Done for you", sub: "We handle the technical side" },
            ].map((stat) => (
              <div key={stat.value} className="py-4">
                <p className="text-3xl font-bold text-primary mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{stat.value}</p>
                <p className="font-semibold text-foreground text-sm mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ backgroundImage: `url(${CTA_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-foreground/30" aria-hidden="true" />
        <div className="container relative z-10 text-center">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 max-w-2xl mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.02em" }}
          >
            Ready to get your business online?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-md mx-auto">
            Tell us about your business and we'll guide you from there. No obligation, no pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] text-white font-semibold text-lg hover:bg-[#1ebe5d] transition-colors shadow-xl"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/40 text-white font-semibold text-lg hover:bg-white/10 transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Send a Message
            </Link>
          </div>
          <p className="text-white/60 text-sm mt-5">We usually respond the same day.</p>
        </div>
      </section>
    </div>
  );
}
