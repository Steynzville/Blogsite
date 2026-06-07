import { Link } from 'wouter';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import Footer from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';

export default function About() {
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
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-8">
          About VELUCE
        </h1>

        <div className="prose prose-lg max-w-none dark:prose-invert text-gray-700 dark:text-gray-300 space-y-6">
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            VELUCE is a luxury living publication dedicated to the art and science of high-end home design. We explore the intersection of aesthetics, functionality, and craftsmanship that defines luxury living.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">Our Mission</h2>
          <p className="leading-relaxed">
            We believe that luxury is not about excess—it's about intention. Every design choice, every material selection, and every lighting placement tells a story. Our mission is to help homeowners, designers, and architects understand the principles that transform ordinary spaces into extraordinary homes.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">What We Cover</h2>
          <p className="leading-relaxed">
            VELUCE publishes in-depth articles on:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Outdoor Lighting</strong> - Architectural grazing, landscape illumination, and exterior ambiance</li>
            <li><strong>Garden Lighting</strong> - Moonlighting techniques, pathway design, and botanical highlighting</li>
            <li><strong>Patio Decor</strong> - Outdoor furniture, textiles, and entertaining spaces</li>
            <li><strong>Smart Home</strong> - Integrated technology, automation, and intelligent design</li>
            <li><strong>Home Security</strong> - Discreet security systems, access control, and perimeter monitoring</li>
            <li><strong>Luxury Interiors</strong> - Design principles, materials, and spatial composition</li>
            <li><strong>Kitchen Essentials</strong> - Culinary spaces, appliances, and workflow optimization</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">Our Approach</h2>
          <p className="leading-relaxed">
            Each article is thoroughly researched and written by design professionals with decades of combined experience. We don't just tell you what to do—we explain the principles behind it. Whether you're a homeowner planning renovations or a design professional seeking inspiration, you'll find actionable insights grounded in design theory and real-world application.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">Why VELUCE?</h2>
          <p className="leading-relaxed">
            In a world of generic design advice and mass-market solutions, VELUCE stands apart. We focus on quality over quantity, depth over breadth. Every article is crafted to be a reference you'll return to again and again—a resource that grows more valuable as your design knowledge deepens.
          </p>

          <p className="leading-relaxed">
            Whether you're exploring your first outdoor lighting project or refining a complete home renovation, VELUCE is here to guide you toward spaces that are not just beautiful, but intentional.
          </p>
        </div>


      </article>

      {/* Footer */}
      <Footer />
    </div>
  );
}
