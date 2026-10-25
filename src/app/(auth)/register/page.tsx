'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { UliLine } from '@/components/UliLine';
import { HouseOneStore, MemberRecord } from '@/lib/admin-store';
import { useAuth } from '@/context/AuthContext';

const CITIES = [
  'Enugu',
  'Onitsha',
  'Awka',
  'Owerri',
  'Aba',
  'Asaba',
  'Port Harcourt',
  'Lagos',
  'Abuja',
  'Uyo',
];

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuth();

  const explicitRedirect = searchParams.get('redirect');
  const roleParam = searchParams.get('role');

  const [audience, setAudience] = useState<'seeker' | 'owner'>(
    roleParam === 'landlord' || roleParam === 'agent' ? 'owner' : 'seeker'
  );

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [listerType, setListerType] = useState<'landlord' | 'agent' | 'caretaker'>('landlord');
  const [city, setCity] = useState('Enugu');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const redirectParam =
    explicitRedirect || (audience === 'owner' ? '/list-property' : '/properties');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const existing = HouseOneStore.getMembers().find(
      (m) => m.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (existing) {
      setErrorMsg(
        'An account with this email address is already registered. Please sign in instead.'
      );
      return;
    }

    setSubmitting(true);

    const newMember: MemberRecord = {
      id: `mem-${Date.now()}`,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      role: audience,
      businessName:
        audience === 'owner' ? businessName.trim() || undefined : undefined,
      listerType: audience === 'owner' ? listerType : undefined,
      city,
      status: 'active',
      joinedAt: new Date().toISOString().slice(0, 10),
    };

    HouseOneStore.addOrUpdateMember(newMember);
    signIn(newMember);

    setTimeout(() => {
      setSubmitting(false);
      router.push(redirectParam);
    }, 300);
  };

  return (
    <div className="container-x py-10 sm:py-16 lg:py-20">
      <div className="grid items-start gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        {/* Left Editorial Column */}
        <div className="lg:sticky lg:top-28 space-y-8">
          <div>
            <p className="text-[13px] font-medium text-ink-600">
              Enugu · Onitsha · Awka · Owerri · Aba · Asaba
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-[1.06] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[56px]">
              A direct line to the{' '}
              <span className="relative inline-block italic">
                owner’s door.
                <svg
                  viewBox="0 0 300 14"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 -z-10 h-3 w-full text-amber-300"
                  aria-hidden="true"
                >
                  <path
                    d="M3 9 C 70 3, 160 2, 297 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="9"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink-600">
              Whether you are looking for a flat to rent or listing a property you own,
              every home on the catalogue carries a signed price and verified mandate papers.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-ink-800 aspect-[16/10] shadow-md">
            <img
              src="/images/onitsha-gra-luxury-duplex.jpg"
              alt="Contemporary residence in GRA Onitsha"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white">
              <div>
                <p className="text-[12px] text-white/75">GRA, Onitsha · Anambra</p>
                <p className="font-serif text-xl">5-bedroom detached house</p>
              </div>
              <p className="text-[12px] font-medium text-amber-300">
                Mandate confirmed
              </p>
            </div>
          </div>

          <dl className="grid grid-cols-3 gap-4 border-t border-ink/10 pt-6">
            <div>
              <dt className="text-[12px] text-ink-600">Viewing fee</dt>
              <dd className="mt-1 font-serif text-2xl text-ink tabular-nums">₦0</dd>
            </div>
            <div>
              <dt className="text-[12px] text-ink-600">Price markups</dt>
              <dd className="mt-1 font-serif text-2xl text-ink">None</dd>
            </div>
            <div>
              <dt className="text-[12px] text-ink-600">Paperwork review</dt>
              <dd className="mt-1 font-serif text-2xl text-ink tabular-nums">24–48h</dd>
            </div>
          </dl>
        </div>

        {/* Right Form Card */}
        <div className="rounded-[28px] bg-white border border-ink/10 p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_-28px_rgba(22,20,15,0.16)]">
          {/* Clean Two-Way Switcher */}
          <div className="border-b border-ink/10 pb-6">
            <p className="text-[12px] font-mono uppercase tracking-wider text-ink-600">
              Account type
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAudience('seeker')}
                className={`rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                  audience === 'seeker'
                    ? 'border-ink bg-ink text-white'
                    : 'border-ink/12 bg-paper hover:bg-paper-100 text-ink'
                }`}
              >
                <p className="font-serif text-lg leading-snug">Looking for a home</p>
                <p
                  className={`mt-1 text-[12px] leading-normal ${
                    audience === 'seeker' ? 'text-white/75' : 'text-ink-600'
                  }`}
                >
                  Rent or buy at the landlord’s signed price
                </p>
              </button>

              <button
                type="button"
                onClick={() => setAudience('owner')}
                className={`rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                  audience === 'owner'
                    ? 'border-ink bg-ink text-white'
                    : 'border-ink/12 bg-paper hover:bg-paper-100 text-ink'
                }`}
              >
                <p className="font-serif text-lg leading-snug">Landlord or agent</p>
                <p
                  className={`mt-1 text-[12px] leading-normal ${
                    audience === 'owner' ? 'text-white/75' : 'text-ink-600'
                  }`}
                >
                  List properties & manage direct enquiries
                </p>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1.5">
                  First name
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Obinna"
                  className="w-full px-4 py-3 bg-paper border border-ink/12 rounded-xl text-[15px] text-ink focus:outline-none focus:border-ink placeholder:text-ink-600/45"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1.5">
                  Last name
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Eze"
                  className="w-full px-4 py-3 bg-paper border border-ink/12 rounded-xl text-[15px] text-ink focus:outline-none focus:border-ink placeholder:text-ink-600/45"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="obinna@example.com"
                  className="w-full px-4 py-3 bg-paper border border-ink/12 rounded-xl text-[15px] text-ink focus:outline-none focus:border-ink placeholder:text-ink-600/45"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1.5">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0803 000 0000"
                  className="w-full px-4 py-3 bg-paper border border-ink/12 rounded-xl text-[15px] text-ink focus:outline-none focus:border-ink placeholder:text-ink-600/45"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1.5">
                  {audience === 'seeker' ? 'Preferred city' : 'Primary property city'}
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 bg-paper border border-ink/12 rounded-xl text-[15px] text-ink focus:outline-none focus:border-ink"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-4 py-3 bg-paper border border-ink/12 rounded-xl text-[15px] text-ink focus:outline-none focus:border-ink placeholder:text-ink-600/45"
                />
              </div>
            </div>

            {audience === 'owner' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-ink mb-1.5">
                    Your Capacity
                  </label>
                  <select
                    value={listerType}
                    onChange={(e) => setListerType(e.target.value as 'landlord' | 'agent' | 'caretaker')}
                    className="w-full px-4 py-3 bg-paper border border-ink/12 rounded-xl text-[15px] text-ink focus:outline-none focus:border-ink cursor-pointer"
                  >
                    <option value="landlord">Direct Property Owner (Landlord)</option>
                    <option value="agent">Independent Estate Agent</option>
                    <option value="caretaker">Family Caretaker / Representative</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-ink mb-1.5">
                    Agency or Trade Name{' '}
                    <span className="font-normal text-ink-600">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Eze & Sons or leave blank"
                    className="w-full px-4 py-3 bg-paper border border-ink/12 rounded-xl text-[15px] text-ink focus:outline-none focus:border-ink placeholder:text-ink-600/45"
                  />
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="rounded-xl bg-amber-50 border border-amber-300 px-4 py-3 text-[13px] text-ink flex items-center justify-between gap-3">
                <span>{errorMsg}</span>
                <Link
                  href={`/login?redirect=${encodeURIComponent(redirectParam)}`}
                  className="font-semibold underline decoration-amber-400 shrink-0"
                >
                  Sign in →
                </Link>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-amber-400 px-6 py-4 text-[15px] font-semibold text-ink transition-colors hover:bg-amber-300 disabled:opacity-50 cursor-pointer"
              >
                {submitting
                  ? 'Creating your account...'
                  : audience === 'seeker'
                  ? 'Create account & browse homes →'
                  : 'Create account & list a property →'}
              </button>
            </div>
          </form>

          <UliLine
            id="uli-reg-divider"
            className="my-7 block h-3 w-full text-ink/15"
          />

          <div className="flex flex-wrap items-center justify-between gap-2 text-[14px] text-ink-600">
            <span>Already have an account?</span>
            <Link
              href={`/login?redirect=${encodeURIComponent(redirectParam)}`}
              className="font-semibold text-ink underline decoration-amber-400 decoration-2 underline-offset-4 hover:decoration-ink"
            >
              Sign in to your account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="bg-paper min-h-[85vh]">
      <Suspense
        fallback={
          <div className="container-x py-20 text-ink-600 font-serif text-lg">
            Loading...
          </div>
        }
      >
        <RegisterContent />
      </Suspense>
    </div>
  );
}
