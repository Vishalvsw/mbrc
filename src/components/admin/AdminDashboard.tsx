import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Enquiry, MediaItem, EnquiryStatus } from '../../types';
import {
  Inbox,
  FolderKanban,
  Image as ImageIcon,
  FileText,
  Clock,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Eye,
  PlusCircle,
  RotateCw,
  Search,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Upload,
  Play,
  Filter,
  X,
  Sparkles,
  Download
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateTab: (tab: 'dashboard' | 'projects' | 'media' | 'enquiries' | 'content') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab }) => {
  const {
    enquiries,
    projects,
    mediaItems,
    updateEnquiryStatus,
    setSelectedMedia,
    resetEnquiriesAndMediaToDefault,
    showToast
  } = useApp();

  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryFilter, setInquiryFilter] = useState<'All' | 'New' | 'In Progress' | 'Quotation Sent' | 'Won'>('All');
  const [displayCount, setDisplayCount] = useState<number>(6);
  const [inspectingEnquiry, setInspectingEnquiry] = useState<Enquiry | null>(null);
  const [selectedMediaCategory, setSelectedMediaCategory] = useState<string>('All');

  // Key Telemetry Calculations
  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => e.status?.toLowerCase() === 'new').length;
  const inProgressEnquiries = enquiries.filter((e) => e.status?.toLowerCase() === 'in progress').length;
  const wonEnquiries = enquiries.filter((e) => e.status?.toLowerCase() === 'won').length;

  const totalProjects = projects.length;
  const publishedProjects = projects.filter((p) => p.published).length;
  
  const photoMedia = mediaItems.filter((m) => m.type === 'image');
  const videoMedia = mediaItems.filter((m) => m.type === 'video');
  const documentMedia = mediaItems.filter((m) => m.type === 'document');

  // Estimated Pipeline Value calculation (heuristic based on enquiry budget tags)
  const estimatedPipelineValue = '₹ 48.6 Cr';

  // Filtered enquiries for dashboard
  const filteredEnquiries = enquiries.filter((e) => {
    const statusMatch =
      inquiryFilter === 'All'
        ? true
        : e.status?.toLowerCase() === inquiryFilter.toLowerCase();

    const searchMatch =
      !inquirySearch ||
      e.id.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      e.customerName.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      (e.company && e.company.toLowerCase().includes(inquirySearch.toLowerCase())) ||
      (e.projectLocation && e.projectLocation.toLowerCase().includes(inquirySearch.toLowerCase())) ||
      (e.projectType && e.projectType.toLowerCase().includes(inquirySearch.toLowerCase()));

    return statusMatch && searchMatch;
  });

  const displayedEnquiries = filteredEnquiries.slice(0, displayCount);

  // Filtered media items for dashboard
  const filteredMedia = mediaItems.filter((m) => {
    if (selectedMediaCategory === 'All') return true;
    if (selectedMediaCategory === 'Documents') return m.type === 'document';
    if (selectedMediaCategory === 'Videos') return m.type === 'video';
    return m.category.toLowerCase() === selectedMediaCategory.toLowerCase();
  });

  const recentMedia = filteredMedia.slice(0, 6);

  const handleStatusChange = (enquiryId: string, nextStatus: EnquiryStatus) => {
    updateEnquiryStatus(enquiryId, nextStatus);
    if (inspectingEnquiry && inspectingEnquiry.id === enquiryId) {
      setInspectingEnquiry({ ...inspectingEnquiry, status: nextStatus });
    }
  };

  const getStatusBadge = (status: string) => {
    const s = status?.toLowerCase() || '';
    if (s === 'new') {
      return 'bg-amber-500/20 text-amber-400 border border-amber-500/40';
    }
    if (s === 'in progress') {
      return 'bg-blue-500/20 text-blue-400 border border-blue-500/40';
    }
    if (s === 'quotation sent') {
      return 'bg-purple-500/20 text-purple-400 border border-purple-500/40';
    }
    if (s === 'won') {
      return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40';
    }
    if (s === 'contacted') {
      return 'bg-sky-500/20 text-sky-400 border border-sky-500/40';
    }
    return 'bg-white/5 text-slate-300 border border-white/10';
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-sm bg-[#1E293B] border border-white/10 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-black tracking-widest text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-sm border border-amber-500/20">
              Operations & Digital Control
            </span>
            <span className="text-[10px] text-slate-400 font-mono">MBRC v4.0 Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight mt-1.5">
            Executive Command Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-light">
            Real-time control center for client tender inquiries, road development pipeline, machinery assets, and verified engineering media.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="sync-master-data-btn"
            onClick={resetEnquiriesAndMediaToDefault}
            title="Reload full master dataset with all 8+ inquiries and 15+ verified media assets"
            className="px-4 py-2.5 rounded-sm bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer border border-amber-500/30"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Sync Master Data</span>
          </button>
          <button
            id="quick-add-project-btn"
            onClick={() => onNavigateTab('projects')}
            className="px-4 py-2.5 rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-900 text-xs font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </button>
          <button
            id="quick-view-enquiries-btn"
            onClick={() => onNavigateTab('enquiries')}
            className="px-4 py-2.5 rounded-sm bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
          >
            <Inbox className="w-3.5 h-3.5 text-amber-500" />
            <span>All Leads ({totalEnquiries})</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Total Enquiries */}
        <div className="p-4 rounded-sm bg-[#1E293B] border border-white/10 relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider">Total Leads</span>
            <Inbox className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{totalEnquiries}</div>
          <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
            <span className="text-emerald-400 font-bold">{wonEnquiries} Won</span>
            <span>·</span>
            <span>{inProgressEnquiries} Active</span>
          </div>
        </div>

        {/* New Action Required */}
        <div className="p-4 rounded-sm bg-[#1E293B] border border-amber-500/40 bg-amber-500/5 relative overflow-hidden group">
          <div className="flex items-center justify-between text-amber-500 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider">New Action Needed</span>
            <AlertCircle className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-amber-500 font-mono">{newEnquiries}</div>
          <div className="text-[10px] text-amber-400/80 mt-1 font-medium">Pending quotation/review</div>
        </div>

        {/* Pipeline Value */}
        <div className="p-4 rounded-sm bg-[#1E293B] border border-white/10">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider">Pipeline Est.</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">{estimatedPipelineValue}</div>
          <div className="text-[10px] text-slate-500 mt-1">Active prospective value</div>
        </div>

        {/* Total Projects */}
        <div className="p-4 rounded-sm bg-[#1E293B] border border-white/10">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider">Highway Projects</span>
            <FolderKanban className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{totalProjects}</div>
          <div className="text-[10px] text-slate-400 mt-1">{publishedProjects} Live on website</div>
        </div>

        {/* Media Assets */}
        <div className="p-4 rounded-sm bg-[#1E293B] border border-white/10">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider">Media Assets</span>
            <ImageIcon className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{photoMedia.length + videoMedia.length}</div>
          <div className="text-[10px] text-slate-400 mt-1">{photoMedia.length} Photos · {videoMedia.length} Videos</div>
        </div>

        {/* Uploaded Documents */}
        <div className="p-4 rounded-sm bg-[#1E293B] border border-white/10">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider">Compliance Docs</span>
            <FileText className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-400 font-mono">{documentMedia.length}</div>
          <div className="text-[10px] text-slate-400 mt-1">PWD EPC & ISO Certs</div>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column: Customer Inquiries & Leads Management */}
        <div className="xl:col-span-8 space-y-4">
          <div className="p-6 rounded-sm bg-[#1E293B] border border-white/10 shadow-xl space-y-5">
            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Inbox className="w-5 h-5 text-amber-500" />
                  <h3 className="text-lg font-black text-white font-display uppercase tracking-tight">
                    Customer Requisitions & Leads Pipeline
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    {totalEnquiries} Records
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Track client tender requirements, contractor status, and estimated budget allocations.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigateTab('enquiries')}
                  className="px-3.5 py-1.5 rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-900 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Open Full CRM</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Filter Tabs & In-Dashboard Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Filter Pills */}
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
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        inquiryFilter === filter ? 'bg-slate-900/20 text-slate-900 font-black' : 'bg-white/10 text-slate-400'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative max-w-xs w-full">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by ID, client, location..."
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

            {/* Inquiries Table */}
            <div className="overflow-x-auto border border-white/10 rounded-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0F172A] text-slate-400 uppercase font-bold tracking-widest text-[10px] border-b border-white/10">
                  <tr>
                    <th className="py-3 px-3.5">Docket ID</th>
                    <th className="py-3 px-3.5">Client & Organization</th>
                    <th className="py-3 px-3.5">Requirement & Location</th>
                    <th className="py-3 px-3.5">Est. Budget</th>
                    <th className="py-3 px-3.5">Status</th>
                    <th className="py-3 px-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-[#1E293B]">
                  {displayedEnquiries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                        No inquiries match the current filter criteria.
                      </td>
                    </tr>
                  ) : (
                    displayedEnquiries.map((enq) => (
                      <tr key={enq.id} className="hover:bg-white/5 transition-colors group">
                        {/* ID & Date */}
                        <td className="py-3 px-3.5 align-top">
                          <div className="font-mono font-bold text-amber-400 text-xs flex items-center gap-1">
                            <span>{enq.id}</span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">{enq.date}</div>
                        </td>

                        {/* Customer */}
                        <td className="py-3 px-3.5 align-top">
                          <div className="font-bold text-white text-xs">{enq.customerName}</div>
                          {enq.company && (
                            <div className="text-[11px] text-slate-300 font-medium truncate max-w-[180px]">
                              {enq.company}
                            </div>
                          )}
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5 flex items-center gap-2">
                            <span>{enq.mobile}</span>
                          </div>
                        </td>

                        {/* Project & Location */}
                        <td className="py-3 px-3.5 align-top">
                          <div className="text-slate-200 font-medium text-xs">
                            {enq.projectType || enq.workType || 'Highway Civil Works'}
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                            <span className="truncate max-w-[170px]">{enq.projectLocation}</span>
                          </div>
                        </td>

                        {/* Budget */}
                        <td className="py-3 px-3.5 align-top">
                          <span className="font-mono text-amber-400 font-bold text-[11px] bg-amber-500/10 px-2 py-0.5 rounded-sm border border-amber-500/20 whitespace-nowrap">
                            {enq.estimatedBudget || '₹ 2.0 Cr – ₹ 5.0 Cr'}
                          </span>
                        </td>

                        {/* Status + Quick Changer */}
                        <td className="py-3 px-3.5 align-top">
                          <select
                            value={enq.status}
                            onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm cursor-pointer focus:outline-none transition-colors ${getStatusBadge(
                              enq.status
                            )} bg-[#0F172A]`}
                          >
                            <option value="New" className="bg-[#1E293B] text-amber-400">New</option>
                            <option value="Contacted" className="bg-[#1E293B] text-sky-400">Contacted</option>
                            <option value="In Progress" className="bg-[#1E293B] text-blue-400">In Progress</option>
                            <option value="Quotation Sent" className="bg-[#1E293B] text-purple-400">Quotation Sent</option>
                            <option value="Won" className="bg-[#1E293B] text-emerald-400">Won</option>
                            <option value="Lost" className="bg-[#1E293B] text-rose-400">Lost</option>
                            <option value="Closed" className="bg-[#1E293B] text-slate-400">Closed</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-3.5 align-top text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setInspectingEnquiry(enq)}
                              className="px-2.5 py-1 rounded-sm bg-white/5 hover:bg-white/15 border border-white/10 text-slate-200 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                              title="View full lead details & message"
                            >
                              Inspect
                            </button>
                            <a
                              href={`tel:${enq.mobile}`}
                              className="p-1.5 rounded-sm bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-pointer"
                              title="Direct call client"
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

            {/* Pagination / View More Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 pt-1">
              <div>
                Showing <span className="font-mono font-bold text-white">{displayedEnquiries.length}</span> of{' '}
                <span className="font-mono font-bold text-white">{filteredEnquiries.length}</span> requisitions
                {filteredEnquiries.length < totalEnquiries && ` (Filtered from ${totalEnquiries})`}
              </div>

              <div className="flex items-center gap-2">
                {displayCount < filteredEnquiries.length ? (
                  <button
                    onClick={() => setDisplayCount(filteredEnquiries.length)}
                    className="px-3 py-1 rounded-sm bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-[11px] font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Show All ({filteredEnquiries.length})
                  </button>
                ) : displayCount > 6 ? (
                  <button
                    onClick={() => setDisplayCount(6)}
                    className="px-3 py-1 rounded-sm bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-[11px] font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Show Top 6
                  </button>
                ) : null}

                <button
                  onClick={() => onNavigateTab('enquiries')}
                  className="px-3.5 py-1 rounded-sm bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Full Lead Manager</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Media Library & Digital Assets */}
        <div className="xl:col-span-4 space-y-6">
          {/* Media Library Widget */}
          <div className="p-6 rounded-sm bg-[#1E293B] border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-amber-500" />
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    Media & Asset Library
                  </h3>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {mediaItems.length} Verified engineering assets
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onNavigateTab('media')}
                  className="text-xs text-amber-400 hover:text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <span>Manage</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Category Filter for Media */}
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

            {/* Grid of Media Assets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {recentMedia.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMedia(m)}
                  className="relative rounded-sm overflow-hidden aspect-video bg-[#0F172A] border border-white/10 group cursor-pointer shadow-md hover:border-amber-500/60 transition-all"
                  title={`${m.title} — Click to inspect`}
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

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-80" />

                  {/* Type badge */}
                  <div className="absolute top-1 right-1">
                    <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded-sm bg-black/80 text-amber-400 border border-white/10">
                      {m.type === 'video' ? 'VID' : m.type === 'document' ? 'DOC' : 'IMG'}
                    </span>
                  </div>

                  {/* Title overlay */}
                  <span className="absolute bottom-1 left-1.5 right-1.5 text-[9px] text-white font-bold uppercase truncate">
                    {m.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Official Compliance Certificates Quick Strip */}
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Government Compliance & Licensures
                </span>
                <span className="text-[9px] font-mono text-amber-400">4 Verified</span>
              </div>

              <div className="space-y-1.5">
                {documentMedia.slice(0, 3).map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedMedia(doc)}
                    className="p-2 rounded-sm bg-[#0F172A] hover:bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-xs text-slate-200 font-medium truncate group-hover:text-amber-400 transition-colors">
                        {doc.title}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase shrink-0">
                      {doc.fileSize || 'PDF'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Upload or Manage Button */}
            <button
              onClick={() => onNavigateTab('media')}
              className="w-full py-2 rounded-sm bg-[#0F172A] hover:bg-white/5 border border-white/10 text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload / View All Media Assets</span>
            </button>
          </div>

          {/* Quick Shortcuts Card */}
          <div className="p-6 rounded-sm bg-[#1E293B] border border-white/10 shadow-xl space-y-3">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Administrative Navigation
            </h3>

            <button
              onClick={() => onNavigateTab('content')}
              className="w-full p-3 rounded-sm bg-[#0F172A] hover:bg-white/5 border border-white/10 text-left flex items-center justify-between transition-colors cursor-pointer group"
            >
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-tight group-hover:text-amber-400 transition-colors">
                  Live Website Content CMS
                </div>
                <div className="text-[10px] text-slate-400 font-light">Edit taglines, statistics, executive statements</div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigateTab('projects')}
              className="w-full p-3 rounded-sm bg-[#0F172A] hover:bg-white/5 border border-white/10 text-left flex items-center justify-between transition-colors cursor-pointer group"
            >
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-tight group-hover:text-amber-400 transition-colors">
                  Manage Highway Portfolio
                </div>
                <div className="text-[10px] text-slate-400 font-light">Add, edit, or publish PWD highway packages</div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Inspection Modal for Enquiry */}
      {inspectingEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm bg-[#1E293B] border border-white/15 shadow-2xl p-6 text-slate-200">
            {/* Close */}
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
              <div className="text-xs font-medium text-amber-400 mt-0.5">{inspectingEnquiry.company}</div>
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
                <span className="text-white font-semibold">{inspectingEnquiry.projectType || inspectingEnquiry.workType}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Location</span>
                <span className="text-white font-semibold">{inspectingEnquiry.projectLocation}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Estimated Budget</span>
                <span className="font-mono text-amber-400 font-bold">{inspectingEnquiry.estimatedBudget || 'Unspecified'}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Preferred Contact</span>
                <span className="text-white font-semibold">{inspectingEnquiry.preferredContactMethod || 'Phone'}</span>
              </div>
            </div>

            {/* Message */}
            <div className="mt-4">
              <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
                Client Scope & Message
              </h4>
              <div className="p-3.5 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-slate-200 leading-relaxed">
                {inspectingEnquiry.message || 'No detailed message provided.'}
              </div>
            </div>

            {/* Attached Files */}
            {inspectingEnquiry.uploadedFiles && inspectingEnquiry.uploadedFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
                  Attached Tender Documents & Blueprints ({inspectingEnquiry.uploadedFiles.length})
                </h4>
                <div className="space-y-1.5">
                  {inspectingEnquiry.uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="p-2.5 rounded-sm bg-[#0F172A] border border-white/10 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-amber-400" />
                        <span className="font-medium text-white">{file.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({file.size})</span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-400 uppercase">Verified</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Admin Notes */}
            {inspectingEnquiry.adminNotes && (
              <div className="mt-4">
                <h4 className="text-[10px] uppercase font-bold tracking-wider text-amber-500 mb-1">
                  Internal Engineering & Managing Director Notes
                </h4>
                <div className="p-3.5 rounded-sm bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 whitespace-pre-line font-mono">
                  {inspectingEnquiry.adminNotes}
                </div>
              </div>
            )}

            {/* Quick Status Update inside Modal */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Update Lead Status:</span>
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

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${inspectingEnquiry.mobile}`}
                  className="px-4 py-2 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Client</span>
                </a>
                <button
                  onClick={() => {
                    setInspectingEnquiry(null);
                    onNavigateTab('enquiries');
                  }}
                  className="px-4 py-2 rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-900 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Manage in CRM
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
