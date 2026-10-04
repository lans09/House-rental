-- =============================================================================
-- HOUSEONE PROPTECH PLATFORM: SUPABASE INITIAL DATABASE SCHEMA
-- =============================================================================
-- Compliant with HouseOne BRD v1.0 & NDPA 2023 Guidelines
-- Modules: 1-15 | RBAC Matrix | Nigerian Fee Engine | 5-Day SLA | Anti-Fraud
-- =============================================================================

-- Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- 1. CUSTOM ENUMS & TYPES
-- =============================================================================

CREATE TYPE user_role AS ENUM (
    'seeker',
    'landlord',
    'agent',
    'property_manager',
    'moderator',
    'customer_support',
    'finance_officer',
    'super_admin'
);

CREATE TYPE account_status AS ENUM (
    'unverified',
    'pending_verification',
    'active',
    'suspended',
    'banned'
);

CREATE TYPE property_type AS ENUM (
    'self_contain',
    'room_and_parlour',
    'flat_apartment',
    'duplex',
    'terraced_house',
    'semi_detached',
    'fully_detached',
    'short_let',
    'commercial'
);

CREATE TYPE listing_status AS ENUM (
    'draft',
    'pending_moderation',
    'pending_verification',
    'active',
    'let',
    'expired',
    'suspended',
    'rejected'
);

CREATE TYPE verification_status AS ENUM (
    'unverified',
    'pending_review',
    'scheduled_inspection',
    'passed',
    'rejected'
);

CREATE TYPE inspection_type AS ENUM (
    'physical',
    'virtual'
);

CREATE TYPE inspection_outcome AS ENUM (
    'pending',
    'passed',
    'failed',
    'cancelled'
);

CREATE TYPE enquiry_status AS ENUM (
    'new',
    'contacted',
    'closed'
);

CREATE TYPE booking_status AS ENUM (
    'pending',
    'confirmed',
    'declined',
    'completed',
    'cancelled',
    'expired'
);

CREATE TYPE subscription_tier AS ENUM (
    'free',
    'basic_agent',
    'premium_agent',
    'enterprise_pm'
);

CREATE TYPE payment_gateway AS ENUM (
    'paystack',
    'flutterwave'
);

CREATE TYPE payment_status AS ENUM (
    'pending',
    'success',
    'failed',
    'reversed'
);

CREATE TYPE fraud_report_status AS ENUM (
    'pending',
    'investigating',
    'actioned',
    'dismissed'
);

CREATE TYPE ticket_priority AS ENUM (
    'low',
    'medium',
    'high',
    'urgent'
);

CREATE TYPE ticket_status AS ENUM (
    'open',
    'in_progress',
    'escalated',
    'resolved',
    'closed'
);

-- =============================================================================
-- 2. USER PROFILES & RBAC (Extends Supabase auth.users)
-- =============================================================================

CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    first_name TEXT,
    last_name TEXT,
    business_name TEXT,
    cac_number TEXT,
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'seeker',
    account_status account_status NOT NULL DEFAULT 'unverified',
    is_phone_verified BOOLEAN NOT NULL DEFAULT FALSE,
    is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    is_business_verified BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Preferences (BRD Mod 3)
    preferred_states TEXT[] DEFAULT '{}',
    preferred_lgas TEXT[] DEFAULT '{}',
    notification_email BOOLEAN NOT NULL DEFAULT TRUE,
    notification_sms BOOLEAN NOT NULL DEFAULT TRUE,
    notification_whatsapp BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- Metadata
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 3. NIGERIAN LOCATIONS REFERENCE DATA
-- =============================================================================

CREATE TABLE public.nigerian_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    state TEXT NOT NULL,
    lga TEXT NOT NULL,
    area TEXT NOT NULL,
    popular_landmarks TEXT[] DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_locations_state_lga ON public.nigerian_locations (state, lga);
CREATE INDEX idx_locations_area ON public.nigerian_locations (area);

-- =============================================================================
-- 4. PROPERTY LISTINGS & NIGERIAN PRICING ARCHITECTURE
-- =============================================================================

