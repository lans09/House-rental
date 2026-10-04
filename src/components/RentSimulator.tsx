'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function RentSimulator() {
  const [rent, setRent] = useState<number>(4500000);
  const [isServiced, setIsServiced] = useState<boolean>(true);

  // Nigerian Rental Standard Math
  const legalPct = 10;
  const agencyPct = 10;
  const cautionPct = 10;
  const serviceCharge = isServiced ? Math.round(rent * 0.15) : 0;
  const legalFee = (rent * legalPct) / 100;
  const agencyFee = (rent * agencyPct) / 100;
  const cautionFee = (rent * cautionPct) / 100;

  const totalMoveIn = rent + serviceCharge + cautionFee + legalFee + agencyFee;
  const multiplier = (totalMoveIn / rent).toFixed(2);

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-md p-6 sm:p-8 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Col: Explainer & Interactive Slider */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-[11px] font-mono font-bold tracking-wider uppercase">
              Transparent Calculation
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
              What does rent in Eastern Nigeria <span className="italic text-amber-600 font-serif">actually</span> cost?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl">
              In cities like Enugu, Onitsha, Awka, and Owerri, street agents often quote one base rent on the phone, then ambush you with caution deposits, facilitation percentages, and undisclosed gate fees on inspection day. 
              Use this simulator to see the true, itemised total upfront requirement before viewing.
            </p>
          </div>

          {/* Slider Control */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-baseline">
              <label htmlFor="rent-slider" className="text-xs uppercase tracking-wider font-mono font-bold text-stone-600">
                Annual Base Rent
              </label>
              <span className="text-xl sm:text-2xl font-black text-stone-950 font-mono">
                {formatNaira(rent)}
              </span>
            </div>

            <input
              id="rent-slider"
              type="range"
              min={1000000}
              max={20000000}
              step={250000}
              value={rent}
              onChange={(e) => setRent(Number(e.target.value))}
              className="w-full h-2.5 bg-stone-200 accent-amber-500 rounded-lg cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-stone-500 font-mono">
              <span>₦1,000,000</span>
              <span>₦10,000,000</span>
              <span>₦20,000,000</span>
            </div>
          </div>

          {/* Serviced Estate Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <div>
              <p className="text-xs font-bold text-stone-950">Include Serviced Estate Maintenance</p>
              <p className="text-[11px] text-stone-500">Security guards, backup generator servicing, waste management</p>
            </div>
            <button
              type="button"
              onClick={() => setIsServiced(!isServiced)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isServiced ? 'bg-amber-500' : 'bg-stone-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isServiced ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* RentOra Guarantee Callout */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs leading-relaxed space-y-1">
            <p className="font-bold text-emerald-900 font-mono">The RentOra Policy:</p>
            <p className="text-emerald-800">
              Every listing on RentOra must itemize these numbers upfront. No agent is permitted to inflate rates on inspection day. ₦0 inspection fees guaranteed.
            </p>
          </div>
        </div>

        {/* Right Col: The Real Cost Receipt */}
        <div className="lg:col-span-5 bg-stone-950 text-white rounded-3xl border border-white/10 p-6 sm:p-7 space-y-5 shadow-2xl">
          <div className="border-b border-white/10 pb-4">
            <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-amber-400 block">
              Estimated Total Move-In Cost
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-black text-white font-mono">
                {formatNaira(totalMoveIn)}
              </span>
              <span className="text-xs font-mono font-bold text-stone-950 bg-amber-400 px-2.5 py-0.5 rounded-full">
                {multiplier}× base
              </span>
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-2.5 text-xs text-stone-300 font-mono">
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-stone-400">1st Year Base Rent</span>
              <span className="font-bold text-white">{formatNaira(rent)}</span>
            </div>

            {isServiced && (
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-stone-400">Estate Service Charge (~15%)</span>
                <span className="font-medium text-white">{formatNaira(serviceCharge)}</span>
              </div>
            )}

            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-stone-400">Caution Deposit (10%)</span>
              <span className="font-medium text-emerald-400">{formatNaira(cautionFee)} (Refundable)</span>
            </div>

            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-stone-400">Legal Agreement (10%)</span>
              <span className="font-medium text-white">{formatNaira(legalFee)}</span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-stone-400">Agency & Facilitation (10%)</span>
              <span className="font-medium text-white">{formatNaira(agencyFee)}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10">
            <Link
              href="/properties"
              className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center transition-colors shadow-md text-center block"
            >
              Browse Listings with Locked Upfront Rates →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
