import { useEffect } from 'react';
import { ArrowRight, CheckCircle2, Download, Eye, Layers3, Brain, ClipboardCheck } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';
import { useMetaTags } from '@/lib/meta';\nimport SecureProductDownload from '@/components/SecureProductDownload';

const steps = [
  { icon: Download, title: 'Save the complete customer pack', body: 'Use the secure download above to verify your Paystack payment and retrieve the complete customer ZIP. Save it before you begin the audit.' },
  { icon: Eye, title: 'Audit one room after dark', body: 'Use the Night Audit Field Cards from the exact viewpoints that matter: entrance, sofa, table, bed, path or patio.' },
  { icon: Layers3, title: 'Score the Seven Signals', body: 'Use the workbook to score Hierarchy, Layers, Direction, Warmth, Shadow, Concealment and Scenes. Pick the weakest two.' },
  { icon: Brain, title: 'Run one controlled AI comparison', body: 'Use a real photo, paste the preservation lock, change one lighting variable and reject any render that changes the architecture.' },
  { icon: ClipboardCheck, title: 'Build the scene and shopping brief', body: 'Use the Recipe Cards and Atelier to define the scene, focal point, layers and product questions before you buy anything.' },
];

export default function LuxuryLightingThankYou() {
  useMetaTags({
    title: 'Thank You | Luxury Lighting Formula | VELUCE',
    description: 'Getting started with the Veluce Luxury Lighting Formula.',
    url: 'https://velucedesign.com/thank-you/luxury-lighting-formula/',
    type: 'website',
  });

  useEffect(() => {
    const existing = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const previous = existing?.content;
    const robots = existing ?? document.createElement('meta');
    if (!existing) { robots.setAttribute('name', 'robots'); document.head.appendChild(robots); }
    robots.setAttribute('content', 'noindex, nofollow, noarchive');
    return () => {
      if (existing) { if (previous) existing.setAttribute('content', previous); else existing.removeAttribute('content'); }
      else robots.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0c0a08] text-[#faf6ee]">
      <header className="border-b border-white/10 bg-[#0c0a08]"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10"><Link href="/" asChild><a className="font-serif text-xl font-bold tracking-[0.12em] text-white">VELUCE</a></Link><span className="text-[10px] uppercase tracking-[0.2em] text-stone-500">Veluce Studio</span></div></header>
      <main>
        <section className="relative overflow-hidden">
          <img src="/images/luxury-lighting-formula-hero.svg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a08]/55 via-[#0c0a08]/86 to-[#0c0a08]" />
          <div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-28 lg:py-32">
            <CheckCircle2 className="mx-auto text-[#d1a86c]" size={38} strokeWidth={1.5} />
            <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-[#d1a86c]">Purchase complete</p>
            <h1 className="mx-auto mt-4 max-w-4xl font-serif text-5xl font-light leading-[1.04] text-white sm:text-6xl">Start with the room you use every evening.</h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-stone-300 sm:text-lg">Verify your Paystack payment below and download the customer pack. Then audit one room and prove the method before you buy.</p>
          </div>
        </section>\n\n        <SecureProductDownload productSlug="luxury-lighting-formula" productName="Luxury Lighting Formula" />
        <section className="bg-[#f5efe4] text-[#17120f]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">Recommended sequence</p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">Audit. Score. Test. Scene. Buy.</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {steps.map(({icon:Icon,title,body},index) => <article key={title} className="border border-[#d6c9b5] bg-[#ede3d4] p-6 sm:p-7"><div className="flex items-center justify-between gap-4"><Icon className="text-[#9b7448]" size={22}/><span className="font-serif text-2xl text-[#9b7448]">0{index+1}</span></div><h3 className="mt-5 font-serif text-2xl">{title}</h3><p className="mt-3 text-sm leading-relaxed text-stone-700">{body}</p></article>)}
            </div>
          </div>
        </section>
        <section className="bg-[#17130f]"><div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 lg:py-24"><p className="text-[11px] uppercase tracking-[0.28em] text-[#d1a86c]">The Veluce Rule</p><p className="mx-auto mt-4 max-w-3xl font-serif text-3xl leading-snug text-white sm:text-4xl">Luxury light is not more light. It is more intention.</p></div></section>
        <section className="bg-[#0c0a08]"><div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 lg:py-24"><h2 className="font-serif text-4xl text-white sm:text-5xl">Keep exploring Veluce.</h2><p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-stone-400">The journal contains deeper guides on architectural grazing, upward lighting, outdoor lighting and smart-home decisions that can support your project.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/category/outdoor-lighting" asChild><a className="inline-flex items-center gap-2 rounded-sm bg-[#f5efe4] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#17120f] hover:bg-white">Explore lighting articles <ArrowRight size={15}/></a></Link><Link href="/" asChild><a className="inline-flex items-center gap-2 rounded-sm border border-white/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:border-white/40">Return to Veluce</a></Link></div></div></section>
      </main>
      <Footer />
    </div>
  );
}
