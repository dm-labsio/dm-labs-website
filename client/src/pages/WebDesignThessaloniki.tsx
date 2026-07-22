import LocationPage from "@/components/LocationPage";

const packages = [
  { name: "Launch Website", price: "€299", features: ["Small one-page or light two-page site", "Responsive build", "Basic SEO foundations", "WhatsApp and social links", "2 revision rounds"] },
  { name: "Growth Website", price: "€749", features: ["Up to 4 pages", "Contact form", "Google Maps and reviews/testimonials", "Basic SEO", "Search Console and Analytics setup", "3 revision rounds"] },
  { name: "Pro Website", price: "€1,499", features: ["Up to 7 pages", "Gallery or portfolio", "Pop-up and scroll-driven animations", "Full SEO structure", "Blog setup or a website visual pack", "4 revision rounds"] },
];
const faqItems = [
  { question: "How much does web design cost in Thessaloniki?", answer: "dm-labs.io website packages start at €299 for a Launch Website. Growth Website packages start at €749 and Pro Website packages start at €1,499. Projects beyond the standard scope are quoted separately after a free consultation." },
  { question: "Do you work with Thessaloniki businesses remotely?", answer: "Yes. We work with businesses across Greece, including Thessaloniki, fully remotely. All communication, reviews, and approvals happen online, so location is not a barrier." },
  { question: "Can my Thessaloniki business website have multiple languages?", answer: "Yes. Multilingual functionality can be included in an Enterprise / Custom scope, depending on the languages, content volume, and editing requirements." },
  { question: "Does every website include SEO?", answer: "Every package includes search-friendly foundations. The Pro package includes a fuller SEO structure, while advanced SEO work is quoted based on scope." },
  { question: "What makes a project Enterprise / Custom?", answer: "Enterprise / Custom applies to work beyond the standard package scope, such as integrations, multilingual websites, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, and unusual content volume." },
];
const schema = { "@context": "https://schema.org", "@graph": [{ "@type": "ProfessionalService", "@id": "https://dm-labs.io/web-design-thessaloniki#professionalservice", "name": "dm-labs.io", "description": "dm-labs.io designs and builds professional, mobile-first websites for businesses in Thessaloniki and across Greece.", "url": "https://dm-labs.io/web-design-thessaloniki", "telephone": "+35797472847", "email": "info@dm-labs.io", "address": { "@type": "PostalAddress", "streetAddress": "Eleftheriou Chandrinou", "postalCode": "8045", "addressLocality": "Paphos", "addressCountry": "CY" }, "areaServed": [{ "@type": "City", "name": "Thessaloniki", "addressCountry": "GR" }, { "@type": "Country", "name": "Greece" }], "priceRange": "€299-€1,499" }, { "@type": "FAQPage", "mainEntity": faqItems.map(i => ({ "@type": "Question", "name": i.question, "acceptedAnswer": { "@type": "Answer", "text": i.answer } })) }] };

export default function WebDesignThessaloniki() {
  return (
    <LocationPage
      seo={{ title: "Web Design Thessaloniki | Website Packages from €299 | dm-labs.io", description: "Professional website design for businesses in Thessaloniki and across Greece. Launch websites from €299, Growth from €749, Pro from €1,499, plus custom website projects.", canonicalPath: "/web-design-thessaloniki" }}
      schemaId="schema-thessaloniki" schema={schema}
      eyebrow="Web Design · Thessaloniki, Greece"
      headline="Web Design in" headlineAccent="Thessaloniki"
      subheadline="Professional websites for businesses in Thessaloniki and across Greece."
      intro="dm-labs.io works with businesses across Greece, including Thessaloniki. We build websites with clear structure, professional visual identity, and search-friendly foundations tailored to each business."
      whoWeWorkWith={[
        ["Hospitality and Tourism", "Hotels, restaurants, and tourism businesses in Thessaloniki."],
        ["Retail and E-commerce", "Local shops and online stores looking to reach more customers in Thessaloniki and beyond."],
        ["Professional Services", "Accountants, lawyers, consultants, and clinics based in Thessaloniki."],
        ["Technology and Startups", "Tech companies and startups in Thessaloniki looking for a modern website."],
        ["Education and Training", "Schools, universities, and training providers that need an informative website."],
        ["Healthcare and Clinics", "Medical practices and wellness centres that need a professional website."],
      ]}
      whatWeCanInclude={[
        ["Mobile-first Responsive Design", "Your website works perfectly on every device, from phone to desktop."],
        ["Search Engine Foundations", "Clean structure, fast loading, and the technical basics Google needs to index your site."],
        ["Contact Forms and WhatsApp", "Make it easy for customers to reach you through the channels they prefer."],
        ["Google Maps Integration", "Help customers find your location and build local search visibility."],
        ["Gallery and Portfolio", "Showcase your work, your space, or your products with a clean visual layout."],
        ["Multilingual Support", "Reach English, Greek, and other language audiences with a properly structured multilingual site."],
      ]}
      packages={packages} faqItems={faqItems}
      faqTitle="Thessaloniki Web Design FAQs"
      ctaHeadline="Ready to build a better website?"
      ctaBody="Tell us about your Thessaloniki business and we will recommend the right starting scope."
      ctaWaText="Hi dm-labs.io! I'd like a free consultation for my Thessaloniki business."
    />
  );
}
