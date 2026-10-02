import React from 'react';
import { initialLeadership } from '../data/initialData';
import { useApp } from '../context/AppContext';
import { ArrowRight, Quote, Shield, Award, CheckCircle2 } from 'lucide-react';

export const LeadershipSection: React.FC = () => {
  const { setSelectedDirector, setIsEnquiryModalOpen } = useApp();

  const mdProfile = initialLeadership[0]; // Riyaz Ahmed
  const otherDirectors = initialLeadership.slice(1);

  return (
    <section id="leadership" className="py-20 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-orange-50 border border-orange-200 text-[10px] font-black uppercase tracking-widest text-[#C2410C] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF671F]"></span>
              ಆಡಳಿತ ಮಂಡಳಿ • Executive Governance & Board of Directors
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002147] tracking-tight font-display uppercase">
              Field-First Leadership
            </h2>
          </div>
          <div className="max-w-md text-sm text-slate-600 font-normal leading-relaxed">
            MBRC is governed by the five sons of Late Maqbool Ahmed. Our directors spend their days on project carriageways and industrial crushing plants—ensuring unyielding ground supervision.
          </div>
        </div>

        {/* Featured Showcase: Managing Director Riyaz Ahmed */}
        <div className="mb-14 p-6 sm:p-8 rounded-sm bg-white border border-slate-200 shadow-md relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* MD Portrait */}
            <div className="lg:col-span-4">
              <div className="relative rounded-sm overflow-hidden border border-slate-200 shadow-sm aspect-4/5 group">
                <img
                  src={mdProfile.image}
                  alt={mdProfile.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/90 via-[#002147]/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase tracking-widest font-black px-2 py-0.5 rounded-sm bg-[#FF671F] text-white">
                    MANAGING DIRECTOR
                  </span>
                  <div className="text-xl font-black text-white font-display uppercase tracking-tight mt-1">
                    {mdProfile.name}
                  </div>
                </div>
              </div>
            </div>

            {/* MD Profile Content */}
            <div className="lg:col-span-8 space-y-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-orange-50 border border-orange-200 text-[10px] font-black uppercase tracking-widest text-[#C2410C] mb-1.5">
                  <Shield className="w-3 h-3 text-[#FF671F]" />
                  Key Management Personnel (KMP)
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#002147] font-display uppercase tracking-tight">
                  {mdProfile.name}
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Managing Director, MBRC & Infrastructure Private Limited
                </p>
              </div>

              {/* MD Statement Quote */}
              <div className="p-4 rounded-sm bg-amber-50/60 border-l-4 border-[#FF671F] text-slate-800 text-sm sm:text-base font-medium italic flex items-start gap-3">
                <Quote className="w-5 h-5 text-[#FF671F] shrink-0 mt-0.5" />
                <span>{mdProfile.statement}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {mdProfile.bio}
              </p>

              {/* Core Portfolio Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {mdProfile.focus.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#046A38] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  id="view-md-full-profile-btn"
                  onClick={() => setSelectedDirector(mdProfile)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm bg-[#002147] hover:bg-[#001733] text-white font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-sm"
                >
                  <span>View Full Profile & Achievements</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                </button>
                <button
                  id="direct-enquiry-md-btn"
                  onClick={() => setIsEnquiryModalOpen(true)}
                  className="text-xs font-bold uppercase tracking-widest text-[#002147] hover:text-[#FF671F] transition-colors cursor-pointer"
                >
                  Initiate High-Level Executive Dialogue →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Board of Directors Grid */}
        <div className="mb-6">
          <h3 className="text-xl font-black text-[#002147] font-display uppercase tracking-tight mb-5">
            Board of Directors
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {otherDirectors.map((director) => (
              <div
                key={director.id}
                className="rounded-sm bg-white border border-slate-200 hover:border-[#FF671F] p-4 transition-all hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="rounded-sm overflow-hidden aspect-4/3 mb-3.5 border border-slate-200 relative bg-slate-100">
                    <img
                      src={director.image}
                      alt={director.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500"
                    />
                  </div>

                  <h4 className="text-base font-black text-[#002147] font-display uppercase tracking-tight mb-0.5">
                    {director.name}
                  </h4>
                  <div className="text-xs font-bold text-[#C2410C] uppercase tracking-wider mb-2">
                    {director.title}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 mb-3 leading-relaxed font-normal">
                    {director.bio}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between">
                  <button
                    id={`view-director-${director.id}-btn`}
                    onClick={() => setSelectedDirector(director)}
                    className="text-xs font-black uppercase tracking-widest text-[#002147] hover:text-[#FF671F] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Profile</span>
                    <ArrowRight className="w-3 h-3 text-[#FF671F]" />
                  </button>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">
                    {director.experienceYears}+ Yrs Exp
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
