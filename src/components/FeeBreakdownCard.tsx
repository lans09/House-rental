'use client';

import React from 'react';

interface FeeBreakdownCardProps {
  rentPrice: number;
  serviceCharge?: number;
  cautionFee?: number;
  legalFeePct?: number;
  agencyFeePct?: number;
  isSale?: boolean;
}

export function FeeBreakdownCard({
  rentPrice,
  serviceCharge = 0,
  cautionFee = 0,
  legalFeePct = 10,
  agencyFeePct = 10,
  isSale = false,
}: FeeBreakdownCardProps) {
  const legalFee = isSale ? (rentPrice * 5) / 100 : (rentPrice * legalFeePct) / 100;
  const agencyFee = isSale ? (rentPrice * 5) / 100 : (rentPrice * agencyFeePct) / 100;
  const totalUpfront = isSale
    ? rentPrice + legalFee + agencyFee
    : rentPrice + serviceCharge + cautionFee + legalFee + agencyFee;

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="rounded-3xl bg-ink p-6 sm:p-7 text-white shadow-lg space-y-5">
      <div>
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold text-amber-300">Locked Landlord Agreement</p>
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/80">
            {isSale ? 'Outright purchase' : '1-year lease'}
          </span>
        </div>
        <h3 className="mt-1 font-serif text-xl sm:text-2xl text-white font-normal">
          Transparent Cost Breakdown
        </h3>
        <p className="mt-1 text-[13px] text-white/65">
          Every naira signed by the landlord. No surprise viewing fees or gate passes.
        </p>
      </div>

      <dl className="divide-y divide-white/10 text-[14px]">
        <div className="flex items-baseline justify-between py-2.5">
          <dt className="text-white/70">{isSale ? 'Outright Purchase Price' : 'Annual Base Rent'}</dt>
          <dd className="font-medium tabular-nums text-white shrink-0">{formatNaira(rentPrice)}</dd>
        </div>

        {!isSale && serviceCharge > 0 && (
          <div className="flex items-baseline justify-between py-2.5">
            <dt className="text-white/70">Estate Service Charge</dt>
            <dd className="font-medium tabular-nums text-white shrink-0">{formatNaira(serviceCharge)}</dd>
          </div>
        )}

        {!isSale && cautionFee > 0 && (
          <div className="flex items-baseline justify-between py-2.5">
            <dt className="text-white/70">Refundable Caution Deposit</dt>
            <dd className="font-medium tabular-nums text-amber-300 shrink-0">
              {formatNaira(cautionFee)}
            </dd>
          </div>
        )}

        <div className="flex items-baseline justify-between py-2.5">
          <dt className="text-white/70">Legal Documentation ({isSale ? '5%' : `${legalFeePct}%`})</dt>
          <dd className="font-medium tabular-nums text-white shrink-0">{formatNaira(legalFee)}</dd>
        </div>

        <div className="flex items-baseline justify-between py-2.5">
          <dt className="text-white/70">Agency Facilitation ({isSale ? '5%' : `${agencyFeePct}%`})</dt>
          <dd className="font-medium tabular-nums text-white shrink-0">{formatNaira(agencyFee)}</dd>
        </div>

        <div className="flex items-baseline justify-between pt-4">
          <dt className="text-[14px] sm:text-[15px] font-semibold text-white">
            {isSale ? 'Total Closing Settlement' : 'Total Move-In Settlement'}
          </dt>
          <dd className="font-serif text-2xl sm:text-3xl tabular-nums text-amber-300 shrink-0">
            {formatNaira(totalUpfront)}
          </dd>
        </div>
      </dl>

      <div className="rounded-2xl bg-white/[0.07] p-3.5 border border-white/10 text-[12px] sm:text-[13px] text-white/80 leading-relaxed flex items-start gap-2">
        <span className="text-emerald-400 font-bold shrink-0">✓</span>
        <p>
          <strong className="text-white font-semibold">₦0 Inspection Fee Guarantee:</strong> Inspection is 100% free. Never pay agent gate fees or mobilization fees.
        </p>
      </div>
    </div>
  );
}
