/* ============================================================
   D&M LABS - Service Detail Page
   Route: /services/:serviceId
   Not shown in navigation - linked from homepage service cards
   Brand: #5B8CFF→#6FE3FF→#8B5CFF, #F6F6F4 base, #0F172A dark
   ============================================================ */
import { Link, useParams } from "wouter";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import {
  Globe, Smartphone, Search, Zap, Shield, Clock,
  CheckCircle2, ArrowRight, ChevronLeft, MessageCircle,
  Monitor, BarChart2, Lock, MapPin, Gauge, Layers
} from "lucide-react";

const GRADIENT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/gradient-mesh-bg-nrkTNmAHHWeVJB3ubHRGDu.webp";
const TRIANGLE_GEO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/triangle-geometry-Rf9Cpg8ynqtbpdNzPsSccU.webp";
const DARK_CTA_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663382574925/j9EcpdbCqdDF7cpWiHVsmq/dark-cta-bg-LgZ8epcpi9XDGLof5Q9KgS.webp";

const SERVICES: Record<string, {
  id: string;
  icon: React.ElementType;
  accentColor: string;
  title: string;
  subtitle: string;
  intro: string;
  why: { heading: string; body: string }[];
  whatWeDeliver: string[];
  howItWorks: { step: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  relatedServices: string[];
}> = {
  "custom-design": {
    id: "custom-design",
    icon: Globe,
    accentColor: "#5B8CFF",
    title: "Custom Website Design",
    subtitle: "A website that looks and feels like your brand - not a template.",
    intro: "Every business is different. Your website should reflect that. We design every site from scratch, starting with your brand identity, your audience, and your goals. No page builders, no recycled layouts - just a thoughtfully crafted digital presence built specifically for you.",
    why: [
      { heading: "First impressions matter", body: "Visitors form an opinion about your business within 50 milliseconds of landing on your site. A generic template signals that you don't care about the details. A custom design signals professionalism, trust, and attention to quality." },
      { heading: "Your brand, not ours", body: "We study your logo, your colours, your tone of voice, and your competitors before writing a single line of code. The result is a website that feels like an extension of your business - not a website that could belong to anyone." },
      { heading: "Designed to convert", body: "Beautiful design is only half the job. We structure every page with conversion in mind - clear calls to action, logical information hierarchy, and friction-free paths to contact or purchase." },
    ],
    whatWeDeliver: [
      "Custom visual identity applied across all pages",
      "Unique layout designed around your content",
      "Brand-matched colour palette, typography, and iconography",
      "Hero sections, service cards, testimonials, and CTAs",
      "Custom illustrations or photography integration",
      "Consistent design language across desktop and mobile",
      "2 revision rounds included (Starter) / 3 rounds (Business) / 5 rounds (Premium)",
    ],
    howItWorks: [
      { step: "01", title: "Discovery", desc: "We start with a brief conversation to understand your business, your audience, and what you want visitors to do on your site." },
      { step: "02", title: "Moodboard & Direction", desc: "We present a visual direction - colour palette, typography, and layout style - for your approval before any code is written." },
      { step: "03", title: "Design & Build", desc: "We design and develop simultaneously, so you see a real working website, not a static mockup." },
      { step: "04", title: "Review & Refine", desc: "You review the site and request changes. We refine until you're happy, then launch." },
    ],
    faqs: [
      { q: "Do you use page builders like Wix or Squarespace?", a: "No. We write clean, hand-crafted code using React and modern web technologies. This gives you better performance, more flexibility, and no platform lock-in." },
      { q: "Can I provide my own design or branding?", a: "Absolutely. If you have an existing brand guide, logo, or design preferences, we'll work within those guidelines. If you don't, we'll help you develop a visual identity." },
      { q: "How many pages are included?", a: "The Starter plan is a 1-page landing site. The Business plan includes up to 5 pages, and the Premium plan includes up to 7 pages. Additional pages can be added for a small fee." },
      { q: "What if I want changes after launch?", a: "Minor updates are included in our maintenance plans. Larger redesigns are quoted separately." },
    ],
    relatedServices: ["mobile-first", "seo", "performance"],
  },
  "mobile-first": {
    id: "mobile-first",
    icon: Smartphone,
    accentColor: "#6FE3FF",
    title: "Mobile-First Development",
    subtitle: "Over 60% of web traffic is mobile. Your site needs to be perfect on every screen.",
    intro: "Mobile-first is not a feature we add at the end - it's how we build from the very beginning. Every layout, every button, every image is designed for a small screen first, then enhanced for larger displays. The result is a website that works flawlessly whether your customer is on a phone, a tablet, or a desktop.",
    why: [
      { heading: "Most of your visitors are on mobile", body: "Across most industries, 60–70% of website visitors arrive on a smartphone. If your site is slow, hard to navigate, or broken on mobile, you're losing the majority of your potential customers before they even read a word." },
      { heading: "Google ranks mobile-friendly sites higher", body: "Google uses mobile-first indexing, meaning it evaluates the mobile version of your site when deciding where to rank you in search results. A poor mobile experience directly hurts your SEO." },
      { heading: "Touch-friendly interactions", body: "Mobile users interact differently from desktop users. We design with touch in mind - larger tap targets, swipeable galleries, sticky navigation, and forms that work with mobile keyboards." },
    ],
    whatWeDeliver: [
      "Mobile-first layout architecture",
      "Responsive design across all screen sizes (320px to 2560px)",
      "Touch-optimised navigation and buttons",
      "Mobile-friendly forms and input fields",
      "Optimised images for fast mobile loading",
      "Tested on iOS Safari, Android Chrome, and major browsers",
      "No horizontal scrolling or layout breakage on any device",
    ],
    howItWorks: [
      { step: "01", title: "Mobile Layout First", desc: "We design the mobile layout before anything else, ensuring the core experience is perfect on the smallest screens." },
      { step: "02", title: "Progressive Enhancement", desc: "We then enhance the layout for tablets and desktops, adding more visual complexity where screen space allows." },
      { step: "03", title: "Cross-Device Testing", desc: "We test on real devices and emulators across iOS and Android to catch any layout issues before launch." },
      { step: "04", title: "Performance Validation", desc: "We run Lighthouse and PageSpeed tests on mobile to ensure fast load times on 4G and 5G connections." },
    ],
    faqs: [
      { q: "Does mobile-first mean it looks worse on desktop?", a: "Not at all. Mobile-first is a development methodology, not a design constraint. Desktop layouts are fully designed and often more visually rich than their mobile counterparts." },
      { q: "Which devices do you test on?", a: "We test on iPhone (Safari), Android (Chrome), iPad, and a range of desktop browsers including Chrome, Firefox, and Edge." },
      { q: "What about very old phones?", a: "We target devices running iOS 14+ and Android 8+, which covers over 95% of active mobile users." },
    ],
    relatedServices: ["custom-design", "performance", "seo"],
  },
  "seo": {
    id: "seo",
    icon: Search,
    accentColor: "#5B8CFF",
    title: "SEO Optimisation",
    subtitle: "Get found on Google. Attract customers who are already looking for what you offer.",
    intro: "Search Engine Optimisation (SEO) is the practice of making your website visible in Google search results. We build SEO into every website from day one - not as an afterthought. From clean code structure to keyword-rich content and fast load times, every technical decision we make has SEO in mind.",
    why: [
      { heading: "Organic traffic is free, forever", body: "Unlike paid advertising, a well-optimised website continues to attract visitors long after it's launched. Ranking on the first page of Google for your key services means a steady stream of potential customers finding you without spending a penny on ads." },
      { heading: "Local SEO for local businesses", body: "If you serve a specific city or region, local SEO is essential. We optimise your site for location-based searches (e.g. 'hair salon Tel Aviv' or 'physiotherapist Barcelona') so you appear when nearby customers are looking." },
      { heading: "Technical SEO from the ground up", body: "Many websites are built without any thought for SEO. We do the opposite - every page has a proper title, meta description, heading hierarchy, schema markup, and clean URL structure from the moment it goes live." },
    ],
    whatWeDeliver: [
      "SEO-friendly URL structure and page titles",
      "Meta descriptions for every page",
      "Proper heading hierarchy (H1, H2, H3)",
      "Schema markup (LocalBusiness, Service, FAQ)",
      "Image alt text and file naming",
      "XML sitemap and robots.txt",
      "Google Search Console setup",
      "Core Web Vitals optimisation",
      "Local SEO setup for location-based businesses",
    ],
    howItWorks: [
      { step: "01", title: "Keyword Research", desc: "We identify the search terms your target customers use and build your content strategy around them." },
      { step: "02", title: "On-Page Optimisation", desc: "Every page is structured with SEO best practices - titles, headings, content, and internal linking." },
      { step: "03", title: "Technical SEO", desc: "We ensure your site is fast, crawlable, and correctly indexed by Google." },
      { step: "04", title: "Search Console Setup", desc: "We connect your site to Google Search Console so you can monitor performance and fix issues over time." },
    ],
    faqs: [
      { q: "How long does SEO take to show results?", a: "SEO is a long-term investment. Most sites start seeing improvements within 3–6 months, with significant results after 6–12 months. We set up the foundation - ongoing content and link building accelerate results." },
      { q: "Do you offer ongoing SEO services?", a: "Our Premium Maintenance plan includes monthly SEO monitoring and minor optimisations. Full content marketing and link building campaigns are available as a separate service." },
      { q: "Will my site rank on Google immediately after launch?", a: "Google needs time to crawl and index your site. We submit your sitemap to Google Search Console at launch to speed up the process, but ranking takes time and depends on competition in your industry." },
    ],
    relatedServices: ["performance", "custom-design", "mobile-first"],
  },
  "performance": {
    id: "performance",
    icon: Zap,
    accentColor: "#8B5CFF",
    title: "Fast Performance",
    subtitle: "Every second of load time costs you customers. We make your site lightning fast.",
    intro: "Website speed is not just a technical metric - it directly affects how many visitors stay on your site, how many convert to customers, and how high you rank on Google. We obsess over performance at every stage of development, from how images are compressed to how JavaScript is loaded.",
    why: [
      { heading: "Speed affects conversions", body: "Research by Google shows that a 1-second delay in mobile load time can reduce conversions by up to 20%. A site that loads in under 2 seconds keeps visitors engaged. A site that takes 5 seconds loses most of them before the page even appears." },
      { heading: "Core Web Vitals and Google ranking", body: "Google uses Core Web Vitals - a set of speed and user experience metrics - as a ranking factor. A fast site ranks higher. A slow site is penalised, regardless of how good the content is." },
      { heading: "Better experience for everyone", body: "Fast sites feel professional. Slow sites feel broken. Performance is part of the brand experience, and we treat it that way." },
    ],
    whatWeDeliver: [
      "Optimised and compressed images (WebP format)",
      "Lazy loading for images and heavy components",
      "Minified CSS and JavaScript bundles",
      "Efficient code splitting and tree shaking",
      "CDN delivery for static assets",
      "Google Lighthouse score 90+ on performance",
      "Core Web Vitals passing (LCP, FID, CLS)",
      "Fast Time to First Byte (TTFB)",
    ],
    howItWorks: [
      { step: "01", title: "Asset Optimisation", desc: "All images are compressed and converted to modern formats (WebP). Videos are streamed, not embedded." },
      { step: "02", title: "Code Efficiency", desc: "We write lean, efficient code and remove any unused libraries or dependencies." },
      { step: "03", title: "Caching & CDN", desc: "Static assets are served from a CDN with aggressive caching to minimise load times globally." },
      { step: "04", title: "Performance Audit", desc: "Before launch, we run a full Lighthouse audit and fix any issues until scores are in the green." },
    ],
    faqs: [
      { q: "What Lighthouse scores do you target?", a: "We aim for 90+ on Performance, Accessibility, Best Practices, and SEO. Most of our sites score above 95 on desktop." },
      { q: "Does performance degrade over time?", a: "It can if new content is added carelessly. Our maintenance plans include monthly performance checks to ensure your site stays fast." },
      { q: "What about third-party scripts like chat widgets?", a: "Third-party scripts (chat, analytics, booking widgets) can slow down a site. We load them asynchronously and defer non-critical scripts to minimise their impact." },
    ],
    relatedServices: ["seo", "mobile-first", "security"],
  },
  "security": {
    id: "security",
    icon: Shield,
    accentColor: "#5B8CFF",
    title: "Secure & Reliable",
    subtitle: "SSL, secure hosting, and regular backups - your website protected around the clock.",
    intro: "A website that goes down, gets hacked, or shows a security warning in the browser is a business liability. We build security and reliability into every site we deliver - from SSL certificates and secure hosting to automated backups and uptime monitoring.",
    why: [
      { heading: "SSL is non-negotiable", body: "Every website we build includes an SSL certificate, which encrypts data between your visitors and your server. Without SSL, browsers display a 'Not Secure' warning that immediately destroys trust. With SSL, visitors see a padlock in the address bar - a signal that your site is safe." },
      { heading: "Downtime costs money", body: "If your website is down, customers can't find you, can't contact you, and can't book with you. We use reliable hosting infrastructure with 99.9% uptime guarantees and monitor your site on an ongoing basis." },
      { heading: "Backups protect your investment", body: "A single server failure or accidental deletion can wipe out your entire website. We maintain regular automated backups so your site can be restored quickly if anything goes wrong." },
    ],
    whatWeDeliver: [
      "SSL certificate (HTTPS) included on all plans",
      "Secure, managed hosting infrastructure",
      "Automated daily backups",
      "Uptime monitoring with instant alerts",
      "Security headers and CORS configuration",
      "Protection against common web vulnerabilities",
      "GDPR-compliant cookie consent and privacy policy",
      "Regular dependency and security updates (Maintenance plans)",
    ],
    howItWorks: [
      { step: "01", title: "Secure Hosting Setup", desc: "We deploy your site on enterprise-grade hosting with SSL, firewall, and DDoS protection." },
      { step: "02", title: "Backup Configuration", desc: "Automated daily backups are configured before launch, stored securely off-site." },
      { step: "03", title: "Monitoring Activation", desc: "Uptime monitoring is enabled so we're alerted immediately if your site goes offline." },
      { step: "04", title: "Ongoing Maintenance", desc: "Security patches and dependency updates are applied regularly as part of our maintenance plans." },
    ],
    faqs: [
      { q: "Is SSL included in all plans?", a: "Yes. Every website we build includes a free SSL certificate. There is no extra charge." },
      { q: "What happens if my site gets hacked?", a: "We restore from the most recent clean backup and investigate the cause. Our maintenance plans include priority support for security incidents." },
      { q: "Do you handle GDPR compliance?", a: "We include a cookie consent banner, privacy policy, and cookie policy on every site. For businesses that handle sensitive personal data, we recommend consulting a GDPR specialist for full compliance." },
    ],
    relatedServices: ["performance", "turnaround", "custom-design"],
  },
  "turnaround": {
    id: "turnaround",
    icon: Clock,
    accentColor: "#6FE3FF",
    title: "Quick Turnaround",
    subtitle: "From first conversation to live website in 5–10 business days.",
    intro: "We know that time is money. Waiting weeks or months for a website is not acceptable when your business needs an online presence now. Our streamlined process is designed to move fast without cutting corners - from the initial brief to a live, polished website in under two weeks.",
    why: [
      { heading: "Your business can't wait", body: "Every day without a professional website is a day you're losing customers to competitors who have one. We've built our entire process around speed - from how we gather requirements to how we deploy and launch." },
      { heading: "Speed without sacrifice", body: "Fast doesn't mean rushed. We've refined our workflow over dozens of projects to eliminate wasted time while maintaining the quality standards our clients expect. You get a fast turnaround and a beautiful result." },
      { heading: "Clear milestones, no surprises", body: "We give you a clear timeline at the start of every project. You know exactly when to expect the first preview, when to submit feedback, and when your site will go live." },
    ],
    whatWeDeliver: [
      "Project kickoff within 24 hours of payment",
      "First preview delivered within 3–5 business days",
      "Revisions completed within 1–2 business days",
      "Launch within 5–10 business days total",
      "Domain connection and DNS setup included",
      "Post-launch support for 7 days",
      "Clear communication throughout via WhatsApp",
    ],
    howItWorks: [
      { step: "Day 1", title: "Kickoff", desc: "We confirm all requirements, gather your content (logo, text, images), and begin design immediately." },
      { step: "Days 2–4", title: "Design & Build", desc: "We design and develop your site simultaneously. You receive a live preview link to review." },
      { step: "Days 5–7", title: "Revisions", desc: "You review the site and request changes. We implement all revisions within 24–48 hours." },
      { step: "Days 8–10", title: "Launch", desc: "Final approval, domain connection, SSL activation, and go-live. Your site is live." },
    ],
    faqs: [
      { q: "What do you need from me to get started?", a: "Your logo (or brand guidelines), the text content for each page, any photos you want to use, and your domain login details. We can help with content if needed." },
      { q: "What if I'm not ready with my content?", a: "We can start with placeholder content and swap in your real content before launch. This doesn't affect the timeline significantly." },
      { q: "Can you deliver faster than 5 days?", a: "For urgent projects, we offer an express service. Contact us to discuss your deadline and we'll do our best to accommodate." },
      { q: "What happens after launch?", a: "We provide 7 days of post-launch support to fix any issues. After that, our maintenance plans keep your site running smoothly." },
    ],
    relatedServices: ["custom-design", "security", "mobile-first"],
  },
};

const SERVICE_LABELS: Record<string, string> = {
  "custom-design": "Custom Website Design",
  "mobile-first": "Mobile-First Development",
  "seo": "SEO Optimisation",
  "performance": "Fast Performance",
  "security": "Secure & Reliable",
  "turnaround": "Quick Turnaround",
};

export default function ServiceDetailPage() {
  const params = useParams<{ serviceId: string }>();
  const serviceId = params.serviceId || "";
  const service = SERVICES[serviceId];

  if (!service) {
    return (
      <div className="container section-spacing text-center">
        <h1 className="text-3xl font-bold text-[#111315] mb-4">Service Not Found</h1>
        <p className="text-[#5B6472] mb-8">The service you're looking for doesn't exist.</p>
        <Link href="/services" className="btn-primary">
          View All Services
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const Icon = service.icon;
  const relatedServices = service.relatedServices
    .map((id) => ({ id, label: SERVICE_LABELS[id] }))
    .filter(Boolean);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 7rem)", paddingBottom: "clamp(3rem, 6vh, 5rem)" }}>
        <div className="absolute inset-0 z-0">
          <img src={GRADIENT_BG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" aria-hidden="true" />
        </div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-[0.05] pointer-events-none z-0">
          <img src={TRIANGLE_GEO} alt="" className="w-full h-full object-contain" aria-hidden="true" />
        </div>
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full blur-[100px] opacity-[0.07] pointer-events-none z-0" style={{ backgroundColor: service.accentColor }} />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <AnimateIn variant="fade-up" delay={0.05}>
            <Link href="/services" className="inline-flex items-center gap-1.5 text-sm text-[#5B6472] hover:text-[#5B8CFF] transition-colors mb-8">
              <ChevronLeft size={16} />
              Back to Services
            </Link>
          </AnimateIn>

          <div className="max-w-3xl">
            <AnimateIn variant="fade-up" delay={0.1}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ background: `${service.accentColor}15` }}>
                <Icon size={32} style={{ color: service.accentColor }} strokeWidth={1.75} />
              </div>
            </AnimateIn>
            <AnimateIn variant="fade-up" delay={0.2}>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-4 leading-tight">
                {service.title}
              </h1>
            </AnimateIn>
            <AnimateIn variant="fade-up" delay={0.3}>
              <p className="text-xl text-[#5B6472] mb-6 leading-relaxed">{service.subtitle}</p>
            </AnimateIn>
            <AnimateIn variant="fade-up" delay={0.4}>
              <p className="text-base text-[#5B6472] leading-relaxed max-w-2xl">{service.intro}</p>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── Why It Matters ── */}
      <section className="section-spacing bg-white">
        <div className="container">
          <AnimateIn className="mb-12">
            <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Why It Matters</p>
            <h2 className="text-3xl font-bold text-[#111315]">The case for getting this right</h2>
          </AnimateIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.why.map((item, i) => (
              <StaggerItem key={i}>
                <div className="dm-card h-full">
                  <div className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center" style={{ background: `${service.accentColor}15` }}>
                    <span className="text-sm font-bold" style={{ color: service.accentColor }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#111315] mb-3">{item.heading}</h3>
                  <p className="text-sm text-[#5B6472] leading-relaxed">{item.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── What We Deliver ── */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <img src={GRADIENT_BG} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateIn>
              <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">What We Deliver</p>
              <h2 className="text-3xl font-bold text-[#111315] mb-6">Everything included, no extras</h2>
              <p className="text-base text-[#5B6472] leading-relaxed mb-8">
                Every item below is included in your website project. No hidden fees, no optional add-ons that should be standard.
              </p>
              <Link href="/contact" className="btn-primary">
                Start Your Project
                <ArrowRight size={16} />
              </Link>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <ul className="space-y-3">
                {service.whatWeDeliver.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: service.accentColor }} />
                    <span className="text-sm text-[#111315] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section-spacing bg-white">
        <div className="container">
          <AnimateIn className="text-center mb-12">
            <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">The Process</p>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">How we deliver this service</h2>
          </AnimateIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.howItWorks.map((item, i) => (
              <StaggerItem key={i}>
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5" style={{ background: `${service.accentColor}12` }}>
                    <span className="text-sm font-bold" style={{ color: service.accentColor }}>{item.step}</span>
                  </div>
                  <h3 className="text-base font-semibold text-[#111315] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#5B6472] leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <img src={GRADIENT_BG} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        <div className="container relative z-10 max-w-3xl mx-auto">
          <AnimateIn className="text-center mb-12">
            <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Common Questions</p>
            <h2 className="text-3xl font-bold text-[#111315]">Frequently Asked Questions</h2>
          </AnimateIn>
          <StaggerContainer className="space-y-4">
            {service.faqs.map((faq, i) => (
              <StaggerItem key={i}>
                <div className="dm-card">
                  <h3 className="text-base font-semibold text-[#111315] mb-3">{faq.q}</h3>
                  <p className="text-sm text-[#5B6472] leading-relaxed">{faq.a}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Related Services ── */}
      {relatedServices.length > 0 && (
        <section className="section-spacing bg-white">
          <div className="container">
            <AnimateIn className="text-center mb-10">
              <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Also Included</p>
              <h2 className="text-3xl font-bold text-[#111315]">Related Services</h2>
            </AnimateIn>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {relatedServices.map((rel) => (
                <StaggerItem key={rel.id}>
                  <Link href={`/services/${rel.id}`}>
                    <div className="dm-card text-center cursor-pointer hover:border-[#5B8CFF]/40 hover:-translate-y-1 transition-all duration-300">
                      <p className="text-sm font-semibold text-[#111315] mb-1">{rel.label}</p>
                      <span className="text-xs text-[#5B8CFF] inline-flex items-center gap-1 justify-center">
                        Learn more <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ background: "#0F172A" }}>
          <img src={DARK_CTA_BG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" aria-hidden="true" />
        </div>
        <div className="container relative z-10 section-spacing text-center">
          <AnimateIn>
            <p className="text-sm font-medium text-[#6FE3FF] mb-4 tracking-wide uppercase">Ready to Get Started?</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 max-w-2xl mx-auto leading-tight">
              Let's build your website with {service.title} built in from day one.
            </h2>
            <p className="text-base text-[#94A3B8] mb-10 max-w-lg mx-auto">
              No commitment, no pressure. Get in touch and we'll discuss your project within hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary !h-14 !text-base !px-8">
                <MessageCircle size={20} />
                Get in Touch
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-8 h-14 rounded-xl border-2 border-white/20 text-white font-semibold hover:border-white/40 transition-all duration-300 text-base">
                View Pricing
                <ArrowRight size={18} />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
