import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MediaCategory, MediaItem } from '../types';
import { Image, Video, FileText, Eye, Play } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { mediaItems, setSelectedMedia } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories: (MediaCategory | 'All')[] = [
    'All',
    'Projects',
    'Machinery',
    'Plants',
    'Team',
    'Legacy',
    'Documents'
  ];

  // Only show published media in public gallery
  const publishedMedia = mediaItems.filter((m) => m.published);

  const filteredMedia = activeCategory === 'All'
    ? publishedMedia
    : publishedMedia.filter((m) => m.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-slate-50 text-slate-800 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-orange-50 border border-orange-200 text-[10px] font-black uppercase tracking-widest text-[#C2410C] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF671F]"></span>
              ಚಿತ್ರಶಾಲೆ ಮತ್ತು ದೃಶ್ಯ ದಾಖಲೆಗಳು • Visual Infrastructure Archive
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002147] tracking-tight font-display uppercase">
              Media & Project Gallery
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`gallery-filter-${cat.toLowerCase()}-btn`}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#002147] text-white shadow-sm font-black'
                    : 'bg-white text-slate-700 hover:text-[#002147] border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedMedia(item)}
              className="group relative rounded-sm overflow-hidden bg-white border border-slate-200 hover:border-[#FF671F] shadow-sm hover:shadow-md transition-all cursor-pointer aspect-4/3 flex flex-col justify-end"
            >
              {item.type === 'document' ? (
                <div className="absolute inset-0 bg-slate-50 flex flex-col items-center justify-center p-6 text-center border-b border-slate-100">
                  <div className="w-14 h-14 rounded-sm bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#FF671F] mb-3 group-hover:scale-105 transition-transform">
                    <FileText className="w-7 h-7" />
                  </div>
                  <h4 className="text-sm font-black text-[#002147] font-display uppercase tracking-tight mb-1">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-[#C2410C] font-mono font-bold uppercase tracking-wider">
                    Official Corporate PDF • {item.fileSize || 'Dossier'}
                  </span>
                </div>
              ) : (
                <>
                  <img
                    src={item.url}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/90 via-[#002147]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                </>
              )}

              {/* Badges / Overlay */}
              <div className="relative z-10 p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm bg-[#002147]/95 text-amber-300 border border-white/20 backdrop-blur-sm shadow-sm">
                    {item.category}
                  </span>
                  {item.type === 'video' && (
                    <span className="p-1 rounded-sm bg-[#FF671F] text-white shadow-sm">
                      <Play className="w-3 h-3 fill-current" />
                    </span>
                  )}
                </div>
                <h4 className={`text-sm font-black font-display uppercase tracking-tight line-clamp-2 ${item.type === 'document' ? 'text-[#002147]' : 'text-white'}`}>
                  {item.title}
                </h4>
                {item.description && (
                  <p className={`text-[11px] line-clamp-1 mt-0.5 font-normal ${item.type === 'document' ? 'text-slate-500' : 'text-slate-200'}`}>
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
