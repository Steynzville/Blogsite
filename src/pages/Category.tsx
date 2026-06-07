import { useParams, Link } from 'wouter';
import { ArrowLeft, ChevronRight, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useArticlesByCategory, useAllCategories } from '@/lib/articles';
import Footer from '@/components/Footer';
import { OptimizedImage } from '@/components/OptimizedImage';

export default function Category() {
  const params = useParams();
  const slug = params.slug as string;
  const { theme, toggleTheme } = useTheme();

  const { categories } = useAllCategories();
  const category = categories.find((c) => c.slug === slug);
  const { articles = [], isLoading } = useArticlesByCategory(slug);

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
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/">
            <a className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </a>
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Category Header */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            {category.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
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
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white mb-8">
            Explore Other Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categories.filter((c) => c.slug !== slug).map((cat) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`}>
                <a className="group block p-6 sm:p-8 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-lg transition-all cursor-pointer">
                  <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
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
            <form 
              className="flex flex-col sm:flex-row gap-3 w-full"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing! You will receive our latest design insights soon.');
                (e.target as HTMLFormElement).reset();
              }}
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 border-none"
              />
              <button 
                type="submit"
                className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
