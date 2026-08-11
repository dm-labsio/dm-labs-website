/* ============================================================
   D&M LABS - Blog Index Page
   ============================================================ */
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import AnimateIn from "@/components/AnimateIn";
import { POSTS } from "@/data/blogPosts";
import { ArrowRight, Clock, Tag } from "lucide-react";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Blog() {
  useSEO({
    title: "Blog | Web Design Tips & Guides | DM-Labs.io",
    description: "Practical guides, honest advice, and web design insights for businesses in Cyprus and beyond.",
  });

  return (
    <div className="blog-editorial">
      <section
        className="relative overflow-hidden blog-editorial-hero"
        style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(3rem, 6vh, 5rem)" }}
      >
        <div className="container relative z-10 text-center">
          <AnimateIn>
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase blog-editorial-label">Resources and insights</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5 blog-editorial-title">
              <span>The DM-Labs.io</span>
              <span><em>Blog</em></span>
            </h1>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto blog-editorial-lead">
              Practical guides, honest advice, and web design insights for businesses in Cyprus and beyond.
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="section-spacing bg-white blog-editorial-section">
        <div className="container">
          {POSTS.length === 0 ? (
            <div className="text-center py-20 text-[#5B6472] blog-editorial-empty">No articles yet. Check back soon.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 blog-editorial-grid">
              {POSTS.map((post, i) => (
                <AnimateIn key={post.slug} delay={i * 0.08}>
                  <Link href={`/blog/${post.slug}/`} className="group block dm-card overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300 blog-editorial-card">
                    <div className="relative overflow-hidden blog-editorial-card-image" style={{ height: "200px" }}>
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white blog-editorial-card-category">
                        <Tag size={10} />
                        {post.category}
                      </span>
                    </div>

                    <div className="p-6 flex flex-col flex-1 blog-editorial-card-body">
                      <div className="flex items-center gap-3 text-xs text-[#9BA3AF] mb-3 blog-editorial-card-meta">
                        <span>{formatDate(post.date)}</span>
                        <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                      </div>
                      <h2 className="text-base font-bold text-[#111315] mb-3 leading-snug group-hover:text-[#5B8CFF] transition-colors blog-editorial-card-title">
                        {post.title}
                      </h2>
                      <p className="text-sm text-[#5B6472] leading-relaxed flex-1 mb-4 blog-editorial-card-excerpt">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5B8CFF] group-hover:gap-2.5 transition-all blog-editorial-card-action">
                        Read article <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-spacing dark-section text-center blog-editorial-cta">
        <div className="container">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 blog-editorial-cta-heading"><span>Ready to get your</span><span><em>website built?</em></span></h2>
            <p className="text-lg text-[#94A3B8] mb-8 max-w-xl mx-auto blog-editorial-cta-copy">
              Stop reading and start growing. Get a free consultation and a clear quote within 24 hours.
            </p>
            <Link href="/contact/" className="btn-primary blog-editorial-cta-button">
              Get a Free Consultation <ArrowRight size={18} />
            </Link>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
