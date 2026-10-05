import { useEffect } from 'react';
import { ArrowRight, Brain, CheckCircle2, ClipboardCheck, Download, Images, Ruler } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';
import { useMetaTags } from '@/lib/meta';\nimport SecureProductDownload from '@/components/SecureProductDownload';

const steps = [
  { icon: Download, title: 'Save the complete customer pack', body: 'Use the secure download above to verify your Paystack payment and retrieve the complete customer ZIP, then save it somewhere you can return to throughout the project.' },
  { icon: Ruler, title: 'Capture Context + Lifestyle', body: 'Open the premium guide and workbook. Record the real space, measurements, fixed elements, users, routines and the problems you need the project to solve.' },
  { icon: Images, title: 'Decode your references', body: 'Use the Reference Decoder and Style Decoder Cards. Name what you like and dislike in each image instead of forcing your taste into one style label.' },
  { icon: ClipboardCheck, title: 'Rank essentials + reality', body: 'Prioritise must-haves, nice-to-haves, budget, timing, maintenance and the things that must not change. Make open questions visible.' },
  { icon: Brain, title: 'Run controlled AI iterations', body: 'Use a real source photo, apply the preservation lock, change one variable at a time, compare alternatives and log what each test actually taught you.' },
  { icon: ClipboardCheck, title: 'Create the handoff', body: 'Use the Handoff Pack or offline Brief Studio to assemble the final project brief for a designer, contractor, supplier or your next AI session.' },
];

export default function DesignerBriefThankYou() {
  useMetaTags({
    title: 'Thank You | Designer Brief Builder | VELUCE',
    description: 'Getting started with the Veluce Designer Brief Builder.',
    url: 'https://velucedesign.com/thank-you/designer-brief-builder/',
    type: 'website',
  });

  useEffect(() => {
    const existing = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const previous = existing?.content;
    const robots = existing ?? document.createElement('meta');
    if (!existing) {
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex, nofollow, noarchive');
    return () => {
      if (existing) {
        if (previous) existing.setAttribute('content', previous);
        else existing.removeAttribute('content');
      } else {
        robots.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0c0a08] text-[#faf6ee]">
      <header className="border-b border-white/10 bg-[#0c0a08]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link href="/" asChild><a className="font-serif text-xl font-bold tracking-[0.12em] text-white">VELUCE</a></Link>
          <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500">Veluce Studio</span>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <img src="/images/designer-brief-hero.svg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a08]/60 via-[#0c0a08]/88 to-[#0c0a08]" />
          <div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-28 lg:py-32">
            <CheckCircle2 className="mx-auto text-[#c9a87a]" size={38} strokeWidth={1.5} />
            <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-[#c9a87a]">Purchase complete</p>
            <h1 className="mx-auto mt-4 max-w-4xl font-serif text-5xl font-light leading-[1.04] text-white sm:text-6xl">
              Start with the real space. End with a brief people can use.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-stone-300 sm:text-lg">
              Verify your Paystack payment below and download the customer pack. Then follow this sequence to move from scattered references to a clear project handoff.
            </p>
          </div>
        </section>\n\n        <SecureProductDownload productSlug="designer-brief-builder" productName="Designer Brief Builder" />

        <section className="bg-[#f5efe4] text-[#17120f]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">Start here</p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">Context. Lifestyle. Essentials. Aesthetic. Reality.</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {steps.map(({ icon: Icon, title, body }, index) => (
                <article key={title} className="border border-[#d6c9b5] bg-[#ede3d4] p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <Icon className="text-[#9b7448]" size={22} />
                    <span className="font-serif text-2xl text-[#9b7448]">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 font-serif text-2xl">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-700">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#17130f]">
          <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#c9a87a]">The Veluce Rule</p>
            <p className="mx-auto mt-4 max-w-3xl font-serif text-3xl leading-snug text-white sm:text-4xl">
              Define the decisions before you ask anyone to design.
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-stone-400">
              When the project becomes noisy, return to CLEAR and ask whether the new idea serves the documented context, lifestyle, essentials, aesthetic and reality.
            </p>
          </div>
        </section>

        <section className="bg-[#0c0a08]">
          <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 lg:py-24">
            <h2 className="font-serif text-4xl text-white sm:text-5xl">Keep exploring Veluce.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-stone-400">
              Use the Veluce journal as a deeper reference library when your brief identifies a specific lighting, outdoor-living, materials or smart-home decision that needs more research.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/articles" asChild>
                <a className="inline-flex items-center gap-2 rounded-sm bg-[#f5efe4] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#17120f] hover:bg-white">
                  Browse the journal <ArrowRight size={15} />
                </a>
              </Link>
              <Link href="/" asChild>
                <a className="inline-flex items-center gap-2 rounded-sm border border-white/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:border-white/40">
                  Return to Veluce
                </a>
              </Link>
            </div>
            <p className="mt-10 text-xs leading-relaxed text-stone-500">
              Need help accessing your purchased files? Contact{' '}
              <a className="underline underline-offset-4 hover:text-stone-300" href="mailto:hello@velucedesign.com">hello@velucedesign.com</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
