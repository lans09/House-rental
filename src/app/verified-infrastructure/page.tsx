'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UliLine } from '@/components/UliLine';

export default function VerifiedInfrastructurePage() {
  const [activeTab, setActiveTab] = useState<'power' | 'water' | 'security' | 'access'>('power');

  const pillars = [
    {
      id: 'power' as const,
      num: '01',
      title: 'Electricity & Power Grid Stability',
      tagline: 'No surprise blackout houses or inflated shared generator levies.',
      icon: '⚡',
      specs: [
        { label: 'Prepaid Metering', desc: 'Every flat or duplex must have a dedicated pre-paid meter (DISCO-verified) so tenants only pay for their own consumption.' },
        { label: 'Feeder Line Status', desc: 'We verify the municipal feeder line (33kVA or 11kVA) and check real average daily grid uptime in the neighborhood.' },
        { label: 'Backup Power Inverters', desc: 'Solar hybrid inverters and standby generators are inspected for genuine capacity, wiring isolation, and soundproofing.' },
        { label: 'Phase Isolation', desc: 'Electrical distribution boards are inspected for fire hazard compliance and clean neutral grounding.' },
      ],
    },
    {
      id: 'water' as const,
      num: '02',
      title: 'Water Potability & Borehole Reliability',
      tagline: 'Clean, pressurized water straight to your taps every single morning.',
      icon: '💧',
      specs: [
        { label: 'Borehole Automation', desc: 'Automated pressure pumps and float switches to prevent dry taps or manual pumping hassles.' },
        { label: 'Water Filtration & Treatment', desc: 'Multi-stage sand and carbon water treatment plants or reverse osmosis filtration units are validated.' },
        { label: 'Dual Overhead Storage', desc: 'Minimum 2,000L to 5,000L high-density overhead storage tanks to ensure days of reserve during maintenance.' },
        { label: 'Clean Pipe Reticulation', desc: 'Pressure inspection across all kitchen, bathroom, and outdoor taps to detect leaks and rusty galvanized pipes.' },
      ],
    },
    {
      id: 'security' as const,
      num: '03',
      title: 'Perimeter & Estate Security Infrastructure',
      tagline: 'Physical barriers, active surveillance, and audited estate guards.',
      icon: '🛡️',
      specs: [
        { label: 'Motorized Access Gates', desc: 'High-tensile ornamental security gates with functional automated openers or manned access booths.' },
        { label: 'Electrified Razor Fencing', desc: 'Functional perimeter security fences with high-voltage pulse shock deterrents and alarm integration.' },
        { label: 'CCTV Perimeter Coverage', desc: 'High-definition night-vision cameras monitoring driveways, compound entrances, and perimeter perches.' },
        { label: '24/7 Uniformed Vigilante', desc: 'Vetted community or private security personnel on continuous 24-hour shift rotations.' },
      ],
    },
    {
      id: 'access' as const,
      num: '04',
      title: 'Road Network, Interlocking & Drainage',
      tagline: 'Drive in without sinking during heavy rainy season downpours.',
      icon: '🚗',
      specs: [
        { label: 'Tarred Access Roads', desc: 'We verify access roads from major highways and report paved vs unpaved stretch percentages accurately.' },
        { label: 'Concrete Interlocking', desc: 'Non-slip compound interlocking stones that eliminate mud, dust, and car tyre slippage.' },
        { label: 'Flood-Resilient Drainage', desc: 'Covered external concrete drainage channels connected directly to municipal storm gutters.' },
        { label: 'Dedicated Parking Bays', desc: 'Numbered and allocated parking spaces for each flat or unit to prevent tenant disputes.' },
      ],
    },
  ];

  const currentPillar = pillars.find((p) => p.id === activeTab) || pillars[0];

  return (
    <div className="bg-paper min-h-screen text-ink">
      <div className="container-x py-10 sm:py-16 lg:py-20 space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-[13px] sm:text-[14px] font-semibold text-ink-600">
            Enugu · Onitsha · Awka · Owerri · Aba · Asaba · Port Harcourt · Lagos · Abuja · <span className="text-amber-600 font-bold">...</span>
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-[-0.01em] text-ink">
            RentOra Verified{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Infrastructure Standards</span>
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
            A beautiful house is uninhabitable if the water is rusty, the light never stays on, or the street floods every time it rains. 
            Before any home earns the Verified Badge, our field inspectors physically audit and document its infrastructure.
          </p>
        </div>

        {/* 4 Pillars Interactive Tab Dock */}
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-none">
            {pillars.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveTab(p.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-[14px] font-semibold transition-all shrink-0 cursor-pointer ${
                  activeTab === p.id
                    ? 'bg-ink text-amber-300 shadow-md ring-2 ring-amber-400/50'
                    : 'bg-white border border-ink/10 text-ink hover:bg-paper-100'
                }`}
              >
                <span>{p.icon}</span>
                <span>{p.title.split(' ')[0]} Audit</span>
              </button>
            ))}
          </div>

          {/* Active Pillar Card */}
          <div className="bg-white rounded-3xl border border-ink/10 p-6 sm:p-10 shadow-sm space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-ink/10 pb-6">
              <div className="space-y-2">
                <span className="text-amber-600 font-serif text-3xl font-bold">{currentPillar.num}</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-ink">{currentPillar.title}</h2>
                <p className="text-[15px] text-ink-600">{currentPillar.tagline}</p>
              </div>
              <span className="text-[12px] font-medium text-forest-700 bg-forest-50 px-3 py-1.5 rounded-full border border-forest-200/50 shrink-0 self-start md:self-auto">
                ✓ Mandatory On-Site Physical Inspection
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentPillar.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="p-5 rounded-2xl bg-paper-100 border border-ink/5 space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-[15px] font-semibold text-ink flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      <span>{spec.label}</span>
                    </h3>
                    <p className="text-[13px] sm:text-[14px] text-ink-600 leading-relaxed mt-1">
                      {spec.desc}
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-forest-700 font-semibold pt-2">
                    VERIFIED & CHECKED
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Igbo Uli Line */}
        <UliLine id="uli-infra-mid" className="block h-4 w-full text-amber-500/70" />

        {/* Comparison: Typical Agent Deception vs RentOra Infrastructure Truth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-white p-6 sm:p-8 border border-ink/10 shadow-sm space-y-4">
            <p className="text-[13px] font-semibold text-ink-500 uppercase tracking-wider font-mono">
              The Usual Agent Deception
            </p>
            <h3 className="font-serif text-xl sm:text-2xl text-ink">
              “Light and water are steady sir, pay inspection first”
            </h3>
            <ul className="space-y-3 text-[14px] text-ink-600">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span>You move in only to find out the prepaid meter has ₦380,000 inherited debt.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span>The borehole pump has been burnt for 6 months and water must be bought from tankers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span>The road is impassable during rains, cutting off your car completely.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl bg-ink p-6 sm:p-8 text-white shadow-md space-y-4">
            <p className="text-[13px] font-semibold text-amber-300 uppercase tracking-wider font-mono">
              On RentOra
            </p>
            <h3 className="font-serif text-xl sm:text-2xl text-white">
              Every utility inspected, signed, and guaranteed upfront
            </h3>
            <ul className="space-y-3 text-[14px] text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-forest-400 font-bold shrink-0">✓</span>
                <span>Prepaid meter cleared of legacy debts and audited with the DISCO branch.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-forest-400 font-bold shrink-0">✓</span>
                <span>Borehole pump, treatment tanks, and pressure lines tested in person.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-forest-400 font-bold shrink-0">✓</span>
                <span>Tarred access, drainage slopes, and compound parking confirmed before publishing.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="bg-forest-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl text-white">
              Ready to find a home with verified utilities?
            </h3>
            <p className="text-[14px] sm:text-[15px] text-white/80 font-light">
              Browse hundreds of vetted listings with direct landlord mandates and ₦0 inspection fees.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/properties"
              className="px-6 py-3 rounded-full bg-amber-400 text-ink font-semibold text-[14px] hover:bg-amber-300 transition-colors shadow-sm"
            >
              Browse Verified Listings →
            </Link>
            <Link
              href="/register?role=landlord"
              className="px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors text-white font-semibold text-[14px]"
            >
              List a Property
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