CREATE TABLE public.properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    property_type property_type NOT NULL DEFAULT 'flat_apartment',
    
    -- Specifications
    bedrooms INT NOT NULL DEFAULT 1,
    bathrooms INT NOT NULL DEFAULT 1,
    toilets INT NOT NULL DEFAULT 1,
    parking_spaces INT NOT NULL DEFAULT 0,
    is_furnished BOOLEAN NOT NULL DEFAULT FALSE,
    is_serviced BOOLEAN NOT NULL DEFAULT FALSE,
    size_sqm NUMERIC(10, 2),
    
    -- Location Hierarchy (BRD Mod 4)
    state TEXT NOT NULL,
    lga TEXT NOT NULL,
    area TEXT NOT NULL,
    street_address TEXT NOT NULL,
    landmark TEXT,
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    
    -- Nigerian Upfront Fee Breakdown (BRD Mod 4 / BR-001)
    rent_price NUMERIC(14, 2) NOT NULL,                -- Base Annual / Short-let rent
    service_charge NUMERIC(14, 2) NOT NULL DEFAULT 0,    -- Annual service charge (if serviced)
    caution_fee NUMERIC(14, 2) NOT NULL DEFAULT 0,       -- Refundable security deposit
    legal_fee_pct NUMERIC(5, 2) NOT NULL DEFAULT 10.00,  -- Nigerian standard 10% legal fee
    agency_fee_pct NUMERIC(5, 2) NOT NULL DEFAULT 10.00, -- Nigerian standard 10% agency fee
    total_upfront_estimate NUMERIC(14, 2) NOT NULL DEFAULT 0,
    
    -- Amenities JSONB (Generator, Security, Pre-paid meter, etc.)
    amenities JSONB NOT NULL DEFAULT '[]'::JSONB,
    
    -- Listing Lifecycle & Visibility
    status listing_status NOT NULL DEFAULT 'draft',
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    featured_expires_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '60 days'),
    let_at TIMESTAMPTZ,
    delete_reason TEXT,
    
    -- Duplicate & Safety Flags
    is_flagged_duplicate BOOLEAN NOT NULL DEFAULT FALSE,
    duplicate_matched_id UUID REFERENCES public.properties(id),
    fraud_reports_count INT NOT NULL DEFAULT 0,
    
    -- View & Engagement Counters
    views_count INT NOT NULL DEFAULT 0,
    favourites_count INT NOT NULL DEFAULT 0,
    enquiries_count INT NOT NULL DEFAULT 0,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_properties_owner ON public.properties(owner_id);
CREATE INDEX idx_properties_status ON public.properties(status);
CREATE INDEX idx_properties_location ON public.properties(state, lga, area);
CREATE INDEX idx_properties_rent ON public.properties(rent_price);
CREATE INDEX idx_properties_is_verified ON public.properties(is_verified);
CREATE INDEX idx_properties_is_featured ON public.properties(is_featured);
CREATE INDEX idx_properties_coords ON public.properties(latitude, longitude);

-- =============================================================================
-- 5. PROPERTY MEDIA / IMAGES
-- =============================================================================

CREATE TABLE public.property_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    is_cover BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_property_images_property ON public.property_images(property_id);

-- =============================================================================
-- 6. PROPERTY VERIFICATION WORKFLOW & 5-DAY SLA
-- =============================================================================

CREATE TABLE public.property_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL UNIQUE REFERENCES public.properties(id) ON DELETE CASCADE,
    submitted_by UUID NOT NULL REFERENCES public.profiles(id),
    
    -- Verification Documents
    title_document_url TEXT,
    survey_plan_url TEXT,
    letter_of_authority_url TEXT,
    agent_cac_url TEXT,
    utility_bill_url TEXT,
    
    -- Status & Workflow
    status verification_status NOT NULL DEFAULT 'pending_review',
    sla_due_date TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '5 days'),
    assigned_officer_id UUID REFERENCES public.profiles(id),
    
    -- Inspection Details
    inspection_type inspection_type DEFAULT 'physical',
    scheduled_inspection_date TIMESTAMPTZ,
    inspection_notes TEXT,
    inspection_outcome inspection_outcome DEFAULT 'pending',
    
    -- Decision
    rejection_reason_code TEXT,
    rejection_notes TEXT,
    resubmission_count INT NOT NULL DEFAULT 0,
    approved_by UUID REFERENCES public.profiles(id),
    approved_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_verifications_status ON public.property_verifications(status);
