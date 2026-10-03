import { ZarPrice } from './ZarPrice';
import { ZarPrice } from './ZarPrice';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function LuxuryLightingProductCard() {
  const salesLive = import.meta.env.VITE_DIGITAL_PRODUCTS_LIVE === 'true';

  return (
    <section className="bg-[#f5efe4] px-4 py-14 text-[#17120f] sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden border border-[#d6c9b5] bg-[#ede3d4] md:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#9b7448]">New from Veluce Studio</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">The Luxury Lighting Formula</h2>
          <p className="mt-3 font-serif text-xl italic text-stone-600">The Seven Signals of Expensive-Looking Light</p>
          <p className="mt-5 text-sm leading-relaxed text-stone-700">Diagnose flat or harsh lighting, rebuild the hierarchy, create scenes and test changes on a photo of your actual room with a 53-prompt AI Lab, 13-sheet workbook and offline Lighting Atelier.</p>
          <div className="mt-7 flex flex-wrap items-center gap-4"><Link href="/luxury-lighting-formula" asChild><a className="inline-flex items-center gap-2 rounded-sm bg-[#17120f] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-black">Explore the Formula <ArrowRight size={15}/></a></Link><span className="text-sm text-stone-600"><ZarPrice value="R449" /> · {salesLive ? 'one-time purchase' : 'coming soon'}</span></div>
        </div>
        <div className="relative min-h-[360px]"><img src="/images/bedroom-lighting.jpg" alt="Layered warm bedroom lighting at night" className="absolute inset-0 h-full w-full object-cover object-center" loading="lazy"/><div className="absolute inset-0 bg-gradient-to-l from-black/5 to-[#17120f]/20"/></div>
      </div>
    </section>
  );
}
