'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PropertyCard } from '@/components/PropertyCard';

interface CatalogueProperty {
  id: string;
  title: string;
  slug: string;
  property_type: 'duplex' | 'flat_apartment' | 'detached_mansion' | 'land';
  listing_type: 'rent' | 'sale';
  bedrooms: number;
  bathrooms: number;
  state: string;
  lga: string;
  area: string;
  rent_price: number; // for rent: annual rent; for sale: outright sale price
  service_charge?: number;
  caution_fee?: number;
  legal_fee_pct?: number;
  agency_fee_pct?: number;
  total_upfront_estimate?: number;
  is_verified: boolean;
  is_featured: boolean;
  cover_image_url: string;
}

const CATALOGUE_PROPERTIES: CatalogueProperty[] = [
  {
    id: 'prop-enugu-01',
    title: 'Grand 5-Bedroom Executive Mansion + BQ',
    slug: 'luxury-5-bed-mansion-independence-layout-enugu',
    property_type: 'detached_mansion',
    listing_type: 'rent',
    bedrooms: 5,
    bathrooms: 5,
    state: 'Enugu',
    lga: 'Enugu North',
    area: 'Independence Layout',
    rent_price: 8500000,
    service_charge: 1000000,
    caution_fee: 500000,
    legal_fee_pct: 10,
    agency_fee_pct: 10,
    total_upfront_estimate: 11700000,
    is_verified: true,
    is_featured: true,
    cover_image_url: '/images/hero-eastern-nigerian-mansion.jpg',
  },
  {
    id: 'prop-onitsha-01',
    title: 'Contemporary 5-Bedroom Luxury Duplex',
    slug: 'contemporary-5-bed-duplex-gra-onitsha',
    property_type: 'duplex',
    listing_type: 'sale',
    bedrooms: 5,
    bathrooms: 5,
    state: 'Anambra',
    lga: 'Onitsha North',
    area: 'GRA Onitsha',
    rent_price: 95000000,
    is_verified: true,
    is_featured: true,
    cover_image_url: '/images/onitsha-gra-mansion.jpg',
  },
  {
    id: 'prop-owerri-01',
    title: 'Executive 4-Bedroom Serviced Duplex',
    slug: 'executive-4-bed-duplex-new-owerri',
    property_type: 'duplex',
    listing_type: 'rent',
    bedrooms: 4,
    bathrooms: 4,
    state: 'Imo',
    lga: 'Owerri Municipal',
    area: 'New Owerri',
    rent_price: 4500000,
    service_charge: 600000,
    caution_fee: 350000,
    legal_fee_pct: 10,
    agency_fee_pct: 10,
    total_upfront_estimate: 6350000,
    is_verified: true,
    is_featured: true,
    cover_image_url: '/images/owerri-new-duplex.jpg',
  },
  {
    id: 'prop-awka-01',
    title: 'Contemporary 4-Bedroom Duplex with Carport',
    slug: 'contemporary-4-bed-duplex-ngozika-estate-awka',
    property_type: 'duplex',
    listing_type: 'sale',
    bedrooms: 4,
    bathrooms: 4,
    state: 'Anambra',
    lga: 'Awka South',
    area: 'Ngozika Housing Estate',
    rent_price: 75000000,
    is_verified: true,
    is_featured: false,
    cover_image_url: '/images/awka-ngozika-duplex.jpg',
  },
  {
    id: 'prop-enugu-02',
    title: 'Luxury 4-Bedroom Detached Duplex + BQ',
    slug: 'luxury-4-bed-duplex-independence-layout-enugu',
    property_type: 'duplex',
    listing_type: 'sale',
    bedrooms: 4,
    bathrooms: 4,
    state: 'Enugu',
    lga: 'Enugu North',
    area: 'Independence Layout',
    rent_price: 135000000,
    is_verified: true,
    is_featured: false,
    cover_image_url: '/images/enugu-flagship-mansion.jpg',
  },
  {
    id: 'prop-owerri-02',
    title: 'Executive 3-Bedroom Serviced Apartment',
    slug: 'executive-3-bed-flat-new-owerri',
    property_type: 'flat_apartment',
    listing_type: 'rent',
    bedrooms: 3,
    bathrooms: 3,
    state: 'Imo',
    lga: 'Owerri Municipal',
    area: 'New Owerri',
    rent_price: 2800000,
    service_charge: 350000,
    caution_fee: 200000,
    legal_fee_pct: 10,
    agency_fee_pct: 10,
    total_upfront_estimate: 3910000,
    is_verified: true,
    is_featured: false,
    cover_image_url: '/images/asaba-gateway-duplex.jpg',
  },
  {
    id: 'prop-enugu-03',
    title: 'Tastefully Finished 2-Bedroom Serviced Flat',
    slug: 'serviced-2-bed-flat-trans-ekulu-enugu',
    property_type: 'flat_apartment',
    listing_type: 'rent',
    bedrooms: 2,
    bathrooms: 2,
    state: 'Enugu',
    lga: 'Enugu East',
    area: 'Trans-Ekulu',
    rent_price: 2200000,
    service_charge: 300000,
    caution_fee: 150000,
    legal_fee_pct: 10,
    agency_fee_pct: 10,
    total_upfront_estimate: 3090000,
    is_verified: true,
    is_featured: false,
    cover_image_url: '/images/aba-gra-residence.jpg',
  },
  {
    id: 'prop-asaba-01',
    title: 'River Niger View 4-Bedroom Luxury Duplex',
    slug: 'river-niger-view-duplex-asaba-gra',
    property_type: 'duplex',
    listing_type: 'sale',
    bedrooms: 4,
    bathrooms: 4,
    state: 'Delta',
    lga: 'Oshimili South',
    area: 'Asaba GRA',
    rent_price: 88000000,
    is_verified: true,
    is_featured: false,
    cover_image_url: '/images/onitsha-gra-luxury-duplex.jpg',
  },
  {
    id: 'prop-aba-01',
    title: 'Spacious 4-Bedroom Semi-Detached Duplex',
    slug: 'spacious-4-bed-duplex-aba-gra',
    property_type: 'duplex',
    listing_type: 'rent',
    bedrooms: 4,
    bathrooms: 4,
    state: 'Abia',
    lga: 'Aba South',
    area: 'Aba GRA',
    rent_price: 3500000,
    service_charge: 400000,
    caution_fee: 250000,
    legal_fee_pct: 10,
    agency_fee_pct: 10,
    total_upfront_estimate: 4850000,
    is_verified: true,
    is_featured: false,
    cover_image_url: '/images/aba-gra-residence.jpg',
  },
];

