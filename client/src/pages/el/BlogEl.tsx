import { useSEO } from "@/hooks/useSEO";
import BlogIndex from "@/components/blog/BlogIndex";

export default function Blog() {
  useSEO({
    title: "Άρθρα και οδηγοί για ιστοσελίδες και SEO | DM-Labs.io",
    description: "Πρακτικοί οδηγοί και ειλικρινείς συμβουλές για επιχειρήσεις: πόσο κοστίζει μια ιστοσελίδα, πώς να σας βρίσκουν στο Google και τι να ζητήσετε από έναν web designer.",
  });
  return <BlogIndex locale="el" />;
}
