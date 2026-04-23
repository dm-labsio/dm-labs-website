import { useEffect } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";

// SEO landing page: /web-design-crete
// Primary keyword: "web design Crete"
// Secondary: "website for small business Crete", "κατασκευή ιστοσελίδας Κρήτη"
// Tertiary: "web design Ηράκλειο", "web design Χανιά", "website Crete price"
// Design: matches D&M Labs site style - light bg, brand gradient accents, clean typography

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "D&M Labs",
  "url": "https://dm-labs.io",
  "telephone": "+35797472847",
  "email": "info@dm-labs.io",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Eleftheriou Chandrinou 5",
    "addressLocality": "Paphos",
    "postalCode": "8045",
    "addressCountry": "CY"
  },
  "areaServed": [
    "Crete",
    "Ηράκλειο",
    "Χανιά",
    "Ρέθυμνο",
    "Άγιος Νικόλαος",
    "Greece"
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 35.2401,
      "longitude": 24.8093
    },
    "geoRadius": "150000"
  },
  "description": "D&M Labs is a remote web design studio building professional, mobile-first, SEO-optimised websites for small businesses across Crete - Ηράκλειο, Χανιά, Ρέθυμνο, and beyond. Websites from €299, delivered in 5-14 days.",
  "priceRange": "€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Bank Transfer, PayPal",
  "openingHours": "Mo-Fr 09:00-18:00",
  "sameAs": [
    "https://www.instagram.com/dmlabs.io"
  ]
};

const faqs = [
  {
    q: "How much does a website cost for a business in Crete?",
    a: "Our packages start from €299 for a Starter site - a fully custom, mobile-responsive website with SEO setup, a contact form, Κουμπί WhatsApp, and everything your business needs to go live. The Business package is €399 and includes up to 5 pages, booking forms, Google Maps integration, and stronger SEO. The Premium package is €699 and includes up to 7 pages, a full blog setup, pop-up, and 5 SEO articles. All prices are εφάπαξ fees with no monthly charges."
  },
  {
    q: "Do you work with businesses in Crete remotely?",
    a: "Yes, entirely. D&M Labs works with clients across Crete - Ηράκλειο, Χανιά, Ρέθυμνο, Άγιος Νικόλαος, and everywhere in between - without any need for in-person meetings. The full process is handled via WhatsApp, email, and video call. Most clients find it faster and more convenient than scheduling office visits, and it means we can move quickly from brief to launch."
  },
  {
    q: "Can you build a website in Greek for my Cretan business?",
    a: "Absolutely. We build bilingual websites in both Greek and English, and a full Greek-language version is available on request. If your audience is primarily Greek-speaking - local residents, domestic tourists, or Greek-speaking customers - we can build a Greek-only site or a bilingual site with a language toggle. We are comfortable working with Greek content and can advise on how to structure it for both readability and Google visibility."
  },
  {
    q: "How long does it take to build a website for a business in Crete?",
    a: "The Starter package typically launches within 5 to 7 days from the moment we have your content and feedback. The Business and Premium packages take 10 to 14 days depending on the number of pages and features. We keep you updated at every stage and do not disappear between milestones."
  },
  {
    q: "My business depends on tourism. Can you build a website that attracts international visitors?",
    a: "Yes - and this is something we do well. Many of our clients in Crete and Cyprus serve both local customers and international tourists. We build bilingual or multilingual websites that are optimised for both Greek and English search queries, load quickly on mobile (which is how most tourists browse), and include features like online booking forms, photo galleries, and Google Maps integration. A well-built website is one of the most effective ways to capture tourist bookings before they arrive on the island."
  },
  {
    q: "What kinds of businesses in Crete do you work with?",
    a: "We work with all kinds of small and medium businesses across Crete - restaurants, tavernas, hotels, villas, beauty salons, yoga studios, lawyers, accountants, construction companies, retail shops, and professional services of all kinds. If your business needs to be found online and present itself professionally, we can build the right website for you."
  }
];

