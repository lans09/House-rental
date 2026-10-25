import { ALL_PROPERTIES, PropertyDetail } from '@/data/properties';

export type MemberRole = 'seeker' | 'owner' | 'admin';
export type MemberStatus = 'active' | 'pending' | 'suspended';

export type DocumentCategory =
  | 'c_of_o'
  | 'deed_of_assignment'
  | 'mandate_letter'
  | 'building_plan'
  | 'survey_plan'
  | 'utility_bill'
  | 'other';

export type FileVerificationStatus = 'unverified' | 'verified' | 'rejected' | 'needs_clarification';

export interface UploadedFileRecord {
  id: string;
  name: string;
  sizeBytes: number;
  mimeType: string;
  dataUrl: string;
  uploadedAt: string;
  category: DocumentCategory;
  categoryLabel: string;
  verificationStatus: FileVerificationStatus;
  adminNotes?: string;
}

export interface MemberRecord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: MemberRole;
  listerType?: 'landlord' | 'agent' | 'caretaker';
  businessName?: string;
  city: string;
  status: MemberStatus;
  joinedAt: string;
  phoneVerified?: boolean;
  inspectionFeePledgeSigned?: boolean;
  adminAuditNotes?: string;
  kycDocuments?: UploadedFileRecord[];
  savedProperties?: string[];
}

export type CatalogueStatus = 'published' | 'pending' | 'unpublished';

export interface CatalogueItem {
  id: string;
  title: string;
  slug: string;
  purpose: 'rent' | 'sale';
  propertyType: 'duplex' | 'flat_apartment' | 'detached_mansion' | 'land';
  propertyTypeLabel: string;
  state: string;
  lga: string;
  area: string;
  address: string;
  landmark: string;
  price: number;
  serviceCharge: number;
  cautionFee: number;
  legalFeePct: number;
  agencyFeePct: number;
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  parkingSpaces: number;
  sizeSqm: number;
  unitInfo?: string;
  description: string;
  amenities: string[];
  legalDocuments: string[];
  attachedFiles?: UploadedFileRecord[];
  image: string;
  images: string[];
  ownerName: string;
  ownerEmail?: string;
  ownerCapacity?: string;
  ownerCac?: string;
  ownerPhone: string;
  status: CatalogueStatus;
  featured: boolean;
  submittedAt: string;
  reviewNotes?: string;
  compoundDensity?: string;
  powerSpecs?: { meterType: string; band?: string; backup?: string };
  waterSpecs?: { source: string; treatment: string; storage?: string };
  roadFloodSpecs?: { roadAccess: string; floodStatus: string };
  bqSpecs?: string;
  serviceChargeItems?: string[];
  totalUpfrontEstimate?: number;
  videoTourUrl?: string;
}

export interface ViewingRequest {
  id: string;
  propertyId: string;
  propertySlug: string;
  propertyTitle: string;
  propertyArea: string;
  seekerName: string;
  seekerEmail: string;
  seekerPhone: string;
  proposedDate: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'declined';
  createdAt: string;
  ownerResponseNote?: string;
}

