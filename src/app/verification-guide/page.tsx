'use client';

import React from 'react';
import Link from 'next/link';
import { VerificationDossier } from '@/components/VerificationDossier';

export default function VerificationGuidePage() {
  const auditPillars = [
    {
      num: '01',
      title: 'Direct Landlord Mandate Submission',
      desc: 'Agents must submit written proof of instruction and authorization directly from the genuine property owner. Unaccredited street touts who merely copy phone numbers off perimeter walls cannot list on HouseOne.',
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16 bg-stone-50 min-h-screen">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-mono uppercase tracking-wider font-bold">
          <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          <span>The HouseOne Document Verification Standard</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-950 tracking-tight font-serif">
          How Every Property Earns the Verified Seal
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
          HouseOne eliminates fake adverts, ghost listings, and rogue agent markups. Our agents must submit certified ownership documents, direct landlord mandates, and locked price schedules before any listing is confirmed.
        </p>
      </div>

      {/* The Actual Verification Dossier Component */}
      <VerificationDossier />

      {/* 4 Pillars of the Document Protocol */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 font-bold">
            Four Mandatory Compliance Benchmarks
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-950">
            The 4 Mandatory Verification Pillars
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Every property listing must satisfy all 4 criteria before appearing in public search results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {auditPillars.map((p) => (
            <div
              key={p.num}
              className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <span className="font-mono text-2xl font-black text-amber-500">{p.num}</span>
                  <span className="text-[10px] font-mono uppercase text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full font-bold">
                    Mandatory Check
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-stone-950 font-serif">{p.title}</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zero Inspection Fee Guarantee for Seekers */}
      <div className="bg-stone-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-white/10">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono uppercase tracking-wider font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            <span>Seeker Protection Policy</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black font-serif tracking-tight text-white">
            The ₦0 Inspection Fee Guarantee
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
            In Nigeria, property hunters waste tens of thousands of Naira paying informal "inspection fees" or "gate passes" to street touts just to view an apartment.
            On HouseOne, seekers NEVER pay an inspection fee to view a verified property. If any listing agent attempts to charge you an inspection fee before viewing, tap Report for an immediate license ban.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs font-bold">
            <Link
              href="/properties"
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 uppercase tracking-wider transition-all shadow-md"
            >
              Explore Verified Homes →
            </Link>
            <Link
              href="/register?role=landlord"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white text-white hover:text-stone-950 uppercase tracking-wider transition-all border border-white/20"
            >
              Submit Property Documents →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
