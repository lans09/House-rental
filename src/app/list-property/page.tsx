'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { HouseOneStore, CatalogueItem, UploadedFileRecord } from '@/lib/admin-store';
import { PhotoUploader, DocumentUploader } from '@/components/FileUploadZone';
import { DocumentViewerModal } from '@/components/DocumentViewerModal';

const NIGERIAN_STATES = [
  'Enugu',
  'Anambra',
  'Lagos',
  'Abuja (FCT)',
  'Rivers',
  'Imo',
  'Abia',
  'Delta',
  'Akwa Ibom',
  'Oyo',
  'Edo',
];

const RENTAL_CATEGORIES = [
  { label: '3-Bedroom Apartment (All Rooms En-Suite)', type: 'flat_apartment' as const },
  { label: '4-Bedroom Terraced Duplex with Domestic BQ', type: 'duplex' as const },
  { label: '2-Bedroom Serviced Flat', type: 'flat_apartment' as const },
  { label: '5-Bedroom Detached House + BQ + Gatehouse', type: 'detached_mansion' as const },
  { label: '1-Bedroom Mini Flat / Self-Contained', type: 'flat_apartment' as const },
  { label: '4-Bedroom Semi-Detached Duplex', type: 'duplex' as const },
  { label: 'Luxury Penthouse Suite', type: 'flat_apartment' as const },
];

const COMPOUND_TYPES = [
  { id: 'sole_tenant', label: 'Standalone Private Compound', sub: 'Sole tenant residence with dedicated gate' },
  { id: 'low_density', label: 'Low-Density Block (2 to 4 Flats)', sub: 'Quiet compound with only 2–4 families' },
  { id: 'serviced_court', label: 'Serviced Gated Court (6 to 8 Flats)', sub: 'Managed residential court with gatekeeper' },
];

const PREPAID_METERS = [
  { id: 'dedicated_prepaid', label: 'Dedicated Prepaid Meter', sub: 'Individual token meter for this apartment' },
  { id: 'shared_prepaid', label: 'Shared Compound Prepaid', sub: 'Sub-metered token recharge' },
  { id: 'direct_postpaid', label: 'Direct DisCo Line', sub: 'Standard distribution grid connection' },
];

const POWER_BACKUPS = [
  { id: 'gen_house', label: 'Generator shed with changeover switch installed' },
  { id: 'inverter_ready', label: 'Pre-wired for inverter and battery bank' },
  { id: 'solar_installed', label: 'Solar hybrid system installed' },
  { id: 'central_gen', label: 'Central estate generator (scheduled night hours)' },
  { id: 'grid_only', label: 'Grid power only' },
];

const WATER_SYSTEMS = [
  { id: 'treated_borehole', label: 'Treated Borehole with Filtration Plant', sub: 'Iron-removal / reverse osmosis; clear water' },
  { id: 'standard_borehole', label: 'Standard Industrial Borehole', sub: 'Groundwater with overhead GeePee storage' },
  { id: 'mains_tanker', label: 'State Water Board + Tanker Suction', sub: 'Mains pipe with ground storage tank' },
];

const ROAD_FLOOD_STATUSES = [
  { id: 'tarred_flood_free', label: 'Tarred road access · 100% Flood-Free elevation', sub: 'Clean approach with functional covered drainage' },
  { id: 'interlocked_estate', label: 'Interlocked estate streets', sub: 'Paved residential corridor' },
  { id: 'graded_road', label: 'Graded all-weather laterite road', sub: 'Motorable year-round' },
];

const SAMPLE_PHOTOS = [
  '/images/enugu-flagship-mansion.jpg',
  '/images/onitsha-gra-luxury-duplex.jpg',
  '/images/awka-ngozika-duplex.jpg',
  '/images/owerri-luxury-duplex.jpg',
];

