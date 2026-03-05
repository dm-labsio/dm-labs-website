/* D&M LABS — Cookie Policy (GDPR Compliant) */
import { Link } from "wouter";
import AnimateIn from "@/components/AnimateIn";

export default function CookiePolicy() {
  return (
    <>
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(2rem, 4vh, 3rem)" }}>
        <div className="container relative z-10 text-center">
          <AnimateIn>
            <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Legal</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5">Cookie Policy</h1>
            <p className="text-sm text-[#5B6472]">Last updated: March 2026</p>
          </AnimateIn>
        </div>
      </section>
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl">
          <AnimateIn>
            <div className="space-y-8 text-[#5B6472] text-sm leading-relaxed">

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">1. What Are Cookies</h2>
                <p>Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site. Cookies allow a website to recognise your device and remember certain information about your visit, such as your preferences.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">2. How We Use Cookies</h2>
                <p>D&M Labs uses cookies for the following purposes:</p>
                <ul className="list-disc pl-5 space-y-2 mt-3">
                  <li><strong className="text-[#111315]">Essential functionality:</strong> To ensure the website operates correctly, including remembering your cookie consent preferences.</li>
                  <li><strong className="text-[#111315]">Analytics:</strong> With your explicit consent, to understand how visitors interact with our website so we can improve our content and user experience.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">3. Types of Cookies We Use</h2>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#E2E5EA]">
                        <th className="py-3 pr-4 text-[#111315] font-semibold text-sm">Cookie Name</th>
                        <th className="py-3 pr-4 text-[#111315] font-semibold text-sm">Type</th>
                        <th className="py-3 pr-4 text-[#111315] font-semibold text-sm">Purpose</th>
                        <th className="py-3 text-[#111315] font-semibold text-sm">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#E2E5EA]/50">
                        <td className="py-3 pr-4 font-mono text-xs">dm_cookie_consent</td>
                        <td className="py-3 pr-4">Essential</td>
                        <td className="py-3 pr-4">Stores your cookie consent preferences</td>
                        <td className="py-3">Persistent</td>
                      </tr>
                      <tr className="border-b border-[#E2E5EA]/50">
                        <td className="py-3 pr-4 font-mono text-xs">_analytics</td>
                        <td className="py-3 pr-4">Analytics</td>
                        <td className="py-3 pr-4">Tracks page views and visitor behaviour (anonymised)</td>
                        <td className="py-3">26 months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">4. Essential Cookies</h2>
                <p>Essential cookies are strictly necessary for the website to function. They enable core features such as remembering your cookie consent choice. These cookies do not collect personal information and cannot be disabled without affecting site functionality. Under GDPR, essential cookies do not require consent as they are necessary for the service you have requested.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">5. Analytics Cookies</h2>
                <p>Analytics cookies are only placed on your device if you give explicit consent via our cookie banner. We use privacy-friendly analytics that:</p>
                <ul className="list-disc pl-5 space-y-2 mt-3">
                  <li>Do not track you across other websites</li>
                  <li>Do not create advertising profiles</li>
                  <li>Anonymise your IP address</li>
                  <li>Do not share data with third-party advertisers</li>
                </ul>
                <p className="mt-3">You can withdraw your consent for analytics cookies at any time by clearing your browser cookies and revisiting our site, where the cookie banner will appear again.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">6. Third-Party Cookies</h2>
                <p>We do not use third-party advertising cookies. The only third-party services that may set cookies are:</p>
                <ul className="list-disc pl-5 space-y-2 mt-3">
                  <li><strong className="text-[#111315]">Formspree:</strong> Our contact form processor. Formspree may set essential cookies to prevent spam submissions.</li>
                  <li><strong className="text-[#111315]">WhatsApp:</strong> The floating WhatsApp widget links to an external WhatsApp page and does not set cookies on our site.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">7. Managing Your Cookie Preferences</h2>
                <p className="mb-3">You can manage cookies in the following ways:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-[#111315]">Cookie banner:</strong> When you first visit our site, a cookie banner allows you to accept all cookies, reject non-essential cookies, or customise your preferences.</li>
                  <li><strong className="text-[#111315]">Browser settings:</strong> Most browsers allow you to view, manage, and delete cookies. Note that disabling essential cookies may affect site functionality.</li>
                  <li><strong className="text-[#111315]">Reset preferences:</strong> Clear your browser cookies for our site and the consent banner will reappear on your next visit.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">8. Your Rights</h2>
                <p>Under GDPR, you have the right to:</p>
                <ul className="list-disc pl-5 space-y-2 mt-3">
                  <li>Know what cookies are being used and why</li>
                  <li>Consent to or refuse non-essential cookies</li>
                  <li>Withdraw your consent at any time</li>
                  <li>Request deletion of data collected through cookies</li>
                </ul>
                <p className="mt-3">For more information about your data protection rights, see our <Link href="/privacy" className="text-[#5B8CFF] hover:underline">Privacy Policy</Link>.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">9. Changes to This Policy</h2>
                <p>We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. The updated version will be posted on this page with a revised date.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">10. Contact Us</h2>
                <p>If you have questions about our use of cookies, please contact us at <a href="mailto:dudeandmadame@gmail.com" className="text-[#5B8CFF] hover:underline">dudeandmadame@gmail.com</a>.</p>
              </div>

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
