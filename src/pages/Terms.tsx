import { Link } from 'wouter';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import Footer from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { useMetaTags } from '@/lib/meta';

export default function Terms() {
  const { theme, toggleTheme } = useTheme();

  useMetaTags({
    title: 'Terms of Use — VELUCE',
    description: 'The terms and provisions governing the use of the VELUCE website.',
    url: 'https://velucedesign.com/terms',
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
          Terms of Use
        </h1>

        <div className="space-y-2 mb-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: June 12, 2026
          </p>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert text-gray-700 dark:text-gray-300 space-y-6">
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">1. Acceptance of Terms</h2>
          <p>
            By accessing and using VELUCE (the "Site"), you agree to be bound by these Terms of Use. If you do not agree, please do not use the Site.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">2. Content Is for Informational Purposes Only</h2>
          <p>
            The content on VELUCE is provided for general informational and inspirational purposes only. It does not constitute professional design, architectural, engineering, financial, or purchasing advice. Any decisions you make based on this content are at your own discretion.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">3. Intellectual Property</h2>
          <p>
            All original content on VELUCE, including articles, images, graphics, and written materials, is owned by VELUCE unless otherwise stated.
          </p>
          <p>
            You may share links to our content and quote short excerpts, provided that clear attribution is given and the original content is not misrepresented.
          </p>
          <p>
            Full articles or substantial portions may not be republished without prior written permission.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">4. User Submissions</h2>
          <p>
            If you submit content (such as messages, feedback, or other materials), you grant VELUCE a non-exclusive right to use such content for the purpose of operating, improving, and displaying the Site. You remain responsible for any content you submit.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">5. Affiliate Links</h2>
          <p>
            Some articles on VELUCE contain affiliate links, which may result in a commission at no additional cost to you. For complete transparency, please review our <Link href="/affiliate" className="text-gray-900 dark:text-white underline">Affiliate Disclosure</Link>.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">6. Disclaimer of Warranties</h2>
          <p>
            The content on VELUCE is provided "as is" without any representations or warranties, express or implied. VELUCE does not guarantee the accuracy, completeness, timeliness, or usefulness of any information presented.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, VELUCE shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use the Site, even if advised of the possibility of such damages.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">8. External Links</h2>
          <p>
            VELUCE may contain links to third-party websites or products. These links are provided for convenience only. We are not responsible for the content, availability, or practices of any third-party site, and we are not liable for any transactions or interactions you have with them.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">9. Modifications to Terms</h2>
          <p>
            We may update these Terms of Use at any time. Changes will be posted on this page with an updated "Last updated" date. Your continued use of the Site constitutes acceptance of any changes.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">10. Governing Law</h2>
          <p>
            These Terms of Use are governed by the laws of South Africa. Any disputes arising from these Terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts of South Africa.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">11. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Use, please contact us at:
          </p>
          <p className="font-semibold">
            <a href="mailto:hello@velucedesign.com" className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
              hello@velucedesign.com
            </a>
          </p>
        </div>
      </article>

      {/* Footer */}
      <Footer />
    </div>
  );
}