CREATE INDEX idx_verifications_officer ON public.property_verifications(assigned_officer_id);

-- =============================================================================
-- 7. SAVED SEARCHES & FAVOURITES
-- =============================================================================

CREATE TABLE public.saved_searches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    search_title TEXT NOT NULL,
    search_params JSONB NOT NULL DEFAULT '{}'::JSONB,
    alert_frequency TEXT NOT NULL DEFAULT 'daily',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_alerted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.property_favourites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, property_id)
);

-- =============================================================================
-- 8. COMMUNICATION, THREADS & NUMBER MASKING
-- =============================================================================

CREATE TABLE public.enquiry_threads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    seeker_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Privacy & Number Masking (BRD BR-010)
    seeker_revealed_phone BOOLEAN NOT NULL DEFAULT FALSE,
    owner_revealed_phone BOOLEAN NOT NULL DEFAULT FALSE,
    
    status enquiry_status NOT NULL DEFAULT 'new',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(property_id, seeker_id)
);

CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    thread_id UUID NOT NULL REFERENCES public.enquiry_threads(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_messages_thread ON public.messages(thread_id);

-- =============================================================================
-- 9. INSPECTION APPOINTMENTS (24h SLA)
-- =============================================================================

CREATE TABLE public.inspection_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    thread_id UUID NOT NULL REFERENCES public.enquiry_threads(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    seeker_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    proposed_date DATE NOT NULL,
    proposed_time_slot TEXT NOT NULL,
    status booking_status NOT NULL DEFAULT 'pending',
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '24 hours'),
    response_notes TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 10. REVIEWS & RATINGS (Verified Renter Only)
-- =============================================================================

CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    is_verified_tenant BOOLEAN NOT NULL DEFAULT TRUE,
    is_moderated BOOLEAN NOT NULL DEFAULT FALSE,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    moderated_by UUID REFERENCES public.profiles(id),
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 11. FRAUD REPORTS & 3-REPORT AUTO-SUSPENSION
-- =============================================================================

CREATE TABLE public.fraud_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    target_property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    target_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    reason_category TEXT NOT NULL,
    description TEXT NOT NULL,
    evidence_urls TEXT[] DEFAULT '{}',
    status fraud_report_status NOT NULL DEFAULT 'pending',
    moderator_notes TEXT,
    actioned_by UUID REFERENCES public.profiles(id),
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 12. SUBSCRIPTION & MONETISATION (Paystack / Flutterwave)
-- =============================================================================

CREATE TABLE public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    tier subscription_tier NOT NULL DEFAULT 'free',
    active_listing_limit INT NOT NULL DEFAULT 1,
    featured_listing_quota INT NOT NULL DEFAULT 0,
    
    gateway payment_gateway DEFAULT 'paystack',
    customer_code TEXT,
    subscription_code TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    
    current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    current_period_end TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '30 days'),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.payment_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id),
    reference TEXT UNIQUE NOT NULL,
    amount_kobo BIGINT NOT NULL, -- Stored in Kobo (NGN * 100)
    currency TEXT NOT NULL DEFAULT 'NGN',
    payment_type TEXT NOT NULL,  -- 'subscription', 'featured_listing', 'verification_fee'
    gateway payment_gateway NOT NULL DEFAULT 'paystack',
    status payment_status NOT NULL DEFAULT 'pending',
    
    gateway_response JSONB DEFAULT '{}'::JSONB,
    is_reconciled BOOLEAN NOT NULL DEFAULT FALSE,
    reconciled_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 13. CUSTOMER SUPPORT & TICKETING
-- =============================================================================

CREATE TABLE public.support_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_number TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES public.profiles(id),
    subject TEXT NOT NULL,
    category TEXT NOT NULL,
    priority ticket_priority NOT NULL DEFAULT 'medium',
    status ticket_status NOT NULL DEFAULT 'open',
    
    assigned_to UUID REFERENCES public.profiles(id),
    escalated_to UUID REFERENCES public.profiles(id),
    escalation_reason TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.support_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_id UUID NOT NULL REFERENCES public.support_tickets(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id),
    message TEXT NOT NULL,
    attachments TEXT[] DEFAULT '{}',
    is_internal_note BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 14. IMMUTABLE AUDIT LOG (NFR-MAINT-001)
