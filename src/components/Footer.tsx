import React from 'react';
import { useApp } from '../context/AppContext';
import { PublicPage } from '../types';
import { Phone, Mail, MapPin, ArrowUpRight, ShieldCheck, Lock, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { content, setPublicPage, setActiveAppView, setIsEnquiryModalOpen, services } = useApp();

  const handleNav = (page: PublicPage, serviceId?: string) => {
    setPublicPage(page, serviceId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070B14] text-slate-300 border-t border-white/10">
      {/* Top CTA Banner */}
      <div className="bg-[#0B111E] border-b border-white/10 py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/5 border border-white/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-3">
              <span>Corporate Infrastructure Solutions</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight uppercase">
              Ready to Discuss Your Next Major Project?
            </h3>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Connect directly with our senior engineering team and executive directors for tender inquiries, captive material quotes, or project partnership.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              id="footer-start-project-cta"
              onClick={() => setIsEnquiryModalOpen(true)}
              className="px-7 py-3.5 rounded-sm bg-[#D4AF37] hover:bg-[#E5B842] text-slate-950 font-black text-xs uppercase tracking-widest transition-all shadow-lg hover:scale-[1.02] cursor-pointer flex items-center gap-2"
            >
              <span>START YOUR PROJECT</span>
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

      {/* Main Corporate Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Brand & Profile (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-sm bg-[#111928] border border-[#D4AF37] flex flex-col items-center justify-center">
                <span className="font-display font-black text-xs text-white">MBRC</span>
                <span className="text-[6px] font-mono text-[#D4AF37] font-bold">1972</span>
              </div>
              <div>
                <span className="text-lg font-black text-white tracking-tight font-display">
                  MBRC & INFRASTRUCTURE
                </span>
                <p className="text-[10px] text-[#D4AF37] font-mono uppercase tracking-widest font-bold">
                  Private Limited • Class-I EPC Contractor
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A premier corporate civil engineering contractor and industrial materials enterprise delivering state and national highway corridors, heavy earthwork, and captive aggregate supply with unyielding precision since 1972.
            </p>

            <div className="pt-2 text-xs space-y-1.5 font-mono text-slate-400">
              <div>
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">CIN:</span>{' '}
                <span className="text-white font-bold">{content.cinNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">Managing Director:</span>{' '}
                <span className="text-white font-bold">{content.managingDirectorName}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">Registration:</span>{' '}
                <span className="text-white font-semibold">Public Works Department (PWD) Class-I</span>
              </div>
            </div>
          </div>

          {/* Column 2: 4 Primary Public Pages (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#D4AF37] pb-2 border-b border-white/10">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services & Plant
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Key Core Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#D4AF37] pb-2 border-b border-white/10">
              CAPABILITIES
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {services.slice(0, 5).map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => handleNav('services', srv.id)}
                    className="hover:text-white transition-colors text-left cursor-pointer truncate max-w-full block"
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
                  <span>View All Services</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Coordinates (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#D4AF37] pb-2 border-b border-white/10">
              HEAD OFFICE
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

        {/* Bottom Bar: Copyright, Compliance, Admin Portals */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} MBRC & Infrastructure Private Limited. All rights reserved.
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setActiveAppView('customer')}
              className="hover:text-slate-300 transition-colors text-[11px] cursor-pointer"
            >
              Client Requisition Tracking
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setActiveAppView('admin')}
              className="hover:text-[#D4AF37] transition-colors text-[11px] flex items-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Admin CMS Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
