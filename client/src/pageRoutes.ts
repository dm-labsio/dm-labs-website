/* Page code split per route. Keep PAGE_ROUTES in the same order as the
   <Switch> in App.tsx; server/pageRoutes.test.ts checks they match. */
import { lazyPage, type LazyPage } from "./lib/lazyPage";

export const Home = lazyPage(() => import("./pages/Home"), "pages/Home");
export const Services = lazyPage(
  () => import("./pages/Services"),
  "pages/Services"
);
export const Process = lazyPage(
  () => import("./pages/Process"),
  "pages/Process"
);
export const Pricing = lazyPage(
  () => import("./pages/Pricing"),
  "pages/Pricing"
);
export const FAQ = lazyPage(() => import("./pages/FAQ"), "pages/FAQ");
export const Contact = lazyPage(
  () => import("./pages/Contact"),
  "pages/Contact"
);
export const Privacy = lazyPage(
  () => import("./pages/Privacy"),
  "pages/Privacy"
);
export const CookiePolicy = lazyPage(
  () => import("./pages/CookiePolicy"),
  "pages/CookiePolicy"
);
export const Terms = lazyPage(() => import("./pages/Terms"), "pages/Terms");
export const HomeHe = lazyPage(
  () => import("./pages/he/HomeHe"),
  "pages/he/HomeHe"
);
export const ServicesHe = lazyPage(
  () => import("./pages/he/ServicesHe"),
  "pages/he/ServicesHe"
);
export const ProcessHe = lazyPage(
  () => import("./pages/he/ProcessHe"),
  "pages/he/ProcessHe"
);
export const PricingHe = lazyPage(
  () => import("./pages/he/PricingHe"),
  "pages/he/PricingHe"
);
export const ContactHe = lazyPage(
  () => import("./pages/he/ContactHe"),
  "pages/he/ContactHe"
);
export const FAQHe = lazyPage(
  () => import("./pages/he/FAQHe"),
  "pages/he/FAQHe"
);
export const TemplatesHe = lazyPage(
  () => import("./pages/he/TemplatesHe"),
  "pages/he/TemplatesHe"
);
export const PrivacyHe = lazyPage(
  () => import("./pages/he/PrivacyHe"),
  "pages/he/PrivacyHe"
);
export const CookiePolicyHe = lazyPage(
  () => import("./pages/he/CookiePolicyHe"),
  "pages/he/CookiePolicyHe"
);
export const TermsHe = lazyPage(
  () => import("./pages/he/TermsHe"),
  "pages/he/TermsHe"
);
export const CustomDesignHe = lazyPage(
  () => import("./pages/he/CustomDesignHe"),
  "pages/he/CustomDesignHe"
);
export const MobileFirstHe = lazyPage(
  () => import("./pages/he/MobileFirstHe"),
  "pages/he/MobileFirstHe"
);
export const SeoHe = lazyPage(
  () => import("./pages/he/SeoHe"),
  "pages/he/SeoHe"
);
export const PerformanceHe = lazyPage(
  () => import("./pages/he/PerformanceHe"),
  "pages/he/PerformanceHe"
);
export const SecurityHe = lazyPage(
  () => import("./pages/he/SecurityHe"),
  "pages/he/SecurityHe"
);
export const TurnaroundHe = lazyPage(
  () => import("./pages/he/TurnaroundHe"),
  "pages/he/TurnaroundHe"
);
export const MapsHe = lazyPage(
  () => import("./pages/he/MapsHe"),
  "pages/he/MapsHe"
);
export const FormsHe = lazyPage(
  () => import("./pages/he/FormsHe"),
  "pages/he/FormsHe"
);
export const SocialHe = lazyPage(
  () => import("./pages/he/SocialHe"),
  "pages/he/SocialHe"
);
export const NotFound = lazyPage(
  () => import("./pages/NotFound"),
  "pages/NotFound"
);
export const Templates = lazyPage(
  () => import("./pages/Templates"),
  "pages/Templates"
);
export const BrandCaseStudy = lazyPage(
  () => import("./components/work/BrandCaseStudy"),
  "components/work/BrandCaseStudy"
);
export const ServiceDetail = lazyPage(
  () => import("./pages/ServiceDetail"),
  "pages/ServiceDetail"
);
export const Blog = lazyPage(() => import("./pages/Blog"), "pages/Blog");
export const BlogPost = lazyPage(
  () => import("./pages/BlogPost"),
  "pages/BlogPost"
);
export const BlogHe = lazyPage(
  () => import("./pages/he/BlogHe"),
  "pages/he/BlogHe"
);
export const RestaurantGuideEl = lazyPage(
  () =>
    import("./pages/LocalizedRestaurantGuide").then(m => ({
      default: m.RestaurantGuideEl,
    })),
  "pages/LocalizedRestaurantGuide"
);
export const RestaurantGuideHe = lazyPage(
  () =>
    import("./pages/LocalizedRestaurantGuide").then(m => ({
      default: m.RestaurantGuideHe,
    })),
  "pages/LocalizedRestaurantGuide"
);
export const DrGeorgeCaseStudyEl = lazyPage(
  () =>
    import("./pages/LocalizedDrGeorgeCaseStudy").then(m => ({
      default: m.DrGeorgeCaseStudyEl,
    })),
  "pages/LocalizedDrGeorgeCaseStudy"
);
export const DrGeorgeCaseStudyHe = lazyPage(
  () =>
    import("./pages/LocalizedDrGeorgeCaseStudy").then(m => ({
      default: m.DrGeorgeCaseStudyHe,
    })),
  "pages/LocalizedDrGeorgeCaseStudy"
);
export const WebDesignLimassol = lazyPage(
  () => import("./pages/WebDesignLimassol"),
  "pages/WebDesignLimassol"
);
export const WebDesignThessaloniki = lazyPage(
  () => import("./pages/WebDesignThessaloniki"),
  "pages/WebDesignThessaloniki"
);
export const WebDesignNicosia = lazyPage(
  () => import("./pages/WebDesignNicosia"),
  "pages/WebDesignNicosia"
);
export const WebDesignCyprus = lazyPage(
  () => import("./pages/WebDesignCyprus"),
  "pages/WebDesignCyprus"
);
export const WebDesignCrete = lazyPage(
  () => import("./pages/WebDesignCrete"),
  "pages/WebDesignCrete"
);
export const WebDesignPaphos = lazyPage(
  () => import("./pages/WebDesignPaphos"),
  "pages/WebDesignPaphos"
);
export const WebDesignRestaurantsCyprus = lazyPage(
  () => import("./pages/WebDesignRestaurantsCyprus"),
  "pages/WebDesignRestaurantsCyprus"
);
export const PreviewPage = lazyPage(
  () => import("./pages/PreviewPage"),
  "pages/PreviewPage"
);
export const HomeEl = lazyPage(
  () => import("./pages/el/HomeEl"),
  "pages/el/HomeEl"
);
export const ServicesEl = lazyPage(
  () => import("./pages/el/ServicesEl"),
  "pages/el/ServicesEl"
);
export const ProcessEl = lazyPage(
  () => import("./pages/el/ProcessEl"),
  "pages/el/ProcessEl"
);
export const PricingEl = lazyPage(
  () => import("./pages/el/PricingEl"),
  "pages/el/PricingEl"
);
export const FAQEl = lazyPage(
  () => import("./pages/el/FAQEl"),
  "pages/el/FAQEl"
);
export const ContactEl = lazyPage(
  () => import("./pages/el/ContactEl"),
  "pages/el/ContactEl"
);
export const PrivacyEl = lazyPage(
  () => import("./pages/el/PrivacyEl"),
  "pages/el/PrivacyEl"
);
export const CookiePolicyEl = lazyPage(
  () => import("./pages/el/CookiePolicyEl"),
  "pages/el/CookiePolicyEl"
);
export const TermsEl = lazyPage(
  () => import("./pages/el/TermsEl"),
  "pages/el/TermsEl"
);
export const BlogEl = lazyPage(
  () => import("./pages/el/BlogEl"),
  "pages/el/BlogEl"
);
export const WebDesignCyprusEl = lazyPage(
  () => import("./pages/el/WebDesignCyprusEl"),
  "pages/el/WebDesignCyprusEl"
);
export const WebDesignCreteEl = lazyPage(
  () => import("./pages/el/WebDesignCreteEl"),
  "pages/el/WebDesignCreteEl"
);
export const WebDesignLimassol_El = lazyPage(
  () => import("./pages/el/WebDesignLimassol"),
  "pages/el/WebDesignLimassol"
);
export const WebDesignNicosia_El = lazyPage(
  () => import("./pages/el/WebDesignNicosia"),
  "pages/el/WebDesignNicosia"
);
export const WebDesignThessaloniki_El = lazyPage(
  () => import("./pages/el/WebDesignThessaloniki"),
  "pages/el/WebDesignThessaloniki"
);
export const WixVsDesignerEl = lazyPage(
  () => import("./pages/el/blog/WixVsDesignerEl"),
  "pages/el/blog/WixVsDesignerEl"
);
export const WebsiteCostEl = lazyPage(
  () => import("./pages/el/blog/WebsiteCostEl"),
  "pages/el/blog/WebsiteCostEl"
);
export const NailSalonEl = lazyPage(
  () => import("./pages/el/blog/NailSalonEl"),
  "pages/el/blog/NailSalonEl"
);
export const YogaEl = lazyPage(
  () => import("./pages/el/blog/YogaEl"),
  "pages/el/blog/YogaEl"
);
export const GoogleVisibilityEl = lazyPage(
  () => import("./pages/el/blog/GoogleVisibilityEl"),
  "pages/el/blog/GoogleVisibilityEl"
);
export const RestaurantEl = lazyPage(
  () => import("./pages/el/blog/RestaurantEl"),
  "pages/el/blog/RestaurantEl"
);
export const WebDesignGreeceEl = lazyPage(
  () => import("./pages/el/blog/WebDesignGreeceEl"),
  "pages/el/blog/WebDesignGreeceEl"
);
export const GeoEl = lazyPage(
  () => import("./pages/el/blog/GeoEl"),
  "pages/el/blog/GeoEl"
);
export const MoreCustomersEl = lazyPage(
  () => import("./pages/el/blog/MoreCustomersEl"),
  "pages/el/blog/MoreCustomersEl"
);
export const TemplatesEl = lazyPage(
  () => import("./pages/el/TemplatesEl"),
  "pages/el/TemplatesEl"
);
export const ServiceDetailEl = lazyPage(
  () => import("./pages/el/ServiceDetailEl"),
  "pages/el/ServiceDetailEl"
);

