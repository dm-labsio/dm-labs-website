/* D&M Studio — Terms of Service
   Friendly tone, not aggressive legal contract */

import { Link } from "wouter";

export default function Terms() {
  return (
    <div className="section bg-background pt-24 lg:pt-32">
      <div className="container">
        <div className="max-w-2xl">
          <span className="section-label">Legal</span>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Terms of Service
          </h1>
          <p className="text-muted-foreground mb-10">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>

          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>About these terms</h2>
              <p className="text-muted-foreground leading-relaxed">These terms explain what you can expect from D&amp;M Studio and what we expect from you. We've kept them simple and fair.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Our services</h2>
              <p className="text-muted-foreground leading-relaxed">D&amp;M Studio provides website design and development services for small businesses. We offer two main packages: Starter Website (€250) and Business Website (€350), plus optional monthly maintenance.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Payment</h2>
              <p className="text-muted-foreground leading-relaxed">We split payment in two: 50% before we start work, and 50% before we launch your website. We accept payment via bank transfer or other agreed methods. Prices are in Euros and do not include domain or hosting costs.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Revisions</h2>
              <p className="text-muted-foreground leading-relaxed">Every project includes up to 2 rounds of revisions. Additional changes after launch can be arranged at an agreed rate. We want you to be happy with the result.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Delivery timeline</h2>
              <p className="text-muted-foreground leading-relaxed">Delivery timelines start once we receive all required materials from you. Starter Website: 5–7 working days. Business Website: 7–10 working days. Delays caused by late materials may extend the timeline.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Your content</h2>
              <p className="text-muted-foreground leading-relaxed">You are responsible for ensuring that any content you provide (text, images, logos) does not infringe on third-party rights. By providing content, you confirm you have the right to use it.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Domain and hosting</h2>
              <p className="text-muted-foreground leading-relaxed">Your domain name always belongs to you. We assist with setup but do not own or control your domain or hosting. You are responsible for renewing your domain and hosting.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Maintenance</h2>
              <p className="text-muted-foreground leading-relaxed">Monthly maintenance plans can be cancelled at any time with 30 days notice. There are no long-term contracts.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Questions</h2>
              <p className="text-muted-foreground leading-relaxed">If you have any questions about these terms, contact us at dudeandmadame@gmail.com.</p>
            </section>
          </div>

          <div className="mt-10 pt-8 border-t border-border flex gap-4">
            <Link href="/privacy" className="text-sm text-primary hover:underline">Privacy Policy</Link>
            <Link href="/cookies" className="text-sm text-primary hover:underline">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
