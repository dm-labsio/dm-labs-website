import type { SiteLanguage } from "@/lib/routeLanguage";
import { SERVICE_FEATURE_EL, SERVICE_FEATURE_HE } from "./serviceFeatureLocales";
import { FOUNDATION_FEATURES } from "./serviceFoundationContent";

export const REFRESHED_SERVICES = ["custom-design", "mobile-first", "performance", "seo", "security", "turnaround"] as const;
export type RefreshedService = typeof REFRESHED_SERVICES[number];
export type FoundationService = "seo" | "security" | "turnaround";
export type DesignService = Exclude<RefreshedService, FoundationService>;
export const isFoundationService = (id: RefreshedService): id is FoundationService => id === "seo" || id === "security" || id === "turnaround";
export const isRefreshedService = (id: string): id is RefreshedService => REFRESHED_SERVICES.some(value => value === id);
export type ServiceFeature = {
  name: string; title: [string, string]; lead: string; intro: string;
  principles: readonly [string, string][];
  deliverables: readonly string[];
  faqs: readonly { q: string; a: string }[];
};

const en: Record<DesignService, ServiceFeature> = {
  "custom-design": {
    name: "Custom Website Design", title: ["Built around", "your business."], lead: "A clear voice. A considered look. A website that feels like you from the first scroll.",
    intro: "Your brand, your audience and your goals shape the design. We turn them into a visual direction and a working website, with clear opportunities for you to review the work.",
    principles: [
      ["Make the first impression count.", "Give visitors a clear sense of who you are and what you offer. Thoughtful type, imagery and spacing help your story come through."],
      ["Keep your brand at the centre.", "Your logo, colours and tone guide the work. We look at your audience and market to find a direction that belongs to your business."],
      ["Give every page a purpose.", "A useful reading order and clear calls to action help visitors find what they need and take the next step."],
    ],
    deliverables: ["A visual direction applied across the agreed pages", "Layouts shaped around your content", "Brand-matched colour and typography", "Hero, service, testimonial and enquiry sections where included in your scope", "Placement of your imagery, with custom illustration quoted where needed", "A consistent design language on mobile and desktop", "2 revision rounds for Launch, 3 for Growth and 4 for Pro"],
    faqs: [
      { q: "Do you use page builders?", a: "Our standard builds use React and modern web technologies. We agree any CMS or editing requirements before starting, including licences and handover arrangements." },
      { q: "Can I provide my own design or branding?", a: "Yes. Share your brand book, logo and references. We can apply an existing identity or agree a new visual direction. A full branding project is scoped and quoted separately." },
      { q: "How many pages and revisions are included?", a: "Launch includes a small one-page or light two-page site and 2 revision rounds. Growth includes up to 4 pages and 3 rounds; Pro includes up to 7 pages and 4 rounds. Additional pages or rounds are quoted separately." },
      { q: "Can we make changes after launch?", a: "Yes. Small content updates are covered within your care plan’s limits. New pages, new features and larger redesigns are quoted separately. Hosting and care continue while we manage your website." },
    ],
  },
  "mobile-first": {
    name: "Mobile-First Development", title: ["Small screen.", "Full experience."], lead: "Your message should feel just as clear in someone’s hand as it does on a desktop.",
    intro: "We start with the essentials on a small screen: what to read, where to go and how to get in touch. Then we adapt the composition for tablets and larger displays.",
    principles: [
      ["Focus on what matters.", "Prioritise the content people need. Readable text and clear navigation help them find their way on a smaller screen."],
      ["Keep the same useful content.", "Google uses the mobile version of your content for indexing and ranking. We keep important content and search information available across screen sizes."],
      ["Design for a tap.", "Considered touch targets, navigation and mobile keyboards make everyday actions easier. Your site should work without relying on a hover."],
    ],
    deliverables: ["Layouts planned for small screens first", "Responsive compositions for phones, tablets and desktop", "Touch-friendly navigation and buttons", "Mobile-friendly forms when included in your package", "Images sized for the screen and loading context", "Checks across agreed browsers and representative screen sizes", "Checks for overflow, readable type and usable controls"],
    faqs: [
      { q: "Will the desktop version feel less considered?", a: "No. Desktop gets its own composition, for larger screens. The content and brand stay consistent while the layout adapts." },
      { q: "Which devices and browsers do you support?", a: "We agree a testing scope for your project, covering current mobile and desktop browsers such as Safari and Chrome, plus other browsers your audience needs. Responsive browser checks and physical-device checks are distinct parts of that scope." },
      { q: "What about older phones?", a: "Tell us if older devices are important to your audience. We agree supported browsers and practical fallbacks before building, and keep the core content accessible when optional effects are unavailable." },
    ],
  },
  performance: {
    name: "Fast Performance", title: ["Less waiting.", "More doing."], lead: "Let people get to your story, explore your work and take the next step without unnecessary friction.",
    intro: "Performance is part of the experience. We consider how a page loads, how it responds and whether the layout stays steady, from the first image to the final enquiry.",
    principles: [
      ["Show the important parts first.", "Give the main content priority. Responsive images and considered loading help people reach the page sooner."],
      ["Respond when people act.", "Keep interactions responsive by reviewing the code and third-party tools that run on the page."],
      ["Keep the page steady.", "Set dimensions for media and consider font loading so content is less likely to jump while someone is reading or tapping."],
    ],
    deliverables: ["Compressed, appropriately sized images in modern formats such as WebP", "Deferred loading for suitable offscreen media", "Review of CSS, JavaScript and unused dependencies", "Code splitting where it benefits the experience", "CDN and caching suited to the content", "Lighthouse and PageSpeed checks with documented findings", "Review of loading, responsiveness and layout stability: LCP, INP and CLS", "Review of server response and third-party loading"],
    faqs: [
      { q: "What Lighthouse score do you target?", a: "We aim for strong results and address the most useful improvements. A specific score is not guaranteed: content, third-party services, device and test conditions all matter. Lab scores and real-user experience are different measures." },
      { q: "Can performance change after launch?", a: "Yes. New images, content and integrations can affect it. Complete Care includes a monthly performance check. Larger optimisation work is agreed separately; see the care plans for their full scope." },
      { q: "What about chat, analytics and booking tools?", a: "We review the tools your site needs and load non-critical scripts appropriately, respecting consent where needed. Some third-party code remains outside our control, so we discuss its impact alongside its value." },
    ],
  },
};

