import React from 'react';
import Link from 'next/link';

interface LogoProps {
  tone?: 'dark' | 'light';
  className?: string;
}

/** RentOra mark: a simple gabled house in an amber tile, plus wordmark. */
export function Logo({ tone = 'dark', className = '' }: LogoProps) {
  const text = tone === 'dark' ? 'text-ink' : 'text-white';
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 ${className}`} aria-label="RentOra home">
      <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-amber-400 text-ink">
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3.5 11 12 4l8.5 7" />
          <path d="M6 9.5V20h12V9.5" />
          <path d="M10 20v-5h4v5" />
        </svg>
      </span>
      <span className={`font-serif text-[22px] font-medium tracking-tight ${text}`}>
        Rent<span className="italic">Ora</span>
      </span>
    </Link>
  );
}
