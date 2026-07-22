/**
 * Shared v2.0 Location Page component
 * Used by all EN location pages: Paphos, Limassol, Nicosia, Cyprus, Crete, Thessaloniki, Restaurants
 */
import { useEffect } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { ArrowRight, Check } from "lucide-react";

export interface LocationPageProps {
  seo: {
    title: string;
    description: string;
    canonicalPath: string;
  };
  schemaId: string;
  schema: object;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  intro: string;
  whoWeWorkWith: Array<[string, string]>;
  whatWeCanInclude: Array<[string, string]>;
  packages: Array<{ name: string; price: string; features: string[] }>;
  faqItems: Array<{ question: string; answer: string }>;
  faqTitle: string;
  ctaHeadline: string;
  ctaBody: string;
  ctaWaText: string;
  bannerImg?: string;
}

const GRAD = "linear-gradient(135deg, #4D7EFF 0%, #00E5FF 50%, #8B5CFF 100%)";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: ".2em",
      textTransform: "uppercase" as const, color: "var(--cyan)", marginBottom: "16px",
    }}>{children}</p>
  );
}

function RevealH2({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 style={{
      fontFamily: "'Satoshi', sans-serif", fontWeight: 900,
      fontSize: "clamp(1.9rem, 4.4vw, 3.2rem)", letterSpacing: "-.028em", lineHeight: 1.02,
      color: light ? "#fff" : "var(--ink)", marginBottom: "16px",
    }}>{children}</h2>
  );
}

