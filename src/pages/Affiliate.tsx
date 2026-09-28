import { Link } from 'wouter';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import Footer from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { useMetaTags } from '@/lib/meta';

export default function Affiliate() {
  const { theme, toggleTheme } = useTheme();

  useMetaTags({
    title: 'Affiliate Disclosure — VELUCE',
    description: 'Information regarding our affiliate partnerships and how they support our content.',
    url: 'https://velucedesign.com/affiliate',
    type: 'website',
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" asChild>
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

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-8">
          Affiliate Disclosure
        </h1>

        <div className="prose prose-lg max-w-none dark:prose-invert text-gray-700 dark:text-gray-300 space-y-6">
          <p>
            VELUCE uses affiliate links through Admitad, including links to participating AliExpress products. If you buy through an eligible link, we may receive a commission at no extra cost to you.
          </p>
          <p>
            Short.io and Linktree may be used to manage links; they are not the retailers. VELUCE is no longer an Amazon Associate. Any ordinary Amazon product links are provided as references and do not earn us Amazon affiliate commissions.
          </p>
          
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">How We Use Affiliate Links</h2>
          <p>
            When you click an affiliate link on VELUCE and make a purchase, we may earn a small commission at no additional cost to you. Recommendations are based on the stated product information and relevance to our design coverage. Hands-on testing is identified explicitly when it has actually occurred.
          </p>
          
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">Editorial Independence</h2>
          <p>
            Our editorial content is not influenced by affiliate partnerships. Recommendations are based on quality, design, and alignment with VELUCE's philosophy — not commission rates.
          </p>
          
          <p className="mt-12 text-sm text-gray-500 dark:text-gray-400">
            Last updated: 28 September 2026
          </p>
        </div>
      </article>

      {/* Footer */}
      <Footer />
    </div>
  );
}
