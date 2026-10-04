import React from 'react';
import Link from 'next/link';
import { HomeSearch } from '@/components/HomeSearch';
import { UliLine } from '@/components/UliLine';

const LISTINGS = [
  {
    slug: 'executive-4-bed-duplex-new-owerri',
    image: '/images/owerri-new-duplex.jpg',
    purpose: 'For rent',
    price: '₦4,500,000',
    per: 'a year',
    title: '4-bedroom duplex',
    area: 'New Owerri, Imo',
    specs: '4 bed · 4 bath · parking for 3',
    verified: 'Mandate & papers confirmed',
  },
  {
    slug: 'contemporary-5-bed-duplex-gra-onitsha',
    image: '/images/onitsha-gra-mansion.jpg',
    purpose: 'For sale',
    price: '₦95,000,000',
    per: '',
    title: '5-bedroom detached house',
    area: 'GRA, Onitsha',
    specs: '5 bed · 5 bath · C of O',
    verified: 'C of O & mandate confirmed',
  },
  {
    slug: 'executive-3-bed-flat-new-owerri',
    image: '/images/asaba-gateway-duplex.jpg',
    purpose: 'For rent',
    price: '₦2,800,000',
    per: 'a year',
    title: '3-bedroom flat',
    area: 'GRA, Asaba',
    specs: '3 bed · 3 bath · prepaid meter',
    verified: 'Title & owner terms confirmed',
  },
];

const CITIES = [
  { name: 'Enugu', areas: 'Independence Layout, GRA, Trans-Ekulu', count: 128, image: '/images/enugu-flagship-mansion.jpg', href: '/properties?state=Enugu' },
  { name: 'Onitsha', areas: 'GRA, Trans-Nkisi, 3-3', count: 94, image: '/images/onitsha-gra-luxury-duplex.jpg', href: '/properties?state=Anambra&area=Onitsha' },
  { name: 'Owerri', areas: 'New Owerri, Ikenegbu, Works Layout', count: 88, image: '/images/owerri-luxury-duplex.jpg', href: '/properties?state=Imo' },
  { name: 'Awka', areas: 'Ngozika Estate, Ifite, Iyi-Agu', count: 76, image: '/images/awka-ngozika-duplex.jpg', href: '/properties?state=Anambra&area=Awka' },
  { name: 'Aba', areas: 'Aba GRA, Umungasi', count: 52, image: '/images/aba-gra-residence.jpg', href: '/properties?state=Abia' },
  { name: 'Asaba', areas: 'GRA, Summit Road, Okpanam', count: 46, image: '/images/asaba-gateway-duplex.jpg', href: '/properties?state=Delta&area=Asaba' },
];

const STEPS = [
  {
    title: 'Agent submits property papers',
    body: 'Before any home goes live, the listing agent or landlord must upload proof of direct mandate from the owner, title documents, and valid business or national identification.',
  },
  {
    title: 'We vet the documents',
    body: 'Our compliance desk reviews the ownership records and verifies the agent has direct authorization to market the home, eliminating unauthorized middlemen and duplicate scams.',
  },
  {
    title: 'The owner’s price is locked',
    body: 'The landlord’s direct rate is signed and locked before publishing. The agent cannot add arbitrary quotes, extra cuts, or demand inspection fees from seekers.',
  },
];

