'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SupportPage() {
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportData, setReportData] = useState({
    propertyAddress: '',
    agentNameOrPhone: '',
    amountDemanded: '',
    incidentNotes: '',
    reporterContact: '',
  });

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
  };

  return (
    <div className="bg-paper min-h-screen text-ink pb-24 font-sans">
      {/* Header */}
      <header className="border-b border-ink/10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-50 border border-forest-200/60 text-forest-900 text-xs font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Support &amp; Verification Desk
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink">
            How can we help you?
          </h1>
          <p className="mt-3 text-base text-ink-600 max-w-xl leading-relaxed">
            Fast answers regarding verified Nigerian rentals, ₦0 free inspections, power bands, and utility audits.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/2348030000000?text=Hello%20HouseOne%20Support,%20I%20need%20assistance."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-forest-900 hover:bg-ink text-white px-5 py-3 text-sm font-semibold transition-all shadow-sm cursor-pointer"
            >
              <svg
                className="w-4 h-4 fill-current text-emerald-400"
                viewBox="0 0 24 24"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
            <a
              href="mailto:support@houseone.ng"
              className="inline-flex items-center gap-2 rounded-xl border border-ink/15 bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-paper transition-colors"
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
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>support@houseone.ng</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        {/* Anti-Touting / Inspection Fee Reporting */}
        <section className="bg-white border border-amber-300/80 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="max-w-2xl">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md mb-2.5">
              ₦0 Inspection Guarantee
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
              Report an Agent Demanding Inspection Fees
            </h2>
            <p className="text-sm text-ink-600 mt-2 leading-relaxed">
              Every HouseOne inspection is completely free. If any agent, caretaker, or gatekeeper asks for viewing or mobilization fees, tell us immediately.
            </p>
          </div>

          {reportSubmitted ? (
            <div className="mt-6 p-5 bg-forest-50 border border-forest-200 rounded-xl text-forest-900 space-y-2">
              <h3 className="font-bold text-sm">Report Received</h3>
              <p className="text-xs text-forest-800 leading-relaxed">
                Thank you. Our compliance team has flagged this listing for review and will contact the property owner directly.
              </p>
              <button
                type="button"
                onClick={() => setReportSubmitted(false)}
                className="mt-2 text-xs font-semibold text-forest-900 underline cursor-pointer"
              >
                Submit another report
              </button>
            </div>
          ) : (
            <form onSubmit={handleReportSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-1.5">
                    Property Address or Title
                  </label>
                  <input
                    type="text"
                    required
                    value={reportData.propertyAddress}
                    onChange={(e) =>
                      setReportData({ ...reportData, propertyAddress: e.target.value })
                    }
                    placeholder="e.g. 3-Bed Flat in Independence Layout"
                    className="w-full px-3.5 py-2.5 bg-paper border border-ink/15 text-sm text-ink rounded-xl focus:outline-none focus:border-forest-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-1.5">
                    Agent Name / Phone
                  </label>
                  <input
                    type="text"
                    required
                    value={reportData.agentNameOrPhone}
                    onChange={(e) =>
                      setReportData({ ...reportData, agentNameOrPhone: e.target.value })
                    }
                    placeholder="e.g. Agent Kalu / 0803..."
                    className="w-full px-3.5 py-2.5 bg-paper border border-ink/15 text-sm text-ink rounded-xl focus:outline-none focus:border-forest-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-1.5">
                    Amount Demanded
                  </label>
                  <input
                    type="text"
                    required
                    value={reportData.amountDemanded}
                    onChange={(e) =>
                      setReportData({ ...reportData, amountDemanded: e.target.value })
                    }
                    placeholder="e.g. ₦5,000"
                    className="w-full px-3.5 py-2.5 bg-paper border border-ink/15 text-sm text-ink rounded-xl focus:outline-none focus:border-forest-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-1.5">
                    Your Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    required
                    value={reportData.reporterContact}
                    onChange={(e) =>
                      setReportData({ ...reportData, reporterContact: e.target.value })
                    }
                    placeholder="For our team to follow up"
                    className="w-full px-3.5 py-2.5 bg-paper border border-ink/15 text-sm text-ink rounded-xl focus:outline-none focus:border-forest-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-1.5">
                  Details (Optional)
                </label>
                <textarea
                  rows={2}
                  value={reportData.incidentNotes}
                  onChange={(e) =>
                    setReportData({ ...reportData, incidentNotes: e.target.value })
                  }
                  placeholder="What was said or requested..."
                  className="w-full px-3.5 py-2.5 bg-paper border border-ink/15 text-sm text-ink rounded-xl focus:outline-none focus:border-forest-800"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-forest-900 text-white text-sm font-semibold hover:bg-ink transition-colors cursor-pointer"
              >
                Submit Report
              </button>
            </form>
          )}
        </section>

        {/* FAQ Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-ink tracking-tight">
            Common Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-ink/10 rounded-xl p-5 space-y-1.5">
              <h3 className="font-semibold text-sm text-ink">
                How is DisCo Band electricity verified?
              </h3>
              <p className="text-xs text-ink-600 leading-relaxed">
                We check feeder schedule logs and confirm with neighbors before labeling a home Band A (20+ hrs) or Band B.
              </p>
            </div>

            <div className="bg-white border border-ink/10 rounded-xl p-5 space-y-1.5">
              <h3 className="font-semibold text-sm text-ink">
                Dedicated vs Shared Prepaid Meters?
              </h3>
              <p className="text-xs text-ink-600 leading-relaxed">
                Dedicated meters are exclusive to your flat so you control your token usage. Shared meters split costs across tenants.
              </p>
            </div>

            <div className="bg-white border border-ink/10 rounded-xl p-5 space-y-1.5">
              <h3 className="font-semibold text-sm text-ink">
                How are landlords verified?
              </h3>
              <p className="text-xs text-ink-600 leading-relaxed">
                Landlords submit an authentic Deed of Assignment or C of O, alongside signed authorization before listings go live.
              </p>
            </div>

            <div className="bg-white border border-ink/10 rounded-xl p-5 space-y-1.5">
              <h3 className="font-semibold text-sm text-ink">
                Are inspections really ₦0?
              </h3>
              <p className="text-xs text-ink-600 leading-relaxed">
                Yes. Inspections on HouseOne are strictly free. Any agent charging viewing fees is suspended immediately.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
