import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function OutdoorLightingProductCard() {
  return (
    <section className="bg-[#0c0a08] px-4 py-14 text-[#faf6ee] sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden border border-white/10 bg-[#17130f] md:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[340px]">
          <img
            src="/images/pergola-dining-lighting.jpg"
            alt="Warm layered pergola lighting at night"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-black/55 md:bg-gradient-to-l" />
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#c9a87a]">New from Veluce Studio</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-white sm:text-4xl">Outdoor Lighting Blueprint</h2>
          <p className="mt-3 font-serif text-xl italic text-stone-300">The 4-Axis Nightscape System</p>
          <p className="mt-5 text-sm leading-relaxed text-stone-400">
            A 48-page planning system, editable calculator, AI prompt pack and offline studio tools to help you design the effect before you buy the fixture.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link href="/outdoor-lighting-blueprint" asChild>
              <a className="inline-flex items-center gap-2 rounded-sm bg-[#f5efe4] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#17120f] hover:bg-white">
                Explore the Blueprint
                <ArrowRight size={15} />
              </a>
            </Link>
            <span className="text-sm text-stone-400">R299 · one-time purchase</span>
          </div>
        </div>
      </div>
    </section>
  );
}
