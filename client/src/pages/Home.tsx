/* ============================================================
   DM-Labs.io v2.0 — Homepage
   Sections: Hero (video scroll), ProofBar, Capabilities,
             Work Grid, Process, Team, Pricing, CTA
   Design system: sharp geometry · Satoshi + Space Mono
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import {
  ArrowRight, CheckCircle2, MessageCircle,
  Globe, Zap, CalendarCheck, Languages,
  Users, Headphones, Search, Smartphone,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── CDN Asset URLs ──────────────────────────────────────── */
const HERO_VIDEO =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/sOOvLJCogFIiUcQs.mp4?Expires=1816249782&Signature=VBTOZ5aU2e0ZZGH7u51YMWxgISLenvDJz0f0Q4rmrsjyqGsnTB9OZDam73PfJDFqy~N7Udb~lZwnHYitrUHzgHg6meHeK4rd670RX-Y2Mn-Xv4S34XwWB~GPQtKBJmA4O45OUCRXVkz6Ost7kAElggCWk4j719fE7LbJ9aGHjZajfsDZSbcxusSctlwTSQXKx8Lpxy4gJ09LSkMgQy0tW66Ido7PIgMV2Vgx3EW7DHq-5C5Kru7W9GZe6ZOcRPobCKZO9BclWsVr~76uPOvzguQUHTlcpo1TwpEutNrjrMLNEoayJ7VOWPcLLxhGZsceRjjJTWkTYrD560wZCKFUkA__&Key-Pair-Id=K2HSFNDJXOU9YS";

const HERO_BG =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/FXscTZWkjllcwtGD.png?Expires=1816249782&Signature=ZBK4f6r4tJvCE4ls4nZb-Zl6~HKFn15I8FbqXDMQAZdg2m5Wl5QRXYrli-EwFyW~0w9HlEEtpNgxeVqzGi98gPJXYDFrXqK8eittFgYUc63Jf-Z7XHe~SqaFtq9QtsQybyQX5dZTw2x-~volNGRVQJ6Som4Y~IydEkfjr7UxJpIIAwWH-EZFu4drUNyQRF2J8QXCS8vULmmpwVbegwocJyfTllYLK~xp1T-0E0F7tsgjQ2ddWbG5lFkUU6xiOAbBhM6-dSucDsVG6Yca9mYxIgaonb7jWa~bTSuxoz7rkKROsWiKSmAoM~iwD~c0LT-5XHh46Rx3VwHsYSmX6S9QvQ__&Key-Pair-Id=K2HSFNDJXOU9YS";

const ORB_1 =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/kkADuAVjsNfAldbH.png?Expires=1816249782&Signature=FwbvrSoHs3oATUoaOpAzOgAll~Nt610QIQgRAfzB0ze-7VR5~2lWNZ4ZIhryFIwZYofgH2ZHG-mBIxlISJuDbr1dDa1UilkOHjkS1pSfYa2ridna6PVDx1AyhLvETTa9-Ccb6DuRPuwu1R6rmCTTvrThG-2sYWCMAIGjs8HbnxH5VvbN28W9zb30fl3~GtdG3wwJwJNKHTPOwG5ZFEcA1TziD7NPYLdcDfqSRsoSeZH5xPMdbPt6F3Ph7qvSn~xNqKw1yHNn9RGcQ8uv6XoNzTfxzZW46dFBSvBWb0R9mrygE7Z9Fo9wd0sAPTtVgPFCLsTKDyH3aR4xPrPN130SgA__&Key-Pair-Id=K2HSFNDJXOU9YS";

const ORB_2 =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/eBSFjTpZfLpDADEn.png?Expires=1816249782&Signature=LLdi6Lo6s42Ym2ayAV9TQBoAFM0~IcOIoJmhLkvBufYm1QhfuBf2NPibXezF3DRTLk2MyAdsqc7fgiiaUdKTUbeP42yeX6IF4cUFH0hUXhJK9WXvkXD4XUkLG-y2IiXiOhgJrjzpi~eSj3q~Y~THSd5F1~uXcWjRS4ufaPl70U1bkcL~Lz~cju1AdPhhyCyZuIQSoL153nt1-u2zqjXWRdWlRTZOGMqIftqTtda2UFNKmvHtVp-hMvC5MDDARHUG2-eI663MFIyU~wCXOG5PAHimvOw7Et~VV1GIAY-8U1VMxr3j94yAAwsVCrs5ZSDzLyJ5dXrgB51w0rejiMN0AA__&Key-Pair-Id=K2HSFNDJXOU9YS";

