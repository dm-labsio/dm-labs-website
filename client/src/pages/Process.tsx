/* ============================================================
   DM-Labs.io v2.0 - Process Page
   ============================================================ */
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { MessageCircle, Palette, Code, Rocket, ArrowRight, CheckCircle2, CreditCard } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/35797472847?text=Hi%20DM-Labs.io!%20I%27d%20like%20to%20discuss%20a%20website%20project.";

const steps = [
  {
    step: "01",
    icon: MessageCircle,
    title: "Discovery Call",
    time: "~1 day",
    desc: "We start with a quick WhatsApp chat. Tell us about your business, what you need, and your goals. No technical jargon, just a friendly conversation.",
    details: ["15-20 minute WhatsApp call", "We learn about your business", "You tell us what you need", "We recommend the best package"],
    accent: "var(--cyan)",
  },
  {
    step: "02",
    icon: CreditCard,
    title: "Secure Your Spot",
    time: "Same day",
    desc: "Once we agree on the scope and price, you pay and we begin work immediately. Simple, transparent, no surprises.",
    details: ["Clear pricing, no hidden fees", "Pay once, own it forever", "Work begins immediately", "Secure payment options"],
    accent: "var(--blue)",
  },
  {
    step: "03",
    icon: Palette,
    title: "Design and Build",
    time: "3-7 days",
    desc: "We design and develop your website. You'll see progress along the way and can provide feedback at key milestones.",
    details: ["Custom design for your brand", "Mobile-first development", "Regular progress updates", "Your feedback shapes the result"],
    accent: "var(--violet)",
  },
  {
    step: "04",
    icon: Code,
    title: "Review and Revisions",
    time: "1-2 days",
    desc: "You review the website and request changes. We refine everything until you're completely happy with the result.",
    details: ["Full website preview", "Launch: 2 revision rounds, Growth: 3, Pro: 4", "We adjust until you're satisfied", "No extra charges for included revisions"],
    accent: "var(--cyan)",
  },
  {
    step: "05",
    icon: Rocket,
    title: "Launch",
    time: "~1 day",
    desc: "Your website goes live. We handle domain setup, hosting, and make sure everything works correctly.",
    details: ["Domain connection", "SSL certificate setup", "Speed optimisation", "Your website is live"],
    accent: "var(--blue)",
  },
];

