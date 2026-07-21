import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, Redirect, useLocation } from "wouter";
import { useSEO } from "./hooks/useSEO";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
import CookieBanner from "./components/CookieBanner";
import WhatsAppFloat from "./components/WhatsAppFloat";

// ── English Pages ──
import Home from "./pages/Home";
import Services from "./pages/Services";
import Process from "./pages/Process";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import CookiePolicy from "./pages/CookiePolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Templates from "./pages/Templates";
import ServiceDetail from "./pages/ServiceDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import WebDesignLimassol from "./pages/WebDesignLimassol";
import WebDesignThessaloniki from "./pages/WebDesignThessaloniki";
import WebDesignNicosia from "./pages/WebDesignNicosia";
import WebDesignCyprus from "./pages/WebDesignCyprus";
import WebDesignCrete from "./pages/WebDesignCrete";
import WebDesignPaphos from "./pages/WebDesignPaphos";
import WebDesignRestaurantsCyprus from "./pages/WebDesignRestaurantsCyprus";
import PreviewPage from "./pages/PreviewPage";

// ── Greek Pages ──
import HomeEl from "./pages/el/HomeEl";
import ServicesEl from "./pages/el/ServicesEl";
import ProcessEl from "./pages/el/ProcessEl";
import PricingEl from "./pages/el/PricingEl";
import FAQEl from "./pages/el/FAQEl";
import ContactEl from "./pages/el/ContactEl";
import PrivacyEl from "./pages/el/PrivacyEl";
import CookiePolicyEl from "./pages/el/CookiePolicyEl";
import TermsEl from "./pages/el/TermsEl";
import BlogEl from "./pages/el/BlogEl";
import WebDesignCyprusEl from "./pages/el/WebDesignCyprusEl";
import WebDesignCreteEl from "./pages/el/WebDesignCreteEl";
import WebDesignLimassol_El from "./pages/el/WebDesignLimassol";
import WebDesignNicosia_El from "./pages/el/WebDesignNicosia";
import WebDesignThessaloniki_El from "./pages/el/WebDesignThessaloniki";

// ── Greek Blog Posts ──
import WixVsDesignerEl from "./pages/el/blog/WixVsDesignerEl";
import WebsiteCostEl from "./pages/el/blog/WebsiteCostEl";
import NailSalonEl from "./pages/el/blog/NailSalonEl";
import YogaEl from "./pages/el/blog/YogaEl";
import GoogleVisibilityEl from "./pages/el/blog/GoogleVisibilityEl";
import RestaurantEl from "./pages/el/blog/RestaurantEl";
import WebDesignGreeceEl from "./pages/el/blog/WebDesignGreeceEl";
import GeoEl from "./pages/el/blog/GeoEl";
import TemplatesEl from "./pages/el/TemplatesEl";
import ServiceDetailEl from "./pages/el/ServiceDetailEl";

// Global SEO updater: fires on every route change to keep canonical + OG URL correct.
function GlobalSEO() {
  useSEO();
  return null;
}

function MainRouter() {
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
        <Route path="/cookie-policy" component={CookiePolicy} />
        <Route path="/terms" component={Terms} />
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

        {/* ── Greek Routes ── */}
        <Route path="/el" component={HomeEl} />
        <Route path="/el/" component={HomeEl} />
        <Route path="/el/services" component={ServicesEl} />
        <Route path="/el/process" component={ProcessEl} />
        <Route path="/el/pricing" component={PricingEl} />
        <Route path="/el/faq" component={FAQEl} />
        <Route path="/el/contact" component={ContactEl} />
        <Route path="/el/privacy" component={PrivacyEl} />
        <Route path="/el/cookie-policy" component={CookiePolicyEl} />
        <Route path="/el/cookies" component={CookiePolicyEl} />
        <Route path="/el/terms" component={TermsEl} />
        <Route path="/el/blog" component={BlogEl} />
        <Route path="/el/web-design-cyprus" component={WebDesignCyprusEl} />
        <Route path="/el/web-design-crete" component={WebDesignCreteEl} />
        <Route path="/el/web-design-limassol" component={WebDesignLimassol_El} />
        <Route path="/el/web-design-nicosia" component={WebDesignNicosia_El} />
        <Route path="/el/web-design-thessaloniki" component={WebDesignThessaloniki_El} />

        {/* ── Legacy Redirects (wouter navigate = proper 200 SPA redirect, not Soft 404) ── */}
        <Route path="/blog/istoselidha-yoga-pilates-studio-kypros"><Redirect to="/el/blog/istoselidha-yoga-pilates-studio-kypros" /></Route>
        <Route path="/blog/istoselidha-nail-salon-beauty-studio-kypros"><Redirect to="/el/blog/istoselidha-nail-salon-beauty-studio-kypros" /></Route>
        <Route path="/blog/local-seo-google-cyprus"><Redirect to="/blog/how-to-get-found-on-google-cyprus" /></Route>
        <Route path="/5"><Redirect to="/" /></Route>

        {/* ── Greek Blog Posts ── */}
        <Route path="/el/blog/wix-vs-epaggelmatias-web-designer-kypros" component={WixVsDesignerEl} />
        <Route path="/el/blog/posso-kostizei-istoselidha-kypros" component={WebsiteCostEl} />
        <Route path="/el/blog/istoselidha-nail-salon-beauty-studio-kypros" component={NailSalonEl} />
        <Route path="/el/blog/istoselidha-yoga-pilates-studio-kypros" component={YogaEl} />
        <Route path="/el/blog/pos-na-vretheite-google-kypros" component={GoogleVisibilityEl} />
        <Route path="/el/blog/istoselidha-estiatorio-kypros" component={RestaurantEl} />
        <Route path="/el/blog/web-design-ellada-odigos-2026" component={WebDesignGreeceEl} />
        <Route path="/el/blog/geo-vrethite-apo-chatgpt-kypros" component={GeoEl} />
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
      <WhatsAppFloat />
      <CookieBanner />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <AppRoutes />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
export default App;
