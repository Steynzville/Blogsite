import { Link } from 'wouter';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import Footer from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { useMetaTags } from '@/lib/meta';

export default function Privacy() {
  const { theme, toggleTheme } = useTheme();

  useMetaTags({
    title: 'Privacy Policy — VELUCE',
    description: 'Our policies regarding the collection, use, and disclosure of personal data when you use our Site.',
    url: 'https://velucedesign.com/privacy',
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
          Privacy Policy
        </h1>
        
        <div className="space-y-2 mb-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: June 12, 2026
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This Privacy Policy applies to information collected through velucedesign.com.
          </p>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert text-gray-700 dark:text-gray-300 space-y-6">
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">Introduction</h2>
          <p className="leading-relaxed">
            This Privacy Policy explains what information we collect, how we use it, and the choices available to you when you visit VELUCE. We are committed to handling personal information in accordance with applicable privacy laws, including South Africa's Protection of Personal Information Act (POPIA).
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">Information We Collect</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Personal Data:</strong> When you contact us through our contact form, you provide your name, email address, and any message content you choose to share.</li>
            <li><strong>Usage Data:</strong> We automatically collect basic information about how you access and use the Site, including your IP address, browser type, pages visited, and time of visit.</li>
            <li><strong>Cookies:</strong> We use cookies and similar technologies, including those provided by analytics services such as Google Analytics, to understand how visitors use our Site and to improve performance. You can disable cookies in your browser settings, although some features may not function properly.</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">How We Use Your Information</h2>
          <p className="leading-relaxed">
            We use collected information to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Respond to messages submitted through our contact form</li>
            <li>Maintain and protect the security of the Site</li>
            <li>Operate, maintain, and improve the functionality and content of the Site</li>
            <li>Analyze Site usage and performance to improve content and user experience</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">Third-Party Service Providers</h2>
          <p className="leading-relaxed">
            We use trusted third-party service providers to help operate our Site. These providers may process limited information on our behalf:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Formspree:</strong> Processes contact form submissions on our behalf.</li>
            <li><strong>Google Analytics:</strong> We use Google Analytics to collect anonymized usage data such as page views, device information, and general interaction patterns. This helps us understand and improve Site performance.</li>
          </ul>
          <p className="leading-relaxed">
            You can learn more about how Formspree handles personal information by reviewing <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-white underline">their privacy policy</a>.
          </p>
          <p className="leading-relaxed">
            You can learn more about how Google handles data collected through Google Analytics by visiting <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-white underline">Google's Privacy Policy</a>.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">Data Retention</h2>
          <p className="leading-relaxed">
            We retain personal information only for as long as reasonably necessary to respond to inquiries, comply with legal obligations, resolve disputes, and enforce our agreements.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">Security</h2>
          <p className="leading-relaxed">
            We take reasonable measures to protect your information. However, no method of transmission over the Internet is 100% secure. We strive to use commercially acceptable means to protect your Personal Data.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">Children's Privacy</h2>
          <p className="leading-relaxed">
            VELUCE is intended for a general audience and is not directed toward children under 13 years of age. We do not knowingly collect personally identifiable information from anyone under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">Your Rights</h2>
          <p className="leading-relaxed">
            Depending on your location and applicable law, you may have rights relating to the personal information we hold about you, including the right to request access to, correction of, or deletion of that information. To exercise these rights, please contact us using the information below.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">Changes to This Policy</h2>
          <p className="leading-relaxed">
            We may update this Privacy Policy from time to time. We will post any changes on this page and update the "Last updated" date.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">Contact Us</h2>
          <p className="leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="font-semibold">
            <a href="mailto:steyn.enslin@heatrecovery.co.za" className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
              steyn.enslin@heatrecovery.co.za
            </a>
          </p>
        </div>
      </article>

      {/* Footer */}
      <Footer />
    </div>
  );
}