export default function LocationPage(props: LocationPageProps) {
  const {
    seo, schemaId, schema, eyebrow, headline, headlineAccent, subheadline, intro,
    whoWeWorkWith, whatWeCanInclude, packages, faqItems, faqTitle,
    ctaHeadline, ctaBody, ctaWaText, bannerImg,
  } = props;

  useSEO(seo);

  useEffect(() => {
    document.getElementById(schemaId)?.remove();
    const script = document.createElement("script");
    script.id = schemaId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { document.getElementById(schemaId)?.remove(); };
  }, [schemaId, schema]);

  return (
    <main style={{ background: "var(--mist)", minWidth: 0, overflowX: "hidden" }}>

      {/* ── HERO ── */}
      <section style={{ background: "var(--ink)", padding: "100px 0 80px", position: "relative", overflow: "hidden" }}>
        {/* Grid overlay */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px", pointerEvents: "none",
        }} />
        {bannerImg && (
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${bannerImg})`,
            backgroundSize: "cover", backgroundPosition: "center",
            opacity: 0.12, pointerEvents: "none",
          }} />
        )}
        <div className="container" style={{ position: "relative", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <SectionLabel>{eyebrow}</SectionLabel>
          <h1 style={{
            fontFamily: "'Satoshi', sans-serif", fontWeight: 900,
            fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", letterSpacing: "-.03em", lineHeight: .96,
            color: "#fff", marginBottom: "20px",
          }}>
            {headline}{" "}
            <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {headlineAccent}
            </span>
          </h1>
          <p style={{
            fontFamily: "'Satoshi', sans-serif", fontSize: "1rem", fontWeight: 500,
            color: "rgba(238,241,248,.6)", lineHeight: 1.65, maxWidth: "52ch", margin: "0 auto 12px",
          }}>{subheadline}</p>
          <p style={{
            fontFamily: "'Satoshi', sans-serif", fontSize: ".9375rem",
            color: "rgba(238,241,248,.5)", lineHeight: 1.7, maxWidth: "60ch", margin: "0 auto 36px",
          }}>{intro}</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" as const }}>
            <a
              href={`https://wa.me/35797472847?text=${encodeURIComponent(ctaWaText)}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "16px 40px", fontFamily: "'Space Mono', monospace", fontSize: "10px",
                letterSpacing: ".2em", textTransform: "uppercase" as const,
                background: GRAD, color: "#fff", textDecoration: "none",
              }}
            >
              Free Consultation <ArrowRight size={13} />
            </a>
            <Link
              href="/pricing"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "15px 32px", fontFamily: "'Space Mono', monospace", fontSize: "10px",
                letterSpacing: ".2em", textTransform: "uppercase" as const,
                border: "1px solid rgba(255,255,255,.3)", color: "#fff", textDecoration: "none",
              }}
            >
              View Packages
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHO WE WORK WITH ── */}
      <section style={{ background: "var(--mist)", padding: "100px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <SectionLabel>Industries</SectionLabel>
            <RevealH2>Who we work with</RevealH2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "2px",
          }}>
            {whoWeWorkWith.map(([title, text]) => (
              <div key={title} style={{
                background: "#fff", padding: "28px 24px",
                border: "1px solid var(--hairline)",
              }}>
                <h3 style={{
                  fontFamily: "'Satoshi', sans-serif", fontWeight: 700,
                  fontSize: ".9375rem", color: "var(--ink)", marginBottom: "8px",
                }}>{title}</h3>
                <p style={{
                  fontFamily: "'Satoshi', sans-serif", fontSize: ".8125rem",
                  color: "var(--muted)", lineHeight: 1.65,
                }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE CAN INCLUDE ── */}
      <section style={{ background: "var(--ink)", padding: "100px 0" }}>
        <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ marginBottom: "60px" }}>
            <SectionLabel>Capabilities</SectionLabel>
            <RevealH2 light>What a dm-labs.io website can include</RevealH2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "2px",
          }}>
            {whatWeCanInclude.map(([title, text]) => (
              <div key={title} style={{
                background: "rgba(255,255,255,.04)", padding: "24px",
                border: "1px solid rgba(255,255,255,.06)",
              }}>
                <div style={{ width: "4px", height: "4px", background: "var(--cyan)", marginBottom: "12px" }} />
                <h3 style={{
                  fontFamily: "'Satoshi', sans-serif", fontWeight: 700,
                  fontSize: ".9375rem", color: "#fff", marginBottom: "6px",
                }}>{title}</h3>
                <p style={{
                  fontFamily: "'Satoshi', sans-serif", fontSize: ".8125rem",
                  color: "rgba(238,241,248,.55)", lineHeight: 1.65,
                }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ background: "var(--mist)", padding: "100px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <SectionLabel>Packages</SectionLabel>
            <RevealH2>Transparent website packages</RevealH2>
            <p style={{
              fontFamily: "'Satoshi', sans-serif", fontSize: ".9375rem",
              color: "var(--muted)", lineHeight: 1.65,
            }}>Choose a clear starting point. Projects beyond the standard scope are quoted separately.</p>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "2px", marginBottom: "2px",
          }}>
            {packages.map((plan, i) => (
              <div key={plan.name} style={{
                background: i === 1 ? "var(--ink)" : "#fff",
                border: i === 1 ? "1px solid rgba(255,255,255,.08)" : "1px solid var(--hairline)",
                padding: "32px 28px",
                display: "flex", flexDirection: "column" as const,
              }}>
                <p style={{
                  fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: ".18em",
                  textTransform: "uppercase" as const,
                  color: i === 1 ? "var(--cyan)" : "var(--blue)",
                  marginBottom: "8px",
                }}>{plan.name}</p>
                <p style={{
                  fontFamily: "'Satoshi', sans-serif", fontWeight: 900,
                  fontSize: "2.2rem", letterSpacing: "-.03em",
                  color: i === 1 ? "#fff" : "var(--ink)",
                  marginBottom: "20px",
                }}>{plan.price}</p>
                <ul style={{ listStyle: "none", margin: "0 0 24px", padding: 0, flex: 1, display: "flex", flexDirection: "column" as const, gap: "10px" }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <Check size={13} style={{ color: i === 1 ? "var(--cyan)" : "var(--blue)", flexShrink: 0, marginTop: "2px" }} />
                      <span style={{
                        fontFamily: "'Satoshi', sans-serif", fontSize: ".8125rem",
                        color: i === 1 ? "rgba(238,241,248,.7)" : "var(--muted)",
                        lineHeight: 1.55,
                      }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px",
                    padding: "14px 24px", fontFamily: "'Space Mono', monospace", fontSize: "9px",
                    letterSpacing: ".18em", textTransform: "uppercase" as const,
                    background: i === 1 ? GRAD : "transparent",
                    border: i === 1 ? "none" : "1px solid var(--ink)",
                    color: i === 1 ? "#fff" : "var(--ink)", textDecoration: "none",
                  }}
                >
                  Discuss This Package
                </Link>
              </div>
            ))}
          </div>
          {/* Enterprise row */}
          <div style={{
            background: "var(--ink)", padding: "28px 32px",
            display: "flex", flexWrap: "wrap" as const, gap: "20px",
            alignItems: "center", justifyContent: "space-between",
          }}>
            <div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: ".18em", color: "var(--cyan)", marginBottom: "6px" }}>ENTERPRISE / CUSTOM</p>
              <p style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 900, fontSize: "1.5rem", color: "#fff", marginBottom: "6px" }}>From €1,499</p>
              <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: ".8125rem", color: "rgba(238,241,248,.55)", lineHeight: 1.65, maxWidth: "60ch" }}>
                For integrations, multilingual sites, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, or unusual content volume.
              </p>
            </div>
            <Link
              href="/contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 28px", fontFamily: "'Space Mono', monospace", fontSize: "9px",
                letterSpacing: ".18em", textTransform: "uppercase" as const,
                background: GRAD, color: "#fff", textDecoration: "none", flexShrink: 0,
              }}
            >
              Request a Quote <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "var(--mist)", padding: "80px 0" }}>
        <div className="container" style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <SectionLabel>FAQ</SectionLabel>
            <RevealH2>{faqTitle}</RevealH2>
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "2px" }}>
            {faqItems.map(item => (
              <article key={item.question} style={{
                background: "#fff", padding: "24px 28px",
                border: "1px solid var(--hairline)",
              }}>
                <h3 style={{
                  fontFamily: "'Satoshi', sans-serif", fontWeight: 700,
                  fontSize: ".9375rem", color: "var(--ink)", marginBottom: "8px",
                }}>{item.question}</h3>
                <p style={{
                  fontFamily: "'Satoshi', sans-serif", fontSize: ".8125rem",
                  color: "var(--muted)", lineHeight: 1.7,
                }}>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "var(--ink)", padding: "100px 0", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "700px", margin: "0 auto" }}>
          <SectionLabel>Get Started</SectionLabel>
          <RevealH2 light>{ctaHeadline}</RevealH2>
          <p style={{
            fontFamily: "'Satoshi', sans-serif", fontSize: "1rem",
            color: "rgba(238,241,248,.6)", lineHeight: 1.65,
            maxWidth: "44ch", margin: "0 auto 36px",
          }}>{ctaBody}</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" as const }}>
            <a
              href={`https://wa.me/35797472847?text=${encodeURIComponent(ctaWaText)}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "16px 40px", fontFamily: "'Space Mono', monospace", fontSize: "10px",
                letterSpacing: ".2em", textTransform: "uppercase" as const,
                background: GRAD, color: "#fff", textDecoration: "none",
              }}
            >
              Free Consultation <ArrowRight size={13} />
            </a>
            <Link
              href="/pricing"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "15px 32px", fontFamily: "'Space Mono', monospace", fontSize: "10px",
                letterSpacing: ".2em", textTransform: "uppercase" as const,
                border: "1px solid rgba(255,255,255,.3)", color: "#fff", textDecoration: "none",
              }}
            >
              View All Packages
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
