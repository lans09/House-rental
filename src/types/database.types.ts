export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole =
  | 'seeker'
  | 'landlord'
  | 'agent'
  | 'property_manager'
  | 'moderator'
  | 'customer_support'
  | 'finance_officer'
  | 'super_admin';

export type AccountStatus =
  | 'unverified'
  | 'pending_verification'
  | 'active'
  | 'suspended'
  | 'banned';

export type PropertyType =
  | 'self_contain'
  | 'room_and_parlour'
  | 'flat_apartment'
  | 'duplex'
  | 'terraced_house'
  | 'semi_detached'
  | 'fully_detached'
  | 'short_let'
  | 'commercial';

export type ListingStatus =
  | 'draft'
  | 'pending_moderation'
  | 'pending_verification'
  | 'active'
  | 'let'
  | 'expired'
  | 'suspended'
  | 'rejected';

export type VerificationStatus =
  | 'unverified'
  | 'pending_review'
  | 'scheduled_inspection'
  | 'passed'
  | 'rejected';

export interface Profile {
  id: string;
  email: string;
  phone?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  business_name?: string | null;
  cac_number?: string | null;
  avatar_url?: string | null;
  role: UserRole;
  account_status: AccountStatus;
  is_phone_verified: boolean;
  is_email_verified: boolean;
  is_business_verified: boolean;
  preferred_states?: string[];
  preferred_lgas?: string[];
  notification_email: boolean;
  notification_sms: boolean;
  notification_whatsapp: boolean;
  created_at: string;
  updated_at: string;
}

export interface NigerianLocation {
  id: string;
  state: string;
  lga: string;
  area: string;
  popular_landmarks: string[];
  is_active: boolean;
}

export interface Property {
  id: string;
  owner_id: string;
  title: string;
  slug: string;
  description: string;
  property_type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  parking_spaces: number;
  is_furnished: boolean;
  is_serviced: boolean;
  size_sqm?: number | null;
  state: string;
  lga: string;
  area: string;
  street_address: string;
  landmark?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  rent_price: number;
  service_charge: number;
  caution_fee: number;
  legal_fee_pct: number;
  agency_fee_pct: number;
  total_upfront_estimate: number;
  amenities: string[];
  status: ListingStatus;
  is_verified: boolean;
  is_featured: boolean;
  featured_expires_at?: string | null;
  expires_at: string;
  let_at?: string | null;
  views_count: number;
  favourites_count: number;
  enquiries_count: number;
  created_at: string;
  updated_at: string;
  images?: PropertyImage[];
  owner?: Partial<Profile>;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  storage_path: string;
  order_index: number;
  is_cover: boolean;
}

export interface PropertyVerification {
  id: string;
  property_id: string;
  submitted_by: string;
  title_document_url?: string | null;
  survey_plan_url?: string | null;
  letter_of_authority_url?: string | null;
  agent_cac_url?: string | null;
  utility_bill_url?: string | null;
  status: VerificationStatus;
  sla_due_date: string;
  assigned_officer_id?: string | null;
  inspection_type: 'physical' | 'virtual';
  scheduled_inspection_date?: string | null;
  inspection_notes?: string | null;
  inspection_outcome: 'pending' | 'passed' | 'failed' | 'cancelled';
  rejection_reason_code?: string | null;
  rejection_notes?: string | null;
  approved_by?: string | null;
  approved_at?: string | null;
}

export interface EnquiryThread {
  id: string;
  property_id: string;
  seeker_id: string;
  owner_id: string;
  seeker_revealed_phone: boolean;
  owner_revealed_phone: boolean;
  status: 'new' | 'contacted' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface InspectionBooking {
  id: string;
  thread_id: string;
  property_id: string;
  seeker_id: string;
  owner_id: string;
  proposed_date: string;
  proposed_time_slot: string;
  status: 'pending' | 'confirmed' | 'declined' | 'completed' | 'cancelled' | 'expired';
  expires_at: string;
  response_notes?: string | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  tier: 'free' | 'basic_agent' | 'premium_agent' | 'enterprise_pm';
  active_listing_limit: number;
  featured_listing_quota: number;
  gateway: 'paystack' | 'flutterwave';
  status: string;
  current_period_start: string;
  current_period_end: string;
}
