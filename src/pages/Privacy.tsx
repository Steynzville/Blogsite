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
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-4">
          Privacy Policy
        </h1>
        
        <div className="space-y-2 mb-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: September 29, 2026
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
            <li><strong>Newsletter:</strong> If you sign up, you provide your email address to receive the VELUCE Journal. You must confirm your email before joining the active mailing list.</li>
            <li><strong>Purchases:</strong> If you buy a digital product, the checkout provider may collect payment and billing details directly. VELUCE may receive limited order information such as your name, email address, product purchased, order status and transaction reference where needed for delivery, support, accounting or fraud prevention.</li>
            <li><strong>Usage Data:</strong> We automatically collect basic information about how you access and use the Site, including your IP address, browser type, pages visited, and time of visit.</li>
            <li><strong>Cookies:</strong> We may use cookies or similar technologies provided by third-party services necessary for certain features of the Site, such as processing contact form submissions. You can instruct your browser to refuse cookies, although some parts of the Site may not function properly.</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">How We Use Your Information</h2>
          <p className="leading-relaxed">
            We use collected information to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Respond to messages submitted through our contact form</li>
            <li>Send occasional journal updates to people who confirmed their newsletter subscription; every newsletter includes a way to unsubscribe</li>
            <li>Maintain and protect the security of the Site</li>
            <li>Operate, maintain, and improve the functionality and content of the Site</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">Third-Party Service Providers</h2>
          <p className="leading-relaxed">
            We use trusted third-party service providers to help operate our Site. These providers may process limited information on our behalf:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Formspree:</strong> Processes contact form submissions on our behalf.</li>
            <li><strong>MailerLite:</strong> Hosts our newsletter signup form, manages confirmed subscriptions, and sends newsletter and confirmation emails.</li>
            <li><strong>Checkout and digital-delivery provider:</strong> When digital products are offered for sale, the provider identified at checkout processes the transaction and may deliver the purchased files. Payment-card details are handled by that provider rather than stored by VELUCE.</li>
          </ul>
          <p className="leading-relaxed">
            Read the <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-white underline">Formspree privacy policy</a> and <a href="https://www.mailerlite.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-white underline">MailerLite privacy policy</a> for more about their handling of information. MailerLite's signup form and emails may use cookies or similar technology as described in its policy.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">Data Retention</h2>
          <p className="leading-relaxed">
            We keep contact information for as long as reasonably needed to respond to inquiries or meet legal obligations. We keep newsletter subscription information while you remain subscribed, subject to any records we need to retain for legal or suppression purposes. You can unsubscribe using a link in any newsletter or contact us to request deletion.
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
