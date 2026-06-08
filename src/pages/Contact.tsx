import { ArrowLeft, Mail, Moon, Sun, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'wouter';
import { useForm, ValidationError } from '@formspree/react';
import Footer from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

export default function Contact() {
  const { theme, toggleTheme } = useTheme();
  const [state, handleSubmit] = useForm('xvznkjdl');

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-8">
          Get in Touch
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Mail size={24} className="text-gray-600 dark:text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Email</p>
                    <a
                      href="mailto:steyn.enslin@heatrecovery.co.za"
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      steyn.enslin@heatrecovery.co.za
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                What We're Looking For
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Guest article submissions</li>
                <li>• Design collaboration opportunities</li>
                <li>• Product recommendations and reviews</li>
                <li>• Partnership inquiries</li>
                <li>• General feedback and suggestions</li>
              </ul>
            </div>
          </div>

          {/* Contact Form - Formspree Integration */}
          <div>
            {state.succeeded && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex flex-col items-center justify-center text-center py-12">
                <CheckCircle size={48} className="text-green-600 dark:text-green-400 mb-4" />
                <h2 className="text-2xl font-serif font-bold text-green-900 dark:text-green-100 mb-2">Thank you!</h2>
                <p className="text-green-800 dark:text-green-200">Your message has been sent successfully. We'll get back to you soon.</p>
                <Button 
                  variant="outline" 
                  className="mt-8"
                  onClick={() => {
                    // Reset Formspree state by reloading the component or navigating
                    // For SPAs on GH Pages, a safe way to reset the form state is to navigate back to the same page
                    window.location.href = window.location.pathname;
                  }}
                >
                  Send another message
                </Button>
              </div>
            )}

            {state.errors && Array.isArray(state.errors) && state.errors.length > 0 && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-900 dark:text-red-100">Error</p>
                  <p className="text-sm text-red-800 dark:text-red-200">Failed to send message. Please try again.</p>
                </div>
              </div>
            )}

            {!state.succeeded && (
              <form 
                onSubmit={handleSubmit}
                className="space-y-6"
              >
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="Your name"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="your@email.com"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="What is this about?"
                />
                <ValidationError prefix="Subject" field="subject" errors={state.errors} className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="Your message..."
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
              </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {state.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
