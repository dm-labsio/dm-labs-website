/* ============================================================
   DM-Labs.io v2.0 — Pricing Page
   ============================================================ */
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, MessageCircle, X } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/35797472847?text=Hi%20DM-Labs.io!%20I%27d%20like%20to%20discuss%20a%20website%20project.";

type PlanValue = boolean | string;

const buildPlans = [
  {
    name: "Launch Website",
    price: "€299",
    accent: "var(--cyan)",
    summary: "A lean online presence for a new business that needs to launch clearly and professionally.",
    features: [
      "Small one-page or light two-page site",
      "Responsive build",
      "Basic SEO foundations",
      "WhatsApp and social links",
      "2 revision rounds",
    ],
    recommended: false,
  },
  {
    name: "Growth Website",
    price: "€749",
    accent: "var(--blue)",
    summary: "A conversion-focused site for a business ready to be found, trusted, and contacted online.",
    features: [
      "Up to 4 pages",
      "Contact form",
      "Google Maps and reviews/testimonials",
      "Basic SEO",
      "Search Console and Analytics setup",
      "3 revision rounds",
    ],
    recommended: true,
  },
  {
    name: "Pro Website",
    price: "€1,499",
    accent: "var(--violet)",
    summary: "A more complete digital presence with richer content, motion, and stronger search foundations.",
    features: [
      "Up to 7 pages",
      "Gallery or portfolio",
      "Pop-up and scroll-driven animations",
      "Full SEO structure",
      "Blog setup or a website visual pack",
      "4 revision rounds",
    ],
    recommended: false,
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
    price: "€49",
    period: "/month",
    accent: "var(--cyan)",
    features: [
      "Hosting monitoring",
      "Backups and bug fixing",
      "WhatsApp support",
      "Up to 5 small content updates each month",
      "Cancel anytime, no contract",
    ],
    recommended: false,
  },
  {
    name: "Complete Care",
    price: "€129",
    period: "/month",
    accent: "var(--violet)",
    features: [
      "Everything in Basic Care",
      "Ongoing content updates",
      "Priority WhatsApp support",
      "Monthly performance check",
      "One simple banner or section update each month",
      "Cancel anytime, no contract",
    ],
    recommended: true,
  },
];

function PlanCell({ value, accent }: { value: PlanValue; accent: string }) {
  if (typeof value === "boolean") {
    return value
      ? <CheckCircle2 size={16} style={{ color: accent, margin: "0 auto" }} />
      : <X size={16} style={{ color: "var(--hairline)", margin: "0 auto" }} />;
  }
  return <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: ".8rem", color: "var(--slate)" }}>{value}</span>;
}

