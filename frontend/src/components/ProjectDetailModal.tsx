import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, MapPin, Calendar, Building, CheckCircle, ArrowRight, FileText, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

export const ProjectDetailModal: React.FC = () => {
  const { selectedProject, setSelectedProject, setPrefilledWorkType, setIsEnquiryModalOpen } = useApp();
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!selectedProject) return null;

  const images = selectedProject.images && selectedProject.images.length > 0
    ? selectedProject.images
    : ['/photo/riyaz.png'];

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleRequestSimilar = () => {
    setPrefilledWorkType(`Similar project to: ${selectedProject.name}`);
    setSelectedProject(null);
    setIsEnquiryModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-sm bg-white border border-slate-300 shadow-2xl p-6 sm:p-8 text-slate-800">
        {/* Close Button */}
        <button
          id="close-project-modal-btn"
          onClick={() => setSelectedProject(null)}
          className="absolute top-4 right-4 p-2 rounded-sm bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer z-10"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Carousel / Gallery */}
        <div className="relative rounded-sm overflow-hidden aspect-16/9 bg-slate-900 mb-6 border border-slate-300">
          <img
            src={images[activeImageIdx]}
            alt={selectedProject.name}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B111E]/80 via-transparent to-transparent pointer-events-none" />

          {/* Navigation buttons if multiple */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-sm bg-[#0B111E]/80 hover:bg-[#0B111E] text-white border border-white/10 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-sm bg-[#0B111E]/80 hover:bg-[#0B111E] text-white border border-white/10 transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 right-3 px-2 py-1 rounded-sm bg-[#0B111E]/90 border border-white/10 text-[10px] text-[#D4AF37] font-mono font-bold">
                {activeImageIdx + 1} / {images.length}
              </div>
            </>
          )}

          {/* Status Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest bg-[#0B111E] text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm">
              {selectedProject.category}
            </span>
            <span className="px-2.5 py-1 rounded-sm text-[10px] uppercase font-bold tracking-widest bg-emerald-700 text-white shadow-sm">
              {selectedProject.status}
            </span>
          </div>
        </div>

        {/* Project Header Info */}
        <div className="space-y-5">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] text-amber-700 font-black uppercase tracking-widest mb-1">
              <MapPin className="w-3.5 h-3.5 text-amber-700" />
              <span>{selectedProject.location}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-display uppercase tracking-tight">
              {selectedProject.name}
            </h3>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
              {selectedProject.projectType}
            </p>
          </div>

          {/* Project Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-sm bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-bold">Client / Agency</span>
              <span className="text-slate-900 font-bold line-clamp-1">{selectedProject.client || 'State PWD / KKRDB'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-bold">Completion Year</span>
              <span className="text-slate-900 font-bold font-mono">{selectedProject.completionYear}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-bold">Corridor Length</span>
              <span className="text-slate-900 font-bold">{selectedProject.lengthKm || 'Turnkey Package'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-bold">Project Value</span>
              <span className="text-amber-700 font-bold font-mono">{selectedProject.valueCr || 'Class-I Conforming'}</span>
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-700 mb-2">
              Scope of Engineering & Execution:
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {selectedProject.description}
            </p>
          </div>

          {/* Scope Highlights */}
          {selectedProject.scopeHighlights && selectedProject.scopeHighlights.length > 0 && (
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-700 mb-2">
                Project Deliverables & Technical Milestones:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedProject.scopeHighlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <button
              id="project-enquire-similar-btn"
              onClick={handleRequestSimilar}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-[#0B111E] hover:bg-slate-900 text-[#D4AF37] font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-md"
            >
              <span>Enquire for Similar Infrastructure Works</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
            <button
              id="project-modal-close-btn"
              onClick={() => setSelectedProject(null)}
              className="px-5 py-2.5 rounded-sm bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Close Project Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
