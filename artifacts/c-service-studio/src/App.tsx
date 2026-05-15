import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { useEffect, useRef } from "react";
import { useStore } from "@/stores/useStore";

import IntroScreen from "@/components/IntroScreen";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import Chatbot from "@/components/Chatbot";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";

import LoginPage from "@/pages/LoginPage";
import Home from "@/pages/Home";
import AcademyPage from "@/pages/AcademyPage";
import BusinessPage from "@/pages/BusinessPage";
import PortfolioPage from "@/pages/PortfolioPage";
import BlogPage from "@/pages/BlogPage";
import DownloadsPage from "@/pages/DownloadsPage";
import ContactPage from "@/pages/ContactPage";
import AdminPage from "@/pages/AdminPage";
import LutsPage from "@/pages/LutsPage";
import TutorialsPage from "@/pages/TutorialsPage";
import PrivacyPage from "@/pages/legal/PrivacyPage";
import TermsPage from "@/pages/legal/TermsPage";
import CookiesPage from "@/pages/legal/CookiesPage";
import SecurityPage from "@/pages/legal/SecurityPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
      <Chatbot />
      <BackToTop />
    </div>
  );
}

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={() => <Layout><Home /></Layout>} />
      <Route path="/academy" component={() => <Layout><AcademyPage /></Layout>} />
      <Route path="/business" component={() => <Layout><BusinessPage /></Layout>} />
      <Route path="/portfolio" component={() => <Layout><PortfolioPage /></Layout>} />
      <Route path="/blog" component={() => <Layout><BlogPage /></Layout>} />
      <Route path="/downloads" component={() => <Layout><DownloadsPage /></Layout>} />
      <Route path="/contact" component={() => <Layout><ContactPage /></Layout>} />
      <Route path="/admin" component={() => <Layout><AdminPage /></Layout>} />
      <Route path="/luts" component={() => <Layout><LutsPage /></Layout>} />
      <Route path="/tutorials" component={() => <Layout><TutorialsPage /></Layout>} />
      <Route path="/privacy" component={() => <Layout><PrivacyPage /></Layout>} />
      <Route path="/terms" component={() => <Layout><TermsPage /></Layout>} />
      <Route path="/cookies" component={() => <Layout><CookiesPage /></Layout>} />
      <Route path="/security" component={() => <Layout><SecurityPage /></Layout>} />
      <Route component={NotFound} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  );
}

function App() {
  const { theme, setTheme, incrementVisits } = useStore();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    document.documentElement.classList.add(theme);
    incrementVisits();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <CustomCursor />
          <ScrollProgress />
          <IntroScreen />
          <AppRoutes />
          <Toaster position="bottom-center" />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
