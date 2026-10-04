import React from 'react';

export function VerificationDossier() {
  return (
    <div className="bg-white rounded-3xl border border-ink/10 p-6 sm:p-8 lg:p-10 space-y-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-ink/10 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper-100 text-ink text-[12px] font-medium border border-ink/10">
            Mandate & Document Compliance
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ink font-normal tracking-tight">
            Replacing Street Touts with Document-Verified Mandates
          </h2>
          <p className="text-[14px] sm:text-[15px] text-ink-600 max-w-2xl leading-relaxed">
            In Nigeria, multiple freelance touts quote conflicting prices for the same vacant house and demand inspection fees just to view it. 
            On RentOra, agents and landlords must submit ownership papers and direct mandates before their listing is approved.
          </p>
        </div>

        <div className="text-right hidden sm:block text-[13px] text-ink-600">
          <span className="block font-semibold text-ink">Mandatory Document Vetting</span>
          <span>₦0 Inspection Fees to Seekers</span>
        </div>
      </div>

      {/* The Dossier Registry Visual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Sample Verification File Card */}
        <div className="lg:col-span-5 bg-paper-100 rounded-2xl border border-ink/10 p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Top Docket Bar */}
            <div className="flex items-center justify-between border-b border-ink/10 pb-3 text-[11px] font-mono tracking-wider text-ink-600 uppercase">
              <span>COMPLIANCE DOCKET #RO-2026-ENU-014</span>
              <span className="text-forest-700 font-bold">STATUS: CONFIRMED</span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-ink-600 font-semibold">Subject Property</span>
              <h4 className="font-serif text-lg text-ink font-normal">
                5-Bedroom Executive Mansion, Independence Layout
              </h4>
              <p className="text-[13px] text-ink-600">
                Enugu North LGA, Enugu State
              </p>
            </div>

            {/* Document Checklist */}
            <div className="space-y-2 pt-2 border-t border-ink/10 text-[13px]">
              <div className="flex items-center justify-between py-1 border-b border-ink/5">
                <span className="text-ink-600">Land Title / Survey Document</span>
                <span className="text-ink font-semibold">✓ C of O Validated</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-ink/5">
                <span className="text-ink-600">Direct Landlord Mandate Letter</span>
                <span className="text-ink font-semibold">✓ Signed & Confirmed</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-ink/5">
                <span className="text-ink-600">Agent Identity & CAC Status</span>
                <span className="text-ink font-semibold">✓ NIN / CAC Accredited</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-ink-600">Locked Price Agreement</span>
                <span className="text-forest-700 font-bold">✓ ₦0 Markup (Direct Price)</span>
              </div>
            </div>
          </div>

          {/* Stamped Seal */}
          <div className="p-3 bg-white rounded-xl border border-ink/10 flex items-center justify-between shadow-sm">
            <div className="text-[12px]">
              <span className="font-semibold text-ink block">RentOra Compliance Desk</span>
              <span className="text-ink-600 text-[11px]">Direct Mandate Confirmed · Zero Middlemen</span>
            </div>
            <div className="h-8 px-2.5 rounded-full border border-ink flex items-center justify-center text-ink text-[11px] font-bold">
              VETTED
            </div>
          </div>
        </div>

        {/* 3 Step Protocol Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl border border-ink/10 p-5 flex flex-col justify-between space-y-4 shadow-sm">
            <div className="space-y-3">
              <span className="font-serif text-2xl font-bold text-amber-500">01</span>
              <h3 className="font-serif text-base text-ink font-normal">
                Mandate Submission
              </h3>
              <p className="text-[13px] text-ink-600 leading-relaxed">
                Agents must submit written proof of direct mandate from the genuine owner. Unaccredited street touts without owner consent cannot list.
              </p>
            </div>
            <span className="text-[11px] font-medium text-ink-600">Owner Authorization</span>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl border border-ink/10 p-5 flex flex-col justify-between space-y-4 shadow-sm">
            <div className="space-y-3">
              <span className="font-serif text-2xl font-bold text-amber-500">02</span>
              <h3 className="font-serif text-base text-ink font-normal">
                Document Vetting
              </h3>
              <p className="text-[13px] text-ink-600 leading-relaxed">
                Our compliance team verifies the title documents (C of O, Deed of Assignment, or Survey plan) and agent identity before confirming the listing.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-forest-700">24–48h SLA</span>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl border border-ink/10 p-5 flex flex-col justify-between space-y-4 shadow-sm">
            <div className="space-y-3">
              <span className="font-serif text-2xl font-bold text-amber-500">03</span>
              <h3 className="font-serif text-base text-ink font-normal">
                Locked Price Guarantee
              </h3>
              <p className="text-[13px] text-ink-600 leading-relaxed">
                The owner’s exact annual rent or sale price is locked into the registry. Agents agree in writing never to charge inspection fees to seekers.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-amber-700">Zero Added Quotes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
