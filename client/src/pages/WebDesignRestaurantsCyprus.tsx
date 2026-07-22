import LocationPage from "@/components/LocationPage";

const packages = [
  { name: "Launch Website", price: "€299", features: ["Single-page restaurant site", "Responsive build", "Menu section", "WhatsApp and social links", "2 revision rounds"] },
  { name: "Growth Website", price: "€749", features: ["Up to 4 pages", "Online menu with categories", "Google Maps and reviews", "Basic SEO", "Search Console and Analytics setup", "3 revision rounds"] },
  { name: "Pro Website", price: "€1,499", features: ["Up to 7 pages", "Gallery and events section", "Booking integration or enquiry form", "Full SEO structure", "Blog setup or a website visual pack", "4 revision rounds"] },
];
const faqItems = [
  { question: "How much does a restaurant website cost in Cyprus?", answer: "dm-labs.io restaurant website packages start at €299 for a Launch Website. Growth Website packages start at €749 and Pro Website packages start at €1,499. Projects beyond the standard scope are quoted separately after a free consultation." },
  { question: "Can you build a website with an online menu?", answer: "Yes. A structured online menu with categories, descriptions, and photos can be included from the Growth package onwards. The scope and format are tailored to your restaurant." },
  { question: "Can customers book a table through the website?", answer: "Yes. Booking integrations or enquiry forms can be included in the Pro package or as part of an Enterprise / Custom scope, depending on the booking system and requirements." },
  { question: "Does every restaurant website include SEO?", answer: "Every package includes search-friendly foundations. The Pro package includes a fuller SEO structure, while advanced SEO work is quoted based on scope." },
  { question: "What makes a project Enterprise / Custom?", answer: "Enterprise / Custom applies to work beyond the standard package scope, such as integrations, multilingual websites, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, and unusual content volume." },
];
const schema = { "@context": "https://schema.org", "@graph": [{ "@type": "ProfessionalService", "@id": "https://dm-labs.io/web-design-restaurants-cyprus#professionalservice", "name": "dm-labs.io", "description": "dm-labs.io designs and builds professional websites for restaurants and food businesses across Cyprus.", "url": "https://dm-labs.io/web-design-restaurants-cyprus", "telephone": "+35797472847", "email": "info@dm-labs.io", "address": { "@type": "PostalAddress", "streetAddress": "Eleftheriou Chandrinou", "postalCode": "8045", "addressLocality": "Paphos", "addressCountry": "CY" }, "areaServed": [{ "@type": "Country", "name": "Cyprus" }], "priceRange": "€299-€1,499" }, { "@type": "FAQPage", "mainEntity": faqItems.map(i => ({ "@type": "Question", "name": i.question, "acceptedAnswer": { "@type": "Answer", "text": i.answer } })) }] };

export default function WebDesignRestaurantsCyprus() {
  return (
    <LocationPage
      seo={{ title: "Restaurant Website Design Cyprus | Packages from €299 | dm-labs.io", description: "Professional website design for restaurants and food businesses across Cyprus. Launch websites from €299, Growth from €749, Pro from €1,499.", canonicalPath: "/web-design-restaurants-cyprus" }}
      schemaId="schema-restaurants-cyprus" schema={schema}
      eyebrow="Restaurant Web Design · Cyprus"
      headline="Restaurant Websites" headlineAccent="that drive bookings"
      subheadline="Professional websites for restaurants, cafes, and food businesses across Cyprus."
      intro="dm-labs.io builds websites for restaurants and food businesses across Cyprus. A good restaurant website is clear on mobile, shows your menu and atmosphere, and makes it easy for customers to find you, book a table, or place an order."
      whoWeWorkWith={[
        ["Restaurants and Tavernas", "Full-service restaurants that need a professional website with menu, gallery, and booking."],
        ["Cafes and Coffee Shops", "Casual dining spots that need a simple, attractive website with location and hours."],
        ["Bars and Nightlife", "Bars and clubs that need a website showcasing their events, menu, and atmosphere."],
        ["Fast Food and Takeaway", "Quick-service restaurants that need a clear, mobile-first website with ordering information."],
        ["Hotels with Restaurants", "Hotel restaurants that need a dedicated food and beverage presence within the hotel website."],
        ["Catering and Events", "Catering businesses that need a website showcasing their services and portfolio."],
      ]}
      whatWeCanInclude={[
        ["Online Menu", "A structured, visual menu with categories, descriptions, and photos."],
        ["Table Booking", "Booking integrations or enquiry forms to capture reservations directly from your website."],
        ["Google Maps Integration", "Help customers find your location and build local search visibility."],
        ["Gallery and Atmosphere", "Showcase your food, your space, and your team with a clean visual layout."],
        ["Search Engine Foundations", "Clean structure, fast loading, and the technical basics Google needs to index your site."],
        ["WhatsApp and Social Links", "Make it easy for customers to reach you and follow you on social media."],
      ]}
      packages={packages} faqItems={faqItems}
      faqTitle="Restaurant Website FAQs"
      ctaHeadline="Ready to build a better restaurant website?"
      ctaBody="Tell us about your restaurant and we will recommend the right starting scope."
      ctaWaText="Hi dm-labs.io! I'd like a free consultation for my restaurant website in Cyprus."
    />
  );
}