const industries = [
  {
    title: "Restaurants and Tavernas",
    desc: "A professional website with your menu, photos, location, and a booking form. Built to be found by both locals and tourists searching for the best food in your area.",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    alt: "Traditional Greek taverna restaurant in Crete with outdoor seating"
  },
  {
    title: "Hotels, Villas and Accommodation",
    desc: "Showcase your property with a stunning gallery, availability information, and a direct booking enquiry form. Reduce your dependency on booking platforms and own your guest relationships.",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
    alt: "Luxury villa with pool in Crete Greece for accommodation website"
  },
  {
    title: "Beauty and Wellness",
    desc: "Hair salons, nail studios, massage therapists, and beauty clinics. A clean, professional website with your services, prices, and an easy way for clients to book.",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",
    alt: "Beauty salon interior in Crete for professional website design"
  },
  {
    title: "Επαγγελματικές Υπηρεσίες",
    desc: "Lawyers, accountants, architects, and consultants. A credible, well-structured website that communicates your expertise and makes it easy for clients to get in touch.",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80",
    alt: "Professional services office meeting in Crete for business website"
  },
  {
    title: "Retail and Boutiques",
    desc: "A polished online presence for your shop - your products, your story, your location, and your contact details. Make it easy for customers to find you before they visit.",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
    alt: "Boutique retail shop in Crete Greece for small business website"
  },
  {
    title: "Construction and Trades",
    desc: "Builders, electricians, plumbers, and contractors. A straightforward website that shows your work, your services, and makes it easy for customers to call or message you.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    alt: "Construction and trades business in Crete for professional website"
  },
  {
    title: "Fitness, Yoga and Wellness",
    desc: "Personal trainers, yoga studios, Pilates instructors, and wellness coaches. A website that showcases your classes, your story, and makes it easy for clients to book a session with you.",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
    alt: "Yoga and fitness studio in Crete for wellness business website"
  }
];

