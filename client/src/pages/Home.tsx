/* D&M Studio — Homepage (v2)
   Sections: Hero, Trust Strip, Video Showcase, How It Works, Services,
             Pricing Preview, Business Types, Visual Proof, Stats, Final CTA
   Design: Confident Minimal | Left-anchored | Mobile-first
   Animations: framer-motion scroll-triggered */

import { Link } from "wouter";
import { motion } from "framer-motion";
import { Check, ArrowRight, MessageCircle, Palette, Code2, Rocket, Star, Utensils, Scissors, Building2, Stethoscope, Briefcase, Car, Play, Smartphone, Globe, Zap, Shield } from "lucide-react";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import CountUp from "@/components/CountUp";
import { useState } from "react";

const WHATSAPP_URL = "https://wa.me/972584928177";

/* CDN image URLs — tied to webdev project lifecycle */
const HERO_MOCKUP = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/video-keyframe-end-E48vBKgjSQaZHk8kPfM4dc.webp";
const PREVIEW_CARDS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/about-team-aZwe2jq4pHfTFc7xWpWcm4.webp";
const DESIGN_ICON = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/services-design-icon-ednYouQJnxdPEWgnot8QBv.webp";
const BUILD_ICON = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/services-build-icon-jWUdM5U9m4wUxq8Cmx6EjL.webp";
const PROMO_VIDEO = "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/vjzozHmfdMCitlaH.mp4?Expires=1803816385&Signature=KxJTKnRM9BjBhsPGvD2jnnIfIrj7vafJVlKjXF1IJa4Vq3iOlaAMk6s0LhBrGTxYtcVauO4uk65eKvq55nbfMXnsOl5NBxFr~sALc7D9Kdn0V1OwwDqQ-CjTQfVsY74XMiwbgdEqO6MZnVWJE6VMH5sEMTBBYz4iVMiLe79CPQWaZeCbmyswQDm1W6lJqJHtL5O53llzFK~Oa4GSlpZP3c-BPGr0JLAFIV4e50k5rbess22HIvkAwshwQz~S5zEW~KWZWKhrr36jVhWFOS84GXeiHdlA2euZyIy7TqwvkMkFvujm-NwVZk6PEnexzHJteHC1noqCxKwQ9bPzy2c91w__&Key-Pair-Id=K2HSFNDJXOU9YS";

const trustSignals = [
  "No technical knowledge needed",
  "Fast delivery — websites in days",
  "Clear pricing, no surprises",
  "Mobile-ready websites",
];

const steps = [
  { icon: MessageCircle, step: "01", title: "Quick chat", desc: "We learn about your business in a short conversation. No forms, no stress.", color: "bg-blue-50 text-blue-600" },
  { icon: Palette, step: "02", title: "We design", desc: "We prepare your website structure. You review and approve before we build.", color: "bg-indigo-50 text-indigo-600" },
  { icon: Code2, step: "03", title: "We build", desc: "We build everything. Mobile-ready, fast, and optimized for your customers.", color: "bg-violet-50 text-violet-600" },
  { icon: Rocket, step: "04", title: "You go live", desc: "Your website launches. Customers can find you online immediately.", color: "bg-emerald-50 text-emerald-600" },
];

const services = [
  {
    name: "Starter Website",
    price: "€250",
    tagline: "Perfect for getting online fast",
    desc: "A clean, professional single-page website. Everything your customers need to find you and get in touch.",
    delivery: "5–7 working days",
    features: ["Single landing page", "Mobile optimized", "Contact form + WhatsApp", "Basic SEO setup"],
    icon: DESIGN_ICON,
  },
  {
    name: "Business Website",
    price: "€350",
    tagline: "Ideal for growing businesses",
    desc: "A full multi-page website with room to grow. Up to 5 pages covering everything your business needs.",
    delivery: "7–10 working days",
    features: ["Up to 5 pages", "Mobile + speed optimized", "WhatsApp integration", "Google-ready SEO"],
    highlight: true,
    icon: BUILD_ICON,
  },
];

const businessTypes = [
  { icon: Utensils, label: "Restaurants", color: "from-orange-50 to-amber-50" },
  { icon: Scissors, label: "Beauty Salons", color: "from-pink-50 to-rose-50" },
  { icon: Building2, label: "Real Estate", color: "from-blue-50 to-sky-50" },
  { icon: Stethoscope, label: "Clinics", color: "from-emerald-50 to-teal-50" },
  { icon: Briefcase, label: "Consultants", color: "from-violet-50 to-purple-50" },
  { icon: Car, label: "Car Rentals", color: "from-slate-50 to-gray-50" },
];

