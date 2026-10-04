'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { FeeBreakdownCard } from '@/components/FeeBreakdownCard';

const SAMPLE_PROPERTY_DETAIL = {
  id: 'prop-enugu-01',
  title: 'Grand 5-Bedroom Executive Mansion + BQ',
  slug: 'luxury-5-bed-mansion-independence-layout-enugu',
  property_type: 'duplex',
  listing_type: 'rent' as const,
  bedrooms: 5,
  bathrooms: 5,
  toilets: 6,
  parking_spaces: 4,
  is_furnished: false,
  is_serviced: true,
  size_sqm: 450,
  state: 'Enugu',
  lga: 'Enugu North',
  area: 'Independence Layout',
  street_address: 'Plot 14, Presidential Boulevard, Independence Layout',
  landmark: 'Near Enugu Government House & Okpara Square',
  rent_price: 8500000,
  service_charge: 1000000,
  caution_fee: 500000,
  legal_fee_pct: 10,
  agency_fee_pct: 10,
  total_upfront_estimate: 11700000,
  is_verified: true,
  is_featured: true,
  description: `Experience elevated contemporary luxury in this masterfully crafted 5-bedroom executive mansion situated in the prestigious diplomatic quarter of Independence Layout, Enugu (Coal City). 

Property Highlights:
- 24/7 dedicated power infrastructure with silent estate generator backup and 10kVA solar inverter system.
- Industrial automated borehole water treatment and filtration plant with dual overhead storage tanks.
- High-perimeter security fence with electrified razor wire, motorized black & gold ornamental security gate, and HD CCTV perimeter surveillance.
- All 5 expansive bedrooms are fully en-suite with walk-in Spanish glass showers, contemporary bathtubs, and imported water heaters.
- Chef's fitted kitchen with heat extractor island, marble countertops, pantry, and attached 2-room Domestic Staff Quarters (BQ).
- Polished interlocking compound with manicured royal palm trees and covered parking for up to 6 vehicles.`,
  amenities: [
    '24/7 Dedicated Power (Gen + Solar)',
    'Pre-paid Electricity Meter',
    'Industrial Borehole Water Plant',
    'Gated Diplomatic Zone Security',
    'CCTV & Video Intercom',
    'Motorized Security Gate',
    '2-Room Staff Quarters (BQ)',
    'Interlocking Stone Paved Driveway',
  ],
  images: [
    '/images/hero-eastern-nigerian-mansion.jpg',
    '/images/onitsha-gra-mansion.jpg',
    '/images/awka-ngozika-duplex.jpg',
    '/images/owerri-new-duplex.jpg',
  ],
  owner: {
    name: 'Chief Emeka Eze & Partners (Surveyors & Valuers)',
    cac: 'RC-1492041',
    is_verified: true,
    phone_masked: '+234 803 *** **18',
    whatsapp_phone: '2348030000000',
  },
};

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [selectedImg, setSelectedImg] = useState(0);
  const [showInspectionModal, setShowInspectionModal] = useState(false);
  const [inspectionSubmitted, setInspectionSubmitted] = useState(false);
  const [proposedDate, setProposedDate] = useState('');
  const [proposedSlot, setProposedSlot] = useState('10:00 AM - 12:00 PM');

  const p = SAMPLE_PROPERTY_DETAIL;

  const whatsappUrl = `https://wa.me/${p.owner.whatsapp_phone}?text=${encodeURIComponent(
    `Hello, I saw your verified listing on HouseOne: "${p.title}" (Ref: ${p.id}) in ${p.area}, ${p.state}. I would like to schedule a viewing.`
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 pb-24 lg:pb-10 space-y-6 sm:space-y-8 bg-stone-50 min-h-screen">
      {/* Top Breadcrumb & Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-5 sm:pb-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 font-mono text-[11px] sm:text-xs font-bold border border-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
              DOCUMENTS & MANDATE VERIFIED
            </span>
            <span className="text-[11px] sm:text-xs font-mono font-bold px-2.5 py-1 bg-amber-500 text-stone-950 rounded-full">
              FOR RENT • DIRECT MANDATE
            </span>
            <span className="text-[11px] sm:text-xs font-mono text-stone-500">
              Ref: {p.id}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight font-serif">
            {p.title}
          </h1>

          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-stone-600">
            <span>{p.street_address}, {p.area}, {p.lga}, {p.state}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link
            href="/properties"
            className="flex-1 sm:flex-initial text-center px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-800 text-xs font-mono font-bold transition-all shadow-sm"
          >
            ← Catalogue
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial justify-center px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold transition-all shadow-md inline-flex items-center gap-1.5"
          >
            <span>WhatsApp Agent</span>
          </a>
        </div>
      </div>

      {/* Gallery Showcase */}
      <div className="space-y-2 sm:space-y-3">
        <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-950 shadow-lg border border-stone-200">
          <img
            src={p.images[selectedImg]}
            alt={p.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-stone-200 text-[11px] sm:text-xs font-mono border border-white/10">
            Photo {selectedImg + 1} of {p.images.length} • Independence Layout, Enugu
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {p.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImg(idx)}
              className={`relative aspect-[16/10] rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
                selectedImg === idx
                  ? 'border-amber-500 ring-2 ring-amber-400/40'
                  : 'border-stone-200 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Details + Fee Breakdown Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Cols: Description, Amenities & Specs */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          {/* Key Specs Bar (Mobile friendly grid tiles) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 p-4 sm:p-5 bg-white rounded-2xl border border-stone-200 shadow-sm text-center">
            <div className="p-2 bg-stone-50/80 rounded-xl">
              <span className="text-[11px] text-stone-500 font-mono block">Bedrooms</span>
              <span className="text-base sm:text-lg font-bold text-stone-950 font-serif mt-0.5 block">
                {p.bedrooms} Beds
              </span>
            </div>
            <div className="p-2 bg-stone-50/80 rounded-xl">
              <span className="text-[11px] text-stone-500 font-mono block">Bathrooms</span>
              <span className="text-base sm:text-lg font-bold text-stone-950 font-serif mt-0.5 block">
                {p.bathrooms} Baths
              </span>
            </div>
            <div className="p-2 bg-stone-50/80 rounded-xl">
              <span className="text-[11px] text-stone-500 font-mono block">Compound Space</span>
              <span className="text-base sm:text-lg font-bold text-stone-950 font-serif mt-0.5 block">
                {p.parking_spaces} Cars
              </span>
            </div>
            <div className="p-2 bg-stone-50/80 rounded-xl">
              <span className="text-[11px] text-stone-500 font-mono block">Inspection Fee</span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md inline-block mt-1 font-mono">
                ₦0 Free
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-8 space-y-4 shadow-sm">
            <h3 className="font-bold text-stone-950 text-lg font-serif">Property Description</h3>
            <p className="text-stone-700 text-sm whitespace-pre-line leading-relaxed">
              {p.description}
            </p>
          </div>

          {/* Amenities & Infrastructure */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="font-bold text-stone-950 text-lg font-serif">Verified Infrastructure & Utilities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {p.amenities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-800 bg-stone-50 p-3 rounded-xl border border-stone-100">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0"></span>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* HouseOne Verification Certificate Box */}
          <div className="p-6 sm:p-8 bg-stone-950 text-white rounded-2xl shadow-xl space-y-3 border border-white/10">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              HouseOne Document Verification & Direct Mandate Guarantee
            </div>
            <h4 className="text-xl font-bold font-serif text-white">
              Why this property has zero agent markups:
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
              This property’s listing agent submitted direct ownership papers, landlord authorization, and a binding locked price agreement before being approved on HouseOne. The rental rate of ₦8.5M is locked directly with the mandate holder. No street agent can quote an inflated rate or charge you inspection gate fees.
            </p>
          </div>
        </div>

        {/* Right Col: Transparent Fee Breakdown + Contact Actions */}
        <div className="space-y-6">
          <FeeBreakdownCard
            rentPrice={p.rent_price}
            serviceCharge={p.service_charge}
            cautionFee={p.caution_fee}
            legalFeePct={p.legal_fee_pct}
            agencyFeePct={p.agency_fee_pct}
          />

          {/* Contact & Inspection Scheduler CTA */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
            <h4 className="font-bold text-stone-950 text-sm font-mono uppercase tracking-wider">
              Listing Mandate Holder
            </h4>

            <div className="p-4 bg-stone-50 rounded-xl space-y-1.5 border border-stone-200">
              <p className="text-xs font-bold text-stone-950 font-serif">{p.owner.name}</p>
              <p className="text-[11px] text-stone-500 font-mono">CAC Registration: {p.owner.cac}</p>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                ✓ Registered Mandate Holder
              </span>
            </div>

            <div className="space-y-3">
              {/* WhatsApp Direct */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all text-center block"
              >
                Chat on WhatsApp Direct →
              </a>

              {/* Book Viewing Modal Trigger */}
              <button
                type="button"
                onClick={() => setShowInspectionModal(true)}
                className="w-full py-3 px-4 bg-stone-950 hover:bg-black text-amber-400 hover:text-amber-300 rounded-xl font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all border border-amber-400/30"
              >
                Book Free Viewing Slot (₦0 Fee) →
              </button>

              {/* Phone Masked Info */}
              <div className="pt-1 text-center">
                <span className="text-[11px] text-stone-500 font-mono">
                  Masked Rep Phone: {p.owner.phone_masked}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inspection Modal */}
      {showInspectionModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-stone-950 font-bold text-base font-serif">
                  Schedule Free Property Viewing
                </h3>
                <p className="text-xs text-stone-500 font-mono">₦0 Inspection Fee • Direct Mandate</p>
              </div>
              <button
                onClick={() => setShowInspectionModal(false)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {inspectionSubmitted ? (
              <div className="py-6 text-center space-y-3">
                <div className="h-12 w-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h4 className="font-bold text-stone-950 text-base font-serif">Inspection Request Sent!</h4>
                <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
                  The listing mandate holder has received your request and will confirm your slot within 24 hours under the HouseOne SLA.
                </p>
                <button
                  onClick={() => {
                    setInspectionSubmitted(false);
                    setShowInspectionModal(false);
                  }}
                  className="px-6 py-2.5 bg-stone-950 text-white text-xs font-mono font-bold rounded-xl"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setInspectionSubmitted(true);
                }}
                className="space-y-4"
              >
                <p className="text-xs text-stone-600 leading-relaxed">
                  Select your preferred date and time. Remember: On HouseOne, you never pay an inspection fee to view a verified property.
                </p>

                <div>
                  <label className="block text-xs font-mono font-bold text-stone-700 uppercase mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={proposedDate}
                    onChange={(e) => setProposedDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-[16px] sm:text-xs text-stone-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-stone-700 uppercase mb-1">Time Slot</label>
                  <select
                    value={proposedSlot}
                    onChange={(e) => setProposedSlot(e.target.value)}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-[16px] sm:text-xs text-stone-900 font-mono"
                  >
                    <option value="10:00 AM - 12:00 PM">Morning (10:00 AM – 12:00 PM)</option>
                    <option value="01:00 PM - 03:00 PM">Afternoon (1:00 PM – 3:00 PM)</option>
                    <option value="04:00 PM - 06:00 PM">Evening (4:00 PM – 6:00 PM)</option>
                  </select>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowInspectionModal(false)}
                    className="w-1/2 py-2.5 border border-stone-200 text-stone-700 rounded-xl font-mono font-bold text-xs hover:bg-stone-50 active:scale-95 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 bg-stone-950 hover:bg-black text-amber-400 rounded-xl font-mono font-bold text-xs shadow-md active:scale-95 transition-all"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Sticky Mobile Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-3 flex items-center justify-between gap-3 lg:hidden shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        <div>
          <span className="block text-[10px] font-mono uppercase text-stone-500 font-bold">Verified Rent</span>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-lg font-black text-stone-950">₦8,500,000</span>
            <span className="text-[11px] text-stone-500 font-mono">/yr</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold shadow-sm active:scale-95 transition-all inline-flex items-center gap-1"
          >
            <span>WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => setShowInspectionModal(true)}
            className="px-3.5 py-2.5 rounded-xl bg-stone-950 hover:bg-black text-amber-400 text-xs font-mono font-bold shadow-sm active:scale-95 transition-all border border-amber-400/30"
          >
            <span>Book (₦0)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