export default function WebDesignCreteEl() {
  useSEO({
    title: "Κατασκευή Ιστοσελίδας Κρήτη | Professional Websites from €299 | D&M Labs",
    description: "Professional web design for small businesses across Crete - Ηράκλειο, Χανιά, Ρέθυμνο and beyond. Custom websites from €299, delivered in 5-14 days. Mobile-first, SEO-ready, no hidden fees.",
    canonicalPath: "/el/web-design-crete"
  });

  useEffect(() => {
    const existing = document.getElementById("schema-crete");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "schema-crete";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schemaMarkup);
    document.head.appendChild(script);
    return () => {
      const s = document.getElementById("schema-crete");
      if (s) s.remove();
    };
  }, []);

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#F0EAFF]">
        <div className="container max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">
            Κατασκευή Ιστοσελίδας Κρήτη
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111315] mb-4 leading-tight">
            Professional Websites for{" "}
            <span className="bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] bg-clip-text text-transparent">
              Businesses in Crete
            </span>
          </h1>
          <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-6 leading-relaxed">
            D&M Labs builds professional, fast, and mobile-first websites for small businesses across Crete - from Ηράκλειο and Χανιά to Ρέθυμνο, Άγιος Νικόλαος, and every village in between. Starting from €299, delivered in 5 to 14 days.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/el/contact">
              <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                Get a Free Consultation
              </button>
            </Link>
            <Link href="/el/pricing">
              <button className="px-8 py-3.5 rounded-xl border border-[#5B8CFF] text-[#5B8CFF] font-semibold text-base hover:bg-[#EEF3FF] transition-colors bg-white">
                Δείτε τις Τιμές
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── HERO IMAGE ── */}
      <section className="pb-0">
        <div className="container max-w-4xl mx-auto px-4">
          <figure className="rounded-2xl overflow-hidden shadow-md">
            <img
              src="https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/NIKoLQKtylnVMtQG.jpg?Expires=1808465447&Signature=NekukXt3to-~bJhXPzQNUorg179u8Hc-UKLNcR0nu416WRSXgRmm3LpMz5SjHKM2823T-nWQuRrEO83bif~n~wMm9FZfuJLLvbXTgOLh-VfN-yqrtQG~8fLV6IUdWWkdw45F1cS6COY747zhjWWe0fgce52M7xXpHbslHFFaVl87dJxtRu9kvT59mRZ0Mh3iiRi0xTWkK-y0mo~37FgVuETIlXxnTSBjsOwVHR7kv-I2vGjMH5kvswUS8eiXNp~Gca7L7dw~dAVmvqYJO1kKJ7IVIkfhCEjZLBP3RYZT~7TMTEA98AJxywMJY13yUOhDVQVa72sQTOTGMqn9TfXX-Q__&Key-Pair-Id=K2HSFNDJXOU9YS"
              alt="Χανιά old harbour at sunset - web design for businesses in Crete Greece"
              className="w-full object-cover"
              style={{ maxHeight: "420px", objectPosition: "center 50%" }}
              loading="eager"
            />
          </figure>
        </div>
      </section>

      {/* ── WHY CRETE NEEDS A WEBSITE ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-6">
            Why Businesses in Crete Need a Professional Website
          </h2>
          <p className="text-[#5B6472] leading-relaxed mb-5">
            Crete is Greece's largest island and one of the most visited destinations in the Mediterranean. Every year, millions of tourists arrive in Ηράκλειο, Χανιά, and Ρέθυμνο - and the vast majority of them research where to eat, where to stay, and what to do before they ever set foot on the island. If your business does not have a professional website, you are invisible to that audience before they even arrive.
          </p>
          <p className="text-[#5B6472] leading-relaxed mb-5">
            But it is not only about tourism. Crete has a thriving local economy - construction, professional services, retail, beauty, healthcare, and agriculture all depend on local customers who are increasingly searching on Google before making a decision. A business without a website, or with an outdated one, is simply not in the conversation.
          </p>
          <p className="text-[#5B6472] leading-relaxed mb-5">
            A well-built website does several things at once. It ranks on Google for the searches your customers are already making - whether that is "restaurant Ηράκλειο", "hair salon Χανιά", or "villa rental Ρέθυμνο". It loads quickly on mobile, which is how most people browse. It builds trust before a customer has even spoken to you. And it works for your business 24 hours a day, seven days a week, without any ongoing effort from you.
          </p>
          <p className="text-[#5B6472] leading-relaxed">
            The businesses in Crete that invest in a quality website now - before their sector becomes fully saturated online - are the ones that capture the most valuable search traffic and build lasting credibility with both local customers and international visitors.
          </p>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-3">
            We Build Websites for Every Kind of Business in Crete
          </h2>
          <p className="text-[#5B6472] mb-10">
            From tavernas in Ηράκλειο to villas in Χανιά and beauty salons in Ρέθυμνο - we understand the Cretan market and build websites that speak to your customers.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind) => (
              <div key={ind.title} className="bg-white rounded-2xl border border-[#E8EAF0] shadow-sm overflow-hidden">
                <div className="overflow-hidden" style={{ height: "160px" }}>
                  <img
                    src={ind.img}
                    alt={ind.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#111315] text-base mb-2">{ind.title}</h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING SUMMARY ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-3">
            Transparent Pricing for Crete Businesses
          </h2>
          <p className="text-[#5B6472] mb-10">
            No hidden fees. No hourly billing. One fixed price, everything included.{" "}
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
                desc: "A clean, professional branded page with mobile-responsive design, Κουμπί WhatsApp, social links, accessibility widget, and 2 revisions. Live in 5-7 days.",
                highlight: false
              },
              {
                name: "Business",
                price: "€399",
                desc: "Έως 5 σελίδες with contact and booking forms, Google Maps, reviews widget, testimonials, SEO setup, and speed optimisation. Live in 7-10 days.",
                highlight: true
              },
              {
                name: "Premium",
                price: "€699",
                desc: "Έως 7 σελίδες with custom design and animations, gallery, 5 SEO blog άρθρα, full meta and SEO structure, pop-up, and 5 revisions. Live in 10-14 days.",
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
                <div className="text-2xl font-extrabold text-[#111315] mb-1">{p.price}</div>
                <div className="font-semibold text-[#111315] mb-3">{p.name}</div>
                <p className="text-[#5B6472] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#9CA3AF] mt-4">
            All prices are εφάπαξ fees. No monthly charges, no hidden costs.{" "}
            <Link href="/el/pricing" className="text-[#5B8CFF] underline underline-offset-2">
              Δείτε πλήρεις τιμές
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── WHY CHOOSE D&M LABS ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-6">
            Why Crete Businesses Choose D&M Labs
          </h2>
          <p className="text-[#5B6472] leading-relaxed mb-8">
            D&M Labs is a remote web design studio with deep roots in the Greek and Cypriot market. We work with businesses across Crete entirely online - no office visits, no delays. The full process, from the first conversation to your website going live, is managed by us so you can focus on running your business.
          </p>

          <figure className="rounded-2xl overflow-hidden shadow-sm mb-10 border border-[#E8EAF0]">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1000&q=80"
              alt="Web designer working remotely with a small business owner in Crete via video call"
              className="w-full object-cover"
              style={{ maxHeight: "320px", objectPosition: "center 30%" }}
              loading="lazy"
            />
            <figcaption className="text-xs text-[#9CA3AF] text-center italic px-4 py-2 bg-white">
              The entire process - from brief to launch - is handled remotely, at your pace.
            </figcaption>
          </figure>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "We are with you every step",
                desc: "From the first conversation to launch and beyond, you have a real person to talk to. No support tickets, no waiting. Just a direct line to the people building your site."
              },
              {
                title: "No technical knowledge needed",
                desc: "You do not need to understand hosting, SEO, or code. You bring your business. We handle everything else and explain what matters in plain language."
              },
              {
                title: "Updates whenever you need them",
                desc: "Your business changes. Your website should too. When you need to update prices, add a service, or change a photo, you contact us and we sort it - fast."
              }
            ].map((w) => (
              <div key={w.title} className="bg-white rounded-2xl p-6 border border-[#E8EAF0] shadow-sm">
                <h3 className="font-bold text-[#111315] text-lg mb-2">{w.title}</h3>
                <p className="text-[#5B6472] text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-3">
            Serving Businesses Across All of Crete
          </h2>
          <p className="text-[#5B6472] mb-8">
            We work with businesses throughout the island - Ηράκλειο, Χανιά, Ρέθυμνο, Άγιος Νικόλαος, Ιεράπετρα, Σητεία, and every town and village in between. Distance is never a factor.
          </p>
          <div className="rounded-2xl overflow-hidden border border-[#E8EAF0] shadow-sm" style={{ height: "380px" }}>
            <iframe
              title="Crete, Greece - web design services for local businesses"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d415000!2d24.8093!3d35.2401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x149a5a5b1f4c9e3d%3A0x400d318bd5200b0!2sCrete%2C%20Greece!5e0!3m2!1sen!2sgr!4v1700000000000!5m2!1sen!2sgr"
            />
          </div>
        </div>
      </section>

      {/* ── TOURISM CALLOUT ── */}
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] to-[#F0EAFF]">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold text-[#111315] mb-4">
                Built for Crete's Tourism Economy
              </h2>
              <p className="text-[#5B6472] leading-relaxed mb-4">
                Crete receives over 4 million visitors a year. Most of them plan their trip online - searching for restaurants, accommodation, activities, and services weeks before they arrive. A professionally built, bilingual website puts your business in front of that audience at exactly the right moment.
              </p>
              <p className="text-[#5B6472] leading-relaxed mb-4">
                We build websites that work for both local customers and international visitors - fast-loading on mobile, available in Greek and English, and optimised for the searches that bring tourists to your door.
              </p>
              <Link href="/el/contact">
                <button className="mt-2 px-7 py-3 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-sm hover:opacity-90 transition-opacity">
                  Talk to us about your business
                </button>
              </Link>
            </div>
            <figure className="rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/vjogCczdOXQNydol.jpg?Expires=1808465447&Signature=JrB-tEOKwnwYOXiwzbFZfcPMnRGALbh7XJMrSUn62RNA8EE7JYOp4ig5HrnbHT4Ok3ec9K2u1i97UnXL~Y5q4jGz6DXFT5KRaJDk6bm00Vb2ZQjLqvPSJZmq0kdo-5LZ4ksSkgUGfGbDsTN6i7iyuxHX9pIEM36H5jppUfovJe0y0TND5t-fNuyWciKGC5NTQHGwFxzXMDqubN3-cVxdtUi-Cvvi0t5rHrQILJbYln~5O3BKWvMDMjkpciv6h-zYqP4qM8Hs5Ld3Rrpp9zR196DYIUKlyZ5XZYf27CG0pSjmRUzkHh6Rq68UAmTfhuuRYShcyPfDm3rwokvM~pvyeg__&Key-Pair-Id=K2HSFNDJXOU9YS"
                alt="Crete island aerial view - tourism and local business website design"
                className="w-full object-cover"
                style={{ height: "300px", objectPosition: "center 40%" }}
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
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

      {/* ── INTERNAL LINKS ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto text-center">
          <p className="text-[#5B6472] text-sm">
            Also serving businesses in{" "}
            <Link href="/el/web-design-thessaloniki" className="text-[#5B8CFF] font-medium underline underline-offset-2 hover:text-[#8B5CFF]">
              Thessaloniki
            </Link>
            {", "}
            <Link href="/el/web-design-nicosia" className="text-[#5B8CFF] font-medium underline underline-offset-2 hover:text-[#8B5CFF]">
              Nicosia
            </Link>
            {", and "}
            <Link href="/el/web-design-limassol" className="text-[#5B8CFF] font-medium underline underline-offset-2 hover:text-[#8B5CFF]">
              Limassol
            </Link>
            .{" "}
            <Link href="/el/web-design-cyprus" className="text-[#5B8CFF] font-medium underline underline-offset-2 hover:text-[#8B5CFF]">
              See all Cyprus locations
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-spacing bg-gradient-to-br from-[#5B8CFF] to-[#8B5CFF]">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to get your Crete business online?
          </h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            Πείτε μας για την επιχείρησή σας και θα σας στείλουμε δωρεάν πρόταση μέσα σε 24 ώρες. Χωρίς δέσμευση. You can also reach us directly on WhatsApp - we respond quickly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/el/contact">
              <button className="px-10 py-4 rounded-xl bg-white text-[#5B8CFF] font-bold text-base hover:bg-blue-50 transition-colors shadow-lg">
                Contact us today
              </button>
            </Link>
            <a
              href="https://wa.me/35797472847?text=Hi%2C%20I%27m%20interested%20in%20a%20website%20for%20my%20business%20in%20Crete"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-10 py-4 rounded-xl bg-white/20 border border-white/40 text-white font-bold text-base hover:bg-white/30 transition-colors">
                Συνομιλήστε στο WhatsApp
              </button>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
