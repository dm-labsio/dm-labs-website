import React, { useState } from "react";
import { Link } from "wouter";
import { POSTS } from "@/data/blogPosts";
import { POSTS_EL } from "@/data/blogPostsEl";
import { newestFirst } from "@/lib/blogOrder";
import "./BlogIndex.css";

type BlogLocale = "en" | "el";
type Article = { title: string; excerpt: string; category: string; date: string; readTime: string; coverImage: string; href: string };
export function blogArticles(locale: BlogLocale): Article[] {
  return newestFirst<Article>(locale === "en" ? POSTS.map(post => ({ ...post, href: `/blog/${post.slug}/` })) : POSTS_EL.map(post => ({ ...post, href: `/el/blog/${post.elSlug}/` })));
}
const searchable = (text: string) => text.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
export function filterArticles(articles: Article[], query: string): Article[] {
  const words = searchable(query).trim().split(/\s+/).filter(Boolean);
  return articles.filter(article => {
    const content = searchable(`${article.title} ${article.excerpt} ${article.category}`);
    return words.every(word => content.includes(word));
  });
}
const copy = {
  en: { label: "Resources and insights", title: "The DM-Labs.io Blog", intro: "Practical ideas for a website that works for your business.", search: "Search articles", placeholder: "Try SEO, design, or your industry", clear: "Clear search", read: "Read article", empty: "No articles match your search. Try another topic.", count: (n: number) => `${n} ${n === 1 ? "article" : "articles"}`, question: "A question about your website?", cta: "Get a free consultation" },
  el: { label: "Άρθρα και συμβουλές", title: "Το Blog της DM-Labs.io", intro: "Πρακτικές ιδέες για μια ιστοσελίδα που βοηθά την επιχείρησή σας.", search: "Αναζήτηση άρθρων", placeholder: "SEO, σχεδιασμός ή ο κλάδος σας", clear: "Καθαρισμός αναζήτησης", read: "Διαβάστε το άρθρο", empty: "Δεν βρέθηκαν άρθρα. Δοκιμάστε ένα άλλο θέμα.", count: (n: number) => `${n} ${n === 1 ? "άρθρο" : "άρθρα"}`, question: "Έχετε μια ερώτηση για την ιστοσελίδα σας;", cta: "Δωρεάν συμβουλευτική" },
};

export default function BlogIndex({ locale }: { locale: BlogLocale }) {
  const [query, setQuery] = useState("");
  const t = copy[locale];
  const articles = filterArticles(blogArticles(locale), query);
  return <div className="blog-index" lang={locale}>
    <header className="blog-index-header"><div className="container"><p className="brand-micro">{t.label}</p><h1>{t.title}</h1><p>{t.intro}</p></div></header>
    <section className="container blog-index-content" aria-label={t.label}>
      <div className="blog-index-tools"><div className="blog-index-search"><label htmlFor="article-search">{t.search}</label><input id="article-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t.placeholder} aria-controls="blog-articles" /></div><p role="status" aria-live="polite">{t.count(articles.length)}</p></div>
      <div id="blog-articles" className="blog-index-grid">{articles.map(post => <article key={post.href} className="blog-index-card"><Link href={post.href}>
        <img src={post.coverImage} alt="" width="600" height="360" loading="lazy" decoding="async" />
        <div className="blog-index-card-copy"><span className="blog-index-category">{post.category}</span><h2>{post.title}</h2><p className="blog-index-excerpt">{post.excerpt}</p><div className="blog-index-meta"><time dateTime={post.date}>{new Date(`${post.date}T12:00:00Z`).toLocaleDateString(locale === "el" ? "el-GR" : "en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}</time><span>{post.readTime}</span></div><span className="blog-index-read">{t.read}</span></div>
      </Link></article>)}</div>
      {!articles.length && <div className="blog-index-empty"><p>{t.empty}</p><button type="button" onClick={() => { setQuery(""); document.getElementById("article-search")?.focus(); }}>{t.clear}</button></div>}
      <aside className="blog-index-contact"><h2>{t.question}</h2><Link href={`${locale === "en" ? "" : "/el"}/contact/`}>{t.cta}</Link></aside>
    </section>
  </div>;
}
