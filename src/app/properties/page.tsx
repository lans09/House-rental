'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PropertyCard } from '@/components/PropertyCard';
import { UliLine } from '@/components/UliLine';
import { ALL_PROPERTIES, PropertyDetail } from '@/data/properties';
import { HouseOneStore } from '@/lib/admin-store';

const CITIES = [
  { label: 'All Cities', state: '', area: '' },
  { label: 'Enugu', state: 'Enugu', area: '' },
  { label: 'Onitsha', state: 'Anambra', area: 'Onitsha' },
  { label: 'Awka', state: 'Anambra', area: 'Awka' },
  { label: 'Owerri', state: 'Imo', area: '' },
  { label: 'Aba', state: 'Abia', area: '' },
  { label: 'Asaba', state: 'Delta', area: 'Asaba' },
  { label: 'Port Harcourt', state: 'Rivers', area: '' },
  { label: 'Lagos', state: 'Lagos', area: '' },
  { label: 'Abuja', state: 'Abuja (FCT)', area: '' },
  { label: 'Uyo', state: 'Akwa Ibom', area: '' },
];

const PROPERTY_TYPES = [
  { value: '', label: 'All property types' },
  { value: 'flat_apartment', label: 'Flat / Apartment' },
  { value: 'duplex', label: 'Duplex & Terraced' },
  { value: 'detached_mansion', label: 'Detached Mansion' },
  { value: 'land', label: 'Land' },
];

const BUDGET_OPTIONS = [
  { value: '', label: 'Any annual rent' },
  { value: '0-1500000', label: 'Under ₦1.5m / year' },
  { value: '1500000-3000000', label: '₦1.5m – ₦3m / year' },
  { value: '3000000-6000000', label: '₦3m – ₦6m / year' },
  { value: '6000000-12000000', label: '₦6m – ₦12m / year' },
  { value: '12000000-', label: '₦12m+ / year' },
];

const INFRASTRUCTURE_FILTERS = [
  { id: 'prepaid', label: 'Dedicated Prepaid Meter' },
  { id: 'band_a', label: 'DisCo Band A (20+ hrs)' },
  { id: 'treated_water', label: 'Treated Borehole Water' },
  { id: 'flood_free', label: '100% Flood-Free Approach' },
];

