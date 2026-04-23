import { useEffect } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";

// SEO landing page: /web-design-limassol
// Target keywords: "web design Λεμεσός", "website design Λεμεσός"
// Design: matches D&M Labs site style - light bg, brand gradient accents, clean typography

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "D&M Labs",
  "description": "Professional web design agency serving businesses in Λεμεσός, Cyprus. Custom websites από €299.",
  "url": "https://dm-labs.io/web-design-limassol",
  "telephone": "+357-96-000000",
  "areaServed": {
    "@type": "City",
    "name": "Λεμεσός, Cyprus"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Λεμεσός",
    "addressCountry": "CY"
  },
  "priceRange": "€€",
  "serviceType": "Κατασκευή Ιστοσελίδας",
  "offers": [
    {
      "@type": "Offer",
      "name": "Starter Website",
      "price": "299",
      "priceCurrency": "EUR"
    },
    {
      "@type": "Offer",
      "name": "Business Website",
      "price": "399",
      "priceCurrency": "EUR"
    },
    {
      "@type": "Offer",
      "name": "Premium Website",
      "price": "699",
      "priceCurrency": "EUR"
    }
  ]
};

const faqs = [
  {
    q: "How much does web design cost in Λεμεσός?",
    a: "Our web design packages for Λεμεσός businesses start από €299 for a Starter site, €399 for a Business site, and €699 for a Premium site. All packages include mobile-responsive design, SEO setup, and a contact form. These are limited time introductory prices - check our Τιμές page for the full breakdown."
  },
  {
    q: "How long does it take to build a website?",
    a: "Most websites are delivered within 7 to 14 days from the moment we receive your content and feedback. Starter sites typically take 5 to 7 days. Business and Premium sites with more pages and custom functionality take 10 to 14 days. We keep you updated at every stage."
  },
  {
    q: "Do you work with businesses in Λεμεσός remotely?",
    a: "Yes, absolutely. Συνεργαζόμαστε με businesses σε όλη την Κύπρο and internationally entirely online. Our process is built around clear communication via WhatsApp, email, and video calls - so location is never a barrier. Many of our clients in Λεμεσός have never needed a face-to-face meeting."
  }
];

