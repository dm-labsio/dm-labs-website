/* D&M Studio — Cookie Policy */

import { Link } from "wouter";

export default function CookiePolicy() {
  return (
    <div className="section bg-background pt-24 lg:pt-32">
      <div className="container">
        <div className="max-w-2xl">
          <span className="section-label">Legal</span>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Cookie Policy
          </h1>
          <p className="text-muted-foreground mb-10">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>

          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>What are cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">Cookies are small text files that websites store on your device. They help websites remember your preferences and improve your experience.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>How we use cookies</h2>
              <p className="text-muted-foreground leading-relaxed">We use cookies to improve your experience on our website. We keep it minimal — we only use what's necessary.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Types of cookies we use</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white border border-border">
                  <h3 className="font-semibold text-foreground mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Essential cookies</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">These cookies are required for the website to work properly. They include your cookie consent preference. You cannot disable these cookies.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-border">
                  <h3 className="font-semibold text-foreground mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Analytics cookies (optional)</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">We may use analytics cookies in the future to understand how visitors use our website. These are only activated with your consent.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>How to control cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">You can control cookies in two ways:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1.5 ml-2">
                <li>Use our cookie banner to choose which cookies to allow</li>
                <li>Change your browser settings to block or delete cookies</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">Note: blocking essential cookies may affect how the website works.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Questions?</h2>
              <p className="text-muted-foreground leading-relaxed">Contact us at hello@dmstudio.com if you have any questions about our use of cookies.</p>
            </section>
          </div>

          <div className="mt-10 pt-8 border-t border-border flex gap-4">
            <Link href="/privacy" className="text-sm text-primary hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-primary hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
