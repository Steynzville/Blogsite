import { Check, ArrowRight, Sparkles, Calculator, FileText, WandSparkles } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';
import { useMetaTags } from '@/lib/meta';

const PRICE = 'R299';
const checkoutUrl = (import.meta.env.VITE_OUTDOOR_LIGHTING_CHECKOUT_URL || '').trim();
const checkoutReady = /^https:\/\//i.test(checkoutUrl);

const axes = [
  { key: 'X', title: 'Gathering', body: 'Dining, lounge and fire zones. Warm, intimate, human-scaled light.' },
  { key: 'Y', title: 'Perception', body: 'Trees, façades and stone. Vertical depth, texture and architectural emphasis.' },
  { key: 'Z', title: 'Circulation', body: 'Paths, steps and thresholds. Readable movement without runway lighting.' },
  { key: 'A', title: 'Atmosphere', body: 'Hidden glow and moonlight. Calm, contrast and meaningful darkness.' },
];

const included = [
  '48-page premium Outdoor Lighting Blueprint PDF',
  '20-Minute Night Walk Audit',
  '4-Axis Nightscape planning system',
  'Six adaptable lighting recipes',
  'Color temperature, beam, glare and power decision cards',
  'Editable Excel project calculator and weighted fixture scorecard',
  '25-prompt AI visualization pack',
  'Offline interactive Studio Tools companion',
  'Three worked project examples and printable worksheets',
];

const faqs = [
  [
    'I have saved lots of outdoor-lighting inspiration, but how do I turn it into a plan for my own home?',
    'That inspiration-to-execution gap is exactly what the Blueprint is designed to solve. Start with the 20-Minute Night Walk Audit, map the property by the four lighting jobs, then use the worksheets and worked layouts to turn the look you like into a practical lighting plan for your own spaces.'
  ],
  [
    'How can I get a professionally designed look without knowing professional lighting design?',
    'The 4-Axis Nightscape System breaks the designer look into four understandable jobs: Gathering, Perception, Circulation and Atmosphere. The Blueprint demonstrates how to layer those jobs, control contrast and preserve darkness so you can make deliberate design decisions without needing specialist design software.'
  ],
  [
    'How do I know what type of light should go where?',
    'Instead of starting with a fixture catalogue, the Blueprint teaches you to define the effect and purpose first. Its decision cards, fixture decision process and worked examples then help you translate each job into an appropriate lighting approach before you compare products.'
  ],
  [
    'How do I avoid buying too many lights or making the garden look harsh and over-lit?',
    'The Blueprint includes the Too Much Light Test and teaches spacing, contrast, glare control and selective darkness. The goal is not to fill every dark area with a fixture; it is to spend the light where it creates depth, safety or atmosphere and deliberately leave the rest quiet.'
  ],
  [
    'How do I work out how many fixtures I actually need and keep the project within budget?',
    'Use the editable project calculator to build the plan by zone, estimate fixture quantities, wattage and cost, and compare alternatives before purchasing. The weighted fixture scorecard also helps you judge candidates on more than price alone.'
  ],
  [
    'Can I see how the idea might look on my own house before I spend money?',
    'Yes. The Blueprint shows you how to photograph your property at dusk, and the included 25-prompt AI Visualization Pack is designed to test lighting concepts against photographs of your actual home while asking the image tool to preserve the existing architecture.'
  ],
  [
    'I keep finding attractive lights online. How do I know whether a product is actually suitable for my project?',
    'The product scorecard gives you a consistent way to compare candidate fixtures against suitability, light quality, glare control, build, serviceability, warranty, aesthetic fit and power-system fit. That shifts the decision from “Do I like this light?” to “Will this light create the effect I planned?”'
  ],
  [
    'Is this an electrical installation manual?',
    'No. The Blueprint is a design-planning system that helps you decide what you want the lighting to achieve before installation. Electrical rules, cable methods, wet-area requirements and licensed-trade requirements vary by location and product, so follow manufacturer instructions and local regulations and use a qualified professional wherever required.'
  ],
  [
    'What do I receive after purchase?',
    'Paystack provides secure access to the complete Veluce toolkit: the 48-page Blueprint, editable project calculator and fixture scorecard, AI Visualization Prompt Pack, offline Studio Tools and quick-start material. Together they take you from the first night audit through planning, visualization and confident product comparison.'
  ],
];

