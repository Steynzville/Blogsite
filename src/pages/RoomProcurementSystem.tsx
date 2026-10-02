import { ArrowRight, Check, Calculator, PackageCheck, Sparkles, Truck, Brain, Ruler, ReceiptText } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';
import { useMetaTags } from '@/lib/meta';

const PRICE = 'R349';
const checkoutUrl = (import.meta.env.VITE_ROOM_PROCUREMENT_CHECKOUT_URL || '').trim();
const checkoutReady = /^https:\/\//i.test(checkoutUrl);

const stages = [
  { key: 'S', title: 'Specify', body: 'Turn the room brief into measurable product requirements before you browse.' },
  { key: 'O', title: 'Options', body: 'Build a controlled shortlist and compare like with like instead of collecting endless tabs.' },
  { key: 'U', title: 'Understand', body: 'Calculate total cost, lead time, returns and supplier obligations before choosing.' },
  { key: 'R', title: 'Reality-check', body: 'Verify dimensions, access, finishes, compatibility, installation needs and missing evidence.' },
  { key: 'C', title: 'Commit', body: 'Approve the exact item, variant, quantity and supplier record before money leaves the account.' },
  { key: 'E', title: 'Execute', body: 'Track ordering, delivery, inspection, claims, installation and final close-out.' },
];

const problems = [
  ['I keep finding beautiful products that do not quite work together.', 'The SOURCE Method starts with the room brief and compares products against the same fixed criteria, finish relationships and budget.'],
  ['I have twenty tabs open and no idea which option is actually better.', 'The comparison system scores Fit, Function, Finish, Evidence, Lead Time, Returns, Cost and Confidence—and rejects deal-breakers first.'],
  ['The listed price keeps turning into a much bigger real cost.', 'The landed-cost workbook captures quantity, freight, tax/duty where applicable, assembly, installation and required accessories.'],
  ['I am worried the sofa, rug or cabinet will not fit in real life.', 'The Dimensions & Access workflow separates product dimensions, packed dimensions, site limits and delivery-route evidence.'],
  ['Online colours and finishes are hard to trust.', 'The Finish & Material Map explicitly identifies when samples, swatches or real-world verification are needed.'],
  ['Once I order, everything disappears into email and courier messages.', 'Purchase, delivery, receiving, damage, returns and punch-list records keep the decision trail intact until the item is closed.'],
];

const included = [
  '94-page premium Room Procurement System',
  'The six-stage SOURCE Method',
  '70-page AI Procurement Lab with 64 controlled prompts',
  '17-sheet editable Procurement Workbook',
  '25-page Buying Reality Cards covering 24 product categories',
  '21-page Delivery, Receiving & Install Pack',
  '15-page Returns & Claims Field Pack',
  'Offline Procurement Atelier with local saving, readiness tracking and JSON backup/import',
  'Master no-invention AI instruction for product analysis',
  'Copy-and-paste AI prompt library + quick-start guide',
];

function PurchaseButton({ compact = false }: { compact?: boolean }) {
  if (!checkoutReady) {
    return <span className={`inline-flex items-center justify-center rounded-sm bg-stone-300 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-stone-600 ${compact ? '' : 'sm:px-7 sm:py-4'}`} aria-disabled="true" title="Checkout is being configured">Coming soon</span>;
  }
  return <a href={checkoutUrl} className={`inline-flex items-center justify-center gap-2 rounded-sm bg-[#f5efe4] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#17120f] transition hover:bg-white ${compact ? '' : 'sm:px-7 sm:py-4'}`} rel="noopener">Get the Procurement System — {PRICE}<ArrowRight size={16}/></a>;
}

