import React from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2, Shield, Phone, Mail, Award, Quote, ArrowRight } from 'lucide-react';

export const DirectorProfileModal: React.FC = () => {
  const { selectedDirector, setSelectedDirector, setIsEnquiryModalOpen } = useApp();

  if (!selectedDirector) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-sm bg-white border border-slate-300 shadow-2xl p-6 sm:p-8 text-slate-800">
        {/* Close Button */}
        <button
          id="close-director-modal-btn"
          onClick={() => setSelectedDirector(null)}
          className="absolute top-4 right-4 p-2 rounded-sm bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Photo & Role Column */}
          <div className="md:col-span-4">
            <div className="rounded-sm overflow-hidden border border-slate-300 aspect-3/4 shadow-sm mb-4 bg-slate-100">
              <img
                src={selectedDirector.image}
                alt={selectedDirector.name}
                className="w-full h-full object-cover object-top transition-all duration-300"
              />
            </div>

            <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-600">
                <span className="uppercase text-[10px] tracking-wider font-bold">Industry Experience</span>
                <span className="font-bold text-slate-950 font-mono">{selectedDirector.experienceYears || 25}+ Years</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="uppercase text-[10px] tracking-wider font-bold">Board Seat</span>
                <span className="font-bold text-slate-950 uppercase text-[10px]">MBRC & Infra Pvt Ltd</span>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="md:col-span-8 space-y-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-1">
                EXECUTIVE BOARD PROFILE
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-display uppercase tracking-tight">
                {selectedDirector.name}
              </h3>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {selectedDirector.title}
              </p>
            </div>

            {/* Quote / Statement */}
            {selectedDirector.statement && (
              <div className="p-4 rounded-sm bg-amber-50 border-l-4 border-amber-500 text-xs italic text-slate-700 flex gap-3">
                <Quote className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <span className="leading-relaxed">“{selectedDirector.statement}”</span>
              </div>
            )}

            {/* Biography */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-700">
                Operational Scope & Directorial Focus
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {selectedDirector.bio}
              </p>
            </div>

            {/* Key Focus Areas */}
            {selectedDirector.focus && selectedDirector.focus.length > 0 && (
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-700 mb-2">
                  Ground Responsibilities:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedDirector.focus.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  setSelectedDirector(null);
                  setIsEnquiryModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#0B111E] hover:bg-slate-900 text-[#D4AF37] font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-md"
              >
                <span>Direct Executive Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setSelectedDirector(null)}
                className="px-4 py-2.5 rounded-sm bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
