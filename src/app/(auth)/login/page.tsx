'use client';

import React, { useState } from 'react';
import Link from 'next/link';

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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-stone-50">
      <div className="max-w-md w-full bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 shadow-xl space-y-6">
        {/* Brand Header with Restored Architectural House Emblem */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-2.5 justify-center mb-1">
            <div className="h-10 w-10 rounded-xl bg-amber-500 flex items-center justify-center text-stone-950 shadow-md">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 10.5L12 3l9 7.5" />
                <path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
                <path d="M9 21V12h6v9" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-black tracking-tight text-stone-950 font-serif">
                Rent<span className="text-amber-500">Ora</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-stone-500 uppercase -mt-1 font-bold">
                Eastern Nigeria
              </span>
            </div>
          </Link>
          <h2 className="text-2xl font-black text-stone-950 font-serif tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs text-stone-600">
            Sign in to manage your verified listings, view requests, or schedule inspections.
          </p>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-bold text-stone-700 uppercase mb-1">
              Email Address or Phone
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com or +234..."
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-[16px] sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-mono font-bold text-stone-700 uppercase">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs text-amber-700 hover:underline font-mono">
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-[16px] sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all disabled:opacity-50"
          >
            {isLoading ? 'Authenticating...' : 'Sign In to Dashboard →'}
          </button>
        </form>

        <div className="pt-4 border-t border-stone-100 text-center text-xs text-stone-600">
          Don't have an account yet?{' '}
          <Link href="/register" className="font-bold text-amber-700 hover:underline">
            Register for Free
          </Link>
        </div>
      </div>
    </div>
  );
}
