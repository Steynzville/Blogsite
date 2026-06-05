import { useParams, Link } from 'wouter';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';

export default function ArticleDetail() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: article, isLoading } = trpc.articles.bySlug.useQuery({ slug });

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
    <div className="min-h-screen bg-white overflow-x-hidden">
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
        {/* Meta Information */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            {article.category}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-gray-600 mb-6">{article.excerpt}</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-gray-200">
            <div className="text-sm text-gray-500">
              <p>By VELUCE Editorial Team</p>
              <p>{Math.ceil((article.content?.length || 0) / 200)} min read</p>
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Share2 size={18} />
              Share
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        {article.heroImage && (
          <div className="mb-12 rounded-lg overflow-hidden bg-gray-100 h-96 md:h-[500px]">
            <img
              src={article.heroImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="text-gray-700 leading-relaxed space-y-6 whitespace-pre-wrap">
            {article.content}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="py-8 border-t border-b border-gray-200 my-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-4">
            Get More Design Insights
          </h2>
          <p className="text-gray-600 mb-6">
            Subscribe to receive curated articles on luxury home design, lighting, and smart home technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <Button className="bg-gray-900 text-white hover:bg-gray-800 px-6 py-3 whitespace-nowrap">
              Subscribe
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
