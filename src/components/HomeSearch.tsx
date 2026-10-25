'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Mode = 'rent' | 'sale';

interface SearchSuggestion {
  title: string;
  subtitle: string;
  type: 'address' | 'area' | 'city';
  query: string;
}

const POPULAR_SUGGESTIONS: SearchSuggestion[] = [
  { title: 'Independence Layout', subtitle: 'Enugu North, Enugu', type: 'area', query: 'Independence Layout' },
  { title: 'GRA Onitsha', subtitle: 'Ridgeway Drive corridor, Anambra', type: 'area', query: 'GRA Onitsha' },
  { title: 'New Owerri', subtitle: 'World Bank Estate, Imo', type: 'area', query: 'New Owerri' },
  { title: 'Ngozika Housing Estate', subtitle: 'Phase 2, Awka, Anambra', type: 'area', query: 'Ngozika Housing Estate' },
  { title: 'Plot 14, Presidential Blvd', subtitle: 'Independence Layout, Enugu', type: 'address', query: 'Presidential Boulevard' },
  { title: 'Trans-Ekulu', subtitle: 'Upper Damija Enclave, Enugu', type: 'area', query: 'Trans-Ekulu' },
  { title: 'Asaba GRA', subtitle: 'Summit Road corridor, Delta', type: 'area', query: 'Asaba GRA' },
  { title: 'Aba GRA', subtitle: 'Brass Street, Abia', type: 'area', query: 'Aba GRA' },
  { title: 'Old GRA', subtitle: 'Harley Street, Port Harcourt, Rivers', type: 'area', query: 'Old GRA' },
  { title: 'Lekki Phase 1', subtitle: 'Admiralty Way corridor, Lagos', type: 'area', query: 'Lekki Phase 1' },
  { title: 'Maitama', subtitle: 'Gana Street Enclave, Abuja (FCT)', type: 'area', query: 'Maitama' },
  { title: 'Enugu', subtitle: 'All verified enclaves in Enugu State', type: 'city', query: 'Enugu' },
  { title: 'Onitsha', subtitle: 'Commercial & luxury residential corridor', type: 'city', query: 'Onitsha' },
  { title: 'Owerri', subtitle: 'Imo State capital verified homes', type: 'city', query: 'Owerri' },
  { title: 'Port Harcourt', subtitle: 'Rivers State prime estates', type: 'city', query: 'Port Harcourt' },
  { title: 'Lagos', subtitle: 'Island and mainland vetted properties', type: 'city', query: 'Lagos' },
  { title: 'Abuja', subtitle: 'Federal Capital Territory diplomatic zones', type: 'city', query: 'Abuja' },
];

const TYPES: Record<Mode, { value: string; label: string }[]> = {
  rent: [
    { value: '', label: 'All types' },
    { value: 'flat_apartment', label: 'Flat / Unit' },
    { value: 'duplex', label: 'Duplex' },
    { value: 'detached_mansion', label: 'Mansion' },
  ],
  sale: [
    { value: '', label: 'All types' },
    { value: 'duplex', label: 'Duplex' },
    { value: 'detached_mansion', label: 'Mansion' },
    { value: 'flat_apartment', label: 'Flat' },
    { value: 'land', label: 'Land' },
  ],
};

export function HomeSearch() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('rent');
  const [query, setQuery] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter suggestions dynamically
  const filteredSuggestions = query.trim()
    ? POPULAR_SUGGESTIONS.filter(
        (s) =>
          s.title.toLowerCase().includes(query.toLowerCase()) ||
          s.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          s.query.toLowerCase().includes(query.toLowerCase())
      )
    : POPULAR_SUGGESTIONS.slice(0, 6);

  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.title);
    setShowDropdown(false);
    const params = new URLSearchParams();
    params.set('purpose', mode);
    params.set('q', suggestion.query);
    if (propertyType) params.set('type', propertyType);
    router.push(`/properties?${params.toString()}`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDropdown(false);
    const params = new URLSearchParams();
    params.set('purpose', mode);
    if (query.trim()) params.set('q', query.trim());
    if (propertyType) params.set('type', propertyType);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-2xl relative" ref={containerRef}>
      {/* Suggestive Single-Input Search Dock */}
      <form
        onSubmit={handleFormSubmit}
        className="relative grid grid-cols-1 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white p-1.5 shadow-[0_18px_50px_-24px_rgba(22,20,15,0.35)] sm:grid-cols-[1fr_auto_auto] sm:divide-x sm:divide-y-0 items-center"
      >
        {/* Suggestive Input */}
        <div className="relative px-4 py-3 sm:py-2.5">
          <label htmlFor="home-address-search" className="block text-[12px] font-medium text-ink-600">
            Search Address, Enclave, or City
          </label>
          <div className="mt-0.5 flex items-center gap-2">
            <svg
              className="h-4 w-4 text-amber-600 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <input
              id="home-address-search"
              type="text"
              autoComplete="off"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="e.g. Independence Layout, GRA Onitsha, New Owerri..."
              className="w-full bg-transparent text-[16px] sm:text-[15px] font-semibold text-ink placeholder:text-ink-400 placeholder:font-normal focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-xs text-ink-400 hover:text-ink px-1"
                aria-label="Clear address query"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Quick Property Type Selector */}
        <div className="relative px-3 py-3 sm:py-2.5">
          <label htmlFor="home-type-select" className="block text-[12px] font-medium text-ink-600">
            Type
          </label>
          <select
            id="home-type-select"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="mt-0.5 appearance-none bg-transparent pr-6 text-[15px] font-semibold text-ink focus:outline-none cursor-pointer"
          >
            {TYPES[mode].map((t) => (
              <option key={t.label} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 12 12"
            className="pointer-events-none absolute right-3 top-1/2 mt-1 h-3 w-3 -translate-y-1/2 text-ink-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Search CTA Button */}
        <div className="p-1 sm:pl-2">
          <button
            type="submit"
            className="flex h-12 w-full sm:h-full items-center justify-center gap-2 rounded-xl bg-ink px-7 py-3 text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-ink-800 active:scale-[0.99] cursor-pointer"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Search</span>
          </button>
        </div>
      </form>

      {/* Suggestive Autocomplete Dropdown */}
      {showDropdown && filteredSuggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 z-40 rounded-2xl bg-white border border-ink/10 shadow-2xl overflow-hidden animate-fade-in divide-y divide-ink/5">
          <div className="px-4 py-2 bg-paper-100 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-ink-600">
            <span>Suggested Verified Locations</span>
            <span>Click to search</span>
          </div>

          <div className="max-h-72 overflow-y-auto">
            {filteredSuggestions.map((s, idx) => (
              <button
                key={`${s.title}-${idx}`}
                type="button"
                onClick={() => handleSelectSuggestion(s)}
                className="w-full px-4 py-3 text-left hover:bg-amber-50/70 flex items-center justify-between gap-3 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-8 w-8 rounded-lg bg-paper-100 flex items-center justify-center shrink-0 text-amber-700">
                    {s.type === 'address' ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    ) : s.type === 'area' ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    )}
                  </div>
                  <div className="truncate">
                    <p className="text-[14px] font-semibold text-ink truncate">{s.title}</p>
                    <p className="text-[12px] text-ink-600 truncate">{s.subtitle}</p>
                  </div>
                </div>

                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-paper-100 text-ink-600 shrink-0 uppercase">
                  {s.type}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