const ORB_3 =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/aCGYkmLqWToQVlSd.png?Expires=1816249782&Signature=lYOtsWJ-ofRtCtjEPdxb3X~yxLLIyfp84amkSaJL-pb13fAAVgudJwKHuUEsyw1q3Xpx~zg8az1Cy6PbxwK3kyVs1A~Xsig3riiz-hKfoM4KwThLGT8QFB7O7PIVbjhRg4fCW~R8NGsZ1VoDv9YCeQQ8zpTHZNWAS-HNAvokHtcLDnBHPdw4aNhP6MihBnPS9mPld6rl6XwBqkGsFroElgODTKO89R7r696-wJfTE~DTLLEY-ro6UZ9Vr2qOHc-tBq8Pnq9WgxGAz-0t7xXh16dtYaQ~FDLjydFRXXl6Yo~A2c7tvVz~yeFbUDkEl9pb1y38XXSTvGvxF56~zmJ2pA__&Key-Pair-Id=K2HSFNDJXOU9YS";

const WORK_IMGS = [
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/DaEqtwePpcFvhwTD.png?Expires=1816249782&Signature=EL6dkGgLjthCT9J0nbYo9WOqbU59~PAUn57gW92FeMSBxtM33UMgKEC52YwMoWgm1a8dCE~FmQuxP77fyUs5tp9uamL-CwBo-i-bvs35bn5hFLYNFZ5mKTJgSYQIVhAT~sUmd2VpPZOeezExfZflahexkjwBqOGLabWztnusa1-Jjz0mh3zfuYK7g-UXHf0yMbYQ85xQzgs4R9834IadDfx8iU49deClEizR46-a0haHXblW-9ufzBhkql9G9kl8tFwsf0tuH7xPCNSNlJEBsuGZfcsfnmIdOs6~IkG~aHUwOgCTQI2tlc8oy5txBzrpGd-EK68JH-ACRqdbcXhCew__&Key-Pair-Id=K2HSFNDJXOU9YS",
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/XySyMrPjneOVKeoc.png?Expires=1816249782&Signature=mkWwoU5zua1fU1VRp87AK9BXA8-L9QvnXjU8YZrx~KCY-nvH1jGjKPM8fMS1Y1ozYJidixaZ96FN3W68n92MW7qah-FTepqjF0NrnrCKt9wieMQ9U~O2wsQcfmG1V933jmhnNrXtDAaDCrbgZNdQtm~1EuKv65cW5L3oTuN7GByKaxOjtqbcIyWNn681Qlwsjn3QkyUWCKk4erSdOIJNifuH3iEaRFM6ZMUoVfyrBcgGrZAqno7RID2nUzkWk593PiDLbf09Nrr96tUU-kQ92yuCR9zsfvMoCUVF6lK7JfTm6BRtdSTAZF58HZQNSTtljebgstblBq9Fe~ZCrmAOfQ__&Key-Pair-Id=K2HSFNDJXOU9YS",
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/OGOCWojooJGAMiMu.png?Expires=1816249782&Signature=hfz6GVIeiPbl-Ri2FcQlb7jAnIdjIq9Y2ZIzNqmjVIN4a4KQg31QgwsFwUOGk8Mu342HDxMHBf8pXqVVqry7V7mA72~VW0p6vJAr5ahdW0OFC~PbbUXKo8obXQgtQJPPPKFSoObpk-GkaDEPNP6XUNXIyYDhXOJSxBQGEDyzahFoPmoOwYRpyRtsoX6MJrE5dJGZeYy76Pw0tWIjkyE3uFB3qWhC-49CJxKULyAY9~eT7WkELwv3nB4-4R8l4cQ~uorz-4hFfzupfNwBafY5g04BXUjjnC-ZF3ZJX-XjEVsK45OCuwTM9IYNQkrY-v6Gc~kQ5lMGatzFyS1kcFlOJw__&Key-Pair-Id=K2HSFNDJXOU9YS",
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/kkADuAVjsNfAldbH.png?Expires=1816249782&Signature=FwbvrSoHs3oATUoaOpAzOgAll~Nt610QIQgRAfzB0ze-7VR5~2lWNZ4ZIhryFIwZYofgH2ZHG-mBIxlISJuDbr1dDa1UilkOHjkS1pSfYa2ridna6PVDx1AyhLvETTa9-Ccb6DuRPuwu1R6rmCTTvrThG-2sYWCMAIGjs8HbnxH5VvbN28W9zb30fl3~GtdG3wwJwJNKHTPOwG5ZFEcA1TziD7NPYLdcDfqSRsoSeZH5xPMdbPt6F3Ph7qvSn~xNqKw1yHNn9RGcQ8uv6XoNzTfxzZW46dFBSvBWb0R9mrygE7Z9Fo9wd0sAPTtVgPFCLsTKDyH3aR4xPrPN130SgA__&Key-Pair-Id=K2HSFNDJXOU9YS",
];

