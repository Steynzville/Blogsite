
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { lazy, Suspense } from "react";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load non-critical routes
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));
const Category = lazy(() => import("./pages/Category"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Affiliate = lazy(() => import("./pages/Affiliate"));

// Handle GitHub Pages SPA redirect
const handleRedirect = () => {
  if (typeof window !== 'undefined' && window.location.search) {
    const search = window.location.search;
    if (search.startsWith('?')) {
      const path = search.slice(1).replace(/~and~/g, '&');
      if (path && path !== '/') {
        window.history.replaceState(null, '', import.meta.env.BASE_URL + path + window.location.hash);
      }
    }
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
