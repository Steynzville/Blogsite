import { ArrowRight, Check, Layers3, Eye, SunMedium, Moon, LampDesk, SlidersHorizontal, Sparkles, Brain, ClipboardCheck, GalleryHorizontalEnd } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';
import { useMetaTags } from '@/lib/meta';

const PRICE = 'R349';
const checkoutUrl = (import.meta.env.VITE_LUXURY_LIGHTING_FORMULA_CHECKOUT_URL || '').trim();
const checkoutReady = /^https:\/\//i.test(checkoutUrl);

const signals = [
  { key: '01', icon: Eye, title: 'Hierarchy', body: 'Decide what the eye should notice first, second and barely at all. Equal brightness is usually the enemy of depth.' },
  { key: '02', icon: Layers3, title: 'Layers', body: 'Balance ambient, task, accent and decorative light so one fixture type never has to do every job.' },
  { key: '03', icon: LampDesk, title: 'Direction', body: 'Use wash, graze, bounce, downlight, uplight and concealed glow deliberately according to the surface and viewpoint.' },
  { key: '04', icon: SunMedium, title: 'Warmth', body: 'Treat colour temperature and colour quality as part of the material palette, not an afterthought.' },
  { key: '05', icon: Moon, title: 'Shadow', body: 'Luxury requires darkness. Protect contrast and negative space so focal light has something to work against.' },
  { key: '06', icon: Sparkles, title: 'Concealment', body: 'Control glare and source visibility so you notice the room before you notice the bulbs.' },
  { key: '07', icon: SlidersHorizontal, title: 'Scenes', body: 'Give the room more than one emotional setting with dimming and grouped controls for Arrival, Task, Dinner, Relax and Night.' },
];

const included = [
  '77-page premium Luxury Lighting Formula',
  'The Seven Signals diagnostic method',
  '59-page AI Luxury Lighting Lab with 53 photo-first prompts',
  'Master architecture-preservation lock for AI lighting studies',
  '13-sheet editable Luxury Lighting Audit Workbook',
  '22-page Luxury Lighting Recipe Cards with 20 room/exterior recipes',
  '20-page Lighting Diagnostic Gallery covering 18 common mistakes',
  '12-page Night Audit Field Cards',
  'Offline Luxury Lighting Atelier with local saving, readiness tracking, scene builder and the complete prompt library',
  'Copy-and-paste AI lighting prompt library + quick-start guide',
];

const problems = [
  ['My home is bright, but it still looks flat at night.', 'The Seven Signals diagnose hierarchy, layers, direction, warmth, shadow, concealment and scenes instead of simply asking for more lumens.'],
  ['I keep buying attractive fittings but the room still does not feel expensive.', 'The system reverses the order: define the effect, target, viewpoint and layer first; choose the fixture last.'],
  ['I have too many downlights and no idea what to turn off.', 'The Night Audit and retrofit ladder help you test dimming, aiming, regrouping and subtraction before rewiring.'],
  ['AI renders look beautiful but redesign my actual room.', 'The 53-prompt Lab uses a preservation lock and one-variable workflow so lighting is the experiment—not the architecture.'],
];

function PurchaseButton({ compact = false }: { compact?: boolean }) {
  if (!checkoutReady) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-sm bg-stone-300 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-stone-600 ${compact ? '' : 'sm:px-7 sm:py-4'}`}
        aria-disabled="true"
        title="Checkout is being configured"
      >
        Checkout opening shortly
      </span>
    );
  }
  return (
    <a
      href={checkoutUrl}
      className={`inline-flex items-center justify-center gap-2 rounded-sm bg-[#f5efe4] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#17120f] transition hover:bg-white ${compact ? '' : 'sm:px-7 sm:py-4'}`}
      rel="noopener"
    >
      Get the Lighting Formula — {PRICE}
      <ArrowRight size={16} />
    </a>
  );
}

