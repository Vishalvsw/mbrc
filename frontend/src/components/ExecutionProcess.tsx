import React from 'react';
import { projectExecutionSteps } from '../data/initialData';
import {
  Compass,
  Truck,
  Shovel,
  ShieldCheck,
  AlertTriangle,
  Activity,
  CheckCircle2
} from 'lucide-react';

export const ExecutionProcess: React.FC = () => {
  const getStepIcon = (step: string) => {
    switch (step) {
      case '01': return <Compass className="w-5 h-5 text-[#FF671F]" />;
      case '02': return <Truck className="w-5 h-5 text-[#FF671F]" />;
      case '03': return <Shovel className="w-5 h-5 text-[#FF671F]" />;
      case '04': return <ShieldCheck className="w-5 h-5 text-[#FF671F]" />;
      case '05': return <AlertTriangle className="w-5 h-5 text-[#FF671F]" />;
      case '06': return <Activity className="w-5 h-5 text-[#FF671F]" />;
      case '07': return <CheckCircle2 className="w-5 h-5 text-[#046A38]" />;
      default: return <CheckCircle2 className="w-5 h-5 text-[#FF671F]" />;
    }
  };

  return (
    <section id="execution" className="py-20 bg-white text-slate-800 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-orange-50 border border-orange-200 text-[10px] font-black uppercase tracking-widest text-[#C2410C] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF671F]"></span>
            ಕಾಮಗಾರಿ ಅನುಷ್ಠಾನ ಪ್ರಕ್ರಿಯೆ • Systematic Execution Framework
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002147] tracking-tight font-display uppercase mb-3">
            Our 7-Step Project Execution Framework
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            From initial topographical contour survey to asphalt density core testing, every stage follows a non-negotiable quality regime.
          </p>
        </div>

        {/* 7-Step Visual Process */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projectExecutionSteps.map((s, idx) => (
            <div
              key={s.step}
              className={`p-5 rounded-sm bg-white border border-slate-200 hover:border-[#FF671F] transition-all hover:shadow-md relative group ${
                idx === projectExecutionSteps.length - 1 ? 'sm:col-span-2 lg:col-span-1 bg-emerald-50/40 border-emerald-300' : ''
              }`}
            >
              {/* Step Number */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 rounded-sm bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:border-[#FF671F] transition-colors">
                  {getStepIcon(s.step)}
                </div>
                <span className={`font-display text-2xl font-black ${idx === projectExecutionSteps.length - 1 ? 'text-[#046A38]' : 'text-[#002147]'}`}>
                  {s.step}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-black text-[#002147] font-display uppercase tracking-tight mb-1.5">
                {s.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
