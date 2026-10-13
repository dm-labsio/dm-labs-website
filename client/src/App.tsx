import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Suspense } from "react";
import { Route, Router, Switch, Redirect, useLocation } from "wouter";
import { useReadyLocation } from "./lib/readyLocation";
import RoutePrefetch from "./components/RoutePrefetch";
import { useSEO } from "./hooks/useSEO";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
import CookieBanner from "./components/CookieBanner";
import PostHogAnalytics from "./components/PostHogAnalytics";
import WebsiteGuide from "./components/chat/WebsiteGuide";

// ── Pages (each downloads its own code on demand, see pageRoutes.ts) ──
import {
  Home,
  Services,
  Process,
  Pricing,
  FAQ,
  Contact,
  Privacy,
  CookiePolicy,
  Terms,
  HomeHe,
  ServicesHe,
  ProcessHe,
  PricingHe,
  ContactHe,
  FAQHe,
  TemplatesHe,
  PrivacyHe,
  CookiePolicyHe,
  TermsHe,
  CustomDesignHe,
  MobileFirstHe,
  SeoHe,
  PerformanceHe,
  SecurityHe,
  TurnaroundHe,
  MapsHe,
  FormsHe,
  SocialHe,
  NotFound,
  Templates,
  BrandCaseStudy,
  ServiceDetail,
  Blog,
  BlogPost,
  BlogHe,
  RestaurantGuideEl,
  RestaurantGuideHe,
  DrGeorgeCaseStudyEl,
  DrGeorgeCaseStudyHe,
  WebDesignLimassol,
  WebDesignThessaloniki,
  WebDesignNicosia,
  WebDesignCyprus,
  WebDesignCrete,
  WebDesignPaphos,
  WebDesignRestaurantsCyprus,
  PreviewPage,
  HomeEl,
  ServicesEl,
  ProcessEl,
  PricingEl,
  FAQEl,
  ContactEl,
  PrivacyEl,
  CookiePolicyEl,
  TermsEl,
  BlogEl,
  WebDesignCyprusEl,
  WebDesignCreteEl,
  WebDesignLimassol_El,
  WebDesignNicosia_El,
  WebDesignThessaloniki_El,
  WixVsDesignerEl,
  WebsiteCostEl,
  NailSalonEl,
  YogaEl,
  GoogleVisibilityEl,
  RestaurantEl,
  WebDesignGreeceEl,
  GeoEl,
  MoreCustomersEl,
  TemplatesEl,
  ServiceDetailEl,
} from "./pageRoutes";


// Global SEO updater: fires on every route change to keep canonical + OG URL correct.
function GlobalSEO() {
  useSEO();
  return null;
}