/** [pattern, page] in App.tsx <Switch> order; null = client-side redirect. */
export const PAGE_ROUTES: ReadonlyArray<readonly [string, LazyPage | null]> = [
  ["/", Home],
  ["/services", Services],
  ["/process", Process],
  ["/pricing", Pricing],
  ["/faq", FAQ],
  ["/contact", Contact],
  ["/privacy", Privacy],
  ["/cookies", CookiePolicy],
  ["/cookie-policy", null],
  ["/terms", Terms],
  ["/templates/branding/hartley", BrandCaseStudy],
  ["/templates/branding/away", BrandCaseStudy],
  ["/templates/branding/sunday-boat", BrandCaseStudy],
  ["/el/templates/branding/hartley", BrandCaseStudy],
  ["/el/templates/branding/away", BrandCaseStudy],
  ["/el/templates/branding/sunday-boat", BrandCaseStudy],
  ["/he/templates/branding/hartley", BrandCaseStudy],
  ["/he/templates/branding/away", BrandCaseStudy],
  ["/he/templates/branding/sunday-boat", BrandCaseStudy],
  ["/templates", Templates],
  ["/examples", Templates],
  ["/services/:serviceId", ServiceDetail],
  ["/blog/:slug", BlogPost],
  ["/blog", Blog],
  ["/web-design-limassol", WebDesignLimassol],
  ["/web-design-thessaloniki", WebDesignThessaloniki],
  ["/web-design-nicosia", WebDesignNicosia],
  ["/web-design-cyprus", WebDesignCyprus],
  ["/web-design-crete", WebDesignCrete],
  ["/web-design-paphos", WebDesignPaphos],
  ["/web-design-restaurants-cyprus", WebDesignRestaurantsCyprus],
  ["/he", HomeHe],
  ["/he/blog", BlogHe],
  ["/he/blog/restaurant-cafe-website-planning-guide", RestaurantGuideHe],
  [
    "/he/blog/doctor-website-design-orthopaedics-case-study",
    DrGeorgeCaseStudyHe,
  ],
  ["/he/", HomeHe],
  ["/he/services", ServicesHe],
  ["/he/services/", ServicesHe],
  ["/he/process", ProcessHe],
  ["/he/process/", ProcessHe],
  ["/he/pricing", PricingHe],
  ["/he/pricing/", PricingHe],
  ["/he/contact", ContactHe],
  ["/he/contact/", ContactHe],
  ["/he/faq", FAQHe],
  ["/he/faq/", FAQHe],
  ["/he/templates", TemplatesHe],
  ["/he/templates/", TemplatesHe],
  ["/he/privacy", PrivacyHe],
  ["/he/privacy/", PrivacyHe],
  ["/he/cookies", CookiePolicyHe],
  ["/he/cookies/", CookiePolicyHe],
  ["/he/terms", TermsHe],
  ["/he/terms/", TermsHe],
  ["/he/services/custom-design", CustomDesignHe],
  ["/he/services/custom-design/", CustomDesignHe],
  ["/he/services/mobile-first", MobileFirstHe],
  ["/he/services/mobile-first/", MobileFirstHe],
  ["/he/services/seo", SeoHe],
  ["/he/services/seo/", SeoHe],
  ["/he/services/performance", PerformanceHe],
  ["/he/services/performance/", PerformanceHe],
  ["/he/services/security", SecurityHe],
  ["/he/services/security/", SecurityHe],
  ["/he/services/turnaround", TurnaroundHe],
  ["/he/services/turnaround/", TurnaroundHe],
  ["/he/services/maps", MapsHe],
  ["/he/services/maps/", MapsHe],
  ["/he/services/forms", FormsHe],
  ["/he/services/forms/", FormsHe],
  ["/he/services/social", SocialHe],
  ["/he/services/social/", SocialHe],
  ["/el", HomeEl],
  ["/el/", HomeEl],
  ["/el/services", ServicesEl],
  ["/el/process", ProcessEl],
  ["/el/pricing", PricingEl],
  ["/el/faq", FAQEl],
  ["/el/contact", ContactEl],
  ["/el/privacy", PrivacyEl],
  ["/el/cookie-policy", null],
  ["/el/cookies", CookiePolicyEl],
  ["/el/terms", TermsEl],
  ["/el/blog", BlogEl],
  ["/el/web-design-cyprus", WebDesignCyprusEl],
  ["/el/web-design-crete", WebDesignCreteEl],
  ["/el/web-design-limassol", WebDesignLimassol_El],
  ["/el/web-design-nicosia", WebDesignNicosia_El],
  ["/el/web-design-thessaloniki", WebDesignThessaloniki_El],
  ["/blog/istoselidha-yoga-pilates-studio-kypros", null],
  ["/blog/istoselidha-nail-salon-beauty-studio-kypros", null],
  ["/blog/local-seo-google-cyprus", null],
  ["/5", null],
  ["/el/blog/proti-istoselida-estiatoriou-cafe-odigos", RestaurantGuideEl],
  [
    "/el/blog/doctor-website-design-orthopaedics-case-study",
    DrGeorgeCaseStudyEl,
  ],
  ["/el/blog/wix-vs-epaggelmatias-web-designer-kypros", WixVsDesignerEl],
  ["/el/blog/posso-kostizei-istoselidha-kypros", WebsiteCostEl],
  ["/el/blog/istoselidha-nail-salon-beauty-studio-kypros", NailSalonEl],
  ["/el/blog/istoselidha-yoga-pilates-studio-kypros", YogaEl],
  ["/el/blog/pos-na-vretheite-google-kypros", GoogleVisibilityEl],
  ["/el/blog/istoselidha-estiatorio-kypros", RestaurantEl],
  ["/el/blog/web-design-ellada-odigos-2026", WebDesignGreeceEl],
  ["/el/blog/geo-vrethite-apo-chatgpt-kypros", GeoEl],
  ["/el/blog/perissoteroi-pelates-kypros", MoreCustomersEl],
  ["/el/examples", TemplatesEl],
  ["/el/templates", TemplatesEl],
  ["/el/services/:serviceId", ServiceDetailEl],
  ["/404", NotFound],
];

// Same rules as wouter's default matcher (regexparam): optional trailing
// slash, case-insensitive, ":name" matches one path segment.
const patterns = new Map<string, RegExp>();
function toPattern(route: string): RegExp {
  let regex = patterns.get(route);
  if (!regex) {
    const source = route
      .split("/")
      .filter(Boolean)
      .map(segment => (segment.startsWith(":") ? "/([^/]+?)" : `/${segment}`))
      .join("");
    regex = new RegExp(`^${source}\\/?$`, "i");
    patterns.set(route, regex);
  }
  return regex;
}

/** The page App.tsx would render for this path (null for a redirect). */
export function pageFor(path: string): LazyPage | null {
  if (path.startsWith("/preview/")) return PreviewPage;
  for (const [route, page] of PAGE_ROUTES) {
    if (toPattern(route).test(path)) return page;
  }
  return NotFound;
}

export function preloadRoute(path: string): Promise<unknown> {
  return pageFor(path)?.preload() ?? Promise.resolve();
}

export function isRouteReady(path: string): boolean {
  return pageFor(path)?.isLoaded() ?? true;
}
