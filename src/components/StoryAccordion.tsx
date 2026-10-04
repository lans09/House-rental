'use client';

import React, { useState } from 'react';

export function StoryAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const accordionItems = [
    {
      title: 'The Problem with the Street Agent System',
      content:
        'In Eastern Nigeria, finding a house usually means being dragged around by informal agent syndicates. You pay non-refundable ₦5,000–₦10,000 "inspection fees" for houses that are already let, see prices inflated by 30%, and face surprise agency cuts at the gate. HouseOne eliminates the entire racket.',
    },
    {
      title: 'For Landlords: Stop Losing Tenants to Misquoted Prices',
      content:
        'When multiple freelance agents paste their numbers on your gate, they quote conflicting prices and scare away good tenants. We give you a single verified listing with your exact price, professional photography, and direct qualified inquiries with zero agency friction.',
    },
    {
      title: 'For Licensed Agents & Registered Surveyors',
      content:
        'Are you a licensed surveyor or registered property manager with direct instructions from the owner? HouseOne rewards genuine mandates with verified badges and pre-vetted, serious seekers—while keeping out unverified middlemen.',
    },
    {
      title: 'Our Mandatory Document Vetting Standard',
      content:
        'We never publish blind listings. Every agent and landlord must upload ownership documents, proof of direct mandate, and valid identity records. Our compliance desk vets every submission within 24 to 48 hours before any listing is confirmed on the platform.',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-[11px] font-mono tracking-[0.2em] text-amber-600 uppercase font-semibold">
          Why HouseOne
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-obsidian-900 tracking-tight">
          Built to Fix Nigerian Real Estate from the Ground Up
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 max-w-xl mx-auto">
          Eliminating the middleman syndicate so genuine seekers and honest property owners can transact directly
        </p>
      </div>

      {/* Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Professional Collaborative Image */}
        <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-lg border border-stone-200 aspect-[4/3] bg-stone-100">
          <img
            src="/images/nigerian-inspection-team.jpg"
            alt="Licensed Nigerian Property Professionals & Mandate Verification Desk"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Accordion Card */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="space-y-1.5 border-b border-stone-100 pb-4">
            <div className="flex items-center gap-2 text-stone-700 text-xs font-mono uppercase tracking-wider font-semibold">
              <span className="h-2 w-2 rounded-full bg-amber-500"></span>
              <span>Built for Seekers, Landlords & Legitimate Agents</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-obsidian-900">
              Direct Access. Transparent Pricing. Zero Scams.
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Restoring trust and sanity to renters, buyers, and property owners across Eastern Nigeria.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {accordionItems.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-stone-200/80 overflow-hidden transition-all bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left text-sm font-semibold text-obsidian-900 hover:bg-stone-50 transition-colors"
                  >
                    <span>{item.title}</span>
                    <span className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center font-mono text-obsidian-900 text-sm font-bold">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                      {item.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
