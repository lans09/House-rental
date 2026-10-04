'use client';

import React, { useState } from 'react';

export function HeroSearchDock() {
  const [activeTab, setActiveTab] = useState<'rent' | 'sale'>('rent');
  const [propertyType, setPropertyType] = useState('all');
  const [location, setLocation] = useState('Independence Layout, Enugu');
  const [priceRange, setPriceRange] = useState('1500000-6000000');

  const getStateFromLocation = (loc: string) => {
    if (loc.includes('Enugu')) return 'Enugu';
    if (loc.includes('Anambra') || loc.includes('Onitsha') || loc.includes('Awka')) return 'Anambra';
    if (loc.includes('Imo') || loc.includes('Owerri')) return 'Imo';
    if (loc.includes('Abia') || loc.includes('Aba')) return 'Abia';
    if (loc.includes('Delta') || loc.includes('Asaba')) return 'Delta';
    return 'All';
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3">
      {/* Simplified Dual-Mode Selector: Rent vs Buy */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setActiveTab('rent');
            setPriceRange('1500000-6000000');
          }}
          className={`px-6 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
            activeTab === 'rent'
              ? 'bg-white text-stone-950 font-bold shadow-lg border border-white'
              : 'bg-black/50 backdrop-blur-sm text-stone-300 hover:text-white border border-white/10 font-medium'
          }`}
        >
          For Rent
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('sale');
            setPriceRange('60000000-150000000');
          }}
          className={`px-6 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
            activeTab === 'sale'
              ? 'bg-white text-stone-950 font-bold shadow-lg border border-white'
              : 'bg-black/50 backdrop-blur-sm text-stone-300 hover:text-white border border-white/10 font-medium'
          }`}
        >
          For Sale
        </button>
      </div>

      {/* Glassmorphic Search Dock */}
      <form
        action="/properties"
        method="GET"
        className="bg-black/75 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl text-left grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
      >
        <input type="hidden" name="purpose" value={activeTab} />
        <input type="hidden" name="state" value={getStateFromLocation(location)} />

        {/* Field 1: Property Type */}
        <div className="sm:col-span-3 px-3 py-1.5 border-b sm:border-b-0 sm:border-r border-white/15 relative">
          <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-300 mb-0.5">
            Property Type
          </label>
          <div className="relative">
            <select
              name="type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full bg-transparent text-white font-bold text-sm appearance-none focus:outline-none cursor-pointer pr-5"
            >
              <option value="all" className="text-stone-900 bg-white">All Properties</option>
              <option value="duplex" className="text-stone-900 bg-white">Duplexes & Mansions</option>
              <option value="flat_apartment" className="text-stone-900 bg-white">Flats & Apartments</option>
              <option value="self_contain" className="text-stone-900 bg-white">Self-Contained (Self-con)</option>
              <option value="commercial" className="text-stone-900 bg-white">Commercial & Plaza</option>
            </select>
            <span className="absolute right-0 top-1 text-stone-300 pointer-events-none text-xs">▼</span>
          </div>
        </div>

        {/* Field 2: Eastern Nigeria Location */}
        <div className="sm:col-span-4 px-3 py-1.5 border-b sm:border-b-0 sm:border-r border-white/15">
          <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-300 mb-0.5">
            City or Enclave
          </label>
          <div className="relative">
            <select
              name="area"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent text-white font-bold text-sm appearance-none focus:outline-none cursor-pointer pr-5"
            >
              <option value="Independence Layout, Enugu" className="text-stone-900 bg-white">Independence Layout, Enugu</option>
              <option value="GRA Onitsha, Anambra" className="text-stone-900 bg-white">GRA Onitsha, Anambra</option>
              <option value="Ngozika Housing Estate, Awka" className="text-stone-900 bg-white">Ngozika Housing Estate, Awka</option>
              <option value="New Owerri, Imo" className="text-stone-900 bg-white">New Owerri (Area A-H), Imo</option>
              <option value="Enugu GRA, Enugu" className="text-stone-900 bg-white">Enugu GRA (Polo Park Enclave)</option>
              <option value="Trans-Ekulu, Enugu" className="text-stone-900 bg-white">Trans-Ekulu, Enugu</option>
              <option value="Ikenegbu Layout, Owerri" className="text-stone-900 bg-white">Ikenegbu Layout, Owerri</option>
              <option value="3-3 Nkwelle, Onitsha" className="text-stone-900 bg-white">3-3 Nkwelle Ezunaka, Onitsha</option>
              <option value="Aba GRA, Abia" className="text-stone-900 bg-white">Aba GRA, Abia State</option>
              <option value="Asaba GRA, Delta" className="text-stone-900 bg-white">Asaba GRA (Niger Bridge Axis)</option>
            </select>
            <span className="absolute right-0 top-1 text-stone-300 pointer-events-none text-xs">▼</span>
          </div>
        </div>

        {/* Field 3: Budget Range (Contextual to Rent vs Buy) */}
        <div className="sm:col-span-3 px-3 py-1.5">
          <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-300 mb-0.5">
            {activeTab === 'rent' ? 'Annual Budget' : 'Purchase Budget'}
          </label>
          <div className="relative">
            {activeTab === 'rent' ? (
              <select
                name="price_range"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-transparent text-white font-bold text-sm appearance-none focus:outline-none cursor-pointer pr-5"
              >
                <option value="800000-2000000" className="text-stone-900 bg-white">₦800k - ₦2.0M / yr</option>
                <option value="2000000-5000000" className="text-stone-900 bg-white">₦2.0M - ₦5.0M / yr</option>
                <option value="5000000-12000000" className="text-stone-900 bg-white">₦5.0M - ₦12.0M / yr</option>
                <option value="12000000-30000000" className="text-stone-900 bg-white">₦12.0M+ (Luxury)</option>
              </select>
            ) : (
              <select
                name="price_range"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-transparent text-white font-bold text-sm appearance-none focus:outline-none cursor-pointer pr-5"
              >
                <option value="30000000-60000000" className="text-stone-900 bg-white">₦30M - ₦60M (Starter)</option>
                <option value="60000000-120000000" className="text-stone-900 bg-white">₦60M - ₦120M (Executive)</option>
                <option value="120000000-250000000" className="text-stone-900 bg-white">₦120M - ₦250M (Prime)</option>
                <option value="250000000-800000000" className="text-stone-900 bg-white">₦250M+ (Luxury Estate)</option>
              </select>
            )}
            <span className="absolute right-0 top-1 text-stone-300 pointer-events-none text-xs">▼</span>
          </div>
        </div>

        {/* Field 4: Action Button */}
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl sm:rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono font-bold text-xs tracking-wider uppercase transition-all shadow-xl shadow-black/40 flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Search Homes →</span>
          </button>
        </div>
      </form>
    </div>
  );
}
