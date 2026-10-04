import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { UliLine } from '@/components/UliLine';

const COLUMNS = [
  {
    title: 'Find a home',
    links: [
      { href: '/properties?purpose=rent', label: 'Homes to rent' },
      { href: '/properties?purpose=sale', label: 'Homes to buy' },
      { href: '/properties?state=Enugu', label: 'Enugu' },
      { href: '/properties?state=Anambra', label: 'Onitsha & Awka' },
      { href: '/properties?state=Imo', label: 'Owerri' },
    ],
  },
  {
    title: 'Owners & agents',
    links: [
      { href: '/register?role=landlord', label: 'List your property' },
      { href: '/register?role=agent', label: 'Register as agent' },
      { href: '/verification-guide', label: 'How we verify' },
    ],
  },
  {
    title: 'RentOra',
    links: [
      { href: '/report-fraud', label: 'Report a fake listing' },
      { href: '/terms', label: 'Terms' },
      { href: '/privacy', label: 'Privacy' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-paper-100 text-ink">
      <UliLine id="uli-footer" className="block h-4 w-full text-amber-500/70" />

      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs space-y-5">
          <Logo />
          <p className="text-[15px] leading-relaxed text-ink-600">
            Homes to rent and buy across the South-East, at the price the owner actually agreed.
          </p>
          <div className="space-y-1 text-[15px]">
            <p>
              <span className="text-ink-600">WhatsApp </span>
              <a href="https://wa.me/2348030000000" className="font-semibold hover:underline">
                0803 000 0000
              </a>
            </p>
            <p>
              <span className="text-ink-600">Email </span>
              <a href="mailto:hello@rentora.ng" className="font-semibold hover:underline">
                hello@rentora.ng
              </a>
            </p>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 text-[14px] font-semibold text-ink">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[15px] text-ink-600 transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-ink/10">
        <div className="container-x flex flex-col gap-2 py-6 text-[13px] text-ink-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 RentOra Technologies Nigeria Ltd.</p>
          <p>Enugu · Onitsha · Awka · Owerri · Aba · Asaba</p>
        </div>
      </div>
    </footer>
  );
}