const BANNER_W1 =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/zGZezrdTUYlviKUK.webp?Expires=1816250574&Signature=uS1pX8RHo1-2epxq2ikKUQ0VyvyJHMJzionykSOraNjeRi-496wH~sXfThPjuag8YrWTo0YKeZeglW3hYy0Lu9VA-FaupgGBx6Q6VNsItuilJXlkillJjFy4GOrJyFUXGqK3jYTH2tWfGcYk-pxsA0OVRshBnWcUNLJI5gYM7OdEoZ5ZpC~uaqmdMGLiCvDAMcARvCMYMx7WkRVJyvXyI96vN0edlgreZCJE~gTd343qKHt7nt5epN3HN65aS0lYpsoBgFFKqepbXuJ6zLjRktBfJSSwUIWjtdcQH6fdCIEK~QEVlxom6x7uS1oKgrlOXR9ZP-BWNJFAeOJk6xrnaw__&Key-Pair-Id=K2HSFNDJXOU9YS";

/* ── Proof bar ticker items ───────────────────────────────── */
const TICKER_ITEMS = [
  "Currently accepting new projects",
  "14-day delivery on Growth sites",
  "Mobile-first, every time",
  "SEO foundations on every build",
  "Paphos · Cyprus · Europe",
  "From €299 one-time",
  "Free consultation, no pressure",
  "WhatsApp support included",
];

/* ── Capabilities data ───────────────────────────────────── */
const CAPS = [
  {
    label: "01 / DESIGN",
    title: "Custom design, not templates",
    body: "Every site is built from scratch around your brand, your customers, and your content. No page builders, no off-the-shelf themes.",
    icon: Smartphone,
    accent: "var(--cyan)",
  },
  {
    label: "02 / SEO",
    title: "Found on Google from day one",
    body: "Semantic HTML, fast load times, Search Console setup, and structured data built into every project — not bolted on after.",
    icon: Search,
    accent: "var(--blue)",
  },
  {
    label: "03 / SPEED",
    title: "Fast enough to keep visitors",
    body: "Optimised images, minimal JavaScript, and clean code. Your site loads in under two seconds on a mobile connection.",
    icon: Zap,
    accent: "var(--violet)",
  },
  {
    label: "04 / SCOPE",
    title: "Clear scope, no surprises",
    body: "Fixed-price packages with defined deliverables. You know exactly what you're getting before we start.",
    icon: Globe,
    accent: "var(--cyan)",
  },
];

/* ── Process steps ───────────────────────────────────────── */
const PROCESS_STEPS = [
  { day: "DAY 01", title: "Discovery call", desc: "We learn about your business, goals, and audience. Free, no commitment." },
  { day: "DAY 02", title: "Proposal", desc: "A clear scope document with deliverables, timeline, and fixed price." },
  { day: "DAY 03-04", title: "Design", desc: "Wireframes and visual direction. You approve before we build a single page." },
  { day: "DAY 05-12", title: "Build", desc: "Full development: responsive, SEO-ready, connected to your tools." },
  { day: "DAY 13-14", title: "Launch", desc: "Domain connected, live checks done, Search Console and Analytics set up." },
];

/* ── Pricing data (DO NOT CHANGE PRICES) ─────────────────── */
const PLANS = [
  {
    name: "Launch",
    price: "€299",
    note: "one-time",
    desc: "A lean online presence for a new business that needs to launch clearly and professionally.",
    features: [
      "Small one-page or light two-page site",
      "Responsive build",
      "Basic SEO foundations",
      "WhatsApp and social links",
      "2 revision rounds",
    ],
    accent: "var(--cyan)",
    recommended: false,
  },
  {
    name: "Growth",
    price: "€749",
    note: "one-time",
    desc: "A conversion-focused site for a business ready to be found, trusted, and contacted online.",
    features: [
      "Up to 4 pages",
      "Contact form",
      "Google Maps and reviews/testimonials",
      "Basic SEO",
      "Search Console and Analytics setup",
      "3 revision rounds",
    ],
    accent: "var(--blue)",
    recommended: true,
  },
  {
    name: "Pro",
    price: "€1,499",
    note: "one-time",
    desc: "For a more complete digital presence with richer content, motion, and stronger search foundations.",
    features: [
      "Up to 7 pages",
      "Gallery or portfolio",
      "Pop-up and scroll-driven animations",
      "Full SEO structure",
      "Blog setup or website visual pack",
      "4 revision rounds",
    ],
    accent: "var(--violet)",
    recommended: false,
  },
];

/* ── Testimonials ─────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: "Maria K.",
    role: "Restaurant Owner",
    text: "Our new website brought in three new bookings within the first week. The team understood exactly what we needed and delivered faster than I expected.",
    initial: "M",
  },
  {
    name: "Andreas P.",
    role: "Physiotherapy Clinic",
    text: "Professional, responsive, and genuinely invested in making our clinic look its best online. The mobile version is perfect.",
    initial: "A",
  },
  {
    name: "Sophia L.",
    role: "Beauty Salon Owner",
    text: "I was nervous about getting a website built but DM-Labs.io made it completely stress-free. The result looks incredible. Worth every cent.",
    initial: "S",
  },
];

/* ── Reveal hook ──────────────────────────────────────────── */
function useReveal(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { el.style.opacity = "1"; el.style.transform = "none"; return; }
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = "opacity 700ms var(--ease-out), transform 700ms var(--ease-out)";
          el.style.opacity = "1";
          el.style.transform = "none";
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
}

