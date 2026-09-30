import { SEO_BASE_URL, type SiteLocale } from "./seoRoutes";
import { BUILD_PLANS, BUILD_PRICES } from "@/components/pricing/pricingContent";

export const ORGANIZATION_ID = `${SEO_BASE_URL}/#organization`;
export const WEBSITE_ID = `${SEO_BASE_URL}/#website`;
export const absoluteImageUrl = (image: string) => new URL(image, `${SEO_BASE_URL}/`).href;

export function pageSchema(url: string, title: string, description: string, locale: SiteLocale, image: string, imageAlt: string) {
  const path = new URL(url).pathname;
  const hasPackages = ["/", "/el/", "/he/", "/pricing/", "/el/pricing/", "/he/pricing/"].includes(path);
  return { "@context": "https://schema.org", "@graph": [
    {
      "@type": "Organization", "@id": ORGANIZATION_ID, name: "DM-Labs.io", alternateName: "DM-Labs",
      url: `${SEO_BASE_URL}/`, logo: `${SEO_BASE_URL}/dmlabs-logo.png`,
      telephone: "+35797472847", email: "info@dm-labs.io", areaServed: "Worldwide",
      sameAs: ["https://www.instagram.com/dm_labs.io/"],
      ...(hasPackages ? { hasOfferCatalog: {
        "@type": "OfferCatalog", name: "Website Packages", itemListElement: BUILD_PLANS[locale].map((plan, index) => ({
          "@type": "Offer", name: plan.name, price: BUILD_PRICES[index], priceCurrency: "EUR",
          url: `${SEO_BASE_URL}${locale === "en" ? "" : `/${locale}`}/pricing/`,
          description: plan.features.join(". "),
          itemOffered: { "@type": "Service", name: plan.name, provider: { "@id": ORGANIZATION_ID } },
        })),
      } } : {}),
    },
    { "@type": "WebSite", "@id": WEBSITE_ID, url: `${SEO_BASE_URL}/`, name: "DM-Labs.io", publisher: { "@id": ORGANIZATION_ID }, inLanguage: ["en", "el", "he"] },
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: title, description, inLanguage: locale,
      isPartOf: { "@id": WEBSITE_ID }, about: { "@id": ORGANIZATION_ID },
      primaryImageOfPage: { "@type": "ImageObject", url: absoluteImageUrl(image), caption: imageAlt },
    },
  ] };
}

export type SchemaFAQ = { q: string; a: string };
export function faqSchemaData(url: string, locale: SiteLocale, faqs: readonly SchemaFAQ[]) {
  return { "@type": "FAQPage", "@id": `${url}#faq`, url, inLanguage: locale,
    mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}

export function serviceSchemaData(url: string, locale: SiteLocale, name: string, description: string, faqs: readonly SchemaFAQ[]) {
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", "@id": `${url}#service`, url, name, description, serviceType: name,
      provider: { "@id": ORGANIZATION_ID }, areaServed: "Worldwide", mainEntityOfPage: { "@id": `${url}#webpage` } },
    ...(faqs.length ? [faqSchemaData(url, locale, faqs)] : []),
  ] };
}
