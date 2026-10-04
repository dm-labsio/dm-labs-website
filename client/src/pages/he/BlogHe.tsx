import { useSEO } from "@/hooks/useSEO";
import BlogIndex from "@/components/blog/BlogIndex";

export default function BlogHe() {
  useSEO({
    title: "מאמרים על בניית אתרים | DM Labs",
    description: "מאמרים של DM Labs על בניית אתרים, עם דוגמאות מאתרים שבנינו והסברים על מה שחשוב לבדוק באתר של העסק שלכם.",
    canonicalPath: "/he/blog/",
  });
  return <BlogIndex locale="he" />;
}
