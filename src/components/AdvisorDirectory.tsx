import React, { useState } from 'react';
import { ADVISORS, Advisor } from '../data/advisors';
import { Phone, MessageSquare, ShieldCheck, Star, Award, Mail, CheckCircle2 } from 'lucide-react';
import { LeadEnquiry } from '../types/property';

interface AdvisorDirectoryProps {
  onAdvisorEnquiry: (enquiry: LeadEnquiry) => void;
  onFilterAdvisorMarket: (market: string) => void;
}

export const AdvisorDirectory: React.FC<AdvisorDirectoryProps> = ({
  onAdvisorEnquiry,
  onFilterAdvisorMarket,
}) => {
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAdvisorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAdvisor || !contactName || !contactPhone) return;

    const enquiry: LeadEnquiry = {
      id: `ADV-${Math.floor(100000 + Math.random() * 900000)}`,
      type: 'General Enquiry',
      name: contactName,
      phone: contactPhone,
      email: `${contactName.toLowerCase().replace(/\s+/g, '')}@lead.in`,
      message: `Enquiry directed to ${selectedAdvisor.name}: ${contactMessage}`,
      timestamp: new Date().toISOString(),
      status: 'New',
    };

    onAdvisorEnquiry(enquiry);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedAdvisor(null);
      setContactName('');
      setContactPhone('');
      setContactMessage('');
    }, 3000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="text-xs font-semibold tracking-wider uppercase text-amber-800 mb-2">
          Advisory Specialists
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-semibold text-neutral-900 tracking-tight">
          Verified RERA Certified Advisors
        </h2>
        <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
          Connect directly with licensed NCR real estate advisors. Every consultant holds valid Haryana RERA
          registration, transparent transaction histories, and verified credentials.
        </p>
      </div>

      {/* Advisors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ADVISORS.map((advisor) => (
          <div
            key={advisor.id}
            className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs hover:border-neutral-300 transition-all flex flex-col justify-between space-y-5"
          >
            <div>
              {/* Profile Card Top */}
              <div className="flex items-start gap-4">
                <img
                  src={advisor.avatar}
                  alt={advisor.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-neutral-200 shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-neutral-900">{advisor.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{advisor.rating}</span>
                      <span className="text-neutral-400 font-normal">({advisor.reviewCount})</span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-500 font-medium">{advisor.role}</p>
                  <p className="text-xs text-neutral-700">{advisor.agency}</p>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-800 font-mono">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{advisor.reraNumber}</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-neutral-600 mt-4 leading-relaxed">{advisor.bio}</p>

              {/* Micro-markets specialization */}
              <div className="mt-4 pt-3 border-t border-neutral-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">
                  Micro-Market Specialization
                </span>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {advisor.micromarkets.map((m, idx) => (
                    <button
                      key={idx}
                      onClick={() => onFilterAdvisorMarket(m)}
                      className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-2 py-0.5 rounded text-[11px] transition-colors"
                      title="Filter properties in this micro-market"
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
              <a
                href={`tel:${advisor.phone.replace(/[^0-9+]/g, '')}`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded bg-neutral-900 hover:bg-neutral-800 text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Directly</span>
              </a>

              <a
                href={`https://wa.me/${advisor.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hi ${advisor.name}, I am contacting you through GurugramProperty.in to discuss real estate advisory in Gurugram.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => setSelectedAdvisor(advisor)}
                className="py-2 px-3 text-xs font-semibold rounded border border-neutral-300 hover:bg-neutral-50 text-neutral-800 transition-colors"
              >
                Message
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Advisor Enquiry Modal */}
      {selectedAdvisor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-neutral-200 relative">
            <h3 className="text-base font-semibold text-neutral-900 mb-1">
              Direct Advisory Enquiry to {selectedAdvisor.name}
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              Registered under {selectedAdvisor.reraNumber} · Response typically within 15 minutes.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 rounded text-xs text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <span className="font-semibold block">Message Transmitted</span>
                <span>{selectedAdvisor.name} will reach you shortly on your provided phone number.</span>
              </div>
            ) : (
              <form onSubmit={handleAdvisorSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Vikramaditya Rao"
                    className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-800 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="e.g. 98100 00000"
                    className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-800 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Your Requirement / Questions</label>
                  <textarea
                    rows={3}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Looking for 4 BHK on Golf Course Road or high-yield commercial SCO..."
                    className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-800 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedAdvisor(null)}
                    className="px-3 py-2 text-neutral-600 hover:text-neutral-900 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded"
                  >
                    Submit Enquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
