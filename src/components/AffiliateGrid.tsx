import { ExternalLink } from 'lucide-react';

interface AffiliateProduct {
  id: string;
  name: string;
  brand?: string;
  description: string;
  image: string;
  price?: string;
  rating?: number;
  affiliateUrl: string;
  badge?: string;
}

interface AffiliateGridProps {
  title: string;
  subtitle?: string;
  products: AffiliateProduct[];
  columns?: 2 | 3 | 4;
}

export default function AffiliateGrid({
  title,
  subtitle,
  products,
  columns = 3,
}: AffiliateGridProps) {
  const gridColsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[columns];

  return (
    <div className="my-12 p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="mb-8">
        <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        {subtitle && (
          <p className="text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        )}
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridColsClass} gap-6`}>
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            {/* Product Image */}
            <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-600">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              {product.badge && (
                <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col h-full">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                  {product.name}
                </h4>
                {product.brand && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {product.brand}
                  </p>
                )}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {product.description}
                </p>
              </div>

              {/* Price and Rating */}
              <div className="flex items-center justify-between mb-4 text-sm">
                {product.price && (
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    {product.price}
                  </span>
                )}
                {product.rating && (
                  <span className="text-yellow-500">
                    ★ {product.rating}/5
                  </span>
                )}
              </div>

              {/* CTA */}
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded font-semibold text-sm transition-colors"
              >
                View
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-400 mt-6 text-center">
        As an Amazon Associate, we earn from qualifying purchases. These recommendations are based on product quality and relevance to our readers.
      </p>
    </div>
  );
}
