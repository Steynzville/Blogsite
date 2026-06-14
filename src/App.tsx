
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { lazy, Suspense } from "react";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load non-critical routes
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));
const Articles = lazy(() => import("./pages/Articles"));
const Category = lazy(() => import("./pages/Category"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Affiliate = lazy(() => import("./pages/Affiliate"));

// Handle GitHub Pages SPA redirect and slug redirects
const handleRedirect = () => {
  if (typeof window === 'undefined') return;

  const search = window.location.search;
  const pathname = window.location.pathname;
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");

  // 1. Handle GitHub Pages 404.html redirect
  if (search && search.startsWith('?')) {
    const path = search.slice(1).replace(/~and~/g, '&');
    if (path && path !== '/') {
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      window.history.replaceState(null, '', baseUrl + cleanPath + window.location.hash);
      return;
    }
  }

  // 2. Handle Slug Redirects (Client-side)
  const redirects: Record<string, string> = {
    '/article/countertop-materials-guide': '/article/natural-stone-countertops-guide',
    '/article/led-strip-lighting-outdoor-guide': '/article/led-strip-integration-modern-deck',
    // Add trailing slash variants if needed, but wouter usually handles them
  };

  // Normalize pathname for comparison (remove trailing slash)
  const normalizedPath = pathname.replace(/\/$/, "");
  
  if (redirects[normalizedPath]) {
    const target = redirects[normalizedPath];
    window.location.replace(baseUrl + target + (window.location.search || "") + (window.location.hash || ""));
  }
};

handleRedirect();

function Router() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Suspense fallback={<div className="min-h-screen bg-white dark:bg-gray-900" />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/article/:slug" component={ArticleDetail} />
          <Route path="/articles" component={Articles} />
          <Route path="/category/:slug" component={Category} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/affiliate" component={Affiliate} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </WouterRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        switchable
      >
        <ScrollToTop />
        <Router />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
