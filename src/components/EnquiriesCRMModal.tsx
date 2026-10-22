import React, { useState } from 'react';
import { X, Search, Download, CheckCircle, Clock, Phone, MessageSquare, CarFront, FileText } from 'lucide-react';
import { LeadEnquiry, PropertyListingSubmission } from '../types/property';

interface EnquiriesCRMModalProps {
  isOpen: boolean;
  onClose: () => void;
  enquiries: LeadEnquiry[];
  onUpdateStatus: (id: string, status: LeadEnquiry['status']) => void;
  propertySubmissions: PropertyListingSubmission[];
}

export const EnquiriesCRMModal: React.FC<EnquiriesCRMModalProps> = ({
  isOpen,
  onClose,
  enquiries,
  onUpdateStatus,
  propertySubmissions,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'leads' | 'listings'>('leads');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchLead, setSearchLead] = useState<string>('');

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesStatus = filterStatus === 'All' || e.status === filterStatus;
    const matchesSearch =
      searchLead === '' ||
      e.name.toLowerCase().includes(searchLead.toLowerCase()) ||
      e.phone.includes(searchLead) ||
      (e.propertyTitle && e.propertyTitle.toLowerCase().includes(searchLead.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const exportToCSV = () => {
    const headers = ['ID', 'Type', 'Name', 'Phone', 'Email', 'Property', 'Date Slot', 'Cab Pickup', 'Status', 'Timestamp'];
    const rows = enquiries.map((e) => [
      e.id,
      e.type,
      `"${e.name}"`,
      `"${e.phone}"`,
      `"${e.email}"`,
      `"${e.propertyTitle || 'General'}"`,
      `"${e.preferredDate || ''} ${e.preferredTimeSlot || ''}"`,
      e.needsPickup ? 'Yes' : 'No',
      e.status,
      e.timestamp,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `gurugram_property_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white max-w-5xl w-full rounded-xl shadow-2xl border border-neutral-300 overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                Brokerage Management CRM
              </span>
              <span className="bg-neutral-100 text-neutral-600 font-mono text-[10px] px-2 py-0.5 rounded">
                Live Data
              </span>
            </div>
            <h3 className="text-lg font-serif font-bold text-neutral-900">
              Lead Generation & Verified Submissions Hub
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportToCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-medium rounded transition-colors"
              title="Export leads to CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="border-b border-neutral-200 px-6 flex items-center justify-between bg-neutral-50">
          <div className="flex space-x-4 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('leads')}
              className={`py-3 border-b-2 transition-colors ${
                activeTab === 'leads' ? 'border-amber-800 text-amber-900' : 'border-transparent text-neutral-500'
              }`}
            >
              Client Inbound Leads ({enquiries.length})
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`py-3 border-b-2 transition-colors ${
                activeTab === 'listings' ? 'border-amber-800 text-amber-900' : 'border-transparent text-neutral-500'
              }`}
            >
              Owner Property Submissions ({propertySubmissions.length})
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeTab === 'leads' ? (
            <>
              {/* Filter Strip */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by client name, mobile, or property reference..."
                    value={searchLead}
                    onChange={(e) => setSearchLead(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-neutral-800"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-neutral-500 font-medium">Status:</span>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-neutral-50 border border-neutral-200 rounded py-2 px-2.5 text-neutral-800"
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              {/* Leads Table */}
              <div className="border border-neutral-200 rounded-lg overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                  <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase font-semibold text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Ref & Type</th>
                      <th className="py-3 px-4">Client Contact</th>
                      <th className="py-3 px-4">Target Property</th>
                      <th className="py-3 px-4">Site Visit Window</th>
                      <th className="py-3 px-4">Lifecycle Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-neutral-400">
                          No enquiries matching current filter.
                        </td>
                      </tr>
                    ) : (
                      filteredEnquiries.map((lead) => (
                        <tr key={lead.id} className="hover:bg-neutral-50">
                          <td className="py-3 px-4">
                            <span className="font-mono font-semibold text-neutral-900 block">{lead.id}</span>
                            <span className="text-[11px] text-amber-800 font-medium">{lead.type}</span>
                            <span className="text-[10px] text-neutral-400 block">
                              {new Date(lead.timestamp).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <span className="font-semibold text-neutral-900 block">{lead.name}</span>
                            <a
                              href={`tel:${lead.phone}`}
                              className="text-neutral-600 hover:text-amber-800 font-mono block"
                            >
                              {lead.phone}
                            </a>
                            <span className="text-neutral-400 text-[11px] block">{lead.email}</span>
                          </td>

                          <td className="py-3 px-4">
                            <span className="font-medium text-neutral-800 line-clamp-1">
                              {lead.propertyTitle || 'General Consultation'}
                            </span>
                            {lead.propertyRef && (
                              <span className="text-[10px] font-mono text-neutral-400">
                                Ref: {lead.propertyRef}
                              </span>
                            )}
                            {lead.message && (
                              <p className="text-[11px] text-neutral-500 mt-1 line-clamp-1 italic">
                                "{lead.message}"
                              </p>
                            )}
                          </td>

                          <td className="py-3 px-4">
                            {lead.preferredDate ? (
                              <div>
                                <span className="font-medium text-neutral-800 block">
                                  {lead.preferredDate}
                                </span>
                                <span className="text-[11px] text-neutral-500 block">
                                  {lead.preferredTimeSlot}
                                </span>
                                {lead.needsPickup && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-800 mt-1">
                                    <CarFront className="w-3 h-3" />
                                    Chauffeur Requested
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-neutral-400">—</span>
                            )}
                          </td>

                          <td className="py-3 px-4">
                            <select
                              value={lead.status}
                              onChange={(e) => onUpdateStatus(lead.id, e.target.value as any)}
                              className={`py-1 px-2 rounded text-xs font-semibold border ${
                                lead.status === 'New'
                                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                                  : lead.status === 'Contacted'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : lead.status === 'Site Visit Scheduled'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="border border-neutral-200 rounded-lg overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase font-semibold text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Submission Ref</th>
                    <th className="py-3 px-4">Owner / Agent</th>
                    <th className="py-3 px-4">Project & Micro-market</th>
                    <th className="py-3 px-4">Typology & Area</th>
                    <th className="py-3 px-4">Expected Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {propertySubmissions.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-neutral-400">
                        No property submissions received yet.
                      </td>
                    </tr>
                  ) : (
                    propertySubmissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-neutral-50">
                        <td className="py-3 px-4 font-mono font-medium text-neutral-900">
                          {sub.id}
                          <span className="text-[10px] text-neutral-400 block">
                            {new Date(sub.submittedAt).toLocaleDateString('en-IN')}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-neutral-900 block">{sub.ownerName}</span>
                          <span className="text-neutral-500 font-mono text-[11px] block">{sub.phone}</span>
                          <span className="text-neutral-400 text-[10px] block">{sub.email}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium text-neutral-800 block">{sub.projectOrSociety}</span>
                          <span className="text-[11px] text-neutral-500">{sub.microMarket}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-neutral-800">
                            {sub.bedrooms} BHK · {sub.propertyType}
                          </span>
                          <span className="text-[11px] text-neutral-400 block font-mono">
                            {sub.totalArea} sq ft
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-amber-800">
                          {sub.expectedPrice}
                          <span className="text-[10px] font-normal text-neutral-500 block">
                            For {sub.listingType}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
