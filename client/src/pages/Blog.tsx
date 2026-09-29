import { useSEO } from "@/hooks/useSEO";
import BlogIndex from "@/components/blog/BlogIndex";

export default function Blog() {
  useSEO({
    title: "Blog | Web Design Tips & Guides | DM-Labs.io",
    description: "Practical guides, honest advice, and web design insights for businesses worldwide.",
  });
  return <BlogIndex locale="en" />;
}
