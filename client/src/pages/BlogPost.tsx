import { usePricingCurrency } from "@/contexts/CurrencyContext";
import { absoluteImageUrl, ORGANIZATION_ID } from "@/lib/structuredData";
import { newestFirst } from "@/lib/blogOrder";
/* ============================================================
   D&M LABS - Blog Post Detail Page
   Brand: #5B8CFF→#6FE3FF→#8B5CFF gradient, #0F172A dark
   Clean long-form reading layout with SEO meta injection
   ============================================================ */
import { useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { getPostBySlug, POSTS } from "@/data/blogPosts";
import type { BlogPost as ArticleData } from "@/data/blogPosts";
import type { SiteLocale } from "@/lib/seoRoutes";
import { Clock, Tag, Calendar } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import "@/components/blog/BlogArticle.css";

function formatDate(dateStr: string, locale: SiteLocale) {
  return new Date(`${dateStr}T12:00:00Z`).toLocaleDateString({ en: "en-GB", el: "el-GR", he: "he-IL" }[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPost() {
  return <BlogArticle />;
}

export function BlogArticle({ article, locale = "en" }: { article?: ArticleData; locale?: SiteLocale }) {
  const { text: priceText } = usePricingCurrency(locale);
  const { slug } = useParams<{ slug: string }>();
  const post = article ?? getPostBySlug(slug);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const articlePath = post ? `${prefix}/blog/${post.slug}/` : undefined;
  const labels = {
    en: { by: "By", back: "Back to Blog", more: "More articles" },
    el: { by: "Από την", back: "Πίσω στα άρθρα", more: "Περισσότερα άρθρα" },
    he: { by: "מאת", back: "לכל המאמרים", more: "לכל המאמרים" },
  }[locale];

  // useSEO must be called unconditionally (Rules of Hooks)
  useSEO({
    title: post ? post.metaTitle : "Article | DM-Labs.io",
    description: post ? post.metaDescription : "Read the latest web design insights from DM-Labs.io.",
    ogImage: post ? post.coverImage : undefined,
    ogImageAlt: post?.imageAlt ?? post?.title,
    ogType: "article",
    canonicalPath: articlePath,
  });

  // Visible post metadata is serialized as BlogPosting during prerender.
  useEffect(() => {
    const SCHEMA_ID = "article-jsonld-schema";
    let el = document.getElementById(SCHEMA_ID) as HTMLScriptElement | null;

    if (post) {
      const isOrganisationAuthor = post.authorType === "Organization";
      const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "@id": `https://dm-labs.io${articlePath}#article`,
        "description": post.metaDescription,
        "image": absoluteImageUrl(post.coverImage),
        "datePublished": post.date,
        "dateModified": post.dateModified ?? post.date,
        "author": {
          "@type": isOrganisationAuthor ? "Organization" : "Person",
          "name": post.author ?? (isOrganisationAuthor ? "DM-Labs.io" : "Anastacia B."),
          ...(!isOrganisationAuthor ? {
            "jobTitle": "Creative Director & AI Specialist",
            "image": "https://dm-labs.io/media/manus/AtkkCmVLLZyIDtDx.webp"
          } : {})
        },
        "publisher": {
          "@id": ORGANIZATION_ID,
          "@type": "Organization",
          "name": "DM-Labs.io",
          "logo": {
            "@type": "ImageObject",
            "url": "https://dm-labs.io/dmlabs-logo.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://dm-labs.io${articlePath}`
        },
        "inLanguage": post.language ?? "en",
        ...(post.keywords?.length ? { "keywords": post.keywords.join(", ") } : {})
      };

      if (!el) {
        el = document.createElement("script");
        el.id = SCHEMA_ID;
        el.type = "application/ld+json";
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(schema);
    } else {
      if (el) el.remove();
    }

    return () => {
      const s = document.getElementById(SCHEMA_ID);
      if (s) s.remove();
    };
  }, [post, articlePath]);

  useEffect(() => {
    const SCHEMA_ID = "article-faq-jsonld-schema";
    let el = document.getElementById(SCHEMA_ID) as HTMLScriptElement | null;

    if (post?.faq?.length) {
      const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": post.faq.map(({ question, answer }) => ({
          "@type": "Question",
          "name": question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": answer,
          },
        })),
      };

      if (!el) {
        el = document.createElement("script");
        el.id = SCHEMA_ID;
        el.type = "application/ld+json";
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(schema);
    } else {
      el?.remove();
    }

    return () => {
      document.getElementById(SCHEMA_ID)?.remove();
    };
  }, [post]);

  const [, navigate] = useLocation();
  if (!post) {
    // Redirect to proper 404 so Google doesn't treat this as a Soft 404
    navigate("/404", { replace: true });
    return null;
  }

  return (
    <>
      {/* Hero / Cover */}
      <section className={`blog-article-hero${post.category === "Case Studies" || post.layout === "case-study" ? " blog-case-study-hero" : ""}`}>
        <div className="blog-article-cover">
          <picture className="blog-article-image">
            {post.coverImageMobile && (
              <source media="(max-width: 767px)" srcSet={post.coverImageMobile} />
            )}
            <img
              src={post.coverImage}
              alt={post.imageAlt ?? post.title}
              width={1672}
              height={941}
              loading="eager"
              fetchPriority="high"
              className="w-full h-full object-cover"
            />
          </picture>
          <div className="blog-article-shade absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(15,23,42,0.3) 0%, rgba(15,23,42,0.7) 100%)" }} />
          <div className="blog-article-heading">
            <div className="container">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white mb-4"
                  style={{ background: "linear-gradient(90deg, #5B8CFF, #8B5CFF)" }}>
                  <Tag size={10} />
                  {post.category}
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight max-w-3xl mb-4">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                  <span className="flex items-center gap-1.5"><Calendar size={13} /><time dateTime={post.date}>{formatDate(post.date, locale)}</time></span>
                  <span className="flex items-center gap-1.5"><Clock size={13} />{post.readTime}</span>
                  {(
                    <span className="flex items-center gap-1.5 font-medium text-white/90">
                      {labels.by} <bdi>{post.author ?? "Anastacia B."}</bdi>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            {/* Back link */}
            <Link href={`${prefix}/blog/`} className="inline-flex items-center gap-2 text-sm text-[#5B6472] hover:text-[#5B8CFF] transition-colors mb-10 font-medium">
               {labels.back}
            </Link>

            {/* Article content */}
            <div
              className="blog-content"
              ref={(el) => {
                if (!el) return;
                // Inject copy buttons into all .blog-code pre blocks
                el.querySelectorAll<HTMLElement>("pre.blog-code").forEach((pre) => {
                  if (pre.querySelector(".copy-prompt-btn")) return; // already injected
                  const code = pre.querySelector("code");
                  if (!code) return;
                  // Wrap in relative container if not already
                  pre.style.position = "relative";
                  const btn = document.createElement("button");
                  btn.className = "copy-prompt-btn";
                  btn.setAttribute("aria-label", "Copy prompt");
                  btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg><span>Copy</span>`;
                  btn.addEventListener("click", () => {
                    navigator.clipboard.writeText(code.innerText).then(() => {
                      const span = btn.querySelector("span");
                      if (span) { span.textContent = "Copied!"; btn.classList.add("copied"); }
                      setTimeout(() => {
                        if (span) { span.textContent = "Copy"; btn.classList.remove("copied"); }
                      }, 2000);
                    });
                  });
                  pre.appendChild(btn);
                });
              }}
              dangerouslySetInnerHTML={{ __html: post.content.replace(/<(p|tr) data-dm-prices>([\s\S]*?)<\/\1>/g, (_match, tag: string, content: string) => `<${tag}>${priceText(content)}</${tag}>`) }}
            />

            {/* Bottom back link */}
            <div className="mt-14 pt-8 border-t border-[#E2E5EA]">
              <Link href={`${prefix}/blog/`} className="inline-flex items-center gap-2 text-sm text-[#5B6472] hover:text-[#5B8CFF] transition-colors font-medium">
                 {labels.more}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {(() => {
        if (locale !== "en") return null;
        const related = newestFirst(POSTS).filter(
          (p) => p.slug !== post.slug && p.category === post.category
        ).slice(0, 2);
        const fallback = related.length < 2
          ? newestFirst(POSTS).filter((p) => p.slug !== post.slug && !related.includes(p)).slice(0, 2 - related.length)
          : [];
        const shown = newestFirst([...related, ...fallback]).slice(0, 2);
        if (shown.length === 0) return null;
        return (
          <section className="bg-[#F6F6F4] py-12 sm:py-16">
            <div className="container">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-lg font-bold text-[#111315] mb-6">Further Reading</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {shown.map((rel) => (
                    <Link key={rel.slug} href={`/blog/${rel.slug}/`}
                      className="group block bg-white rounded-2xl overflow-hidden border border-[#E8EAF0] hover:border-[#5B8CFF] transition-colors shadow-sm">
                      <div className="h-36 overflow-hidden">
                        <img src={rel.coverImage} alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="p-4">
                        <span className="text-xs font-semibold text-[#5B8CFF] uppercase tracking-wide">{rel.category}</span>
                        <h3 className="mt-1 text-sm font-bold text-[#111315] leading-snug group-hover:text-[#5B8CFF] transition-colors line-clamp-2">{rel.title}</h3>
                        <p className="mt-1 text-xs text-[#5B6472]">{rel.readTime}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })()}
    </>
  );
}
