import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Fraunces, Space_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Warm, characterful display serif for headings
const serif = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

// Kept for inner pages that still use font-mono
const mono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "HouseOne — Rent or buy a home in Eastern Nigeria at the owner's price",
  description:
    'Verified homes to rent and buy across Enugu, Onitsha, Awka, Owerri, Aba and Asaba. Every listing document-verified with landlord mandate and fixed owner pricing. No inspection fees.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col bg-paper text-ink font-sans antialiased selection:bg-amber-200 selection:text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
