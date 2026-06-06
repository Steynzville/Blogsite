import { useParams, Link } from 'wouter';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { trpc } from '@/lib/trpc';

const CATEGORIES = [
  { name: 'Outdoor Lighting', slug: 'outdoor-lighting' },
  { name: 'Garden Lighting', slug: 'garden-lighting' },
  { name: 'Patio Decor', slug: 'patio-decor' },
  { name: 'Smart Home', slug: 'smart-home' },
  { name: 'Home Security', slug: 'home-security' },
  { name: 'Luxury Interiors', slug: 'luxury-interiors' },
  { name: 'Kitchen Essentials', slug: 'kitchen-essentials' },
];

export default function Category() {
  const params = useParams();
  const slug = params.slug as string;

  const category = CATEGORIES.find((c) => c.slug === slug);
  const { data: articles = [], isLoading } = trpc.articles.byCategory.useQuery(
    { category: category?.name || '' },
    { enabled: !!category }
  );

  if (!category) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link href="/">
            <a className="inline-flex items-center text-gray-900 hover:text-gray-600 cursor-pointer">
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <a className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer mb-4">
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </a>
          </Link>
        </div>
      </header>

      {/* Category Header */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
            {category.name}
          </h1>
          <p className="text-lg text-gray-600">
            Explore our collection of articles on {category.name.toLowerCase()}. Discover expert insights, design tips, and luxury home solutions.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading articles...</p>
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {articles.map((article: any) => (
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
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 mb-6">
                Articles coming soon in this category.
              </p>
              <Link href="/">
                <a className="inline-flex items-center text-gray-900 hover:text-gray-600 cursor-pointer">
                  Explore other categories <ChevronRight size={20} className="ml-2" />
                </a>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Other Categories */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-8">
            Explore Other Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {CATEGORIES.filter((c) => c.slug !== slug).map((cat) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`}>
                <a className="group p-6 md:p-8 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all cursor-pointer">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                    {cat.name}
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

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">
            Get Design Insights Delivered
          </h2>
          <p className="text-gray-300 mb-6">
            Subscribe to receive curated articles on luxury home design.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h4 className="text-white font-serif font-bold">VELUCE</h4>
              <p className="text-sm text-gray-400">Luxury Living Journal</p>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/about">
                <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  About
                </a>
              </Link>
              <Link href="/contact">
                <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Contact
                </a>
              </Link>
              <Link href="/privacy">
                <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Privacy
                </a>
              </Link>
              <Link href="/terms">
                <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Terms
                </a>
              </Link>
              <Link href="/affiliate">
                <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Affiliate
                </a>
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8">
            <p className="text-sm text-gray-400 text-center">
              © {new Date().getFullYear()} VELUCE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
