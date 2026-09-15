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
  Award,
  ChevronRight,
  Calendar,
  MapPin,
  ExternalLink,
  Layers,
  Flame,
  Route,
  Compass,
  Building2,
  Shovel,
  Sparkles
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

  const publishedServices = services.filter((s) => s.published);
  const featuredProjects = projects.filter((p) => p.published && (p.featured || true)).slice(0, 4);

  const getServiceIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Route':
        return <Route className="w-5 h-5 text-[#D4AF37]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#D4AF37]" />;
      case 'Shovel':
        return <Shovel className="w-5 h-5 text-[#D4AF37]" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[#D4AF37]" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-[#D4AF37]" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-[#D4AF37]" />;
      default:
        return <HardHat className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  const processSteps = [
    {
      step: '01',
      title: 'Site Reconnaissance & Survey',
      desc: 'Topographical surveying, soil geotechnical analysis, and precise CAD corridor alignment.'
    },
    {
      step: '02',
      title: 'Mobilization & Plant Setup',
      desc: 'Deployment of heavy earthmovers and aggregate stockpiling at our captive crushing plant.'
    },
    {
      step: '03',
      title: 'Subgrade & Earth Engineering',
      desc: 'Mass cut-and-fill, stabilization, and multi-pass vibratory compaction to >98% density.'
    },
    {
      step: '04',
      title: 'Captive Quality Manufacturing',
      desc: 'Precision computerized batching, IS 383 sand grading, and heated asphalt drum mixing.'
    },
    {
      step: '05',
      title: 'Sensor Paving & Compaction',
      desc: 'Electronic sensor pavers laying asphalt or CC with real-time temperature and smoothness control.'
    },
    {
      step: '06',
      title: 'Testing, Signage & Handover',
      desc: 'Core extraction laboratory tests, thermoplastic markings, and statutory client handover.'
    }
  ];

  return (
    <div className="w-full bg-white text-slate-900">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Company Overview / Trust Snapshot */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 7 cols: Intro Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#0B111E] text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">
                <span>COMPANY OVERVIEW</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-display tracking-tight uppercase leading-tight">
                Engineered with Precision. <br />
                Backed by Captive Plant Infrastructure.
              </h2>

              <p className="text-base text-slate-700 leading-relaxed">
                {content.companyOverview}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-sm bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                  <div className="w-8 h-8 rounded-sm bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                    <Factory className="w-4 h-4 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Captive Supply Chain</h4>
                    <p className="text-xs text-slate-600 mt-1">Crushers, VSI M-sand & hot-mix plants owned and operated in-house.</p>
                  </div>
                </div>

                <div className="p-4 rounded-sm bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                  <div className="w-8 h-8 rounded-sm bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                    <HardHat className="w-4 h-4 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Field-Stationed Leadership</h4>
                    <p className="text-xs text-slate-600 mt-1">Directors physically present on project fronts for zero communication delays.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setPublicPage('about')}
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-950 hover:text-amber-600 transition-colors"
                >
                  <span>Learn More About Our Company & Leadership</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right 5 cols: Corporate Image & Credentials Box */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-sm overflow-hidden border border-slate-300 shadow-xl bg-slate-900 aspect-4/3">
                <img
                  src="/photo/riyaz.png"
                  alt="MBRC Heavy Highway Construction"
                  className="w-full h-full object-cover filter contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B111E] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] block">
                    Bhalki – Humnabad Highway Corridor
                  </span>
                  <span className="text-sm font-bold">28.4 km Dual Carriageway Bituminous Overlay</span>
                </div>
              </div>

              {/* Departmental Accreditation */}
              <div className="p-4 rounded-sm bg-[#0B111E] text-white border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block">Registration Status</span>
                  <span className="text-xs font-bold">Class-I EPC Contractor (PWD Karnataka)</span>
                </div>
                <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Preview */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-slate-100 text-slate-800 text-[10px] font-bold uppercase tracking-widest mb-3 border border-slate-200">
                <span>CORE SPECIALIZATIONS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-display tracking-tight uppercase">
                Comprehensive Civil & Infrastructure Services
              </h2>
            </div>
            <div>
              <button
                onClick={() => setPublicPage('services')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
              >
                <span>View All Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {srv.shortDesc}
                  </p>

                  <ul className="space-y-1.5 mb-6">
                    {srv.subServices.slice(0, 3).map((sub, i) => (
                      <li key={i} className="text-[11px] text-slate-700 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <button
                    onClick={() => setPublicPage('services', srv.id)}
                    className="text-xs font-bold text-slate-900 group-hover:text-amber-600 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      setPrefilledWorkType(srv.title);
                      setIsEnquiryModalOpen(true);
                    }}
                    className="text-[11px] font-bold text-slate-500 hover:text-slate-900 uppercase tracking-wider"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Projects / Capabilities */}
      <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/5 border border-white/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-3">
                <span>PROVEN TRACK RECORD</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight uppercase">
                Featured Projects & Infrastructure Corridors
              </h2>
            </div>
            <div className="text-xs text-slate-400 max-w-sm">
              State Highway stretches, KKRDB packages, and industrial logistic corridors executed to rigid engineering specifications.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((proj) => (
              <div
                key={proj.id}
                className="group rounded-sm bg-[#0B111E] border border-white/10 overflow-hidden hover:border-[#D4AF37]/60 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/9 overflow-hidden bg-slate-800">
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

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {proj.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-xs font-mono">
                      <div>
                        <span className="text-[10px] text-slate-500 block">LENGTH</span>
                        <span className="text-white font-bold">{proj.lengthKm || 'Corridor'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">VALUE</span>
                        <span className="text-[#D4AF37] font-bold">{proj.valueCr || 'Class-I'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">YEAR</span>
                        <span className="text-white font-bold">{proj.completionYear}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="w-full py-2.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>View Project Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-slate-200 text-slate-800 text-[10px] font-bold uppercase tracking-widest mb-3">
              <span>THE MBRC ADVANTAGE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-display tracking-tight uppercase">
              Why Corporate Clients & Government Boards Trust Us
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Uncompromising dedication to material purity, engineering standards, and contractual timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.whyChooseUs.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-6 rounded-sm bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-sm bg-[#0B111E] text-[#D4AF37] flex items-center justify-center mb-4">
                  {idx === 0 && <Factory className="w-5 h-5" />}
                  {idx === 1 && <Truck className="w-5 h-5" />}
                  {idx === 2 && <HardHat className="w-5 h-5" />}
                  {idx === 3 && <CheckCircle2 className="w-5 h-5" />}
                </div>

                <h3 className="text-base font-bold text-slate-950 mb-2 font-display">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Project Process / How We Work */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-slate-100 text-slate-800 text-[10px] font-bold uppercase tracking-widest mb-3 border border-slate-200">
              <span>METHODOLOGY & EXECUTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-display tracking-tight uppercase">
              Disciplined Execution from Planning to Handover
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              A structured 6-phase engineering lifecycle ensuring zero material deviations and strict compliance with MoRTH standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-sm bg-slate-50 border border-slate-200 relative overflow-hidden"
              >
                <div className="text-3xl font-black text-slate-300 font-mono mb-3">
                  {step.step}
                </div>
                <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wide mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Final Call to Action Section */}
      <section className="py-20 bg-[#0B111E] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-white/5 border border-white/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-6">
            <span>DIRECT EXECUTIVE ENGAGEMENT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight uppercase mb-6 leading-tight">
            Partner with a Field-Proven Infrastructure Contractor
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you are planning a state highway expansion, a rural connectivity package, or require captive high-volume aggregate supply, our leadership is ready to discuss your project parameters.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              id="home-cta-start-btn"
              onClick={() => setIsEnquiryModalOpen(true)}
              className="px-8 py-4 rounded-sm bg-[#D4AF37] hover:bg-[#E5B842] text-slate-950 font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-[1.02] cursor-pointer flex items-center gap-2"
            >
              <span>START YOUR PROJECT ENQUIRY</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setPublicPage('contact')}
              className="px-8 py-4 rounded-sm bg-white/5 hover:bg-white/10 text-white border border-white/20 font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
            >
              <span>VIEW CORPORATE CONTACTS</span>
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400">
            <div>
              <span className="text-slate-500 uppercase text-[10px] block">DIRECT PHONE</span>
              <span className="text-white font-bold font-mono">{content.contactPhone}</span>
            </div>
            <div className="hidden sm:block text-white/20">|</div>
            <div>
              <span className="text-slate-500 uppercase text-[10px] block">OFFICIAL EMAIL</span>
              <span className="text-white font-bold">{content.contactEmail}</span>
            </div>
            <div className="hidden sm:block text-white/20">|</div>
            <div>
              <span className="text-slate-500 uppercase text-[10px] block">WORKING HOURS</span>
              <span className="text-white font-bold">{content.workingHours}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

