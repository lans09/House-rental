'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

const LINKS = [
  { href: '/properties?purpose=rent', label: 'Rent' },
  { href: '/properties?purpose=sale', label: 'Buy' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/register?role=landlord', label: 'For owners & agents' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 bg-paper/95 backdrop-blur transition-shadow ${
        scrolled ? 'shadow-[0_1px_0_rgba(22,20,15,0.08)]' : ''
      }`}
    >
      <div className="container-x flex h-[68px] sm:h-[72px] items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-[15px] font-medium text-ink-800 transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <Link href="/login" className="text-[15px] font-medium text-ink-800 hover:text-ink">
            Sign in
          </Link>
          <Link
            href="/register?role=landlord"
            className="rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-ink-800"
          >
            List your property
          </Link>
        </div>

        {/* Mobile Hamburger / Close Toggle Button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink/5 active:scale-95 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close main menu' : 'Open main menu'}
        >
          {open ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer & Backdrop */}
      {open && (
        <div className="fixed inset-x-0 top-[68px] sm:top-[72px] bottom-0 z-50 flex flex-col md:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 top-[68px] sm:top-[72px] bg-ink/30 backdrop-blur-sm -z-10 animate-fade-in"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div
            id="mobile-menu"
            className="max-h-[calc(100vh-68px)] overflow-y-auto border-b border-ink/10 bg-paper px-4 pb-8 pt-4 shadow-2xl"
          >
            <nav className="flex flex-col space-y-1" aria-label="Mobile">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-3.5 font-serif text-2xl text-ink transition-colors hover:bg-ink/5 active:bg-ink/10"
                >
                  <span>{l.label}</span>
                  <span className="text-sm font-sans text-ink-600">→</span>
                </Link>
              ))}

              <div className="mt-4 flex flex-col gap-3 border-t border-ink/10 pt-5">
                <Link
                  href="/register?role=landlord"
                  onClick={() => setOpen(false)}
                  className="flex h-12 w-full items-center justify-center rounded-full bg-ink px-4 text-[15px] font-semibold text-white shadow-md transition-transform active:scale-[0.98]"
                >
                  List your property, free
                </Link>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex h-12 w-full items-center justify-center rounded-full border border-ink/20 px-4 text-[15px] font-semibold text-ink transition-colors hover:bg-ink/5 active:scale-[0.98]"
                >
                  Sign in
                </Link>
              </div>

              {/* Direct Support Contact in Drawer */}
              <div className="mt-6 rounded-2xl bg-paper-100 p-4 border border-ink/10">
                <p className="text-[12px] font-mono uppercase tracking-wider text-ink-600 font-semibold">
                  Direct Eastern Support
                </p>
                <p className="text-[13px] text-ink mt-1">
                  Need help finding a home or submitting property documents?
                </p>
                <a
                  href="https://wa.me/2348030000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-flex items-center gap-1.5 text-[13px] font-bold text-forest-700 hover:underline"
                >
                  <span>WhatsApp 0803 000 0000 →</span>
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
