import { ZarPrice } from '@/components/ZarPrice';
import { ArrowRight, Check, LayoutGrid, Move, Ruler, Sofa, Sparkles, FileText, Calculator, PanelsTopLeft } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';
import { useMetaTags } from '@/lib/meta';

const PRICE = 'R349';
const salesLive = import.meta.env.VITE_DIGITAL_PRODUCTS_LIVE === 'true';
const checkoutUrl = (import.meta.env.VITE_OUTDOOR_ROOM_PLANNER_CHECKOUT_URL || '').trim();
const checkoutReady = salesLive && /^https:\/\//i.test(checkoutUrl);

const layers = [
  { icon: Sofa, key: '01', title: 'Purpose', body: 'Decide what the room must make possible before you shop.' },
  { icon: LayoutGrid, key: '02', title: 'Zones', body: 'Give lounging, dining, cooking and flex activities a clear home.' },
  { icon: Move, key: '03', title: 'Flow', body: 'Protect doors, routes, chair movement and transitions.' },
  { icon: Ruler, key: '04', title: 'Scale', body: 'Fit furniture to the measured footprint - not the showroom.' },
  { icon: Sparkles, key: '05', title: 'Atmosphere', body: 'Layer shade, planting, light and texture only after the room works.' },
];

const problems = [
  ['I have inspiration, but no plan.', 'The planner turns saved ideas into a room brief, zone map, circulation overlay and measured furniture plan for your own space.'],
  ['My patio feels like furniture placed outside.', 'The 5-Layer Method creates hierarchy: one primary anchor, supporting zones and a clear relationship between the house, garden and view.'],
  ['I am worried the pieces will not fit together.', 'The footprint method and companion workbook test real dimensions, furniture load and chair movement before checkout.'],
  ['I keep buying attractive things that do not solve the room.', 'The shopping sequence and product scorecard keep fit, function, durability, comfort and value in charge of the decision.'],
];

const included = [
  '48-page premium Luxury Outdoor Room Planner',
  'The 5-Layer Outdoor Room Method',
  'Eight adaptable layout recipes',
  'Three worked room examples',
  'Printable site, zone, circulation and furniture-plan sheets',
  'Editable Excel project planner with budget, product scorecard and AI Iteration Lab',
  '10-page quick-reference Layout Recipe Cards',
  '45-page AI Outdoor Room Visualization Lab with 37 photo-first prompts',
  'Offline Outdoor Room Studio with built-in AI prompt builder',
  '8-page printable Outdoor Room Planning Sheets for sketching, writing and final checks',
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
      Buy now — <ZarPrice value={PRICE} />
      <ArrowRight size={16} />
    </a>
  );
}

