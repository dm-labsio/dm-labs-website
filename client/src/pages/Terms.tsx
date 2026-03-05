/* D&M LABS — Terms of Service */
import { Link } from "wouter";
import AnimateIn from "@/components/AnimateIn";

export default function Terms() {
  return (
    <>
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(2rem, 4vh, 3rem)" }}>
        <div className="container relative z-10 text-center">
          <AnimateIn>
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Legal</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5">Terms of Service</h1>
            <p className="text-sm text-[#5B6472]">Last updated: February 2026</p>
          </AnimateIn>
        </div>
      </section>
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl">
          <AnimateIn>
            <div className="space-y-8 text-[#5B6472] text-sm leading-relaxed">
              <div><h2 className="text-xl font-semibold text-[#111315] mb-3">About These Terms</h2><p>These terms explain what you can expect from D&M Labs and what we expect from you. We've kept them simple and fair.</p></div>
              <div><h2 className="text-xl font-semibold text-[#111315] mb-3">Our Services</h2><p>D&M Labs provides website design and development services for businesses of all sizes. We offer website packages starting from €250, plus optional monthly maintenance plans.</p></div>
              <div><h2 className="text-xl font-semibold text-[#111315] mb-3">Payment</h2><p>Payment terms are agreed upon before the project begins. Prices are in Euros. Domain registration and third-party hosting costs (if applicable) are separate.</p></div>
              <div><h2 className="text-xl font-semibold text-[#111315] mb-3">Revisions</h2><p>Every project includes up to 2 rounds of revisions. Additional changes after launch can be arranged at an agreed rate.</p></div>
              <div><h2 className="text-xl font-semibold text-[#111315] mb-3">Delivery Timeline</h2><p>Delivery timelines start once we receive all required materials. Starter Website: 5–7 working days. Business Website: 7–10 working days.</p></div>
              <div><h2 className="text-xl font-semibold text-[#111315] mb-3">Your Content</h2><p>You are responsible for ensuring that any content you provide does not infringe on third-party rights.</p></div>
              <div><h2 className="text-xl font-semibold text-[#111315] mb-3">Domain & Hosting</h2><p>Your domain name always belongs to you. We assist with setup but do not own or control your domain or hosting.</p></div>
              <div><h2 className="text-xl font-semibold text-[#111315] mb-3">Maintenance</h2><p>Monthly maintenance plans can be cancelled at any time. There are no long-term contracts.</p></div>
              <div><h2 className="text-xl font-semibold text-[#111315] mb-3">Contact</h2><p>Questions? Email <a href="mailto:dudeandmadame@gmail.com" className="text-[#5B8CFF] hover:underline">dudeandmadame@gmail.com</a>.</p></div>
            </div>
            <div className="mt-10 pt-8 border-t border-[#E2E5EA] flex gap-4">
              <Link href="/privacy" className="text-sm text-[#5B8CFF] hover:underline">Privacy Policy</Link>
              <Link href="/cookies" className="text-sm text-[#5B8CFF] hover:underline">Cookie Policy</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