const INITIAL_MEMBERS: MemberRecord[] = [
  {
    id: 'mem-1',
    firstName: 'Chukwudi',
    lastName: 'Nnamani',
    email: 'admin@houseone.ng',
    phone: '+234 803 100 0001',
    role: 'admin',
    businessName: 'HouseOne Desk',
    city: 'Enugu',
    status: 'active',
    joinedAt: '2026-09-01',
  },
  {
    id: 'mem-2',
    firstName: 'Emeka',
    lastName: 'Eze',
    email: 'chief.eze@ezeholdings.ng',
    phone: '+234 803 000 0018',
    role: 'owner',
    listerType: 'landlord',
    businessName: 'Chief Emeka Eze (Direct Landlord)',
    city: 'Enugu',
    status: 'active',
    joinedAt: '2026-09-14',
    phoneVerified: true,
    inspectionFeePledgeSigned: true,
    adminAuditNotes: 'Direct property owner of duplex units in Trans-Ekulu. Title deed & signed pricing schedule verified.',
    kycDocuments: [
      {
        id: 'kyc-2-1',
        name: 'Registered_Deed_of_Conveyance_TransEkulu.pdf',
        sizeBytes: 1024 * 720,
        mimeType: 'application/pdf',
        dataUrl: '/images/onitsha-gra-luxury-duplex.jpg',
        uploadedAt: '2026-09-14',
        category: 'deed_of_assignment',
        categoryLabel: 'Registered Deed of Conveyance / Title',
        verificationStatus: 'verified',
      },
      {
        id: 'kyc-2-2',
        name: 'Compound_Utility_Meter_Bill.pdf',
        sizeBytes: 1024 * 310,
        mimeType: 'application/pdf',
        dataUrl: '/images/enugu-flagship-mansion.jpg',
        uploadedAt: '2026-09-14',
        category: 'utility_bill',
        categoryLabel: 'Compound Electricity Bill (Proof of Location)',
        verificationStatus: 'verified',
      },
    ],
  },
  {
    id: 'mem-3',
    firstName: 'Kenechukwu',
    lastName: 'Udeh',
    email: 'kenechukwu@coalcityestates.ng',
    phone: '+234 806 412 8890',
    role: 'owner',
    listerType: 'agent',
    businessName: 'Coal City Homes (Independent Agent)',
    city: 'Enugu',
    status: 'active',
    joinedAt: '2026-10-15',
    phoneVerified: true,
    inspectionFeePledgeSigned: true,
    adminAuditNotes: 'Direct agent mandate for Golf Estate terrace. Signed Landlord Mandate Letter attached. ₦0 viewing fee pledge confirmed.',
    kycDocuments: [
      {
        id: 'kyc-3-1',
        name: 'Direct_Landlord_Signed_Mandate_Letter.pdf',
        sizeBytes: 1024 * 650,
        mimeType: 'application/pdf',
        dataUrl: '/images/enugu-flagship-mansion.jpg',
        uploadedAt: '2026-10-15',
        category: 'mandate_letter',
        categoryLabel: 'Signed Direct Landlord Mandate Letter',
        verificationStatus: 'verified',
      },
      {
        id: 'kyc-3-2',
        name: 'Golf_Estate_Approved_Building_Plan.pdf',
        sizeBytes: 1024 * 890,
        mimeType: 'application/pdf',
        dataUrl: '/images/awka-ngozika-duplex.jpg',
        uploadedAt: '2026-10-15',
        category: 'building_plan',
        categoryLabel: 'Approved Building Plan',
        verificationStatus: 'verified',
      },
      {
        id: 'kyc-3-3',
        name: 'Proof_of_Address_Electricity_Bill.pdf',
        sizeBytes: 1024 * 410,
        mimeType: 'application/pdf',
        dataUrl: '/images/owerri-luxury-duplex.jpg',
        uploadedAt: '2026-10-16',
        category: 'utility_bill',
        categoryLabel: 'Recent Utility Bill (Proof of Address)',
        verificationStatus: 'verified',
      },
    ],
  },
  {
    id: 'mem-4',
    firstName: 'Chidinma',
    lastName: 'Obi',
    email: 'chidinma@nigerbridge.ng',
    phone: '+234 809 555 2109',
    role: 'owner',
    listerType: 'caretaker',
    businessName: 'Family Property Caretaker',
    city: 'Onitsha',
    status: 'active',
    joinedAt: '2026-10-16',
    phoneVerified: true,
    inspectionFeePledgeSigned: true,
    adminAuditNotes: 'Authorized family caretaker for GRA Onitsha villa. Signed authorization letter on file.',
    kycDocuments: [
      {
        id: 'kyc-4-1',
        name: 'Signed_Family_Caretaker_Authorization.pdf',
        sizeBytes: 1024 * 590,
        mimeType: 'application/pdf',
        dataUrl: '/images/onitsha-gra-luxury-duplex.jpg',
        uploadedAt: '2026-10-16',
        category: 'mandate_letter',
        categoryLabel: 'Signed Landlord / Family Authorization Letter',
        verificationStatus: 'verified',
      },
      {
        id: 'kyc-4-2',
        name: 'GRA_Onitsha_Deed_of_Assignment.pdf',
        sizeBytes: 1024 * 810,
        mimeType: 'application/pdf',
        dataUrl: '/images/onitsha-gra-luxury-duplex.jpg',
        uploadedAt: '2026-10-16',
        category: 'deed_of_assignment',
        categoryLabel: 'Registered Deed of Assignment',
        verificationStatus: 'unverified',
      },
    ],
  },
  {
    id: 'mem-5',
    firstName: 'Obinna',
    lastName: 'Okeke',
    email: 'obinna.okeke@gmail.com',
    phone: '+234 803 771 2345',
    role: 'seeker',
    city: 'Enugu',
    status: 'active',
    joinedAt: '2026-10-12',
  },
  {
    id: 'mem-6',
    firstName: 'Ngozi',
    lastName: 'Okafor',
    email: 'ngozi.okafor@yahoo.com',
    phone: '+234 802 904 1120',
    role: 'owner',
    listerType: 'landlord',
    businessName: 'Direct Landlord',
    city: 'Enugu',
    status: 'active',
    joinedAt: '2026-09-28',
  },
];

