/* D&M Studio — Process Page
   Remove fear. Show simplicity. Client effort minimal.
   Step visualization required. */

import { Link } from "wouter";
import { MessageCircle, Palette, Code2, Rocket, ArrowRight, CheckCircle2, Clock, FileText, Image } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/972584928188";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Quick chat",
    subtitle: "We understand your business",
    desc: "You contact us on WhatsApp or through our form. We ask a few simple questions about your business — what you do, who your customers are, and what you need. No technical questions. No forms to fill in.",
    duration: "15–30 minutes",
    youDo: "Tell us about your business",
    weDo: "Listen, ask the right questions, and plan your website",
    color: "bg-blue-50 text-blue-600",
  },
  {
    number: "02",
    icon: FileText,
    title: "You send us the basics",
    subtitle: "Minimal effort from you",
    desc: "We give you a simple checklist. You send us your business name, a short description of what you do, and any photos or logo you have. Don't have a logo or photos? No problem — we can work without them.",
    duration: "You decide the pace",
    youDo: "Business name, description, logo (if you have one), photos (optional)",
    weDo: "Handle everything else — content, design, structure",
    color: "bg-purple-50 text-purple-600",
  },
  {
    number: "03",
    icon: Palette,
    title: "We design your website",
    subtitle: "You review and approve",
    desc: "We prepare your website and show you a preview. You review it and tell us what you think. We make adjustments until you're happy. Up to 2 rounds of revisions are included.",
    duration: "2–4 working days",
    youDo: "Review the design and give feedback",
    weDo: "Design your complete website, make revisions",
    color: "bg-orange-50 text-orange-600",
  },
  {
    number: "04",
    icon: Code2,
    title: "We build everything",
    subtitle: "Mobile ready and optimized",
    desc: "Once you approve the design, we build the final version. Mobile-optimized, fast-loading, and ready for your customers. You don't need to do anything during this step.",
    duration: "2–4 working days",
    youDo: "Nothing — just wait",
    weDo: "Build the full website, optimize for mobile and speed",
    color: "bg-green-50 text-green-600",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Your website goes live",
    subtitle: "Customers can find you online",
    desc: "We connect your website to your domain and make it live. We guide you through the domain setup step by step. Your website is online and customers can find you immediately.",
    duration: "1 working day",
    youDo: "Approve the final website",
    weDo: "Launch your website, connect your domain, confirm everything works",
    color: "bg-teal-50 text-teal-600",
  },
];

const clientNeeds = [
  { icon: FileText, item: "Your business name", required: true },
  { icon: FileText, item: "What your business does (a few sentences)", required: true },
  { icon: Image, item: "Your logo", required: false },
  { icon: Image, item: "Photos of your work or business", required: false },
];

export default function Process() {
  return (
    <div>
      {/* Hero */}
      <section className="section bg-background pt-24 lg:pt-32">
        <div className="container">
          <div className="max-w-2xl">
            <span className="section-label">How It Works</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.02em" }}>
              Getting your website is easier than you think
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              We've made the process as simple as possible. You provide the basics about your business — we handle everything else.
            </p>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-accent/40 border border-accent">
              <Clock size={18} className="text-primary flex-shrink-0" aria-hidden="true" />
              <p className="text-sm text-foreground">
                <strong>Most businesses launch their website in under 10 days.</strong> The timeline depends on how quickly you can send us your information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl">
            <div className="space-y-8">
              {steps.map((step, i) => (
                <div key={step.number} className="relative">
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div
                      className="absolute left-6 top-16 bottom-0 w-px bg-border"
                      style={{ height: "calc(100% + 2rem)" }}
                      aria-hidden="true"
                    />
                  )}

                  <div className="flex gap-5">
                    {/* Step icon */}
                    <div className="flex-shrink-0 relative z-10">
                      <div className={`w-12 h-12 rounded-2xl ${step.color} flex items-center justify-center`}>
                        <step.icon size={22} aria-hidden="true" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Step {step.number}</span>
                          <h2 className="text-xl font-bold text-foreground mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{step.title}</h2>
                          <p className="text-sm text-primary font-medium">{step.subtitle}</p>
                        </div>
                        <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full flex-shrink-0">
                          <Clock size={12} className="text-muted-foreground" aria-hidden="true" />
                          <span className="text-xs text-muted-foreground font-medium">{step.duration}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{step.desc}</p>

                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="bg-muted/50 rounded-xl p-4">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">You do</p>
                          <p className="text-sm text-foreground">{step.youDo}</p>
                        </div>
                        <div className="bg-accent/40 rounded-xl p-4">
                          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">We do</p>
                          <p className="text-sm text-foreground">{step.weDo}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What you need to provide */}
      <section className="section bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-4xl">
            <div>
              <span className="section-label">What You Need</span>
              <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                You only need to provide the basics
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We help if materials are missing. Don't worry if you don't have a logo or photos — we can work with what you have.
              </p>

              <div className="space-y-3">
                {clientNeeds.map((need) => (
                  <div key={need.item} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-border">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${need.required ? "bg-accent" : "bg-muted"}`}>
                      <need.icon size={16} className={need.required ? "text-primary" : "text-muted-foreground"} aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{need.item}</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${need.required ? "bg-accent text-primary" : "bg-muted text-muted-foreground"}`}>
                      {need.required ? "Required" : "Optional"}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground mt-4 italic">
                Once we receive your information, we begin immediately.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Payment structure</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                    <p className="text-sm text-foreground">50% payment before we start</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                    <p className="text-sm text-foreground">50% payment before we launch</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">Simple and fair. You only pay the second half when you're happy with the result.</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Revision policy</h3>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground">Up to 2 revision rounds are included. We want you to be happy with the result.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Domain &amp; hosting</h3>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground">Your domain always belongs to you. We help you set up hosting and connect everything step by step.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-foreground">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Ready to start?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
            The first step is just a quick chat. No commitment, no pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] text-white font-semibold text-base hover:bg-[#1ebe5d] transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Start the Conversation
            </a>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Read FAQ <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
