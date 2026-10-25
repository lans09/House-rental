'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  HouseOneStore,
  CatalogueItem,
  ViewingRequest,
  UploadedFileRecord,
  MemberRecord,
} from '@/lib/admin-store';
import { DocumentUploader } from '@/components/FileUploadZone';
import { DocumentViewerModal } from '@/components/DocumentViewerModal';

function DashboardContent() {
  const router = useRouter();
  const { user, isAuthenticated, signOut, signIn } = useAuth();

  const [activeTab, setActiveTab] = useState<'properties' | 'viewings' | 'kyc' | 'saved'>('properties');
  const [catalogue, setCatalogue] = useState<CatalogueItem[]>([]);
  const [viewings, setViewings] = useState<ViewingRequest[]>([]);
  const [members, setMembers] = useState<MemberRecord[]>([]);
  const [previewDoc, setPreviewDoc] = useState<UploadedFileRecord | null>(null);
  const [propertyFilter, setPropertyFilter] = useState<'all' | 'published' | 'unpublished'>('all');

  // Sync store
  useEffect(() => {
    const sync = () => {
      setCatalogue(HouseOneStore.getCatalogue());
      setViewings(HouseOneStore.getViewings());
      setMembers(HouseOneStore.getMembers());
    };
    sync();
    window.addEventListener('houseone-store-updated', sync);
    return () => window.removeEventListener('houseone-store-updated', sync);
  }, []);

  // Default tab based on role
  useEffect(() => {
    if (user?.role === 'seeker') {
      setActiveTab('viewings');
    } else {
      setActiveTab('properties');
    }
  }, [user?.role]);

  // Landlord: Owner's properties (Strictly rentals)
  const myProperties = useMemo(() => {
    if (!user) return [];
    const fullName = `${user.firstName} ${user.lastName}`.trim().toLowerCase();
    const biz = (user.businessName || '').toLowerCase();
    const matched = catalogue.filter((c) => {
      const ownerLower = c.ownerName.toLowerCase();
      return (
        (user.email && c.ownerEmail?.toLowerCase() === user.email.toLowerCase()) ||
        (fullName && ownerLower.includes(fullName)) ||
        (biz && ownerLower.includes(biz)) ||
        ownerLower.includes(user.firstName.toLowerCase())
      );
    });
    return matched.length > 0 ? matched : catalogue.slice(0, 6);
  }, [catalogue, user]);

  const filteredProperties = useMemo(() => {
    if (propertyFilter === 'published') return myProperties.filter((p) => p.status === 'published');
    if (propertyFilter === 'unpublished') return myProperties.filter((p) => p.status !== 'published');
    return myProperties;
  }, [myProperties, propertyFilter]);

  // Seeker: My requested viewings
  const mySeekerViewings = useMemo(() => {
    if (!user) return [];
    const fullName = `${user.firstName} ${user.lastName}`.trim().toLowerCase();
    return viewings.filter(
      (v) =>
        v.seekerEmail.toLowerCase() === user.email.toLowerCase() ||
        (fullName && v.seekerName.toLowerCase().includes(fullName))
    );
  }, [viewings, user]);

  // Landlord: Tour requests on my properties
  const myPropertyTourRequests = useMemo(() => {
    if (!user || user.role !== 'owner') return [];
    const mySlugs = new Set(myProperties.map((p) => p.slug));
    const myTitles = new Set(myProperties.map((p) => p.title.toLowerCase()));
    const matched = viewings.filter(
      (v) => mySlugs.has(v.propertySlug) || myTitles.has(v.propertyTitle.toLowerCase())
    );
    return matched.length > 0 ? matched : viewings.slice(0, 3);
  }, [viewings, myProperties, user]);

  // Seeker: Saved / Shortlisted Properties
  const savedPropertiesList = useMemo(() => {
    if (!user) return [];
    const currentMember = members.find((m) => m.email.toLowerCase() === user.email.toLowerCase());
    const savedSlugs = currentMember?.savedProperties || [];
    return catalogue.filter((c) => savedSlugs.includes(c.slug));
  }, [catalogue, members, user]);

  // Landlord KYC docs
  const currentMemberRecord = useMemo(() => {
    if (!user) return null;
    return members.find((m) => m.email.toLowerCase() === user.email.toLowerCase()) || null;
  }, [members, user]);

  const kycDocs = useMemo(() => {
    return currentMemberRecord?.kycDocuments || [];
  }, [currentMemberRecord]);

  const handleUpdateKycDocs = (newDocs: UploadedFileRecord[]) => {
    if (!user) return;
    const updatedMember: MemberRecord = {
      ...user,
      kycDocuments: newDocs,
    };
    HouseOneStore.addOrUpdateMember(updatedMember);
    setMembers(HouseOneStore.getMembers());
  };

  const handleMarkListingStatus = (id: string, newStatus: 'published' | 'unpublished') => {
    HouseOneStore.updatePropertyStatus(id, newStatus);
    setCatalogue(HouseOneStore.getCatalogue());
  };

  const handleConfirmViewing = (viewingId: string) => {
    HouseOneStore.updateViewingStatus(
      viewingId,
      'confirmed',
      'Appointment confirmed by direct landlord. Viewing fee is ₦0.'
    );
    setViewings(HouseOneStore.getViewings());
  };

  const handleDeclineViewing = (viewingId: string) => {
    const note = prompt('Please propose a preferred inspection date or morning/afternoon slot:');
    if (note) {
      HouseOneStore.updateViewingStatus(viewingId, 'declined', note);
      setViewings(HouseOneStore.getViewings());
    }
  };

  const switchAccount = (role: 'seeker' | 'owner') => {
    const allMembers = HouseOneStore.getMembers();
    const matched = allMembers.find((m) => m.role === role);
    if (matched) {
      signIn(matched);
      setActiveTab(role === 'owner' ? 'properties' : 'viewings');
    }
  };

  // If not signed in
  if (!isAuthenticated || !user) {
    return (
      <div className="bg-paper min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white border border-ink/15 rounded-2xl p-8 space-y-6 text-center shadow-sm">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-forest-800">
              HouseOne Access
            </span>
            <h1 className="text-2xl font-bold text-ink tracking-tight">Sign in to your dashboard</h1>
            <p className="text-xs text-ink-600 leading-relaxed">
              Access your verified rental listings, direct mandate paperwork, or scheduled inspection appointments.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/login?redirect=/dashboard"
              className="w-full py-3 rounded-lg bg-ink text-white text-sm font-semibold hover:bg-forest-900 transition-colors"
            >
              Sign In →
            </Link>
            <Link
              href="/register"
              className="w-full py-3 rounded-lg border border-ink/15 text-sm font-semibold text-ink hover:bg-paper transition-colors"
            >
              Register New Account
            </Link>
          </div>

          <div className="pt-4 border-t border-ink/10 text-left space-y-2">
            <span className="text-xs font-semibold text-ink-600 block">
              Quick Preview Mode:
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => switchAccount('owner')}
                className="flex-1 py-2 px-3 rounded-lg bg-paper border border-ink/10 text-xs font-medium text-ink hover:border-ink cursor-pointer text-center"
              >
                Landlord (Chief Eze)
              </button>
              <button
                type="button"
                onClick={() => switchAccount('seeker')}
                className="flex-1 py-2 px-3 rounded-lg bg-paper border border-ink/10 text-xs font-medium text-ink hover:border-ink cursor-pointer text-center"
              >
                Seeker (Obinna)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isOwner = user.role === 'owner';
  const isSeeker = user.role === 'seeker';

  const publishedCount = myProperties.filter((p) => p.status === 'published').length;
  const pendingCount = myProperties.filter((p) => p.status === 'pending').length;
  const unpublishedCount = myProperties.filter((p) => p.status === 'unpublished').length;

  return (
    <div className="bg-paper min-h-screen text-ink pb-32">
      {/* Dashboard Header */}
      <header className="border-b border-ink/10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-medium text-ink-600">
                <span className="text-forest-800 font-semibold uppercase">
                  {isOwner ? 'Direct Mandate Desk' : 'Verified Seeker Desk'}
                </span>
                <span>·</span>
                <span>Ref: {user.id}</span>
                <span>·</span>
                <span>{user.city}, Nigeria</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
                {user.businessName || `${user.firstName} ${user.lastName}`}
              </h1>

              <p className="text-sm text-ink-600 leading-relaxed font-sans">
                {isOwner
                  ? `${user.listerType === 'landlord' ? 'Direct Property Owner (Landlord)' : user.listerType === 'agent' ? 'Authorized Independent Agent' : 'Family Caretaker'} · ₦0 Inspection Fee Guarantee Active`
                  : 'Manage your inspection appointments, viewing slots & shortlisted rental homes'}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {isOwner ? (
                <Link
                  href="/list-property"
                  className="px-5 py-2.5 rounded-lg bg-forest-900 text-white text-xs font-semibold hover:bg-ink transition-colors shadow-sm"
                >
                  + List New Rental
                </Link>
              ) : (
                <Link
                  href="/properties"
                  className="px-5 py-2.5 rounded-lg bg-forest-900 text-white text-xs font-semibold hover:bg-ink transition-colors shadow-sm"
                >
                  Browse Verified Rentals →
                </Link>
              )}

              <button
                type="button"
                onClick={signOut}
                className="px-3.5 py-2.5 rounded-lg border border-ink/15 text-xs font-semibold text-ink-600 hover:text-ink hover:border-ink transition-colors cursor-pointer"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Consolidated Portfolio Summary Ledger */}
        {isOwner && (
          <section className="bg-white border border-ink/15 rounded-2xl overflow-hidden shadow-sm" aria-label="Portfolio Summary">
            <div className="p-4 bg-paper-100/70 border-b border-ink/10 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-600">
                Rental Portfolio Ledger
              </span>
              <span className="text-xs text-forest-800 font-semibold">
                Direct Mandate Verified
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-ink/10">
              <div className="p-5 space-y-1">
                <span className="text-xs text-ink-600 block">Total Rentals</span>
                <span className="text-2xl font-bold tabular-nums text-ink">{myProperties.length}</span>
                <span className="text-[11px] text-ink-600 block">Registered in catalogue</span>
              </div>

              <div className="p-5 space-y-1">
                <span className="text-xs text-forest-800 block">Vacant &amp; Live</span>
                <span className="text-2xl font-bold tabular-nums text-forest-900">{publishedCount}</span>
                <span className="text-[11px] text-ink-600 block">Open for inspection</span>
              </div>

              <div className="p-5 space-y-1">
                <span className="text-xs text-amber-900 block">Under Compliance Audit</span>
                <span className="text-2xl font-bold tabular-nums text-amber-900">{pendingCount}</span>
                <span className="text-[11px] text-ink-600 block">Papers being vetted</span>
              </div>

              <div className="p-5 space-y-1">
                <span className="text-xs text-ink-600 block">Inspection Bookings</span>
                <span className="text-2xl font-bold tabular-nums text-ink">{myPropertyTourRequests.length}</span>
                <span className="text-[11px] text-ink-600 block">Incoming tenant viewings</span>
              </div>
            </div>
          </section>
        )}

        {/* Dashboard Navigation Tabs */}
        <nav className="border-b border-ink/10 flex items-center gap-6 overflow-x-auto" aria-label="Sections">
          {isOwner && (
            <>
              <button
                type="button"
                onClick={() => setActiveTab('properties')}
                className={`pb-3 text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'properties'
                    ? 'border-ink text-ink'
                    : 'border-transparent text-ink-600 hover:text-ink'
                }`}
              >
                Rental Inventory ({myProperties.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('viewings')}
                className={`pb-3 text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'viewings'
                    ? 'border-ink text-ink'
                    : 'border-transparent text-ink-600 hover:text-ink'
                }`}
              >
                <span>Tour Bookings</span>
                {myPropertyTourRequests.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-400 text-xs font-bold text-ink">
                    {myPropertyTourRequests.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('kyc')}
                className={`pb-3 text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'kyc'
                    ? 'border-ink text-ink'
                    : 'border-transparent text-ink-600 hover:text-ink'
                }`}
              >
                Mandate &amp; Title Papers ({kycDocs.length})
              </button>
            </>
          )}

          {isSeeker && (
            <>
              <button
                type="button"
                onClick={() => setActiveTab('viewings')}
                className={`pb-3 text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'viewings'
                    ? 'border-ink text-ink'
                    : 'border-transparent text-ink-600 hover:text-ink'
                }`}
              >
                Scheduled Inspections ({mySeekerViewings.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('saved')}
                className={`pb-3 text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'saved'
                    ? 'border-ink text-ink'
                    : 'border-transparent text-ink-600 hover:text-ink'
                }`}
              >
                Saved Rentals ({savedPropertiesList.length})
              </button>
            </>
          )}
        </nav>

        {/* ───────────── TAB 1: OWNER RENTAL INVENTORY ───────────── */}
        {isOwner && activeTab === 'properties' && (
          <section className="space-y-5">
            {/* Filter pills */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setPropertyFilter('all')}
                  className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                    propertyFilter === 'all'
                      ? 'bg-ink text-white border-ink'
                      : 'bg-white text-ink-600 border-ink/15 hover:border-ink/40'
                  }`}
                >
                  All ({myProperties.length})
                </button>
                <button
                  type="button"
                  onClick={() => setPropertyFilter('published')}
                  className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                    propertyFilter === 'published'
                      ? 'bg-ink text-white border-ink'
                      : 'bg-white text-ink-600 border-ink/15 hover:border-ink/40'
                  }`}
                >
                  Live on Market ({publishedCount})
                </button>
                <button
                  type="button"
                  onClick={() => setPropertyFilter('unpublished')}
                  className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                    propertyFilter === 'unpublished'
                      ? 'bg-ink text-white border-ink'
                      : 'bg-white text-ink-600 border-ink/15 hover:border-ink/40'
                  }`}
                >
                  Offline / Rented ({unpublishedCount + pendingCount})
                </button>
              </div>

              <Link
                href="/list-property"
                className="text-xs font-semibold text-ink underline decoration-amber-400 underline-offset-4 hover:decoration-ink"
              >
                + Register Another Home →
              </Link>
            </div>

            {/* Properties Table / Cards */}
            <div className="border border-ink/15 rounded-2xl overflow-hidden bg-white shadow-sm">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-paper-100 text-xs font-semibold uppercase tracking-wider text-ink-600 border-b border-ink/10">
                    <th className="py-3.5 px-5">Residence</th>
                    <th className="py-3.5 px-5">Location</th>
                    <th className="py-3.5 px-5 text-right">Annual Rent</th>
                    <th className="py-3.5 px-5">Availability Status</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10">
                  {filteredProperties.map((item) => (
                    <tr key={item.id} className="hover:bg-paper/40 transition-colors">
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3.5">
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-paper-100 shrink-0 border border-ink/10">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-base font-semibold text-ink leading-snug">
                              {item.title}
                            </p>
                            <span className="text-xs text-ink-600 font-medium">
                              {item.bedrooms} Bed · {item.bathrooms} Bath
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-5 text-xs text-ink-600">
                        <span className="font-semibold text-ink block">{item.area}</span>
                        <span>{item.address || item.state}</span>
                      </td>

                      <td className="py-4 px-5 text-right font-bold tabular-nums text-ink">
                        ₦{item.price.toLocaleString()}
                        <span className="block text-[11px] text-ink-600 font-normal">/ year</span>
                      </td>

                      <td className="py-4 px-5">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-md font-semibold border ${
                            item.status === 'published'
                              ? 'bg-forest-50 border-forest-200 text-forest-800'
                              : item.status === 'pending'
                              ? 'bg-amber-50 border-amber-300 text-amber-900'
                              : 'bg-paper border-ink/10 text-ink-600'
                          }`}
                        >
                          {item.status === 'published'
                            ? 'Live on Market'
                            : item.status === 'pending'
                            ? 'Audit Pending'
                            : 'Offline / Rented'}
                        </span>
                      </td>

                      <td className="py-4 px-5 text-right text-xs space-x-3 whitespace-nowrap">
                        <Link
                          href={`/properties/${item.slug}`}
                          className="text-xs font-semibold text-ink underline decoration-amber-400 underline-offset-4 hover:decoration-ink"
                        >
                          Inspect
                        </Link>

                        {item.status === 'published' ? (
                          <button
                            type="button"
                            onClick={() => handleMarkListingStatus(item.id, 'unpublished')}
                            className="text-xs font-medium text-ink-600 hover:text-ink cursor-pointer"
                          >
                            Mark Rented
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleMarkListingStatus(item.id, 'published')}
                            className="text-xs font-semibold text-forest-800 hover:text-forest-900 cursor-pointer"
                          >
                            Publish Live
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ───────────── TAB 2: OWNER TOUR REQUESTS ───────────── */}
        {isOwner && activeTab === 'viewings' && (
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-ink/10 pb-3">
              <div>
                <h2 className="font-serif text-xl text-ink font-normal">
                  Tenant Inspection Appointments
                </h2>
                <p className="text-xs text-ink-600 mt-0.5">
                  Confirm physical viewing slots with prospective tenants. ₦0 inspection fee guarantee applies to all appointments.
                </p>
              </div>
              <span className="font-mono text-xs text-ink-600">
                {myPropertyTourRequests.length} requests
              </span>
            </div>

            <div className="space-y-3">
              {myPropertyTourRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white border border-ink/15 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-medium border ${
                          request.status === 'confirmed'
                            ? 'bg-forest-50 border-forest-200 text-forest-800'
                            : request.status === 'declined'
                            ? 'bg-amber-50 border-amber-300 text-amber-900'
                            : 'bg-paper border-ink/10 text-ink'
                        }`}
                      >
                        {request.status === 'confirmed'
                          ? 'Confirmed'
                          : request.status === 'declined'
                          ? 'Rescheduled'
                          : 'Pending Confirmation'}
                      </span>
                      <span className="font-mono text-[11px] text-ink-600">
                        Date: {request.proposedDate} ({request.timeSlot})
                      </span>
                    </div>

                    <h3 className="font-serif text-lg text-ink font-medium leading-snug">
                      {request.propertyTitle}
                    </h3>

                    <p className="text-xs text-ink-600">
                      Applicant: <strong className="text-ink">{request.seekerName}</strong> · Phone:{' '}
                      <span className="font-mono">{request.seekerPhone}</span>
                    </p>

                    {request.ownerResponseNote && (
                      <p className="text-xs text-forest-900 font-sans pt-1">
                        Note: {request.ownerResponseNote}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    {request.status !== 'confirmed' && (
                      <button
                        type="button"
                        onClick={() => handleConfirmViewing(request.id)}
                        className="px-4 py-2 rounded-lg bg-forest-900 text-white text-xs font-mono uppercase tracking-wider hover:bg-ink transition-colors cursor-pointer"
                      >
                        Confirm Slot
                      </button>
                    )}

                    {request.status === 'pending' && (
                      <button
                        type="button"
                        onClick={() => handleDeclineViewing(request.id)}
                        className="px-3.5 py-2 rounded-lg border border-ink/15 text-xs font-mono uppercase tracking-wider text-ink-600 hover:text-ink cursor-pointer"
                      >
                        Reschedule
                      </button>
                    )}

                    <a
                      href={`https://wa.me/${request.seekerPhone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(request.seekerName)},%20reaching%20out%20regarding%20your%20inspection%20request%20for%20${encodeURIComponent(request.propertyTitle)}%20on%20HouseOne.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-paper border border-ink/15 text-xs font-mono uppercase tracking-wider text-ink hover:border-ink transition-colors"
                    >
                      WhatsApp Applicant →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ───────────── TAB 3: OWNER MANDATE PAPERS VAULT ───────────── */}
        {isOwner && activeTab === 'kyc' && (
          <section className="bg-white border border-ink/15 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="border-b border-ink/10 pb-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-forest-800 font-medium">
                Confidential Document Repository
              </span>
              <h2 className="font-serif text-2xl text-ink font-normal mt-0.5">
                Mandate &amp; Property Title Papers
              </h2>
              <p className="text-xs text-ink-600 mt-1 max-w-xl">
                Upload registered Deed of Assignment, direct landlord mandate letters, or compound utility bills.
                These papers remain confidential within the compliance desk for physical audit.
              </p>
            </div>

            <DocumentUploader
              files={kycDocs}
              onChange={handleUpdateKycDocs}
              onPreviewFile={setPreviewDoc}
            />
          </section>
        )}

        {/* ───────────── TAB 4: SEEKER INSPECTIONS ───────────── */}
        {isSeeker && activeTab === 'viewings' && (
          <section className="space-y-5">
            <div className="border-b border-ink/10 pb-3 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl text-ink font-normal">
                  Your Scheduled Rental Inspections
                </h2>
                <p className="text-xs text-ink-600 mt-0.5">
                  Direct physical viewing appointments. Every inspection on HouseOne is 100% free of charge.
                </p>
              </div>
              <span className="font-mono text-xs text-ink-600">
                {mySeekerViewings.length} bookings
              </span>
            </div>

            {mySeekerViewings.length === 0 ? (
              <div className="border border-ink/15 rounded-2xl p-10 bg-white text-center space-y-3">
                <h3 className="font-serif text-lg text-ink font-normal">No scheduled viewings yet</h3>
                <p className="text-xs text-ink-600 max-w-sm mx-auto">
                  When you book a free inspection on any verified rental, your confirmed time window and direct landlord contacts will appear here.
                </p>
                <Link
                  href="/properties"
                  className="inline-block mt-2 px-5 py-2.5 rounded-lg bg-ink text-white text-xs font-mono uppercase tracking-wider hover:bg-forest-900"
                >
                  Browse Available Rentals →
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {mySeekerViewings.map((viewing) => (
                  <div
                    key={viewing.id}
                    className="bg-white border border-ink/15 rounded-2xl p-5 space-y-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span
                          className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-medium border ${
                            viewing.status === 'confirmed'
                              ? 'bg-forest-50 border-forest-200 text-forest-800'
                              : 'bg-paper border-ink/10 text-ink'
                          }`}
                        >
                          {viewing.status === 'confirmed' ? 'Confirmed Appointment' : 'Pending Confirmation'}
                        </span>
                        <h4 className="font-serif text-base text-ink font-medium mt-2 leading-snug">
                          {viewing.propertyTitle}
                        </h4>
                        <p className="text-xs text-ink-600">{viewing.propertyArea}</p>
                      </div>

                      <span className="font-mono text-[10px] text-forest-800 bg-forest-50 px-2 py-1 rounded border border-forest-200 shrink-0">
                        ₦0 Fee Free
                      </span>
                    </div>

                    <div className="p-3 bg-paper rounded-xl space-y-1 text-xs">
                      <p className="text-ink-600">
                        <span className="text-ink font-medium">Viewing Window:</span> {viewing.proposedDate} ({viewing.timeSlot})
                      </p>
                      {viewing.ownerResponseNote && (
                        <p className="text-ink-600 pt-1 border-t border-ink/10">
                          <span className="text-ink font-medium">Landlord Note:</span> {viewing.ownerResponseNote}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-ink/10 text-xs">
                      <Link
                        href={`/properties/${viewing.propertySlug}`}
                        className="font-mono text-xs text-ink underline decoration-amber-400 underline-offset-4 hover:decoration-ink"
                      >
                        View listing →
                      </Link>

                      <a
                        href="https://wa.me/2348030000000?text=Hello,%20I%20have%20a%20scheduled%20viewing%20on%20HouseOne."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-ink-600 hover:text-ink font-mono"
                      >
                        WhatsApp Support →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ───────────── TAB 5: SEEKER SAVED HOMES ───────────── */}
        {isSeeker && activeTab === 'saved' && (
          <section className="space-y-5">
            <div className="border-b border-ink/10 pb-3">
              <h2 className="font-serif text-xl text-ink font-normal">
                Saved Rental Homes ({savedPropertiesList.length})
              </h2>
            </div>

            {savedPropertiesList.length === 0 ? (
              <div className="border border-ink/15 rounded-2xl p-10 bg-white text-center space-y-3">
                <h3 className="font-serif text-lg text-ink font-normal">No saved rentals yet</h3>
                <p className="text-xs text-ink-600 max-w-sm mx-auto">
                  Click the save button on any verified rental to review its terms and compare options.
                </p>
                <Link
                  href="/properties"
                  className="inline-block mt-2 px-5 py-2.5 rounded-lg bg-ink text-white text-xs font-mono uppercase tracking-wider hover:bg-forest-900"
                >
                  Browse Catalogue →
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {savedPropertiesList.map((item) => (
                  <div
                    key={item.id}
                    className="border border-ink/15 rounded-2xl bg-white overflow-hidden shadow-sm flex flex-col"
                  >
                    <div className="relative h-44 w-full bg-paper-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-600">
                          {item.area}, {item.state}
                        </span>
                        <h4 className="font-serif text-base text-ink font-medium leading-snug mt-1">
                          {item.title}
                        </h4>
                      </div>

                      <div className="pt-2 border-t border-ink/10 flex items-baseline justify-between">
                        <span className="font-mono text-base font-medium text-ink">
                          ₦{item.price.toLocaleString()}
                          <span className="text-xs text-ink-600 font-sans"> / year</span>
                        </span>
                        <Link
                          href={`/properties/${item.slug}`}
                          className="font-mono text-xs text-ink underline decoration-amber-400 underline-offset-4 hover:decoration-ink"
                        >
                          View →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* In-Browser Document Lightbox Modal */}
      <DocumentViewerModal
        file={previewDoc}
        onClose={() => setPreviewDoc(null)}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-paper min-h-screen text-ink flex items-center justify-center">
          <p className="text-xs font-mono uppercase tracking-widest text-ink-600">Loading dashboard...</p>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
