import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { UliLine } from '@/components/UliLine';

const COLUMNS = [
  {
    title: 'Verified Rentals',
    links: [
      { href: '/properties', label: 'All Verified Rentals' },
      { href: '/properties?state=Enugu', label: 'Enugu Rentals' },
      { href: '/properties?state=Anambra', label: 'Onitsha & Awka' },
      { href: '/properties?state=Rivers', label: 'Port Harcourt' },
      { href: '/properties?state=Lagos', label: 'Lagos Rentals' },
      { href: '/properties?state=Imo', label: 'Owerri Rentals' },
    ],
  },
  {
    title: 'Owners & Agents',
    links: [
      { href: '/list-property', label: 'List Your Property' },
      { href: '/register?role=landlord', label: 'Landlord Registration' },
      { href: '/verification-guide', label: 'Document Verification' },
      { href: '/verified-infrastructure', label: 'Verified Infrastructure' },
    ],
  },
  {
    title: 'HouseOne',
    links: [
      { href: '/support', label: 'Support & FAQs' },
      { href: '/profile', label: 'User Profile' },
      { href: '/verification-guide', label: '₦0 Inspection Pledge' },
      { href: '/properties', label: 'Catalogue Search' },
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
            Verified residential rentals across Nigeria, locked at the direct owner price with zero inspection fees.
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
              <a href="mailto:compliance@houseone.ng" className="font-semibold hover:underline">
                compliance@houseone.ng
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
          <p>© 2026 HouseOne Technologies Nigeria Ltd.</p>
          <p>Enugu · Onitsha · Awka · Owerri · Aba · Asaba · Port Harcourt · Lagos · Abuja · ...</p>
        </div>
      </div>
    </footer>
  );
}
