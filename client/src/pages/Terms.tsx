/* dm-labs.io - Terms of Service (v2.0) */
import { Link } from "wouter";
import AnimateIn from "@/components/AnimateIn";
import { ChevronLeft } from "lucide-react";

export default function Terms() {
  return (
    <main style={{ background: "var(--ink)", color: "var(--mist)" }}>
      <section style={{ paddingTop: "140px", paddingBottom: "120px" }}>
        <div className="container" style={{ maxWidth: "760px", margin: "0 auto" }}>
          <AnimateIn variant="fade-up" delay={0.1}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.8125rem", color: "var(--slate-soft)", textDecoration: "none", marginBottom: "40px" }}>
              <ChevronLeft size={14} />
              Back to Home
            </Link>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={0.15}>
            <p className="mono" style={{ color: "var(--cyan)", marginBottom: "16px" }}>Legal</p>
            <h1 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", letterSpacing: "-0.035em", lineHeight: 1.0, color: "var(--mist)", marginBottom: "12px" }}>
              Terms of Service
            </h1>
            <p className="mono" style={{ fontSize: "0.75rem", color: "var(--slate-soft)", marginBottom: "60px" }}>Last updated: February 2026</p>
          </AnimateIn>

          <AnimateIn variant="fade-up" delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              {[
                {
                  title: "About These Terms",
                  body: "These terms explain what you can expect from dm-labs.io and what we expect from you. We have kept them simple and fair.",
                },
                {
                  title: "Our Services",
                  body: "dm-labs.io provides website design and development services for businesses of all sizes. We offer website packages starting from €299, plus optional monthly maintenance plans.",
                },
                {
                  title: "Payment",
                  body: "Payment terms are agreed upon before the project begins. Prices are in Euros. Domain registration and third-party hosting costs (if applicable) are separate.",
                },
                {
                  title: "Revisions",
                  body: "Revision rounds are included per plan: Launch (2 rounds), Growth (3 rounds), Pro (4 rounds). Additional changes after launch can be arranged at an agreed rate.",
                },
                {
                  title: "Delivery Timeline",
                  body: "Delivery timelines start once we receive all required materials. Launch Website: 5-7 working days. Growth Website: 7-10 working days. Pro Website: 10-14 working days.",
                },
                {
                  title: "Your Content",
                  body: "You are responsible for ensuring that any content you provide does not infringe on third-party rights.",
                },
                {
                  title: "Domain and Hosting",
                  body: "Your domain name always belongs to you. We assist with setup but do not own or control your domain or hosting.",
                },
                {
                  title: "Maintenance",
                  body: "Monthly maintenance plans can be cancelled at any time. There are no long-term contracts.",
                },
                {
                  title: "Contact",
                  body: null,
                  contactLink: true,
                },
              ].map(({ title, body, contactLink }) => (
                <div key={title} style={{ paddingBottom: "40px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <h2 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700, fontSize: "1.0625rem", color: "var(--mist)", marginBottom: "10px" }}>{title}</h2>
                  {body && <p style={{ fontSize: "0.9rem", color: "rgba(238,241,248,0.65)", lineHeight: 1.75 }}>{body}</p>}
                  {contactLink && (
                    <p style={{ fontSize: "0.9rem", color: "rgba(238,241,248,0.65)", lineHeight: 1.75 }}>
                      Questions? Email{" "}
                      <a href="mailto:info@dm-labs.io" style={{ color: "var(--cyan)", textDecoration: "none" }}>info@dm-labs.io</a>.
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: "40px", display: "flex", gap: "24px" }}>
              <Link href="/privacy" style={{ fontSize: "0.8125rem", color: "var(--cyan)", textDecoration: "none" }}>Privacy Policy</Link>
              <Link href="/cookies" style={{ fontSize: "0.8125rem", color: "var(--cyan)", textDecoration: "none" }}>Cookie Policy</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </main>
  );
}
