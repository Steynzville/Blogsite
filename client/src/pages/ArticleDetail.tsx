import { useParams, Link } from 'wouter';
import { ArrowLeft, Share2, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { useArticle } from '@/lib/articles';
import Footer from '@/components/Footer';
import { useMetaTags } from '@/lib/meta';
import { useSchema } from '@/components/SchemaTag';
import { getArticleSchema } from '@/lib/schema';
import { useEffect } from 'react';

export default function ArticleDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const { theme, toggleTheme } = useTheme();

  const { article, isLoading } = useArticle(slug);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://veluce.manus.space';

  useMetaTags({
    title: article ? `${article.title} | VELUCE - Luxury Living Journal` : 'Article Not Found | VELUCE',
    description: article ? (article.excerpt || article.title) : 'The article you are looking for does not exist.',
    url: article ? `${baseUrl}/article/${article.slug}` : (typeof window !== 'undefined' ? window.location.href : baseUrl),
    type: article ? 'article' : 'website',
    author: article ? 'VELUCE' : undefined,
    publishedDate: article?.publishedAt ? new Date(article.publishedAt).toISOString() : undefined,
    modifiedDate: article?.updatedAt ? new Date(article.updatedAt).toISOString() : undefined,
    image: article?.heroImage || undefined,
  });

  const schema = article ? getArticleSchema({
    ...article,
    excerpt: article.excerpt || article.title,
    heroImage: article.heroImage || undefined,
  } as any, baseUrl) : null;

  useSchema(schema || {});

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {

    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
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
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden" itemScope itemType="https://schema.org/Article">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
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

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Hero Image */}
        {article.heroImage && (
          <div className="mb-8 -mx-4 sm:mx-0 sm:rounded-lg overflow-hidden">
            <img
              src={article.heroImage}
              alt={article.title}
              className="w-full h-96 object-cover"
              itemProp="image"
            />
          </div>
        )}

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full">
              {article.category}
            </span>
            {article.publishedAt && (
              <time
                dateTime={new Date(article.publishedAt).toISOString()}
                className="text-sm text-gray-600 dark:text-gray-400"
                itemProp="datePublished"
              >
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4" itemProp="headline">
            {article.title}
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed" itemProp="description">
            {article.excerpt || article.title}
          </p>

          <div className="mt-6 flex gap-4">
            <Button variant="outline" size="sm">
              <Share2 size={16} className="mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Article Body */}
        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:mb-6 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-em:text-gray-700 dark:prose-em:text-gray-300 dark:prose-invert mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
          itemProp="articleBody"
        />

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 my-12" />

        {/* Article Meta */}
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Category:</strong> {article.category}
              </p>
              {article.publishedAt && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Published:</strong>{' '}
                  {new Date(article.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
            </div>
            <Button variant="outline" size="sm">
              <Share2 size={16} className="mr-2" />
              Share Article
            </Button>
          </div>
        </div>
      </article>

      {/* Footer */}
      <Footer />
    </div>
  );
}