export default function WebDesignΛεμεσόςEl() {
  useSEO({
    title: "Κατασκευή Ιστοσελίδας Λεμεσός | Ιστοσελίδες από €299 | D&M Labs",
    description: "D&M Labs builds professional websites for Λεμεσός businesses από €299. Mobile-first, SEO-ready, γρήγορη παράδοση. Get online today.",
    canonicalPath: "/el/web-design-limassol",
  });
  useEffect(() => {
    // Inject schema markup
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "limassol-schema";
    script.text = JSON.stringify(schemaMarkup);
    document.head.appendChild(script);
    return () => {
      const s = document.getElementById("limassol-schema");
      if (s) s.remove();
    };
  }, []);

  return (
    <main className="bg-white">
      {/* ── HERO ── */}
      <section className="section-spacing bg-gradient-to-br from-[#EEF3FF] via-white to-[#F0EAFF]">
        <div className="container max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#5B8CFF] mb-4">
            Serving Λεμεσός, Cyprus
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111315] leading-tight mb-6">
            Κατασκευή Ιστοσελίδας Λεμεσός<br />
            <span className="bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] bg-clip-text text-transparent">
              Επαγγελματικές Ιστοσελίδες for Local Businesses
            </span>
          </h1>
          <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-8 leading-relaxed">
            D&M Labs is a dedicated web design agency helping Λεμεσός businesses build a strong online presence. Δημιουργούμε fast, mobile-first, and conversion-focused websites - starting από €299 - so η επιχείρησή σας stands out in one of Cyprus's most competitive markets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/el/contact">
              <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                Λάβετε Δωρεάν Προσφορά
              </button>
            </Link>
            <Link href="/el/pricing">
              <button className="px-8 py-3.5 rounded-xl border border-[#5B8CFF] text-[#5B8CFF] font-semibold text-base hover:bg-[#EEF3FF] transition-colors">
                Δείτε τις Τιμές
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY LIMASSOL NEEDS A WEBSITE ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-6">
            Why Λεμεσός Businesses Need a Professional Website
          </h2>
          <p className="text-[#5B6472] leading-relaxed mb-5">
            Λεμεσός is Cyprus's business and financial capital - home to international law firms, shipping companies, fintech startups, and a thriving hospitality sector. It also has one of the largest expat communities in the Eastern Mediterranean, with residents and visitors from Russia, Israel, the UK, and across Europe actively searching online for local services.
          </p>
          <p className="text-[#5B6472] leading-relaxed mb-5">
            In this environment, a professional website is not optional - it is your first impression. When a potential client searches "accountant in Λεμεσός" or "restaurant near the seafront," η ιστοσελίδα σας is either working for you or handing that client to a competitor. A well-built site with proper SEO, fast load times, and a clear call to action converts visitors into enquiries around the clock.
          </p>
          <p className="text-[#5B6472] leading-relaxed">
            The Λεμεσός market is competitive and increasingly digital. Businesses that invest in a quality online presence now - before their competitors do - capture the most valuable search traffic and build lasting credibility with both local and international clients.
          </p>
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-3">
            What We Build for Λεμεσός Businesses
          </h2>
          <p className="text-[#5B6472] mb-10">
            Every site we deliver is built to perform - not just to look good.{" "}
            <Link href="/el/services" className="text-[#5B8CFF] font-medium underline underline-offset-2 hover:text-[#8B5CFF]">
              See our full services
            </Link>
            .
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Custom Design",
                desc: "Κανένα έτοιμο πρότυπο. Κάθε ιστοσελίδα σχεδιάζεται από μηδενική βάση για να ταιριάζει με τη μάρκα σας, το κοινό σας και τους στόχους σας."
              },
              {
                title: "Mobile-First",
                desc: "Over 70% of web traffic στην Κύπρο comes from mobile. Every site we build looks and works perfectly on any screen."
              },
              {
                title: "SEO-Ready",
                desc: "Clean code, fast load times, proper meta tags, and structured data - everything Google needs to rank your site."
              },
              {
                title: "Γρήγορη Παράδοση",
                desc: "Most sites are live within 7 to 14 days. We move quickly without cutting corners on quality."
              }
            ].map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-6 border border-[#E8EAF0] shadow-sm">
                <h3 className="font-bold text-[#111315] text-lg mb-2">{s.title}</h3>
                <p className="text-[#5B6472] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING SUMMARY ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-3">
            Διαφανείς Τιμές for Λεμεσός Businesses
          </h2>
          <p className="text-[#5B6472] mb-10">
            Χωρίς κρυφές χρεώσεις. No hourly billing. One fixed price, everything included.{" "}
            <Link href="/el/pricing" className="text-[#5B8CFF] font-medium underline underline-offset-2 hover:text-[#8B5CFF]">
              View full pricing breakdown
            </Link>
            .
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                price: "€299",
                desc: "Ιδανικό για freelancers και μικρές επιχειρήσεις που χρειάζονται μια καθαρή, επαγγελματική online παρουσία.",
                highlight: false
              },
              {
                name: "Business",
                price: "€399",
                desc: "Ιδανικό για καθιερωμένες επιχειρήσεις που θέλουν περισσότερες σελίδες, animations και προχωρημένο SEO.",
                highlight: true
              },
              {
                name: "Premium",
                price: "€699",
                desc: "Full-featured site with custom functionality, booking forms, and priority support.",
                highlight: false
              }
            ].map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl p-6 border ${
                  p.highlight
                    ? "border-[#5B8CFF] bg-gradient-to-br from-[#EEF3FF] to-[#F0EAFF] shadow-md"
                    : "border-[#E8EAF0] bg-white shadow-sm"
                }`}
              >
                {p.highlight && (
                  <span className="inline-block text-xs font-semibold text-[#5B8CFF] uppercase tracking-wider mb-2">
                    Πιο Δημοφιλές
                  </span>
                )}
                <div className="text-3xl font-extrabold text-[#111315] mb-1">{p.price}</div>
                <div className="font-semibold text-[#111315] mb-3">{p.name}</div>
                <p className="text-[#5B6472] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#9CA3AF] mt-4">
            * These are limited time introductory prices.
          </p>
        </div>
      </section>

      {/* ── GOOGLE MAPS ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-3">
            Based στην Κύπρο, Serving Λεμεσός
          </h2>
          <p className="text-[#5B6472] mb-8">
            We serve businesses across Λεμεσός - from the old town and seafront to the business district and suburbs like Agios Athanasios, Polemidia, and Germasogeia.
          </p>
          <div className="rounded-2xl overflow-hidden border border-[#E8EAF0] shadow-sm" style={{ height: "360px" }}>
            <iframe
              title="Λεμεσός, Cyprus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52427.36!2d33.0413!3d34.6841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14e733d5b1b3b3b3%3A0x1234567890abcdef!2sΛεμεσός%2C%20Cyprus!5e0!3m2!1sen!2scy!4v1700000000000!5m2!1sen!2scy"
            />
          </div>
        </div>
      </section>

      {/* ── Συχνές Ερωτήσεις ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-10">
            Συχνές Ερωτήσεις
          </h2>
          <div className="flex flex-col gap-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-6 border border-[#E8EAF0] shadow-sm">
                <h3 className="font-bold text-[#111315] text-base mb-3">{faq.q}</h3>
                <p className="text-[#5B6472] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-spacing bg-gradient-to-br from-[#5B8CFF] to-[#8B5CFF]">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to get your Λεμεσός business online?
          </h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            Πείτε μας για την επιχείρησή σας και θα σας στείλουμε δωρεάν πρόταση μέσα σε 24 ώρες. Χωρίς δέσμευση.
          </p>
          <Link href="/el/contact">
            <button className="px-10 py-4 rounded-xl bg-white text-[#5B8CFF] font-bold text-base hover:bg-blue-50 transition-colors shadow-lg">
              Επικοινωνία us today
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
