import { useParams, Link } from 'wouter';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useArticle } from '@/lib/articles';
import { useMetaTags } from '@/lib/meta';
import { useSchema } from '@/components/SchemaTag';
import { getArticleSchema } from '@/lib/schema';
import { useEffect } from 'react';

export default function ArticleDetail() {
  const params = useParams();
  const slug = params.slug as string;

  const { article, isLoading } = useArticle(slug);

  useEffect(() => {
    if (article) {
      useMetaTags({
        title: `${article.title} | VELUCE - Luxury Living Journal`,
        description: article.excerpt || article.title,
        url: `${typeof window !== 'undefined' ? window.location.origin : 'https://veluce.manus.space'}/article/${article.slug}`,
        type: 'article',
        author: 'VELUCE',
        publishedDate: article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined,
        modifiedDate: article.updatedAt ? new Date(article.updatedAt).toISOString() : undefined,
      });

      if (typeof window !== 'undefined') {
        const articleData = {
          ...article,
          excerpt: article.excerpt || article.title,
          heroImage: article.heroImage || undefined,
        };
        useSchema(getArticleSchema(articleData as any, window.location.origin));
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
    useMetaTags({
      title: 'Article Not Found | VELUCE',
      description: 'The article you are looking for does not exist.',
      url: typeof window !== 'undefined' ? window.location.href : 'https://veluce.manus.space',
    });

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
    <div className="min-h-screen bg-white overflow-x-hidden" itemScope itemType="https://schema.org/Article">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <a className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer mb-4">
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </a>
          </Link>
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
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
              {article.category}
            </span>
            {article.publishedAt && (
              <time
                dateTime={new Date(article.publishedAt).toISOString()}
                className="text-sm text-gray-600"
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

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-4" itemProp="headline">
            {article.title}
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed" itemProp="description">
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
          className="prose prose-lg max-w-none text-gray-700 mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
          itemProp="articleBody"
        />

        {/* Divider */}
        <div className="border-t border-gray-200 my-12" />

        {/* Article Meta */}
        <div className="bg-gray-50 p-6 rounded-lg mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600">
                <strong>Category:</strong> {article.category}
              </p>
              {article.publishedAt && (
                <p className="text-sm text-gray-600">
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
