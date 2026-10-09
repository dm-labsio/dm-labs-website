import { useSEO } from "@/hooks/useSEO";
import OurWorkPage from "@/components/work/OurWorkPage";

export default function Templates() {
  useSEO({
    title: "Our Work | Web Design & Branding | DM-Labs.io",
    description:
      "Explore website demos and brand identities by DM-Labs.io. Discover Hartley, AWAY and Sunday Boat through logos, illustration, packaging and more.",
    canonicalPath: "/templates/",
  });
  return <OurWorkPage locale="en" />;
}
