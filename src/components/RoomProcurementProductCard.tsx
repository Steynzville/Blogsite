import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function RoomProcurementProductCard() {
  const salesLive = import.meta.env.VITE_DIGITAL_PRODUCTS_LIVE === 'true';

  return (
    <section className="bg-[#0c0a08] px-4 py-14 text-[#faf6ee] sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden border border-white/10 bg-[#17130f] md:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[360px]"><img src="/images/countertop-materials.jpg" alt="Interior materials and finishes for procurement decisions" className="absolute inset-0 h-full w-full object-cover object-center" loading="lazy"/><div className="absolute inset-0 bg-gradient-to-r from-black/15 to-[#17130f]/35"/></div>
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12"><p className="text-[11px] uppercase tracking-[0.26em] text-[#d1a86c]">New from Veluce Studio</p><h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">The Room Procurement System</h2><p className="mt-3 font-serif text-xl italic text-stone-400">The SOURCE Method</p><p className="mt-5 text-sm leading-relaxed text-stone-300">Turn the room brief into a controlled shortlist, verify the real cost and fit, use 64 AI prompts to expose unknowns, then track the purchase through delivery, inspection and close-out.</p><div className="mt-7 flex flex-wrap items-center gap-4"><Link href="/room-procurement-system" asChild><a className="inline-flex items-center gap-2 rounded-sm bg-[#f5efe4] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#17120f] hover:bg-white">Explore the Procurement System <ArrowRight size={15}/></a></Link><span className="text-sm text-stone-400">R449 · {salesLive ? 'one-time purchase' : 'coming soon'}</span></div></div>
      </div>
    </section>
  );
}
