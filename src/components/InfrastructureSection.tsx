import React, { useState } from 'react';
import { initialInfrastructure } from '../data/initialData';
import { InfrastructureFacility } from '../types';
import { useApp } from '../context/AppContext';
import { Factory, MapPin, Gauge, CheckCircle2, ArrowRight } from 'lucide-react';

export const InfrastructureSection: React.FC = () => {
  const { setPrefilledWorkType, setIsEnquiryModalOpen } = useApp();
  const [activeFacility, setActiveFacility] = useState<InfrastructureFacility>(initialInfrastructure[0]);

  return (
    <section id="infrastructure" className="py-20 bg-slate-100 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-orange-50 border border-orange-200 text-[10px] font-black uppercase tracking-widest text-[#C2410C] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF671F]"></span>
              ಸ್ವಂತ ಉತ್ಪಾದನಾ ಘಟಕಗಳು • Captive Industrial Ecosystem
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002147] tracking-tight font-display uppercase">
              Company-Owned Infrastructure
            </h2>
          </div>
          <div className="max-w-md text-sm text-slate-600 font-normal leading-relaxed">
            Total self-reliance is MBRC’s competitive moat. We manufacture our own aggregates, sand, and asphalt mixtures, ensuring uncompromising quality control from quarry bedrock to the final road seal.
          </div>
        </div>

        {/* Facility Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
          {initialInfrastructure.map((facility) => {
            const isSelected = activeFacility.id === facility.id;
            return (
              <button
                key={facility.id}
                id={`facility-tab-${facility.id}`}
                onClick={() => setActiveFacility(facility)}
                className={`p-3.5 rounded-sm text-left transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#002147] border-[#002147] text-white shadow-md'
                    : 'bg-white border-slate-200 text-slate-700 hover:text-[#002147] hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] uppercase font-bold tracking-widest ${isSelected ? 'text-amber-300' : 'text-slate-500'}`}>
                    Facility
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-sm border ${isSelected ? 'bg-white/10 text-slate-200 border-white/20' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                    {facility.capacity.split(' ')[0]} {facility.capacity.split(' ')[1]}
                  </span>
                </div>
                <h4 className={`text-xs sm:text-sm font-black font-display mb-1 line-clamp-1 ${isSelected ? 'text-white' : 'text-[#002147]'}`}>
                  {facility.name}
                </h4>
                <p className={`text-[11px] truncate flex items-center gap-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  <MapPin className={`w-3 h-3 shrink-0 ${isSelected ? 'text-amber-300' : 'text-[#FF671F]'}`} />
                  {facility.location.split(',')[0]}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Facility Deep Dive */}
        <div className="p-6 sm:p-10 rounded-sm bg-white border border-slate-200 shadow-xl text-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative & Specs */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#FF671F] mb-1">
                  <Factory className="w-3.5 h-3.5" />
                  <span>Industrial Heavy Asset • Captive Plant</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#002147] font-display uppercase tracking-tight">
                  {activeFacility.name}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#FF671F]" />
                    <span>{activeFacility.location}</span>
                  </div>
                  <span>•</span>
                  <span className="text-[#046A38] font-bold">{activeFacility.capacity}</span>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                {activeFacility.description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-sm bg-slate-50 border border-slate-200">
                {activeFacility.keySpecs.map((spec, i) => (
                  <div key={i}>
                    <div className="text-[9px] uppercase font-bold text-slate-500 tracking-widest">
                      {spec.label}
                    </div>
                    <div className="text-xs sm:text-sm font-black text-[#002147] font-display mt-0.5">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Operational Features */}
              <div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-2">
                  Key Operational Advantages:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeFacility.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#046A38] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  id={`procure-from-${activeFacility.id}-btn`}
                  onClick={() => {
                    setPrefilledWorkType(`Material Supply / Facility: ${activeFacility.name}`);
                    setIsEnquiryModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-sm bg-[#FF671F] hover:bg-[#E65100] text-white font-black text-xs uppercase tracking-widest transition-all shadow-md cursor-pointer"
                >
                  <span>Inquire for Plant Supply / Bulk Orders</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Large Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-sm overflow-hidden border border-slate-200 shadow-lg aspect-4/3 group">
                <img
                  src={activeFacility.image}
                  alt={activeFacility.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-sm bg-white/95 border border-slate-200 shadow-md text-xs text-slate-900">
                  <div className="font-black text-[#002147] uppercase tracking-wider">{activeFacility.tagline}</div>
                  <div className="text-[10px] uppercase tracking-widest text-[#046A38] font-bold mt-0.5">Continuous 24x7 Captive Production Capability</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
