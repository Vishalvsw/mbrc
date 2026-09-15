import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Shield, Wrench, Users, Award, TrendingUp, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { content, scrollToSection, setIsEnquiryModalOpen } = useApp();

  const pillars = [
    {
      title: 'Family Construction Legacy',
      desc: 'Founded in 1972 by Late Maqbool Ahmed, five decades of field-tested honor, engineering ethics, and regional leadership.',
      icon: Award
    },
    {
      title: 'Modern Infrastructure',
      desc: 'Complete self-sufficiency with captive stone crushers, VSI M-sand plants, hydro-wash facilities, and hot-mix units.',
      icon: Wrench
    },
    {
      title: 'Experienced Leadership',
      desc: 'Headed by Managing Director Riyaz Ahmed and co-directors with daily, active presence on construction sites.',
      icon: Shield
    },
    {
      title: 'Skilled Teams & Technology',
      desc: 'Over 200 civil engineers, certified lab technicians, survey specialists, and trained sensor paver machine operators.',
      icon: Users
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-50 text-slate-800 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-orange-50 border border-orange-200 text-[10px] font-black uppercase tracking-widest text-[#C2410C] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF671F]"></span>
              ಸಂಸ್ಥೆಯ ಪರಿಚಯ • Corporate & Institutional Overview
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002147] tracking-tight font-display uppercase">
              Engineered with Integrity. <br className="hidden sm:inline" />
              Built for Generations.
            </h2>
          </div>
          <div className="max-w-md text-sm text-slate-600 font-normal leading-relaxed">
            MBRC & Infrastructure Private Limited is a registered Class-I EPC civil contracting entity with our own captive quarrying concessions, automated materials manufacturing plants, and heavy equipment fleet.
          </div>
        </div>

        {/* Corporate Equation Banner (Institutional Navy & Saffron) */}
        <div className="mb-14 p-6 sm:p-8 rounded-sm bg-[#002147] border border-amber-500/30 text-center relative overflow-hidden shadow-xl text-white">
          <div className="relative z-10">
            <span className="text-[10px] uppercase tracking-widest font-black text-amber-300 block mb-1">
              The MBRC Execution Formula
            </span>
            <div className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight font-display uppercase text-white">
              {content.companyEquation}
            </div>
            <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-2xl mx-auto font-normal">
              Synthesizing 50+ years of generational field mastery with automated industrial plant technology, MoRTH compliance, and direct director site supervision.
            </p>
          </div>
        </div>

        {/* Two-Column Corporate Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-14">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <div className="text-xs font-bold text-[#FF671F] uppercase tracking-wider">
              Class-I PWD Registered Civil Engineering Force
            </div>
            <h3 className="text-2xl font-black text-[#002147] font-display">
              A Direct, Field-Oriented Management Ethos
            </h3>
            <p className="text-base text-slate-700 leading-relaxed font-normal">
              {content.aboutIntro}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Unlike asset-light contractors who sub-lease equipment and broker materials, MBRC owns and operates every critical link in the construction value chain. When our sensor pavers lay bituminous concrete or our transit mixers pour M35 grade CC pavements, every cubic meter of aggregate is crushed, screened, and washed under our direct scrutiny at the Riyaz Stone Crusher in Khudavandpoor.
            </p>

            {/* Core Values Checklist with Forest Green checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Strict compliance with MoRTH, IRC, and PWD standards',
                'In-house certified material & bitumen testing laboratory',
                '100% captive quarry, crusher & M-sand supply chain',
                'Direct daily site supervision by Managing Director',
                'Recognized partner for KKRDB regional road packages',
                'Zero-delay track record on major district road projects'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#046A38] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                id="about-our-story-btn"
                onClick={() => scrollToSection('story')}
                className="px-6 py-3 rounded-sm bg-[#FF671F] hover:bg-[#E65100] text-white font-black text-xs tracking-widest uppercase transition-all shadow-md cursor-pointer"
              >
                Our Story (1972 - Today)
              </button>
              <button
                id="about-leadership-btn"
                onClick={() => scrollToSection('leadership')}
                className="px-6 py-3 rounded-sm border border-[#002147] hover:bg-[#002147] text-[#002147] hover:text-white font-bold text-xs tracking-widest uppercase transition-all cursor-pointer"
              >
                Board of Directors →
              </button>
            </div>
          </div>

          {/* Right Column: Visual Composite Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-sm overflow-hidden border border-slate-300 shadow-xl bg-white group">
              <img
                src="/photo/riyaz.png"
                alt="MBRC Construction Plant and Engineering"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/90 via-[#002147]/20 to-transparent" />
              
              {/* Floating Stat Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-sm bg-white/95 border border-slate-200 backdrop-blur-md shadow-lg text-slate-900">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-semibold">Registered Headquarters & Plant</span>
                  <span className="text-[#FF671F] font-bold">Bhalki, Bidar</span>
                </div>
                <div className="text-base font-black text-[#002147] font-display mt-0.5">
                  MBRC & Infrastructure Private Limited
                </div>
                <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-2 uppercase tracking-wider font-semibold">
                  <span className="text-[#046A38]">Govt. Class-I PWD</span>
                  <span>•</span>
                  <span>100% Captive Plants</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid (Crisp White Institutional Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-sm bg-white border border-slate-200 hover:border-[#FF671F] hover:shadow-md transition-all shadow-sm"
              >
                <div className="w-10 h-10 rounded-sm bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF671F] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-black text-[#002147] mb-2 font-display">
                  {p.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
