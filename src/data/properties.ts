export interface PropertyDetail {
  id: string;
  title: string;
  slug: string;
  property_type: 'duplex' | 'flat_apartment' | 'detached_mansion' | 'land';
  listing_type: 'rent' | 'sale';
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  parking_spaces: number;
  unit_info?: string;
  size_sqm?: number;
  state: string;
  lga: string;
  area: string;
  street_address: string;
  landmark: string;
  rent_price: number; // For rent: annual rent; for sale: outright sale price
  service_charge?: number;
  caution_fee?: number;
  legal_fee_pct?: number;
  agency_fee_pct?: number;
  total_upfront_estimate?: number;
  is_verified: boolean;
  is_featured: boolean;
  description: string;
  amenities: string[];
  legal_documents?: string[];
  images: string[];
  owner: {
    name: string;
    capacity?: string;
    is_verified: boolean;
    phone_masked: string;
    whatsapp_phone: string;
  };
}

export const ALL_PROPERTIES: PropertyDetail[] = [
  {
    id: 'prop-enugu-01',
    title: 'Grand 5-Bedroom Executive Mansion + BQ',
    slug: 'luxury-5-bed-mansion-independence-layout-enugu',
    property_type: 'detached_mansion',
    listing_type: 'rent',
    bedrooms: 5,
    bathrooms: 5,
    toilets: 6,
    parking_spaces: 4,
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
- Polished interlocking compound with manicured royal palm trees and covered parking for up to 4 vehicles.`,
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
    legal_documents: [
      'Direct Landlord Mandate Agreement',
      'Registered Building Plan',
      'Verified Tax Clearance',
    ],
    images: [
      '/images/hero-eastern-nigerian-mansion.jpg',
      '/images/enugu-flagship-mansion.jpg',
      '/images/onitsha-gra-mansion.jpg',
      '/images/owerri-new-duplex.jpg',
    ],
    owner: {
      name: 'Chief Emeka Eze & Partners (Surveyors & Valuers)',
      capacity: 'Direct Property Owner',
      is_verified: true,
      phone_masked: '+234 803 ••• ••18',
      whatsapp_phone: '2348030000000',
    },
  },
  {
    id: 'prop-onitsha-01',
    title: 'Contemporary 5-Bedroom Luxury Duplex',
    slug: 'contemporary-5-bed-duplex-gra-onitsha',
    property_type: 'duplex',
    listing_type: 'sale',
    bedrooms: 5,
    bathrooms: 5,
    toilets: 6,
    parking_spaces: 4,
    size_sqm: 480,
    state: 'Anambra',
    lga: 'Onitsha North',
    area: 'GRA Onitsha',
    street_address: 'Ridgeway Drive, GRA, Onitsha',
    landmark: 'Off Old Market Road & River Niger Corridor',
    rent_price: 95000000,
    is_verified: true,
    is_featured: true,
    description: `Brand new master-architectural contemporary 5-bedroom duplex positioned in prime GRA Onitsha with verified Certificate of Occupancy (C of O).

Property Highlights:
- Solid foundation built with premium high-tensile steel and certified anti-damp proofing.
- Massive living room and dining section with Spanish porcelain tiles and suspended pop ceiling lights.
- Dedicated cinema room, private executive study, and dual family lounges on ground and upper levels.
- Industrial automated borehole with reverse osmosis water purification system.
- Secure gated access with 24-hour uniformed estate guards and verified direct landlord mandate.`,
    amenities: [
      'Private Family Lounge & Cinema',
      '24/7 Security Patrol & Armed Gate Guard',
      'Automated Interlocking Compound',
      'Industrial Borehole + Inverter Pre-wiring',
      'En-Suite 1-Room Domestic Quarters',
      'Prepaid Meter & Steady Grid Line',
    ],
    legal_documents: [
      'Valid Certificate of Occupancy (C of O)',
      'Registered Deed of Assignment',
      'Direct Landlord Mandate Letter',
    ],
    images: [
      '/images/onitsha-gra-mansion.jpg',
      '/images/onitsha-gra-luxury-duplex.jpg',
      '/images/awka-ngozika-duplex.jpg',
      '/images/hero-eastern-nigerian-mansion.jpg',
    ],
    owner: {
      name: 'Anambra Prime Properties & Mandates Ltd',
      capacity: 'Authorized Mandate Agent',
      is_verified: true,
      phone_masked: '+234 812 ••• ••45',
      whatsapp_phone: '2348030000000',
    },
  },
  {
    id: 'prop-owerri-01',
    title: 'Executive 4-Bedroom Serviced Duplex',
    slug: 'executive-4-bed-duplex-new-owerri',
    property_type: 'duplex',
    listing_type: 'rent',
    bedrooms: 4,
    bathrooms: 4,
    toilets: 5,
    parking_spaces: 3,
    size_sqm: 380,
    state: 'Imo',
    lga: 'Owerri Municipal',
    area: 'New Owerri',
    street_address: 'Area E, World Bank Housing Estate, New Owerri',
    landmark: 'Near Concorde Hotel & Port Harcourt Road junction',
    rent_price: 4500000,
    service_charge: 600000,
    caution_fee: 350000,
    legal_fee_pct: 10,
    agency_fee_pct: 10,
    total_upfront_estimate: 6350000,
    is_verified: true,
    is_featured: true,
    description: `Immaculate 4-bedroom serviced duplex located within the quiet, upscale residential corridor of New Owerri.

Property Highlights:
- Serviced estate with clean paved access roads and street lamps.
- Spacious master bedroom with private walk-out balcony and jacuzzi.
- 24/7 solar backup system, industrial borehole, and central water heating.
- Document-verified direct mandate from the family estate owner.`,
    amenities: [
      'Solar Backup System Installed',
      'Steady Industrial Borehole Supply',
      'Prepaid Metering System',
      'Jacuzzi & Contemporary Showers',
      'Serviced Compound Cleaning & Refuse',
      'Gated Community with 24-hr Vigilante',
      'Ample Compound Parking for 3 Cars',
    ],
    legal_documents: [
      'Direct Landlord Mandate Agreement',
      'Verified Family Estate Title',
    ],
    images: [
      '/images/owerri-new-duplex.jpg',
      '/images/owerri-luxury-duplex.jpg',
      '/images/hero-eastern-nigerian-mansion.jpg',
      '/images/asaba-gateway-duplex.jpg',
    ],
    owner: {
      name: 'Barrister Nnamdi Okereke & Co.',
      capacity: 'Direct Property Owner',
      is_verified: true,
      phone_masked: '+234 806 ••• ••92',
      whatsapp_phone: '2348030000000',
    },
  },
  {
    id: 'prop-awka-01',
    title: 'Contemporary 4-Bedroom Duplex with Carport',
    slug: 'contemporary-4-bed-duplex-ngozika-estate-awka',
    property_type: 'duplex',
    listing_type: 'sale',
    bedrooms: 4,
    bathrooms: 4,
    toilets: 5,
    parking_spaces: 3,
    size_sqm: 400,
    state: 'Anambra',
    lga: 'Awka South',
    area: 'Ngozika Housing Estate',
    street_address: 'Phase 2, Ngozika Housing Estate, Awka',
    landmark: 'Close to Anambra State Secretariat & Arroma Junction',
    rent_price: 75000000,
    is_verified: true,
    is_featured: false,
    description: `A brand new 4-bedroom contemporary duplex in Awka’s premier gated estate: Ngozika Phase 2.

Property Highlights:
- Finished with imported granite floor tiles and modern kitchen cabinets.
- Generous compound with custom carport and royal palm perimeter.
- Title documents verified: Registered Deed of Assignment & Governor's Consent.`,
    amenities: [
      'Custom Cantilever Carport (3 Cars)',
      'Private Borehole Water Supply',
      'Tarred Internal Estate Roads',
      '24/7 Gated Estate Vigilante Security',
      'Dedicated Prepaid Electric Meter',
    ],
    legal_documents: [
      'Registered Deed of Assignment',
      'Governor Consent Documented',
      'Verified Mandate Authorization',
    ],
    images: [
      '/images/awka-ngozika-duplex.jpg',
      '/images/onitsha-gra-mansion.jpg',
      '/images/onitsha-gra-luxury-duplex.jpg',
      '/images/hero-eastern-nigerian-mansion.jpg',
    ],
    owner: {
      name: 'Ngozika Real Estate Consortium',
      capacity: 'Authorized Mandate Agent',
      is_verified: true,
      phone_masked: '+234 813 ••• ••70',
      whatsapp_phone: '2348030000000',
    },
  },
  {
    id: 'prop-enugu-02',
    title: 'Luxury 4-Bedroom Detached Duplex + BQ',
    slug: 'luxury-4-bed-duplex-independence-layout-enugu',
    property_type: 'duplex',
    listing_type: 'sale',
    bedrooms: 4,
    bathrooms: 4,
    toilets: 5,
    parking_spaces: 4,
    size_sqm: 420,
    state: 'Enugu',
    lga: 'Enugu North',
    area: 'Independence Layout',
    street_address: 'Bishops Court Enclave, Independence Layout, Enugu',
    landmark: 'Opposite Independence Layout High Court',
    rent_price: 135000000,
    is_verified: true,
    is_featured: false,
    description: `Prestige architectural residence featuring 4 lavish ensuite bedrooms and 1-bedroom domestic staff quarters.

Property Highlights:
- Freehold title with clean Enugu State Ministry of Lands file search.
- Modern smart home lighting, automated gate, and high ceilings.
- Immediate handover upon transaction closing.`,
    amenities: [
      'High Ceilings & Italian LED Lighting',
      'Motorized Gate & Electric Security Fence',
      'Separate Domestic Staff Quarters (BQ)',
      'Dedicated Borehole & Dual Overhead Tanks',
      'Tarred Bishops Court Access Road',
    ],
    legal_documents: [
      'Clean State Ministry of Lands File Search',
      'Direct Landlord Sale Mandate',
    ],
    images: [
      '/images/enugu-flagship-mansion.jpg',
      '/images/hero-eastern-nigerian-mansion.jpg',
      '/images/onitsha-gra-mansion.jpg',
      '/images/owerri-new-duplex.jpg',
    ],
    owner: {
      name: 'Coal City Prime Holdings Ltd',
      capacity: 'Authorized Mandate Agent',
      is_verified: true,
      phone_masked: '+234 803 ••• ••22',
      whatsapp_phone: '2348030000000',
    },
  },
  {
    id: 'prop-owerri-02',
    title: 'Executive 3-Bedroom Serviced Apartment',
    slug: 'executive-3-bed-flat-new-owerri',
    property_type: 'flat_apartment',
    listing_type: 'rent',
    bedrooms: 3,
    bathrooms: 3,
    toilets: 4,
    parking_spaces: 2,
    unit_info: '1st Floor Unit · Block of 4 Flats',
    size_sqm: 210,
    state: 'Imo',
    lga: 'Owerri Municipal',
    area: 'New Owerri',
    street_address: 'Plot 22, Umuguma Boulevard, New Owerri',
    landmark: 'Near Heroes Square & Owerri Mall',
    rent_price: 2800000,
    service_charge: 350000,
    caution_fee: 200000,
    legal_fee_pct: 10,
    agency_fee_pct: 10,
    total_upfront_estimate: 3910000,
    is_verified: true,
    is_featured: false,
    description: `Contemporary 3-bedroom apartment on the first floor of an exclusive 4-flat residential block.

Property Highlights:
- Low-density block with only 4 families in the compound.
- Steady estate water and prepaid electricity meter.
- 10 minutes to central Owerri banks and shopping malls.`,
    amenities: [
      'Steady Estate Borehole Water & Dual Tanks',
      'Prepaid Electric Meter (PHED Verified)',
      'Dedicated Parking Bays for 2 Cars',
      'Paved Compound & Uniformed Night Guard',
      'Low-Density Quiet Block (4 Families Only)',
    ],
    legal_documents: [
      'Verified Landlord Mandate Agreement',
      'Clean Tenancy Agreement Contract',
    ],
    images: [
      '/images/asaba-gateway-duplex.jpg',
      '/images/owerri-new-duplex.jpg',
      '/images/owerri-luxury-duplex.jpg',
      '/images/hero-eastern-nigerian-mansion.jpg',
    ],
    owner: {
      name: 'Imo Valley Properties & Co',
      capacity: 'Authorized Mandate Agent',
      is_verified: true,
      phone_masked: '+234 805 ••• ••31',
      whatsapp_phone: '2348030000000',
    },
  },
  {
    id: 'prop-enugu-03',
    title: 'Tastefully Finished 2-Bedroom Serviced Flat',
    slug: 'serviced-2-bed-flat-trans-ekulu-enugu',
    property_type: 'flat_apartment',
    listing_type: 'rent',
    bedrooms: 2,
    bathrooms: 2,
    toilets: 3,
    parking_spaces: 2,
    unit_info: 'Ground Floor Flat · Gated Residence',
    size_sqm: 160,
    state: 'Enugu',
    lga: 'Enugu North',
    area: 'Trans-Ekulu',
    street_address: 'Damija Junction, Trans-Ekulu, Enugu',
    landmark: 'Near Nowas Petroleum & Nike Lake Road',
    rent_price: 2200000,
    service_charge: 300000,
    caution_fee: 150000,
    legal_fee_pct: 10,
    agency_fee_pct: 10,
    total_upfront_estimate: 3090000,
    is_verified: true,
    is_featured: false,
    description: `Neat, modern 2-bedroom serviced flat in upper Trans-Ekulu, Enugu.

Property Highlights:
- Fully tiled with POP ceilings and water heaters in both bathrooms.
- Dedicated parking spot with perimeter security wall and night gatekeeper.`,
    amenities: [
      'POP Ceilings & Fitted Kitchen Cabinets',
      'Water Heaters in All Bathrooms',
      'Borehole Water & Overhead Storage',
      'Dedicated Parking for 2 Cars',
      'Perimeter Security Wall & Night Guard',
      'Prepaid Metering System',
    ],
    legal_documents: [
      'Direct Landlord Mandate Confirmed',
      'Official Rent Receipt SLA',
    ],
    images: [
      '/images/aba-gra-residence.jpg',
      '/images/enugu-flagship-mansion.jpg',
      '/images/hero-eastern-nigerian-mansion.jpg',
      '/images/owerri-new-duplex.jpg',
    ],
    owner: {
      name: 'Dr. (Mrs) Chinwe Maduabuchi (Landlord)',
      capacity: 'Direct Property Owner',
      is_verified: true,
      phone_masked: '+234 803 ••• ••88',
      whatsapp_phone: '2348030000000',
    },
  },
  {
    id: 'prop-asaba-01',
    title: 'River Niger View 4-Bedroom Luxury Duplex',
    slug: 'river-niger-view-duplex-asaba-gra',
    property_type: 'duplex',
    listing_type: 'sale',
    bedrooms: 4,
    bathrooms: 4,
    toilets: 5,
    parking_spaces: 3,
    size_sqm: 410,
    state: 'Delta',
    lga: 'Oshimili South',
    area: 'Asaba GRA',
    street_address: 'Summit Road Annex, Asaba GRA, Delta State',
    landmark: '5 Minutes from Niger Bridge & Asaba Airport',
    rent_price: 88000000,
    is_verified: true,
    is_featured: false,
    description: `Magnificent 4-bedroom duplex in upscale Asaba GRA with scenic balcony views towards the Niger corridor.

Property Highlights:
- Contemporary glass balconies, fitted smart kitchen, and luxury marble finishes.
- Verified Delta State Certificate of Occupancy.`,
    amenities: [
      'Scenic River Niger View Balcony',
      'Fitted Chef Kitchen & Island',
      'Perimeter Electric Razor Wire',
      'Central Solar Inverter Pre-wiring',
      'Industrial Borehole & Water Treatment',
    ],
    legal_documents: [
      'Delta State C of O Documented',
      'Approved Building Plan & Mandate',
    ],
    images: [
      '/images/onitsha-gra-luxury-duplex.jpg',
      '/images/asaba-gateway-duplex.jpg',
      '/images/hero-eastern-nigerian-mansion.jpg',
      '/images/onitsha-gra-mansion.jpg',
    ],
    owner: {
      name: 'Asaba Capital Realtors Ltd',
      capacity: 'Authorized Mandate Agent',
      is_verified: true,
      phone_masked: '+234 818 ••• ••55',
      whatsapp_phone: '2348030000000',
    },
  },
  {
    id: 'prop-aba-01',
    title: 'Spacious 4-Bedroom Semi-Detached Duplex',
    slug: 'spacious-4-bed-duplex-aba-gra',
    property_type: 'duplex',
    listing_type: 'rent',
    bedrooms: 4,
    bathrooms: 4,
    toilets: 5,
    parking_spaces: 3,
    size_sqm: 350,
    state: 'Abia',
    lga: 'Aba South',
    area: 'Aba GRA',
    street_address: 'Brass Street, Off Factory Road, Aba GRA, Abia State',
    landmark: 'Adjacent to Aba Sports Club & Golf Course',
    rent_price: 3500000,
    service_charge: 400000,
    caution_fee: 250000,
    legal_fee_pct: 10,
    agency_fee_pct: 10,
    total_upfront_estimate: 4850000,
    is_verified: true,
    is_featured: false,
    description: `Substantial 4-bedroom semi-detached duplex situated in serene Aba GRA, away from commercial center noise.

Property Highlights:
- Serene residential street with stable power and paved road network.
- Large living area, ensuite rooms, and secure interlocked parking compound.`,
    amenities: [
      'Quiet Residential Location',
      'En-Suite Bedrooms with Balconies',
      'Paved Road Access',
      'Borehole & Storage Tanks',
      'Ample Compound Parking for 3 Cars',
    ],
    legal_documents: [
      'Registered Title & Mandate Papers',
    ],
    images: [
      '/images/aba-gra-residence.jpg',
      '/images/owerri-new-duplex.jpg',
      '/images/hero-eastern-nigerian-mansion.jpg',
      '/images/onitsha-gra-mansion.jpg',
    ],
    owner: {
      name: 'Chief Obinna Kalu & Partners',
      capacity: 'Family Caretaker / Representative',
      is_verified: true,
      phone_masked: '+234 802 ••• ••44',
      whatsapp_phone: '2348030000000',
    },
  },
  {
    id: 'prop-ph-01',
    title: 'Executive 3-Bedroom Serviced Apartment in Old GRA',
    slug: 'serviced-3-bed-flat-old-gra-port-harcourt',
    property_type: 'flat_apartment',
    listing_type: 'rent',
    bedrooms: 3,
    bathrooms: 3,
    toilets: 4,
    parking_spaces: 2,
    unit_info: '2nd Floor Corner Unit · Royal Enclave Block A',
    size_sqm: 230,
    state: 'Rivers',
    lga: 'Port Harcourt',
    area: 'Old GRA, Port Harcourt',
    street_address: 'Harley Street, Old GRA, Port Harcourt',
    landmark: 'Near Port Harcourt Club 1928 & Government House',
    rent_price: 5500000,
    service_charge: 800000,
    caution_fee: 400000,
    legal_fee_pct: 10,
    agency_fee_pct: 10,
    total_upfront_estimate: 7800000,
    is_verified: true,
    is_featured: true,
    description: `Prestige contemporary 3-bedroom serviced apartment situated in the high-security diplomatic corridor of Old GRA, Port Harcourt.

Property Highlights:
- 24/7 continuous electricity supply with dual synchronized backup generators.
- Treated industrial borehole water with reverse osmosis filtration.
- Modern fitted kitchen, all ensuite rooms, and dedicated parking for 2 cars.`,
    amenities: [
      '24/7 Continuous Power (Dual Sync Gen)',
      'Prepaid Electric Metering',
      'Treated Water Purification Plant',
      'Dedicated 2-Bay Car Park',
      'Armed Estate Guard & CCTV Coverage',
      'Tarred Harley Street Access',
    ],
    legal_documents: [
      'Verified Landlord Direct Mandate',
      'Rivers State Lands Registry Vetted',
    ],
    images: [
      '/images/asaba-gateway-duplex.jpg',
      '/images/enugu-flagship-mansion.jpg',
      '/images/onitsha-gra-mansion.jpg',
    ],
    owner: {
      name: 'Garden City Premier Realtors Ltd',
      capacity: 'Authorized Mandate Agent',
      is_verified: true,
      phone_masked: '+234 803 ••• ••77',
      whatsapp_phone: '2348030000000',
    },
  },
  {
    id: 'prop-lagos-01',
    title: 'Luxury 4-Bedroom Contemporary Terrace with BQ',
    slug: 'luxury-4-bed-terrace-lekki-phase-1-lagos',
    property_type: 'duplex',
    listing_type: 'rent',
    bedrooms: 4,
    bathrooms: 4,
    toilets: 5,
    parking_spaces: 3,
    unit_info: 'End-Unit Terrace · Gated Waterfront Estate',
    size_sqm: 320,
    state: 'Lagos',
    lga: 'Eti-Osa',
    area: 'Lekki Phase 1, Lagos',
    street_address: 'Admiralty Way Corridor, Lekki Phase 1',
    landmark: 'Close to Lekki-Ikoyi Link Bridge',
    rent_price: 12000000,
    service_charge: 1800000,
    caution_fee: 800000,
    legal_fee_pct: 10,
    agency_fee_pct: 10,
    total_upfront_estimate: 17000000,
    is_verified: true,
    is_featured: true,
    description: `Bespoke 4-bedroom terraced home with private 1-room BQ in a prestigious gated residential estate in Lekki Phase 1, Lagos.

Property Highlights:
- Central estate transformer with 24-hour power protocol.
- Clean interlocked roads, central drainage network, and zero flood elevation.
- Smart biometric door access and covered parking bays.`,
    amenities: [
      '24/7 Estate Managed Power',
      'Prepaid Meter & Central Transformer',
      'Central Water Treatment Works',
      'Covered Carport for 3 Vehicles',
      'Armed Mobile Police & Gate Security',
      'Zero Flood Elevation Interlocked Road',
    ],
    legal_documents: [
      'Lagos State Governor Consent Vetted',
      'Direct Mandate from Property Owner',
    ],
    images: [
      '/images/onitsha-gra-luxury-duplex.jpg',
      '/images/hero-eastern-nigerian-mansion.jpg',
      '/images/owerri-luxury-duplex.jpg',
    ],
    owner: {
      name: 'Admiralty Prime Properties Ltd',
      capacity: 'Authorized Mandate Agent',
      is_verified: true,
      phone_masked: '+234 802 ••• ••99',
      whatsapp_phone: '2348030000000',
    },
  },
  {
    id: 'prop-abuja-01',
    title: 'Diplomatic 5-Bedroom Detached Mansion in Maitama',
    slug: 'diplomatic-5-bed-mansion-maitama-abuja',
    property_type: 'detached_mansion',
    listing_type: 'sale',
    bedrooms: 5,
    bathrooms: 5,
    toilets: 6,
    parking_spaces: 6,
    size_sqm: 650,
    state: 'Abuja (FCT)',
    lga: 'Municipal',
    area: 'Maitama, Abuja',
    street_address: 'Gana Street Enclave, Maitama District, Abuja',
    landmark: 'Near Transcorp Hilton & European Union Delegation',
    rent_price: 380000000,
    is_verified: true,
    is_featured: true,
    description: `Palatial 5-bedroom detached mansion with 2-room staff quarters located in the heart of Maitama, Abuja.

Property Highlights:
- FCDA Certificate of Occupancy confirmed via AGIS search.
- Dedicated 50kVA standby generator and industrial solar hybrid bank.
- Olympic swimming pool, private elevator, and parking for 6 cars.`,
    amenities: [
      'FCDA Verified C of O (AGIS Vetted)',
      '24/7 Power (Dedicated 50kVA Gen + Solar)',
      'FCDA Mains Water + Borehole Backup',
      'Olympic Swimming Pool & Landscaped Garden',
      'Compound Parking for 6 Cars',
      'Motorized Gate & Bulletproof Access Doors',
    ],
    legal_documents: [
      'FCDA Certificate of Occupancy (AGIS)',
      'Direct Owner Mandate Letter',
      'Approved FCDA Architectural Plan',
    ],
    images: [
      '/images/enugu-flagship-mansion.jpg',
      '/images/onitsha-gra-mansion.jpg',
      '/images/hero-eastern-nigerian-mansion.jpg',
    ],
    owner: {
      name: 'Capital Federal Realtors Consortium',
      capacity: 'Authorized Mandate Agent',
      is_verified: true,
      phone_masked: '+234 809 ••• ••11',
      whatsapp_phone: '2348030000000',
    },
  },
];

export function getPropertyBySlug(slug: string): PropertyDetail | undefined {
  return ALL_PROPERTIES.find((p) => p.slug === slug);
}
