import { ZarPrice } from './ZarPrice';
import { Link } from 'wouter';
import { getStudioRecommendation } from '@/lib/studio-recommendations.mjs';

type Props = {
  slug: string;
};

export default function ArticleStudioRecommendation({ slug }: Props) {
  const recommendation = getStudioRecommendation(slug);
  if (!recommendation) return null;

  const salesLive = import.meta.env.VITE_DIGITAL_PRODUCTS_LIVE === 'true';
  const cta = salesLive ? recommendation.cta : recommendation.cta.replace('Explore', 'Preview');

  return (
    <aside
      className="not-prose my-12 overflow-hidden border border-[#d6c9b5] bg-[#f5efe4] text-[#17120f] shadow-[0_8px_28px_rgba(23,18,15,0.06)]"
      aria-label={"Veluce Studio recommendation: " + recommendation.title}
    >
      <div className="p-6 sm:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9b7448]">
          Veluce Studio · Recommended for this article
        </p>
        <p className="mt-4 max-w-2xl font-serif text-2xl italic leading-snug text-stone-600 sm:text-3xl">
          {recommendation.hook}
        </p>
        <div className="mt-7 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl">{recommendation.title}</h2>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9b7448]">
              {recommendation.method}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-700 sm:text-base">
              {recommendation.body}
            </p>
          </div>
          <div className="md:text-right">
            <Link href={recommendation.href} asChild>
              <a
                className="inline-flex items-center justify-center bg-[#17120f] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#2a221b]"
                data-product-id={recommendation.id}
                data-placement="article-studio-module"
              >
                {cta} →
              </a>
            </Link>
            <p className="mt-3 text-sm text-stone-600">
              <ZarPrice value={recommendation.price} />{salesLive ? '' : ' · coming soon'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
