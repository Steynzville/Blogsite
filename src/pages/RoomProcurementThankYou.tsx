import { useEffect } from 'react';
import { ArrowRight, CheckCircle2, ClipboardCheck, Search, Calculator, ShieldCheck, PackageCheck } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';
import { useMetaTags } from '@/lib/meta';
import SecureProductDownload from '@/components/SecureProductDownload';

const steps = [
  { icon: ClipboardCheck, title: 'Start with one room brief', body: 'Define the outcome, fixed constraints, budget, required-by date, finish direction and delivery/access reality before shopping.' },
  { icon: Search, title: 'Build a controlled shortlist', body: 'Add only products that plausibly meet the fixed criteria. Capture exact variant, supplier, URL/SKU and missing evidence.' },
  { icon: Calculator, title: 'Compare the whole consequence', body: 'Use the workbook for fit, function, finish, evidence, lead time, returns, landed cost and confidence—not sticker price alone.' },
  { icon: ShieldCheck, title: 'Reality-check the preferred item', body: 'Verify real dimensions, access, sample/finish needs, compatibility, supplier terms and specialist checks before approval.' },
  { icon: PackageCheck, title: 'Track until accepted', body: 'Keep order, delivery, receiving, damage, claims and punch-list records together until the item is genuinely closed.' },
];

export default function RoomProcurementThankYou() {
  useMetaTags({ title:'Thank You | Room Procurement System | VELUCE', description:'Getting started with the Veluce Room Procurement System.', url:'https://velucedesign.com/thank-you/room-procurement-system/', type:'website' });
  useEffect(() => {
    const existing=document.querySelector('meta[name="robots"]') as HTMLMetaElement|null; const previous=existing?.content; const robots=existing??document.createElement('meta');
    if(!existing){robots.setAttribute('name','robots');document.head.appendChild(robots);} robots.setAttribute('content','noindex, nofollow, noarchive');
    return()=>{if(existing){if(previous)existing.setAttribute('content',previous);else existing.removeAttribute('content');}else robots.remove();};
  },[]);
  return <div className="min-h-screen bg-[#0c0a08] text-[#faf6ee]">
    <header className="border-b border-white/10 bg-[#0c0a08]"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10"><Link href="/" asChild><a className="font-serif text-xl font-bold tracking-[0.12em] text-white">VELUCE</a></Link><span className="text-[10px] uppercase tracking-[0.2em] text-stone-500">Veluce Studio</span></div></header>
    <main>
      <section className="relative overflow-hidden"><img src="/images/room-procurement-hero.svg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-35"/><div className="absolute inset-0 bg-gradient-to-b from-[#0c0a08]/60 via-[#0c0a08]/88 to-[#0c0a08]"/><div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-28 lg:py-32"><CheckCircle2 className="mx-auto text-[#d1a86c]" size={38}/><p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-[#d1a86c]">Purchase complete</p><h1 className="mx-auto mt-4 max-w-4xl font-serif text-5xl font-light leading-[1.04] text-white sm:text-6xl">Specify before you search. Verify before you buy.</h1><p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-stone-300 sm:text-lg">Verify your Paystack payment below and download the customer pack, then run one high-value room item through the complete SOURCE workflow before scaling the system.</p></div></section>

        <SecureProductDownload productSlug="room-procurement-system" productName="Room Procurement System" />
      <section className="bg-[#f5efe4] text-[#17120f]"><div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><p className="text-[11px] uppercase tracking-[0.28em] text-[#9b7448]">Start here</p><h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">One room. One item. One complete decision trail.</h2><div className="mt-10 grid gap-4 md:grid-cols-2">{steps.map(({icon:Icon,title,body},i)=><article key={title} className="border border-[#d6c9b5] bg-[#ede3d4] p-6 sm:p-7"><div className="flex items-center justify-between gap-4"><Icon className="text-[#9b7448]" size={22}/><span className="font-serif text-2xl text-[#9b7448]">0{i+1}</span></div><h3 className="mt-5 font-serif text-2xl">{title}</h3><p className="mt-3 text-sm leading-relaxed text-stone-700">{body}</p></article>)}</div></div></section>
      <section className="bg-[#17130f]"><div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 lg:py-24"><p className="text-[11px] uppercase tracking-[0.28em] text-[#d1a86c]">The Veluce Rule</p><p className="mx-auto mt-4 max-w-3xl font-serif text-3xl leading-snug text-white sm:text-4xl">Evidence beats memory.</p><p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-stone-400">If the product, price, policy, measurement or delivery promise matters to the decision, record the evidence while it is available.</p></div></section>
      <section className="bg-[#0c0a08]"><div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 lg:py-24"><h2 className="font-serif text-4xl text-white sm:text-5xl">Keep exploring Veluce.</h2><p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-stone-400">Use the Veluce journal and the other Studio systems when your procurement brief exposes a deeper lighting, outdoor-room or design-direction decision.</p><div className="mt-8"><Link href="/articles" asChild><a className="inline-flex items-center gap-2 rounded-sm bg-[#f5efe4] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#17120f] hover:bg-white">Browse the journal <ArrowRight size={15}/></a></Link></div></div></section>
    </main><Footer/>
  </div>;
}
