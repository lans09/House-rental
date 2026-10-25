import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Fraunces, Space_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { TenancyConciergeChat } from '@/components/TenancyConciergeChat';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
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
  title: "HouseOne — Verified Nigerian residential rentals at locked owner rates",
  description:
    'Verified homes to rent across Enugu, Onitsha, Awka, Owerri, Aba, Asaba, Port Harcourt, Lagos, Abuja and more. Every listing document-verified with direct landlord mandate and locked owner pricing. ₦0 inspection fees.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col bg-paper text-ink font-sans antialiased selection:bg-amber-200 selection:text-ink">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <TenancyConciergeChat />
        </AuthProvider>
      </body>
    </html>
  );
}
