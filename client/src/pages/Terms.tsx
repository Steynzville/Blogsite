import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
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
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-8">
          Terms of Use
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using the VELUCE Luxury Living Journal website (the "Site"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">
              2. Use License
            </h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on VELUCE for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on the Site</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              <li>Violating any applicable laws or regulations</li>
              <li>Accessing or searching the Site by any means other than our publicly supported interfaces</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">
              3. Disclaimer
            </h2>
            <p>
              The materials on VELUCE are provided on an 'as is' basis. VELUCE makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p>
              Further, VELUCE does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">
              4. Limitations
            </h2>
            <p>
              In no event shall VELUCE or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on VELUCE, even if VELUCE or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">
              5. Accuracy of Materials
            </h2>
            <p>
              The materials appearing on VELUCE could include technical, typographical, or photographic errors. VELUCE does not warrant that any of the materials on its website are accurate, complete, or current. VELUCE may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">
              6. Links
            </h2>
            <p>
              VELUCE has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by VELUCE of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">
              7. Modifications
            </h2>
            <p>
              VELUCE may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">
              8. Governing Law
            </h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of South Africa, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">
              9. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms of Use, please contact us at steyn.enslin@heatrecovery.co.za.
            </p>
          </section>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Last Updated:</strong> June 2026
            </p>
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
              <Link href="/terms">
                <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Terms
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
