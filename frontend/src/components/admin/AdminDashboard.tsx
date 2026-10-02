import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Enquiry, EnquiryStatus } from '../../types';
import {
  Inbox,
  Image as ImageIcon,
  FileText,
  ArrowRight,
  Search,
  Phone,
  MapPin,
  Upload,
  X
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateTab: (tab: 'dashboard' | 'projects' | 'media' | 'enquiries' | 'content') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab }) => {
  const {
    enquiries,
    mediaItems,
    updateEnquiryStatus,
    setSelectedMedia
  } = useApp();

  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryFilter, setInquiryFilter] = useState<'All' | 'New' | 'In Progress' | 'Quotation Sent' | 'Won'>('All');
  const [inspectingEnquiry, setInspectingEnquiry] = useState<Enquiry | null>(null);
  const [selectedMediaCategory, setSelectedMediaCategory] = useState<string>('All');

  const filteredEnquiries = enquiries.filter((e) => {
    const statusMatch =
      inquiryFilter === 'All' ? true : e.status?.toLowerCase() === inquiryFilter.toLowerCase();

    const searchMatch =
      !inquirySearch ||
      e.id.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      e.customerName.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      (e.company && e.company.toLowerCase().includes(inquirySearch.toLowerCase()));

    return statusMatch && searchMatch;
  });

  const filteredMedia = mediaItems.filter((m) => {
    if (selectedMediaCategory === 'All') return true;
    if (selectedMediaCategory === 'Documents') return m.type === 'document';
    if (selectedMediaCategory === 'Videos') return m.type === 'video';
    return m.category.toLowerCase() === selectedMediaCategory.toLowerCase();
  });

  const handleStatusChange = (enquiryId: string, nextStatus: EnquiryStatus) => {
    updateEnquiryStatus(enquiryId, nextStatus);
    if (inspectingEnquiry && inspectingEnquiry.id === enquiryId) {
      setInspectingEnquiry({ ...inspectingEnquiry, status: nextStatus });
    }
  };

  const getStatusBadge = (status: string) => {
    const s = status?.toLowerCase() || '';
    if (s === 'new') return 'bg-amber-500/20 text-amber-400 border border-amber-500/40';
    if (s === 'in progress') return 'bg-blue-500/20 text-blue-400 border border-blue-500/40';
    if (s === 'quotation sent') return 'bg-purple-500/20 text-purple-400 border border-purple-500/40';
    if (s === 'won') return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40';
    if (s === 'contacted') return 'bg-sky-500/20 text-sky-400 border border-sky-500/40';
    return 'bg-white/5 text-slate-300 border border-white/10';
  };

  return (
    <div className="space-y-6 pb-10">

      {/* ============ LEADS ============ */}
      <div className="p-6 rounded-sm bg-[#1E293B] border border-white/10 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Inbox className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-black text-white font-display uppercase tracking-tight">
              Customer Leads
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-400 border border-amber-500/30">
              {enquiries.length} Records
            </span>
          </div>
        </div>

        {/* Filter Pills + Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {(['All', 'New', 'In Progress', 'Quotation Sent', 'Won'] as const).map((filter) => {
              const count =
                filter === 'All'
                  ? enquiries.length
                  : enquiries.filter((e) => e.status?.toLowerCase() === filter.toLowerCase()).length;
              return (
                <button
                  key={filter}
                  onClick={() => setInquiryFilter(filter)}
                  className={`px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                    inquiryFilter === filter
                      ? 'bg-amber-500 text-slate-900 font-black shadow-sm'
                      : 'bg-[#0F172A] text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  <span>{filter}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      inquiryFilter === filter
                        ? 'bg-slate-900/20 text-slate-900 font-black'
                        : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search client, ID, location..."
              value={inquirySearch}
              onChange={(e) => setInquirySearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            {inquirySearch && (
              <button
                onClick={() => setInquirySearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Leads Table */}
        <div className="overflow-x-auto border border-white/10 rounded-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0F172A] text-slate-400 uppercase font-bold tracking-widest text-[10px] border-b border-white/10">
              <tr>
                <th className="py-3 px-3.5">Docket ID</th>
                <th className="py-3 px-3.5">Client</th>
                <th className="py-3 px-3.5">Requirement</th>
                <th className="py-3 px-3.5">Budget</th>
                <th className="py-3 px-3.5">Status</th>
                <th className="py-3 px-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-[#1E293B]">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                    No leads match the current filter.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3.5 align-top">
                      <div className="font-mono font-bold text-amber-400 text-xs">{enq.id}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">{enq.date}</div>
                    </td>

                    <td className="py-3 px-3.5 align-top">
                      <div className="font-bold text-white text-xs">{enq.customerName}</div>
                      {enq.company && (
                        <div className="text-[11px] text-slate-300 truncate max-w-[180px]">
                          {enq.company}
                        </div>
                      )}
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{enq.mobile}</div>
                    </td>

                    <td className="py-3 px-3.5 align-top">
                      <div className="text-slate-200 font-medium text-xs">
                        {enq.projectType || enq.workType || 'Highway Works'}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                        <span className="truncate max-w-[170px]">{enq.projectLocation}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3.5 align-top">
                      <span className="font-mono text-amber-400 font-bold text-[11px] bg-amber-500/10 px-2 py-0.5 rounded-sm border border-amber-500/20 whitespace-nowrap">
                        {enq.estimatedBudget || '₹ 2.0 Cr – ₹ 5.0 Cr'}
                      </span>
                    </td>

                    <td className="py-3 px-3.5 align-top">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm cursor-pointer focus:outline-none transition-colors ${getStatusBadge(
                          enq.status
                        )} bg-[#0F172A]`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Quotation Sent">Quotation Sent</option>
                        <option value="Won">Won</option>
                        <option value="Lost">Lost</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>

                    <td className="py-3 px-3.5 align-top text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setInspectingEnquiry(enq)}
                          className="px-2.5 py-1 rounded-sm bg-white/5 hover:bg-white/15 border border-white/10 text-slate-200 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Inspect
                        </button>
                        <a
                          href={`tel:${enq.mobile}`}
                          className="p-1.5 rounded-sm bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-pointer"
                          title="Call client"
                        >
                          <Phone className="w-3 h-3" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="text-xs text-slate-400 pt-1">
          Showing <span className="font-mono font-bold text-white">{filteredEnquiries.length}</span> of{' '}
          <span className="font-mono font-bold text-white">{enquiries.length}</span> leads
        </div>
      </div>

      {/* ============ MEDIA LIBRARY ============ */}
      <div className="p-6 rounded-sm bg-[#1E293B] border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Media Library
            </h3>
            <span className="text-[11px] text-slate-400">({mediaItems.length} assets)</span>
          </div>

          <button
            onClick={() => onNavigateTab('media')}
            className="text-xs text-amber-400 hover:text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
          >
            <span>Manage</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          {(['All', 'Projects', 'Machinery', 'Plants', 'Documents'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedMediaCategory(cat)}
              className={`px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                selectedMediaCategory === cat
                  ? 'bg-amber-500 text-slate-900 font-black'
                  : 'bg-[#0F172A] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {filteredMedia.slice(0, 8).map((m) => (
            <div
              key={m.id}
              onClick={() => setSelectedMedia(m)}
              className="relative rounded-sm overflow-hidden aspect-video bg-[#0F172A] border border-white/10 group cursor-pointer shadow-md hover:border-amber-500/60 transition-all"
              title={m.title}
            >
              {m.type === 'document' ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-slate-900">
                  <FileText className="w-6 h-6 text-amber-500 mb-1" />
                  <span className="text-[9px] text-white font-bold uppercase line-clamp-1">
                    {m.title}
                  </span>
                  <span className="text-[8px] text-slate-400 font-mono">{m.fileSize || 'PDF'}</span>
                </div>
              ) : (
                <img
                  src={m.url}
                  alt={m.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-80" />

              <div className="absolute top-1 right-1">
                <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded-sm bg-black/80 text-amber-400 border border-white/10">
                  {m.type === 'video' ? 'VID' : m.type === 'document' ? 'DOC' : 'IMG'}
                </span>
              </div>

              <span className="absolute bottom-1 left-1.5 right-1.5 text-[9px] text-white font-bold uppercase truncate">
                {m.title}
              </span>
            </div>
          ))}
        </div>

        {filteredMedia.length === 0 && (
          <div className="py-8 text-center text-xs text-slate-400">
            No media in this category.
          </div>
        )}

        <button
          onClick={() => onNavigateTab('media')}
          className="w-full py-2 rounded-sm bg-[#0F172A] hover:bg-white/5 border border-white/10 text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload / View All Media</span>
        </button>
      </div>

      {/* ============ ENQUIRY DETAIL MODAL ============ */}
      {inspectingEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm bg-[#1E293B] border border-white/15 shadow-2xl p-6 text-slate-200">
            <button
              onClick={() => setInspectingEnquiry(null)}
              className="absolute top-4 right-4 p-2 rounded-sm bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono font-black text-amber-400 text-sm px-2.5 py-0.5 rounded-sm bg-amber-500/10 border border-amber-500/20">
                {inspectingEnquiry.id}
              </span>
              <span className={`px-2.5 py-0.5 rounded-sm text-[10px] font-black uppercase ${getStatusBadge(inspectingEnquiry.status)}`}>
                {inspectingEnquiry.status}
              </span>
            </div>

            <h3 className="text-xl font-black text-white font-display uppercase tracking-tight">
              {inspectingEnquiry.customerName}
            </h3>
            {inspectingEnquiry.company && (
              <div className="text-xs font-medium text-amber-400 mt-0.5">
                {inspectingEnquiry.company}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 p-3.5 rounded-sm bg-[#0F172A] border border-white/10 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Phone</span>
                <span className="font-mono text-white font-semibold">{inspectingEnquiry.mobile}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Email</span>
                <span className="text-white font-semibold">{inspectingEnquiry.email}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Work Type</span>
                <span className="text-white font-semibold">
                  {inspectingEnquiry.projectType || inspectingEnquiry.workType}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Location</span>
                <span className="text-white font-semibold">{inspectingEnquiry.projectLocation}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Budget</span>
                <span className="font-mono text-amber-400 font-bold">
                  {inspectingEnquiry.estimatedBudget || 'Unspecified'}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Preferred Contact</span>
                <span className="text-white font-semibold">
                  {inspectingEnquiry.preferredContactMethod || 'Phone'}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
                Client Message
              </h4>
              <div className="p-3.5 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-slate-200 leading-relaxed">
                {inspectingEnquiry.message || 'No message provided.'}
              </div>
            </div>

            {inspectingEnquiry.adminNotes && (
              <div className="mt-4">
                <h4 className="text-[10px] uppercase font-bold tracking-wider text-amber-500 mb-1">
                  Internal Notes
                </h4>
                <div className="p-3.5 rounded-sm bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 whitespace-pre-line font-mono">
                  {inspectingEnquiry.adminNotes}
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Status:</span>
                <select
                  value={inspectingEnquiry.status}
                  onChange={(e) => handleStatusChange(inspectingEnquiry.id, e.target.value as EnquiryStatus)}
                  className="px-3 py-1.5 rounded-sm bg-[#0F172A] border border-white/20 text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Quotation Sent">Quotation Sent</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <a
                href={`tel:${inspectingEnquiry.mobile}`}
                className="px-4 py-2 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Client</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};