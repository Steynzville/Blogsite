import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function OutdoorRoomProductCard() {
  const salesLive = import.meta.env.VITE_DIGITAL_PRODUCTS_LIVE === 'true';

  return (
    <section className="bg-[#f5efe4] px-4 py-14 text-[#17120f] sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden border border-[#d6c9b5] bg-[#ede3d4] md:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#9b7448]">New from Veluce Studio</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">Luxury Outdoor Room Planner</h2>
          <p className="mt-3 font-serif text-xl italic text-stone-600">The 5-Layer Outdoor Room Method</p>
          <p className="mt-5 text-sm leading-relaxed text-stone-700">
            Turn an empty or randomly furnished patio, deck or pergola into a deliberate outdoor room with planning tools, a visual-direction gallery and a 37-prompt AI Visualization Lab built around a photo of your actual space.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link href="/luxury-outdoor-room-planner" asChild>
              <a className="inline-flex items-center gap-2 rounded-sm bg-[#17120f] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-black">
                Explore the Planner <ArrowRight size={15} />
              </a>
            </Link>
            <span className="text-sm text-stone-600">R349 · {salesLive ? 'one-time purchase' : 'coming soon'}</span>
          </div>
        </div>
        <div className="relative min-h-[360px]">
          <img
            src="/images/outdoor-room-planner-hero.svg"
            alt="Veluce Outdoor Room Planner editorial illustration"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/10 to-[#17120f]/15" />
        </div>
      </div>
    </section>
  );
}