function RevealDiv({ children, className = "", style = {}, delay = 0 }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { el.style.opacity = "1"; el.style.transform = "none"; return; }
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (!el) return;
            el.style.transition = "opacity 700ms var(--ease-out), transform 700ms var(--ease-out)";
            el.style.opacity = "1";
            el.style.transform = "none";
          }, delay);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={className} style={style}>{children}</div>;
}

/* ═══════════════════════════════════════════════════════════
   [00] VIDEO SCROLL HERO
   ═══════════════════════════════════════════════════════════ */
function VideoScrollHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const video = videoRef.current;
    const section = sectionRef.current;
    const headline = headlineRef.current;
    if (!video || !section || !headline) return;

    // Preload video metadata
    video.load();

    const initGSAP = () => {
      if (!video.duration) return;

      const ctx = gsap.context(() => {
        // Pin the section and scrub video
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => {
            if (prefersReduced) return;
            const t = self.progress * video.duration;
            if (isFinite(t)) video.currentTime = t;
          },
        });

        // Headline reveal at 78% scroll progress
        gsap.fromTo(
          headline,
          { opacity: 0, y: 40, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=300%",
              scrub: false,
              onUpdate: (self) => {
                if (self.progress >= 0.78 && headline.style.opacity !== "1") {
                  gsap.to(headline, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" });
                }
              },
            },
          }
        );
      }, section);

      return () => ctx.revert();
    };

    if (video.readyState >= 1) {
      initGSAP();
    } else {
      video.addEventListener("loadedmetadata", initGSAP, { once: true });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: "100vh", background: "var(--ink)" }}
      aria-label="Hero"
    >
      {/* Atmospheric background field */}
      <img
        src={HERO_BG}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.12, mixBlendMode: "screen" }}
      />

      {/* Decorative orbs */}
      <img src={ORB_1} alt="" aria-hidden="true" className="absolute pointer-events-none select-none"
        style={{ width: "55vw", maxWidth: "700px", top: "-10%", right: "-8%", opacity: 0.18, transform: "rotate(-15deg)", animation: "orbFloat 18s ease-in-out infinite" }} />
      <img src={ORB_2} alt="" aria-hidden="true" className="absolute pointer-events-none select-none"
        style={{ width: "40vw", maxWidth: "500px", bottom: "-5%", left: "-5%", opacity: 0.12, animation: "orbFloat 22s ease-in-out infinite reverse" }} />

      {/* Video */}
      <video
        ref={videoRef}
        src={HERO_VIDEO}
        muted
        playsInline
        preload="metadata"
        onLoadedData={() => setVideoReady(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: videoReady ? 0.65 : 0, transition: "opacity 800ms ease" }}
        aria-hidden="true"
      />

      {/* Gradient vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to bottom, rgba(11,27,54,.35) 0%, transparent 40%, transparent 60%, rgba(11,27,54,.8) 100%)"
      }} />

      {/* Headline — revealed at 78% scroll */}
      <div
        ref={headlineRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{ opacity: 0 }}
      >
        <div className="headline-inner" style={{ maxWidth: "900px" }}>
          <p className="mono mb-5" style={{ color: "var(--cyan)", letterSpacing: ".22em" }}>
            WEB DESIGN · PAPHOS · CYPRUS
          </p>
          <h1 style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.4rem, 6.6vw, 5.6rem)",
            letterSpacing: "-.03em",
            lineHeight: .94,
            color: "#fff",
            marginBottom: "1.5rem",
          }}>
            Your business is great.{" "}
            <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Your website should make that obvious.
            </span>
          </h1>
          <p style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 500,
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "rgba(238,241,248,.7)",
            lineHeight: 1.65,
            maxWidth: "52ch",
            margin: "0 auto 2.5rem",
          }}>
            A dedicated web design agency. Professional, fast, conversion-focused websites for businesses like yours. From €299.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary" style={{ padding: "14px 32px", fontSize: "11px" }}>
              Get a Free Consultation
              <ArrowRight size={14} style={{ marginLeft: "6px" }} />
            </Link>
            <Link href="/templates" className="btn btn-ghost" style={{ padding: "14px 28px", fontSize: "11px", color: "#fff", borderColor: "rgba(255,255,255,.25)" }}>
              See Our Work
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0.45 }}>
        <span className="mono" style={{ fontSize: "9px", letterSpacing: ".2em", color: "#fff" }}>SCROLL</span>
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(255,255,255,.6), transparent)" }} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   [01] PROOF BAR — mono ticker
   ═══════════════════════════════════════════════════════════ */