const INITIAL_CATALOGUE: CatalogueItem[] = [
  {
    id: 'cat-pending-1',
    title: '4-Bedroom Serviced Terrace with Solar Inverter',
    slug: '4-bedroom-serviced-terrace-golf-estate-enugu',
    purpose: 'rent',
    propertyType: 'duplex',
    propertyTypeLabel: 'Terraced Duplex',
    state: 'Enugu',
    lga: 'Enugu North',
    area: 'Golf Estate, GRA',
    address: 'Plot 22, Golf Course Layout, GRA Enugu',
    landmark: 'Near Polo Park Mall & Enugu Golf Course',
    price: 5200000,
    serviceCharge: 600000,
    cautionFee: 400000,
    legalFeePct: 10,
    agencyFeePct: 10,
    bedrooms: 4,
    bathrooms: 4,
    toilets: 5,
    parkingSpaces: 3,
    sizeSqm: 310,
    description: `Newly finished 4-bedroom serviced terrace duplex inside the gated Golf Course Layout, GRA Enugu.

Property Highlights:
- 10kVA solar inverter system paired with silent estate backup generator.
- Dedicated borehole with industrial water filtration plant.
- All 4 bedrooms en-suite with walk-in glass showers and water heaters.
- Fitted kitchen with heat extractor, gas burner, and adjoining laundry room.
- Interlocked compound with 24-hour uniformed estate security at the main gate.`,
    amenities: [
      '10kVA Solar Inverter + Estate Gen',
      'Pre-paid Electricity Meter',
      'Treated Borehole Water Supply',
      '24/7 Uniformed Estate Security',
      'Fitted Kitchen & Extractor',
      'Allocated Parking for 3 Cars',
    ],
    legalDocuments: [
      'Enugu State Certificate of Occupancy (C of O)',
      'Signed Landlord Direct Mandate Letter',
      'Registered Survey Plan',
      'EEDC Utility Clearance Receipt',
    ],
    image: '/images/enugu-flagship-mansion.jpg',
    images: [
      '/images/enugu-flagship-mansion.jpg',
      '/images/hero-eastern-nigerian-mansion.jpg',
      '/images/owerri-new-duplex.jpg',
    ],
    ownerName: 'Kenechukwu Udeh (Coal City Prime Estates)',
    ownerEmail: 'kenechukwu@coalcityestates.ng',
    ownerCapacity: 'Authorized Mandate Agent',
    ownerPhone: '2348064128890',
    status: 'pending',
    featured: false,
    submittedAt: '2026-10-16',
  },
  {
    id: 'cat-pending-2',
    title: 'Newly Built 3-Bedroom Flat, All En-Suite',
    slug: 'newly-built-3-bedroom-flat-ngozika-estate-awka',
    purpose: 'rent',
    propertyType: 'flat_apartment',
    propertyTypeLabel: 'Flat / Apartment',
    state: 'Anambra',
    lga: 'Awka South',
    area: 'Ngozika Housing Estate, Awka',
    address: 'Block 9, Phase 2 Extension, Ngozika Estate',
    landmark: '5 mins from Anambra Government House & Ekwueme Square',
    price: 2400000,
    serviceCharge: 250000,
    cautionFee: 200000,
    legalFeePct: 10,
    agencyFeePct: 10,
    bedrooms: 3,
    bathrooms: 3,
    toilets: 4,
    parkingSpaces: 2,
    sizeSqm: 175,
    unitInfo: 'Top Floor Flat · Block of 4 Units',
    description: `Spacious, newly completed 3-bedroom apartment in Phase 2 of Ngozika Housing Estate, Awka.

Property Highlights:
- Individual pre-paid meter installed for each flat (no shared estimated bills).
- High-pressure borehole water system with overhead storage tanks.
- POP ceilings, vitrified Spanish floor tiles, and private front & rear balconies.
- Tarred access road right to the gate within a quiet family residential close.`,
    amenities: [
      'Individual Pre-paid Meter',
      'Borehole Water Supply',
      'Gated Ngozika Estate Security',
      'Solar Inverter Wiring Ready',
      '2 Dedicated Car Park Spaces',
    ],
    legalDocuments: [
      'Anambra State Registered Deed of Assignment',
      'Signed Landlord Mandate & Rate Lock Agreement',
      'Approved Building Plan',
    ],
    image: '/images/awka-ngozika-duplex.jpg',
    images: [
      '/images/awka-ngozika-duplex.jpg',
      '/images/asaba-gateway-duplex.jpg',
      '/images/aba-gra-residence.jpg',
    ],
    ownerName: 'Chidinma Obi (Niger Bridge Residences)',
    ownerEmail: 'chidinma@nigerbridge.ng',
    ownerCapacity: 'Direct Property Owner',
    ownerPhone: '2348095552109',
    status: 'pending',
    featured: false,
    submittedAt: '2026-10-16',
  },
  ...ALL_PROPERTIES.map((p, idx) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    purpose: p.listing_type,
    propertyType: p.property_type,
    propertyTypeLabel:
      p.property_type === 'flat_apartment'
        ? 'Flat / Apartment'
        : p.property_type === 'detached_mansion'
        ? 'Detached Mansion'
        : p.property_type === 'land'
        ? 'Verified Land'
        : 'Duplex',
    state: p.state,
    lga: p.lga,
    area: p.area,
    address: p.street_address,
    landmark: p.landmark,
    price: p.rent_price,
    serviceCharge: p.service_charge || 0,
    cautionFee: p.caution_fee || 0,
    legalFeePct: p.legal_fee_pct ?? 10,
    agencyFeePct: p.agency_fee_pct ?? 10,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    toilets: p.toilets,
    parkingSpaces: p.parking_spaces,
    sizeSqm: p.size_sqm || 280,
    unitInfo: p.unit_info,
    description: p.description,
    amenities: p.amenities,
    legalDocuments: p.legal_documents || [
      'Direct Landlord Mandate Agreement',
      'Verified Title Deed / C of O',
      'Approved Survey Plan',
    ],
    image: p.images[0] || '/images/hero-eastern-nigerian-mansion.jpg',
    images: p.images,
    ownerName: p.owner.name,
    ownerEmail: 'chief.eze@ezeholdings.ng',
    ownerCapacity: 'Direct Property Owner',
    ownerPhone: p.owner.whatsapp_phone,
    status: 'published' as CatalogueStatus,
    featured: Boolean(p.is_featured),
    submittedAt: `2026-10-${String(Math.max(1, 15 - idx)).padStart(2, '0')}`,
  })),
];

