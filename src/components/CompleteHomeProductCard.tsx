import { ArrowRight, Layers3 } from 'lucide-react';
import { Link } from 'wouter';

export default function CompleteHomeProductCard() {
  return <section className="border-y border-[#d6c9b5] bg-[#f5efe4] px-4 py-12 text-[#17120f] sm:px-6 sm:py-16 lg:px-8">
    <div className="mx-auto grid max-w-7xl overflow-hidden border border-[#d6c9b5] bg-[#ede3d4] shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
      <div className="relative min-h-[340px] overflow-hidden bg-[#0c0a08]"><img src="/images/complete-home-hero.svg" alt="Veluce Complete Home Design System" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-r from-[#0c0a08]/15 to-[#0c0a08]/55"/></div>
      <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12"><p className="text-[11px] uppercase tracking-[0.26em] text-[#9b7448]">Veluce Studio · Flagship</p><h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">The Complete Home Design System</h2><p className="mt-3 font-serif text-xl italic text-stone-600">All five systems. One master control layer.</p><p className="mt-5 text-sm leading-relaxed text-stone-700">From first brief to room planning, lighting, product sourcing, delivery and close-out. Includes the five complete Veluce packs plus a whole-home master guide, AI Lab, workbook, decision gates and offline Studio.</p><div className="mt-6 flex items-center gap-3 text-sm text-stone-700"><Layers3 size={18} className="text-[#9b7448]"/><span>Standalone value R1,895 · flagship R999</span></div><div className="mt-7 flex flex-wrap items-center gap-4"><Link href="/complete-home-design-system" asChild><a className="inline-flex items-center gap-2 rounded-sm bg-[#17120f] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-black">Explore the Complete System <ArrowRight size={15}/></a></Link><span className="text-sm text-stone-600">R999 · one-time purchase</span></div></div>
    </div>
  </section>;
}
