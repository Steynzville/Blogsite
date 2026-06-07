import { useParams, Link } from 'wouter';
import { ArrowLeft, Share2, Moon, Sun, Check } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { useArticle, useAllArticles } from '@/lib/articles';
import Footer from '@/components/Footer';
import { useMetaTags } from '@/lib/meta';
import { useSchema } from '@/components/SchemaTag';
import { getArticleSchema } from '@/lib/schema';
import { useState, useEffect } from 'react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { RelatedArticles } from '@/components/RelatedArticles';

// Helper to get correct image URL for GitHub Pages
const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

export default function ArticleDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const { theme, toggleTheme } = useTheme();
  const [shareSuccess, setShareSuccess] = useState(false);

  const { article, isLoading } = useArticle(slug);
  const { articles: allArticles } = useAllArticles();

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://steynzville.github.io/Blogsite';

  const handleShare = async () => {
    if (!article) return;

    const url = typeof window !== 'undefined' ? window.location.href : `${baseUrl}/article/${article.slug}`;
    const title = article.title;
    const text = article.excerpt || article.title;

    // Try Web Share API first (works on mobile and some desktop browsers)
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        return;
      } catch (error) {
        // User cancelled or error occurred, fall back to clipboard
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(`${title}\n${url}`);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  useMetaTags({
    title: article ? `${article.title} | VELUCE - Luxury Living Journal` : 'Article Not Found | VELUCE',
    description: article ? (article.excerpt || article.title) : 'The article you are looking for does not exist.',
    url: article ? `${baseUrl}/article/${article.slug}` : (typeof window !== 'undefined' ? window.location.href : baseUrl),
    type: article ? 'article' : 'website',
    author: article ? 'VELUCE' : undefined,
    publishedDate: article?.publishedAt ? new Date(article.publishedAt).toISOString() : undefined,
    modifiedDate: article?.updatedAt ? new Date(article.updatedAt).toISOString() : undefined,
    image: article ? getImageUrl(article.heroImage) : undefined,
  });

  const schema = article ? getArticleSchema(baseUrl, {
    ...article,
    excerpt: article.excerpt || article.title,
    heroImage: article.heroImage ? getImageUrl(article.heroImage) : undefined,
  } as any) : null;

  useSchema(schema || {});

  // Preload hero image
  useEffect(() => {
    if (article?.heroImage) {
      const fileName = article.heroImage.split('/').pop()?.split('.').shift();
      if (fileName) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = getImageUrl(`/images/optimized/${fileName}-lg.webp`);
        link.imageSrcset = `${getImageUrl(`/images/optimized/${fileName}-sm.webp`)} 800w, ${getImageUrl(`/images/optimized/${fileName}-md.webp`)} 1200w, ${getImageUrl(`/images/optimized/${fileName}-lg.webp`)} 1920w`;
        link.imageSizes = "(max-width: 800px) 100vw, (max-width: 1200px) 50vw, 33vw";
        document.head.appendChild(link);
        return () => {
          document.head.removeChild(link);
        };
      }
    }
  }, [article]);

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
            <OptimizedImage
              src={article.heroImage}
              alt={article.title}
              className="w-full h-96 object-cover"
              itemProp="image"
              priority={true}
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

          <div className="mt-6 flex gap-4 items-center">
            <Button variant="outline" size="sm" onClick={handleShare}>
              {shareSuccess ? (
                <>
                  <Check size={16} className="mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Share2 size={16} className="mr-2" />
                  Share
                </>
              )}
            </Button>
            {shareSuccess && (
              <span className="text-sm text-gray-600 dark:text-gray-400">Link copied to clipboard</span>
            )}
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
            <Button variant="outline" size="sm" onClick={handleShare}>
              {shareSuccess ? (
                <>
                  <Check size={16} className="mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Share2 size={16} className="mr-2" />
                  Share Article
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg mb-12">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            <strong>Disclosure:</strong> This article may contain affiliate links to Amazon, AliExpress, and other retailers. We earn a small commission from qualifying purchases at no extra cost to you. This helps support our mission to bring you quality content about luxury home design and living.
          </p>
        </div>
      </article>

      {/* Related Articles */}
      {article && allArticles.length > 1 && (
        <RelatedArticles currentArticle={article} allArticles={allArticles} />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