const INITIAL_VIEWINGS: ViewingRequest[] = [
  {
    id: 'vw-1',
    propertyId: 'prop-enugu-01',
    propertySlug: 'luxury-5-bed-mansion-independence-layout-enugu',
    propertyTitle: 'Grand 5-Bedroom Executive Mansion + BQ',
    propertyArea: 'Independence Layout, Enugu',
    seekerName: 'Obinna Okeke',
    seekerEmail: 'obinna.okeke@gmail.com',
    seekerPhone: '+234 803 771 2345',
    proposedDate: '2026-10-19',
    timeSlot: '10:00 AM – 12:00 PM',
    status: 'pending',
    createdAt: '2026-10-16',
  },
  {
    id: 'vw-2',
    propertyId: 'prop-owerri-01',
    propertySlug: 'executive-4-bed-duplex-new-owerri',
    propertyTitle: 'Executive 4-Bedroom Serviced Duplex',
    propertyArea: 'New Owerri, Imo',
    seekerName: 'Amaka Nwachukwu',
    seekerEmail: 'amaka.n@outlook.com',
    seekerPhone: '+234 813 402 9910',
    proposedDate: '2026-10-20',
    timeSlot: '2:00 PM – 4:00 PM',
    status: 'confirmed',
    createdAt: '2026-10-15',
  },
  {
    id: 'vw-3',
    propertyId: 'prop-onitsha-01',
    propertySlug: 'contemporary-5-bed-duplex-gra-onitsha',
    propertyTitle: 'Contemporary 5-Bedroom Luxury Duplex',
    propertyArea: 'GRA Onitsha, Anambra',
    seekerName: 'Dr. Lotanna Ibe',
    seekerEmail: 'lotanna.ibe@medcentre.ng',
    seekerPhone: '+234 805 220 8172',
    proposedDate: '2026-10-14',
    timeSlot: '11:00 AM – 1:00 PM',
    status: 'completed',
    createdAt: '2026-10-11',
  },
];

