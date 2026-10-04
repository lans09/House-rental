'use client';

import React from 'react';
import Link from 'next/link';

const EASTERN_CITIES = [
  {
    name: 'Enugu (Coal City)',
    state: 'Enugu State',
    count: 'Rent & Sale • 128 Verified Units',
    enclaves: 'Independence Layout, GRA, New Haven, Trans-Ekulu',
    image: '/images/hero-eastern-nigerian-mansion.jpg',
    href: '/properties?state=Enugu',
  },
  {
    name: 'Onitsha',
    state: 'Anambra State',
    count: 'Rent & Sale • 94 Verified Units',
    enclaves: 'GRA Onitsha, Trans-Nkisi, 3-3 Nkwelle Ezunaka',
    image: '/images/onitsha-gra-mansion.jpg',
    href: '/properties?state=Anambra&area=Onitsha',
  },
  {
    name: 'Awka Capital',
    state: 'Anambra State',
    count: 'Rent & Sale • 76 Verified Units',
    enclaves: 'Ngozika Housing Estate, Iyi-Agu, Ifite Axis',
    image: '/images/awka-ngozika-duplex.jpg',
    href: '/properties?state=Anambra&area=Awka',
  },
  {
    name: 'Owerri (Heartland)',
    state: 'Imo State',
    count: 'Rent & Sale • 88 Verified Units',
    enclaves: 'New Owerri (Area A-H), Ikenegbu, Works Layout',
    image: '/images/owerri-new-duplex.jpg',
    href: '/properties?state=Imo',
  },
  {
    name: 'Aba (Enyimba City)',
    state: 'Abia State',
    count: 'Rent & Sale • 52 Verified Units',
    enclaves: 'Aba GRA, Umungasi, Commercial Corridor',
    image: '/images/aba-gra-residence.jpg',
    href: '/properties?state=Abia',
  },
  {
    name: 'Asaba (Gateway)',
    state: 'Delta / East Corridor',
    count: 'Rent & Sale • 46 Verified Units',
    enclaves: 'Asaba GRA, Summit Road, Niger Bridge Core',
    image: '/images/asaba-gateway-duplex.jpg',
    href: '/properties?state=Delta&area=Asaba',
  },
];

export function CitiesGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-[11px] font-mono tracking-[0.2em] text-amber-600 uppercase font-bold">
          Eastern Regional Enclaves • Direct Owner Rates
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-950 tracking-tight">
          Find Verified Homes Across Eastern Nigeria
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
          Whether you are looking to rent a serviced duplex or buy outright with verified titles across Enugu, Anambra, Imo, Abia, and the Niger Bridge gateway.
        </p>
      </div>

      {/* 3x2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {EASTERN_CITIES.map((c, i) => (
          <Link
            key={i}
            href={c.href}
            className="group relative rounded-3xl overflow-hidden bg-stone-950 aspect-[16/11] border border-stone-200 shadow-md flex flex-col justify-end"
          >
            <img
              src={c.image}
              alt={c.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

            <div className="relative z-10 p-6 flex items-end justify-between text-white">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                  {c.state}
                </span>
                <h3 className="text-xl font-serif font-black text-white group-hover:text-amber-300 transition-colors">
                  {c.name}
                </h3>
                <p className="text-xs text-amber-200 font-mono mt-0.5">
                  {c.count}
                </p>
                <p className="text-[11px] text-stone-300 truncate max-w-[220px] mt-0.5">
                  {c.enclaves}
                </p>
              </div>

              {/* Clean Typographic Action Arrow */}
              <div className="text-right shrink-0">
                <span className="inline-block text-white/90 group-hover:text-amber-300 font-mono text-xs font-bold tracking-wider transition-all transform group-hover:translate-x-1">
                  VIEW →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Centered View More Link */}
      <div className="text-center pt-2">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-obsidian-900 hover:bg-black text-white font-semibold text-xs tracking-wider uppercase shadow-md transition-all hover:scale-105 font-mono border border-stone-800"
        >
          <span>Explore All Eastern Enclaves →</span>
        </Link>
      </div>
    </section>
  );
}
