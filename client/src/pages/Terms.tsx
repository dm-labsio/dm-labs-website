/* D&M LABS - Terms of Service */
import { Link } from "wouter";
import AnimateIn from "@/components/AnimateIn";
import { ChevronLeft } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

export default function Terms() {
  useSEO({
    title: "Terms of Service | DM-Labs.io",
    description: "Read the DM-Labs.io Terms of Service for website design, development, and related services.",
    canonicalPath: "/terms/",
  });

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
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Legal</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5">Terms of Service — DM-Labs.io</h1>
            <p className="text-sm text-[#5B6472]">Last updated: 19 August 2026</p>
          </AnimateIn>
          </div>
        </div>
      </section>
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl">
          <AnimateIn>
            <div className="space-y-8 text-[#5B6472] text-sm leading-relaxed">
              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">1. About these terms</h2>
                <p>These terms explain what you can expect from DM-Labs.io and what we expect from you. They apply to every project and every care plan we run. Where your invoice or written proposal says something more specific, that document takes precedence.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">2. Our services</h2>
                <p>We design, build, host, maintain and optimise websites for businesses. Website packages start at €299. Care plans, SEO retainers and add-on services are optional and are set out on your invoice.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">3. What's included, and what isn't</h2>
                <p>Your invoice lists exactly what your project includes. Anything not listed on your invoice is not included.</p>
                <p>That isn't us being difficult — it's how we keep prices honest for everyone. When you need something extra, we quote it in writing first and only start once you've approved it. No surprise charges, and no silent scope growth either.</p>
                <p>Items that are always quoted separately:</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>New pages or new sections after launch — from €80 per page</li>
                  <li>Revision rounds beyond your plan's allowance — €45 per round</li>
                  <li>Multilingual implementation and translation</li>
                  <li>New integrations, booking systems, CRM connections or payment flows</li>
                  <li>Copywriting and content migration</li>
                  <li>Redesigns or rebuilds of pages already delivered</li>
                  <li>Advanced or ongoing SEO work beyond the setup included in your package</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">4. Payment</h2>
                <p>All prices are in Euros and exclude any applicable taxes.</p>
                <p>Website builds are paid in full before work begins. We start once the invoice clears. Staged payment is available on larger projects by prior written agreement.</p>
                <p>Care plans and retainers can be paid monthly, quarterly or annually. The frequency you've chosen is stated on your invoice.</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Monthly — invoiced on the 1st of each month, due within 7 days.</li>
                  <li>Quarterly — invoiced on the 1st of the first month of each quarter, due within 7 days.</li>
                  <li>Annually — invoiced on the anniversary of your plan start date, due within 7 days.</li>
                </ul>
                <p>Payment is by bank transfer against the invoice we send you. We may move recurring billing to automatic card or standing order collection at any time, with 30 days' notice.</p>
                <p>Late payment. Invoices unpaid after 7 days carry a €25 administration fee, and the schedule in section 5 begins. We'd rather never charge it — pay on time and you'll never see it.</p>
                <p>Third-party costs — domain registration, premium hosting, paid plugins, stock licences, third-party subscriptions — are billed at cost and recovered on your first invoice. They are never spread silently across a monthly fee.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">5. If a payment is missed</h2>
                <p>We'd much rather never use this section. It exists so both of us know where we stand. Days are counted from the invoice due date, whatever your billing frequency.</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Day 14 unpaid — plan services pause. Support, content updates, monitoring, backups, bug fixing and SEO work stop until the account is current. Your site stays online.</li>
                  <li>Day 30 unpaid — plan-dependent features are switched off. See section 7.</li>
                  <li>Day 45 unpaid — any discount, waived fee, covered third-party cost or free extra given with your plan becomes payable at the value shown on your original invoice, and hosting may be suspended.</li>
                </ul>
                <p>Everything resumes as soon as the account is brought up to date.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">6. Care plans, cancellation and notice</h2>
                <p>Care plans run continuously until cancelled. There's no long-term lock-in.</p>
                <p>Either of us can end a plan with 30 days' written notice. For monthly plans, notice takes effect at the end of the following billing month and that month is payable in full. For quarterly and annual plans, cancellation takes effect at the end of the current paid term.</p>
                <p>Amounts already paid are not refunded, including unused months on a quarterly or annual prepayment, because the work for that period has been scheduled and in most cases already carried out. We may offer credit against future work at our discretion.</p>
                <p>If your plan ends before it has run four consecutive months, the €50 bundle discount applied to your build, any domain registration or third-party costs we covered upfront on your behalf, plus the stated value of any extras given free with the plan, becomes payable. Those extras are priced as a gift attached to an ongoing relationship, and they're listed at their real value on your invoice so there's never a surprise.</p>
                <p>We may pause or end a plan if invoices go unpaid, or if the work requested consistently sits outside what the plan covers.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">7. What happens when a plan ends</h2>
                <p>Your website doesn't disappear. Some services stop, because they are ongoing work rather than a one-off purchase. Exactly which apply to you is set out on your invoice.</p>

                <h3 className="text-base font-semibold text-[#111315] mt-5 mb-2">You keep, permanently:</h3>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Your domain name</li>
                  <li>Your content, images and text</li>
                  <li>The website as delivered and paid for, in its current static form</li>
                  <li>Any paid add-on you've purchased outright, including multilingual implementation</li>
                </ul>

                <h3 className="text-base font-semibold text-[#111315] mt-5 mb-2">These stop on the day the plan ends:</h3>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Hosting monitoring, uptime checks and server management</li>
                  <li>Automated backups and stored recovery copies</li>
                  <li>Bug fixing and technical support</li>
                  <li>WhatsApp support and response-time commitments</li>
                  <li>Content updates, banners and section changes</li>
                  <li>All SEO and GEO work — keyword monitoring, on-page updates, indexing, reporting, article publishing</li>
                  <li>Performance checks and speed maintenance</li>
                </ul>

                <h3 className="text-base font-semibold text-[#111315] mt-5 mb-2">These are plan-dependent features and are switched off unless your invoice says otherwise:</h3>
                <ul className="list-disc space-y-1 pl-5">
                  <li>CMS or dashboard editing access</li>
                  <li>Premium widgets, pop-ups, chat integrations and booking tools</li>
                  <li>Any item listed on your invoice as &quot;included free with an active care plan&quot;</li>
                </ul>

                <p>If you'd like to move your site elsewhere, we'll hand over your files and help with the transfer. Migration and handover work is billed at €60/hour.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">8. Hosting, domains and SEO are ongoing work</h2>
                <p>Worth saying plainly, because it's easy to assume a finished website simply runs itself.</p>
                <p>A live site needs its hosting monitored, its backups taken and verified, its plugins and dependencies updated, its security patched, its broken links and layout faults found and repaired, and its search visibility actively maintained as Google and AI assistants change how they read and rank pages. That is ongoing labour every month, whether or not anything visibly changes on the page. It's what your care plan pays for.</p>
                <p>Hosting. Where we host on our own infrastructure, that hosting is provided as part of an active care plan and ends when the plan does.</p>
                <p>Domains. Your domain name always belongs to you, and we never hold ownership or control over it. Where you've committed to a care plan of at least four months, we'll register your domain on your behalf and cover the registration period upfront — usually one to two years — as a benefit of that plan. The registration cost is shown at its real value on your invoice. If the plan ends before it has run four consecutive months, that cost becomes payable, and the domain is transferred into your own registrar account once it's settled. If you'd rather register the domain yourself and keep it entirely separate, that's completely fine — just tell us before we start.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">9. Revisions</h2>
                <p>Revision rounds included with each package:</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Launch — 2 rounds</li>
                  <li>Growth — 3 rounds</li>
                  <li>Pro — 4 rounds</li>
                  <li>Enterprise — as stated on your proposal</li>
                </ul>
                <p>A round means one consolidated set of feedback from you, returned in a single message. Additional rounds are €45 each. Changes requested after the site goes live are treated as new work and quoted separately, or covered by your care plan where they fall within its allowance.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">10. Timelines</h2>
                <p>Indicative delivery times, in working days, from the point we have everything we need from you:</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Launch Website — 5–7 working days</li>
                  <li>Growth Website — 7–10 working days</li>
                  <li>Pro Website — quoted per project</li>
                </ul>
                <p>The clock starts once we've received all content, images, branding, access credentials and approvals, and it pauses whenever we're waiting on you. If a project sits on hold for more than 14 days waiting on your materials or feedback, we may reschedule it into the next available slot.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">11. Your content</h2>
                <p>You confirm that any text, images, logos or other materials you send us are yours to use and don't infringe anyone else's rights. We're not responsible for third-party claims arising from material you supply.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">12. Ownership</h2>
                <p>Once your project is paid in full, the design and front-end code we've built for you are yours to use. Until then, all work remains our property. Third-party components — themes, plugins, fonts, stock imagery — stay under their own licences. We keep the right to feature the finished site in our portfolio unless you ask us in writing not to.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">13. Bug fixing</h2>
                <p>Faults in work we built are fixed free of charge for 30 days after launch, and remain covered for as long as you hold an active care plan. Issues caused by changes made by you or a third party, by a third-party service failing, or by hosting we don't manage, are billed at €60/hour and quoted before we start.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">14. Liability</h2>
                <p>We take real care with your website, but we can't guarantee uninterrupted uptime, specific search rankings, or particular business results. Our total liability is limited to the amount you've paid us in the preceding three months.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">15. Changes to these terms</h2>
                <p>We may update these terms from time to time. The version in force is the one published here on the date your project or plan begins.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">16. Contact</h2>
                <p>info@dm-labs.io</p>
              </div>
            </div>
            <div className="mt-10 pt-8 border-t border-[#E2E5EA] flex gap-4">
              <Link href="/privacy/" className="text-sm text-[#5B8CFF] hover:underline">Privacy Policy</Link>
              <Link href="/cookies/" className="text-sm text-[#5B8CFF] hover:underline">Cookie Policy</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
