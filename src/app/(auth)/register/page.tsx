'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

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
        `Registration submitted for ${selectedAudience === 'seeker' ? 'HOME SEEKER' : 'PROPERTY OWNER / AGENT'}! Please connect your live Supabase credentials in .env.local to activate.`
      );
    }, 1000);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 sm:py-16 bg-paper">
      <div className="max-w-xl w-full bg-white rounded-3xl border border-ink/10 p-8 sm:p-10 shadow-[0_18px_50px_-24px_rgba(22,20,15,0.18)] space-y-7">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-2">
            <Logo />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-ink tracking-tight">
            Create your account
          </h1>
          <p className="text-[14px] text-ink-600 max-w-sm mx-auto leading-relaxed">
            Direct real estate across Eastern Nigeria. Zero agent markups, no inspection fees, and verified titles.
          </p>
        </div>

        {/* Dual-Audience Selector: Seeker vs Owner/Agent */}
        <div className="space-y-2">
          <label className="block text-[13px] font-semibold text-ink">
            I am joining as:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Seeker Option */}
            <button
              type="button"
              onClick={() => setSelectedAudience('seeker')}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                selectedAudience === 'seeker'
                  ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-400/40 shadow-sm'
                  : 'border-ink/10 bg-white hover:bg-paper-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-semibold text-amber-800">
                  Home Seeker
                </span>
                {selectedAudience === 'seeker' && (
                  <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                )}
              </div>
              <div>
                <p className="text-[15px] font-semibold text-ink">Looking for a home</p>
                <p className="text-[12px] text-ink-600 mt-0.5">Rent or buy at locked rates with ₦0 viewing fees</p>
              </div>
            </button>

            {/* Owner/Agent Option */}
            <button
              type="button"
              onClick={() => setSelectedAudience('owner')}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                selectedAudience === 'owner'
                  ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-400/40 shadow-sm'
                  : 'border-ink/10 bg-white hover:bg-paper-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-semibold text-amber-800">
                  Landlord / Agent
                </span>
                {selectedAudience === 'owner' && (
                  <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                )}
              </div>
              <div>
                <p className="text-[15px] font-semibold text-ink">Listing a property</p>
                <p className="text-[12px] text-ink-600 mt-0.5">Direct mandate review & zero listing fees</p>
              </div>
            </button>
          </div>
        </div>

        {/* Dynamic Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-ink mb-1.5">
                First Name
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Chidi"
                className="w-full px-4 py-2.5 bg-paper-100 border border-ink/10 rounded-xl text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-ink-400"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-ink mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Okafor"
                className="w-full px-4 py-2.5 bg-paper-100 border border-ink/10 rounded-xl text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-ink-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-ink mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="chidi@example.com"
                className="w-full px-4 py-2.5 bg-paper-100 border border-ink/10 rounded-xl text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-ink-400"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-ink mb-1.5">
                WhatsApp Phone
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0803 000 0000"
                className="w-full px-4 py-2.5 bg-paper-100 border border-ink/10 rounded-xl text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-ink-400"
              />
            </div>
          </div>

          {selectedAudience === 'owner' && (
            <div className="p-4 bg-paper-100 rounded-2xl border border-ink/10 space-y-4">
              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1.5">
                  Business or Agency Name (Optional for private owners)
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Eze & Partners Realty"
                  className="w-full px-4 py-2.5 bg-white border border-ink/10 rounded-xl text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-ink-400"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1.5">
                  Primary Market City
                </label>
                <select
                  value={propertyCity}
                  onChange={(e) => setPropertyCity(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-ink/10 rounded-xl text-[15px] text-ink font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Enugu">Enugu (Independence Layout, GRA, Trans-Ekulu)</option>
                  <option value="Onitsha">Onitsha (GRA, 3-3, Trans-Nkisi)</option>
                  <option value="Awka">Awka (Ngozika, Ifite, Iyi-Agu)</option>
                  <option value="Owerri">Owerri (New Owerri, World Bank, Ikenegbu)</option>
                  <option value="Aba">Aba (Aba GRA, Umungasi)</option>
                  <option value="Asaba">Asaba (Asaba GRA, Summit Road)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 text-[12px] text-forest-800">
                <span className="font-bold">✓</span>
                <span>Proof of direct mandate will be requested upon listing creation.</span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-[13px] font-semibold text-ink mb-1.5">
              Choose Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full px-4 py-2.5 bg-paper-100 border border-ink/10 rounded-xl text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-ink-400"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-ink hover:bg-ink-800 text-white font-semibold text-[15px] rounded-xl shadow-sm transition-all disabled:opacity-50 mt-2"
          >
            {isLoading
              ? 'Creating account...'
              : selectedAudience === 'seeker'
              ? 'Join as Home Seeker →'
              : 'Register to List Properties →'}
          </button>

          <p className="text-[12px] text-ink-600 text-center leading-relaxed">
            By creating an account, you agree to RentOra’s verified mandate policy and ₦0 inspection fee guarantee.
          </p>
        </form>

        <div className="pt-4 border-t border-ink/10 text-center text-[13px] text-ink-600">
          Already registered?{' '}
          <Link href="/login" className="font-semibold text-amber-700 hover:text-amber-800">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
