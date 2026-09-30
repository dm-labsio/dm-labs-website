import { useSEO } from "@/hooks/useSEO";
import BlogIndex from "@/components/blog/BlogIndex";

export default function Blog() {
  useSEO({
    title: "Άρθρα | Web Σχεδιασμός Tips & Guides | DM-Labs.io",
    description: "Πρακτικοί οδηγοί, ειλικρινείς συμβουλές και ιδέες web design για επιχειρήσεις παγκοσμίως.",
  });
  return <BlogIndex locale="el" />;
}
