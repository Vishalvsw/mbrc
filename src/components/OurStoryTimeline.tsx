import React, { useState } from 'react';
import { initialMilestones } from '../data/initialData';
import { Milestone } from '../types';
import { Calendar, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const OurStoryTimeline: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone>(initialMilestones[0]);

  return (
    <section id="story" className="py-20 bg-slate-100 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-orange-50 border border-orange-200 text-[10px] font-black uppercase tracking-widest text-[#C2410C] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF671F]"></span>
            ಇತಿಹಾಸ ಮತ್ತು ಅಭಿವೃದ್ಧಿ • Five Decades of Field Mastery
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002147] tracking-tight font-display uppercase mb-3">
            Our Story: 1972 to Today
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            From pioneering highway projects initiated by Late Maqbool Ahmed in 1972 to an integrated Class-I EPC infrastructure corporate powerhouse today.
          </p>
        </div>

        {/* Interactive Timeline Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {initialMilestones.map((m) => {
            const isActive = selectedMilestone.year === m.year;
            return (
              <button
                key={m.year}
                id={`timeline-tab-${m.year.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setSelectedMilestone(m)}
                className={`p-4 rounded-sm text-left transition-all border cursor-pointer relative overflow-hidden ${
                  isActive
                    ? 'bg-[#002147] border-[#002147] text-white shadow-md'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-[#002147] hover:border-slate-300'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF671F]" />
                )}
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-base sm:text-lg font-black font-display uppercase tracking-tight ${isActive ? 'text-amber-300' : 'text-[#002147]'}`}>
                    {m.year}
                  </span>
                  <span className={`text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm ${isActive ? 'bg-[#FF671F] text-white font-black' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                    {m.badge}
                  </span>
                </div>
                <div className={`text-xs font-semibold truncate uppercase tracking-wider ${isActive ? 'text-slate-200' : 'text-slate-700'}`}>
                  {m.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Milestone Detail Showcase (Crisp White Sovereign Card) */}
        <div className="p-6 sm:p-10 rounded-sm bg-white border border-slate-200 shadow-xl text-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-black text-[#002147] font-display uppercase tracking-tight">
                  {selectedMilestone.year}
                </span>
                <span className="text-slate-300 font-light text-xl">|</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF671F] bg-orange-50 px-2.5 py-1 rounded-sm border border-orange-200">
                  {selectedMilestone.badge}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#002147] font-display uppercase tracking-tight">
                {selectedMilestone.title}
              </h3>

              {selectedMilestone.subtitle && (
                <p className="text-xs font-bold uppercase tracking-wider text-[#FF671F]">
                  {selectedMilestone.subtitle}
                </p>
              )}

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                {selectedMilestone.description}
              </p>

              {/* Highlights & Operational Assets */}
              <div className="pt-3 border-t border-slate-200">
                <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-3">
                  Key Milestones & Operational Assets:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedMilestone.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-[#046A38] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special highlight for "Today" */}
              {selectedMilestone.year === 'Today' && (
                <div className="mt-4 p-4 rounded-sm bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-bold text-[#002147] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#046A38]" />
                    Today's Active Operational Fleet & Human Capital
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-700">
                    <span className="px-2 py-1 rounded-sm bg-white border border-slate-200 font-medium">Stone Crusher (160 TPH)</span>
                    <span className="px-2 py-1 rounded-sm bg-white border border-slate-200 font-medium">M-Sand Plant</span>
                    <span className="px-2 py-1 rounded-sm bg-white border border-slate-200 font-medium">Hydro-Washing Plant</span>
                    <span className="px-2 py-1 rounded-sm bg-white border border-slate-200 font-medium">Concrete Batching Plant</span>
                    <span className="px-2 py-1 rounded-sm bg-white border border-slate-200 font-medium">Hot-Mix Plant (120 TPH)</span>
                    <span className="px-2 py-1 rounded-sm bg-white border border-slate-200 font-medium">Tippers & Dumpers</span>
                    <span className="px-2 py-1 rounded-sm bg-white border border-slate-200 font-medium">Motor Graders</span>
                    <span className="px-2 py-1 rounded-sm bg-white border border-slate-200 font-medium">Vibratory Rollers</span>
                    <span className="px-2 py-1 rounded-sm bg-white border border-slate-200 font-medium">Electronic Sensor Pavers</span>
                    <span className="px-2 py-1 rounded-sm bg-white border border-slate-200 font-medium">Civil Engineers</span>
                    <span className="px-2 py-1 rounded-sm bg-white border border-slate-200 font-medium">PWD Site Supervisors</span>
                    <span className="px-2 py-1 rounded-sm bg-orange-50 text-[#C2410C] border border-orange-200 font-bold">NABL Lab & Quality Teams</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-sm overflow-hidden border border-slate-200 shadow-md aspect-4/3 group">
                <img
                  src={selectedMilestone.image}
                  alt={selectedMilestone.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-right">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 bg-[#002147]/90 px-2 py-1 rounded-sm border border-amber-500/20 shadow-sm">
                    Archive Reference • {selectedMilestone.year}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
