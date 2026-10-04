'use client';

import React from 'react';
import Link from 'next/link';

const DISTRICTS = [
  {
    id: 'independence-layout',
    name: 'Independence Layout & GRA',
    state: 'Enugu (Coal City)',
    tagline: 'Diplomatic layout, upscale mansions, serene streets & government core',
    priceGuide: 'Rent: From ₦4.5M/yr • Sale: ₦95M+',
    image: '/images/hero-eastern-nigerian-mansion.jpg',
    verifiedCount: '128 Verified Units',
    href: '/properties?state=Enugu&area=Independence Layout',
  },
  {
    id: 'gra-onitsha',
    name: 'GRA Onitsha & Trans-Nkisi',
    state: 'Onitsha, Anambra',
    tagline: 'High-end commercial duplexes, private estates & waterfront views',
    priceGuide: 'Rent: From ₦3.8M/yr • Sale: ₦85M+',
    image: '/images/onitsha-gra-luxury-duplex.jpg',
    verifiedCount: '94 Verified Units',
    href: '/properties?state=Anambra&area=Onitsha',
  },
  {
    id: 'ngozika-awka',
    name: 'Ngozika Estate & Iyi-Agu Axis',
    state: 'Awka Capital, Anambra',
    tagline: 'Modern gated residential estates, serviced flats & solar backup',
    priceGuide: 'Rent: From ₦2.5M/yr • Sale: ₦65M+',
    image: '/images/awka-ngozika-duplex.jpg',
    verifiedCount: '76 Verified Units',
    href: '/properties?state=Anambra&area=Awka',
  },
  {
    id: 'new-owerri',
    name: 'New Owerri (Area A–H)',
    state: 'Owerri, Imo State',
    tagline: 'Lush residential avenues, entertainment hubs & executive apartments',
    priceGuide: 'Rent: From ₦2.8M/yr • Sale: ₦70M+',
    image: '/images/owerri-luxury-duplex.jpg',
    verifiedCount: '88 Verified Units',
    href: '/properties?state=Imo&area=New Owerri',
  },
];

export function NeighborhoodExplorer() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-[11px] font-mono font-bold tracking-wider uppercase">
            Neighborhood Focus
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-950 font-black tracking-tight">
            Explore Eastern Nigeria’s Premier Enclaves
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl leading-relaxed">
            From the serene diplomatic avenues of Independence Layout in Enugu to the commercial power of GRA Onitsha, find verified homes in the communities you know and trust.
          </p>
        </div>

        <Link
          href="/properties"
          className="text-xs font-mono font-bold text-amber-700 hover:text-amber-800 tracking-wider uppercase shrink-0"
        >
          View all Eastern locations →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {DISTRICTS.map((d) => (
          <Link
            key={d.id}
            href={d.href}
            className="group relative rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-sm hover:shadow-md hover:border-amber-400 transition-all flex flex-col"
          >
            {/* Image */}
            <div className="aspect-[4/3] w-full overflow-hidden relative bg-stone-950">
              <img
                src={d.image}
                alt={d.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 right-2.5">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-stone-950/80 text-amber-300 backdrop-blur-sm border border-white/10">
                  {d.verifiedCount}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-amber-600 font-bold">
                  {d.state}
                </span>
                <h3 className="font-serif font-bold text-stone-950 text-sm group-hover:text-amber-600 transition-colors mt-0.5">
                  {d.name}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-snug">
                  {d.tagline}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-stone-950 text-[11px]">
                  {d.priceGuide}
                </span>
                <span className="text-amber-600 font-bold group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