function ProofBar() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      className="overflow-hidden"
      style={{
        background: "var(--ink)",
        borderTop: "1px solid rgba(255,255,255,.06)",
        borderBottom: "1px solid rgba(255,255,255,.06)",
        padding: "14px 0",
      }}
      aria-hidden="true"
    >
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{
          animation: "ticker 28s linear infinite",
          width: "max-content",
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-3">
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "10px",
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "rgba(238,241,248,.45)",
              }}
            >
              {item}
            </span>
            <span style={{ color: "var(--cyan)", opacity: 0.5, fontSize: "8px" }}>+</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   [02] CAPABILITIES — glass panels
   ═══════════════════════════════════════════════════════════ */
function Capabilities() {
  return (
    <section style={{ background: "var(--cloud)", padding: "100px 0" }}>
      <div className="container">
        <RevealDiv style={{ marginBottom: "56px" }}>
          <p className="mono" style={{ color: "var(--slate)", marginBottom: "12px" }}>
            WHAT WE BUILD
          </p>
          <h2 style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)",
            letterSpacing: "-.028em",
            lineHeight: 1.02,
            color: "var(--ink)",
            maxWidth: "18ch",
          }}>
            Websites that{" "}
            <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              work.
            </span>
          </h2>
        </RevealDiv>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "var(--hairline)" }}>
          {CAPS.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <RevealDiv
                key={cap.label}
                delay={i * 80}
                style={{
                  background: "var(--glass-deep)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  padding: "40px 32px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Chamfer accent on first card only */}
                {i === 0 && (
                  <div style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "14px",
                    height: "14px",
                    background: "var(--cloud)",
                    clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                  }} />
                )}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    background: cap.accent,
                    opacity: 0.12,
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={20} style={{ color: cap.accent, opacity: 8 }} />
                </div>
                <Icon size={20} style={{ color: cap.accent, marginBottom: "16px", marginTop: "-52px" }} />
                <p className="mono" style={{ color: "var(--slate)", marginBottom: "10px", fontSize: "9px" }}>
                  {cap.label}
                </p>
                <h3 style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  letterSpacing: "-.018em",
                  color: "var(--ink)",
                  marginBottom: "12px",
                  lineHeight: 1.2,
                }}>
                  {cap.title}
                </h3>
                <p style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: ".9rem",
                  color: "var(--slate)",
                  lineHeight: 1.62,
                }}>
                  {cap.body}
                </p>
              </RevealDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   [03] WORK GRID — four-up 2x2, 16:10, gap 2px, sharp
   ═══════════════════════════════════════════════════════════ */
const WORK_ITEMS = [
  { label: "Cafe & Coffee", industry: "Hospitality", href: "/templates" },
  { label: "Beauty & Wellness", industry: "Retail & Services", href: "/templates" },
  { label: "Clinics & Health", industry: "Healthcare", href: "/templates" },
  { label: "Restaurants", industry: "Food & Beverage", href: "/web-design-restaurants-cyprus" },
];

function WorkGrid() {
  return (
    <section style={{ background: "var(--ink)", padding: "100px 0" }}>
      <div className="container">
        <RevealDiv style={{ marginBottom: "56px" }}>
          <p className="mono" style={{ color: "var(--slate-soft)", marginBottom: "12px" }}>
            OUR WORK
          </p>
          <h2 style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)",
            letterSpacing: "-.028em",
            lineHeight: 1.02,
            color: "#fff",
            maxWidth: "22ch",
          }}>
            Every website is built from scratch. These are examples of the range.
          </h2>
        </RevealDiv>

        <div
          className="grid grid-cols-2"
          style={{ gap: "2px", background: "rgba(255,255,255,.04)" }}
        >
          {WORK_ITEMS.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              style={{ display: "block", textDecoration: "none", position: "relative", overflow: "hidden", aspectRatio: "16/10" }}
            >
              <img
                src={WORK_IMGS[i]}
                alt={item.label}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 600ms var(--ease-out)" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              />
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(11,27,54,.85) 0%, transparent 60%)",
                transition: "opacity 300ms",
              }} />
              <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
                <p className="mono" style={{ color: "var(--cyan)", marginBottom: "4px", fontSize: "9px" }}>
                  {item.industry}
                </p>
                <p style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#fff",
                  letterSpacing: "-.01em",
                }}>
                  {item.label}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <RevealDiv style={{ marginTop: "40px", textAlign: "center" }}>
          <Link href="/templates" className="btn btn-ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,.2)", padding: "13px 28px", fontSize: "10px" }}>
            See All Examples
            <ArrowRight size={13} style={{ marginLeft: "6px" }} />
          </Link>
        </RevealDiv>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   [04] PROCESS — horizontal 5-step track
   ═══════════════════════════════════════════════════════════ */