const KEYS = {
  MEMBERS: 'houseone_clean_members_v4',
  CATALOGUE: 'houseone_clean_catalogue_v4',
  VIEWINGS: 'houseone_clean_viewings_v4',
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      window.localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('houseone-store-updated'));
  } catch {
    // ignore
  }
}

export function catalogueItemToPropertyDetail(item: CatalogueItem): PropertyDetail {
  const legalAmt = Math.round((item.price * (item.legalFeePct || 10)) / 100);
  const agencyAmt = Math.round((item.price * (item.agencyFeePct || 10)) / 100);
  const totalUpfront =
    item.purpose === 'sale'
      ? item.price
      : item.price + (item.serviceCharge || 0) + (item.cautionFee || 0) + legalAmt + agencyAmt;

  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    property_type: item.propertyType,
    listing_type: item.purpose,
    bedrooms: item.bedrooms,
    bathrooms: item.bathrooms,
    toilets: item.toilets,
    parking_spaces: item.parkingSpaces,
    unit_info: item.unitInfo,
    size_sqm: item.sizeSqm,
    state: item.state,
    lga: item.lga,
    area: item.area,
    street_address: item.address,
    landmark: item.landmark,
    rent_price: item.price,
    service_charge: item.serviceCharge,
    caution_fee: item.cautionFee,
    legal_fee_pct: item.legalFeePct,
    agency_fee_pct: item.agencyFeePct,
    total_upfront_estimate: totalUpfront,
    is_verified: item.status === 'published',
    is_featured: item.featured,
    description: item.description,
    amenities: item.amenities,
    legal_documents: item.legalDocuments,
    images: item.images.length > 0 ? item.images : [item.image],
    owner: {
      name: item.ownerName,
      capacity: item.ownerCapacity || item.ownerCac || 'Direct Mandate',
      is_verified: item.status === 'published',
      phone_masked: '+234 803 ••• ••18',
      whatsapp_phone: item.ownerPhone.replace(/\D/g, '') || '2348030000000',
    },
  };
}

