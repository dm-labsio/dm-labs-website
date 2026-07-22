/* ============================================================
   DM-Labs.io v2.0 — Blog Index
   Desktop-metaphor icon grid: hover reveals window chrome,
   click opens post reading window
   ============================================================ */
import { useState, useRef, useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { POSTS } from "@/data/blogPosts";
import { ArrowRight, Clock, X, ExternalLink } from "lucide-react";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* ── Category colour mapping ─────────────────────────────── */
const CAT_ACCENT: Record<string, string> = {
  "Web Design":   "var(--cyan)",
  "SEO":          "var(--blue)",
  "Business":     "var(--violet)",
  "Guides":       "var(--cyan)",
  "Local":        "var(--blue)",
};
function catAccent(cat: string) {
  return CAT_ACCENT[cat] ?? "var(--cyan)";
}

/* ── Blog icon (file-stack glyph) ────────────────────────── */
function BlogIcon({ accent }: { accent: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="4" y="8" width="28" height="22" rx="0" fill={accent} opacity=".12"/>
      <rect x="4" y="8" width="28" height="22" rx="0" stroke={accent} strokeWidth="1.5"/>
      <rect x="8" y="4" width="24" height="4" rx="0" fill={accent} opacity=".08" stroke={accent} strokeWidth="1"/>
      <line x1="10" y1="15" x2="26" y2="15" stroke={accent} strokeWidth="1.5"/>
      <line x1="10" y1="19" x2="22" y2="19" stroke={accent} strokeWidth="1.5"/>
      <line x1="10" y1="23" x2="24" y2="23" stroke={accent} strokeWidth="1.5"/>
    </svg>
  );
}

/* ── Hover card (window chrome preview) ─────────────────── */
function PostCard({ post, index }: { post: (typeof POSTS)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const accent = catAccent(post.category);

  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{ textDecoration: "none", display: "block" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          background: hovered ? "var(--cloud)" : "var(--glass)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${hovered ? accent + "44" : "var(--hairline)"}`,
          padding: "0",
          transition: "background 280ms var(--ease-out), border-color 280ms var(--ease-out), transform 280ms var(--ease-out), box-shadow 280ms var(--ease-out)",
          transform: hovered ? "translateY(-3px)" : "none",
          boxShadow: hovered ? `0 16px 40px -16px ${accent}33, 0 4px 12px -4px rgba(11,27,54,.14)` : "none",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Window chrome — visible on hover */}
        <div
          style={{
            height: "28px",
            background: hovered ? "var(--ink)" : "rgba(11,27,54,.04)",
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            gap: "6px",
            borderBottom: `1px solid ${hovered ? "rgba(255,255,255,.06)" : "var(--hairline)"}`,
            transition: "background 280ms var(--ease-out)",
          }}
        >
          <div style={{ width: "7px", height: "7px", background: hovered ? "#FF5F57" : "var(--hairline)" }} />
          <div style={{ width: "7px", height: "7px", background: hovered ? "#FEBC2E" : "var(--hairline)" }} />
          <div style={{ width: "7px", height: "7px", background: hovered ? "#28C840" : "var(--hairline)" }} />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "8px",
              color: hovered ? "rgba(238,241,248,.35)" : "var(--slate-soft)",
              marginLeft: "8px",
              letterSpacing: ".1em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: 1,
            }}
          >
            dm-labs.io/blog/{post.slug}
          </span>
        </div>

        {/* Cover image */}
        <div style={{ height: "160px", overflow: "hidden", position: "relative" }}>
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 500ms var(--ease-out)",
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(11,27,54,.5) 0%, transparent 60%)",
            opacity: hovered ? 1 : 0.4,
            transition: "opacity 280ms",
          }} />
        </div>

        {/* Content */}
        <div style={{ padding: "20px 20px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "8px",
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: accent,
                padding: "3px 7px",
                border: `1px solid ${accent}44`,
                background: `${accent}0f`,
              }}
            >
              {post.category}
            </span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", color: "var(--slate-soft)", letterSpacing: ".1em" }}>
              {formatDate(post.date)}
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "-.015em",
              lineHeight: 1.3,
              color: "var(--ink)",
              marginBottom: "10px",
            }}
          >
            {post.title}
          </h2>

          <p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: ".875rem",
              color: "var(--slate)",
              lineHeight: 1.62,
              marginBottom: "16px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.excerpt}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9px",
                letterSpacing: ".15em",
                textTransform: "uppercase",
                color: accent,
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              Read Article
              <ArrowRight size={11} />
            </span>
          </div>
        </div>

        {/* Sequence number */}
        <div
          style={{
            position: "absolute",
            top: "36px",
            right: "12px",
            fontFamily: "'Space Mono', monospace",
            fontSize: "9px",
            color: "var(--hairline)",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
    </Link>
  );
}

/* ── Main export ─────────────────────────────────────────── */
export default function Blog() {
  useSEO({
    title: "Blog | Web Design Tips and Guides | DM-Labs.io",
    description:
      "Practical guides, honest advice, and web design insights for businesses in Cyprus and beyond.",
  });

  const categories = ["All", ...Array.from(new Set(POSTS.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? POSTS
      : POSTS.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--ink)",
          padding: "100px 0 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative grid lines */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }}
        />
        <div className="container relative">
          <p
            className="mono"
            style={{ color: "var(--cyan)", marginBottom: "16px" }}
          >
            RESOURCES
          </p>
          <h1
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              letterSpacing: "-.03em",
              lineHeight: 0.96,
              color: "#fff",
              marginBottom: "20px",
              maxWidth: "18ch",
            }}
          >
            Practical guides for{" "}
            <span
              style={{
                background: "var(--grad)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              real businesses.
            </span>
          </h1>
          <p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "1rem",
              fontWeight: 500,
              color: "rgba(238,241,248,.6)",
              lineHeight: 1.65,
              maxWidth: "48ch",
            }}
          >
            Honest advice and web design insights for businesses in Cyprus and
            beyond. No jargon, no filler.
          </p>
        </div>
      </section>

      {/* ── Category filter ───────────────────────────────── */}
      <div
        style={{
          background: "var(--cloud)",
          borderBottom: "1px solid var(--hairline)",
          padding: "0",
          overflowX: "auto",
        }}
      >
        <div
          className="container"
          style={{ display: "flex", gap: "0", alignItems: "stretch" }}
        >
          {categories.map((cat) => {
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "9px",
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: active ? "var(--ink)" : "var(--slate)",
                  background: "transparent",
                  border: "none",
                  borderBottom: active
                    ? "2px solid var(--cyan)"
                    : "2px solid transparent",
                  padding: "16px 20px 14px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "color 200ms, border-color 200ms",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Grid ──────────────────────────────────────────── */}
      <section style={{ background: "var(--mist)", padding: "64px 0 100px" }}>
        <div className="container">
          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                fontFamily: "'Satoshi', sans-serif",
                color: "var(--slate)",
              }}
            >
              No articles in this category yet.
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              style={{ gap: "2px", background: "var(--hairline)" }}
            >
              {filtered.map((post, i) => (
                <div key={post.slug} style={{ background: "var(--mist)" }}>
                  <PostCard post={post} index={i} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
