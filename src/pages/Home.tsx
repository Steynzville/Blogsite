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
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" asChild>
              <a className="flex items-center space-x-2 cursor-pointer">
                <div className="text-2xl font-serif font-bold text-black dark:text-white">VELUCE</div>
                <div className="hidden sm:block text-xs text-gray-500 font-light dark:text-gray-400">Luxury Living Journal</div>
              </a>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {categories.map((cat) => (
                <Link key={cat.slug} href={`/category/${cat.slug}`} asChild>
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
                Explore
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
            <div className="md:hidden pb-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
              <nav className="flex flex-col space-y-3 pt-4 px-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-black dark:text-white">Theme</span>
                  <button
                    onClick={toggleTheme}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                </div>
                {categories.map((cat) => (
                  <Link key={cat.slug} href={`/category/${cat.slug}`} asChild>
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
                  Explore
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
	            loading="eager"
	            fetchPriority="high"
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
              <Link key={article.slug} href={`/article/${article.slug}`} asChild>
                <a className="group cursor-pointer block h-full">
                  <div className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 mb-4 h-48 sm:h-56 md:h-64 shadow-sm group-hover:shadow-lg transition-shadow duration-300 aspect-video">
	                    {article.heroImage && (
	                      <OptimizedImage
	                        src={article.heroImage}
	                        alt={article.title}
	                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
	                        style={{ objectPosition: article.imagePosition || 'center center' }}
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
                'kitchen-essentials': '/images/categories/kitchen-essentials.jpg',
                'patio-decor': '/images/categories/patio-decor.jpg',
                'garden-lighting': '/images/categories/garden-lighting.jpg',
                'luxury-interiors': '/images/categories/luxury-interiors.jpg',
                'home-security': '/images/categories/home-security.jpg',
                'smart-home': '/images/categories/smart-home.jpg',
                'landscape-design': '/images/categories/landscape-design.jpg',
              };
              const imageUrl = categoryImages[category.slug] || '/images/categories/outdoor-lighting.jpg';
              
              return (
                <Link key={category.slug} href={`/category/${category.slug}`} asChild>
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

// Public hosted form only: private email-provider credentials never belong in a static bundle.
function InternalNewsletterSection() {
  const configured = import.meta.env.VITE_NEWSLETTER_FORM_URL;
  let formUrl: string | null = null;
  try {
    const url = new URL(configured);
    if (url.protocol === 'https:') formUrl = url.href;
  } catch { /* No verified public form configured. */ }
  return (
    <section id="newsletter-section" className="py-16 px-6 bg-gray-900 text-white text-center">
      <h2 className="text-4xl font-serif font-bold mb-6">Keep exploring Veluce</h2>
      <p className="text-lg text-gray-300 mb-8">Ideas for thoughtful interiors, lighting and outdoor living.</p>
      {formUrl ? <a href={formUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg">Subscribe to the newsletter</a>
        : <Link href="/articles" className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg">Browse the journal</Link>}
    </section>
  );
}
