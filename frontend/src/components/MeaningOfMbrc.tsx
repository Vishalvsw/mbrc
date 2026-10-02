import React from 'react';
import { meaningOfMbrcData } from '../data/initialData';
import { Heart, Sparkles, Building, Layers } from 'lucide-react';

export const MeaningOfMbrc: React.FC = () => {
  return (
    <section id="meaning" className="py-20 bg-white text-slate-800 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-orange-50 border border-orange-200 text-[10px] font-black uppercase tracking-widest text-[#C2410C] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF671F]"></span>
            ಸಂಸ್ಥೆಯ ಹೆಸರು ಮತ್ತು ಪರಂಪರೆ • Heritage & Sovereign Identity
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#002147] tracking-tight font-display mb-3 uppercase">
            The Meaning of MBRC
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Every letter in our name anchors five decades of personal devotion, ancestral reverence, and professional pride in building Karnataka's highways.
          </p>
        </div>

        {/* Central Prominent Formula Showcase */}
        <div className="mb-14 p-6 sm:p-10 rounded-sm bg-[#002147] border border-amber-500/30 shadow-xl text-center text-white">
          <div className="text-[10px] uppercase font-black tracking-widest text-amber-300 mb-2">
            Generational Lineage & Values
          </div>
          <div className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight font-display uppercase">
            <span className="text-amber-400">Maqbool</span>
            <span className="text-white/40 mx-2 sm:mx-3">+</span>
            <span className="text-amber-400">Beepasha</span>
            <span className="text-white/40 mx-2 sm:mx-3">+</span>
            <span className="text-amber-400">Riyaz</span>
            <span className="text-white/40 mx-2 sm:mx-3">+</span>
            <span className="text-[#FF671F]">Construction</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 mt-3 max-w-2xl mx-auto font-normal leading-relaxed">
            MBRC is not an arbitrary acronym. It represents the family's deep-seated roots, emotional legacy, maternal blessing, and generational commitment to the noble craft of civil infrastructure.
          </p>
        </div>

        {/* 4 Cards Grid: M - B - R - C */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {meaningOfMbrcData.map((item) => (
            <div
              key={item.letter}
              className="p-6 rounded-sm bg-slate-50 border border-slate-200 hover:border-[#FF671F] transition-all hover:shadow-md relative group shadow-sm"
            >
              <div className="w-12 h-12 rounded-sm bg-[#002147] text-white flex items-center justify-center text-xl font-black font-display mb-4 shadow-sm group-hover:bg-[#FF671F] transition-colors">
                {item.letter}
              </div>

              <div className="text-lg font-black text-[#002147] font-display mb-1">
                {item.title}
              </div>

              <div className="text-xs font-bold text-[#FF671F] mb-3 uppercase tracking-wider text-[11px]">
                {item.subtitle}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
