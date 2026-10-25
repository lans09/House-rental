'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { FeeBreakdownCard } from '@/components/FeeBreakdownCard';
import { PropertyCard } from '@/components/PropertyCard';
import { UliLine } from '@/components/UliLine';
import { ALL_PROPERTIES, getPropertyBySlug, PropertyDetail } from '@/data/properties';
import {
  HouseOneStore,
  CatalogueItem,
  catalogueItemToPropertyDetail,
  MemberRecord,
} from '@/lib/admin-store';
import { useAuth } from '@/context/AuthContext';

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const { user, signIn } = useAuth();

  const [catalogueItem, setCatalogueItem] = useState<CatalogueItem | undefined>(undefined);
  const [propertyData, setPropertyData] = useState<PropertyDetail>(
    () => getPropertyBySlug(resolvedParams.slug) || ALL_PROPERTIES[0]
  );

  useEffect(() => {
    const sync = () => {
      const found = HouseOneStore.getCatalogueItemBySlug(resolvedParams.slug);
      setCatalogueItem(found);
      if (found) {
        setPropertyData(catalogueItemToPropertyDetail(found));
      } else {
        const staticMatch = getPropertyBySlug(resolvedParams.slug);
        if (staticMatch) setPropertyData(staticMatch);
      }
    };
    sync();
    window.addEventListener('houseone-store-updated', sync);
    return () => window.removeEventListener('houseone-store-updated', sync);
  }, [resolvedParams.slug]);

  const p = propertyData;

  const [selectedImg, setSelectedImg] = useState(0);
  const [showInspectionModal, setShowInspectionModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [inspectionSubmitted, setInspectionSubmitted] = useState(false);
  const [proposedDate, setProposedDate] = useState('');
  const [proposedSlot, setProposedSlot] = useState('10:00 AM - 12:00 PM');

  // Quick In-Context Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regSubmitted, setRegSubmitted] = useState(false);

  // Authentication / Registration Check
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (user) {
      setIsRegistered(true);
      return;
    }
    const authStatus = localStorage.getItem('houseone_user_authenticated');
    if (authStatus === 'true') {
      setIsRegistered(true);
    }
  }, [user]);

  const handleQuickRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = regName.trim().split(' ');
    const firstName = parts[0] || 'Verified';
    const lastName = parts.slice(1).join(' ') || 'Seeker';
    const newMember: MemberRecord = {
      id: `mem-${Date.now()}`,
      firstName,
      lastName,
      email: regEmail.trim().toLowerCase(),
      phone: regPhone.trim(),
      role: 'seeker',
      city: p.state,
      joinedAt: new Date().toISOString().slice(0, 10),
      status: 'active',
    };
    HouseOneStore.addOrUpdateMember(newMember);
    signIn(newMember);
    setIsRegistered(true);
    setRegSubmitted(true);
    setTimeout(() => {
      setShowRegisterModal(false);
      setRegSubmitted(false);
    }, 1100);
  };

  const handleScheduleViewing = (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : regName || 'Registered Seeker';
    HouseOneStore.addViewing({
      id: `vw-${Date.now()}`,
      propertyId: p.id,
      propertySlug: p.slug,
      propertyTitle: p.title,
      propertyArea: `${p.area}, ${p.state}`,
      seekerName: fullName,
      seekerEmail: user?.email || regEmail || 'seeker@houseone.ng',
      seekerPhone: user?.phone || regPhone || '+234 803 000 0000',
      proposedDate,
      timeSlot: proposedSlot,
      status: 'pending',
      createdAt: new Date().toISOString().slice(0, 10),
    });
    setInspectionSubmitted(true);
  };

  const handleStatusChangeFromPreview = (newStatus: 'published' | 'unpublished') => {
    if (!catalogueItem) return;
    const all = HouseOneStore.getCatalogue();
    const next = all.map((c) => (c.id === catalogueItem.id ? { ...c, status: newStatus } : c));
    HouseOneStore.saveCatalogue(next);
  };

  const isSale = p.listing_type === 'sale';

  const whatsappUrl = `https://wa.me/${p.owner.whatsapp_phone}?text=${encodeURIComponent(
    `Hello, I saw your verified listing on RentOra: "${p.title}" (Ref: ${p.id}) in ${p.area}, ${p.state}. I would like to schedule a viewing.`
  )}`;

  // Related properties (excluding current)
  const relatedProperties = ALL_PROPERTIES.filter((item) => item.id !== p.id).slice(0, 3);

  return (
    <div className="bg-paper min-h-screen text-ink">
      <div className="container-x py-6 sm:py-10 lg:py-14 space-y-8 sm:space-y-10">
        {/* Admin / Owner Dossier Preview Banner when status !== 'published' */}
        {catalogueItem && catalogueItem.status !== 'published' && (
          <div className="rounded-2xl bg-ink text-paper p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-md border border-amber-400/40">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] px-2.5 py-0.5 rounded bg-amber-400 text-ink font-semibold">
                  {catalogueItem.status === 'pending'
                    ? 'Awaiting Admin Approval'
                    : 'Unpublished / Declined'}
                </span>
                <span className="font-mono text-[11px] text-paper/70">
                  Submitted by {catalogueItem.ownerName} ({catalogueItem.submittedAt || 'Recent'})
                </span>
              </div>
              <p className="text-sm sm:text-base font-serif text-paper">
                You are inspecting the full property dossier preview before public release.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleStatusChangeFromPreview('published')}
                className="px-5 py-2.5 rounded-full bg-forest text-paper text-xs font-semibold hover:bg-forest/90 transition-colors cursor-pointer"
              >
                Approve &amp; publish to catalogue →
              </button>
              {catalogueItem.status === 'pending' && (
                <button
                  type="button"
                  onClick={() => handleStatusChangeFromPreview('unpublished')}
                  className="px-4 py-2.5 rounded-full border border-paper/25 text-paper/80 hover:text-paper text-xs font-medium transition-colors cursor-pointer"
                >
                  Decline
                </button>
              )}
              <Link
                href="/admin"
                className="px-4 py-2.5 rounded-full bg-white/10 text-paper text-xs font-semibold hover:bg-white/20 transition-colors"
              >
                ← Back to Admin Desk
              </Link>
            </div>
          </div>
        )}

        {/* Breadcrumb & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-ink/10 pb-5 sm:pb-6">
          <div className="space-y-2">
            <nav className="flex items-center gap-2 text-[13px] font-medium text-ink-600" aria-label="Breadcrumb">
              <Link href="/properties" className="hover:text-ink transition-colors">
                Properties
              </Link>
              <span>/</span>
              <Link href={`/properties?state=${p.state}`} className="hover:text-ink transition-colors">
                {p.state}
              </Link>
              <span>/</span>
              <span className="text-ink font-semibold">{p.area}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-[12px] font-semibold border border-forest-200">
                <span className="h-1.5 w-1.5 rounded-full bg-forest-600"></span>
                <span>Direct Mandate Verified</span>
              </span>
              <span className="text-[12px] font-semibold px-3 py-1 bg-paper-200 text-ink rounded-full border border-ink/10">
                {isSale ? 'For sale' : 'For rent'}
              </span>
              {p.unit_info && (
                <span className="text-[12px] font-semibold px-3 py-1 bg-amber-100/70 text-amber-900 rounded-full border border-amber-300">
                  {p.unit_info}
                </span>
              )}
              <span className="text-[12px] text-ink-600 pl-1 font-mono">
                Ref: {p.id}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-ink tracking-[-0.01em] pt-1">
              {p.title}
            </h1>

            <p className="text-[14px] sm:text-[16px] text-ink-600">
              {p.street_address}, {p.area}, {p.lga}, {p.state}
            </p>
          </div>

          {/* Action buttons with Registration Gating */}
          <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-[14px] font-semibold text-ink shadow-sm transition-all hover:bg-paper-100"
            >
              ← All homes
            </Link>

            {isRegistered ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-forest-700 hover:bg-forest-800 px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm transition-all active:scale-[0.98]"
              >
                <span>Chat with agent</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={() => setShowRegisterModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink hover:bg-ink-800 px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm transition-all active:scale-[0.98]"
              >
                <span>Register to contact</span>
              </button>
            )}
          </div>
        </div>

        {/* Gallery Showcase */}
        <div className="space-y-3">
          <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-paper-200 shadow-md border border-ink/10">
            <img
              src={p.images[selectedImg] || p.images[0]}
              alt={p.title}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 px-3 py-1.5 rounded-full bg-ink/80 backdrop-blur-md text-white text-[12px] sm:text-[13px] font-medium border border-white/10">
              Photo {selectedImg + 1} of {p.images.length} · {p.area}, {p.state}
            </div>
          </div>

          {/* Thumbnails */}
          {p.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {p.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(idx)}
                  className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImg === idx
                      ? 'border-amber-500 ring-2 ring-amber-400/40'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${p.title} thumb ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 items-start">
          {/* Left Column: Specs, Description, Infrastructure, Documents */}
          <div className="lg:col-span-2 space-y-8 sm:space-y-10">
            {/* Key Specs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 bg-white rounded-2xl border border-ink/10 shadow-sm text-center">
              <div className="p-3 bg-paper-100 rounded-xl">
                <span className="text-[12px] text-ink-600 block">Bedrooms</span>
                <span className="text-lg sm:text-xl font-serif text-ink mt-0.5 block">
                  {p.bedrooms === 0 ? 'Studio' : `${p.bedrooms} Beds`}
                </span>
              </div>
              <div className="p-3 bg-paper-100 rounded-xl">
                <span className="text-[12px] text-ink-600 block">Bathrooms</span>
                <span className="text-lg sm:text-xl font-serif text-ink mt-0.5 block">
                  {p.bathrooms} Baths
                </span>
              </div>
              <div className="p-3 bg-paper-100 rounded-xl">
                <span className="text-[12px] text-ink-600 block">Parking / Garage</span>
                <span className="text-lg sm:text-xl font-serif text-ink mt-0.5 block">
                  {p.parking_spaces ? `${p.parking_spaces} Bays` : 'Compound'}
                </span>
              </div>
              <div className="p-3 bg-forest-50 border border-forest-200/60 rounded-xl">
                <span className="text-[12px] text-forest-800 block">Viewing Fee</span>
                <span className="text-base sm:text-lg font-serif text-forest-800 font-bold block mt-0.5">
                  ₦0 Free
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl border border-ink/10 p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="font-serif text-2xl text-ink">Property Description</h2>
              <p className="text-[15px] sm:text-[16px] text-ink-800 whitespace-pre-line leading-relaxed">
                {p.description}
              </p>
            </div>

            {/* Verified Infrastructure & Utilities */}
            <div className="bg-white rounded-3xl border border-ink/10 p-6 sm:p-8 space-y-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-ink/10 pb-4">
                <div>
                  <h2 className="font-serif text-2xl text-ink">Verified Infrastructure & Utilities</h2>
                  <p className="text-[13px] text-ink-600">
                    Physically inspected utilities, metering, power stability, and water supply.
                  </p>
                </div>
                <Link
                  href="/verified-infrastructure"
                  className="text-[13px] font-semibold text-amber-700 hover:text-amber-800 underline decoration-amber-400 decoration-1 underline-offset-2 shrink-0"
                >
                  Our audit standards →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {p.amenities.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-[14px] sm:text-[15px] text-ink bg-paper-100 p-3.5 rounded-xl border border-ink/5"
                  >
                    <svg className="h-4 w-4 text-forest-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center sm:text-left">
                <Link
                  href="/verified-infrastructure"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-forest-800 bg-forest-50 px-3 py-1.5 rounded-lg border border-forest-200/60 hover:bg-forest-100 transition-colors"
                >
                  <span>✓ 100% Physical Infrastructure Inspection Guarantee</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Verified Legal Title Documents (Distinct from utilities) */}
            {p.legal_documents && p.legal_documents.length > 0 && (
              <div className="bg-white rounded-3xl border border-ink/10 p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="border-b border-ink/10 pb-3">
                  <h2 className="font-serif text-2xl text-ink">Verified Legal Title Documents</h2>
                  <p className="text-[13px] text-ink-600">
                    Ownership title records and direct mandate letters vetted by our compliance desk.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {p.legal_documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-[14px] sm:text-[15px] text-ink bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/60"
                    >
                      <span className="h-5 w-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold shrink-0">
                        ✓
                      </span>
                      <span className="font-medium text-ink-900">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Guarantee Callout */}
            <div className="p-6 sm:p-8 rounded-3xl bg-forest-900 text-white shadow-md space-y-3 relative overflow-hidden">
              <p className="text-[13px] font-semibold text-amber-300">
                Direct Mandate Guarantee
              </p>
              <h3 className="font-serif text-xl sm:text-2xl text-white">
                Why this home has zero agent markups
              </h3>
              <p className="text-[14px] sm:text-[15px] text-white/80 leading-relaxed font-normal">
                This listing was submitted directly with verified ownership papers and a signed landlord rate agreement. The price you see is the real rate authorized by the property owner. You will never be asked for viewing fees or unrecorded payments.
              </p>
            </div>
          </div>

          {/* Right Column: Fee Breakdown & Direct Contact Card */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <FeeBreakdownCard
              rentPrice={p.rent_price}
              serviceCharge={p.service_charge}
              cautionFee={p.caution_fee}
              legalFeePct={p.legal_fee_pct}
              agencyFeePct={p.agency_fee_pct}
              isSale={isSale}
            />

            {/* Listing Mandate Holder Card */}
            <div className="bg-white rounded-3xl border border-ink/10 p-6 shadow-sm space-y-4">
              <h3 className="font-serif text-lg text-ink font-semibold">
                Listing Mandate Holder
              </h3>

              <div className="p-4 bg-paper-100 rounded-2xl space-y-1.5 border border-ink/5">
                <p className="text-[15px] font-semibold text-ink">{p.owner.name}</p>
                <p className="text-[13px] text-ink-600">Direct Landlord / Mandate Holder</p>
                <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-forest-700 bg-forest-50 px-2.5 py-0.5 rounded-full mt-1 border border-forest-200/50">
                  <span>✓</span>
                  <span>Verified Lister · ₦0 Inspection Fee Guarantee</span>
                </span>
              </div>

              {/* Contact Actions Gated by Registration (BR-011) */}
              {isRegistered ? (
                <div className="space-y-2.5 pt-1">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-forest-700 hover:bg-forest-800 text-white rounded-xl font-semibold text-[14px] flex items-center justify-center gap-2 shadow-sm transition-all text-center block"
                  >
                    Chat on WhatsApp Direct →
                  </a>

                  <button
                    type="button"
                    onClick={() => setShowInspectionModal(true)}
                    className="w-full py-3 px-4 bg-ink hover:bg-ink-800 text-amber-300 rounded-xl font-semibold text-[14px] flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    Schedule Free Viewing (₦0 Fee) →
                  </button>

                  <p className="text-[12px] text-forest-700 text-center pt-1 font-mono font-medium">
                    ✓ Verified Seeker Access · Rep Phone: {p.owner.phone_masked.replace('••• ••', '814 20')}
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl bg-amber-50/80 border border-amber-200 p-4 space-y-3 text-left">
                  <div className="flex items-center gap-2 text-amber-900 font-semibold text-[14px]">
                    <svg className="h-4 w-4 text-amber-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Contact Details Locked</span>
                  </div>
                  <p className="text-[12px] text-ink-700 leading-relaxed">
                    Direct agent WhatsApp and viewing schedules are accessible to registered seekers (BR-011) to eliminate broker poaching and ensure genuine inquiries.
                  </p>
                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowRegisterModal(true)}
                      className="w-full py-2.5 px-4 bg-ink hover:bg-ink-800 text-amber-300 rounded-xl font-semibold text-[13px] flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                    >
                      Register Free to Reveal Contact →
                    </button>
                    <Link
                      href={`/login?redirect=/properties/${p.slug}`}
                      className="block text-center text-[12px] text-ink-600 font-semibold hover:text-ink underline"
                    >
                      Already registered? Sign in
                    </Link>
                  </div>
                  <p className="text-[11px] text-ink-500 text-center pt-0.5 font-mono">
                    Masked Rep: {p.owner.phone_masked}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick In-Context Registration Modal */}
        {showRegisterModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-ink/10">
              <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                <div>
                  <h3 className="text-ink font-serif text-xl font-bold">
                    Unlock Direct Mandate Contact
                  </h3>
                  <p className="text-[13px] text-ink-600">Zero viewing fees · Direct owner prices</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="text-ink-600 hover:text-ink text-xl font-semibold p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {regSubmitted ? (
                <div className="py-6 text-center space-y-3">
                  <div className="h-12 w-12 bg-forest-100 text-forest-700 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="font-serif text-xl text-ink">Account Verified!</h4>
                  <p className="text-[14px] text-ink-600 max-w-xs mx-auto leading-relaxed">
                    Agent contact and WhatsApp viewing details are now unlocked for this property.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuickRegister} className="space-y-4">
                  <p className="text-[13px] text-ink-600 leading-relaxed">
                    Register once as a verified seeker to chat directly with property mandate holders across all listings.
                  </p>

                  <div>
                    <label className="block text-[13px] font-semibold text-ink mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chinedu Okafor"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-paper-100 border border-ink/10 rounded-xl text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-ink mb-1">
                      Phone Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0803 123 4567"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-paper-100 border border-ink/10 rounded-xl text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-ink mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. chinedu@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-paper-100 border border-ink/10 rounded-xl text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="p-3 bg-forest-50 rounded-xl border border-forest-200/60 text-[12px] text-forest-800">
                    ✓ ₦0 Inspection Fee Pledge: You will never be asked to pay an inspection fee before viewing.
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowRegisterModal(false)}
                      className="flex-1 py-2.5 rounded-xl border border-ink/15 text-[14px] font-semibold text-ink hover:bg-paper-100 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-ink text-amber-300 text-[14px] font-semibold hover:bg-ink-800 cursor-pointer shadow-md"
                    >
                      Unlock Contact Now
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Free Inspection Modal */}
        {showInspectionModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-ink/10">
              <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                <div>
                  <h3 className="text-ink font-serif text-xl font-bold">
                    Schedule Free Viewing
                  </h3>
                  <p className="text-[13px] text-ink-600">₦0 Inspection Fee · Direct Mandate</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowInspectionModal(false)}
                  className="text-ink-600 hover:text-ink text-xl font-semibold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {inspectionSubmitted ? (
                <div className="py-6 text-center space-y-3">
                  <div className="h-12 w-12 bg-forest-100 text-forest-700 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="font-serif text-xl text-ink">Inspection Request Sent!</h4>
                  <p className="text-[14px] text-ink-600 max-w-xs mx-auto leading-relaxed">
                    The mandate holder has received your request and will confirm your viewing slot within 24 hours under the RentOra SLA.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setInspectionSubmitted(false);
                      setShowInspectionModal(false);
                    }}
                    className="mt-4 px-6 py-2.5 bg-ink text-white text-[14px] font-semibold rounded-xl cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleScheduleViewing}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-[13px] font-semibold text-ink mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={proposedDate}
                      onChange={(e) => setProposedDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-paper-100 border border-ink/10 rounded-xl text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-ink mb-1">
                      Time Window
                    </label>
                    <select
                      value={proposedSlot}
                      onChange={(e) => setProposedSlot(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-paper-100 border border-ink/10 rounded-xl text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                    >
                      <option value="10:00 AM - 12:00 PM">Morning (10:00 AM – 12:00 PM)</option>
                      <option value="12:00 PM - 02:00 PM">Afternoon (12:00 PM – 02:00 PM)</option>
                      <option value="02:00 PM - 04:00 PM">Late Afternoon (02:00 PM – 04:00 PM)</option>
                    </select>
                  </div>

                  <div className="p-3 bg-forest-50 rounded-xl border border-forest-200/60 text-[12px] text-forest-800">
                    ✓ Verified Mandate: You will never be asked to pay an inspection fee or gate pass.
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowInspectionModal(false)}
                      className="flex-1 py-2.5 rounded-xl border border-ink/15 text-[14px] font-semibold text-ink hover:bg-paper-100 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-ink text-white text-[14px] font-semibold hover:bg-ink-800 cursor-pointer"
                    >
                      Confirm Slot
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Igbo Uli Line */}
        <UliLine id="uli-detail-bottom" className="my-14 sm:my-20 block h-4 w-full text-amber-500/70" />

        {/* Related Listings Section */}
        {relatedProperties.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[13px] sm:text-[14px] font-semibold text-ink-600">Explore more</p>
                <h2 className="mt-1 font-serif text-2xl sm:text-3xl lg:text-4xl text-ink">
                  Other verified homes
                </h2>
              </div>
              <Link
                href="/properties"
                className="text-[14px] font-semibold text-ink underline decoration-amber-400 decoration-2 underline-offset-4 hover:decoration-ink"
              >
                See all homes →
              </Link>
            </div>

            <div className="grid gap-y-10 sm:gap-x-6 sm:gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