-- =============================================================================

CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES public.profiles(id),
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 15. DATABASE FUNCTIONS & AUTOMATED TRIGGERS
-- =============================================================================

-- Auto Upfront Fee Calculator (Rent + Caution + Service + Legal 10% + Agency 10%)
CREATE OR REPLACE FUNCTION public.calculate_upfront_fees()
RETURNS TRIGGER AS $$
BEGIN
    NEW.total_upfront_estimate := NEW.rent_price 
                                + COALESCE(NEW.service_charge, 0)
                                + COALESCE(NEW.caution_fee, 0)
                                + ((NEW.rent_price * COALESCE(NEW.legal_fee_pct, 10.00)) / 100.00)
                                + ((NEW.rent_price * COALESCE(NEW.agency_fee_pct, 10.00)) / 100.00);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_calculate_upfront_fees
BEFORE INSERT OR UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.calculate_upfront_fees();

-- Automatic Fraud Report Threshold Trigger (BR-014: Auto-suspend on 3 reports)
CREATE OR REPLACE FUNCTION public.handle_fraud_report_threshold()
RETURNS TRIGGER AS $$
DECLARE
    report_count INT;
BEGIN
    IF NEW.target_property_id IS NOT NULL THEN
        SELECT COUNT(*) INTO report_count
        FROM public.fraud_reports
        WHERE target_property_id = NEW.target_property_id
          AND status != 'dismissed';
          
        UPDATE public.properties
        SET fraud_reports_count = report_count
        WHERE id = NEW.target_property_id;
        
        IF report_count >= 3 THEN
            UPDATE public.properties
            SET status = 'suspended'
            WHERE id = NEW.target_property_id;
            
            INSERT INTO public.audit_logs (actor_id, action, resource_type, resource_id, new_values)
            VALUES (NEW.reporter_id, 'AUTO_SUSPEND_FRAUD_THRESHOLD', 'properties', NEW.target_property_id, jsonb_build_object('reports_count', report_count));
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_fraud_report_auto_suspend
AFTER INSERT ON public.fraud_reports
FOR EACH ROW
EXECUTE FUNCTION public.handle_fraud_report_threshold();

-- Automatic Profile Creation from auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_role_val user_role := 'seeker';
BEGIN
    IF (NEW.raw_user_meta_data->>'role') IS NOT NULL THEN
        user_role_val := (NEW.raw_user_meta_data->>'role')::user_role;
    END IF;

    INSERT INTO public.profiles (
        id,
        email,
        phone,
        first_name,
        last_name,
        business_name,
        cac_number,
        role,
        account_status
    ) VALUES (
        NEW.id,
        NEW.email,
        NEW.phone,
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
        NEW.raw_user_meta_data->>'business_name',
        NEW.raw_user_meta_data->>'cac_number',
        user_role_val,
        'unverified'
    );
    
    -- Auto create Free tier subscription record
    INSERT INTO public.subscriptions (user_id, tier, active_listing_limit, featured_listing_quota)
    VALUES (NEW.id, 'free', 1, 0);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- Landlord Free Tier 1-Listing Enforcer (BR-008)
CREATE OR REPLACE FUNCTION public.check_landlord_listing_limit()
RETURNS TRIGGER AS $$
DECLARE
    u_role user_role;
    sub_limit INT;
    active_count INT;
BEGIN
    SELECT role INTO u_role FROM public.profiles WHERE id = NEW.owner_id;
    
    IF u_role IN ('landlord', 'agent', 'property_manager') THEN
        SELECT active_listing_limit INTO sub_limit
        FROM public.subscriptions
        WHERE user_id = NEW.owner_id;
        
        IF sub_limit IS NULL THEN
            sub_limit := 1;
        END IF;
        
        SELECT COUNT(*) INTO active_count
        FROM public.properties
        WHERE owner_id = NEW.owner_id
          AND status IN ('active', 'pending_verification', 'pending_moderation')
          AND id != COALESCE(NEW.id, uuid_generate_v4());
          
        IF active_count >= sub_limit AND NEW.status IN ('active', 'pending_verification', 'pending_moderation') THEN
            RAISE EXCEPTION 'Listing limit exceeded for your current plan (Max %). Please upgrade to publish more listings.', sub_limit;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_listing_limit
