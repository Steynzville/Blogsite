import { ArrowRight, Check, Sparkles, Layers3, Lightbulb, ShoppingBag, Brain } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';
import { useMetaTags } from '@/lib/meta';

const PRICE = 'R999';
const STANDALONE_VALUE = 'R1,895';
const checkoutUrl = (import.meta.env.VITE_COMPLETE_HOME_CHECKOUT_URL || '').trim();
const checkoutReady = /^https:\/\//i.test(checkoutUrl);

const packs = [
  { title:'Outdoor Lighting Blueprint', method:'4-Axis Nightscape', price:'R299', body:'Plan outdoor lighting effects, zones, glare, power approach and purchasing before installation.' },
  { title:'Luxury Outdoor Room Planner', method:'5-Layer Outdoor Room', price:'R349', body:'Plan purpose, zones, circulation, furniture scale and atmosphere before you furnish.' },
  { title:'Designer Brief Builder', method:'CLEAR Brief-to-Design', price:'R349', body:'Turn photos, measurements, lifestyle needs and saved inspiration into a usable brief.' },
  { title:'Luxury Lighting Formula', method:'Seven Signals', price:'R449', body:'Diagnose and improve hierarchy, layers, direction, warmth, shadow, concealment and scenes.' },
  { title:'Room Procurement System', method:'SOURCE', price:'R449', body:'Specify, compare, verify, buy, receive and close products with an evidence trail.' },
];

const masterIncluded = [
  '9-page rebuilt premium Complete Home Design System Master Guide',
  '36-page rebuilt premium Whole-Home AI Design Lab with 50 controlled prompts',
  '17-sheet Complete Home Project Workbook',
  '13-page Decision Gate Cards with 20 stop-or-go gates',
  '6-page rebuilt premium Flagship Bundle Map',
  'Offline Complete Home Studio with local save + JSON backup/import',
  'Copy/paste Whole-Home AI Prompt Library',
  'All five complete Veluce product packs above',
];

function PurchaseButton({ compact=false }: { compact?: boolean }) {
  if (!checkoutReady) return <span className={`inline-flex items-center justify-center rounded-sm bg-stone-300 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-stone-600 ${compact?'':'sm:px-7 sm:py-4'}`} aria-disabled="true" title="Checkout is being configured">Checkout opening shortly</span>;
  return <a href={checkoutUrl} rel="noopener" className={`inline-flex items-center justify-center gap-2 rounded-sm bg-[#f5efe4] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#17120f] transition hover:bg-white ${compact?'':'sm:px-7 sm:py-4'}`}>Get the Complete System — {PRICE}<ArrowRight size={16}/></a>;
}

