'use client';

import React from 'react';
import Link from 'next/link';

const EASTERN_LATEST_PROPERTIES = [
  {
    id: 'prop-enugu',
    title: 'Luxury 4-Bedroom Detached Duplex + BQ',
    slug: 'luxury-4-bed-duplex-independence-layout-enugu',
    purpose: 'FOR RENT',
    priceText: '₦5,500,000/yr',
    address: 'Plot 18, Independence Layout, Enugu',
    bedrooms: 4,
    bathrooms: 4,
    sqm: 280,
    power: '24/7 Gen + Solar',
    image: '/images/enugu-flagship-mansion.jpg',
    agent: {
      name: 'Chief Emeka Eze & Partners',
      role: 'Direct Landlord Mandate (Enugu)',
      initials: 'EE',
      whatsapp: '2348030000000',
    },
  },
  {
    id: 'prop-awka',
    title: 'Contemporary 4-Bedroom Duplex with Carport',
    slug: 'contemporary-4-bed-duplex-ngozika-estate-awka',
    purpose: 'FOR SALE',
    priceText: '₦68,000,000',
    address: 'Ngozika Housing Estate, Phase 2, Awka',
    bedrooms: 4,
    bathrooms: 4,
    sqm: 240,
    power: 'Dedicated Transformer',
    image: '/images/awka-ngozika-duplex.jpg',
    agent: {
      name: 'Engr. Nnamdi Okeke',
      role: 'Property Owner (Direct Title)',
      initials: 'NO',
      whatsapp: '2348030000000',
    },
  },
  {
    id: 'prop-owerri',
    title: 'Executive 3-Bedroom Serviced Apartment',
    slug: 'executive-3-bed-flat-new-owerri',
    purpose: 'FOR RENT',
    priceText: '₦2,800,000/yr',
    address: 'Area C, New Owerri, Imo State',
    bedrooms: 3,
    bathrooms: 3,
    sqm: 165,
    power: 'Estate Gen Backup',
    image: '/images/owerri-new-duplex.jpg',
    agent: {
      name: 'Heartland Property Trustees Ltd',
      role: 'Institutional Mandate (Direct)',
      initials: 'HP',
      whatsapp: '2348030000000',
    },
  },
];

export function LatestListingsGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-[11px] font-mono tracking-[0.2em] text-amber-600 uppercase font-semibold">
          Freshly Inspected
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-obsidian-900 tracking-tight">
          Latest Verified Homes for Rent and Sale
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 max-w-xl mx-auto">
          Recently audited residences in Enugu, Awka, and Owerri with confirmed keys and locked owner rates
        </p>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EASTERN_LATEST_PROPERTIES.map((p) => (
          <div
            key={p.id}
            className="group bg-white rounded-3xl overflow-hidden border border-stone-200/90 hover:border-amber-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Photo */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-stone-100">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-obsidian-950/90 text-amber-400 backdrop-blur-md border border-amber-500/30 font-semibold">
                    {p.purpose} • VERIFIED
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="text-sm font-bold font-mono px-3 py-1 rounded-xl bg-obsidian-950/90 text-white backdrop-blur-md border border-white/10">
                    {p.priceText}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <Link href={`/properties/${p.slug}`} className="block group-hover:text-amber-600 transition-colors">
                  <h3 className="font-serif font-bold text-lg text-obsidian-900 leading-snug line-clamp-1">
                    {p.title}
                  </h3>
                </Link>

                <p className="text-xs text-stone-500 font-mono tracking-tight truncate">
                  {p.address}
                </p>

                {/* Clean Editorial Typographic Specs */}
                <div className="pt-3 border-t border-stone-100 text-xs font-mono text-stone-600 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-semibold text-stone-800">{p.bedrooms} BEDS</span>
                  <span className="text-stone-300">•</span>
                  <span className="font-semibold text-stone-800">{p.bathrooms} BATHS</span>
                  <span className="text-stone-300">•</span>
                  <span className="font-semibold text-stone-800">{p.sqm} SQM</span>
                  <span className="text-stone-300">•</span>
                  <span className="text-stone-900 font-semibold">{p.power}</span>
                </div>
              </div>
            </div>

            {/* Custodian / Direct Owner Footer Row */}
            <div className="p-4 px-5 bg-stone-50/80 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-obsidian-900 text-amber-400 font-mono font-bold text-xs flex items-center justify-center border border-stone-300 shadow-sm shrink-0">
                  {p.agent.initials}
                </div>
                <div className="leading-tight">
                  <span className="text-xs font-bold text-obsidian-900 block">{p.agent.name}</span>
                  <span className="text-[10px] text-stone-500 block font-mono">{p.agent.role}</span>
                </div>
              </div>

              {/* Action Link */}
              <div>
                <a
                  href={`https://wa.me/${p.agent.whatsapp}?text=${encodeURIComponent(
                    `Hello, I would like to inspect "${p.title}" directly via RentOra.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-bold text-obsidian-900 hover:text-black transition-colors uppercase tracking-wider font-mono py-1.5 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-200"
                >
                  Inquire Direct →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
