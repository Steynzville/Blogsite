import { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'wouter';
import { Menu, X, ChevronRight, Moon, Sun, CheckCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { useAllArticles, useAllCategories } from '@/lib/articles';
import { useMetaTags } from '@/lib/meta';
import { useSchema } from '@/components/SchemaTag';
import { getHomepageSchema, getOrganizationSchema } from '@/lib/schema';
import { OptimizedImage } from '@/components/OptimizedImage';
import AboutSection from '@/components/AboutSection';

const SearchBar = lazy(() => import('@/components/SearchBar').then(m => ({ default: m.SearchBar })));
const NewsletterSection = lazy(() => Promise.resolve({ default: InternalNewsletterSection }));

// Helper to get correct image URL for GitHub Pages
const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { articles, isLoading } = useAllArticles();
  const { categories } = useAllCategories();
  const featuredArticles = articles.filter((a) => a.featured).slice(0, 3);

  useMetaTags({
    title: 'VELUCE - Luxury Living Journal | Home & Garden Design',
    description: 'Discover the art and science of luxury home design. From architectural lighting to smart home integration, explore the details that transform houses into havens.',
    url: 'https://velucedesign.com/',
    type: 'website',
  });

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://steynzville.github.io/Blogsite';

  const homepageSchema = getHomepageSchema(baseUrl);
  const orgSchema = getOrganizationSchema(baseUrl);

  useSchema(homepageSchema);
  useSchema(orgSchema);



  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-x-hidden">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <a className="flex items-center space-x-2 cursor-pointer">
                <div className="text-2xl font-serif font-bold text-gray-900 dark:text-white">VELUCE</div>
                <div className="hidden sm:block text-xs text-gray-500 font-light">Luxury Living Journal</div>
              </a>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {categories.map((cat) => (
                <Link key={cat.slug} href={`/category/${cat.slug}`}>
                  <a className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">
                    {cat.name}
                  </a>
                </Link>
              ))}
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </nav>

            {/* Search Bar */}
            <div className="hidden lg:block flex-1 max-w-xs mx-8">
              <Suspense fallback={<div className="h-10 w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />}>
                <SearchBar articles={articles} />
              </Suspense>
            </div>

            {/* Newsletter CTA */}
            <div className="hidden md:block">
              <Button
                variant="outline"
                className="text-sm border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  const newsletterSection = document.getElementById('newsletter-section');
                  if (newsletterSection) {
                    newsletterSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Subscribe
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-800">
              <nav className="flex flex-col space-y-3 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Theme</span>
                  <button
                    onClick={toggleTheme}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                </div>
                {categories.map((cat) => (
                  <Link key={cat.slug} href={`/category/${cat.slug}`}>
                    <a
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {cat.name}
                    </a>
                  </Link>
                ))}
                <Button
                  variant="outline"
                  className="text-sm border-gray-300 text-gray-700 hover:bg-gray-50 w-full mt-2"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const newsletterSection = document.getElementById('newsletter-section');
                    if (newsletterSection) {
                      setTimeout(() => {
                        newsletterSection.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }}
                >
                  Subscribe
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section relative h-96 sm:h-[28rem] md:h-[32rem] overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <OptimizedImage 
            src="/images/hero-luxury.jpg" 
            alt="Luxury home design with architectural lighting"
            className="w-full h-full object-cover object-[center_25%]"
            priority={true}
            width={1920}
            height={1080}
          />
          {/* Solid dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-white mb-4 drop-shadow-lg tracking-wide">
              Where Light Meets Design
            </h1>
            <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto drop-shadow-md font-light leading-relaxed">
              Discover the art and science of luxury home design. From architectural lighting to smart home integration, explore the details that transform houses into havens.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Featured Articles Grid */}
      <section id="featured-articles" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-12">
            Featured Articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {isLoading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">Loading articles...</p>
              </div>
            ) : featuredArticles.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">Featured articles coming soon.</p>
              </div>
            ) : null}
            {featuredArticles.map((article: any) => (
              <Link key={article.slug} href={`/article/${article.slug}`}>
                <a className="group cursor-pointer block h-full">
                  <div className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 mb-4 h-48 sm:h-56 md:h-64 shadow-sm group-hover:shadow-lg transition-shadow duration-300 aspect-video">
                    {article.heroImage && (
                      <OptimizedImage
                        src={article.heroImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        width={800}
                        height={450}
                      />
                    )}
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      {article.category}
                    </p>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-12">
            Explore by Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category: any) => {
              const categoryImages: Record<string, string> = {
                'outdoor-lighting': '/images/categories/outdoor-lighting.jpg',
                'patio-decor': '/images/categories/patio-decor.jpg',
                'garden-lighting': '/images/categories/garden-lighting.jpg',
                'luxury-interiors': '/images/categories/luxury-interiors.jpg',
                'home-security': '/images/categories/home-security.jpg',
                'smart-home': '/images/categories/smart-home.jpg',
                'landscape-design': '/images/categories/landscape-design.jpg',
              };
              const imageUrl = categoryImages[category.slug] || '/images/categories/outdoor-lighting.jpg';
              
              return (
                <Link key={category.slug} href={`/category/${category.slug}`}>
                  <a className="group block overflow-hidden rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-800">
                      <OptimizedImage 
                        src={imageUrl}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        Explore articles <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </p>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section - MailerLite Integration */}
      <Suspense fallback={<div className="py-20 bg-gray-50 dark:bg-gray-800" />}>
        <NewsletterSection />
      </Suspense>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// MailerLite Newsletter Component
function InternalNewsletterSection() {
  const [email, setEmail] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!gdprConsent) {
      setSubmitError('Please accept the privacy policy to subscribe.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      // MailerLite API v2 — subscribers endpoint
      const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_MAILERLITE_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          groups: ['189644908318950798'],
          fields: { source: 'VELUCE Blog Newsletter' },
        }),
      });

      if (response.ok || response.status === 422) {
        // 422 = subscriber already exists, treat as success
        setSubmitSuccess(true);
        setEmail('');
        setGdprConsent(false);
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setSubmitError('Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setSubmitError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter-section" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-6 drop-shadow-lg">
          Stay in the Loop
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-12 leading-relaxed">
          Join thousands of design enthusiasts receiving curated articles on luxury home design, architectural lighting, and smart home technology.
        </p>

        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-900/30 border border-green-600 rounded-lg flex items-start gap-3 max-w-md mx-auto">
            <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="font-semibold text-green-400">Successfully subscribed!</p>
              <p className="text-sm text-gray-300">Welcome to VELUCE. You'll receive our next update soon.</p>
            </div>
          </div>
        )}

        {submitError && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-600 rounded-lg flex items-start gap-3 max-w-md mx-auto">
            <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-left text-sm text-red-200">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-6 py-4 rounded-lg bg-white/10 border border-gray-500 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 rounded-lg font-bold text-lg transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </div>

          <div className="flex items-start gap-3 text-left mb-4">
            <input
              type="checkbox"
              id="gdpr"
              required
              checked={gdprConsent}
              onChange={(e) => setGdprConsent(e.target.checked)}
              className="mt-1 rounded border-gray-600 bg-gray-800 text-gray-600 focus:ring-gray-400"
            />
            <label htmlFor="gdpr" className="text-sm text-gray-300 leading-relaxed">
              I agree to receive the VELUCE newsletter and accept the privacy policy. You can unsubscribe at any time.
            </label>
          </div>
        </form>
        <p className="text-xs text-gray-500 mt-6">
          We respect your inbox. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
