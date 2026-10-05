import { useEffect } from 'react';
import { ArrowRight, CheckCircle2, Download, FileText, Calculator, Sparkles } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';
import { useMetaTags } from '@/lib/meta';
import SecureProductDownload from '@/components/SecureProductDownload';

const steps = [
  {
    icon: Download,
    title: 'Download your Veluce customer pack',
    body: 'Use the secure download above to verify your Paystack payment and retrieve the complete customer ZIP. Save the pack somewhere you can return to throughout the project.',
  },
  {
    icon: FileText,
    title: 'Open the Blueprint first',
    body: 'Start with the premium Outdoor Lighting Blueprint and follow the workflow in order. The planning system is designed to help you decide the effect before you decide the fixture.',
  },
  {
    icon: Calculator,
    title: 'Build your project plan',
    body: 'Use the editable calculator and fixture scorecard to turn the design into quantities, candidate products, budget and a shortlist you can compare.',
  },
  {
    icon: Sparkles,
    title: 'Test the idea visually',
    body: 'Use the AI Visualization Prompt Pack and offline Studio Tools to explore lighting concepts against photographs of your actual home before you commit.',
  },
];

export default function OutdoorLightingThankYou() {
  useMetaTags({
    title: 'Thank You | Outdoor Lighting Blueprint | VELUCE',
    description: 'Thank you for purchasing the Veluce Outdoor Lighting Blueprint.',
    url: 'https://velucedesign.com/thank-you/outdoor-lighting-blueprint/',
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
          <Link href="/" asChild>
            <a className="font-serif text-xl font-bold tracking-[0.12em] text-white">VELUCE</a>
          </Link>
          <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500">Veluce Studio</span>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <img
            src="/images/moonlighting-atmospheric.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a08]/60 via-[#0c0a08]/85 to-[#0c0a08]" />
          <div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-28 lg:py-32">
            <CheckCircle2 className="mx-auto text-[#c9a87a]" size={38} strokeWidth={1.5} />
            <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-[#c9a87a]">Purchase complete</p>
            <h1 className="mx-auto mt-4 max-w-4xl font-serif text-5xl font-light leading-[1.04] text-white sm:text-6xl">
              Your nightscape starts here.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-stone-300 sm:text-lg">
              Thank you for purchasing the Veluce Outdoor Lighting Blueprint. Verify your Paystack payment below to unlock the customer ZIP, then use this page as your starting point for the recommended workflow.
            </p>
          </div>
        </section>

        <SecureProductDownload productSlug="outdoor-lighting-blueprint" productName="Outdoor Lighting Blueprint" />

        <section className="bg-[#f5efe4] text-[#17120f]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <div className="max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">Start here</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">From download to a real lighting plan.</h2>
              <p className="mt-5 text-base leading-relaxed text-stone-700">
                You do not need to finish everything at once. Work through the Blueprint in sequence, then use the companion tools only when they help answer the next decision.
              </p>
            </div>

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
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#c9a87a]">One useful rule</p>
            <p className="mx-auto mt-4 max-w-3xl font-serif text-3xl leading-snug text-white sm:text-4xl">
              Choose the nighttime effect first. Choose the fixture second.
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-stone-400">
              If a purchase decision starts to feel confusing, return to the four axes and ask what job that light is supposed to perform.
            </p>
          </div>
        </section>

        <section className="bg-[#0c0a08]">
          <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 lg:py-24">
            <h2 className="font-serif text-4xl text-white sm:text-5xl">Keep exploring Veluce.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-stone-400">
              The journal contains deeper guides on architectural grazing, tree uplighting, pathways, pergolas and other techniques referenced throughout the Blueprint.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/category/outdoor-lighting" asChild>
                <a className="inline-flex items-center gap-2 rounded-sm bg-[#f5efe4] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#17120f] hover:bg-white">
                  Explore outdoor lighting
                  <ArrowRight size={15} />
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
              <a className="underline underline-offset-4 hover:text-stone-300" href="mailto:hello@velucedesign.com">
                hello@velucedesign.com
              </a>.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
