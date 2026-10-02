import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EnquiryForm } from '../EnquiryForm';
import {
  Search,
  FileText,
  Download,
  CheckCircle2,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';

export const ClientPortal: React.FC = () => {
  const { enquiries, mediaItems, setActiveAppView, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'track' | 'new' | 'downloads'>('track');
  const [searchTrackingId, setSearchTrackingId] = useState('');
  const [searchedRecord, setSearchedRecord] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const officialDocuments = mediaItems.filter((m) => m.type === 'document' && m.published);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTrackingId.trim()) return;

    const query = searchTrackingId.trim().toLowerCase();
    const found = enquiries.find(
      (enq) =>
        enq.id.toLowerCase() === query ||
        enq.mobile.includes(query) ||
        enq.email.toLowerCase() === query
    );

    setSearchedRecord(found || null);
    setHasSearched(true);
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'New': return 1;
      case 'Contacted': return 2;
      case 'In Progress': return 3;
      case 'Completed': return 4;
      default: return 1;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Portal Header */}
        <div className="p-6 sm:p-8 rounded-sm bg-white border-t-4 border-[#FF671F] border-x border-b border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-orange-50 border border-orange-200 text-[10px] font-black uppercase tracking-widest text-[#C2410C] mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF671F]" />
              <span>Client Service Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#002147] font-display uppercase tracking-tight">
              Track & Manage Your Enquiries
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Track submitted inquiries in real time, view status milestones, or access verified documents.
            </p>
          </div>

          <button
            onClick={() => setActiveAppView('website')}
            className="px-5 py-2.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-widest transition-colors border border-slate-300 whitespace-nowrap"
          >
            ← Back to Website
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          {[
            { id: 'track', label: 'Track Enquiry' },
            { id: 'new', label: 'New Enquiry' },
            { id: 'downloads', label: `Documents (${officialDocuments.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#002147] text-white font-black'
                  : 'text-slate-600 hover:text-[#002147] hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ============ TAB 1: TRACK ============ */}
        {activeTab === 'track' && (
          <div className="space-y-6">

            {/* Search */}
            <div className="p-6 sm:p-8 rounded-sm bg-white border border-slate-200 shadow-sm">
              <h3 className="text-lg font-black text-[#002147] font-display uppercase tracking-tight mb-1">
                Enter Tracking Reference
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                Use your Reference ID or registered mobile number.
              </p>

              <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 max-w-xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="MBRC-2025-101 or mobile number"
                    value={searchTrackingId}
                    onChange={(e) => setSearchTrackingId(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF671F] font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-sm bg-[#FF671F] hover:bg-[#E55B17] text-white font-black text-xs uppercase tracking-widest transition-colors whitespace-nowrap"
                >
                  Track
                </button>
              </form>
            </div>

            {/* Result */}
            {hasSearched && (
              <>
                {searchedRecord ? (
                  <div className="p-6 sm:p-8 rounded-sm bg-white border-2 border-[#002147]/20 shadow-md space-y-6">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                      <div>
                        <div className="text-[11px] font-mono font-bold text-[#C2410C] tracking-wider">
                          {searchedRecord.id}
                        </div>
                        <h4 className="text-xl font-black text-[#002147] font-display uppercase tracking-tight mt-0.5">
                          {searchedRecord.customerName}
                        </h4>
                        <div className="text-xs text-slate-500">
                          {searchedRecord.company || 'Private'} • {searchedRecord.projectLocation || '—'}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500 uppercase font-bold">Status:</span>
                        <span className="px-3 py-1 rounded-sm text-xs font-black uppercase tracking-widest bg-[#002147] text-white">
                          {searchedRecord.status}
                        </span>
                      </div>
                    </div>

                    {/* Progress steps */}
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-3">
                        Progress
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { title: 'New', desc: 'Received' },
                          { title: 'Contacted', desc: 'Under Review' },
                          { title: 'In Progress', desc: 'Site / BOQ' },
                          { title: 'Completed', desc: 'Quoted' }
                        ].map((step, idx) => {
                          const currentStepNum = getStatusStep(searchedRecord.status);
                          const isComplete = currentStepNum >= idx + 1;
                          return (
                            <div
                              key={step.title}
                              className={`p-3.5 rounded-sm border ${
                                isComplete
                                  ? 'bg-emerald-50 border-emerald-300 text-[#046A38]'
                                  : 'bg-slate-50 border-slate-200 text-slate-400'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-mono text-xs font-bold">0{idx + 1}</span>
                                {isComplete && <CheckCircle2 className="w-4 h-4 text-[#046A38]" />}
                              </div>
                              <div className="font-black text-sm text-[#002147] uppercase tracking-tight font-display">
                                {step.title}
                              </div>
                              <div className="text-[10px] text-slate-500 mt-0.5">{step.desc}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 text-xs space-y-2">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-500 block tracking-wider mb-0.5">
                            Work Type
                          </span>
                          <div className="text-[#002147] font-bold">{searchedRecord.workType}</div>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-500 block tracking-wider mb-0.5">
                            Message
                          </span>
                          <div className="text-slate-700">{searchedRecord.message}</div>
                        </div>
                      </div>

                      <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 text-xs space-y-2">
                        <span className="text-[9px] uppercase font-bold text-slate-500 block tracking-wider">
                          Attachments
                        </span>
                        {searchedRecord.uploadedFiles && searchedRecord.uploadedFiles.length > 0 ? (
                          searchedRecord.uploadedFiles.map((f: any) => (
                            <div
                              key={f.id}
                              className="flex items-center justify-between p-2 rounded-sm bg-white border border-slate-200"
                            >
                              <span className="truncate text-slate-800 font-medium">{f.name}</span>
                              <span className="text-[10px] text-slate-500 font-mono">({f.size})</span>
                            </div>
                          ))
                        ) : (
                          <div className="text-slate-400 italic">No attachments.</div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 rounded-sm bg-white border border-slate-200 text-center">
                    <AlertCircle className="w-8 h-8 text-[#FF671F] mx-auto mb-2" />
                    <p className="text-sm text-slate-600">
                      No record found for{' '}
                      <span className="text-[#002147] font-mono font-bold">{searchTrackingId}</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Check your ID or submit a new enquiry.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Recent demo */}
            <div>
              <h3 className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-2.5">
                Recent Enquiries
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {enquiries.slice(0, 3).map((enq) => (
                  <button
                    key={enq.id}
                    onClick={() => {
                      setSearchTrackingId(enq.id);
                      setSearchedRecord(enq);
                      setHasSearched(true);
                    }}
                    className="p-3.5 rounded-sm bg-white border border-slate-200 hover:border-[#FF671F] cursor-pointer transition-all text-left"
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono font-bold text-[#C2410C]">{enq.id}</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                        {enq.status}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-[#002147] uppercase truncate">
                      {enq.customerName}
                    </div>
                    <div className="text-[11px] text-slate-600 truncate">{enq.workType}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB 2: NEW ============ */}
        {activeTab === 'new' && (
          <div className="p-6 sm:p-8 rounded-sm bg-white border border-slate-200 shadow-sm">
            <div className="mb-6">
              <h3 className="text-2xl font-black text-[#002147] font-display uppercase tracking-tight">
                New Project Enquiry
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Provide site specifications and attach tender BOQs to receive executive estimates.
              </p>
            </div>
            <EnquiryForm
              onSubmitted={(id) => {
                setSearchTrackingId(id);
                setActiveTab('track');
                setHasSearched(true);
              }}
            />
          </div>
        )}

        {/* ============ TAB 3: DOWNLOADS ============ */}
        {activeTab === 'downloads' && (
          <div className="space-y-4">
            <div className="p-5 rounded-sm bg-white border border-slate-200">
              <h3 className="text-lg font-black text-[#002147] font-display uppercase tracking-tight">
                Corporate Documents
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Download verified certificates, plant specs, and corporate dossiers.
              </p>
            </div>

            {officialDocuments.length === 0 ? (
              <div className="p-8 rounded-sm bg-white border border-slate-200 text-center">
                <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600">No documents available yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {officialDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-5 rounded-sm bg-white border border-slate-200 hover:border-[#FF671F] transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-sm bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF671F] shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-[#002147] font-display uppercase tracking-tight leading-tight">
                          {doc.title}
                        </h4>
                        <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                          {doc.description || 'Verified engineering documentation.'}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-500 text-[10px]">
                        {doc.fileSize || 'PDF'}
                      </span>
                      <a
                        href={doc.url}
                        download
                        onClick={(e) => {
                          if (!doc.url || doc.url === '#') {
                            e.preventDefault();
                            showToast(`Downloaded: ${doc.title}`);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#002147] hover:bg-[#001733] text-white font-bold text-[11px] uppercase tracking-wider transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-amber-300" />
                        <span>Download</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};