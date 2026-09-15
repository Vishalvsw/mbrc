import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceItem } from '../../types';
import {
  Route,
  Compass,
  Shovel,
  Building2,
  Flame,
  Layers,
  HardHat,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Factory,
  ChevronRight,
  ArrowLeft,
  Calendar,
  Sparkles,
  FileCheck2
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const {
    services,
    machinery,
    selectedServiceId,
    setSelectedServiceId,
    setIsEnquiryModalOpen,
    setPrefilledWorkType
  } = useApp();

  const publishedServices = services.filter((s) => s.published);
  const activeService = publishedServices.find((s) => s.id === selectedServiceId) || null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedServiceId]);

  const getServiceIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Route':
        return <Route className="w-6 h-6 text-[#D4AF37]" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#D4AF37]" />;
      case 'Shovel':
        return <Shovel className="w-6 h-6 text-[#D4AF37]" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#D4AF37]" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-[#D4AF37]" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-[#D4AF37]" />;
      default:
        return <HardHat className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  const handleInquireService = (service: ServiceItem) => {
    setPrefilledWorkType(service.title);
    setIsEnquiryModalOpen(true);
  };

  return (
    <div className="w-full bg-white text-slate-900">
      {/* 1. Services Hero Banner */}
      <div className="bg-[#0B111E] text-white py-16 sm:py-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-white/5 border border-white/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-4">
            <span>ENGINEERING & CONTRACTING SERVICES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight uppercase text-white max-w-4xl leading-tight">
            Specialized Infrastructure Capabilities
          </h1>

          <p className="text-base sm:text-lg text-slate-300 mt-4 max-w-2xl leading-relaxed">
            From high-speed highway expansion and reinforced concrete paving to captive high-capacity aggregate crushing, we execute complete turnkey works under strict MoRTH and IRC parameters.
          </p>

          {/* Quick Filter Navigation Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedServiceId(null)}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                !selectedServiceId
                  ? 'bg-[#D4AF37] text-slate-950 font-black'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              All Services ({publishedServices.length})
            </button>
            {publishedServices.map((srv) => (
              <button
                key={srv.id}
                onClick={() => setSelectedServiceId(srv.id)}
                className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedServiceId === srv.id
                    ? 'bg-[#D4AF37] text-slate-950 font-black'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                {srv.title.split(' ')[0]} {srv.title.split(' ')[1] || ''}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Main Content: Either Dedicated Detail View OR Full Directory Grid */}
      {activeService ? (
        /* DEDICATED SERVICE DETAIL VIEW */
        <div className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            {/* Back Button */}
            <button
              onClick={() => setSelectedServiceId(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-950 uppercase tracking-wider mb-8 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Services Directory</span>
            </button>

            {/* Service Title Header */}
            <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-sm bg-[#0B111E] border border-slate-800 flex items-center justify-center shrink-0">
                  {getServiceIcon(activeService.iconName)}
                </div>
                <div>
                  <div className="text-[10px] font-mono text-amber-700 font-bold uppercase tracking-widest mb-1">
                    ENGINEERING DOMAIN • CLASS-I
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-display uppercase tracking-tight">
                    {activeService.title}
                  </h2>
                  <p className="text-sm text-slate-600 mt-1 max-w-2xl">{activeService.shortDesc}</p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <button
                  onClick={() => handleInquireService(activeService)}
                  className="px-6 py-3.5 rounded-sm bg-[#D4AF37] hover:bg-[#E5B842] text-slate-950 font-black text-xs uppercase tracking-widest transition-all shadow-md hover:scale-[1.02] cursor-pointer flex items-center gap-2"
                >
                  <span>INQUIRE ABOUT THIS SERVICE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Two-Column Detail Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
              {/* Left Column (7 cols): Full Description, Image, What We Deliver, Process */}
              <div className="lg:col-span-7 space-y-10">
                {/* Main Feature Image */}
                <div className="rounded-sm overflow-hidden border border-slate-200 aspect-16/9 bg-slate-900 shadow-sm">
                  <img
                    src={activeService.image}
                    alt={activeService.title}
                    className="w-full h-full object-cover filter contrast-105"
                  />
                </div>

                {/* Narrative Overview */}
                <div className="bg-white p-6 rounded-sm border border-slate-200 space-y-4">
                  <h3 className="text-base font-bold uppercase tracking-wider text-slate-950 font-display">
                    Scope & Engineering Overview
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {activeService.description}
                  </p>
                </div>

                {/* What We Deliver / Key Sub-Services */}
                <div className="bg-white p-6 rounded-sm border border-slate-200">
                  <h3 className="text-base font-bold uppercase tracking-wider text-slate-950 font-display mb-4">
                    What We Deliver (Scope Items)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeService.subServices.map((sub, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-2 rounded-sm bg-slate-50 border border-slate-100 text-xs text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5-Step Process */}
                {activeService.processSteps && activeService.processSteps.length > 0 && (
                  <div className="bg-white p-6 rounded-sm border border-slate-200">
                    <h3 className="text-base font-bold uppercase tracking-wider text-slate-950 font-display mb-4">
                      Execution Methodology & Process
                    </h3>
                    <div className="space-y-3">
                      {activeService.processSteps.map((step) => (
                        <div key={step.step} className="flex items-start gap-4 p-3 rounded-sm bg-slate-50 border border-slate-200">
                          <span className="font-mono font-bold text-amber-700 text-sm">{step.step}</span>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 uppercase">{step.title}</h4>
                            <p className="text-xs text-slate-600 mt-0.5">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column (5 cols): Specifications, Machinery Integration, Direct Quote */}
              <div className="lg:col-span-5 space-y-6">
                {/* Specifications Card */}
                {activeService.specifications && (
                  <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 pb-2 border-b border-slate-200">
                      TECHNICAL SPECIFICATIONS
                    </h3>
                    <div className="space-y-3">
                      {activeService.specifications.map((spec, i) => (
                        <div key={i} className="flex justify-between items-center text-xs py-1 border-b border-slate-100">
                          <span className="text-slate-500 font-medium">{spec.label}</span>
                          <span className="text-slate-950 font-bold">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Machinery & Technology Powering This Service */}
                <div className="bg-[#0B111E] text-white p-6 rounded-sm border border-slate-800 shadow-md space-y-4">
                  <div className="flex items-center gap-2 text-[#D4AF37]">
                    <Factory className="w-5 h-5" />
                    <h3 className="text-xs font-black uppercase tracking-widest">
                      CAPTIVE PLANT & FLEET BACKING
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    This service is directly powered by MBRC's captive crushing infrastructure, automated VSI M-sand plants, continuous hot-mix units, and fleet of electronic sensor pavers.
                  </p>
                  <div className="space-y-2 pt-2 text-xs">
                    <div className="p-2.5 rounded-sm bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-slate-300">Riyaz Stone Crusher</span>
                      <span className="text-[#D4AF37] font-bold font-mono">250 TPH</span>
                    </div>
                    <div className="p-2.5 rounded-sm bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-slate-300">Continuous Asphalt Drum</span>
                      <span className="text-[#D4AF37] font-bold font-mono">120 TPH</span>
                    </div>
                    <div className="p-2.5 rounded-sm bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-slate-300">Sensor Pavers & Graders</span>
                      <span className="text-emerald-400 font-bold font-mono">100% Owned</span>
                    </div>
                  </div>
                </div>

                {/* Fast Action CTA Box */}
                <div className="p-6 rounded-sm bg-amber-50 border border-amber-200 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-950 font-display">
                    Need Tender Rates or Project Schedule?
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Submit your BOQ or scope requirements to receive a formal quotation directly from our executive directors.
                  </p>
                  <button
                    onClick={() => handleInquireService(activeService)}
                    className="w-full py-3 rounded-sm bg-[#0B111E] hover:bg-slate-900 text-[#D4AF37] font-black text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>SUBMIT SPECIFICATIONS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* FULL SERVICES DIRECTORY GRID */
        <div className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="max-w-2xl mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white text-slate-800 text-[10px] font-bold uppercase tracking-widest mb-3 border border-slate-200">
                <span>FULL SERVICE CATALOG</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-display tracking-tight uppercase">
                Explore Our Core Civil Specializations
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Click any service to view full technical specifications, delivery scope, execution process, and integrated machinery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedServices.map((srv) => (
                <div
                  key={srv.id}
                  className="group rounded-sm bg-white border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Service Image Header */}
                    <div className="relative aspect-16/9 bg-slate-900 overflow-hidden">
                      <img
                        src={srv.image}
                        alt={srv.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 w-10 h-10 rounded-sm bg-[#0B111E]/95 border border-white/20 flex items-center justify-center">
                        {getServiceIcon(srv.iconName)}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-950 group-hover:text-amber-700 transition-colors mb-2 font-display">
                        {srv.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                        {srv.shortDesc}
                      </p>

                      <div className="space-y-1.5 mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Key Deliverables:
                        </span>
                        {srv.subServices.slice(0, 3).map((sub, i) => (
                          <div key={i} className="flex items-start gap-2 text-[11px] text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{sub}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedServiceId(srv.id)}
                      className="text-xs font-bold text-slate-900 group-hover:text-amber-700 inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>View Specifications</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleInquireService(srv)}
                      className="px-3 py-1.5 rounded-sm bg-slate-100 hover:bg-[#0B111E] text-slate-800 hover:text-[#D4AF37] text-[11px] font-bold uppercase tracking-wider transition-colors"
                    >
                      Quote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Technology & Machinery Integration Strip */}
      <div className="py-16 bg-[#0B111E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
          <h3 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight mb-4">
            Need Custom Technical Solutions for Road or Heavy Material Contracts?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mb-8">
            Our engineering teams are prepared to mobilize captive batching plants, mobile crushers, and sensor paver spreads directly to your project corridor.
          </p>
          <button
            onClick={() => setIsEnquiryModalOpen(true)}
            className="px-8 py-3.5 rounded-sm bg-[#D4AF37] hover:bg-[#E5B842] text-slate-950 font-black text-xs uppercase tracking-widest transition-all shadow-lg hover:scale-105 cursor-pointer"
          >
            Initiate Project Discussion
          </button>
        </div>
      </div>
    </div>
  );
};