function ProcessTrack() {
  return (
    <section style={{ background: "var(--mist)", padding: "100px 0", overflow: "hidden" }}>
      <div className="container">
        <RevealDiv style={{ marginBottom: "60px" }}>
          <p className="mono" style={{ color: "var(--slate)", marginBottom: "12px" }}>
            HOW IT WORKS
          </p>
          <h2 style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)",
            letterSpacing: "-.028em",
            lineHeight: 1.02,
            color: "var(--ink)",
          }}>
            From idea to launch in 14 days.
          </h2>
        </RevealDiv>

        {/* Horizontal scrollable on mobile, grid on desktop */}
        <div
          className="grid grid-cols-1 sm:grid-cols-5 gap-px"
          style={{ background: "var(--hairline)" }}
        >
          {PROCESS_STEPS.map((step, i) => (
            <RevealDiv
              key={step.day}
              delay={i * 100}
              style={{
                background: "var(--cloud)",
                padding: "32px 24px",
                position: "relative",
              }}
            >
              <p className="mono" style={{ color: "var(--cyan)", marginBottom: "16px", fontSize: "9px" }}>
                {step.day}
              </p>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "var(--hairline)",
                  lineHeight: 1,
                  marginBottom: "16px",
                  userSelect: "none",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 style={{
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "-.015em",
                color: "var(--ink)",
                marginBottom: "10px",
              }}>
                {step.title}
              </h3>
              <p style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: ".875rem",
                color: "var(--slate)",
                lineHeight: 1.62,
              }}>
                {step.desc}
              </p>
            </RevealDiv>
          ))}
        </div>

        <RevealDiv style={{ marginTop: "40px" }}>
          <Link href="/process" className="btn btn-ghost" style={{ padding: "13px 28px", fontSize: "10px" }}>
            See Full Process
            <ArrowRight size={13} style={{ marginLeft: "6px" }} />
          </Link>
        </RevealDiv>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   [05] TEAM — AI-leverage story
   ═══════════════════════════════════════════════════════════ */
function TeamSection() {
  return (
    <section style={{ background: "var(--cloud)", padding: "100px 0" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <RevealDiv>
            <p className="mono" style={{ color: "var(--slate)", marginBottom: "12px" }}>
              WHO WE ARE
            </p>
            <h2 style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)",
              letterSpacing: "-.028em",
              lineHeight: 1.02,
              color: "var(--ink)",
              marginBottom: "24px",
            }}>
              Small team. Serious output.
            </h2>
            <p style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "1.0625rem",
              fontWeight: 500,
              color: "var(--slate)",
              lineHeight: 1.65,
              marginBottom: "20px",
              maxWidth: "52ch",
            }}>
              DM-Labs.io is a dedicated web design agency based in Paphos, Cyprus. We work with small and medium businesses across Cyprus, Greece, and Europe.
            </p>
            <p style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: ".95rem",
              color: "var(--slate)",
              lineHeight: 1.62,
              maxWidth: "52ch",
              marginBottom: "32px",
            }}>
              We combine professional design craft with AI-assisted workflows to deliver faster, without cutting corners on quality. You get a dedicated point of contact, clear communication, and a site that performs.
            </p>
            <Link href="/contact" className="btn btn-primary" style={{ padding: "13px 28px", fontSize: "10px" }}>
              Start a Conversation
              <ArrowRight size={13} style={{ marginLeft: "6px" }} />
            </Link>
          </RevealDiv>

          {/* Testimonials */}
          <div className="flex flex-col gap-4">
            {TESTIMONIALS.map((t, i) => (
              <RevealDiv
                key={t.name}
                delay={i * 120}
                style={{
                  background: "var(--glass)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid var(--hairline)",
                  padding: "24px",
                }}
              >
                <p style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: ".9rem",
                  color: "var(--ink)",
                  lineHeight: 1.65,
                  marginBottom: "16px",
                }}>
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div style={{
                    width: "32px",
                    height: "32px",
                    background: "var(--grad)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Satoshi', sans-serif",
                    fontWeight: 900,
                    fontSize: ".875rem",
                    color: "#fff",
                    flexShrink: 0,
                  }}>
                    {t.initial}
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: ".875rem", color: "var(--ink)" }}>{t.name}</p>
                    <p className="mono" style={{ color: "var(--slate)", fontSize: "9px" }}>{t.role}</p>
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   [06] PRICING — deliberately still
   ═══════════════════════════════════════════════════════════ */