export const HouseOneStore = {
  getMembers: (): MemberRecord[] => {
    const stored = read<MemberRecord[]>(KEYS.MEMBERS, INITIAL_MEMBERS);
    return stored.map((member) => {
      const initMatch = INITIAL_MEMBERS.find(
        (im) => im.id === member.id || im.email.toLowerCase() === member.email.toLowerCase()
      );
      if (initMatch) {
        return {
          ...initMatch,
          ...member,
          listerType: member.listerType || initMatch.listerType,
          phoneVerified: member.phoneVerified ?? initMatch.phoneVerified,
          inspectionFeePledgeSigned:
            member.inspectionFeePledgeSigned ?? initMatch.inspectionFeePledgeSigned,
          kycDocuments:
            member.kycDocuments && member.kycDocuments.length > 0
              ? member.kycDocuments
              : initMatch.kycDocuments,
          adminAuditNotes: member.adminAuditNotes || initMatch.adminAuditNotes,
        };
      }
      return member;
    });
  },
  saveMembers: (items: MemberRecord[]) => write(KEYS.MEMBERS, items),

  updateMemberStatus: (memberId: string, status: MemberStatus) => {
    const list = HouseOneStore.getMembers();
    const next = list.map((m) => (m.id === memberId ? { ...m, status } : m));
    HouseOneStore.saveMembers(next);
  },

  addOrUpdateMember: (member: MemberRecord): MemberRecord => {
    const list = HouseOneStore.getMembers();
    const existingIdx = list.findIndex(
      (m) => m.id === member.id || m.email.toLowerCase() === member.email.toLowerCase()
    );
    if (existingIdx >= 0) {
      list[existingIdx] = { ...list[existingIdx], ...member };
      HouseOneStore.saveMembers([...list]);
      return list[existingIdx];
    }
    const updated = [member, ...list];
    HouseOneStore.saveMembers(updated);
    return member;
  },

  getCatalogue: (): CatalogueItem[] => read(KEYS.CATALOGUE, INITIAL_CATALOGUE),
  saveCatalogue: (items: CatalogueItem[]) => write(KEYS.CATALOGUE, items),

  getPublishedPropertyDetails: (): PropertyDetail[] => {
    return HouseOneStore.getCatalogue()
      .filter((item) => item.status === 'published')
      .map(catalogueItemToPropertyDetail);
  },

  getCatalogueItemBySlug: (slug: string): CatalogueItem | undefined => {
    return HouseOneStore.getCatalogue().find((item) => item.slug === slug);
  },

  getViewings: (): ViewingRequest[] => read(KEYS.VIEWINGS, INITIAL_VIEWINGS),
  saveViewings: (items: ViewingRequest[]) => write(KEYS.VIEWINGS, items),

  addViewing: (viewing: ViewingRequest): ViewingRequest => {
    const list = HouseOneStore.getViewings();
    const updated = [viewing, ...list];
    HouseOneStore.saveViewings(updated);
    return viewing;
  },

  updateViewingStatus: (
    viewingId: string,
    status: 'pending' | 'confirmed' | 'completed' | 'declined',
    note?: string
  ) => {
    const list = HouseOneStore.getViewings();
    const next = list.map((v) =>
      v.id === viewingId ? { ...v, status, ownerResponseNote: note ?? v.ownerResponseNote } : v
    );
    HouseOneStore.saveViewings(next);
  },

  updatePropertyStatus: (propertyId: string, status: CatalogueStatus) => {
    const list = HouseOneStore.getCatalogue();
    const next = list.map((item) =>
      item.id === propertyId ? { ...item, status } : item
    );
    HouseOneStore.saveCatalogue(next);
  },

  updateFileVerification: (
    propertyId: string,
    fileId: string,
    status: FileVerificationStatus,
    notes?: string
  ) => {
    const list = HouseOneStore.getCatalogue();
    const next = list.map((item) => {
      if (item.id !== propertyId) return item;
      const files = (item.attachedFiles || []).map((f) =>
        f.id === fileId ? { ...f, verificationStatus: status, adminNotes: notes ?? f.adminNotes } : f
      );
      return { ...item, attachedFiles: files };
    });
    HouseOneStore.saveCatalogue(next);
  },

  toggleSavedProperty: (userEmail: string, slug: string): string[] => {
    const members = HouseOneStore.getMembers();
    const targetIdx = members.findIndex(
      (m) => m.email.toLowerCase() === userEmail.toLowerCase()
    );
    if (targetIdx === -1) return [];
    const currentSaved = members[targetIdx].savedProperties || [];
    const isSaved = currentSaved.includes(slug);
    const nextSaved = isSaved
      ? currentSaved.filter((s) => s !== slug)
      : [...currentSaved, slug];
    members[targetIdx].savedProperties = nextSaved;
    HouseOneStore.saveMembers([...members]);
    return nextSaved;
  },
};
