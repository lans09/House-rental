'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { UliLine } from '@/components/UliLine';
import { HouseOneStore, MemberRecord } from '@/lib/admin-store';
import { useAuth } from '@/context/AuthContext';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuth();
  const explicitRedirect = searchParams.get('redirect');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const members = HouseOneStore.getMembers();
    const matched = members.find(
      (m) => m.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!matched) {
      setErrorMsg(
        'No registered account found with that email. Use one of the quick preview links below or create a new account.'
      );
      return;
    }

    setSubmitting(true);
    signIn(matched);

    const target =
      explicitRedirect ||
      (matched.role === 'admin'
        ? '/admin'
        : matched.role === 'owner'
        ? '/list-property'
        : '/properties');

    setTimeout(() => {
      setSubmitting(false);
      router.push(target);
    }, 250);
  };

  const quickEnter = (role: 'seeker' | 'owner' | 'admin') => {
    const members = HouseOneStore.getMembers();
    const found = members.find((m) => m.role === role) || members[0];
    if (found) {
      signIn(found);
      const target =
        explicitRedirect ||
        (role === 'admin'
          ? '/admin'
          : role === 'owner'
          ? '/list-property'
          : '/properties');
      router.push(target);
    }
  };

  return (
    <div className="container-x py-12 sm:py-20">
      <div className="mx-auto max-w-md">
        <div className="mb-8">
          <p className="text-[13px] font-medium text-ink-600">Welcome back</p>
          <h1 className="mt-2 font-serif text-4xl tracking-[-0.02em] text-ink sm:text-5xl">
            Sign in.
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
            Access verified landlord contacts, manage your listings, or schedule a viewing.
          </p>
        </div>

        <div className="rounded-[28px] bg-white border border-ink/10 p-6 sm:p-9 shadow-[0_20px_50px_-28px_rgba(22,20,15,0.16)]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[13px] font-semibold text-ink mb-1.5">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="obinna.okeke@gmail.com"
                className="w-full px-4 py-3 bg-paper border border-ink/12 rounded-xl text-[15px] text-ink focus:outline-none focus:border-ink placeholder:text-ink-600/45"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-ink mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-paper border border-ink/12 rounded-xl text-[15px] text-ink focus:outline-none focus:border-ink placeholder:text-ink-600/45"
              />
            </div>

            {errorMsg && (
              <div className="rounded-xl bg-amber-50 border border-amber-300 px-4 py-3 text-[13px] text-ink leading-relaxed">
                {errorMsg}
              </div>
            )}

            <div className="pt-1">
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-ink px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-ink-800 disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Signing in...' : 'Sign in →'}
              </button>
            </div>
          </form>

          <UliLine
            id="uli-login-divider"
            className="my-6 block h-3 w-full text-ink/15"
          />

          <div className="space-y-3">
            <p className="text-[12px] font-mono uppercase tracking-wider text-ink-600">
              Quick preview access
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-semibold text-ink">
              <button
                type="button"
                onClick={() => quickEnter('seeker')}
                className="underline decoration-amber-400 decoration-2 underline-offset-4 hover:decoration-ink cursor-pointer"
              >
                Enter as Seeker
              </button>
              <button
                type="button"
                onClick={() => quickEnter('owner')}
                className="underline decoration-amber-400 decoration-2 underline-offset-4 hover:decoration-ink cursor-pointer"
              >
                Enter as Landlord
              </button>
              <button
                type="button"
                onClick={() => quickEnter('admin')}
                className="underline decoration-amber-400 decoration-2 underline-offset-4 hover:decoration-ink cursor-pointer"
              >
                Open Admin Desk →
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-[14px] text-ink-600">
          New here?{' '}
          <Link
            href={`/register?redirect=${encodeURIComponent(explicitRedirect || '/properties')}`}
            className="font-semibold text-ink underline decoration-amber-400 decoration-2 underline-offset-4 hover:decoration-ink"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="bg-paper min-h-[82vh]">
      <Suspense
        fallback={
          <div className="container-x py-20 text-ink-600 font-serif text-lg">
            Loading...
          </div>
        }
      >
        <LoginContent />
      </Suspense>
    </div>
  );
}
