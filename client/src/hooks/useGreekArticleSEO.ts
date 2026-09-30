import { POSTS_EL } from "@/data/blogPostsEl";
import { absoluteImageUrl, ORGANIZATION_ID } from "@/lib/structuredData";
import { useSEO } from "./useSEO";
import { useStructuredData } from "./useStructuredData";

export function useGreekArticleSEO(slug: string, options: {
  title: string; headline: string; description: string; ogImage: string; ogImageAlt: string;
}) {
  const post = POSTS_EL.find(item => item.elSlug === slug)!;
  const url = `https://dm-labs.io/el/blog/${slug}/`;
  useSEO({ ...options, canonicalPath: `/el/blog/${slug}/`, ogType: "article" });
  useStructuredData("article-jsonld-schema", {
    "@context": "https://schema.org", "@type": "BlogPosting", "@id": `${url}#article`, url,
    headline: options.headline, description: options.description,
    image: absoluteImageUrl(options.ogImage), inLanguage: "el", datePublished: post.date,
    author: { "@type": "Organization", "@id": ORGANIZATION_ID, name: "DM-Labs.io", url: "https://dm-labs.io/" },
    publisher: { "@id": ORGANIZATION_ID }, mainEntityOfPage: { "@id": `${url}#webpage` },
  });
  return post;
}
