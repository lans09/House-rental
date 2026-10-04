'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PropertyCard, CatalogueProperty } from '@/components/PropertyCard';
import { UliLine } from '@/components/UliLine';

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
    total_upfront_estimate: 4850000,
    is_verified: true,
    is_featured: false,
    cover_image_url: '/images/aba-gra-residence.jpg',
  },
];

const CITIES = [
  { label: 'All Cities', state: '', area: '' },
  { label: 'Enugu', state: 'Enugu', area: '' },
  { label: 'Onitsha', state: 'Anambra', area: 'Onitsha' },
  { label: 'Awka', state: 'Anambra', area: 'Awka' },
  { label: 'Owerri', state: 'Imo', area: '' },
  { label: 'Aba', state: 'Abia', area: '' },
  { label: 'Asaba', state: 'Delta', area: 'Asaba' },
];

const PROPERTY_TYPES = [
  { value: '', label: 'All property types' },
  { value: 'flat_apartment', label: 'Flat / Apartment' },
  { value: 'duplex', label: 'Duplex & Terraced' },
  { value: 'detached_mansion', label: 'Detached Mansion' },
  { value: 'land', label: 'Land' },
];

const BUDGET_OPTIONS = {
  all: [
    { value: '', label: 'Any budget' },
    { value: '0-3000000', label: 'Under ₦3m' },
    { value: '3000000-10000000', label: '₦3m – ₦10m' },
    { value: '10000000-80000000', label: '₦10m – ₦80m' },
    { value: '80000000-', label: '₦80m+' },
  ],
  rent: [
    { value: '', label: 'Any budget' },
    { value: '0-1000000', label: 'Under ₦1m a year' },
    { value: '1000000-3000000', label: '₦1m – ₦3m a year' },
    { value: '3000000-6000000', label: '₦3m – ₦6m a year' },
    { value: '6000000-', label: '₦6m+ a year' },
  ],
  sale: [
    { value: '', label: 'Any budget' },
    { value: '0-40000000', label: 'Under ₦40m' },
    { value: '40000000-100000000', label: '₦40m – ₦100m' },
    { value: '100000000-250000000', label: '₦100m – ₦250m' },
    { value: '250000000-', label: '₦250m+' },
  ],
};

