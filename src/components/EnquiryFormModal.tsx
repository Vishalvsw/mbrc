import React from 'react';
import { useApp } from '../context/AppContext';
import { EnquiryForm } from './EnquiryForm';
import { X, HardHat } from 'lucide-react';

export const EnquiryFormModal: React.FC = () => {
  const { isEnquiryModalOpen, setIsEnquiryModalOpen } = useApp();

  if (!isEnquiryModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-sm bg-white border border-slate-300 shadow-2xl p-6 sm:p-8 text-slate-800">
        {/* Close Button */}
        <button
          id="close-enquiry-modal-btn"
          onClick={() => setIsEnquiryModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-sm bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          aria-label="Close enquiry modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-700 mb-1.5">
            <HardHat className="w-4 h-4 text-amber-700" />
            <span>OFFICIAL PROJECT REQUISITION</span>
          </div>
          <h3 className="text-2xl font-black text-slate-950 font-display uppercase tracking-tight">
            Start Your Project Requisition
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal leading-relaxed">
            Submit your construction parameters, BOQ, or material requirements. An official MBRC tracking reference number will be generated immediately.
          </p>
        </div>

        <EnquiryForm isModal={true} />
      </div>
    </div>
  );
};
