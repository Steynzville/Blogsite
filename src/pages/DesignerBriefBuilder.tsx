import { ZarPrice } from '@/components/ZarPrice';
import { ArrowRight, Brain, Check, ClipboardList, FileText, Images, Ruler, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';
import { useMetaTags } from '@/lib/meta';

const PRICE = 'R349';
const salesLive = import.meta.env.VITE_DIGITAL_PRODUCTS_LIVE === 'true';
const checkoutUrl = (import.meta.env.VITE_DESIGNER_BRIEF_CHECKOUT_URL || '').trim();
const checkoutReady = salesLive && /^https:\/\//i.test(checkoutUrl);

const clearMethod = [
  { key: 'C', title: 'Context', body: 'Capture the real room: measurements, photographs, fixed elements, orientation, access and adjacent spaces.' },
  { key: 'L', title: 'Lifestyle', body: 'Define who uses the space, what happens there, when it happens and what currently gets in the way.' },
  { key: 'E', title: 'Essentials', body: 'Rank problems, must-haves, nice-to-haves, budget priorities and the things that must stay.' },
  { key: 'A', title: 'Aesthetic', body: 'Decode references into repeatable signals: colour, material, contrast, texture, shape, light and mood.' },
  { key: 'R', title: 'Reality', body: 'Lock the constraints: budget, timing, maintenance, measurements, approvals and anything AI must not invent.' },
];

const problems = [
  ['My Pinterest board makes sense to me, but not to anyone else.', 'The Reference Decoder converts saved images into specific design signals instead of vague style labels.'],
  ['I know what I dislike only after someone shows it to me.', 'The brief captures Must Keep, Must Add and Never Do before concepts are produced, so avoidable revision loops happen earlier and cheaper.'],
  ['AI keeps redesigning my actual house.', 'The AI Brief Architect Lab begins with a preservation lock and controlled-change workflow built around a real photo of the space.'],
  ['Every conversation starts from zero again.', 'Room briefs, a decision log and a final handoff checklist preserve the reasoning behind the project, not just the latest mood board.'],
];

const included = [
  '22-page premium Designer Brief Builder',
  'The CLEAR Brief-to-Design Method',
  '27-page premium AI Brief Architect Lab with all 42 controlled prompts',
  'Master architecture-preservation lock for photo-first AI work',
  'Editable 10-sheet Excel project workbook',
  '14-page photographic Style Decoder Cards with 12 visual directions',
  '13-page premium Designer Handoff Pack with 11 printable project templates',
  'Enhanced offline Brief Atelier: CLEAR, Space, Decoder, Priorities, Budget, Rooms, Decisions, AI Lab, all 42 prompts and Handoff',
  'Copy-and-paste AI prompt library',
  'Quick-start guide and recommended workflow',
];

const styleDirections = [
  'Warm Minimal', 'Organic Modern', 'Quiet Luxury', 'Contemporary Classic',
  'Japandi', 'Mediterranean Modern', 'Coastal Refined', 'Soft Industrial',
  'Sculptural Modern', 'Transitional', 'Layered Eclectic', 'Modern Farmhouse Refined',
];

function PurchaseButton({ compact = false }: { compact?: boolean }) {
  if (!checkoutReady) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-sm bg-stone-300 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-stone-600 ${compact ? '' : 'sm:px-7 sm:py-4'}`}
        aria-disabled="true"
        title="Checkout is being configured"
      >
        Checkout unavailable
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

export default function DesignerBriefBuilder() {
  useMetaTags({
    title: 'Designer Brief Builder | VELUCE',
    description: 'Turn scattered ideas into a designer-, contractor- and AI-ready brief with the Veluce CLEAR Method, photographic Style Decoder, 42-prompt AI lab, editable workbook and offline Brief Atelier.',
    url: 'https://velucedesign.com/designer-brief-builder/',
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
            src="/images/designer-brief-hero.svg"
            alt="Editorial design desk with measured plan, material references and structured project brief"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a08]/94 via-[#0c0a08]/70 to-[#0c0a08]/28" />
          <div className="relative mx-auto flex min-h-[82svh] max-w-7xl flex-col justify-end px-5 pb-12 pt-24 sm:px-8 sm:pb-16 lg:px-10">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#c9a87a]">Veluce Studio · Digital Briefing System</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl font-light leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Turn scattered ideas into a brief people can use.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-200 sm:text-lg">
              Build a clear, measured project brief from your real space, saved references, priorities, budget and constraints. Specific enough to prevent generic design. Open enough to allow good design.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PurchaseButton />
              <a href="#method" className="text-xs uppercase tracking-[0.16em] text-white underline decoration-[#c9a87a] underline-offset-8">
                See the CLEAR method
              </a>
            </div>
            <p className="mt-4 text-xs text-stone-400">One-time purchase · Digital delivery · Personal-use license</p>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#17130f]">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#c9a87a]">The Veluce Rule</p>
            <p className="mt-3 max-w-4xl font-serif text-3xl leading-snug text-white sm:text-4xl">
              Define the decisions before you ask anyone to design.
            </p>
          </div>
        </section>

        <section id="method" className="bg-[#f5efe4] text-[#17120f]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">The CLEAR Brief-to-Design Method</p>
            <h2 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
              Five layers that turn “I know it when I see it” into useful instructions.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-stone-700">
              The method starts with reality, not style. It captures how the space exists and how it must work, then translates inspiration into design signals and ends by making constraints explicit.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {clearMethod.map(({ key, title, body }) => (
                <article key={key} className="border border-[#d6c9b5] bg-[#ede3d4] p-5">
                  <span className="font-serif text-4xl text-[#9b7448]">{key}</span>
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
              More reference images do not automatically create a better brief.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-stone-400">
              A useful brief explains what the space must accomplish, what cannot change, where the money matters and why the references appeal to you. That translation layer is what makes inspiration actionable.
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
                <img src="/images/designer-brief-cover.svg" alt="Cover of the Veluce Designer Brief Builder" className="h-auto w-full" loading="lazy" />
              </div>
              <p className="mt-8 text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">What you get</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">A briefing system, not a four-page questionnaire.</h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-700">
                Use the main guide to make the decisions, the workbook to organise them, the AI Lab to test and challenge them, and the Handoff Pack or Brief Studio to communicate the final brief cleanly.
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
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#c9a87a]">AI Brief Architect Lab</p>
                <h2 className="mt-3 font-serif text-4xl text-white sm:text-5xl">Use AI to clarify decisions — not invent your house.</h2>
                <p className="mt-6 text-base leading-relaxed text-stone-400">
                  The 42-prompt Lab starts with a real photograph and a preservation lock. It then helps you decode inspiration, expose contradictions, test one variable at a time, compare alternatives, challenge the brief and synthesize a cleaner handoff.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['Preservation lock', 'Keep the real architecture, openings, fixed elements, floor footprint and camera viewpoint unless you explicitly decide otherwise.'],
                  ['42 controlled prompts', 'Space audit, inspiration decoding, lifestyle, priorities, budget, visualisation, comparison, critique and final brief synthesis.'],
                  ['One-variable testing', 'Change layout, palette, material, lighting or styling deliberately instead of asking AI to redesign everything at once.'],
                  ['Decision logging', 'Record the prompt, result, what improved, what got worse and the next reality check in the editable workbook.'],
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
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">Decode the look</p>
            <h2 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">Stop forcing your taste into one style label.</h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-stone-700">
              The Style Decoder Cards use 12 visual directions as lenses, not boxes. Compare their colour, material, line, texture, contrast and lighting cues, then borrow only the signals that repeat across your own references.
            </p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {styleDirections.map((study, index) => (
                <div key={study} className="border border-[#d6c9b5] bg-[#ede3d4] p-5">
                  <p className="font-serif text-2xl text-[#9b7448]">{String(index + 1).padStart(2, '0')}</p>
                  <p className="mt-2 font-serif text-xl">{study}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-stone-600">The customer PDF now gives every direction a photographic study, design signals, an avoid list, palette cues and a photo-first AI prompt seed.</p>
          </div>
        </section>

        <section className="bg-[#17130f]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <div className="grid gap-6 md:grid-cols-3">
              <figure className="overflow-hidden border border-white/10 bg-[#0c0a08]">
                <img src="/images/designer-brief-workbook.svg" alt="Veluce editable brief workbook preview" className="h-80 w-full object-cover object-top" loading="lazy" />
                <figcaption className="p-5">
                  <h3 className="font-serif text-2xl text-white">10-sheet editable workbook</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-400">Space facts, references, priorities, budget, room briefs, decisions, AI iterations, handoff checklist and a readiness dashboard.</p>
                </figcaption>
              </figure>
              <figure className="overflow-hidden border border-white/10 bg-[#0c0a08]">
                <img src="/images/designer-brief-ai-flow.svg" alt="Veluce controlled AI design iteration workflow" className="h-80 w-full object-cover object-center" loading="lazy" />
                <figcaption className="p-5">
                  <h3 className="font-serif text-2xl text-white">Controlled AI workflow</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-400">Photo → preserve → change one variable → compare → measure → decide → log the reason.</p>
                </figcaption>
              </figure>
              <div className="border border-white/10 bg-[#0c0a08] p-6">
                <ClipboardList size={24} className="text-[#c9a87a]" />
                <h3 className="mt-5 font-serif text-3xl text-white">Offline Brief Studio</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-400">
                  The upgraded local-first Atelier combines CLEAR, measured-space capture, style decoding, priorities, budget, room briefs, decisions, AI iterations, the complete 42-prompt library and handoff in one browser workspace. It also adds readiness tracking plus JSON backup/import.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 text-sm text-stone-300">
                  <div><Brain size={19} className="mb-2 text-[#c9a87a]" />42 AI prompts</div>
                  <div><Images size={19} className="mb-2 text-[#c9a87a]" />Style decoder</div>
                  <div><Ruler size={19} className="mb-2 text-[#c9a87a]" />Measured facts</div>
                  <div><ShieldCheck size={19} className="mb-2 text-[#c9a87a]" />Reality checks</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[#f5efe4] text-[#17120f]">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">Questions people actually have</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">A better brief before the expensive decisions begin.</h2>
            <div className="mt-10 divide-y divide-[#d6c9b5] border-y border-[#d6c9b5]">
              {[
                ['Is this only for people hiring an interior designer?', 'No. The final brief can be used with an interior or landscape designer, contractor, supplier, family decision-maker or AI tool. The point is to make the project requirements explicit before solutions multiply.'],
                ['I already have a Pinterest board. Why do I need this?', 'A board shows references; it rarely explains which parts you want to copy, what you dislike, how your real room differs, what must stay, what the budget is or which problem each image is helping solve. The Reference Decoder extracts those decisions.'],
                ['What if I do not know my design style?', 'You do not need a style label. The Style Decoder looks for recurring signals such as material warmth, contrast, line, texture, colour and lighting. Those are usually more useful to a designer than one broad label.'],
                ['Can AI build the brief for me?', 'AI can help interrogate, organize and summarize your inputs, but the system keeps the homeowner responsible for measurements, priorities, budget and reality checks. The 42 prompts are designed to make AI ask better questions rather than simply generate more inspiration.'],
                ['How do I stop AI changing doors, windows or the shape of my house?', 'Use the supplied master preservation lock with a photograph of the real space. It tells the model to retain fixed architecture and camera position, then you specify one design variable to test.'],
                ['Can I use this before meeting a designer?', 'Yes. That is one of its strongest uses: arrive with a clear outcome, measured facts, decoded references, constraints, a budget envelope and open questions, while still leaving the designer room to design.'],
                ['Does this replace a professional designer or contractor?', 'No. It improves project communication and decision-making. Structural, architectural, electrical, gas, fire, waterproofing, accessibility, pool-safety and regulatory decisions still need appropriately qualified people and local requirements.'],
                ['What files do I receive?', 'The pack includes the 22-page premium Brief Builder, 27-page premium AI Brief Architect Lab with all 42 prompts, 10-sheet Excel workbook, 14-page photographic Style Decoder Cards, 13-page Handoff Pack with 11 printable project templates, offline Brief Studio, copy-and-paste prompt library and quick-start guide.'],
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
            <Sparkles className="mx-auto text-[#c9a87a]" size={28} />
            <p className="mt-5 text-[11px] uppercase tracking-[0.28em] text-[#c9a87a]">Clarity before concepts</p>
            <h2 className="mt-4 font-serif text-4xl text-white sm:text-5xl">Make the first design conversation more useful.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stone-400">
              Turn the room, the references, the budget and the non-negotiables into one shared source of truth before the project starts generating expensive options.
            </p>
            <div className="mt-8"><PurchaseButton /></div>
          </div>
        </section>
      </main>

      <div className="border-t border-white/10 bg-[#0c0a08] px-5 py-6 text-center text-xs leading-relaxed text-stone-500">
        Educational design-planning and communication material. Not architectural, structural, electrical, gas, fire, waterproofing, accessibility, pool-safety or regulatory advice.
      </div>
      <Footer />
    </div>
  );
}