function PurchaseButton({ compact = false }: { compact?: boolean }) {
  if (!checkoutReady) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-sm bg-stone-300 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-stone-600 ${compact ? '' : 'sm:px-7 sm:py-4'}`}
        aria-disabled="true"
        title="Checkout is being configured"
      >
        Coming soon
      </span>
    );
  }

  return (
    <a
      href={checkoutUrl}
      className={`inline-flex items-center justify-center gap-2 rounded-sm bg-[#f5efe4] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#17120f] transition hover:bg-white ${compact ? '' : 'sm:px-7 sm:py-4'}`}
      rel="noopener"
    >
      Get the Blueprint — {PRICE}
      <ArrowRight size={16} />
    </a>
  );
}

export default function OutdoorLightingBlueprint() {
  useMetaTags({
    title: 'Outdoor Lighting Blueprint | VELUCE',
    description: 'Plan a professional-looking outdoor nightscape before you buy. The Veluce 4-Axis Nightscape System includes a 48-page blueprint, calculator, AI prompt pack and offline studio tools.',
    url: 'https://velucedesign.com/outdoor-lighting-blueprint/',
    type: 'website',
  });

  return (
    <div className="min-h-screen bg-[#0c0a08] text-[#faf6ee]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c0a08]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" asChild>
            <a className="font-serif text-xl font-bold tracking-[0.12em] text-white">VELUCE</a>
          </Link>
          <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.14em] text-stone-400 sm:flex">
            <a href="#inside" className="hover:text-white">Inside</a>
            <a href="#system" className="hover:text-white">The system</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </nav>
          <PurchaseButton compact />
        </div>
      </header>

      <main>
        <section className="relative min-h-[82svh] overflow-hidden">
          <img
            src="/images/architectural-grazing-stone-wall.jpg"
            alt="Architectural outdoor lighting grazing a textured stone wall at night"
            className="absolute inset-0 h-full w-full object-cover object-[center_48%] sm:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a08] via-[#0c0a08]/65 to-black/35" />
          <div className="relative mx-auto flex min-h-[82svh] max-w-7xl flex-col justify-end px-5 pb-12 pt-24 sm:px-8 sm:pb-16 lg:px-10">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#c9a87a]">Veluce Studio · First edition 2026</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl font-light leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Make your home look professionally lit — before you buy the wrong lights.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-200 sm:text-lg">
              A practical outdoor-lighting planning system for homeowners who want atmosphere, depth and confident purchasing decisions without learning professional design software.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PurchaseButton />
              <a href="#inside" className="text-xs uppercase tracking-[0.16em] text-white underline decoration-[#c9a87a] underline-offset-8">
                Look inside
              </a>
            </div>
            <p className="mt-4 text-xs text-stone-400">One-time purchase · Digital delivery · Personal-use license</p>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#17130f]">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#c9a87a]">The Veluce Rule</p>
            <p className="mt-3 max-w-4xl font-serif text-3xl leading-snug text-white sm:text-4xl">
              Choose the nighttime effect first. Choose the fixture second.
            </p>
          </div>
        </section>

        <section id="inside" className="bg-[#f5efe4] text-[#17120f]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-24">
            <div>
              <div className="mb-10 max-w-[360px] overflow-hidden border border-[#cdbda6] bg-[#0c0a08] shadow-[0_24px_60px_rgba(23,18,15,0.22)]">
                <div className="relative aspect-[2/3]">
                  <img
                    src="/images/tree-uplighting.jpg"
                    alt="Veluce Outdoor Lighting Blueprint cover"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/90" />
                  <div className="absolute inset-x-0 top-0 flex justify-between px-5 pt-5 text-[7px] uppercase tracking-[0.28em] text-stone-200">
                    <span>Veluce · Luxury Living Journal</span>
                    <span>First Edition · 2026</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-[9px] uppercase tracking-[0.32em] text-[#d8bd94]">Veluce</p>
                    <p className="mt-4 font-serif text-[2.15rem] leading-[0.98]">Outdoor Lighting<br />Blueprint</p>
                    <p className="mt-4 font-serif text-sm italic text-stone-300">The 4-Axis Nightscape System</p>
                    <div className="mt-5 h-px w-14 bg-[#d8bd94]" />
                    <p className="mt-5 text-[8px] uppercase tracking-[0.2em] text-stone-200">Plan the effect. Place the light. Buy with confidence.</p>
                  </div>
                </div>
              </div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">What you get</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">A planning system, not another inspiration ebook.</h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-700">
                The Blueprint reverses the usual shopping sequence: audit the night, map the four jobs your lighting must perform, name the effect, test the idea, then buy.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-stone-700">
                You keep the visual polish of a design publication, but every section points toward a decision you can actually make.
              </p>
              <div className="mt-8">
                <PurchaseButton />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {included.map((item) => (
                <div key={item} className="flex gap-3 border border-[#d6c9b5] bg-[#ede3d4] p-4 text-sm leading-relaxed text-stone-700">
                  <Check className="mt-0.5 shrink-0 text-[#9b7448]" size={17} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="system" className="bg-[#0c0a08]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#c9a87a]">The 4-Axis Nightscape</p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl text-white sm:text-5xl">Read the property as four lighting jobs.</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {axes.map((axis) => (
                <article key={axis.key} className="border border-white/10 bg-[#17130f] p-6">
                  <p className="font-serif text-4xl text-[#c9a87a]">{axis.key}</p>
                  <h3 className="mt-3 font-serif text-2xl text-white">{axis.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-400">{axis.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f5efe4] text-[#17120f]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">A look inside</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Three ideas the system helps you solve.</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                ['/images/pergola-dining-lighting.jpg', 'Pergola as an outdoor room', 'Layer ambient, task and concealed light without flattening the ceiling plane.'],
                ['/images/tree-uplighting.jpg', 'Mature-tree uplighting', 'Create vertical depth while keeping neighbouring planting quieter and darker.'],
                ['/images/pathway-lighting-rhythm.jpg', 'Pathway without the runway', 'Light decisions, turns and level changes rather than repeating fixtures mechanically.'],
              ].map(([src, title, copy]) => (
                <figure key={title} className="overflow-hidden border border-[#d6c9b5] bg-[#ede3d4]">
                  <img src={src} alt={title} className="h-64 w-full object-cover" loading="lazy" />
                  <figcaption className="p-5">
                    <h3 className="font-serif text-2xl">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-700">{copy}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#17130f]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <div className="grid gap-6 md:grid-cols-4">
              {[
                [FileText, '48-page Blueprint', 'The complete method, recipes, worksheets and worked examples.'],
                [Calculator, 'Project calculator', 'Editable budget, fixture plan and weighted shopping scorecard.'],
                [WandSparkles, 'AI prompt pack', 'Twenty-five prompts for realistic visualization from your own photographs.'],
                [Sparkles, 'Offline Studio Tools', 'Night audit, scorecard, budget planner and prompt builder in one browser file.'],
              ].map(([Icon, title, copy]: any) => (
                <div key={title} className="border border-white/10 p-6">
                  <Icon size={22} className="text-[#c9a87a]" />
                  <h3 className="mt-4 font-serif text-2xl text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-400">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[#f5efe4] text-[#17120f]">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">Questions</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Before you buy.</h2>
            <div className="mt-10 divide-y divide-[#d6c9b5] border-y border-[#d6c9b5]">
              {faqs.map(([q, a]) => (
                <details key={q} className="group py-5">
                  <summary className="cursor-pointer list-none font-serif text-xl">
                    <span className="flex items-center justify-between gap-4">
                      {q}
                      <span className="text-[#9b7448] group-open:rotate-45 transition-transform">+</span>
                    </span>
                  </summary>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone-700">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0c0a08]">
          <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#c9a87a]">Design before you buy</p>
            <h2 className="mt-4 font-serif text-4xl text-white sm:text-5xl">Protect the darkness. Spend the light.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stone-400">
              Build the nightscape on paper first, compare the fixtures second, and spend with a clearer idea of what each light is actually supposed to do.
            </p>
            <div className="mt-8"><PurchaseButton /></div>
          </div>
        </section>
      </main>

      <div className="border-t border-white/10 bg-[#0c0a08] px-5 py-6 text-center text-xs leading-relaxed text-stone-500">
        Educational design-planning material. Not electrical, engineering or installation advice.
      </div>
      <Footer />
    </div>
  );
}
