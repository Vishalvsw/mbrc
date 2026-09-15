import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, ShieldCheck, Factory, Truck, HardHat, CheckCircle2, ChevronRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { content, setPublicPage, setIsEnquiryModalOpen } = useApp();

  return (
    <section id="hero" className="relative bg-[#0A0F1D] text-white overflow-hidden border-b border-white/10">
      {/* Background with Dark Architectural Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity filter brightness-75 contrast-125"
          style={{
            backgroundImage: `url('${content.heroBgImage || '/photo/riyaz.png'}')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1D] via-[#0A0F1D]/90 to-[#0A0F1D]/70" />
        {/* Subtle Warm Gold Architectural Highlight */}
        <div className="absolute -right-32 -top-32 w-[550px] h-[550px] rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-16 sm:pt-24 pb-20">
        <div className="max-w-3xl">
          {/* Corporate Micro Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-sm bg-white/5 border border-white/10 text-[11px] font-semibold tracking-wider text-slate-300 uppercase mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-[#D4AF37] font-bold">MBRC & INFRASTRUCTURE</span>
            <span className="text-white/20">|</span>
            <span>ESTD. 1972 • CLASS-I EPC CONTRACTOR</span>
          </div>

          {/* Headline - "YOU DREAM IT. WE BUILD IT." */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white uppercase font-display mb-6">
            {content.heroHeadline || 'YOU DREAM IT.'}
            <span className="block text-[#D4AF37]">
              WE BUILD IT.
            </span>
          </h1>

          {/* Supporting Tagline */}
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-10 max-w-2xl">
            {content.heroSecondary ||
              'Professional construction and infrastructure solutions built with quality, precision and commitment.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Primary CTA: START YOUR PROJECT */}
            <button
              id="hero-start-project-btn"
              onClick={() => setIsEnquiryModalOpen(true)}
              className="px-8 py-4 rounded-sm bg-[#D4AF37] hover:bg-[#E5B842] text-slate-950 font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-[#D4AF37]/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2.5"
            >
              <span>START YOUR PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary CTA: EXPLORE OUR SERVICES */}
            <button
              id="hero-explore-services-btn"
              onClick={() => setPublicPage('services')}
              className="px-8 py-4 rounded-sm bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
            >
              <span>EXPLORE OUR SERVICES</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Verification Badges */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Factory className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
              <span className="font-medium">Captive Crushing & Batching</span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
              <span className="font-medium">Sensor Pavers & Heavy Fleet</span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
              <span className="font-medium">MoRTH & IRC Standards</span>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate Trust & Stat Bar */}
      <div className="w-full bg-[#070B14] border-t border-white/10 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          <div className="pt-3 sm:pt-0 sm:px-6 first:pl-0 flex flex-col justify-center">
            <div className="text-2xl sm:text-3xl font-black text-[#D4AF37] font-display">1972</div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-1">
              52+ Years Construction Heritage
            </div>
          </div>

          <div className="pt-3 sm:pt-0 sm:px-6 flex flex-col justify-center">
            <div className="text-2xl sm:text-3xl font-black text-white font-display">CLASS-I</div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-1">
              Registered EPC Contractor
            </div>
          </div>

          <div className="pt-3 sm:pt-0 sm:px-6 flex flex-col justify-center">
            <div className="text-2xl sm:text-3xl font-black text-[#D4AF37] font-display">250 TPH</div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-1">
              Captive Crusher & M-Sand Facility
            </div>
          </div>

          <div className="pt-3 sm:pt-0 sm:px-6 flex flex-col justify-center">
            <div className="text-2xl sm:text-3xl font-black text-white font-display">100%</div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-1">
              In-House Testing & Execution
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
