'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { useAuth } from '@/context/AuthContext';

const NAV_LINKS = [
  { href: '/properties', label: 'Verified Rentals' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/support', label: 'Support & FAQs' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const initials = user?.firstName
    ? `${user.firstName.charAt(0)}${user.lastName ? user.lastName.charAt(0) : ''}`.toUpperCase()
    : 'U';

  return (
    <header
      className={`sticky top-0 z-50 bg-paper/95 backdrop-blur transition-shadow ${
        scrolled ? 'shadow-[0_1px_0_rgba(22,20,15,0.08)]' : ''
      }`}
    >
      <div className="container-x flex h-[68px] sm:h-[72px] items-center justify-between">
        <Logo />

        {/* Center Navigation Links */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[14px] font-medium text-ink-800 transition-colors hover:text-forest-900"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Area */}
        <div className="hidden items-center gap-3.5 md:flex">
          {/* Refined "List Property" Action Button */}
          <Link
            href="/list-property"
            style={{ backgroundColor: '#0F3D2E' }}
            className="group inline-flex items-center gap-2 pl-3 pr-4 py-2 rounded-full text-white shadow-[0_2px_10px_rgba(15,61,46,0.22)] hover:shadow-[0_6px_22px_rgba(15,61,46,0.38)] transition-all duration-200 cursor-pointer border border-emerald-400/25 hover:border-emerald-300 hover:scale-[1.02] active:scale-[0.98]"
            title="List a verified rental property with ₦0 listing fee"
          >
            <span className="w-5 h-5 rounded-full bg-emerald-600/50 border border-emerald-300/40 flex items-center justify-center text-white shrink-0 group-hover:bg-emerald-500/70 transition-colors">
              <svg
                className="w-3 h-3 stroke-[2.8]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
            <span className="text-[13.5px] font-semibold text-white tracking-tight">
              List Property
            </span>
            <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-500/30">
              Free
            </span>
          </Link>

          {isAuthenticated && user ? (
            /* Signed In User Menu Pill */
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border border-ink/15 hover:border-forest-800 bg-white hover:bg-paper-100 transition-all cursor-pointer"
                aria-expanded={userMenuOpen}
                aria-label="User account menu"
              >
                <div className="w-8 h-8 rounded-full bg-forest-800 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {initials}
                </div>
                <span className="text-[13.5px] font-semibold text-ink">
                  {user.firstName}
                </span>
                <svg
                  className={`w-3.5 h-3.5 text-ink-600 transition-transform ${
                    userMenuOpen ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* User Dropdown Menu Card */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-ink/15 shadow-[0_16px_40px_rgba(22,20,15,0.15)] py-2 text-ink z-50 animate-fade-in font-sans">
                  {/* User Identity Header */}
                  <div className="px-4 py-3 border-b border-ink/10">
                    <p className="text-xs font-bold text-ink truncate">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-[11px] text-ink-600 truncate mt-0.5">
                      {user.email}
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-forest-50 border border-forest-200/60 text-forest-800 text-[10px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Verified Resident / Host
                    </div>
                  </div>

                  {/* Menu Links */}
                  <div className="py-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-ink hover:bg-paper-100 hover:text-forest-900 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-ink-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="7" height="9" x="3" y="3" rx="1" />
                        <rect width="7" height="5" x="14" y="3" rx="1" />
                        <rect width="7" height="9" x="14" y="12" rx="1" />
                        <rect width="7" height="5" x="3" y="16" rx="1" />
                      </svg>
                      <span>Dashboard</span>
                    </Link>

                    <Link
                      href="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-ink hover:bg-paper-100 hover:text-forest-900 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-ink-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span>Profile &amp; Payouts</span>
                    </Link>

                    <Link
                      href="/admin"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-ink hover:bg-paper-100 hover:text-forest-900 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-ink-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <span>Admin Verification Desk</span>
                    </Link>

                    <Link
                      href="/support"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-ink hover:bg-paper-100 hover:text-forest-900 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-ink-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                      <span>Support &amp; Help</span>
                    </Link>
                  </div>

                  {/* Sign Out Divider */}
                  <div className="pt-1 mt-1 border-t border-ink/10">
                    <button
                      type="button"
                      onClick={() => {
                        signOut();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-red-700 hover:bg-red-50 transition-colors cursor-pointer text-left"
                    >
                      <svg
                        className="w-4 h-4 text-red-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Signed Out CTA */
            <Link
              href="/login"
              className="text-[14px] font-semibold text-ink-800 hover:text-ink px-3 py-2 transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink/5 active:scale-95 md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close main menu' : 'Open main menu'}
        >
          {mobileOpen ? (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-[68px] sm:top-[72px] bottom-0 z-50 flex flex-col md:hidden">
          <div
            className="fixed inset-0 top-[68px] sm:top-[72px] bg-ink/30 backdrop-blur-sm -z-10 animate-fade-in"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          <div
            id="mobile-menu"
            className="max-h-[calc(100vh-68px)] overflow-y-auto border-b border-ink/10 bg-paper px-4 pb-8 pt-4 shadow-2xl"
          >
            <nav className="flex flex-col space-y-1" aria-label="Mobile">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-lg font-semibold text-ink transition-colors hover:bg-ink/5"
                >
                  <span>{l.label}</span>
                  <span className="text-sm text-ink-600">→</span>
                </Link>
              ))}

              <div className="mt-4 flex flex-col gap-2.5 border-t border-ink/10 pt-4">
                <Link
                  href="/list-property"
                  onClick={() => setMobileOpen(false)}
                  style={{ backgroundColor: '#0F3D2E' }}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl text-white text-sm font-semibold shadow-sm transition-transform active:scale-[0.98] border border-emerald-400/25"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-600/50 border border-emerald-300/40 flex items-center justify-center text-white">
                    <svg
                      className="w-3 h-3 stroke-[2.8]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                  <span>List Property</span>
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    Free
                  </span>
                </Link>

                {isAuthenticated && user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="flex h-11 w-full items-center justify-center rounded-xl border border-ink/15 bg-white px-4 text-sm font-semibold text-ink transition-colors hover:bg-paper-100"
                    >
                      Dashboard ({user.firstName})
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="flex h-11 w-full items-center justify-center rounded-xl border border-ink/15 bg-white px-4 text-sm font-semibold text-ink transition-colors hover:bg-paper-100"
                    >
                      Profile &amp; Payouts
                    </Link>
                    <Link
                      href="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="flex h-11 w-full items-center justify-center rounded-xl border border-ink/15 bg-white px-4 text-sm font-semibold text-ink transition-colors hover:bg-paper-100"
                    >
                      Admin Desk
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        signOut();
                        setMobileOpen(false);
                      }}
                      className="flex h-11 w-full items-center justify-center rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-700 transition-colors"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex h-11 w-full items-center justify-center rounded-xl border border-ink/15 bg-white px-4 text-sm font-semibold text-ink transition-colors hover:bg-paper-100"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