export const SERVICE_FEATURES: Record<SiteLanguage, Record<RefreshedService, ServiceFeature>> = { en: { ...en, ...FOUNDATION_FEATURES.en }, el: { ...SERVICE_FEATURE_EL, ...FOUNDATION_FEATURES.el }, he: { ...SERVICE_FEATURE_HE, ...FOUNDATION_FEATURES.he } };
export const SERVICE_RELATED: Record<RefreshedService, readonly string[]> = { "custom-design": ["mobile-first", "seo", "performance"], "mobile-first": ["custom-design", "performance", "seo"], performance: ["seo", "mobile-first", "security"], seo: ["performance", "custom-design", "mobile-first"], security: ["performance", "turnaround", "custom-design"], turnaround: ["custom-design", "security", "mobile-first"] };
export const SERVICE_NAMES: Record<SiteLanguage, Record<string, string>> = {
  en: { "custom-design": "Custom design", "mobile-first": "Mobile-first", seo: "Search foundations", performance: "Performance", security: "Security", turnaround: "Delivery", maps: "Maps", forms: "Contact forms", social: "Social connections" },
  el: { "custom-design": "Ιστοσελίδα στα μέτρα σας", "mobile-first": "Άψογη προσαρμογή σε κινητά", seo: "Εμφάνιση στο Google (SEO)", performance: "Ταχύτητα φόρτωσης", security: "Ασφάλεια και φροντίδα", turnaround: "Γρήγορη παράδοση", maps: "Google Maps και τοποθεσία", forms: "Φόρμες επικοινωνίας", social: "Social media και WhatsApp" },
  he: { "custom-design": "עיצוב אתרים בהתאמה אישית", "mobile-first": "התאמה מושלמת למובייל", seo: "קידום אורגני (SEO)", performance: "מהירות טעינה", security: "אבטחה ותחזוקה", turnaround: "עולים לאוויר מהר", maps: "מפה ומיקום", forms: "טפסי יצירת קשר", social: "רשתות חברתיות ו־WhatsApp" },
};

export const serviceFeatureRoute = (locale: SiteLanguage, id: string) => `${locale === "en" ? "" : `/${locale}`}/services/${id}/`;
export function serviceFeatureSchema(locale: SiteLanguage, id: RefreshedService) {
  const t = SERVICE_FEATURES[locale][id];
  const url = `https://dm-labs.io${serviceFeatureRoute(locale, id)}`;
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", "@id": `${url}#service`, name: t.name, description: t.intro, serviceType: t.name, url, provider: { "@id": "https://dm-labs.io/#organization" }, areaServed: "Worldwide" },
    { "@type": "FAQPage", inLanguage: locale, mainEntity: t.faqs.map(faq => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) },
  ] };
}