BEFORE INSERT ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.check_landlord_listing_limit();

-- =============================================================================
-- 16. ROW-LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nigerian_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_favourites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiry_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inspection_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fraud_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper functions for RLS checks
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND role IN ('moderator', 'customer_support', 'finance_officer', 'super_admin')
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Locations Policies
CREATE POLICY "Locations viewable by all" ON public.nigerian_locations
    FOR SELECT USING (true);

-- Properties Policies
CREATE POLICY "Active properties viewable by everyone" ON public.properties
    FOR SELECT USING (status = 'active' OR owner_id = auth.uid() OR public.is_admin());

CREATE POLICY "Owners can insert their listings" ON public.properties
    FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners and admins can update listings" ON public.properties
    FOR UPDATE USING (auth.uid() = owner_id OR public.is_admin());

CREATE POLICY "Owners and admins can delete listings" ON public.properties
    FOR DELETE USING (auth.uid() = owner_id OR public.is_admin());

-- Property Images Policies
CREATE POLICY "Images viewable by all" ON public.property_images
    FOR SELECT USING (true);

CREATE POLICY "Owners can manage images" ON public.property_images
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.properties
            WHERE id = property_images.property_id
              AND (owner_id = auth.uid() OR public.is_admin())
        )
    );

-- Verifications Policies
CREATE POLICY "Owners and admins can view verifications" ON public.property_verifications
    FOR SELECT USING (submitted_by = auth.uid() OR public.is_admin());

CREATE POLICY "Owners can submit verifications" ON public.property_verifications
    FOR INSERT WITH CHECK (submitted_by = auth.uid());

CREATE POLICY "Admins can update verification status" ON public.property_verifications
    FOR UPDATE USING (public.is_admin());

-- Saved Searches & Favourites Policies
CREATE POLICY "Users manage own saved searches" ON public.saved_searches
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own favourites" ON public.property_favourites
    FOR ALL USING (auth.uid() = user_id);

-- Enquiries & Messaging Policies
CREATE POLICY "Thread participants can view thread" ON public.enquiry_threads
    FOR SELECT USING (seeker_id = auth.uid() OR owner_id = auth.uid() OR public.is_admin());

CREATE POLICY "Seekers can create enquiry threads" ON public.enquiry_threads
    FOR INSERT WITH CHECK (seeker_id = auth.uid());

CREATE POLICY "Thread participants can view messages" ON public.messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.enquiry_threads
            WHERE id = messages.thread_id
              AND (seeker_id = auth.uid() OR owner_id = auth.uid() OR public.is_admin())
        )
    );

CREATE POLICY "Thread participants can send messages" ON public.messages
    FOR INSERT WITH CHECK (
        auth.uid() = sender_id AND
        EXISTS (
            SELECT 1 FROM public.enquiry_threads
            WHERE id = messages.thread_id
              AND (seeker_id = auth.uid() OR owner_id = auth.uid())
        )
    );

-- Inspection Booking Policies
CREATE POLICY "Participants view inspection bookings" ON public.inspection_bookings
    FOR SELECT USING (seeker_id = auth.uid() OR owner_id = auth.uid() OR public.is_admin());

CREATE POLICY "Seekers can create inspection bookings" ON public.inspection_bookings
    FOR INSERT WITH CHECK (seeker_id = auth.uid());

CREATE POLICY "Participants can update inspection bookings" ON public.inspection_bookings
    FOR UPDATE USING (seeker_id = auth.uid() OR owner_id = auth.uid() OR public.is_admin());

-- Subscriptions & Payments Policies
CREATE POLICY "Users view their own subscriptions" ON public.subscriptions
    FOR SELECT USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Users view their own payments" ON public.payment_transactions
    FOR SELECT USING (user_id = auth.uid() OR public.is_admin());

-- Audit Logs Policies
CREATE POLICY "Only admins view audit logs" ON public.audit_logs
    FOR SELECT USING (public.is_admin());