export default function Pricing() {
  useSEO({
    title: "Website Pricing Cyprus | DM-Labs.io",
    description:
      "Website packages for Cyprus businesses: Launch from €299, Growth €749, Pro €1,499, and custom scope from €1,499. Clear scope, no hidden fees.",
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
          <p className="mono" style={{ color: "var(--cyan)", marginBottom: "16px" }}>TRANSPARENT PRICING</p>
          <h1 style={{
            fontFamily: "'Satoshi', sans-serif", fontWeight: 900,
            fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-.03em", lineHeight: .96,
            color: "#fff", marginBottom: "20px", maxWidth: "20ch",
          }}>
            Website pricing for{" "}
            <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Cyprus businesses.
            </span>
          </h1>
          <p style={{
            fontFamily: "'Satoshi', sans-serif", fontSize: "1rem", fontWeight: 500,
            color: "rgba(238,241,248,.6)", lineHeight: 1.65, maxWidth: "52ch",
          }}>
            Clear scope, clear pricing, and a free consultation before you commit. Choose the right starting point for your business.
          </p>
        </div>
      </section>

      {/* ── Proof bar ─────────────────────────────────────── */}
      <div style={{
        background: "var(--cloud)", borderBottom: "1px solid var(--hairline)", padding: "16px 0",
      }}>
        <div className="container" style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: ".9rem", fontWeight: 600, color: "var(--ink)" }}>
            Packages from €299. Every project starts with a free consultation so we can recommend the right scope before work begins.
          </p>
        </div>
      </div>

      {/* ── Build plans ───────────────────────────────────── */}
      <section style={{ background: "var(--mist)", padding: "100px 0" }}>
        <div className="container">
          <div style={{ marginBottom: "56px" }}>
            <p className="mono" style={{ color: "var(--slate)", marginBottom: "12px" }}>BUILD PACKAGES</p>
            <h2 style={{
              fontFamily: "'Satoshi', sans-serif", fontWeight: 900,
              fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)", letterSpacing: "-.028em", lineHeight: 1.02,
              color: "var(--ink)", maxWidth: "22ch",
            }}>
              One-time website packages
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: "var(--hairline)" }}>
            {buildPlans.map((plan) => (
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
                <p className="mono" style={{ color: plan.accent, marginBottom: "12px", fontSize: "9px" }}>{plan.name.toUpperCase()}</p>
                <div style={{ marginBottom: "8px" }}>
                  <span style={{
                    fontFamily: "'Satoshi', sans-serif", fontWeight: 900, fontSize: "2.8rem",
                    letterSpacing: "-.03em", color: plan.recommended ? "#fff" : "var(--ink)", lineHeight: 1,
                  }}>{plan.price}</span>
                  <span style={{
                    fontFamily: "'Satoshi', sans-serif", fontSize: ".875rem",
                    color: plan.recommended ? "rgba(238,241,248,.5)" : "var(--slate)", marginLeft: "6px",
                  }}>one-time</span>
                </div>
                <p style={{
                  fontFamily: "'Satoshi', sans-serif", fontSize: ".875rem",
                  color: plan.recommended ? "rgba(238,241,248,.65)" : "var(--slate)",
                  lineHeight: 1.62, marginBottom: "28px", minHeight: "3.5em",
                }}>{plan.summary}</p>
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
          <div style={{ marginTop: "2px", background: "var(--ink)", padding: "40px 32px" }}>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              <div style={{ flexShrink: 0 }}>
                <p className="mono" style={{ color: "var(--violet)", marginBottom: "8px", fontSize: "9px" }}>ENTERPRISE / CUSTOM</p>
                <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 900, fontSize: "2.2rem", letterSpacing: "-.03em", color: "#fff", lineHeight: 1 }}>From €1,499</span>
                <p className="mono" style={{ color: "var(--slate-soft)", margin: "8px 0 16px", fontSize: "9px" }}>QUOTE BASED ON SCOPE</p>
                <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: ".875rem", color: "rgba(238,241,248,.55)", lineHeight: 1.62, maxWidth: "32ch", marginBottom: "20px" }}>
                  For integrations, multilingual builds, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, or unusual content volume.
                </p>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "12px 24px", fontFamily: "'Space Mono', monospace", fontSize: "9px",
                  letterSpacing: ".15em", textTransform: "uppercase" as const,
                  background: "var(--grad)", color: "#fff", textDecoration: "none",
                }}>
                  <MessageCircle size={13} /> Contact Us
                </a>
              </div>
              <div style={{ width: "1px", alignSelf: "stretch", background: "rgba(255,255,255,.06)" }} className="hidden lg:block" />
              <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: ".875rem", color: "rgba(238,241,248,.55)", lineHeight: 1.8, flex: 1 }}>
                Fully custom design from scratch · Scope designed around your project · CRM and booking integrations · Multi-language support · Dedicated project manager · Priority support and delivery · Ongoing retainer option · Custom SEO and content strategy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Comparison table ──────────────────────────────── */}
      <section style={{ background: "var(--cloud)", padding: "100px 0" }}>
        <div className="container">
          <div style={{ marginBottom: "48px" }}>
            <p className="mono" style={{ color: "var(--slate)", marginBottom: "12px" }}>COMPARE PLANS</p>
            <h2 style={{
              fontFamily: "'Satoshi', sans-serif", fontWeight: 900,
              fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", letterSpacing: "-.025em", lineHeight: 1.05,
              color: "var(--ink)",
            }}>What's included in each package</h2>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--hairline)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: ".15em", color: "var(--slate)", fontWeight: 400 }}>FEATURE</th>
                  {["LAUNCH", "GROWTH", "PRO"].map((n, i) => (
                    <th key={n} style={{ padding: "12px 16px", textAlign: "center", fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: ".15em", color: [buildPlans[0].accent, buildPlans[1].accent, buildPlans[2].accent][i], fontWeight: 400 }}>{n}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} style={{ borderBottom: "1px solid var(--hairline)", background: i % 2 === 0 ? "transparent" : "rgba(11,27,54,.02)" }}>
                    <td style={{ padding: "12px 16px", fontFamily: "'Satoshi', sans-serif", fontSize: ".875rem", color: "var(--ink)" }}>{row.feature}</td>
                    <td style={{ padding: "12px 16px", textAlign: "center" }}><PlanCell value={row.launch} accent={buildPlans[0].accent} /></td>
                    <td style={{ padding: "12px 16px", textAlign: "center" }}><PlanCell value={row.growth} accent={buildPlans[1].accent} /></td>
                    <td style={{ padding: "12px 16px", textAlign: "center" }}><PlanCell value={row.pro} accent={buildPlans[2].accent} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Care plans ────────────────────────────────────── */}
      <section style={{ background: "var(--mist)", padding: "100px 0" }}>
        <div className="container">
          <div style={{ marginBottom: "56px" }}>
            <p className="mono" style={{ color: "var(--slate)", marginBottom: "12px" }}>ONGOING CARE</p>
            <h2 style={{
              fontFamily: "'Satoshi', sans-serif", fontWeight: 900,
              fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)", letterSpacing: "-.028em", lineHeight: 1.02,
              color: "var(--ink)", maxWidth: "22ch",
            }}>
              Monthly maintenance plans
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px max-w-2xl" style={{ background: "var(--hairline)" }}>
            {carePlans.map((plan) => (
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
                <p className="mono" style={{ color: plan.accent, marginBottom: "12px", fontSize: "9px" }}>{plan.name.toUpperCase()}</p>
                <div style={{ marginBottom: "24px" }}>
                  <span style={{
                    fontFamily: "'Satoshi', sans-serif", fontWeight: 900, fontSize: "2.4rem",
                    letterSpacing: "-.03em", color: plan.recommended ? "#fff" : "var(--ink)", lineHeight: 1,
                  }}>{plan.price}</span>
                  <span style={{
                    fontFamily: "'Satoshi', sans-serif", fontSize: ".875rem",
                    color: plan.recommended ? "rgba(238,241,248,.5)" : "var(--slate)", marginLeft: "4px",
                  }}>/month</span>
                </div>
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
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section style={{ background: "var(--ink)", padding: "100px 0", textAlign: "center" }}>
        <div className="container">
          <p className="mono" style={{ color: "var(--cyan)", marginBottom: "16px" }}>NOT SURE WHICH PACKAGE?</p>
          <h2 style={{
            fontFamily: "'Satoshi', sans-serif", fontWeight: 900,
            fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)", letterSpacing: "-.028em", lineHeight: 1.02,
            color: "#fff", marginBottom: "20px",
          }}>
            We'll tell you exactly what we'd build.
          </h2>
          <p style={{
            fontFamily: "'Satoshi', sans-serif", fontSize: "1rem", color: "rgba(238,241,248,.6)",
            lineHeight: 1.65, maxWidth: "44ch", margin: "0 auto 36px",
          }}>
            Free consultation. No commitment. We'll recommend the right scope and price before you decide anything.
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
