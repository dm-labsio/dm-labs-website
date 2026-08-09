import { chromium } from "playwright";

const baseUrl = process.env.EDITORIAL_BASE_URL ?? "http://127.0.0.1:5173";
const browser = await chromium.launch({ headless: true });
const results = [];
const failures = [];

async function inspectEnglish({ name, viewport }) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.waitForSelector(".editorial-home .editorial-fit-line.is-fitted");
  if (viewport.width < 1024) {
    await page.locator('button[aria-label="Toggle menu"]').click();
    await page.waitForSelector(".editorial-home-mobile-menu");
  }
  await page.evaluate(() => {
    const scope = document.querySelector(".hero-scrub-scope");
    const stage = document.querySelector(".hero-scrub-stage");
    if (!scope || !stage) throw new Error("Hero stage missing");
    const start = scope.getBoundingClientRect().top + window.scrollY - 72;
    const scrollSpan = scope.offsetHeight - stage.offsetHeight;
    window.scrollTo(0, start + scrollSpan * 0.9);
  });
  await page.waitForTimeout(350);

  const state = await page.evaluate(() => {
    const visualLines = [...document.querySelectorAll(".editorial-fit-line")];
    const semanticH1 = document.querySelector(".editorial-home h1");
    const lead = document.querySelector(".editorial-home .editorial-lead");
    const nav = document.querySelector(".editorial-home-nav-link");
    const languageToggle = document.querySelector(".editorial-home-language-toggle");
    const headerCta = document.querySelector(".editorial-home-header-cta");
    const mobileMenu = document.querySelector(".editorial-home-mobile-menu");
    const mobileLink = document.querySelector(".editorial-home-mobile-link");
    return {
      hasEnglishScope: Boolean(document.querySelector(".editorial-home")),
      lineCount: visualLines.length,
      linesFit: visualLines.every((line) => line.scrollWidth <= line.getBoundingClientRect().width + 1),
      linesVisible: visualLines.every((line) => getComputedStyle(line).opacity === "1"),
      semanticHeading: semanticH1?.textContent?.trim(),
      visualBlockHidden: document.querySelector(".editorial-hero-fit")?.getAttribute("aria-hidden"),
      pageOverflow: document.documentElement.scrollWidth <= window.innerWidth,
      leadWeight: lead ? getComputedStyle(lead).fontWeight : null,
      headerScope: Boolean(document.querySelector(".editorial-home-shell .editorial-home-header")),
      navFamily: nav ? getComputedStyle(nav).fontFamily : null,
      navTransform: nav ? getComputedStyle(nav).textTransform : null,
      languageFamily: languageToggle ? getComputedStyle(languageToggle).fontFamily : null,
      headerCtaTransform: headerCta ? getComputedStyle(headerCta).textTransform : null,
      mobileMenuOpen: viewport.innerWidth < 1024 ? Boolean(mobileMenu) : true,
      mobileLinkFamily: mobileLink ? getComputedStyle(mobileLink).fontFamily : null,
    };
  });

  const pass = state.hasEnglishScope && state.lineCount === 5 && state.linesFit && state.linesVisible
    && state.semanticHeading === "Your business is great. Your website should make that obvious."
    && state.visualBlockHidden === "true" && state.pageOverflow && state.headerScope
    && state.navFamily?.includes("Commissioner") && state.navTransform === "uppercase"
    && state.languageFamily?.includes("DM Mono") && state.headerCtaTransform === "uppercase"
    && state.mobileMenuOpen && (viewport.width >= 1024 || state.mobileLinkFamily?.includes("Anybody"));
  results.push({ name, pass, state, consoleErrors });
  if (!pass) failures.push(`${name} did not satisfy editorial type fit and accessibility constraints`);
  if (consoleErrors.length) failures.push(`${name} console errors: ${consoleErrors.join(" | ")}`);
  await context.close();
}

async function inspectGreekIsolation() {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/el/`, { waitUntil: "networkidle" });
  const state = await page.evaluate(() => ({
    editorialScope: Boolean(document.querySelector(".editorial-home")),
    editorialShell: Boolean(document.querySelector(".editorial-home-shell")),
    editorialHeader: Boolean(document.querySelector(".editorial-home-header")),
    fittedLines: document.querySelectorAll(".editorial-fit-line").length,
    pageOverflow: document.documentElement.scrollWidth <= window.innerWidth,
  }));
  const pass = !state.editorialScope && !state.editorialShell && !state.editorialHeader && state.fittedLines === 0 && state.pageOverflow;
  results.push({ name: "greek-isolation", pass, state, consoleErrors: [] });
  if (!pass) failures.push("Greek homepage inherited English editorial typography");
  await context.close();
}

await inspectEnglish({ name: "desktop", viewport: { width: 1280, height: 900 } });
await inspectEnglish({ name: "mobile", viewport: { width: 390, height: 844 } });
await inspectGreekIsolation();

await browser.close();
console.log(JSON.stringify({ baseUrl, results }, null, 2));
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
