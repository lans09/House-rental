'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Sign in submitted! Please connect your live Supabase project credentials in .env.local to authenticate.');
    }, 1000);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 sm:py-16 bg-paper">
      <div className="max-w-md w-full bg-white rounded-3xl border border-ink/10 p-8 sm:p-10 shadow-[0_18px_50px_-24px_rgba(22,20,15,0.18)] space-y-6">
        {/* Brand Header with standard Logo */}
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-2">
            <Logo />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-ink tracking-tight">
            Welcome back
          </h1>
          <p className="text-[14px] text-ink-600 leading-relaxed">
            Sign in to manage your verified listings, view requests, or schedule inspections.
          </p>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[13px] font-semibold text-ink mb-1.5">
              Email Address or Phone
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com or +234..."
              className="w-full px-4 py-2.5 bg-paper-100 border border-ink/10 rounded-xl text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-ink-400"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[13px] font-semibold text-ink">
                Password
              </label>
              <Link href="/forgot-password" className="text-[13px] text-amber-700 hover:text-amber-800 font-medium">
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-paper-100 border border-ink/10 rounded-xl text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-ink-400"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-ink hover:bg-ink-800 text-white font-semibold text-[15px] rounded-xl shadow-sm transition-all disabled:opacity-50 mt-2"
          >
            {isLoading ? 'Authenticating...' : 'Sign in to dashboard →'}
          </button>
        </form>

        <div className="pt-4 border-t border-ink/10 text-center text-[13px] text-ink-600">
          Don't have an account yet?{' '}
          <Link href="/register" className="font-semibold text-amber-700 hover:text-amber-800">
            Register for free
          </Link>
        </div>
      </div>
    </div>
  );
}
