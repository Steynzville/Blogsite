import { Link } from 'wouter';
import { useAllCategories } from '@/lib/articles';

export default function Footer() {
  const { categories } = useAllCategories();
  
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-serif font-bold mb-4">VELUCE</h4>
            <p className="text-sm text-gray-400">
              Luxury Living Journal — where design meets craftsmanship.
            </p>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4 text-sm">Categories</h5>
            <ul className="space-y-2 text-sm">
              {categories.map((cat: any) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} asChild>
                    <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                      {cat.name}
                    </a>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/articles" asChild>
                  <a className="text-gray-400 hover:text-white transition-colors cursor-pointer font-medium">
                    Browse All Articles →
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4 text-sm">Veluce Studio</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/outdoor-lighting-blueprint" asChild>
                  <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Outdoor Lighting Blueprint
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/luxury-outdoor-room-planner" asChild>
                  <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Luxury Outdoor Room Planner
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/designer-brief-builder" asChild>
                  <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Designer Brief Builder
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/luxury-lighting-formula" asChild>
                  <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Luxury Lighting Formula
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/room-procurement-system" asChild>
                  <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Room Procurement System
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4 text-sm">Legal</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" asChild>
                  <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    About
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact" asChild>
                  <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Contact
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/privacy" asChild>
                  <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Privacy Policy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/terms" asChild>
                  <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Terms of Use
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/affiliate" asChild>
                  <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Affiliate Disclosure
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} VELUCE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