export default function PropertiesCataloguePage() {
  const [listingTypeFilter, setListingTypeFilter] = useState<'all' | 'rent' | 'sale'>('all');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [sortBy, setSortBy] = useState('verified_first');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const activeFilterCount =
    (selectedState !== 'All' ? 1 : 0) +
    (selectedType !== 'All' ? 1 : 0) +
    (!verifiedOnly ? 1 : 0);

  const filtered = CATALOGUE_PROPERTIES.filter((p) => {
    if (listingTypeFilter !== 'all' && p.listing_type !== listingTypeFilter) return false;
    if (selectedState !== 'All' && p.state !== selectedState) return false;
    if (selectedType !== 'All' && p.property_type !== selectedType) return false;
    if (verifiedOnly && !p.is_verified) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8 bg-stone-50 min-h-screen">
      {/* Header & Market Focus */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 sm:gap-6 border-b border-stone-200 pb-5 sm:pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-[11px] font-mono uppercase tracking-wider font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <span>Direct Mandate Registry • Zero Middlemen Quotes</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight font-serif">
            Verified Houses For Rent & Sale
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
            Every listing below is document-verified. Agents and landlords must submit ownership papers and direct mandates before approval, locking in direct rates with ₦0 viewing fees.
          </p>
        </div>

        {/* Listing Type Master Switch: Rent vs Sale */}
        <div className="grid grid-cols-3 sm:flex items-center p-1 bg-stone-200/80 rounded-xl font-mono text-xs font-bold w-full sm:w-auto shrink-0 shadow-inner">
          <button
            type="button"
            onClick={() => setListingTypeFilter('all')}
            className={`py-2 px-3 sm:px-4 rounded-lg text-center transition-all ${
              listingTypeFilter === 'all'
                ? 'bg-stone-950 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            All Units
          </button>
          <button
            type="button"
            onClick={() => setListingTypeFilter('rent')}
            className={`py-2 px-3 sm:px-4 rounded-lg text-center transition-all ${
              listingTypeFilter === 'rent'
                ? 'bg-stone-950 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            For Rent
          </button>
          <button
            type="button"
            onClick={() => setListingTypeFilter('sale')}
            className={`py-2 px-3 sm:px-4 rounded-lg text-center transition-all ${
              listingTypeFilter === 'sale'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            For Sale
          </button>
        </div>
      </div>

      {/* Mobile Filter Toggle Button Bar */}
      <div className="flex items-center justify-between gap-3 lg:hidden bg-white p-3 rounded-2xl border border-stone-200 shadow-sm">
        <button
          type="button"
          onClick={() => setShowMobileFilters((prev) => !prev)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-mono font-bold transition-colors active:scale-95"
          aria-expanded={showMobileFilters}
        >
          <svg className="w-4 h-4 text-stone-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
          <span>{showMobileFilters ? 'Hide Filters' : 'Filters'}</span>
          {activeFilterCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] text-stone-950 font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>

        <span className="text-[11px] font-mono text-stone-500">
          <strong className="text-stone-950 font-bold">{filtered.length}</strong> homes found
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Filter Sidebar (visible on desktop, toggleable on mobile) */}
        <aside
          className={`bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 space-y-5 sm:space-y-6 shadow-sm ${
            showMobileFilters ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="font-bold text-sm text-stone-950 font-mono uppercase tracking-wider">
              Filter Options
            </h3>
            <button
              onClick={() => {
                setListingTypeFilter('all');
                setSelectedState('All');
                setSelectedType('All');
                setVerifiedOnly(true);
              }}
              className="text-xs text-amber-700 hover:underline font-mono font-medium"
            >
              Reset All
            </button>
          </div>

          {/* Verified Guarantee Toggle */}
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200/80">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="block text-xs font-bold text-emerald-950 font-mono">
                  Verified Mandates Only
                </span>
                <span className="text-[11px] text-emerald-800">
                  Title & papers confirmed
                </span>
              </div>
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 border-emerald-300"
              />
            </label>
          </div>

          {/* State Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-900 font-mono uppercase tracking-wider">
              Eastern State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-[16px] sm:text-xs text-stone-900 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <option value="All">All Eastern States</option>
              <option value="Enugu">Enugu State (Coal City)</option>
              <option value="Anambra">Anambra State (Onitsha & Awka)</option>
              <option value="Imo">Imo State (Owerri)</option>
              <option value="Abia">Abia State (Aba)</option>
              <option value="Delta">Delta State (Asaba Gateway)</option>
            </select>
          </div>

          {/* Property Category */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-900 font-mono uppercase tracking-wider">
              Property Category
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-[16px] sm:text-xs text-stone-900 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <option value="All">All Property Types</option>
              <option value="duplex">Duplex & Terraced</option>
              <option value="detached_mansion">Detached Mansion</option>
              <option value="flat_apartment">Serviced Flat / Apartment</option>
            </select>
          </div>

          {/* Landlord & Agent Callout Box */}
          <div className="p-4 bg-stone-950 text-white rounded-xl space-y-2">
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
              Property Owner?
            </span>
            <p className="text-xs text-stone-300 leading-snug">
              List your house for rent or sale without paying touts. Submit your mandate papers for fast 24–48h verification.
            </p>
            <Link
              href="/register?role=landlord"
              className="inline-block text-xs font-mono font-bold text-amber-400 hover:text-amber-300 uppercase pt-1"
            >
              List Free Property →
            </Link>
          </div>
        </aside>

        {/* Results Grid */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-600 font-mono">
            <span>Showing <strong className="text-stone-950">{filtered.length}</strong> verified properties</span>
            <div className="flex items-center gap-2">
              <span className="text-stone-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg text-[16px] sm:text-xs font-mono text-stone-800 focus:outline-none"
              >
                <option value="verified_first">Verified First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
              <div className="h-12 w-12 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center font-mono font-bold text-lg">
                0
              </div>
              <h3 className="font-bold text-stone-950 text-base font-serif">No verified listings match your criteria</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try widening your filters or switching between "For Rent" and "For Sale".
              </p>
              <button
                type="button"
                onClick={() => {
                  setListingTypeFilter('all');
                  setSelectedState('All');
                  setSelectedType('All');
                }}
                className="px-4 py-2 bg-stone-950 text-white rounded-xl text-xs font-mono font-bold"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