export default function Process() {
  useSEO({
    title: "Our Process | How We Build Websites | DM-Labs.io",
    description:
      "From discovery call to launch in 5-14 days. See exactly how DM-Labs.io designs and builds your website, step by step.",
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
          <p className="mono" style={{ color: "var(--cyan)", marginBottom: "16px" }}>HOW IT WORKS</p>
          <h1 style={{
            fontFamily: "'Satoshi', sans-serif", fontWeight: 900,
            fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-.03em", lineHeight: .96,
            color: "#fff", marginBottom: "20px", maxWidth: "18ch",
          }}>
            From idea to{" "}
            <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              launch.
            </span>
          </h1>
          <p style={{
            fontFamily: "'Satoshi', sans-serif", fontSize: "1rem", fontWeight: 500,
            color: "rgba(238,241,248,.6)", lineHeight: 1.65, maxWidth: "48ch",
          }}>
            Most websites are live within 5-14 days. Here is exactly what happens at each stage.
          </p>
        </div>
      </section>

      {/* ── Steps ─────────────────────────────────────────── */}
      <section style={{ background: "var(--mist)", padding: "100px 0" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;
              return (
                <div key={step.step} style={{
                  background: isEven ? "var(--cloud)" : "var(--ink)",
                  padding: "48px 40px",
                }}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Step number */}
                    <div style={{ gridColumn: "span 1" }}>
                      <span style={{
                        fontFamily: "'Space Mono', monospace", fontSize: "9px",
                        letterSpacing: ".2em", color: step.accent,
                      }}>{step.step}</span>
                    </div>

                    {/* Icon + title */}
                    <div style={{ gridColumn: "span 3" }}>
                      <div style={{
                        width: "48px", height: "48px",
                        background: `${step.accent}14`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginBottom: "16px",
                      }}>
                        <Icon size={22} style={{ color: step.accent }} />
                      </div>
                      <h2 style={{
                        fontFamily: "'Satoshi', sans-serif", fontWeight: 900,
                        fontSize: "1.5rem", letterSpacing: "-.025em", lineHeight: 1.1,
                        color: isEven ? "var(--ink)" : "#fff", marginBottom: "6px",
                      }}>{step.title}</h2>
                      <p className="mono" style={{ color: step.accent, fontSize: "9px" }}>{step.time.toUpperCase()}</p>
                    </div>

                    {/* Description */}
                    <div style={{ gridColumn: "span 4" }}>
                      <p style={{
                        fontFamily: "'Satoshi', sans-serif", fontSize: "1rem",
                        color: isEven ? "var(--slate)" : "rgba(238,241,248,.65)",
                        lineHeight: 1.72,
                      }}>{step.desc}</p>
                    </div>

                    {/* Details */}
                    <div style={{ gridColumn: "span 4" }}>
                      <ul>
                        {step.details.map((d) => (
                          <li key={d} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "8px" }}>
                            <CheckCircle2 size={14} style={{ color: step.accent, flexShrink: 0, marginTop: "2px" }} />
                            <span style={{
                              fontFamily: "'Satoshi', sans-serif", fontSize: ".875rem",
                              color: isEven ? "var(--ink)" : "rgba(238,241,248,.75)", lineHeight: 1.5,
                            }}>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Timeline summary ──────────────────────────────── */}
      <section style={{ background: "var(--cloud)", padding: "100px 0" }}>
        <div className="container">
          <div style={{ marginBottom: "48px" }}>
            <p className="mono" style={{ color: "var(--slate)", marginBottom: "12px" }}>TYPICAL TIMELINE</p>
            <h2 style={{
              fontFamily: "'Satoshi', sans-serif", fontWeight: 900,
              fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)", letterSpacing: "-.028em", lineHeight: 1.02,
              color: "var(--ink)", maxWidth: "22ch",
            }}>
              Most websites live in 5-14 days.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: "var(--hairline)" }}>
            {[
              { label: "Launch Website", time: "5-7 days", accent: "var(--cyan)" },
              { label: "Growth Website", time: "7-10 days", accent: "var(--blue)" },
              { label: "Pro Website", time: "10-14 days", accent: "var(--violet)" },
            ].map((item) => (
              <div key={item.label} style={{ background: "var(--cloud)", padding: "32px 28px" }}>
                <p className="mono" style={{ color: item.accent, marginBottom: "12px", fontSize: "9px" }}>{item.label.toUpperCase()}</p>
                <p style={{
                  fontFamily: "'Satoshi', sans-serif", fontWeight: 900, fontSize: "2rem",
                  letterSpacing: "-.025em", color: "var(--ink)", lineHeight: 1,
                }}>{item.time}</p>
              </div>
            ))}
          </div>
          <p style={{
            fontFamily: "'Satoshi', sans-serif", fontSize: ".875rem", color: "var(--slate)",
            lineHeight: 1.65, marginTop: "24px",
          }}>
            Timeline starts once we receive all required content from you. Complex or custom projects are scoped individually.
          </p>
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
            Step one is a free conversation.
          </h2>
          <p style={{
            fontFamily: "'Satoshi', sans-serif", fontSize: "1rem", color: "rgba(238,241,248,.6)",
            lineHeight: 1.65, maxWidth: "44ch", margin: "0 auto 36px",
          }}>
            Tell us about your business and what you need. We'll recommend the right scope and price before you decide anything.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "16px 40px", fontFamily: "'Space Mono', monospace", fontSize: "10px",
              letterSpacing: ".2em", textTransform: "uppercase" as const,
              background: "var(--grad)", color: "#fff", textDecoration: "none",
            }}>
              <MessageCircle size={13} /> WhatsApp Us
            </a>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "16px 40px", fontFamily: "'Space Mono', monospace", fontSize: "10px",
              letterSpacing: ".2em", textTransform: "uppercase" as const,
              background: "transparent", color: "#fff",
              border: "1px solid rgba(255,255,255,.2)", textDecoration: "none",
            }}>
              Contact Form <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