export default function RoomProcurementSystem() {
  useMetaTags({
    title: 'Room Procurement System | VELUCE',
    description: 'A private-library buying system for homeowners: turn a room plan into verified products, orders and accepted deliveries with the Veluce SOURCE Method, 64-prompt AI Lab, 17-sheet workbook and offline Procurement Atelier.',
    url: 'https://velucedesign.com/room-procurement-system/',
    type: 'website',
  });

  return (
    <div className="min-h-screen bg-[#0c0a08] text-[#faf6ee]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c0a08]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" asChild><a className="font-serif text-xl font-bold tracking-[0.12em] text-white">VELUCE</a></Link>
          <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.14em] text-stone-400 sm:flex">
            <a href="#source" className="hover:text-white">SOURCE</a><a href="#inside" className="hover:text-white">Inside</a><a href="#faq" className="hover:text-white">Questions</a>
          </nav>
          <PurchaseButton compact/>
        </div>
      </header>

      <main>
        <section className="relative min-h-[84svh] overflow-hidden">
          <img src="/images/room-procurement-hero.svg" alt="Refined living room representing the end result of evidence-led room procurement" className="absolute inset-0 h-full w-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a08]/94 via-[#0c0a08]/70 to-[#0c0a08]/25"/>
          <div className="relative mx-auto flex min-h-[84svh] max-w-7xl flex-col justify-end px-5 pb-12 pt-24 sm:px-8 sm:pb-16 lg:px-10">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#d1a86c]">Veluce Studio · Procurement Flagship</p>
            <h1 className="mt-5 max-w-5xl font-serif text-5xl font-light leading-[1.01] text-white sm:text-6xl lg:text-7xl">Turn a beautiful room plan into a room you can actually buy.</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-200 sm:text-lg">A private-library buying system for people who want to procure like designers: specify before you shop, compare on evidence, verify fit, finish, total cost and delivery reality, then keep the trail until the room accepts the item.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4"><PurchaseButton/><a href="#source" className="text-xs uppercase tracking-[0.16em] text-white underline decoration-[#d1a86c] underline-offset-8">See the SOURCE Method</a></div>
            <p className="mt-4 text-xs text-stone-400">One-time purchase · Digital delivery · Personal-use license</p>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#17130f]">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#d1a86c]">The Veluce Rule</p>
            <p className="mt-3 max-w-4xl font-serif text-3xl leading-snug text-white sm:text-4xl">Evidence beats memory. Specify before search. Verify before buy.</p>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {[
                ['A blank is not neutral.', 'Missing dimensions, terms or product facts should reduce confidence until evidence resolves them.'],
                ['Price is a field.', 'Cost is the whole consequence: freight, timing, returns, installation, compatibility and risk.'],
                ['Ordered is not finished.', 'The procurement trail closes only when the item is received, accepted and resolved in the room.'],
              ].map(([title, body]) => (
                <div key={title} className="border border-white/10 bg-[#0c0a08] p-5">
                  <h3 className="font-serif text-xl text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-400">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="source" className="bg-[#f5efe4] text-[#17120f]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">The SOURCE Method</p>
            <h2 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">Six stages from room brief to accepted delivery.</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stages.map(({key,title,body}) => <article key={key} className="border border-[#d6c9b5] bg-[#ede3d4] p-5"><span className="font-serif text-4xl text-[#9b7448]">{key}</span><h3 className="mt-4 font-serif text-2xl">{title}</h3><p className="mt-2 text-sm leading-relaxed text-stone-700">{body}</p></article>)}
            </div>
          </div>
        </section>

        <section className="bg-[#0c0a08]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#d1a86c]">Why procurement goes wrong</p>
            <h2 className="mt-3 max-w-4xl font-serif text-4xl text-white sm:text-5xl">A product can be beautiful and still fail the room.</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {problems.map(([problem,solution]) => <article key={problem} className="border border-white/10 bg-[#17130f] p-6 sm:p-7"><h3 className="font-serif text-2xl text-white">{problem}</h3><p className="mt-3 text-sm leading-relaxed text-stone-400">{solution}</p></article>)}
            </div>
          </div>
        </section>

        <section id="inside" className="bg-[#f5efe4] text-[#17120f]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:px-10 lg:py-24">
            <div>
              <div className="max-w-[360px] overflow-hidden border border-[#cdbda6] bg-[#0c0a08] shadow-[0_24px_60px_rgba(23,18,15,0.22)]"><img src="/images/room-procurement-cover.svg" alt="Cover of the Veluce Room Procurement System" className="h-auto w-full" loading="lazy"/></div>
              <p className="mt-8 text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">What you get</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">A buying system, not another wishlist template.</h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-700">The pack follows the entire purchase life cycle: brief, shortlist, verification, total cost, approval, order, delivery, receiving, claims, installation and close-out.</p>
              <div className="mt-8"><PurchaseButton/></div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">{included.map(item => <div key={item} className="flex gap-3 border border-[#d6c9b5] bg-[#ede3d4] p-4 text-sm leading-relaxed text-stone-700"><Check className="mt-0.5 shrink-0 text-[#9b7448]" size={17}/><span>{item}</span></div>)}</div>
          </div>
        </section>

        <section className="bg-[#17130f]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <div className="grid gap-6 md:grid-cols-3">
              <figure className="overflow-hidden border border-white/10 bg-[#0c0a08]"><img src="/images/room-procurement-source.svg" alt="Veluce SOURCE procurement method preview" className="h-80 w-full object-cover" loading="lazy"/><figcaption className="p-5"><h3 className="font-serif text-2xl text-white">Specify before search</h3><p className="mt-2 text-sm leading-relaxed text-stone-400">Turn the room outcome into fixed constraints, flexible preferences, verification steps and a product brief before opening shopping tabs.</p></figcaption></figure>
              <figure className="overflow-hidden border border-white/10 bg-[#0c0a08]"><img src="/images/room-procurement-workbook.svg" alt="Veluce procurement workbook preview" className="h-80 w-full object-cover" loading="lazy"/><figcaption className="p-5"><h3 className="font-serif text-2xl text-white">17-sheet control workbook</h3><p className="mt-2 text-sm leading-relaxed text-stone-400">Weighted option comparison, landed cost, suppliers, lead-time risk, orders, delivery, receiving, claims, punch list and dashboard.</p></figcaption></figure>
              <div className="border border-white/10 bg-[#0c0a08] p-6"><PackageCheck size={24} className="text-[#d1a86c]"/><h3 className="mt-5 font-serif text-3xl text-white">225 PDF pages of practical material</h3><p className="mt-3 text-sm leading-relaxed text-stone-400">Procurement method, product-category reality cards, delivery/receiving discipline, claims records and a substantial AI analysis lab.</p><div className="mt-8 border-t border-white/10 pt-6"><Brain size={20} className="text-[#d1a86c]"/><p className="mt-3 text-sm text-stone-300">Offline Procurement Atelier with the complete prompt library and local JSON backup/import.</p></div></div>
            </div>
          </div>
        </section>

        <section className="bg-[#f5efe4] text-[#17120f]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">Compare the consequence, not only the object</p>
            <h2 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">The cheapest item can still be the expensive decision.</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: 'Fit', icon: Ruler, body: 'Room + access dimensions' },
                { title: 'Total cost', icon: Calculator, body: 'Freight, extras and install' },
                { title: 'Timing', icon: Truck, body: 'Lead time + dependencies' },
                { title: 'Evidence', icon: ReceiptText, body: 'Exact variant + supplier terms' },
              ].map(({title,icon:Icon,body}) => (
                <article key={title} className="border border-[#d6c9b5] bg-[#ede3d4] p-5"><Icon size={20} className="text-[#9b7448]"/><h3 className="mt-4 font-serif text-2xl">{title}</h3><p className="mt-2 text-sm text-stone-700">{body}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0c0a08]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div><p className="text-[11px] uppercase tracking-[0.28em] text-[#d1a86c]">AI Procurement Lab</p><h2 className="mt-3 font-serif text-4xl text-white sm:text-5xl">Use AI to expose unknowns—not invent product facts.</h2><p className="mt-6 text-base leading-relaxed text-stone-400">The 64 controlled prompts specify, decode listings, compare options, red-team preferred products, structure landed cost, draft supplier questions, track orders and organise receiving/claim evidence.</p></div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[['No-invention instruction','Missing dimensions, stock, returns or compatibility stay UNKNOWN until evidence resolves them.'],['Listing decoder','Separate facts, marketing claims, contradictions, missing fields and supplier questions.'],['Cart red-team','Find the strongest reason the preferred item could still be wrong before checkout.'],['Claims assistant','Organise evidence and draft factual supplier communication without inventing events or policies.']].map(([title,body]) => <article key={title} className="border border-white/10 bg-[#17130f] p-6"><h3 className="font-serif text-2xl text-white">{title}</h3><p className="mt-3 text-sm leading-relaxed text-stone-400">{body}</p></article>)}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[#f5efe4] text-[#17120f]">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">Questions people actually have</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Buy the room with fewer expensive surprises.</h2>
            <div className="mt-10 divide-y divide-[#d6c9b5] border-y border-[#d6c9b5]">
              {[
                ['How is this different from the Designer Brief Builder?', 'The Designer Brief Builder defines what the project should become. The Procurement System takes an already defined direction and manages the practical buying decisions needed to make it real.'],
                ['Is this only for interior designers?', 'No. It is deliberately written for homeowners who are sourcing their own room. Professional procurement concepts are translated into a practical one-room system without trade-business accounting.'],
                ['Can AI find products for me?', 'The prompts can improve search language, decode listings and compare options. Product availability, prices and seller terms still need to be verified from current sources before purchase.'],
                ['Can AI tell me whether a sofa will fit?', 'It can compare dimensions that you supply, but the product deliberately treats your real measurements and supplier dimensions as the evidence. AI is not allowed to invent missing measurements or certify access.'],
                ['Why track receiving and claims?', 'Because the procurement risk does not end at checkout. Wrong variants, transit damage, missing parts and unresolved adjustments can turn a good purchase into an expensive problem if evidence and deadlines are lost.'],
                ['Does this replace professional installation advice?', 'No. Electrical, structural, plumbing, gas, waterproofing, code, specialist fixing and other regulated or high-risk work still belong with appropriately qualified professionals and applicable local requirements.'],
                ['What files do I receive?', 'Five PDFs totalling 225 pages, a 17-sheet Excel workbook, the offline Procurement Atelier, the 64-prompt copy/paste library and quick-start guide.'],
              ].map(([q,a]) => <details key={q} className="group py-5"><summary className="cursor-pointer list-none font-serif text-xl"><span className="flex items-center justify-between gap-4">{q}<span className="text-[#9b7448] transition-transform group-open:rotate-45">+</span></span></summary><p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone-700">{a}</p></details>)}
            </div>
          </div>
        </section>

        <section className="bg-[#0c0a08]">
          <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 lg:py-24"><Sparkles className="mx-auto text-[#d1a86c]" size={28}/><p className="mt-5 text-[11px] uppercase tracking-[0.28em] text-[#d1a86c]">Specify · verify · buy · close</p><h2 className="mt-4 font-serif text-4xl text-white sm:text-5xl">Stop hoping the product works when it arrives.</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stone-400">Build the evidence before checkout and keep the trail until the room is finished.</p><div className="mt-8"><PurchaseButton/></div></div>
        </section>
      </main>
      <div className="border-t border-white/10 bg-[#0c0a08] px-5 py-6 text-center text-xs leading-relaxed text-stone-500">Consumer procurement planning and record-keeping material. Not structural, electrical, plumbing, gas, waterproofing, code, fire, accessibility, specialist-installation or legal advice.</div>
      <Footer/>
    </div>
  );
}
