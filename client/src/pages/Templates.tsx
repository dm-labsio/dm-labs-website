import { useSEO } from "@/hooks/useSEO";
import OurWorkPage from "@/components/work/OurWorkPage";

export default function Templates() {
  useSEO({
    title: "Our Work | Websites, Branding & Video | DM-Labs.io",
    description:
      "Explore websites, brand identities and promotional videos by DM-Labs.io. Watch brand films, social reels and campaigns for Hartley, AWAY and Sunday Boat.",
    canonicalPath: "/templates/",
  });
  return <OurWorkPage locale="en" />;
}
