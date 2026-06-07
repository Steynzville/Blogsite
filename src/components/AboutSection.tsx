import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6">
          About VELUCE
        </h2>
        
        <div className="space-y-4 mb-8 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          <p>
            VELUCE is a luxury living journal dedicated to the art and science of high-end home design. We explore architectural lighting, smart home integration, outdoor living spaces, and timeless interiors that transform houses into personal havens.
          </p>
          <p>
            Our mission is to inspire homeowners and designers with thoughtfully curated insights into the details that elevate everyday living. From the interplay of light and shadow to the seamless integration of technology, we celebrate the craftsmanship and vision that define luxury homes.
          </p>
        </div>

        <Link href="/articles">
          <a className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
            Browse All Articles
            <ChevronRight size={20} />
          </a>
        </Link>
      </div>
    </section>
  );
}
