import React from 'react';
import { useApp } from '../context/AppContext';
import { PublicPage } from '../types';
import { Phone, Mail, MapPin, ArrowUpRight, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { content, setPublicPage, setActiveAppView, setIsEnquiryModalOpen, services } = useApp();

  const handleNav = (page: PublicPage, serviceId?: string) => {
    setPublicPage(page, serviceId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070B14] text-slate-300 border-t border-white/10">

      {/* CTA BANNER */}
      <div className="bg-[#0B111E] border-b border-white/10 py-12 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight uppercase">
              Ready to Discuss Your Next Project?
            </h3>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Connect directly with our engineering team for tender inquiries, material quotes, or project partnerships.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsEnquiryModalOpen(true)}
              className="px-7 py-3.5 rounded-sm bg-[#D4AF37] hover:bg-[#E5B842] text-slate-950 font-black text-xs uppercase tracking-widest transition-all shadow-lg hover:scale-[1.02] flex items-center gap-2"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href={`tel:${content.contactPhone}`}
              className="px-6 py-3.5 rounded-sm bg-white/5 hover:bg-white/10 text-white border border-white/20 font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{content.contactPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Brand */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-sm bg-[#111928] border border-[#D4AF37] flex flex-col items-center justify-center">
                <span className="font-display font-black text-xs text-white">MBRC</span>
                <span className="text-[6px] font-mono text-[#D4AF37] font-bold">1972</span>
              </div>
              <div>
                <span className="text-lg font-black text-white tracking-tight font-display block">
                  MBRC & INFRASTRUCTURE
                </span>
                <p className="text-[10px] text-[#D4AF37] font-mono uppercase tracking-widest font-bold">
                  Class-I EPC Contractor
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Premier civil engineering contractor delivering state and national highway corridors, heavy earthwork, and captive aggregate supply since 1972.
            </p>

            <div className="pt-2 text-xs space-y-1.5 font-mono text-slate-400">
              <div>
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">CIN:</span>{' '}
                <span className="text-white font-bold">{content.cinNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">MD:</span>{' '}
                <span className="text-white font-bold">{content.managingDirectorName}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#D4AF37] pb-2 border-b border-white/10">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition-colors">
                  Services & Plant
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#D4AF37] pb-2 border-b border-white/10">
              Capabilities
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {services.slice(0, 5).map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => handleNav('services', srv.id)}
                    className="hover:text-white transition-colors text-left truncate max-w-full block"
                  >
                    {srv.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="text-[#D4AF37] hover:underline font-bold inline-flex items-center gap-1 pt-1"
                >
                  <span>View All</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#D4AF37] pb-2 border-b border-white/10">
              Head Office
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="leading-tight">{content.contactAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <a href={`tel:${content.contactPhone}`} className="hover:text-white font-mono">
                  {content.contactPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <a href={`mailto:${content.contactEmail}`} className="hover:text-white truncate">
                  {content.contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 pb-20 lg:pb-0">
          <div>
            © {new Date().getFullYear()} MBRC & Infrastructure Pvt. Ltd. All rights reserved.
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setActiveAppView('customer')}
              className="hover:text-slate-300 transition-colors text-[11px]"
            >
              Client Portal
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setActiveAppView('admin')}
              className="hover:text-[#D4AF37] transition-colors text-[11px] flex items-center gap-1.5"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};