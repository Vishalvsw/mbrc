import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Download, Eye, Tag } from 'lucide-react';

export const MediaLightboxModal: React.FC = () => {
  const { selectedMedia, setSelectedMedia } = useApp();

  if (!selectedMedia) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-sm bg-white border border-slate-300 shadow-2xl p-6 sm:p-8 text-slate-800">
        {/* Close button */}
        <button
          id="close-media-modal-btn"
          onClick={() => setSelectedMedia(null)}
          className="absolute top-4 right-4 p-2 rounded-sm bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer z-10"
          aria-label="Close media modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Preview Container */}
        <div className="rounded-sm overflow-hidden bg-slate-900 mb-4 border border-slate-300 flex items-center justify-center min-h-[300px] max-h-[550px]">
          {selectedMedia.type === 'video' ? (
            <video
              src={selectedMedia.url}
              controls
              autoPlay
              className="max-h-[550px] w-auto max-w-full rounded-sm"
            >
              Your browser does not support the video tag.
            </video>
          ) : selectedMedia.type === 'document' ? (
            <div className="p-12 text-center space-y-4 bg-white">
              <div className="w-16 h-16 rounded-sm bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF671F] mx-auto">
                <Download className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-black text-[#002147] font-display uppercase tracking-tight">
                {selectedMedia.title}
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto font-normal">
                {selectedMedia.description || 'Official verified engineering or corporate documentation.'}
              </p>
              <div className="pt-2">
                <a
                  href={selectedMedia.url}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm bg-[#002147] hover:bg-[#001733] text-white font-black text-xs uppercase tracking-widest transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4 text-amber-300" />
                  Download Verified Document ({selectedMedia.fileSize || 'PDF'})
                </a>
              </div>
            </div>
          ) : (
            <img
              src={selectedMedia.url}
              alt={selectedMedia.title}
              className="max-h-[550px] w-auto max-w-full object-contain rounded-sm"
            />
          )}
        </div>

        {/* Media Meta Details */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded-sm bg-orange-50 text-[#C2410C] border border-orange-200">
                {selectedMedia.category}
              </span>
              <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                <Calendar className="w-3 h-3 text-slate-400" />
                {selectedMedia.uploadedAt}
              </span>
            </div>
            <h3 className="text-xl font-black text-[#002147] font-display uppercase tracking-tight">
              {selectedMedia.title}
            </h3>
            {selectedMedia.description && (
              <p className="text-xs text-slate-600 mt-1 font-normal">
                {selectedMedia.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {selectedMedia.url && selectedMedia.url !== '#' && (
              <a
                href={selectedMedia.url}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-sm bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-[#002147]" />
                View Original
              </a>
            )}
            <button
              onClick={() => setSelectedMedia(null)}
              className="px-5 py-2.5 rounded-sm bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
