import PackageOverview from "@/components/pricing/PackageOverview";
import ServiceFeaturePage from "@/components/services/ServiceFeaturePage";
import { isRefreshedService } from "@/components/services/serviceFeatureContent";
/* ============================================================
   D&M LABS - Service Detail Page
   Route: /services/:serviceId
   Not shown in navigation - linked from homepage service cards
   Brand: #5B8CFF→#6FE3FF→#8B5CFF, #F6F6F4 base, #0F172A dark
   ============================================================ */
import StarButton from "@/components/ui/star-button";
import { Link, useParams } from "wouter";
import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import { Globe, Smartphone, Search, Zap, Shield, Clock, CheckCircle2, MessageCircle, Monitor, BarChart2, Lock, MapPin, Gauge, Layers, FileText, Share2 } from "lucide-react";

const GRADIENT_BG = "/media/cloudfront/gradient-mesh-bg-nrkTNmAHHWeVJB3ubHRGDu.webp";
const TRIANGLE_GEO = "/media/cloudfront/triangle-geometry-Rf9Cpg8ynqtbpdNzPsSccU.webp";
const DARK_CTA_BG = "/media/cloudfront/dark-cta-bg-LgZ8epcpi9XDGLof5Q9KgS.webp";

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
  "maps": {
    id: "maps",
    icon: MapPin,
    accentColor: "#5B8CFF",
    title: "Google Maps & Location",
    subtitle: "Help customers find you instantly, embedded maps and location info on every page.",
    intro: "For businesses with a physical presence, Google Maps integration isn’t just useful; it’s essential. We embed interactive maps, turn-by-turn directions, and location details so customers can find you with a single tap.",
    why: [
      { heading: "Remove friction from finding you", body: "If a customer has to copy your address into another app, you’ve already lost them. An embedded map allows one-click navigation, especially important for mobile users on the go." },
      { heading: "Boost your local SEO", body: "Correct Google Maps integration, combined with Google Business Profile, strengthens your presence in local search results. Appear in Google’s ‘Local Pack’, the three businesses shown first in local searches." },
      { heading: "Trust and professionalism", body: "A site with clear location info and an embedded map shows your business is real, established, and easy to reach. This builds trust before the customer even visits." },
    ],
    whatWeDeliver: [
      "Interactive Google Maps embed",
      "\u2018Get Directions\u2019 button with direct Google Maps link",
      "Address, opening hours, and phone number display",
      "Google Business Profile connection",
      "LocalBusiness schema markup for SEO",
      "Mobile-optimised: one-tap navigation",
    ],
    howItWorks: [
      { step: "01", title: "Location Setup", desc: "We confirm your address, opening hours, and contact details for accurate display." },
      { step: "02", title: "Map Embed", desc: "We embed an interactive Google Maps widget on your contact page or footer." },
      { step: "03", title: "Schema Markup", desc: "We add LocalBusiness structured data so Google correctly understands and displays your location info." },
      { step: "04", title: "Mobile Testing", desc: "We verify the map loads fast and navigation works seamlessly on iOS and Android." },
    ],
    faqs: [
      { q: "Do I need a Google Business account?", a: "We strongly recommend having one. It’s free and significantly boosts your local visibility on Google. We can guide you through setting it up." },
      { q: "Does the map work on mobile?", a: "Yes. The embedded map automatically opens the Google Maps app on mobile for instant navigation." },
      { q: "Can I show multiple locations?", a: "Yes. If you have multiple branches or locations, we can display all of them on a single map." },
    ],
    relatedServices: ["seo", "custom-design", "forms"],
  },
  "forms": {
    id: "forms",
    icon: FileText,
    accentColor: "#6FE3FF",
    title: "Contact Forms",
    subtitle: "Professional forms that turn visitors into enquiries, delivered straight to your inbox.",
    intro: "A well-designed contact form is one of the most important conversion tools on your website. We build forms that are easy to complete, secure, and send enquiries directly to your email, so you never miss a potential client.",
    why: [
      { heading: "Convert visitors into leads", body: "A contact form is the bridge between an interested visitor and a new client. We design forms that are simple, clear, and encourage completion, without unnecessary fields that put users off." },
      { heading: "Receive enquiries instantly", body: "Every form submission sends an automatic email to your inbox with all the client’s details. No dashboard to check. Enquiries come straight to you." },
      { heading: "Professional image", body: "A contact form on your website shows you’re organised and professional. Unlike a plain email link, a form collects the right information from the start." },
    ],
    whatWeDeliver: [
      "Custom contact form with the fields you need",
      "Real-time email delivery to your inbox",
      "Success confirmation message for the user",
      "Spam protection (honeypot and rate limiting)",
      "Mobile-friendly forms",
      "Optional: booking or appointment form",
    ],
    howItWorks: [
      { step: "01", title: "Form Design", desc: "We agree on which fields you need: name, email, phone, message, or anything else." },
      { step: "02", title: "Integration", desc: "We build the form into your site with proper validation and error messages." },
      { step: "03", title: "Email Setup", desc: "We connect the form to your email so every submission arrives instantly in your inbox." },
      { step: "04", title: "Testing", desc: "We test the form fully before launch, including mobile testing." },
    ],
    faqs: [
      { q: "Which email do submissions go to?", a: "Whichever email you provide. You can also set multiple recipients if you want enquiries going to different people." },
      { q: "Can I have different forms for different services?", a: "Yes. We can create separate forms for different pages or services, each with different fields and recipients." },
      { q: "What about spam?", a: "We use anti-spam techniques (honeypot fields, rate limiting) to minimise unwanted messages without affecting the user experience." },
    ],
    relatedServices: ["custom-design", "mobile-first", "maps"],
  },
  "social": {
    id: "social",
    icon: Share2,
    accentColor: "#8B5CFF",
    title: "Social Media Integration",
    subtitle: "Connect your website to your social media and turn visitors into followers and clients.",
    intro: "Social media is where your clients are. Your website should lead them there and vice versa. We integrate your social media into every website, from footer icons to live Instagram feeds and share buttons, creating a cohesive digital presence.",
    why: [
      { heading: "Amplify your reach", body: "Every website visitor is a potential follower. With clear, visible social media icons and CTAs, you turn a one-time visit into a long-term relationship with your audience." },
      { heading: "Social proof", body: "Showing your follower count or live Instagram posts signals that your business is active and trustworthy. Social proof is one of the most powerful trust factors online." },
      { heading: "Cohesive digital presence", body: "When your website and social media are connected, you create a unified brand ecosystem. Clients can find you, follow you, and engage with you from anywhere." },
    ],
    whatWeDeliver: [
      "Social media icons in header, footer, and contact page",
      "Links to Instagram, Facebook, TikTok, LinkedIn, YouTube",
      "Optional: live Instagram feed embedded on the site",
      "Share buttons for blog posts and content",
      "WhatsApp click-to-chat button for instant contact",
      "Consistent branding between website and social media",
    ],
    howItWorks: [
      { step: "01", title: "Profile Gathering", desc: "You provide links to all the social media profiles you want displayed." },
      { step: "02", title: "Integration", desc: "We place icons and links in the right spots: header, footer, contact page." },
      { step: "03", title: "WhatsApp & Direct Contact", desc: "We set up a WhatsApp click-to-chat button so clients can reach you with one click." },
      { step: "04", title: "Link Testing", desc: "We verify all links open correctly on desktop and mobile before launch." },
    ],
    faqs: [
      { q: "Which social media platforms do you support?", a: "Instagram, Facebook, TikTok, LinkedIn, YouTube, X (Twitter), Pinterest, and WhatsApp. If you use another platform, let us know." },
      { q: "Can I have a live Instagram feed?", a: "Yes. We can embed a live Instagram feed that shows your latest posts directly on the site. It requires connecting your account." },
      { q: "What if I change my username?", a: "Just let us know and we’ll update the links. If you have a maintenance plan, this is covered at no extra charge." },
    ],
    relatedServices: ["custom-design", "forms", "turnaround"],
  },
};

