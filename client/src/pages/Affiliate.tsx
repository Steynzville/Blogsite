import { Link } from 'wouter';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import Footer from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';

export default function Affiliate() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
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

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-8">
          Affiliate Disclosure
        </h1>

        <div className="prose prose-lg max-w-none dark:prose-invert text-gray-700 dark:text-gray-300 space-y-6">
          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Transparency About Our Recommendations
            </h2>
            <p>
              At VELUCE Luxury Living Journal, we believe in complete transparency with our readers. This page explains how we earn money and maintain editorial integrity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Affiliate Partnerships
            </h2>
            <p>
              VELUCE participates in affiliate marketing programs with carefully selected partners in the home design, lighting, smart home, and luxury home improvement industries. When we recommend products or services, we may earn a commission if you make a purchase through our affiliate links.
            </p>
            <p>
              Our affiliate partnerships include, but are not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Amazon Associates Program</li>
              <li>AliExpress Affiliate Program</li>
              <li>Home improvement and furniture retailers</li>
              <li>Smart home technology providers</li>
              <li>Lighting and design product manufacturers</li>
              <li>Home security and automation companies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8 mb-4">
              How We Maintain Editorial Integrity
            </h2>
            <p>
              Our editorial process is independent of our affiliate relationships. We follow these principles:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>We only recommend products and services we genuinely believe in</li>
              <li>Our recommendations are based on quality, design, and value</li>
              <li>We disclose affiliate relationships clearly in relevant articles</li>
              <li>We do not allow affiliate relationships to influence our editorial decisions</li>
              <li>We regularly review our recommendations to ensure they remain current and valuable</li>
              <li>We welcome reader feedback and criticism</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Affiliate Link Disclosure
            </h2>
            <p>
              When an article contains affiliate links, we will clearly indicate this with language such as:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>"This article contains affiliate links"</li>
              <li>"We may earn a commission if you purchase through this link"</li>
              <li>Visual indicators on product recommendation sections</li>
            </ul>
            <p>
              You are never obligated to use our affiliate links. You can find and purchase products directly from retailers if you prefer. Your purchase decision should be based on what's best for your home, not on our affiliate relationships.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8 mb-4">
              No Additional Cost to You
            </h2>
            <p>
              Using our affiliate links does not cost you anything extra. You pay the same price whether you click through our link or go directly to the retailer. The commission we receive comes from the retailer, not from you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Our Commitment to You
            </h2>
            <p>
              We are committed to providing honest, valuable content about luxury home design and improvement. Our affiliate relationships help us continue creating high-quality articles, guides, and resources for our readers at no cost to you.
            </p>
            <p>
              If you ever have questions about our recommendations or affiliate relationships, please contact us at steyn.enslin@heatrecovery.co.za.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8 mb-4">
              FTC Compliance
            </h2>
            <p>
              This disclosure is made in compliance with the Federal Trade Commission's Guides Concerning the Use of Endorsements and Testimonials in Advertising (16 CFR Part 255) and similar regulations in other jurisdictions.
            </p>
          </section>

          <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Last Updated:</strong> June 2026
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Questions? Contact us at steyn.enslin@heatrecovery.co.za
            </p>
          </div>
        </div>
      </article>

      {/* Footer */}
      <Footer />
    </div>
  );
}