export default function ListPropertyPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'form' | 'ledger'>('form');
  const [catalogue, setCatalogue] = useState<CatalogueItem[]>([]);
  const [submittedNotice, setSubmittedNotice] = useState<string | null>(null);

  // Section 01: Property & Location
  const [categoryIdx, setCategoryIdx] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [stateLoc, setStateLoc] = useState('Enugu');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [compoundType, setCompoundType] = useState('low_density');

  // Section 02: Nigerian Infrastructure
  const [meterType, setMeterType] = useState('dedicated_prepaid');
  const [discoBand, setDiscoBand] = useState('Band A (20+ Hours Daily)');
  const [powerBackup, setPowerBackup] = useState('gen_house');
  const [waterSystem, setWaterSystem] = useState('treated_borehole');
  const [roadFlood, setRoadFlood] = useState('tarred_flood_free');

  // Section 03: Annual Rent
  const [annualRentInput, setAnnualRentInput] = useState('4500000');

  // Section 04: Space & Visual Records
  const [bedrooms, setBedrooms] = useState('4');
  const [bathrooms, setBathrooms] = useState('4');
  const [fieldNotes, setFieldNotes] = useState('');
  const [videoTourUrl, setVideoTourUrl] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    SAMPLE_PHOTOS[0],
    SAMPLE_PHOTOS[1],
  ]);

  // Section 05: Landlord Standing & Paperwork
  const [ownerName, setOwnerName] = useState('');
  const [ownerCapacity, setOwnerCapacity] = useState('Direct Property Owner');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [pledgeSigned, setPledgeSigned] = useState(true);
  const [uploadedDocs, setUploadedDocs] = useState<UploadedFileRecord[]>([
    {
      id: 'doc-seed-1',
      name: 'Registered_Deed_of_Assignment.pdf',
      sizeBytes: 1024 * 650,
      mimeType: 'application/pdf',
      dataUrl: '/images/enugu-flagship-mansion.jpg',
      uploadedAt: new Date().toISOString().slice(0, 10),
      category: 'deed_of_assignment',
      categoryLabel: 'Registered Deed of Assignment / Conveyance',
      verificationStatus: 'unverified',
    },
    {
      id: 'doc-seed-2',
      name: 'Landlord_Mandate_Authorization_Letter.pdf',
      sizeBytes: 1024 * 320,
      mimeType: 'application/pdf',
      dataUrl: '/images/onitsha-gra-luxury-duplex.jpg',
      uploadedAt: new Date().toISOString().slice(0, 10),
      category: 'mandate_letter',
      categoryLabel: 'Direct Landlord Mandate Authorization Letter',
      verificationStatus: 'unverified',
    },
  ]);
  const [previewFile, setPreviewFile] = useState<UploadedFileRecord | null>(null);
  const [draftRestored, setDraftRestored] = useState(false);

  // Restore draft on initial mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('houseone_listing_draft');
      if (saved) {
        const d = JSON.parse(saved);
        if (d.title) setTitle(d.title);
        if (d.stateLoc) setStateLoc(d.stateLoc);
        if (d.area) setArea(d.area);
        if (d.address) setAddress(d.address);
        if (d.landmark) setLandmark(d.landmark);
        if (typeof d.categoryIdx === 'number') setCategoryIdx(d.categoryIdx);
        if (d.compoundType) setCompoundType(d.compoundType);
        if (d.meterType) setMeterType(d.meterType);
        if (d.discoBand) setDiscoBand(d.discoBand);
        if (d.powerBackup) setPowerBackup(d.powerBackup);
        if (d.waterSystem) setWaterSystem(d.waterSystem);
        if (d.roadFlood) setRoadFlood(d.roadFlood);
        if (d.annualRentInput) setAnnualRentInput(d.annualRentInput);
        if (d.bedrooms) setBedrooms(d.bedrooms);
        if (d.bathrooms) setBathrooms(d.bathrooms);
        if (d.fieldNotes) setFieldNotes(d.fieldNotes);
        setDraftRestored(true);
      }
    } catch {
      // ignore
    }
  }, []);

  // Auto-save draft changes
  useEffect(() => {
    if (title || area || address || fieldNotes) {
      const draftData = {
        title,
        stateLoc,
        area,
        address,
        landmark,
        categoryIdx,
        compoundType,
        meterType,
        discoBand,
        powerBackup,
        waterSystem,
        roadFlood,
        annualRentInput,
        bedrooms,
        bathrooms,
        fieldNotes,
      };
      localStorage.setItem('houseone_listing_draft', JSON.stringify(draftData));
    }
  }, [title, stateLoc, area, address, landmark, categoryIdx, compoundType, meterType, discoBand, powerBackup, waterSystem, roadFlood, annualRentInput, bedrooms, bathrooms, fieldNotes]);

  const discardDraft = () => {
    localStorage.removeItem('houseone_listing_draft');
    setTitle('');
    setArea('');
    setAddress('');
    setLandmark('');
    setFieldNotes('');
    setDraftRestored(false);
  };

  // Sync store
  useEffect(() => {
    const sync = () => setCatalogue(HouseOneStore.getCatalogue());
    sync();
    window.addEventListener('houseone-store-updated', sync);
    return () => window.removeEventListener('houseone-store-updated', sync);
  }, []);

  useEffect(() => {
    if (user) {
      const fullName = `${user.firstName} ${user.lastName}`.trim();
      setOwnerName(user.businessName || fullName);
      const capLabel =
        user.listerType === 'agent'
          ? 'Authorized Individual Agent'
          : user.listerType === 'caretaker'
          ? 'Family Caretaker / Representative'
          : 'Direct Property Owner';
      setOwnerCapacity(capLabel);
      setOwnerPhone(user.phone);
    }
  }, [user]);

  // Financial value
  const rentVal = Number(annualRentInput.replace(/\D/g, '')) || 0;

  const mySubmissions = useMemo(() => {
    if (!user) return catalogue.filter((c) => c.purpose === 'rent').slice(0, 4);
    const fullName = `${user.firstName} ${user.lastName}`.trim().toLowerCase();
    const biz = (user.businessName || '').toLowerCase();
    const matched = catalogue.filter((c) => {
      const ownerLower = c.ownerName.toLowerCase();
      return (
        (user.email && c.ownerEmail?.toLowerCase() === user.email.toLowerCase()) ||
        ownerLower.includes(fullName) ||
        (biz && ownerLower.includes(biz)) ||
        ownerLower.includes(user.firstName.toLowerCase())
      );
    });
    return matched.length > 0 ? matched : catalogue.filter((c) => c.purpose === 'rent').slice(0, 4);
  }, [catalogue, user]);

  const handleListingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pledgeSigned) {
      alert('You must accept the HouseOne ₦0 Inspection Fee Policy to submit this rental.');
      return;
    }

    const currentCat = RENTAL_CATEGORIES[categoryIdx];
    const propertySlug = `${(title || currentCat.label)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')}-${stateLoc.toLowerCase()}-${Date.now().toString().slice(-4)}`;

    const densityObj = COMPOUND_TYPES.find((d) => d.id === compoundType);
    const meterObj = PREPAID_METERS.find((m) => m.id === meterType);
    const waterObj = WATER_SYSTEMS.find((w) => w.id === waterSystem);
    const roadObj = ROAD_FLOOD_STATUSES.find((r) => r.id === roadFlood);

    const compiledAmenities = [
      meterObj?.label || 'Prepaid Meter',
      waterObj?.label || 'Treated Borehole',
      roadObj?.label || 'Tarred Access Road',
      discoBand,
      `Compound: ${densityObj?.label || 'Low Density'}`,
    ].filter(Boolean) as string[];

    const newItem: CatalogueItem = {
      id: `cat-${Date.now()}`,
      title: title.trim() || currentCat.label,
      slug: propertySlug,
      purpose: 'rent',
      propertyType: currentCat.type,
      propertyTypeLabel: currentCat.label,
      state: stateLoc,
      lga: area.trim() || 'Central',
      area: area.trim() || 'Prime Area',
      address: address.trim() || 'Residential Axis',
      landmark: landmark.trim() || 'Major Junction',
      price: rentVal,
      serviceCharge: 0,
      cautionFee: 0,
      legalFeePct: 0,
      agencyFeePct: 0,
      bedrooms: Number(bedrooms) || 3,
      bathrooms: Number(bathrooms) || 3,
      toilets: Number(bathrooms) + 1,
      parkingSpaces: 2,
      sizeSqm: 250,
      unitInfo: densityObj?.label,
      description:
        fieldNotes.trim() ||
        `Verified residential rental in ${area}, ${stateLoc}. Outfitted with ${meterObj?.label}, ${waterObj?.label}, and ${roadObj?.label}. Direct owner rate locked with zero viewing fees.`,
      amenities: compiledAmenities,
      legalDocuments: uploadedDocs.map((d) => d.categoryLabel),
      attachedFiles: uploadedDocs,
      image: uploadedPhotos[0] || SAMPLE_PHOTOS[0],
      images: uploadedPhotos.length > 0 ? uploadedPhotos : [SAMPLE_PHOTOS[0]],
      ownerName: ownerName.trim() || (user ? `${user.firstName} ${user.lastName}`.trim() : 'Direct Property Owner'),
      ownerEmail: user?.email,
      ownerCapacity: ownerCapacity.trim() || 'Direct Property Owner',
      ownerPhone: ownerPhone.trim() || user?.phone || '+234 803 000 0000',
      status: 'pending',
      featured: false,
      submittedAt: new Date().toISOString().slice(0, 10),
      compoundDensity: densityObj?.label,
      powerSpecs: { meterType: meterObj?.label || 'Prepaid Meter', band: discoBand, backup: powerBackup },
      waterSpecs: { source: waterObj?.label || 'Borehole', treatment: waterObj?.sub || 'Treated' },
      roadFloodSpecs: { roadAccess: roadObj?.label || 'Tarred', floodStatus: '100% Flood-Free' },
      totalUpfrontEstimate: rentVal,
      videoTourUrl: videoTourUrl.trim() || undefined,
    };

    const next = [newItem, ...catalogue];
    setCatalogue(next);
    HouseOneStore.saveCatalogue(next);
    localStorage.removeItem('houseone_listing_draft');

    setSubmittedNotice(
      `"${newItem.title}" has been placed in the HouseOne verification ledger. Our compliance team will audit the attached papers and confirm key handover pricing.`
    );
    setActiveTab('ledger');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-paper min-h-screen text-ink pb-32">
      {/* Editorial Header */}
      <header className="border-b border-ink/10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-forest-800">
                Direct Mandate · Residential Tenancies
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
                Rental Mandate Schedule
              </h1>
              <p className="text-sm text-ink-600 leading-relaxed">
                Submit an individual home for physical inspection and rate locking. HouseOne publishes verified rentals with direct landlord mandates and zero inspection fees.
              </p>
            </div>

            {/* Tab Switcher */}
            <nav className="flex items-center gap-1 border-b border-ink/10 sm:border-0 shrink-0" aria-label="Views">
              <button
                type="button"
                onClick={() => setActiveTab('form')}
                className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'form'
                    ? 'border-ink text-ink'
                    : 'border-transparent text-ink-600 hover:text-ink'
                }`}
              >
                Draft Mandate
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('ledger')}
                className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'ledger'
                    ? 'border-ink text-ink'
                    : 'border-transparent text-ink-600 hover:text-ink'
                }`}
              >
                <span>Submitted Rentals</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-paper-100 text-ink">
                  {mySubmissions.length}
                </span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {draftRestored && (
          <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Unsaved draft restored</span>
              <span className="text-amber-700">· Your previously entered property details were recovered.</span>
            </div>
            <button
              type="button"
              onClick={discardDraft}
              className="text-amber-800 underline hover:text-amber-950 font-medium cursor-pointer"
            >
              Discard draft
            </button>
          </div>
        )}

        {submittedNotice && (
          <div className="mb-10 bg-forest-900 text-white p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Mandate Lodged with Compliance Desk
              </span>
              <p className="text-sm font-medium">{submittedNotice}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/admin"
                className="px-4 py-2 rounded-lg bg-amber-400 text-ink text-xs font-semibold hover:bg-amber-300 transition-colors"
              >
                View in Admin Ledger →
              </Link>
              <button
                type="button"
                onClick={() => setSubmittedNotice(null)}
                className="text-xs text-white/70 hover:text-white underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* ───────────── TAB 1: RENTAL MANDATE FORM ───────────── */}
        {activeTab === 'form' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* The Main Dossier Document */}
            <form onSubmit={handleListingSubmit} className="lg:col-span-8 space-y-14">
              {/* SECTION 01: PROPERTY & LOCATION */}
              <section className="space-y-6">
                <div className="border-b border-ink/10 pb-3">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-forest-800 bg-forest-50 px-2.5 py-0.5 rounded border border-forest-200/50">
                    Section 01
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight mt-1">
                    Property Classification &amp; Location
                  </h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-ink-800 mb-1.5">
                      Rental category
                    </label>
                    <select
                      value={categoryIdx}
                      onChange={(e) => setCategoryIdx(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-white border border-ink/15 text-sm text-ink rounded-lg focus:outline-none focus:border-ink cursor-pointer"
                    >
                      {RENTAL_CATEGORIES.map((cat, idx) => (
                        <option key={cat.label} value={idx}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink-800 mb-1.5">
                      Property headline
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. 4-Bedroom Serviced Terrace with Inverter & Domestic BQ"
                      className="w-full px-4 py-3 bg-white border border-ink/15 text-sm text-ink rounded-lg focus:outline-none focus:border-ink placeholder:text-ink-600/40"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-ink-800 mb-1.5">
                        State
                      </label>
                      <select
                        value={stateLoc}
                        onChange={(e) => setStateLoc(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-ink/15 text-sm text-ink rounded-lg focus:outline-none focus:border-ink cursor-pointer"
                      >
                        {NIGERIAN_STATES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-ink-800 mb-1.5">
                        District / Estate / Neighbourhood
                      </label>
                      <input
                        type="text"
                        required
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="e.g. Golf Estate, Independence Layout, GRA"
                        className="w-full px-4 py-3 bg-white border border-ink/15 text-sm text-ink rounded-lg focus:outline-none focus:border-ink placeholder:text-ink-600/40"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-ink-800 mb-1.5">
                        Street address
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. Plot 14 Valley Crescent"
                        className="w-full px-4 py-3 bg-white border border-ink/15 text-sm text-ink rounded-lg focus:outline-none focus:border-ink placeholder:text-ink-600/40"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-ink-800 mb-1.5">
                        Nearest landmark
                      </label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="e.g. 3 mins from Polo Park Mall / Nowas Petroleum"
                        className="w-full px-4 py-3 bg-white border border-ink/15 text-sm text-ink rounded-lg focus:outline-none focus:border-ink placeholder:text-ink-600/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink-800 mb-2">
                      Compound density
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {COMPOUND_TYPES.map((d) => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setCompoundType(d.id)}
                          className={`p-4 text-left border rounded-xl transition-all cursor-pointer ${
                            compoundType === d.id
                              ? 'border-ink bg-white shadow-sm ring-1 ring-ink'
                              : 'border-ink/15 bg-paper hover:border-ink/40'
                          }`}
                        >
                          <span className="text-sm font-semibold text-ink block">{d.label}</span>
                          <span className="text-xs text-ink-600 mt-1 block leading-tight">{d.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 02: NIGERIAN INFRASTRUCTURE & ESSENTIAL UTILITIES */}
              <section className="space-y-6">
                <div className="border-b border-ink/10 pb-3">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-forest-800 bg-forest-50 px-2.5 py-0.5 rounded border border-forest-200/50">
                    Section 02
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight mt-1">
                    Essential Utilities &amp; Infrastructure
                  </h2>
                  <p className="text-xs text-ink-600 mt-1">
                    Light, water, and road accessibility. Declare exact on-site provisions.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Electricity Metering */}
                  <div>
                    <label className="block text-sm font-medium text-ink-800 mb-2">
                      Electricity metering arrangement
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {PREPAID_METERS.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setMeterType(m.id)}
                          className={`p-4 text-left border rounded-xl transition-all cursor-pointer ${
                            meterType === m.id
                              ? 'border-forest-800 bg-forest-50/50 shadow-sm ring-1 ring-forest-800'
                              : 'border-ink/15 bg-paper hover:border-ink/40'
                          }`}
                        >
                          <span className="text-sm font-semibold text-ink block">{m.label}</span>
                          <span className="text-xs text-ink-600 mt-1 block leading-tight">{m.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Grid Feeder & Backup */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-ink-800 mb-1.5">
                        DisCo feeder schedule
                      </label>
                      <select
                        value={discoBand}
                        onChange={(e) => setDiscoBand(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-ink/15 text-sm text-ink rounded-lg focus:outline-none focus:border-ink cursor-pointer"
                      >
                        <option value="Band A (20+ Hours Daily)">Band A (20+ Hours Daily Supply)</option>
                        <option value="Band B (16 to 20 Hours Daily)">Band B (16 to 20 Hours Daily)</option>
                        <option value="Band C (12 to 16 Hours Daily)">Band C (12 to 16 Hours Daily)</option>
                        <option value="Dedicated Estate Line">Dedicated Estate Line</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-ink-800 mb-1.5">
                        Generator &amp; solar provision
                      </label>
                      <select
                        value={powerBackup}
                        onChange={(e) => setPowerBackup(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-ink/15 text-sm text-ink rounded-lg focus:outline-none focus:border-ink cursor-pointer"
                      >
                        {POWER_BACKUPS.map((p) => (
                          <option key={p.id} value={p.id}>{p.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Water System */}
                  <div>
                    <label className="block text-sm font-medium text-ink-800 mb-2">
                      Water supply &amp; filtration quality
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {WATER_SYSTEMS.map((w) => (
                        <button
                          key={w.id}
                          type="button"
                          onClick={() => setWaterSystem(w.id)}
                          className={`p-4 text-left border rounded-xl transition-all cursor-pointer ${
                            waterSystem === w.id
                              ? 'border-forest-800 bg-forest-50/50 shadow-sm ring-1 ring-forest-800'
                              : 'border-ink/15 bg-paper hover:border-ink/40'
                          }`}
                        >
                          <span className="text-sm font-semibold text-ink block">{w.label}</span>
                          <span className="text-xs text-ink-600 mt-1 block leading-tight">{w.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Road & Flood */}
                  <div>
                    <label className="block text-sm font-medium text-ink-800 mb-2">
                      Approach road &amp; rainy season drainage
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {ROAD_FLOOD_STATUSES.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setRoadFlood(r.id)}
                          className={`p-4 text-left border rounded-xl transition-all cursor-pointer ${
                            roadFlood === r.id
                              ? 'border-ink bg-white shadow-sm ring-1 ring-ink'
                              : 'border-ink/15 bg-paper hover:border-ink/40'
                          }`}
                        >
                          <span className="text-sm font-semibold text-ink block">{r.label}</span>
                          <span className="text-xs text-ink-600 mt-1 block leading-tight">{r.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 03: ANNUAL RENT */}
              <section className="space-y-6">
                <div className="border-b border-ink/10 pb-3">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-forest-800 bg-forest-50 px-2.5 py-0.5 rounded border border-forest-200/50">
                    Section 03
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight mt-1">
                    Annual Rent
                  </h2>
                  <p className="text-xs text-ink-600 mt-1">
                    State the direct annual rent for this residence.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-ink-800 mb-1.5">
                      Annual rent (₦ / year)
                    </label>
                    <input
                      type="text"
                      required
                      value={annualRentInput}
                      onChange={(e) => setAnnualRentInput(e.target.value)}
                      placeholder="e.g. 4,500,000"
                      className="w-full sm:w-80 px-4 py-3 bg-white border border-ink/15 text-lg font-bold tabular-nums text-ink rounded-lg focus:outline-none focus:border-ink shadow-sm"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-ink/15 text-xs text-ink-600 max-w-xl">
                    <span className="text-sm font-semibold text-ink block mb-0.5">
                      Direct Price Commitment
                    </span>
                    <p className="leading-relaxed">
                      The annual rent stated above is the exact figure displayed to verified applicants. Zero inspection fees or unadvertised surcharges may be demanded.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 04: PHOTOGRAPHY & SPECIFICATIONS */}
              <section className="space-y-6">
                <div className="border-b border-ink/10 pb-3">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-forest-800 bg-forest-50 px-2.5 py-0.5 rounded border border-forest-200/50">
                    Section 04
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight mt-1">
                    Photographic Records &amp; Room Specifications
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-ink-800 mb-1.5">
                        Bedrooms
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-ink/15 text-sm text-ink rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink-800 mb-1.5">
                        Bathrooms
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-ink/15 text-sm text-ink rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink-800 mb-1.5">
                      Detailed field notes &amp; tenancy terms
                    </label>
                    <textarea
                      rows={4}
                      value={fieldNotes}
                      onChange={(e) => setFieldNotes(e.target.value)}
                      placeholder="Describe the compound layout, neighbors, accessibility from expressways, gate protocol, and fittings..."
                      className="w-full px-4 py-3 bg-white border border-ink/15 text-sm text-ink rounded-lg focus:outline-none focus:border-ink placeholder:text-ink-600/40"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink-800 mb-1.5">
                      Video walkthrough link (optional)
                    </label>
                    <input
                      type="url"
                      value={videoTourUrl}
                      onChange={(e) => setVideoTourUrl(e.target.value)}
                      placeholder="YouTube, Google Drive, or WhatsApp Video link"
                      className="w-full px-4 py-3 bg-white border border-ink/15 text-sm text-ink rounded-lg focus:outline-none focus:border-ink placeholder:text-ink-600/40"
                    />
                  </div>

                  <div className="pt-2">
                    <PhotoUploader
                      photos={uploadedPhotos}
                      onChange={setUploadedPhotos}
                      maxPhotos={10}
                    />
                  </div>
                </div>
              </section>

              {/* SECTION 05: MANDATE PAPERS & LEGAL VAULT */}
              <section className="space-y-6">
                <div className="border-b border-ink/10 pb-3">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-forest-800 bg-forest-50 px-2.5 py-0.5 rounded border border-forest-200/50">
                    Section 05
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight mt-1">
                    Landlord Mandate &amp; Verification Papers
                  </h2>
                  <p className="text-xs text-ink-600 mt-1">
                    No NIN or corporate filing required. Submit genuine property deeds or signed landlord mandate letters for audit.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-ink-800 mb-1.5">
                        Lister full name
                      </label>
                      <input
                        type="text"
                        required
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder="e.g. Chief Emeka Eze"
                        className="w-full px-4 py-3 bg-white border border-ink/15 text-sm text-ink rounded-lg focus:outline-none focus:border-ink shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-ink-800 mb-1.5">
                        Direct phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        required
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                        placeholder="+234 803 000 0000"
                        className="w-full px-4 py-3 bg-white border border-ink/15 text-sm text-ink rounded-lg focus:outline-none focus:border-ink shadow-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-ink-800 mb-1.5">
                        Lister standing / Capacity
                      </label>
                      <select
                        value={ownerCapacity}
                        onChange={(e) => setOwnerCapacity(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-ink/15 text-sm text-ink rounded-lg focus:outline-none focus:border-ink shadow-sm cursor-pointer"
                      >
                        <option value="Direct Property Owner">Direct Property Owner (Landlord)</option>
                        <option value="Authorized Individual Agent">Authorized Individual Agent</option>
                        <option value="Family Caretaker / Representative">Family Caretaker / Representative</option>
                      </select>
                    </div>
                  </div>

                  {/* Document Uploader */}
                  <div className="pt-2">
                    <DocumentUploader
                      files={uploadedDocs}
                      onChange={setUploadedDocs}
                      onPreviewFile={setPreviewFile}
                    />
                  </div>

                  {/* Professional Policy Pledge */}
                  <div className="p-5 rounded-2xl bg-white border border-ink/20 space-y-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={pledgeSigned}
                        onChange={(e) => setPledgeSigned(e.target.checked)}
                        className="w-4 h-4 mt-0.5 accent-forest-800"
                      />
                      <div className="text-xs text-ink leading-relaxed">
                        <span className="font-semibold text-ink block text-sm mb-0.5">
                          Mandate Undertaking &amp; ₦0 Viewing Fee Guarantee
                        </span>
                        <span>
                          I affirm that I hold direct leasing authority from the title holder for this property. I agree that no prospective tenant introduced via HouseOne will be charged any mobilization fee, gate fee, or inspection fee for viewing this home.
                        </span>
                      </div>
                    </label>
                  </div>

                  <div className="pt-6 border-t border-ink/10">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-10 py-4 bg-forest-800 hover:bg-ink text-white rounded-xl text-base font-bold shadow-md hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 group border border-forest-900"
                    >
                      <span>Submit Rental Dossier to Compliance Desk</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </button>
                    <p className="text-xs text-ink-600 mt-2">
                      Locks direct owner pricing. No viewing or inspection fees will be charged to prospective tenants.
                    </p>
                  </div>
                </div>
              </section>
            </form>

            {/* Desktop Sticky Summary Column */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6">
              <div className="bg-white border border-ink/15 rounded-2xl p-6 shadow-sm space-y-5">
                <div className="border-b border-ink/10 pb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-forest-800 block">
                    Prospectus Summary
                  </span>
                  <h3 className="text-lg font-bold text-ink mt-0.5 tracking-tight">
                    Live Rental Calculation
                  </h3>
                </div>

                {/* Thumbnail */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-paper-100 border border-ink/10">
                  <Image
                    src={uploadedPhotos[0] || SAMPLE_PHOTOS[0]}
                    alt="Cover preview"
                    fill
                    sizes="(max-width: 1024px) 100vw, 360px"
                    priority
                    className="object-cover"
                  />
                  <span className="absolute bottom-2 left-2 bg-ink/80 text-white px-2 py-0.5 rounded text-xs font-medium">
                    {uploadedPhotos.length} photos
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-xs font-medium text-ink-600 block">
                      {stateLoc} · {area || 'Residential Axis'}
                    </span>
                    <p className="text-base font-semibold text-ink leading-snug mt-1">
                      {title.trim() || RENTAL_CATEGORIES[categoryIdx]?.label || `${bedrooms}-Bedroom Home`}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-paper border border-ink/10 flex items-baseline justify-between">
                    <div>
                      <span className="text-xs font-medium text-ink-600 block">Annual Rent</span>
                      <span className="text-2xl font-bold tabular-nums text-ink tracking-tight">
                        ₦{rentVal.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-ink-600">per annum</span>
                  </div>

                  <div className="p-3 rounded-xl bg-paper-100/60 border border-ink/10 space-y-1.5 text-[11px] text-ink-600">
                    <div className="flex items-center justify-between">
                      <span>Meter:</span>
                      <span className="font-semibold text-ink">
                        {PREPAID_METERS.find((m) => m.id === meterType)?.label.split(' ')[0]} Prepaid
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Water:</span>
                      <span className="font-semibold text-ink">
                        {WATER_SYSTEMS.find((w) => w.id === waterSystem)?.label.split(' ')[0]}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Viewing fee:</span>
                      <span className="font-bold text-forest-800">₦0 Guaranteed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-ink/10 text-xs text-ink-600 space-y-2 shadow-sm">
                <span className="text-xs font-bold text-forest-900 uppercase tracking-wider block">
                  Mandate Protocol
                </span>
                <p className="leading-relaxed">
                  Upon submission, your property is scheduled for physical site verification. Title deeds and landlord authorization letters are kept confidential within the compliance desk.
                </p>
              </div>
            </aside>
          </div>
        )}

        {/* ───────────── TAB 2: PORTFOLIO LEDGER VIEW (FULL-WIDTH) ───────────── */}
        {activeTab === 'ledger' && (
          <div className="space-y-6">
            <div className="bg-white border border-ink/15 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink/10 pb-5">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-forest-800 block">
                    Portfolio Ledger
                  </span>
                  <h2 className="text-2xl font-bold text-ink tracking-tight mt-0.5">
                    Your Registered Rentals ({mySubmissions.length})
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('form')}
                  className="px-5 py-2.5 rounded-lg bg-ink text-white text-xs font-semibold hover:bg-forest-900 transition-colors cursor-pointer shrink-0"
                >
                  + Lodge New Rental
                </button>
              </div>

              {/* Table of Submissions */}
              <div className="border border-ink/10 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-paper-100 text-xs font-semibold uppercase tracking-wider text-ink-600 border-b border-ink/10">
                      <th className="py-3 px-4">Property</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4 text-right">Annual Rent</th>
                      <th className="py-3 px-4">Audit Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/10">
                    {mySubmissions.map((item) => (
                      <tr key={item.id} className="hover:bg-paper/40 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-paper-100 shrink-0 border border-ink/10">
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

                        <td className="py-4 px-4 text-xs text-ink-600 font-medium">
                          {item.area}, {item.state}
                        </td>

                        <td className="py-4 px-4 text-right font-bold tabular-nums text-ink">
                          ₦{item.price.toLocaleString()}
                          <span className="block text-[11px] text-ink-600 font-normal">/ year</span>
                        </td>

                        <td className="py-4 px-4">
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
                              ? 'Published Live'
                              : item.status === 'pending'
                              ? 'Awaiting Audit'
                              : 'Unpublished'}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-right text-xs">
                          <Link
                            href={`/properties/${item.slug}`}
                            className="text-xs font-semibold text-ink underline decoration-amber-400 underline-offset-4 hover:decoration-ink"
                          >
                            Inspect →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        file={previewFile}
        onClose={() => setPreviewFile(null)}
      />
    </div>
  );
}