function MainRouter() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Layout>
      <GlobalSEO />
      <Switch>
        {/* ── English Routes ── */}
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/process" component={Process} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/faq" component={FAQ} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/cookies" component={CookiePolicy} />
        {/* /cookie-policy → /cookies: client-side redirect (server-level 301 handles hard navigation) */}
        <Route path="/cookie-policy"><Redirect to="/cookies/" /></Route>
        <Route path="/terms" component={Terms} />
        <Route path="/templates/branding/hartley">{() => <BrandCaseStudy id="hartley" locale="en" />}</Route>
        <Route path="/templates/branding/away">{() => <BrandCaseStudy id="away" locale="en" />}</Route>
        <Route path="/templates/branding/sunday-boat">{() => <BrandCaseStudy id="sunday-boat" locale="en" />}</Route>
        <Route path="/el/templates/branding/hartley">{() => <BrandCaseStudy id="hartley" locale="el" />}</Route>
        <Route path="/el/templates/branding/away">{() => <BrandCaseStudy id="away" locale="el" />}</Route>
        <Route path="/el/templates/branding/sunday-boat">{() => <BrandCaseStudy id="sunday-boat" locale="el" />}</Route>
        <Route path="/he/templates/branding/hartley">{() => <BrandCaseStudy id="hartley" locale="he" />}</Route>
        <Route path="/he/templates/branding/away">{() => <BrandCaseStudy id="away" locale="he" />}</Route>
        <Route path="/he/templates/branding/sunday-boat">{() => <BrandCaseStudy id="sunday-boat" locale="he" />}</Route>
        <Route path="/templates" component={Templates} />
        <Route path="/examples" component={Templates} />
        <Route path="/services/:serviceId" component={ServiceDetail} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/blog" component={Blog} />
        <Route path="/web-design-limassol" component={WebDesignLimassol} />
        <Route path="/web-design-thessaloniki" component={WebDesignThessaloniki} />
        <Route path="/web-design-nicosia" component={WebDesignNicosia} />
        <Route path="/web-design-cyprus" component={WebDesignCyprus} />
        <Route path="/web-design-crete" component={WebDesignCrete} />
        <Route path="/web-design-paphos" component={WebDesignPaphos} />
        <Route path="/web-design-restaurants-cyprus" component={WebDesignRestaurantsCyprus} />

        {/* ── Hebrew staged route: only completed Hebrew homepage is exposed ── */}
        <Route path="/he" component={HomeHe} />
        <Route path="/he/blog" component={BlogHe} />
        <Route path="/he/blog/restaurant-cafe-website-planning-guide" component={RestaurantGuideHe} />
        <Route path="/he/blog/doctor-website-design-orthopaedics-case-study" component={DrGeorgeCaseStudyHe} />
        <Route path="/he/" component={HomeHe} />
        <Route path="/he/services" component={ServicesHe} />
        <Route path="/he/services/" component={ServicesHe} />
        <Route path="/he/process" component={ProcessHe} />
        <Route path="/he/process/" component={ProcessHe} />
        <Route path="/he/pricing" component={PricingHe} />
        <Route path="/he/pricing/" component={PricingHe} />
        <Route path="/he/contact" component={ContactHe} />
        <Route path="/he/contact/" component={ContactHe} />
        <Route path="/he/faq" component={FAQHe} />
        <Route path="/he/faq/" component={FAQHe} />
        <Route path="/he/templates" component={TemplatesHe} />
        <Route path="/he/templates/" component={TemplatesHe} />
        <Route path="/he/privacy" component={PrivacyHe} />
        <Route path="/he/privacy/" component={PrivacyHe} />
        <Route path="/he/cookies" component={CookiePolicyHe} />
        <Route path="/he/cookies/" component={CookiePolicyHe} />
        <Route path="/he/terms" component={TermsHe} />
        <Route path="/he/terms/" component={TermsHe} />
        <Route path="/he/services/custom-design" component={CustomDesignHe} />
        <Route path="/he/services/custom-design/" component={CustomDesignHe} />
        <Route path="/he/services/mobile-first" component={MobileFirstHe} />
        <Route path="/he/services/mobile-first/" component={MobileFirstHe} />
        <Route path="/he/services/seo" component={SeoHe} />
        <Route path="/he/services/seo/" component={SeoHe} />
        <Route path="/he/services/performance" component={PerformanceHe} />
        <Route path="/he/services/performance/" component={PerformanceHe} />
        <Route path="/he/services/security" component={SecurityHe} />
        <Route path="/he/services/security/" component={SecurityHe} />
        <Route path="/he/services/turnaround" component={TurnaroundHe} />
        <Route path="/he/services/turnaround/" component={TurnaroundHe} />
        <Route path="/he/services/maps" component={MapsHe} />
        <Route path="/he/services/maps/" component={MapsHe} />
        <Route path="/he/services/forms" component={FormsHe} />
        <Route path="/he/services/forms/" component={FormsHe} />
        <Route path="/he/services/social" component={SocialHe} />
        <Route path="/he/services/social/" component={SocialHe} />

        {/* ── Greek Routes ── */}
        <Route path="/el" component={HomeEl} />
        <Route path="/el/" component={HomeEl} />
        <Route path="/el/services" component={ServicesEl} />
        <Route path="/el/process" component={ProcessEl} />
        <Route path="/el/pricing" component={PricingEl} />
        <Route path="/el/faq" component={FAQEl} />
        <Route path="/el/contact" component={ContactEl} />
        <Route path="/el/privacy" component={PrivacyEl} />
        {/* /el/cookie-policy → /el/cookies: client-side redirect (server-level 301 handles hard navigation) */}
        <Route path="/el/cookie-policy"><Redirect to="/el/cookies/" /></Route>
        <Route path="/el/cookies" component={CookiePolicyEl} />
        <Route path="/el/terms" component={TermsEl} />
        <Route path="/el/blog" component={BlogEl} />
        <Route path="/el/web-design-cyprus" component={WebDesignCyprusEl} />
        <Route path="/el/web-design-crete" component={WebDesignCreteEl} />
        <Route path="/el/web-design-limassol" component={WebDesignLimassol_El} />
        <Route path="/el/web-design-nicosia" component={WebDesignNicosia_El} />
        <Route path="/el/web-design-thessaloniki" component={WebDesignThessaloniki_El} />

        {/* ── Legacy Redirects (wouter navigate = proper 200 SPA redirect, not Soft 404) ── */}
        <Route path="/blog/istoselidha-yoga-pilates-studio-kypros"><Redirect to="/el/blog/istoselidha-yoga-pilates-studio-kypros/" /></Route>
        <Route path="/blog/istoselidha-nail-salon-beauty-studio-kypros"><Redirect to="/el/blog/istoselidha-nail-salon-beauty-studio-kypros/" /></Route>
        <Route path="/blog/local-seo-google-cyprus"><Redirect to="/blog/how-to-get-found-on-google-cyprus/" /></Route>
        <Route path="/5"><Redirect to="/" /></Route>

        {/* ── Greek Blog Posts ── */}
        <Route path="/el/blog/proti-istoselida-estiatoriou-cafe-odigos" component={RestaurantGuideEl} />
        <Route path="/el/blog/doctor-website-design-orthopaedics-case-study" component={DrGeorgeCaseStudyEl} />
        <Route path="/el/blog/wix-vs-epaggelmatias-web-designer-kypros" component={WixVsDesignerEl} />
        <Route path="/el/blog/posso-kostizei-istoselidha-kypros" component={WebsiteCostEl} />
        <Route path="/el/blog/istoselidha-nail-salon-beauty-studio-kypros" component={NailSalonEl} />
        <Route path="/el/blog/istoselidha-yoga-pilates-studio-kypros" component={YogaEl} />
        <Route path="/el/blog/pos-na-vretheite-google-kypros" component={GoogleVisibilityEl} />
        <Route path="/el/blog/istoselidha-estiatorio-kypros" component={RestaurantEl} />
        <Route path="/el/blog/web-design-ellada-odigos-2026" component={WebDesignGreeceEl} />
        <Route path="/el/blog/geo-vrethite-apo-chatgpt-kypros" component={GeoEl} />
        <Route path="/el/blog/perissoteroi-pelates-kypros" component={MoreCustomersEl} />
        <Route path="/el/examples" component={TemplatesEl} />
        <Route path="/el/templates" component={TemplatesEl} />
        <Route path="/el/services/:serviceId" component={ServiceDetailEl} />

        {/* ── Fallback ── */}
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function AppRoutes() {
  const [location] = useLocation();
  // Preview routes render outside the main Layout (no nav/footer, full-screen)
  if (location.startsWith("/preview/")) {
    return <Route path="/preview/:id" component={PreviewPage} />;
  }
  return (
    <>
      <MainRouter />
      <WebsiteGuide />
      <CookieBanner />
    </>
  );
}

function App() {
  return (
    <>
      <ErrorBoundary>
        <ThemeProvider defaultTheme="light">
          <LanguageProvider>
            <TooltipProvider>
              <Toaster />
              <Router hook={useReadyLocation}>
                <Suspense fallback={null}>
                  <AppRoutes />
                </Suspense>
                <RoutePrefetch />
              </Router>
              <PostHogAnalytics />
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </>
  );
}
export default App;
