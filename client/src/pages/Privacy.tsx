/* D&M Studio — Privacy Policy
   GDPR compliant, simple readable English, no heavy legal jargon */

import { Link } from "wouter";

export default function Privacy() {
  return (
    <div className="section bg-background pt-24 lg:pt-32">
      <div className="container">
        <div className="max-w-2xl">
          <span className="section-label">Legal</span>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-10">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>

          <div className="prose prose-sm max-w-none space-y-8 text-foreground">
            <section>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Who we are</h2>
              <p className="text-muted-foreground leading-relaxed">D&amp;M Studio is a website design service for small businesses. We can be reached at dudeandmadame@gmail.com or via WhatsApp.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>What information we collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">When you contact us through our website, we collect:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1.5 ml-2">
                <li>Your name</li>
                <li>Your email address</li>
                <li>Your business type</li>
                <li>Any message you choose to send us</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">We only collect information that you provide to us directly.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Why we collect it</h2>
              <p className="text-muted-foreground leading-relaxed">Your information is used only to respond to your request and to provide you with our services. We do not use your information for marketing without your permission.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>How long we keep it</h2>
              <p className="text-muted-foreground leading-relaxed">We keep your contact information for as long as necessary to provide our services. If you ask us to delete your information, we will do so promptly.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Your rights under GDPR</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">Under EU GDPR, you have the right to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1.5 ml-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Request restriction of processing</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">To exercise any of these rights, contact us at dudeandmadame@gmail.com.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">We use essential cookies to make our website work. You can read more in our <Link href="/cookies" className="text-primary underline">Cookie Policy</Link>.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Contact</h2>
              <p className="text-muted-foreground leading-relaxed">If you have any questions about this privacy policy, contact us at dudeandmadame@gmail.com.</p>
            </section>
          </div>

          <div className="mt-10 pt-8 border-t border-border flex gap-4">
            <Link href="/cookies" className="text-sm text-primary hover:underline">Cookie Policy</Link>
            <Link href="/terms" className="text-sm text-primary hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