export default function LuxuryOutdoorRoomPlanner() {
  useMetaTags({
    title: 'Luxury Outdoor Room Planner | VELUCE',
    description: 'Turn an empty or randomly furnished patio, deck or pergola into an intentional outdoor room with the Veluce 5-Layer Outdoor Room Method, layout recipes, worksheets, calculator and planning tools.',
    url: 'https://velucedesign.com/luxury-outdoor-room-planner/',
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
            <a href="#method" className="hover:text-white">Method</a>
            <a href="#inside" className="hover:text-white">Inside</a>
            <a href="#faq" className="hover:text-white">Questions</a>
          </nav>
          <PurchaseButton compact />
        </div>
      </header>

      <main>
        <section className="relative min-h-[82svh] overflow-hidden">
          <img
            src="/images/outdoor-room-planner-hero.svg"
            alt="Editorial top-down illustration of a planned outdoor lounge and dining room"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a08]/90 via-[#0c0a08]/58 to-[#0c0a08]/20" />
          <div className="relative mx-auto flex min-h-[82svh] max-w-7xl flex-col justify-end px-5 pb-12 pt-24 sm:px-8 sm:pb-16 lg:px-10">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#c9a87a]">Veluce Studio · Digital Planner</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl font-light leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Turn the patio into a room — before you buy the furniture.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-200 sm:text-lg">
              From a collection of furniture to an outdoor room. A practical planning system for homeowners who want a space that feels intentional, proportioned and easy to live in — not like beautiful pieces placed outside one purchase at a time.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PurchaseButton />
              <a href="#method" className="text-xs uppercase tracking-[0.16em] text-white underline decoration-[#c9a87a] underline-offset-8">
                See the method
              </a>
            </div>
            <p className="mt-4 text-xs text-stone-400">One-time purchase · Digital delivery · Personal-use license</p>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#17130f]">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#c9a87a]">The Veluce Rule</p>
            <p className="mt-3 max-w-4xl font-serif text-3xl leading-snug text-white sm:text-4xl">
              Plan the room first. Buy the pieces second.
            </p>
          </div>
        </section>

        <section id="method" className="bg-[#f5efe4] text-[#17120f]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">The 5-Layer Outdoor Room Method</p>
            <h2 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
              Solve the decisions in the order a good room needs them.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-stone-700">
              The method closes the gap between inspiration and execution: what the room is for, where each activity belongs, how people move, whether the furniture fits, and only then how the space should feel.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {layers.map(({ icon: Icon, key, title, body }) => (
                <article key={key} className="border border-[#d6c9b5] bg-[#ede3d4] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <Icon size={20} className="text-[#9b7448]" />
                    <span className="font-serif text-2xl text-[#9b7448]">{key}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-2xl">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-700">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0c0a08]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#c9a87a]">Why this exists</p>
            <h2 className="mt-3 max-w-4xl font-serif text-4xl text-white sm:text-5xl">
              Inspiration is easy. Translation is the hard part.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-stone-400">
              Saved images give you a look. Product pages give you objects. Neither automatically tells you how your own space should be zoned, how people will move through it, or whether the pieces you love will actually work together.
            </p>
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
                <img
                  src="/images/outdoor-room-planner-cover.svg"
                  alt="Cover of the Veluce Luxury Outdoor Room Planner"
                  className="h-auto w-full"
                  loading="lazy"
                />
              </div>
              <p className="mt-8 text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">What you get</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">A working room-planning system, not a décor mood board.</h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-700">
                Every part of the pack moves toward a decision: define the brief, map the zones, protect circulation, test the footprint, build the budget and compare products against the room you actually planned.
              </p>
              <div className="mt-8"><PurchaseButton /></div>
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

        <section className="bg-[#0c0a08]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#c9a87a]">AI Visualization Lab</p>
                <h2 className="mt-3 font-serif text-4xl text-white sm:text-5xl">Use AI as a design laboratory — not as an oracle.</h2>
                <p className="mt-6 text-base leading-relaxed text-stone-400">
                  Product #2 puts AI iteration at the centre of the workflow: photograph the actual space, lock the architecture, change one variable at a time, compare the result, then check it against real measurements and the project plan. Photo → Plan → Prompt → Compare → Measure → Refine.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['Photo-first workflow', 'Guidance for taking a useful source image so AI works from your actual patio, deck, pergola or courtyard instead of inventing a generic room.'],
                  ['37 controlled prompts', 'Audit, layouts, furniture scale, materials, planting, privacy, shade, atmosphere, budget refinement, guest and family stress-tests, product comparisons, critique and final reality checks.'],
                  ['Iteration discipline', 'Preserve the roofline, doors, windows, floor footprint and camera position. Change one design variable at a time so each image teaches you something.'],
                  ['Decision logging', 'The Excel workbook includes an AI Iteration Lab so you can record what changed, what worked, what failed and what to test next.'],
                ].map(([title, body]) => (
                  <article key={title} className="border border-white/10 bg-[#17130f] p-6">
                    <h3 className="font-serif text-2xl text-white">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone-400">{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f5efe4] text-[#17120f]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">Visual Direction Gallery</p>
            <h2 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">Do not copy the image. Copy the planning logic.</h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-stone-700">
              Eight premium room studies show what good planning looks like across different outdoor-room types. Each study names the useful design lesson and gives you a photo-first prompt to test the same logic on your own space.
            </p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {['Blue-hour lounge', 'Compact patio', 'Calm courtyard', 'Pergola dining', 'Fire lounge', 'Material palette', 'Poolside room', 'Narrow veranda'].map((study, index) => (
                <div key={study} className="border border-[#d6c9b5] bg-[#ede3d4] p-5">
                  <p className="font-serif text-2xl text-[#9b7448]">{String(index + 1).padStart(2, '0')}</p>
                  <p className="mt-2 font-serif text-xl">{study}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#17130f]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <div className="grid gap-6 md:grid-cols-3">
              <figure className="overflow-hidden border border-white/10 bg-[#0c0a08]">
                <img src="/images/outdoor-room-layout-recipe.svg" alt="Veluce compact patio layout recipe" className="h-80 w-full object-cover object-top" loading="lazy" />
                <figcaption className="p-5">
                  <h3 className="font-serif text-2xl text-white">Eight layout recipes</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-400">Compact patios, narrow verandas, courtyards, pergolas, fire lounges, family flex spaces, poolside rooms and large terraces.</p>
                </figcaption>
              </figure>
              <figure className="overflow-hidden border border-white/10 bg-[#0c0a08]">
                <img src="/images/outdoor-room-planner-workbook.svg" alt="Veluce project budget and shopping workbook" className="h-80 w-full object-cover object-left" loading="lazy" />
                <figcaption className="p-5">
                  <h3 className="font-serif text-2xl text-white">Editable project workbook</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-400">Track dimensions, furniture footprint, room load, budget, purchase status and a weighted product score before you commit.</p>
                </figcaption>
              </figure>
              <div className="border border-white/10 bg-[#0c0a08] p-6">
                <PanelsTopLeft size={24} className="text-[#c9a87a]" />
                <h3 className="mt-5 font-serif text-3xl text-white">Printable planning sheets</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-400">
                  Eight printable planning pages give you room to sketch, write, map zones, test circulation and scale, and run a final before-you-buy check.
                </p>
                <div className="mt-8 border-t border-white/10 pt-6">
                  <FileText size={20} className="text-[#c9a87a]" />
                  <p className="mt-3 text-sm text-stone-300">48-page premium planner + 10-page recipe cards + 10-page Visual Direction Gallery using eight room studies.</p>
                </div>
                <div className="mt-5 border-t border-white/10 pt-6">
                  <Calculator size={20} className="text-[#c9a87a]" />
                  <p className="mt-3 text-sm text-stone-300">Editable workbook + enhanced offline Studio with room brief, zone split, furniture load, budget, product scorecard, 37-prompt AI library and iteration log.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[#f5efe4] text-[#17120f]">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">Questions people actually have</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">From inspiration to a room that works.</h2>
            <div className="mt-10 divide-y divide-[#d6c9b5] border-y border-[#d6c9b5]">
              {[
                ['I know the look I want, but I do not know where to start.', 'Start with the Purpose Brief, not a shopping list. The planner then takes you through zones, flow, scale and atmosphere in sequence so each purchase has a reason to exist.'],
                ['How do I know whether I am trying to fit too many activities into the space?', 'The zone map makes every activity claim visible. You choose one primary anchor, add only the secondary uses the footprint can support, and preserve a deliberate flexible or unassigned area instead of filling every square metre.'],
                ['How do I know whether a sofa, dining table or fire feature will actually fit?', 'Enter real product dimensions into the workbook and draw the same footprints on the furniture plan. The planner also asks you to tape major footprints onto the real floor and test doors, circulation and chair movement before ordering.'],
                ['How do I stop the patio looking like a showroom furniture set?', 'The method builds hierarchy before styling. One anchor leads the room; supporting pieces, planting, shade, materials and lighting reinforce it instead of competing for equal attention.'],
                ['How do I keep a beautiful layout from becoming awkward to walk through?', 'The Flow layer is planned before the final furniture arrangement. You mark the natural route between the house, garden, pool, grill or steps and keep everyday movement out of the middle of the main conversation group.'],
                ['How can I plan a fire-pit area safely?', 'The planner does not invent a universal fire clearance. It tells you to choose the actual appliance first, use its manufacturer clearances and local requirements, and only then build the seating plan around that documented safety envelope.'],
                ['How do I keep the project within budget without buying the cheapest option?', 'The workbook allocates the budget by category, tracks planned and committed spend, and pairs with a weighted scorecard covering fit, function, durability, comfort, aesthetic fit, serviceability and value.'],
                ['Can I use AI to see what the room could look like before I spend money?', 'Yes. The 45-page AI Outdoor Room Visualization Lab is built around your own real photograph. It includes photo guidance, a preservation lock, an iteration workflow and 37 prompts for layouts, scale, materials, planting, shade, atmosphere, budget refinement and critique. The goal is controlled comparison, not fantasy rendering.'],
                ['How do I stop AI from redesigning my house when I only want to test furniture or styling?', 'The prompt system begins with a preservation lock that tells the model to keep the roofline, doors, windows, structural walls, floor footprint, fixed paving, garden or pool boundaries and camera position unchanged. You then change one design variable at a time.'],
                ['What files do I receive?', 'The customer pack contains the 48-page premium planner, the 45-page AI Visualization Lab with 37 prompts, the editable Excel project workbook with AI Iteration Lab, the 10-page Layout Recipe Cards, a 10-page Visual Direction Gallery, the enhanced offline Outdoor Room Studio with all 37 prompts, local saving and planning tools, the 8-page printable Outdoor Room Planning Sheets and quick-start material.'],
              ].map(([q, a]) => (
                <details key={q} className="group py-5">
                  <summary className="cursor-pointer list-none font-serif text-xl">
                    <span className="flex items-center justify-between gap-4">
                      {q}
                      <span className="text-[#9b7448] transition-transform group-open:rotate-45">+</span>
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
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#c9a87a]">Room first · products second</p>
            <h2 className="mt-4 font-serif text-4xl text-white sm:text-5xl">The room should work before it is decorated.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stone-400">
              Build the room around purpose, proportion and movement — then shop with a clear idea of what each piece is supposed to contribute.
            </p>
            <div className="mt-8"><PurchaseButton /></div>
          </div>
        </section>
      </main>

      <div className="border-t border-white/10 bg-[#0c0a08] px-5 py-6 text-center text-xs leading-relaxed text-stone-500">
        Educational design-planning material. Not architectural, construction, fire, gas, electrical, pool-safety or accessibility advice.
      </div>
      <Footer />
    </div>
  );
}
