import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Enquiry, EnquiryStatus } from '../../types';
import {
  Inbox,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Download,
  Trash2,
  CheckCircle2,
  Clock,
  ChevronRight,
  X,
  Send,
  MessageSquare,
  DollarSign,
  ExternalLink,
  MessageCircle,
  FileSpreadsheet,
  FileCode
} from 'lucide-react';

export const AdminEnquiries: React.FC = () => {
  const { enquiries, updateEnquiryStatus, deleteEnquiry, showToast } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [noteInput, setNoteInput] = useState('');

  const statuses: (EnquiryStatus | 'All')[] = [
    'All',
    'New',
    'Contacted',
    'In Progress',
    'Quotation Sent',
    'Won',
    'Lost',
    'Closed'
  ];

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    const matchesSearch =
      search === '' ||
      e.id.toLowerCase().includes(search.toLowerCase()) ||
      e.customerName.toLowerCase().includes(search.toLowerCase()) ||
      (e.company && e.company.toLowerCase().includes(search.toLowerCase())) ||
      (e.projectLocation && e.projectLocation.toLowerCase().includes(search.toLowerCase())) ||
      (e.projectType && e.projectType.toLowerCase().includes(search.toLowerCase())) ||
      (e.workType && e.workType.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (enquiryId: string, newStatus: EnquiryStatus) => {
    updateEnquiryStatus(enquiryId, newStatus);
    if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry || !noteInput.trim()) return;

    const existingNotes = selectedEnquiry.adminNotes ? selectedEnquiry.adminNotes + '\n' : '';
    const updatedNotes = existingNotes + `[${new Date().toLocaleDateString()}] ` + noteInput.trim();
    updateEnquiryStatus(selectedEnquiry.id, selectedEnquiry.status, updatedNotes);
    setSelectedEnquiry({
      ...selectedEnquiry,
      adminNotes: updatedNotes
    });
    setNoteInput('');
    showToast('Internal engineering note recorded');
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (enquiries.length === 0) {
      showToast('No inquiries to export', 'error');
      return;
    }

    const headers = [
      'Reference ID',
      'Date',
      'Customer Name',
      'Company',
      'Phone',
      'Email',
      'Project Type',
      'Location',
      'Estimated Budget',
      'Preferred Contact',
      'Status',
      'Message',
      'Notes'
    ];

    const rows = enquiries.map((e) => [
      `"${e.id}"`,
      `"${new Date(e.createdAt).toLocaleDateString()}"`,
      `"${e.customerName.replace(/"/g, '""')}"`,
      `"${(e.company || '').replace(/"/g, '""')}"`,
      `"${e.mobile}"`,
      `"${e.email}"`,
      `"${(e.projectType || e.workType || '').replace(/"/g, '""')}"`,
      `"${(e.projectLocation || '').replace(/"/g, '""')}"`,
      `"${(e.estimatedBudget || '').replace(/"/g, '""')}"`,
      `"${(e.preferredContactMethod || 'Phone').replace(/"/g, '""')}"`,
      `"${e.status}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`,
      `"${(e.adminNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MBRC_Inquiries_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported inquiries to CSV successfully');
  };

  // Export to JSON
  const handleExportJSON = () => {
    if (enquiries.length === 0) {
      showToast('No inquiries to export', 'error');
      return;
    }

    const jsonStr = JSON.stringify(enquiries, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MBRC_Inquiries_Export_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Exported inquiries to JSON successfully');
  };

  const getStatusBadge = (status: EnquiryStatus | string) => {
    const s = (status || '').toUpperCase();
    switch (s) {
      case 'NEW':
        return 'bg-amber-500/20 text-amber-400 border border-amber-500/40';
      case 'CONTACTED':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/40';
      case 'IN PROGRESS':
        return 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/40';
      case 'QUOTATION SENT':
        return 'bg-purple-500/20 text-purple-400 border border-purple-500/40';
      case 'WON':
      case 'COMPLETED':
        return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40';
      case 'LOST':
      case 'REJECTED':
        return 'bg-rose-500/20 text-rose-400 border border-rose-500/40';
      case 'CLOSED':
        return 'bg-slate-500/20 text-slate-400 border border-slate-500/40';
      default:
        return 'bg-slate-800 text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-tight">
            Inquiry & Lead Management
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 font-light">
            Review incoming tender briefs, track quotation pipelines, and export records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider border border-white/10 cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider border border-white/10 cursor-pointer"
          >
            <FileCode className="w-3.5 h-3.5 text-amber-400" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-sm bg-[#1E293B] border border-white/10 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID, customer name, company, location, or work type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 md:pb-0">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3 text-amber-500" />
            Status:
          </span>
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all ${
                statusFilter === st
                  ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table & List View */}
      <div className="rounded-sm bg-[#1E293B] border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0F172A] text-slate-400 uppercase tracking-widest font-mono text-[9px] border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Ref ID</th>
                <th className="py-3 px-4">Client / Organization</th>
                <th className="py-3 px-4">Work / Project Type</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Budget / Files</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    <Inbox className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-xs">No project requisitions match the current criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((enq) => (
                  <tr
                    key={enq.id}
                    onClick={() => setSelectedEnquiry(enq)}
                    className="hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-amber-400">{enq.id}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-white">{enq.customerName}</div>
                      {enq.company && <div className="text-[10px] text-slate-400">{enq.company}</div>}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-200">
                      {enq.projectType || enq.workType}
                    </td>
                    <td className="py-3 px-4 text-slate-400">{enq.projectLocation || 'Bidar / Regional'}</td>
                    <td className="py-3 px-4">
                      <div className="font-mono text-slate-300 text-[11px]">{enq.estimatedBudget || '₹1 Cr – ₹5 Cr'}</div>
                      {enq.uploadedFiles && enq.uploadedFiles.length > 0 && (
                        <span className="inline-flex items-center gap-1 text-[9px] text-amber-400 font-bold">
                          <FileText className="w-3 h-3" />
                          {enq.uploadedFiles.length} file(s)
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500 text-[10px]">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider font-mono ${getStatusBadge(
                          enq.status
                        )}`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedEnquiry(enq)}
                        className="p-1.5 rounded-sm hover:bg-white/10 text-slate-400 hover:text-white"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Drawer / Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#1E293B] border border-white/10 rounded-sm w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500">
                  REQUISITION DOSSIER
                </span>
                <h3 className="text-xl font-black text-white font-mono">{selectedEnquiry.id}</h3>
                <div className="text-xs text-slate-400">
                  Lodged on {new Date(selectedEnquiry.createdAt).toLocaleString()}
                </div>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Selector */}
            <div className="p-4 rounded-sm bg-[#0F172A] border border-white/10 space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Update Pipeline Status
              </label>
              <div className="flex flex-wrap gap-2">
                {(['New', 'Contacted', 'In Progress', 'Quotation Sent', 'Won', 'Lost', 'Closed'] as EnquiryStatus[]).map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedEnquiry.id, st)}
                      className={`px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        selectedEnquiry.status === st
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300'
                      }`}
                    >
                      {st}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Client Coordinates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-sm bg-white/5 border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Client / Authorized Rep</span>
                <div className="font-bold text-white text-sm">{selectedEnquiry.customerName}</div>
                {selectedEnquiry.company && <div className="text-slate-400">{selectedEnquiry.company}</div>}
              </div>

              <div className="p-3.5 rounded-sm bg-white/5 border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Contact Coordinates</span>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <a href={`tel:${selectedEnquiry.mobile}`} className="hover:underline font-mono">
                    {selectedEnquiry.mobile}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-amber-500" />
                  <a href={`mailto:${selectedEnquiry.email}`} className="hover:underline">
                    {selectedEnquiry.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-4 rounded-sm bg-white/5 border border-white/5 space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Service Domain</span>
                  <span className="text-white font-bold">{selectedEnquiry.projectType || selectedEnquiry.workType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Location</span>
                  <span className="text-white">{selectedEnquiry.projectLocation || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Budget Estimate</span>
                  <span className="text-amber-400 font-bold font-mono">
                    {selectedEnquiry.estimatedBudget || 'Under ₹1 Cr'}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Message / Scope</span>
                <p className="text-slate-300 bg-[#0F172A] p-3 rounded-sm leading-relaxed border border-white/5">
                  {selectedEnquiry.message}
                </p>
              </div>

              {/* Uploaded Documents */}
              {selectedEnquiry.uploadedFiles && selectedEnquiry.uploadedFiles.length > 0 && (
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block mb-2">
                    Attached Tender Documents / Drawings ({selectedEnquiry.uploadedFiles.length})
                  </span>
                  <div className="space-y-1.5">
                    {selectedEnquiry.uploadedFiles.map((f) => (
                      <div
                        key={f.id}
                        className="flex items-center justify-between p-2 rounded-sm bg-[#0F172A] border border-white/10"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-amber-400" />
                          <span className="text-slate-200 font-medium">{f.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">({f.size})</span>
                        </div>
                        <button
                          onClick={() => showToast(`Opening document ${f.name}`)}
                          className="text-[10px] font-bold text-amber-400 hover:underline uppercase"
                        >
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Internal Notes */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                Internal Engineering & Estimating Notes
              </span>
              {selectedEnquiry.adminNotes && (
                <div className="p-3 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-slate-300 whitespace-pre-line font-mono">
                  {selectedEnquiry.adminNotes}
                </div>
              )}
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add note (e.g. Quotation sent on 14/09, awaiting client BOQ approval)..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase cursor-pointer"
                >
                  Save Note
                </button>
              </form>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  if (window.confirm('Delete this inquiry from records?')) {
                    deleteEnquiry(selectedEnquiry.id);
                    setSelectedEnquiry(null);
                    showToast('Inquiry removed');
                  }
                }}
                className="text-rose-400 hover:text-rose-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Requisition</span>
              </button>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-5 py-2 rounded-sm bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
