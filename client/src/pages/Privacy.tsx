/* D&M LABS — Privacy Policy */
import { Link } from "wouter";
import AnimateIn from "@/components/AnimateIn";

export default function Privacy() {
  return (
    <>
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(2rem, 4vh, 3rem)" }}>
        <div className="container relative z-10 text-center">
          <AnimateIn>
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Legal</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5">Privacy Policy</h1>
            <p className="text-sm text-[#5B6472]">Last updated: February 2026</p>
          </AnimateIn>
        </div>
      </section>
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl">
          <AnimateIn>
            <div className="space-y-8 text-[#5B6472] text-sm leading-relaxed">
              <div><h2 className="text-xl font-semibold text-[#111315] mb-3">Who We Are</h2><p>D&M Labs is a website design service for small businesses. We can be reached at <a href="mailto:dudeandmadame@gmail.com" className="text-[#5B8CFF] hover:underline">dudeandmadame@gmail.com</a> or via WhatsApp.</p></div>
              <div><h2 className="text-xl font-semibold text-[#111315] mb-3">Information We Collect</h2><p>When you contact us, we collect your name, email address, business type, and any message you send. We only collect information you provide directly.</p></div>
              <div><h2 className="text-xl font-semibold text-[#111315] mb-3">How We Use It</h2><p>Your information is used solely to respond to your enquiries and deliver our services. We do not sell, rent, or share your personal information with third parties.</p></div>
              <div><h2 className="text-xl font-semibold text-[#111315] mb-3">Cookies</h2><p>We use essential cookies for functionality and analytics cookies (with consent) to understand site usage. See our <Link href="/cookies" className="text-[#5B8CFF] hover:underline">Cookie Policy</Link>.</p></div>
              <div><h2 className="text-xl font-semibold text-[#111315] mb-3">Data Retention</h2><p>We retain personal data only as long as necessary to fulfil the purposes described above, or as required by law.</p></div>
              <div><h2 className="text-xl font-semibold text-[#111315] mb-3">Your Rights (GDPR)</h2><p>You have the right to access, correct, or delete your personal data. Contact us at <a href="mailto:dudeandmadame@gmail.com" className="text-[#5B8CFF] hover:underline">dudeandmadame@gmail.com</a> to exercise these rights.</p></div>
              <div><h2 className="text-xl font-semibold text-[#111315] mb-3">Contact</h2><p>Questions about this policy? Email <a href="mailto:dudeandmadame@gmail.com" className="text-[#5B8CFF] hover:underline">dudeandmadame@gmail.com</a>.</p></div>
            </div>
            <div className="mt-10 pt-8 border-t border-[#E2E5EA] flex gap-4">
              <Link href="/cookies" className="text-sm text-[#5B8CFF] hover:underline">Cookie Policy</Link>
              <Link href="/terms" className="text-sm text-[#5B8CFF] hover:underline">Terms of Service</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
