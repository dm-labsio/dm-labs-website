import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import { useSEO } from "./hooks/useSEO";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import CookieBanner from "./components/CookieBanner";
import WhatsAppFloat from "./components/WhatsAppFloat";
// Pages
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
import PreviewPage from "./pages/PreviewPage";

// Global SEO updater: fires on every route change to keep canonical + OG URL correct.
// Individual pages can call useSEO() themselves to override title/description.
function GlobalSEO() {
  useSEO();
  return null;
}

function MainRouter() {
  return (
    <Layout>
      <GlobalSEO />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/process" component={Process} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/faq" component={FAQ} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/cookies" component={CookiePolicy} />
        <Route path="/terms" component={Terms} />
        <Route path="/templates" component={Templates} />
        <Route path="/examples" component={Templates} />
        <Route path="/services/:serviceId" component={ServiceDetail} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/blog" component={Blog} />
        <Route path="/web-design-limassol" component={WebDesignLimassol} />
        <Route path="/web-design-thessaloniki" component={WebDesignThessaloniki} />
        <Route path="/web-design-nicosia" component={WebDesignNicosia} />
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
        <TooltipProvider>
          <Toaster />
          <AppRoutes />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
export default App;