const features = [
  { icon: Smartphone, title: "Mobile-first", desc: "Designed for phones first — where most customers browse." },
  { icon: Zap, title: "Lightning fast", desc: "Optimized for speed on any connection." },
  { icon: Globe, title: "Google-ready", desc: "Built so customers can find you online." },
  { icon: Shield, title: "Secure & reliable", desc: "Protected hosting with SSL included." },
];

/* WhatsApp SVG icon reusable */
function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function Home() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-background">
        {/* Decorative gradient blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.07] pointer-events-none" style={{ background: "radial-gradient(circle, oklch(0.58 0.19 264) 0%, transparent 70%)" }} aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.05] pointer-events-none" style={{ background: "radial-gradient(circle, oklch(0.68 0.22 280) 0%, transparent 70%)" }} aria-hidden="true" />

        <div className="container relative z-10 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text — left */}
            <div>
              <AnimateIn variant="fade-down" delay={0.1}>
                <span className="section-label">Website Studio</span>
              </AnimateIn>

              <AnimateIn delay={0.2}>
                <h1 className="text-[2.4rem] sm:text-5xl lg:text-[3.5rem] font-bold text-foreground leading-[1.08] mb-5" style={{ letterSpacing: "-0.03em" }}>
                  Simple websites<br />
                  for small<br />
                  <span className="gradient-text">businesses.</span>
                </h1>
              </AnimateIn>

              <AnimateIn delay={0.35}>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
                  We design and launch professional websites so your customers can find you online. No technical knowledge needed — we handle everything.
                </p>
              </AnimateIn>

              {/* CTAs */}
              <AnimateIn delay={0.45}>
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <motion.a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-primary text-white font-semibold text-base shadow-md"
                    style={{ minHeight: "52px" }}
                    whileHover={{ scale: 1.03, boxShadow: "0 12px 40px oklch(0.58 0.19 264 / 0.25)" }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <WhatsAppIcon />
                    Start My Website
                  </motion.a>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/pricing"
                      className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border-2 border-foreground/15 text-foreground font-semibold text-base hover:border-primary hover:text-primary transition-all duration-200"
                      style={{ minHeight: "52px" }}
                    >
                      See Pricing
                      <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                </div>
              </AnimateIn>

              <AnimateIn delay={0.55}>
                <p className="text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                    </span>
                    Usually replies within a few hours
                  </span>
                </p>
              </AnimateIn>

              {/* Trust signals */}
              <AnimateIn delay={0.65}>
                <div className="mt-8 pt-8 border-t border-border grid grid-cols-2 gap-2.5">
                  {trustSignals.map((t) => (
                    <div key={t} className="trust-badge">
                      <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                      <span className="text-sm">{t}</span>
                    </div>
                  ))}
                </div>
              </AnimateIn>
            </div>

            {/* Visual — right */}
            <AnimateIn variant="fade-left" delay={0.3} className="relative hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-lg">
                {/* Soft glow behind */}
                <div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: "radial-gradient(ellipse at center, oklch(0.58 0.18 264 / 0.12) 0%, transparent 70%)",
                    transform: "scale(1.3)",
                  }}
                  aria-hidden="true"
                />
                <motion.img
                  src={HERO_MOCKUP}
                  alt="Website preview mockup showing a professional small business website on laptop, tablet, and mobile"
                  className="relative w-full drop-shadow-2xl rounded-2xl"
                  loading="eager"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="bg-foreground py-5 overflow-hidden">
        <motion.div
          className="container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              "Websites from €250",
              "Delivered in days",
              "No contracts",
              "We handle everything",
              "Mobile-first design",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-white/80 text-sm font-medium">
                <Check size={14} className="text-blue-400 flex-shrink-0" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── VIDEO SHOWCASE ── */}
      <section className="section bg-white" id="video-showcase">
        <div className="container">
          <AnimateIn className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-label">See It In Action</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              From business listing to professional website
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Watch how we transform your scattered online presence into a cohesive, professional website.
            </p>
          </AnimateIn>

          <AnimateIn variant="scale" delay={0.2} className="max-w-sm mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-foreground/5 aspect-[9/16]">
              {!videoPlaying ? (
                <button
                  onClick={() => setVideoPlaying(true)}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 group cursor-pointer"
                  aria-label="Play video"
                >
                  {/* Thumbnail overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 to-foreground/60" />
                  <motion.div
                    className="relative z-10 w-20 h-20 rounded-full bg-white/95 flex items-center justify-center shadow-xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play size={32} className="text-primary ml-1" fill="oklch(0.58 0.19 264)" />
                  </motion.div>
                  <span className="relative z-10 text-white font-semibold text-sm">Watch the transformation</span>
                </button>
              ) : null}
              <video
                src={PROMO_VIDEO}
                className="w-full h-full object-cover"
                controls={videoPlaying}
                autoPlay={videoPlaying}
                playsInline
                muted={!videoPlaying}
                loop
                poster=""
              />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section bg-background" id="how-it-works">
        <div className="container">
          <AnimateIn className="max-w-xl mb-14">
            <span className="section-label">The Process</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Four simple steps to your new website
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Most businesses launch their website in under 10 days. You provide the basics — we handle everything else.
            </p>
          </AnimateIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {steps.map((s) => (
              <StaggerItem key={s.step}>
                <motion.div
                  className="relative bg-white rounded-2xl p-6 border border-border h-full"
                  whileHover={{ y: -4, boxShadow: "0 12px 40px oklch(0.18 0.01 260 / 0.08)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-xl ${s.color} flex items-center justify-center flex-shrink-0`}>
                      <s.icon size={20} aria-hidden="true" />
                    </div>
                    <span className="text-3xl font-bold text-foreground/8 select-none" aria-hidden="true">{s.step}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateIn delay={0.4} className="mt-10 text-center">
            <Link
              href="/process"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-200"
            >
              See the full process <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ── */}
      <section className="section bg-white" id="services">
        <div className="container">
          <AnimateIn className="max-w-xl mb-14">
            <span className="section-label">Services</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Choose the right website for your business
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Two clear options. No hidden costs. No confusing packages.
            </p>
          </AnimateIn>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
            {services.map((s, i) => (
              <AnimateIn key={s.name} delay={i * 0.15} variant="fade-up">
                <motion.div
                  className={`rounded-2xl p-7 border h-full ${
                    s.highlight
                      ? "pricing-highlight bg-white shadow-lg relative"
                      : "bg-white border-border shadow-sm"
                  }`}
                  whileHover={{ y: -4, boxShadow: "0 16px 48px oklch(0.18 0.01 260 / 0.1)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {s.highlight && (
                    <div className="absolute -top-3 left-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold shadow-md">
                        <Star size={11} fill="currentColor" aria-hidden="true" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img src={s.icon} alt="" className="w-12 h-12 rounded-xl" aria-hidden="true" />
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{s.name}</h3>
                        <p className="text-sm text-muted-foreground">{s.tagline}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-foreground">{s.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">one-time</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{s.desc}</p>
                  <ul className="space-y-2.5 mb-6">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-foreground">
                        <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-primary" aria-hidden="true" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground mb-5">
                    <span className="font-medium">Delivery:</span> {s.delivery} after materials received
                  </p>
                  <motion.a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      s.highlight
                        ? "bg-primary text-white"
                        : "border-2 border-foreground/15 text-foreground hover:border-primary hover:text-primary"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.a>
                </motion.div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={0.3} className="mt-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-200"
            >
              See full service details <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="section bg-background" id="features">
        <div className="container">
          <AnimateIn className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label">Every Website Includes</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Built to work for your business
            </h2>
            <p className="text-muted-foreground text-lg">
              Every website comes with these essentials — no extra charges.
            </p>
          </AnimateIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" staggerDelay={0.08}>
            {features.map((f) => (
              <StaggerItem key={f.title}>
                <motion.div
                  className="bg-white rounded-2xl p-6 border border-border text-center h-full"
                  whileHover={{ y: -3, boxShadow: "0 8px 30px oklch(0.18 0.01 260 / 0.06)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
                    <f.icon size={22} className="text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── PRICING PREVIEW ── */}
      <section className="section bg-white" id="pricing-preview">
        <div className="container">
          <AnimateIn className="max-w-2xl mx-auto text-center mb-12">
            <span className="section-label">Pricing</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Simple pricing. No surprises.
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to get started online. No long contracts. No hidden fees.
            </p>
          </AnimateIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto" staggerDelay={0.1}>
            <StaggerItem>
              <div className="bg-background rounded-2xl p-6 border border-border text-center h-full">
                <h3 className="font-bold text-lg text-foreground mb-1">Starter</h3>
                <p className="text-4xl font-bold text-foreground my-3">€250</p>
                <p className="text-sm text-muted-foreground">Single page website</p>
                <p className="text-xs text-muted-foreground mt-1">+ optional €15/mo maintenance</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-white rounded-2xl p-6 border-2 border-primary text-center shadow-lg relative h-full">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">Best Value</span>
                </div>
                <h3 className="font-bold text-lg text-foreground mb-1">Business</h3>
                <p className="text-4xl font-bold text-foreground my-3">€350</p>
                <p className="text-sm text-muted-foreground">Up to 5 pages</p>
                <p className="text-xs text-muted-foreground mt-1">+ optional €25/mo maintenance</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-background rounded-2xl p-6 border border-border text-center h-full">
                <h3 className="font-bold text-lg text-foreground mb-1">Maintenance</h3>
                <p className="text-4xl font-bold text-foreground my-3">€15<span className="text-lg font-medium text-muted-foreground">/mo</span></p>
                <p className="text-sm text-muted-foreground">Updates &amp; support</p>
                <p className="text-xs text-muted-foreground mt-1">Optional add-on</p>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <AnimateIn delay={0.3} className="text-center mt-8 space-y-3">
            <p className="text-sm text-muted-foreground">
              50% to start · 50% before launch · No obligation consultation
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-200"
            >
              See full pricing details <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── WHO WE HELP ── */}
      <section className="section bg-background" id="who-we-help">
        <div className="container">
          <AnimateIn className="max-w-xl mb-14">
            <span className="section-label">Who We Help</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Built for businesses like yours
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We work with small businesses every day. If your customers need to find you online, we can help.
            </p>
          </AnimateIn>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4" staggerDelay={0.06}>
            {businessTypes.map((b) => (
              <StaggerItem key={b.label}>
                <motion.div
                  className={`bg-gradient-to-br ${b.color} rounded-2xl p-5 border border-border/50 text-center flex flex-col items-center gap-3`}
                  whileHover={{ y: -3, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center shadow-sm">
                    <b.icon size={22} className="text-foreground/70" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{b.label}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateIn delay={0.3} className="mt-8 accent-border-left">
            <p className="text-muted-foreground text-sm leading-relaxed">
              <strong className="text-foreground">Don't see your industry?</strong> We help all kinds of small businesses. If you're not sure, just ask us — we'll let you know if we can help.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── VISUAL PROOF / WORKSPACE ── */}
      <section className="section bg-white overflow-hidden" id="examples">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimateIn variant="fade-right">
              <span className="section-label">Our Workspace</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Crafted with care, delivered with confidence
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
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-semibold"
                whileHover={{ scale: 1.03, boxShadow: "0 8px 30px oklch(0.58 0.19 264 / 0.2)" }}
                whileTap={{ scale: 0.98 }}
              >
                <WhatsAppIcon size={16} />
                Start My Website
              </motion.a>
            </AnimateIn>

            <AnimateIn variant="fade-left" delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 -z-10" aria-hidden="true" />
                <img
                  src={PREVIEW_CARDS}
                  alt="D&M Studio creative workspace showing website design in progress"
                  className="w-full rounded-2xl shadow-xl"
                  loading="lazy"
                />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="py-16 bg-background">
        <div className="container">
          <StaggerContainer className="grid sm:grid-cols-3 gap-8 text-center max-w-3xl mx-auto" staggerDelay={0.15}>
            {[
              { value: 7, suffix: " days", label: "Average delivery time", sub: "From first chat to live website" },
              { value: 250, prefix: "€", label: "Starting price", sub: "No hidden fees, ever" },
              { value: 100, suffix: "%", label: "Done for you", sub: "We handle the technical side" },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="py-4">
                  <p className="text-4xl font-bold text-primary mb-1">
                    <CountUp end={stat.value} prefix={stat.prefix || ""} suffix={stat.suffix || ""} />
                  </p>
                  <p className="font-semibold text-foreground text-sm mb-0.5">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.sub}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-foreground">
        {/* Decorative gradient */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, oklch(0.58 0.19 264) 0%, transparent 50%), radial-gradient(ellipse at bottom left, oklch(0.68 0.22 280) 0%, transparent 50%)" }} aria-hidden="true" />

        <div className="container relative z-10 text-center">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 max-w-2xl mx-auto" style={{ letterSpacing: "-0.02em" }}>
              Ready to get your business online?
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="text-white/70 text-lg mb-10 max-w-md mx-auto">
              Tell us about your business and we'll guide you from there. No obligation, no pressure.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] text-white font-semibold text-lg shadow-xl"
                whileHover={{ scale: 1.04, boxShadow: "0 16px 48px rgba(37, 211, 102, 0.3)" }}
                whileTap={{ scale: 0.97 }}
              >
                <WhatsAppIcon size={22} />
                Chat on WhatsApp
              </motion.a>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/20 text-white font-semibold text-lg hover:bg-white/10 transition-colors"
                >
                  Send a Message
                </Link>
              </motion.div>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.4}>
            <p className="text-white/50 text-sm mt-6">We usually respond the same day.</p>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