function PropertiesCatalogueContent() {
  const searchParams = useSearchParams();
  const [liveProperties, setLiveProperties] = useState<PropertyDetail[]>(ALL_PROPERTIES);

  useEffect(() => {
    const sync = () => {
      const published = HouseOneStore.getPublishedPropertyDetails();
      if (published.length > 0) {
        setLiveProperties(published);
      }
    };
    sync();
    window.addEventListener('houseone-store-updated', sync);
    return () => window.removeEventListener('houseone-store-updated', sync);
  }, []);

  // Initialize from searchParams
  const initialPurpose = (searchParams.get('purpose') as 'rent' | 'sale') || 'all';
  const initialState = searchParams.get('state') || '';
  const initialArea = searchParams.get('area') || '';
  const initialType = searchParams.get('type') || '';
  const initialBudget = searchParams.get('price_range') || '';
  const initialQuery = searchParams.get('q') || searchParams.get('address') || '';

  const [purpose, setPurpose] = useState<'all' | 'rent' | 'sale'>(initialPurpose);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
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
  const [selectedInfra, setSelectedInfra] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('verified_first');

  const toggleInfra = (id: string) => {
    setSelectedInfra((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filtered properties
  const filtered = useMemo(() => {
    return liveProperties.filter((p) => {
      // Freeform address / keyword query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          p.title.toLowerCase().includes(q) ||
          p.street_address.toLowerCase().includes(q) ||
          p.area.toLowerCase().includes(q) ||
          p.lga.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q) ||
          p.landmark.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

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

      // Nigerian Infrastructure filters
      if (selectedInfra.length > 0) {
        const allAmenities = (p.amenities || []).map((f: string) => f.toLowerCase());
        if (selectedInfra.includes('prepaid')) {
          const hasPrepaid = allAmenities.some((f: string) => f.includes('prepaid') || f.includes('meter') || f.includes('token'));
          if (!hasPrepaid) return false;
        }
        if (selectedInfra.includes('band_a')) {
          const hasBandA = allAmenities.some((f: string) => f.includes('band a') || f.includes('20+'));
          if (!hasBandA) return false;
        }
        if (selectedInfra.includes('treated_water')) {
          const hasWater = allAmenities.some((f: string) => f.includes('treated') || f.includes('borehole') || f.includes('filtration'));
          if (!hasWater) return false;
        }
        if (selectedInfra.includes('flood_free')) {
          const hasFlood = allAmenities.some((f: string) => f.includes('flood') || f.includes('tarred') || f.includes('paved'));
          if (!hasFlood) return false;
        }
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
  }, [liveProperties, searchQuery, purpose, selectedCityLabel, selectedType, selectedBudget, selectedInfra, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    purpose !== 'all' ||
    selectedCityLabel !== 'All Cities' ||
    selectedType !== '' ||
    selectedBudget !== '' ||
    selectedInfra.length > 0;

  const resetAllFilters = () => {
    setSearchQuery('');
    setPurpose('all');
    setSelectedCityLabel('All Cities');
    setSelectedType('');
    setSelectedBudget('');
    setSelectedInfra([]);
    setSortBy('verified_first');
  };

  return (
    <div className="bg-paper min-h-screen text-ink">
      <div className="container-x py-8 sm:py-12 lg:py-16">
        {/* Editorial Header */}
        <div className="max-w-3xl">
          <p className="text-[13px] sm:text-[14px] font-semibold text-ink-600">
            Enugu · Onitsha · Awka · Owerri · Aba · Asaba · Port Harcourt · Lagos · Abuja · Uyo · <span className="text-amber-600 font-bold">...</span>
          </p>

          <h1 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl tracking-[-0.01em] text-ink">
            Verified homes, at the{' '}
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

        {/* Purpose Tabs: Verified Rentals */}
        <div className="mt-8 sm:mt-10 flex items-center gap-6 sm:gap-8 border-b border-ink/10" role="tablist">
          {[
            { id: 'all', label: 'All verified rentals' },
            { id: 'rent', label: 'Annual leases' },
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
                    {c.label}
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
              <span className="block text-[12px] font-medium text-ink-600">Annual Rent</span>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="mt-0.5 w-full appearance-none bg-transparent pr-6 text-[15px] sm:text-[16px] font-semibold text-ink focus:outline-none cursor-pointer"
              >
                {BUDGET_OPTIONS.map((b) => (
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
                <option value="verified_first">Verified &amp; Featured First</option>
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

        {/* Infrastructure Filter Chips (Nigerian Reality) */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[12px] font-semibold text-ink-800 shrink-0 pr-1">Verify:</span>
          {INFRASTRUCTURE_FILTERS.map((item) => {
            const isSelected = selectedInfra.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleInfra(item.id)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-forest-800 text-white shadow-sm ring-1 ring-forest-900'
                    : 'bg-white border border-ink/15 text-ink-600 hover:text-ink hover:border-ink/30'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-300' : 'bg-ink/30'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
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
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-300 px-2.5 py-0.5 text-[12px] font-medium text-amber-900 hover:bg-amber-100"
                  >
                    <span>Address/Keyword: "{searchQuery}"</span>
                    <span className="text-amber-700">✕</span>
                  </button>
                )}
                {purpose !== 'all' && (
                  <button
                    onClick={() => setPurpose('all')}
                    className="inline-flex items-center gap-1.5 rounded-full bg-paper-100 border border-ink/10 px-2.5 py-0.5 text-[12px] font-medium text-ink hover:bg-paper-200"
                  >
                    <span>Verified Rental</span>
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
                    <span>{BUDGET_OPTIONS.find((b) => b.value === selectedBudget)?.label}</span>
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
                Submit your direct mandate and ownership papers for review. We approve genuine listings within 24–48 hours and connect you directly to verified tenants.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                href="/list-property"
                className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-6 py-3 text-[15px] font-semibold text-ink shadow-sm transition-all hover:bg-amber-300 active:scale-[0.99] text-center"
              >
                Submit a property dossier →
              </Link>
              <Link
                href="/register?role=landlord&redirect=/list-property"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-white/10 text-center"
              >
                Create Landlord / Agent Account
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