function PropertiesCatalogueContent() {
  const searchParams = useSearchParams();

  // Initialize from searchParams
  const initialPurpose = (searchParams.get('purpose') as 'rent' | 'sale') || 'all';
  const initialState = searchParams.get('state') || '';
  const initialArea = searchParams.get('area') || '';
  const initialType = searchParams.get('type') || '';
  const initialBudget = searchParams.get('price_range') || '';

  const [purpose, setPurpose] = useState<'all' | 'rent' | 'sale'>(initialPurpose);
  const [selectedCityLabel, setSelectedCityLabel] = useState<string>(() => {
    if (initialArea) {
      const match = CITIES.find((c) => c.area.toLowerCase() === initialArea.toLowerCase());
      if (match) return match.label;
    }
    if (initialState) {
      const match = CITIES.find((c) => c.state.toLowerCase() === initialState.toLowerCase() && !c.area);
      if (match) return match.label;
      const stateMatch = CITIES.find((c) => c.state.toLowerCase() === initialState.toLowerCase());
      if (stateMatch) return stateMatch.label;
    }
    return 'All Cities';
  });

  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [selectedBudget, setSelectedBudget] = useState<string>(initialBudget);
  const [sortBy, setSortBy] = useState<string>('verified_first');

  // Filtered properties
  const filtered = useMemo(() => {
    return CATALOGUE_PROPERTIES.filter((p) => {
      // Listing purpose filter
      if (purpose !== 'all' && p.listing_type !== purpose) return false;

      // City filter
      if (selectedCityLabel !== 'All Cities') {
        const cityConfig = CITIES.find((c) => c.label === selectedCityLabel);
        if (cityConfig) {
          if (cityConfig.state && p.state !== cityConfig.state) return false;
          if (cityConfig.area && !p.area.toLowerCase().includes(cityConfig.area.toLowerCase())) {
            return false;
          }
        }
      }

      // Property type filter
      if (selectedType && p.property_type !== selectedType) return false;

      // Budget filter
      if (selectedBudget) {
        const [minStr, maxStr] = selectedBudget.split('-');
        const min = minStr ? parseInt(minStr, 10) : 0;
        const max = maxStr ? parseInt(maxStr, 10) : Infinity;
        if (p.rent_price < min || p.rent_price > max) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.rent_price - b.rent_price;
      if (sortBy === 'price_high') return b.rent_price - a.rent_price;
      // Default: featured first then verified
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return 0;
    });
  }, [purpose, selectedCityLabel, selectedType, selectedBudget, sortBy]);

  const hasActiveFilters =
    purpose !== 'all' ||
    selectedCityLabel !== 'All Cities' ||
    selectedType !== '' ||
    selectedBudget !== '';

  const resetAllFilters = () => {
    setPurpose('all');
    setSelectedCityLabel('All Cities');
    setSelectedType('');
    setSelectedBudget('');
    setSortBy('verified_first');
  };

  const budgets = BUDGET_OPTIONS[purpose];

  return (
    <div className="bg-paper min-h-screen text-ink">
      <div className="container-x py-8 sm:py-12 lg:py-16">
        {/* Header matching RentOra homepage */}
        <div className="max-w-3xl">
          <p className="text-[13px] sm:text-[14px] font-semibold text-ink-600">
            Enugu · Onitsha · Awka · Owerri · Aba · Asaba
          </p>

          <h1 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl tracking-[-0.01em] text-ink">
            Verified homes in the East, at the{' '}
            <span className="relative inline-block">
              <span className="relative z-10">owner’s real price.</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 260 18"
                className="absolute -bottom-1 left-0 -z-0 h-3 w-full text-amber-300"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 13 C 70 3, 190 4, 258 11"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-3 sm:mt-4 text-[15px] sm:text-[17px] text-ink-600 leading-relaxed">
            Every listing below is document-verified with direct landlord mandates. No touts, zero inspection fees, and every fee disclosed before you step out to view.
          </p>
        </div>

        {/* Purpose Tabs: All / Rent / Buy */}
        <div className="mt-8 sm:mt-10 flex items-center gap-6 sm:gap-8 border-b border-ink/10" role="tablist">
          {[
            { id: 'all', label: 'All listings' },
            { id: 'rent', label: 'For rent' },
            { id: 'sale', label: 'For sale' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={purpose === tab.id}
              onClick={() => setPurpose(tab.id as any)}
              className={`relative pb-3 text-[15px] sm:text-[16px] font-semibold transition-colors ${
                purpose === tab.id ? 'text-ink' : 'text-ink-600 hover:text-ink'
              }`}
            >
              {tab.label}
              <span
                className={`absolute inset-x-0 -bottom-px h-[3px] rounded-full bg-amber-400 transition-opacity ${
                  purpose === tab.id ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Filter Dock (styled like HomeSearch) */}
        <div className="mt-6 rounded-2xl border border-ink/10 bg-white p-2 sm:p-2.5 shadow-[0_18px_50px_-24px_rgba(22,20,15,0.18)]">
          <div className="grid grid-cols-1 divide-y divide-ink/10 sm:grid-cols-3 lg:grid-cols-4 sm:divide-x sm:divide-y-0">
            {/* Where / City */}
            <label className="relative px-4 py-3 sm:py-2.5 cursor-pointer">
              <span className="block text-[12px] font-medium text-ink-600">Where</span>
              <select
                value={selectedCityLabel}
                onChange={(e) => setSelectedCityLabel(e.target.value)}
                className="mt-0.5 w-full appearance-none bg-transparent pr-6 text-[15px] sm:text-[16px] font-semibold text-ink focus:outline-none cursor-pointer"
              >
                {CITIES.map((c) => (
                  <option key={c.label} value={c.label}>
                    {c.label === 'All Cities' ? 'Anywhere in the East' : c.label}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 12 12"
                className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-ink-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </label>

            {/* Type */}
            <label className="relative px-4 py-3 sm:py-2.5 cursor-pointer">
              <span className="block text-[12px] font-medium text-ink-600">Property Type</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="mt-0.5 w-full appearance-none bg-transparent pr-6 text-[15px] sm:text-[16px] font-semibold text-ink focus:outline-none cursor-pointer"
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t.label} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 12 12"
                className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-ink-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </label>

            {/* Budget */}
            <label className="relative px-4 py-3 sm:py-2.5 cursor-pointer">
              <span className="block text-[12px] font-medium text-ink-600">Budget</span>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="mt-0.5 w-full appearance-none bg-transparent pr-6 text-[15px] sm:text-[16px] font-semibold text-ink focus:outline-none cursor-pointer"
              >
                {budgets.map((b) => (
                  <option key={b.label} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 12 12"
                className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-ink-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </label>

            {/* Sort Dropdown */}
            <label className="relative px-4 py-3 sm:py-2.5 cursor-pointer">
              <span className="block text-[12px] font-medium text-ink-600">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="mt-0.5 w-full appearance-none bg-transparent pr-6 text-[15px] sm:text-[16px] font-semibold text-ink focus:outline-none cursor-pointer"
              >
                <option value="verified_first">Verified & Featured First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
              <svg
                viewBox="0 0 12 12"
                className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-ink-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </label>
          </div>
        </div>

        {/* Quick City Filter Pills (Tap to switch) */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[12px] font-medium text-ink-600 shrink-0 pr-1">Popular:</span>
          {CITIES.map((c) => {
            const isActive = selectedCityLabel === c.label;
            return (
              <button
                key={c.label}
                type="button"
                onClick={() => setSelectedCityLabel(c.label)}
                className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all shrink-0 ${
                  isActive
                    ? 'bg-ink text-white shadow-sm'
                    : 'bg-white border border-ink/10 text-ink hover:border-ink/30 hover:bg-paper-100'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Active Filters Bar & Count */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[14px] sm:text-[15px] font-semibold text-ink">
              Showing {filtered.length} verified {filtered.length === 1 ? 'property' : 'properties'}
            </span>

            {hasActiveFilters && (
              <>
                <span className="text-ink-600 text-[13px]">·</span>
                {purpose !== 'all' && (
                  <button
                    onClick={() => setPurpose('all')}
                    className="inline-flex items-center gap-1.5 rounded-full bg-paper-100 border border-ink/10 px-2.5 py-0.5 text-[12px] font-medium text-ink hover:bg-paper-200"
                  >
                    <span>{purpose === 'rent' ? 'For Rent' : 'For Sale'}</span>
                    <span className="text-ink-600">✕</span>
                  </button>
                )}
                {selectedCityLabel !== 'All Cities' && (
                  <button
                    onClick={() => setSelectedCityLabel('All Cities')}
                    className="inline-flex items-center gap-1.5 rounded-full bg-paper-100 border border-ink/10 px-2.5 py-0.5 text-[12px] font-medium text-ink hover:bg-paper-200"
                  >
                    <span>{selectedCityLabel}</span>
                    <span className="text-ink-600">✕</span>
                  </button>
                )}
                {selectedType && (
                  <button
                    onClick={() => setSelectedType('')}
                    className="inline-flex items-center gap-1.5 rounded-full bg-paper-100 border border-ink/10 px-2.5 py-0.5 text-[12px] font-medium text-ink hover:bg-paper-200"
                  >
                    <span>{PROPERTY_TYPES.find((t) => t.value === selectedType)?.label}</span>
                    <span className="text-ink-600">✕</span>
                  </button>
                )}
                {selectedBudget && (
                  <button
                    onClick={() => setSelectedBudget('')}
                    className="inline-flex items-center gap-1.5 rounded-full bg-paper-100 border border-ink/10 px-2.5 py-0.5 text-[12px] font-medium text-ink hover:bg-paper-200"
                  >
                    <span>{budgets.find((b) => b.value === selectedBudget)?.label}</span>
                    <span className="text-ink-600">✕</span>
                  </button>
                )}
                <button
                  onClick={resetAllFilters}
                  className="text-[12px] font-semibold text-amber-700 hover:text-amber-800 underline decoration-amber-400 decoration-1 underline-offset-2 ml-1"
                >
                  Clear all
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 text-[12px] font-medium text-forest-700">
            <span className="inline-block h-2 w-2 rounded-full bg-forest-600"></span>
            <span>₦0 Viewing Fee Guarantee</span>
          </div>
        </div>

        {/* Results Grid matching homepage 'New this week' */}
        {filtered.length > 0 ? (
          <div className="mt-8 sm:mt-10 grid gap-y-10 sm:gap-x-6 sm:gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-3xl border border-ink/10 bg-white p-10 text-center shadow-sm max-w-lg mx-auto">
            <div className="h-12 w-12 rounded-full bg-paper-100 text-ink-600 mx-auto flex items-center justify-center font-serif text-lg">
              0
            </div>
            <h3 className="mt-4 font-serif text-xl font-bold text-ink">
              No verified listings match your filters
            </h3>
            <p className="mt-2 text-[14px] text-ink-600 leading-relaxed">
              We couldn’t find any verified homes matching your selected city or budget. Try clearing your filters to explore all available properties.
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-ink px-6 py-2.5 text-[14px] font-semibold text-white transition-all hover:bg-ink-800"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Authentic Uli Line Divider */}
        <UliLine id="uli-catalogue-bottom" className="my-14 sm:my-20 block h-4 w-full text-amber-500/70" />

        {/* Landlord Callout Box matching Homepage styling */}
        <div className="rounded-3xl bg-ink p-6 sm:p-10 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] items-center">
            <div>
              <p className="text-[13px] sm:text-[14px] font-semibold text-amber-300">
                Are you a landlord or verified property manager?
              </p>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl">
                List your property in the East without middleman markups.
              </h2>
              <p className="mt-3 text-[14px] sm:text-[15px] text-white/75 max-w-xl leading-relaxed">
                Submit your direct mandate and ownership papers for review. We approve genuine listings within 24–48 hours and connect you directly to verified tenants and buyers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                href="/register?role=landlord"
                className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-6 py-3 text-[15px] font-semibold text-ink shadow-sm transition-all hover:bg-amber-300 active:scale-[0.99] text-center"
              >
                List your property for free →
              </Link>
              <Link
                href="/register?role=agent"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-white/10 text-center"
              >
                Join as registered agent
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PropertiesCataloguePage() {
  return (
    <Suspense
      fallback={
        <div className="bg-paper min-h-screen text-ink">
          <div className="container-x py-16 text-center">
            <p className="text-ink-600 font-medium">Loading verified properties...</p>
          </div>
        </div>
      }
    >
      <PropertiesCatalogueContent />
    </Suspense>
  );
}
