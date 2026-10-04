'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [selectedAudience, setSelectedAudience] = useState<'seeker' | 'owner'>('seeker');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [propertyCity, setPropertyCity] = useState('Enugu');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(
        `Account registration submitted for ${selectedAudience === 'seeker' ? 'HOME SEEKER' : 'PROPERTY OWNER / AGENT'}! Please connect your live Supabase credentials in .env.local to activate.`
      );
    }, 1000);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-stone-50">
      <div className="max-w-xl w-full bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 shadow-xl space-y-7">
        {/* Brand Header with Restored Architectural House Emblem */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-2.5 justify-center mb-1">
            <div className="h-10 w-10 rounded-xl bg-amber-500 flex items-center justify-center text-stone-950 shadow-md">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 10.5L12 3l9 7.5" />
                <path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
                <path d="M9 21V12h6v9" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-black tracking-tight text-stone-950 font-serif">
                Rent<span className="text-amber-500">Ora</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-stone-500 uppercase -mt-1 font-bold">
                Eastern Nigeria
              </span>
            </div>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-950 font-serif tracking-tight">
            Create Your Account
          </h2>
          <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
            Direct real estate across Eastern Nigeria. Zero agent markups, no inspection fees, and verified titles.
          </p>
        </div>

        {/* Streamlined Dual-Audience Selector: Seeker vs Owner/Agent */}
        <div className="space-y-2">
          <label className="block text-xs font-mono font-bold text-stone-800 uppercase tracking-wider">
            I am joining as:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Seeker Option */}
            <button
              type="button"
              onClick={() => setSelectedAudience('seeker')}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                selectedAudience === 'seeker'
                  ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-400 shadow-sm'
                  : 'border-stone-200 bg-white hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-700">
                  Home Seeker
                </span>
                {selectedAudience === 'seeker' && (
                  <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-950 font-serif">Want to Rent or Buy</h4>
                <p className="text-[11px] text-stone-600 leading-tight mt-1">
                  Find verified homes, view locked owner rates, and book free inspections.
                </p>
              </div>
            </button>

            {/* Owner/Agent Option */}
            <button
              type="button"
              onClick={() => setSelectedAudience('owner')}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                selectedAudience === 'owner'
                  ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-400 shadow-sm'
                  : 'border-stone-200 bg-white hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-700">
                  Landlord / Agent
                </span>
                {selectedAudience === 'owner' && (
                  <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-950 font-serif">Have Houses to Put Up</h4>
                <p className="text-[11px] text-stone-600 leading-tight mt-1">
                  List for rent or sale. Fast document verification and direct qualified seekers.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono font-bold text-stone-700 uppercase mb-1">First Name</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="e.g. Chukwuma"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-[16px] sm:text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-stone-700 uppercase mb-1">Last Name</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="e.g. Okoye"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-[16px] sm:text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono font-bold text-stone-700 uppercase mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="chukwuma@example.com"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-[16px] sm:text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-stone-700 uppercase mb-1">Nigerian Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 803 123 4567"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-[16px] sm:text-xs text-stone-900 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Conditional Fields for Landlords & Agents */}
          {selectedAudience === 'owner' && (
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-950 font-serif">
                <span>Property Owner / Agency Details</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-stone-700 uppercase mb-1">Owner Name / Agency</label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Chief Eze / Coal City Realty"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-[16px] sm:text-xs text-stone-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-stone-700 uppercase mb-1">Primary Eastern City</label>
                  <select
                    value={propertyCity}
                    onChange={(e) => setPropertyCity(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-[16px] sm:text-xs text-stone-900 focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Enugu">Enugu (Independence Layout, GRA)</option>
                    <option value="Onitsha">Onitsha (GRA, Trans-Nkisi)</option>
                    <option value="Awka">Awka (Ngozika, Iyi-Agu)</option>
                    <option value="Owerri">Owerri (New Owerri, Works)</option>
                    <option value="Aba">Aba (Aba GRA)</option>
                    <option value="Asaba">Asaba (GRA, Summit Road)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-mono font-bold text-stone-700 uppercase mb-1">Create Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-[16px] sm:text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="text-[11px] text-stone-500 leading-relaxed font-mono">
            By creating an account, you agree to RentOra's verified pricing SLA and ₦0 inspection fee guarantee.
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : selectedAudience === 'seeker' ? 'Create Seeker Account →' : 'Register Property Owner Account →'}
          </button>
        </form>

        <div className="pt-3 border-t border-stone-100 text-center text-xs text-stone-600">
          Already registered on RentOra?{' '}
          <Link href="/login" className="font-bold text-amber-700 hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
