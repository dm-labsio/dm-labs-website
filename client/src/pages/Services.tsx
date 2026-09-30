import { useSEO } from "@/hooks/useSEO";
import ServicesPage from "@/components/studio/ServicesPage";

export default function Services() {
  useSEO({
    title: "Web Design Services for Business Growth | DM Labs",
    description: "Custom design, fast development, SEO foundations and ongoing care. Websites built to earn trust and help your business win more enquiries.",
  });
  return <ServicesPage locale="en" />;
}
