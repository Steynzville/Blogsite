import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { studioProducts } from '@/lib/studio-recommendations.mjs';

/**
 * Count product detail views on both direct arrivals and client-side navigation.
 * These are exploration signals, never purchases or completed checkouts.
 */
export default function ProductJourneyTracking() {
  const [location] = useLocation();

  useEffect(() => {
    const slug = location.split('?')[0].replace(/\/+$/, '').replace(/^\//, '');
    const product = Object.values(studioProducts).find(item => item.id === slug);
    if (!product) return;

    const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag !== 'function') return;

    const price = Number(product.price.replace(/[^0-9.]/g, ''));
    gtag('event', 'view_item', {
      currency: 'ZAR',
      ...(Number.isFinite(price) ? { value: price } : {}),
      items: [{
        item_id: product.id,
        item_name: product.title,
        quantity: 1,
        ...(Number.isFinite(price) ? { price } : {}),
      }],
    });
  }, [location]);

  return null;
}
