import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Menu, X, ChevronRight, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { useAllArticles, useAllCategories } from '@/lib/articles';
import { useMetaTags } from '@/lib/meta';
import { useSchema } from '@/components/SchemaTag';
import { getHomepageSchema, getOrganizationSchema } from '@/lib/schema';
import { OptimizedImage } from '@/components/OptimizedImage';
import { SearchBar } from '@/components/SearchBar';

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
    url: typeof window !== 'undefined' ? window.location.origin : 'https://steynzville.github.io/Blogsite',
    type: 'website',
  });

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://steynzville.github.io/Blogsite';

  const homepageSchema = getHomepageSchema(baseUrl);
  const orgSchema = getOrganizationSchema(baseUrl);

  useSchema(homepageSchema);
  useSchema(orgSchema);

  // Preload critical hero image
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = getImageUrl('/images/optimized/hero-luxury-lg.webp');
    link.imageSrcset = `${getImageUrl('/images/optimized/hero-luxury-sm.webp')} 800w, ${getImageUrl('/images/optimized/hero-luxury-md.webp')} 1200w, ${getImageUrl('/images/optimized/hero-luxury-lg.webp')} 1920w`;
    link.imageSizes = "(max-width: 800px) 100vw, (max-width: 1200px) 50vw, 33vw";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

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
              <SearchBar articles={articles} />
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
      <section className="relative h-96 sm:h-[28rem] md:h-[32rem] overflow-hidden">
        <div className="absolute inset-0">
            <OptimizedImage 
              src="/images/hero-luxury.jpg" 
              alt="Luxury home design with architectural lighting"
              className="w-full h-full object-cover object-[center_25%]"
              priority={true}
            />
          {/* Subtle dark gradient overlay to make text pop consistently across devices */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>
        <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-white mb-4 drop-shadow-xl tracking-wide">
              Where Light Meets Design
            </h1>
            <p className="text-lg sm:text-xl text-gray-100 max-w-2xl mx-auto drop-shadow-md font-light leading-relaxed">
              Discover the art and science of luxury home design. From architectural lighting to smart home integration, explore the details that transform houses into havens.
            </p>
          </div>
        </div>
      </section>

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
                <a className="group cursor-pointer">
                  <div className="overflow-hidden rounded-lg bg-gray-100 mb-4 h-48 sm:h-56 md:h-64">
                    {article.heroImage && (
                      <OptimizedImage
                        src={article.heroImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      {article.category}
                    </p>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 line-clamp-2">
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
      <NewsletterSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// MailerLite Newsletter Component
function NewsletterSection() {
  return (
    <section id="newsletter-section" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
          Get Design Insights Delivered
        </h2>
        <p className="text-base sm:text-lg text-gray-300 mb-8">
          Join thousands of design enthusiasts receiving curated articles on luxury home design, lighting, and smart home technology.
        </p>
        {/* MailerLite embedded form */}
        <div className="ml-embedded" data-form="y61iDH"></div>
      </div>
    </section>
  );
}
