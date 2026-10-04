# HouseOne — Supabase Backend Architecture & Setup Guide 🛠️

> **Database:** PostgreSQL with Row Level Security (RLS)  
> **Auth:** Supabase Auth (Email OTP, SMS OTP, Google OAuth, Custom Claims)  
> **Storage:** Supabase Storage (Property Media CDN & Secure KYC Vault)  
> **Realtime:** Supabase Realtime (In-app Chat & Lead Notifications)  
> **Compliance:** NDPA 2023 & Central Bank of Nigeria (CBN) Standards

---

## 1. Quick Setup Options

### Option A: Using Supabase Cloud Dashboard (Recommended)
1. Log in to [supabase.com](https://supabase.com) and create a new project named `houseone-prod` (Region: `West Europe` or `South Africa` for lowest latency to Nigeria).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Copy and run the contents of [`supabase/migrations/20261001000000_initial_schema.sql`](../supabase/migrations/20261001000000_initial_schema.sql).
4. Run the seed data in [`supabase/seed.sql`](../supabase/seed.sql) to populate Nigerian States, LGAs, and locations.
5. In **Storage**, create two buckets:
   - `property-images` (Public: **Yes** — for listing photos and cover images).
   - `verification-documents` (Public: **No** — private KYC vault restricted to owners and verification admins).

### Option B: Using Supabase Local CLI
```bash
# Install Supabase CLI
npm install -g supabase

# Start local Supabase container
supabase start

# Apply migrations and seed data
supabase db reset
```

---

## 2. Environment Variables (.env.local)

Create a `.env.local` file in your root folder:

```env
# Supabase Public Keys (Frontend Safe)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...

# Supabase Service Role Key (Server-side API routes & Webhooks only)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# Payment Gateways (Nigeria)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_...
PAYSTACK_SECRET_KEY=sk_test_...

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 3. Storage Bucket Security Policies (RLS)

### Bucket: `property-images` (Public CDN)
* **SELECT:** Allowed for `public` / anonymous viewers.
* **INSERT/UPDATE/DELETE:** Allowed only if `auth.uid()` matches the property owner or an admin.

### Bucket: `verification-documents` (Private KYC Vault)
* **SELECT:** Allowed only for document owner (`auth.uid()`) and HouseOne Staff (`is_admin()`).
* **INSERT:** Allowed only for authenticated users uploading for their own listing.

---

## 4. Key Triggers & Automated Business Rules Built-in

| Trigger / Function | Rule Enforced |
|---|---|
| `trg_calculate_upfront_fees` | Auto-calculates `total_upfront_estimate` (Rent + Caution + Service Charge + Legal Fee 10% + Agency Fee 10%). |
| `trg_fraud_report_auto_suspend` | **BR-014:** Automatically changes listing status to `suspended` when it receives 3 independent fraud reports. |
| `trg_check_listing_limit` | **BR-008:** Restricts Landlords on Free tier to 1 active listing; prompts upgrade for additional listings. |
| `on_auth_user_created` | Automatically instantiates `public.profiles` and creates default Free tier subscription. |
| `is_admin()` helper | RBAC gatekeeper across all table RLS policies for internal staff. |
