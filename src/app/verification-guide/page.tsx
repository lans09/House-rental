'use client';

import React from 'react';
import Link from 'next/link';
import { VerificationDossier } from '@/components/VerificationDossier';
import { UliLine } from '@/components/UliLine';

export default function VerificationGuidePage() {
  const auditPillars = [
    {
      num: '01',
      title: 'Direct Landlord Mandate Submission',
      desc: 'Agents must submit written proof of instruction and authorization directly from the genuine property owner. Unaccredited street touts who merely copy phone numbers off perimeter walls cannot list on RentOra.',
    },
    {
      num: '02',
      title: 'Title Deed & Land Registry Vetting',
      desc: 'Our legal compliance team reviews Certificates of Occupancy (C of O), Deeds of Assignment, Governor’s Consent, and registered survey plans against regional registries (Enugu EDGIS, Anambra ANGIS, Imo IMOGIS) to prevent fraudulent transactions.',
    },
    {
      num: '03',
      title: 'Agent Identity & CAC Verification',
      desc: 'Every estate agent and property broker must submit national identification (NIN/Voter’s Card) and registered CAC business credentials. Anonymous and untraceable brokers are strictly prohibited.',
    },
    {
      num: '04',
      title: 'Locked Price Schedule & ₦0 Inspection Pledge',
      desc: 'Landlords and brokers sign a legally binding pricing agreement specifying the exact rent, service charge, and caution fee. Demanding inspection fees or inflating prices on viewing day results in an immediate permanent ban.',
    },
  ];

  return (
    <div className="bg-paper min-h-screen text-ink">
      <div className="container-x py-10 sm:py-16 lg:py-20 space-y-12 sm:space-y-16">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-[13px] sm:text-[14px] font-semibold text-ink-600">
            Enugu · Onitsha · Awka · Owerri · Aba · Asaba
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-[-0.01em] text-ink">
            How Every Property Earns the{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Verified Seal</span>
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
          <p className="text-[15px] sm:text-[17px] text-ink-600 leading-relaxed font-normal">
            RentOra eliminates fake adverts, ghost listings, and rogue agent markups. Our agents must submit certified ownership documents, direct landlord mandates, and locked price schedules before any listing is confirmed.
          </p>
        </div>

        {/* Verification Dossier Showcase */}
        <VerificationDossier />

        {/* 4 Pillars of the Document Protocol */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <p className="text-[13px] font-semibold text-amber-600">Compliance Benchmarks</p>
            <h2 className="text-2xl sm:text-3xl font-serif text-ink">
              The 4 Mandatory Verification Pillars
            </h2>
            <p className="text-[14px] sm:text-[15px] text-ink-600">
              Every property listing must satisfy all 4 criteria before appearing in public search results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {auditPillars.map((p) => (
              <div
                key={p.num}
                className="bg-white rounded-3xl border border-ink/10 p-6 sm:p-8 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                    <span className="font-serif text-3xl font-bold text-amber-500">{p.num}</span>
                    <span className="text-[12px] font-medium text-forest-700 bg-forest-50 px-3 py-1 rounded-full border border-forest-200/50">
                      Mandatory Check
                    </span>
                  </div>
                  <h3 className="text-lg font-serif text-ink">{p.title}</h3>
                  <p className="text-[14px] text-ink-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Igbo Uli Line */}
        <UliLine id="uli-guide-middle" className="block h-4 w-full text-amber-500/70" />

        {/* Zero Inspection Fee Guarantee Card */}
        <div className="bg-forest-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="max-w-3xl space-y-4">
            <p className="text-[13px] font-semibold text-amber-300">Seeker Protection Policy</p>
            <h2 className="text-2xl sm:text-4xl font-serif text-white">
              The ₦0 Inspection Fee Guarantee
            </h2>
            <p className="text-[14px] sm:text-[16px] text-white/80 leading-relaxed font-light">
              In Nigeria, property hunters waste tens of thousands of Naira paying informal "inspection fees" or "gate passes" to street touts just to view an apartment.
              On RentOra, seekers NEVER pay an inspection fee to view a verified property. If any listing agent attempts to charge you an inspection fee before viewing, tap Report for an immediate license ban.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 text-[14px] font-semibold">
              <Link
                href="/properties"
                className="px-6 py-3 rounded-full bg-amber-400 text-ink hover:bg-amber-300 transition-colors shadow-sm"
              >
                Browse Verified Listings →
              </Link>
              <Link
                href="/register?role=landlord"
                className="px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors text-white"
              >
                Submit Landlord Mandate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
