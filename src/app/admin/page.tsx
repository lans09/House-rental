'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { UliLine } from '@/components/UliLine';
import {
  CatalogueItem,
  CatalogueStatus,
  HouseOneStore,
  MemberRecord,
  MemberRole,
  ViewingRequest,
  UploadedFileRecord,
  FileVerificationStatus,
} from '@/lib/admin-store';
import { useAuth } from '@/context/AuthContext';
import { DocumentViewerModal } from '@/components/DocumentViewerModal';

type DeskSection = 'overview' | 'properties' | 'members' | 'viewings';

const SAMPLE_IMAGES = [
  '/images/enugu-flagship-mansion.jpg',
  '/images/onitsha-gra-mansion.jpg',
  '/images/owerri-new-duplex.jpg',
  '/images/awka-ngozika-duplex.jpg',
  '/images/aba-gra-residence.jpg',
  '/images/asaba-gateway-duplex.jpg',
];

function formatNaira(amount: number): string {
  return '₦' + amount.toLocaleString('en-NG');
}

function AdminDeskContent() {
  const searchParams = useSearchParams();
  const { user, signIn } = useAuth();
  const [section, setSection] = useState<DeskSection>('overview');

  const [catalogue, setCatalogue] = useState<CatalogueItem[]>([]);
  const [members, setMembers] = useState<MemberRecord[]>([]);
  const [viewings, setViewings] = useState<ViewingRequest[]>([]);

  // Filters
  const [propFilter, setPropFilter] = useState<'all' | CatalogueStatus>('all');
  const [propQuery, setPropQuery] = useState('');
  const [memberFilter, setMemberFilter] = useState<'all' | MemberRole>('all');
  const [memberQuery, setMemberQuery] = useState('');

  // Property Review Dossier Modal State
  const [reviewingProperty, setReviewingProperty] = useState<CatalogueItem | null>(
    null
  );
  const [reviewImgIdx, setReviewImgIdx] = useState(0);
  const [editedPrice, setEditedPrice] = useState('');
  const [reviewNoteInput, setReviewNoteInput] = useState('');

  // Member Review Dossier Modal State
  const [reviewingMember, setReviewingMember] = useState<MemberRecord | null>(null);

  // Document Lightbox State
  const [adminViewerDoc, setAdminViewerDoc] = useState<UploadedFileRecord | null>(null);

  const handleInspectPropertyDoc = (docTitle: string, index: number) => {
    if (!reviewingProperty) return;
    const existing = reviewingProperty.attachedFiles?.find(
      (f) => f.categoryLabel === docTitle || f.name.toLowerCase().includes(docTitle.toLowerCase())
    );
    if (existing) {
      setAdminViewerDoc(existing);
    } else {
      const syntheticDoc: UploadedFileRecord = {
        id: `doc-inspect-${reviewingProperty.id}-${index}`,
        name: `${docTitle.replace(/[^a-zA-Z0-9]/g, '_')}_Official_Scan.pdf`,
        sizeBytes: 1024 * 780,
        mimeType: 'application/pdf',
        dataUrl:
          reviewingProperty.images[index % reviewingProperty.images.length] ||
          reviewingProperty.image,
        uploadedAt: reviewingProperty.submittedAt || 'Recent',
        category: 'deed_of_assignment',
        categoryLabel: docTitle,
        verificationStatus: 'unverified',
      };
      setAdminViewerDoc(syntheticDoc);
    }
  };

  const handleUpdateDocStatus = (
    fileId: string,
    status: FileVerificationStatus,
    notes?: string
  ) => {
    if (reviewingProperty) {
      HouseOneStore.updateFileVerification(reviewingProperty.id, fileId, status, notes);
      const updated = HouseOneStore.getCatalogueItemBySlug(reviewingProperty.slug);
      if (updated) setReviewingProperty(updated);
    }
  };

  // Add Property Modal State
  const [showNewProperty, setShowNewProperty] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPurpose, setNewPurpose] = useState<'rent' | 'sale'>('rent');
  const [newType, setNewType] = useState<CatalogueItem['propertyType']>('duplex');
  const [newState, setNewState] = useState('Enugu');
  const [newArea, setNewArea] = useState('Independence Layout');
  const [newAddress, setNewAddress] = useState('');
  const [newPrice, setNewPrice] = useState('4500000');
  const [newCaution, setNewCaution] = useState('400000');
  const [newService, setNewService] = useState('500000');
  const [newBeds, setNewBeds] = useState('4');
  const [newBaths, setNewBaths] = useState('4');
  const [newOwner, setNewOwner] = useState('Direct Landlord Mandate');
  const [newDescription, setNewDescription] = useState('');

  const syncData = () => {
    setCatalogue(HouseOneStore.getCatalogue());
    setMembers(HouseOneStore.getMembers());
    setViewings(HouseOneStore.getViewings());
  };

  useEffect(() => {
    syncData();
    const tabParam = searchParams.get('tab');
    if (tabParam === 'users' || tabParam === 'members') setSection('members');
    if (tabParam === 'properties') setSection('properties');
    if (tabParam === 'viewings') setSection('viewings');

    const onUpdate = () => syncData();
    window.addEventListener('houseone-store-updated', onUpdate);
    return () => window.removeEventListener('houseone-store-updated', onUpdate);
  }, [searchParams]);

  const openPropertyReview = (item: CatalogueItem) => {
    setReviewingProperty(item);
    setReviewImgIdx(0);
    setEditedPrice(String(item.price));
    setReviewNoteInput(item.reviewNotes || '');
  };

  // Property Actions
  const updateListingStatus = (
    id: string,
    status: CatalogueStatus,
    notes?: string,
    overridePrice?: number
  ) => {
    const next = catalogue.map((item) => {
      if (item.id !== id) return item;
      return {
        ...item,
        status,
        price: overridePrice !== undefined && !isNaN(overridePrice) ? overridePrice : item.price,
        reviewNotes: notes !== undefined ? notes : item.reviewNotes,
      };
    });
    HouseOneStore.saveCatalogue(next);
    setCatalogue(next);
    if (reviewingProperty && reviewingProperty.id === id) {
      setReviewingProperty(null);
    }
  };

  const toggleFeatured = (id: string) => {
    const next = catalogue.map((item) =>
      item.id === id ? { ...item, featured: !item.featured } : item
    );
    HouseOneStore.saveCatalogue(next);
    setCatalogue(next);
    if (reviewingProperty && reviewingProperty.id === id) {
      const updated = next.find((i) => i.id === id) || null;
      setReviewingProperty(updated);
    }
  };

  const removeListing = (id: string) => {
    const next = catalogue.filter((item) => item.id !== id);
    HouseOneStore.saveCatalogue(next);
    setCatalogue(next);
    if (reviewingProperty && reviewingProperty.id === id) {
      setReviewingProperty(null);
    }
  };

  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = newTitle.trim() || '4-Bedroom Detached Duplex';
    const slugBase = cleanTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const imgPick = SAMPLE_IMAGES[catalogue.length % SAMPLE_IMAGES.length];

    const created: CatalogueItem = {
      id: `prop-${Date.now()}`,
      title: cleanTitle,
      slug: `${slugBase}-${Date.now().toString().slice(-4)}`,
      purpose: newPurpose,
      propertyType: newType,
      propertyTypeLabel:
        newType === 'flat_apartment'
          ? 'Flat / Apartment'
          : newType === 'detached_mansion'
          ? 'Detached Mansion'
          : 'Duplex',
      state: newState,
      lga: `${newState} Central`,
      area: newArea.trim() || 'GRA',
      address: newAddress.trim() || `${newArea}, ${newState}`,
      landmark: `Central ${newArea} Axis`,
      price: Number(newPrice) || 4500000,
      serviceCharge: Number(newService) || 0,
      cautionFee: Number(newCaution) || 0,
      legalFeePct: 10,
      agencyFeePct: 10,
      bedrooms: Number(newBeds) || 4,
      bathrooms: Number(newBaths) || 4,
      toilets: (Number(newBaths) || 4) + 1,
      parkingSpaces: 3,
      sizeSqm: 280,
      description:
        newDescription.trim() ||
        `Verified ${cleanTitle} located in ${newArea}, ${newState}. Direct landlord mandate with locked pricing and zero viewing fees.`,
      amenities: [
        'Pre-paid Electricity Meter',
        'Borehole Water System',
        'Gated Compound Security',
        'Allocated Car Parking',
      ],
      legalDocuments: [
        'Direct Landlord Mandate Agreement',
        'Verified Title Deed / C of O',
        'Approved Survey Plan',
      ],
      image: imgPick,
      images: [imgPick, SAMPLE_IMAGES[(catalogue.length + 1) % SAMPLE_IMAGES.length]],
      ownerName: newOwner.trim() || 'Direct Landlord',
      ownerCapacity: 'Direct Mandate',
      ownerPhone: '2348030000000',
      status: 'published',
      featured: false,
      submittedAt: new Date().toISOString().slice(0, 10),
    };
    const next = [created, ...catalogue];
    HouseOneStore.saveCatalogue(next);
    setCatalogue(next);
    setShowNewProperty(false);
    setNewTitle('');
    setNewAddress('');
    setNewDescription('');
  };

  // Member Actions
  const updateMemberStatus = (id: string, status: MemberRecord['status']) => {
    const next = members.map((m) => (m.id === id ? { ...m, status } : m));
    HouseOneStore.saveMembers(next);
    setMembers(next);
    if (reviewingMember && reviewingMember.id === id) {
      setReviewingMember(next.find((m) => m.id === id) || null);
    }
  };

  const updateMemberRole = (id: string, role: MemberRole) => {
    const next = members.map((m) => (m.id === id ? { ...m, role } : m));
    HouseOneStore.saveMembers(next);
    setMembers(next);
    if (reviewingMember && reviewingMember.id === id) {
      setReviewingMember(next.find((m) => m.id === id) || null);
    }
  };

  const removeMember = (id: string) => {
    const next = members.filter((m) => m.id !== id);
    HouseOneStore.saveMembers(next);
    setMembers(next);
    if (reviewingMember && reviewingMember.id === id) {
      setReviewingMember(null);
    }
  };

  // Viewing Actions
  const updateViewingStatus = (id: string, status: ViewingRequest['status']) => {
    const next = viewings.map((v) => (v.id === id ? { ...v, status } : v));
    HouseOneStore.saveViewings(next);
    setViewings(next);
  };

  const signInAsAdmin = () => {
    const adminMember =
      members.find((m) => m.role === 'admin') || {
        id: 'mem-1',
        firstName: 'Chukwudi',
        lastName: 'Nnamani',
        email: 'admin@houseone.ng',
        phone: '+234 803 100 0001',
        role: 'admin' as const,
        businessName: 'HouseOne Desk',
        city: 'Enugu',
        status: 'active' as const,
        joinedAt: '2026-09-01',
      };
    signIn(adminMember);
  };

  const publishedCount = catalogue.filter((c) => c.status === 'published').length;
  const pendingListings = catalogue.filter((c) => c.status === 'pending');
  const pendingMembers = members.filter((m) => m.status === 'pending');
  const pendingViewings = viewings.filter((v) => v.status === 'pending');

  const filteredCatalogue = catalogue.filter((item) => {
    if (propFilter !== 'all' && item.status !== propFilter) return false;
    if (propQuery.trim()) {
      const q = propQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.area.toLowerCase().includes(q) ||
        item.state.toLowerCase().includes(q) ||
        item.ownerName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredMembers = members.filter((m) => {
    if (memberFilter !== 'all' && m.role !== memberFilter) return false;
    if (memberQuery.trim()) {
      const q = memberQuery.toLowerCase();
      return (
        `${m.firstName} ${m.lastName}`.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.city.toLowerCase().includes(q) ||
        (m.businessName || '').toLowerCase().includes(q) ||
        (m.phone || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-paper min-h-screen text-ink pb-24">
      {/* Subtle Session Banner if not signed in as Admin */}
      {(!user || user.role !== 'admin') && (
        <div className="border-b border-ink/10 bg-paper-100">
          <div className="container-x py-2.5 flex flex-wrap items-center justify-between gap-3 text-[13px]">
            <span className="text-ink-600">
              {user
                ? `Signed in as ${user.firstName} ${user.lastName} (${user.role}).`
                : 'Viewing Admin Desk in preview mode.'}
            </span>
            <button
              type="button"
              onClick={signInAsAdmin}
              className="font-semibold text-ink underline decoration-amber-400 decoration-2 underline-offset-4 hover:decoration-ink cursor-pointer"
            >
              Switch to Admin session (Chukwudi Nnamani) →
            </button>
          </div>
        </div>
      )}

      {/* Editorial Header */}
      <section className="container-x pt-8 sm:pt-12 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="text-[13px] font-medium text-ink-600">
              Operations & Mandate Desk
            </p>
            <h1 className="mt-2 font-serif text-4xl leading-[1.06] tracking-[-0.02em] text-ink sm:text-5xl">
              Admin Desk.
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/list-property"
              className="rounded-full border border-ink/15 bg-white px-5 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:bg-paper-100"
            >
              Owner submission form
            </Link>
            <button
              type="button"
              onClick={() => setShowNewProperty(true)}
              className="rounded-full bg-ink px-6 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-ink-800 cursor-pointer"
            >
              + Add property
            </button>
          </div>
        </div>

        {/* Clean Hairline Section Navigation */}
        <nav
          aria-label="Admin sections"
          className="mt-8 flex items-center gap-8 border-b border-ink/10 overflow-x-auto"
        >
          {[
            { id: 'overview' as DeskSection, label: 'Overview', count: null },
            {
              id: 'properties' as DeskSection,
              label: 'Properties',
              count: catalogue.length,
            },
            { id: 'members' as DeskSection, label: 'Users', count: members.length },
            {
              id: 'viewings' as DeskSection,
              label: 'Viewings',
              count: viewings.length,
            },
          ].map((tab) => {
            const active = section === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSection(tab.id)}
                className={`relative pb-4 text-[15px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  active ? 'text-ink' : 'text-ink-600 hover:text-ink'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className="ml-2 font-mono text-[12px] text-ink-600 tabular-nums">
                    {tab.count}
                  </span>
                )}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-amber-400" />
                )}
              </button>
            );
          })}
        </nav>
      </section>

      {/* ───────────── 01. OVERVIEW ───────────── */}
      {section === 'overview' && (
        <section className="container-x space-y-14">
          {/* 4-Column Architectural Ledger Metrics */}
          <dl className="grid grid-cols-2 lg:grid-cols-4 border-y border-ink/10 divide-y lg:divide-y-0 lg:divide-x divide-ink/10 bg-white rounded-3xl overflow-hidden">
            <div className="p-6 sm:p-8">
              <dt className="text-[13px] text-ink-600">Published homes</dt>
              <dd className="mt-2 font-serif text-4xl sm:text-5xl text-ink tabular-nums">
                {publishedCount}
              </dd>
              <p className="mt-2 text-[12px] text-forest-700 font-medium">
                Live in public search
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <dt className="text-[13px] text-ink-600">Awaiting review</dt>
              <dd className="mt-2 font-serif text-4xl sm:text-5xl text-ink tabular-nums">
                {pendingListings.length}
              </dd>
              <p className="mt-2 text-[12px] text-ink-600">
                Submitted by landlords & agents
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <dt className="text-[13px] text-ink-600">Registered users</dt>
              <dd className="mt-2 font-serif text-4xl sm:text-5xl text-ink tabular-nums">
                {members.length}
              </dd>
              <p className="mt-2 text-[12px] text-ink-600">
                {pendingMembers.length} agent(s) awaiting approval
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <dt className="text-[13px] text-ink-600">Viewing bookings</dt>
              <dd className="mt-2 font-serif text-4xl sm:text-5xl text-ink tabular-nums">
                {viewings.length}
              </dd>
              <p className="mt-2 text-[12px] text-ink-600">
                {pendingViewings.length} awaiting confirmation
              </p>
            </div>
          </dl>

          {/* Split View: Pending Listings + Recent Users */}
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left: Properties Awaiting Review */}
            <div className="space-y-5">
              <div className="flex items-baseline justify-between border-b border-ink/10 pb-3">
                <h2 className="font-serif text-2xl sm:text-3xl text-ink">
                  Listings awaiting review
                </h2>
                <button
                  type="button"
                  onClick={() => setSection('properties')}
                  className="text-[14px] font-semibold text-ink underline decoration-amber-400 decoration-2 underline-offset-4 hover:decoration-ink cursor-pointer"
                >
                  All properties →
                </button>
              </div>

              {pendingListings.length === 0 ? (
                <div className="rounded-3xl bg-white border border-ink/10 p-8 text-[15px] text-ink-600">
                  Every submitted listing has been reviewed.
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingListings.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-3xl bg-white border border-ink/10 p-5 sm:p-6 space-y-4 transition-colors hover:border-ink/25"
                    >
                      <div className="flex flex-col sm:flex-row gap-5 items-start">
                        <button
                          type="button"
                          onClick={() => openPropertyReview(item)}
                          className="relative group shrink-0 overflow-hidden rounded-2xl bg-paper-100 cursor-pointer"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-24 w-32 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <span className="absolute bottom-1.5 right-1.5 rounded-md bg-ink/80 px-2 py-0.5 text-[10px] font-mono text-white">
                            {item.images.length} photos
                          </span>
                        </button>

                        <div className="min-w-0 flex-1">
                          <p className="text-[12px] text-ink-600">
                            {item.area}, {item.state} · Submitted by {item.ownerName}
                          </p>
                          <button
                            type="button"
                            onClick={() => openPropertyReview(item)}
                            className="mt-0.5 text-left font-serif text-xl text-ink hover:underline decoration-amber-400 underline-offset-4 cursor-pointer"
                          >
                            {item.title}
                          </button>
                          <p className="mt-1 font-serif text-lg text-ink tabular-nums">
                            {formatNaira(item.price)}{' '}
                            <span className="font-sans text-[12px] text-ink-600">
                              {item.purpose === 'rent' ? 'a year' : 'outright'} ·{' '}
                              {item.bedrooms} bed · {item.bathrooms} bath
                            </span>
                          </p>
                          <p className="mt-1.5 text-[12px] text-ink-600">
                            Papers attached: {item.legalDocuments.slice(0, 2).join(' · ')}
                            {item.legalDocuments.length > 2 &&
                              ` (+${item.legalDocuments.length - 2} more)`}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-3.5">
                        <button
                          type="button"
                          onClick={() => openPropertyReview(item)}
                          className="text-[13px] font-semibold text-ink underline decoration-amber-400 decoration-2 underline-offset-4 hover:decoration-ink cursor-pointer"
                        >
                          Inspect photos, fee breakdown & papers →
                        </button>

                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => openPropertyReview(item)}
                            className="px-4 py-2 rounded-full border border-ink/15 text-[13px] font-semibold text-ink hover:bg-paper-100 cursor-pointer"
                          >
                            Review dossier
                          </button>
                          <button
                            type="button"
                            onClick={() => updateListingStatus(item.id, 'published')}
                            className="px-5 py-2 rounded-full bg-forest text-white text-[13px] font-semibold hover:bg-forest-700 cursor-pointer"
                          >
                            Approve & publish
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Recent Registered Users */}
            <div className="space-y-5">
              <div className="flex items-baseline justify-between border-b border-ink/10 pb-3">
                <h2 className="font-serif text-2xl sm:text-3xl text-ink">
                  Newest users
                </h2>
                <button
                  type="button"
                  onClick={() => setSection('members')}
                  className="text-[14px] font-semibold text-ink underline decoration-amber-400 decoration-2 underline-offset-4 hover:decoration-ink cursor-pointer"
                >
                  All users →
                </button>
              </div>

              <div className="rounded-3xl bg-white border border-ink/10 divide-y divide-ink/10">
                {members.slice(0, 6).map((m) => {
                  const userHomes = catalogue.filter(
                    (c) =>
                      c.ownerEmail?.toLowerCase() === m.email.toLowerCase() ||
                      c.ownerName.toLowerCase().includes(m.firstName.toLowerCase())
                  );
                  const pendingHomes = userHomes.filter((c) => c.status === 'pending');
                  const publishedHomes = userHomes.filter((c) => c.status === 'published');

                  return (
                    <div
                      key={m.id}
                      className="p-4 sm:p-5 flex items-center justify-between gap-4"
                    >
                      <button
                        type="button"
                        onClick={() => setReviewingMember(m)}
                        className="min-w-0 text-left group cursor-pointer"
                      >
                        <p className="text-[15px] font-semibold text-ink truncate group-hover:underline decoration-amber-400 underline-offset-4">
                          {m.firstName} {m.lastName}
                          {m.businessName && (
                            <span className="font-normal text-ink-600">
                              {' '}
                              · {m.businessName}
                            </span>
                          )}
                        </p>
                        <p className="text-[13px] text-ink-600 truncate">
                          {m.email} · {m.city}
                          {m.listerType && ` · ${m.listerType === 'landlord' ? 'Direct Owner' : m.listerType === 'agent' ? 'Independent Agent' : 'Caretaker'}`}
                        </p>
                      </button>

                      <div className="shrink-0 flex items-center gap-2.5">
                        {m.status === 'suspended' ? (
                          <span className="rounded-full bg-rose-50 border border-rose-200 px-3 py-1 text-[11px] font-semibold text-rose-800 font-mono">
                            Suspended
                          </span>
                        ) : m.role === 'owner' ? (
                          pendingHomes.length > 0 ? (
                            <span className="rounded-full bg-amber-50 border border-amber-300 px-3 py-1 text-[11px] font-semibold text-amber-900 font-mono">
                              {pendingHomes.length} in review
                            </span>
                          ) : publishedHomes.length > 0 ? (
                            <span className="rounded-full bg-forest-50 border border-forest-200 px-3 py-1 text-[11px] font-semibold text-forest-700 font-mono">
                              Verified Lister
                            </span>
                          ) : (
                            <span className="rounded-full bg-paper border border-ink/10 px-3 py-1 text-[11px] font-medium text-ink-600 font-mono">
                              Lister
                            </span>
                          )
                        ) : m.role === 'admin' ? (
                          <span className="rounded-full bg-amber-100 border border-amber-200 px-2.5 py-1 text-[11px] font-bold text-ink font-mono uppercase">
                            Admin
                          </span>
                        ) : (
                          <span className="rounded-full bg-paper border border-ink/10 px-3 py-1 text-[11px] font-medium text-ink-600 font-mono">
                            Seeker
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => setReviewingMember(m)}
                          className="rounded-full border border-ink/15 px-3.5 py-1.5 text-[12px] font-semibold text-ink hover:bg-paper-100 cursor-pointer"
                        >
                          Inspect →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ───────────── 02. PROPERTIES CATALOGUE ───────────── */}
      {section === 'properties' && (
        <section className="container-x space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { id: 'all', label: 'All homes' },
                  { id: 'published', label: 'Published' },
                  { id: 'pending', label: 'Awaiting review' },
                  { id: 'unpublished', label: 'Unpublished' },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setPropFilter(f.id)}
                  className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors cursor-pointer ${
                    propFilter === f.id
                      ? 'bg-ink text-white'
                      : 'bg-white border border-ink/10 text-ink-600 hover:text-ink'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={propQuery}
              onChange={(e) => setPropQuery(e.target.value)}
              placeholder="Search title, city, or owner..."
              className="w-full sm:w-72 px-4 py-2.5 bg-white border border-ink/15 rounded-full text-[14px] text-ink focus:outline-none focus:border-ink"
            />
          </div>

          <div className="rounded-3xl bg-white border border-ink/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-ink/10 text-[12px] font-mono uppercase text-ink-600">
                    <th className="py-4 px-6">Property</th>
                    <th className="py-4 px-4">Location</th>
                    <th className="py-4 px-4">Locked price</th>
                    <th className="py-4 px-4">Mandate holder</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10 text-[14px]">
                  {filteredCatalogue.map((item) => (
                    <tr key={item.id} className="hover:bg-paper/60">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => openPropertyReview(item)}
                            className="shrink-0 overflow-hidden rounded-xl bg-paper-100 cursor-pointer"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-14 w-20 object-cover"
                            />
                          </button>
                          <div>
                            <button
                              type="button"
                              onClick={() => openPropertyReview(item)}
                              className="text-left font-serif text-lg text-ink hover:underline decoration-amber-400 underline-offset-4 cursor-pointer"
                            >
                              {item.title}
                            </button>
                            <p className="text-[12px] text-ink-600">
                              {item.bedrooms} bed · {item.bathrooms} bath · For{' '}
                              {item.purpose}
                              {item.featured && (
                                <span className="ml-2 font-semibold text-amber-800">
                                  · Featured
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <p className="font-medium text-ink">{item.area}</p>
                        <p className="text-[12px] text-ink-600">{item.state}</p>
                      </td>

                      <td className="py-4 px-4 font-serif text-lg text-ink tabular-nums">
                        {formatNaira(item.price)}
                      </td>

                      <td className="py-4 px-4">
                        <p className="font-medium text-ink">{item.ownerName}</p>
                        <p className="text-[12px] text-ink-600">
                          {item.ownerCapacity || item.ownerPhone}
                        </p>
                      </td>

                      <td className="py-4 px-4">
                        {item.status === 'published' && (
                          <span className="text-[13px] font-semibold text-forest-700">
                            Published
                          </span>
                        )}
                        {item.status === 'pending' && (
                          <span className="text-[13px] font-semibold text-amber-800">
                            Awaiting review
                          </span>
                        )}
                        {item.status === 'unpublished' && (
                          <span className="text-[13px] text-ink-600">Unpublished</span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right whitespace-nowrap space-x-4 text-[13px] font-semibold">
                        <button
                          type="button"
                          onClick={() => openPropertyReview(item)}
                          className="text-ink underline decoration-amber-400 decoration-2 underline-offset-4 hover:decoration-ink cursor-pointer"
                        >
                          Review
                        </button>

                        {item.status !== 'published' ? (
                          <button
                            type="button"
                            onClick={() => updateListingStatus(item.id, 'published')}
                            className="text-forest-700 hover:underline cursor-pointer"
                          >
                            Approve
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => updateListingStatus(item.id, 'unpublished')}
                            className="text-ink-600 hover:text-ink cursor-pointer"
                          >
                            Unpublish
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => toggleFeatured(item.id)}
                          className="text-ink-600 hover:text-ink cursor-pointer"
                        >
                          {item.featured ? 'Unfeature' : 'Feature'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ───────────── 03. USERS DIRECTORY ───────────── */}
      {section === 'members' && (
        <section className="container-x space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { id: 'all', label: 'All users' },
                  { id: 'seeker', label: 'Home seekers' },
                  { id: 'owner', label: 'Landlords & agents' },
                  { id: 'admin', label: 'Admins' },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setMemberFilter(f.id)}
                  className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors cursor-pointer ${
                    memberFilter === f.id
                      ? 'bg-ink text-white'
                      : 'bg-white border border-ink/10 text-ink-600 hover:text-ink'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={memberQuery}
              onChange={(e) => setMemberQuery(e.target.value)}
              placeholder="Search name, email, phone, or city..."
              className="w-full sm:w-72 px-4 py-2.5 bg-white border border-ink/15 rounded-full text-[14px] text-ink focus:outline-none focus:border-ink"
            />
          </div>

          <div className="rounded-3xl bg-white border border-ink/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-ink/10 text-[12px] font-mono uppercase text-ink-600">
                    <th className="py-4 px-6">Name & business</th>
                    <th className="py-4 px-4">Contact</th>
                    <th className="py-4 px-4">City</th>
                    <th className="py-4 px-4">Role</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10 text-[14px]">
                  {filteredMembers.map((m) => (
                    <tr key={m.id} className="hover:bg-paper/60">
                      <td className="py-4 px-6">
                        <button
                          type="button"
                          onClick={() => setReviewingMember(m)}
                          className="text-left font-serif text-lg text-ink hover:underline decoration-amber-400 underline-offset-4 cursor-pointer"
                        >
                          {m.firstName} {m.lastName}
                        </button>
                        <p className="text-[12px] text-ink-600">
                          {m.businessName
                            ? m.businessName
                            : `Joined ${m.joinedAt}`}
                        </p>
                      </td>

                      <td className="py-4 px-4">
                        <p className="text-ink">{m.email}</p>
                        <p className="text-[12px] text-ink-600">{m.phone}</p>
                      </td>

                      <td className="py-4 px-4 text-ink">{m.city}</td>

                      <td className="py-4 px-4">
                        <select
                          value={m.role}
                          onChange={(e) =>
                            updateMemberRole(m.id, e.target.value as MemberRole)
                          }
                          className="bg-paper border border-ink/12 rounded-lg px-2.5 py-1 text-[13px] font-medium text-ink"
                        >
                          <option value="seeker">Home seeker</option>
                          <option value="owner">Landlord / Agent</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>

                      <td className="py-4 px-4">
                        {m.status === 'suspended' ? (
                          <span className="text-[12px] font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 font-mono">
                            Suspended
                          </span>
                        ) : m.role === 'owner' ? (
                          (() => {
                            const userHomes = catalogue.filter(
                              (c) =>
                                c.ownerEmail?.toLowerCase() === m.email.toLowerCase() ||
                                c.ownerName.toLowerCase().includes(m.firstName.toLowerCase())
                            );
                            const pendingHomes = userHomes.filter((c) => c.status === 'pending');
                            const publishedHomes = userHomes.filter((c) => c.status === 'published');
                            if (pendingHomes.length > 0) {
                              return (
                                <span className="text-[12px] font-semibold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-300 font-mono">
                                  {pendingHomes.length} in review
                                </span>
                              );
                            }
                            if (publishedHomes.length > 0) {
                              return (
                                <span className="text-[12px] font-semibold text-forest-700 bg-forest-50 px-2.5 py-1 rounded-full border border-forest-200 font-mono">
                                  Verified Lister ({publishedHomes.length})
                                </span>
                              );
                            }
                            return (
                              <span className="text-[12px] font-medium text-forest-700 font-mono">
                                Active Lister
                              </span>
                            );
                          })()
                        ) : m.role === 'admin' ? (
                          <span className="text-[12px] font-bold text-ink bg-amber-100 px-2.5 py-1 rounded-full font-mono uppercase">
                            Admin
                          </span>
                        ) : (
                          <span className="text-[12px] font-medium text-ink-600 font-mono">
                            Active Seeker
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right whitespace-nowrap space-x-4 text-[13px] font-semibold">
                        <button
                          type="button"
                          onClick={() => setReviewingMember(m)}
                          className="text-ink underline decoration-amber-400 decoration-2 underline-offset-4 hover:decoration-ink cursor-pointer"
                        >
                          Inspect
                        </button>
                        {m.status === 'suspended' ? (
                          <button
                            type="button"
                            onClick={() => updateMemberStatus(m.id, 'active')}
                            className="text-forest-700 hover:underline cursor-pointer"
                          >
                            Re-activate
                          </button>
                        ) : m.role !== 'admin' ? (
                          <button
                            type="button"
                            onClick={() => updateMemberStatus(m.id, 'suspended')}
                            className="text-ink-600 hover:text-rose-700 cursor-pointer"
                          >
                            Suspend
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ───────────── 04. VIEWING APPOINTMENTS ───────────── */}
      {section === 'viewings' && (
        <section className="container-x space-y-6">
          <div className="rounded-3xl bg-white border border-ink/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-ink/10 text-[12px] font-mono uppercase text-ink-600">
                    <th className="py-4 px-6">Property</th>
                    <th className="py-4 px-4">Prospective tenant</th>
                    <th className="py-4 px-4">Requested slot</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10 text-[14px]">
                  {viewings.map((v) => (
                    <tr key={v.id} className="hover:bg-paper/60">
                      <td className="py-4 px-6">
                        <Link
                          href={`/properties/${v.propertySlug}`}
                          className="font-serif text-lg text-ink hover:underline decoration-amber-400 underline-offset-4"
                        >
                          {v.propertyTitle}
                        </Link>
                        <p className="text-[12px] text-ink-600">{v.propertyArea}</p>
                      </td>

                      <td className="py-4 px-4">
                        <p className="font-medium text-ink">{v.seekerName}</p>
                        <p className="text-[12px] text-ink-600">
                          {v.seekerPhone} · {v.seekerEmail}
                        </p>
                      </td>

                      <td className="py-4 px-4">
                        <p className="font-medium text-ink">{v.proposedDate}</p>
                        <p className="text-[12px] text-ink-600">{v.timeSlot}</p>
                      </td>

                      <td className="py-4 px-4">
                        {v.status === 'pending' && (
                          <span className="text-[13px] font-semibold text-amber-800">
                            Awaiting confirmation
                          </span>
                        )}
                        {v.status === 'confirmed' && (
                          <span className="text-[13px] font-semibold text-forest-700">
                            Confirmed
                          </span>
                        )}
                        {v.status === 'completed' && (
                          <span className="text-[13px] text-ink-600">Completed</span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right whitespace-nowrap space-x-4 text-[13px] font-semibold">
                        {v.status === 'pending' && (
                          <button
                            type="button"
                            onClick={() => updateViewingStatus(v.id, 'confirmed')}
                            className="text-forest-700 underline decoration-forest-700/40 underline-offset-4 hover:decoration-forest-700 cursor-pointer"
                          >
                            Confirm slot
                          </button>
                        )}
                        {v.status !== 'completed' && (
                          <button
                            type="button"
                            onClick={() => updateViewingStatus(v.id, 'completed')}
                            className="text-ink-600 hover:text-ink cursor-pointer"
                          >
                            Mark completed
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ───────────── PROPERTY REVIEW DOSSIER SHEET (MODAL) ───────────── */}
      {reviewingProperty && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => setReviewingProperty(null)}
        >
          <div
            className="max-w-4xl w-full rounded-[28px] bg-white border border-ink/10 p-6 sm:p-10 shadow-2xl space-y-8 my-8 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-ink/10 pb-5">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[12px] font-mono uppercase tracking-wider text-ink-600">
                    Property Mandate Dossier · {reviewingProperty.id}
                  </span>
                  <span
                    className={`text-[12px] font-semibold ${
                      reviewingProperty.status === 'published'
                        ? 'text-forest-700'
                        : reviewingProperty.status === 'pending'
                        ? 'text-amber-800'
                        : 'text-ink-600'
                    }`}
                  >
                    ·{' '}
                    {reviewingProperty.status === 'published'
                      ? 'Published'
                      : reviewingProperty.status === 'pending'
                      ? 'Awaiting review'
                      : 'Unpublished'}
                  </span>
                </div>
                <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl text-ink">
                  {reviewingProperty.title}
                </h2>
                <p className="mt-1 text-[14px] text-ink-600">
                  {reviewingProperty.address}, {reviewingProperty.area},{' '}
                  {reviewingProperty.state} ({reviewingProperty.landmark})
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <Link
                  href={`/properties/${reviewingProperty.slug}`}
                  className="text-[13px] font-semibold text-ink underline decoration-amber-400 decoration-2 underline-offset-4 hover:decoration-ink"
                >
                  Open full page preview →
                </Link>
                <button
                  type="button"
                  onClick={() => setReviewingProperty(null)}
                  className="rounded-full border border-ink/15 px-4 py-1.5 text-[13px] font-semibold text-ink hover:bg-paper-100 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Interactive Gallery + Signed Fee Receipt Grid */}
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              {/* Left: Photos & Description */}
              <div className="space-y-6">
                <div className="space-y-2.5">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-paper-100 border border-ink/10">
                    <img
                      src={
                        reviewingProperty.images[reviewImgIdx] ||
                        reviewingProperty.image
                      }
                      alt={reviewingProperty.title}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-[12px] text-white">
                      Photo {reviewImgIdx + 1} of{' '}
                      {Math.max(1, reviewingProperty.images.length)}
                    </span>
                  </div>

                  {reviewingProperty.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {reviewingProperty.images.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setReviewImgIdx(i)}
                          className={`aspect-[16/10] overflow-hidden rounded-xl border-2 cursor-pointer ${
                            reviewImgIdx === i
                              ? 'border-amber-400'
                              : 'border-transparent opacity-65 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={img}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Specs Row */}
                <dl className="grid grid-cols-4 gap-2 border-y border-ink/10 py-4 text-center">
                  <div>
                    <dt className="text-[11px] text-ink-600">Bedrooms</dt>
                    <dd className="mt-0.5 font-serif text-xl text-ink">
                      {reviewingProperty.bedrooms}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] text-ink-600">Bathrooms</dt>
                    <dd className="mt-0.5 font-serif text-xl text-ink">
                      {reviewingProperty.bathrooms}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] text-ink-600">Parking</dt>
                    <dd className="mt-0.5 font-serif text-xl text-ink">
                      {reviewingProperty.parkingSpaces} cars
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] text-ink-600">Floor area</dt>
                    <dd className="mt-0.5 font-serif text-xl text-ink">
                      {reviewingProperty.sizeSqm} sqm
                    </dd>
                  </div>
                </dl>

                {/* Description */}
                <div>
                  <h3 className="font-serif text-lg text-ink">
                    Submitted property description
                  </h3>
                  <p className="mt-2 whitespace-pre-line text-[14px] leading-relaxed text-ink-600">
                    {reviewingProperty.description}
                  </p>
                </div>

                {/* Infrastructure & Utilities */}
                <div>
                  <h3 className="font-serif text-lg text-ink">
                    Declared utilities & infrastructure
                  </h3>
                  <ul className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px] text-ink">
                    {reviewingProperty.amenities.map((am) => (
                      <li
                        key={am}
                        className="rounded-xl bg-paper px-3.5 py-2 border border-ink/10"
                      >
                        ✓ {am}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Declared Nigerian Infrastructure Dossier */}
                {(reviewingProperty.powerSpecs || reviewingProperty.waterSpecs || reviewingProperty.compoundDensity) && (
                  <div className="p-4 rounded-2xl bg-forest-50/70 border border-forest-200/80 space-y-2.5 text-xs">
                    <span className="font-mono text-[10px] uppercase font-bold text-forest-800 tracking-wider block">
                      Nigerian Infrastructure Audit Checklist
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-ink">
                      {reviewingProperty.powerSpecs && (
                        <div className="p-2.5 rounded-xl bg-white border border-forest-100">
                          <span className="text-ink-600 block text-[11px]">Power & Metering</span>
                          <span className="font-semibold text-forest-900">{reviewingProperty.powerSpecs.meterType}</span>
                          <span className="text-[11px] text-ink-600 block">{reviewingProperty.powerSpecs.band} · {reviewingProperty.powerSpecs.backup}</span>
                        </div>
                      )}
                      {reviewingProperty.waterSpecs && (
                        <div className="p-2.5 rounded-xl bg-white border border-forest-100">
                          <span className="text-ink-600 block text-[11px]">Water Infrastructure</span>
                          <span className="font-semibold text-forest-900">{reviewingProperty.waterSpecs.source}</span>
                          <span className="text-[11px] text-ink-600 block">{reviewingProperty.waterSpecs.treatment}</span>
                        </div>
                      )}
                      {reviewingProperty.compoundDensity && (
                        <div className="p-2.5 rounded-xl bg-white border border-forest-100">
                          <span className="text-ink-600 block text-[11px]">Compound Privacy</span>
                          <span className="font-semibold text-forest-900">{reviewingProperty.compoundDensity}</span>
                        </div>
                      )}
                      {reviewingProperty.roadFloodSpecs && (
                        <div className="p-2.5 rounded-xl bg-white border border-forest-100">
                          <span className="text-ink-600 block text-[11px]">Road Access & Flood Elevation</span>
                          <span className="font-semibold text-forest-900">{reviewingProperty.roadFloodSpecs.roadAccess}</span>
                          <span className="text-[11px] text-forest-800 block font-medium">✓ {reviewingProperty.roadFloodSpecs.floodStatus}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Fee Breakdown, Mandate Papers & Owner Info */}
              <div className="space-y-6">
                {/* Honest Receipt Breakdown */}
                <div className="rounded-3xl bg-ink p-6 text-white space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-mono uppercase tracking-wider text-amber-300">
                      Signed Owner Fee Breakdown
                    </p>
                    <span className="text-[12px] text-white/70">
                      For {reviewingProperty.purpose}
                    </span>
                  </div>

                  <dl className="divide-y divide-white/10 text-[14px]">
                    <div className="flex justify-between py-2.5">
                      <dt className="text-white/70">
                        {reviewingProperty.purpose === 'sale'
                          ? 'Outright sale price'
                          : 'Base annual rent'}
                      </dt>
                      <dd className="font-medium tabular-nums">
                        {formatNaira(Number(editedPrice) || reviewingProperty.price)}
                      </dd>
                    </div>
                    {reviewingProperty.purpose === 'rent' && (
                      <>
                        <div className="flex justify-between py-2.5">
                          <dt className="text-white/70">Service charge</dt>
                          <dd className="font-medium tabular-nums">
                            {formatNaira(reviewingProperty.serviceCharge)}
                          </dd>
                        </div>
                        <div className="flex justify-between py-2.5">
                          <dt className="text-white/70">Refundable caution</dt>
                          <dd className="font-medium tabular-nums">
                            {formatNaira(reviewingProperty.cautionFee)}
                          </dd>
                        </div>
                        <div className="flex justify-between py-2.5">
                          <dt className="text-white/70">
                            Legal & agency ({reviewingProperty.legalFeePct}% +{' '}
                            {reviewingProperty.agencyFeePct}%)
                          </dt>
                          <dd className="font-medium tabular-nums">
                            {formatNaira(
                              Math.round(
                                ((Number(editedPrice) || reviewingProperty.price) *
                                  (reviewingProperty.legalFeePct +
                                    reviewingProperty.agencyFeePct)) /
                                  100
                              )
                            )}
                          </dd>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between py-2.5">
                      <dt className="text-white/70">Inspection / viewing fee</dt>
                      <dd className="font-semibold text-amber-300">₦0</dd>
                    </div>
                  </dl>

                  <div className="pt-2 border-t border-white/15">
                    <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">
                      Adjust locked owner price (₦) before publishing
                    </label>
                    <input
                      type="number"
                      value={editedPrice}
                      onChange={(e) => setEditedPrice(e.target.value)}
                      className="w-full rounded-xl bg-white/10 border border-white/20 px-3.5 py-2 text-[15px] font-mono text-white focus:outline-none focus:border-amber-300"
                    />
                  </div>
                </div>

                {/* Submitted Title & Mandate Papers with Real Inspection Lightbox */}
                <div className="rounded-2xl bg-paper p-5 border border-ink/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg text-ink">
                      Submitted mandate &amp; title papers
                    </h3>
                    <span className="font-mono text-[11px] text-ink-600">
                      {reviewingProperty.legalDocuments.length} documents
                    </span>
                  </div>
                  <p className="text-xs text-ink-600">
                    Click any document below to inspect the original high-resolution scan, check registration seals, and verify authenticity.
                  </p>
                  <ul className="space-y-2 text-[13px] pt-1">
                    {reviewingProperty.legalDocuments.map((doc, idx) => {
                      const matchedFile = reviewingProperty.attachedFiles?.find(
                        (f) => f.categoryLabel === doc || f.name.includes(doc)
                      );
                      const status = matchedFile?.verificationStatus || 'unverified';

                      return (
                        <li
                          key={doc}
                          className="flex items-center justify-between rounded-xl bg-white p-3 border border-ink/10 hover:border-ink/30 transition-all"
                        >
                          <div className="min-w-0 pr-3">
                            <span className="font-medium text-ink block truncate">{doc}</span>
                            <span
                              className={`font-mono text-[10px] uppercase font-semibold ${
                                status === 'verified'
                                  ? 'text-forest-700'
                                  : status === 'rejected'
                                  ? 'text-amber-800'
                                  : 'text-ink-600'
                              }`}
                            >
                              Status: {status}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleInspectPropertyDoc(doc, idx)}
                            className="px-3 py-1.5 rounded-lg bg-paper-100 hover:bg-ink hover:text-white border border-ink/15 text-xs font-semibold text-ink transition-all shrink-0 cursor-pointer"
                          >
                            Inspect Scan ↗
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Mandate Holder Details */}
                <div className="rounded-2xl bg-paper p-5 border border-ink/10 space-y-1.5 text-[13px]">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-ink-600">
                    Submitted by
                  </p>
                  <p className="font-serif text-lg text-ink">
                    {reviewingProperty.ownerName}
                  </p>
                  <p className="text-ink-600">
                    Capacity: {reviewingProperty.ownerCapacity || reviewingProperty.ownerCac || 'Direct Landlord Mandate'} · Phone:{' '}
                    {reviewingProperty.ownerPhone}
                  </p>
                  <p className="text-ink-600">
                    Submitted on {reviewingProperty.submittedAt}
                  </p>
                </div>
              </div>
            </div>

            {/* Review Decision Bar */}
            <div className="border-t border-ink/10 pt-6 space-y-4">
              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1.5">
                  Reviewer note or reason for declining{' '}
                  <span className="font-normal text-ink-600">
                    (visible to the landlord/agent on their submission page)
                  </span>
                </label>
                <input
                  type="text"
                  value={reviewNoteInput}
                  onChange={(e) => setReviewNoteInput(e.target.value)}
                  placeholder="e.g. Verified C of O and direct landlord rate lock, or specify what document needs correction..."
                  className="w-full px-4 py-2.5 bg-paper border border-ink/15 rounded-xl text-[14px] text-ink focus:outline-none focus:border-ink"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => removeListing(reviewingProperty.id)}
                  className="text-[13px] font-semibold text-ink-600 hover:text-ink cursor-pointer"
                >
                  Delete permanently
                </button>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      updateListingStatus(
                        reviewingProperty.id,
                        'unpublished',
                        reviewNoteInput || 'Declined during document review.',
                        Number(editedPrice)
                      )
                    }
                    className="rounded-full border border-ink/20 px-5 py-2.5 text-[14px] font-semibold text-ink hover:bg-paper-100 cursor-pointer"
                  >
                    Decline / Unpublish
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateListingStatus(
                        reviewingProperty.id,
                        'published',
                        reviewNoteInput || 'Mandate & title papers confirmed.',
                        Number(editedPrice)
                      )
                    }
                    className="rounded-full bg-forest px-6 py-2.5 text-[14px] font-semibold text-white hover:bg-forest-700 cursor-pointer"
                  >
                    Approve & publish to catalogue →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ───────────── USER / AGENT INSPECTION SHEET (MODAL) ───────────── */}
      {reviewingMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => setReviewingMember(null)}
        >
          <div
            className="max-w-4xl w-full rounded-[32px] bg-white border border-ink/10 p-6 sm:p-9 shadow-2xl space-y-6 my-6 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Regulatory Status */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-ink/10 pb-5">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-ink-600">
                    Compliance Dossier · Ref: {reviewingMember.id}
                  </span>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-semibold ${
                      reviewingMember.status === 'suspended'
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : 'bg-forest-100 text-forest-800 border border-forest-200'
                    }`}
                  >
                    {reviewingMember.status === 'suspended'
                      ? 'Account Suspended'
                      : '✓ Active Member (Good Standing)'}
                  </span>
                  <span className="font-mono text-[11px] text-ink-600">
                    Joined: {reviewingMember.joinedAt}
                  </span>
                </div>

                <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-ink">
                  {reviewingMember.firstName} {reviewingMember.lastName}
                </h2>
                <p className="text-base text-ink font-serif font-medium mt-0.5">
                  {reviewingMember.businessName || 'Independent Property Owner'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setReviewingMember(null)}
                className="self-start rounded-full border border-ink/15 px-4 py-1.5 text-[13px] font-semibold text-ink hover:bg-paper-100 cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            {/* Main 2-Column Compliance Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column (7 cols): Entity Records, Uploaded Docs, Listings */}
              <div className="lg:col-span-7 space-y-6">
                {/* Lister Identity & Mandate Capacity */}
                <div className="rounded-2xl bg-paper p-5 border border-ink/10 space-y-4">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-forest-700 font-semibold">
                    Lister Identity &amp; Mandate Capacity
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-white p-3.5 rounded-xl border border-ink/10 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-ink-600 block">
                        Lister Standing
                      </span>
                      <p className="font-serif font-semibold text-ink text-sm">
                        {reviewingMember.listerType === 'landlord'
                          ? 'Direct Property Owner (Landlord)'
                          : reviewingMember.listerType === 'caretaker'
                          ? 'Authorized Family Caretaker'
                          : 'Independent Mandate Agent'}
                      </p>
                      <span className="text-[10px] text-forest-700 font-medium block">
                        ✓ Authorized to represent property
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-ink/10 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-ink-600 block">
                        Direct Phone &amp; WhatsApp
                      </span>
                      <p className="font-mono font-semibold text-ink text-sm">
                        {reviewingMember.phone}
                      </p>
                      <span className="text-[10px] text-forest-700 font-medium block">
                        ✓ Verified Direct Mobile Line
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-ink/10 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-ink-600 block">
                        Viewing Guarantee
                      </span>
                      <p className="font-serif font-semibold text-forest-800 text-sm">
                        ₦0 Inspection Fee Pledge
                      </p>
                      <span className="text-[10px] text-forest-700 font-medium block">
                        ✓ Bound against gate/inspection charges
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-ink/10 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-ink-600 block">
                        Location &amp; Operating City
                      </span>
                      <p className="font-serif font-semibold text-ink text-sm">
                        {reviewingMember.city}, Nigeria
                      </p>
                      <span className="text-[10px] text-forest-700 font-medium block">
                        ✓ Direct Local Field Rep Contact
                      </span>
                    </div>
                  </div>
                </div>

                {/* Uploaded Identity & Mandate Documents */}
                <div className="rounded-2xl bg-paper p-5 border border-ink/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-wider text-forest-700 font-semibold">
                        Attached Mandate &amp; Property Papers
                      </p>
                      <p className="text-xs text-ink-600 mt-0.5">
                        Signed landlord authorization and title papers. Click inspect to audit original scan.
                      </p>
                    </div>
                    <span className="font-mono text-xs text-ink-600 shrink-0">
                      {reviewingMember.kycDocuments?.length || 0} papers
                    </span>
                  </div>

                  {!reviewingMember.kycDocuments || reviewingMember.kycDocuments.length === 0 ? (
                    <div className="p-4 rounded-xl bg-white border border-ink/10 text-xs text-ink-600">
                      No document files attached yet.
                    </div>
                  ) : (
                    <div className="space-y-2 pt-1">
                      {reviewingMember.kycDocuments.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-ink/10 hover:border-ink/30 transition-all text-xs"
                        >
                          <div className="min-w-0 pr-3">
                            <div className="flex items-center gap-2">
                              <span className="text-base">📑</span>
                              <p className="font-semibold text-ink truncate">{doc.name}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="font-mono text-[10px] text-forest-800 bg-forest-50 px-2 py-0.5 rounded font-medium">
                                {doc.categoryLabel}
                              </span>
                              <span
                                className={`font-mono text-[9px] uppercase px-1.5 py-0.5 rounded font-semibold ${
                                  doc.verificationStatus === 'verified'
                                    ? 'bg-forest-100 text-forest-800'
                                    : 'bg-amber-100 text-amber-900'
                                }`}
                              >
                                {doc.verificationStatus}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setAdminViewerDoc(doc)}
                            className="px-3 py-1.5 rounded-lg bg-paper-100 hover:bg-ink hover:text-white border border-ink/15 text-xs font-semibold text-ink transition-all shrink-0 cursor-pointer"
                          >
                            Inspect Scan ↗
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submitted Properties Portfolio */}
                <div className="rounded-2xl bg-paper p-5 border border-ink/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-forest-700 font-semibold">
                      Submitted Property Portfolio
                    </p>
                    <span className="font-mono text-xs text-ink-600">
                      {
                        catalogue.filter(
                          (c) =>
                            c.ownerEmail?.toLowerCase() ===
                              reviewingMember.email.toLowerCase() ||
                            c.ownerName
                              .toLowerCase()
                              .includes(reviewingMember.firstName.toLowerCase())
                        ).length
                      }{' '}
                      listings
                    </span>
                  </div>

                  {catalogue.filter(
                    (c) =>
                      c.ownerEmail?.toLowerCase() ===
                        reviewingMember.email.toLowerCase() ||
                      c.ownerName
                        .toLowerCase()
                        .includes(reviewingMember.firstName.toLowerCase())
                  ).length === 0 ? (
                    <p className="text-xs text-ink-600 bg-white p-4 rounded-xl border border-ink/10">
                      No property listings submitted under this account yet.
                    </p>
                  ) : (
                    <div className="space-y-3 pt-1">
                      {catalogue
                        .filter(
                          (c) =>
                            c.ownerEmail?.toLowerCase() ===
                              reviewingMember.email.toLowerCase() ||
                            c.ownerName
                              .toLowerCase()
                              .includes(reviewingMember.firstName.toLowerCase())
                        )
                        .map((prop) => (
                          <div
                            key={prop.id}
                            className="flex items-center justify-between rounded-xl bg-white p-3.5 border border-ink/10 text-xs shadow-sm"
                          >
                            <div className="flex items-center gap-3 min-w-0 pr-3">
                              <div className="relative h-14 w-18 rounded-lg overflow-hidden bg-paper-200 shrink-0 border border-ink/10">
                                <img
                                  src={prop.image}
                                  alt={prop.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`font-mono text-[9px] uppercase px-1.5 py-0.5 rounded font-semibold ${
                                      prop.status === 'published'
                                        ? 'bg-forest-100 text-forest-800'
                                        : 'bg-amber-300/40 text-ink'
                                    }`}
                                  >
                                    {prop.status === 'published' ? 'Published' : 'Pending Audit'}
                                  </span>
                                  <span className="text-[10px] text-ink-600 font-mono">
                                    {prop.legalDocuments?.length || 2} Papers Attached
                                  </span>
                                </div>
                                <p className="font-serif text-sm font-semibold text-ink truncate mt-0.5">
                                  {prop.title}
                                </p>
                                <p className="text-ink-600 text-[11px] truncate">
                                  {prop.area}, {prop.state} · {formatNaira(prop.price)}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setReviewingMember(null);
                                openPropertyReview(prop);
                              }}
                              className="px-3 py-1.5 rounded-lg border border-ink/15 hover:border-ink font-semibold text-ink text-xs transition-colors shrink-0 cursor-pointer"
                            >
                              Inspect listing →
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column (5 cols): Contact, Compliance Guarantees, Admin Controls */}
              <div className="lg:col-span-5 space-y-6">
                {/* Direct Broker Communications */}
                <div className="rounded-2xl bg-paper p-5 border border-ink/10 space-y-3 text-xs">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-forest-700 font-semibold">
                    Direct Contact Channels
                  </p>

                  <div className="space-y-2">
                    <a
                      href={`https://wa.me/${reviewingMember.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(reviewingMember.firstName)},%20reaching%20out%20from%20HouseOne%20Verification%20Desk.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer text-center block"
                    >
                      Chat on WhatsApp Direct →
                    </a>

                    <a
                      href={`tel:${reviewingMember.phone}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-white border border-ink/15 hover:border-ink text-ink font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer text-center block"
                    >
                      Call {reviewingMember.phone}
                    </a>

                    <div className="p-3 bg-white rounded-xl border border-ink/10 text-center">
                      <span className="text-[10px] font-mono uppercase text-ink-600 block">
                        Registered Email
                      </span>
                      <p className="font-medium text-ink mt-0.5 break-all">
                        {reviewingMember.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mandate Integrity Charter */}
                <div className="rounded-2xl bg-paper p-5 border border-ink/10 space-y-3 text-xs">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-forest-700 font-semibold">
                    Marketplace Charter Warranties
                  </p>
                  <ul className="space-y-2 text-ink-600 leading-relaxed">
                    <li className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-ink/5">
                      <span className="text-forest-700 font-bold">✓</span>
                      <span>
                        <strong className="text-ink">₦0 Inspection Fee Pledge:</strong> Legally bound
                        never to demand gate or inspection fees from tenants.
                      </span>
                    </li>
                    <li className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-ink/5">
                      <span className="text-forest-700 font-bold">✓</span>
                      <span>
                        <strong className="text-ink">Locked Direct Pricing:</strong> Guaranteed 0% agent
                        markups above owner signed schedule.
                      </span>
                    </li>
                    <li className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-ink/5">
                      <span className="text-forest-700 font-bold">✓</span>
                      <span>
                        <strong className="text-ink">5% Legal &amp; 5% Agency Cap:</strong> Verified
                        statutory compliance on tenant receipts.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Admin Audit Trail & Notes */}
                <div className="rounded-2xl bg-paper p-5 border border-ink/10 space-y-2 text-xs">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-forest-700 font-semibold">
                    Admin Verification Audit Notes
                  </p>
                  <div className="p-3 bg-white rounded-xl border border-ink/10 text-ink leading-relaxed font-mono text-[11px]">
                    {reviewingMember.adminAuditNotes ||
                      'Verified direct property owner/agent contact. Signed ₦0 inspection fee pledge & direct mandate confirmed.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-5">
              <button
                type="button"
                onClick={() => removeMember(reviewingMember.id)}
                className="text-[13px] font-semibold text-rose-800 hover:text-ink cursor-pointer"
              >
                Delete Member Profile
              </button>

              <div className="flex items-center gap-3">
                {reviewingMember.status === 'suspended' ? (
                  <button
                    type="button"
                    onClick={() => updateMemberStatus(reviewingMember.id, 'active')}
                    className="rounded-full bg-forest-800 text-white px-6 py-2.5 text-[13px] font-semibold hover:bg-forest-900 shadow-sm cursor-pointer"
                  >
                    Re-activate Account ✓
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => updateMemberStatus(reviewingMember.id, 'suspended')}
                    className="rounded-full border border-rose-300 bg-rose-50 text-rose-900 px-5 py-2.5 text-[13px] font-semibold hover:bg-rose-100 cursor-pointer"
                  >
                    Suspend Account
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setReviewingMember(null)}
                  className="rounded-full bg-ink text-white px-5 py-2.5 text-[13px] font-semibold hover:bg-ink/90 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ───────────── ADD NEW PROPERTY MODAL ───────────── */}
      {showNewProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="max-w-xl w-full rounded-[28px] bg-white border border-ink/10 p-6 sm:p-10 shadow-2xl space-y-6 my-8">
            <div className="flex items-start justify-between border-b border-ink/10 pb-4">
              <div>
                <p className="text-[12px] font-mono uppercase tracking-wider text-ink-600">
                  Direct catalogue entry
                </p>
                <h2 className="mt-1 font-serif text-2xl sm:text-3xl text-ink">
                  Add a verified property
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowNewProperty(false)}
                className="text-[14px] font-semibold text-ink-600 hover:text-ink cursor-pointer"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateProperty} className="space-y-4">
              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1.5">
                  Property title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. 4-Bedroom Detached Duplex + BQ"
                  className="w-full px-4 py-2.5 bg-paper border border-ink/12 rounded-xl text-[15px] text-ink focus:outline-none focus:border-ink"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-ink mb-1.5">
                    Listing purpose
                  </label>
                  <select
                    value={newPurpose}
                    onChange={(e) => setNewPurpose(e.target.value as 'rent' | 'sale')}
                    className="w-full px-4 py-2.5 bg-paper border border-ink/12 rounded-xl text-[15px] text-ink"
                  >
                    <option value="rent">For rent</option>
                    <option value="sale">For sale</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-ink mb-1.5">
                    Property type
                  </label>
                  <select
                    value={newType}
                    onChange={(e) =>
                      setNewType(e.target.value as CatalogueItem['propertyType'])
                    }
                    className="w-full px-4 py-2.5 bg-paper border border-ink/12 rounded-xl text-[15px] text-ink"
                  >
                    <option value="duplex">Duplex & Terraced</option>
                    <option value="flat_apartment">Flat / Apartment</option>
                    <option value="detached_mansion">Detached Mansion</option>
                    <option value="land">Land</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-ink mb-1.5">
                    State / City
                  </label>
                  <select
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className="w-full px-4 py-2.5 bg-paper border border-ink/12 rounded-xl text-[15px] text-ink"
                  >
                    <option value="Enugu">Enugu</option>
                    <option value="Anambra">Anambra (Onitsha / Awka)</option>
                    <option value="Imo">Imo (Owerri)</option>
                    <option value="Abia">Abia (Aba / Umuahia)</option>
                    <option value="Delta">Delta (Asaba)</option>
                    <option value="Rivers">Rivers (Port Harcourt)</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja (FCT)">Abuja (FCT)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-ink mb-1.5">
                    Neighbourhood / Area
                  </label>
                  <input
                    type="text"
                    required
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    placeholder="e.g. Independence Layout"
                    className="w-full px-4 py-2.5 bg-paper border border-ink/12 rounded-xl text-[15px] text-ink"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-ink mb-1.5">
                    Locked price (₦)
                  </label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-4 py-2.5 bg-paper border border-ink/12 rounded-xl text-[15px] text-ink tabular-nums"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-ink mb-1.5">
                    Caution fee (₦)
                  </label>
                  <input
                    type="number"
                    value={newCaution}
                    onChange={(e) => setNewCaution(e.target.value)}
                    className="w-full px-4 py-2.5 bg-paper border border-ink/12 rounded-xl text-[15px] text-ink tabular-nums"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-ink mb-1.5">
                    Service fee (₦)
                  </label>
                  <input
                    type="number"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="w-full px-4 py-2.5 bg-paper border border-ink/12 rounded-xl text-[15px] text-ink tabular-nums"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-ink mb-1.5">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    required
                    value={newBeds}
                    onChange={(e) => setNewBeds(e.target.value)}
                    className="w-full px-4 py-2.5 bg-paper border border-ink/12 rounded-xl text-[15px] text-ink"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-ink mb-1.5">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    required
                    value={newBaths}
                    onChange={(e) => setNewBaths(e.target.value)}
                    className="w-full px-4 py-2.5 bg-paper border border-ink/12 rounded-xl text-[15px] text-ink"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-ink mb-1.5">
                    Mandate holder
                  </label>
                  <input
                    type="text"
                    required
                    value={newOwner}
                    onChange={(e) => setNewOwner(e.target.value)}
                    className="w-full px-4 py-2.5 bg-paper border border-ink/12 rounded-xl text-[15px] text-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1.5">
                  Property description
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe power backup, water supply, security, and finishing..."
                  className="w-full px-4 py-2.5 bg-paper border border-ink/12 rounded-xl text-[14px] text-ink focus:outline-none focus:border-ink"
                />
              </div>

              <UliLine
                id="uli-modal"
                className="my-4 block h-3 w-full text-ink/15"
              />

              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowNewProperty(false)}
                  className="rounded-full border border-ink/15 px-5 py-2.5 text-[14px] font-semibold text-ink hover:bg-paper-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-amber-400 px-6 py-2.5 text-[14px] font-semibold text-ink hover:bg-amber-300 cursor-pointer"
                >
                  Publish property →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Dossier Document Lightbox Modal */}
      <DocumentViewerModal
        file={adminViewerDoc}
        onClose={() => setAdminViewerDoc(null)}
        isAdmin={true}
        onUpdateStatus={handleUpdateDocStatus}
      />
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="container-x py-20 font-serif text-lg text-ink-600">
          Loading desk...
        </div>
      }
    >
      <AdminDeskContent />
    </Suspense>
  );
}