const SERVICE_LABELS: Record<string, string> = {
  "custom-design": "Custom Website Design",
  "mobile-first": "Mobile-First Development",
  "seo": "SEO Optimisation",
  "performance": "Fast Performance",
  "security": "Secure & Reliable",
  "turnaround": "Quick Turnaround",
  "maps": "Google Maps & Location",
  "forms": "Contact Forms",
  "social": "Social Media Integration",
};

export default function ServiceDetailPage() {
  const { serviceId = "" } = useParams<{ serviceId: string }>();
  return isRefreshedService(serviceId)
    ? <ServiceFeaturePage key={serviceId} locale="en" serviceId={serviceId} />
    : <LegacyServiceDetailPage />;
}

function LegacyServiceDetailPage() {
  const params = useParams<{ serviceId: string }>();
  const serviceId = params.serviceId || "";
  const service = SERVICES[serviceId];
  useSEO({
    title: service ? `${service.title} | DM-Labs.io` : "Service | DM-Labs.io",
    description: service ? service.intro: "Professional web design services. Custom websites built fast, built right.",
  });

  useEffect(() => {
    const schemaId = "service-jsonld-schema";
    if (!service) {
      document.getElementById(schemaId)?.remove();
      return;
    }
    const existing = document.getElementById(schemaId);
    const serviceUrl = `https://dm-labs.io/services/${service.id}/`;
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": `${serviceUrl}#service`,
          "name": service.title,
          "description": service.intro,
          "serviceType": service.title,
          "url": serviceUrl,
          "provider": { "@id": "https://dm-labs.io/#professionalservice" },
          "areaServed": "Worldwide",
        },
        {
          "@type": "FAQPage",
          "mainEntity": service.faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a },
          })),
        },
      ],
    };
    const script = existing instanceof HTMLScriptElement ? existing : document.createElement("script");
    script.id = schemaId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    if (!existing) document.head.appendChild(script);
    return () => document.getElementById(schemaId)?.remove();
  }, [service]);

  if (!service) {
    return (
      <div className="container section-spacing text-center">
        <h1 className="text-3xl font-bold text-[#111315] mb-4">Service Not Found</h1>
        <p className="text-[#5B6472] mb-8">The service you're looking for doesn't exist.</p>
        <StarButton asChild><Link href="/services/" className="btn-primary">
          View All Services

        </Link></StarButton>
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
            <Link href="/services/" className="inline-flex items-center gap-1.5 text-sm text-[#5B6472] hover:text-[#5B8CFF] transition-colors mb-8">

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
              <StarButton asChild><Link href="/contact/" className="btn-primary">
                Start Your Project

              </Link></StarButton>
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
                  <Link href={`/services/${rel.id}/`}>
                    <div className="dm-card text-center cursor-pointer hover:border-[#5B8CFF]/40 hover:-translate-y-1 transition-all duration-300">
                      <p className="text-sm font-semibold text-[#111315] mb-1">{rel.label}</p>
                      <span className="text-xs text-[#5B8CFF] inline-flex items-center gap-1 justify-center">
                        Learn more
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      <PackageOverview locale="en" context="service" />
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
              <StarButton asChild><Link href="/contact/" className="btn-primary !h-14 !text-base !px-8">
                <MessageCircle size={20} />
                Get in Touch
              </Link></StarButton>
              <Link href="/pricing/" className="inline-flex items-center gap-2 px-8 h-14 rounded-xl border-2 border-white/20 text-white font-semibold hover:border-white/40 transition-all duration-300 text-base">
                View Pricing

              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
