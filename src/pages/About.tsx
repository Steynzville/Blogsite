import { Link } from 'wouter';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import Footer from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { useMetaTags } from '@/lib/meta';

export default function About() {
  const { theme, toggleTheme } = useTheme();

  useMetaTags({
    title: 'About VELUCE — Design Journal',
    description: 'VELUCE is an independent design journal exploring how environments shape human experience. Principles over trends, intention over excess.',
    url: 'https://velucedesign.com/about',
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
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-8">
          About VELUCE
        </h1>

        <div className="prose prose-lg max-w-none dark:prose-invert text-gray-700 dark:text-gray-300 space-y-6">
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            VELUCE is an independent design journal exploring how environments shape human experience. Through light, materials, technology, and spatial composition, we examine the principles that transform houses into homes that feel intuitive, calm, and enduring. We are interested not only in how spaces look, but in how they guide movement, focus attention, encourage gathering, and influence the way people live within them.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">Design with Intention</h2>
          <p className="leading-relaxed">
            Luxury is not about excess — it's about intention. The finest spaces feel effortless because every element has a reason to exist. Our mission is to help you understand the principles that transform ordinary spaces into extraordinary homes.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">What You'll Find Here</h2>
          <p className="leading-relaxed">
            VELUCE publishes in-depth guides on:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Outdoor Lighting</strong> — Architectural grazing, landscape illumination, and the art of shadow</li>
            <li><strong>Garden Lighting</strong> — Moonlighting techniques, pathway composition, and botanical highlighting</li>
            <li><strong>Patio Decor</strong> — Furniture, textiles, and the geometry of outdoor gathering</li>
            <li><strong>Smart Home</strong> — Integrated technology and invisible automation</li>
            <li><strong>Home Security</strong> — Discreet systems that protect without announcing themselves</li>
            <li><strong>Luxury Interiors</strong> — Materials, proportion, and the psychology of space</li>
            <li><strong>Kitchen Essentials</strong> — Culinary workflow, appliances, and the architecture of cooking</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">Principles Over Trends</h2>
          <p className="leading-relaxed">
            We don't chase trends or publish disposable advice. VELUCE focuses on the underlying principles that make spaces work — the relationships between light and shadow, technology and simplicity, beauty and function. The details change. Good design principles endure.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8">Why VELUCE Exists</h2>
          <p className="leading-relaxed">
            In a world of generic advice and disposable content, VELUCE stands apart. We focus on depth over breadth, quality over quantity. Every article is written to remain useful long after trends fade — a reference designed to reward repeated reading.
          </p>

          <p className="leading-relaxed">
            Whether you're planning your first outdoor lighting project or refining a complete home renovation, VELUCE is here to guide you toward spaces that are not just beautiful, but intentional.
          </p>
        </div>
      </article>

      {/* Footer */}
      <Footer />
    </div>
  );
}
