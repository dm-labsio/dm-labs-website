/* ============================================================
   DM-Labs.io v2.0 - Services Page
   ============================================================ */
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import {
  Globe, Smartphone, Search, Zap, Shield, MessageCircle,
  CheckCircle2, ArrowRight, Image, MapPin, FileText, Share2,
  Headphones, Rocket, Users, CalendarCheck, Languages,
} from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/35797472847?text=Hi%20DM-Labs.io!%20I%27d%20like%20to%20discuss%20a%20website%20project.";

function RevealDiv({ children, className = "", style = {}, delay = 0 }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties; delay?: number;
}) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

const PLANS = [
  {
    name: "Launch",
    price: "€299",
    note: "one-time",
    desc: "A lean online presence for a new business that needs to launch clearly and professionally.",
    features: ["Small one-page or light two-page site", "Responsive build", "Basic SEO foundations", "WhatsApp and social links", "2 revision rounds"],
    accent: "var(--cyan)",
    recommended: false,
  },
  {
    name: "Growth",
    price: "€749",
    note: "one-time",
    desc: "A conversion-focused site for a business ready to be found, trusted, and contacted online.",
    features: ["Up to 4 pages", "Contact form", "Google Maps and reviews/testimonials", "Basic SEO", "Search Console and Analytics setup", "3 revision rounds"],
    accent: "var(--blue)",
    recommended: true,
  },
  {
    name: "Pro",
    price: "€1,499",
    note: "one-time",
    desc: "For a more complete digital presence with richer content, motion, and stronger search foundations.",
    features: ["Up to 7 pages", "Gallery or portfolio", "Pop-up and scroll-driven animations", "Full SEO structure", "Blog setup or a website visual pack", "4 revision rounds"],
    accent: "var(--violet)",
    recommended: false,
  },
];

const INCLUDED = [
  { icon: Smartphone, title: "Mobile Responsive", desc: "Looks perfect on every device - phones, tablets, and desktops.", anchor: "mobile-first" },
  { icon: Search, title: "SEO Optimised", desc: "Built-in search engine optimisation so customers find you on Google.", anchor: "seo" },
  { icon: Zap, title: "Fast Loading", desc: "Optimised code and assets for fast page speeds.", anchor: "performance" },
  { icon: Shield, title: "SSL Security", desc: "Free SSL certificate to keep your site and visitors secure.", anchor: "security" },
  { icon: Image, title: "Custom Design", desc: "No off-the-shelf designs - every website is tailored to your brand.", anchor: "custom-design" },
  { icon: MapPin, title: "Google Maps", desc: "Embedded maps so customers can find your physical location easily.", anchor: "maps" },
  { icon: FileText, title: "Contact Forms", desc: "Professional forms that send inquiries directly to your email.", anchor: "forms" },
  { icon: Share2, title: "Social Integration", desc: "Links to all your social media profiles in one place.", anchor: "social" },
  { icon: Headphones, title: "Post-Launch Support", desc: "We don't disappear after launch - ongoing support when you need it.", anchor: "turnaround" },
];

