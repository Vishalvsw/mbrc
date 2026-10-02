import React from 'react';
import { useApp } from '../../context/AppContext';
import { Hero } from '../Hero';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HardHat,
  Factory,
  Truck,
  Route,
  Compass,
  Shovel,
  Building2,
  Flame,
  Layers,
  MapPin
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    content,
    services,
    projects,
    setPublicPage,
    setSelectedProject,
    setIsEnquiryModalOpen,
    setPrefilledWorkType
  } = useApp();

  const publishedServices = services.filter((s) => s.published).slice(0, 3);
  // FIXED: was `(p.featured || true)` which always returned true
  const featuredProjects = projects
    .filter((p) => p.published)
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 2);

  const getServiceIcon = (iconName?: string) => {
    const cls = "w-5 h-5 text-[#D4AF37]";
    switch (iconName) {
      case 'Route':     return <Route className={cls} />;
      case 'Compass':   return <Compass className={cls} />;
      case 'Shovel':    return <Shovel className={cls} />;
      case 'Building2': return <Building2 className={cls} />;
      case 'Flame':     return <Flame className={cls} />;
      case 'Layers':    return <Layers className={cls} />;
      default:          return <HardHat className={cls} />;
    }
  };

  return (
    <div className="w-full bg-white text-slate-900">
      {/* 1. HERO */}
      <Hero />

      {/* 2. COMPANY SNAPSHOT */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-display tracking-tight uppercase leading-tight">
                Engineered with Precision.<br />
                Backed by Captive Plant Infrastructure.
              </h2>
              <p className="text-base text-slate-700 leading-relaxed max-w-xl">
                {content.companyOverview}
              </p>

              <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
                {[
                  { icon: <Factory className="w-4 h-4 text-amber-700" />, label: 'Captive Supply Chain' },
                  { icon: <HardHat className="w-4 h-4 text-amber-700" />, label: 'Field-Stationed Leadership' },
                  { icon: <ShieldCheck className="w-4 h-4 text-amber-700" />, label: 'Class-I EPC Contractor' }
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setPublicPage('about')}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-950 hover:text-amber-600 transition-colors"
              >
                <span>About MBRC</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-sm overflow-hidden border border-slate-250 shadow-xl bg-slate-900 aspect-4/4">
                <img
                  src="/photo/riyaz.png"
                  alt="MBRC Highway Construction"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B111E] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] block">
                    Bhalki – Humnabad Corridor
                  </span>
                  <span className="text-sm font-bold">28.4 km Dual Carriageway Overlay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES (3 cards) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-display tracking-tight uppercase">
              Core Specializations
            </h2>
            <button
              onClick={() => setPublicPage('services')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-900 hover:text-amber-600 transition-colors"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {publishedServices.map((srv) => (
              <div
                key={srv.id}
                className="group p-6 rounded-sm bg-slate-50 hover:bg-white border border-slate-200 hover:border-amber-400/80 transition-all duration-200 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-sm bg-[#0B111E] border border-slate-700 flex items-center justify-center mb-5 group-hover:border-[#D4AF37] transition-colors">
                    {getServiceIcon(srv.iconName)}
                  </div>
                  <h3 className="text-lg font-bold text-slate-950 group-hover:text-amber-600 transition-colors mb-2 font-display">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-5 line-clamp-2">
                    {srv.shortDesc}
                  </p>
                </div>
                <button
                  onClick={() => setPublicPage('services', srv.id)}
                  className="text-xs font-bold text-slate-900 group-hover:text-amber-600 inline-flex items-center gap-1.5 transition-colors pt-4 border-t border-slate-200"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS (2 cards) */}
      <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight uppercase">
              Featured Projects
            </h2>
            <button
              onClick={() => setPublicPage('projects')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80 hover:text-[#D4AF37] transition-colors"
            >
              <span>All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((proj) => (
              <div
                key={proj.id}
                className="group rounded-sm bg-[#0B111E] border border-white/10 overflow-hidden hover:border-[#D4AF37]/60 transition-all shadow-lg"
              >
                <div className="relative aspect-5/4 overflow-hidden bg-slate-800">
                  <img
                    src={proj.images[0]}
                    alt={proj.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-sm bg-[#0B111E]/90 border border-white/10 text-[10px] font-mono font-bold text-[#D4AF37] uppercase">
                    {proj.category}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-sm bg-emerald-950/90 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 uppercase">
                    {proj.status}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{proj.location}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors mb-3 leading-snug">
                    {proj.name}
                  </h3>
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="w-full mt-2 py-2.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <span>View Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SINGLE PREMIUM CTA */}
      <section className="py-24 bg-[#0B111E] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight uppercase mb-6 leading-tight">
            Let's Build Your Next Corridor
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-10 leading-relaxed">
            Share your project parameters and our leadership will respond within one business day.
          </p>

          <button
            id="home-cta-start-btn"
            onClick={() => setIsEnquiryModalOpen(true)}
            className="px-10 py-4 rounded-sm bg-[#D4AF37] hover:bg-[#E5B842] text-slate-950 font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-[1.02] inline-flex items-center gap-2"
          >
            <span>Start Your Enquiry</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs">
            <div>
              <span className="text-slate-500 uppercase text-[10px] block">Phone</span>
              <span className="text-white font-bold font-mono">{content.contactPhone}</span>
            </div>
            <div className="text-white/20">|</div>
            <div>
              <span className="text-slate-500 uppercase text-[10px] block">Email</span>
              <span className="text-white font-bold">{content.contactEmail}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};