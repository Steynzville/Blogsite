import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
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

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8">Introduction</h2>
          <p className="leading-relaxed">
            VELUCE ("we," "us," "our," or "Company") operates the VELUCE website (the "Site"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Site and the choices you have associated with that data.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8">Information Collection and Use</h2>
          <p className="leading-relaxed">
            We collect several different types of information for various purposes to provide and improve our service to you.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6">Types of Data Collected</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Personal Data:</strong> While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to:
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Cookies and Usage Data</li>
              </ul>
            </li>
            <li><strong>Usage Data:</strong> We may also collect information on how the Site is accessed and used ("Usage Data"). This may include information such as your computer's Internet Protocol address, browser type, browser version, the pages you visit, the time and date of your visit, and other diagnostic data.</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8">Use of Data</h2>
          <p className="leading-relaxed">
            VELUCE uses the collected data for various purposes:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>To provide and maintain our Site</li>
            <li>To notify you about changes to our Site</li>
            <li>To allow you to participate in interactive features of our Site when you choose to do so</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our Site</li>
            <li>To monitor the usage of our Site</li>
            <li>To detect, prevent and address technical issues</li>
            <li>To send you newsletters and marketing communications (with your consent)</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8">Security of Data</h2>
          <p className="leading-relaxed">
            The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8">Changes to This Privacy Policy</h2>
          <p className="leading-relaxed">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8">Contact Us</h2>
          <p className="leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="font-semibold">
            <a href="mailto:steyn.enslin@heatrecovery.co.za" className="text-gray-900 hover:text-gray-600">
              steyn.enslin@heatrecovery.co.za
            </a>
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8">Your Rights</h2>
          <p className="leading-relaxed">
            You have the right to access, update, or delete your personal information at any time by contacting us. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy.
          </p>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-12 p-8 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            Get Design Insights Delivered
          </h3>
          <p className="text-gray-600 mb-6">
            Subscribe to receive curated articles on luxury home design.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button className="bg-gray-900 text-white hover:bg-gray-800 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8 mt-12">
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
