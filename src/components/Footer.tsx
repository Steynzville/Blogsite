import { Link } from 'wouter';
import { useAllCategories } from '@/lib/articles';

export default function Footer() {
  const { categories } = useAllCategories();
  
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
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
                  <Link href={`/category/${cat.slug}`}>
                    <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                      {cat.name}
                    </a>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/articles">
                  <a className="text-gray-400 hover:text-white transition-colors cursor-pointer font-medium">
                    Browse All Articles →
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4 text-sm">Legal</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about">
                  <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    About
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Contact
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Privacy Policy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Terms of Use
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/affiliate">
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
