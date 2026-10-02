import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, HardHat, CheckCircle2, Award, AlertOctagon, Flame, Activity } from 'lucide-react';

export const QualitySafetySection: React.FC = () => {
  const { content } = useApp();

  const qualityFocus = [
    'Quality materials directly sourced from captive crusher & washing plants',
    'High-precision computerized plant equipment & electronic sensor pavers',
    'Rigorous on-site technical supervision by graduate civil engineers',
    'Dedicated in-house testing laboratory (slump, sieve, cube crush & Marshall tests)',
    'Disciplined craftsmanship and experienced paving teams',
    'Microprocessor process control at continuous hot-mix & batching plants',
    'Strict site monitoring with daily compaction and density field records',
    '100% compliance with PWD, KKRDB, IRC, and MORTH specifications'
  ];

  const safetyFocus = [
    'Safe working practices enforced across all carriageways and quarry faces',
    'Strict site discipline: mandatory PPE (helmets, high-vis vests, steel-toe boots)',
    'Machinery safety audits, preventative maintenance, and reverse alarms',
    'Continuous worker awareness drills and daily morning "Toolbox Talks"',
    'Active engineering supervision during deep excavation and high-wall blasting',
    'Responsible site management with proper traffic diversions & night illumination',
    'Comprehensive risk awareness, hazardous materials protocols & first-aid stations'
  ];

  return (
    <section id="quality-safety" className="py-20 bg-slate-100 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-orange-50 border border-orange-200 text-[10px] font-black uppercase tracking-widest text-[#C2410C] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF671F]"></span>
            ಗುಣಮಟ್ಟ ಮತ್ತು ಸುರಕ್ಷತೆ • Institutional Standards & HSE Governance
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002147] tracking-tight font-display uppercase mb-3">
            Quality & Safety Governance
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Civil infrastructure outlives its builders. We engineer our roadways, bridges, and industrial aggregates with zero tolerance for sub-standard workmanship.
          </p>
        </div>

        {/* Two Grand Pillars: Quality & Safety */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* QUALITY SECTION */}
          <div className="p-7 sm:p-9 rounded-sm bg-white border border-slate-200 hover:border-[#FF671F] shadow-lg flex flex-col justify-between transition-all">
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-12 h-12 rounded-sm bg-[#002147]/5 border border-[#002147]/15 flex items-center justify-center text-[#002147]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FF671F]">
                    Pillar 01 • MoRTH / IRC Compliant
                  </span>
                  <h3 className="text-2xl font-black text-[#002147] font-display uppercase tracking-tight">
                    Quality Assurance
                  </h3>
                </div>
              </div>

              {/* Quality Statement */}
              <div className="p-4 rounded-sm bg-amber-50/70 border-l-4 border-[#FF671F] mb-5">
                <div className="text-base sm:text-lg font-bold text-[#002147] italic">
                  “{content.qualityStatement}”
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 font-normal">
                Our captive aggregate production eliminates the typical contractor pitfall of inconsistent third-party material. Every grain of sand, every crushed basalt aggregate, and every liter of thermic-fluid heated bitumen is tested against state and national benchmarks.
              </p>

              {/* Quality Focus List */}
              <div className="space-y-2.5">
                {qualityFocus.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#046A38] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="uppercase tracking-wider text-[11px] font-semibold">Standard: IS 383 & IRC Standards</span>
              <span className="text-[#046A38] font-black uppercase tracking-wider text-[11px]">100% Tested Batches</span>
            </div>
          </div>

          {/* SAFETY SECTION */}
          <div className="p-7 sm:p-9 rounded-sm bg-white border border-slate-200 hover:border-[#FF671F] shadow-lg flex flex-col justify-between transition-all">
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-12 h-12 rounded-sm bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF671F]">
                  <HardHat className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FF671F]">
                    Pillar 02 • Zero-Incident Mandate
                  </span>
                  <h3 className="text-2xl font-black text-[#002147] font-display uppercase tracking-tight">
                    Health & Safety (HSE)
                  </h3>
                </div>
              </div>

              {/* Safety Statement */}
              <div className="p-4 rounded-sm bg-emerald-50/70 border-l-4 border-[#046A38] mb-5">
                <div className="text-base sm:text-lg font-bold text-[#002147] italic">
                  “{content.safetyStatement}”
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 font-normal">
                High-speed highway construction, heavy aggregate hauling, and plant operations present intrinsic risks. We maintain an uncompromising safety environment ensuring every worker, technician, and commuter returns home without injury.
              </p>

              {/* Safety Focus List */}
              <div className="space-y-2.5">
                {safetyFocus.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#046A38] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="uppercase tracking-wider text-[11px] font-semibold">Goal: Zero Lost-Time Incidents</span>
              <span className="text-[#FF671F] font-black uppercase tracking-wider text-[11px]">100% PPE Mandatory</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
