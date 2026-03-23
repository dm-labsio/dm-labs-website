import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
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

function Router() {
  return (
    <Layout>
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
        <Route path="/services/:serviceId" component={ServiceDetail} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <WhatsAppFloat />
          <CookieBanner />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
