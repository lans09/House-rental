'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { HouseOneStore, MemberRecord } from '@/lib/admin-store';

export default function ProfilePage() {
  const { user, signIn } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'banking' | 'notifications'>('profile');
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Enugu');
  const [businessName, setBusinessName] = useState('');
  const [listerType, setListerType] = useState<'landlord' | 'agent' | 'caretaker'>('landlord');

  // Banking
  const [bankName, setBankName] = useState('Zenith Bank');
  const [accountNumber, setAccountNumber] = useState('1012345678');
  const [accountName, setAccountName] = useState('');

  // Notifications
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setPhone(user.phone || '');
      setEmail(user.email || '');
      setCity(user.city || 'Enugu');
      setBusinessName(user.businessName || '');
      if (user.listerType) setListerType(user.listerType);
      setAccountName(`${user.firstName} ${user.lastName}`);
    }
  }, [user]);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const updated: MemberRecord = {
      ...user,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      city,
      businessName: businessName.trim() || undefined,
      listerType: user.role === 'owner' ? listerType : undefined,
    };

    HouseOneStore.addOrUpdateMember(updated);
    signIn(updated);
    setSavedNotice('Your profile information has been saved successfully.');
    setTimeout(() => setSavedNotice(null), 4000);
  };

  const handleBankingSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice('Nigerian NUBAN payout details registered for rent and deposit escrow.');
    setTimeout(() => setSavedNotice(null), 4000);
  };

  return (
    <div className="bg-paper min-h-screen text-ink pb-24">
      {/* Header */}
      <header className="border-b border-ink/10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-forest-800">
                Account Settings
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink mt-1">
                {user ? `${user.firstName} ${user.lastName}` : 'User Profile'}
              </h1>
              <p className="text-xs text-ink-600 mt-0.5">
                Manage your verified contact coordinates, mandate credentials, and payout accounts.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-xl border border-ink/15 text-xs font-semibold text-ink hover:bg-paper-100 transition-colors"
              >
                ← Back to Dashboard
              </Link>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="mt-8 flex items-center gap-6 border-b border-ink/10 text-sm font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`pb-3 border-b-2 transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'border-ink text-ink'
                  : 'border-transparent text-ink-600 hover:text-ink'
              }`}
            >
              Personal &amp; Contact Info
            </button>

            {user?.role === 'owner' && (
              <button
                type="button"
                onClick={() => setActiveTab('banking')}
                className={`pb-3 border-b-2 transition-all cursor-pointer ${
                  activeTab === 'banking'
                    ? 'border-ink text-ink'
                    : 'border-transparent text-ink-600 hover:text-ink'
                }`}
              >
                NUBAN Payout Banking
              </button>
            )}

            <button
              type="button"
              onClick={() => setActiveTab('notifications')}
              className={`pb-3 border-b-2 transition-all cursor-pointer ${
                activeTab === 'notifications'
                  ? 'border-ink text-ink'
                  : 'border-transparent text-ink-600 hover:text-ink'
              }`}
            >
              Alerts &amp; WhatsApp
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {savedNotice && (
          <div className="mb-6 p-4 rounded-xl bg-forest-50 border border-forest-200 text-forest-900 text-xs font-medium">
            ✓ {savedNotice}
          </div>
        )}

        {/* Tab 1: Profile */}
        {activeTab === 'profile' && (
          <div className="bg-white border border-ink/15 rounded-3xl p-6 sm:p-8 shadow-sm max-w-2xl">
            <h2 className="text-xl font-bold text-ink tracking-tight mb-5">
              Personal Information
            </h2>

            <form onSubmit={handleProfileSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-paper border border-ink/15 text-sm text-ink rounded-xl focus:outline-none focus:border-ink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-paper border border-ink/15 text-sm text-ink rounded-xl focus:outline-none focus:border-ink"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-paper border border-ink/15 text-sm text-ink rounded-xl focus:outline-none focus:border-ink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-1.5">
                    Primary City
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 bg-paper border border-ink/15 text-sm text-ink rounded-xl focus:outline-none focus:border-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full px-4 py-2.5 bg-paper-100 border border-ink/10 text-sm text-ink-600 rounded-xl cursor-not-allowed"
                />
                <span className="text-[11px] text-ink-600 mt-1 block">
                  Email address is locked as your primary login identifier.
                </span>
              </div>

              {user?.role === 'owner' && (
                <div className="pt-3 border-t border-ink/10 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-1.5">
                      Business or Agency Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Coal City Prime Properties"
                      className="w-full px-4 py-2.5 bg-paper border border-ink/15 text-sm text-ink rounded-xl focus:outline-none focus:border-ink"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-1.5">
                      Lister Legal Standing
                    </label>
                    <select
                      value={listerType}
                      onChange={(e) => setListerType(e.target.value as any)}
                      className="w-full px-4 py-2.5 bg-paper border border-ink/15 text-sm text-ink rounded-xl focus:outline-none focus:border-ink cursor-pointer"
                    >
                      <option value="landlord">Direct Property Owner (Landlord)</option>
                      <option value="agent">Authorized Individual Agent</option>
                      <option value="caretaker">Family Caretaker / Representative</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-forest-800 text-white text-sm font-semibold hover:bg-ink transition-colors cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Banking */}
        {activeTab === 'banking' && user?.role === 'owner' && (
          <div className="bg-white border border-ink/15 rounded-3xl p-6 sm:p-8 shadow-sm max-w-2xl">
            <h2 className="text-xl font-bold text-ink tracking-tight mb-1">
              Nigerian NUBAN Bank Account
            </h2>
            <p className="text-xs text-ink-600 mb-5 leading-relaxed">
              Register your verified commercial bank account for security deposit holding and locked direct annual rent disbursement.
            </p>

            <form onSubmit={handleBankingSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-1.5">
                  Bank Name
                </label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-paper border border-ink/15 text-sm text-ink rounded-xl focus:outline-none focus:border-ink cursor-pointer"
                >
                  <option value="Zenith Bank">Zenith Bank Plc</option>
                  <option value="GTBank">Guaranty Trust Bank (GTCO)</option>
                  <option value="Access Bank">Access Bank Plc</option>
                  <option value="First Bank">First Bank of Nigeria</option>
                  <option value="UBA">United Bank for Africa (UBA)</option>
                  <option value="Fidelity Bank">Fidelity Bank Plc</option>
                  <option value="Moniepoint MFB">Moniepoint Microfinance Bank</option>
                  <option value="Kuda Bank">Kuda Microfinance Bank</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-1.5">
                  10-Digit Account Number (NUBAN)
                </label>
                <input
                  type="text"
                  maxLength={10}
                  required
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="e.g. 1012345678"
                  className="w-full px-4 py-2.5 bg-paper border border-ink/15 text-sm text-ink rounded-xl font-mono focus:outline-none focus:border-ink"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-1.5">
                  Verified Account Name
                </label>
                <input
                  type="text"
                  required
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-paper border border-ink/15 text-sm text-ink rounded-xl focus:outline-none focus:border-ink"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-forest-800 text-white text-sm font-semibold hover:bg-ink transition-colors cursor-pointer"
                >
                  Save Banking Details
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Notifications */}
        {activeTab === 'notifications' && (
          <div className="bg-white border border-ink/15 rounded-3xl p-6 sm:p-8 shadow-sm max-w-2xl space-y-5">
            <h2 className="text-xl font-bold text-ink tracking-tight mb-2">
              Communication &amp; Alerts
            </h2>

            <label className="flex items-start gap-3 p-4 rounded-xl border border-ink/10 bg-paper cursor-pointer">
              <input
                type="checkbox"
                checked={whatsappAlerts}
                onChange={(e) => setWhatsappAlerts(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-forest-800"
              />
              <div>
                <span className="text-sm font-semibold text-ink block">
                  Instant WhatsApp Tour Notifications
                </span>
                <span className="text-xs text-ink-600 leading-relaxed">
                  Receive an immediate WhatsApp ping whenever a verified prospective tenant books an inspection slot.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 rounded-xl border border-ink/10 bg-paper cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-forest-800"
              />
              <div>
                <span className="text-sm font-semibold text-ink block">
                  Daily Ledger Digest via Email
                </span>
                <span className="text-xs text-ink-600 leading-relaxed">
                  Receive a daily summary of audit status updates and mandate compliance notes.
                </span>
              </div>
            </label>

            <button
              type="button"
              onClick={() => {
                setSavedNotice('Notification preferences updated.');
                setTimeout(() => setSavedNotice(null), 3000);
              }}
              className="px-6 py-2.5 rounded-xl bg-forest-800 text-white text-sm font-semibold hover:bg-ink transition-colors cursor-pointer"
            >
              Update Preferences
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