const RECEIPT = [
  { label: 'Rent, 1 year', value: '₦1,800,000' },
  { label: 'Caution (you get it back)', value: '₦180,000' },
  { label: 'Agreement', value: '₦180,000' },
  { label: 'Agency', value: '₦180,000' },
  { label: 'Inspection / viewing fee', value: '₦0' },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* ───────────── Hero ───────────── */}
      <section className="container-x grid items-center gap-10 pb-24 pt-6 sm:gap-14 sm:pb-24 sm:pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-28 lg:pt-16">
        <div>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-medium text-ink-600 sm:text-[15px]">
            <span>Enugu</span>
            <span>·</span>
            <span>Onitsha</span>
            <span>·</span>
            <span>Awka</span>
            <span>·</span>
            <span>Owerri</span>
            <span>·</span>
            <span>Aba</span>
            <span>·</span>
            <span>Asaba</span>
          </p>

          <h1 className="relative isolate mt-4 font-serif text-[34px] leading-[1.08] tracking-[-0.02em] text-ink xs:text-[40px] sm:text-[60px] sm:leading-[1.02] lg:text-[76px]">
            Find a home in the East at the{' '}
            <span className="relative inline-block italic">
              owner’s price.
              <svg
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 -z-10 h-3 w-full text-amber-300 sm:h-3.5"
                aria-hidden="true"
              >
                <path d="M3 9 C 70 3, 160 2, 297 7" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-600 sm:mt-6 sm:text-[17px]">
            No agent adding ₦500k on top. No ₦10,000 to “see the place.” Agents and landlords must submit ownership papers,
            direct mandates, and signed prices before any listing is confirmed.
          </p>

          <div className="mt-7 sm:mt-9">
            <HomeSearch />
          </div>

          <dl className="mt-8 grid max-w-lg grid-cols-3 gap-2 border-t border-ink/10 pt-5 sm:mt-10 sm:gap-6 sm:pt-6">
            <div>
              <dt className="text-[11px] leading-tight text-ink-600 sm:text-[13px]">Verified listings</dt>
              <dd className="mt-1 font-serif text-2xl text-ink sm:text-3xl">484</dd>
            </div>
            <div>
              <dt className="text-[11px] leading-tight text-ink-600 sm:text-[13px]">Inspection fee</dt>
              <dd className="mt-1 font-serif text-2xl text-ink sm:text-3xl">₦0</dd>
            </div>
            <div>
              <dt className="text-[11px] leading-tight text-ink-600 sm:text-[13px]">Document review</dt>
              <dd className="mt-1 font-serif text-2xl text-ink sm:text-3xl">24–48h</dd>
            </div>
          </dl>
        </div>

        {/* Arch-framed photo with a setting sun behind it */}
        <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none pt-4 sm:pt-0">
          <div className="absolute -right-4 -top-2 h-36 w-36 rounded-full bg-amber-400 sm:-right-10 sm:-top-10 sm:h-56 sm:w-56" aria-hidden="true" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-b-[28px] rounded-t-[999px] bg-ink-800 shadow-xl">
            <img
              src="/images/hero-luxury-villa-dusk.jpg"
              alt="A modern duplex at dusk in Independence Layout, Enugu"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-5 left-3 right-3 rounded-2xl bg-white p-3.5 shadow-[0_20px_50px_-20px_rgba(22,20,15,0.45)] sm:-bottom-6 sm:-left-10 sm:right-auto sm:w-[290px] sm:p-4">
            <p className="text-[12px] sm:text-[13px] text-ink-600">5-bedroom duplex · Independence Layout</p>
            <p className="mt-0.5 sm:mt-1 font-serif text-xl sm:text-2xl text-ink">
              ₦8,500,000 <span className="font-sans text-[13px] sm:text-[14px] text-ink-600">a year</span>
            </p>
            <p className="mt-1.5 sm:mt-2 text-[12px] sm:text-[13px] font-medium text-forest-700">✓ Direct landlord mandate & title verified</p>
          </div>
        </div>
      </section>

      {/* ───────────── The agent's quote problem ───────────── */}
      <section className="bg-paper-100 py-14 sm:py-20 lg:py-28">
        <div className="container-x">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl leading-tight tracking-[-0.01em] text-ink sm:text-4xl lg:text-5xl">
              You’ve heard this one before.
            </h2>
            <p className="mt-3 sm:mt-4 text-[15px] sm:text-[17px] leading-relaxed text-ink-600">
              The price on the phone is never the price at the gate. On RentOra, it is.
            </p>
          </div>

          <div className="mt-8 sm:mt-12 grid gap-6 lg:grid-cols-2">
            {/* The usual way: a familiar WhatsApp exchange */}
            <div className="rounded-3xl bg-white p-5 sm:p-8 shadow-sm">
              <p className="text-[13px] sm:text-[14px] font-semibold text-ink-600">The usual way</p>

              <div className="mt-5 sm:mt-6 space-y-3 text-[14px] sm:text-[15px] leading-snug">
                <div className="max-w-[90%] sm:max-w-[85%] rounded-2xl rounded-tl-md bg-paper-100 px-4 py-3 text-ink">
                  Good evening sir. The 3-bedroom flat is 1.8m. Very clean, light is steady.
                </div>
                <div className="ml-auto max-w-[75%] sm:max-w-[70%] rounded-2xl rounded-tr-md bg-[#DCF3E4] px-4 py-3 text-ink">
                  Ok. I’ll come and see it tomorrow.
                </div>
                <div className="max-w-[90%] sm:max-w-[85%] rounded-2xl rounded-tl-md bg-paper-100 px-4 py-3 text-ink">
                  Bring ₦10k for inspection. And landlord just told me it’s 2.3m now, plus agency and legal.
                </div>
              </div>

              <p className="mt-5 sm:mt-6 border-t border-ink/10 pt-4 sm:pt-5 text-[14px] sm:text-[15px] text-ink-600">
                Same flat. <span className="font-semibold text-ink">₦500,000 more</span>, and ₦10,000 gone before you see the door.
              </p>
            </div>

            {/* The RentOra way: one honest receipt */}
            <div className="rounded-3xl bg-ink p-5 text-white sm:p-8 shadow-md">
              <p className="text-[13px] sm:text-[14px] font-semibold text-amber-300">On RentOra</p>

              <dl className="mt-5 sm:mt-6 divide-y divide-white/10">
                {RECEIPT.map((r) => (
                  <div key={r.label} className="flex items-baseline justify-between py-2.5 sm:py-3 text-[14px] sm:text-[15px]">
                    <dt className="text-white/70 pr-2">{r.label}</dt>
                    <dd className="font-medium tabular-nums shrink-0">{r.value}</dd>
                  </div>
                ))}
                <div className="flex items-baseline justify-between pt-4 sm:pt-5">
                  <dt className="text-[14px] sm:text-[15px] font-semibold">Total to move in</dt>
                  <dd className="font-serif text-2xl sm:text-3xl tabular-nums text-amber-300">₦2,340,000</dd>
                </div>
              </dl>

              <p className="mt-5 sm:mt-6 border-t border-white/10 pt-4 sm:pt-5 text-[14px] sm:text-[15px] text-white/70">
                Every naira listed upfront and signed by the landlord. It doesn’t change when you arrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── New listings ───────────── */}
      <section className="container-x py-14 sm:py-20 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif text-3xl tracking-[-0.01em] text-ink sm:text-4xl lg:text-5xl">New this week</h2>
          <Link href="/properties" className="text-[14px] sm:text-[15px] font-semibold text-ink underline decoration-amber-400 decoration-2 underline-offset-[6px] hover:decoration-ink">
            See all homes
          </Link>
        </div>

        <div className="mt-8 sm:mt-10 grid gap-y-8 sm:gap-x-6 sm:gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {LISTINGS.map((l) => (
            <Link key={l.slug} href={`/properties/${l.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper-100 shadow-sm">
                <img
                  src={l.image}
                  alt={`${l.title} in ${l.area}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[12px] sm:text-[13px] font-semibold text-ink shadow-sm">
                  {l.purpose}
                </span>
              </div>
              <div className="mt-3.5 sm:mt-4">
                <p className="font-serif text-xl sm:text-2xl text-ink">
                  {l.price} {l.per && <span className="font-sans text-[13px] sm:text-[14px] text-ink-600">{l.per}</span>}
                </p>
                <p className="mt-1 text-[15px] sm:text-[16px] font-semibold text-ink group-hover:underline group-hover:decoration-amber-400 group-hover:underline-offset-4">
                  {l.title}, {l.area}
                </p>
                <p className="mt-0.5 sm:mt-1 text-[13px] sm:text-[14px] text-ink-600">{l.specs}</p>
                <p className="mt-1.5 sm:mt-2 text-[12px] sm:text-[13px] font-medium text-forest-700">✓ {l.verified}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────── How it works ───────────── */}
      <section id="how-it-works" className="scroll-mt-24 container-x pb-14 sm:pb-20 lg:pb-28">
        <UliLine id="uli-how" className="mb-10 sm:mb-16 block h-4 w-full text-amber-500/70" />

        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <img
              src="/images/nigerian-inspection-team.jpg"
              alt="Verifying property documents and landlord mandate records"
              className="aspect-[5/4] w-full rounded-2xl sm:rounded-3xl object-cover shadow-md"
            />
          </div>

          <div>
            <h2 className="font-serif text-3xl leading-tight tracking-[-0.01em] text-ink sm:text-4xl lg:text-5xl">
              We vet the papers, so you don’t get scammed.
            </h2>

            <ol className="mt-8 sm:mt-10 space-y-6 sm:space-y-8">
              {STEPS.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2rem_1fr] sm:grid-cols-[2.5rem_1fr] gap-3 sm:gap-4">
                  <span className="font-serif text-2xl sm:text-3xl italic leading-none text-amber-500">{i + 1}</span>
                  <div>
                    <h3 className="text-[17px] sm:text-[18px] font-semibold text-ink">{s.title}</h3>
                    <p className="mt-1 sm:mt-1.5 text-[14px] sm:text-[16px] leading-relaxed text-ink-600">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Link
              href="/verification-guide"
              className="mt-8 sm:mt-10 inline-block text-[14px] sm:text-[15px] font-semibold text-ink underline decoration-amber-400 decoration-2 underline-offset-[6px] hover:decoration-ink"
            >
              Read our document verification standard
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── Cities ───────────── */}
      <section className="bg-paper-100 py-14 sm:py-20 lg:py-28">
        <div className="container-x grid gap-10 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-serif text-3xl leading-tight tracking-[-0.01em] text-ink sm:text-4xl lg:text-5xl">
              Six cities.
              <br />
              <span className="italic">Every listing verified.</span>
            </h2>
            <p className="mt-3 sm:mt-4 max-w-sm text-[15px] sm:text-[17px] leading-relaxed text-ink-600">
              Every property is backed by direct landlord mandates and verified ownership documents before it appears here.
            </p>
          </div>

          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {CITIES.map((c) => (
              <li key={c.name}>
                <Link href={c.href} className="group flex items-center gap-3.5 sm:gap-5 py-4 sm:py-5">
                  <img src={c.image} alt="" className="h-14 w-14 shrink-0 rounded-full object-cover sm:h-20 sm:w-20 shadow-sm" />
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-2xl text-ink transition-colors group-hover:text-amber-600 sm:text-4xl">{c.name}</p>
                    <p className="mt-0.5 truncate text-[13px] sm:text-[14px] text-ink-600">{c.areas}</p>
                  </div>
                  <p className="shrink-0 text-right text-[13px] sm:text-[14px] text-ink-600">
                    <span className="block font-serif text-xl sm:text-2xl text-ink">{c.count}</span>
                    homes
                  </p>
                  <span className="text-lg sm:text-xl text-ink transition-transform group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── For owners & agents ───────────── */}
      <section className="container-x py-14 sm:py-20 lg:py-28">
        <div className="relative isolate overflow-hidden rounded-[28px] sm:rounded-[32px] bg-forest px-5 py-10 sm:px-12 sm:py-16 lg:px-16 lg:py-20 text-white">
          <UliLine id="uli-owners" tile={44} className="absolute inset-0 -z-10 h-full w-full text-forest-300/10" />

          <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-[13px] sm:text-[15px] font-semibold text-amber-300">For landlords and agents</p>
              <h2 className="mt-2.5 sm:mt-3 font-serif text-3xl leading-tight tracking-[-0.01em] sm:text-4xl lg:text-5xl">
                Got a house to rent or sell?
              </h2>
              <p className="mt-4 sm:mt-5 max-w-lg text-[15px] sm:text-[17px] leading-relaxed text-white/80">
                When unauthorized touts duplicate your listing and inflate the price, good tenants walk away and the house sits empty.
                List it here for free. Submit your mandate papers, get confirmed within 48 hours, and connect with serious seekers directly.
              </p>
              <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-x-6 sm:gap-y-4">
                <Link
                  href="/register?role=landlord"
                  className="w-full sm:w-auto text-center rounded-full bg-amber-400 px-7 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:bg-amber-300 shadow-md active:scale-[0.98]"
                >
                  List your property, free
                </Link>
                <Link href="/register?role=agent" className="w-full sm:w-auto text-center py-2 text-[15px] font-semibold text-white underline decoration-white/40 underline-offset-[6px] hover:decoration-white">
                  Join as registered agent
                </Link>
              </div>
            </div>

            <figure className="rounded-2xl sm:rounded-3xl bg-white/[0.06] p-6 sm:p-9 border border-white/10">
              <blockquote className="font-serif text-xl italic leading-snug text-white sm:text-2xl lg:text-[28px]">
                “My flat in Trans-Ekulu sat empty for five months because street agents kept adding ₦400k on top. Here, my direct mandate was verified in two days and it was let in three weeks.”
              </blockquote>
              <figcaption className="mt-5 sm:mt-6 text-[13px] sm:text-[15px] text-white/70">
                <span className="font-semibold text-white">Mrs. Ngozi Okafor</span> · Landlord, Enugu
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </div>
  );
}
