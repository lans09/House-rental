'use client';

import React from 'react';

interface FeeBreakdownCardProps {
  rentPrice: number;
  serviceCharge?: number;
  cautionFee?: number;
  legalFeePct?: number;
  agencyFeePct?: number;
  isShortLet?: boolean;
}

export function FeeBreakdownCard({
  rentPrice,
  serviceCharge = 0,
  cautionFee = 0,
  legalFeePct = 10,
  agencyFeePct = 10,
  isShortLet = false,
}: FeeBreakdownCardProps) {
  const legalFee = (rentPrice * legalFeePct) / 100;
  const agencyFee = (rentPrice * agencyFeePct) / 100;
  const totalUpfront = rentPrice + serviceCharge + cautionFee + legalFee + agencyFee;

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 font-bold block">
            Locked Mandate Pricing
          </span>
          <h3 className="font-bold text-stone-950 text-sm font-serif">
            Itemised Cost Breakdown
          </h3>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-stone-100 text-stone-700 rounded-md">
          {isShortLet ? 'Daily Rate' : '1-Year Upfront'}
        </span>
      </div>

      <div className="space-y-2.5 text-xs text-stone-700 font-mono">
        <div className="flex justify-between items-center py-1 border-b border-stone-100">
          <span className="text-stone-600">Base Annual Rent</span>
          <span className="font-bold text-stone-950">{formatNaira(rentPrice)}</span>
        </div>

        {serviceCharge > 0 && (
          <div className="flex justify-between items-center py-1 border-b border-stone-100">
            <span className="text-stone-600">Estate Service Charge</span>
            <span className="font-medium text-stone-800">{formatNaira(serviceCharge)}</span>
          </div>
        )}

        {cautionFee > 0 && (
          <div className="flex justify-between items-center py-1 border-b border-stone-100">
            <span className="text-stone-600">Refundable Caution Deposit</span>
            <span className="font-medium text-emerald-700">{formatNaira(cautionFee)} (Refundable)</span>
          </div>
        )}

        {!isShortLet && (
          <>
            <div className="flex justify-between items-center py-1 border-b border-stone-100">
              <span className="text-stone-600">Legal Agreement ({legalFeePct}%)</span>
              <span className="font-medium text-stone-800">{formatNaira(legalFee)}</span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-stone-100">
              <span className="text-stone-600">Agency & Facilitation ({agencyFeePct}%)</span>
              <span className="font-medium text-stone-800">{formatNaira(agencyFee)}</span>
            </div>
          </>
        )}

        <div className="pt-2">
          <div className="flex justify-between items-baseline">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-stone-500 block">
                Total Move-In Settlement
              </span>
              <p className="text-2xl font-black text-stone-950 mt-0.5">
                {formatNaira(totalUpfront)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 flex items-start gap-2 text-xs text-amber-950 leading-relaxed">
        <span className="font-bold text-amber-700 shrink-0">●</span>
        <p>
          <strong>HouseOne Anti-Extortion Rule:</strong> This fee schedule is legally locked with the landlord. Never pay unofficial gate fees, registration fees, or offline surcharges.
        </p>
      </div>
    </div>
  );
}
