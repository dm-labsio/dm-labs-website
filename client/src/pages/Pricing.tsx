import { useSEO } from "@/hooks/useSEO";
import PricingPage from "@/components/pricing/PricingPage";

export default function Pricing() {
  useSEO({
    title: "Web Design Pricing | Website Cost & Packages | DM-Labs.io",
    description: "How much does a website cost? Explore clear web design pricing, website packages, and custom project costs from DM-Labs.io.",
  });
  return <PricingPage key="en" locale="en" />;
}
