import { Link } from 'wouter';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import Footer from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { useMetaTags } from '@/lib/meta';

export default function Affiliate() {
  const { theme, toggleTheme } = useTheme();

  useMetaTags({
    title: 'Affiliate Disclosure — VELUCE',
    description: 'Transparency about our recommendations and how we earn money through affiliate partnerships.',
    url: 'https://velucedesign.com/affiliate',
    type: 'website',
  });

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
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-4">
          Affiliate Disclosure
        </h1>

        <div className="space-y-2 mb-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: June 12, 2026
          </p>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert text-gray-700 dark:text-gray-300 space-y-6">
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">Transparency About Our Recommendations</h2>
          <p>
            At VELUCE, we believe in complete transparency with our readers. This page explains how we earn money and maintain editorial integrity.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">Affiliate Partnerships</h2>
          <p>
            VELUCE participates in affiliate marketing programs. When we recommend products or services, we may earn a commission if you make a purchase through our affiliate links.
          </p>
          <p>
            Our current affiliate partnerships include:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Amazon Associates</strong> — We earn commissions on qualifying purchases from Amazon.</li>
            <li><strong>AliExpress (Admitad)</strong> — We earn commissions on qualifying purchases from AliExpress.</li>
          </ul>
          <p>
            Affiliate programs, commission rates, and participating partners may change over time. We are not affiliated with every brand mentioned on the Site, and inclusion does not imply endorsement unless explicitly stated.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">How Affiliate Links Work</h2>
          <p>
            When you click an affiliate link on VELUCE, a tracking cookie or similar technology may be placed in your browser by the retailer or affiliate network. This allows them to attribute any qualifying purchase to VELUCE.
          </p>
          <p>
            You do not pay more when using these links, and any commissions earned come directly from the retailer.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">How We Maintain Editorial Integrity</h2>
          <p>
            Our editorial process is independent of our affiliate relationships. We follow these principles:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>We only recommend products and services we genuinely believe in</li>
            <li>Our recommendations are based on quality, design, and value</li>
            <li>We disclose affiliate relationships clearly in relevant articles</li>
            <li>We do not allow affiliate relationships to influence our editorial decisions</li>
            <li>We regularly review our recommendations to ensure they remain current and valuable</li>
          </ul>
          <p>
            Editorial recommendations are not influenced by affiliate commissions.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">No Additional Cost to You</h2>
          <p>
            Using our affiliate links does not cost you anything extra. You pay the same price whether you click through our link or go directly to the retailer. The commission we receive comes from the retailer, not from you.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">Our Commitment to You</h2>
          <p>
            We are committed to providing honest, valuable content about luxury home design and improvement. Our affiliate relationships help us continue creating high-quality articles, guides, and resources at no cost to you.
          </p>
          <p>
            If you ever have questions about our recommendations or affiliate relationships, please contact us at <a href="mailto:steyn.enslin@heatrecovery.co.za" className="text-gray-900 dark:text-white underline">steyn.enslin@heatrecovery.co.za</a>.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">FTC Compliance</h2>
          <p>
            This disclosure is made in compliance with the Federal Trade Commission's Guides Concerning the Use of Endorsements and Testimonials in Advertising (16 CFR Part 255) and similar regulations in other jurisdictions.
          </p>
        </div>
      </article>

      {/* Footer */}
      <Footer />
    </div>
  );
}
