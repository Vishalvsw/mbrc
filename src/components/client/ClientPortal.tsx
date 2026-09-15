import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EnquiryForm } from '../EnquiryForm';
import {
  Inbox,
  Search,
  FileText,
  Download,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
  ShieldCheck,
  Building,
  UserCheck
} from 'lucide-react';

export const ClientPortal: React.FC = () => {
  const { enquiries, mediaItems, setActiveAppView, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'track' | 'new' | 'downloads'>('track');
  const [searchTrackingId, setSearchTrackingId] = useState('');
  const [searchedRecord, setSearchedRecord] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Filter downloadable official documents from media library
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Portal Header */}
        <div className="p-6 sm:p-8 rounded-sm bg-white border-t-4 border-[#FF671F] border-x border-b border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-orange-50 border border-orange-200 text-[10px] font-black uppercase tracking-widest text-[#C2410C] mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF671F]" />
              <span>ಗುತ್ತಿಗೆದಾರ ಮತ್ತು ಕ್ಲೈಂಟ್ ಸೇವಾ ಪೋರ್ಟಲ್ • Official Client Service Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#002147] font-display uppercase tracking-tight">
              MBRC Client Requisition & Tender Portal
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
              Track submitted engineering inquiries in real time, view status milestones, or access verified plant specs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveAppView('website')}
              className="px-5 py-2.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer border border-slate-300 shadow-xs"
            >
              ← Back to Main Website
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            id="client-tab-track-btn"
            onClick={() => setActiveTab('track')}
            className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
              activeTab === 'track'
                ? 'bg-[#002147] text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-[#002147] hover:bg-slate-100'
            }`}
          >
            Track Enquiry Status
          </button>

          <button
            id="client-tab-new-btn"
            onClick={() => setActiveTab('new')}
            className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
              activeTab === 'new'
                ? 'bg-[#002147] text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-[#002147] hover:bg-slate-100'
            }`}
          >
            Submit New Project Enquiry
          </button>

          <button
            id="client-tab-downloads-btn"
            onClick={() => setActiveTab('downloads')}
            className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
              activeTab === 'downloads'
                ? 'bg-[#002147] text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-[#002147] hover:bg-slate-100'
            }`}
          >
            Official Documents & Approvals ({officialDocuments.length})
          </button>
        </div>

        {/* TAB 1: TRACK ENQUIRY STATUS */}
        {activeTab === 'track' && (
          <div className="space-y-6">
            {/* Search Input Box */}
            <div className="p-6 sm:p-8 rounded-sm bg-white border border-slate-200 shadow-sm">
              <h3 className="text-lg font-black text-[#002147] font-display uppercase tracking-tight mb-1">
                Enter Tracking Dossier Reference
              </h3>
              <p className="text-xs text-slate-600 mb-4 font-normal">
                Lookup your requisition status using your generated Reference ID (e.g. <span className="font-mono text-[#C2410C] font-bold">MBRC-2025-101</span>) or your registered mobile number.
              </p>

              <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 max-w-xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter Tracking ID (e.g. MBRC-2025-101) or Mobile..."
                    value={searchTrackingId}
                    onChange={(e) => setSearchTrackingId(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF671F] font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-sm bg-[#FF671F] hover:bg-[#E55B17] text-white font-black text-xs uppercase tracking-widest transition-colors cursor-pointer whitespace-nowrap shadow-xs"
                >
                  Track Dossier
                </button>
              </form>
            </div>

            {/* Results Display */}
            {hasSearched && (
              <div>
                {searchedRecord ? (
                  <div className="p-6 sm:p-8 rounded-sm bg-white border-2 border-[#002147]/20 shadow-md space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                      <div>
                        <div className="text-[11px] font-mono font-bold text-[#C2410C] tracking-wider">
                          TRACKING ID: {searchedRecord.id}
                        </div>
                        <h4 className="text-xl font-black text-[#002147] font-display uppercase tracking-tight mt-0.5">
                          {searchedRecord.customerName}
                        </h4>
                        <div className="text-xs text-slate-500">
                          {searchedRecord.company || 'Private Requisition'} • {searchedRecord.projectLocation}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 uppercase font-bold text-[10px]">Current Status:</span>
                        <span className="px-3 py-1 rounded-sm text-xs font-black uppercase tracking-widest bg-[#002147] text-white shadow-xs">
                          {searchedRecord.status}
                        </span>
                      </div>
                    </div>

                    {/* Progress Milestone Tracker */}
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-3">
                        Requisition Pipeline:
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { title: 'New', desc: 'Logged & Received' },
                          { title: 'Contacted', desc: 'Under Review by MD' },
                          { title: 'In Progress', desc: 'BOQ / Site Inspection' },
                          { title: 'Completed', desc: 'Tender Quoted / Dispatched' }
                        ].map((step, idx) => {
                          const currentStepNum = getStatusStep(searchedRecord.status);
                          const isComplete = currentStepNum >= idx + 1;

                          return (
                            <div
                              key={step.title}
                              className={`p-3.5 rounded-sm border transition-all ${
                                isComplete
                                  ? 'bg-emerald-50 border-emerald-300 text-[#046A38]'
                                  : 'bg-slate-50 border-slate-200 text-slate-400'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-mono text-xs font-bold">Step 0{idx + 1}</span>
                                {isComplete && <CheckCircle2 className="w-4 h-4 text-[#046A38]" />}
                              </div>
                              <div className="font-black text-sm text-[#002147] uppercase tracking-tight font-display">{step.title}</div>
                              <div className="text-[10px] text-slate-500 mt-0.5">{step.desc}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Scope & Files Review */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                        <span className="text-[9px] uppercase font-bold text-slate-500 block tracking-wider">Work Category</span>
                        <div className="text-[#002147] font-bold">{searchedRecord.workType}</div>
                        <span className="text-[9px] uppercase font-bold text-slate-500 block pt-2 tracking-wider">Client Brief</span>
                        <div className="text-slate-700 font-normal">{searchedRecord.message}</div>
                      </div>

                      <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 text-xs space-y-2">
                        <span className="text-[9px] uppercase font-bold text-slate-500 block tracking-wider">Attached Technical Documents</span>
                        {searchedRecord.uploadedFiles && searchedRecord.uploadedFiles.length > 0 ? (
                          searchedRecord.uploadedFiles.map((f: any) => (
                            <div key={f.id} className="flex items-center justify-between p-2 rounded-sm bg-white border border-slate-200">
                              <span className="truncate font-medium text-slate-800">{f.name}</span>
                              <span className="text-[10px] text-slate-500 font-mono">({f.size})</span>
                            </div>
                          ))
                        ) : (
                          <div className="text-slate-400 italic">No attachments provided with this enquiry.</div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 rounded-sm bg-white border border-slate-200 text-center text-slate-600">
                    <AlertCircle className="w-8 h-8 text-[#FF671F] mx-auto mb-2" />
                    <p className="text-sm">No requisition found matching "<span className="text-[#002147] font-mono font-bold">{searchTrackingId}</span>".</p>
                    <p className="text-xs text-slate-500 mt-1">Please verify your ID or lodge a fresh enquiry.</p>
                  </div>
                )}
              </div>
            )}

            {/* Quick Demo Previews of Existing Enquiries */}
            <div>
              <h3 className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-2.5">
                Recently Lodged Enquiries (Sample Demo Data)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {enquiries.slice(0, 3).map((enq) => (
                  <div
                    key={enq.id}
                    onClick={() => {
                      setSearchTrackingId(enq.id);
                      setSearchedRecord(enq);
                      setHasSearched(true);
                    }}
                    className="p-3.5 rounded-sm bg-white border border-slate-200 hover:border-[#FF671F] cursor-pointer transition-all hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono font-bold text-[#C2410C]">{enq.id}</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">{enq.status}</span>
                    </div>
                    <div className="text-xs font-bold text-[#002147] uppercase truncate">{enq.customerName}</div>
                    <div className="text-[11px] text-slate-600 truncate">{enq.workType}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SUBMIT NEW ENQUIRY */}
        {activeTab === 'new' && (
          <div className="p-6 sm:p-8 rounded-sm bg-white border border-slate-200 shadow-sm">
            <div className="mb-6">
              <h3 className="text-2xl font-black text-[#002147] font-display uppercase tracking-tight">
                New Project Requisition Docket
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                Provide site specifications and attach tender BOQs to receive direct executive estimates.
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

        {/* TAB 3: DOWNLOAD OFFICIAL COMPANY ASSETS */}
        {activeTab === 'downloads' && (
          <div className="space-y-4">
            <div className="p-5 rounded-sm bg-white border border-slate-200">
              <h3 className="text-lg font-black text-[#002147] font-display uppercase tracking-tight">
                Verified Corporate Documentation & Dossiers
              </h3>
              <p className="text-xs text-slate-600 mt-1 font-normal">
                Download verified quality certificates, plant capacity sheets, aggregate sieve gradation specs, and corporate profile dossiers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {officialDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="p-5 rounded-sm bg-white border border-slate-200 hover:border-[#FF671F] shadow-xs flex flex-col justify-between transition-all"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-sm bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF671F] shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#002147] font-display uppercase tracking-tight leading-tight">
                        {doc.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 font-normal">
                        {doc.description || 'Verified engineering standard documentation.'}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-500 text-[10px]">{doc.fileSize || 'PDF Dossier'}</span>
                    <a
                      href={doc.url}
                      download
                      onClick={(e) => {
                        if (!doc.url || doc.url === '#') {
                          e.preventDefault();
                          showToast(`Downloaded verified document: ${doc.title}`);
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
          </div>
        )}
      </div>
    </div>
  );
};
