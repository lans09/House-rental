'use client';

import React from 'react';
import Link from 'next/link';

export function FeaturedCollage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Section Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-semibold block">
          Verified Rentals & Sales • Direct Owner Rates
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-obsidian-900 tracking-tight font-serif">
          Handpicked Eastern Homes for Rent and Sale
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 font-normal max-w-2xl mx-auto">
          Every listing is verified with direct landlord mandates and confirmed title documents before publishing. Zero street agent quotes and ₦0 viewing fees.
        </p>
      </div>

      {/* Asymmetric Collage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Hero Card (Large, 7 cols) - Independence Layout, Enugu */}
        <div className="lg:col-span-7 group relative rounded-3xl overflow-hidden bg-obsidian-900 border border-stone-200 shadow-sm min-h-[460px] sm:min-h-[520px] flex flex-col justify-end">
          <img
            src="/images/hero-eastern-nigerian-mansion.jpg"
            alt="Grand 5-Bedroom Executive Mansion in Independence Layout, Enugu"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/95 via-obsidian-950/30 to-transparent" />

          {/* Top Verified Badge */}
          <div className="absolute top-5 left-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-950/90 text-gold-300 text-[11px] font-mono tracking-wider uppercase backdrop-blur-md shadow border border-gold-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              FOR RENT • DIRECT OWNER MANDATE
            </span>
          </div>

          {/* Integrated Dark Glass Specs Bar at Bottom */}
          <div className="relative z-10 p-6 sm:p-7 bg-obsidian-950/85 backdrop-blur-md border-t border-white/10 text-white space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-serif">
                  Grand 5-Bedroom Executive Mansion + BQ
                </h3>
                <p className="text-xs text-stone-300 font-mono mt-1">
                  Plot 14, Independence Layout, Enugu
                </p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">Direct Owner Rent</span>
                <span className="text-2xl font-extrabold text-gold-300 font-mono">
                  ₦8,500,000<span className="text-xs font-normal text-stone-300">/yr</span>
                </span>
              </div>
            </div>

            {/* Spec Columns */}
            <div className="grid grid-cols-4 gap-2 pt-3 border-t border-white/10 text-center font-mono">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-stone-400 uppercase block">Compound</span>
                <span className="text-sm font-bold text-white">450 sqm</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-stone-400 uppercase block">Bedrooms</span>
                <span className="text-sm font-bold text-white">05 En-suite</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-stone-400 uppercase block">Agent Quote</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">₦0.00</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-stone-400 uppercase block">Power & Water</span>
                <span className="text-xs font-bold text-emerald-400 block mt-0.5">
                  Gen + Solar
                </span>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] font-mono tracking-wider text-stone-400 uppercase">
                Registry ID: #HO-2026-ENU-014
              </span>

              <Link
                href="/properties/luxury-5-bed-mansion-independence-layout-enugu"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider transition-all shadow-md block font-mono"
              >
                View Property Details →
              </Link>
            </div>
          </div>
        </div>

        {/* Right Stacked Cards (5 cols, 2 cards) - Onitsha & Owerri */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Card 1: GRA Onitsha (FOR SALE) */}
          <div className="group relative rounded-3xl overflow-hidden bg-obsidian-900 border border-stone-200 shadow-sm flex-1 min-h-[240px] flex flex-col justify-end">
            <img
              src="/images/onitsha-gra-mansion.jpg"
              alt="Contemporary 5-Bedroom Luxury Duplex in GRA Onitsha"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-obsidian-950/30 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-obsidian-950/90 text-gold-300 backdrop-blur-md border border-gold-500/30">
                FOR SALE • C OF O VALIDATED
              </span>
            </div>

            <div className="relative z-10 p-5 text-white flex items-end justify-between">
              <div>
                <h4 className="text-lg font-bold text-white font-serif">
                  Contemporary 5-Bedroom Luxury Duplex
                </h4>
                <p className="text-xs text-stone-300 font-mono mt-0.5">
                  GRA Onitsha, Anambra State
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-sm font-bold text-gold-300 font-mono">
                    ₦95,000,000
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">
                    Direct Sale
                  </span>
                </div>
              </div>

              <Link
                href="/properties/contemporary-5-bed-duplex-gra-onitsha"
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white text-white hover:text-obsidian-950 text-xs font-semibold font-mono border border-white/20 transition-all backdrop-blur-md shrink-0 uppercase"
              >
                View Details →
              </Link>
            </div>
          </div>

          {/* Card 2: New Owerri (FOR RENT) */}
          <div className="group relative rounded-3xl overflow-hidden bg-obsidian-900 border border-stone-200 shadow-sm flex-1 min-h-[240px] flex flex-col justify-end">
            <img
              src="/images/owerri-new-duplex.jpg"
              alt="Executive 4-Bedroom Serviced Duplex in New Owerri"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-obsidian-950/30 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-obsidian-950/90 text-gold-300 backdrop-blur-md border border-gold-500/30">
                FOR RENT • ESTATE POWER
              </span>
            </div>

            <div className="relative z-10 p-5 text-white flex items-end justify-between">
              <div>
                <h4 className="text-lg font-bold text-white font-serif">
                  Executive 4-Bedroom Serviced Duplex
                </h4>
                <p className="text-xs text-stone-300 font-mono mt-0.5">
                  Area B, New Owerri, Imo State
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-sm font-bold text-gold-300 font-mono">
                    ₦4,500,000 / yr
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">
                    Direct Rate
                  </span>
                </div>
              </div>

              <Link
                href="/properties/executive-4-bed-duplex-new-owerri"
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white text-white hover:text-obsidian-950 text-xs font-semibold font-mono border border-white/20 transition-all backdrop-blur-md shrink-0 uppercase"
              >
                View Details →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Centered View More Button */}
      <div className="text-center pt-2">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-obsidian-900 hover:bg-black text-white font-semibold text-xs tracking-wider uppercase shadow-md transition-all hover:scale-105 font-mono border border-stone-800"
        >
          <span>Explore All Properties for Rent & Sale →</span>
        </Link>
      </div>
    </section>
  );
}
