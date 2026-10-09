import React, { useState } from "react";
import { Link } from "wouter";
import { POSTS } from "@/data/blogPosts";
import { POSTS_EL } from "@/data/blogPostsEl";
import { POSTS_HE } from "@/data/blogPostsHe";
import { newestFirst } from "@/lib/blogOrder";
import "./BlogIndex.css";

type BlogLocale = "en" | "el" | "he";
type Article = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
  imageAlt?: string;
  href: string;
};
export function blogArticles(locale: BlogLocale): Article[] {
  if (locale === "he")
    return newestFirst(
      POSTS_HE.map(post => ({ ...post, href: `/he/blog/${post.slug}/` }))
    );
  return newestFirst<Article>(
    locale === "en"
      ? POSTS.map(post => ({ ...post, href: `/blog/${post.slug}/` }))
      : POSTS_EL.map(post => ({ ...post, href: `/el/blog/${post.elSlug}/` }))
  );
}
const searchable = (text: string) =>
  text
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
export function filterArticles(articles: Article[], query: string): Article[] {
  const words = searchable(query).trim().split(/\s+/).filter(Boolean);
  return articles.filter(article => {
    const content = searchable(
      `${article.title} ${article.excerpt} ${article.category}`
    );
    return words.every(word => content.includes(word));
  });
}
const copy = {
  he: {
    label: "מאמרים ודוגמאות",
    title: "מדברים על אתרים",
    intro:
      "מה כדאי שיהיה באתר של העסק שלכם? כאן אנחנו מסבירים דרך אתרים שבנינו.",
    search: "חיפוש מאמרים",
    placeholder: "חפשו לפי נושא או סוג עסק",
    clear: "ניקוי החיפוש",
    read: "לקריאת המאמר",
    empty: "לא מצאנו מאמר שמתאים לחיפוש. אפשר לנסות נושא אחר.",
    count: (n: number) => (n === 1 ? "מאמר אחד" : `${n} מאמרים`),
    question: "יש לכם שאלה על האתר שלכם?",
    cta: "לשיחת ייעוץ בחינם",
  },
  en: {
    label: "Resources and insights",
    title: "The DM-Labs.io Blog",
    intro: "Practical ideas for a website that works for your business.",
    search: "Search articles",
    placeholder: "Try SEO, design, or your industry",
    clear: "Clear search",
    read: "Read article",
    empty: "No articles match your search. Try another topic.",
    count: (n: number) => `${n} ${n === 1 ? "article" : "articles"}`,
    question: "A question about your website?",
    cta: "Get a free consultation",
  },
  el: {
    label: "Άρθρα και συμβουλές",
    title: "Το Blog της DM-Labs.io",
    intro: "Πρακτικές ιδέες για μια ιστοσελίδα που βοηθά την επιχείρησή σας.",
    search: "Αναζήτηση άρθρων",
    placeholder: "SEO, σχεδιασμός ή ο κλάδος σας",
    clear: "Καθαρισμός αναζήτησης",
    read: "Διαβάστε το άρθρο",
    empty: "Δεν βρέθηκαν άρθρα. Δοκιμάστε ένα άλλο θέμα.",
    count: (n: number) => `${n} ${n === 1 ? "άρθρο" : "άρθρα"}`,
    question: "Έχετε μια ερώτηση για την ιστοσελίδα σας;",
    cta: "Δωρεάν συμβουλευτική",
  },
};

const browseCopy = {
  en: {
    all: "All topics",
    topics: "Browse by topic",
    preview: "Preview",
    close: "Close preview",
    latest: "Latest thinking",
    reset: "Show all articles",
  },
  el: {
    all: "Όλα τα θέματα",
    topics: "Ανά θέμα",
    preview: "Προεπισκόπηση",
    close: "Κλείσιμο",
    latest: "Οι τελευταίες ιδέες",
    reset: "Όλα τα άρθρα",
  },
  he: {
    all: "כל הנושאים",
    topics: "לפי נושא",
    preview: "הצצה למאמר",
    close: "סגירת התצוגה",
    latest: "הרעיונות האחרונים",
    reset: "לכל המאמרים",
  },
};
function ArticleMeta({ post, locale }: { post: Article; locale: BlogLocale }) {
  return (
    <div className="blog-index-meta">
      <time dateTime={post.date}>
        {new Date(`${post.date}T12:00:00Z`).toLocaleDateString(
          { en: "en-GB", el: "el-GR", he: "he-IL" }[locale],
          { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }
        )}
      </time>
      <span>{post.readTime}</span>
    </div>
  );
}

