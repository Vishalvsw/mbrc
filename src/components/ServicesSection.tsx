import React, { useState } from 'react';
import { initialServices } from '../data/initialData';
import { ServiceItem } from '../types';
import { useApp } from '../context/AppContext';
import {
  Route,
  Compass,
  Shovel,
  Building2,
  Shield,
  Flame,
  Layers,
  ArrowRight,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { setPrefilledWorkType, setIsEnquiryModalOpen } = useApp();
  const [activeServiceId, setActiveServiceId] = useState<string>(initialServices[0].id);

  const activeService = initialServices.find((s) => s.id === activeServiceId) || initialServices[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Route': return <Route className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Shovel': return <Shovel className="w-5 h-5" />;
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'Shield': return <Shield className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      default: return <Route className="w-5 h-5" />;
    }
  };

  const handleEnquireService = (serviceTitle: string) => {
    setPrefilledWorkType(serviceTitle);
    setIsEnquiryModalOpen(true);
  };

  return (
    <section id="services" className="py-20 bg-slate-50 text-slate-800 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-orange-50 border border-orange-200 text-[10px] font-black uppercase tracking-widest text-[#C2410C] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF671F]"></span>
              ಕಾಮಗಾರಿ ಸೇವೆಗಳು • Specialized EPC Verticals & Turnkey Execution
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002147] tracking-tight font-display uppercase">
              Comprehensive Infrastructure Engineering
            </h2>
          </div>
          <div className="max-w-md text-sm text-slate-600 font-normal leading-relaxed">
            From initial topographical excavation to multi-lane asphalt wearing courses and captive stone crushing, we deliver integrated, turnkey execution across 7 specialized domains.
          </div>
        </div>

        {/* Desktop / Tablet Service Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
          {initialServices.map((service) => {
            const isActive = activeService.id === service.id;
            return (
              <button
                key={service.id}
                id={`service-tab-${service.id}`}
                onClick={() => setActiveServiceId(service.id)}
                className={`p-3 rounded-sm flex flex-col items-center text-center transition-all border cursor-pointer ${
                  isActive
                    ? 'bg-[#002147] text-white border-[#002147] shadow-md font-black'
                    : 'bg-white text-slate-700 border-slate-200 hover:text-[#002147] hover:border-slate-300'
                }`}
              >
                <div className={`p-2 rounded-sm mb-1.5 ${isActive ? 'bg-white/10 text-amber-300' : 'bg-orange-50 text-[#FF671F]'}`}>
                  {getIcon(service.iconName)}
                </div>
                <span className="text-[11px] font-bold leading-tight line-clamp-2 uppercase tracking-wider">
                  {service.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Service Detailed Card */}
        <div className="p-6 sm:p-10 rounded-sm bg-white border border-slate-200 shadow-xl text-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-orange-50 border border-orange-200 text-[#C2410C] text-[10px] font-black uppercase tracking-widest">
                {getIcon(activeService.iconName)}
                <span>Specialized Domain • MoRTH Standard</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#002147] font-display uppercase tracking-tight">
                {activeService.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                {activeService.description}
              </p>

              {/* Sub-services breakdown */}
              <div className="pt-2">
                <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-2.5">
                  Scope of Works & Deliverables:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeService.subServices.map((sub, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle className="w-4 h-4 text-[#046A38] shrink-0 mt-0.5" />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  id={`enquire-for-${activeService.id}-btn`}
                  onClick={() => handleEnquireService(activeService.title)}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-sm bg-[#FF671F] hover:bg-[#E65100] text-white font-black text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span>Request Proposal for {activeService.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Service Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-sm overflow-hidden border border-slate-200 shadow-md aspect-4/3 group">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-sm bg-white/95 border border-slate-200 shadow-md text-xs text-slate-900">
                  <span className="text-[#C2410C] font-black uppercase tracking-wider text-[10px]">Standard:</span> MORTH / IRC / PWD Specifications Guaranteed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
