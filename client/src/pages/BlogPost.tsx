/* ============================================================
   D&M LABS - Blog Post Detail Page
   Brand: #5B8CFF→#6FE3FF→#8B5CFF gradient, #0F172A dark
   Clean long-form reading layout with SEO meta injection
   ============================================================ */
import { Link, useParams } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { getPostBySlug } from "@/data/blogPosts";
import { ArrowLeft, Clock, Tag, Calendar } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug);

  // useSEO must be called unconditionally (Rules of Hooks)
  useSEO({
    title: post ? post.metaTitle : "Article | D&M Labs",
    description: post ? post.metaDescription : "Read the latest web design insights from D&M Labs.",
    ogImage: post ? post.coverImage : undefined,
    ogType: "article",
    canonicalPath: post ? `/blog/${post.slug}` : undefined,
  });

  if (!post) {
    return (
      <div className="container py-32 text-center">
        <h1 className="text-3xl font-bold text-[#111315] mb-4">Article not found</h1>
        <Link href="/blog" className="text-[#5B8CFF] hover:underline font-medium">Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero / Cover */}
      <section className="relative overflow-hidden" style={{ paddingTop: "72px" }}>
        <div className="relative" style={{ height: "clamp(260px, 40vh, 420px)" }}>
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(15,23,42,0.3) 0%, rgba(15,23,42,0.7) 100%)" }} />
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="container pb-10">
              <AnimateIn>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white mb-4"
                  style={{ background: "linear-gradient(90deg, #5B8CFF, #8B5CFF)" }}>
                  <Tag size={10} />
                  {post.category}
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight max-w-3xl mb-4">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                  <span className="flex items-center gap-1.5"><Calendar size={13} />{formatDate(post.date)}</span>
                  <span className="flex items-center gap-1.5"><Clock size={13} />{post.readTime}</span>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            {/* Back link */}
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[#5B6472] hover:text-[#5B8CFF] transition-colors mb-10 font-medium">
              <ArrowLeft size={15} /> Back to Blog
            </Link>

            {/* Article content */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Bottom back link */}
            <div className="mt-14 pt-8 border-t border-[#E2E5EA]">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[#5B6472] hover:text-[#5B8CFF] transition-colors font-medium">
                <ArrowLeft size={15} /> More articles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
