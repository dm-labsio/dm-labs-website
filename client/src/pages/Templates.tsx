import { useSEO } from "@/hooks/useSEO";
import OurWorkPage from "@/components/work/OurWorkPage";

export default function Templates() {
  useSEO({
    title: "Our Work | Website Demos | DM-Labs.io",
    description:
      "Explore concept website designs by DM-Labs.io for restaurants, hospitality, salons, healthcare, architecture, and more. Explore the design possibilities for your brand.",
    canonicalPath: "/templates/",
  });
  return <OurWorkPage locale="en" />;
}
