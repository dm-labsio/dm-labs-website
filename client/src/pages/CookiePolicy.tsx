/* D&M LABS — Cookie Policy */
import { Link } from "wouter";
import AnimateIn from "@/components/AnimateIn";

export default function CookiePolicy() {
  return (
    <>
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(2rem, 4vh, 3rem)" }}>
        <div className="container relative z-10 text-center">
          <AnimateIn>
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Legal</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5">Cookie Policy</h1>
            <p className="text-sm text-[#5B6472]">Last updated: February 2026</p>
          </AnimateIn>
        </div>
      </section>
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl">
          <AnimateIn>
            <div className="space-y-8 text-[#5B6472] text-sm leading-relaxed">
              <div><h2 className="text-xl font-semibold text-[#111315] mb-3">What Are Cookies</h2><p>Cookies are small text files stored on your device when you visit a website. They help the website function properly and provide information to the site owners.</p></div>
              <div><h2 className="text-xl font-semibold text-[#111315] mb-3">Essential Cookies</h2><p>These cookies are necessary for the website to function. They include cookies for cookie consent preferences and basic site functionality. These cannot be disabled.</p></div>
              <div><h2 className="text-xl font-semibold text-[#111315] mb-3">Analytics Cookies</h2><p>With your consent, we use analytics cookies to understand how visitors interact with our website. This helps us improve our services. We use privacy-friendly analytics that do not track you across other websites.</p></div>
              <div><h2 className="text-xl font-semibold text-[#111315] mb-3">Managing Cookies</h2><p>You can manage your cookie preferences through the cookie banner on our website. You can also delete cookies through your browser settings at any time.</p></div>
              <div><h2 className="text-xl font-semibold text-[#111315] mb-3">Contact</h2><p>Questions? Email <a href="mailto:dudeandmadame@gmail.com" className="text-[#5B8CFF] hover:underline">dudeandmadame@gmail.com</a>.</p></div>
            </div>
            <div className="mt-10 pt-8 border-t border-[#E2E5EA] flex gap-4">
              <Link href="/privacy" className="text-sm text-[#5B8CFF] hover:underline">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-[#5B8CFF] hover:underline">Terms of Service</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
