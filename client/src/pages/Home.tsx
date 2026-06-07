import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAllArticles, useAllCategories } from '@/lib/articles';
import { useMetaTags } from '@/lib/meta';
import { useSchema } from '@/components/SchemaTag';
import { getHomepageSchema, getOrganizationSchema } from '@/lib/schema';



export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { articles, isLoading } = useAllArticles();
  const { categories } = useAllCategories();
  const featuredArticles = articles.filter((a) => a.featured).slice(0, 3);

  useMetaTags({
    title: 'VELUCE - Luxury Living Journal | Home & Garden Design',
    description: 'Discover the art and science of luxury home design. From architectural lighting to smart home integration, explore the details that transform houses into havens.',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://veluce.manus.space',
    type: 'website',
  });

  if (typeof window !== 'undefined') {
    useSchema(getHomepageSchema(window.location.origin));
    useSchema(getOrganizationSchema(window.location.origin));
  }

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://veluce.manus.space';

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <a className="flex items-center space-x-2 cursor-pointer">
                <div className="text-2xl font-serif font-bold text-gray-900">VELUCE</div>
                <div className="hidden sm:block text-xs text-gray-500 font-light">Luxury Living Journal</div>
              </a>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {categories.map((cat) => (
                <Link key={cat.slug} href={`/category/${cat.slug}`}>
                  <a className="text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                    {cat.name}
                  </a>
                </Link>
              ))}
            </nav>

            {/* Newsletter CTA */}
            <div className="hidden md:block">
              <Button
                variant="outline"
                className="text-sm border-gray-300 text-gray-700 hover:bg-gray-50"
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
            <div className="md:hidden pb-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-3 pt-4">
                {categories.map((cat) => (
                  <Link key={cat.slug} href={`/category/${cat.slug}`}>
                    <a
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {cat.name}
                    </a>
                  </Link>
                ))}
                <Button
                  variant="outline"
                  className="text-sm border-gray-300 text-gray-700 hover:bg-gray-50 w-full mt-2"
                >
                  Subscribe
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
            Where Light Meets Design
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover the art and science of luxury home design. From architectural lighting to smart home integration, explore the details that transform houses into havens.
          </p>
          <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-base">
            Explore the Collection <ChevronRight className="ml-2" size={20} />
          </Button>
        </div>
      </section>

      {/* Featured Articles Grid */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-12">
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
                      <img
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
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 line-clamp-2">
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
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-12">
            Explore by Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category: any) => (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <a className="group p-6 md:p-8 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all cursor-pointer">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center">
                    Explore articles <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
            Get Design Insights Delivered
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-8">
            Join thousands of design enthusiasts receiving curated articles on luxury home design, lighting, and smart home technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <Button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 whitespace-nowrap">
              Subscribe
            </Button>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-serif font-bold mb-4">VELUCE</h4>
              <p className="text-sm text-gray-400">
                Luxury Living Journal — where design meets craftsmanship.
              </p>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4 text-sm">Categories</h5>
              <ul className="space-y-2 text-sm">
                {categories.slice(0, 3).map((cat: any) => (
                  <li key={cat.slug}>
                    <Link href={`/category/${cat.slug}`}>
                      <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                        {cat.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4 text-sm">More</h5>
              <ul className="space-y-2 text-sm">
                {categories.slice(3).map((cat: any) => (
                  <li key={cat.slug}>
                    <Link href={`/category/${cat.slug}`}>
                      <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                        {cat.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4 text-sm">Legal</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about">
                    <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                      About
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                      Contact
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy">
                    <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                      Privacy Policy
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/terms">
                    <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                      Terms of Use
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/affiliate">
                    <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                      Affiliate Disclosure
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-sm text-gray-400 text-center">
              © {new Date().getFullYear()} VELUCE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