export default function Services() {
  useSEO({
    title: "Web Design Services Paphos and Cyprus | DM-Labs.io",
    description:
      "Custom website design in Paphos and across Cyprus. Launch, Growth and Pro website packages from €299, plus ongoing care.",
  });

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section style={{ background: "var(--ink)", padding: "100px 0 80px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px", pointerEvents: "none",
        }} />
        <div className="container relative">
          <p className="mono" style={{ color: "var(--cyan)", marginBottom: "16px" }}>WHAT WE OFFER</p>
          <h1 style={{
            fontFamily: "'Satoshi', sans-serif", fontWeight: 900,
            fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-.03em", lineHeight: .96,
            color: "#fff", marginBottom: "20px", maxWidth: "18ch",
          }}>
            Services that{" "}
            <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              drive results.
            </span>
          </h1>
          <p style={{
            fontFamily: "'Satoshi', sans-serif", fontSize: "1rem", fontWeight: 500,
            color: "rgba(238,241,248,.6)", lineHeight: 1.65, maxWidth: "52ch",
          }}>
            We are a small web design agency focused on building professional, high-quality websites. From custom design to SEO optimisation, we handle everything so you don't have to.
          </p>
        </div>
      </section>

      {/* ── Packages ──────────────────────────────────────── */}
      <section style={{ background: "var(--mist)", padding: "100px 0" }}>
        <div className="container">
          <div style={{ marginBottom: "56px" }}>
            <p className="mono" style={{ color: "var(--slate)", marginBottom: "12px" }}>CORE SERVICES</p>
            <h2 style={{
              fontFamily: "'Satoshi', sans-serif", fontWeight: 900,
              fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)", letterSpacing: "-.028em", lineHeight: 1.02,
              color: "var(--ink)", maxWidth: "22ch",
            }}>
              Website packages from €299
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: "var(--hairline)" }}>
            {PLANS.map((plan) => (
              <div key={plan.name} style={{
                background: plan.recommended ? "var(--ink)" : "var(--cloud)",
                padding: "40px 32px", position: "relative",
              }}>
                {plan.recommended && (
                  <div style={{
                    position: "absolute", top: "16px", right: "16px",
                    background: "var(--grad)", padding: "4px 10px",
                    fontFamily: "'Space Mono', monospace", fontSize: "8px",
                    letterSpacing: ".15em", textTransform: "uppercase" as const, color: "#fff",
                  }}>RECOMMENDED</div>
                )}
                <p className="mono" style={{ color: plan.accent, marginBottom: "12px", fontSize: "9px" }}>{plan.name.toUpperCase()} WEBSITE</p>
                <div style={{ marginBottom: "8px" }}>
                  <span style={{
                    fontFamily: "'Satoshi', sans-serif", fontWeight: 900, fontSize: "2.8rem",
                    letterSpacing: "-.03em", color: plan.recommended ? "#fff" : "var(--ink)", lineHeight: 1,
                  }}>{plan.price}</span>
                  <span style={{
                    fontFamily: "'Satoshi', sans-serif", fontSize: ".875rem",
                    color: plan.recommended ? "rgba(238,241,248,.5)" : "var(--slate)", marginLeft: "6px",
                  }}>{plan.note}</span>
                </div>
                <p style={{
                  fontFamily: "'Satoshi', sans-serif", fontSize: ".875rem",
                  color: plan.recommended ? "rgba(238,241,248,.65)" : "var(--slate)",
                  lineHeight: 1.62, marginBottom: "28px", minHeight: "3.5em",
                }}>{plan.desc}</p>
                <ul style={{ marginBottom: "32px" }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
                      <CheckCircle2 size={15} style={{ color: plan.accent, flexShrink: 0, marginTop: "2px" }} />
                      <span style={{
                        fontFamily: "'Satoshi', sans-serif", fontSize: ".875rem",
                        color: plan.recommended ? "rgba(238,241,248,.8)" : "var(--ink)", lineHeight: 1.5,
                      }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                  padding: "13px 24px", fontFamily: "'Space Mono', monospace", fontSize: "9px",
                  letterSpacing: ".15em", textTransform: "uppercase" as const,
                  background: plan.recommended ? "var(--grad)" : "transparent",
                  color: plan.recommended ? "#fff" : "var(--ink)",
                  border: plan.recommended ? "none" : "1px solid var(--hairline)",
                  textDecoration: "none", width: "100%",
                }}>
                  Get a Free Consultation
                </Link>
              </div>
            ))}
          </div>

          {/* Enterprise */}
          <div style={{
            marginTop: "2px", background: "var(--ink)", padding: "40px 32px",
          }}>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              <div style={{ flexShrink: 0 }}>
                <p className="mono" style={{ color: "var(--violet)", marginBottom: "8px", fontSize: "9px" }}>ENTERPRISE / CUSTOM</p>
                <div style={{ marginBottom: "4px" }}>
                  <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 900, fontSize: "2.2rem", letterSpacing: "-.03em", color: "#fff", lineHeight: 1 }}>From €1,499</span>
                </div>
                <p className="mono" style={{ color: "var(--slate-soft)", marginBottom: "16px", fontSize: "9px" }}>QUOTE BASED ON SCOPE</p>
                <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: ".875rem", color: "rgba(238,241,248,.55)", lineHeight: 1.62, maxWidth: "32ch", marginBottom: "20px" }}>
                  For integrations, multilingual builds, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, or unusual content volume.
                </p>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "12px 24px", fontFamily: "'Space Mono', monospace", fontSize: "9px",
                  letterSpacing: ".15em", textTransform: "uppercase" as const,
                  background: "var(--grad)", color: "#fff", border: "none", textDecoration: "none",
                }}>
                  <MessageCircle size={13} /> Contact Us
                </a>
              </div>
              <div style={{ width: "1px", alignSelf: "stretch", background: "rgba(255,255,255,.06)" }} className="hidden lg:block" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-4 flex-1">
                {[
                  { icon: Globe, label: "Fully custom design from scratch" },
                  { icon: Zap, label: "Scope designed around your project" },
                  { icon: CalendarCheck, label: "CRM and booking integrations" },
                  { icon: Languages, label: "Multi-language support" },
                  { icon: Users, label: "Dedicated project manager" },
                  { icon: Headphones, label: "Priority support and delivery" },
                  { icon: ArrowRight, label: "Ongoing retainer option" },
                  { icon: CheckCircle2, label: "Custom SEO and content strategy" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <Icon size={13} style={{ color: "var(--cyan)", flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: ".8rem", color: "rgba(238,241,248,.65)", lineHeight: 1.5 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Included in Every Website ─────────────────────── */}
      <section style={{ background: "var(--cloud)", padding: "100px 0" }}>
        <div className="container">
          <div style={{ marginBottom: "56px" }}>
            <p className="mono" style={{ color: "var(--slate)", marginBottom: "12px" }}>INCLUDED IN EVERY WEBSITE</p>
            <h2 style={{
              fontFamily: "'Satoshi', sans-serif", fontWeight: 900,
              fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)", letterSpacing: "-.028em", lineHeight: 1.02,
              color: "var(--ink)", maxWidth: "22ch",
            }}>
              Everything you need. Nothing you don't.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "var(--hairline)" }}>
            {INCLUDED.map(({ icon: Icon, title, desc, anchor }) => (
              <Link key={title} href={`/services/${anchor}`} style={{ textDecoration: "none" }}>
                <div id={anchor} style={{
                  background: "var(--cloud)", padding: "32px 28px",
                  transition: "background 200ms",
                  cursor: "pointer",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--glass)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "var(--cloud)")}
                >
                  <Icon size={20} style={{ color: "var(--blue)", marginBottom: "16px" }} />
                  <h3 style={{
                    fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "1rem",
                    letterSpacing: "-.015em", color: "var(--ink)", marginBottom: "8px",
                  }}>{title}</h3>
                  <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: ".875rem", color: "var(--slate)", lineHeight: 1.62, marginBottom: "12px" }}>{desc}</p>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: ".15em", color: "var(--blue)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    LEARN MORE <ArrowRight size={10} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section style={{ background: "var(--ink)", padding: "100px 0", textAlign: "center" }}>
        <div className="container">
          <p className="mono" style={{ color: "var(--cyan)", marginBottom: "16px" }}>READY TO START?</p>
          <h2 style={{
            fontFamily: "'Satoshi', sans-serif", fontWeight: 900,
            fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)", letterSpacing: "-.028em", lineHeight: 1.02,
            color: "#fff", marginBottom: "20px",
          }}>
            Let's build something worth visiting.
          </h2>
          <p style={{
            fontFamily: "'Satoshi', sans-serif", fontSize: "1rem", color: "rgba(238,241,248,.6)",
            lineHeight: 1.65, maxWidth: "44ch", margin: "0 auto 36px",
          }}>
            Free consultation. No commitment. We'll tell you exactly what we'd build and what it would cost before you decide anything.
          </p>
          <Link href="/contact" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "16px 40px", fontFamily: "'Space Mono', monospace", fontSize: "10px",
            letterSpacing: ".2em", textTransform: "uppercase" as const,
            background: "var(--grad)", color: "#fff", textDecoration: "none",
          }}>
            Get a Free Consultation <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    </>
  );
}
