'use client';

import React, { useState } from 'react';

type Mode = 'rent' | 'sale';

const CITIES = [
  { label: 'Anywhere in the East', state: '', area: '' },
  { label: 'Enugu', state: 'Enugu', area: '' },
  { label: 'Onitsha', state: 'Anambra', area: 'Onitsha' },
  { label: 'Awka', state: 'Anambra', area: 'Awka' },
  { label: 'Owerri', state: 'Imo', area: '' },
  { label: 'Aba', state: 'Abia', area: '' },
  { label: 'Asaba', state: 'Delta', area: 'Asaba' },
];

const TYPES: Record<Mode, { value: string; label: string }[]> = {
  rent: [
    { value: '', label: 'Any type' },
    { value: 'self_contain', label: 'Self-contain' },
    { value: 'flat_apartment', label: 'Flat' },
    { value: 'duplex', label: 'Duplex' },
  ],
  sale: [
    { value: '', label: 'Any type' },
    { value: 'flat_apartment', label: 'Flat' },
    { value: 'duplex', label: 'Duplex' },
    { value: 'land', label: 'Land' },
  ],
};

const BUDGETS: Record<Mode, { value: string; label: string }[]> = {
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

function Chevron() {
  return (
    <svg viewBox="0 0 12 12" className="pointer-events-none absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 text-ink-600" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HomeSearch() {
  const [mode, setMode] = useState<Mode>('rent');
  const [cityIdx, setCityIdx] = useState(0);
  const city = CITIES[cityIdx];

  const field = 'relative px-4 py-3 sm:py-2.5';
  const label = 'block text-[12px] font-medium text-ink-600';
  const select =
    'mt-0.5 w-full appearance-none bg-transparent pr-6 text-[16px] sm:text-[15px] font-semibold text-ink focus:outline-none cursor-pointer';

  return (
    <div className="w-full max-w-2xl">
      {/* Rent / Buy */}
      <div className="mb-3 flex items-center gap-6" role="tablist" aria-label="What are you looking for?">
        {(['rent', 'sale'] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`relative pb-2 text-[16px] sm:text-[15px] font-semibold transition-colors ${
              mode === m ? 'text-ink' : 'text-ink-600 hover:text-ink'
            }`}
          >
            {m === 'rent' ? 'Rent' : 'Buy'}
            <span
              className={`absolute inset-x-0 -bottom-px h-[3px] rounded-full bg-amber-400 transition-opacity ${
                mode === m ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </button>
        ))}
      </div>

      <form
        action="/properties"
        method="GET"
        className="grid grid-cols-1 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white p-1.5 shadow-[0_18px_50px_-24px_rgba(22,20,15,0.35)] sm:grid-cols-[1.2fr_1fr_1.1fr_auto] sm:divide-x sm:divide-y-0"
      >
        <input type="hidden" name="purpose" value={mode} />
        {city.state && <input type="hidden" name="state" value={city.state} />}
        {city.area && <input type="hidden" name="area" value={city.area} />}

        <label className={field}>
          <span className={label}>Where</span>
          <select className={select} value={cityIdx} onChange={(e) => setCityIdx(Number(e.target.value))}>
            {CITIES.map((c, i) => (
              <option key={c.label} value={i}>
                {c.label}
              </option>
            ))}
          </select>
          <Chevron />
        </label>

        <label className={field}>
          <span className={label}>Type</span>
          <select name="type" className={select} key={`type-${mode}`} defaultValue="">
            {TYPES[mode].map((t) => (
              <option key={t.label} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <Chevron />
        </label>

        <label className={field}>
          <span className={label}>Budget</span>
          <select name="price_range" className={select} key={`budget-${mode}`} defaultValue="">
            {BUDGETS[mode].map((b) => (
              <option key={b.label} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
          <Chevron />
        </label>

        <div className="p-1 sm:pl-2">
          <button
            type="submit"
            className="flex h-12 w-full sm:h-full items-center justify-center gap-2 rounded-xl bg-ink px-7 py-3 text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-ink-800 active:scale-[0.99]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
}
