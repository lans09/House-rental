'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { HouseOneStore, CatalogueItem } from '@/lib/admin-store';

interface ChatMessage {
  id: string;
  sender: 'support' | 'user';
  text: string;
  timestamp: string;
  recommendedListings?: {
    id: string;
    title: string;
    slug: string;
    price: number;
    area: string;
    state: string;
  }[];
  escalationLink?: string;
}

const QUICK_PROMPTS = [
  '₦0 Free inspection guarantee',
  'DisCo Band A vs Band B light',
  'Dedicated vs Shared meter',
  'Treated borehole water',
  'Required landlord documents',
  'Browse verified rentals',
];

export function TenancyConciergeChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [catalogue, setCatalogue] = useState<CatalogueItem[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCatalogue(HouseOneStore.getCatalogue());
    const sync = () => setCatalogue(HouseOneStore.getCatalogue());
    window.addEventListener('houseone-store-updated', sync);
    return () => window.removeEventListener('houseone-store-updated', sync);
  }, []);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'support',
      text: 'Hi there! 👋 Welcome to HouseOne Support.\n\nHow can we help you today? Ask us anything about verified rentals, scheduling free inspections, or reach our compliance team directly.',
      timestamp: 'Just now',
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isThinking]);

  const handleSend = (userText: string) => {
    const text = userText.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let replyText = '';
      let recommended: ChatMessage['recommendedListings'] = undefined;
      let escalation: string | undefined = undefined;

      // 1. Zero inspection fee guarantee
      if (
        lower.includes('inspection') ||
        lower.includes('viewing') ||
        lower.includes('gate fee') ||
        lower.includes('agent fee') ||
        lower.includes('free') ||
        lower.includes('charge') ||
        lower.includes('₦0')
      ) {
        replyText =
          'All inspections on HouseOne are 100% free (₦0).\n\nLandlords and agents are legally barred from demanding viewing or gate fees. If anyone asks for money before showing you a house, do not pay. Report them directly so we can intervene immediately.';
        escalation =
          'https://wa.me/2348030000000?text=Hello%20HouseOne%20Support,%20an%20agent%20demanded%20an%20inspection%20fee.';
      }
      // 2. DisCo feeder bands
      else if (
        lower.includes('band a') ||
        lower.includes('band b') ||
        lower.includes('electricity') ||
        lower.includes('power') ||
        lower.includes('light') ||
        lower.includes('disco')
      ) {
        replyText =
          'We verify power feeder bands on-site before listing:\n\n• Band A: 20+ hours of daily grid power.\n• Band B: 16–20 hours daily.\n• Band C: 12–16 hours daily.\n\nEvery listing clearly states its verified supply schedule so you know what to expect.';
      }
      // 3. Prepaid Metering
      else if (
        lower.includes('meter') ||
        lower.includes('prepaid') ||
        lower.includes('postpaid') ||
        lower.includes('token') ||
        lower.includes('nepa')
      ) {
        replyText =
          'We differentiate metering upfront:\n\n• Dedicated Prepaid: Your own meter inside your flat. You load tokens directly and avoid bill disputes.\n• Shared Prepaid: Compound shares a meter with split billing.\n\nCheck the "Prepaid Meter" badge on any listing.';
      }
      // 4. Water supply & borehole
      else if (
        lower.includes('water') ||
        lower.includes('borehole') ||
        lower.includes('filtration') ||
        lower.includes('iron')
      ) {
        replyText =
          'Water systems are checked during physical audits. Homes tagged "Treated Borehole" have active filtration or reverse osmosis systems installed for clean, safe running water.';
      }
      // 5. Landlord documents & verification
      else if (
        lower.includes('document') ||
        lower.includes('cac') ||
        lower.includes('nin') ||
        lower.includes('list') ||
        lower.includes('landlord') ||
        lower.includes('deed') ||
        lower.includes('title')
      ) {
        replyText =
          'No CAC or corporate filings needed. Landlords simply provide:\n\n1. Registered Deed of Assignment / Conveyance or C of O\n2. Signed Mandate Authorization Letter (if an agent)\n3. Recent Utility Bill\n\nOur team verifies everything privately within 24–48 hours.';
      }
      // 6. Searching for rentals by city or bedroom
      else if (
        lower.includes('enugu') ||
        lower.includes('onitsha') ||
        lower.includes('awka') ||
        lower.includes('lagos') ||
        lower.includes('abuja') ||
        lower.includes('duplex') ||
        lower.includes('apartment') ||
        lower.includes('bedroom') ||
        lower.includes('browse') ||
        lower.includes('rent')
      ) {
        const matches = catalogue
          .filter((item) => {
            return (
              (lower.includes('enugu') && item.state.toLowerCase() === 'enugu') ||
              (lower.includes('onitsha') && item.area.toLowerCase().includes('onitsha')) ||
              (lower.includes('awka') && item.state.toLowerCase().includes('anambra')) ||
              (lower.includes('duplex') && item.propertyType === 'duplex') ||
              (lower.includes('apartment') && item.propertyType === 'flat_apartment') ||
              (lower.includes('3-bedroom') && item.bedrooms === 3) ||
              (lower.includes('4-bedroom') && item.bedrooms === 4) ||
              true
            );
          })
          .slice(0, 3);

        if (matches.length > 0) {
          replyText = `Here are verified rentals available with direct owner pricing:`;
          recommended = matches.map((m) => ({
            id: m.id,
            title: m.title,
            slug: m.slug,
            price: m.price,
            area: m.area,
            state: m.state,
          }));
        } else {
          replyText =
            'We have verified residential rentals across Enugu, Anambra, Lagos, and Abuja. You can explore all listings with locked landlord rates on our Verified Rentals page.';
        }
      }
      // 7. General fallback
      else {
        replyText =
          'I am here to help with questions on verified rentals, ₦0 free inspections, power bands, and utility setups. You can also chat directly with our compliance team on WhatsApp.';
        escalation =
          'https://wa.me/2348030000000?text=Hello%20HouseOne%20Support,%20I%20have%20a%20question.';
      }

      const botReply: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'support',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedListings: recommended,
        escalationLink: escalation,
      };

      setMessages((prev) => [...prev, botReply]);
      setIsThinking(false);
    }, 400);
  };

  return (
    <>
      {/* High-Contrast Floating Support Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            style={{ backgroundColor: '#0F3D2E' }}
            className="group flex items-center gap-3 pl-4 pr-5 py-3 text-white rounded-full shadow-[0_12px_36px_rgba(15,61,46,0.45)] hover:shadow-2xl transition-all duration-200 cursor-pointer border-2 border-emerald-400/30 hover:border-emerald-400 hover:scale-[1.03]"
            aria-label="Open HouseOne Support"
          >
            {/* Bold, Highly-Visible Support Headset Icon */}
            <div className="relative w-9 h-9 rounded-full bg-emerald-600/50 flex items-center justify-center shrink-0 border border-emerald-300/40">
              <svg
                className="w-5 h-5 text-white stroke-[2.3]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
              {/* Pulsing Emerald Green Status Dot */}
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0F3D2E] animate-pulse" />
            </div>

            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white tracking-wide">
                  Support
                </span>
                <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950/70 px-1.5 py-0.2 rounded border border-emerald-500/30">
                  Live
                </span>
              </div>
              <span className="block text-[11px] text-emerald-200/90 font-medium">
                Ask us anything
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Support Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[85vh] h-[590px] bg-paper rounded-2xl border border-ink/20 shadow-[0_24px_60px_rgba(22,20,15,0.28)] flex flex-col overflow-hidden animate-fade-in font-sans">
          {/* Header */}
          <header
            style={{ backgroundColor: '#0F3D2E' }}
            className="px-5 py-3.5 text-white border-b border-forest-700 flex items-center justify-between shrink-0"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-emerald-600/40 flex items-center justify-center border border-emerald-300/40">
                <svg
                  className="w-5 h-5 text-white stroke-[2.3]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0F3D2E]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                  HouseOne Support
                </h3>
                <p className="text-[11px] text-emerald-200 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  Online · Replies instantly
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* WhatsApp Quick Link */}
              <a
                href="https://wa.me/2348030000000?text=Hello%20HouseOne%20Support,%20I%20need%20assistance."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white px-2.5 py-1.5 rounded-lg border border-emerald-400/40 bg-emerald-800/40 hover:bg-emerald-700/60 transition-colors"
                title="Chat with human support on WhatsApp"
              >
                <svg
                  className="w-3.5 h-3.5 text-emerald-300 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
                <span>WhatsApp</span>
              </a>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close Support"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </header>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 text-ink">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-ink text-white rounded-br-xs'
                      : 'bg-white text-ink border border-ink/10 rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line text-[13.5px] leading-relaxed font-normal">
                    {msg.text}
                  </p>

                  {/* Recommended Listings Card */}
                  {msg.recommendedListings && msg.recommendedListings.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-ink/10 space-y-2">
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-forest-800 block">
                        Verified Matches:
                      </span>
                      {msg.recommendedListings.map((item) => (
                        <Link
                          key={item.id}
                          href={`/properties/${item.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="block p-2.5 rounded-xl bg-paper hover:bg-forest-50/60 border border-ink/10 transition-colors text-left"
                        >
                          <p className="font-semibold text-ink text-xs truncate">
                            {item.title}
                          </p>
                          <div className="flex items-center justify-between text-[11px] text-ink-600 mt-1">
                            <span>
                              {item.area}, {item.state}
                            </span>
                            <span className="font-bold text-forest-900 tabular-nums">
                              ₦{item.price.toLocaleString()} / yr
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Escalation Link */}
                  {msg.escalationLink && (
                    <div className="mt-2.5 pt-2.5 border-t border-ink/10">
                      <a
                        href={msg.escalationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-800 hover:text-forest-950 underline"
                      >
                        <span>Chat with compliance on WhatsApp</span>
                        <span>→</span>
                      </a>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-ink-500 mt-1 px-1 font-medium">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white border border-ink/10 text-ink-600 text-xs w-36 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-forest-800 animate-pulse" />
                <span className="text-xs font-medium">Searching answers...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3.5 py-2 border-t border-ink/10 bg-white/90 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5 shrink-0 [scrollbar-width:none] [-ms-overflow-style:none]">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSend(prompt)}
                className="text-[11.5px] font-medium px-3 py-1.5 rounded-full bg-paper border border-ink/15 text-ink hover:border-forest-800 hover:text-forest-900 hover:bg-forest-50/40 transition-colors cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="p-3 bg-white border-t border-ink/10 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 px-3.5 py-2.5 bg-paper border border-ink/15 text-xs sm:text-sm text-ink rounded-xl focus:outline-none focus:border-forest-800 placeholder:text-ink-500/70"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              style={{ backgroundColor: '#0F3D2E' }}
              className="w-9 h-9 rounded-xl text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity cursor-pointer shrink-0"
              aria-label="Send message"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
