import React from 'react';
import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  heroImage?: string;
}

interface RelatedArticlesProps {
  currentArticle: Article;
  allArticles: Article[];
  limit?: number;
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({ 
  currentArticle, 
  allArticles,
  limit = 3
}) => {
  // Find related articles by category, excluding the current article
  const relatedArticles = allArticles
    .filter(article => 
      article.category === currentArticle.category && 
      article.slug !== currentArticle.slug
    )
    .slice(0, limit);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white mb-8">
          Related Articles in {currentArticle.category}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedArticles.map((article) => (
            <Link key={article.slug} href={`/article/${article.slug}`}>
              <a className="group block overflow-hidden rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
                <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-800">
                  {article.heroImage && (
                    <OptimizedImage
                      src={article.heroImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-serif font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 flex-1 mb-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    Read More <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
