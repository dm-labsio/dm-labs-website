/* ============================================================
   dm-labs.io - Greek Blog Index Page (v2.0)
   ============================================================ */
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import AnimateIn from "@/components/AnimateIn";
import { POSTS_EL } from "@/data/blogPostsEl";
import { ArrowRight, Clock } from "lucide-react";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("el-GR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogElPage() {
  useSEO({
    title: "Άρθρα | Web Σχεδιασμός Tips & Guides | dm-labs.io",
    description: "Πρακτικοί οδηγοί, ειλικρινείς συμβουλές και ιδέες web design για επιχειρήσεις στην Κύπρο και παγκοσμίως.",
  });

  return (
    <main style={{ background: "var(--ink)", color: "var(--mist)" }}>
      {/* HERO */}
      <section style={{ paddingTop: "140px", paddingBottom: "80px" }}>
        <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>
          <AnimateIn variant="fade-up" delay={0.1}>
            <p className="mono" style={{ color: "var(--cyan)", marginBottom: "16px" }}>Άρθρα</p>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={0.2}>
            <h1 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "clamp(2.4rem, 5vw, 4rem)", letterSpacing: "-0.035em", lineHeight: 1.0, color: "var(--mist)", marginBottom: "24px" }}>
              Οδηγοί & Συμβουλές{" "}
              <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Web Design
              </span>
            </h1>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={0.3}>
            <p style={{ fontSize: "1.15rem", color: "rgba(238,241,248,0.65)", lineHeight: 1.65 }}>
              Πρακτικοί οδηγοί για επιχειρήσεις που θέλουν να καταλάβουν τι χρειάζεται η ιστοσελίδα τους.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* POSTS GRID */}
      <section style={{ padding: "0 0 120px" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "2px" }}>
            {POSTS_EL.map((post, i) => (
              <AnimateIn key={post.slug} variant="fade-up" delay={i * 0.06}>
                <Link href={`/el/blog/${post.slug}`} style={{ display: "block", textDecoration: "none", height: "100%" }}>
                  <article className="glass-panel" style={{ padding: "36px", height: "100%", display: "flex", flexDirection: "column", cursor: "pointer" }}>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "20px" }}>
                      <span className="mono" style={{ fontSize: "0.7rem", color: "var(--cyan)", padding: "3px 8px", border: "1px solid rgba(34,211,238,0.3)" }}>
                        {post.category}
                      </span>
                      <span className="mono" style={{ fontSize: "0.7rem", color: "var(--slate-soft)", display: "flex", alignItems: "center", gap: "4px" }}>
                        <Clock size={10} /> {post.readTime}
                      </span>
                    </div>
                    <h2 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700, fontSize: "1.125rem", color: "var(--mist)", lineHeight: 1.35, marginBottom: "14px", flex: 1 }}>{post.title}</h2>
                    <p style={{ fontSize: "0.875rem", color: "rgba(238,241,248,0.6)", lineHeight: 1.65, marginBottom: "24px" }}>{post.excerpt}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="mono" style={{ fontSize: "0.7rem", color: "var(--slate-soft)" }}>{formatDate(post.publishedAt)}</span>
                      <ArrowRight size={16} style={{ color: "var(--cyan)" }} />
                    </div>
                  </article>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