function PricingSection() {
  return (
    <section style={{ background: "var(--mist)", padding: "100px 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p className="mono" style={{ color: "var(--slate)", marginBottom: "12px" }}>
            PRICING
          </p>
          <h2 style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)",
            letterSpacing: "-.028em",
            lineHeight: 1.02,
            color: "var(--ink)",
            marginBottom: "16px",
          }}>
            Packages from €299
          </h2>
          <p style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "1rem",
            color: "var(--slate)",
            maxWidth: "44ch",
            margin: "0 auto",
            lineHeight: 1.62,
          }}>
            Fixed prices. Clear deliverables. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: "var(--hairline)" }}>
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              style={{
                background: plan.recommended ? "var(--ink)" : "var(--cloud)",
                padding: "40px 32px",
                position: "relative",
              }}
            >
              {plan.recommended && (
                <div style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "var(--grad)",
                  padding: "4px 10px",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "8px",
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  color: "#fff",
                }}>
                  RECOMMENDED
                </div>
              )}
              <p className="mono" style={{ color: plan.accent, marginBottom: "12px", fontSize: "9px" }}>
                {plan.name.toUpperCase()} WEBSITE
              </p>
              <div style={{ marginBottom: "8px" }}>
                <span style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 900,
                  fontSize: "2.8rem",
                  letterSpacing: "-.03em",
                  color: plan.recommended ? "#fff" : "var(--ink)",
                  lineHeight: 1,
                }}>
                  {plan.price}
                </span>
                <span style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: ".875rem",
                  color: plan.recommended ? "rgba(238,241,248,.5)" : "var(--slate)",
                  marginLeft: "6px",
                }}>
                  {plan.note}
                </span>
              </div>
              <p style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: ".875rem",
                color: plan.recommended ? "rgba(238,241,248,.65)" : "var(--slate)",
                lineHeight: 1.62,
                marginBottom: "28px",
                minHeight: "3.5em",
              }}>
                {plan.desc}
              </p>
              <ul style={{ marginBottom: "32px" }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
                    <CheckCircle2 size={15} style={{ color: plan.accent, flexShrink: 0, marginTop: "2px" }} />
                    <span style={{
                      fontFamily: "'Satoshi', sans-serif",
                      fontSize: ".875rem",
                      color: plan.recommended ? "rgba(238,241,248,.8)" : "var(--ink)",
                      lineHeight: 1.5,
                    }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "13px 24px",
                  fontSize: "10px",
                  background: plan.recommended ? "var(--grad)" : "transparent",
                  color: plan.recommended ? "#fff" : "var(--ink)",
                  border: plan.recommended ? "none" : "1px solid var(--hairline)",
                  width: "100%",
                  textDecoration: "none",
                }}
              >
                Get a Free Consultation
              </Link>
            </div>
          ))}
        </div>

        {/* Enterprise wide banner */}
        <div style={{
          marginTop: "2px",
          background: "var(--ink)",
          padding: "40px 32px",
          display: "flex",
          flexDirection: "column" as const,
          gap: "24px",
        }}>
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div style={{ flexShrink: 0 }}>
              <p className="mono" style={{ color: "var(--violet)", marginBottom: "8px", fontSize: "9px" }}>
                ENTERPRISE / CUSTOM
              </p>
              <div style={{ marginBottom: "4px" }}>
                <span style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 900,
                  fontSize: "2.2rem",
                  letterSpacing: "-.03em",
                  color: "#fff",
                  lineHeight: 1,
                }}>
                  From €1,499
                </span>
              </div>
              <p className="mono" style={{ color: "var(--slate-soft)", marginBottom: "16px", fontSize: "9px" }}>
                QUOTE BASED ON SCOPE
              </p>
              <p style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: ".875rem",
                color: "rgba(238,241,248,.55)",
                lineHeight: 1.62,
                maxWidth: "32ch",
                marginBottom: "20px",
              }}>
                For integrations, multilingual builds, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, or unusual content volume.
              </p>
              <Link href="/contact" className="btn" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "12px 24px",
                fontSize: "10px",
                background: "var(--grad)",
                color: "#fff",
                border: "none",
                textDecoration: "none",
              }}>
                <MessageCircle size={13} />
                Contact Us
              </Link>
            </div>
            <div style={{ width: "1px", alignSelf: "stretch", background: "rgba(255,255,255,.06)" }} className="hidden lg:block" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-4 flex-1">
              {[
                { icon: Globe, label: "Fully custom design from scratch" },
                { icon: Zap, label: "Scope designed around your project" },
                { icon: CalendarCheck, label: "CRM and booking integrations" },
                { icon: Languages, label: "Multi-language support" },
                { icon: Users, label: "Dedicated project manager" },
                { icon: Headphones, label: "Priority support and delivery" },
                { icon: ArrowRight, label: "Ongoing retainer option" },
                { icon: CheckCircle2, label: "Custom SEO and content strategy" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <Icon size={13} style={{ color: "var(--cyan)", flexShrink: 0, marginTop: "2px" }} />
                  <span style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: ".8rem",
                    color: "rgba(238,241,248,.65)",
                    lineHeight: 1.5,
                  }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <p style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: ".875rem",
            color: "var(--slate)",
            marginBottom: "8px",
          }}>
            All plans include a <strong style={{ color: "var(--ink)" }}>free consultation</strong> — no commitment, no pressure.
          </p>
          <Link href="/pricing" style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: ".875rem",
            fontWeight: 500,
            color: "var(--blue)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}>
            See full pricing and add-ons
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   [07] CTA — full-bleed, single action
   ═══════════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section
      style={{
        background: "var(--ink)",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Atmospheric banner behind CTA */}
      <img
        src={BANNER_W1}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ opacity: 0.08, mixBlendMode: "screen" }}
      />
      <img
        src={ORB_3}
        alt=""
        aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{ width: "60vw", maxWidth: "800px", top: "-20%", right: "-10%", opacity: 0.1 }}
      />

      <div className="container relative" style={{ textAlign: "center" }}>
        <RevealDiv>
          <p className="mono" style={{ color: "var(--cyan)", marginBottom: "16px" }}>
            READY TO START?
          </p>
          <h2 style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.2rem, 5.5vw, 4.8rem)",
            letterSpacing: "-.03em",
            lineHeight: .96,
            color: "#fff",
            marginBottom: "24px",
            maxWidth: "16ch",
            margin: "0 auto 24px",
          }}>
            Let's build something{" "}
            <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              worth visiting.
            </span>
          </h2>
          <p style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "1.0625rem",
            fontWeight: 500,
            color: "rgba(238,241,248,.6)",
            lineHeight: 1.65,
            maxWidth: "44ch",
            margin: "0 auto 40px",
          }}>
            Free consultation. No commitment. We'll tell you exactly what we'd build and what it would cost before you decide anything.
          </p>
          <Link
            href="/contact"
            className="btn btn-primary"
            style={{ padding: "18px 44px", fontSize: "11px", letterSpacing: ".2em" }}
          >
            Get a Free Consultation
            <ArrowRight size={14} style={{ marginLeft: "8px" }} />
          </Link>
        </RevealDiv>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════════════════ */
