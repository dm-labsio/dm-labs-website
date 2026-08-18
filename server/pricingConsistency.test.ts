import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const serverDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(serverDirectory, "..");

function source(path: string) {
  return readFileSync(join(projectRoot, path), "utf8");
}

const commercialSources = [
  "client/src/pages/Pricing.tsx",
  "client/src/pages/Services.tsx",
  "client/src/pages/FAQ.tsx",
  "client/src/pages/Process.tsx",
  "client/src/pages/ServiceDetail.tsx",
  "client/src/pages/el/HomeEl.tsx",
  "client/src/pages/el/PricingEl.tsx",
  "client/src/pages/el/ServicesEl.tsx",
  "client/src/pages/el/FAQEl.tsx",
  "client/src/pages/el/ProcessEl.tsx",
  "client/src/pages/el/ServiceDetailEl.tsx",
  "client/src/pages/el/WebDesignCreteEl.tsx",
  "client/src/pages/el/WebDesignCyprusEl.tsx",
  "client/src/pages/el/WebDesignLimassol.tsx",
  "client/src/pages/el/WebDesignNicosia.tsx",
  "client/src/pages/el/WebDesignThessaloniki.tsx",
  "client/src/pages/WebDesignCrete.tsx",
  "client/public/llms.txt",
  "scripts/prerender-meta.mjs",
].map(source).join("\n");

const termsSource = source("client/src/pages/Terms.tsx");

describe("canonical package and care-plan consistency", () => {
  it("keeps the approved one-time package names, prices, and revision rounds", () => {
    expect(commercialSources).toContain("Launch Website");
    expect(commercialSources).toContain("Growth Website");
    expect(commercialSources).toContain("Pro Website");
    expect(commercialSources).toContain("Enterprise / Custom");
    expect(commercialSources).toContain("€299");
    expect(commercialSources).toContain("€749");
    expect(commercialSources).toContain("€1,499");
    expect(commercialSources).toContain("2 revision rounds");
    expect(commercialSources).toContain("3 revision rounds");
    expect(commercialSources).toContain("4 revision rounds");
  });

  it("keeps the approved care-plan names, prices, and update allowances", () => {
    expect(commercialSources).toContain("Basic Care");
    expect(commercialSources).toContain("Complete Care");
    expect(commercialSources).toContain("€69");
    expect(commercialSources).toContain("€129");
    expect(commercialSources).toContain("Up to 3 small content updates");
    expect(commercialSources).toContain("Unlimited reasonable updates");
    expect(commercialSources).toContain("from €149/mo");
  });

  it("excludes legacy package names and explicitly retired monthly prices from active commercial content", () => {
    for (const retired of ["Starter", "Premium Care", "€399", "€699", "€39", "€49", "€59"]) {
      expect(commercialSources).not.toContain(retired);
    }
  });
});

describe("Terms of Service supplied content", () => {
  it("uses the supplied title, publish date, numbered sections, and section-seven subheadings", () => {
    expect(termsSource).toContain("Terms of Service — DM-Labs.io");
    expect(termsSource).toContain("Last updated: 19 August 2026");
    for (const heading of [
      "1. About these terms",
      "2. Our services",
      "3. What's included, and what isn't",
      "4. Payment",
      "5. If a payment is missed",
      "6. Care plans, cancellation and notice",
      "7. What happens when a plan ends",
      "8. Hosting, domains and SEO are ongoing work",
      "9. Revisions",
      "10. Timelines",
      "11. Your content",
      "12. Ownership",
      "13. Bug fixing",
      "14. Liability",
      "15. Changes to these terms",
      "16. Contact",
    ]) {
      expect(termsSource).toContain(`>${heading}</h2>`);
    }
    for (const subheading of [
      "You keep, permanently:",
      "These stop on the day the plan ends:",
      "These are plan-dependent features and are switched off unless your invoice says otherwise:",
    ]) {
      expect(termsSource).toContain(`>${subheading}</h3>`);
    }
  });
});