export default function LuxuryLightingFormula() {
  useMetaTags({
    title: 'Luxury Lighting Formula | VELUCE',
    description: 'Make your home feel more expensive after dark with the Veluce Seven Signals: hierarchy, layers, direction, warmth, shadow, concealment and scenes — plus a 53-prompt AI lab, audit workbook, recipe cards and offline Lighting Atelier.',
    url: 'https://velucedesign.com/luxury-lighting-formula/',
    type: 'website',
  });

  return (
    <div className="min-h-screen bg-[#0c0a08] text-[#faf6ee]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c0a08]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" asChild><a className="font-serif text-xl font-bold tracking-[0.12em] text-white">VELUCE</a></Link>
          <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.14em] text-stone-400 sm:flex">
            <a href="#signals" className="hover:text-white">Seven Signals</a>
            <a href="#inside" className="hover:text-white">Inside</a>
            <a href="#faq" className="hover:text-white">Questions</a>
          </nav>
          <PurchaseButton compact />
        </div>
      </header>

      <main>
        <section className="relative min-h-[84svh] overflow-hidden">
          <img src="/images/luxury-lighting-formula-hero.svg" alt="Warm layered architectural lighting in a dark refined interior" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a08]/92 via-[#0c0a08]/58 to-[#0c0a08]/18" />
          <div className="relative mx-auto flex min-h-[84svh] max-w-7xl flex-col justify-end px-5 pb-12 pt-24 sm:px-8 sm:pb-16 lg:px-10">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#d1a86c]">Veluce Studio · Premium Lighting System</p>
            <h1 className="mt-5 max-w-5xl font-serif text-5xl font-light leading-[1.01] text-white sm:text-6xl lg:text-7xl">
              Make your home feel more expensive after dark — without filling it with more lights.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-200 sm:text-lg">
              A substantial visual decision system for homeowners who want depth, warmth and restraint. Diagnose what feels flat, rebuild the hierarchy, test scenes, use AI on your real room and buy only the lighting that earns its place.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PurchaseButton />
              <a href="#signals" className="text-xs uppercase tracking-[0.16em] text-white underline decoration-[#d1a86c] underline-offset-8">See the Seven Signals</a>
            </div>
            <p className="mt-4 text-xs text-stone-400">One-time purchase · Digital delivery · Personal-use license</p>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#17130f]">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#d1a86c]">The Veluce Rule</p>
            <p className="mt-3 max-w-4xl font-serif text-3xl leading-snug text-white sm:text-4xl">Luxury light is not more light. It is more intention.</p>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {[
                ['Luxury requires darkness.', 'Preserve contrast and negative space instead of filling every corner with light.'],
                ['Look at the room, not the bulbs.', 'Let illuminated surfaces and materials do more visual work than visible hardware.'],
                ['Build more than one emotional setting.', 'If every evening ends in the same all-on scene, the lighting is unfinished.'],
              ].map(([title, body]) => (
                <div key={title} className="border border-white/10 bg-[#0c0a08] p-5">
                  <h3 className="font-serif text-xl text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-400">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="signals" className="bg-[#f5efe4] text-[#17120f]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">The Seven Signals</p>
            <h2 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">Seven decisions that matter more than the price of the fitting.</h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-stone-700">
              The formula separates lighting quality from fixture shopping. Score the room, find the weakest signals, change one thing at a time and re-test from the same viewpoint.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {signals.map(({ key, icon: Icon, title, body }) => (
                <article key={title} className="border border-[#d6c9b5] bg-[#ede3d4] p-5">
                  <div className="flex items-center justify-between gap-4"><Icon size={20} className="text-[#9b7448]" /><span className="font-serif text-2xl text-[#9b7448]">{key}</span></div>
                  <h3 className="mt-4 font-serif text-2xl">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-700">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0c0a08]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#d1a86c]">Why this exists</p>
            <h2 className="mt-3 max-w-4xl font-serif text-4xl text-white sm:text-5xl">A beautiful fitting cannot rescue a bad lighting hierarchy.</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {problems.map(([problem, solution]) => (
                <article key={problem} className="border border-white/10 bg-[#17130f] p-6 sm:p-7">
                  <h3 className="font-serif text-2xl text-white">{problem}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-400">{solution}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="inside" className="bg-[#f5efe4] text-[#17120f]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:px-10 lg:py-24">
            <div>
              <div className="max-w-[360px] overflow-hidden border border-[#cdbda6] bg-[#0c0a08] shadow-[0_24px_60px_rgba(23,18,15,0.22)]">
                <img src="/images/luxury-lighting-formula-cover.svg" alt="Cover of the Veluce Luxury Lighting Formula" className="h-auto w-full" loading="lazy" />
              </div>
              <p className="mt-8 text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">What you get</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">A lighting design system, not a list of trendy lamps.</h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-700">
                Audit the existing room, diagnose the weakest signals, study the recipe and diagnostic packs, test a controlled AI version, then return to real products, real measurements and real controls.
              </p>
              <div className="mt-8"><PurchaseButton /></div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {included.map((item) => (
                <div key={item} className="flex gap-3 border border-[#d6c9b5] bg-[#ede3d4] p-4 text-sm leading-relaxed text-stone-700">
                  <Check className="mt-0.5 shrink-0 text-[#9b7448]" size={17} /><span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#17130f]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <div className="grid gap-6 md:grid-cols-3">
              <figure className="overflow-hidden border border-white/10 bg-[#0c0a08]">
                <img src="/images/luxury-lighting-seven-signals.svg" alt="Veluce Seven Signals lighting diagnostic preview" className="h-80 w-full object-cover" loading="lazy" />
                <figcaption className="p-5"><h3 className="font-serif text-2xl text-white">Diagnose before shopping</h3><p className="mt-2 text-sm leading-relaxed text-stone-400">Night Audit, weighted Seven Signals score, glare/shadow checks, focal hierarchy and a fixture register.</p></figcaption>
              </figure>
              <figure className="overflow-hidden border border-white/10 bg-[#0c0a08]">
                <img src="/images/luxury-lighting-ai-flow.svg" alt="Veluce photo-first AI lighting workflow" className="h-80 w-full object-cover" loading="lazy" />
                <figcaption className="p-5"><h3 className="font-serif text-2xl text-white">53 controlled AI prompts</h3><p className="mt-2 text-sm leading-relaxed text-stone-400">Photo → preserve → change one variable → compare → measure. The room stays real; lighting becomes the experiment.</p></figcaption>
              </figure>
              <div className="border border-white/10 bg-[#0c0a08] p-6">
                <GalleryHorizontalEnd size={24} className="text-[#d1a86c]" />
                <h3 className="mt-5 font-serif text-3xl text-white">190 PDF pages of practical material</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-400">Room recipes, exterior recipes, common mistakes, material/light guidance, scene design, retrofit sequencing, AI workflows and after-dark field cards.</p>
                <div className="mt-8 border-t border-white/10 pt-6"><ClipboardCheck size={20} className="text-[#d1a86c]" /><p className="mt-3 text-sm text-stone-300">13-sheet workbook with formula-driven scoring, shopping/budget and decision logs.</p></div>
                <div className="mt-5 border-t border-white/10 pt-6"><Brain size={20} className="text-[#d1a86c]" /><p className="mt-3 text-sm text-stone-300">Offline Atelier with local saving, scene planning, prompts, handoff and JSON backup/import.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f5efe4] text-[#17120f]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">The visual difference</p>
            <h2 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">Learn to see the mistakes before you buy the solution.</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {['Ceiling constellation','Runway path','Visible LED dots','Bright eye-level bulb','One-switch room','Decorative fixture overload'].map((item, i) => (
                <div key={item} className="border border-[#d6c9b5] bg-[#ede3d4] p-5"><p className="font-serif text-2xl text-[#9b7448]">{String(i+1).padStart(2,'0')}</p><p className="mt-2 font-serif text-xl">{item}</p></div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-stone-700">The Diagnostic Gallery covers 18 recurring problems and starts with the smallest intervention: dim, aim, regroup or remove before adding another fitting.</p>
          </div>
        </section>

        <section className="bg-[#0c0a08]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#d1a86c]">AI Luxury Lighting Lab</p>
                <h2 className="mt-3 font-serif text-4xl text-white sm:text-5xl">Use AI to test light on your room — not replace your room.</h2>
                <p className="mt-6 text-base leading-relaxed text-stone-400">The preservation lock fixes the architecture and camera position. The prompts then test hierarchy, layers, grazing vs washing, warmth, shadow, glare, concealment, scenes, exterior restraint and real-world feasibility.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['Audit prompts','Find flatness, glare, missing vertical light, broken hierarchy and colour mismatch.'],
                  ['One-variable visualisation','Compare a single lighting change while doors, windows, finishes and geometry stay fixed.'],
                  ['Scene generation','Build Arrival, Task, Dinner, Relax and Night versions without redesigning the room.'],
                  ['Reality critique','Ask what would be difficult, unsafe or unrealistic to reproduce before you fall in love with a render.'],
                ].map(([title, body]) => <article key={title} className="border border-white/10 bg-[#17130f] p-6"><h3 className="font-serif text-2xl text-white">{title}</h3><p className="mt-3 text-sm leading-relaxed text-stone-400">{body}</p></article>)}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[#f5efe4] text-[#17120f]">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">Questions people actually have</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Better light before more light.</h2>
            <div className="mt-10 divide-y divide-[#d6c9b5] border-y border-[#d6c9b5]">
              {[
                ['How is this different from the Outdoor Lighting Blueprint?', 'Product #1 is primarily a planning and specification system for outdoor placement, fixtures and buying decisions. The Luxury Lighting Formula is an aesthetic/diagnostic system spanning interior and exterior light: hierarchy, layers, direction, warmth, shadow, concealment and scenes. They complement each other rather than duplicate each other.'],
                ['Do I need to replace all my downlights?', 'No. The retrofit ladder deliberately starts with aiming, dimming, regrouping and subtraction. A room can change dramatically before rewiring is justified.'],
                ['Is 2700K always the answer?', 'No. The product uses warm residential light as a common evening direction, not a universal rule. Material, task, daylight, adjacent sources and personal preference still matter. Consistency and intent are more important than blindly choosing one number.'],
                ['Can AI tell me exactly which fixture to buy?', 'It can help visualize an effect and critique a room, but the pack explicitly returns you to real dimensions, beam, output, colour quality, dimming compatibility and environmental requirements before purchase.'],
                ['Does this replace a lighting designer or electrician?', 'No. It improves visual diagnosis, communication and purchase preparation. Electrical work, code, specialist controls, wet areas, emergency/safety lighting and project-specific engineering still belong with appropriately qualified professionals.'],
                ['What files do I receive?', 'The pack contains five PDFs totalling 190 pages, a 13-sheet Excel workbook, the offline Lighting Atelier, the 53-prompt text library and the quick-start guide.'],
              ].map(([q,a]) => <details key={q} className="group py-5"><summary className="cursor-pointer list-none font-serif text-xl"><span className="flex items-center justify-between gap-4">{q}<span className="text-[#9b7448] transition-transform group-open:rotate-45">+</span></span></summary><p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone-700">{a}</p></details>)}
            </div>
          </div>
        </section>

        <section className="bg-[#0c0a08]">
          <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 lg:py-24">
            <Sparkles className="mx-auto text-[#d1a86c]" size={28} />
            <p className="mt-5 text-[11px] uppercase tracking-[0.28em] text-[#d1a86c]">Depth · warmth · restraint</p>
            <h2 className="mt-4 font-serif text-4xl text-white sm:text-5xl">Change what the room reveals after dark.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stone-400">Audit one room. Fix the weakest signal. Build a scene you actually use. Then decide whether you still need another light.</p>
            <div className="mt-8"><PurchaseButton /></div>
          </div>
        </section>
      </main>

      <div className="border-t border-white/10 bg-[#0c0a08] px-5 py-6 text-center text-xs leading-relaxed text-stone-500">
        Educational lighting-design and planning material. Not electrical, engineering, code, emergency-lighting, fire, wet-area, accessibility or conservation advice.
      </div>
      <Footer />
    </div>
  );
}
