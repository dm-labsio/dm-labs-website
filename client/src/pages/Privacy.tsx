/* D&M LABS - Privacy Policy (GDPR Compliant) */
import { Link } from "wouter";
import AnimateIn from "@/components/AnimateIn";
import { ChevronLeft } from "lucide-react";

export default function Privacy() {
  return (
    <>
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(2rem, 4vh, 3rem)" }}>
        <div className="container relative z-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[#5B6472] hover:text-[#5B8CFF] transition-colors mb-8">
            <ChevronLeft size={16} />
            Back to Home
          </Link>
          <div className="text-center">
            <AnimateIn>
              <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Legal</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5">Privacy Policy</h1>
              <p className="text-sm text-[#5B6472]">Last updated: March 2026</p>
            </AnimateIn>
          </div>
        </div>
      </section>
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl">
          <AnimateIn>
            <div className="space-y-8 text-[#5B6472] text-sm leading-relaxed">

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">1. Data Controller</h2>
                <p>D&M Labs ("we", "us", "our") is the data controller responsible for your personal data. We are a website design and development service for businesses. You can reach us at <a href="mailto:info@dm-labs.io" className="text-[#5B8CFF] hover:underline">info@dm-labs.io</a> or via WhatsApp at +357 97472847.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">2. Information We Collect</h2>
                <p className="mb-3">We collect the following categories of personal data:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-[#111315]">Contact information:</strong> Name, email address, phone number, and business name - provided when you fill in our contact form or message us on WhatsApp.</li>
                  <li><strong className="text-[#111315]">Project information:</strong> Details about your business, design preferences, and website requirements - provided during consultations.</li>
                  <li><strong className="text-[#111315]">Technical data:</strong> IP address, browser type, device type, and pages visited - collected automatically through essential and analytics cookies (with your consent).</li>
                  <li><strong className="text-[#111315]">Payment information:</strong> Billing details processed securely through third-party payment providers. We do not store credit card numbers.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">3. Legal Basis for Processing</h2>
                <p className="mb-3">Under the General Data Protection Regulation (GDPR), we process your data on the following legal bases:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-[#111315]">Contractual necessity:</strong> To deliver the website design services you have requested.</li>
                  <li><strong className="text-[#111315]">Legitimate interest:</strong> To respond to enquiries, improve our services, and ensure website security.</li>
                  <li><strong className="text-[#111315]">Consent:</strong> For analytics cookies and marketing communications (where applicable). You may withdraw consent at any time.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">4. How We Use Your Data</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>To respond to your enquiries and provide quotes</li>
                  <li>To design, develop, and deliver your website project</li>
                  <li>To communicate project updates and timelines</li>
                  <li>To process payments for our services</li>
                  <li>To provide post-launch maintenance and support</li>
                  <li>To improve our website and services through anonymised analytics</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">5. Data Sharing</h2>
                <p className="mb-3">We do not sell, rent, or trade your personal data. We may share data with the following categories of recipients, solely to deliver our services:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-[#111315]">Hosting providers:</strong> To host and serve your website.</li>
                  <li><strong className="text-[#111315]">Payment processors:</strong> To securely process payments.</li>
                  <li><strong className="text-[#111315]">Analytics providers:</strong> Privacy-friendly analytics (with your consent) that do not track you across other websites.</li>
                  <li><strong className="text-[#111315]">Form processors:</strong> Web3Forms, to deliver contact form submissions to our email.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">6. Data Retention</h2>
                <p>We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected. Specifically:</p>
                <ul className="list-disc pl-5 space-y-2 mt-3">
                  <li>Contact form submissions: 12 months after last communication</li>
                  <li>Client project data: Duration of the project plus 24 months</li>
                  <li>Payment records: As required by applicable tax and accounting laws</li>
                  <li>Analytics data: 26 months (anonymised)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">7. Your Rights Under GDPR</h2>
                <p className="mb-3">As a data subject, you have the following rights:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-[#111315]">Right of access:</strong> Request a copy of the personal data we hold about you.</li>
                  <li><strong className="text-[#111315]">Right to rectification:</strong> Request correction of inaccurate or incomplete data.</li>
                  <li><strong className="text-[#111315]">Right to erasure:</strong> Request deletion of your personal data ("right to be forgotten").</li>
                  <li><strong className="text-[#111315]">Right to restrict processing:</strong> Request that we limit how we use your data.</li>
                  <li><strong className="text-[#111315]">Right to data portability:</strong> Receive your data in a structured, machine-readable format.</li>
                  <li><strong className="text-[#111315]">Right to object:</strong> Object to processing based on legitimate interest.</li>
                  <li><strong className="text-[#111315]">Right to withdraw consent:</strong> Withdraw consent for analytics cookies or marketing at any time.</li>
                </ul>
                <p className="mt-3">To exercise any of these rights, contact us at <a href="mailto:info@dm-labs.io" className="text-[#5B8CFF] hover:underline">info@dm-labs.io</a>. We will respond within 30 days.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">8. Cookies</h2>
                <p>We use essential cookies for site functionality and analytics cookies (with your consent) to understand how visitors use our website. For full details, see our <Link href="/cookies" className="text-[#5B8CFF] hover:underline">Cookie Policy</Link>.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">9. International Transfers</h2>
                <p>Your data may be processed by service providers located outside the European Economic Area (EEA). Where this occurs, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">10. Security</h2>
                <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. This includes SSL encryption, secure hosting, and access controls.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">11. Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">12. Contact &amp; Complaints</h2>
                <p>If you have questions about this policy or wish to make a complaint, contact us at <a href="mailto:info@dm-labs.io" className="text-[#5B8CFF] hover:underline">info@dm-labs.io</a>. You also have the right to lodge a complaint with a supervisory authority in your country of residence.</p>
              </div>

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
