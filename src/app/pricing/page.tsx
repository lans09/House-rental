'use client';

import React from 'react';
import Link from 'next/link';

const PLANS = [
  {
    name: 'Direct Landlord',
    role: 'Private Property Owner',
    price: '₦0',
    frequency: 'Always Free',
    badge: '100% Free',
    desc: 'For private homeowners putting up their flat, duplex, or compound for rent or sale.',
    features: [
      '1 Active Verified Listing (Rent or Sale)',
      'Fast Document & Title Deed Vetting (24-48 hrs)',
      'Direct Landlord Mandate Confirmation',
      'Direct WhatsApp Inquiries from Verified Seekers',
      'Phone Number Masking & Anti-Spam Protection',
      'Zero Agent Markups or Added Quotes',
    ],
    ctaText: 'List 1 Property for Free',
    ctaHref: '/register?role=landlord',
    popular: true,
  },
  {
    name: 'Licensed Agent',
    role: 'Certified Realtor / Broker',
    price: '₦15,000',
    frequency: 'per month',
    badge: 'For Realtors',
    desc: 'For registered estate agents managing up to 10 verified properties across Eastern cities.',
    features: [
      'Up to 10 Active Verified Listings',
      'Priority 24-Hour Document Vetting SLA',
      'Verified Mandate Badge & CAC Accreditation',
      'Direct Lead Routing (WhatsApp + Email)',
      'Listing Performance Views & Lead Log',
      'Standard Regional WhatsApp Support',
    ],
    ctaText: 'Start as Verified Agent',
    ctaHref: '/register?role=agent',
    popular: false,
  },
  {
    name: 'Estate Agency & Developers',
    role: 'Development Firms & Agencies',
    price: '₦45,000',
    frequency: 'per month',
    badge: 'High Volume',
    desc: 'For commercial property managers, estate developers, and agencies managing residential estates.',
    features: [
      'Unlimited Active Verified Listings (Rent & Sale)',
      'Instant Review & Priority Document Verification',
      'Featured Placements in City Search Results',
      'Dedicated Regional Compliance Officer',
      'Multi-Staff Team Accounts & Role Delegation',
      '24/7 Priority SLA & Legal Compliance Support',
    ],
    ctaText: 'Register Estate Agency',
    ctaHref: '/register?role=agent',
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16 bg-stone-50 min-h-screen">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-mono uppercase tracking-wider font-bold">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          <span>Transparent Plans for Property Owners & Agents</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-950 tracking-tight font-serif">
          Simple, Fair Pricing for Property Owners in the East
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
          Whether you are an individual landlord in Enugu with one vacant duplex, or a licensed brokerage in Onitsha managing multiple estates, HouseOne delivers verified seekers at locked rates once your documents are vetted.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
              plan.popular
                ? 'bg-stone-950 text-white shadow-2xl ring-2 ring-amber-400'
                : 'bg-white text-stone-950 border border-stone-200 shadow-md hover:shadow-lg'
            }`}
          >
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
                    plan.popular ? 'text-amber-400' : 'text-stone-500'
                  }`}>
                    {plan.role}
                  </span>
                  {plan.badge && (
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
                      plan.popular ? 'bg-amber-500 text-stone-950' : 'bg-stone-100 text-stone-800'
                    }`}>
                      {plan.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold font-serif mt-2">{plan.name}</h3>
                <p className={`text-xs mt-2 leading-relaxed ${
                  plan.popular ? 'text-stone-300' : 'text-stone-600'
                }`}>
                  {plan.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-200/20">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight">
                    {plan.price}
                  </span>
                  <span className={`text-xs font-mono ${
                    plan.popular ? 'text-stone-400' : 'text-stone-500'
                  }`}>
                    /{plan.frequency}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 pt-2 text-xs">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className={`font-bold shrink-0 mt-0.5 ${
                      plan.popular ? 'text-emerald-400' : 'text-emerald-600'
                    }`}>
                      ✓
                    </span>
                    <span className={plan.popular ? 'text-stone-200' : 'text-stone-700'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <Link
                href={plan.ctaHref}
                className={`w-full py-3.5 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md ${
                  plan.popular
                    ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-black/40'
                    : 'bg-stone-950 hover:bg-black text-white'
                }`}
              >
                <span>{plan.ctaText} →</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Footnote */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 text-center max-w-3xl mx-auto space-y-2 shadow-sm">
        <h4 className="font-bold text-stone-950 text-sm font-serif">
          Mandatory Document Verification & Direct Mandate Guarantee
        </h4>
        <p className="text-xs text-stone-600 leading-relaxed">
          All listings require verified ownership documentation and direct landlord mandates prior to publication. No listing goes live without identity confirmation and document audit. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
