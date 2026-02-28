/* D&M Studio — Services Page
   Explains Landing Page vs Business Website without technical jargon
   Focus on business outcomes, not technology */

import { Link } from "wouter";
import { motion } from "framer-motion";
import { Check, ArrowRight, Smartphone, Globe, Zap, Shield, MessageSquare, Search, Star } from "lucide-react";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";

const WHATSAPP_URL = "https://wa.me/972584928177";

const packages = [
  {
    name: "Starter Website",
    price: "€250",
    ideal: "Perfect for small businesses starting online",
    desc: "You need a clean, professional presence online. Customers can find you, see what you offer, and contact you directly. Simple and effective.",
    delivery: "5–7 working days",
    maintenance: "€15/month (optional)",
    includes: [
      "Your business presented professionally online",
      "Works perfectly on phones and computers",
      "Customers can contact you directly",
      "WhatsApp button for instant contact",
      "Your website shows up on Google",
      "Contact form so customers can message you",
    ],
    notIncluded: [
      "Multiple separate pages",
      "Online booking systems",
      "E-commerce / online shop",
    ],
    highlight: false,
    gradient: "from-slate-50 to-blue-50/30",
  },
  {
    name: "Business Website",
    price: "€350",
    ideal: "Best for businesses ready to grow",
    desc: "A complete website with multiple pages. Room to explain your services properly, build trust with customers, and grow your online presence.",
    delivery: "7–10 working days",
    maintenance: "€25/month (optional)",
    includes: [
      "Up to 5 separate pages for your business",
      "Works perfectly on phones and computers",
      "WhatsApp button for instant contact",
      "Your website shows up on Google",
      "Contact form with email notifications",
      "Fast loading on all connections",
      "Professional structure that builds trust",
    ],
    notIncluded: [
      "E-commerce / online shop",
      "Custom booking integrations",
    ],
    highlight: true,
    gradient: "from-blue-50/50 to-indigo-50/30",
  },
];

const features = [
  { icon: Smartphone, title: "Works on every phone", desc: "Your website looks great and works perfectly on all mobile phones. Most of your customers will visit on their phone." },
  { icon: Globe, title: "Customers can find you", desc: "We set up your website so it appears on Google. When someone searches for your business, they can find you." },
  { icon: Zap, title: "Loads fast", desc: "Slow websites lose customers. We build fast websites that load quickly even on slower mobile connections." },
  { icon: MessageSquare, title: "Easy to contact you", desc: "Every website includes a WhatsApp button and contact form so customers can reach you in seconds." },
  { icon: Shield, title: "Secure and reliable", desc: "Your website runs on secure, reliable hosting. We handle the technical side completely." },
  { icon: Search, title: "Ready for Google", desc: "We set up the basics so Google can find and understand your website. Your business gets found online." },
];

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section className="section bg-background pt-24 lg:pt-32">
        <div className="container">
          <AnimateIn className="max-w-2xl">
            <span className="section-label">Services</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-5" style={{ letterSpacing: "-0.02em" }}>
              Everything your business needs online
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We keep it simple. Two clear options based on what your business needs. No confusing packages, no hidden extras.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Packages */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            {packages.map((pkg, i) => (
              <AnimateIn key={pkg.name} delay={i * 0.15}>
                <motion.div
                  className={`rounded-2xl p-8 border h-full ${
                    pkg.highlight
                      ? "pricing-highlight bg-white shadow-xl relative"
                      : "border-border bg-gradient-to-br " + pkg.gradient + " shadow-sm"
                  }`}
                  whileHover={{ y: -4, boxShadow: "0 16px 48px oklch(0.18 0.01 260 / 0.1)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {pkg.highlight && (
                    <div className="absolute -top-3 left-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold shadow-md">
                        <Star size={11} fill="currentColor" aria-hidden="true" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="mb-5">
                    <h2 className="text-2xl font-bold text-foreground mb-1">{pkg.name}</h2>
                    <p className="text-sm text-muted-foreground mb-3">{pkg.ideal}</p>
                    <p className="text-4xl font-bold text-foreground">{pkg.price}</p>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{pkg.desc}</p>

                  <div className="mb-6">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">What's included</h3>
                    <ul className="space-y-2.5">
                      {pkg.includes.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                          <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={12} className="text-primary" aria-hidden="true" />
                          </div>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {pkg.notIncluded.length > 0 && (
                    <div className="mb-6 p-4 rounded-xl bg-muted/50">
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Not included</h3>
                      <ul className="space-y-1.5">
                        {pkg.notIncluded.map((f) => (
                          <li key={f} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="text-muted-foreground/50 mt-0.5">—</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-muted-foreground mt-2 italic">These can be added later if needed.</p>
                    </div>
                  )}

                  <div className="space-y-1.5 mb-7 text-sm">
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">Delivery:</span> {pkg.delivery}</p>
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">Maintenance:</span> {pkg.maintenance}</p>
                  </div>

                  <motion.a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      pkg.highlight
                        ? "bg-primary text-white"
                        : "border-2 border-foreground/15 text-foreground hover:border-primary hover:text-primary"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started — {pkg.price}
                  </motion.a>
                </motion.div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={0.3} className="mt-8 p-5 rounded-2xl bg-accent/30 border border-accent max-w-4xl">
            <p className="text-sm text-foreground">
              <strong>Not sure which one is right for you?</strong> Just message us on WhatsApp. We'll ask a few simple questions and recommend the best option for your business.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* What every website includes */}
      <section className="section bg-background">
        <div className="container">
          <AnimateIn className="max-w-xl mb-12">
            <span className="section-label">Every Website Includes</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Built to work for your business
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Every website we build comes with these essentials — no extra charges.
            </p>
          </AnimateIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
            {features.map((f) => (
              <StaggerItem key={f.title}>
                <motion.div
                  className="bg-white rounded-2xl p-6 border border-border h-full"
                  whileHover={{ y: -3, boxShadow: "0 8px 30px oklch(0.18 0.01 260 / 0.06)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center mb-4">
                    <f.icon size={20} className="text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Maintenance */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-4xl">
            <AnimateIn variant="fade-right">
              <span className="section-label">Optional Add-on</span>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Monthly maintenance
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                We keep your website updated and secure. Simple monthly support — no long contracts.
              </p>
              <ul className="space-y-3">
                {[
                  "Small text and content updates",
                  "Security monitoring and updates",
                  "Technical support when you need it",
                  "Cancel anytime — no commitment",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-primary" aria-hidden="true" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </AnimateIn>
            <AnimateIn variant="fade-left" delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  className="bg-background rounded-2xl p-6 border border-border text-center"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <p className="text-sm text-muted-foreground mb-2">Starter maintenance</p>
                  <p className="text-3xl font-bold text-foreground">€15<span className="text-base font-medium text-muted-foreground">/mo</span></p>
                </motion.div>
                <motion.div
                  className="bg-background rounded-2xl p-6 border border-border text-center"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <p className="text-sm text-muted-foreground mb-2">Business maintenance</p>
                  <p className="text-3xl font-bold text-foreground">€25<span className="text-base font-medium text-muted-foreground">/mo</span></p>
                </motion.div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-foreground">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, oklch(0.58 0.19 264) 0%, transparent 50%)" }} aria-hidden="true" />
        <div className="container relative z-10 text-center">
          <AnimateIn>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to get your business online?
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
              Chat with us on WhatsApp. We'll guide you through everything.
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
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-colors"
                >
                  See Full Pricing <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </motion.div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