export default function HomePage() {
  useSEO({
    title: "DM-Labs.io | Web Design in Paphos and Cyprus from €299",
    description:
      "DM-Labs.io builds custom, mobile-first websites for businesses in Paphos and across Cyprus. Clear scope, SEO foundations, and packages from €299.",
  });

  useEffect(() => {
    const existingSchema = document.getElementById("home-localbusiness-schema");
    if (existingSchema) return;
    const offers = [
      { "@type": "Offer", name: "Launch Website", description: "1-page landing site, mobile responsive, WhatsApp button, basic SEO, 2 revision rounds.", price: "299", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Growth Website", description: "Up to 4 pages, contact form, map, testimonials, basic SEO, Search Console and Analytics setup, 3 revision rounds.", price: "749", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Pro Website", description: "Up to 7 pages, gallery, pop-up, scroll animations, full SEO structure, blog setup or a website visual pack, 4 revision rounds.", price: "1499", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Enterprise / Custom", description: "Custom scope for integrations, multilingual websites, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, and unusual content volume.", priceSpecification: { "@type": "PriceSpecification", minPrice: "1499", priceCurrency: "EUR" } },
    ];
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfessionalService",
          "@id": "https://dm-labs.io/#professionalservice",
          name: "DM-Labs.io",
          description: "DM-Labs.io designs and builds professional, custom websites for businesses in Paphos, across Cyprus, and in Greece. Mobile-first, SEO-ready websites with clear packages from €299.",
          url: "https://dm-labs.io/",
          logo: "https://dm-labs.io/logo.png",
          image: "https://dm-labs.io/og-image.png",
          telephone: "+35797472847",
          email: "info@dm-labs.io",
          priceRange: "€299-€1,499",
          currenciesAccepted: "EUR",
          paymentAccepted: "Bank Transfer, Credit Card",
          address: { "@type": "PostalAddress", streetAddress: "Eleftheriou Chandrinou", postalCode: "8045", addressLocality: "Paphos", addressCountry: "CY" },
          areaServed: [
            { "@type": "City", name: "Paphos", addressCountry: "CY" },
            { "@type": "City", name: "Limassol", addressCountry: "CY" },
            { "@type": "City", name: "Nicosia", addressCountry: "CY" },
            { "@type": "City", name: "Larnaca", addressCountry: "CY" },
            { "@type": "Country", name: "Cyprus" },
            { "@type": "Country", name: "Greece" },
          ],
          serviceType: ["Website Design", "Web Development", "SEO Optimisation", "Website Maintenance"],
          sameAs: ["https://www.instagram.com/dm_labs.io/"],
          hasOfferCatalog: { "@type": "OfferCatalog", name: "Website Packages", itemListElement: offers },
        },
      ],
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "home-localbusiness-schema";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { document.getElementById("home-localbusiness-schema")?.remove(); };
  }, []);

  return (
    <>
      <VideoScrollHero />
      <ProofBar />
      <Capabilities />
      <WorkGrid />
      <ProcessTrack />
      <TeamSection />
      <PricingSection />
      <CTASection />
    </>
  );
}