export default function BlogIndex({ locale }: { locale: BlogLocale }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("");
  const [selected, setSelected] = useState<string | null>(
    () => blogArticles(locale)[0]?.href || null
  );
  const [hovered, setHovered] = useState<string | null>(null);
  const t = copy[locale];
  const b = browseCopy[locale];
  const allArticles = blogArticles(locale);
  const topics = Array.from(new Set(allArticles.map(post => post.category)));
  const articles = filterArticles(allArticles, query).filter(
    post => !topic || post.category === topic
  );
  const active =
    articles.find(post => post.href === hovered) ||
    articles.find(post => post.href === selected) ||
    articles[0];
  const reset = () => {
    setQuery("");
    setTopic("");
    setSelected(null);
    setHovered(null);
  };
  const previewOnDesktop = (href: string) => {
    if (window.matchMedia("(min-width: 900px) and (hover: hover)").matches)
      setHovered(href);
  };
  return (
    <div
      className="blog-index"
      lang={locale}
      dir={locale === "he" ? "rtl" : "ltr"}
    >
      <header className="blog-index-header">
        <div className="container">
          <p className="brand-micro">{t.label}</p>
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
        </div>
      </header>
      <section className="container blog-index-content" aria-label={t.label}>
        <div className="blog-index-tools">
          <div className="blog-index-search">
            <label htmlFor="article-search">{t.search}</label>
            <input
              id="article-search"
              type="search"
              value={query}
              onChange={event => {
                setQuery(event.target.value);
                setSelected(null);
                setHovered(null);
              }}
              placeholder={t.placeholder}
              aria-controls="blog-articles"
            />
          </div>
          <p role="status" aria-live="polite">
            {t.count(articles.length)}
          </p>
        </div>
        <div className="blog-topics" role="group" aria-label={b.topics}>
          {["", ...topics].map(category => (
            <button
              key={category}
              type="button"
              aria-pressed={topic === category}
              onClick={() => {
                setTopic(category);
                setSelected(null);
                setHovered(null);
              }}
            >
              {category || b.all}
            </button>
          ))}
        </div>
        <div className="blog-editorial-layout">
          {active && (
            <aside className="blog-preview-stage" aria-label={b.latest}>
              <div className="blog-preview-art">
                <img
                  key={active.coverImage}
                  src={active.coverImage}
                  alt={active.imageAlt || active.title}
                  width="800"
                  height="900"
                  decoding="async"
                />
                <div className="blog-preview-caption" key={active.href}>
                  <span className="blog-index-category">{active.category}</span>
                  <p>{active.excerpt}</p>
                  <Link href={active.href} className="blog-preview-read">
                    {t.read}
                  </Link>
                </div>
              </div>
              <p className="blog-preview-footnote">{b.latest}</p>
            </aside>
          )}
          <div id="blog-articles" className="blog-article-list">
            {articles.map((post, index) => {
              const expanded = selected === post.href;
              const detailId = `blog-preview-${index}`;
              return (
                <article
                  key={post.href}
                  className="blog-index-card"
                  data-active={active?.href === post.href}
                  data-expanded={expanded}
                  onMouseEnter={() => previewOnDesktop(post.href)}
                  onFocus={() => previewOnDesktop(post.href)}
                >
                  <div className="blog-row-heading">
                    <div>
                      <span className="blog-index-category">
                        {post.category}
                      </span>
                      <h2>
                        <Link href={post.href}>{post.title}</Link>
                      </h2>
                      <ArticleMeta post={post} locale={locale} />
                    </div>
                    <button
                      className="blog-preview-toggle"
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={detailId}
                      aria-label={`${expanded ? b.close : b.preview}: ${post.title}`}
                      onClick={() => {
                        setSelected(expanded ? null : post.href);
                        setHovered(post.href);
                      }}
                    >
                      <img
                        src={post.coverImage}
                        alt={post.imageAlt || post.title}
                        width="100"
                        height="100"
                        loading="lazy"
                      />
                      <span>
                        {expanded ? b.close : b.preview}
                        <span aria-hidden="true">{expanded ? "−" : "+"}</span>
                      </span>
                    </button>
                  </div>
                  <div
                    className="blog-inline-preview"
                    id={detailId}
                    inert={!expanded}
                  >
                    <div>
                      <img
                        src={post.coverImage}
                        alt={post.imageAlt || post.title}
                        width="600"
                        height="360"
                        loading="lazy"
                        decoding="async"
                      />
                      <p>{post.excerpt}</p>
                      <Link className="blog-index-read" href={post.href}>
                        {t.read}
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
            {!articles.length && (
              <div className="blog-index-empty">
                <p>{t.empty}</p>
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    document.getElementById("article-search")?.focus();
                  }}
                >
                  {b.reset}
                </button>
              </div>
            )}
          </div>
        </div>
        <aside className="blog-index-contact">
          <h2>{t.question}</h2>
          <Link href={`${locale === "en" ? "" : `/${locale}`}/contact/`}>
            {t.cta}
          </Link>
        </aside>
      </section>
    </div>
  );
}
