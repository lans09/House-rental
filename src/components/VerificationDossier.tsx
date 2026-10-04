import React from 'react';

export function VerificationDossier() {
  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 lg:p-10 space-y-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-[11px] font-mono font-semibold tracking-wider uppercase border border-stone-200">
            Mandate & Document Compliance
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-obsidian-900 font-bold tracking-tight">
            Why We Replace Street Agent Quotes with Document-Verified Mandates
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
            In Nigeria, multiple freelance touts quote conflicting prices for the same vacant house and demand ₦10,000 just to view it. 
            On RentOra, agents and landlords must submit ownership papers and direct mandates before their listing is approved.
          </p>
        </div>

        <div className="text-right hidden sm:block font-mono text-[11px] text-stone-500">
          <span className="block font-bold text-stone-900">MANDATORY DOCUMENT VETTING</span>
          <span>₦0 Inspection Fees to Seekers</span>
        </div>
      </div>

      {/* The Dossier Registry Visual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Sample Verification File Card */}
        <div className="lg:col-span-5 bg-stone-50/80 rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Top Docket Bar */}
            <div className="flex items-center justify-between border-b border-stone-200/60 pb-3 text-[10px] font-mono tracking-wider text-stone-500 uppercase">
              <span>COMPLIANCE DOCKET #RO-2026-ENU-014</span>
              <span className="text-emerald-700 font-bold">STATUS: CONFIRMED</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold">Subject Property</span>
              <h4 className="font-serif text-lg font-bold text-obsidian-900">
                5-Bedroom Executive Mansion, Independence Layout
              </h4>
              <p className="text-xs font-mono text-stone-500">
                Enugu North LGA, Enugu State
              </p>
            </div>

            {/* Document Checklist */}
            <div className="space-y-2 pt-2 border-t border-stone-200/60 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-stone-200/40">
                <span className="text-stone-600">Land Title / Survey Document</span>
                <span className="font-mono text-stone-900 font-semibold">✓ C of O Validated</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-stone-200/40">
                <span className="text-stone-600">Direct Landlord Mandate Letter</span>
                <span className="font-mono text-stone-900 font-semibold">✓ Signed & Confirmed</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-stone-200/40">
                <span className="text-stone-600">Agent Identity & CAC Status</span>
                <span className="font-mono text-stone-900 font-semibold">✓ NIN / CAC Accredited</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-stone-600">Locked Price Agreement</span>
                <span className="font-mono text-emerald-700 font-bold">✓ ₦0 Markup (Direct Price)</span>
              </div>
            </div>
          </div>

          {/* Stamped Seal */}
          <div className="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between shadow-sm">
            <div className="text-[11px]">
              <span className="font-semibold text-obsidian-900 block">RentOra Compliance Desk</span>
              <span className="text-stone-500 font-mono text-[10px]">Direct Mandate Confirmed • Zero Middlemen</span>
            </div>
            <div className="h-8 w-8 rounded-full border border-stone-900 flex items-center justify-center text-obsidian-900 font-mono text-xs font-bold rotate-[-12deg]">
              VETTED
            </div>
          </div>
        </div>

        {/* 3 Step Protocol Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 flex flex-col justify-between space-y-4 shadow-sm">
            <div className="space-y-3">
              <span className="font-mono text-2xl font-bold text-stone-300">01</span>
              <h3 className="font-serif text-base font-bold text-obsidian-900">
                Mandate Submission
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Agents must submit written proof of direct mandate from the genuine owner. Unaccredited street touts without owner consent cannot list.
              </p>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Agent Mandate</span>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 flex flex-col justify-between space-y-4 shadow-sm">
            <div className="space-y-3">
              <span className="font-mono text-2xl font-bold text-stone-300">02</span>
              <h3 className="font-serif text-base font-bold text-obsidian-900">
                Document Vetting
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Our compliance team verifies the title documents (C of O, Deed of Assignment, or Survey plan) and agent identity before confirming the listing.
              </p>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-semibold font-mono">24-48h Review</span>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 flex flex-col justify-between space-y-4 shadow-sm">
            <div className="space-y-3">
              <span className="font-mono text-2xl font-bold text-amber-500">03</span>
              <h3 className="font-serif text-base font-bold text-obsidian-900">
                Locked Price Guarantee
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                The owner’s exact annual rent or sale price is locked into the registry. Agents agree in writing never to charge inspection fees to seekers.
              </p>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 font-semibold font-mono">Zero Agent Quotes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
