import { ExternalLink } from 'lucide-react';

interface AffiliateBlockProps {
  title: string;
  description: string;
  image: string;
  productName: string;
  productBrand?: string;
  affiliateUrl: string;
  price?: string;
  rating?: number;
  badge?: string;
}

export default function AffiliateBlock({
  title,
  description,
  image,
  productName,
  productBrand,
  affiliateUrl,
  price,
  rating,
  badge,
}: AffiliateBlockProps) {
  return (
    <div className="my-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-700 rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product Image */}
        <div className="relative">
          <img
            src={image}
            alt={productName}
            className="w-full h-64 md:h-full object-cover rounded-lg"
          />
          {badge && (
            <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {badge}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="md:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-sm text-amber-700 dark:text-amber-300 font-semibold mb-3 uppercase tracking-wide">
              Featured Product
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {description}
            </p>

            {/* Product Details */}
            <div className="flex flex-wrap gap-4 mb-4 text-sm">
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">{productName}</span>
                {productBrand && (
                  <span className="text-gray-600 dark:text-gray-400 ml-2">by {productBrand}</span>
                )}
              </div>
              {price && (
                <div>
                  <span className="font-semibold text-amber-700 dark:text-amber-400">{price}</span>
                </div>
              )}
              {rating && (
                <div>
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">({rating}/5)</span>
                </div>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <div>
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View on Amazon
              <ExternalLink size={16} />
            </a>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
              As an Amazon Associate, we earn from qualifying purchases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