export default function CompleteHomeDesignSystem() {
  useMetaTags({
    title:'Complete Home Design System | VELUCE',
    description:'The complete Veluce homeowner design system: five specialist packs plus a master guide, whole-home AI lab, project workbook, decision gates and offline Complete Home Studio.',
    url:'https://velucedesign.com/complete-home-design-system/',
    type:'website',
  });

  return <div className="min-h-screen bg-[#0c0a08] text-[#faf6ee]">
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c0a08]/95 backdrop-blur-md"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"><Link href="/" asChild><a className="font-serif text-xl font-bold tracking-[0.12em] text-white">VELUCE</a></Link><nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.14em] text-stone-400 sm:flex"><a href="#path" className="hover:text-white">The Path</a><a href="#packs" className="hover:text-white">What You Get</a><a href="#faq" className="hover:text-white">Questions</a></nav><PurchaseButton compact/></div></header>
    <main>
      <section className="relative min-h-[88svh] overflow-hidden">
        <img src="/images/complete-home-hero.svg" alt="Veluce Complete Home Design System represented as five connected specialist systems and one master control layer" className="absolute inset-0 h-full w-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a08]/95 via-[#0c0a08]/76 to-[#0c0a08]/34"/>
        <div className="relative mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-end px-5 pb-12 pt-24 sm:px-8 sm:pb-16 lg:px-10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#d1a86c]">Veluce Studio · Flagship System</p>
          <h1 className="mt-5 max-w-5xl font-serif text-5xl font-light leading-[1.01] text-white sm:text-6xl lg:text-7xl">One operating system from first idea to finished room.</h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-stone-200 sm:text-lg">All five Veluce systems, connected by one whole-home control layer: define the brief, plan the space, shape the light, verify the products, track the spend and keep the evidence until the room is genuinely finished.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4"><PurchaseButton/><a href="#packs" className="text-xs uppercase tracking-[0.16em] text-white underline decoration-[#d1a86c] underline-offset-8">See everything included</a></div>
          <p className="mt-4 text-xs text-stone-400">One-time purchase · {PRICE} · Separate standalone value {STANDALONE_VALUE}</p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#17130f]"><div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10"><p className="text-[11px] uppercase tracking-[0.28em] text-[#d1a86c]">The Veluce rule</p><p className="mt-3 max-w-5xl font-serif text-3xl leading-snug text-white sm:text-4xl">Reality first. Direction second. Space before styling. Light before fixtures. Evidence before checkout.</p></div></section>

      <section id="path" className="bg-[#f5efe4] text-[#17120f]"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><p className="text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">The Veluce Path</p><h2 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">Use the shortest route that still protects the decision.</h2><div className="mt-10 grid gap-3 md:grid-cols-3 lg:grid-cols-6">{[
        ['01','Reality','Photos, measurements, fixed elements and constraints.'],
        ['02','Direction','A usable brief with priorities and must-not-do rules.'],
        ['03','Space','Purpose, zones, circulation, scale and hierarchy.'],
        ['04','Light','Nightscape, Seven Signals and scenes.'],
        ['05','Buy','Specify, compare, verify, order and receive.'],
        ['06','Live','Close-out, warranties, final spend and lessons.'],
      ].map(([n,t,b])=><article key={n} className="border border-[#d6c9b5] bg-[#ede3d4] p-5"><span className="font-serif text-3xl text-[#9b7448]">{n}</span><h3 className="mt-4 font-serif text-xl">{t}</h3><p className="mt-2 text-sm leading-relaxed text-stone-700">{b}</p></article>)}</div></div></section>

      <section id="packs" className="bg-[#0c0a08]"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><p className="text-[11px] uppercase tracking-[0.28em] text-[#d1a86c]">Five complete specialist systems</p><h2 className="mt-3 max-w-4xl font-serif text-4xl text-white sm:text-5xl">Open the specialist pack only when that decision is active.</h2><div className="mt-10 grid gap-4 md:grid-cols-2">{packs.map((p,i)=><article key={p.title} className="border border-white/10 bg-[#17130f] p-6 sm:p-7"><div className="flex items-start justify-between gap-5"><div><p className="text-[10px] uppercase tracking-[0.2em] text-[#d1a86c]">Product {i+1} · {p.method}</p><h3 className="mt-3 font-serif text-2xl text-white">{p.title}</h3></div><span className="shrink-0 text-sm text-stone-400">{p.price}</span></div><p className="mt-4 text-sm leading-relaxed text-stone-400">{p.body}</p></article>)}</div></div></section>

      <section className="bg-[#f5efe4] text-[#17120f]"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10 lg:py-24"><div><div className="max-w-[370px] overflow-hidden border border-[#cdbda6] bg-[#0c0a08] shadow-[0_24px_60px_rgba(23,18,15,0.22)]"><img src="/images/complete-home-cover.svg" alt="Cover preview of the Veluce Complete Home Design System" className="h-auto w-full"/></div><p className="mt-8 text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">The flagship control layer</p><h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">The five packs are the tools. This is the operating system.</h2><p className="mt-6 max-w-xl text-base leading-relaxed text-stone-700">The master layer keeps every room, decision, budget, risk, AI iteration and purchase connected so the project does not disappear into separate PDFs, retailer tabs and message threads.</p><div className="mt-8"><PurchaseButton/></div></div><div className="grid gap-3 sm:grid-cols-2">{masterIncluded.map(item=><div key={item} className="flex gap-3 border border-[#d6c9b5] bg-[#ede3d4] p-4 text-sm leading-relaxed text-stone-700"><Check size={17} className="mt-0.5 shrink-0 text-[#9b7448]"/><span>{item}</span></div>)}</div></div></section>

      <section className="bg-[#17130f]"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><div className="grid gap-4 md:grid-cols-4">{[
        {icon:Layers3,title:'One room register',body:'Every room has a stage, budget, next decision and blocker.'},
        {icon:Lightbulb,title:'One lighting language',body:'Interior scenes and outdoor nightscape decisions stay connected.'},
        {icon:ShoppingBag,title:'One buying trail',body:'Specifications, approvals, orders, receiving and claims stay auditable.'},
        {icon:Brain,title:'One AI discipline',body:'Preserve reality, expose UNKNOWNs and record only decision-changing outputs.'},
      ].map(({icon:Icon,title,body})=><article key={title} className="border border-white/10 bg-[#0c0a08] p-6"><Icon size={22} className="text-[#d1a86c]"/><h3 className="mt-5 font-serif text-2xl text-white">{title}</h3><p className="mt-3 text-sm leading-relaxed text-stone-400">{body}</p></article>)}</div></div></section>

      <section className="bg-[#f5efe4] text-[#17120f]"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><div className="grid gap-10 lg:grid-cols-[1fr_1fr]"><div><p className="text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">Why R999</p><h2 className="mt-3 font-serif text-4xl sm:text-5xl">The bundle should reward commitment without making the standalone products meaningless.</h2><p className="mt-6 text-base leading-relaxed text-stone-700">The five standalone products total {STANDALONE_VALUE}. The flagship includes all five plus the master layer at {PRICE}, so customers who need the complete workflow get a meaningful bundle advantage while each specialist pack still has a credible independent price.</p></div><div className="border border-[#d6c9b5] bg-[#ede3d4] p-7"><p className="text-sm uppercase tracking-[0.16em] text-[#9b7448]">Complete system</p><p className="mt-3 font-serif text-6xl">{PRICE}</p><p className="mt-2 text-sm text-stone-600">One-time purchase · personal-use digital system</p><div className="mt-6 border-t border-[#d6c9b5] pt-6"><p className="text-sm text-stone-700">Standalone value <strong>{STANDALONE_VALUE}</strong></p><p className="mt-2 text-sm text-stone-700">Includes all five specialist packs + flagship master layer.</p></div><div className="mt-7"><PurchaseButton/></div></div></div></div></section>

      <section id="faq" className="bg-[#0c0a08]"><div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-24"><p className="text-[11px] uppercase tracking-[0.28em] text-[#d1a86c]">Questions people actually have</p><h2 className="mt-3 font-serif text-4xl text-white sm:text-5xl">One system, without pretending every project needs every tool.</h2><div className="mt-10 divide-y divide-white/10 border-y border-white/10">{[
        ['Do I get all five existing products?','Yes. Flagship delivery is designed to provide the five existing customer packs plus the new master pack. The master pack does not replace or expose the paid content of the specialist products.'],
        ['Do I have to use all five packs?','No. The master guide contains route maps for one-room refreshes, lighting-only work, outdoor rooms, procurement-only work and whole-home projects.'],
        ['Why not just sell one giant PDF?','Because a whole-home project is easier to use when specialist decisions stay in focused systems while one master layer controls status, budget, risks and handoffs.'],
        ['Does this replace an interior designer or architect?','No. It helps a homeowner think, document and communicate more clearly. Structural, architectural, electrical, gas, waterproofing, code and other specialist decisions still need appropriate professionals where required.'],
        ['How is AI used?','The Whole-Home AI Lab connects the five systems with 50 controlled prompts. It uses the same reality-preservation and no-invention rules: AI may analyse or compare, but it must not invent missing property or product facts.'],
        ['How are the files delivered?','The planned Paystack delivery can use one master archive containing the five existing pack ZIPs plus the flagship ZIP, or a protected download page listing all six. Paid files stay outside the public website repository.'],
      ].map(([q,a])=><details key={q} className="group py-5"><summary className="cursor-pointer list-none font-serif text-xl text-white"><span className="flex items-center justify-between gap-4">{q}<span className="text-[#d1a86c] transition-transform group-open:rotate-45">+</span></span></summary><p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone-400">{a}</p></details>)}</div></div></section>

      <section className="bg-[#17130f]"><div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 lg:py-24"><Sparkles size={28} className="mx-auto text-[#d1a86c]"/><p className="mt-5 text-[11px] uppercase tracking-[0.28em] text-[#d1a86c]">Reality · direction · space · light · buy · live</p><h2 className="mt-4 font-serif text-4xl text-white sm:text-5xl">Design the decisions before you buy the house full of objects.</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stone-400">One complete Veluce system for the homeowner who wants clarity, evidence and a finished result—not another folder of inspiration.</p><div className="mt-8"><PurchaseButton/></div></div></section>
    </main><Footer/>
  </div>;
}
